"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneMissed, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

// Homepage missed-call revenue calculator. Separate from ROICalculator so the
// /calculator route stays untouched.

// Close rates prefilled by industry — starting points, user-adjustable.
const industryDefaults: Record<string, { closeRate: number; ticketPlaceholder: string }> = {
  law: { closeRate: 0.25, ticketPlaceholder: "4500" },
  hvac: { closeRate: 0.5, ticketPlaceholder: "450" },
  plumbing: { closeRate: 0.55, ticketPlaceholder: "350" },
  turf: { closeRate: 0.4, ticketPlaceholder: "3800" },
  dental: { closeRate: 0.45, ticketPlaceholder: "900" },
  other: { closeRate: 0.4, ticketPlaceholder: "500" },
};

const WEEKS_PER_MONTH = 4.33;

export default function MissedCallCalculator() {
  const t = useTranslations("Home.MissedCall");
  const locale = useLocale();

  const [industry, setIndustry] = useState("law");
  const [missedCalls, setMissedCalls] = useState("");
  const [closeRate, setCloseRate] = useState(industryDefaults.law.closeRate);
  const [avgTicket, setAvgTicket] = useState("");
  const [monthlyLost, setMonthlyLost] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleIndustryChange = (value: string) => {
    setIndustry(value);
    setCloseRate(industryDefaults[value]?.closeRate ?? 0.4);
  };

  const calculate = () => {
    const newErrors: Record<string, string> = {};
    const calls = parseFloat(missedCalls);
    const ticket = parseFloat(avgTicket);
    if (!missedCalls || calls <= 0) newErrors.missedCalls = t("errors.missedCalls");
    if (!avgTicket || ticket <= 0) newErrors.avgTicket = t("errors.avgTicket");
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setMonthlyLost(calls * WEEKS_PER_MONTH * closeRate * ticket);
  };

  const reset = () => {
    setMonthlyLost(null);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat(locale === "es" ? "es-US" : "en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-lg border ${
      hasError ? "border-red-500" : "border-border"
    } bg-card text-foreground focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all`;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {monthlyLost === null ? (
          <motion.div
            key="inputs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl p-px bg-primary/10"
          >
            <div className="rounded-2xl p-6 md:p-8 bg-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <PhoneMissed className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-normal tracking-[-0.02em] text-foreground">
                    {t("title")}
                  </h3>
                  <p className="text-sm font-light text-muted-foreground">{t("subtitle")}</p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-light text-foreground mb-2">
                    {t("industryLabel")}
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => handleIndustryChange(e.target.value)}
                    className={inputClass(false)}
                  >
                    {Object.keys(industryDefaults).map((key) => (
                      <option key={key} value={key}>
                        {t(`industries.${key}`)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-light text-foreground mb-2">
                    {t("missedCallsLabel")}
                  </label>
                  <input
                    type="number"
                    value={missedCalls}
                    onChange={(e) => setMissedCalls(e.target.value)}
                    placeholder="6"
                    min="1"
                    className={inputClass(!!errors.missedCalls)}
                  />
                  {errors.missedCalls && (
                    <p className="mt-1 text-sm text-red-500">{errors.missedCalls}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-light text-foreground mb-2">
                    {t("closeRateLabel")}: <span className="font-semibold text-orange-500">{Math.round(closeRate * 100)}%</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    step="5"
                    value={Math.round(closeRate * 100)}
                    onChange={(e) => setCloseRate(parseInt(e.target.value, 10) / 100)}
                    className="w-full accent-orange-500"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">{t("closeRateHint")}</p>
                </div>

                <div>
                  <label className="block text-sm font-light text-foreground mb-2">
                    {t("avgTicketLabel")}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <input
                      type="number"
                      value={avgTicket}
                      onChange={(e) => setAvgTicket(e.target.value)}
                      placeholder={industryDefaults[industry]?.ticketPlaceholder ?? "500"}
                      min="1"
                      className={`${inputClass(!!errors.avgTicket)} pl-8`}
                    />
                  </div>
                  {errors.avgTicket && (
                    <p className="mt-1 text-sm text-red-500">{errors.avgTicket}</p>
                  )}
                </div>

                <button
                  onClick={calculate}
                  className="w-full py-4 px-6 rounded-full font-normal text-sm text-white bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center justify-center gap-2"
                >
                  {t("button")}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl p-px bg-gradient-to-b from-orange-500/40 to-orange-600/10"
          >
            <div className="rounded-2xl p-6 md:p-8 bg-card text-center">
              <p className="text-sm font-light text-muted-foreground mb-2">
                {t("monthlyLostLabel")}
              </p>
              <p className="text-4xl md:text-5xl font-semibold text-orange-500 mb-4">
                {formatCurrency(monthlyLost)}
              </p>
              <p className="text-lg text-foreground mb-8">{t("elenaLine")}</p>

              <div className="space-y-3">
                <Link
                  href={`/${locale}/contact`}
                  className="w-full py-4 px-6 rounded-full font-normal text-sm text-white bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center justify-center gap-2"
                >
                  {t("cta")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button
                  onClick={reset}
                  className="w-full py-3 px-6 rounded-full font-light text-sm text-muted-foreground hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                >
                  {t("recalculate")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
