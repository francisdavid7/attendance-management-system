import { sendResetPasswordEmail } from "@/lib/mail/mail";
import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    const resetPasswordToken = crypto.randomUUID();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json(
        {
          error: "User with this email does not exist",
        },
        { status: 404 },
      );
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        resetPasswordToken,
        resetPasswordTokenExpiresAt: new Date(Date.now() + 30 * 60 * 1000),
      },
    });

    const name = user.fullName.split(" ")[0];
    await sendResetPasswordEmail(name, resetPasswordToken, user.email);

    return NextResponse.json(
      {
        success: true,
        message: `We've sent a password reset link to ${user.email} Please check your inbox and follow the instructions.`,
      },
      { status: 200 },
    );
    3;
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
