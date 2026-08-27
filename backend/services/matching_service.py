from typing import List, Dict, Any

def calculate_skill_match(student_skills: List[str], required_skills: List[str]) -> float:
    if not required_skills:
        return 100.0
    s_set = set(map(str.lower, student_skills))
    r_set = set(map(str.lower, required_skills))
    overlap = len(s_set.intersection(r_set))
    return round((overlap / len(r_set)) * 100, 2)

def rank_candidates_for_job(job: Dict[str, Any], all_students: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    job_skills = job.get("skills", [])
    ranked = []
    for student in all_students:
        match_score = calculate_skill_match(student.get("skills", []), job_skills)
        ranked.append({**student, "match_percentage": match_score})
    return sorted(ranked, key=lambda x: x["match_percentage"], reverse=True)

def rank_jobs_for_student(student: Dict[str, Any], all_jobs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    student_skills = student.get("skills", [])
    ranked = []
    for job in all_jobs:
        match_score = calculate_skill_match(student_skills, job.get("skills", []))
        ranked.append({**job, "match_percentage": match_score})
    return sorted(ranked, key=lambda x: x["match_percentage"], reverse=True)

def calculate_compatibility_score(student: Dict[str, Any], job: Dict[str, Any]) -> float:
    skill_match = calculate_skill_match(student.get("skills", []), job.get("skills", []))
    score = skill_match * 0.7 + student.get("verified_score", 0) * 0.2 + student.get("journey_stage", 1) * 2
    return min(100.0, score)
