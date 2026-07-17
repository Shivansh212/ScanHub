import os
from openai import OpenAI
from app.utils.logger import logger
from app.utils.exception import CustomException

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class SkillExtractor:
    @staticmethod
    def extract(job_description: str) -> list:
        try:
            prompt = f"""
            Extract a list of all technical skills or tools and any skill or platform whatever a candidate should need to know and the jd is demanding from this Job Description. 
            Return ONLY a comma-separated list of keywords. eg you should return output like this -:  python , sql , react , java, Hadoop.
            
            Job Description: {job_description}
            """
            
            response = client.chat.completions.create(
                model="gpt-3.5-turbo", # or "gpt-4o-mini"
                messages=[{"role": "user", "content": prompt}],
                temperature=0
            )
            
            content = response.choices[0].message.content

            skills_text = content if content is not None else ""
            # Convert "SQL, Python, React" -> ["SQL", "Python", "React"]
            skills_list = [s.strip() for s in skills_text.split(",") if s.strip()]
            
            logger.info(f"AI Extracted Skills: {skills_list}")
            return skills_list
        except Exception as e:
            logger.error(f"Skill extraction failed: {e}")
            return [] # Fallback to empty list