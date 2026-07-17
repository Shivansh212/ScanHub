import React from "react";
import { useState } from "react";

interface ResumeFeedback {
  resume_score: number;
  matched_skills: string[];
  missing_skills: string[];
  feedback: string[];
}

interface Props {
  data: ResumeFeedback;
}

const AnimatedNumber = ({value}: {value :number}) =>{
  const [displayValue , setDisplayValue] = useState(0);
  React.useEffect(()=>{
    let start = 0;
    const end = value;
    const duration = 1000; 
    const increment = end / (duration / 10);

    const timer = setInterval(()=>{
      start += increment;
      if(start >= end){
        setDisplayValue(end);
        clearInterval(timer);
      }
      else{
        setDisplayValue(Math.floor(start));
      }
    },10);
    return ()=> clearInterval(timer);
  }, [value]);

  return <>{displayValue}</>;
};

const ResumeFeedbackCard: React.FC<Props> = ({ data }) => {
  const { resume_score, matched_skills, missing_skills, feedback } = data;
  const [showAllSkills, setShowAllSkills] = useState(false);

  const getStatus = () => {
    if (resume_score >= 80) {
      return { label: "Strong Match", color: "bg-green-600" };
    } else if (resume_score >= 60) {
      return { label: "Moderate Match", color: "bg-yellow-500" };
    } else {
      return { label: "Weak Match", color: "bg-red-600" };
    }
  };

  const status = getStatus();

  const renderSkills = (skills : string[] , type : 'match'|'missing')=>{
    const limit = 5;
    const displaySkills = showAllSkills ? skills : skills.slice(0, limit);
    const hasMore = skills.length > limit

    return (
      <div className="flex flex-wrap gap-2">
        {displaySkills.map((skill, index) => (
          <span
            key={index}
            className={`${type === 'match' ? 'bg-green-700/40 text-green-300' : 'bg-red-700/40 text-red-300'} px-3 py-1 rounded-full text-xs font-medium border border-white/5`}
          >
            {skill}
          </span>
        ))}
        {hasMore && !showAllSkills && (
          <button 
            onClick={() => setShowAllSkills(true)}
            className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4"
          >
            +{skills.length - limit} more...
          </button>
          
        )}

        {hasMore && showAllSkills && (
          <button onClick={() => setShowAllSkills(false)} className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4">
            Show Less   
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#111318] border border-slate-800 p-6 rounded-2xl shadow-2xl text-white space-y-6">
      
      {/* 1️⃣ Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Match Analysis</h2>
          <p className="text-5xl font-black mt-1">
            <AnimatedNumber value={resume_score}/>%
          </p>
        </div>
        <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tighter ${status.color}`}>
          {status.label}
        </span>
      </div>

      {/* 2️⃣ AI Insights (The "Human" Text) */}
      <div>
        <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 tracking-widest">AI Insights</h3>
        <ul className="space-y-3">
          {feedback.map((point, index) => (
            <li key={index} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
              <span className="text-blue-500 mt-1">▹</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* 3️⃣ Skill Breakdown */}
      <div className="grid grid-cols-1 gap-4 bg-black/20 p-4 rounded-xl border border-slate-800/50">
        <div>
          <p className="text-[10px] font-bold text-green-500 uppercase mb-2">Matched</p>
          {renderSkills(matched_skills, 'match')}
        </div>
        <div className="border-t border-slate-800 pt-3">
          <p className="text-[10px] font-bold text-red-500 uppercase mb-2">Missing</p>
          {renderSkills(missing_skills, 'missing')}
        </div>
      </div>

      {/* 4️⃣ SUGGESTION / RECOMMENDATION SECTION */}
      <div className="pt-4 border-t border-slate-700/50 mt-4">
        <div 
          onClick={() => document.getElementById('roadmap-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="group cursor-pointer p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl hover:bg-blue-900/30 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="text-2xl animate-bounce">💡</div>
            <div>
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider">
                Next Step Recommendation
              </p>
              <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                To bridge your skill gaps in <span className="text-white font-medium">Big Data</span> and <span className="text-white font-medium">Advanced AI</span>, generate your <span className="text-blue-400 underline decoration-blue-500/50 underline-offset-4 font-bold">Personalized Roadmap</span> below.
              </p>
            </div>
            <div className="ml-auto text-slate-500 group-hover:text-blue-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 7 5 5-5 5"/><path d="m13 7 5 5-5 5"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeFeedbackCard;