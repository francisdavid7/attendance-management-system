import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth/jwt";
import { prisma } from "./lib/prisma";

interface UserType {
  id: string;
  role: "ADMIN" | "TUTOR" | "STUDENT";
  iat: number;
  exp: number;
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Redirect /auth -> /auth/login
  if (pathname === "/auth" || pathname === "/auth/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // No token
  if (!token) {
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/student") ||
      pathname.startsWith("/tutor") ||
      pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  }

  try {
    const user = verifyToken(token) as UserType;

    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },

      select: {
        id: true,
        isEnrolled: true,
      },
    });

    // Prevent logged-in users from accessing auth pages
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(
        new URL(`/${user.role.toLowerCase()}/dashboard`, request.url),
      );
    }

    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(
        new URL(`/${user.role.toLowerCase()}/dashboard`, request.url),
      );
    }

    // Admin protection
    if (pathname.startsWith("/admin") && user.role !== "ADMIN") {
      return NextResponse.redirect(
        new URL(`/${user.role.toLowerCase()}/dashboard`, request.url),
      );
    }

    if (
      (pathname.startsWith("/tutor") || pathname.startsWith("/student")) &&
      user.role === "ADMIN"
    ) {
      return NextResponse.redirect(
        new URL(`/${user.role.toLowerCase()}/dashboard`, request.url),
      );
    }

    if (token && user.role === "STUDENT") {
      if (userData?.isEnrolled) {
        return NextResponse.redirect(
          new URL(`/${user.role.toLowerCase()}/dashboard`, request.url),
        );
      }

      return NextResponse.redirect(new URL("/courseEnrollment", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));

    response.cookies.delete("token");

    return response;
  }
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/admin/:path*",
    "/student/:path*",
    "/tutor/:path*",
    "/dashboard/:path*",
  ],
};
