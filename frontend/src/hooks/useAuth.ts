import { useState, useEffect, useCallback } from "react";
import { LoginUser } from "../services/authService";

export type UserRole = "candidate" | "recruiter" | null;

export const UseAuth = ()=> {
    const [token, setToken] = useState<string | null>(()=> localStorage.getItem("access_token"));
    const [role, setRole] = useState<UserRole>(null);
    const [loading, setLoading] = useState(true);

    const decodeRole = useCallback((jwt:string)=>{
        try{
            const payload = JSON.parse(atob(jwt.split(".")[1]));
            setRole(payload.role);
            return payload.role;
        }catch{
            logout();
            return null;
        }
    }, []);

    useEffect (()=> {
        const storedToken = localStorage.getItem("access_token");
        if(storedToken){
            setToken(storedToken);
            decodeRole(storedToken);
        }
        setLoading(false);
    }, [decodeRole]);

    const login = async(email:string, password:string)=>{
        const data = await LoginUser({email,password});
        localStorage.setItem("access_token" , data.access_token);
        setToken(data.access_token);
        const userRole = decodeRole(data.access_token);
        return userRole;
    };

    const logout = ()=>{
        localStorage.removeItem("access_token");
        setToken(null);
        setRole(null);
        window.location.href = "/login";
    };

    return {
        token,
        role,
        isAuthenticated: !!token,
        loading,
        login,
        logout,
    };
}
