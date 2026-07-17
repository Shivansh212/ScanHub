//import React from "react";
import { UseAuth } from "../../hooks/useAuth";
import { useState } from "react";
import JobDescriptionCard from "./JobDescriptionCard";
import RecruiterResumeUpload from "./RecruiterResumeUpload";
import api from "../../services/api";
import ResultsCard from "../../components/recruiter components/ResultCard";
import { type CandidateResult } from "../../types";


const RecruiterDashboard = () => {
    const { logout } = UseAuth();
    const [files, setFiles] = useState<File[]>([]);
    const [jobDescription, setJobDescription] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<CandidateResult[] | null>(null);

    const handleAnalyze = async()=>{
      if(!jobDescription.trim()) return;
      if(files.length == 0) return;
      try{
        setIsAnalyzing(true);
        const formData = new FormData();
        formData.append("job_description" , jobDescription);
        files.forEach(f => {formData.append("resumes", f)} );

        const response = await api.post("/recruiter/rank", formData);
        console.log("Analysis response:", response.data);

        setResults(response.data?.results ?? []);
      }catch(err){
        console.error("Error prepa ring data for analysis:", err);
        alert("An error occurred while preparing the data. Please try again.");
      }finally{
        setIsAnalyzing(false);
      }
    }

    const handleReset = () => {
      setJobDescription("");
      setFiles([]);
      setResults(null);
    }
  return (
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Recruiter Dashboard
              </h1>
              <p className="text-slate-400 mt-2 text-sm sm:text-base">
                Rank candidates intelligently using{" "}
                <span className="text-indigo-500 font-semibold">
                  AI-powered
                </span>{" "}
                similarity scoring.
              </p>
            </div>
            <button 
              onClick={handleReset}
              className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-200 px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg cursor-pointer">
              Reset Dashboard
            </button>
            <button
              onClick={logout}
              className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all duration-200 px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg cursor-pointer"
            >
              Logout
            </button>

          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Job Description Card */}
            <JobDescriptionCard 
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              onAnalyze={handleAnalyze}
              isDisabled={files.length === 0 || !jobDescription.trim()}
              isAnalyzing={isAnalyzing}
            />

            <RecruiterResumeUpload
              files={files}
              setFiles={setFiles}
             />

            <ResultsCard
              results={results}
              isLoading={isAnalyzing}
             /> 

          </div>

        </div>
      </div>
  );
};

export default RecruiterDashboard;