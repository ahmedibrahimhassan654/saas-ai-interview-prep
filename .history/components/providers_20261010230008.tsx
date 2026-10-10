"use client";

import { Toast } from "@heroui/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
    >
      <Toast.Provider placement="top end" />
      {children}
    </ThemeProvider>
  );
}
