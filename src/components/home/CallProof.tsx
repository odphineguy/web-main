"use client";

import dynamic from "next/dynamic";

type CallProofProps = { locale: string };

// Browser-only: owns an <audio> element.
const TranscriptPlayer = dynamic(() => import("@/components/TranscriptPlayer"), { ssr: false });

const copy = {
  en: {
    index: "Hear it yourself",
    title: {
      before: "Real calls, ",
      accent: "no scripts",
      after: ".",
    },
    lede: "Recorded moments from real AI conversations across service businesses. The transcript follows each excerpt as it plays.",
    points: ["Real caller and agent audio", "Different service-business scenarios", "Transcript synced to playback"],
  },
  es: {
    index: "Escúchalo tú mismo",
    title: {
      before: "Llamadas reales, ",
      accent: "sin guiones",
      after: ".",
    },
    lede: "Momentos grabados de conversaciones reales con IA para negocios de servicios. La transcripción sigue cada extracto mientras se reproduce.",
    points: ["Audio real del cliente y del agente", "Diferentes escenarios de servicio", "Transcripción sincronizada"],
  },
} as const;

export default function CallProof({ locale }: CallProofProps) {
  const text = locale === "es" ? copy.es : copy.en;

  return (
    <section className="bold-callproof" id="call-proof">
      <div className="bold-home__shell bold-callproof__layout">
        <div className="bold-callproof__copy">
          <p className="bold-home__index">{text.index}</p>
          <h2>{text.title.before}<span>{text.title.accent}</span>{text.title.after}</h2>
          <p>{text.lede}</p>
          <ol>
            {text.points.map((point, index) => (
              <li key={point}><span>{String(index + 1).padStart(2, "0")}</span><b>{point}</b></li>
            ))}
          </ol>
        </div>
        <div className="bold-callproof__player">
          <TranscriptPlayer />
        </div>
      </div>
    </section>
  );
}
