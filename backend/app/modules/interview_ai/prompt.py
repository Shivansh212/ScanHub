def build_interview_prompt(role, experience, skills, jd):
    skills_text = ", ".join(skills)

    return f""" 
You are an expert technical interviewer.

Generate interview questions for the following role:

Role : {role}
Experience Level : {experience}
Skills : {skills_text}
Job Description : {jd}

Return the output strictly in the following format:

Technical Questions:
- Question 1
- Question 2
- Question 3
and so on ...

Scenario-Based Questions:
- Question 1
- Question 2
and so on ...

Behavioral Questions:
- Question 1
- Question 2
and so on ...

Coding Questions (easy to moderate difficulty related to skills, jd, logic and experience ): 
- Question 1
- Question 2
and so on ...

for every catagory generate minimum 5 questions and maximum can be up to your evaluation standards like given jd,skills,experience and role u can ask n number of qquestions which will help evaluate the candidate clearly but the minimum questions for each catagory should be 5 no less than that maximum can be however you like will help evaluate the candidate.

"""