import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const baseMetadata = constructMetadata({
    title: "Bilingual SEO Phoenix | English & Spanish SEO | Abe Media",
    description: "Reach Phoenix's Spanish-speaking customers with bilingual SEO. We optimize your site for English and Spanish Google searches. Free consultation available.",
    path: "/bilingual-seo-phoenix",
    locale: locale,
  });

  return {
    ...baseMetadata,
    keywords: [
      "bilingual seo phoenix",
      "spanish seo phoenix",
      "bilingual website phoenix",
      "english spanish seo arizona",
      "phoenix hispanic marketing",
      "spanish google optimization",
      "bilingual local seo",
      "phoenix seo services spanish",
    ],
  };
}

export default function BilingualSEOPhoenixLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
