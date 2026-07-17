import { Navigate } from "react-router-dom";
import { UseAuth, type UserRole } from "../../hooks/useAuth";
import type { JSX } from "react";

type RoleProps = {
    allowedRole: UserRole;
    children: JSX.Element;
}

const RoleGuard = ({allowedRole,children} : RoleProps)=> {
    const {role, isAuthenticated, loading} = UseAuth();

    if(loading){
        return <div className="min-h-screen bg-[#0f1115] flex items-center justify-center">
        </div>;
    }

    if (!isAuthenticated || role !== allowedRole) {
        return <Navigate to={"/login"} replace/>;
    }
    return children;
};

export default RoleGuard;