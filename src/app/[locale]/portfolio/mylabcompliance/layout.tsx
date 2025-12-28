import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "myLabCompliance Case Study — From Critical SEO Failures to Excellent Performance | Abe Media",
    description: "How a 2-week bug fix turned into a 2+ month partnership that transformed site stability, search rankings, and lead quality. 95% bug reduction, 500 SEO pages, and 981ms load time.",
    path: "/portfolio/mylabcompliance",
    locale: locale,
  });
}

export default function MyLabComplianceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
