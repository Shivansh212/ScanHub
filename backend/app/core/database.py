from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base,sessionmaker
from app.core.config import settings

DATABASE_URL = settings.DATABASE_URL

# Url = DATABASE_URL if DATABASE_URL else ""
if not DATABASE_URL:
    raise ValueError("DATABASE_URL is not set in the .env file!")
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autoflush=False,
    autocommit=False,
    bind=engine
)

base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()