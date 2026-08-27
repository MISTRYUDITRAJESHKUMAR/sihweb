from pydantic import BaseModel
from typing import List

class CourseResponse(BaseModel):
    id: int
    title: str
    provider: str
    description: str
    skills_covered: List[str]
    duration: str
    type: str
    difficulty: str
    enrolled_students: List[int]
    url: str

class EnrollmentCreate(BaseModel):
    student_id: int
    course_id: int

class EnrollmentResponse(BaseModel):
    id: int
    student_id: int
    course_id: int
    progress: int
    enrolled_date: str
    course_title: str
