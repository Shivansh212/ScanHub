from fastapi import APIRouter
from app.modules.skill_gap.schemas import SkillGapRequest
from app.modules.skill_gap.service import SkillGapService

router = APIRouter(prefix="/api/v1/skill-gap", tags=["Skill Gap Analysis"])

@router.post("/analyze")
def analyze_skill_gap(request:SkillGapRequest):
    return SkillGapService.analyze(
        request.job_description,
        request.resume_text
    )