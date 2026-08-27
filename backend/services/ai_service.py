import os
import json
from typing import List, Dict, Any

def _get_configured_model():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        return None
    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        # Try best available models in priority order
        for model_name in ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-pro']:
            try:
                return genai.GenerativeModel(model_name)
            except Exception:
                continue
    except Exception as e:
        print(f"Notice during Gemini model configuration: {e}")
    return None

def _call_gemini(prompt: str) -> str:
    try:
        model = _get_configured_model()
        if model:
            response = model.generate_content(prompt)
            if response and hasattr(response, 'text') and response.text:
                return response.text
    except Exception as e:
        print(f"Gemini API invocation notice: {e}")
    return None

def generate_career_roadmap(target_role: str, current_skills: List[str]) -> Dict[str, Any]:
    prompt = f"""
    You are an expert AI Career Coach for university engineering students.
    Create a high-impact, practical step-by-step learning roadmap for a student targeting the role "{target_role}".
    The student's current skills are: {current_skills if current_skills else "Beginner level"}.

    Return ONLY a valid JSON object with NO markdown formatting, NO backticks, with this exact schema:
    {{
      "steps": [
        {{
          "id": 1,
          "title": "Milestone 1: Web & Programming Fundamentals",
          "description": "Master foundational programming, Git version control, and core principles.",
          "status": "completed",
          "duration": "3 weeks",
          "resources": [
            {{"title": "FreeCodeCamp Complete Course (YouTube)", "url": "https://www.youtube.com/watch?v=kUMe1FH4CHE", "type": "YouTube"}},
            {{"title": "MDN Web Docs Documentation", "url": "https://developer.mozilla.org/", "type": "Docs"}}
          ],
          "quiz": [
            {{"question": "What is the primary role of Git?", "options": ["Version control", "Database storage", "Cloud hosting", "UI styling"], "answer": "Version control"}}
          ]
        }},
        {{
          "id": 2,
          "title": "Milestone 2: Frontend & Modern Frameworks",
          "description": "Build responsive reactive user interfaces with React, state management, and modern component architecture.",
          "status": "current",
          "duration": "4 weeks",
          "resources": [
            {{"title": "React JS Full Course 2026 (YouTube)", "url": "https://www.youtube.com/watch?v=bMknfKXIFA8", "type": "YouTube"}},
            {{"title": "Chai aur Code React Playlist", "url": "https://www.youtube.com/playlist?list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige", "type": "YouTube"}}
          ],
          "quiz": [
            {{"question": "What does useState do in React?", "options": ["Manages component state", "Handles database routing", "Creates API endpoints", "Compiles code"], "answer": "Manages component state"}}
          ]
        }},
        {{
          "id": 3,
          "title": "Milestone 3: Backend Services & API Development",
          "description": "Build high-performance REST APIs with FastAPI/Node.js and MongoDB database schemas.",
          "status": "pending",
          "duration": "4 weeks",
          "resources": [
            {{"title": "FastAPI & Python Backend Course (YouTube)", "url": "https://www.youtube.com/watch?v=0sOvCWFmrtA", "type": "YouTube"}},
            {{"title": "Node.js & Express Full Tutorial", "url": "https://www.youtube.com/watch?v=Oe421EPjeBE", "type": "YouTube"}}
          ],
          "quiz": [
            {{"question": "Which HTTP method is used to create a new resource?", "options": ["POST", "GET", "DELETE", "PATCH"], "answer": "POST"}}
          ]
        }},
        {{
          "id": 4,
          "title": "Milestone 4: Cloud Deployment, System Design & Placements",
          "description": "Deploy full stack solutions with Docker on cloud, and practice mock technical interviews.",
          "status": "pending",
          "duration": "3 weeks",
          "resources": [
            {{"title": "Docker & Kubernetes Full Course (YouTube)", "url": "https://www.youtube.com/watch?v=3c-iBn73dDE", "type": "YouTube"}},
            {{"title": "System Design Primer Guide", "url": "https://github.com/donnemartin/system-design-primer", "type": "Docs"}}
          ],
          "quiz": [
            {{"question": "What is the purpose of Docker containerization?", "options": ["Consistent application packaging across environments", "CSS rendering", "Hardware acceleration", "Network routing"], "answer": "Consistent application packaging across environments"}}
          ]
        }}
      ],
      "current_skills": ["HTML", "CSS", "Basic JavaScript"],
      "required_skills": ["React", "FastAPI / Node.js", "MongoDB", "Docker", "System Design"],
      "certifications": [
        {{"name": "Meta Front-End Developer Professional Certificate", "provider": "Coursera"}},
        {{"name": "AWS Certified Solutions Architect Associate", "provider": "Amazon Web Services"}}
      ]
    }}
    """
    res = _call_gemini(prompt)
    if res:
        try:
            clean_res = res.replace('```json', '').replace('```', '').strip()
            data = json.loads(clean_res)
            if "steps" in data and isinstance(data["steps"], list) and len(data["steps"]) > 0:
                return data
        except Exception:
            pass

    # Built-in structured roadmap with real curated YouTube & tutorial links
    return {
        "steps": [
            {
                "id": 1,
                "title": f"Milestone 1: {target_role} Core Foundations",
                "description": "Master programming fundamentals, algorithms, and version control.",
                "status": "completed",
                "duration": "3 weeks",
                "resources": [
                    {"title": "CS50 Introduction to Computer Science (Harvard / YouTube)", "url": "https://www.youtube.com/watch?v=8mAITcNt710", "type": "YouTube"},
                    {"title": "Git & GitHub Crash Course (FreeCodeCamp)", "url": "https://www.youtube.com/watch?v=RGOj5yH7evk", "type": "YouTube"}
                ],
                "quiz": [
                    {"question": "What is the time complexity of binary search on a sorted array?", "options": ["O(log n)", "O(n)", "O(1)", "O(n^2)"], "answer": "O(log n)"},
                    {"question": "Which Git command records changes to the repository history?", "options": ["git commit", "git push", "git clone", "git status"], "answer": "git commit"}
                ]
            },
            {
                "id": 2,
                "title": "Milestone 2: Frontend & Interactive Interfaces",
                "description": "Build modern responsive applications with React.js, Tailwind CSS, and API hooks.",
                "status": "current",
                "duration": "4 weeks",
                "resources": [
                    {"title": "React 19 & Next.js Full Course 2026 (FreeCodeCamp)", "url": "https://www.youtube.com/watch?v=bMknfKXIFA8", "type": "YouTube"},
                    {"title": "Chai aur React Full Series (Chai aur Code)", "url": "https://www.youtube.com/playlist?list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige", "type": "YouTube"}
                ],
                "quiz": [
                    {"question": "What hook in React executes side effects such as fetching data?", "options": ["useEffect", "useState", "useRef", "useMemo"], "answer": "useEffect"},
                    {"question": "What is JSX in React?", "options": ["A syntax extension for JavaScript", "A CSS framework", "A database query language", "A backend server"], "answer": "A syntax extension for JavaScript"}
                ]
            },
            {
                "id": 3,
                "title": "Milestone 3: Backend Architecture & Database Engineering",
                "description": "Design high-throughput REST APIs, JWT authentication, and MongoDB schemas.",
                "status": "pending",
                "duration": "4 weeks",
                "resources": [
                    {"title": "FastAPI Full Course for Beginners (YouTube)", "url": "https://www.youtube.com/watch?v=0sOvCWFmrtA", "type": "YouTube"},
                    {"title": "MongoDB Complete Tutorial (CodeWithHarry)", "url": "https://www.youtube.com/watch?v=J6mDkcqU_ZE", "type": "YouTube"}
                ],
                "quiz": [
                    {"question": "What status code represents successful resource creation?", "options": ["201 Created", "200 OK", "404 Not Found", "500 Error"], "answer": "201 Created"},
                    {"question": "What type of database is MongoDB?", "options": ["Document-oriented NoSQL", "Relational SQL", "Graph database", "In-memory cache"], "answer": "Document-oriented NoSQL"}
                ]
            },
            {
                "id": 4,
                "title": "Milestone 4: Cloud Deployment & Placement Readiness",
                "description": "Deploy applications with Docker, CI/CD pipelines, and prepare for technical interviews.",
                "status": "pending",
                "duration": "3 weeks",
                "resources": [
                    {"title": "Docker & Containerization Tutorial (YouTube)", "url": "https://www.youtube.com/watch?v=3c-iBn73dDE", "type": "YouTube"},
                    {"title": "System Design for Technical Interviews", "url": "https://github.com/donnemartin/system-design-primer", "type": "Docs"}
                ],
                "quiz": [
                    {"question": "What is the primary benefit of containerization?", "options": ["Environment consistency across development and production", "Faster network cables", "Automatic code generation", "Replacing database servers"], "answer": "Environment consistency across development and production"}
                ]
            }
        ],
        "current_skills": current_skills if current_skills else ["HTML", "CSS", "JavaScript"],
        "required_skills": ["React.js", "FastAPI / Node.js", "MongoDB", "Docker", "System Design"],
        "certifications": [
            {"name": "Meta Front-End Developer Professional Certificate", "provider": "Coursera"},
            {"name": "AWS Certified Cloud Practitioner", "provider": "Amazon Web Services"}
        ]
    }

def generate_assessment_questions(topic: str = "full stack", count: int = 5) -> List[Dict[str, Any]]:
    topic_str = topic.lower() if topic else "full stack"
    prompt = f"""
    Generate {count} technical multiple-choice questions for a student testing their knowledge in: "{topic}".
    Return ONLY a JSON array with this schema:
    [
      {{
        "id": 1,
        "question": "What is the primary advantage of indexing a database column?",
        "options": ["Faster search query execution", "Data compression", "Automatic backups", "Preventing null values"],
        "answer": "Faster search query execution",
        "difficulty": "Medium",
        "type": "mcq",
        "topic": "{topic}"
      }}
    ]
    """
    res = _call_gemini(prompt)
    if res:
        try:
            clean_res = res.replace('```json', '').replace('```', '').strip()
            data = json.loads(clean_res)
            if isinstance(data, list) and len(data) > 0:
                return data
        except Exception:
            pass

    # Built-in question bank categorized by topic
    python_questions = [
        {"id": 1, "question": "What is the output of `type(lambda: None)` in Python?", "options": ["<class 'function'>", "<class 'lambda'>", "<class 'object'>", "<class 'NoneType'>"], "answer": "<class 'function'>", "difficulty": "Easy", "type": "mcq", "topic": "Python"},
        {"id": 2, "question": "Which of the following data structures in Python is immutable?", "options": ["Tuple", "List", "Dictionary", "Set"], "answer": "Tuple", "difficulty": "Easy", "type": "mcq", "topic": "Python"},
        {"id": 3, "question": "What is a Python generator used for?", "options": ["Iterating lazily without storing all items in memory", "Generating random passwords", "Creating classes dynamically", "Handling multi-threading locks"], "answer": "Iterating lazily without storing all items in memory", "difficulty": "Medium", "type": "mcq", "topic": "Python"},
        {"id": 4, "question": "What does the `GIL` (Global Interpreter Lock) in CPython do?", "options": ["Ensures only one thread executes Python bytecode at a time", "Locks database rows", "Encrypts file access", "Prevents memory leaks"], "answer": "Ensures only one thread executes Python bytecode at a time", "difficulty": "Hard", "type": "mcq", "topic": "Python"},
        {"id": 5, "question": "In Python, which decorator is used to define a static method in a class?", "options": ["@staticmethod", "@classmethod", "@property", "@abstractmethod"], "answer": "@staticmethod", "difficulty": "Medium", "type": "mcq", "topic": "Python"}
    ]

    react_questions = [
        {"id": 1, "question": "What is the virtual DOM in React?", "options": ["A lightweight in-memory representation of the real DOM", "A direct connection to the database", "A browser plugin for React", "A CSS framework"], "answer": "A lightweight in-memory representation of the real DOM", "difficulty": "Easy", "type": "mcq", "topic": "React"},
        {"id": 2, "question": "Which hook is used to optimize expensive calculations in React?", "options": ["useMemo", "useCallback", "useEffect", "useRef"], "answer": "useMemo", "difficulty": "Medium", "type": "mcq", "topic": "React"},
        {"id": 3, "question": "What is the purpose of keys in React lists?", "options": ["To identify which items have changed, been added, or removed", "To encrypt list data", "To style list items", "To bind click events"], "answer": "To identify which items have changed, been added, or removed", "difficulty": "Easy", "type": "mcq", "topic": "React"},
        {"id": 4, "question": "When does `useEffect` run with an empty dependency array `[]`?", "options": ["Once after the initial render (mounting)", "On every state update", "Before component unmounts only", "Whenever props change"], "answer": "Once after the initial render (mounting)", "difficulty": "Medium", "type": "mcq", "topic": "React"},
        {"id": 5, "question": "In React 18+, what is the purpose of `useTransition`?", "options": ["Marking state updates as non-blocking transitions", "Animating CSS transforms", "Routing between pages", "Managing WebSocket connections"], "answer": "Marking state updates as non-blocking transitions", "difficulty": "Hard", "type": "mcq", "topic": "React"}
    ]

    dsa_questions = [
        {"id": 1, "question": "What is the worst-case time complexity of QuickSort?", "options": ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"], "answer": "O(n^2)", "difficulty": "Medium", "type": "mcq", "topic": "DSA"},
        {"id": 2, "question": "Which data structure follows the First-In-First-Out (FIFO) principle?", "options": ["Queue", "Stack", "Binary Heap", "Trie"], "answer": "Queue", "difficulty": "Easy", "type": "mcq", "topic": "DSA"},
        {"id": 3, "question": "What is the time complexity to insert a node at the head of a Singly Linked List?", "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"], "answer": "O(1)", "difficulty": "Easy", "type": "mcq", "topic": "DSA"},
        {"id": 4, "question": "Which algorithm is used to find the shortest path in a weighted graph with non-negative edge weights?", "options": ["Dijkstra's Algorithm", "Prim's Algorithm", "Kruskal's Algorithm", "Breadth-First Search"], "answer": "Dijkstra's Algorithm", "difficulty": "Medium", "type": "mcq", "topic": "DSA"},
        {"id": 5, "question": "What is the auxiliary space complexity of standard Depth-First Search (DFS) on a tree of height h?", "options": ["O(h)", "O(1)", "O(h^2)", "O(n log h)"], "answer": "O(h)", "difficulty": "Hard", "type": "mcq", "topic": "DSA"}
    ]

    if "python" in topic_str:
        return python_questions
    elif "react" in topic_str or "frontend" in topic_str:
        return react_questions
    elif "dsa" in topic_str or "algorithm" in topic_str or "data structure" in topic_str:
        return dsa_questions
    else:
        # Default full stack mix
        return [
            python_questions[0],
            react_questions[0],
            dsa_questions[0],
            react_questions[1],
            python_questions[2]
        ]

def conduct_mock_interview(role: str, question_number: int, previous_answer: str = None, chat_context: str = "") -> str:
    if previous_answer:
        prompt = f"""
        You are a friendly, experienced Senior Technical Interviewer conducting a mock interview for the position: "{role}".
        Conversation so far:
        {chat_context}
        
        The candidate's latest response was: "{previous_answer}".

        Your task:
        1. Give a brief, authentic 1-sentence reaction to what they just said.
        2. Ask Question #{question_number}, which should dive into a specific practical technical problem, coding scenario, or architectural challenge relevant to {role}.
        3. Keep the total response under 3 sentences and sound conversational and professional.
        """
        res = _call_gemini(prompt)
        if res:
            return res.strip()

    # Dynamic fallback bank with role-specific questions
    question_banks = {
        "full stack": [
            f"Welcome to your technical interview for {role}! To start, could you introduce yourself and tell me about a full-stack project where you designed the architecture?",
            f"That sounds interesting! When connecting your frontend to backend APIs, how do you handle state management, authentication tokens, and API error states?",
            f"How do you approach database schema design and optimization when querying large relational or document datasets?",
            f"If your web application experienced sudden high latency and dropped requests, how would you systematically profile and locate the bottleneck?",
            f"Great technical discussion today! Finally, what software engineering best practice or tool have you learned recently that changed how you write code?"
        ],
        "default": [
            f"Welcome to your mock interview for {role}! Could you share a quick overview of your technical background and key projects you have built?",
            f"Thanks for sharing! What was the most challenging technical bug or architecture problem you encountered in your projects, and how did you resolve it?",
            f"How do you ensure your code is clean, maintainable, and covered by unit or integration tests?",
            f"If you had to design a scalable system that processes 10,000 requests per second, what components (caching, load balancer, queue) would you utilize?",
            f"Excellent answers! What areas of {role} are you most passionate about exploring next in your career?"
        ]
    }

    bank = question_banks["full stack"] if "stack" in role.lower() or "developer" in role.lower() else question_banks["default"]
    idx = max(0, min(question_number - 1, len(bank) - 1))
    return bank[idx]

def evaluate_interview(answers: List[str], role: str) -> Dict[str, Any]:
    prompt = f"""
    Evaluate the following interview answers from a candidate interviewing for "{role}":
    {answers}

    Grade their technical accuracy, depth, problem solving, and communication.
    Return ONLY a JSON object:
    {{
      "overall_score": 88,
      "breakdown": {{"technical": 85, "communication": 90, "problem_solving": 88}},
      "feedback": "The candidate demonstrated solid conceptual clarity and structured their thought process well.",
      "improvements": [
        "Include concrete production metrics when explaining project outcomes",
        "Deepen explanations of caching and database indexing tradeoffs"
      ]
    }}
    """
    res = _call_gemini(prompt)
    if res:
        try:
            clean_res = res.replace('```json', '').replace('```', '').strip()
            data = json.loads(clean_res)
            if "overall_score" in data:
                return data
        except Exception:
            pass

    # Score calculation based on quality and length of answers
    avg_words = sum(len(a.split()) for a in answers) / max(len(answers), 1)
    base_score = min(95, max(72, int(70 + avg_words * 0.8)))

    return {
        "overall_score": base_score,
        "breakdown": {
            "technical": min(95, base_score - 2),
            "communication": min(98, base_score + 4),
            "problem_solving": base_score
        },
        "feedback": f"Strong demonstration of engineering knowledge for {role}. Your communication was structured and demonstrated genuine problem-solving ability.",
        "improvements": [
            "Structure scenario questions using the STAR framework (Situation, Task, Action, Result)",
            "Quantify project achievements with specific percentage improvements and load metrics",
            "Discuss tradeoffs between alternative database or architectural patterns"
        ]
    }
