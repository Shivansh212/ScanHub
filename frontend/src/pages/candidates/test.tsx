// export type ResumeAnalysisResponse = {
//   resume_score: number;
//   matched_skills: string[];
//   missing_skills: string[];
//   suggestions: string[];
// };

// export const fetchResumeAnalysis = async (): Promise<ResumeAnalysisResponse> => {
//   //  Could have used axios (api.post) here too but fetch is a built in browser method for making a specific service "lightweight".
//   const res = await fetch("/api/candidate/resume/analysis", {
//     credentials: "include",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch resume analysis");
//   }

//   return res.json();
// };