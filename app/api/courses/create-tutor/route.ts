import { hashPassword } from "@/lib/auth/password";
import { sendLoginDetails } from "@/lib/mail/mail";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { fullName, email, password, courseId } = body;

    const hashedPassword = await hashPassword(password);

    const tutor = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: "TUTOR",
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

    const tutorName = fullName?.split(" ")[0];
    await sendLoginDetails(tutorName, tutor.email, password);

    return NextResponse.json(
      { success: true, tutor, updatedCourse },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
