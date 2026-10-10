"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const emptySubscribe = () => () => {};

export function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      isIconOnly
      variant="ghost"
      aria-label="Toggle theme"
      onPress={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        <Icon
          icon={isDark ? "solar:sun-bold" : "solar:moon-bold"}
          className="h-5 w-5"
        />
      ) : (
        <span className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  );
}
