import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { SessionUser } from "@/types/next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

/**
 * Returns the current session user, or null when signed out.
 *
 * Server-side companion to `proxy.ts`: the proxy guards navigation, while
 * these helpers guard rendering so a route stays protected even if the proxy
 * matcher changes or a page is rendered outside the matched paths.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
}

/** Requires a signed-in user; redirects to the login page otherwise. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

/**
 * Requires a signed-in user with the "admin" role. Non-admins are redirected
 * to the regular dashboard, mirroring the proxy behavior.
 */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();

  if (!user.roles?.includes("admin")) {
    redirect("/dashboard");
  }

  return user;
}
