import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bilingual Web Development Services | Spanish-English Websites",
  description:
    "Professional bilingual website development for small businesses. Reach Spanish and English-speaking customers with professionally translated, SEO-optimized websites. Law firms, healthcare, real estate & more.",
  keywords: [
    "bilingual website",
    "Spanish English website",
    "bilingual web development",
    "multilingual website",
    "Spanish website translation",
    "bilingual business website",
    "Hispanic market website",
    "dual language website",
    "Spanish web design",
    "bilingual SEO",
  ],
  openGraph: {
    title: "Bilingual Web Development Services | Spanish-English Websites",
    description:
      "Expand your business reach with professionally designed bilingual websites. Connect with both English and Spanish-speaking customers.",
    url: "https://abemedia.online/services/bilingual-web-development",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilingual Web Development Services",
    description:
      "Professional Spanish-English website development for small businesses. Reach diverse audiences with multilingual web solutions.",
  },
  alternates: {
    canonical: "https://abemedia.online/services/bilingual-web-development",
  },
};

export default function BilingualWebDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

