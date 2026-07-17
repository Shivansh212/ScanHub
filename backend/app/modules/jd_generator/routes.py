from fastapi import APIRouter, Depends
from app.modules.jd_generator.schemas import JDRequest
from app.modules.jd_generator.service import JDGeneratorService
from app.auth.roles import require_role

router = APIRouter(prefix="/api/v1/jd", tags=["JD Generator"])

@router.post("/generate")
def generate_jd(request:JDRequest,
                user = Depends(require_role("recruiter"))):
    jd = JDGeneratorService.generate_jd(request)
    return {"job_description" : jd}