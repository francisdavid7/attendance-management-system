import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const students = await prisma.user.findMany({
      where: {
        role: "STUDENT",
      },

      select: {
        fullName: true,
        email: true,
        studentCourses: {
          select: {
            course: {
              select: {
                name: true,
                tutor: {
                  select: {
                    fullName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const studentsData = students.map((student: any) => {
      const course = student.studentCourses.map((cs: any) => cs.course.name);
      const tutor = student.studentCourses.map(
        (cs) => cs.course.tutor?.fullName,
      );

      return {
        student: student.fullName,
        email: student.email,
        course: course.length < 1 ? "N/A" : course,
        tutor: tutor.length < 1 ? "N/A" : tutor,
      };
    });
    return NextResponse.json({ studentsData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
