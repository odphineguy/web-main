import type { Metadata } from "next";
import ScrollMotionLab from "@/components/experiments/ScrollMotionLab";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === "es";

  return {
    title: isSpanish ? "Laboratorio de movimiento" : "Scroll Motion Lab",
    description: isSpanish
      ? "Un prototipo privado de movimiento de Abe Media."
      : "An unlinked Abe Media scroll-motion prototype.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function MotionLabPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ScrollMotionLab locale={locale} />;
}
