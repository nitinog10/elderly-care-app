import { useEffect, useState } from "react";

export default function TemperatureCard() {
  const [temperature, setTemperature] = useState(36.7);
  const [history, setHistory] = useState([36.5, 36.6, 36.7, 36.8, 36.7, 36.6]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTemp = +(36 + Math.random() * 1.2).toFixed(1);

      setTemperature(newTemp);
      setHistory(prev => [...prev.slice(1), newTemp]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatus = () => {
    if (temperature >= 38) return { label: "High (Fever)", color: "text-rose-600", gradient: "from-rose-600 to-red-600" };
    if (temperature < 36) return { label: "Low", color: "text-blue-600", gradient: "from-blue-600 to-cyan-600" };
    return { label: "Normal", color: "text-emerald-600", gradient: "from-emerald-600 to-teal-600" };
  };

  const status = getStatus();

  const points = history
    .map((t, i) => `${i * 50},${120 - (t - 35) * 40}`)
    .join(" ");

  return (
    <div className="w-full backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl shadow-2xl p-4 md:p-6 card-hover overflow-hidden relative group">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <div>
            <h5 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="text-2xl animate-pulse-slow">🌡</span>
              Body Temperature
            </h5>
            <p className={`text-sm font-bold mt-1 transition-colors duration-300 bg-gradient-to-r ${status.gradient} bg-clip-text text-transparent`}>
              {status.label}
            </p>
          </div>

          <div className="text-right">
            <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-110">
              <span className="inline-block animate-fade-in">{temperature}</span>
              <span className="text-xl text-slate-500">°C</span>
            </p>
          </div>
        </div>

        {/* Line Graph */}
        <div className="mb-4 relative">
          <svg viewBox="0 0 300 120" className="w-full h-24">
            <defs>
              <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#tempGradient)"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={points}
              className="transition-all duration-700 ease-in-out"
            />
          </svg>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200/50 mt-4 pt-4 flex justify-between text-sm">
          <span className="text-slate-500 font-medium">Live monitoring</span>
          <span className={`bg-gradient-to-r ${status.gradient} bg-clip-text text-transparent font-bold flex items-center gap-1`}>
            <span className="animate-pulse">●</span> {status.label}
          </span>
        </div>
      </div>
    </div>
  );
}
