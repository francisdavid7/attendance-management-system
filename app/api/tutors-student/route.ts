import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";
import { error } from "console";

export async function GET() {
    try {

        const token = (await cookies()).get("token")?.value;


        if (!token) {
            return NextResponse.json({ error: "Missing token" }, { status: 401 });
        }

        const decoded = verifyToken(token);

        const userId = typeof decoded === "string" ? decoded : decoded.id;


        const students = await prisma.course.findMany({
            where: {
                tutorId: userId,
            },
            include: {
                students: {
                    include: {
                        student: true,
                    },
                },
                _count: {
                    select: {
                        students: true
                    }
                }
            },
        })

        return NextResponse.json(students)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ Message: "Internal Server Error" }, { status: 500 })
    }

}