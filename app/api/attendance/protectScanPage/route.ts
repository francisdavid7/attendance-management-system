import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";


export async function GET() {
    try {
        const token = (await cookies()).get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Missing token" }, { status: 401 });
        }

        const decoded = verifyToken(token);

        const userId = typeof decoded === "string" ? decoded : decoded.id;


        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                studentCourses: {
                    select: {
                        courseId: true
                    }
                }
            }
        })

        const activeSession = await prisma.session.findFirst({
            where: {
                courseId: user?.studentCourses[0]?.courseId,
                isActive: true,
                sessionEndAt: {
                    gt: new Date(),
                },
            },
            include: {
                course: true,
                tutor: true
            },
        });

        return NextResponse.json({ hasActiveSession: !!activeSession, session: activeSession, user: user });

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}