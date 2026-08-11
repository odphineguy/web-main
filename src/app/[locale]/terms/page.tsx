import type { Metadata } from "next";
import { TERMS } from "@/content/legal";
import { LegalPage } from "@/components/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const doc = TERMS[locale === "es" ? "es" : "en"];
  return {
    title: doc.title,
    description:
      locale === "es"
        ? "Términos de uso de abemedia.online, incluyendo el uso de asistentes de IA y la ley aplicable."
        : "Terms for using abemedia.online, including AI assistant disclosures and governing law.",
    // Spanish legal copy is pending Abe's native-speaker review - keep it out
    // of the index until he signs off.
    robots: { index: locale !== "es", follow: true },
    alternates: { canonical: locale === "es" ? "https://abemedia.online/es/terms" : "https://abemedia.online/en/terms" },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalPage doc={TERMS[locale === "es" ? "es" : "en"]} />;
}
