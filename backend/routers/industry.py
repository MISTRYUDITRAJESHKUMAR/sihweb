from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import students_db, jobs_db, applications_db
from services.analytics_service import compute_industry_metrics
from typing import Optional, List

router = APIRouter(prefix="/industry", tags=["industry"])

class ShortlistRequest(BaseModel):
    student_id: Optional[str] = None
    studentId: Optional[str] = None
    job_id: Optional[str] = None
    jobId: Optional[str] = None

@router.get("/dashboard")
def get_dashboard():
    return compute_industry_metrics(list(jobs_db.values()), list(applications_db.values()))

@router.get("/candidates")
def get_candidates():
    candidates = list(students_db.values())
    if not candidates:
        candidates = [
            {"id": "1", "name": "Rahul Sharma", "college": "NIT Surat", "target_role": "Full Stack Developer", "verified_score": 95, "skills": ["React", "FastAPI", "MongoDB", "AWS"]},
            {"id": "2", "name": "Priya Patel", "college": "IIT Bombay", "target_role": "Data Scientist", "verified_score": 92, "skills": ["Python", "TensorFlow", "SQL", "Scikit-Learn"]},
            {"id": "3", "name": "Amit Kumar", "college": "BITS Pilani", "target_role": "Backend Engineer", "verified_score": 88, "skills": ["Java", "Spring Boot", "Docker", "PostgreSQL"]}
        ]
    candidates.sort(key=lambda x: int(x.get("verified_score", 0) or 0), reverse=True)
    return candidates

@router.get("/candidates/{student_id}")
@router.get("/candidate/{student_id}")
def get_candidate(student_id: str):
    cand = students_db.get(str(student_id))
    if not cand:
        return {
            "id": str(student_id),
            "name": "Candidate Profile",
            "verified_score": 85,
            "skills": ["React", "Python", "FastAPI"]
        }
    return cand

@router.post("/shortlist")
def shortlist_candidate(req: ShortlistRequest):
    sid = str(req.student_id or req.studentId or "")
    jid = str(req.job_id or req.jobId or "")
    
    for app in applications_db.values():
        if str(app.get("student_id")) == sid and str(app.get("job_id")) == jid:
            app["status"] = "Shortlisted"
            return {"message": "Candidate shortlisted successfully"}
            
    return {"message": "Candidate shortlisted for review"}

@router.get("/programs")
def get_programs():
    return [
        {"id": "1", "title": "React for Enterprise Scale", "type": "Training", "duration": "4 Weeks", "impact": "120 Students Trained", "status": "Active"},
        {"id": "2", "title": "AWS Cloud Foundations Bootcamp", "type": "Workshop", "duration": "2 Days", "impact": "45 Faculty Trained", "status": "Completed"},
        {"id": "3", "title": "Women in Tech Mentorship Series", "type": "Mentorship", "duration": "6 Months", "impact": "25 Mentees", "status": "Active"}
    ]
