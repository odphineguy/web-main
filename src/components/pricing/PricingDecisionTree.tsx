"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  addOns,
  tiers,
  type AddOnId,
  type Answers,
  type BilingualAnswer,
  type ProductAnswer,
  type TierId,
  type TimelineAnswer,
} from "@/lib/pricingData";
import {
  recommend,
  type RationaleKey,
} from "@/lib/pricingRecommender";

interface Props {
  onBookCall: (context: { tierId: TierId | null; selectedAddOns: AddOnId[] }) => void;
}

const productOptions: ProductAnswer[] = ["website", "chatbot", "both", "other"];
const bilingualOptions: BilingualAnswer[] = ["yes", "english", "unsure"];
const timelineOptions: TimelineAnswer[] = ["fast", "medium", "flexible"];

const isProductAnswer = (v: string | null): v is ProductAnswer =>
  v !== null && productOptions.includes(v as ProductAnswer);
const isBilingualAnswer = (v: string | null): v is BilingualAnswer =>
  v !== null && bilingualOptions.includes(v as BilingualAnswer);
const isTimelineAnswer = (v: string | null): v is TimelineAnswer =>
  v !== null && timelineOptions.includes(v as TimelineAnswer);

type QuestionKey = "q1" | "q2" | "q3";

const SETTLE_MS = 220;

export default function PricingDecisionTree({ onBookCall }: Props) {
  const t = useTranslations("Pricing");
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();

  const answers: Answers = useMemo(() => {
    const q1 = searchParams.get("q1");
    const q2 = searchParams.get("q2");
    const q3 = searchParams.get("q3");
    return {
      product: isProductAnswer(q1) ? q1 : undefined,
      bilingual: isBilingualAnswer(q2) ? q2 : undefined,
      timeline: isTimelineAnswer(q3) ? q3 : undefined,
    };
  }, [searchParams]);

  // Which question is currently being answered?
  const activeQuestion: QuestionKey | "done" = answers.product === undefined
    ? "q1"
    : answers.bilingual === undefined
      ? "q2"
      : answers.timeline === undefined
        ? "q3"
        : "done";

  const [selectedAddOns, setSelectedAddOns] = useState<Set<AddOnId>>(new Set());
  const [altOpen, setAltOpen] = useState(false);
  const recommendationRef = useRef<HTMLDivElement | null>(null);
  const currentQuestionRef = useRef<HTMLHeadingElement | null>(null);

  // Focus the active question heading on change so screen readers and keyboard users follow along.
  useEffect(() => {
    if (activeQuestion !== "done") {
      currentQuestionRef.current?.focus({ preventScroll: true });
    } else {
      recommendationRef.current?.focus({ preventScroll: true });
    }
  }, [activeQuestion]);

  const writeAnswers = useCallback(
    (next: Answers) => {
      const params = new URLSearchParams(searchParams.toString());
      (["product", "bilingual", "timeline"] as const).forEach((key) => {
        const urlKey = key === "product" ? "q1" : key === "bilingual" ? "q2" : "q3";
        const value = next[key];
        if (value) params.set(urlKey, value);
        else params.delete(urlKey);
      });
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleSelect = useCallback(
    (key: keyof Answers, value: ProductAnswer | BilingualAnswer | TimelineAnswer) => {
      const next = { ...answers, [key]: value } as Answers;
      // Settle animation then commit (auto-advance).
      setTimeout(() => writeAnswers(next), prefersReducedMotion ? 0 : SETTLE_MS);
    },
    [answers, prefersReducedMotion, writeAnswers],
  );

  const restart = useCallback(() => {
    router.replace("?", { scroll: false });
    setSelectedAddOns(new Set());
    setAltOpen(false);
  }, [router]);

  const editAnswer = useCallback(
    (key: keyof Answers) => {
      const next: Answers = { ...answers };
      // Clear this answer and everything after it.
      if (key === "product") {
        next.product = undefined;
        next.bilingual = undefined;
        next.timeline = undefined;
      } else if (key === "bilingual") {
        next.bilingual = undefined;
        next.timeline = undefined;
      } else {
        next.timeline = undefined;
      }
      writeAnswers(next);
    },
    [answers, writeAnswers],
  );

  const recommendation = useMemo(() => recommend(answers), [answers]);

  const toggleAddOn = (id: AddOnId) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const visibleAddOns = useMemo(
    () => addOns.filter((addon) => !addon.conditional || addon.conditional(answers)),
    [answers],
  );

  // Prior-answer breadcrumb entries: only show answered, earlier-than-active questions.
  const breadcrumb: Array<{ key: keyof Answers; label: string }> = [];
  if (answers.product) {
    breadcrumb.push({
      key: "product",
      label: t(`Questions.q1.options.${answers.product}`),
    });
  }
  if (answers.bilingual) {
    breadcrumb.push({
      key: "bilingual",
      label: t(`Questions.q2.options.${answers.bilingual}`),
    });
  }
  if (answers.timeline && activeQuestion === "done") {
    breadcrumb.push({
      key: "timeline",
      label: t(`Questions.q3.options.${answers.timeline}`),
    });
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Breadcrumb — prior answers, editable */}
      {breadcrumb.length > 0 && (
        <div className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          {breadcrumb.map((entry, i) => (
            <span key={entry.key} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden className="text-border">·</span>}
              <button
                type="button"
                onClick={() => editAnswer(entry.key)}
                className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 transition-colors hover:border-primary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span>{entry.label}</span>
                <Pencil
                  aria-hidden
                  className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60 group-focus-visible:opacity-60"
                />
                <span className="sr-only">{t("Breadcrumb.edit")}</span>
              </button>
            </span>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>
        {activeQuestion === "q1" && (
          <QuestionBlock
            key="q1"
            headingRef={currentQuestionRef}
            question={t("Questions.q1.prompt")}
            options={productOptions.map((opt) => ({
              value: opt,
              label: t(`Questions.q1.options.${opt}`),
            }))}
            onSelect={(v) => handleSelect("product", v as ProductAnswer)}
            reduceMotion={!!prefersReducedMotion}
          />
        )}

        {activeQuestion === "q2" && answers.product !== "other" && (
          <QuestionBlock
            key="q2"
            headingRef={currentQuestionRef}
            question={t("Questions.q2.prompt")}
            hint={t("Questions.q2.hint")}
            options={bilingualOptions.map((opt) => ({
              value: opt,
              label: t(`Questions.q2.options.${opt}`),
            }))}
            onSelect={(v) => handleSelect("bilingual", v as BilingualAnswer)}
            reduceMotion={!!prefersReducedMotion}
          />
        )}

        {activeQuestion === "q3" && answers.product !== "other" && (
          <QuestionBlock
            key="q3"
            headingRef={currentQuestionRef}
            question={t("Questions.q3.prompt")}
            options={timelineOptions.map((opt) => ({
              value: opt,
              label: t(`Questions.q3.options.${opt}`),
            }))}
            onSelect={(v) => handleSelect("timeline", v as TimelineAnswer)}
            reduceMotion={!!prefersReducedMotion}
          />
        )}

        {/* "Something else" consult path */}
        {answers.product === "other" && (
          <motion.div
            key="consult"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="py-6"
            ref={recommendationRef}
            tabIndex={-1}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {t("Recommendation.eyebrow")}
            </p>
            <h2 className="mt-4">{t("Consult.heading")}</h2>
            <p className="mt-4 text-muted-foreground">{t("Consult.subtitle")}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onBookCall({ tierId: null, selectedAddOns: [] })}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t("Consult.cta")}
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={restart}
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                {t("Recommendation.restart")}
              </button>
            </div>
          </motion.div>
        )}

        {activeQuestion === "done" && !recommendation.needsConsult && recommendation.tierId && (
          <RecommendationBlock
            key="recommendation"
            tierId={recommendation.tierId}
            altId={recommendation.altId}
            rationaleKey={recommendation.rationaleKey}
            altOpen={altOpen}
            onToggleAlt={() => setAltOpen((o) => !o)}
            selectedAddOns={selectedAddOns}
            visibleAddOnIds={visibleAddOns.map((a) => a.id)}
            onToggleAddOn={toggleAddOn}
            onBookCall={() =>
              onBookCall({
                tierId: recommendation.tierId,
                selectedAddOns: Array.from(selectedAddOns),
              })
            }
            onRestart={restart}
            ref={recommendationRef}
            reduceMotion={!!prefersReducedMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------- Question block -------- */

function QuestionBlock({
  headingRef,
  question,
  hint,
  options,
  onSelect,
  reduceMotion,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  question: string;
  hint?: string;
  options: Array<{ value: string; label: string }>;
  onSelect: (value: string) => void;
  reduceMotion: boolean;
}) {
  const [picked, setPicked] = useState<string | null>(null);

  const handleClick = (value: string) => {
    if (picked) return;
    setPicked(value);
    onSelect(value);
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="py-2"
    >
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl md:text-[28px] font-medium tracking-[-0.01em] outline-none"
      >
        {question}
      </h2>
      {hint && (
        <p className="mt-3 text-sm text-muted-foreground">{hint}</p>
      )}
      <div
        role="radiogroup"
        aria-label={question}
        className="mt-8 flex flex-col gap-3"
      >
        {options.map((opt) => {
          const isPicked = picked === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isPicked}
              onClick={() => handleClick(opt.value)}
              className={cn(
                "group relative flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left text-base transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isPicked
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border hover:border-foreground/40",
              )}
            >
              <span>{opt.label}</span>
              <ArrowRight
                aria-hidden
                className={cn(
                  "h-4 w-4 shrink-0 transition-all",
                  isPicked
                    ? "text-primary translate-x-0 opacity-100"
                    : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60",
                )}
              />
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* -------- Recommendation block -------- */

interface RecommendationBlockProps {
  tierId: TierId;
  altId: TierId | null;
  rationaleKey: RationaleKey | null;
  altOpen: boolean;
  onToggleAlt: () => void;
  selectedAddOns: Set<AddOnId>;
  visibleAddOnIds: AddOnId[];
  onToggleAddOn: (id: AddOnId) => void;
  onBookCall: () => void;
  onRestart: () => void;
  reduceMotion: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

function RecommendationBlock({
  tierId,
  altId,
  rationaleKey,
  altOpen,
  onToggleAlt,
  selectedAddOns,
  visibleAddOnIds,
  onToggleAddOn,
  onBookCall,
  onRestart,
  reduceMotion,
  ref,
}: RecommendationBlockProps) {
  const t = useTranslations("Pricing");
  const tierName = t(`Tiers.${tierId}.name`);
  const altTierName = altId ? t(`Tiers.${altId}.name`) : "";

  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="py-2 outline-none"
      aria-live="polite"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        {t("Recommendation.eyebrow")}
      </p>

      <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h2 className="m-0">{tierName}</h2>
        <span className="text-xl tabular-nums text-muted-foreground">
          {tiers[tierId].price}
        </span>
      </div>

      <p className="mt-2 text-lg text-foreground">
        {t(`Tiers.${tierId}.tagline`)}
      </p>

      {rationaleKey && (
        <p className="mt-6 max-w-prose text-muted-foreground">
          {t(`Rationale.${rationaleKey}`)}
        </p>
      )}

      <ul className="mt-8 space-y-3">
        {(t.raw(`Tiers.${tierId}.inclusions`) as string[]).map((item) => (
          <li key={item} className="flex items-start gap-3 text-foreground">
            <Check
              aria-hidden
              className="mt-1 h-4 w-4 shrink-0 text-primary"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Alternate tier disclosure */}
      {altId && (
        <div className="mt-8 border-t border-border pt-6">
          <button
            type="button"
            onClick={onToggleAlt}
            aria-expanded={altOpen}
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
          >
            {altOpen
              ? t("Recommendation.hideAlt")
              : t("Recommendation.seeAlt", { tier: altTierName })}
          </button>

          <AnimatePresence initial={false}>
            {altOpen && (
              <motion.div
                key="alt"
                initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {t("Recommendation.altLabel")}
                  </p>
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="m-0 text-xl font-medium">{altTierName}</h3>
                    <span className="text-base tabular-nums text-muted-foreground">
                      {tiers[altId].price}
                    </span>
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    {t(`Tiers.${altId}.tagline`)}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {(t.raw(`Tiers.${altId}.inclusions`) as string[]).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <Check aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-primary/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Primary CTA */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onBookCall}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {t("Recommendation.cta")}
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          {t("Recommendation.restart")}
        </button>
      </div>

      {/* Add-ons */}
      <section className="mt-20 border-t border-border pt-12">
        <h3 className="m-0">{t("AddOns.heading")}</h3>
        <p className="mt-3 text-muted-foreground">{t("AddOns.subtitle")}</p>

        <ul className="mt-8 flex flex-col gap-2">
          {visibleAddOnIds.map((id) => {
            const meta = addOns.find((a) => a.id === id)!;
            const selected = selectedAddOns.has(id);
            return (
              <li key={id}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={selected}
                  onClick={() => onToggleAddOn(id)}
                  className={cn(
                    "group flex w-full items-start justify-between gap-6 rounded-xl border px-5 py-4 text-left transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    selected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-foreground/40",
                  )}
                >
                  <span className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className={cn(
                        "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border group-hover:border-foreground/40",
                      )}
                    >
                      {selected && <Check className="h-3 w-3" />}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-base font-medium text-foreground">
                        {t(`AddOns.items.${id}.name`)}
                      </span>
                      <span className="mt-1 text-sm text-muted-foreground">
                        {t(`AddOns.items.${id}.description`)}
                      </span>
                    </span>
                  </span>
                  <span className="shrink-0 whitespace-nowrap text-sm tabular-nums text-muted-foreground">
                    {meta.price}
                    {meta.isMonthly ? t("AddOns.perMonth") : ""}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </motion.div>
  );
}
