import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { Logo } from "@/config/Logo";
import { siteConfig } from "@/config/site";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

async function CopyrightYear() {
  await connection();
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={24} className="text-accent" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <p className="text-center text-sm text-muted">
        ©{" "}
        <Suspense fallback={null}>
          <CopyrightYear />
        </Suspense>{" "}
        {siteConfig.name}. All rights reserved.
      </p>
    </div>
  );
}
