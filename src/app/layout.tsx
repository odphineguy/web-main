import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import TopNavbar from "@/components/TopNavbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingChatbot from "@/components/FloatingChatbot";
import { Analytics } from "@vercel/analytics/react";
import { Instagram, Facebook, Music2, Twitter } from "lucide-react";

// Force fresh HTML on production so updates appear immediately
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abemedia.online"),
  title: {
    default: "Abe Media — Portfolio",
    template: "%s | Abe Media",
  },
  description: "Design portfolio and contact for Abe Media.",
  openGraph: {
    type: "website",
    url: "https://abemedia.online",
    title: "Abe Media — Portfolio",
    description: "Design portfolio and contact for Abe Media.",
    images: [
      {
        url: "/images/portfolio/home.png",
        width: 1200,
        height: 630,
        alt: "Abe Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abe Media — Portfolio",
    description: "Design portfolio and contact for Abe Media.",
    images: ["/images/portfolio/home.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Normal static/dynamic behavior restored
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased`}>
        <ThemeProvider>
          <TopNavbar />
          <main className="min-h-screen">{children}</main>
          <footer className="border-t border-border py-6">
            <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
              <div className="flex justify-center sm:justify-start">
                <Link href="/" aria-label="Abe Media" className="inline-flex">
                  <Image src="/images/portfolio/abemedia.black.svg?v=3" alt="Abe Media" width={140} height={28} className="block dark:hidden" />
                  <Image src="/images/portfolio/abemedia.white.svg?v=3" alt="Abe Media" width={140} height={28} className="hidden dark:block" />
                </Link>
              </div>
              <div className="text-center">
                <p className="text-xs text-neutral-600 dark:text-white/60">© 2025 AbeMedia, LLC. All rights reserved.</p>
              </div>
              <div className="flex justify-center sm:justify-end text-neutral-600 dark:text-white/70 gap-5">
                <a href="https://x.com/abe_vision" target="_blank" rel="noreferrer" aria-label="Twitter" className="transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/abevision_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100091085333551&sk=about" target="_blank" rel="noreferrer" aria-label="Facebook" className="transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.tiktok.com/@abevision_?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" aria-label="TikTok" className="transition-colors">
                  <Music2 className="h-5 w-5" />
                </a>
              </div>
            </div>
          </footer>
          <FloatingChatbot />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
