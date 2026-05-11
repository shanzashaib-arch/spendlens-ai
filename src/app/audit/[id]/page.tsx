import { supabase } from "../../../lib/supabase";

// Yeh function database se audit ka data lata hai
async function getAudit(id: string) {
  const { data } = await supabase
    .from("audits")
    .select("*")
    .eq("public_id", id)
    .single();

  return data;
}

export default async function AuditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Params ko await karna Next.js 15+ ke liye zaroori hai
  const { id } = await params;
  const audit = await getAudit(id);

  if (!audit) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Audit Not Found</h1>
          <p className="text-zinc-500">This report link is invalid or has been removed.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-950 text-white">
      <section className="max-w-5xl mx-auto px-6 py-20">
        
        <div className="mb-12">
          <p className="text-green-400 text-sm mb-3 tracking-widest font-bold">
            PUBLIC AUDIT REPORT
          </p>
          <h1 className="text-5xl font-bold">AI Spend Audit</h1>
          <p className="text-zinc-400 mt-6 font-medium">Estimated Monthly Savings</p>
          <h2 className="text-7xl font-bold text-green-400 mt-2">
            ${audit.total_savings}
          </h2>
        </div>

        {/* Logic for High Savings or Efficient Stack */}
        <div className="mb-10">
          {audit.total_savings > 500 ? (
            <div className="bg-green-500 text-black rounded-2xl p-8 shadow-lg shadow-green-500/20">
              <h3 className="text-3xl font-bold mb-2 text-black">Significant Savings Opportunity</h3>
              <p className="text-lg font-medium opacity-90 text-black">
                Your organization may benefit from discounted AI infrastructure credits.
              </p>
            </div>
          ) : audit.total_savings < 100 && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-2">Stack Already Optimized</h3>
              <p className="text-zinc-400">
                Your current configuration appears relatively efficient.
              </p>
            </div>
          )}
        </div>

        {/* Breakdown List */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-zinc-500 mb-4 uppercase tracking-wider">Breakdown by Tool</h3>
          {audit.audit_data.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all duration-200"
            >
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white">
                    {item.tool}
                  </h3>
                  <p className="text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                    {item.reason}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-zinc-500 text-sm uppercase font-bold">Savings</p>
                  <p className="text-4xl font-bold text-green-400">
                    ${item.estimatedSavings}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer for Public Visitors */}
        <div className="mt-20 pt-10 border-t border-zinc-800 text-center">
          <p className="text-zinc-500 mb-4">Analyze your own AI stack costs.</p>
          <a href="/" className="inline-block bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-zinc-200 transition-all duration-200">
            Run Free Audit
          </a>
        </div>

      </section>
    </main>
  );
}