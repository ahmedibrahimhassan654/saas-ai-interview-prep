import { Card } from "@heroui/react";
import { Icon } from "@iconify/react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <Card.Header>
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15">
          <Icon icon={icon} className="h-6 w-6 text-accent" />
        </div>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Content>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
}
