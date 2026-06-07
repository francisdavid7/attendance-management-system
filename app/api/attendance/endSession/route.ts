import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
    try {
        const token = (await cookies()).get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { Message: "Unauthorized" },
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);
        const userId = typeof decoded === "string" ? decoded : decoded.id;

        const { sessionId } = await req.json();

        const session = await prisma.session.findFirst({
            where: {
                id: sessionId,
                userId: userId,
            },
        });

        if (!session) {
            return NextResponse.json(
                { Message: "Session not found or not yours" }
            );
        }

        const endedSession = await prisma.session.update({
            where: {
                id: sessionId,
            },
            data: {
                isActive: false,
                sessionEndAt: new Date(),
            },
        });

        return NextResponse.json({ Message: "Session ended successfully", sessionEndS: endedSession });

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}