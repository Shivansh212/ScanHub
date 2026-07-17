def build_jd_prompt(role,experience,skills,company_type):
    return f"""
You are an expert HR professional.

Generate a structured Job Description with the following sections:
1. Job Title
2. About the Role
3. Key Responsibilities (bullet points)
4. Required Skills (bullet points)
5. Preferred Skills (bullet points)

Role : {role}
Eperience Level : {experience}
Skills : {', '.join(skills) if skills else "Not specified"}
Company Type : {company_type if company_type else "General"}

Keep it professional, concise, and ATS-friendly.
"""