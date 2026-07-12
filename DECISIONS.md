# Decisions

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
- `demoCallClicks` schema is pushed to the **dev** Convex deployment
  (dev:content-buffalo-738). Production gets it on the next `npx convex deploy`
  (Vercel pipeline). Until then prod clicks would fail the mutation — the call
  is fire-and-forget with a swallowed catch, so the tel: link still works.
- Elena recordings not yet present; player is invisible until mp3s are dropped in.
- Lighthouse not run headlessly; LCP protection verified structurally
  (SSR hero text + no scroll assets in initial HTML + dynamic ssr:false imports).
- Old message keys (BilingualServices, Features, Benefits, CalculatorCTA) were
  deleted from both locales — only HomePage consumed them (verified by grep).
