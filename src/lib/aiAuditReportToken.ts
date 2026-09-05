import "server-only";

import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { isAuditAnswer, type AuditAnswers } from "@/lib/aiAudit";

type AuditReportPayload = {
  v: 1;
  locale: "en" | "es";
  answers: AuditAnswers;
};

const TOKEN_CONTEXT = "abe-media-ai-audit-report:v1";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;
const MAX_TOKEN_LENGTH = 4096;

function getKey() {
  const secret = process.env.AI_AUDIT_REPORT_SECRET || process.env.FORM_SUBMISSION_SECRET;
  if (!secret) return null;
  return createHash("sha256").update(`${TOKEN_CONTEXT}:${secret}`).digest();
}

export function createAuditReportToken(answers: AuditAnswers, locale: "en" | "es") {
  const key = getKey();
  if (!key) return null;

  const payload: AuditReportPayload = { v: 1, locale, answers };
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  cipher.setAAD(Buffer.from(TOKEN_CONTEXT));
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

export function readAuditReportToken(token: string): AuditReportPayload | null {
  if (!token || token.length > MAX_TOKEN_LENGTH) return null;
  const key = getKey();
  if (!key) return null;

  try {
    const packed = Buffer.from(token, "base64url");
    if (packed.length <= IV_LENGTH + AUTH_TAG_LENGTH) return null;

    const iv = packed.subarray(0, IV_LENGTH);
    const tag = packed.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
    const encrypted = packed.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAAD(Buffer.from(TOKEN_CONTEXT));
    decipher.setAuthTag(tag);
    const decoded = Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
    const payload = JSON.parse(decoded) as Partial<AuditReportPayload>;

    if (payload.v !== 1 || (payload.locale !== "en" && payload.locale !== "es")) return null;
    if (!payload.answers || typeof payload.answers !== "object") return null;
    const keys: Array<keyof AuditAnswers> = ["businessType", "missedCalls", "afterHours", "bilingual", "intake"];
    for (const answerKey of keys) {
      if (!isAuditAnswer(answerKey, payload.answers[answerKey])) return null;
    }

    return payload as AuditReportPayload;
  } catch {
    return null;
  }
}
