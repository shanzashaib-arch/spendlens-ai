"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; 

export default function AuditResultPage({ params }: { params: any }) {
  const [auditData, setAuditData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Params ko handle karne ka safe tareeqa
  const unwrappedParams = React.use(params) as { id: string };
  const id = unwrappedParams?.id;

  useEffect(() => {
    async function fetchAudit() {
      if (!id) return;
      
      try {
        setLoading(true);
        const { data, error: sbError } = await supabase
          .from("audits") // Screenshot ke mutabiq small letters
          .select("*")
          .eq("public_id", id)
          .single();

        if (sbError) {
          console.error("Supabase Error:", sbError);
          setError(sbError.message);
        } else {
          setAuditData(data);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchAudit();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
        <div className="animate-pulse text-blue-500 text-xl">Loading Audit {id}...</div>
      </div>
    );
  }

  if (error || !auditData) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Audit Not Found</h1>
        <p className="text-gray-400 mb-6 font-mono text-sm">{error || "No data exists for this ID."}</p>
        <Link href="/audit/new" className="px-8 py-3 bg-blue-600 rounded-full font-bold">
          Generate New Audit
        </Link>
      </div>
    );
  }

  // Database se data mapping
  const results = auditData.audit_data?.results || [];
  const totalSavings = auditData.total_savings || 0;

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-gray-800 pb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Audit Results
            </h1>
            <p className="text-gray-500 mt-2 font-mono text-sm uppercase">ID: {id}</p>
          </div>
          <Link href="/audit/new" className="px-5 py-2.5 bg-gray-900 rounded-lg border border-gray-700 text-sm">
            ← New Audit
          </Link>
        </div>

        <div className="space-y-8">
          {results.length > 0 ? (
            results.map((res: any, index: number) => (
              <div key={index} className="bg-gray-900/40 p-8 rounded-2xl border border-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold">{res.toolName}</h2>
                  <span className="text-green-400 font-bold">Save ${res.savings}/mo</span>
                </div>
                <p className="text-gray-400 mb-6">{res.analysis}</p>
                <div className="p-4 bg-blue-900/10 rounded-xl border border-blue-900/20 text-sm italic text-blue-300">
                  {res.recommendation}
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-gray-500 border border-dashed border-gray-800 rounded-xl">
              No results found in the audit data.
            </div>
          )}

          <div className="mt-12 p-10 bg-gradient-to-br from-blue-900/30 to-black rounded-3xl border border-blue-500/30 text-center shadow-2xl shadow-blue-500/10">
            <h3 className="text-gray-400 uppercase text-sm font-bold mb-3 tracking-widest">Total Monthly Savings</h3>
            <p className="text-7xl font-black text-blue-500">${totalSavings}</p>
          </div>
        </div>
      </div>
    </div>
  );
}