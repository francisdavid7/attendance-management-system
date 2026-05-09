import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // get token from cookies header
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    // Verify token
    const decoded = verifyToken(token);
    const userId = typeof decoded === "string" ? decoded : decoded.id;

    // Fetch user using the verified token
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        fullName: true,
        email: true,
        isVerified: true,
      },
    });

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
