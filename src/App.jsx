import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ConnectBand from "./pages/ConnectBand";
import Dashboard from "./pages/Dashboard";
import SOS from "./pages/SOS";
import EmergencyContacts from "./pages/EmergencyContacts";
import AlertHistory from "./pages/AlertHistory";
import { Sidebar, MobileHeader } from "./components/SideBar";
import StepTargetPage from "@/pages/StepTargetPage";
import VoiceAssistantPage from "@/pages/VoiceAssistantPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages (NO sidebar) */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/connect" element={<ConnectBand />} />

        {/* App Pages (WITH sidebar) */}
        <Route
          path="/sos"
          element={
            <div className="flex animate-fade-in">
              <Sidebar />

              <div className="flex-1 md:ml-64 animate-fade-in-up">
                <MobileHeader />
                <SOS />
              </div>
            </div>
          }
        />

        <Route path="/emergency-contacts" element={
          <div className="flex animate-fade-in">
              <Sidebar />

              <div className="flex-1 md:ml-64 animate-fade-in-up">
                <MobileHeader />
                <EmergencyContacts />
              </div>
            </div>
        }/>

        <Route
          path="/dashboard"
          element={
            <div className="flex animate-fade-in">
              <Sidebar />

              <div className="flex-1 md:ml-64 animate-fade-in-up">
                <MobileHeader />
                <Dashboard />
              </div>
            </div>
          }
        />

        <Route 
        path="/history" 
        element={
          <div className="flex animate-fade-in">
              <Sidebar />

              <div className="flex-1 md:ml-64 animate-fade-in-up">
                <MobileHeader />
                <AlertHistory />
              </div>
            </div>
        } 
        />

        <Route path="/step-target" element={
          <div className="flex animate-fade-in">
              <Sidebar />

              <div className="flex-1 md:ml-64 animate-fade-in-up">
                <MobileHeader />
                <StepTargetPage />
              </div>
            </div>

          } />

          <Route path="/voice-assistant" element={
            <div className="flex animate-fade-in">
              <Sidebar />

              <div className="flex-1 md:ml-64 animate-fade-in-up">
                <MobileHeader />
                <VoiceAssistantPage />
              </div>
            </div>
            } />



      </Routes>
    </BrowserRouter>
  );
}
