# PLATFORMS_PRICING_SPEC.md — Rejunk section + Pricing restructure
*July 19, 2026. Fable/Opus session, load fable-protocol skill. Repo: web-main.*

## Part A: Add Rejunk to Platforms page
Route: `src/app/[locale]/platforms`. Mirror the existing Saguaro Transport block.

Structure (copy Saguaro's layout/components):
- Badge row: "HOME SERVICES" + "AVAILABLE FOR PURCHASE"
- Title: "Rejunk" — one-liner: "Dispatch, driver activation, and live GPS for
  junk removal and moving companies."
- Body: "For home-service operators running on texts and whiteboards. Driver
  activation by email + PIN, live driver map, job dispatch — no app store,
  runs in the browser."
- CTA: "Inquire about this platform" (same handler as Saguaro)
- 3 feature cards (image + title + blurb):
  1. Live dispatch map — real-time driver GPS on the dispatch board
  2. Driver activation — email key + 4-digit PIN, built for non-tech crews
  3. Job management — assign, track, complete from one screen
- "Driver companion app" phone-mockup row like Saguaro's (3 phones):
  activation/PIN screen, today's jobs, job detail
- Demo video embed slot above or below cards (same pattern as Saguaro video)

ASSET PLACEHOLDERS (Abe drops files in later; build must not block on them):
- `public/images/rejunk/feature-dispatch.png`
- `public/images/rejunk/feature-activation.png`
- `public/images/rejunk/feature-jobs.png`
- `public/images/rejunk/phone-1.png` / `phone-2.png` / `phone-3.png`
- Video: leave a clearly marked placeholder (poster div or commented embed)
  keyed to `REJUNK_VIDEO_URL` const at top of file — one-line swap later.
Use a neutral gray placeholder box with the filename label when an image 404s
or, simpler, ship with the paths wired and let Next serve them once files land.

Locale: EN + ES copy in messages/ files, matching how Saguaro strings are keyed
(verify — Saguaro copy may be hardcoded; follow whichever pattern exists).

## Part B: Pricing restructure
Route: `src/app/[locale]/pricing`.
- Primary tiers (top of page): **Voice Agents** and **Automation**.
  - Voice Agents: AI phone agent, intake + booking, bilingual EN/ES.
  - Automation: lead response, follow-ups, dispatch/CRM integration.
- Websites + Chatbots demoted to an **Add-ons** section below (line items, not
  headline tiers).
- ALL price values use a placeholder const block at top:
  `const PRICING = { voice: "$X", automation: "$X", website: "$X", chatbot: "$X" }`
  — Abe fills real numbers in one place later.
- Update Get Started scope quiz options to: Voice agent / Automation /
  Website or chatbot add-on / Something else.
- EN + ES both.

## Acceptance
- [ ] Rejunk block on Platforms mirroring Saguaro, placeholders wired
- [ ] Pricing leads voice+automation, add-ons demoted, single PRICING const
- [ ] Scope quiz options updated
- [ ] Both locales
- [ ] `npm run build` passes; push (Vercel auto-deploys)
