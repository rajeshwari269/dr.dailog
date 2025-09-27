import { db } from "@/config/db";
import { sessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const { symptoms, selectedDoctor } = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sessionId = uuidv4();
    const result = await db
      .insert(sessionChatTable)
      .values({
        sessionId,
        createdBy: user.primaryEmailAddress?.emailAddress,
        symptoms,
        selectedDoctor,
        createdOn: new Date().toISOString(),
      })
      // @ts-ignore
      .returning({ sessionChatTable });

    return NextResponse.json(result[0]?.sessionChatTable);
  } catch (error: any) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  }

  try {
    if (sessionId === "all") {

      const sessions = await db
        .select()
        .from(sessionChatTable)
        .where(eq(sessionChatTable.createdBy, user.primaryEmailAddress?.emailAddress ?? ""))
        .orderBy(desc(sessionChatTable.id));


      return NextResponse.json(sessions || []);
    } else {

      const result = await db
        .select()
        .from(sessionChatTable)
        .where(eq(sessionChatTable.sessionId, sessionId));

      if (!result || result.length === 0) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
      }


      if (result[0].createdBy !== user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: "Unauthorized access to session" }, { status: 403 });
      }

      return NextResponse.json(result[0]);
    }
  } catch (error: any) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
