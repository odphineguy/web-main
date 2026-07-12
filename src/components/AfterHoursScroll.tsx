"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Scroll-scrubbed "after hours" story: closed office -> Elena answers at 11:30 PM -> morning payoff.
// Desktop: GSAP ScrollTrigger scrub over a sticky viewport (one continuous camera flight).
// Mobile / reduced-motion: static variants — never ship a janky flagship animation.

const scenes = [
  {
    id: 1,
    desktop: "/images/after-hours/scene-1.webp",
    mobile: "/images/after-hours/scene-1-mobile.webp",
    captionKey: "scene1",
  },
  {
    id: 2,
    desktop: "/images/after-hours/scene-2.webp",
    mobile: "/images/after-hours/scene-2-mobile.webp",
    captionKey: "scene2",
  },
  {
    id: 3,
    desktop: "/images/after-hours/scene-3.webp",
    mobile: "/images/after-hours/scene-3-mobile.webp",
    captionKey: "scene3",
  },
] as const;

type Variant = "pinned" | "stacked" | "static";

export default function AfterHoursScroll() {
  const [variant, setVariant] = useState<Variant | null>(null);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    setVariant(reducedMotion ? "static" : isDesktop ? "pinned" : "stacked");
  }, []);

  if (variant === null) return null;
  if (variant === "static") return <StaticFallback />;
  if (variant === "stacked") return <StackedScenes />;
  return <PinnedSequence />;
}

/* Reduced-motion fallback: single hero image with the three captions stacked. */
function StaticFallback() {
  const t = useTranslations("Home.AfterHours");
  return (
    <section className="bg-neutral-950 py-20 px-6" aria-label={t("title")}>
      <div className="max-w-4xl mx-auto">
        <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500 mb-8">
          {t("badge")}
        </span>
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <Image
            src={scenes[1].desktop}
            alt={t("scene2")}
            width={1376}
            height={768}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
        <div className="space-y-4">
          {scenes.map((scene) => (
            <p key={scene.id} className="text-lg md:text-xl text-white/90 border-l-2 border-orange-500 pl-4">
              {t(scene.captionKey)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Mobile: three stacked scene blocks with gentle in-view fades — sturdy on touch scroll. */
function StackedScenes() {
  const t = useTranslations("Home.AfterHours");
  return (
    <section className="bg-neutral-950 py-16 px-6" aria-label={t("title")}>
      <div className="max-w-xl mx-auto">
        <span className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500 mb-10">
          {t("badge")}
        </span>
        <div className="space-y-14">
          {scenes.map((scene) => (
            <figure key={scene.id}>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src={scene.mobile}
                  alt={t(scene.captionKey)}
                  width={768}
                  height={429}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-4 text-lg text-white/90 border-l-2 border-orange-500 pl-4">
                {t(scene.captionKey)}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Desktop: sticky viewport, GSAP-scrubbed crossfade + camera push through the three scenes. */
function PinnedSequence() {
  const t = useTranslations("Home.AfterHours");
  const rootRef = useRef<HTMLElement | null>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const captionRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useLayoutEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !rootRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      const [s1, s2, s3] = sceneRefs.current;
      const [c1, c2, c3] = captionRefs.current;
      if (!s1 || !s2 || !s3 || !c1 || !c2 || !c3) return;

      const ctx = gsap.context(() => {
        gsap.set(s2, { opacity: 0, scale: 1.25 });
        gsap.set(s3, { opacity: 0, scale: 1.15 });
        gsap.set([c2, c3], { opacity: 0, y: 28 });
        gsap.set(c1, { opacity: 1, y: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        // Scene 1: slow push toward the dark office window
        tl.to(s1, { scale: 1.18, duration: 3 }, 0)
          .to(c1, { opacity: 0, y: -28, duration: 0.6 }, 2.2)
          // fly "through the window": scene 1 gives way as scene 2 settles from close-up
          .to(s1, { opacity: 0, scale: 1.28, duration: 1 }, 2.7)
          .to(s2, { opacity: 1, duration: 1 }, 2.7)
          .to(s2, { scale: 1.05, duration: 3.2 }, 2.7)
          .to(c2, { opacity: 1, y: 0, duration: 0.7 }, 3.5)
          .to(c2, { opacity: 0, y: -28, duration: 0.6 }, 5.4)
          // morning payoff
          .to(s2, { opacity: 0, duration: 1 }, 5.9)
          .to(s3, { opacity: 1, duration: 1 }, 5.9)
          .to(s3, { scale: 1.0, duration: 3 }, 5.9)
          .to(c3, { opacity: 1, y: 0, duration: 0.7 }, 6.8);
      }, rootRef);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-neutral-950"
      style={{ height: "350vh" }}
      aria-label={t("title")}
    >
      <div className="sticky top-0 h-screen overflow-hidden" style={{ willChange: "transform" }}>
        {scenes.map((scene, i) => (
          <div
            key={scene.id}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className="absolute inset-0"
          >
            <Image
              src={scene.desktop}
              alt={t(scene.captionKey)}
              fill
              sizes="100vw"
              className="object-cover"
              loading="lazy"
              quality={85}
            />
            {/* darken the lower third so captions stay legible over warm highlights */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
        ))}

        <span className="absolute top-8 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full border border-orange-500/30 bg-black/50 backdrop-blur px-4 py-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
          {t("badge")}
        </span>

        {scenes.map((scene, i) => (
          <p
            key={scene.id}
            ref={(el) => {
              captionRefs.current[i] = el;
            }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6 text-center text-xl md:text-2xl lg:text-3xl font-medium text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
          >
            {t(scene.captionKey)}
          </p>
        ))}
      </div>
    </section>
  );
}
