def build_candidate_mock_interview_prompt(
    target_role: str,
    experience_level: str,
    job_description: str,
    matched_skills: list,
    missing_skills: list
):
    # Determine level to add "Strict Exclusion" instructions
    is_hard = experience_level.lower() in ["hard", "advanced", "senior"]
    
    return f""" 

You are an expert interview coach. You are conducting a HIGH-STAKES technical interview.

#############################
CANDIDATE CONTEXT
#############################
- Target Role : {target_role}
- Experience Level: {experience_level}
- Job Description: {job_description}
- Matched Skills: {', '.join(matched_skills)}
- Missing Skills: {', '.join(missing_skills) if missing_skills else 'None'}


#############################
DIFFICULTY GUARDS (ZERO TOLERANCE)
#############################

IF Experience Level is "Fresher" or "Beginner":
- Focus on: Syntax, basic hooks, fundamental CRUD, and core definitions.

IF Experience Level is "Intermediate":
- FORBIDDEN: Do NOT ask "What is X?" or "Explain the difference between A and B."
- Focus on: Performance optimization, API security, state management patterns, and moderate debugging.

IF Experience Level is "Advanced" or "Hard":
- FORBIDDEN: Absolutely NO basic questions. NO string reversal. NO "What is Docker?". NO "Difference between Class and Functional components."
- MANDATORY: Every question MUST involve one of these: 
    * System Design / Microservices
    * Distributed Systems / Concurrency
    * High-load Performance Bottlenecks / Caching Strategies (Redis/Memcached)
    * Security Vulnerabilities (OWASP) / Database Sharding & Indexing Internals.
- Coding tasks MUST be "Hard" level: Focus on custom hooks, middleware architecture, or complex data transformation.


#############################
GENERATION REQUIREMENTS
#############################

1. Technical Questions (5-10): 
   - No definitions for Intermediate/Hard. Focus on "How would you optimize..." or "Why would you choose A over B for scale...".

2. Coding Questions (5-10): 
   - Intermediate/Hard MUST be multi-step problems (e.g., "Implement a search with debouncing AND error boundaries").

3. Scenario-Based Questions (4-7): 
   - Hard level must involve a "Production Crisis" (e.g., "The server is down due to a memory leak in your Node.js process. Go.").

4. Weak-Area Questions (4-7): 
   - If missing_skills is 'None', return an empty list [] for weak_area_questions.
   - Do NOT ask for definitions. Ask how to implement the missing skill in a production environment.


#############################
OUTPUT FORMAT (STRICT JSON ONLY)
#############################

Return the response ONLY as a JSON object. No markdown, no pre-text, no post-text.

{{
  "technical_questions": ["..."],
  "coding_questions": ["..."],
  "scenario_questions": ["..."],
  "weak_area_questions": ["..."]
}}
"""