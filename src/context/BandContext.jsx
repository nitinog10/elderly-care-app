import { createContext, useContext, useState } from "react";

const BandContext = createContext();

export function BandProvider({ children }) {
  const [bands, setBands] = useState([
    {
      id: "band-001",
      name: "Grandpa's Band",
      contacts: [
        { name: "Son", phone: "+91 98765 43210" },
      ],
      alerts: [],
      vitals: {
        heartRate: 78,
        heartHistory: [70, 72, 75, 73, 76, 78, 77],
        steps: 4200,
        temperature: 36.7,
        tempHistory: [36.4, 36.5, 36.6],
        battery: 82,
        fallDetected: false,
      },
      settings: {
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
    },
  ]);

  const [currentBandId, setCurrentBandId] = useState("band-001");

  const currentBand = bands.find(b => b.id === currentBandId);

  return (
    <BandContext.Provider
      value={{
        bands,
        setBands,
        currentBand,
        setCurrentBandId,
      }}
    >
      {children}
    </BandContext.Provider>
  );
}

export function useBand() {
  return useContext(BandContext);
}
