import { useNavigate } from "react-router-dom";
import { useBand } from "@/context/BandContext";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function ConnectBand() {
  const navigate = useNavigate();
  const { setBands, setCurrentBandId } = useBand();

  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  function connectNewBand() {
    if (!userName.trim()) {
      setError("User name is required to connect a band");
      return;
    }

    const newBandId = `band-${Date.now()}`;

    const newBand = {
      id: newBandId,
      name: userName.trim(),
      contacts: [],
      vitals: {
        heartRate: 70,
        steps: 0,
        temperature: 36.5,
        tempHistory: [36.4, 36.5, 36.6],
        battery: 100,
        heartHistory: [70, 70, 70, 70, 70, 70, 70],
        fallDetected: false,
      },
      settings : {
        stepsTarget: 10000,
      },
      reminders: [
    {
      id: "rem-1",
      time: "2025-01-28T15:15",
      message: "Take your blood pressure medicine",
      voice: "Son",
      completed: false,
    }
  ]
    };

    setBands(prev => [...prev, newBand]);
    setCurrentBandId(newBandId);
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Connect Your Band</h2>

      {/* Name Input */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-2">Enter User Name</h3>

        {error && (
          <p className="text-red-600 text-sm mb-2">{error}</p>
        )}

        <input
          className="border p-2 w-full mb-2"
          placeholder="Enter User Name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            setError("");
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">QR Code</h3>
          <button
            onClick={connectNewBand}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Scan & Connect
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Manual Code</h3>
          <input
            className="border p-2 w-full mb-2"
            placeholder="Enter Device ID"
          />
          <button
            onClick={connectNewBand}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded"
          >
            Connect Band
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-2">Bluetooth</h3>
          <button
            onClick={connectNewBand}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Scan Devices
          </button>
        </div>
      </div>
    </div>
  );
}
