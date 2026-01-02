import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/app/utils/auth";

export function proxy(request: NextRequest) {
  const token = getAuthToken(request);
  const url = request.nextUrl.clone();

  // Protect all dashboard routes
  if (url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/posts")) {
    // Check if token exists
    if (!token || token.trim().length === 0) {
      const signInUrl = request.nextUrl.clone();
      signInUrl.pathname = "/UserAccounts/SignIn";

      // Save the original dashboard path
      signInUrl.searchParams.set("returnTo", url.pathname + url.search);

      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/posts"
  ],
};
