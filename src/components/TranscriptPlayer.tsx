"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { transcript, CALL_DURATION } from "./transcriptData";

function fmt(s: number) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export default function TranscriptPlayer({ onFirstPlay }: { onFirstPlay?: () => void }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const firedRef = useRef(false);

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

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = (e.clientX - rect.left) / rect.width;
    a.currentTime = frac * CALL_DURATION;
    setTime(a.currentTime);
  };

  const started = playing || time > 0;
  const visible = started ? transcript.filter((m) => m.t <= time) : transcript.slice(0, 3);

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 text-left">
      <audio ref={audioRef} src="/audio/elena-demo-call.mp3" preload="none" />

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
        <p className="text-sm font-medium text-neutral-200">
          Conversation with <span className="text-white">Hermes PI Intake — Elena</span>
        </p>
        <span className="rounded-full border border-neutral-700 bg-neutral-900 px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-400">
          Telephony
        </span>
      </div>

      {/* Transcript */}
      <div ref={scrollRef} className="h-80 space-y-5 overflow-y-auto px-4 py-4 scroll-smooth">
        {visible.map((m, i) =>
          m.role === "note" ? (
            <div key={i} className="mx-2 rounded-lg border border-orange-500/25 bg-orange-500/5 px-3 py-2">
              <p className="text-xs italic leading-relaxed text-orange-300/90">{m.text}</p>
            </div>
          ) : (
          <div key={i} className="flex gap-3">
            <div
              className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                m.role === "agent"
                  ? "bg-gradient-to-br from-orange-500 to-amber-500 text-white"
                  : "bg-white text-neutral-900 border border-neutral-300"
              }`}
            >
              {m.role === "agent" ? "E" : "U"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-neutral-500">
                {m.role === "agent" ? "Hermes PI Intake — Elena" : "Caller"}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-100">{m.text}</p>
              <p className="mt-1 text-[11px] tabular-nums text-neutral-600">{fmt(m.t)}</p>
            </div>
          </div>
          )
        )}
        {!started && (
          <p className="pt-2 text-center text-xs text-neutral-500">
            Press play to hear the full call
          </p>
        )}
      </div>

      {/* Player bar */}
      <div className="flex items-center gap-3 border-t border-neutral-800 bg-neutral-900/60 px-4 py-3">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause call recording" : "Play call recording"}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-neutral-950 transition-transform hover:scale-105"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
        </button>
        <div className="flex-1 cursor-pointer py-2" onClick={seek}>
          <div className="h-1.5 overflow-hidden rounded-full bg-neutral-800">
            <div
              className="h-full bg-white transition-[width] duration-300"
              style={{ width: `${Math.min(100, (time / CALL_DURATION) * 100)}%` }}
            />
          </div>
        </div>
        <span className="flex-shrink-0 text-xs tabular-nums text-neutral-400">
          {fmt(time)} / {fmt(CALL_DURATION)}
        </span>
      </div>
    </div>
  );
}
