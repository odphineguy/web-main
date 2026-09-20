# AbeMedia Service Operations AI Planner

A developer-mode-ready ChatGPT app for service-business owners who want to find gaps in after-hours call coverage, estimate the value of missed opportunities, and create a practical intake playbook.

## MVP scope

- Assess lead coverage without asking for customer or caller data.
- Estimate potential monthly value from the owner's own inputs; estimates are not promises of revenue.
- Create a bilingual-ready intake and escalation playbook.
- Capture leads only through `submit_lead`, strictly behind explicit in-conversation consent, delivered via Supabase and/or Resend email.

## Tools

- `assess_call_coverage`
- `estimate_missed_call_value`
- `build_intake_playbook`
- `recommend_automation_path`
- `request_ai_readiness_audit`
- `show_sample_agent_call`
- `submit_lead`
- `schedule_abemedia_consultation`

## Lead capture env vars (submit_lead)

Set in Vercel (each channel degrades gracefully, but at least one must work):

- `CONVEX_URL` + `FORM_SUBMISSION_SECRET` — submits into the same Convex `consultationSubmissions` table the abemedia.online site uses, via `formSubmissions:saveConsultationSubmission` with `referralSource: "chatgpt-app"`. Copy both values from the abemedia.online Vercel project (CONVEX_URL is the `https://….convex.cloud` deployment URL, e.g. NEXT_PUBLIC_CONVEX_URL).
- `RESEND_API_KEY` + `LEAD_EMAIL` — emails each lead; optional `LEAD_FROM_EMAIL` to override the sender.

## Privacy and safety

The planner tools do not persist personal data. The only tool that collects contact information is `submit_lead`, which runs strictly behind explicit user consent confirmed in-conversation, and delivers the lead to AbeMedia via Convex and/or email. Do not enter caller or customer data into assessment inputs.

## Run locally

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

The MCP endpoint is `http://localhost:8787/mcp`. The health endpoint is `http://localhost:8787/`.

## Connect in ChatGPT developer mode

Deploy to a public HTTPS domain, then use `https://YOUR_DOMAIN/mcp` with **No authentication**. Refresh the connection after changes to tool descriptions or annotations.
