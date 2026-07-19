import { Big_Shoulders, Familjen_Grotesk, Spline_Sans_Mono } from "next/font/google";
import HowItWorksPage from "@/components/how-it-works/HowItWorksPage";
import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

// Page-scoped fonts for the cinematic case-story look (loaded only on this route)
const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-hiw-display",
  display: "swap",
});

const familjenGrotesk = Familjen_Grotesk({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-hiw-body",
  display: "swap",
});

const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hiw-mono",
  display: "swap",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return constructMetadata({
    title: isEs
      ? "Cómo funciona una operación dirigida por IA — del lead al trabajo terminado"
      : "How an AI-Run Operation Works — From Lead to Finished Job",
    description: isEs
      ? "Un recorrido visual por una operación real dirigida por IA: leads respondidos y cotizados en menos de un minuto, seguimientos automáticos, humanos en los casos límite y cuentas claras. Funcionando en producción para una empresa de Phoenix hoy."
      : "A visual walkthrough of a real AI-run operation: leads answered and priced in under a minute, automatic follow-ups, humans on the edge cases, and clean books. Running in production for a Phoenix company today.",
    locale,
    path: "/how-it-works",
  });
}

export default function Page() {
  return (
    <div className={`${bigShoulders.variable} ${familjenGrotesk.variable} ${splineSansMono.variable}`}>
      <HowItWorksPage />
    </div>
  );
}
