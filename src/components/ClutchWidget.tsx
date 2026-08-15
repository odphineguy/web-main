"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    CLUTCHCO?: { loaded: boolean; items: HTMLElement[]; Init: () => void; Destroy: () => void };
  }
}

/**
 * Clutch "Review us on Clutch" widget (widget type 7, 65px tall).
 *
 * The inner div is Clutch's own markup — widget.js scans the document for
 * `.clutch-widget` and appends an iframe to each one, so the class name and
 * every `data-*` attribute have to stay exactly as Clutch generates them.
 * `data-nofollow="true"` is Clutch's own instruction for footer placements:
 * their generator defaults it to "false" and their share screen says to flip it
 * when the widget lives in a site footer.
 *
 * Two things Clutch's copy-paste snippet does not survive on this site:
 *
 * 1. widget.js only self-initialises from a `readystatechange` listener it
 *    registers at parse time. next/script injects it once the document has
 *    already reached `complete`, so that listener never fires and the container
 *    stays 0px tall. Calling `CLUTCHCO.Init()` from onLoad is the fix.
 *
 * 2. `color-scheme: light` is load-bearing in dark mode. The site sets
 *    `color-scheme: dark`, an iframe inherits it, and Chrome then refuses to
 *    give a light embedded document a transparent canvas — it paints it opaque
 *    white, so the badge arrives inside a white slab on the near-black footer.
 *    Pinning the container back to light restores the transparent composite.
 *
 * Clutch's `data-darkbg` flag looks like it should cover point 2, but for widget
 * type 7 it renders pixel-identically (verified against the live widget), so it
 * is deliberately not used — no theme fork to keep in sync.
 */
export default function ClutchWidget({ className }: { className?: string }) {
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (scriptReady) window.CLUTCHCO?.Init();
  }, [scriptReady]);

  return (
    <div className={className} style={{ colorScheme: "light" }}>
      <Script
        src="https://widget.clutch.co/static/js/widget.js"
        strategy="lazyOnload"
        onLoad={() => setScriptReady(true)}
      />
      <div
        className="clutch-widget"
        data-url="https://widget.clutch.co"
        data-widget-type="7"
        data-height="65"
        data-nofollow="true"
        data-expandifr="true"
        data-scale="100"
        data-clutchcompany-id="2700045"
      />
    </div>
  );
}
