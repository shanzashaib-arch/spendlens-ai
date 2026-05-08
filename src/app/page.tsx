"use client";

import { generateAudit } from "../lib/auditEngine";
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
  const [results, setResults] = useState<any[]>([]); 
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
  const handleGenerateAudit = () => {

    const auditResults = generateAudit(
    tools,
    teamSize
  );

  setResults(auditResults);
};
const totalMonthlySavings = results.reduce(
  (acc, item) => acc + item.estimatedSavings,
  0
);

const totalAnnualSavings =
  totalMonthlySavings * 12;

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

          <button
  onClick={handleGenerateAudit}
  className="mt-8 w-full bg-green-500 text-black py-4 rounded-xl font-bold hover:opacity-90"
>
  Generate Audit
</button>
        </div>
      </section>

      {results.length > 0 && (

  <section className="max-w-5xl mx-auto px-6 pb-20">

    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

      <h2 className="text-4xl font-bold mb-2">
        Audit Results
      </h2>

      <p className="text-zinc-400 mb-8">
        Personalized optimization recommendations for your AI stack.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-8">

  <div className="bg-black rounded-2xl p-6 border border-zinc-800">
    <p className="text-zinc-500">
      Total Monthly Savings
    </p>

    <h3 className="text-5xl font-bold text-green-400 mt-2">
      ${totalMonthlySavings}
    </h3>
  </div>

  <div className="bg-black rounded-2xl p-6 border border-zinc-800">
    <p className="text-zinc-500">
      Total Annual Savings
    </p>

    <h3 className="text-5xl font-bold text-green-400 mt-2">
      ${totalAnnualSavings}
    </h3>
  </div>

</div>

      <div className="space-y-6">

        {results.map((result, index) => (

          <div
            key={index}
            className="bg-black border border-zinc-800 rounded-2xl p-6"
          >

            <div className="flex justify-between items-start flex-wrap gap-4">

              <div>
                <h3 className="text-2xl font-semibold">
                  {result.tool}
                </h3>

                <p className="text-zinc-400 mt-2 max-w-2xl">
                  {result.reason}
                </p>
              </div>

              <div className="text-right">
                <p className="text-zinc-500 text-sm">
                  Estimated Savings
                </p>

                <p className="text-3xl font-bold text-green-400">
                  ${result.estimatedSavings}/mo
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="bg-zinc-900 rounded-xl p-4">
                <p className="text-zinc-500 text-sm">
                  Current Spend
                </p>

                <p className="text-xl font-semibold">
                  ${result.currentSpend}
                </p>
              </div>

              <div className="bg-zinc-900 rounded-xl p-4">
                <p className="text-zinc-500 text-sm">
                  Recommended Plan
                </p>

                <p className="text-xl font-semibold">
                  {result.recommendedPlan}
                </p>
              </div>

              <div className="bg-zinc-900 rounded-xl p-4">
                <p className="text-zinc-500 text-sm">
                  Annual Savings
                </p>

                <p className="text-xl font-semibold text-green-400">
                  ${result.estimatedSavings * 12}
                </p>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>

  </section>
)}
    </main>
  );
}