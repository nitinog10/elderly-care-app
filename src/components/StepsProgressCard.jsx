import { useBand } from "@/context/BandContext";

export default function StepsProgressCard() {
  const { currentBand } = useBand();
  if (!currentBand) return null;

  const steps = Number(currentBand?.vitals?.steps ?? 0);
  const TARGET_STEPS = Number(currentBand?.settings?.stepTarget ?? 10000);

  const progress = Math.min((steps / TARGET_STEPS) * 100, 100);
  const stepsLeft = Math.max(TARGET_STEPS - steps, 0);

  return (
    <div className="w-full backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl shadow-2xl p-4 md:p-6 card-hover overflow-hidden relative group">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex justify-between mb-3">
          <h5 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <span className="text-2xl animate-float">🚶</span>
            Steps
          </h5>
          <span className="text-xs text-slate-600 bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 rounded-full font-semibold border border-indigo-200/50">Today</span>
        </div>

        <div className="flex justify-center my-6 relative">
          <svg width="180" height="180" viewBox="0 0 36 36" className="transform transition-transform duration-300 group-hover:scale-105">
            <circle 
              cx="18" 
              cy="18" 
              r="15.915" 
              fill="none" 
              stroke="#e2e8f0" 
              strokeWidth="3"
              className="transition-all duration-500"
            />
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              stroke={progress >= 100 ? "url(#successGradient)" : "url(#progressGradient)"}
              strokeWidth="3"
              strokeDasharray={`${progress} ${100 - progress}`}
              strokeDashoffset="25"
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                filter: progress >= 100 ? 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.6))' : 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))'
              }}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>

            <text 
              x="18" 
              y="18" 
              textAnchor="middle" 
              dominantBaseline="central" 
              className="fill-slate-900 text-[4px] font-bold transition-all duration-300"
            >
              {steps.toLocaleString()}
            </text>

            <text 
              x="18" 
              y="22" 
              textAnchor="middle" 
              className="fill-slate-500 text-[2.5px]"
            >
              / {TARGET_STEPS.toLocaleString()}
            </text>
          </svg>
        </div>

        <div className="text-center mb-4">
          {stepsLeft > 0 ? (
            <p className="text-sm text-slate-600 animate-fade-in font-medium">
              {stepsLeft.toLocaleString()} steps left to reach your goal
            </p>
          ) : (
            <p className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent animate-bounce-slow">
              🎉 Daily goal achieved!
            </p>
          )}
        </div>

        <div className="border-t border-slate-200/50 mt-4 pt-4 flex justify-between text-sm">
          <span className="text-slate-500 font-medium">Target: {TARGET_STEPS.toLocaleString()}</span>
          <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-lg transition-all duration-300 group-hover:scale-110 inline-block">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
