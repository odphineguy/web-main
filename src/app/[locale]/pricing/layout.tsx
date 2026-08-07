import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return constructMetadata({
    title: isEs
      ? "Precios de agentes de voz con IA y automatización — Abe Media"
      : "AI Voice Agent & Automation Pricing — Abe Media",
    description: isEs
      ? "Responde tres preguntas para encontrar el alcance correcto — agente de voz con IA, automatización de leads o plataforma de operaciones a medida. El siguiente paso siempre es una llamada."
      : "Answer three questions to find the right scope — AI voice agent, lead pipeline automation, or a custom operations platform. The next step is always a call.",
    path: "/pricing",
    locale: locale,
  });
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
