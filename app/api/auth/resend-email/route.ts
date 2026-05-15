import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mail/mail";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id: userId, email } = body;

    const verificationToken = crypto.randomUUID();

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        verificationToken,
        verificationTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60),
      },
    });

    const studentName = user.fullName.split(" ")[0];

    await sendVerificationEmail(email, verificationToken, studentName);

    return NextResponse.json(
      { success: true, message: `Email resent successfully to ${email}` },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
