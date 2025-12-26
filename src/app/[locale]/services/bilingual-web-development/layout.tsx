import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const baseMetadata = constructMetadata({
    title: "Bilingual Web Development Services | Spanish-English Websites",
    description: "Professional bilingual website development for small businesses. Reach Spanish and English-speaking customers with SEO-optimized websites. Start your project today.",
    path: "/services/bilingual-web-development",
    locale: locale,
  });

  return {
    ...baseMetadata,
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
  };
}

export default function BilingualWebDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

