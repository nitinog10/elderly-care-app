```jsx
import { useState } from "react";
import { useBand } from "@/context/BandContext";
import { addContactToBand } from "@/utils/bandUtils";

export default function EmergencyContacts() {
  const { currentBand, setBands } = useBand();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!currentBand) {
    return <p className="p-6">No band selected.</p>;
  }

  const handleAddContact = () => {
    if (!name ||!phone) return;

    setBands(addContactToBand(currentBand.id, { name, phone }, setBands));

    setName("");
    setPhone("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">
        Emergency Contacts – {currentBand.name}
      </h2>

      <div className="space-y-3 mb-6">
        {currentBand.contacts.length === 0 && (
          <p className="text-gray-500 text-sm">No contacts added yet.</p>
        )}

        {currentBand.contacts.map((c, i) => (
          <div
            key={i}
            className="flex justify-between items-center bg-white p-3 rounded-xl shadow"
          >
            <span className="font-medium">{c.name}</span>
            <span className="text-gray-600">{c.phone}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <h3 className="font-semibold">Add New Contact</h3>

        <input
          className="w-full border p-2 rounded-lg"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded-lg"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={handleAddContact}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Add Contact
        </button>
      </div>
    </div>
  );
}
```