import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { sessionId } = body;

        const totalAttendance = await prisma.attendance.count({
            where: {
                sessionId: sessionId,
            }
        });

        console.log("sessionId received:", sessionId);

        const studentsAttended = await prisma.attendance.findMany({
            where: { sessionId: sessionId }, include: { student: true }
        });

        console.log("totalAttendance:", totalAttendance);

        return NextResponse.json({ Message: "AttendanceList", studentsAttended, totalAttendance })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ Message: "Internal Error" })
    }


}
