from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

# Connect to MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = None
db = None

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
    client.server_info() # trigger connection check
    db = client.syncspace_db
    print(f"✅ Successfully connected to MongoDB at {MONGO_URI}")
except Exception as e:
    print(f"⚠️ MongoDB connection notice ({e}). Using in-memory fallback store.")
    db = None

class MongoDictFallback:
    """
    A wrapper that acts like a dictionary, but backs the data into a MongoDB collection.
    If MongoDB is not available, it gracefully falls back to an in-memory dictionary.
    This allows all our existing routers to work seamlessly and persistently.
    """
    def __init__(self, collection_name):
        self.collection_name = collection_name
        self.collection = db[collection_name] if db is not None else None
        self._memory = {}

    def _normalize_key(self, key):
        return str(key)

    def __setitem__(self, key, value):
        str_key = self._normalize_key(key)
        if isinstance(value, dict):
            value["id"] = str_key
            
        if self.collection is not None:
            # Upsert into MongoDB
            self.collection.update_one({"id": str_key}, {"$set": value}, upsert=True)
        else:
            self._memory[str_key] = value

    def __getitem__(self, key):
        str_key = self._normalize_key(key)
        if self.collection is not None:
            query = {"$or": [{"id": str_key}]}
            if str_key.isdigit():
                query["$or"].append({"id": int(str_key)})
            doc = self.collection.find_one(query, {"_id": 0})
            if doc:
                return doc
            raise KeyError(key)
        else:
            if str_key in self._memory:
                return self._memory[str_key]
            raise KeyError(key)

    def get(self, key, default=None):
        try:
            return self.__getitem__(key)
        except KeyError:
            return default

    def values(self):
        if self.collection is not None:
            return list(self.collection.find({}, {"_id": 0}))
        else:
            return list(self._memory.values())

    def items(self):
        if self.collection is not None:
            return [(doc["id"], doc) for doc in self.collection.find({}, {"_id": 0})]
        else:
            return list(self._memory.items())
            
    def __contains__(self, key):
        return self.get(key) is not None

# Define our collections mapping to the wrapper
users_db = MongoDictFallback("users")
students_db = MongoDictFallback("students")
faculty_db = MongoDictFallback("faculty")
companies_db = MongoDictFallback("companies")
jobs_db = MongoDictFallback("jobs")
applications_db = MongoDictFallback("applications")
assessments_db = MongoDictFallback("assessments")
interviews_db = MongoDictFallback("interviews")
courses_db = MongoDictFallback("courses")
enrollments_db = MongoDictFallback("enrollments")
faculty_opportunities_db = MongoDictFallback("faculty_opportunities")
collaborations_db = MongoDictFallback("collaborations")
portfolios_db = MongoDictFallback("portfolios")

def get_next_id(db_collection):
    """Calculates a safe monotonic next ID by inspecting existing collection documents."""
    vals = db_collection.values()
    ids = []
    for v in vals:
        raw_id = v.get("id")
        if raw_id is not None and str(raw_id).isdigit():
            ids.append(int(raw_id))
    return max(ids or [0]) + 1

# Expose helper properties for backwards compatibility with dynamic next id lookup
class NextIdHelper:
    def __init__(self, collection):
        self.collection = collection
    def __add__(self, other):
        return get_next_id(self.collection) + other
    def __radd__(self, other):
        return other + get_next_id(self.collection)
    def __int__(self):
        return get_next_id(self.collection)
    def __str__(self):
        return str(get_next_id(self.collection))

next_user_id = NextIdHelper(users_db)
next_student_id = NextIdHelper(students_db)
next_faculty_id = NextIdHelper(faculty_db)
next_company_id = NextIdHelper(companies_db)
next_job_id = NextIdHelper(jobs_db)
next_application_id = NextIdHelper(applications_db)
next_assessment_id = NextIdHelper(assessments_db)
next_interview_id = NextIdHelper(interviews_db)
next_course_id = NextIdHelper(courses_db)
next_enrollment_id = NextIdHelper(enrollments_db)
next_faculty_opportunity_id = NextIdHelper(faculty_opportunities_db)
next_collaboration_id = NextIdHelper(collaborations_db)

def db_get(db_dict, key):
    """Lookup helper that tries both int and str keys."""
    return db_dict.get(key)
