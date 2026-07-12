import HomePage from "@/components/HomePage";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return constructMetadata({
    title: isEs
      ? "Abe Media — Agentes de IA que contestan tus llamadas, agendan trabajos y manejan tu dispatch"
      : "Abe Media — AI Agents That Answer Your Phones, Book Jobs & Run Dispatch",
    description: isEs
      ? "Agentes de voz con IA, contestación fuera de horario, plataformas de dispatch y automatización de leads para negocios de servicios. Bilingüe por diseño — English y español. Llama a Elena, nuestra demo en vivo: (669) 669-4486."
      : "AI voice agents, after-hours answering, dispatch platforms, and lead-pipeline automation for service businesses. Bilingual by default — English y español. Call Elena, our live demo agent: (669) 669-4486.",
    locale: locale,
    path: "", // Homepage path
  });
}

export default function Page() {
  return <HomePage />;
}
