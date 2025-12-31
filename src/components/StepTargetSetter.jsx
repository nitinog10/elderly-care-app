import { useState, useEffect } from "react";
import { useBand } from "@/context/BandContext";

export default function StepTargetSetter() {
  const { currentBand, setBands } = useBand();
  const [value, setValue] = useState(currentBand?.settings?.stepTarget || 10000);

  // 🔑 Sync input when band OR target changes
  useEffect(() => {
    if (currentBand?.settings?.stepTarget) {
      setValue(currentBand.settings.stepTarget);
    }
  }, [currentBand]);

  if (!currentBand) return null;

  const saveTarget = () => {
    setBands(prev =>
      prev.map(b =>
        b.id === currentBand.id
          ? {
              ...b,
              settings: {
                ...b.settings,
                stepTarget: Number(value),
              },
            }
          : b
      )
    );
    alert("Step target updated successfully!");
  };

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold mb-2">Daily Step Goal</h3>

      <input
        type="number"
        min={1000}
        step={500}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <button
        onClick={saveTarget}
        className="w-full bg-blue-600 text-white py-2 rounded-lg"
      >
        Save Target
      </button>
    </div>
  );
}
