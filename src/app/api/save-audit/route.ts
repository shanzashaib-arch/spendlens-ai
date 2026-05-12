import { supabase } from "../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const publicId = uuidv4();
    const { results, totalSavings } = body;

    // Database mein insert karne ka sahi tareeqa
    const { data, error } = await supabase
      .from("audits")
      .insert([
        {
          public_id: publicId,
          audit_data: results || {}, // Agar results empty hon to empty object save ho
          total_savings: totalSavings || 0,
        },
      ])
      .select(); // Ye line confirmation ke liye zaroori hai

    if (error) {
      console.error("Supabase Error:", error);
      throw error;
    }

    return Response.json({
      success: true,
      publicId,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}