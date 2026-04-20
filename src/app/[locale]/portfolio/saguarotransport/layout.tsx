import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title: "Saguaro Transport Case Study — A Full Trucking & Logistics Platform in 4 Months | Abe Media",
    description: "How Abe Media built Saguaro Transport a complete operations platform — Dispatch Command Center, Fleet, CRM, HR, Accounting, Driver App, and Client Portal — shipping daily builds from day one.",
    path: "/portfolio/saguarotransport",
    locale: locale,
  });
}

export default function SaguaroTransportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
