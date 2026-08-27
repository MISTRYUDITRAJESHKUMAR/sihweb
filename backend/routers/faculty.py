from fastapi import APIRouter, HTTPException
from database import faculty_opportunities_db, collaborations_db, faculty_db
from typing import Optional

router = APIRouter(prefix="/faculty", tags=["faculty"])

@router.get("/opportunities")
def get_opportunities(type: str = None):
    opps = list(faculty_opportunities_db.values())
    if not opps:
        opps = [
            {"id": "1", "type": "FDP", "title": "Advanced Generative AI for Educators", "org": "Google Cloud", "duration": "5 Days", "tags": ["AI", "Cloud", "Curriculum"], "desc": "Hands-on generative AI integration labs for computer science faculty."},
            {"id": "2", "type": "Industrial Training", "title": "AWS Cloud Architect Immersion", "org": "Amazon Web Services", "duration": "2 Weeks", "tags": ["AWS", "Cloud", "DevOps"], "desc": "Deep dive into scalable cloud systems and serverless architectures."},
            {"id": "3", "type": "Consultancy", "title": "FinTech Data Ingestion Pipeline", "org": "FinEdge Labs", "duration": "3 Months", "tags": ["Python", "Kafka", "Data Engineering"], "desc": "Industry consulting engagement for high-throughput stream processing."},
            {"id": "4", "type": "Research", "title": "Smart City IoT Sensor Networks", "org": "Cisco Research", "duration": "6 Months", "tags": ["IoT", "Edge Computing", "Sensors"], "desc": "Collaborative academic-industry research on low-power edge nodes."}
        ]
    if type and type != "All":
        opps = [o for o in opps if o.get("type", "").lower() == type.lower()]
    return opps

@router.post("/opportunities/{opportunity_id}/apply")
@router.post("/apply/{opportunity_id}")
def apply_opportunity(opportunity_id: str, faculty_id: Optional[str] = None):
    return {"message": "Application submitted successfully", "opportunity_id": opportunity_id}

@router.get("/collaborations")
def get_collaborations():
    collabs = list(collaborations_db.values())
    if not collabs:
        collabs = [
            {"id": "1", "title": "NLP for Local Dialects Research", "partner": "InnovaSys Tech", "type": "Research", "status": "In Progress"},
            {"id": "2", "title": "Student Capstone Mentorship", "partner": "TechCorp Solutions", "type": "Mentorship", "status": "Active"}
        ]
    return collabs

@router.get("/{faculty_id}")
@router.get("/{faculty_id}/profile")
def get_profile(faculty_id: str):
    fac = faculty_db.get(str(faculty_id))
    if not fac:
        return {
            "id": str(faculty_id),
            "name": "Dr. Sharma",
            "department": "Computer Science & Engineering",
            "institution": "National Institute of Technology",
            "expertise": ["Artificial Intelligence", "Machine Learning", "Distributed Systems"]
        }
    return fac
