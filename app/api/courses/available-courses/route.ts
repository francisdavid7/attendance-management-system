import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const availableCourses = await prisma.course.findMany({
      include: {
        tutor: {
          select: {
            fullName: true,
          },
        },
      },
    });
    return NextResponse.json(
      { success: true, availableCourses },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
