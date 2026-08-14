"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./PageShell";

/**
 * Standard section rhythm. Vertical spacing and header treatment live here so
 * pages cannot invent their own; a page supplies an id, a heading and content.
 */
export default function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  bleed,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  children: React.ReactNode;
  /** Full-bleed band that breaks the content column, for contrast strips. */
  bleed?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-16 py-[var(--ds-space-2xl)]",
        bleed && "border-y border-[var(--ds-line-soft)]",
        className,
      )}
    >
      {(eyebrow || title || lede) && (
        <header className="mb-[var(--ds-space-xl)]">
          {eyebrow && (
            <Reveal index={0}>
              <p className="ds-eyebrow mb-[var(--ds-space-md)]">{eyebrow}</p>
            </Reveal>
          )}
          {title && (
            <Reveal index={1}>
              <h2>{title}</h2>
            </Reveal>
          )}
          {lede && (
            <Reveal index={2}>
              <p className="ds-lede mt-[var(--ds-space-lg)]">{lede}</p>
            </Reveal>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
