from app.modules.resume_ranker.embedder import get_embedding
from app.modules.resume_ranker.scorer import calibrated_similarity
from app.modules.resume_ranker.bias_cleaner import BiasCleaner
from app.utils.exception import CustomException

class ResumeScoreCalculator:
    @staticmethod
    def calculate_score(resume_text : str, job_description : str, matched_skills: list, jd_skills: list):
        try:
            resume_text = BiasCleaner.clean(resume_text)

            emb_resume = get_embedding(resume_text)
            emb_job = get_embedding(job_description)
            semantic_score = calibrated_similarity(emb_resume, emb_job)

            total_req = len(jd_skills)
            match_perc = (len(matched_skills) / total_req * 100) if total_req > 0 else 0

            if match_perc >= 95:
                return 95.1

            skill_score = min(len(matched_skills) * 10, 100)

            length_bonus = 20 if len(resume_text.split()) > 300 else 10

            final_score = (
                0.5*skill_score +
                0.3*semantic_score +
                0.2*length_bonus
            )

            return round(final_score, 2)

        except Exception as e:
            raise CustomException(e)