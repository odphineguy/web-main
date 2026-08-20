"use client";

import { useMemo, useState } from "react";

type WorksheetCopy = {
  missedCalls: string;
  missedCallsHint: string;
  jobValue: string;
  jobValueHint: string;
  resultLabel: string;
  resultBody: string;
  disclaimer: string;
};

export default function MissedCallValueWorksheet({
  locale,
  copy,
}: {
  locale: "en" | "es";
  copy: WorksheetCopy;
}) {
  const [missedCalls, setMissedCalls] = useState("");
  const [jobValue, setJobValue] = useState("");

  const weeklyValue = useMemo(() => {
    const calls = Number(missedCalls);
    const value = Number(jobValue);
    if (!Number.isFinite(calls) || !Number.isFinite(value) || calls <= 0 || value <= 0) {
      return null;
    }
    return calls * value;
  }, [jobValue, missedCalls]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(locale === "es" ? "es-US" : "en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);

  const inputClass =
    "mt-3 w-full border-0 border-b border-white/25 bg-transparent px-0 pb-3 font-[var(--font-ds-display)] text-5xl font-bold text-white outline-none transition-colors placeholder:text-white/20 focus:border-[#E34F0B] md:text-6xl";

  return (
    <div className="grid overflow-hidden border border-white/15 bg-[#0d1119] lg:grid-cols-[1fr_1fr_0.9fr]">
      <label className="border-b border-white/15 p-6 lg:border-r lg:border-b-0 md:p-8">
        <span className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.18em] text-[#E34F0B]">
          {copy.missedCalls}
        </span>
        <input
          className={inputClass}
          type="number"
          min="0"
          inputMode="numeric"
          value={missedCalls}
          onChange={(event) => setMissedCalls(event.target.value)}
          placeholder="0"
        />
        <span className="mt-3 block text-sm leading-6 text-white/55">{copy.missedCallsHint}</span>
      </label>

      <label className="border-b border-white/15 p-6 lg:border-r lg:border-b-0 md:p-8">
        <span className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.18em] text-[#E34F0B]">
          {copy.jobValue}
        </span>
        <div className="relative">
          <span className="absolute top-3 left-0 font-[var(--font-ds-display)] text-5xl font-bold text-white/30 md:text-6xl">$</span>
          <input
            className={`${inputClass} pl-7 md:pl-9`}
            type="number"
            min="0"
            inputMode="decimal"
            value={jobValue}
            onChange={(event) => setJobValue(event.target.value)}
            placeholder="0"
          />
        </div>
        <span className="mt-3 block text-sm leading-6 text-white/55">{copy.jobValueHint}</span>
      </label>

      <div className="flex min-h-56 flex-col justify-between bg-[#E34F0B] p-6 text-white md:p-8">
        <span className="font-[var(--font-ds-mono)] text-xs uppercase tracking-[0.18em] text-white/75">
          {copy.resultLabel}
        </span>
        <div>
          <strong className="block font-[var(--font-ds-display)] text-6xl leading-none font-bold md:text-7xl">
            {weeklyValue === null ? "$0" : formatCurrency(weeklyValue)}
          </strong>
          <p className="mt-4 text-sm leading-6 text-white/85">{copy.resultBody}</p>
        </div>
      </div>

      <p className="border-t border-white/15 px-6 py-4 text-xs leading-5 text-white/45 lg:col-span-3 md:px-8">
        {copy.disclaimer}
      </p>
    </div>
  );
}
