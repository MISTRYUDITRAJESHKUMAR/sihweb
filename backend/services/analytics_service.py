from typing import List, Dict, Any

def compute_college_metrics(students: List[Dict[str, Any]], jobs: List[Dict[str, Any]], applications: List[Dict[str, Any]]) -> Dict[str, Any]:
    verified = [s for s in students if s.get("verified_score", 0) > 0]
    placed = [a for a in applications if a.get("status") == "Hired"]
    total_score = sum([s.get("verified_score", 0) for s in verified])
    
    return {
        "total_students": len(students),
        "verified_students": len(verified),
        "placed_students": len(placed),
        "avg_score": total_score / len(verified) if verified else 0,
        "active_internships": 15
    }

def compute_skill_distribution(students: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    counts = {}
    total_skills = 0
    for s in students:
        for skill in s.get("skills", []):
            counts[skill] = counts.get(skill, 0) + 1
            total_skills += 1
            
    res = []
    for skill, count in counts.items():
        res.append({"skill_name": skill, "count": count, "percentage": (count / total_skills) * 100 if total_skills else 0})
    return sorted(res, key=lambda x: x["count"], reverse=True)

def compute_placement_insights(students: List[Dict[str, Any]], applications: List[Dict[str, Any]]) -> Dict[str, Any]:
    placed = [a for a in applications if a.get("status") == "Hired"]
    return {
        "total_placed": len(placed),
        "avg_package": "8 LPA",
        "top_companies": ["Tech Corp", "Innovate Inc"],
        "placement_rate": (len(placed) / len(students)) * 100 if students else 0,
        "year_over_year": "+15%"
    }

def compute_industry_metrics(jobs: List[Dict[str, Any]], applications: List[Dict[str, Any]]) -> Dict[str, Any]:
    shortlisted = [a for a in applications if a.get("status") == "Shortlisted"]
    hired = [a for a in applications if a.get("status") == "Hired"]
    return {
        "open_positions": len(jobs),
        "total_applications": len(applications),
        "shortlisted": len(shortlisted),
        "hired": len(hired),
        "avg_time_to_hire": "18 days"
    }

def compute_skill_demand(jobs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    counts = {}
    for j in jobs:
        for skill in j.get("skills", []):
            counts[skill] = counts.get(skill, 0) + 1
    res = [{"skill": k, "demand_count": v} for k, v in counts.items()]
    return sorted(res, key=lambda x: x["demand_count"], reverse=True)
