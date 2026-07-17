def shortlist_candidate(score: float) -> str:
    if score >= 75:
        return "Strong Fit"
    elif score >= 50:
        return "Medium Fit"
    else:
        return "Weak Fit"