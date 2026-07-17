from sqlalchemy import Integer, Column, DateTime, String, Float, ForeignKey, JSON, Text
from sqlalchemy.sql import func
from app.core.database import base

class ResumeAnalysis(base):
    __tablename__ = "resume_analyses"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    resume_path = Column(String, nullable=False)

    job_description = Column(Text, nullable=False)

    resume_score = Column(Float, nullable=False)

    matched_skills = Column(JSON, nullable=False)

    missing_skills = Column(JSON, nullable=False)

    suggestions = Column(JSON, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default= func.now())