from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from database import interviews_db, students_db, db_get
import database
from services.ai_service import conduct_mock_interview, evaluate_interview

router = APIRouter(prefix="/interview", tags=["interview"])

class StartInterview(BaseModel):
    student_id: Optional[str] = None
    studentId: Optional[str] = None
    target_role: Optional[str] = None
    targetRole: Optional[str] = None

class AnswerSubmit(BaseModel):
    session_id: Optional[str] = None
    answer: str

class EvaluateSession(BaseModel):
    session_id: Optional[str] = None

@router.post("/start")
def start_interview(req: StartInterview):
    sid = str(req.student_id or req.studentId or "1")
    role = req.target_role or req.targetRole or "Full Stack Developer"
    
    session_id = str(database.get_next_id(interviews_db))
    
    question = conduct_mock_interview(role, 1)
    
    session = {
        "id": session_id,
        "student_id": sid,
        "role": role,
        "answers": [],
        "dialogue": [f"AI: {question}"],
        "current_question_index": 1,
        "status": "In Progress"
    }
    interviews_db[session_id] = session
    return {"session_id": session_id, "question": question}

@router.post("/{session_id}/answer")
def submit_answer_by_param(session_id: str, req: AnswerSubmit):
    session = db_get(interviews_db, str(session_id))
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session["answers"].append(req.answer)
    session["dialogue"].append(f"User: {req.answer}")
    session["current_question_index"] += 1
    
    chat_context = "\n".join(session.get("dialogue", []))
    next_question = conduct_mock_interview(session["role"], session["current_question_index"], req.answer, chat_context)
    
    session["dialogue"].append(f"AI: {next_question}")
    interviews_db[str(session_id)] = session
    
    return {"next_question": next_question, "feedback": "Response recorded."}

@router.post("/answer")
def submit_answer_by_body(req: AnswerSubmit):
    session_id = req.session_id
    if not session_id:
        raise HTTPException(status_code=400, detail="Session ID required")
    return submit_answer_by_param(session_id, req)

@router.post("/{session_id}/evaluate")
def evaluate_session_by_param(session_id: str):
    session = db_get(interviews_db, str(session_id))
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    session["status"] = "Completed"
    evaluation = evaluate_interview(session.get("answers", []), session.get("role", "Software Engineer"))
    session["score"] = evaluation.get("overall_score", 85)
    interviews_db[str(session_id)] = session
    
    sid = str(session.get("student_id", "1"))
    student = db_get(students_db, sid)
    if student:
        student["verified_score"] = max(student.get("verified_score", 0), evaluation.get("overall_score", 85))
        student["journey_stage"] = "Verify"
        students_db[sid] = student
        
    return evaluation

@router.post("/evaluate")
def evaluate_session_by_body(req: EvaluateSession):
    session_id = req.session_id
    if not session_id:
        raise HTTPException(status_code=400, detail="Session ID required")
    return evaluate_session_by_param(session_id)

@router.get("/history/{student_id}")
def get_history(student_id: str):
    sid = str(student_id)
    return [i for i in interviews_db.values() if str(i.get("student_id")) == sid]
