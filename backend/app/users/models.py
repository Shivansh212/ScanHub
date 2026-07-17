from sqlalchemy import Integer, Column, DateTime, String, Boolean
from sqlalchemy.sql import func
from app.core.database import base

class User(base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, index=True, nullable=False)

    hashed_password = Column(String, nullable=False)

    role = Column(String, nullable=False)

    is_active = Column(Boolean, default=True)

    resume_status = Column(String, default="NOT_UPLOADED")
    
    resume_path = Column(String, nullable=True)

    resume_uploaded = Column(Boolean, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    

    