import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { HeaderAnnouncement } from "@/components/layout/header/header-announcement";
import { Navbar } from "@/components/layout/header/navbar";
import { Footer } from "@/components/layout/footer/footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground"
      >
        <Providers>
          <div className="relative flex flex-col h-screen">
            <HeaderAnnouncement />
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center">
              <Footer />
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
