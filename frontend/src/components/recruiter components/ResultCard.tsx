import { type CandidateResult } from "../../types";

interface ResultsCardProps {
    results: CandidateResult[] | null;
    isLoading: boolean;
}


const ResultsCard : React.FC<ResultsCardProps> = ({ results, isLoading }) => {

  if (isLoading) {
    return (
      <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/10 rounded w-1/4"></div>
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-full"></div>
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-8 text-center">
        <h2 className="text-lg font-semibold text-white">
          No Candidates Ranked Yet
        </h2>
        <p className="text-gray-400 mt-2 text-sm">
          Upload resumes and run scoring to see ranked results.
        </p>
      </div>
    );
  }

  const sortedResults = [...results].sort((a, b) => b.similarity - a.similarity);

  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-lg font-semibold text-white">
          Ranked Candidates
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="bg-white/5 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Rank</th>
              <th className="px-6 py-3">Filename</th>
              <th className="px-6 py-3">Score</th>
              <th className="px-6 py-3">Fit</th>
            </tr>
          </thead>

          <tbody>
            {sortedResults.map((item, index) => (
              <tr
                key={index}
                className="border-t border-white/5 hover:bg-white/5 transition-all duration-200"
              >
                <td className="px-6 py-4 font-medium text-white">
                  #{index + 1}
                </td>

                <td className="px-6 py-4">
                  {item.filename}
                </td>

                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-32 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-indigo-500 h-2 rounded-full transition-all duration-700"
                            style={{ width: `${item.similarity}%` }}
                        />
                        </div>
                        <span className="text-indigo-400 font-semibold">
                        {item.similarity}%
                        </span>
                    </div>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        item.Fit === "Strong Fit"
                          ? "bg-green-500/10 text-green-400"
                          : item.Fit === "Medium Fit"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                  >
                    {item.Fit}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ResultsCard;