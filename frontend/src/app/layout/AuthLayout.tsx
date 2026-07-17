import { type ReactNode } from "react";

interface AuthLayoutProps{
    children : ReactNode
};

const AuthLayout = ({children} : AuthLayoutProps)=> {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f1115] text-slate-200 px-4">
            <div className="w-full max-w-md bg-[#161920] border border-slate-800 rounded-2xl shadow-2xl p-8">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;