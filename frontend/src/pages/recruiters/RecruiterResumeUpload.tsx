import React from "react";

interface Props {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const RecruiterResumeUpload = ({ files, setFiles }: Props ) => {
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    if (files.length + newFiles.length > 20) {
      alert("Maximum 20 Resumes Allowed");
      return;
    }
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl h-fit hover:border-indigo-500 transition-all duration-300">

      <h2 className="text-xl font-semibold mb-4 text-white">
        Upload Candidate Resumes
      </h2>

      {/* Upload Box */}
      <label className="flex flex-col items-center justify-center w-full p-6 
                        border-2 border-dashed border-white/20 
                        rounded-xl cursor-pointer 
                        bg-white/5 
                        hover:border-indigo-500 hover:bg-indigo-500/5 
                        transition-all duration-300">

        <span className="text-2xl mb-2">📂</span>
        <span className="text-sm text-gray-300">
          Select Multiple Resumes
        </span>

        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2 max-h-40 overflow-y-auto pr-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white/5 px-3 py-2 rounded-lg text-sm"
            >
              <span className="truncate">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-red-400 hover:text-red-300 text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400">
        {files.length} file(s) selected
      </div>

    </div>
  );
};

export default RecruiterResumeUpload;