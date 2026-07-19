# PUBLIC_WORKFLOW_SPEC.md — "How an AI-Run Operation Works" showcase page
*July 19, 2026. For an Opus/Sonnet session with fable-protocol skill loaded.*
*Reality Principle: read the source file before adapting — do not work from this summary alone.*

## Goal
Adapt the Progressive "From Lead to Finished Job" scroll-animated one-pager
(`/Volumes/Media 2TB/rejunk-webhook-services/workflow.html`, ~60KB single file,
GSAP/ScrollTrigger, sections s1–s8 + safety + board + glossary) into a PUBLIC
AbeMedia marketing page. Same cinematic look and scroll feel. Sanitized content.

Destination: `web-main` as a new route `src/app/[locale]/how-it-works/page.tsx`
(or keep as a standalone static HTML in `public/` and iframe/link it — builder's
call; prefer native route for SEO). Link from homepage services section.

## What stays (the sell)
- The visual language: dark cinematic stages, big condensed type, orange accents,
  numbered left rail, timeline dots, terminal-style "in real time" log cards.
- The narrative arc: lead arrives at 11:30pm → answered/priced/booked in under a
  minute → humans looped in → follow-ups → booking → job happens → clean books.
- The hero video slot (Abe supplies a public-safe video; placeholder until then).
- "Everything marked LIVE is running in production right now" credibility framing.
- The safety-built-in sidebar concept (nothing lost, humans emailed on unknowns).

## What gets SANITIZED (the secret sauce — do not ship any of this)
1. **No responder internals.** Remove/genericize: the reply formula breakdown
   ("greeting by name → echo job → price → exactly ONE question → real slots"),
   classifier behavior, abstain-to-LLM, truck-required signal, complexity
   triggers, hours_estimate logic, v20 or any version numbers.
2. **No rate card or real prices.** No $95/$120/trip fee/2-hr minimum. Example
   messages use obviously fictional pricing or "$X/hr".
3. **No vendor plumbing specifics.** Generic "the lead platform" / "the CRM" /
   "the calendar" instead of Thumbtack Partner API v4, HCP, webhook auth details,
   timing windows (4h/24h/72h cadence), or booking-link mechanics. Naming the
   *category* is fine; naming the integration recipe is not.
4. **No Progressive-identifying operational data.** No real timestamps from
   production, no crew logic, no budget/refund/audit specifics.
5. **Replace real example replies** (the three scheduling-scenario cards) with
   shortened fictional equivalents that show *outcome*, not the decision tree.

## Reframe: Progressive → AbeMedia case story
- Header brand: abemedia, light/dark aware to match site (or keep dark-only page).
- Subtitle: "A real moving company in Phoenix runs on this today." (Progressive
  can stay named as the case study — Abe's call; default to "a Phoenix moving
  company" and let Abe opt into naming.)
- Each stage keeps its number + LIVE badge but the copy answers "what would
  AbeMedia build for YOU," ending with a CTA stage: "Your industry, same
  machine" → Schedule a Call (reuse ConsultationForm trigger or link /contact).
- Glossary section: keep only public-safe terms (webhook, CRM, booking link).

## Build notes
- If ported to Next: locale-aware copy via messages/ (EN + ES), or ship EN-only
  first and mark ES as follow-up — Abe decides.
- GSAP: check licensing/bundle; the source file's animation JS can be reused.
  If porting is heavy, Phase 1 = sanitized static HTML in `public/how-it-works.html`
  with a nav link, Phase 2 = native route.
- Hero video: slot accepts `/public/video/workflow-hero.mp4`; lazy, muted, loop.
- Test on mobile — source file was likely desktop-first.
- `npm run build` + push; Vercel auto-deploys. Subproject folder
  `abemedia-service-operations-planner` is tsconfig-excluded; keep it that way.

## Acceptance
- [ ] Page live at /how-it-works (or public/ HTML), linked from homepage
- [ ] Zero occurrences of: real rates, reply formula internals, classifier terms,
      version numbers, vendor API names, production timestamps
- [ ] Scroll animation + hero video slot working
- [ ] CTA to Schedule a Call / Contact
- [ ] Build passes, deployed
