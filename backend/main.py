from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from seed_data import seed_database
from routers import auth, students, assessment, career, jobs, interview, learning, faculty, college, industry, portfolio
import uvicorn

app = FastAPI(title="SyncSpace API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers under /api prefix
# Routers already define their own sub-prefixes (e.g. /assessment, /career, etc.)
# Auth router has no prefix, so we set it here
app.include_router(auth.router, prefix="/api/auth")
app.include_router(students.router, prefix="/api")
app.include_router(assessment.router, prefix="/api")
app.include_router(career.router, prefix="/api")
app.include_router(jobs.router, prefix="/api")
app.include_router(interview.router, prefix="/api")
app.include_router(learning.router, prefix="/api")
app.include_router(faculty.router, prefix="/api")
app.include_router(college.router, prefix="/api")
app.include_router(industry.router, prefix="/api")
app.include_router(portfolio.router, prefix="/api")


@app.on_event("startup")
async def startup_event():
    seed_database()


@app.get("/")
def root():
    return {
        "message": "Welcome to SyncSpace API",
        "docs": "/docs",
        "version": "1.0.0",
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
