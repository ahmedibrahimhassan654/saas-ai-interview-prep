export interface NavItem {
  label: string;
  href: string;
  /** When set, the item is only shown to users with this role. */
  role?: "admin";
}

export const siteConfig = {
  name: "Prep",
  description: "Prepare for interviews with AI",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/#pricing" },
  ] as NavItem[],
  navMenuItems: [
    { label: "Admin Dashboard", href: "/admin/dashboard", role: "admin" },
    { label: "App Dashboard", href: "/dashboard" },
    { label: "Logout", href: "#" },
  ] as NavItem[],
};
