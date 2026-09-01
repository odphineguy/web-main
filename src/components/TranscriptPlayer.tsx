"use client";

import Link from "next/link";
import { ChevronDown, Pause, PhoneCall, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import {
  callScenarios,
  defaultCallScenarioId,
  type CallScenarioId,
} from "./transcriptData";

function fmt(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

const waveform = [
  8, 17, 11, 22, 14, 19, 9, 16, 24, 12, 18, 10, 21, 15, 26, 13, 20, 9,
  17, 23, 12, 19, 8, 16, 22, 11, 18, 14, 25, 10, 17, 7,
];

const copy = {
  en: {
    library: "Real call library",
    proof: "Recorded AI call excerpts",
    callType: "Call type",
    unavailable: "clip coming soon",
    language: "Call language",
    languages: { en: "English", es: "Español" },
    play: "Play call recording",
    pause: "Pause call recording",
    seek: "Seek in call recording",
    agent: "AI agent",
    caller: "Caller",
    prompt: "Press play to hear this call excerpt",
    recording: "This is a recording.",
    invitation: "Want to hear how an agent would handle your calls?",
    cta: "Let’s Talk",
  },
  es: {
    library: "Biblioteca de llamadas reales",
    proof: "Extractos grabados de llamadas con IA",
    callType: "Tipo de llamada",
    unavailable: "audio próximamente",
    language: "Idioma de la llamada",
    languages: { en: "English", es: "Español" },
    play: "Reproducir llamada grabada",
    pause: "Pausar llamada grabada",
    seek: "Buscar en la llamada grabada",
    agent: "Agente con IA",
    caller: "Cliente",
    prompt: "Presiona reproducir para escuchar este extracto",
    recording: "Esta es una grabación.",
    invitation: "¿Quieres escuchar cómo un agente atendería tus llamadas?",
    cta: "Hablemos",
  },
} as const;

export default function TranscriptPlayer({ onFirstPlay }: { onFirstPlay?: () => void }) {
  const locale = useLocale() === "es" ? "es" : "en";
  const text = copy[locale];
  const [scenarioId, setScenarioId] = useState<CallScenarioId>(defaultCallScenarioId);
  const [clipLang, setClipLang] = useState<"en" | "es">(locale);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);

  const fallbackScenario = callScenarios.find((scenario) => scenario.id === defaultCallScenarioId)!;
  const activeScenario = callScenarios.find((scenario) => scenario.id === scenarioId) ?? fallbackScenario;
  const clip = activeScenario.clips?.[clipLang] ?? fallbackScenario.clips![clipLang]!;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setTime(audio.currentTime);
    const onEnd = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    const transcript = scrollRef.current;
    if (!transcript) return;
    if (!playing && time === 0) {
      transcript.scrollTo({ top: 0 });
      return;
    }
    transcript.scrollTo({ top: transcript.scrollHeight, behavior: "smooth" });
  }, [playing, time]);

  const resetAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying(false);
    setTime(0);
  };

  const switchScenario = (nextId: CallScenarioId) => {
    if (nextId === scenarioId) return;
    const nextScenario = callScenarios.find((scenario) => scenario.id === nextId);
    if (!nextScenario?.available) return;
    const nextLanguage = nextScenario.clips?.[clipLang]
      ? clipLang
      : nextScenario.clips?.en
        ? "en"
        : "es";
    resetAudio();
    setScenarioId(nextId);
    setClipLang(nextLanguage);
  };

  const switchLanguage = (language: "en" | "es") => {
    if (language === clipLang || !activeScenario.clips?.[language]) return;
    resetAudio();
    setClipLang(language);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    if (!firedRef.current) {
      firedRef.current = true;
      onFirstPlay?.();
    }
    void audio.play();
    setPlaying(true);
  };

  const seek = (event: React.MouseEvent<HTMLButtonElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    audio.currentTime = fraction * clip.duration;
    setTime(audio.currentTime);
  };

  const started = playing || time > 0;
  const visible = started ? clip.transcript.filter((message) => message.t <= time) : clip.transcript.slice(0, 3);
  const activeIndex = started ? visible.length - 1 : -1;
  const progress = Math.min(1, time / clip.duration);

  return (
    <div className="overflow-hidden rounded-none border border-[oklch(0.78_0.02_70)] bg-[oklch(0.965_0.012_78)] text-left text-[oklch(0.22_0.015_70)] shadow-[0_28px_80px_oklch(0.08_0.015_265_/_0.38)]">
      <audio ref={audioRef} src={clip.src} preload="metadata" />

      <header className="grid gap-4 border-b border-[oklch(0.85_0.018_72)] px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[oklch(0.64_0.2_42)] text-[oklch(0.98_0.01_75)] shadow-[0_8px_20px_oklch(0.64_0.2_42_/_0.24)]">
            <PhoneCall className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="text-[0.95rem] font-semibold leading-tight">{text.library}</h3>
            <p className="mt-1 text-xs text-[oklch(0.5_0.018_70)]">{text.proof}</p>
          </div>
        </div>

        <label className="relative block min-w-44">
          <span className="sr-only">{text.callType}</span>
          <select
            value={scenarioId}
            onChange={(event) => switchScenario(event.target.value as CallScenarioId)}
            className="h-11 w-full appearance-none rounded-none border border-[oklch(0.78_0.02_70)] bg-[oklch(0.99_0.006_78)] py-2 pl-4 pr-10 text-sm font-semibold outline-none transition-colors hover:border-[oklch(0.64_0.2_42)] focus-visible:ring-2 focus-visible:ring-[oklch(0.64_0.2_42)]"
          >
            {callScenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id} disabled={!scenario.available}>
                {scenario.label[locale]}
                {!scenario.available ? ` · ${text.unavailable}` : ""}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden="true" />
        </label>
      </header>

      <div className="border-b border-[oklch(0.88_0.014_72)] bg-[oklch(0.99_0.006_78)] px-5 py-4">
        <p className="text-sm font-medium">{clip.caption?.[locale] ?? activeScenario.caption[locale]}</p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <div className="flex rounded-none border border-[oklch(0.84_0.018_72)] bg-[oklch(0.95_0.012_75)] p-1" role="group" aria-label={text.language}>
            {(["en", "es"] as const).map((language) => {
              const languageAvailable = Boolean(activeScenario.clips?.[language]);
              return (
                <button
                  key={language}
                  type="button"
                  onClick={() => switchLanguage(language)}
                  aria-pressed={clipLang === language}
                  disabled={!languageAvailable}
                  className={`rounded-[var(--radius-action)] px-3 py-1.5 text-[0.7rem] font-semibold transition-colors ${
                    clipLang === language
                      ? "bg-[oklch(0.64_0.2_42)] text-[oklch(0.98_0.01_75)]"
                      : languageAvailable
                        ? "text-[oklch(0.48_0.018_70)] hover:text-[oklch(0.24_0.015_70)]"
                        : "cursor-not-allowed text-[oklch(0.68_0.012_70)]"
                  }`}
                >
                  {text.languages[language]}
                </button>
              );
            })}
          </div>
          <span className="font-mono text-[0.68rem] tabular-nums text-[oklch(0.5_0.018_70)]">
            {fmt(time)} / {fmt(clip.duration)}
          </span>
        </div>
      </div>

      <div ref={scrollRef} className="flex h-80 flex-col gap-4 overflow-y-auto bg-[oklch(0.985_0.006_78)] px-5 py-5 scroll-smooth">
        {visible.map((message, index) =>
          message.role === "note" ? (
            <div key={index} className="self-center border-y border-[oklch(0.82_0.045_52)] px-3 py-2 text-center text-xs italic text-[oklch(0.4_0.04_48)]">
              {message.text}
            </div>
          ) : (
            <div
              key={index}
              className={`max-w-[86%] animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                message.role === "agent" ? "self-start" : "self-end"
              }`}
            >
              <div
                className={`px-4 py-3 text-sm leading-relaxed transition-shadow ${
                  message.role === "agent"
                    ? "rounded-none border border-[oklch(0.8_0.018_72)] bg-[oklch(0.925_0.018_72)] text-[oklch(0.23_0.015_70)]"
                    : "rounded-none bg-[oklch(0.64_0.2_42)] text-[oklch(0.985_0.006_78)]"
                } ${playing && index === activeIndex ? "shadow-[0_0_0_2px_oklch(0.7_0.16_45_/_0.42)]" : ""}`}
              >
                {message.emotion && (
                  <span className="mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.12em] opacity-65">
                    ({message.emotion[locale]})
                  </span>
                )}
                {message.text}
              </div>
              <div className={`mt-1.5 font-mono text-[0.62rem] tabular-nums text-[oklch(0.52_0.018_70)] ${message.role === "caller" ? "text-right" : ""}`}>
                {message.role === "agent" ? text.agent : text.caller} · {fmt(message.t)}
              </div>
            </div>
          ),
        )}
        {!started && <p className="pt-1 text-center text-xs text-[oklch(0.52_0.018_70)]">{text.prompt}</p>}
      </div>

      <div className="border-t border-[oklch(0.86_0.016_72)] bg-[oklch(0.955_0.014_75)] px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? text.pause : text.play}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[oklch(0.64_0.2_42)] text-[oklch(0.985_0.006_78)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.64_0.2_42)] focus-visible:ring-offset-2 active:scale-95"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
          </button>
          <button type="button" className="flex h-10 flex-1 items-center gap-[3px] py-1" onClick={seek} aria-label={text.seek}>
            {waveform.map((height, index) => (
              <span
                key={index}
                className="min-w-0 flex-1 rounded-full transition-colors"
                style={{
                  height,
                  background: index / waveform.length <= progress ? "oklch(0.64 0.2 42)" : "oklch(0.83 0.018 72)",
                }}
              />
            ))}
          </button>
        </div>
      </div>

      <footer className="flex flex-col gap-3 border-t border-[oklch(0.84_0.018_72)] bg-[oklch(0.985_0.006_78)] py-4 pl-5 pr-20 sm:flex-row sm:items-center sm:justify-between sm:pr-5">
        <div>
          <p className="text-xs font-semibold">{text.recording}</p>
          <p className="mt-1 text-xs text-[oklch(0.5_0.018_70)]">{text.invitation}</p>
        </div>
        <Link href={`/${locale}/contact`} className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-[var(--radius-action)] bg-[oklch(0.22_0.015_70)] px-5 text-xs font-semibold text-[oklch(0.985_0.006_78)] transition-colors hover:bg-[oklch(0.64_0.2_42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.64_0.2_42)] focus-visible:ring-offset-2">
          {text.cta}
        </Link>
      </footer>
    </div>
  );
}
