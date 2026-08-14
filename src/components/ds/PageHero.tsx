"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./PageShell";

/**
 * The one hero on the site. Every page fills these slots and none of them
 * controls type size, alignment or spacing — that is what stops four pages
 * from becoming four designs.
 */
export default function PageHero({
  eyebrow,
  title,
  lede,
  meta,
  actions,
  media,
  className,
}: {
  /** Mono uppercase label above the title, e.g. "SERVICES". */
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Top-right slot: a clock, a breadcrumb, a status chip. */
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  /** Right-hand visual. When present the hero becomes a two-column grid. */
  media?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative pb-[var(--ds-space-xl)] pt-[clamp(56px,9vh,110px)]",
        className,
      )}
    >
      {meta && (
        <div className="mb-[var(--ds-space-lg)] flex flex-wrap items-start justify-between gap-[var(--ds-space-lg)]">
          <div />
          <div className="text-right">{meta}</div>
        </div>
      )}

      <div
        className={cn(
          "grid items-center gap-[var(--ds-space-xl)]",
          media ? "lg:grid-cols-2" : "grid-cols-1",
        )}
      >
        <div>
          {eyebrow && (
            <Reveal index={0}>
              <p className="ds-eyebrow mb-[var(--ds-space-md)]">{eyebrow}</p>
            </Reveal>
          )}
          <Reveal index={1}>
            <h1>{title}</h1>
          </Reveal>
          {lede && (
            <Reveal index={2}>
              <p className="ds-lede mt-[var(--ds-space-lg)]">{lede}</p>
            </Reveal>
          )}
          {actions && (
            <Reveal index={3}>
              <div className="mt-[var(--ds-space-lg)] flex flex-wrap gap-3">
                {actions}
              </div>
            </Reveal>
          )}
        </div>

        {media && (
          <Reveal index={2} className="min-w-0">
            {media}
          </Reveal>
        )}
      </div>
    </section>
  );
}
