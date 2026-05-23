import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalStudents = await prisma.user.count({
      where: {
        role: "STUDENT",
      },
    });

    const totalTutors = await prisma.user.count({
      where: { role: "TUTOR" },
    });

    const totalCourses = await prisma.course.count();

    const stats = {
      totalStudents,
      totalTutors,
      totalCourses,
    };

    return NextResponse.json({ success: true, stats }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
