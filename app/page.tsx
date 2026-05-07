export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* --- HERO SECTION --- */}
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
            Analyze your AI stack, identify unnecessary spending,
            and discover smarter pricing options instantly.
          </p>
          <div className="mt-8 flex gap-4">
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90">
              Start Free Audit
            </button>
            <button className="border border-gray-700 px-6 py-3 rounded-xl hover:bg-gray-900">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* --- STEP 11: FORM SECTION (Yahan paste karein) --- */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">
            Audit Your AI Stack
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Tool Name (e.g. ChatGPT)"
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-all"
            />
            <input
              type="number"
              placeholder="Monthly Spend ($)"
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-all"
            />
            <input
              type="number"
              placeholder="Team Size (Users)"
              className="bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-all"
            />
            <select className="bg-black border border-zinc-700 rounded-xl px-4 py-3 focus:border-green-500 outline-none transition-all">
              <option>Primary Use Case</option>
              <option>Coding</option>
              <option>Content Writing</option>
              <option>Research & Analysis</option>
              <option>General Purpose</option>
            </select>
          </div>

          <button className="mt-8 w-full bg-green-500 text-black py-4 rounded-xl font-bold hover:bg-green-400 transition-colors shadow-lg shadow-green-900/20">
            Generate Audit Report
          </button>
        </div>
      </section>
    </main>
  );
}