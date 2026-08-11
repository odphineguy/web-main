import type { Metadata } from "next";
import { PRIVACY } from "@/content/legal";
import { LegalPage } from "@/components/LegalPage";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const doc = PRIVACY[locale === "es" ? "es" : "en"];
  return {
    title: doc.title,
    description:
      locale === "es"
        ? "Cómo Abe Media recopila y usa su información, incluyendo llamadas atendidas por IA y consentimiento de SMS."
        : "How Abe Media collects and uses your information, including AI-answered calls and SMS consent.",
    // Spanish legal copy is pending Abe's native-speaker review - keep it out
    // of the index until he signs off.
    robots: { index: locale !== "es", follow: true },
    alternates: { canonical: locale === "es" ? "https://abemedia.online/es/privacy" : "https://abemedia.online/en/privacy" },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalPage doc={PRIVACY[locale === "es" ? "es" : "en"]} />;
}
