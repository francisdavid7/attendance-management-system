import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validation/auth";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/auth/password";
import { generateToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedFields = loginSchema.safeParse(body);

    if (!validatedFields.success) {
      console.log(validatedFields.error.message);
      return NextResponse.json(
        {
          error: validatedFields.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const { email, password } = validatedFields.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "A user with this email does not exist",
        },
        { status: 401 },
      );
    }

    const correctPassword = await comparePassword(password, user.password);

    if (!correctPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = generateToken({ id: user.id, role: user.role });

    const response = NextResponse.json(
      { message: "Login successfull" },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
