import api from "./api";

export interface LoginPayload{
    email : string;
    password : string;
}

export interface SignUpPayload{
    email : string;
    password : string;
    role : "candidate" | "recruiter";
}

export const LoginUser = async (Payload:LoginPayload)=>{
    const params = new URLSearchParams();
    params.append("username" , Payload.email);
    params.append("password" , Payload.password);

    const response = await api.post("/auth/login", params);
    return response.data;
};

export const RegisterUser = async (Payload:SignUpPayload)=>{
    const response = await api.post("/auth/register", Payload);
    return response.data;
};