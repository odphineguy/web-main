"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type BeforeAfterPair = {
  /** Stable key, also used as the tab's accessible id. */
  id: string;
  /** Tab label. Already translated by the caller. */
  label: string;
  beforeSrc: string;
  afterSrc: string;
  /** Alt text for each half. Already translated by the caller. */
  beforeAlt: string;
  afterAlt: string;
};

type Props = {
  pairs: BeforeAfterPair[];
  beforeLabel: string;
  afterLabel: string;
  /** Accessible name for the tab strip. Only used when there is more than one pair. */
  tabsLabel?: string;
  /**
   * Aspect utilities for the frame. Defaults to a taller crop on phones: the
   * sources are 16:9, which at a 327px phone width leaves a 184px-tall strip
   * that is too short to read. object-cover trades the sides for height there.
   */
  frameAspectClassName?: string;
  className?: string;
};

/**
 * Drag-to-compare before/after viewer with an optional tab strip.
 *
 * The "after" image is the base layer and the "before" image is clipped to the
 * left of the handle, so the AI render (the thing worth looking at) is what
 * fills in as the visitor drags right.
 *
 * Position is held in component state rather than driven straight off pointer
 * events into the DOM because the same value drives the handle, the clip, and
 * the range input that makes this operable from a keyboard.
 */
export default function BeforeAfterSlider({
  pairs,
  beforeLabel,
  afterLabel,
  tabsLabel,
  frameAspectClassName = "aspect-[4/3] sm:aspect-[1672/941]",
  className,
}: Props) {
  const [activeId, setActiveId] = useState(pairs[0]?.id);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const active = pairs.find((p) => p.id === activeId) ?? pairs[0];

  const setFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    if (rect.width === 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  // Bound to the window rather than the frame so a drag that leaves the image
  // keeps tracking, and so releasing outside it still ends the drag.
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => setFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, setFromClientX]);

  if (!active) return null;

  return (
    <div className={className}>
      <div
        ref={frameRef}
        className={`before-after__frame relative w-full ${frameAspectClassName} select-none overflow-hidden rounded-2xl border border-border bg-band focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 focus-within:ring-offset-background ${
          dragging ? "cursor-grabbing" : "cursor-ew-resize"
        }`}
        onPointerDown={(e) => {
          setDragging(true);
          setFromClientX(e.clientX);
        }}
      >
        {/* Base layer: the finished render. */}
        <Image
          src={active.afterSrc}
          alt={active.afterAlt}
          fill
          sizes="(max-width: 768px) 100vw, 1100px"
          className="object-cover"
          priority
          draggable={false}
        />

        {/* Clipped layer: the original photo, revealed left of the handle. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden="true"
        >
          <Image
            src={active.beforeSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1100px"
            className="object-cover"
            priority
            draggable={false}
          />
        </div>

        {/* The before image is aria-hidden above so a screen reader gets one
            description of each state instead of a half-image it cannot drag. */}
        <span className="sr-only">{active.beforeAlt}</span>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {afterLabel}
        </span>

        {/* Divider + grab handle. */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.55)]"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/55 backdrop-blur">
            <span aria-hidden="true" className="text-sm leading-none text-white">
              ←&#8202;→
            </span>
          </div>
        </div>

        {/* Keyboard and assistive-tech control, laid over the frame so arrow keys
            move the same position the pointer does. pointer-events-none is
            deliberate: a full-width native range would fight the drag handler
            above (its thumb tracks its own geometry, not ours). Removing pointer
            events does not remove it from the tab order, so keyboard use is
            unaffected — focus is shown by the frame's focus-within ring. */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(position)}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`${beforeLabel} / ${afterLabel}`}
          className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
        />
      </div>

      {pairs.length > 1 && (
        <div role="group" aria-label={tabsLabel} className="before-after__tabs mt-5 flex flex-wrap justify-center gap-2">
          {pairs.map((pair) => {
            const selected = pair.id === active.id;
            return (
              <button
                key={pair.id}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setActiveId(pair.id);
                  setPosition(50);
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  selected
                    ? "bg-orange-500 text-white"
                    : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {pair.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
