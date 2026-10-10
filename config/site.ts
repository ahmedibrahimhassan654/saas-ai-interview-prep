export interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "Prep",
  description: "Prepare for interviews with AI",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/#pricing" },
  ] as NavItem[],
  navMenuItems: [
    { label: "Admin Dashboard", href: "/admin/dashboard" },
    { label: "App Dashboard", href: "/dashboard" },
    { label: "Logout", href: "#" },
  ] as NavItem[],
};
