import { verifyToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    // Guard clause against strings or empty payloads
    if (!decoded || typeof decoded === "string") {
      return NextResponse.json(
        { error: "Invalid token payload" },
        { status: 401 },
      );
    }

    // Explicit type casting so TypeScript recognizes .id safely
    const userId = (decoded as CustomJwtPayload).id;

    // Fetch the courses
    const coursesRaw = await prisma.course.findMany({
      where: {
        tutorId: userId,
      },
      select: {
        name: true,
      },
    });

    // Flatten the array of objects into an array of pure strings
    const courseNames = coursesRaw.map((course: any) => course.name);

    return NextResponse.json({ courses: courseNames });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
