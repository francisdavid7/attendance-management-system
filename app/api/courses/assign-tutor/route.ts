import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId, tutorId } = body;

    await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        tutorId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Tutor assigned to course successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
