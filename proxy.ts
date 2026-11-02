import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Route protection for the authenticated areas of the app.
//
// NOTE: Next.js 16 renamed `middleware.ts` -> `proxy.ts`; the `middleware.ts`
// file convention is deprecated, so this proxy.ts is the equivalent.
//
// `req.nextauth.token` is the JWT payload. The `jwt` callback stores the full
// DB user at `token.user`, so authorization checks here read:
//   token.user.roles        (e.g. ["user"] or ["user", "admin"])
//   token.user.subscription (e.g. { status: "active" })
//
// Authentication (is there a token?) is handled by the `authorized` callback
// below. Authorization (which role may see which area?) is handled in the
// proxy function.
export default withAuth(
  function proxy(req) {
    const { pathname } = req.nextUrl;
    const roles = req.nextauth.token?.user?.roles ?? [];

    // Admin area: only users with the "admin" role may enter. Everyone else
    // is sent back to the regular dashboard instead of seeing a 404/blank page.
    if (pathname.startsWith("/admin") && !roles.includes("admin")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Placeholder for future authorization checks (e.g. subscription gating):
    // if (
    //   pathname.startsWith("/app") &&
    //   req.nextauth.token?.user?.subscription?.status !== "active"
    // ) {
    //   return NextResponse.redirect(new URL("/subscribe", req.url));
    // }

    return NextResponse.next();
  },
  {
    pages: { signIn: "/login" },
    callbacks: {
      // Any authenticated user passes here; role checks happen above. This is
      // intentional: `authorized` returning false redirects to the sign-in
      // page, which is wrong for a signed-in user who lacks a role.
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
