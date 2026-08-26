"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type RailItem = { id: string; label: string };

/**
 * The frame every page sits in: a sticky left rail plus a max-width content
 * column. Applying `.ds` here is what switches a page onto the design system,
 * so migration is one wrapper per page and un-migrated pages are untouched.
 */
export default function PageShell({
  children,
  railCap,
  railItems = [],
  className,
}: {
  children: React.ReactNode;
  /** Vertical caption on the rail, e.g. "LEAD -> JOB". Omit for no caption. */
  railCap?: string;
  /** Section anchors rendered as 01, 02, 03... in the rail. */
  railItems?: RailItem[];
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!railItems.length) return;
    const targets = railItems
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // The entry nearest the top of the viewport wins, so the rail tracks
        // reading position rather than whichever section fired last.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [railItems]);

  return (
    <div className={cn("ds bg-background", className)}>
      <div className="mx-auto grid max-w-[var(--ds-max-w)] grid-cols-1 md:grid-cols-[var(--ds-rail-w)_minmax(0,1fr)]">
        {/* Rail is decorative navigation; hidden on mobile where it would crowd. */}
        <aside className="sticky top-0 hidden h-dvh flex-col items-center justify-center gap-2.5 border-r border-[var(--ds-line-soft)] md:flex">
          {railCap && (
            <span
              className="ds-meta mb-[18px]"
              style={{ writingMode: "vertical-rl" }}
            >
              {railCap}
            </span>
          )}
          {railItems.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-label={item.label}
              className={cn(
                "ds-meta grid h-8 w-8 place-items-center rounded-full transition-colors",
                active === item.id
                  ? "bg-[var(--ds-accent)] font-semibold text-white"
                  : "hover:text-[var(--ds-ink)]",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </a>
          ))}
        </aside>

        <main className="min-w-0 px-5 sm:px-8 lg:px-14">{children}</main>
      </div>
    </div>
  );
}

/**
 * Wraps children in the staggered entrance reveal once they scroll into view.
 * Kept here so no page hand-rolls its own animation timing.
 */
export function Reveal({
  children,
  index = 0,
  className,
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("ds-reveal", shown && "ds-in", className)}
      style={{ ["--i" as string]: index }}
    >
      {children}
    </div>
  );
}
