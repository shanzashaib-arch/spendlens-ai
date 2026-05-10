export const dynamic = 'force-dynamic'; // Ye line lazmi add karein

import { OpenAI } from "openai";
// ... baaki poora purana code waisa hi rehne dein import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { results, totalSavings } = body;

    const prompt = `
    Generate a short professional AI spend audit summary.

    Total Monthly Savings: $${totalSavings}

    Audit Results:
    ${JSON.stringify(results)}

    Keep it concise and actionable.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      max_tokens: 120,
    });

    return Response.json({
      summary:
        response.choices[0].message.content,
    });

  } catch (error) {

    return Response.json({
      summary:
        "Your AI stack has optimization opportunities that could reduce operational costs while maintaining productivity.",
    });
  }
}