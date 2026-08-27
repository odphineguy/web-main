"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ProjectImage } from "@/content/projects";
import { Reveal } from "@/components/ds/PageShell";

type GalleryLabels = {
  open: string;
  close: string;
  previous: string;
  next: string;
  dialogTitle: string;
  count: string;
};

export default function ProjectGallery({
  images,
  labels,
}: {
  images: ProjectImage[];
  labels: GalleryLabels;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const mobiles = images.filter((image) => image.mobile);
  const wides = images.filter((image) => !image.mobile);
  const activeImage = activeIndex === null ? null : images[activeIndex];
  const activeNumber = activeIndex ?? 0;
  const isOpen = activeIndex !== null;

  const openImage = (image: ProjectImage) => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setActiveIndex(images.indexOf(image));
  };

  const close = useCallback(() => setActiveIndex(null), []);
  const previous = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length,
    );
  }, [images.length]);
  const next = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % images.length,
    );
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft" && images.length > 1) previous();
      if (event.key === "ArrowRight" && images.length > 1) next();

      if (event.key === "Tab") {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])") ?? [],
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [close, images.length, isOpen, next, previous]);

  const thumbnail = (image: ProjectImage, index: number, mobile = false) => (
    <Reveal key={image.src} index={index}>
      <button
        type="button"
        onClick={() => openImage(image)}
        aria-label={`${labels.open}: ${image.alt}`}
        className={`group relative block overflow-hidden border border-[var(--ds-line)] bg-[var(--ds-raise)] text-left transition-colors hover:border-[var(--ds-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-accent)] focus-visible:ring-offset-4 ${
          mobile ? "w-40 sm:w-48" : "w-full"
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={mobile ? "12rem" : "(min-width: 768px) 44rem, 100vw"}
          className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.015]"
        />
        <span
          aria-hidden
          className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center bg-[var(--ds-ink)] text-[var(--ds-paper)] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <ZoomIn className="h-4 w-4" />
        </span>
      </button>
    </Reveal>
  );

  return (
    <>
      <div className="space-y-[var(--ds-space-lg)]">
        {wides.length > 0 && (
          <div className={wides.length > 1 ? "grid gap-[var(--ds-space-lg)] md:grid-cols-2" : ""}>
            {wides.map((image, index) => thumbnail(image, index))}
          </div>
        )}
        {mobiles.length > 0 && (
          <div className="flex flex-wrap items-start justify-center gap-[var(--ds-space-lg)]">
            {mobiles.map((image, index) => thumbnail(image, index, true))}
          </div>
        )}
      </div>

      {activeImage &&
        createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-gallery-title"
            className="fixed inset-0 z-[100] flex flex-col bg-[oklch(0.12_0.015_265_/_0.96)] p-4 text-[oklch(0.96_0.01_80)] sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) close();
            }}
          >
            <h2 id="project-gallery-title" className="sr-only">
              {labels.dialogTitle}
            </h2>
            <div className="flex items-center justify-between gap-4 pb-4">
              <p className="ds-meta text-current">
                {labels.count} {activeNumber + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="grid h-11 w-11 place-items-center border border-current transition-colors hover:bg-[oklch(0.96_0.01_80)] hover:text-[oklch(0.12_0.015_265)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-accent)]"
                aria-label={labels.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                width={activeImage.width}
                height={activeImage.height}
                sizes="96vw"
                priority
                className="h-auto max-h-full w-auto max-w-full object-contain"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={previous}
                    className="absolute left-0 grid h-12 w-12 place-items-center bg-[oklch(0.12_0.015_265_/_0.82)] transition-colors hover:bg-[var(--ds-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-accent)] sm:left-3"
                    aria-label={labels.previous}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-0 grid h-12 w-12 place-items-center bg-[oklch(0.12_0.015_265_/_0.82)] transition-colors hover:bg-[var(--ds-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-accent)] sm:right-3"
                    aria-label={labels.next}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
