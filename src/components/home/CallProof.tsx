"use client";

import dynamic from "next/dynamic";

type CallProofProps = { locale: string };

// Browser-only: owns an <audio> element.
const TranscriptPlayer = dynamic(() => import("@/components/TranscriptPlayer"), { ssr: false });

const copy = {
  en: {
    index: "Hear it yourself",
    title: {
      before: "A real call, ",
      accent: "unedited",
      after: ".",
    },
    lede: "An after-hours plumbing call, start to finish. Nothing cut, nothing re-recorded. The transcript follows the audio as it plays.",
    points: ["Answered on the first ring", "Qualified and priced in conversation", "Booked on a real calendar slot"],
  },
  es: {
    index: "Escúchalo tú mismo",
    title: {
      before: "Una llamada real, ",
      accent: "sin editar",
      after: ".",
    },
    lede: "Una llamada de plomería fuera de horario, de principio a fin. Sin cortes ni regrabaciones. La transcripción sigue el audio mientras se reproduce.",
    points: ["Contestada al primer timbre", "Calificada y cotizada en la conversación", "Reservada en un horario real del calendario"],
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
