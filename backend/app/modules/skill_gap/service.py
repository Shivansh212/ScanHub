from app.modules.skill_gap.extractor import SkillExtractor

class SkillGapService:

    @staticmethod
    def analyze(jd_text: str, resume_text: str):
        jd_skills = SkillExtractor.exctract_skill(jd_text)
        resume_skill = SkillExtractor.exctract_skill(resume_text)

        matched = list(set(jd_skills) & set(resume_skill))
        missing = list(set(jd_skills) - set(resume_skill))

        match_percentage = (
            (len(matched)/len(jd_skills)) *100 if jd_skills else 0
        )

        return {
            "Matched Skill" : matched,
            "Missing Skill" : missing,
            "Match Percentage" : round(match_percentage,2)
        }
    