"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The card in the design system's language: squared corners, hairline border,
 * mono index label, accent on hover. Deliberately not the shadcn <Card>, which
 * carries rounded/shadow styling from the old look.
 */
export default function DsCard({
  index,
  eyebrow,
  title,
  description,
  points,
  href,
  media,
  cta,
  className,
}: {
  /** Renders as 01, 02, ... in the corner. Omit to hide. */
  index?: number;
  /** Mono accent label above the title, for cards that carry a category. */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  points?: string[];
  href?: string;
  media?: React.ReactNode;
  cta?: string;
  className?: string;
}) {
  const body = (
    <article
      className={cn(
        "group relative flex h-full flex-col border border-[var(--ds-line)] bg-[var(--ds-raise)] p-6 transition-colors",
        href && "hover:border-[var(--ds-accent)]",
        className,
      )}
    >
      {media && <div className="mb-5 overflow-hidden">{media}</div>}

      {typeof index === "number" && (
        <span className="ds-meta mb-3 block">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      {eyebrow && (
        <span className="ds-meta mb-2 block text-[var(--ds-accent)]">
          {eyebrow}
        </span>
      )}

      <h3>{title}</h3>

      {description && (
        <p className="mt-3 text-[0.95rem] text-[var(--ds-ink-mute)]">
          {description}
        </p>
      )}

      {points && points.length > 0 && (
        <ul className="mt-5 space-y-2">
          {points.map((p) => (
            <li
              key={p}
              className="flex gap-3 text-[0.9rem] text-[var(--ds-ink-mute)]"
            >
              <span aria-hidden className="text-[var(--ds-accent)]">
                /
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}

      {cta && href && (
        <span className="ds-meta mt-auto pt-6 text-[var(--ds-accent)]">
          {cta}
        </span>
      )}
    </article>
  );

  if (!href) return body;
  return (
    <Link href={href} className="block h-full">
      {body}
    </Link>
  );
}
