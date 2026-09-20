# Abe Media ChatGPT Plugin

This is Abe Media's ChatGPT plugin for service-business owners. It helps a business owner check after-hours call coverage, estimate the value of missed opportunities, create an intake playbook, request a free AI audit, and ask Abe Media to follow up.

OpenAI now calls this type of integration a **ChatGPT app**, but this project uses **plugin** throughout the README because that is the name we recognize internally. Technically, it is an MCP server with a small embedded interface.

## MVP scope

- Assess lead coverage without asking for customer or caller data.
- Estimate potential monthly value from the owner's own inputs; estimates are not promises of revenue.
- Create a bilingual-ready intake and escalation playbook.
- Capture leads only through `submit_lead`, strictly behind explicit in-conversation consent. Convex stores the request first; Resend then sends the notification email.

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

Set in the plugin's Vercel project. Convex is required so duplicate and volume checks happen before any email is sent:

- `CONVEX_URL` + `CHATGPT_PLUGIN_SUBMISSION_SECRET` — submits into the same Convex `consultationSubmissions` table the abemedia.online site uses, via `formSubmissions:saveConsultationSubmission` with `referralSource: "chatgpt-app"`. The plugin uses its own credential rather than the website form's credential.
- `RESEND_API_KEY` + `LEAD_EMAIL` — emails each lead; optional `LEAD_FROM_EMAIL` to override the sender.

The lead path rejects a second request from the same email within 24 hours and caps plugin submissions at 25 per rolling 24-hour period.

## Privacy and safety

The plugin's assessment tools do not persist personal data. The only tool that collects contact information is `submit_lead`, which runs strictly behind explicit user consent confirmed in-conversation, and delivers the lead to Abe Media via Convex and/or email. Do not enter caller or customer data into assessment inputs.

## Run locally

```bash
npm install
npm run typecheck
npm run build
npm test
npm run dev
```

The MCP endpoint is `http://localhost:8787/mcp`. The health endpoint is `http://localhost:8787/`.

## Connect in ChatGPT developer mode

Deploy to a public HTTPS domain, then use `https://YOUR_DOMAIN/mcp` with **No authentication**. Refresh the connection after changes to tool descriptions or annotations.

The existing Vercel project may still show the older technical name `abemedia-service-operations-planner`. It is retained only to preserve the current endpoint; the user-facing product name is **Abe Media ChatGPT Plugin**.
