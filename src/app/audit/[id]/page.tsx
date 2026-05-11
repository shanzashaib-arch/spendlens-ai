import { generateAudit } from "@/lib/auditEngine";
import Link from "next/link";

// Ye function server-side par data fetch karne ke liye hai
async function getAuditData(id: string) {
  // Real apps mein yahan Supabase fetch hota hai
  // For now, hum dummy data return kar rahe hain agar real na mile
  return {
    tools: [
      { tool: "Claude", plan: "Business", monthlySpend: 60, seats: 2 },
      { tool: "ChatGPT", plan: "Team", monthlySpend: 100, seats: 2 }
    ],
    teamSize: 2
  };
}

export default async function AuditResultPage({ params }: { params: { id: string } }) {
  const data = await getAuditData(params.id);
  const results = generateAudit(data.tools, data.teamSize);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-500">Audit Results</h1>
          <Link href="/audit/new" className="text-gray-400 hover:text-white border border-gray-700 px-4 py-2 rounded-lg">
            ← New Audit
          </Link>
        </div>

        <div className="grid gap-6">
          {results.map((res, index) => (
            <div key={index} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{res.tool}</h3>
                <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm font-mono">
                  Save ${res.estimatedSavings}/mo
                </span>
              </div>
              <p className="text-gray-400 mb-4">{res.reason}</p>
              <div className="bg-black/50 p-4 rounded-xl border border-blue-900/30">
                <span className="text-blue-400 font-medium">Recommendation: </span>
                <span className="text-white">{res.recommendedPlan}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 rounded-3xl text-center">
          <h2 className="text-2xl font-bold mb-2">Total Monthly Potential Savings</h2>
          <p className="text-5xl font-black text-blue-500">
            ${results.reduce((acc, curr) => acc + curr.estimatedSavings, 0)}
          </p>
        </div>
      </div>
    </main>
  );
}