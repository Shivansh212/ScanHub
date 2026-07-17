import AuthLayout from "../../app/layout/AuthLayout";
import React, {useState} from "react";
import {UseAuth} from "../../hooks/useAuth";   
import { useNavigate } from "react-router-dom"; 




const Login = () => {
    const {login} = UseAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const handleSubmit = async (e? : React.SyntheticEvent)=> {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (loading) return;

        setLoading(true);
        setError("");

        try{
            const userRole = await login(email, password);
            
            if(userRole === "recruiter"){
                navigate("/recruiter/dashboard", { replace: true });
            }
            else{
                navigate("/candidate/dashboard", { replace: true });
            }
            
        }catch (err : any){
            setError("Invalid email or password")
        }finally{
            setTimeout(() => setLoading(false), 1000);
        }
    };

    return (
        <AuthLayout>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Welcome Back
            </h1>

            <p className="text-slate-400 mb-8">
                Sign in to HireSense AI
            </p>

            {error && (
                <p className="text-red-400 text-sm mb-4">{error}</p>
            )}

            <div className="space-y-5"> 
                <input 
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 bg-[#0f1115] border border-slate-700 rounded-lg outline-none focus:border-blue-500 transition-all"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)} 
                />

                <input
                    type={isPasswordFocused || password.length > 0 ? "password" : "text"}
                    autoComplete="one-time-code"
                    name="random-field-name"
                    placeholder="Password"
                    className="w-full px-4 py-2 bg-[#0f1115] border border-slate-700 rounded-lg outline-none focus:border-blue-500 transition-all"
                    value={password}
                    onFocus={() => setIsPasswordFocused(true)}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {if (e.key == "Enter"){
                        e.preventDefault();
                        handleSubmit(); 
                    }}} 
                />

                <div
                    role="button"
                    onClick={() => !loading && handleSubmit()}
                    className={`w-full py-2 rounded-lg text-center font-semibold cursor-pointer active:scale-95 transition-all ${
                        loading ? "bg-slate-700 opacity-50" : "bg-gradient-to-r from-blue-500 to-indigo-500"
                    }`}
                >
                    {loading ? "Verifying..." : "Login"}
                </div>
            </div>
            <p className="mt-6 text-center text-slate-400 text-sm">
                Don't have an account?{" "} 
                <a href="/signup" className="text-blue-400 hover:underline">Sign up</a>
            </p>

        </AuthLayout>
    );
};

export default Login;