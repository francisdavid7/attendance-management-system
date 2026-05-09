import { NextResponse } from "next/server";
import { registerSchema } from "@/lib/validation/auth";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/auth/mail";

export async function POST(req: Request) {
  try {
    // Get the data from the request body
    const body = await req.json();

    // Safely validates the data using zod
    const validatedFields = registerSchema.safeParse(body);

    // Throw a possible error when not properly validated
    if (!validatedFields.success) {
      return NextResponse.json(
        {
          error: validatedFields.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    // Extract the data from the validated fields
    const { fullName, email, password } = validatedFields.data;

    // Check if user already exist
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 409 },
      );
    }

    // if user does not exist, then hash password
    const hashedPassword = await hashPassword(password);

    // Generate verification token using CryptoUUId
    const verificationToken = crypto.randomUUID();

    // Save the new user to database
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60),
      },
    });

    // Send user a verification email
    await sendVerificationEmail(user.email, verificationToken);

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
