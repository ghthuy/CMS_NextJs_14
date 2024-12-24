import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;

  // Bypass requests for static files and assets
  if (
    pathname.startsWith("/_next") || // Next.js internal files
    pathname.startsWith("/api") || // API routes
    pathname.startsWith("/static") || // Static assets
    pathname.match(/\.(jpg|jpeg|png|gif|svg|ico|webp|avif|tiff|bmp)$/i) // Image files
  ) {
    return NextResponse.next();
  }

  // If no session token, allow only login and register pages
  if (
    !sessionToken ||
    sessionToken === "undefined" ||
    sessionToken === "null"
  ) {
    if (pathname !== "/login" && pathname !== "/register") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect authenticated users away from login and register
  if (sessionToken && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow all other authenticated paths
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"], // Apply middleware to all paths
};
