"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEventHandler } from "react";
import { preload } from "react-dom";
import AuditCta from "@/components/AuditCta";

type VideoHeroProps = {
  locale: string;
  title: string;
  accent: string;
  subtitle: string;
  primaryLabel: string;
  secondaryLabel: string;
  primaryHref?: string;
  onPrimaryClick?: MouseEventHandler<HTMLAnchorElement>;
};

type NavigatorWithSaveData = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

type WindowWithIdleCallback = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const POSTER_SRC = "/video/abe-media-hero-poster.webp";
const POSTER_SRCSET =
  "/video/abe-media-hero-poster-828.webp 828w, /video/abe-media-hero-poster.webp 1280w";

export default function VideoHero({
  locale,
  title,
  accent,
  subtitle,
  primaryLabel,
  secondaryLabel,
  primaryHref,
  onPrimaryClick,
}: VideoHeroProps) {
  // The poster is the LCP element on mobile. A <video poster> cannot be
  // responsive, so the poster is a real <img> with a srcset behind the video
  // (phones get the 828px file), preloaded so it beats fonts and scripts.
  preload(POSTER_SRC, {
    as: "image",
    fetchPriority: "high",
    imageSrcSet: POSTER_SRCSET,
    imageSizes: "100vw",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as NavigatorWithSaveData).connection?.saveData === true;
    const idleWindow = window as WindowWithIdleCallback;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const cancelScheduledLoad = () => {
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
      if (timeoutHandle !== undefined) window.clearTimeout(timeoutHandle);
      idleHandle = undefined;
      timeoutHandle = undefined;
    };

    const updatePlaybackPreference = () => {
      cancelScheduledLoad();

      if (reducedMotion.matches || saveData) {
        setShouldLoadVideo(false);
        return;
      }

      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(
          () => setShouldLoadVideo(true),
          { timeout: 1200 },
        );
      } else {
        timeoutHandle = window.setTimeout(() => setShouldLoadVideo(true), 1);
      }
    };

    updatePlaybackPreference();
    reducedMotion.addEventListener("change", updatePlaybackPreference);

    return () => {
      cancelScheduledLoad();
      reducedMotion.removeEventListener("change", updatePlaybackPreference);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.load();
    if (shouldLoadVideo) void video.play().catch(() => undefined);
  }, [shouldLoadVideo]);

  return (
    <section className="home-video-hero" data-home-hero>
      {/* eslint-disable-next-line @next/next/no-img-element -- static poster, already sized; next/image would add a hop */}
      <img
        className="home-video-hero__media"
        src={POSTER_SRC}
        srcSet={POSTER_SRCSET}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
      />
      <video
        ref={videoRef}
        className="home-video-hero__media home-video-hero__video"
        data-playing={isPlaying ? "true" : undefined}
        onPlaying={() => setIsPlaying(true)}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        aria-hidden="true"
      >
        {shouldLoadVideo ? (
          <source src="/video/abe-media-hero.mp4" type="video/mp4" />
        ) : null}
      </video>
      <div className="home-video-hero__wash" aria-hidden="true" />

      <div className="home-video-hero__top">
        <Link href={`/${locale}`} aria-label="Abe Media home" className="home-video-hero__brand">
          <Image
            src="/images/home/abemedia-new-darkmode.png"
            alt="Abe Media"
            width={2172}
            height={724}
            sizes="(max-width: 970px) 136px, 192px"
            priority
          />
        </Link>
        <Link href={primaryHref || `/${locale}/contact`} className="home-video-hero__project-link" onClick={onPrimaryClick}>
          <span aria-hidden="true" />
          {primaryLabel}
          <b aria-hidden="true">↗</b>
        </Link>
      </div>

      <div className="home-video-hero__content">
        <h1 className="home-video-hero__title">
          {title} <em>{accent}</em>
        </h1>
        <p className="home-video-hero__subtitle">{subtitle}</p>
        <div className="home-video-hero__actions">
          {primaryHref ? (
            <AuditCta locale={locale} label={primaryLabel} onClick={onPrimaryClick} />
          ) : (
            <Link href={`/${locale}/contact`} className="audit-cta" onClick={onPrimaryClick}>
              <span aria-hidden="true" />{primaryLabel}<b aria-hidden="true">↗</b>
            </Link>
          )}
          <a href="#visual-estimate" className="home-video-hero__secondary">
            {secondaryLabel} <b aria-hidden="true">↓</b>
          </a>
        </div>
      </div>

      <span className="home-video-hero__scroll" aria-hidden="true">Scroll</span>
      <span className="home-video-hero__sentinel" data-home-hero-end aria-hidden="true" />
    </section>
  );
}
