"use client";

import { generateAudit } from "../lib/auditEngine";
import { useEffect, useState } from "react";
import ToolCard from "../components/ToolCard";
import { TOOL_OPTIONS, USE_CASES } from "../data/tools";

export default function Home() {
  const [tools, setTools] = useState([
    { id: 1, tool: "", plan: "", monthlySpend: 0, seats: 1 },
  ]);

  const [teamSize, setTeamSize] = useState(1);
  const [useCase, setUseCase] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [summary, setSummary] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [loading, setLoading] = useState(false);

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
    localStorage.setItem("audit-form", JSON.stringify({ tools, teamSize, useCase }));
  }, [tools, teamSize, useCase]);

  const handleToolChange = (index: number, field: string, value: string | number) => {
    const updatedTools = [...tools];
    updatedTools[index] = { ...updatedTools[index], [field]: value };
    setTools(updatedTools);
  };

  const addTool = () => {
    setTools([...tools, { id: Date.now(), tool: "", plan: "", monthlySpend: 0, seats: 1 }]);
  };

  const removeTool = (index: number) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  const handleGenerateAudit = async () => {
    setLoading(true);
    const auditResults = generateAudit(tools, teamSize);
    setResults(auditResults);

    const totalSavings = auditResults.reduce(
      (acc, item) => acc + item.estimatedSavings,
      0
    );

    try {
      const summaryResponse = await fetch("/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ results: auditResults, totalSavings }),
      });
      const summaryData = await summaryResponse.json();
      setSummary(summaryData.summary);

      const auditResponse = await fetch("/api/save-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ results: auditResults, totalSavings }),
      });

      const auditData = await auditResponse.json();

      if (auditData.publicId) {
        const url = `${window.location.origin}/audit/${auditData.publicId}`;
        setShareUrl(url);
      }
    } catch {
      setSummary("Your AI stack contains optimization opportunities.");
    } finally {
      setLoading(false);
    }
  };

  const totalMonthlySavings = results.reduce((acc, item) => acc + item.estimatedSavings, 0);
  const totalAnnualSavings = totalMonthlySavings * 12;

  return (
    // STEP 11: Main Wrapper with Gradient
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-950 text-white transition-all duration-500">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm text-green-400 mb-4 tracking-widest uppercase animate-pulse">AI Spend Optimization Platform</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">Stop Overpaying<br />For AI Tools</h1>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl">Analyze your AI stack and discover smarter pricing opportunities.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Audit Your AI Stack</h2>
            {/* STEP 11: Button Transitions */}
            <button 
              onClick={addTool} 
              className="bg-green-500 text-black px-5 py-2 rounded-xl font-semibold hover:bg-green-400 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              + Add Tool
            </button>
          </div>
          
          <div className="space-y-6">
            {tools.map((tool, index) => (
              <ToolCard key={tool.id} index={index} tool={tool} toolOptions={TOOL_OPTIONS} onChange={handleToolChange} onRemove={removeTool} />
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <input type="number" placeholder="Team Size" value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} className="bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-colors duration-200" />
            <select value={useCase} onChange={(e) => setUseCase(e.target.value)} className="bg-black border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-green-500 transition-colors duration-200">
              <option value="">Select Use Case</option>
              {USE_CASES.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          
          <button 
            onClick={handleGenerateAudit} 
            disabled={loading}
            className="mt-8 w-full bg-green-500 text-black py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 transition-all duration-200 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
          >
            {loading ? "Generating Audit..." : "Generate Audit"}
          </button>
        </div>
      </section>

      {results.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
            
            {shareUrl && (
              <div className="bg-black border border-zinc-800 rounded-2xl p-6 mb-8 animate-bounce-short">
                <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                  <div>
                    <p className="text-green-400 text-sm mb-2 font-bold">SHAREABLE REPORT LINK</p>
                    <p className="text-zinc-300 break-all">{shareUrl}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      alert("Link copied to clipboard!");
                    }}
                    className="bg-green-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-green-400 transition-all duration-200 hover:scale-105"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            )}

            <h2 className="text-4xl font-bold mb-2">Audit Results</h2>
            <p className="text-zinc-400 mb-8">Personalized optimization recommendations for your AI stack.</p>
            
            {summary && (
              <div className="bg-black border border-zinc-800 rounded-2xl p-6 mb-8">
                <p className="text-green-400 text-sm mb-3 font-bold uppercase tracking-widest">AI Generated Summary</p>
                <p className="text-lg text-zinc-300 leading-relaxed italic">"{summary}"</p>
              </div>
            )}

            {totalMonthlySavings > 500 && (
              <div className="bg-green-500 text-black rounded-2xl p-8 mb-8 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-3xl font-bold mb-2">Significant Savings Opportunity</h3>
                <p className="text-lg font-medium opacity-90">Your organization may benefit from discounted AI infrastructure credits through Credex.</p>
              </div>
            )}

            {totalMonthlySavings < 100 && totalMonthlySavings > 0 && (
              <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-8 mb-8">
                <h3 className="text-2xl font-bold mb-2 text-white">Your Stack Already Looks Efficient</h3>
                <p className="text-zinc-400">Your configuration appears optimized for your current usage patterns.</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-black rounded-2xl p-6 border border-zinc-800 transition-transform hover:scale-[1.02] duration-200">
                <p className="text-zinc-500">Total Monthly Savings</p>
                <h3 className="text-5xl font-bold text-green-400 mt-2">${totalMonthlySavings}</h3>
              </div>
              <div className="bg-black rounded-2xl p-6 border border-zinc-800 transition-transform hover:scale-[1.02] duration-200">
                <p className="text-zinc-500">Total Annual Savings</p>
                <h3 className="text-5xl font-bold text-green-400 mt-2">${totalAnnualSavings}</h3>
              </div>
            </div>

            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="bg-black border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition-all duration-200">
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold">{result.tool}</h3>
                      <p className="text-zinc-400 mt-2 max-w-2xl">{result.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-500 text-sm">Estimated Savings</p>
                      <p className="text-3xl font-bold text-green-400">${result.estimatedSavings}/mo</p>
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