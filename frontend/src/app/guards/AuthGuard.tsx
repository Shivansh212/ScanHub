import { Navigate } from "react-router-dom";
import { UseAuth } from "../../hooks/useAuth";
import type { JSX } from "react";

const AuthGuard = ({children}: {children: JSX.Element})=>{
    const {isAuthenticated} = UseAuth();

    if(!isAuthenticated){
        return <Navigate to={"/login"} replace/>;
    }
    return children;
};

export default AuthGuard;