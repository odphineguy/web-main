"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { calls } from "./transcriptData";

function fmt(s: number) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

const CLIP_LABELS = { en: "English call", es: "Llamada en español" } as const;

export default function TranscriptPlayer({ onFirstPlay }: { onFirstPlay?: () => void }) {
  const t = useTranslations("Home.Hero");
  const locale = useLocale();
  const [clipLang, setClipLang] = useState<"en" | "es">(locale === "es" ? "es" : "en");
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [mounted, setMounted] = useState(false);
  const firedRef = useRef(false);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Match ChatDemoWindow: neutral surface during SSR to avoid a hydration mismatch
  const themeClass = mounted ? (isDark ? "chat-demo-charcoal" : "chat-demo-cream") : "chat-demo-cream";

  const clip = calls[clipLang];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [time]);

  const switchClip = (lang: "en" | "es") => {
    if (lang === clipLang) return;
    const a = audioRef.current;
    if (a) a.pause();
    setPlaying(false);
    setTime(0);
    setClipLang(lang);
    if (a) {
      a.src = calls[lang].src;
      a.load();
    }
  };

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      if (!firedRef.current) {
        firedRef.current = true;
        onFirstPlay?.();
      }
      a.play();
      setPlaying(true);
    }
  };

  const seek = (e: React.MouseEvent<HTMLButtonElement>) => {
    const a = audioRef.current;
    if (!a) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = (e.clientX - rect.left) / rect.width;
    a.currentTime = frac * clip.duration;
    setTime(a.currentTime);
  };

  const started = playing || time > 0;
  const visible = started ? clip.transcript.filter((m) => m.t <= time) : clip.transcript.slice(0, 3);
  const activeIdx = started ? visible.length - 1 : -1;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl backdrop-blur-[14px] text-left ${themeClass}`}
      style={{
        background: "var(--chat-surface)",
        border: "1px solid var(--chat-border)",
        boxShadow: "var(--chat-shadow)",
      }}
    >
      <audio ref={audioRef} src={clip.src} preload="none" />

      {/* Dot pattern overlay — light mode */}
      {mounted && !isDark && (
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: "radial-gradient(circle at 12px 12px, rgba(23,23,23,0.04) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            opacity: 0.25,
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.70), rgba(0,0,0,0.10))",
            WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.70), rgba(0,0,0,0.10))",
          }}
        />
      )}

      {/* Aurora overlay — dark mode */}
      {mounted && isDark && (
        <div
          className="animate-aurora pointer-events-none absolute inset-[-40px] z-0"
          style={{
            background: `
              radial-gradient(500px 240px at 20% 10%, rgba(227,79,11,0.30), transparent 60%),
              radial-gradient(520px 260px at 85% 20%, rgba(227,79,11,0.25), transparent 62%),
              radial-gradient(540px 260px at 55% 110%, rgba(227,79,11,0.18), transparent 65%)
            `,
            filter: "blur(18px)",
            opacity: 0.9,
          }}
        />
      )}

      {/* Header */}
      <div
        className="relative z-10 flex items-center gap-3 border-b bg-transparent px-4 py-3"
        style={{ borderColor: "var(--chat-header-border)" }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl"
          style={{
            background: "#E34F0B",
            boxShadow: isDark
              ? "0 0 0 1px rgba(115,115,115,0.16), 0 16px 40px rgba(0,0,0,0.42)"
              : "0 14px 30px rgba(227,79,11,0.28)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/favicon.ico" alt="" className="h-6 w-6 object-contain" />
        </div>
        <div className="min-w-0 flex-1 text-center">
          <h3
            className="text-sm font-semibold leading-snug"
            style={{
              fontFamily: "var(--font-spectral), Georgia, serif",
              fontStyle: "italic",
              color: "var(--chat-text)",
            }}
          >
            {t("widgetLabel")}
          </h3>
          <span className="text-xs" style={{ color: "var(--chat-muted)" }}>
            {t("widgetCaption")}
          </span>
        </div>
        {/* Spacer balances the avatar so the title stays optically centered */}
        <div className="h-10 w-10 flex-shrink-0" aria-hidden="true" />
      </div>

      {/* Clip language toggle — its own row so the title above can breathe */}
      <div
        className="relative z-10 flex justify-center border-b bg-transparent px-4 py-2"
        style={{ borderColor: "var(--chat-header-border)" }}
      >
        <div
          className="flex rounded-full p-0.5"
          style={{ background: "var(--chat-input-bg)", border: "1px solid var(--chat-border)" }}
          role="group"
          aria-label="Call language"
        >
          {(["en", "es"] as const).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => switchClip(lang)}
              aria-pressed={clipLang === lang}
              className="rounded-full px-3 py-1 text-[11px] font-medium transition-colors"
              style={
                clipLang === lang
                  ? { background: "var(--chat-user-bubble)", color: "var(--chat-user-text)" }
                  : { color: "var(--chat-muted)" }
              }
            >
              {CLIP_LABELS[lang]}
            </button>
          ))}
        </div>
      </div>

      {/* Transcript — AI left, caller right, matching the demo bubbles */}
      <div
        ref={scrollRef}
        className="relative z-10 flex h-80 flex-col gap-3 overflow-y-auto bg-transparent px-4 py-3 scroll-smooth"
      >
        {visible.map((m, i) =>
          m.role === "note" ? (
            <div
              key={i}
              className="self-center rounded-xl px-3 py-2 text-center"
              style={{
                background: "rgba(227,79,11,0.10)",
                border: "1px solid rgba(227,79,11,0.28)",
              }}
            >
              <p className="text-xs italic leading-relaxed" style={{ color: "var(--chat-text)" }}>
                {m.text}
              </p>
            </div>
          ) : (
            <div
              key={i}
              className={`max-w-[85%] duration-300 animate-in fade-in slide-in-from-bottom-2 ${
                m.role === "agent" ? "self-start" : "self-end"
              }`}
            >
              <div
                className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed transition-shadow ${
                  m.role === "agent" ? "rounded-bl-sm" : "rounded-br-sm"
                }`}
                style={
                  m.role === "agent"
                    ? {
                        background: "var(--chat-bot-bubble)",
                        border: "1px solid var(--chat-bot-border)",
                        color: "var(--chat-text)",
                        boxShadow: playing && i === activeIdx ? "0 0 0 2px rgba(227,79,11,0.45)" : "none",
                      }
                    : {
                        background: "var(--chat-user-bubble)",
                        color: "var(--chat-user-text)",
                        boxShadow: playing && i === activeIdx ? "0 0 0 2px rgba(227,79,11,0.45)" : "none",
                      }
                }
              >
                {m.text}
              </div>
              <div
                className={`mt-1 font-mono text-[10px] tabular-nums ${m.role === "agent" ? "" : "text-right"}`}
                style={{ color: "var(--chat-muted)" }}
              >
                {m.role === "agent" ? "AI agent" : "Caller"} · {fmt(m.t)}
              </div>
            </div>
          )
        )}
        {!started && (
          <p className="pt-2 text-center text-xs" style={{ color: "var(--chat-muted)" }}>
            Press play to hear the full call
          </p>
        )}
      </div>

      {/* Player bar — sits where the demo cards put their input row */}
      <div className="relative z-10 bg-transparent px-4 py-3">
        <div
          className="flex items-center gap-3 rounded-2xl p-2"
          style={{ background: "var(--chat-input-bg)", border: "1px solid var(--chat-border)" }}
        >
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? "Pause call recording" : "Play call recording"}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 active:scale-95"
            style={{ background: "var(--chat-user-bubble)", color: "var(--chat-user-text)" }}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
          </button>
          <button type="button" className="flex-1 cursor-pointer py-2" onClick={seek} aria-label="Seek in call recording">
            <div className="h-1.5 overflow-hidden rounded-full" style={{ background: "var(--chat-bot-bubble)" }}>
              <div
                className="h-full bg-orange-500 transition-[width] duration-300"
                style={{ width: `${Math.min(100, (time / clip.duration) * 100)}%` }}
              />
            </div>
          </button>
          <span
            className="flex-shrink-0 font-mono text-[11px] tabular-nums"
            style={{ color: "var(--chat-muted)" }}
          >
            {fmt(time)} / {fmt(clip.duration)}
          </span>
        </div>
      </div>

      {/* Powered by footer — matches the industry demo cards */}
      <div
        className="relative z-10 border-t bg-transparent px-4 py-2 text-center"
        style={{ borderColor: "var(--chat-footer-border)" }}
      >
        <span className="text-[10px]" style={{ color: "var(--chat-muted)" }}>
          Powered by{" "}
          <span className="font-semibold">
            <span className="text-[rgb(227,79,11)]">abe</span>
            <span style={{ color: "var(--chat-muted)" }}>media</span>
          </span>
        </span>
      </div>
    </div>
  );
}
