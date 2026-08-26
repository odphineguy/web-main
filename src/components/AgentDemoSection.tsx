"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { useState } from "react";
import ConsultationForm from "@/components/ConsultationForm";

const AGENT_ID = "agent_0701kxxqc7hkfjy8r4k312032t9c";

// Both are browser-only: one owns an <audio> element, the other opens a WebRTC
// connection and touches the audio context.
const TranscriptPlayer = dynamic(() => import("@/components/TranscriptPlayer"), { ssr: false });
const AgentCallPanel = dynamic(() => import("@/components/AgentCallPanel"), { ssr: false });

/**
 * The two agent demos in one place: a recorded call you can listen to, next to a
 * live agent you can actually phone. Hear it, then try it — the recorded clip
 * sets expectations before the visitor commits to a mic prompt.
 */
export default function AgentDemoSection({
  onRecordedPlay,
  onCtaClick,
}: {
  onRecordedPlay?: () => void;
  onCtaClick?: () => void;
}) {
  const t = useTranslations("Home.AgentDemos");
  const live = useTranslations("Home.AgentDemo");
  const [consultationOpen, setConsultationOpen] = useState(false);

  return (
    <>
    <section
      id="agent-demos"
      className="scroll-mt-20 border-y border-border bg-band px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <h2 className="text-[28px] font-medium tracking-[-0.02em] text-foreground md:text-[32px] lg:text-[36px]">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Recorded call — moved up from the hero */}
          <div>
            <p className="label-mono mb-4 uppercase text-muted-foreground">{t("recordedLabel")}</p>
            <div className="w-full max-w-md">
              <TranscriptPlayer onFirstPlay={onRecordedPlay} />
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">{t("recordedNote")}</p>
          </div>

          {/* Live call — the agent the visitor can talk to right now */}
          <div>
            <p className="label-mono mb-4 uppercase text-muted-foreground">{t("liveLabel")}</p>
            <h3 className="text-[22px] font-medium tracking-[-0.01em] text-foreground md:text-[26px]">
              {live("title")}
            </h3>
            <p className="mt-3 text-muted-foreground">{live("p1")}</p>
            <p className="mt-3 text-muted-foreground">{live("p2")}</p>

            <div className="pt-5">
              <p className="mb-3 text-sm font-semibold text-foreground">{live("tryTitle")}</p>
              <ul className="space-y-2">
                {(["try1", "try2", "try3"] as const).map((k) => (
                  <li key={k} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                    <span>{live(k)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <AgentCallPanel agentId={AGENT_ID} />
            </div>
          </div>
        </div>

        {/* Carried over from the retired industry-tabs showcase — this is the
            only control that opens the consultation form on the homepage. */}
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => onCtaClick ? onCtaClick() : setConsultationOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg shadow-orange-500/25 transition-colors hover:bg-orange-600"
          >
            {t("cta")}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
    <ConsultationForm isOpen={consultationOpen} onClose={() => setConsultationOpen(false)} />
    </>
  );
}
