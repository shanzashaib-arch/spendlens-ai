"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAudit() {
  const router = useRouter();
  const [tool, setTool] = useState("");
  const [plan, setPlan] = useState("");
  const [seats, setSeats] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tempId = "test-audit-123"; 
    router.push(`/audit/${tempId}`);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">New AI Spend Audit</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Label + Select with ID */}
          <div>
            <label htmlFor="tool-select" className="block text-sm font-medium mb-2 text-gray-400">
              Select AI Tool
            </label>
            <select 
              id="tool-select"
              className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              required
            >
              <option value="">Choose a tool...</option>
              <option value="ChatGPT">ChatGPT</option>
              <option value="Claude">Claude</option>
              <option value="Cursor">Cursor</option>
            </select>
          </div>

          {/* Label + Input with ID */}
          <div>
            <label htmlFor="plan-input" className="block text-sm font-medium mb-2 text-gray-400">
              Current Plan
            </label>
            <input 
              id="plan-input"
              type="text"
              placeholder="e.g. Pro, Team, Business"
              className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="seats-input" className="block text-sm font-medium mb-2 text-gray-400">
              Number of Seats
            </label>
            <input 
              id="seats-input"
              type="number"
              min="1"
              className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              required
            />
          </div>

          {/* Button with aria-label */}
          <button 
            type="submit"
            aria-label="Generate audit report and analyze spend"
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-lg transition-all"
          >
            Run Spend Analysis →
          </button>
        </form>
      </div>
    </main>
  );
}