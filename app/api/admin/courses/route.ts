import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
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
        courseId: course.id,
        course: course.name,
        tutor: course.tutor?.fullName ?? "No Tutor Assigned",
        totalStudents,
        status: hasTutor ? "Assigned" : "Unassigned",
      };
    });

    return NextResponse.json({ success: true, coursesData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
