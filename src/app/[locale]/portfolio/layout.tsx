import { constructMetadata } from "@/lib/seo";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    title:
      locale === "es"
        ? "Proyectos y casos de estudio — Abe Media"
        : "Projects & Case Studies — Abe Media",
    description:
      locale === "es"
        ? "Sistemas reales en producción: IA de voz, plataformas de operaciones y apps móviles construidas de punta a punta por Abe Media."
        : "Real systems in production: voice AI, operations platforms, and mobile apps built end to end by Abe Media.",
    path: "/portfolio",
    locale: locale,
    hasSpanishEquivalent: true,
  });
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
