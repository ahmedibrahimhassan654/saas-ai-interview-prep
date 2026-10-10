"use client";

import { SessionProvider } from "next-auth/react";
import { Toast } from "@heroui/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <Toast.Provider placement="top end" />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
