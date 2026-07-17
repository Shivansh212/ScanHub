import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import AuthGuard from "./guards/AuthGuard";
import RoleGuard from "./guards/RoleGuard";
import PublicGuard from "./guards/PublicGuard";
import CandidateDashboard from "../pages/candidates/Dashboard";
import MockInterview from "../pages/candidates/MockInterview";
import RecruiterDashboard from "../pages/recruiters/RecruiterDasboard";


// const RecruiterDashboard = () => {
//     const { logout } = UseAuth();
//     return (
//         <div className="p-10 text-black">
//             <h1>Recruiter Dashboard</h1>
//             <button 
//                 onClick={logout}
//                 className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition"
//             >
//                 Logout & Switch Account
//             </button>
//         </div>
//     );
// }

export const AppRouter = () =>{
    return(
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Navigate to="/signup" />}></Route>
                <Route path="/login" element={<PublicGuard><Login/></PublicGuard>}></Route>
                <Route path="/signup" element={<PublicGuard><Signup /></PublicGuard>} />

                {/* Recruiter */}
                <Route path="/recruiter/dashboard" element={<AuthGuard><RoleGuard allowedRole={"recruiter"}><RecruiterDashboard/></RoleGuard></AuthGuard>}></Route>
                {/* Candidate */}
                <Route path="/candidate/dashboard" element={<AuthGuard><RoleGuard allowedRole={"candidate"}><CandidateDashboard/></RoleGuard></AuthGuard>} />
                <Route path="/candidate/mock-interview" element={<AuthGuard><RoleGuard allowedRole={"candidate"}><MockInterview/></RoleGuard></AuthGuard>} />

                {/* Catch all */}
                <Route path="*" element={<div>404 - Page Not Found</div>}></Route>
            </Routes>
        </BrowserRouter>
    );
};