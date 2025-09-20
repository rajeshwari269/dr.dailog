import { db } from "@/config/db";
import { sessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const { symptoms, selectedDoctor } = await req.json();
  const user = await currentUser();

  try {
    const sessionId = uuidv4();
    const result = await db
      .insert(sessionChatTable)
      .values({
        sessionId: sessionId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        symptoms: symptoms,
        selectedDoctor: selectedDoctor,
        createdOn: new Date().toString(),
      })
      //   @ts-ignore
      .returning({ sessionChatTable });

    return NextResponse.json(result[0]?.sessionChatTable);
  } catch (error) {
    return NextResponse.json(error);
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
      const result = await db
        .select()
        .from(sessionChatTable)
        .where(
          eq(
            sessionChatTable.createdBy,
            user?.primaryEmailAddress?.emailAddress ?? ""
          )
        )
        .orderBy(desc(sessionChatTable.id));

      if (!result || result.length === 0) {
        return NextResponse.json(
          { error: "Session not found" },
          { status: 404 }
        );
      }

      // Verify the session belongs to the current user
      if (result[0].createdBy !== user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json(
          { error: "Unauthorized access to session" },
          { status: 403 }
        );
      }

      return NextResponse.json(result);
    } else {
      const result = await db
        .select()
        .from(sessionChatTable)
        .where(eq(sessionChatTable.sessionId, sessionId));

      if (!result || result.length === 0) {
        return NextResponse.json(
          { error: "Session not found" },
          { status: 404 }
        );
      }

      // Verify the session belongs to the current user
      if (result[0].createdBy !== user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json(
          { error: "Unauthorized access to session" },
          { status: 403 }
        );
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
