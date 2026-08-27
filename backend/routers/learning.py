from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import courses_db, enrollments_db, students_db
import database

router = APIRouter(prefix="/courses", tags=["learning"])

@router.get("/")
def list_courses(skill: str = None, type: str = None):
    courses = list(courses_db.values())
    if not courses:
        courses = [
            {"id": "1", "title": "Complete Full Stack Web Development", "provider": "Udemy", "type": "Course", "difficulty": "Beginner", "duration": "40h", "skills": ["React", "FastAPI", "MongoDB"]},
            {"id": "2", "title": "Machine Learning Specialization", "provider": "Coursera", "type": "Course", "difficulty": "Intermediate", "duration": "60h", "skills": ["Python", "Machine Learning", "Scikit-Learn"]},
            {"id": "3", "title": "AWS Cloud Foundations", "provider": "AWS", "type": "Certification", "difficulty": "Beginner", "duration": "15h", "skills": ["Cloud", "AWS", "DevOps"]},
            {"id": "4", "title": "System Design for High Scale", "provider": "Educative", "type": "Workshop", "difficulty": "Advanced", "duration": "20h", "skills": ["System Design", "Distributed Systems"]}
        ]
    if skill:
        courses = [c for c in courses if skill.lower() in [s.lower() for s in c.get("skills", [])]]
    if type:
        courses = [c for c in courses if type.lower() == str(c.get("type", "")).lower()]
    return courses

@router.get("/recommended/{student_id}")
def recommended_courses(student_id: str):
    courses = list(courses_db.values())
    if not courses:
        courses = list_courses()
    return courses[:4]

class EnrollRequest(BaseModel):
    student_id: str

@router.post("/{course_id}/enroll")
def enroll_course(course_id: str, req: EnrollRequest):
    enroll_id = str(database.next_enrollment_id)
    database.next_enrollment_id += 1
    enrollment = {
        "id": enroll_id,
        "course_id": str(course_id),
        "student_id": str(req.student_id),
        "progress": 25
    }
    enrollments_db[enroll_id] = enrollment
    return enrollment

@router.get("/progress/{student_id}")
def get_progress(student_id: str):
    enrolls = [e for e in enrollments_db.values() if str(e.get("student_id")) == str(student_id)]
    for e in enrolls:
        e["course"] = courses_db.get(str(e.get("course_id")), {
            "id": e.get("course_id"),
            "title": "Full Stack Mastery",
            "provider": "SyncSpace Academy",
            "duration": "20h"
        })
    return enrolls
