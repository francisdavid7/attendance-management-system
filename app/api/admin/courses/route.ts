import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        name: true,
        tutor: {
          select: {
            fullName: true,
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
      },
    });

    const coursesData = courses.map((course) => {
      const totalStudents = course._count.students;
      const hasTutor = course.tutor ?? false;
      return {
        course: course.name,
        tutor: course.tutor?.fullName ?? "No Tutor Assigned",
        totalStudents,
        status:
          course.tutor !== null
            ? "Active"
            : hasTutor && totalStudents < 1
              ? "Pending"
              : "Inactive",
      };
    });

    return NextResponse.json({ success: true, coursesData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
