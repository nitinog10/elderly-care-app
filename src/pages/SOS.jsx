import { useState } from "react";
import { useBand } from "@/context/BandContext";

export default function SOS() {
  const [showConfirm, setShowConfirm] = useState(false);
  const { currentBand } = useBand();

  if (!currentBand) {
    return <p className="p-6">No band selected.</p>;
  }

  const contacts = currentBand.contacts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-slate-50 to-rose-50 p-6 flex flex-col items-center justify-center animate-fade-in relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center animate-fade-in-down">
        <div className="mb-4 animate-scale-in">
          <div className="inline-block p-4 bg-gradient-to-br from-rose-500 to-red-500 rounded-full mb-4 shadow-2xl shadow-rose-500/50">
            <svg className="w-12 h-12 text-white animate-heartbeat" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <h2 className="text-5xl font-bold mb-3 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 bg-clip-text text-transparent">
          Emergency SOS
        </h2>

        <p className="text-slate-600 text-center mb-8 max-w-md animate-fade-in-up font-medium">
          Pressing SOS will call and message all emergency contacts immediately.
        </p>

        <button
          onClick={() => setShowConfirm(true)}
          className="w-72 h-72 rounded-full bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 text-white text-4xl font-bold shadow-2xl hover:shadow-rose-500/60 transition-all duration-300 hover:scale-110 active:scale-95 relative group animate-heartbeat"
        >
          <span className="relative z-10 drop-shadow-lg">SOS</span>
          {/* Ripple effect */}
          <span className="absolute inset-0 rounded-full bg-rose-500 opacity-0 group-hover:opacity-50 group-hover:animate-ping" />
        </button>

        <p className="text-sm text-slate-500 mt-6 animate-fade-in-up font-medium" style={{ animationDelay: '0.3s' }}>
          Use only in case of emergency
        </p>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-4"
          onClick={() => setShowConfirm(false)}
        >
          <div 
            className="backdrop-blur-xl bg-white/95 rounded-3xl p-6 w-full max-w-md shadow-2xl border border-white/50 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Confirm Emergency
              </h3>
            </div>

            <p className="text-sm text-slate-600 mb-4 font-medium">
              The following contacts will be notified immediately:
            </p>

            <div className="space-y-2 mb-6 max-h-48 overflow-y-auto">
              {contacts.length === 0 && (
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-xl text-center animate-fade-in border border-slate-200">
                  <p className="text-sm text-slate-500 font-medium">
                    No emergency contacts added.
                  </p>
                </div>
              )}

              {contacts.map((c, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-slate-50 to-indigo-50/50 p-3 rounded-xl text-sm border border-slate-200/50 animate-fade-in-up transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-indigo-200"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="font-bold text-slate-900">{c.name}</div>
                  <div className="text-slate-600 font-medium">{c.phone}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border-2 border-slate-300 rounded-xl py-3 font-bold text-slate-700 hover:bg-slate-50 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  alert("📞 Calling & 📩 Messaging all emergency contacts...");
                  setShowConfirm(false);
                }}
                className="flex-1 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-700 hover:via-pink-700 hover:to-rose-800 text-white rounded-xl py-3 font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Confirm SOS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
