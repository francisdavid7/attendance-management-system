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

        const histories = await prisma.session.findMany({
            where: {
                userId
            },
            include: {
                course: true,
                attendances: {
                    include: {
                        student: true,
                    },
                },
            },
        });

        const attendanceCount = await prisma.attendance.count({
            where: {
                session: {
                    userId,
                },
            },
        });



        return NextResponse.json({ histories, attendanceCount });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ Message: "Internal Error" })
    }



}