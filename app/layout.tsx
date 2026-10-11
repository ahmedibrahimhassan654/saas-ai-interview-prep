import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/providers";
import { HeaderAnnouncement } from "@/components/layout/header/header-announcement";
import { Navbar } from "@/components/layout/header/navbar";
import { Footer } from "@/components/layout/footer/footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const stripExtensionAttrs = `(function () {
  var attrs = [
    "fdprocessedid",
    "cz-shortcut-listen",
    "data-gr-ext-installed",
    "data-new-gr-c-s-check-loaded",
    "data-lt-installed",
    "bis_skin_checked"
  ];
  function strip(el) {
    if (!el || el.nodeType !== 1 || !el.hasAttribute) return;
    for (var i = 0; i < attrs.length; i++) {
      if (el.hasAttribute(attrs[i])) el.removeAttribute(attrs[i]);
    }
  }
  try {
    new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === "attributes" && attrs.indexOf(m.attributeName) !== -1) {
          m.target.removeAttribute(m.attributeName);
        } else if (m.type === "childList") {
          m.addedNodes.forEach(strip);
        }
      }
    }).observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: attrs
    });
    strip(document.documentElement);
  } catch (e) {}
})();`;

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
          {process.env.NODE_ENV === "development" && (
            <Script id="strip-extension-attrs" strategy="beforeInteractive">
              {stripExtensionAttrs}
            </Script>
          )}
          <div className="relative flex flex-col h-screen">
            <HeaderAnnouncement />
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center">
              <Footer />
            </footer>
          </div>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
