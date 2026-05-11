import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, auditData } = body;

    const { data, error: dbError } = await supabase
      .from("leads")
      .insert([{ email, audit_data: auditData }]);

    if (dbError) throw dbError;

    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}