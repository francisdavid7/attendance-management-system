import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth/jwt";

interface UserType {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  if (pathname === "/auth" || pathname === "/auth/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (!token) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return;
  }

  const tokenPayload = verifyToken(token);

  const user = tokenPayload as UserType;
  console.log(user);

  if (
    (pathname.startsWith("/auth") && token) ||
    (pathname.startsWith("/dashboard") && token)
  ) {
    if (user.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/dashboard/:path*"],
};
