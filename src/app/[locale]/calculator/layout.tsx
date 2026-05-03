import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Bilingual Marketing ROI Calculator | Abe Media",
    description: "Estimate the revenue lift from launching a bilingual website or AI chatbot. Models customer reach, conversions, and time saved across English and Spanish audiences.",
    path: "/calculator",
    locale: locale,
  });
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
