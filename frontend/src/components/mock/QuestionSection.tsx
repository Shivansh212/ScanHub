interface Props {
    title: string;
    questions: string[];
    color: 'blue' | 'amber' | 'emerald' | 'red'; 
    emoji: string;
}

const QuestionSection = ({ title, questions, color, emoji }: Props) => {
    const colorClasses = {
        blue: "border-blue-500/30 bg-blue-500/5 text-blue-400",
        amber: "border-amber-500/30 bg-amber-500/5 text-amber-400",
        emerald: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
        red: "border-red-500/30 bg-red-500/5 text-red-400",
    };

    return (
        <div className={`p-6 border rounded-3xl transition-all hover:scale-[1.05] ${colorClasses[color]}`}>
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{emoji}</span>
                <h2 className="text-xl font-black uppercase tracking-tight text-white">{title}</h2>
            </div>
            
            <ul className="space-y-4">
                {questions.map((q, i) => (
                    <li key={i} className="flex gap-4 group">
                        <span className="font-mono text-sm opacity-50 mt-1">{i + 1}.</span>
                        <p className="text-slate-200 leading-relaxed group-hover:text-lime-400  transition-colors">
                            {q}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionSection;