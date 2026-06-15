import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";
export async function POST(req: NextRequest) {
    try {
        const token = (await cookies()).get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Missing token" }, { status: 401 });
        }
        const decoded = verifyToken(token);
        const studentId = typeof decoded === "string" ? decoded : decoded.id;
        const body = await req.json();
        const { id, qrCode } = body;

        const studentExist = await prisma.user.findUnique({
            where: { id: studentId }
        })

        if (!studentExist) return NextResponse.json({ Message: "User not found" })

        const session = await prisma.session.findUnique({
            where: { id: id, qrCode: qrCode }
        })

        if (!session) return NextResponse.json({ Message: "Invalid QrCode" });

        if (session.qrExpiresAt >= session?.sessionEndAt!) return NextResponse.json({ Message: "Attendance closed" })

        // const now = new Date();

        // const isLate = new Date(session.createdAt);

        // isLate.setMinutes(isLate.getMinutes() + 10);

        // const status = now <= isLate ? "PRESENT" : "LATE";

        const existing = await prisma.attendance.findUnique({
            where: {
                studentId_sessionId: {
                    studentId,
                    sessionId: session.id,
                },
            },
        });


        if (existing) return NextResponse.json({ Message: "Attendance Already marked " });

        const attendance = await prisma.attendance.create({
            data: {
                studentId,
                sessionId: session.id,
                status: "PRESENT",
                checkInTime: new Date(),
            },
        });

        return NextResponse.json({ Message: `Marked as ${status}!`, attendance })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ Message: "Internal Error" })
    }


}

