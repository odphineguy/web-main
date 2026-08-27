export const auditAnswerValues = {
  businessType: ["home-services", "field-services", "health-wellness", "professional-services", "other"],
  missedCalls: ["rarely", "weekly", "daily"],
  afterHours: ["covered", "voicemail", "urgent-only", "all-calls"],
  bilingual: ["no", "sometimes", "yes"],
  intake: ["documented", "mixed", "manual", "inconsistent"],
} as const;

export type AuditAnswers = {
  [Key in keyof typeof auditAnswerValues]: (typeof auditAnswerValues)[Key][number];
};

export type AuditResult = {
  score: number;
  level: "foundation" | "ready" | "priority";
  recommendationKeys: Array<"missed-call" | "after-hours" | "bilingual" | "intake" | "handoff">;
};

export function isAuditAnswer<Key extends keyof AuditAnswers>(
  key: Key,
  value: unknown,
): value is AuditAnswers[Key] {
  return typeof value === "string" && (auditAnswerValues[key] as readonly string[]).includes(value);
}

export function calculateAuditResult(answers: AuditAnswers): AuditResult {
  const missedCallPoints = { rarely: 0, weekly: 2, daily: 4 }[answers.missedCalls];
  const afterHoursPoints = { covered: 0, voicemail: 3, "urgent-only": 2, "all-calls": 4 }[answers.afterHours];
  const bilingualPoints = { no: 0, sometimes: 2, yes: 4 }[answers.bilingual];
  const intakePoints = { documented: 0, mixed: 2, manual: 3, inconsistent: 4 }[answers.intake];
  const pressure = missedCallPoints + afterHoursPoints + bilingualPoints + intakePoints;
  const score = Math.min(99, 35 + pressure * 4);
  const level = pressure >= 11 ? "priority" : pressure >= 6 ? "ready" : "foundation";

  const ranked: Array<{ key: AuditResult["recommendationKeys"][number]; weight: number }> = [];
  if (answers.missedCalls !== "rarely") ranked.push({ key: "missed-call", weight: missedCallPoints + 4 });
  if (answers.afterHours !== "covered") ranked.push({ key: "after-hours", weight: afterHoursPoints + 3 });
  if (answers.bilingual !== "no") ranked.push({ key: "bilingual", weight: bilingualPoints + 2 });
  if (answers.intake !== "documented") ranked.push({ key: "intake", weight: intakePoints + 3 });
  ranked.push({ key: "handoff", weight: answers.intake === "documented" ? 5 : 1 });

  const recommendationKeys = ranked
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 4)
    .map(({ key }) => key);

  return { score, level, recommendationKeys };
}
