"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Logo } from "@/config/Logo";
import { siteConfig } from "@/config/site";
import { HeaderUser } from "./header-user";
import { ThemeSwitch } from "./theme-switch";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

              <HeaderUser />
            </div>

            <Button
              isIconOnly
              variant="ghost"
              className="md:hidden"
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
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {siteConfig.navMenuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-full rounded-md px-2 py-2 text-sm text-foreground transition-colors hover:bg-default/40"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
