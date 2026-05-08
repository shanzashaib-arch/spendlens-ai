"use client";

import { useEffect, useState } from "react";
// We go UP one level out of 'app' to find 'components' and 'data'
import ToolCard from "../components/ToolCard";
import { TOOL_OPTIONS, USE_CASES } from "../data/tools";

export default function Home() {
  const [tools, setTools] = useState([
    {
      id: 1,
      tool: "",
      plan: "",
      monthlySpend: 0,
      seats: 1,
    },
  ]);

  const [teamSize, setTeamSize] = useState(1);
  const [useCase, setUseCase] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem("audit-form");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setTools(parsed.tools || []);
      setTeamSize(parsed.teamSize || 1);
      setUseCase(parsed.useCase || "");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "audit-form",
      JSON.stringify({
        tools,
        teamSize,
        useCase,
      })
    );
  }, [tools, teamSize, useCase]);

  const handleToolChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedTools = [...tools];
    updatedTools[index] = {
      ...updatedTools[index],
      [field]: value,
    };
    setTools(updatedTools);
  };

  const addTool = () => {
    setTools([
      ...tools,
      {
        id: Date.now(),
        tool: "",
        plan: "",
        monthlySpend: 0,
        seats: 1,
      },
    ]);
  };

  const removeTool = (index: number) => {
    const updated = tools.filter((_, i) => i !== index);
    setTools(updated);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm text-green-400 mb-4">
            AI Spend Optimization Platform
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Stop Overpaying
            <br />
            For AI Tools
          </h1>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl">
            Analyze your AI stack and discover smarter pricing opportunities.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              Audit Your AI Stack
            </h2>
            <button
              onClick={addTool}
              className="bg-green-500 text-black px-5 py-2 rounded-xl font-semibold"
            >
              + Add Tool
            </button>
          </div>

          <div className="space-y-6">
            {tools.map((tool, index) => (
              <ToolCard
                key={tool.id}
                index={index}
                tool={tool}
                toolOptions={TOOL_OPTIONS}
                onChange={handleToolChange}
                onRemove={removeTool}
              />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <input
              type="number"
              placeholder="Team Size"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3"
            />
            <select
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3"
            >
              <option value="">Select Use Case</option>
              {USE_CASES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button className="mt-8 w-full bg-green-500 text-black py-4 rounded-xl font-bold hover:opacity-90">
            Generate Audit
          </button>
        </div>
      </section>
    </main>
  );
}