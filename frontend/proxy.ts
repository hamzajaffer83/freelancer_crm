import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // 1️⃣ Redirect logged-in user away from /login
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // 2️⃣ Protect all other routes (except /login, /_next, /favicon.ico, public files)
  const publicPaths = ["/login", "/_next", "/favicon.ico"];
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3️⃣ Allow access if logged in or visiting public paths
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // runs on all routes except Next.js internals
};
