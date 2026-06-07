import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const activeSession = await prisma.session.findFirst({
            where: {
                isActive: true,
                sessionEndAt: {
                    gt: new Date(),
                },
            },
            include: {
                course: true,
            },
        });

        return NextResponse.json({ hasActiveSession: !!activeSession, session: activeSession, });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}