import api from "./api";

export type ResumeStatusType = "NOT_UPLOADED"| "UPLOADING"| "PARSING"| "COMPLETED"| "FAILED";

export interface ResumeStatuesResponse{
    status : ResumeStatusType;
    score?: number;
}

export const fetchResumeStatus = async() : Promise<ResumeStatuesResponse>=>{
    const response = await api.get("/candidate/resume/status");
    return response.data;
}

export type ResumeAnalysisResponse = {
    resume_score : number;
    matched_skills : string[];
    missing_skills: string[];
    suggestions: string[];
};

export const fetchResumeAnalysis = async() : Promise<ResumeAnalysisResponse>=> {
    const res = await api.get("/candidate/analysis/latest");
    
    return res.data;
};