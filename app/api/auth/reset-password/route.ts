import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 404 });
    }

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
    }

    if (
      user.resetPasswordTokenExpiresAt &&
      user.resetPasswordTokenExpiresAt < new Date()
    ) {
      return NextResponse.json(
        { error: "Verificaiton link expired" },
        { status: 410 },
      );
    }

    const hashedPassword = await hashPassword(String(password));

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiresAt: null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successful",
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
