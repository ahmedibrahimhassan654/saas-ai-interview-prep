import { buttonVariants, Card, Separator } from "@heroui/react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const features = [
  "Unlimited interview questions",
  "AI-powered feedback",
  "Progress tracking",
  "Role-specific question banks",
  "Real-time answer assistance",
  "Detailed performance analytics",
];

export function Pricing() {
  return (
    <section id="pricing" className="mt-24 scroll-mt-24">
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-2xl text-lg text-muted">
          One plan with everything you need to prepare and land the offer.
        </p>
      </div>

      <div className="mx-auto max-w-md">
        <Card className="border border-accent/40 bg-gradient-to-b from-accent/10 to-transparent">
          <Card.Header>
            <Card.Title className="text-xl">Pro Plan</Card.Title>
            <Card.Description>
              Everything you need to prepare with confidence.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="mb-6 flex items-end gap-1">
              <span className="text-4xl font-bold">$9.99</span>
              <span className="pb-1 text-muted">/ month</span>
            </div>
            <Separator />
            <ul className="mt-6 flex flex-col gap-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Icon
                    icon="solar:check-circle-bold"
                    className="h-5 w-5 shrink-0 text-success"
                  />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </Card.Content>
          <Card.Footer>
            <Link
              href="/subscribe"
              className={buttonVariants({
                variant: "primary",
                size: "lg",
                fullWidth: true,
                className: "rounded-full",
              })}
            >
              Subscribe
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </section>
  );
}
