import { requireUser } from "@/lib/auth-guard";

// Reading the session requires cookies, so this route cannot be prerendered.
export const instant = false;

// Server-side guard for the /app/* area. The proxy also blocks signed-out
// visitors, but checking here keeps the area protected on its own.
export default async function AppAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();

  return children;
}
