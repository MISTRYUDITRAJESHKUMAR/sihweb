from pydantic import BaseModel
from typing import List, Optional

class Question(BaseModel):
    id: int
    text: str
    type: str
    options: Optional[List[str]] = None
    difficulty: str
    skill_tested: str

class AnswerInput(BaseModel):
    question_id: int
    answer: str

class AssessmentSubmission(BaseModel):
    student_id: int
    answers: List[AnswerInput]

class SkillLevel(BaseModel):
    name: str
    level: int

class SkillProfile(BaseModel):
    student_id: int
    skills: List[SkillLevel]
    overall_score: int
    gaps: List[str]
    strengths: List[str]
    recommendations: List[str]

class AptitudeQuestion(Question):
    pass

class TechnicalQuestion(Question):
    pass

class CodingChallenge(Question):
    pass
