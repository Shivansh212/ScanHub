import React from "react";

interface Props {
  jobDescription: string;
  setJobDescription: React.Dispatch<React.SetStateAction<string>>;
  onAnalyze : ()=> void;
  isDisabled : boolean;
  isAnalyzing?: boolean;
}

const JobDescriptionCard = ({ jobDescription, setJobDescription , onAnalyze,  isDisabled, isAnalyzing}: Props) => {
    
    return (
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">
                  Job Description
                </h2>
                <span className="text-sm text-gray-400">
                  {jobDescription.length}/3000
                </span>
                <span className="text-sm text-gray-400">
                  {jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0} words
                </span>
              </div>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                maxLength={3000}
                className="w-full h-48 md:h-56 bg-white/5 border border-white/20 rounded-2xl p-5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-300 resize-none"
              />

              <button
                onClick={onAnalyze}
                disabled={isDisabled}
                className={`mt-6 px-6 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all duration-200
                        ${jobDescription.trim()
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 hover:scale-[1.05] active:scale-95 cursor-pointer"
                          : "bg-gray-600 cursor-not-allowed opacity-50"
                        }`}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Candidates"}
              </button>

              

            </div>
    )
}  

export default JobDescriptionCard;