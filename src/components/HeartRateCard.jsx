import { useBand } from "@/context/BandContext";

export default function HeartRateCard() {
  const { currentBand } = useBand();

  if (!currentBand) return null;

  const { heartRate, heartHistory } = currentBand.vitals;

  // Convert heartHistory → SVG polyline points
  const points = heartHistory
    .map((val, i) => `${i * 50},${100 - (val - 60) * 2}`)
    .join(" ");

  return (
    <div className="w-full backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl shadow-2xl p-4 md:p-6 card-hover overflow-hidden relative group">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-rose-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h5 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
              <span className="inline-block animate-pulse-slow">{heartRate}</span>
              <span className="text-sm font-medium text-slate-500 ml-1">BPM</span>
            </h5>
            <p className="text-slate-600 text-sm mt-1 font-medium">Heart Rate</p>
          </div>

          <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Live
          </div>
        </div>

        {/* Graph */}
        <div className="mb-4 relative">
          <svg viewBox="0 0 300 120" className="w-full h-24">
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e11d48" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#fb7185" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#heartGradient)"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={points}
              className="transition-all duration-700 ease-in-out"
            />
          </svg>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-slate-200/50 pt-4 text-sm">
          <span className="text-slate-500 font-medium">Real-time heart activity</span>
          <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent font-bold flex items-center gap-1">
            <span className="animate-pulse">●</span> Monitoring
          </span>
        </div>
      </div>
    </div>
  );
}
