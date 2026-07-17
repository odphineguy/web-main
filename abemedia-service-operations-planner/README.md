# AbeMedia Service Operations AI Planner

A developer-mode-ready ChatGPT app for service-business owners who want to find gaps in after-hours call coverage, estimate the value of missed opportunities, and create a practical intake playbook.

## MVP scope

- Assess lead coverage without asking for customer or caller data.
- Estimate potential monthly value from the owner's own inputs; estimates are not promises of revenue.
- Create a bilingual-ready intake and escalation playbook.
- Return AbeMedia's scheduling link instead of storing contact information. This keeps the first release free of a new lead-data pipeline.

## Tools

- `assess_call_coverage`
- `estimate_missed_call_value`
- `build_intake_playbook`
- `recommend_automation_path`
- `schedule_abemedia_consultation`

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

## Privacy and safety

The MVP does not persist personal data, make calls, send messages, or access a customer's systems. Do not enter caller names, phone numbers, addresses, or other customer data into the assessment inputs.
