from utils.auth_utils import hash_password
import database
from datetime import datetime


def seed_database():
    """Populates the database with initial mock data if empty."""
    if len(database.users_db.values()) > 0:
        print("Database already contains data, skipping seed.")
        return

    print("Seeding database with initial data...")
    hashed_pwd = hash_password("demo123")

    # ==================== 1. USERS ====================
    database.users_db = {
        1: {"id": 1, "name": "Rahul Sharma", "email": "student@demo.com", "password": hashed_pwd, "role": "student", "student_id": 1},
        2: {"id": 2, "name": "Dr. Ananya Gupta", "email": "faculty@demo.com", "password": hashed_pwd, "role": "faculty", "faculty_id": 1},
        3: {"id": 3, "name": "Tech Innovations Pvt Ltd", "email": "industry@demo.com", "password": hashed_pwd, "role": "industry", "company_id": 1},
        4: {"id": 4, "name": "Admin - IIT Delhi", "email": "college@demo.com", "password": hashed_pwd, "role": "college"},
        5: {"id": 5, "name": "Priya Patel", "email": "priya@demo.com", "password": hashed_pwd, "role": "student", "student_id": 2},
        6: {"id": 6, "name": "Arjun Singh", "email": "arjun@demo.com", "password": hashed_pwd, "role": "student", "student_id": 3},
        7: {"id": 7, "name": "Sneha Reddy", "email": "sneha@demo.com", "password": hashed_pwd, "role": "student", "student_id": 4},
        8: {"id": 8, "name": "Amit Kumar", "email": "amit@demo.com", "password": hashed_pwd, "role": "student", "student_id": 5},
        9: {"id": 9, "name": "Diya Verma", "email": "diya@demo.com", "password": hashed_pwd, "role": "student", "student_id": 6},
        10: {"id": 10, "name": "Karan Mehta", "email": "karan@demo.com", "password": hashed_pwd, "role": "student", "student_id": 7},
        11: {"id": 11, "name": "Nisha Joshi", "email": "nisha@demo.com", "password": hashed_pwd, "role": "student", "student_id": 8},
    }
    database.next_user_id = 12

    # ==================== 2. STUDENTS ====================
    database.students_db = {
        1: {
            "id": 1, "user_id": 1, "name": "Rahul Sharma", "email": "student@demo.com",
            "college": "IIT Delhi", "branch": "CSE", "year": "3rd", "target_role": "Python Full Stack Developer",
            "skills": ["Python", "React", "SQL", "FastAPI", "JavaScript", "Git"],
            "verified_score": 82, "journey_stage": "Code",
            "roadmap": ["Python Basics", "SQL & Database", "Web Fundamentals", "Django/FastAPI", "React.js", "APIs & Integration", "Projects", "Interview Prep"],
            "roadmap_progress": 65,
            "ai_feedback": "Strong backend skills. Needs improvement in frontend frameworks and system design.",
            "skill_gaps": ["Tailwind CSS", "TypeScript", "System Design", "Docker"],
            "certifications": [{"title": "Python for Everybody", "issuer": "Coursera", "date": "2025-06-15", "verified": True}],
            "projects": [{"title": "E-Commerce API", "description": "Built a REST API with FastAPI and MongoDB", "tech_stack": ["Python", "FastAPI", "MongoDB"], "url": "https://github.com/rahul/ecommerce-api"}],
            "achievements": [{"title": "Hackathon Winner", "description": "Won first prize at CodeFest 2025", "date": "2025-09-20"}],
        },
        2: {
            "id": 2, "user_id": 5, "name": "Priya Patel", "email": "priya@demo.com",
            "college": "IIT Delhi", "branch": "CSE", "year": "4th", "target_role": "Data Scientist",
            "skills": ["Python", "Machine Learning", "Pandas", "TensorFlow", "SQL", "Statistics"],
            "verified_score": 91, "journey_stage": "Get Hired",
            "roadmap": ["Statistics", "Python for Data Science", "Machine Learning", "Deep Learning", "NLP", "Projects", "Interview Prep"],
            "roadmap_progress": 95,
            "ai_feedback": "Excellent analytical skills. Strong ML fundamentals. Ready for placement.",
            "skill_gaps": ["MLOps", "Cloud Deployment"],
            "certifications": [{"title": "Machine Learning Specialization", "issuer": "Stanford/Coursera", "date": "2025-08-10", "verified": True}],
            "projects": [{"title": "Sentiment Analysis Engine", "description": "NLP-based sentiment classifier for product reviews", "tech_stack": ["Python", "TensorFlow", "NLP"], "url": ""}],
            "achievements": [{"title": "Kaggle Expert", "description": "Reached Expert tier on Kaggle", "date": "2025-07-15"}],
        },
        3: {
            "id": 3, "user_id": 6, "name": "Arjun Singh", "email": "arjun@demo.com",
            "college": "NIT Trichy", "branch": "IT", "year": "3rd", "target_role": "DevOps Engineer",
            "skills": ["Linux", "Docker", "AWS", "Python", "Bash", "CI/CD"],
            "verified_score": 75, "journey_stage": "Mock Interview",
            "roadmap": ["Linux Fundamentals", "Docker & Containers", "CI/CD Pipelines", "AWS Services", "Kubernetes", "Monitoring", "Projects"],
            "roadmap_progress": 70,
            "ai_feedback": "Good DevOps fundamentals. Practice more Kubernetes and monitoring tools.",
            "skill_gaps": ["Kubernetes", "Terraform", "Monitoring"],
            "certifications": [], "projects": [], "achievements": [],
        },
        4: {
            "id": 4, "user_id": 7, "name": "Sneha Reddy", "email": "sneha@demo.com",
            "college": "BITS Pilani", "branch": "CSE", "year": "2nd", "target_role": "Frontend Developer",
            "skills": ["HTML", "CSS", "JavaScript", "React"],
            "verified_score": 0, "journey_stage": "Practice",
            "roadmap": ["HTML/CSS", "JavaScript", "React.js", "TypeScript", "Next.js", "UI/UX", "Projects"],
            "roadmap_progress": 35,
            "ai_feedback": "Just started the journey. Focus on JavaScript fundamentals first.",
            "skill_gaps": ["TypeScript", "Next.js", "Tailwind CSS", "Testing"],
            "certifications": [], "projects": [], "achievements": [],
        },
        5: {
            "id": 5, "user_id": 8, "name": "Amit Kumar", "email": "amit@demo.com",
            "college": "IIT Bombay", "branch": "ECE", "year": "4th", "target_role": "ML Engineer",
            "skills": ["Python", "PyTorch", "Computer Vision", "Deep Learning", "C++"],
            "verified_score": 88, "journey_stage": "Verify",
            "roadmap": ["Python", "Linear Algebra", "ML Basics", "Deep Learning", "Computer Vision", "Model Deployment", "Projects"],
            "roadmap_progress": 85,
            "ai_feedback": "Strong in deep learning and computer vision. Ready for ML engineering roles.",
            "skill_gaps": ["Model Deployment", "MLOps"],
            "certifications": [{"title": "Deep Learning Specialization", "issuer": "DeepLearning.AI", "date": "2025-05-20", "verified": True}],
            "projects": [{"title": "Object Detection System", "description": "Real-time object detection using YOLOv8", "tech_stack": ["Python", "PyTorch", "OpenCV"], "url": ""}],
            "achievements": [],
        },
        6: {
            "id": 6, "user_id": 9, "name": "Diya Verma", "email": "diya@demo.com",
            "college": "IIT Delhi", "branch": "CSE", "year": "3rd", "target_role": "Cybersecurity Analyst",
            "skills": ["Networking", "Linux", "Python", "Ethical Hacking"],
            "verified_score": 68, "journey_stage": "Assess",
            "roadmap": ["Networking", "Linux Security", "Ethical Hacking", "Penetration Testing", "Forensics", "Cloud Security", "Projects"],
            "roadmap_progress": 45,
            "ai_feedback": "Good networking knowledge. Need to practice more penetration testing.",
            "skill_gaps": ["Penetration Testing", "Cloud Security", "SIEM"],
            "certifications": [], "projects": [], "achievements": [],
        },
        7: {
            "id": 7, "user_id": 10, "name": "Karan Mehta", "email": "karan@demo.com",
            "college": "NIT Warangal", "branch": "CSE", "year": "4th", "target_role": "Mobile App Developer",
            "skills": ["Flutter", "Dart", "Firebase", "Java", "Kotlin"],
            "verified_score": 79, "journey_stage": "Improve",
            "roadmap": ["Java/Kotlin", "Flutter/Dart", "Firebase", "State Management", "API Integration", "UI/UX Mobile", "Projects"],
            "roadmap_progress": 80,
            "ai_feedback": "Good mobile dev skills. Improve state management and testing.",
            "skill_gaps": ["Testing", "CI/CD for Mobile", "Performance Optimization"],
            "certifications": [], "projects": [], "achievements": [],
        },
        8: {
            "id": 8, "user_id": 11, "name": "Nisha Joshi", "email": "nisha@demo.com",
            "college": "IIIT Hyderabad", "branch": "IT", "year": "3rd", "target_role": "Cloud Architect",
            "skills": ["AWS", "Azure", "Python", "Docker", "Terraform"],
            "verified_score": 72, "journey_stage": "Code",
            "roadmap": ["Cloud Basics", "AWS Core Services", "Networking", "Security", "Terraform", "Kubernetes", "Architecture Design"],
            "roadmap_progress": 55,
            "ai_feedback": "Good cloud fundamentals. Need to work on architecture design patterns.",
            "skill_gaps": ["Kubernetes", "Architecture Patterns", "Cost Optimization"],
            "certifications": [{"title": "AWS Cloud Practitioner", "issuer": "AWS", "date": "2025-04-10", "verified": True}],
            "projects": [], "achievements": [],
        },
    }
    database.next_student_id = 9

    # ==================== 3. COMPANIES ====================
    database.companies_db = {
        1: {"id": 1, "user_id": 3, "name": "Tech Innovations Pvt Ltd", "domain": "IT Services & Consulting", "description": "Leading technology solutions provider in India.", "logo_url": "", "contact_email": "industry@demo.com"},
        2: {"id": 2, "user_id": 0, "name": "AI Labs India", "domain": "Artificial Intelligence", "description": "Cutting-edge AI research and solutions.", "logo_url": "", "contact_email": "hr@ailabs.in"},
        3: {"id": 3, "user_id": 0, "name": "DataVerse Solutions", "domain": "Data Analytics", "description": "Big data and analytics platform company.", "logo_url": "", "contact_email": "careers@dataverse.com"},
        4: {"id": 4, "user_id": 0, "name": "CloudScale Technologies", "domain": "Cloud Computing", "description": "Cloud infrastructure and DevOps solutions.", "logo_url": "", "contact_email": "hr@cloudscale.io"},
        5: {"id": 5, "user_id": 0, "name": "CyberShield Systems", "domain": "Cybersecurity", "description": "Enterprise cybersecurity solutions.", "logo_url": "", "contact_email": "jobs@cybershield.in"},
    }
    database.next_company_id = 6

    # ==================== 4. JOBS ====================
    database.jobs_db = {
        1: {"id": 1, "company_id": 1, "company_name": "Tech Innovations Pvt Ltd", "role": "Python Full Stack Developer", "description": "Build and maintain web applications using Python, FastAPI, and React.", "req_skills": ["Python", "FastAPI", "React", "SQL"], "type": "Job", "location": "Bangalore", "stipend": "8-12 LPA", "duration": "Full-time", "posted_date": "2026-08-01", "status": "Open", "applications": []},
        2: {"id": 2, "company_id": 1, "company_name": "Tech Innovations Pvt Ltd", "role": "Frontend Developer Intern", "description": "Work on building modern UI components with React and Tailwind CSS.", "req_skills": ["React", "JavaScript", "Tailwind CSS", "HTML"], "type": "Internship", "location": "Remote", "stipend": "15,000/month", "duration": "3 months", "posted_date": "2026-08-05", "status": "Open", "applications": []},
        3: {"id": 3, "company_id": 2, "company_name": "AI Labs India", "role": "Data Scientist", "description": "Develop and deploy machine learning models for production systems.", "req_skills": ["Python", "Machine Learning", "TensorFlow", "SQL", "Statistics"], "type": "Job", "location": "Hyderabad", "stipend": "10-15 LPA", "duration": "Full-time", "posted_date": "2026-08-03", "status": "Open", "applications": []},
        4: {"id": 4, "company_id": 2, "company_name": "AI Labs India", "role": "ML Research Intern", "description": "Research and implement state-of-the-art ML algorithms.", "req_skills": ["Python", "PyTorch", "Deep Learning", "Research"], "type": "Internship", "location": "Bangalore", "stipend": "25,000/month", "duration": "6 months", "posted_date": "2026-08-10", "status": "Open", "applications": []},
        5: {"id": 5, "company_id": 3, "company_name": "DataVerse Solutions", "role": "Data Analyst", "description": "Analyze business data and create insightful dashboards.", "req_skills": ["Python", "SQL", "Pandas", "Tableau", "Statistics"], "type": "Job", "location": "Mumbai", "stipend": "6-9 LPA", "duration": "Full-time", "posted_date": "2026-08-07", "status": "Open", "applications": []},
        6: {"id": 6, "company_id": 3, "company_name": "DataVerse Solutions", "role": "Data Engineering Intern", "description": "Build ETL pipelines and data infrastructure.", "req_skills": ["Python", "SQL", "Apache Spark", "AWS"], "type": "Internship", "location": "Remote", "stipend": "20,000/month", "duration": "4 months", "posted_date": "2026-08-12", "status": "Open", "applications": []},
        7: {"id": 7, "company_id": 4, "company_name": "CloudScale Technologies", "role": "DevOps Engineer", "description": "Manage cloud infrastructure and CI/CD pipelines.", "req_skills": ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD"], "type": "Job", "location": "Pune", "stipend": "9-14 LPA", "duration": "Full-time", "posted_date": "2026-08-02", "status": "Open", "applications": []},
        8: {"id": 8, "company_id": 4, "company_name": "CloudScale Technologies", "role": "Cloud Engineering Intern", "description": "Learn and implement cloud solutions on AWS.", "req_skills": ["AWS", "Python", "Linux", "Docker"], "type": "Internship", "location": "Remote", "stipend": "18,000/month", "duration": "3 months", "posted_date": "2026-08-15", "status": "Open", "applications": []},
        9: {"id": 9, "company_id": 5, "company_name": "CyberShield Systems", "role": "Cybersecurity Analyst", "description": "Monitor and respond to security threats.", "req_skills": ["Networking", "Linux", "Ethical Hacking", "SIEM", "Python"], "type": "Job", "location": "Delhi", "stipend": "7-11 LPA", "duration": "Full-time", "posted_date": "2026-08-04", "status": "Open", "applications": []},
        10: {"id": 10, "company_id": 5, "company_name": "CyberShield Systems", "role": "Security Intern", "description": "Assist in vulnerability assessments and security audits.", "req_skills": ["Networking", "Linux", "Python"], "type": "Internship", "location": "Delhi", "stipend": "12,000/month", "duration": "3 months", "posted_date": "2026-08-18", "status": "Open", "applications": []},
        11: {"id": 11, "company_id": 1, "company_name": "Tech Innovations Pvt Ltd", "role": "Mobile App Developer", "description": "Build cross-platform mobile apps with Flutter.", "req_skills": ["Flutter", "Dart", "Firebase", "REST APIs"], "type": "Job", "location": "Bangalore", "stipend": "7-10 LPA", "duration": "Full-time", "posted_date": "2026-08-08", "status": "Open", "applications": []},
        12: {"id": 12, "company_id": 2, "company_name": "AI Labs India", "role": "Computer Vision Engineer", "description": "Develop computer vision solutions for industrial applications.", "req_skills": ["Python", "PyTorch", "Computer Vision", "OpenCV", "Deep Learning"], "type": "Job", "location": "Bangalore", "stipend": "12-18 LPA", "duration": "Full-time", "posted_date": "2026-08-06", "status": "Open", "applications": []},
        13: {"id": 13, "company_id": 3, "company_name": "DataVerse Solutions", "role": "Business Intelligence Intern", "description": "Create dashboards and automate reporting.", "req_skills": ["SQL", "Python", "Tableau", "Excel"], "type": "Internship", "location": "Mumbai", "stipend": "15,000/month", "duration": "3 months", "posted_date": "2026-08-20", "status": "Open", "applications": []},
        14: {"id": 14, "company_id": 4, "company_name": "CloudScale Technologies", "role": "Site Reliability Engineer", "description": "Ensure system reliability and performance.", "req_skills": ["Linux", "Kubernetes", "Monitoring", "Python", "AWS"], "type": "Job", "location": "Pune", "stipend": "10-16 LPA", "duration": "Full-time", "posted_date": "2026-08-09", "status": "Open", "applications": []},
        15: {"id": 15, "company_id": 1, "company_name": "Tech Innovations Pvt Ltd", "role": "Backend Developer Apprentice", "description": "Learn backend development with mentorship.", "req_skills": ["Python", "SQL", "Git"], "type": "Apprenticeship", "location": "Bangalore", "stipend": "10,000/month", "duration": "6 months", "posted_date": "2026-08-22", "status": "Open", "applications": []},
    }
    database.next_job_id = 16

    # ==================== 5. COURSES ====================
    database.courses_db = {
        1: {"id": 1, "title": "Python Mastery: From Beginner to Advanced", "provider": "Coursera", "description": "Complete Python programming course covering basics to advanced concepts.", "skills_covered": ["Python", "OOP", "Algorithms"], "duration": "40 hours", "type": "Course", "difficulty": "Beginner", "enrolled_students": [1, 4], "url": "https://coursera.org/python"},
        2: {"id": 2, "title": "React - The Complete Guide", "provider": "Udemy", "description": "Master React including Hooks, Redux, React Router and Next.js.", "skills_covered": ["React", "JavaScript", "Redux", "Next.js"], "duration": "60 hours", "type": "Course", "difficulty": "Intermediate", "enrolled_students": [1], "url": "https://udemy.com/react"},
        3: {"id": 3, "title": "Machine Learning A-Z", "provider": "Coursera", "description": "Comprehensive machine learning course with hands-on projects.", "skills_covered": ["Machine Learning", "Python", "Statistics", "Scikit-learn"], "duration": "55 hours", "type": "Course", "difficulty": "Intermediate", "enrolled_students": [2, 5], "url": ""},
        4: {"id": 4, "title": "AWS Cloud Practitioner Certification", "provider": "AWS", "description": "Prepare for the AWS Cloud Practitioner certification exam.", "skills_covered": ["AWS", "Cloud Computing", "Security"], "duration": "20 hours", "type": "Certification", "difficulty": "Beginner", "enrolled_students": [3, 8], "url": ""},
        5: {"id": 5, "title": "Docker & Kubernetes Bootcamp", "provider": "KodeKloud", "description": "Master containerization with Docker and orchestration with Kubernetes.", "skills_covered": ["Docker", "Kubernetes", "DevOps"], "duration": "30 hours", "type": "Course", "difficulty": "Intermediate", "enrolled_students": [3], "url": ""},
        6: {"id": 6, "title": "Ethical Hacking Masterclass", "provider": "Udemy", "description": "Learn penetration testing and ethical hacking from scratch.", "skills_covered": ["Ethical Hacking", "Networking", "Linux", "Penetration Testing"], "duration": "45 hours", "type": "Course", "difficulty": "Intermediate", "enrolled_students": [6], "url": ""},
        7: {"id": 7, "title": "Flutter App Development Workshop", "provider": "Google", "description": "Build beautiful cross-platform apps with Flutter.", "skills_covered": ["Flutter", "Dart", "Mobile Development"], "duration": "25 hours", "type": "Workshop", "difficulty": "Beginner", "enrolled_students": [7], "url": ""},
        8: {"id": 8, "title": "System Design Fundamentals", "provider": "Educative", "description": "Learn system design concepts for technical interviews.", "skills_covered": ["System Design", "Distributed Systems", "Scalability"], "duration": "35 hours", "type": "Course", "difficulty": "Advanced", "enrolled_students": [], "url": ""},
        9: {"id": 9, "title": "Deep Learning Specialization", "provider": "DeepLearning.AI", "description": "Master deep learning fundamentals and applications.", "skills_covered": ["Deep Learning", "TensorFlow", "Neural Networks", "Computer Vision"], "duration": "70 hours", "type": "Certification", "difficulty": "Advanced", "enrolled_students": [5], "url": ""},
        10: {"id": 10, "title": "SQL for Data Science", "provider": "DataCamp", "description": "Learn SQL for data analysis and manipulation.", "skills_covered": ["SQL", "Data Analysis", "Database"], "duration": "15 hours", "type": "Course", "difficulty": "Beginner", "enrolled_students": [4, 6], "url": ""},
    }
    database.next_course_id = 11

    # ==================== 6. FACULTY ====================
    database.faculty_db = {
        1: {"id": 1, "user_id": 2, "name": "Dr. Ananya Gupta", "email": "faculty@demo.com", "department": "Computer Science", "expertise": ["Artificial Intelligence", "Machine Learning", "Data Science"], "institution": "IIT Delhi", "opportunities_applied": []},
        2: {"id": 2, "user_id": 0, "name": "Dr. Rajesh Iyer", "email": "rajesh@iitd.ac.in", "department": "Information Technology", "expertise": ["Cloud Computing", "DevOps", "Distributed Systems"], "institution": "IIT Delhi", "opportunities_applied": []},
        3: {"id": 3, "user_id": 0, "name": "Prof. Meera Nair", "email": "meera@nitk.ac.in", "department": "Electronics", "expertise": ["IoT", "Embedded Systems", "VLSI"], "institution": "NIT Karnataka", "opportunities_applied": []},
        4: {"id": 4, "user_id": 0, "name": "Dr. Suresh Patil", "email": "suresh@bits.ac.in", "department": "Computer Science", "expertise": ["Cybersecurity", "Networking", "Blockchain"], "institution": "BITS Pilani", "opportunities_applied": []},
        5: {"id": 5, "user_id": 0, "name": "Prof. Kavita Das", "email": "kavita@iiith.ac.in", "department": "Computer Science", "expertise": ["NLP", "Computer Vision", "Deep Learning"], "institution": "IIIT Hyderabad", "opportunities_applied": []},
    }
    database.next_faculty_id = 6

    # ==================== 7. FACULTY OPPORTUNITIES ====================
    database.faculty_opportunities_db = {
        1: {"id": 1, "title": "AI/ML Faculty Development Program", "type": "FDP", "description": "5-day intensive FDP on latest AI/ML techniques and pedagogy.", "organization": "AICTE & Google", "duration": "5 days", "req_expertise": ["AI", "Machine Learning"], "applications": []},
        2: {"id": 2, "title": "Industrial Training at TCS Innovation Lab", "type": "Industrial Training", "description": "8-week training on enterprise software development practices.", "organization": "TCS", "duration": "8 weeks", "req_expertise": ["Software Engineering"], "applications": []},
        3: {"id": 3, "title": "Cloud Architecture Consultancy", "type": "Consultancy", "description": "Consultancy project for migrating legacy systems to cloud.", "organization": "CloudScale Technologies", "duration": "3 months", "req_expertise": ["Cloud Computing", "AWS"], "applications": []},
        4: {"id": 4, "title": "Cybersecurity Research Fellowship", "type": "Research", "description": "Research fellowship on AI-driven threat detection systems.", "organization": "CyberShield Systems", "duration": "6 months", "req_expertise": ["Cybersecurity", "AI"], "applications": []},
        5: {"id": 5, "title": "Data Science Workshop for Faculty", "type": "FDP", "description": "Hands-on workshop on data science tools and methodologies.", "organization": "DataVerse Solutions & NASSCOM", "duration": "3 days", "req_expertise": ["Data Science", "Python"], "applications": []},
    }
    database.next_faculty_opportunity_id = 6

    # ==================== 8. COLLABORATIONS ====================
    database.collaborations_db = {
        1: {"id": 1, "title": "AI in Healthcare Research", "type": "Research", "description": "Joint research project on AI-driven diagnostics.", "industry_partner": "AI Labs India", "institution": "IIT Delhi", "status": "Active"},
        2: {"id": 2, "title": "Industry Mentorship Program", "type": "Mentorship", "description": "Senior engineers mentor final year students on real projects.", "industry_partner": "Tech Innovations Pvt Ltd", "institution": "IIT Delhi", "status": "Active"},
        3: {"id": 3, "title": "Cloud Computing Workshop Series", "type": "Workshop", "description": "Monthly workshops on AWS services and best practices.", "industry_partner": "CloudScale Technologies", "institution": "NIT Trichy", "status": "Active"},
        4: {"id": 4, "title": "Hackathon: Secure India Challenge", "type": "Innovation Challenge", "description": "National hackathon on cybersecurity solutions.", "industry_partner": "CyberShield Systems", "institution": "BITS Pilani", "status": "Upcoming"},
        5: {"id": 5, "title": "Guest Lecture Series: Industry 4.0", "type": "Guest Lecture", "description": "Weekly guest lectures by industry experts on emerging technologies.", "industry_partner": "DataVerse Solutions", "institution": "IIIT Hyderabad", "status": "Active"},
    }
    database.next_collaboration_id = 6

    # ==================== 9. SAMPLE APPLICATIONS ====================
    database.applications_db = {
        1: {"id": 1, "student_id": 1, "job_id": 1, "status": "Shortlisted", "applied_date": "2026-08-15", "notes": "Strong Python skills"},
        2: {"id": 2, "student_id": 2, "job_id": 3, "status": "Selected", "applied_date": "2026-08-10", "notes": "Excellent ML background"},
        3: {"id": 3, "student_id": 3, "job_id": 7, "status": "Under Review", "applied_date": "2026-08-18", "notes": ""},
        4: {"id": 4, "student_id": 5, "job_id": 4, "status": "Shortlisted", "applied_date": "2026-08-12", "notes": "Strong deep learning skills"},
        5: {"id": 5, "student_id": 6, "job_id": 9, "status": "Applied", "applied_date": "2026-08-20", "notes": ""},
    }
    database.next_application_id = 6

    # ==================== 10. PORTFOLIOS ====================
    for sid, student in database.students_db.items():
        database.portfolios_db[sid] = {
            "student_id": sid,
            "verified_skills": [{"name": s, "level": "intermediate", "score": 70} for s in student.get("skills", [])],
            "certifications": student.get("certifications", []),
            "projects": student.get("projects", []),
            "achievements": student.get("achievements", []),
            "resume_url": "",
        }

    # ==================== 11. ENROLLMENTS ====================
    database.enrollments_db = {
        1: {"id": 1, "student_id": 1, "course_id": 1, "progress": 85, "enrolled_date": "2026-06-01"},
        2: {"id": 2, "student_id": 1, "course_id": 2, "progress": 60, "enrolled_date": "2026-07-15"},
        3: {"id": 3, "student_id": 2, "course_id": 3, "progress": 100, "enrolled_date": "2026-05-01"},
        4: {"id": 4, "student_id": 3, "course_id": 4, "progress": 45, "enrolled_date": "2026-07-01"},
        5: {"id": 5, "student_id": 5, "course_id": 9, "progress": 90, "enrolled_date": "2026-04-15"},
    }
    database.next_enrollment_id = 6

    print(f"Seeding completed! {len(database.students_db)} students, {len(database.jobs_db)} jobs, {len(database.courses_db)} courses loaded.")
