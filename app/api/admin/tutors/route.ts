import Courses from "@/app/admin/dashboard/courses/page";
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
        status: assignedCourses.length >= 1 ? "Active" : "Inactive",
      };
    });

    return NextResponse.json({ success: true, tutorData, coursesAssigned });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
