import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export async function GET() {
    try {

        const token = (await cookies()).get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Missing token" }, { status: 401 });
        }

        const decoded = verifyToken(token);

        const studentId = typeof decoded === "string" ? decoded : decoded.id;


        const student = await prisma.user.findUnique({
            where: {
                id: studentId
            },
            include: {
                attendances: {
                    include: {
                        session: {
                            include: {
                                course: true,
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        attendances: true,
                    },
                },
            },
        });
        return NextResponse.json(student)

    } catch (error) {
        console.log(error)
        return NextResponse.json({ Message: "Internal Error" })
    }



}