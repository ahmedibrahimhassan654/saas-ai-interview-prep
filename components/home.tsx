"use client";

import { Button, buttonVariants } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-20 md:py-32 relative">
      <div className="flex flex-col items-center gap-6 text-center">
        <Link
          href="/#pricing"
          className={buttonVariants({
            variant: "outline",
            size: "sm",
            className: "rounded-full",
          })}
        >
          <span className="flex items-center gap-2">
            New onboarding experience
            <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
          </span>
        </Link>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Your shortcut to{" "}
          <span className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            interview success
          </span>
        </h1>

        <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
          Practice with AI-powered mock interviews, get instant feedback, and
          land your dream job faster. Our adaptive learning system personalizes
          every session to your target role.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/subscribe"
            className={buttonVariants({
              variant: "primary",
              size: "lg",
              className: "rounded-full px-8",
            })}
          >
            Try Prep
          </Link>
          <Link
            href="/#pricing"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "rounded-full px-8",
            })}
          >
            See Plans
          </Link>
        </div>
      </div>

      <Button
        onPress={scrollToTop}
        variant="outline"
        size="md"
        className="fixed bottom-6 right-6 rounded-full shadow-lg"
      >
        <span className="flex items-center gap-2">
          Back to top
          <Icon icon="solar:arrow-up-linear" className="h-4 w-4" />
        </span>
      </Button>
    </section>
  );
}
