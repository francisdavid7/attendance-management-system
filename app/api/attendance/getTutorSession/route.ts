import { activeSession } from "@/lib/actions/actions";
import { verifyToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
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
        // const body = await request.json();
        // const { tutorId } = body

        const tutor = await prisma.user.findUnique({
            where: { id: tutorId },
            include: {
                courses: {
                    select: {
                        name: true,
                        tutorId: true,
                        id: true
                    }
                }
            }
        })

        const tutorActiveSession = await prisma.session.findFirst({
            where: { courseId: tutor?.courses[0]?.id, userId: tutorId, isActive: true },
            include: {
                course: {
                    select: {
                        name: true
                    }
                }
            }
        })


        return NextResponse.json({ tutorActiveSession })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ Message: "Internal Error" })
    }

}