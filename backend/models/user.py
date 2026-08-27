from pydantic import BaseModel
from typing import Optional, List

class UserBase(BaseModel):
    name: str
    email: str
    role: str

class UserCreate(UserBase):
    password: str
    target_role: Optional[str] = None
    college: Optional[str] = None
    branch: Optional[str] = None
    year: Optional[str] = None
    department: Optional[str] = None
    expertise: Optional[List[str]] = None
    institution: Optional[str] = None
    domain: Optional[str] = None
    description: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    token: Optional[str] = None

class StudentProfile(BaseModel):
    id: int
    user_id: int
    name: str
    email: str
    college: str
    branch: str
    year: str
    target_role: str
    skills: List[str] = []
    verified_score: int = 0
    journey_stage: str = "Beginner"
    roadmap: List[dict] = []
    roadmap_progress: int = 0
    ai_feedback: str = ""
    skill_gaps: List[str] = []
    certifications: List[dict] = []
    projects: List[dict] = []
    achievements: List[dict] = []

class FacultyProfile(BaseModel):
    id: int
    user_id: int
    name: str
    email: str
    department: str
    expertise: List[str] = []
    institution: str
    opportunities_applied: List[int] = []

class IndustryProfile(BaseModel):
    id: int
    user_id: int
    name: str
    domain: str
    description: str
    logo_url: str = ""
    contact_email: str

class TokenResponse(BaseModel):
    token: str
    user: dict
