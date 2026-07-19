# Decisions

## 2026-07-19 (later) — Gemini live-voice mode removed from /chatbot

**Decision.** Stripped the browser-side Gemini live-voice session from
`ChatbotApp.tsx` (commit e1f6593) so `NEXT_PUBLIC_API_KEY` could be deleted.
The mic button had already been unwired from ChatInput, so the entire voice
path (GoogleGenAI client, audio contexts, LiveSession, audioUtils) was
unreachable dead code. Text chat unaffected — it uses /api/chat (Groq,
server-side key). `@google/genai` dependency dropped; /chatbot bundle
50.5 kB → 2.63 kB. Abe is deleting the env var in Vercel and revoking the
key in Google AI Studio (it shipped in client bundles, so treat as public).
Voice demos are now Maya (web-call widget) and Elena (phone) — if live voice
on /chatbot is ever wanted again, build it against those, not client-keyed
Gemini. Same session: TURNSTILE/STRIPE/RESEND Vercel env vars converted to
Sensitive (Prod+Preview; Vercel disallows Sensitive on Development).


## 2026-07-19 — Public /how-it-works page (sanitized Rejunk workflow showcase)

**Decision.** Adapted the Progressive "From Lead to Finished Job" one-pager
(`rejunk-webhook-services/workflow.html`) into a public native route
`/[locale]/how-it-works` per `PUBLIC_WORKFLOW_SPEC.md`. Kept the cinematic look
(black stage, Big Shoulders display type, orange accents, numbered rail, terminal
log cards, pipeline diagram, LIVE chips) as a CSS module
(`src/components/how-it-works/how-it-works.module.css`) + client component with
the source's IntersectionObserver reveal/scroll-spy logic ported 1:1. Page-scoped
fonts (Big Shoulders / Familjen Grotesk / Spline Sans Mono) load via
`next/font/google` only on this route. Full EN/ES parity under the `HowItWorks`
messages namespace (Spanish authored natively). Homepage services grid links to
it; sitemap updated. Hero video served from `public/video/workflow-hero.mp4`
(already in repo) with an ffmpeg-extracted poster + `preload="none"` +
play-on-intersection, so LCP is a 95 KB jpg, not a 7 MB mp4.

**Reality-vs-spec divergences:**
- Spec said the source page was GSAP/ScrollTrigger; it actually uses plain
  IntersectionObserver + CSS transitions. Ported that directly — no GSAP usage,
  no new dependencies, no licensing question.
- Spec's "three scheduling-scenario cards" were four in the source; shipped three
  fictional ones (open slot / taken slot / no time named) per the sanitize rule.

**Sanitization applied (verified zero occurrences in the new namespace, both locales):**
vendor names → "the lead platform / the calendar / the CRM"; all real rates and
price floors removed; reply-formula breakdown replaced with outcome-level quality
gates; follow-up cadence (4h/24h/72h), business-hours windows, watchdog timing,
refund day-ranges, and version numbers removed or genericized; example replies
rewritten as fictional outcomes; glossary reduced to public-safe terms; status
board kept (credibility framing) but vendor-free. Progressive is NOT named —
"a real Phoenix moving & junk-removal company" per the spec's default; Abe can
opt into naming later. Note: pre-existing homepage copy (FAQ, Rejunk case-study
card) already names Thumbtack/Housecall Pro at a marketing level and is embedded
in every page's message payload — out of scope here, flagged for awareness.

**Implementation choices:**
- CTA stage links to `/contact` rather than mounting ConsultationForm (spec
  allowed either; avoids pulling the modal + Turnstile into this bundle).
- Dark-only page (spec allowed); site navbar/footer stay theme-aware above/below.
- Source footer ("Powered by abemedia" logo) dropped — the page lives inside the
  site shell, which has its own footer.

**Rejected:** static HTML in `public/` (spec preferred native route for SEO);
Tailwind rewrite of the ~600-line stylesheet (CSS module port is lower-risk and
pixel-faithful).

## 2026-07-12 (later) — Scroll-world fly-through abandoned; ship the stills crossfade

**Decision.** The scroll-world video fly-through for the after-hours section was
attempted (skill installed at ~/.claude/skills/scroll-world/, Higgsfield CLI,
architecture A / continuous forward take) and **abandoned by owner decision after
repeated quality failures**. The shipped version is the GSAP ScrollTrigger
crossfade of the three approved stills, with the stacked-mobile and
reduced-motion fallbacks and visible-by-default content.

**Why it failed.** The workspace is on the Higgsfield **starter plan**, which
gates `seedance_2_0` (Pro+); the only usable roster tier was `seedance_2_0_mini`
(720p). Across four video takes, mini (a) corrupted the window signage while
approaching it ("ATRONEY S AT", "PARKER & ASSCIENTS") on two prompt-hardened
takes, and (b) on the frame-locked endpoints take — which held the lettering —
hallucinated building geometry mid-clip (a second front door + duplicate
scales decals at ~5s). Small-text stability and geometry coherence on the
starter tier aren't fixable from the prompt side.

**Salvaged from the attempt:**
- Scene-1 still regenerated per owner spec: gold "PARKER & ASSOCIATES —
  ATTORNEYS AT LAW" window lettering, CLOSED sign removed, glass door with
  scales-of-justice decal. Lettering zoom-verified. Now the repo's
  `scene-1{,-mobile}.webp` and the crossfade's first frame.
- A verified close-up storefront still exists at /tmp/sw-work/still_1_close.png
  if ever needed.

**Retry conditions (if ever).** Upgrade to a Higgsfield plan with `seedance_2_0`
or `kling3_0` access, re-run architecture A with frame-locked endpoints per leg,
and budget for geometry re-rolls. Assets/scripts in /tmp/sw-work (ephemeral).

**Ops gotcha (cost of this session):** `pkill -f "next start"` does NOT kill the
Next production server; the zombie kept port 3000 and served a stale build after
`rm -rf .next && npm run build`, producing ChunkLoadError / "Application error:
a client-side exception" — the blank homepage the owner hit. Kill by port:
`lsof -ti :3000 | xargs kill -9`. Related fix: homepage sections were hidden at
`opacity:0` pending framer-motion `whileInView` — stripped so all content is
visible by default; a JS failure can no longer blank the page below the hero.

## 2026-07-12 — Homepage rebuild: AI agents & operations positioning

**Decision.** Rebuilt the homepage per `HOMEPAGE_REBUILD_SPEC.md`: hero leads with
AI voice agents / after-hours answering ("Call Elena now", tel +1 669 669 4486),
proof bar (17 yrs dispatch, WM LA/recycLA, App Store/Google Play, live platforms),
a scroll-scrubbed 3-scene "after hours" sequence, a 5-card services grid
(websites/chatbots demoted to add-on), retitled agent demo showcase with a graceful
Elena audio player, case studies strip (Saguaro laptop mockup + Rejunk + Waterloo),
founder story, homepage missed-call revenue calculator, rewritten FAQ, and new
footer CTA. All new copy lives in `Home.*` in both `en.json` and `es.json`
(Spanish authored natively). Demo-call CTA clicks log to a new additive Convex
table `demoCallClicks` via `formSubmissions.logDemoCallClick`.

**Reality-vs-spec divergences (spec said → codebase won):**
- Spec referenced a "scroll-world" skill; the installed skill is `scroll-animation`
  (MP4 → frame extraction → canvas). Chose GSAP ScrollTrigger scrub over three
  Higgsfield-generated stills (sticky viewport, crossfade + scale "camera flight")
  instead of extracting hundreds of video frames. Rationale: total asset weight is
  ~207 KB desktop / ~67 KB mobile vs multi-MB frame sets, and the spec explicitly
  blessed the crossfade approach. Assets in `public/images/after-hours/`.
- Spec said namespace keys under `HomePage.*`; the codebase convention is `Home.*`
  (`useTranslations('Home')`). Kept `Home.*`.
- Spec offered "reuse /services route if structure fits" for the Agents nav item;
  the existing /services page is old positioning, so Agents anchors to `/#agents`
  (services grid) instead. `/services` route itself left untouched.

**Implementation choices:**
- Missed-call calculator is a NEW component (`MissedCallCalculator.tsx`) rather
  than a mode prop threaded through the 535-line `ROICalculator.tsx` — less
  invasive; `/calculator` route verified untouched and working.
- `AfterHoursScroll.tsx` has three variants chosen at mount: pinned GSAP scrub
  (desktop), stacked in-view fades (mobile — sturdier than pinning on touch),
  static single image + stacked captions (`prefers-reduced-motion`). Dynamic
  import `ssr:false`; verified the scene images do not appear in initial HTML,
  so hero LCP is unaffected.
- `HomeFaq` and `ChatDemoShowcase` were hardcoded English; converted to next-intl
  as part of the copy rewrite (8 FAQ items now, was 10).
- `ScheduleCallButton` gained an optional `label` prop (default "SCHEDULE A CALL")
  because the hardcoded label was visibly English on the Spanish hero. All other
  call sites unchanged.
- Elena audio player probes `/audio/elena-demo.mp3`, `/audio/elena.mp3`,
  `/audio/elena-call.mp3` via HEAD + audio content-type check; renders nothing
  until an mp3 is dropped into `public/audio/` (dir created with .gitkeep).
- Kept the testimonials marquee and client-logo marquee (social proof) even though
  the spec's section list didn't mention them; dropped `PartnerSteps`,
  BilingualServices, "What the chatbot does" cards, and the calculator-CTA banner.
- Close-rate prefills by industry (law 25%, HVAC 50%, plumbing 55%, turf 40%,
  dental 45%, other 40%) are starting points exposed as a user-adjustable slider,
  not trusted constants.

**Rejected:**
- Twilio/SMS callback — hard constraint in spec (no A2P). Nothing SMS-related
  was added; follow-up is manual, stated in hero microcopy.
- MP4→frames flip-book (weight, and no source video existed).
- Editing `ROICalculator.tsx` (risk to /calculator for zero benefit).

**Constraints / open risks:**
- ~~`demoCallClicks` schema is pushed to the **dev** Convex deployment only~~
  **Resolved 2026-07-12:** deployed to production (cheerful-dinosaur-946) with
  owner approval and verified end-to-end — a live-site hero click logged
  `{locale: en, source: hero}` to the prod table; test rows cleaned up.
  Note: the Vercel build does NOT run `convex deploy` — future Convex schema/
  function changes must be deployed manually with `npx convex deploy`.
- Elena recordings not yet present; player is invisible until mp3s are dropped in.
- Lighthouse not run headlessly; LCP protection verified structurally
  (SSR hero text + no scroll assets in initial HTML + dynamic ssr:false imports).
- Old message keys (BilingualServices, Features, Benefits, CalculatorCTA) were
  deleted from both locales — only HomePage consumed them (verified by grep).
