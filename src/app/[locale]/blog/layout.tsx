import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Blog — Web Development, AI Chatbots & Digital Marketing Insights | Abe Media",
    description: "Expert insights on bilingual web development, AI chatbots, SEO strategies, and digital marketing for small businesses. Get actionable tips and industry trends.",
    path: "/blog",
    locale: locale,
  });
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
