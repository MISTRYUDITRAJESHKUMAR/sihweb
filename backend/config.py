import os
from dotenv import load_dotenv
load_dotenv()

class Settings:
    APP_NAME = "SIH 2026 - AI Skill-to-Career Platform"
    JWT_SECRET = os.getenv("JWT_SECRET", "sih2026-super-secret-key-change-in-production")
    JWT_ALGORITHM = "HS256"
    JWT_EXPIRE_HOURS = 24
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    CORS_ORIGINS = ["*"]

settings = Settings()
