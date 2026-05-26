import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const tutors = await prisma.user.findMany({
      where: {
        role: "TUTOR",
      },

      select: {
        id: true,
        fullName: true,
        email: true,
        courses: {
          select: {
            id: true,
            name: true,

            students: {
              select: {
                studentId: true,
              },
            },
          },
        },
      },
    });

    const tutorData = tutors.map((tutor) => {
      // Get students' ID
      const studentIds = tutor.courses.flatMap((course) =>
        course.students.map((student) => student.studentId),
      );

      // Remove duplicates
      const uniqueStudents = [...new Set(studentIds)];

      const assignedCourses = tutor.courses.map((course) => course.name);

      return {
        id: tutor.id,
        fullName: tutor.fullName,
        email: tutor.email,
        assignedCourses,
        totalStudents: uniqueStudents.length,
      };
    });

    return NextResponse.json({ success: true, tutorData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
