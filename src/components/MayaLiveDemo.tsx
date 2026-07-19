"use client";

import Script from "next/script";
import { useTranslations } from "next-intl";

const MAYA_AGENT_ID = "agent_0701kxxqc7hkfjy8r4k312032t9c";

export default function MayaLiveDemo() {
  const t = useTranslations("Home.MayaDemo");

  return (
    <section className="bg-gray-50 dark:bg-neutral-950 py-20 px-6 border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
              {t("badge")}
            </span>
            <h2 className="text-[28px] md:text-[32px] font-medium tracking-[-0.02em] text-foreground">
              {t("title")}
            </h2>
            <p className="text-muted-foreground">{t("p1")}</p>
            <p className="text-muted-foreground">{t("p2")}</p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-md h-[420px] [transform:translateZ(0)] overflow-hidden rounded-2xl"
              dangerouslySetInnerHTML={{
                __html: `<elevenlabs-convai agent-id="${MAYA_AGENT_ID}"></elevenlabs-convai>`,
              }}
            />
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
