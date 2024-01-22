import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const currentUser = request.cookies.get("ACCESS_TOKEN")?.value;
  if ((pathname === "/login" || pathname === "/signup") && currentUser) {
    return NextResponse.redirect(new URL("/todo", request.url));
  }
  if (pathname === "/todo" && !currentUser) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/login", "/signup", "/todo/:path*"],
};
