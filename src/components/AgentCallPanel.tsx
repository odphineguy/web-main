"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ConversationProvider, useConversation } from "@elevenlabs/react";
import { useTranslations } from "next-intl";
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";

type Turn = { role: "user" | "agent"; text: string };

const BAR_COUNT = 5;
const AGENT_TZ = "America/Phoenix";

/**
 * The LLM is unreliable at date arithmetic — asked for "this Monday" it drifts a day.
 * So we hand it a literal calendar to read from instead of anything to calculate.
 */
function buildDateContext(): string {
  const format = new Intl.DateTimeFormat("en-US", {
    timeZone: AGENT_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format;
  const now = Date.now();
  const days = Array.from({ length: 15 }, (_, i) => format(new Date(now + i * 86_400_000)));
  return `Today is ${days[0]}. The following days, in order, are: ${days.slice(1).join("; ")}.`;
}

/**
 * Custom voice UI for the demo agent. Replaces the stock ElevenLabs embed so the
 * call surface matches the site: no chat input, no vendor chrome, brand colors only.
 */
export default function AgentCallPanel({ agentId }: { agentId: string }) {
  return (
    <ConversationProvider>
      <CallSurface agentId={agentId} />
    </ConversationProvider>
  );
}

function CallSurface({ agentId }: { agentId: string }) {
  const t = useTranslations("Home.AgentDemo");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [failed, setFailed] = useState(false);
  const [starting, setStarting] = useState(false);
  const barsRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const conversation = useConversation({
    onMessage: ({ message, source }) =>
      setTurns((prev) => [...prev, { role: source === "user" ? "user" : "agent", text: message }]),
    onError: () => setFailed(true),
  });

  const { status, isSpeaking, isMuted, setMuted, startSession, endSession } = conversation;
  const connected = status === "connected";

  // Drive the bar heights straight from the audio analyser so nothing re-renders.
  useEffect(() => {
    if (!connected) return;
    let frame = 0;
    const tick = () => {
      const el = barsRef.current;
      if (el) {
        const data = isSpeaking
          ? conversation.getOutputByteFrequencyData()
          : conversation.getInputByteFrequencyData();
        const step = Math.max(1, Math.floor(data.length / BAR_COUNT));
        for (let i = 0; i < BAR_COUNT; i++) {
          let sum = 0;
          for (let j = 0; j < step; j++) sum += data[i * step + j] ?? 0;
          const level = Math.min(1, sum / step / 140);
          el.style.setProperty(`--b${i}`, `${12 + level * 40}px`);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [connected, isSpeaking, conversation]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [turns]);

  const start = useCallback(async () => {
    setFailed(false);
    setStarting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setTurns([]);
      await startSession({
        agentId,
        connectionType: "webrtc",
        dynamicVariables: { date_context: buildDateContext() },
      });
    } catch {
      setFailed(true);
    } finally {
      setStarting(false);
    }
  }, [agentId, startSession]);

  const busy = starting || status === "connecting";
  const statusLabel = failed
    ? t("callError")
    : busy
      ? t("connecting")
      : connected
        ? isSpeaking
          ? t("speaking")
          : t("listening")
        : t("idle");

  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-white dark:bg-neutral-900 p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold text-foreground">{t("cardTitle")}</p>
        <p className="text-xs text-muted-foreground">{t("cardSubtitle")}</p>
      </div>

      {/* Voice level indicator */}
      <div className="flex h-[92px] items-center justify-center">
        {connected ? (
          <div ref={barsRef} className="flex items-end gap-1.5" aria-hidden>
            {Array.from({ length: BAR_COUNT }, (_, i) => (
              <span
                key={i}
                className="w-2 rounded-full bg-orange-500 transition-[height] duration-75"
                style={{ height: `var(--b${i}, 12px)` }}
              />
            ))}
          </div>
        ) : (
          <div
            className={`flex h-[72px] w-[72px] items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/5 ${
              busy ? "animate-pulse" : ""
            }`}
            aria-hidden
          >
            <Phone className="h-6 w-6 text-orange-500" />
          </div>
        )}
      </div>

      <p
        className="mt-4 text-center text-sm text-muted-foreground"
        role="status"
        aria-live="polite"
      >
        {statusLabel}
      </p>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={connected ? endSession : start}
          disabled={busy}
          className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:opacity-60 ${
            connected
              ? "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {connected ? <PhoneOff className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
          {connected ? t("endCall") : t("startCall")}
        </button>

        {connected && (
          <button
            type="button"
            onClick={() => setMuted(!isMuted)}
            aria-label={isMuted ? t("unmute") : t("mute")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
          >
            {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
        )}
      </div>

      {!connected && !busy && (
        <p className="mt-3 text-center text-xs text-muted-foreground">{t("micNote")}</p>
      )}

      {turns.length > 0 && (
        <div
          ref={logRef}
          className="mt-6 max-h-44 space-y-3 overflow-y-auto border-t border-border pt-4"
        >
          {turns.map((turn, i) => (
            <div key={i} className="text-sm">
              <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {turn.role === "user" ? t("you") : t("agent")}
              </span>
              <span className="text-foreground">{turn.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
