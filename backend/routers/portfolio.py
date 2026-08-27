from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import portfolios_db, students_db
from typing import Optional, List, Dict, Any

router = APIRouter(prefix="/portfolio", tags=["portfolio"])

class PortfolioUpdate(BaseModel):
    bio: Optional[str] = None
    links: Optional[dict] = None

class CertificateItem(BaseModel):
    title: str
    issuer: Optional[str] = "Accredited Provider"
    provider: Optional[str] = None
    date: Optional[str] = "2026"
    year: Optional[str] = "2026"

class ProjectItem(BaseModel):
    title: str
    description: str
    tech_stack: Optional[List[str]] = []
    link: Optional[str] = None

class AchievementItem(BaseModel):
    title: str
    description: Optional[str] = ""

def _get_or_create_portfolio(sid: str):
    str_sid = str(sid)
    port = portfolios_db.get(str_sid)
    if not port:
        port = {
            "id": str_sid,
            "student_id": str_sid,
            "bio": "Passionate developer exploring cutting-edge technology.",
            "links": {"github": "https://github.com", "linkedin": "https://linkedin.com"},
            "skills": [
                {"name": "React", "level": 85},
                {"name": "Python", "level": 80},
                {"name": "FastAPI", "level": 75},
                {"name": "MongoDB", "level": 70}
            ],
            "certificates": [
                {"id": 1, "title": "AWS Solutions Architect Associate", "provider": "Amazon Web Services", "date": "2026-01-15", "verified": True},
                {"id": 2, "title": "Meta Front-End Developer Specialization", "provider": "Coursera", "date": "2025-11-20", "verified": True}
            ],
            "projects": [
                {
                    "id": 1, 
                    "title": "SyncSpace Collaboration Platform", 
                    "description": "Full stack AI-powered academia-industry career and collaboration platform with real-time analytics.", 
                    "tech_stack": ["React", "FastAPI", "MongoDB", "Tailwind CSS", "Gemini API"], 
                    "link": "github.com/syncspace/platform"
                }
            ],
            "achievements": [
                "1st Place in National Hackathon 2026", 
                "Open Source Contributor to Major Web Frameworks"
            ]
        }
        portfolios_db[str_sid] = port
    return port

@router.get("/{student_id}")
def get_portfolio(student_id: str):
    return _get_or_create_portfolio(student_id)

@router.put("/{student_id}")
def update_portfolio(student_id: str, req: PortfolioUpdate):
    port = _get_or_create_portfolio(student_id)
    if req.bio:
        port["bio"] = req.bio
    if req.links:
        port["links"] = req.links
    portfolios_db[str(student_id)] = port
    return port

@router.post("/{student_id}/certificate")
def add_certificate(student_id: str, req: CertificateItem):
    port = _get_or_create_portfolio(student_id)
    cert_data = req.dict()
    cert_data["id"] = len(port.get("certificates", [])) + 1
    cert_data["verified"] = True
    port["certificates"].append(cert_data)
    portfolios_db[str(student_id)] = port
    return port

@router.post("/{student_id}/project")
def add_project(student_id: str, req: ProjectItem):
    port = _get_or_create_portfolio(student_id)
    proj_data = req.dict()
    proj_data["id"] = len(port.get("projects", [])) + 1
    port["projects"].append(proj_data)
    portfolios_db[str(student_id)] = port
    return port

@router.post("/{student_id}/achievement")
def add_achievement(student_id: str, req: AchievementItem):
    port = _get_or_create_portfolio(student_id)
    port["achievements"].append(req.title)
    portfolios_db[str(student_id)] = port
    return port
