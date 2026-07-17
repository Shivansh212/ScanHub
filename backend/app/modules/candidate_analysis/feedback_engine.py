class ResumeFeedbackEngine:
    @staticmethod
    def generate_feedback(missing_skills: list, semantic_score: float):
        feedback = []
        score_int = int(semantic_score)
        
        if semantic_score < 60:
            feedback.append(
                f"Your profile currently aligns with {score_int}% of the job requirements. "
                "A more targeted approach to your experience descriptions would bridge this gap."
            )
        elif semantic_score < 80:
            feedback.append(
                f"You have a solid foundation with a {score_int}% match. "
                "Adding a few specific technical keywords could push you into the 'Strong Match' category."
            )
        else:
            feedback.append(
                f"Excellent alignment! Your profile matches {score_int}% of the role's needs. "
                "You are a top-tier candidate for this position."
            )

        if missing_skills:
            top_skills = missing_skills[:3]  
            remaining_count = len(missing_skills) - 3
            
            skill_text = f"Focusing on **{', '.join(top_skills)}**"
            if remaining_count > 0:
                skill_text += f" and {remaining_count} other core competencies"
            
            feedback.append(
                f"{skill_text} would significantly increase your visibility to recruiters."
            )

        if semantic_score >= 80 and not missing_skills:
            feedback.append(
                "Your resume is highly optimized. Focus on quantifying your achievements to stand out even more."
            )
        elif semantic_score >= 80 and missing_skills:
            feedback.append(
                "You're almost there! Incorporating the missing technical terms will help you bypass automated filters."
            )

        if not feedback:
            feedback.append(
                "Your profile meets the core requirements. Refining your project impact statements will enhance your application."
            )

        return feedback