import { verifyToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId } = body;
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (typeof decoded === "string") {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 },
      );
    }

    const userId = decoded.id;

    const enrolledCourse = await prisma.studentCourse.create({
      data: {
        studentId: userId,
        courseId,
      },
    });

    return NextResponse.json({ enrolledCourse });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
