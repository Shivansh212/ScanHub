import { useState } from "react";
import MockInterviewForm from "../../components/mock/MockInterviewForm";
import QuestionSection from "../../components/mock/QuestionSection";
import { generateMockInterview } from "../../services/MockInterviewService";
import { useNavigate } from "react-router-dom";


interface InterviewResponse {
    technical_questions: string[];
    coding_questions: string[];
    scenario_questions: string[];
    weak_area_questions: string[];
}


const MockInterview = () =>{
    const navigate = useNavigate();
    const [questions , setQuestions] = useState<InterviewResponse|null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async(formData : any) =>{
        try{
            setLoading(true);
            const res = await generateMockInterview(formData);
            setQuestions(res);
        }catch(error){
            console.log(error);
            alert("Something went wrong.")
        }finally {
            setLoading(false);
        }

    };

    const handleClearQuestions = () =>{
        setQuestions(null);
    }

    return (
        <div className="min-h-screen bg-[#0f1115] text-slate-200 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                
                {/* 🔙 Navigation Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <button 
                            onClick={() => navigate(-1)}
                            className="text-slate-400 hover:text-white transition-colors mb-2 flex items-center gap-2 text-sm"
                        >
                            ← Back to Dashboard
                        </button>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            <strong>AI <i><span className="text-blue-500">MOCK</span></i> INTERVIEW </strong>
                        </h1>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
                        <span className="text-blue-400 text-sm font-bold">GPT-4o Mini Powered</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left side: The Form */}
                    <div className="lg:col-span-5">
                        <MockInterviewForm onGenerate={handleGenerate} />
                    </div>

                    {/* Right side: The Results */}
                    <div className="lg:col-span-7">
                        {loading && (
                            <div className="flex flex-col items-center justify-center h-64 bg-[#111318] border border-slate-800 rounded-3xl">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                                <p className="text-slate-400 animate-pulse">Engaging AI Interviewer...</p>
                            </div>
                        )}

                        {questions ? (
                            <div className="space-y-6">

                                <div className="flex justify-between items-center px-2 mb-2">
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                                        Interview Rounds Generated
                                    </p>
                                    <button 
                                        onClick={handleClearQuestions} 
                                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-black text-red-400 border border-red-500/20 bg-red-500/5 rounded-lg hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-red-900/10"
                                    >
                                        <span>🗑️</span>
                                        CLEAR ALL
                                    </button>
                                </div>
                                <QuestionSection title="Technical Questions" questions={questions.technical_questions} color="blue" emoji="💻" />
                                <QuestionSection title="Coding Challenges" questions={questions.coding_questions} color="amber" emoji="⚡" />
                                <QuestionSection title="Scenario Practice" questions={questions.scenario_questions} color="emerald" emoji="🤝" />
                                <QuestionSection title="Weak-Area Focus" questions={questions.weak_area_questions} color="red" emoji="🎯" />
                            </div>
                        ) : !loading && (
                            <div className="h-full min-h-[400px] border-2 border-dashed border-slate-800 rounded-3xl flex items-center justify-center text-slate-600">
                                <p>Fill the form to generate your custom interview</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MockInterview;