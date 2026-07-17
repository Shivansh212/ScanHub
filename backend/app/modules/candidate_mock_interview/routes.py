from fastapi import APIRouter, Depends
from app.modules.candidate_mock_interview.schemas import (
    CandidateMockInterviewRequest,
    CandidateMockInterviewResponse
)

from app.modules.candidate_mock_interview.service import CandidateMockInterviewService
from app.auth.roles import require_role

router = APIRouter(
    prefix="/api/v1/candidate/mock-interview",
    tags=["Candidate Mock Interview"]
)

@router.post("/generate", response_model=CandidateMockInterviewResponse)
def generate_mock_interview(request:CandidateMockInterviewRequest,
                            user = Depends(require_role("candidate"))
                            ):
    result = CandidateMockInterviewService.generate_mock_interview(request)
    return result