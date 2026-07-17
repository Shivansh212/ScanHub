from app.modules.resume_ranker.preprocessor import TextPreprocessor
from app.modules.resume_ranker.embedder import get_embedding
from app.modules.resume_ranker.scorer import calibrated_similarity
from app.utils.logger import logger
from app.utils.exception import CustomException
from app.modules.resume_ranker.shortlister import shortlist_candidate
from app.modules.resume_ranker.bias_cleaner import BiasCleaner


class ResumeRankerService:
    @staticmethod
    def rank_resumes(job_text:str, resumes:list):
        try:
            preprocessor = TextPreprocessor()
            clean_job = preprocessor.clean_text(job_text)
            emb_job = get_embedding(clean_job)

            results = []

            for resume in resumes:
                clean_text = preprocessor.clean_text(resume["text"])
                clean_text = BiasCleaner.clean(clean_text)
                emb_text = get_embedding(clean_text)

                score = calibrated_similarity(emb_job,emb_text)

                results.append({
                        "filename": resume["filename"],
                        "similarity": score,
                        "Fit": shortlist_candidate(score)
                    })
                
            logger.info("Resume ranking completed successfully")

            return sorted(results, key=lambda x: x["similarity"], reverse=True)
        except Exception as e:
            logger.error("Resume ranking failed")
            raise CustomException(e)
    
        