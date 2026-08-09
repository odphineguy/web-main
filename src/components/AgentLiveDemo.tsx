"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

const AGENT_ID = "agent_0701kxxqc7hkfjy8r4k312032t9c";

// Browser-only: the SDK opens a WebRTC connection and touches the audio context.
const AgentCallPanel = dynamic(() => import("./AgentCallPanel"), { ssr: false });

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

          {/* Right: our own call surface, not the vendor embed */}
          <div className="flex justify-center lg:justify-end">
            <AgentCallPanel agentId={AGENT_ID} />
          </div>
        </div>
      </div>
    </section>
  );
}
