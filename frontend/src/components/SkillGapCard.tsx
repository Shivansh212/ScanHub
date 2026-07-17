type SkillGapProps = {
  matchedSkills?: string[];
  missingSkills?: string[];
};

const SkillGapCard = ({ matchedSkills, missingSkills }: SkillGapProps) => {

  const noData =
    matchedSkills === undefined || missingSkills === undefined;

  if (noData) {
    return (
      <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6 h-56 flex flex-col items-center justify-center">
        <div className="text-4xl mb-3">🧠</div>
        <h2 className="text-lg font-semibold text-slate-300">
          Skill Gap Analysis
        </h2>
        <p className="text-slate-400 text-sm mt-2 text-center">
          Upload resume to see matched and missing skills
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#161920] border border-violet-800 shadow-cyan-500/10 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Skill Gap</h2>

      {/* Matched Skills */}
      <div className="mb-4">
        <p className="text-sm text-slate-400 mb-2">Matched Skills</p>
        <div className="flex flex-wrap gap-2">
          {matchedSkills.map(skill => (
            <span
              key={skill}
              className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div>
        <p className="text-sm text-slate-400 mb-2">Missing Skills</p>
        <div className="flex flex-wrap gap-2">
          {missingSkills.map(skill => (
            <span
              key={skill}
              className="px-3 py-1 text-sm rounded-full bg-red-500/10 text-red-400 border border-red-500/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillGapCard;