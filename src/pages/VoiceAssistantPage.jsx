import { useState } from "react";
import { useBand } from "@/context/BandContext";

export default function VoiceAssistantPage() {
  const { currentBand, setBands } = useBand();
  if (!currentBand) return null;

  /* ===============================
     HELPERS
     =============================== */
  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const getCurrentTime12 = () => {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return { h: h.toString(), m, ampm };
  };

  const buildDateTime = () => {
    let h = Number(timeHour);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;

    return `${date}T${h.toString().padStart(2, "0")}:${timeMinute}`;
  };

  /* ===============================
     STATE
     =============================== */
  const [date, setDate] = useState(getTodayDate());

  const nowTime = getCurrentTime12();
  const [timeHour, setTimeHour] = useState(nowTime.h);
  const [timeMinute, setTimeMinute] = useState(nowTime.m);
  const [period, setPeriod] = useState(nowTime.ampm);

  const [message, setMessage] = useState("");
  const [voice, setVoice] = useState("Son");

  /* ===============================
     ADD REMINDER
     =============================== */
  const addReminder = () => {
    if (!message || !date || !timeHour || !timeMinute) return;

    const reminder = {
      id: Date.now().toString(),
      message,
      time: buildDateTime(),
      voice,
      completed: false,
    };

    setBands(prev =>
      prev.map(b =>
        b.id === currentBand.id
          ? {
              ...b,
              reminders: [...(b.reminders || []), reminder],
            }
          : b
      )
    );

    setMessage("");
  };

  const pending = (currentBand.reminders || []).filter(r => !r.completed);
  const completed = (currentBand.reminders || []).filter(r => r.completed);

  /* ===============================
     UI
     =============================== */
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-2">🎙 CareVoice AI</h2>
      <p className="text-sm text-gray-600 mb-6">
        Voice reminders in a familiar voice
      </p>

      {/* Add Reminder */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="Reminder message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Date */}
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Time */}
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            max="12"
            className="border p-2 rounded w-1/3"
            value={timeHour}
            onChange={(e) => setTimeHour(e.target.value)}
            placeholder="HH"
          />
          <input
            type="number"
            min="0"
            max="59"
            className="border p-2 rounded w-1/3"
            value={timeMinute}
            onChange={(e) =>
              setTimeMinute(e.target.value.padStart(2, "0"))
            }
            placeholder="MM"
          />
          <select
            className="border p-2 rounded w-1/3"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>

        <select
          className="w-full border p-2 rounded"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
        >
          <option>Self</option>
          <option>Son</option>
          <option>Daughter</option>
        </select>

        <button
          onClick={addReminder}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          ➕ Add Reminder
        </button>
      </div>

      {/* 🔴 Pending */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-red-600">
          🔴 Pending Reminders
        </h3>

        {pending.length === 0 && (
          <p className="text-sm text-gray-500">No pending reminders</p>
        )}

        {pending.map(r => (
          <div
            key={r.id}
            className="bg-red-50 border border-red-200 p-3 rounded-xl mb-2"
          >
            <p className="font-medium text-red-800">{r.message}</p>
            <p className="text-sm text-red-600">
              🕒 {new Date(r.time).toLocaleString()} • 🎧 {r.voice}
            </p>
          </div>
        ))}
      </div>

      {/* 🟢 Completed */}
      <div>
        <h3 className="font-semibold mb-2 text-green-600">
          🟢 Delivered Reminders
        </h3>

        {completed.length === 0 && (
          <p className="text-sm text-gray-500">
            No delivered reminders yet
          </p>
        )}

        {completed.map(r => (
          <div
            key={r.id}
            className="bg-green-50 border border-green-200 p-3 rounded-xl mb-2"
          >
            <p className="font-medium text-green-800">{r.message}</p>
            <p className="text-sm text-green-600">
              🕒 {new Date(r.time).toLocaleString()} • 🎧 {r.voice}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
