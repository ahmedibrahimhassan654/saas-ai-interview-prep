"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button, buttonVariants, Skeleton, toast } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Logo } from "@/config/Logo";
import { siteConfig } from "@/config/site";
import { HeaderUser } from "./header-user";
import { HeaderUserMobile } from "./header-user-mobile";
import { ThemeSwitch } from "./theme-switch";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { data, status } = useSession();
  const user = data?.user;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-separator bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={28} className="text-accent" />
          <span className="font-bold text-inherit">{siteConfig.name}</span>
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 md:flex">
            {siteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeSwitch />

            <div className="hidden items-center gap-2 md:flex">
              {status === "loading" ? (
                <Skeleton className="h-10 w-[150px] rounded-lg" />
              ) : user ? (
                <>
                  <Link
                    href="/subscribe"
                    className={buttonVariants({
                      variant: "primary",
                      size: "sm",
                      className: "rounded-full",
                    })}
                  >
                    Subscribe for $9.99
                  </Link>

                  <HeaderUser user={user} />
                </>
              ) : (
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: "primary",
                    size: "sm",
                    className: "flex items-center gap-1 rounded-full",
                  })}
                >
                  Login
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="h-4 w-4"
                  />
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2 md:hidden">
              {status === "loading" ? (
                <Skeleton className="h-10 w-10 rounded-lg" />
              ) : user ? (
                <Button
                  isIconOnly
                  variant="ghost"
                  aria-label="Toggle menu"
                  aria-expanded={isMenuOpen}
                  onPress={() => setIsMenuOpen((open) => !open)}
                >
                  <Icon
                    icon={
                      isMenuOpen
                        ? "solar:close-square-linear"
                        : "solar:hamburger-menu-linear"
                    }
                    className="h-6 w-6"
                  />
                </Button>
              ) : (
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: "primary",
                    size: "sm",
                    className: "flex items-center gap-1 rounded-full",
                  })}
                >
                  Login
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    className="h-4 w-4"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {user && (
              <div className="mb-2 border-b border-separator pb-3">
                <HeaderUserMobile user={user} />
              </div>
            )}

            {siteConfig.navMenuItems.map((item) =>
              item.label === "Logout" ? (
                <button
                  key={item.label}
                  type="button"
                  className="w-full rounded-md px-2 py-2 text-left text-sm text-danger transition-colors hover:bg-danger/10"
                  onClick={async () => {
                    setIsMenuOpen(false);
                    await signOut({ redirect: false });
                    toast.success("You have been logged out.");
                    router.push("/");
                    router.refresh();
                  }}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="w-full rounded-md px-2 py-2 text-sm text-foreground transition-colors hover:bg-default/40"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
