import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Our Work & Projects | Abe Media",
  description: "Explore our portfolio of innovative web development projects, mobile apps, and AI chatbot solutions. See how we help small businesses with bilingual websites and custom digital tools.",
  keywords: [
    "abe media portfolio",
    "web development portfolio",
    "mobile app portfolio",
    "AI chatbot examples",
    "bilingual website portfolio",
    "small business websites",
    "website design portfolio",
  ],
  alternates: {
    canonical: "https://abemedia.online/portfolio",
  },
  openGraph: {
    title: "Portfolio — Our Work & Projects | Abe Media",
    description: "Explore our portfolio of innovative web development projects, mobile apps, and AI chatbot solutions for small businesses.",
    url: "https://abemedia.online/portfolio",
  },
  twitter: {
    title: "Portfolio — Our Work & Projects | Abe Media",
    description: "Explore our portfolio of innovative web development projects, mobile apps, and AI chatbot solutions for small businesses.",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

