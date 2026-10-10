import { Card } from "@heroui/react";

interface StatItem {
  title: string;
  value: string;
  description: string;
}

const stats: StatItem[] = [
  {
    title: "Active Users",
    value: "10K+",
    description: "Professionals practicing daily",
  },
  {
    title: "Interviews Created",
    value: "50K+",
    description: "Mock interviews generated",
  },
  {
    title: "Companies",
    value: "500+",
    description: "Target companies covered",
  },
  {
    title: "Rating",
    value: "4.8+",
    description: "Average user satisfaction",
  },
];

export function LandingPageStats() {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <Card.Header>
            <Card.Title>{stat.title}</Card.Title>
            <Card.Description>{stat.description}</Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Card.Content>
        </Card>
      ))}
    </section>
  );
}
