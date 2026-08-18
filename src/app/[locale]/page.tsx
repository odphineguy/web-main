import HomePage from "@/components/HomePage";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return constructMetadata({
    title: isEs
      ? "Abe Media | Agentes de voz con IA y software de dispatch"
      : "Abe Media | AI Voice Agents and Dispatch Software",
    description: isEs
      ? "Agentes de voz con IA, sistemas de dispatch, automatización de leads y herramientas de estimación para negocios de servicios en Estados Unidos. English y español."
      : "AI voice agents, custom dispatch systems, lead automation, and estimating tools for U.S. service businesses. English y español. Built by an operator with 17 years in dispatch.",
    locale: locale,
    path: "", // Homepage path
  });
}

export default function Page() {
  return <HomePage />;
}
