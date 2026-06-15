import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tutors = await prisma.user.findMany({
      where: {
        role: "TUTOR",
      },

      orderBy: {
        createdAt: "desc",
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

    const coursesAssigned = await prisma.course.count({
      where: {
        tutorId: {
          not: null,
        },
      },
    });

    const tutorData = tutors.map((tutor: any) => {
      // Get students' ID
      const studentIds = tutor.courses.flatMap((course: any) =>
        course.students.map((student: any) => student.studentId),
      );

      // Remove duplicates
      const uniqueStudents = [...new Set(studentIds)];

      const assignedCourses = tutor.courses.map((course: any) => course.name);

      return {
        id: tutor.id,
        fullName: tutor.fullName,
        email: tutor.email,
        assignedCourses,
        totalStudents: uniqueStudents.length,
        status: assignedCourses.length >= 1 ? "Active" : "Inactive",
      };
    });

    return NextResponse.json({ success: true, tutorData, coursesAssigned });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
