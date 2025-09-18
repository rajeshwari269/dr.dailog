import { NextResponse } from "next/server";
import { AIDoctorAgents } from "../../../../shared/list";

export async function POST(req: Request) {
  try {
    const { symptoms } = await req.json();

    if (!symptoms || symptoms.trim().length === 0) {
      return NextResponse.json(
        { error: "Symptoms are required" },
        { status: 400 }
      );
    }

    const specializations = AIDoctorAgents.map((d) => d.specialist).join(", ");

    const prompt = `
            You are an AI medical assistant. Based on the user's symptoms, suggest the most suitable doctor specialization.

            Available specializations are:
            ${specializations}

            Respond with only one of the specializations listed above. Do not explain.

            Symptoms: ${symptoms}
    `.trim();

    const openRouterRes = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "DrDialog",
        },
        body: JSON.stringify({
          model: "google/gemma-3-27b-it:free",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await openRouterRes.json();
    const responseText = data?.choices?.[0]?.message?.content
      ?.trim()
      ?.toLowerCase();

    const matchedDoctor = AIDoctorAgents.find(
      (doc) => doc.specialist.toLowerCase() === responseText
    );

    if (!matchedDoctor) {
      const fallbackDoctor = AIDoctorAgents.find(
        (doc) => doc.specialist === "General Physician"
      );
      return NextResponse.json(fallbackDoctor);
    }

    return NextResponse.json(matchedDoctor);
  } catch (err) {
    console.error("Error in suggest-doctors:", err);
    return NextResponse.json(
      { error: "Failed to suggest doctor" },
      { status: 500 }
    );
  }
}
