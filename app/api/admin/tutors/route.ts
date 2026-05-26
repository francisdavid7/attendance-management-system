import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const tutors = await prisma.user.findMany({
      where: {
        role: "TUTOR",
      },

      select: {
        fullName: true,
        email: true,
        courses: true,
      },
    });

    return NextResponse.json({ success: true, tutors });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
