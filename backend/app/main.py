from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.modules.jd_generator.routes import router as jd_router
from app.modules.skill_gap.routes import router as skill_gap_router
from app.modules.interview_ai.routes import router as interview_router
from app.modules.candidate_analysis.routes import router as candidate_analysis_router
from app.modules.candidate_mock_interview.routes import router as candidate_mock_router
from app.modules.candidate_roadmap.routes import router as candidate_roadmap_router
from app.users.routes import router as user_router
from app.auth.routes import router as auth_router
from app.modules.resume_ranker.routes import router as resume_ranker_router
from app.modules.candidate_analysis.routes import router as candidate_resume_status_router

app = FastAPI(title="HireSense AI", description="AI-powered Hiring Intelligence Platform", version="1.0.0")
app.include_router(jd_router)
app.include_router(skill_gap_router)
app.include_router(interview_router)
app.include_router(candidate_analysis_router)
app.include_router(candidate_mock_router)
app.include_router(candidate_roadmap_router)
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(resume_ranker_router)
app.include_router(candidate_resume_status_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Your Vite frontend URL
    allow_credentials=True,
    allow_methods=["*"], # Allows GET, POST, etc.
    allow_headers=["*"], # Allows all headers
)


@app.get("/health")
def health_check():
    return {"status" : "running 🚀"}


