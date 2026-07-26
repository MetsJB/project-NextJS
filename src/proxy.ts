import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");
  const isLoginRoute = req.nextUrl.pathname.startsWith("/login");

  if (!isLoggedIn && isDashboardRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && isLoginRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
