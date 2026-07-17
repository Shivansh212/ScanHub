export interface CandidateResult {
    filename: string;
    similarity: number;
    Fit: "Strong Fit" | "Medium Fit" | "Weak Fit";
}