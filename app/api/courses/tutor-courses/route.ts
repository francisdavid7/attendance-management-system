import { verifyToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Missing token" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    const tutorId = typeof decoded === "string" ? decoded : decoded.id;

    const tutorCourses = await prisma.course.findMany({ where: { tutorId } });

    return NextResponse.json(tutorCourses);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
