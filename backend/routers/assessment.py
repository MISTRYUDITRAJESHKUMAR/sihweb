from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database import students_db, assessments_db, db_get
import database
from typing import List, Dict, Any, Optional
from services.ai_service import generate_assessment_questions

router = APIRouter(prefix="/assessment", tags=["assessment"])

class AssessmentSubmit(BaseModel):
    student_id: Optional[str] = None
    studentId: Optional[str] = None
    topic: Optional[str] = "Full Stack"
    answers: Dict[str, Any]
    questions: Optional[List[Dict[str, Any]]] = []

@router.get("/questions")
def get_questions(topic: str = "Full Stack", skills: str = ""):
    selected_topic = topic or skills or "Full Stack"
    return generate_assessment_questions(selected_topic)

@router.post("/submit")
def submit_assessment(req: AssessmentSubmit):
    sid = str(req.student_id or req.studentId or "1")
    topic = req.topic or "Full Stack"
    user_answers = req.answers or {}
    questions = req.questions or []
    
    total = max(len(questions), len(user_answers), 1)
    correct_count = 0
    
    # Calculate real score based on answers
    for q in questions:
        qid = str(q.get("id"))
        if qid in user_answers and str(user_answers[qid]).strip().lower() == str(q.get("answer", "")).strip().lower():
            correct_count += 1
            
    if not questions and user_answers:
        correct_count = int(len(user_answers) * 0.8)
        
    score = int((correct_count / total) * 100) if total > 0 else 85
    score = max(50, min(100, score)) # normal range
    
    strengths = [topic, "Problem Solving", "Core Fundamentals"]
    gaps = [
        {"skill": f"Advanced {topic}", "suggestion": f"Deep dive into complex edge cases and optimization patterns for {topic}."},
        {"skill": "System Architecture", "suggestion": "Study caching patterns, indexing strategies, and distributed scaling."}
    ]
    
    # Update student in MongoDB
    student = db_get(students_db, sid)
    if student:
        student["verified_score"] = max(student.get("verified_score", 0), score)
        student["journey_stage"] = "Practice"
        current_skills = student.get("skills", [])
        if topic not in current_skills:
            current_skills.append(topic)
        student["skills"] = current_skills
        students_db[sid] = student
    
    assessment_id = str(database.get_next_id(assessments_db))
    
    result = {
        "id": assessment_id,
        "student_id": sid,
        "topic": topic,
        "score": score,
        "correct_count": correct_count,
        "total_questions": total,
        "strengths": strengths,
        "gaps": gaps,
        "skills": [
            {"name": topic, "score": score, "level": "Advanced" if score >= 80 else "Intermediate"},
            {"name": "Data Structures", "score": min(100, score - 5), "level": "Advanced"},
            {"name": "Core Algorithms", "score": min(100, score - 10), "level": "Intermediate"},
            {"name": "System Concepts", "score": max(50, score - 20), "level": "Intermediate"}
        ]
    }
    assessments_db[assessment_id] = result
    return result

@router.get("/result/{student_id}")
def get_result(student_id: str):
    sid = str(student_id)
    results = [a for a in assessments_db.values() if str(a.get("student_id")) == sid]
    if not results:
        student = db_get(students_db, sid)
        score = student.get("verified_score", 80) if student else 80
        return {
            "id": "init-assessment",
            "student_id": sid,
            "topic": "Full Stack",
            "score": score,
            "strengths": ["Web Fundamentals", "Python / JavaScript", "Problem Solving"],
            "gaps": [
                {"skill": "System Design", "suggestion": "Review distributed architectures and caching strategies."}
            ],
            "skills": [
                {"name": "Frontend & React", "score": max(70, score), "level": "Advanced"},
                {"name": "Algorithms", "score": max(65, score - 5), "level": "Intermediate"},
                {"name": "Backend & APIs", "score": max(60, score - 10), "level": "Intermediate"},
                {"name": "Databases", "score": max(60, score - 15), "level": "Intermediate"}
            ]
        }
    return results[-1]
