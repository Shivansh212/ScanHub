import { type ResumeStatusType } from "../../services/resumeService";

const StatusColorMap: Record<ResumeStatusType, string> = {
  NOT_UPLOADED: "text-white-400",
  UPLOADING: "text-blue-400",
  PARSING: "text-yellow-400 animate-pulse",
  COMPLETED: "text-green-400",
  FAILED: "text-red-400",
};

const StatusLabelMap: Record<ResumeStatusType, string> = {
  NOT_UPLOADED: "Not Uploaded",
  UPLOADING: "Uploading",
  PARSING: "Parsing Resume",
  COMPLETED: "Completed",
  FAILED: "Parsing Failed",
};

const ResumeStatus = ( {status} : {status :ResumeStatusType})=>{

  return (
    <div className="bg-[#161920] border border-slate-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Resume Status</h2>
      <p className="text-slate-400 text-sm mb-1">Current Status</p>
      <p className={`text-lg font-semibold ${StatusColorMap[status]}`}>
        {StatusLabelMap[status]}
      </p>
    </div>
  );
};

export default ResumeStatus;