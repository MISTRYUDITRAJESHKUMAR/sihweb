from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, Dict, Any
import database
from utils.auth_utils import hash_password, verify_password, create_token, get_current_user

router = APIRouter(tags=["auth"])


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    role: str
    # Optional role-specific fields
    college: Optional[str] = None
    branch: Optional[str] = None
    year: Optional[str] = None
    target_role: Optional[str] = None
    department: Optional[str] = None
    expertise: Optional[str] = None
    institution: Optional[str] = None
    company_name: Optional[str] = None
    domain: Optional[str] = None


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/register")
def register(req: RegisterRequest):
    req_email = req.email.strip().lower()
    for u in database.users_db.values():
        if str(u.get("email", "")).strip().lower() == req_email:
            raise HTTPException(status_code=400, detail="Email already registered")

    user_id = str(database.get_next_id(database.users_db))

    user = {
        "id": user_id,
        "email": req_email,
        "password": hash_password(req.password),
        "name": req.name,
        "role": req.role.lower(),
    }

    if req.role.lower() == "student":
        sid = str(database.get_next_id(database.students_db))
        user["student_id"] = sid
        database.students_db[sid] = {
            "id": sid,
            "user_id": user_id,
            "name": req.name,
            "email": req_email,
            "college": req.college or "",
            "branch": req.branch or "",
            "year": req.year or "",
            "target_role": req.target_role or "Full Stack Developer",
            "skills": ["HTML", "CSS", "JavaScript", "Python"],
            "verified_score": 0,
            "journey_stage": "Learn",
            "roadmap": [],
            "roadmap_progress": 0,
            "ai_feedback": "Welcome! Complete your skill assessment and coding tests to earn verified badges.",
            "skill_gaps": [],
            "certifications": [],
            "projects": [],
            "achievements": [],
        }
        database.portfolios_db[sid] = {
            "id": sid,
            "student_id": sid,
            "verified_skills": [],
            "certifications": [],
            "projects": [],
            "achievements": [],
            "resume_url": "",
        }
    elif req.role.lower() == "faculty":
        fid = str(database.get_next_id(database.faculty_db))
        user["faculty_id"] = fid
        expertise_list = [e.strip() for e in (req.expertise or "").split(",") if e.strip()]
        database.faculty_db[fid] = {
            "id": fid,
            "user_id": user_id,
            "name": req.name,
            "email": req_email,
            "department": req.department or "Computer Science & Engineering",
            "expertise": expertise_list or ["Artificial Intelligence", "Machine Learning"],
            "institution": req.institution or "Academic Institution",
            "opportunities_applied": [],
        }
    elif req.role.lower() == "industry":
        cid = str(database.get_next_id(database.companies_db))
        user["company_id"] = cid
        database.companies_db[cid] = {
            "id": cid,
            "user_id": user_id,
            "name": req.company_name or req.name,
            "domain": req.domain or "Technology",
            "description": "Innovative enterprise hiring verified engineering talent.",
            "logo_url": "",
            "contact_email": req_email,
        }

    database.users_db[user_id] = user

    token = create_token({"sub": str(user_id), "role": req.role.lower()})
    safe_user = {k: v for k, v in user.items() if k != "password"}
    return {"token": token, "user": safe_user}


@router.post("/login")
def login(req: LoginRequest):
    req_email = req.email.strip().lower()
    for u in database.users_db.values():
        if str(u.get("email", "")).strip().lower() == req_email:
            if verify_password(req.password, u.get("password", "")):
                token = create_token({"sub": str(u["id"]), "role": u["role"]})
                safe_user = {k: v for k, v in u.items() if k != "password"}
                
                # Attach role specific IDs if missing
                if safe_user.get("role") == "student" and "student_id" not in safe_user:
                    for s in database.students_db.values():
                        if str(s.get("user_id")) == str(u["id"]) or str(s.get("email")).lower() == req_email:
                            safe_user["student_id"] = str(s.get("id"))
                            break
                    if "student_id" not in safe_user:
                        safe_user["student_id"] = str(u["id"])
                        
                return {"token": token, "user": safe_user}
            else:
                raise HTTPException(status_code=400, detail="Invalid password")
    raise HTTPException(status_code=404, detail="User not found")


@router.get("/me")
def get_me(current_user: Dict[str, Any] = Depends(get_current_user)):
    safe_user = {k: v for k, v in current_user.items() if k != "password"}
    
    # If student, attach target_role and verified_score from student profile
    if safe_user.get("role") == "student":
        sid = safe_user.get("student_id") or str(safe_user.get("id"))
        student = database.db_get(database.students_db, sid)
        if student:
            safe_user["student_id"] = str(student.get("id"))
            safe_user["verified_score"] = student.get("verified_score", 0)
            safe_user["target_role"] = student.get("target_role", "Full Stack Developer")
            safe_user["journey_stage"] = student.get("journey_stage", "Learn")
            
    return safe_user
