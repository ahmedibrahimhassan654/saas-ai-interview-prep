import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Route protection for all /app/* routes. Unauthenticated users are redirected
// to the sign-in page configured below.
//
// NOTE: Next.js 16 renamed `middleware.ts` -> `proxy.ts`; the `middleware.ts`
// file convention is deprecated, so this proxy.ts is the equivalent. (This is
// the lecture's "middleware.ts / Version B" structure.)
//
// `req.nextauth.token` is the JWT payload. The `jwt` callback stores the full
// DB user at `token.user`, so future checks here can read:
//   token.user.roles        (e.g. ["user"] or ["user", "admin"])
//   token.user.subscription (e.g. { status: "active" })
export default withAuth(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- `req` is reserved for the future auth checks below
  function middleware(req) {
    // const { pathname } = req.nextUrl;
    // const token = req.nextauth.token;

    // Placeholder for future authorization checks (admin, subscription, etc.).
    // Example (commented out for now):
    // if (pathname.startsWith("/admin") && !token?.user?.roles?.includes("admin")) {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }
    // if (
    //   pathname.startsWith("/app") &&
    //   token?.user?.subscription?.status !== "active"
    // ) {
    //   return NextResponse.redirect(new URL("/subscribe", req.url));
    // }

    return NextResponse.next();
  },
  {
    pages: { signIn: "/login" },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  // Protects /app and everything nested under it (e.g. /app/dashboard), the
  // root-level /dashboard route, and the admin area (/admin/dashboard).
  // Do NOT add "/api/auth/*" — that would break the sign-in flow.
  matcher: ["/app/:path*", "/dashboard/:path*", "/admin/:path*"],
};