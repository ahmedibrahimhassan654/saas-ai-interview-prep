import { requireAdmin } from "@/lib/auth-guard";

// Reading the session requires cookies, so this route cannot be prerendered.
// Authenticated pages are user-specific by nature.
export const instant = false;

// Server-side guard for the whole admin area. The proxy also blocks
// non-admins, but checking here keeps /admin protected on its own.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return children;
}
