from pydantic import BaseModel
from typing import List, Optional

class CertificateAdd(BaseModel):
    title: str
    issuer: str
    date: str
    url: Optional[str] = None

class ProjectAdd(BaseModel):
    title: str
    description: str
    tech_stack: List[str]
    url: Optional[str] = None

class AchievementAdd(BaseModel):
    title: str
    description: str
    date: str

class PortfolioResponse(BaseModel):
    student_id: int
    verified_skills: List[str]
    certifications: List[dict]
    projects: List[dict]
    achievements: List[dict]
    resume_url: str
