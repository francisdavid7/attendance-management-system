import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, description } = body;

    const course = await prisma.course.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Course created!",
        course,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
