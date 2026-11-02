import { requireUser } from "@/lib/auth-guard";

// Reading the session requires cookies, so this route cannot be prerendered.
export const instant = false;

// Server-side guard for the root-level /dashboard route.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();

  return children;
}
