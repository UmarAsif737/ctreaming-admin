import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const session = await getToken({ req: req as any });
  const isAuthenticated = !!session;

  const url = req.nextUrl.clone();

  // Redirect authenticated users from /login to /dashboard
  if (
    (req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register")) &&
    isAuthenticated
  ) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Handle access to /dashboard and other pages
  if (req.nextUrl.pathname.startsWith("/dashboard") && !isAuthenticated) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Continue with the request if no redirection is needed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/", "/login"],
};
