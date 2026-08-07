import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return constructMetadata({
    title: isEs
      ? "Servicios de IA, software y automatización bilingüe — Abe Media"
      : "AI Agents, Business Software & Automation Services — Abe Media",
    description: isEs
      ? "Agentes de IA, software empresarial, aplicaciones y automatización bilingüe para negocios de servicios, en inglés y español desde el primer día."
      : "AI agents, business software, applications, and bilingual automation for service businesses, built in English and Spanish from day one.",
    path: "/services",
    locale: locale,
  });
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
