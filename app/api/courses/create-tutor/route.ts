import { hashPassword } from "@/lib/auth/password";
import { sendLoginDetails } from "@/lib/mail/mail";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { fullName, email, password } = body;

    const hashedPassword = await hashPassword(password);

    // Check if tutor already exist
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Tutor already exist" },
        { status: 409 },
      );
    }

    const tutor = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role: "TUTOR",
        isVerified: true,
      },
    });

    const tutorName = fullName?.split(" ")[0];
    await sendLoginDetails(tutorName, tutor.email, password);

    return NextResponse.json({ success: true, tutor }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
