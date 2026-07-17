import { useState } from "react";
import api from "../../services/api";
import type { ResumeStatusType } from "../../services/resumeService";

const ResumeUpload = ({setStatus, setIsUploading }: {setStatus : (s: ResumeStatusType) => void;
          setIsUploading : (v : boolean)=> void ;
  }) => {
    const [file, setFile] = useState<File | null>(null);
    const [localUploading, setLocalUploading] = useState(false);

    const handleUpload = async ()=> {
      if(!file || localUploading) return;

      const formData = new FormData();
      formData.append("resume", file);

      try{
        setLocalUploading(true);
        setIsUploading(true);
        setStatus("UPLOADING");

        await api.post("/candidate/analyze" , formData);

        setStatus("PARSING");
      }catch(err){
        console.log("Resume upload failed", err);
        setStatus("FAILED");
      }finally{
        setLocalUploading(false);
        setIsUploading(false);
      }
    };

    return (
      <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>

        <div className="space-y-4">
          <label className={`
                      flex flex-col items-center justify-center w-full p-4 
                      border-2 border-dashed rounded-xl cursor-pointer transition-all
                      ${file ? 'border-blue-500 bg-blue-500/5' : 'border-slate-700 hover:border-slate-500 bg-slate-900/50'}
          `}>
            <span className="text-2xl mb-1">{file ? "✅" : "📄"}</span>
            <span className="text-sm font-medium text-slate-300">
                {file ? file.name : "Select your Resume"}
            </span>
            <input type="file"
                  className="hidden" // hides the default "Choose file" button. 
                  accept=".pdf,.doc,.docx,.txt"
                  disabled={localUploading} 
                  onChange={(e)=> setFile(e.target.files?.[0] || null)} />
          </label>        

            <button
              onClick={handleUpload}
              disabled={localUploading || !file}
              className="mt-4 w-full bg-blue-500 py-2 rounded-lg disabled:opacity-50"
            >
              {localUploading ? "Uploading..." : "Upload Resume"}
            </button>
        </div>    
      </div>
    )
}

export default ResumeUpload;