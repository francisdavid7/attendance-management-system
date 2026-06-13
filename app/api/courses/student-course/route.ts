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

        const course = await prisma.studentCourse.findMany({
            where: { studentId: userId },
            include: {
                course: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return NextResponse.json(course)

    } catch (error) {
        console.log(error)
    }
}