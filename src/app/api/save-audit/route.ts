import { supabase } from "../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const publicId = uuidv4();

    const { results, totalSavings } = body;

    const { error } = await supabase
      .from("audits")
      .insert([
        {
          public_id: publicId,
          audit_data: results,
          total_savings: totalSavings,
        },
      ]);

    if (error) {
      throw error;
    }

    return Response.json({
      success: true,
      publicId,
    });

  } catch {

    return Response.json({
      success: false,
    });
  }
}