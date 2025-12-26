import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";

import { Outfit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import nextDynamic from "next/dynamic";
import "../globals.css";
import TopNavbar from "@/components/TopNavbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { Analytics } from "@vercel/analytics/react";
import { Instagram, Facebook, Music2, Twitter } from "lucide-react";

// Lazy load the chatbot to reduce initial bundle size (code-splitting)
const FloatingChatbot = nextDynamic(() => import("@/components/FloatingChatbot"), {
  loading: () => null,
});

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
    default: "Abe Media — Bilingual Web Development & AI Solutions for Small Business",
    template: "%s | Abe Media",
  },
  description: "Professional bilingual web development, AI chatbots, and custom digital solutions for small businesses. Modern websites, mobile apps, and AI automation in English & Spanish. Get started with a free consultation.",
  keywords: [
    "small business website",
    "bilingual website",
    "AI chatbots",
    "web development",
    "mobile app development",
    "custom software",
    "bilingual digital solutions",
    "small business automation",
    "AI agents",
    "website design",
    "English Spanish website",
    "business website",
  ],
  authors: [{ name: "Abe Media" }],
  creator: "Abe Media",
  publisher: "Abe Media",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: "https://abemedia.online",
    siteName: "Abe Media",
    title: "Abe Media — Bilingual Web Development & AI Solutions for Small Business",
    description: "Professional bilingual web development, AI chatbots, and custom digital solutions for small businesses. Modern websites, mobile apps, and AI automation in English & Spanish.",
    locale: "en_US",
    alternateLocale: ["es_US", "es_MX"],
    images: [
      {
        url: "/images/portfolio/home.png",
        width: 1200,
        height: 630,
        alt: "Abe Media - Bilingual Web Development & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abe Media — Bilingual Web Development & AI Solutions",
    description: "Professional bilingual web development, AI chatbots, and custom digital solutions for small businesses.",
    images: ["/images/portfolio/home.png"],
    creator: "@abe_vision",
  },
  alternates: {
    canonical: "./",
    languages: {
      en: "/en",
      es: "/es",
      "x-default": "/en",
    },
  },
  verification: {
    // Add your verification codes here if you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className="border-t border-border py-6">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
        <div className="flex justify-center sm:justify-start">
          <Link href="/" aria-label="Abe Media" className="inline-flex">
            <Image src="/images/portfolio/abemedia.black.svg" alt="Abe Media" width={140} height={28} className="block dark:hidden" />
            <Image src="/images/portfolio/abemedia.white.svg" alt="Abe Media" width={140} height={28} className="hidden dark:block" />
          </Link>
        </div>
        <div className="text-center">
          <p className="text-xs text-neutral-600 dark:text-white/60">{t('copyright')}</p>
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
  );
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming locale is valid
  if (!['en', 'es'].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});

  // Structured data for SEO

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Abe Media",
    url: "https://abemedia.online",
    logo: "https://abemedia.online/images/portfolio/abemedia.black.svg",
    description: "Professional bilingual web development, AI chatbots, and custom digital solutions for small businesses.",
    sameAs: [
      "https://x.com/abe_vision",
      "https://www.instagram.com/abevision_",
      "https://www.facebook.com/profile.php?id=100091085333551",
      "https://www.tiktok.com/@abevision_",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Spanish"],
    },
    areaServed: "US",
    knowsAbout: [
      "Web Development",
      "AI Chatbots",
      "Mobile App Development",
      "Bilingual Websites",
      "UI/UX Design",
      "Custom Software Development",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Abe Media",
    url: "https://abemedia.online",
    description: "Professional bilingual web development, AI chatbots, and custom digital solutions for small businesses.",
    publisher: {
      "@type": "Organization",
      name: "Abe Media",
      logo: {
        "@type": "ImageObject",
        url: "https://abemedia.online/images/portfolio/abemedia.black.svg"
      }
    },
    inLanguage: ["en-US", "es-US", "es-MX"],
  };

  // Normal static/dynamic behavior restored
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Critical CSS for above-the-fold content - inlined to avoid render blocking */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Critical hero styles for LCP optimization */
          .min-h-screen{min-height:100vh}
          .bg-white{background-color:#fff}
          .dark .dark\\:bg-black{background-color:#000}
          .px-6{padding-left:1.5rem;padding-right:1.5rem}
          .pt-8{padding-top:2rem}
          .pb-16{padding-bottom:4rem}
          .max-w-6xl{max-width:72rem}
          .mx-auto{margin-left:auto;margin-right:auto}
          .grid{display:grid}
          .grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
          .gap-12{gap:3rem}
          .items-center{align-items:center}
          .space-y-6>:not([hidden])~:not([hidden]){margin-top:1.5rem}
          .text-4xl{font-size:2.25rem;line-height:2.5rem}
          .font-bold{font-weight:700}
          .text-gray-900{color:rgb(17 24 39)}
          .dark .dark\\:text-white{color:#fff}
          .leading-tight{line-height:1.25}
          .text-transparent{color:transparent}
          .bg-clip-text{-webkit-background-clip:text;background-clip:text}
          .bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}
          .from-orange-400{--tw-gradient-from:rgb(251 146 60);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}
          .to-orange-600{--tw-gradient-to:rgb(234 88 12)}
          .text-lg{font-size:1.125rem;line-height:1.75rem}
          .text-gray-600{color:rgb(75 85 99)}
          .dark .dark\\:text-neutral-300{color:rgb(212 212 212)}
          .relative{position:relative}
          .w-full{width:100%}
          .aspect-\\[4\\/3\\]{aspect-ratio:4/3}
          .object-contain{object-fit:contain}
          @media(min-width:768px){.md\\:text-5xl{font-size:3rem;line-height:1}.md\\:pt-16{padding-top:4rem}}
          @media(min-width:1024px){.lg\\:text-6xl{font-size:3.75rem;line-height:1}.lg\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.lg\\:pb-32{padding-bottom:8rem}.lg\\:scale-\\[1\\.20\\]{transform:scale(1.2)}.lg\\:translate-x-8{transform:translateX(2rem)}}
        `}} />
        {/* Preload LCP hero images for faster initial paint */}
        <link
          rel="preload"
          href="/images/home/home-hero-light.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/images/home/home-hero.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EJCZTY1MCG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EJCZTY1MCG');
          `}
        </Script>
      </head>
      <body className={`${outfit.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <ConvexClientProvider>
            <TopNavbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <FloatingChatbot />
            <Analytics />
            </ConvexClientProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
