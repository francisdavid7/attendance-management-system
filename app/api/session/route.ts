import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { date } from "zod";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { courseId } = body;

        const findCourse = await prisma.course.findUnique({
            where: { id: courseId }
        })

        if (!findCourse) {
            return NextResponse.json({ Massage: "Course Not found" }, { status: 404 })
        }

        const session = await prisma.session.create({
            data: {
                courseId,
                date: new Date(),
                qrCode: crypto.randomUUID(),
                qrExpiresAt: new Date(Date.now() + 15 * 60 * 1000),

            },
            include: {
                course: true,
            },

        })

        return NextResponse.json({ session: session }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "internal error", error }, { status: 500 })
    }
}