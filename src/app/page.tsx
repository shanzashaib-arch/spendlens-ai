"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
 {
  const [tools, setTools] = useState<any>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("audit-draft");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (tools.length === 0) {
        setTools(parsed.tools || []);
      }
    }
  }, [tools.length]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Stop Overpaying For AI Tools
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 font-medium">
          Analyze your AI stack and discover hidden savings opportunities in minutes.
        </p>

        <div className="py-4">
          <p className="text-gray-500 italic text-lg">
            &quot;Teams are wasting thousands annually on overlapping AI subscriptions. It&apos;s time to optimize.&quot;
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <Link 
            href="/audit/new" 
            aria-label="Start a new free AI spend audit"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
          >
            Generate Free Audit
          </Link>
          
          <Link 
            href="#how-it-works" 
            aria-label="Learn more about how SpendLens AI works"
            className="px-8 py-4 border border-gray-700 hover:border-gray-500 text-gray-300 font-medium rounded-full transition-all"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="absolute bottom-10 text-gray-600 text-sm font-mono tracking-widest uppercase">
        Secure • Rule-Based • AI Powered
      </div>
    </main>
  );
}