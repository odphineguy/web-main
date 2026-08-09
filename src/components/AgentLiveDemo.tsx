"use client";

import Script from "next/script";
import { useTranslations } from "next-intl";
import { Check, PhoneCall } from "lucide-react";

const AGENT_ID = "agent_0701kxxqc7hkfjy8r4k312032t9c";

export default function AgentLiveDemo() {
  const t = useTranslations("Home.AgentDemo");

  return (
    <section className="bg-gray-50 dark:bg-neutral-950 py-20 px-6 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: copy + what to try on the call */}
          <div className="space-y-4">
            <h2 className="text-[28px] md:text-[32px] font-medium tracking-[-0.02em] text-foreground">
              {t("title")}
            </h2>
            <p className="text-muted-foreground">{t("p1")}</p>
            <p className="text-muted-foreground">{t("p2")}</p>
            <div className="pt-2">
              <p className="text-sm font-semibold text-foreground mb-3">{t("tryTitle")}</p>
              <ul className="space-y-2">
                {(["try1", "try2", "try3"] as const).map((k) => (
                  <li key={k} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                    <span>{t(k)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: designed call card hosting the ElevenLabs widget */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-2xl p-px bg-gradient-to-b from-orange-500/40 to-white/5">
              <div className="rounded-2xl bg-white dark:bg-neutral-900 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10">
                    <PhoneCall className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t("cardTitle")}</p>
                    <p className="text-xs text-muted-foreground">{t("cardSubtitle")}</p>
                  </div>
                </div>
                {/* The embedded widget is the call trigger — it renders its own start button */}
                <div
                  className="relative h-[360px] [transform:translateZ(0)] overflow-hidden rounded-xl"
                  dangerouslySetInnerHTML={{
                    __html: `<elevenlabs-convai agent-id="${AGENT_ID}"></elevenlabs-convai>`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="lazyOnload"
        type="text/javascript"
      />
    </section>
  );
}
