from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import jobs_db, applications_db, students_db, db_get
import database
from typing import List, Optional
from services.matching_service import rank_jobs_for_student
from datetime import datetime

router = APIRouter(prefix="/jobs", tags=["jobs"])

class JobCreate(BaseModel):
    title: str
    company_id: Optional[str] = "1"
    company_name: Optional[str] = "Industry Partner"
    description: str
    skills: Optional[List[str]] = []
    type: Optional[str] = "Job"
    location: Optional[str] = "Remote"
    salary: Optional[str] = "Competitive"
    duration: Optional[str] = "Full-time"

class ApplyRequest(BaseModel):
    student_id: Optional[str] = None
    studentId: Optional[str] = None

@router.get("/")
def list_jobs(type: str = None, q: str = None):
    jobs = list(jobs_db.values())
    if type and type != "All":
        jobs = [j for j in jobs if str(j.get("type", "")).lower() == type.lower()]
    if q:
        q_lower = q.lower()
        jobs = [j for j in jobs if q_lower in str(j.get("title", "")).lower() or q_lower in str(j.get("description", "")).lower() or q_lower in str(j.get("company_name", "")).lower()]
    return jobs

@router.post("/")
def create_job(req: JobCreate):
    job_id = str(database.get_next_id(jobs_db))
    job = req.dict()
    job["id"] = job_id
    job["posted_date"] = datetime.now().strftime("%Y-%m-%d")
    job["status"] = "Open"
    jobs_db[job_id] = job
    return job

@router.get("/{job_id}")
def get_job(job_id: str):
    job = db_get(jobs_db, job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

@router.post("/{job_id}/apply")
def apply_job(job_id: str, req: ApplyRequest):
    sid = str(req.student_id or req.studentId or "")
    if not sid:
        raise HTTPException(status_code=400, detail="Student ID required")

    job = db_get(jobs_db, job_id)
    company_name = job.get("company_name", "Industry Partner") if job else "Tech Enterprise"
    role_title = job.get("title", job.get("role", "Software Engineer")) if job else "Software Engineer"
    job_type = job.get("type", "Job") if job else "Job"
    
    app_id = str(database.get_next_id(applications_db))
    application = {
        "id": app_id,
        "job_id": str(job_id),
        "student_id": sid,
        "company": company_name,
        "role": role_title,
        "type": job_type,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "status": "Under Review"
    }
    applications_db[app_id] = application
    return {"message": "Application successful", "application": application}

@router.get("/recommended/{student_id}")
def get_recommended_jobs(student_id: str):
    student = db_get(students_db, str(student_id))
    if not student:
        student = {"skills": ["Python", "React", "JavaScript"]}
    return rank_jobs_for_student(student, list(jobs_db.values()))

@router.get("/applications/{student_id}")
def get_student_applications(student_id: str):
    sid = str(student_id)
    apps = [a for a in applications_db.values() if str(a.get("student_id")) == sid]
    for a in apps:
        if "job" not in a and "job_id" in a:
            a["job"] = db_get(jobs_db, a["job_id"]) or {}
    return apps
