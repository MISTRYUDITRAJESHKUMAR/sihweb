from pydantic import BaseModel
from typing import List, Optional

class JobCreate(BaseModel):
    role: str
    description: str
    req_skills: List[str]
    type: str
    location: str
    stipend: str
    duration: str

class JobResponse(BaseModel):
    id: int
    company_id: int
    company_name: str
    role: str
    description: str
    req_skills: List[str]
    type: str
    location: str
    stipend: str
    duration: str
    posted_date: str
    status: str
    match_percentage: Optional[int] = None

class ApplicationCreate(BaseModel):
    student_id: int
    job_id: int

class ApplicationResponse(BaseModel):
    id: int
    student_id: int
    job_id: int
    status: str
    applied_date: str
    notes: str
    job_details: JobResponse
