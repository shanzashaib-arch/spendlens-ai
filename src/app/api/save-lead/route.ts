import { supabase } from "../../../lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      company,
      role,
      teamSize,
      auditData,
    } = body;

    // Supabase mein data insert kar rahe hain
    const { error } = await supabase
      .from("leads")
      .insert([
        {
          email,
          company,
          role,
          team_size: teamSize, // Make sure table mein column name team_size hi ho
          audit_data: auditData, // Make sure table mein column name audit_data hi ho
        },
      ]);

    if (error) {
      console.error("Supabase Error:", error.message); // Ye error terminal mein dikhayega
      return Response.json({ success: false, error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });

  } catch (err: any) {
    console.error("API Crash:", err.message);
    return Response.json({ success: false, message: "Server error" }, { status: 500 });
  }
}