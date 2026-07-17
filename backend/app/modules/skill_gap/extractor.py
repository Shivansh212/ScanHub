import re 

common_skills = [
    "python", "java", "sql", "fastapi", "django", "flask",
    "machine learning", "deep learning", "nlp",
    "aws", "docker", "kubernetes", "git",
    "react", "node.js", "postgresql"
]

class SkillExtractor:
    @staticmethod
    def exctract_skill(text : str):
        text = text.lower()
        found_skills = []
        for skill in common_skills :
            pattern = r"\b" + re.escape(skill) + r"\b"
            if re.search(pattern,text):
                found_skills.append(skill)

        return list(set(found_skills))