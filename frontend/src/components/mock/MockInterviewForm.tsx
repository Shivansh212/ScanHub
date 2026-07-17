import { useState } from "react";

interface Props {
    onGenerate : (data:any) => void;
}

const MockInterviewForm = ( {onGenerate} : Props) =>{
    const [targetrole, setTargetRole] = useState("");
    const [experience, setExperience] = useState("");
    const [jobdescription, setJobDescription] = useState("");
    const [matchedSkills, setMatchedSkills] = useState("");
    const [missingSkills, setMissingSkills] = useState("");

    const handleSubmit = (e : any)=>{
        e.preventDefault();
        onGenerate({
            target_role : targetrole,
            experience_level : experience,
            job_description : jobdescription,
            matched_skills : matchedSkills.split(",").map((skill) => skill.trim()),
            missing_skills : missingSkills.split(",").map((skill) => skill.trim())
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-[#111318] border border-slate-800 p-6 rounded-3xl shadow-2xl space-y-5">
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Target Role</label>
                <input 
                    type="text"
                    placeholder="e.g. Backend Developer"
                    value={targetrole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-[#0f1115] border border-slate-700 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    required 
                />
            </div>

            <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Experience Level</label>
                <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-[#0f1115] border border-slate-700 text-white focus:border-blue-500 outline-none"
                    required
                >
                    <option value="">Select Experience</option>
                    <option value="Beginner">Beginner / Fresher</option>
                    <option value="Intermediate">Intermediate (1-3 yrs)</option>
                    <option value="Advanced">Advanced (4+ yrs)</option>
                </select>
            </div>

            <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Job Description</label>
                <textarea 
                    placeholder="Paste the JD here..."
                    value={jobdescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-[#0f1115] border border-slate-700 text-white focus:border-blue-500 outline-none min-h-[150px]"
                    required
                />
            </div>

            {/* Matched Skills */}
            <div>
                <label className="text-xs font-bold text-emerald-500/80 uppercase tracking-widest ml-1">Matched Skills</label>
                <input 
                    type="text"
                    placeholder="Matched Skills (comma separated) Analyze your resume first to find out Matching Skills from JD"
                    value={matchedSkills}
                    onChange={(e) => setMatchedSkills(e.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-[#0f1115] border border-emerald-900/30 text-white focus:border-emerald-500 outline-none transition-all"
                />
            </div>

            {/* Missing Skills */}
            <div>
                <label className="text-xs font-bold text-amber-500/80 uppercase tracking-widest ml-1">Missing Skills</label>
                <input 
                    type="text"
                    placeholder="Missing Skills (comma separated) Analyze your resume first to find out Matching Skills from JD"
                    value={missingSkills}
                    onChange={(e) => setMissingSkills(e.target.value)}
                    className="w-full mt-1 px-4 py-3 rounded-xl bg-[#0f1115] border border-amber-900/30 text-white focus:border-amber-500 outline-none transition-all"
                />
            </div>

            <button
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 uppercase tracking-tighter"
            >
                Generate Interview Prep
            </button>
        </form>
    );
};

export default MockInterviewForm;