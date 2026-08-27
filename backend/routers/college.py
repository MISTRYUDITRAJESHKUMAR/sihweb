from fastapi import APIRouter
from database import students_db, collaborations_db, jobs_db, applications_db
from services.analytics_service import compute_college_metrics, compute_skill_distribution, compute_placement_insights

router = APIRouter(prefix="/college", tags=["college"])

@router.get("/dashboard")
def get_dashboard():
    return compute_college_metrics(list(students_db.values()), list(jobs_db.values()), list(applications_db.values()))

@router.get("/skills")
@router.get("/skill-analytics")
def get_skill_analytics():
    return compute_skill_distribution(list(students_db.values()))

@router.get("/placements")
@router.get("/placement-insights")
def get_placement_insights():
    return compute_placement_insights(list(students_db.values()), list(applications_db.values()))

@router.get("/students/progress")
@router.get("/student-progress")
def get_student_progress():
    return list(students_db.values())

@router.get("/collaborations")
@router.get("/industry-collaboration")
def get_collaborations():
    return list(collaborations_db.values())
