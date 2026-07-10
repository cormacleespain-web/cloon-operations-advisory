import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Optimistic redirect only — cookie presence, not validity. The real check
 * is `requireAdmin()` inside every server action and `<AdminGuard>` in the
 * admin layout (Next 16 docs: don't rely on proxy alone for auth, since a
 * matcher change can silently drop coverage for Server Function calls).
 */
export function proxy(request: NextRequest) {
  const hasSession =
    request.cookies.has("authjs.session-token") ||
    request.cookies.has("__Secure-authjs.session-token");

  if (!hasSession) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
