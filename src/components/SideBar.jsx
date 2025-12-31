import { Link, useLocation } from "react-router-dom";
import { Activity, Bell, Heart, LayoutDashboard,Target, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBand } from "@/context/BandContext";


export function Sidebar() {
  const location = useLocation().pathname;
  const { bands, currentBand, setCurrentBandId } = useBand();


  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/history", label: "Alert History", icon: Bell },
    { href: "/emergency-contacts", label: "Emergency Contacts", icon: Activity },
    { href: "/sos", label: "SOS", icon: Heart },
    { href: "/step-target", label: "Step Goal", icon: Target }, 
    { href: "/voice-assistant", label: "CareVoice AI", icon: Mic },
  ];

  return (
    <div className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 border-r border-slate-200/50 backdrop-blur-xl bg-white/80 z-50 shadow-2xl animate-slide-in-left">
      <div className="p-6 flex items-center gap-3 animate-fade-in-down border-b border-slate-200/50">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30 transition-transform duration-300 hover:scale-110 hover:rotate-6">
          <Heart className="text-white h-6 w-6 fill-current animate-heartbeat" />
        </div>
        <div>
          <h1 className="font-bold text-xl leading-none bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            EIRAA
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Elderly Monitor</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
      {/* Navigation */}
      <nav className="px-4 py-6 space-y-2">
        {navItems.map((item, index) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group animate-fade-in-up",
                isActive
                  ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/40 scale-105"
                  : "text-slate-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-slate-900 hover:scale-[1.02]"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full animate-scale-in" />
              )}
              <item.icon className={cn(
                "w-5 h-5 transition-all duration-300", 
                isActive && "stroke-[2.5px] scale-110",
                !isActive && "group-hover:scale-110"
              )} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Band Switcher */}
      <div className="mx-3 mb-4 rounded-2xl bg-gradient-to-br from-slate-50/80 to-indigo-50/30 border border-slate-200/50 backdrop-blur-sm p-4 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <p className="text-xs text-slate-600 mb-2 font-semibold">Current Band</p>

        <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl p-3 mb-3 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
          <p className="font-semibold">{currentBand.name}</p>
          <span className="text-xs font-bold bg-white/25 backdrop-blur-sm px-2.5 py-1 rounded-full animate-pulse-slow">
            Active
          </span>
        </div>


        <p className="text-xs text-slate-600 mb-2 font-semibold">Switch Band</p>

        <div className="space-y-2">
          {bands.map((band, index) => (

            <button
              key={band.id}
              onClick={() => setCurrentBandId(band.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 animate-fade-in-up",
                band.id === currentBand.id
                  ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg scale-105"
                  : "hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 text-slate-700 hover:scale-[1.02] active:scale-95 border border-slate-200/50"
              )}
              style={{ animationDelay: `${0.4 + index * 0.05}s` }}
            >
              <span className="font-semibold">{band.name}</span>

              {band.id === currentBand.id && (
                <span className="text-xs bg-white/25 backdrop-blur-sm px-2 py-1 rounded-full animate-scale-in font-bold">
                  ✓
                </span>
              )}
            </button>


          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/50">
          <Link
            to="/connect"
            className="block text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg"
          >
            ➕ Add More Band
          </Link>
        </div>
      </div>
      </div>

      <div className="p-4 border-t border-slate-200/50 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-2xl p-4 border border-emerald-200/50 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">System Online</span>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Wristband connected. Receiving real-time telemetry.
          </p>
        </div>
      </div>
    </div>
  );
}

export function MobileHeader() {
  return (
    <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200/50 backdrop-blur-xl bg-white/80 sticky top-0 z-40 shadow-lg animate-fade-in-down">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30 transition-transform duration-300 hover:scale-110">
          <Heart className="text-white h-4 w-4 fill-current animate-heartbeat" />
        </div>
        <span className="font-bold text-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          CareConnect
        </span>
      </div>
      <div className="flex gap-4">
        <Link 
          to="/" 
          className="p-2 text-slate-600 hover:text-indigo-600 transition-all duration-300 hover:scale-110 active:scale-95 rounded-lg hover:bg-indigo-50"
        >
          <LayoutDashboard className="w-5 h-5" />
        </Link>
        <Link 
          to="/history" 
          className="p-2 text-slate-600 hover:text-indigo-600 transition-all duration-300 hover:scale-110 active:scale-95 rounded-lg hover:bg-indigo-50"
        >
          <Bell className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

