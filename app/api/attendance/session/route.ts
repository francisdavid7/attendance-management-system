import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { courseId } = body;
        const token = (await cookies()).get("token")?.value;


        if (!token) {
            return NextResponse.json({ error: "Missing token" }, { status: 401 });
        }

        const decoded = verifyToken(token);

        const userId = typeof decoded === "string" ? decoded : decoded.id;


        const findCourse = await prisma.course.findUnique({
            where: { id: courseId }
        })

        if (!findCourse) {
            return NextResponse.json({ Massage: "Course Not found" }, { status: 404 })
        }

        const session = await prisma.session.create({
            data: {
                courseId,
                userId: userId,
                date: new Date(),
                qrCode: crypto.randomUUID(),
                qrExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
                sessionEndAt: new Date(Date.now() + 120 * 60 * 1000),
                isActive: true,
            },
            include: {
                course: true,
            },

        })

        return NextResponse.json({ Message: "Session Created", session: session }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "internal error", error }, { status: 500 })
    }
}