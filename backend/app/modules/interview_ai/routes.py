from fastapi import APIRouter, Depends
from app.modules.interview_ai.schemas import InterviewRequest
from app.modules.interview_ai.service import InterviewQuestionService
from app.auth.roles import require_role

router = APIRouter(
    prefix="/api/v1/interview",
    tags=["Interview AI"]
    )

@router.post("/generate")
def generate_interview_questions(request:InterviewRequest,
                                user = Depends(require_role("recruiter"))
                                ):
    questions = InterviewQuestionService.generate_questions(request)
    return {"interview_questions": questions}
