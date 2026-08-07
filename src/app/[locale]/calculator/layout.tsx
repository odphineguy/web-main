import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return constructMetadata({
    title: isEs
      ? "Calculadora de crecimiento bilingüe — Abe Media"
      : "Bilingual Growth Calculator — Abe Media",
    description: isEs
      ? "Estima los ingresos mensuales que podrías captar al atender a clientes de habla hispana en tu mercado."
      : "Estimate the monthly revenue your business could capture by serving Spanish-speaking customers in your market.",
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
