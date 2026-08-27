from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from services.ai_service import generate_career_roadmap
from database import students_db, db_get

router = APIRouter(prefix="/career", tags=["career"])

class RoadmapRequest(BaseModel):
    target_role: Optional[str] = None
    targetRole: Optional[str] = None
    current_skills: Optional[List[str]] = []
    currentSkills: Optional[List[str]] = []
    student_id: Optional[str] = None
    studentId: Optional[str] = None

@router.post("/roadmap")
def get_roadmap(req: RoadmapRequest):
    role = req.target_role or req.targetRole or "Full Stack Developer"
    skills = req.current_skills or req.currentSkills or []
    sid = req.student_id or req.studentId
    
    roadmap_data = generate_career_roadmap(role, skills)
    
    # If student_id is provided, automatically persist roadmap into student profile in MongoDB!
    if sid:
        student = db_get(students_db, str(sid))
        if student:
            student["target_role"] = role
            student["roadmap"] = roadmap_data.get("steps", [])
            student["roadmap_progress"] = 25
            students_db[str(sid)] = student
            
    return roadmap_data

@router.get("/guidance/{student_id}")
def get_guidance(student_id: str):
    student = db_get(students_db, str(student_id))
    role = student.get("target_role", "Software Engineer") if student else "Software Engineer"
    return {
        "suggested_roles": [role, "Full Stack Developer", "Data Scientist", "Cloud Architect"],
        "next_steps": [
            f"Complete assessment for {role}",
            "Solve coding challenges in Coding Arena",
            "Take AI Mock Interview"
        ]
    }

@router.get("/skills-demand")
def get_skills_demand():
    return [
        {"skill": "React & Next.js", "demand": 1420},
        {"skill": "Python & FastAPI", "demand": 1380},
        {"skill": "AWS & Cloud", "demand": 1150},
        {"skill": "Machine Learning", "demand": 920},
        {"skill": "Docker & DevOps", "demand": 850},
        {"skill": "System Design", "demand": 780}
    ]
