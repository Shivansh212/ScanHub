import { useState, useEffect } from "react";
type ResumeCardProps = {
    score?: number;
}

const getScoreColor =(score : number)=>{
    if(score === 95.1) return "text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]";
    if(score >=80) return "text-green-400";
    if(score >=60) return "text-yellow-400";
    return "text-red-400";
}

const AnimatedNumber = ({value}: {value :number}) =>{
  const [displayValue , setDisplayValue] = useState(0);
  useEffect(()=>{
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

const ResumeScoreCard = ({score} : ResumeCardProps) => {

    if(score === undefined || score === null){
        return (
            <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center h-62">
                <div className="text-5xl mb-4">📄</div>
                <h2 className="text-lg font-semibold text-slate-300">
                    No analysis yet
                </h2>
                <p className="text-slate-400 text-sm text-center mt-2">
                    Upload your resume and JD to see your score and insights
                </p>
            </div>
        )
    }
    const isGold = score === 95.1;

    return (
        <div className={`bg-[#161920] border rounded-2xl p-6 flex flex-col items-center justify-center h-62 shadow-lg transition-all duration-500 ${
            isGold 
            ? "border-amber-500 shadow-amber-500/20" 
            : "border-violet-800 shadow-cyan-500/10"
        }`}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                Resume Score {isGold && <span className="text-base">✨</span>}
            </h2>
            
            <div className="flex items-center justify-center h-32">
                <span className={`text-6xl font-bold transition-all ${getScoreColor(score)}`}>
                    <AnimatedNumber value={score}/>        
                </span>
                <span className="text-slate-400 text-xl ml-2">/ 100</span>
            </div>

            {isGold ? (
                <p className="text-center text-amber-400 text-sm mt-2 font-medium animate-pulse">
                    Gold Standard: Perfect Match!
                </p>
            ) : (
                <p className="text-center text-slate-400 text-sm mt-2">
                    Based on skills match and resume quality
                </p>
            )}
        </div>
    );
};

export default ResumeScoreCard;