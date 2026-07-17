import numpy as np

def calibrated_similarity(emb_a, emb_b):
    a = np.array(emb_a)
    b = np.array(emb_b)

    raw_score = np.dot(a,b)/ (np.linalg.norm(a)*np.linalg.norm(b))

    min_thresh = 0.25
    max_thresh = 0.65

    if raw_score < min_thresh:
        return 0.0
    elif raw_score >= max_thresh:
        return 99.0
    else:
        normalized = (raw_score - min_thresh) / (max_thresh - min_thresh)
        return round(normalized * 100, 2)
