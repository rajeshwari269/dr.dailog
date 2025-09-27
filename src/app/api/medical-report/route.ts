import { db } from "@/config/db";
import { sessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on the doctor AI Agent info and conversation between AI medical agent and user
, generate a structured report with the following fields:
1.sessionId: a unique session identifier
2.agent: the medical specialist name (e.g., "General Physician AI")
3.user: name of the patient or "Anonymous" if not provided
4.timestamp: current date and time in ISO format
5.chiefComplaint: one-sentence summary of the main health concern
6.summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7.symptoms: list of symptoms mentioned by the user
8.duration: how long the user has experienced the symptoms
9.severity: mild, moderate, or severe
10.medicationsMentioned: list of any medicines mentioned
11.recommendations: list of AI suggestions (e.g., rest, see a doctor)
Return the result in this JSON format:
{
  "sessionId": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "string",
  "severity": "string",
  "medicationsMentioned": ["med1", "med2"],
  "recommendations": ["rec1", "rec2"]
}
Only include valid fields. Respond with nothing else.
`;

export async function POST(req: Request) {
    try {
        const { sessionId, doctorName, messages } = await req.json();

        if (!sessionId || !messages) {
            return NextResponse.json(
                { error: "sessionId and messages are required" },
                { status: 400 }
            );
        }

        const transcript = messages
            .map((msg: any) => `${msg.role}: ${msg.text}`)
            .join("\n");

        const prompt = `${REPORT_GEN_PROMPT}\n\nConversation Transcript:\n${transcript}`;

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
                    model: "nvidia/nemotron-nano-9b-v2:free",
                    messages: [
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],
                    response_format: { type: "json_object" },
                }),
            }
        );

        const data = await openRouterRes.json();
        const responseText = data?.choices?.[0]?.message?.content;

        if (!responseText) {
            throw new Error("No response from AI model");
        }

        let report;
        try {
            report = JSON.parse(responseText);
        } catch (err) {
            console.error("Failed to parse AI response:", responseText);
            throw new Error("Invalid response format from AI");
        }

        report.sessionId = sessionId;
        report.agent = doctorName;
        report.timestamp = new Date().toISOString();

        const result = await db.update(sessionChatTable).set({
            report: report,
            conversation:messages
        }).where(eq(sessionChatTable.sessionId, sessionId))

        return NextResponse.json(report);
    } catch (err) {
        console.error("Error in generate-report:", err);
        return NextResponse.json(
            { error: "Failed to generate report" },
            { status: 500 }
        );
    }
}

