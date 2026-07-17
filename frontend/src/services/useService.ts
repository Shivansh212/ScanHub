import api from "./api";

export interface UserProfile{
    email : string;
    role : "candidate" | "recruiter";
    resume_uploaded?: boolean;

}

export const fetchme = async (): Promise<UserProfile>=> {
    const response = await api.get("/auth/profile");
    return response.data;
};