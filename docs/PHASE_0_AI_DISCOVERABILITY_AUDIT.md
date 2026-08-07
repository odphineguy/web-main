# Abe Media AI Discoverability — Implementation Handoff

**Audit date:** August 6, 2026  
**Implementation status:** Complete and verified locally and in production  
**Production status:** Released August 6, 2026

## Outcome

The Phase 0 technical foundation and the required English Phase 1 information architecture in `Abe_Media_AI_Discoverability_Spec_v2.md` are live at `https://abemedia.online`. The release resolves crawler policy, permanent redirects, canonical metadata, sitemap quality, raw-HTML metadata, structured data, incomplete Spanish-page indexing, browser-agent accessibility defects, positioning, retrieval coverage, and lead attribution.

The release adds six evidence-based service pages, six experience-based industry pages, three new public-safe case studies, a founder profile, a central FAQ, one original dispatch guide, and a factual `/llms.txt` convenience index. Spanish detail pages were not generated as thin translations; they remain absent until native adaptations are ready.

## Pre-release production baseline

### Origin and URL behavior

- Production `/robots.txt` contains Cloudflare-managed restrictions prepended to the origin policy, producing contradictory instructions.
- `/`, `/services`, `/portfolio`, `/pricing`, `/calculator`, and other nonlocalized routes currently use temporary 307 redirects.
- The production sitemap exposes 28 URLs, including incomplete Spanish counterparts.
- Metadata was streamed into the document body for ordinary user agents, making descriptions and related metadata less reliable for HTML-only retrieval clients.

### Cloudflare dashboard (read-only inspection)

The `abemedia.online` zone is on the Free plan. The following was the read-only baseline recorded before the approved release.

- Managed `robots.txt`: **On**.
- Legacy **Block AI bots**: **On**, configured for all pages.
- Bot Fight Mode: **On**.
- JavaScript Detections: **On**.
- WAF custom rules: **0 of 5**.
- Rate-limiting rules: **0 of 1**.
- Managed WAF rules: none configured.
- AI Crawl Control showed Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, PerplexityBot, and Perplexity-User individually unblocked.
- Claude-User, GPTBot, and ClaudeBot appeared blocked by the legacy global AI-bot setting.
- The AI Crawl Control overview showed 109 requests in the prior 24 hours: 92 allowed and 17 unsuccessful. The dashboard included successful traffic from ChatGPT-User, OAI-SearchBot, Claude-SearchBot, and Claude-User.

Direct production requests with spoofed crawler user agents produced a mixture of 200 and 403 responses. Those requests do **not** originate from verified provider IP ranges, so they are useful evidence of challenge behavior but not proof that a provider's verified crawler is blocked. Cloudflare's own event data is the stronger source for verified-bot behavior.

## Implemented changes

### Crawler policy

`public/robots.txt` now implements the owner-approved Option B:

- Allows public crawling and user-directed retrieval.
- Explicitly allows OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Googlebot, and Bingbot.
- Disallows `/api/` without blocking `/_next`, scripts, styles, fonts, or images.
- Declines the training-oriented GPTBot, ClaudeBot, and Google-Extended crawlers.
- Publishes one canonical sitemap location.

### Redirect and retirement map

Query parameters are preserved on redirects.

| From | To | Status |
| --- | --- | --- |
| `/` | `/en` | 308 |
| `/services` | `/en/services` | 308 |
| `/services/bilingual-web-development` | `/en/services/bilingual-web-development` | 308 |
| `/services/ai-chatbots`, `/en/services/ai-chatbots`, `/es/services/ai-chatbots` | `/en/services/ai-voice-agents` | 308 |
| `/services/brand-identity` | `/en/services/brand-identity` | 308 |
| `/platforms` | `/en/platforms` | 308 |
| `/how-it-works` | `/en/how-it-works` | 308 |
| `/portfolio` | `/en/portfolio` | 308 |
| `/portfolio/mylabcompliance` | `/en/portfolio/mylabcompliance` | 308 |
| `/portfolio/saguarotransport` | `/en/portfolio/saguarotransport` | 308 |
| `/pricing` | `/en/pricing` | 308 |
| `/calculator` | `/en/calculator` | 308 |
| `/bilingual-seo-phoenix` | `/en/bilingual-seo-phoenix` | 308 |
| `/contact` | `/en/contact` | 308 |
| `/chatbot` | `/en/chatbot` | 308 |
| New nonlocalized service, industry, founder, FAQ, guide, and case-study paths | Matching `/en/...` route | 308 |
| `/blog`, `/resources`, and localized/descendant variants | — | 410 |

The obsolete `/resources` → `/blog` redirect chain was removed.

### Canonicals, metadata, and internationalization

- Canonical, Open Graph, Twitter, and robots metadata are generated consistently.
- Complete titles are absolute, preventing duplicate `| Abe Media | Abe Media` suffixes.
- Metadata is emitted in the initial document head for all clients via Next.js `htmlLimitedBots`.
- English and Spanish pages receive reciprocal hreflang only when both are complete equivalents.
- Incomplete Spanish variants are `noindex,follow`, have no misleading hreflang pair, and are excluded from the sitemap.
- Route-specific metadata was added or corrected for services, pricing, calculator, portfolio, and other audited pages.
- Portfolio positioning now describes software portfolio and case studies rather than website-design previews.
- Internal links retain the active locale where a real equivalent exists.

### Retrieval content and information architecture

- Six core services: AI voice agents, dispatch/operations platforms, lead-pipeline automation, AI estimating, bilingual AI automation, and custom business software.
- Six industries: logistics/transportation, junk removal, artificial turf/landscaping, home services, waste management/commercial hauling, and moving companies.
- Founder profile connecting Abe Perez, Abe Media, Abevision LLC, Phoenix, 17 years at Waste Management, and selected work.
- New public-safe Rejunk, anonymized artificial-turf AI design-studio, and Elena case studies alongside the existing Saguaro Transport and MyLabCompliance pages.
- Central FAQ answering price, bilingual ability, integrations, escalation, pilots, build-vs-buy, ownership, monitoring, and fit.
- Original guide on designing dispatch software for blocked stops, access problems, contamination, overweight containers, wrong locations, and operational ownership.
- `/llms.txt` is a factual convenience index with canonical links and an explicit instruction to verify claims on the HTML pages.

### Sitemap

The sitemap now contains 37 canonical, public, indexable URLs with truthful route-specific `lastmod` values:

1. `https://abemedia.online/en`
2. `https://abemedia.online/es`
3. `https://abemedia.online/en/services`
4. `https://abemedia.online/es/services`
5. `https://abemedia.online/en/services/bilingual-web-development`
6. `https://abemedia.online/en/services/brand-identity`
7. `https://abemedia.online/en/platforms`
8. `https://abemedia.online/en/how-it-works`
9. `https://abemedia.online/es/how-it-works`
10. `https://abemedia.online/en/portfolio`
11. `https://abemedia.online/en/portfolio/mylabcompliance`
12. `https://abemedia.online/en/portfolio/saguarotransport`
13. `https://abemedia.online/en/pricing`
14. `https://abemedia.online/es/pricing`
15. `https://abemedia.online/en/calculator`
16. `https://abemedia.online/es/calculator`
17. `https://abemedia.online/en/bilingual-seo-phoenix`
18. `https://abemedia.online/en/contact`
19. `https://abemedia.online/en/industries`
20. `https://abemedia.online/en/about/abe-perez`
21. `https://abemedia.online/en/faq`
22. `https://abemedia.online/en/guides/dispatch-software-real-exceptions`
23. `https://abemedia.online/en/services/ai-voice-agents`
24. `https://abemedia.online/en/services/dispatch-operations-platforms`
25. `https://abemedia.online/en/services/lead-pipeline-automation`
26. `https://abemedia.online/en/services/ai-estimating-tools`
27. `https://abemedia.online/en/services/bilingual-ai-automation`
28. `https://abemedia.online/en/services/custom-business-software`
29. `https://abemedia.online/en/industries/logistics-transportation`
30. `https://abemedia.online/en/industries/junk-removal`
31. `https://abemedia.online/en/industries/artificial-turf-landscaping`
32. `https://abemedia.online/en/industries/home-service-businesses`
33. `https://abemedia.online/en/industries/waste-management-commercial-hauling`
34. `https://abemedia.online/en/industries/moving-companies`
35. `https://abemedia.online/en/portfolio/rejunk`
36. `https://abemedia.online/en/portfolio/artificial-turf-ai-design-studio`
37. `https://abemedia.online/en/portfolio/elena-ai-voice-agent`

### Entity and structured data

- Sitewide `Organization` schema identifies Abe Media, Abevision LLC as the parent organization, founder Abe Perez, Phoenix/Arizona, nationwide service, existing verified social URLs, contact details, and the approved service/knowledge categories.
- The owner-approved public address is `2026 W Colter St, Phoenix, AZ 85015`; it is present on the contact page and in organization schema.
- The owner-approved business phone is `626-735-6216`.
- `WebSite` references the canonical organization entity.
- The exact visible homepage FAQ is server-rendered and paired with `FAQPage` schema.
- New pages add visible, matching `Service`, `Article`, `WebPage`, `ProfilePage`, `Person`, `BreadcrumbList`, and `FAQPage` data.
- JSON-LD output is escaped safely.
- The footer visibly states that Abe Media is owned and operated by Abevision LLC.

### Browser-agent and accessibility fixes

- Replaced audited clickable nonsemantic containers with buttons.
- Added explicit visible labels, IDs, names, autocomplete hints, and associated error text to calculators.
- Improved heading order, link localization, focusable controls, transcript-seek semantics, and light/dark color contrast.
- Removed the client-only FAQ boundary so important FAQ text is present in raw HTML.

### Lead attribution and data safety

- Contact and consultation forms now ask “How did you hear about Abe Media?” and record the first-touch source, campaign, and landing path.
- Only recognized attribution values and the URL path are retained; full query strings are not stored.
- API routes apply runtime type/length validation, reject oversized requests, verify Turnstile, and explicitly select permitted fields.
- Form persistence now requires a server-only secret shared between the Next.js API and Convex.
- Previously public admin queries for lead and chatbot records now require an authenticated allowlisted admin identity.
- Anonymous chatbot messages are scoped to a cryptographically random session token, message roles/lengths are validated, and AI request history/body sizes are capped.
- Demo-call click attribution moved from an anonymously writable Convex mutation to Vercel Analytics.

### Changed-file summary

- **Crawler and URL foundation:** `public/robots.txt`, `next.config.ts`, `src/middleware.ts`, `src/app/sitemap.ts`, and `src/lib/seo.ts`.
- **Entity and site shell:** localized root layout, navigation, footer messages, and positioning metadata.
- **Retrieval content:** `src/content/discoverability.ts`, the shared `DiscoverabilityPage` component, six dynamic service routes, six dynamic industry routes plus the industry hub, three new portfolio case-study routes, founder, FAQ, dispatch guide, and `public/llms.txt`.
- **Existing content alignment:** services and portfolio indexes, home case-study links, route metadata, internal locale-aware links, and stale portfolio/service wording.
- **Accessibility:** homepage FAQ rendering, calculators, transcript controls, semantic buttons, heading order, and contrast tokens.
- **Attribution and security:** contact/consultation forms and APIs, first-touch capture, Convex schema and access controls, chatbot session ownership/input limits, and Vercel Analytics demo-call events.
- **Handoff:** this audit and release checklist.

## Verification results

| Check | Result |
| --- | --- |
| `npm run build` | Pass |
| `npx tsc --noEmit` | Pass |
| `npm run lint` | Pass with pre-existing nonblocking warnings |
| `git diff --check` | Pass |
| Local sitemap audit | 37/37 URLs return 200 directly |
| Canonicals/indexability | 37/37 pass |
| Internal-link crawl | No broken internal route found across all 37 pages |
| H1 count | Exactly one on all 37 sitemap URLs |
| Metadata descriptions | Present in initial `<head>` on all 37 URLs |
| Duplicate brand suffixes | None |
| JSON-LD parse | Pass; all nine expected schema types found |
| Homepage FAQ in raw HTML | Pass |
| Incomplete Spanish pages | `noindex,follow`; no false hreflang pair |
| Required crawler UAs locally | 200 for all eight search/retrieval agents |
| Retired `/blog` and `/resources` variants | 410 |
| Lighthouse `/en` | Accessibility 100; SEO 92 locally |
| Lighthouse `/en/services` | Accessibility 100; SEO 92 locally |
| Lighthouse `/en/calculator` | Accessibility 100; SEO 92 locally |
| Lighthouse `/en/contact` | Accessibility 100; SEO 100 locally |
| Lighthouse new service template | Accessibility 100; SEO 100 |
| Lighthouse founder template | Accessibility 100; SEO 100 |
| Lighthouse waste-industry template | Accessibility 100; SEO 100 |

The only SEO audit failure on the first three local URLs was the expected canonical-host mismatch: the local server intentionally declares the production `https://abemedia.online/...` canonical. Lighthouse accessibility uses axe-core checks; the audited pages passed those automated checks.

## Production release and verification

The owner approved the coordinated release on August 6, 2026. It completed in dependency order:

1. A strong shared `FORM_SUBMISSION_SECRET` was configured as a sensitive Vercel Production/Preview variable and as a Convex production variable. `ADMIN_EMAIL` was set to the authorized admin identity.
2. Convex schema and functions were deployed successfully to `cheerful-dinosaur-946` before the application release.
3. The tested Vercel build, including the owner-requested removal of the homepage after-hours image sequence, was promoted to production as deployment `dpl_7dxzs51kWmzqmaptFi7HyFkuVJsL`; `abemedia.online` and `www.abemedia.online` resolve to that READY deployment.
4. Cloudflare Managed `robots.txt` and its managed content-signal preamble were disabled, leaving the origin policy as the single public policy.
5. The deprecated legacy global **Block AI bots** setting was disabled.
6. Cloudflare's current behavior controls were configured to **block Training**, **allow Search**, and **allow Agent** traffic. This implements the approved intent more robustly than two user-agent-only rules: training crawlers, including GPTBot and ClaudeBot, are declined while search and user-directed retrieval agents remain allowed. Google-Extended is also declined in the origin policy.
7. Bot Fight Mode and JavaScript Detections remain enabled. Their real verified-crawler events should be reviewed during the 30-day monitoring window; spoofed user-agent requests are not conclusive evidence of verified-provider behavior.

| Production check | Result |
| --- | --- |
| Public sitemap | 37 URLs; 37/37 return 200 directly |
| Redirects | 308 targets and query preservation verified |
| Retired `/blog` and `/resources` | 410 verified |
| Public `robots.txt` | Origin policy only; no Cloudflare-managed preamble |
| Cloudflare behavior policy | Training blocked; Search and Agent allowed |
| Cloudflare legacy global AI block | Disabled |
| Bot Fight Mode / JavaScript Detections | Enabled / enabled |
| Corrected address and phone | Present in production HTML |
| Artificial-turf case | Anonymous wording and URL verified; prohibited client name absent |
| Founder tenure | Exactly 17 years at Waste Management |
| Contact API without Turnstile | Rejected with 400; no lead created |
| Production runtime errors / 5xx after release | None found in Vercel logs |

The available Cloudflare rate-limiting slot was not activated without an observed safe threshold. If enforcement is desired later, start with reporting/observation for `/api/chat` and `/api/checkout`, then choose a threshold from normal production traffic rather than guessing during release.

The remaining external publication work is to submit the cleaned sitemap in Google Search Console and Bing Webmaster Tools, then add IndexNow only after its production credentials and implementation are validated.

Relevant current platform documentation:

- Cloudflare Managed robots.txt: <https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/>
- Cloudflare Block AI Bots: <https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/>
- Cloudflare Bot Fight Mode: <https://developers.cloudflare.com/bots/get-started/bot-fight-mode/>
- Cloudflare AI Crawl Control: <https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-bots/>
- Cloudflare rate-limiting rules: <https://developers.cloudflare.com/waf/rate-limiting-rules/>
- Next.js `htmlLimitedBots`: <https://nextjs.org/docs/app/api-reference/config/next-config-js/htmlLimitedBots>

## Owner-approved publication facts

On August 6, 2026, Abe approved the implementation and clarified:

- Public address: `2026 W Colter St, Phoenix, AZ 85015`; the former Camelback Road address must not appear.
- Business phone: `626-735-6216`; Elena remains a separate live-demo number at `669-669-4486`.
- Founder tenure: exactly **17 years at Waste Management**, not “17+” or 20 years.
- Rejunk may remain named publicly.
- The artificial-turf client may not yet be named. All public wording and the URL use **“AI Design Studio for an Artificial Turf Franchise.”**
- The remaining existing facts, metrics, positioning, nationwide service area, and implementation were approved.

The Clutch URL must still be added only after the profile is published. Any future client testimonial, new metric, private screenshot, or white-label attribution needs its own permission.

## Deliberately deferred

- Search Console, Bing Webmaster Tools, and IndexNow submission.
- Cloudflare rate-limit enforcement until a safe threshold is established from normal traffic.
- Native Spanish adaptations of the new English detail pages.
- Additional authority guides beyond the dispatch-exceptions anchor article.
- Clutch, Google Business Profile, LinkedIn, app-store, review, and client-link changes that require external coordination or publication approval.
- A recurring 30/60/90-day crawler, indexing, referral, lead, and revenue report; configure after production data sources are connected.

Unrelated pre-existing user changes in `Comprehensive SEO Evaluation Report for abemedia.online Pt1.md`, `.memsearch/memory/2026-07-19.md`, and the untracked source spec were preserved.
