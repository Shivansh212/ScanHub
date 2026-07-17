import { useState } from "react";
import {useNavigate} from "react-router-dom";
import AuthLayout from "../../app/layout/AuthLayout";
import { RegisterUser } from "../../services/authService";

const Signup = () =>{
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"candidate" | "recruiter">("candidate");
  const [error, setError] = useState("");

  const Handlesubmit = async(e : React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await RegisterUser({email,password,role});

      navigate("/login");
    }catch (err: any) {
      setError("Signup failed. Email may already be registered.");
    }
  };
  
  return (
    <AuthLayout>
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
        Create Account
      </h1>

      <p className="text-slate-400 mb-8">
        Join HireSense AI and get started
      </p>

      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}

      <form className="space-y-5" onSubmit={Handlesubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 bg-[#0f1115] border border-slate-700 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 bg-[#0f1115] border border-slate-700 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role Selector */}
        <select
          className="w-full px-4 py-2 bg-[#0f1115] border border-slate-700 rounded-lg"
          value={role}
          onChange={(e) =>
            setRole(e.target.value as "candidate" | "recruiter")
          }
        >
          <option value="candidate">Candidate</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-6 text-center text-slate-400 text-sm">
                Already have an account?{"  "} 
                <a href="/login" className="text-blue-400 hover:underline">Login</a>
            </p>
    </AuthLayout>
  );
};

export default Signup;

