import { NextRequest } from "next/server";


export function getAuthToken(request: Request | NextRequest): string | null {
  if ('cookies' in request && typeof request.cookies.get === 'function') {
    const cookie = (request as NextRequest).cookies.get('auth-token');
    return cookie?.value || null;
  }

  // Fallback for legacy Request (API routes)
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return null;
  }

  // Split cookies by semicolon and space
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());

  for (const cookie of cookies) {
    if (cookie.startsWith("auth-token=")) {
      const token = cookie.substring("auth-token=".length);
      return token ? decodeURIComponent(token) : null;
    }
  }

  return null;
}
