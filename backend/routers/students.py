from fastapi import APIRouter, HTTPException
from database import students_db, jobs_db, users_db, db_get
from services.matching_service import rank_jobs_for_student
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

router = APIRouter(prefix="/students", tags=["students"])

class StudentUpdate(BaseModel):
    name: Optional[str] = None
    skills: Optional[List[str]] = None
    target_role: Optional[str] = None
    college: Optional[str] = None
    branch: Optional[str] = None
    year: Optional[str] = None
    roadmap: Optional[List[Any]] = None
    roadmap_progress: Optional[int] = None
    verified_score: Optional[int] = None
    journey_stage: Optional[str] = None

class SolveProblemRequest(BaseModel):
    problem_id: Optional[int] = 1
    problemId: Optional[int] = 1
    title: Optional[str] = "Algorithm Challenge"
    language: Optional[str] = "python"
    code: Optional[str] = ""

def _get_or_create_student(student_id: str):
    sid = str(student_id)
    student = db_get(students_db, sid)
    if student:
        return student

    # Search if any student document has user_id == sid
    for s in students_db.values():
        if str(s.get("user_id")) == sid or str(s.get("id")) == sid:
            return s

    # Look up users_db
    user = db_get(users_db, sid)
    name = user.get("name", "Student") if user else "Student"
    email = user.get("email", "") if user else ""
    college = user.get("college", "") if user else ""
    branch = user.get("branch", "") if user else ""
    year = user.get("year", "") if user else ""

    student = {
        "id": sid,
        "user_id": sid,
        "name": name,
        "email": email,
        "college": college,
        "branch": branch,
        "year": year,
        "target_role": "Full Stack Developer",
        "skills": ["HTML", "CSS", "JavaScript", "Python"],
        "verified_score": 0,
        "journey_stage": "Learn",
        "roadmap": [],
        "roadmap_progress": 0,
        "ai_feedback": "Welcome to SyncSpace! Complete assessments and coding tests to earn verified badges.",
        "skill_gaps": [],
        "certifications": [],
        "projects": [],
        "achievements": [],
        "solved_problems": []
    }
    students_db[sid] = student
    return student

@router.get("/{student_id}")
def get_student(student_id: str):
    return _get_or_create_student(student_id)

@router.put("/{student_id}")
def update_student(student_id: str, req: StudentUpdate):
    student = _get_or_create_student(student_id)
    if req.name:
        student["name"] = req.name
    if req.skills is not None:
        student["skills"] = req.skills
    if req.target_role:
        student["target_role"] = req.target_role
    if req.college:
        student["college"] = req.college
    if req.branch:
        student["branch"] = req.branch
    if req.year:
        student["year"] = req.year
    if req.roadmap is not None:
        student["roadmap"] = req.roadmap
    if req.roadmap_progress is not None:
        student["roadmap_progress"] = req.roadmap_progress
    if req.verified_score is not None:
        student["verified_score"] = req.verified_score
    if req.journey_stage:
        student["journey_stage"] = req.journey_stage
        
    students_db[str(student_id)] = student
    return student

@router.post("/{student_id}/solve-problem")
def record_solved_problem(student_id: str, req: SolveProblemRequest):
    student = _get_or_create_student(student_id)
    pid = req.problem_id or req.problemId or 1
    
    solved = student.get("solved_problems", [])
    if pid not in solved:
        solved.append(pid)
        student["solved_problems"] = solved
        student["verified_score"] = min(100, student.get("verified_score", 0) + 10)
        student["journey_stage"] = "Code"
        students_db[str(student_id)] = student
        
    return {
        "message": "Problem solution recorded successfully!",
        "solved_problems": solved,
        "verified_score": student.get("verified_score", 0)
    }

@router.get("/{student_id}/journey")
def get_student_journey(student_id: str):
    student = _get_or_create_student(student_id)
    stages = ["Learn", "Practice", "Assess", "Code", "Mock Interview", "Verify", "Improve", "Get Hired"]
    return {
        "current_stage": student.get("journey_stage", "Learn"),
        "stages": stages,
        "roadmap": student.get("roadmap", []),
        "roadmap_progress": student.get("roadmap_progress", 0),
    }

@router.get("/{student_id}/recommendations")
def get_recommendations(student_id: str):
    student = _get_or_create_student(student_id)
    all_jobs = list(jobs_db.values())
    ranked = rank_jobs_for_student(student, all_jobs)
    return ranked[:10]
