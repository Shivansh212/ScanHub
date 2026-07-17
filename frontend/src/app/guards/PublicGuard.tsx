import { Navigate } from "react-router-dom";
import { UseAuth } from "../../hooks/useAuth";
import type { JSX } from "react";

const PublicGuard = ({children} : {children: JSX.Element})=>{
    const {isAuthenticated, role, loading} = UseAuth();

    if (loading) return <div className="min-h-screen bg-[#0f1115]"></div>;

    if(isAuthenticated && role){
        return <Navigate to={role === "recruiter"
            ? "/recruiter/dashboard" 
            : "/candidate/dashboard"} replace />;
    }

    return children;
};

export default PublicGuard;