"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, FileSpreadsheet, ShieldCheck } from "lucide-react";
import TurnstileWidget from "@/components/TurnstileWidget";
import { getLeadAttribution } from "@/lib/leadAttribution";
import { humanizeError, isValidEmail } from "@/lib/humanizeError";
import styles from "./thumbtack-audit.module.css";

type Status = "idle" | "sending" | "sent" | "error";

export default function ThumbtackAuditRequestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    const monthlySpend = Number(formData.get("monthlySpend"));

    if (!isValidEmail(email)) {
      setEmailError("Double-check this address. It looks like an @ or domain is missing.");
      form.querySelector<HTMLInputElement>('input[name="email"]')?.focus();
      return;
    }
    setEmailError(null);

    if (!Number.isFinite(monthlySpend) || monthlySpend < 0 || monthlySpend > 100_000) {
      setStatus("error");
      setErrorMessage("Enter a monthly Thumbtack spend between $0 and $100,000.");
      form.querySelector<HTMLInputElement>('input[name="monthlySpend"]')?.focus();
      return;
    }

    if (!turnstileToken) {
      setStatus("error");
      setErrorMessage("Complete the verification check before requesting the audit.");
      return;
    }

    const category = String(formData.get("category") ?? "").trim().slice(0, 120);
    const reportingPeriod = String(formData.get("reportingPeriod") ?? "").trim().slice(0, 60);
    const csvStatus = String(formData.get("csvStatus") ?? "").trim().slice(0, 120);
    const notes = String(formData.get("notes") ?? "").trim().slice(0, 1500);
    const description = [
      "Thumbtack Lead Spend Audit request",
      `Service category: ${category}`,
      `Approximate monthly spend: $${monthlySpend.toFixed(0)}`,
      `Preferred reporting period: ${reportingPeriod}`,
      `CSV status: ${csvStatus}`,
      notes ? `Context: ${notes}` : "Context: None supplied",
      "CSV file: Not uploaded through the website. Send manual handoff instructions.",
    ].join("\n");

    setStatus("sending");
    setErrorMessage(null);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email,
      company: String(formData.get("company") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      service: "thumbtack-lead-spend-audit",
      referralSource: "Thumbtack lead spend audit page",
      description,
      ...getLeadAttribution(),
      "cf-turnstile-response": turnstileToken,
    };

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { ok?: boolean; error?: unknown } = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        throw new Error(typeof data.error === "string" ? data.error : `HTTP ${response.status}`);
      }
      setStatus("sent");
      setTurnstileToken(null);
      form.reset();
    } catch (error: unknown) {
      setStatus("error");
      setErrorMessage(humanizeError(error));
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.formSuccess} role="status" aria-live="polite">
        <CheckCircle2 />
        <p>Request received</p>
        <h3>I’ll reply with the CSV handoff instructions.</h3>
        <span>The first 10 snapshots are prepared by hand and reviewed on a 15-minute call. No Thumbtack login is needed.</span>
      </div>
    );
  }

  return (
    <form className={styles.auditForm} onSubmit={onSubmit} noValidate>
      <div className={styles.formIntro}>
        <span><FileSpreadsheet /> Concierge intake · first 10</span>
        <h3>Request your free snapshot</h3>
        <p>Share the business context now. I’ll reply with instructions for handing off the contacts CSV separately.</p>
      </div>

      <div className={styles.formGrid}>
        <label>
          <span>Full name</span>
          <input name="name" type="text" autoComplete="name" maxLength={100} required placeholder="Your name" />
        </label>
        <label>
          <span>Work email</span>
          <input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="you@company.com" aria-invalid={emailError ? "true" : "false"} aria-describedby={emailError ? "audit-email-error" : undefined} onChange={() => emailError && setEmailError(null)} />
          {emailError ? <small id="audit-email-error" className={styles.fieldError}>{emailError}</small> : null}
        </label>
        <label>
          <span>Business name</span>
          <input name="company" type="text" autoComplete="organization" maxLength={160} required placeholder="Your company" />
        </label>
        <label>
          <span>Phone <em>optional</em></span>
          <input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="(602) 555-0123" />
        </label>
        <label>
          <span>Thumbtack service category</span>
          <input name="category" type="text" maxLength={120} required placeholder="e.g. Local Moving" />
        </label>
        <label>
          <span>Approximate monthly spend</span>
          <div className={styles.moneyField}><i>$</i><input name="monthlySpend" type="number" inputMode="decimal" min="0" max="100000" step="1" required placeholder="500" /></div>
        </label>
        <label>
          <span>Reporting period</span>
          <select name="reportingPeriod" required defaultValue="90 days">
            <option value="30 days">Last 30 days</option>
            <option value="60 days">Last 60 days</option>
            <option value="90 days">Last 90 days</option>
            <option value="6+ months">Six months or more</option>
          </select>
        </label>
        <label>
          <span>Contacts CSV</span>
          <select name="csvStatus" required defaultValue="CSV ready">
            <option value="CSV ready">I have the export ready</option>
            <option value="Needs export instructions">I need export instructions</option>
          </select>
        </label>
      </div>

      <label className={styles.notesField}>
        <span>Anything affecting this period? <em>optional</em></span>
        <textarea name="notes" rows={3} maxLength={1500} placeholder="Budget changes, seasonality, service changes, or anything else that would change how the data should be read." />
      </label>

      <div className={styles.formPrivacy}>
        <ShieldCheck />
        <p><strong>No account access and no file upload on this page.</strong> Don’t paste customer names or messages here. I’ll send separate CSV handoff instructions after reviewing the request.</p>
      </div>

      <TurnstileWidget onVerify={(token) => { setTurnstileToken(token); setErrorMessage(null) }} onError={() => setErrorMessage("Verification failed. Please try again.")} onExpire={() => setTurnstileToken(null)} />

      <button type="submit" disabled={status === "sending" || !turnstileToken}>
        {status === "sending" ? "Sending request…" : "Analyze my Thumbtack spend"}<ArrowRight />
      </button>
      {status === "error" && errorMessage ? <p className={styles.formError} role="alert" aria-live="assertive">{errorMessage}</p> : null}
      <small className={styles.formFinePrint}>Free snapshot includes three findings and a 15-minute review. It describes observed performance and does not guarantee a hire-rate increase.</small>
    </form>
  );
}
