import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.attendance.findMany({
      select: {
        status: true,
        student: {
          select: {
            fullName: true,
          },
        },
        session: {
          select: {
            createdAt: true,
            course: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const attendance = data.map((data: any) => {
      return {
        student: data.student.fullName,
        course: data.session.course.name,
        date: new Date(data.session.createdAt).toLocaleDateString("en-GB", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        }),
        time: new Date(data.session.createdAt).toLocaleTimeString("en-us", {
          hour: "2-digit",
        }),
        status: data.status,
      };
    });

    return NextResponse.json({ attendance });
  } catch (error: any) {
    console.log("API ERROR:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
