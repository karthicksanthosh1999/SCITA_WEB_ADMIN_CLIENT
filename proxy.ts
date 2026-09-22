import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/requestInfo",
  "/settings",
];

const authRoutes = [
  "/"
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`),
  );

  const isAuthRoute = authRoutes.some(
    (route) =>
      pathname === route ||
      pathname.startsWith(`${route}/`),
  );

  // User is trying to access protected page
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/", request.url);

    // Optional: remember where the user wanted to go
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // User is already logged in
  // Don't allow them to visit login/register
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/requestInfo/:path*",
    "/settings/:path*",
    "/"
  ],
};