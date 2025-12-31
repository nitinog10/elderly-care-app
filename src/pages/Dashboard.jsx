import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useBand } from "@/context/BandContext";
import HeartRateCard from "@/components/HeartRateCard";
import StepsProgressCard from "@/components/StepsProgressCard";
import TemperatureCard from "@/components/TemperatureCard";

export default function Dashboard() {
  const { currentBand, setBands } = useBand();
  const navigate = useNavigate();

  /* ===============================
     1️⃣ SENSOR + FALL SIMULATION
     =============================== */
  useEffect(() => {
    if (!currentBand) return;

    const interval = setInterval(() => {
      const fallHappened = Math.random() < 0.05; // 5% chance

      setBands(prev =>
        prev.map(b => {
          if (b.id !== currentBand.id) return b;

          const newHeartRate = 70 + Math.floor(Math.random() * 15);
          const newTemp = +(36 + Math.random()).toFixed(1);
          const newSteps = b.vitals.steps + Math.floor(Math.random() * 10);

          return {
            ...b,
            vitals: {
              ...b.vitals,
              heartRate: newHeartRate,
              temperature: newTemp,
              steps: newSteps,
              battery: Math.max(0, b.vitals.battery - 0.02),
              fallDetected: fallHappened,

              heartHistory: [
                ...b.vitals.heartHistory.slice(1),
                newHeartRate,
              ],
              tempHistory: [
                ...b.vitals.tempHistory.slice(1),
                newTemp,
              ],
            },

            alerts: fallHappened
              ? [
                  ...(b.alerts || []),
                  {
                    type: "Fall Detected",
                    message: "Sudden fall detected by accelerometer",
                    time: Date.now(),
                  },
                ]
              : b.alerts,
          };
        })
      );

      if (fallHappened) {
        setTimeout(() => navigate("/sos"), 800);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentBand, setBands, navigate]);

  /* ===============================
     2️⃣ REMINDER VOICE TRIGGER
     =============================== */
  useEffect(() => {
    if (!currentBand) return;

    const interval = setInterval(() => {
      const now = new Date();

      currentBand.reminders?.forEach(r => {
        if (!r.completed && new Date(r.time) <= now) {
          alert(`🎧 ${r.voice} says: ${r.message}`);

          setBands(prev =>
            prev.map(b =>
              b.id === currentBand.id
                ? {
                    ...b,
                    reminders: b.reminders.map(rem =>
                      rem.id === r.id
                        ? { ...rem, completed: true }
                        : rem
                    ),
                  }
                : b
            )
          );
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentBand, setBands]);

  /* ===============================
     UI
     =============================== */

  if (!currentBand) {
    return <p className="p-6">No band connected.</p>;
  }

  const { vitals } = currentBand;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 via-purple-50/20 to-slate-50 p-6 animate-fade-in relative overflow-hidden">
      {/* Modern background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/10 to-purple-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-200/10 to-teal-200/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 animate-fade-in-down mb-8">
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {currentBand.name}
        </h2>
        <p className="text-sm mb-4 text-slate-600 animate-fade-in font-medium">
          You're connected. Your family is always with you.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <HeartRateCard />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <StepsProgressCard />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <TemperatureCard />
        </div>

        <div className="backdrop-blur-xl bg-white/70 p-6 rounded-3xl shadow-xl card-hover border border-white/50 animate-fade-in-up relative overflow-hidden group" style={{ animationDelay: '0.4s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg animate-pulse-slow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700">Battery Level</h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mt-1">
                  {vitals.battery.toFixed(1)}%
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 mt-4 overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full transition-all duration-700 ease-out shadow-lg"
                style={{ width: `${vitals.battery}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 p-6 rounded-3xl shadow-2xl card-hover text-white animate-fade-in-up relative overflow-hidden group" style={{ animationDelay: '0.5s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl animate-heartbeat">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">SOS Emergency</h3>
            </div>
            <Link
              to="/sos"
              className="block w-full bg-white/95 backdrop-blur-sm text-rose-600 py-3.5 rounded-xl text-center text-lg font-bold mt-2 hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
            >
              Trigger SOS
            </Link>
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/70 p-6 rounded-3xl shadow-xl card-hover border border-white/50 animate-fade-in-up relative overflow-hidden group" style={{ animationDelay: '0.6s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg animate-float">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-700">Reminders</h3>
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-1">
                  {currentBand.reminders?.length || 0}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3 font-medium">
              Active reminders set
            </p>
          </div>
        </div>

        <div
          className={`backdrop-blur-xl bg-white/70 p-6 rounded-3xl shadow-xl card-hover border-2 transition-all duration-500 animate-fade-in-up relative overflow-hidden group ${
            vitals.fallDetected
              ? "border-rose-500 animate-pulse bg-rose-50/70"
              : "border-slate-200/50"
          }`}
          style={{ animationDelay: '0.7s' }}
        >
          <div className={`absolute inset-0 transition-opacity duration-300 ${
            vitals.fallDetected 
              ? 'bg-gradient-to-br from-rose-500/10 to-red-500/10 opacity-100' 
              : 'bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100'
          }`} />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-3 rounded-2xl shadow-lg ${
                vitals.fallDetected 
                  ? 'bg-gradient-to-br from-rose-500 to-red-500 animate-bounce' 
                  : 'bg-gradient-to-br from-emerald-500 to-teal-500 animate-float'
              }`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-700">Fall Detection</h3>
            </div>
            <p className={`mt-2 font-bold text-lg transition-all duration-300 ${
              vitals.fallDetected 
                ? 'text-rose-600 animate-pulse' 
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent'
            }`}>
              {vitals.fallDetected
                ? "⚠️ Fall Detected!"
                : "✓ No Fall Detected"}
            </p>

          {vitals.fallDetected && (
            <Link
              to="/sos"
              className="block mt-4 text-center bg-gradient-to-r from-rose-600 to-red-600 text-white py-2.5 rounded-xl font-semibold hover:from-rose-700 hover:to-red-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl animate-fade-in-up"
            >
              Go to SOS
            </Link>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
