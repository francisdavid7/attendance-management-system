import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { fullName, email, password, courseId } = body;

    const tutor = await prisma.user.create({
      data: {
        fullName,
        email,
        password,
        role: "TUTOR",
        isVerified: true,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isVerified: true,
      },
    });

    const updatedCourse = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        tutor: {
          connect: {
            id: tutor.id,
          },
        },
      },
    });

    return NextResponse.json(
      { success: true, tutor, updatedCourse },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
