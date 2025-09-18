import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: "Unauthorized or invalid user" }, { status: 401 });
    }

    const email = user.primaryEmailAddress.emailAddress;

    try {
        // Add the user
        const users = await db.select().from(usersTable).where(eq(usersTable.email, email));

        // If the user does not exist, insert them into the database
        if (users.length === 0) {
            await db.insert(usersTable).values([{
                name: user.fullName || "",
                email: email,
                credits: 10
            }])

            const newUser = await db.select().from(usersTable).where(eq(usersTable.email, email));
            return NextResponse.json(newUser[0]);
        }

        return NextResponse.json(users[0]);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong", details: error }, { status: 500 });
    }
}
