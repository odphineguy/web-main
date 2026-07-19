"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { transcript, CALL_DURATION } from "./transcriptData";

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

  // Auto-scroll to the latest visible message
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

  const visible = playing || time > 0 ? transcript.filter((m) => m.t <= time) : transcript.slice(0, 2);
  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="space-y-4">
      <audio ref={audioRef} src="/audio/elena-demo-call.mp3" preload="none" />

      <div
        ref={scrollRef}
        className="h-64 overflow-y-auto rounded-xl bg-white dark:bg-neutral-950 border border-border p-4 space-y-3 scroll-smooth"
      >
        {visible.map((m, i) => (
          <div key={i} className={`flex ${m.role === "caller" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                m.role === "caller"
                  ? "bg-orange-500/10 text-foreground rounded-br-sm"
                  : "bg-gray-100 dark:bg-neutral-900 text-foreground rounded-bl-sm"
              }`}
            >
              {m.role === "agent" && (
                <span className="block text-[10px] font-semibold uppercase tracking-wide text-orange-500 mb-0.5">
                  Elena
                </span>
              )}
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          aria-label={playing ? "Pause call recording" : "Play call recording"}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </button>
        <div className="flex-1">
          <div className="h-1.5 rounded-full bg-gray-200 dark:bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-[width] duration-500"
              style={{ width: `${Math.min(100, (time / CALL_DURATION) * 100)}%` }}
            />
          </div>
        </div>
        <span className="text-xs tabular-nums text-muted-foreground flex-shrink-0">
          {fmt(time)} / {fmt(CALL_DURATION)}
        </span>
      </div>
    </div>
  );
}
