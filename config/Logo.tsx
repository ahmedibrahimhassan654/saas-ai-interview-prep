import { Icon } from "@iconify/react";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size, className }: LogoProps) {
  return (
    <Icon
      icon="hugeicons:ai-brain-04"
      width={size}
      height={size}
      className={className}
    />
  );
}
