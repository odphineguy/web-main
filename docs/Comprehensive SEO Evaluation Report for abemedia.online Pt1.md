# Abe Media AI Discoverability & Agent Accessibility Implementation Spec

**Prepared for:** Abe Media / Abe Perez

**Website:** https://abemedia.online/en

**Date:** August 6, 2026 (v2 — revised with owner decisions: bilingual EN/ES confirmed, Abevision LLC entity confirmed, waste management & moving industry pages added)

**Primary implementation environment:** Existing Next.js website

**Audience:** ChatGPT coding agent, developer, technical SEO implementer, and content editor

---

## 1. Handoff prompt for the ChatGPT coding app

Attach this document to the Abe Media repository and give the coding agent this instruction:

> Act as a senior Next.js engineer, technical SEO specialist, accessibility engineer, and content architect. Read the attached **Abe Media AI Discoverability & Agent Accessibility Implementation Spec** completely before changing anything.
>
> First inspect the repository, current routes, metadata implementation, redirects, robots generation, sitemap generation, structured data, Cloudflare-related configuration, analytics, and tests. Compare the code to the audit findings in the spec and report any differences.
>
> Implement the work in phases. Complete and verify Phase 0 before starting new content pages. Preserve the current design system, bilingual functionality, working integrations, and unrelated user changes. Do not invent client results, credentials, testimonials, pricing, addresses, team size, or project ownership. Use TODO markers where business facts require Abe's approval.
>
> Do not mass-generate location pages or hundreds of templated pages. The goal is a smaller set of original, evidence-backed pages built from Abe's real operational experience and production work.
>
> Before deployment, provide: changed-file summary, redirect map, crawler test results, sitemap URL list, schema validation results, Lighthouse results, automated test results, and all content claims requiring approval. Do not deploy or publish without approval.

---

## 2. Objective

Make Abe Media easier for ChatGPT Search, Claude, Perplexity, Google/Bing AI search experiences, traditional search engines, and browser-based agents to:

1. Discover and crawl.
2. Identify as a real Phoenix-based business and connect it to founder Abe Perez.
3. Understand its exact services, industries, differentiators, and proof.
4. Retrieve specific Abe Media pages for relevant buyer questions.
5. Navigate the website and complete user-approved actions through semantic, accessible interfaces.
6. Cite Abe Media confidently using consistent first-party facts supported by independent profiles and reviews.

This project does **not** guarantee rankings, citations, or leads. It improves eligibility, clarity, retrieval coverage, credibility, and measurable conversion paths.

---

## 3. Current audit findings

The following findings were observed on August 6, 2026 and must be verified against the repository before implementation.

### 3.1 Discoverability gap

- Abe Media exposes 28 sitemap URLs: 14 English pages and 14 Spanish equivalents.
- The comparison site exposes 578 URLs across 15 sitemaps, including service, industry, expertise, location, FAQ, blog, and founder pages.
- Page count alone is not the goal. The important gap is that Abe Media lacks dedicated pages for several services and use cases already promoted on its homepage.

### 3.2 Positioning inconsistency

- The homepage positions Abe Media around AI voice agents, dispatch platforms, lead-pipeline automation, custom apps, and bilingual service-business automation.
- Existing service metadata still emphasizes web development, chatbots, mobile apps, and brand identity.
- The portfolio metadata and headings contain older positioning. The portfolio H1 was observed as “Website Design Previews,” even though the strongest work is operational software and AI automation.
- Search and retrieval systems receive conflicting signals about what Abe Media primarily sells.

### 3.3 Temporary redirects and duplicate discovery

- `/` redirects to `/en` with HTTP 307.
- Older nonlocalized paths such as `/portfolio` and `/services` redirect to English paths with HTTP 307.
- Search results still show old and localized variants. Temporary redirects do not communicate permanent consolidation as clearly as 301/308 redirects.

### 3.4 Robots and Cloudflare conflict

- The current robots response includes Cloudflare-managed content that blocks several AI crawlers, followed by custom rules that attempt to allow some of the same crawlers.
- `OAI-SearchBot` is not explicitly named, although wildcard rules appear to allow it.
- The file mixes crawler groups and path rules in a way that is difficult to audit and may be interpreted differently across crawlers.
- Cloudflare documentation confirms that its managed robots feature prepends AI crawler restrictions to an origin robots file. The dashboard setting and the origin file must be coordinated instead of contradicting each other.

### 3.5 Limited entity and authority signals

- Homepage structured data currently provides basic `Organization`, `WebSite`, `ContactPoint`, and `ImageObject` information.
- There is no strong founder/entity page connecting Abe Perez, Abe Media, Abevision LLC, Phoenix, operational experience, social profiles, and published project work.
- The new Clutch profile is under review and should be linked only after publication.
- Independent mentions and verified reviews are limited.

### 3.6 Limited case-study coverage

- Existing detailed pages cover MyLabCompliance and Saguaro Transport.
- Rejunk, Waterloo Turf, the Elena voice-agent demo, lead automation, and other production work are mentioned briefly but lack complete, retrievable case-study pages.
- Public claims must accurately describe Abe Media's role and respect client agreements, confidentiality, and white-label arrangements.

### 3.7 Missing AI discovery file

- `/llms.txt` currently returns 404.
- This file may be added as a convenience for systems that choose to use it, but it must not be treated as a ranking mechanism. Google explicitly states that Google Search ignores `llms.txt` for ranking and generative AI visibility.

---

## 4. Guiding principles

1. **Search eligibility before “AI hacks.”** Correct crawling, canonical URLs, useful text, internal links, and independent trust matter more than special prompt files.
2. **Real expertise is Abe Media's moat.** Content should use Abe's 17+ years of dispatch and operations experience, bilingual ability, and production projects—not generic summaries of AI topics. (Owner decision, settled 2026-08-06: bilingual EN/ES is CONFIRMED as a core differentiator and stays. Do not relitigate. Spanish rollout follows the quality gates in 6.8 — native adaptation, no thin placeholders.)
3. **One page per meaningful buyer intent.** Do not create near-duplicate pages for every keyword or city.
4. **Visible content and machine-readable content must agree.** Never place claims only in JSON-LD or hidden text.
5. **Search/retrieval access is separate from model training.** Allow search and user-request crawlers. Make an explicit owner decision about training crawlers.
6. **Accessible to humans means accessible to browser agents.** Use semantic HTML, stable interfaces, labeled forms, and visible state changes.
7. **No invented proof.** Every metric, client name, role, testimonial, price, integration, and credential must be verifiable.

---

## 5. Scope and priority

## Phase 0 — Technical foundation (highest priority)

Complete this phase before publishing new pages.

### 5.1 Resolve Cloudflare crawler controls

Inspect:

- Cloudflare Managed `robots.txt` setting.
- Cloudflare AI Crawl Control actions.
- Bot Fight Mode, WAF custom rules, rate limits, and browser challenges.
- Origin `robots.txt` generation in Next.js.

Required behavior:

- Search and user-directed retrieval crawlers must receive the same public page content as normal anonymous visitors.
- Verified bots must not receive CAPTCHA, JavaScript challenge, 403, 429, or blank HTML on public marketing pages.
- Allow verified crawler IP ranges where the WAF requires it. Use each provider's current official published ranges; do not hard-code stale copied lists without an update process.
- Disable Cloudflare's managed robots feature if it continues prepending rules that contradict the owner-approved policy. Serve one clear, auditable robots policy.

### 5.2 Replace robots.txt with an intentional policy

Default recommended policy: allow search/retrieval and user-request agents; keep model-training permission as a separate owner decision.

```txt
User-agent: *
Allow: /
Disallow: /api/

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Owner decision: training crawlers.
# Option A — allow maximum public reuse:
# User-agent: GPTBot
# Allow: /
# User-agent: ClaudeBot
# Allow: /
# User-agent: Google-Extended
# Allow: /

# Option B — allow search/retrieval but decline model training:
User-agent: GPTBot
Disallow: /
User-agent: ClaudeBot
Disallow: /
User-agent: Google-Extended
Disallow: /

Sitemap: https://abemedia.online/sitemap.xml
```

Implementation notes:

- Confirm the final production response, not only the repository file.
- Do not block `/_next/`, CSS, JavaScript, fonts, images, or other resources needed to render public pages.
- `OAI-SearchBot`, not `GPTBot`, controls eligibility for ChatGPT Search discovery.
- `Claude-SearchBot` and `Claude-User` are distinct from the training-oriented `ClaudeBot`.
- Google Search AI features use ordinary Google Search eligibility and Googlebot; `Google-Extended` is a separate control.
- If Option B is selected, explain that it protects against indicated training uses but does not reduce intentional search access.
- **Owner decision: implement Option B** (allow search/retrieval and user-request agents; disallow GPTBot, ClaudeBot, Google-Extended training crawlers). This is the standard commercial default and can be revisited later without penalty.

### 5.3 Permanent redirect and canonical cleanup

Change permanent locale and legacy-route redirects from 307 to 308 or 301.

Minimum redirect map:

| From | To | Status |
| --- | --- | --- |
| `/` | `/en` | 308 |
| `/services` | `/en/services` | 308 |
| `/portfolio` | `/en/portfolio` | 308 |
| `/pricing` | `/en/pricing` | 308 |
| `/calculator` | `/en/calculator` | 308 |
| `/contact` | `/en/contact` | 308 |
| Any retired service URL | Closest exact replacement | 308 |

Requirements:

- Every indexable page returns 200 directly without an avoidable redirect chain.
- Every page has one self-referencing canonical URL.
- English and Spanish counterparts use reciprocal `hreflang="en"`, `hreflang="es"`, and a deliberate `x-default`.
- Old URLs are excluded from the sitemap.
- Do not redirect unrelated expired pages to the homepage. Use a relevant replacement or 410/404.

### 5.4 Sitemap cleanup

- Generate the sitemap from canonical, public, indexable routes only.
- Include accurate `lastmod` values when content actually changes; do not rewrite every date on every deployment.
- Include new service, industry, case-study, founder, FAQ, and guide pages as they are published.
- Keep one sitemap until scale requires an index. Hundreds of artificial pages are not a success metric.
- Submit the sitemap to Google Search Console and Bing Webmaster Tools.
- Add IndexNow for newly published, updated, redirected, or deleted URLs if the current hosting stack can support it safely.

### 5.5 Server-rendered, indexable content

- Important page text, headings, navigation, proof, FAQs, pricing context, and links must appear in the initial server-rendered HTML.
- Do not require clicks, scrolling, client-side fetching, or animation completion to reveal primary content.
- Preserve useful content when JavaScript is unavailable.
- Avoid rendering “Loading…” as the only server-side representation of dynamic sections.

### 5.6 Metadata cleanup

For every indexable page:

- One unique, descriptive `<title>` without duplicated suffixes such as `| Abe Media | Abe Media`.
- One accurate meta description.
- One visible H1 aligned with the page's primary purpose.
- Open Graph and social metadata using a canonical image.
- Correct `robots` meta tag: normally `index,follow,max-image-preview:large` for public marketing content.
- No stale metadata from the prior websites/chatbots positioning.

### 5.7 Core structured data

Use valid JSON-LD that matches visible content.

| Page type | Recommended schema |
| --- | --- |
| Sitewide/home | `Organization` or appropriate `ProfessionalService`, `WebSite` |
| Founder page | `ProfilePage` + `Person` |
| Service page | `Service` + provider reference |
| Case study/guide | `Article` with author, dates, about, and image |
| Navigation hierarchy | `BreadcrumbList` |
| FAQ sections | `FAQPage` only when the exact questions and answers are visible |

Organization/entity requirements:

- Public brand: Abe Media.
- Legal relationship: “Abe Media is owned and operated by Abevision LLC.” CONFIRMED — this entity naming was established during Apple App Store review and is the accepted legal/public relationship; use it consistently across schema, About, Clutch, GBP, and app-store developer pages. (Owner note: verify the exact registered LLC name against the Arizona/California filing once, then treat as canonical everywhere.)
- Founder: Abe Perez.
- Location: Phoenix, Arizona; do not publish a private street address unless intended.
- `areaServed`: United States/nationwide if accurate.
- Consistent phone, logo, URL, and verified social/profile links.
- Add the Clutch URL to `sameAs` only after the profile is published.
- Do not add self-serving aggregate ratings or reviews unless markup is fully compliant, visible, and supported.

### 5.8 Phase 0 acceptance criteria

- Public robots response contains no contradictory groups.
- OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Googlebot, and Bingbot receive HTTP 200 on key pages without a challenge.
- Root and legacy URLs return 301/308 to canonical localized routes.
- All sitemap URLs return 200, are canonical, and are indexable.
- No duplicated title suffixes.
- No page has multiple H1 elements unless an intentional accessible structure requires it.
- JSON-LD parses without errors and matches visible content.
- Primary text is present in raw HTML.

---

## Phase 1 — Positioning and information architecture

### 6.1 Positioning statement

Use one consistent description across the homepage, Clutch, organization schema, social profiles, and About page:

> Abe Media builds AI agents, dispatch software, and bilingual automation for service businesses. Its work includes AI voice agents, operations platforms, lead-pipeline integrations, AI estimating tools, and custom applications grounded in real dispatch and operations experience.

Edit for tone and length by surface, but preserve the same core entity and service categories.

### 6.2 Recommended primary navigation

- Services
- Industries
- Case Studies
- How It Works
- Pricing
- About Abe
- Contact

Keep the calculator as a contextual tool and internal-link destination rather than allowing it to confuse the primary business positioning.

### 6.3 Required service pages

Create or substantially rewrite these English pages first:

1. `/en/services/ai-voice-agents`
   - AI answering, qualification, booking, transfer/escalation, CRM logging, after-hours coverage, and bilingual flows.
2. `/en/services/dispatch-operations-platforms`
   - Dispatch boards, fleet/driver workflows, SOP enforcement, customer communication, status tracking, and operational reporting.
3. `/en/services/lead-pipeline-automation`
   - Lead intake, webhooks, qualification, quoting, follow-up, booking, CRM sync, retries, monitoring, and exception handling.
4. `/en/services/ai-estimating-tools`
   - Photo intake, AI visualization, estimates, PDF output, CRM lead creation, and human approval where required.
5. `/en/services/bilingual-ai-automation`
   - Native English/Spanish customer journeys, language switching, culturally appropriate copy, call flows, forms, and SEO.
6. `/en/services/custom-business-software`
   - Internal tools, dashboards, portals, integrations, mobile/driver apps, and phased production delivery.

Retain or redirect older service routes based on content overlap. Do not leave two pages competing for the same intent.

### 6.4 Required industry/use-case pages

Only publish pages with direct experience and unique material:

1. `/en/industries/logistics-transportation`
2. `/en/industries/junk-removal`
3. `/en/industries/artificial-turf-landscaping`
4. `/en/industries/home-service-businesses`
5. `/en/industries/waste-management-commercial-hauling` — anchored in Abe's 17+ years at Waste Management, including dispatch operations management for recycLA (300+ vehicles, LA city franchise). This is the single most defensible industry page on the site: route/dispatch exceptions, container logistics, contamination workflows, franchise compliance reporting, driver operations. No competitor can write this page.
6. `/en/industries/moving-companies` — grounded in the Progressive Transportation Services moving/labor work and the Pricebook flat-rate estimating engine.

Each page must contain industry-specific workflows, exceptions, integrations, screenshots/diagrams, buyer questions, and proof. Do not swap industry names into a generic template.

### 6.5 Founder and company pages

Create `/en/about/abe-perez` containing:

- Abe Perez's role and Phoenix location.
- 17+ years of dispatch/operations experience, using the exact approved number everywhere.
- Waste Management experience described accurately and without implying current affiliation — include Dispatch Operations Manager role, Southern California market, recycLA franchise scale (300+ vehicles, 27 direct reports) as approved facts; use identical figures everywhere they appear.
- Size and type of teams managed, if approved.
- Bilingual English/Spanish experience.
- Production systems and apps built.
- Personal perspective on why operational software fails.
- Links to case studies, verified profiles, and public apps.
- `ProfilePage` and `Person` schema.

Update the company About content to explain Abe Media, Abevision LLC, the operating model, geography, engagement method, and truthful team size. Avoid presenting a large “team” if the business is founder-led with contractors.

### 6.6 Case-study expansion

Keep existing case-study URLs where they have search equity. Add complete pages for approved projects:

- Saguaro Transport.
- Rejunk.
- Waterloo Turf AI estimator.
- Elena bilingual AI voice agent.
- MyLabCompliance.

Required case-study structure:

1. Client/business context.
2. The operational problem.
3. Abe Media's exact role.
4. Constraints and edge cases.
5. System architecture at a safe, nonconfidential level.
6. What was delivered.
7. Integrations.
8. Evidence: screenshots, demo, timeline, metrics, or testimonial.
9. Results with methodology and time period.
10. What the project demonstrates for similar buyers.
11. Related service and industry links.

If a project was white-labeled or shared with another company, state Abe Media's role precisely and obtain approval before publishing names, screenshots, or attribution.

### 6.7 FAQ and buyer-question coverage

Create a central `/en/faq` and place relevant visible FAQs on service pages. Start with questions real buyers ask:

- What does an AI voice agent cost?
- Can the agent speak English and Spanish naturally?
- Can it book jobs and update an existing CRM?
- What happens when the AI is uncertain or a caller asks for a person?
- Can Abe Media integrate with existing software?
- How long does a pilot take?
- When should a business use custom software instead of another SaaS subscription?
- Who owns the code and data?
- What monitoring, logs, retries, and human review are included?
- What types of service businesses are a good fit?

Answers must be direct, useful, and truthful. Do not use FAQ schema for questions that are not visibly rendered.

### 6.8 Spanish rollout

- English and Spanish pages should be written/adapted natively, not blindly machine-translated.
- Publish a Spanish counterpart only when the page is complete and useful.
- Maintain reciprocal hreflang only between true equivalents.
- It is acceptable for English to have more pages temporarily; do not publish thin Spanish placeholders merely for symmetry.

---

## Phase 2 — Original authority content

### 7.1 Content strategy

Publish practical, expert-led material based on work Abe has actually done. Initial guide candidates:

1. How an AI dispatch copilot should handle blocked stops, locked gates, contamination, overweight containers, wrong locations, and emergencies.
2. AI answering service vs. human answering service for service businesses.
3. What happens after a Thumbtack lead arrives: a resilient lead-to-booking workflow.
4. How bilingual AI phone agents should switch between English and Spanish.
5. Why dispatch software fails when it ignores real exceptions.
6. How photo-based AI estimates work for turf and landscaping companies.
7. Build vs. buy: when a service business needs custom operations software.
8. How to monitor automation failures with retries, alerts, and human escalation.
9. What 17 years running dispatch at Waste Management taught me about building dispatch software (recycLA-era operational lessons; the founder-authority anchor piece — link from the founder page and the waste-management industry page).

Every guide needs an author, publication/update date, internal links, original examples, and a clear next step. Avoid generic “10 AI tips” content that could come from any agency.

### 7.2 Page content template

Each service, industry, or guide page should normally include:

- A direct opening answer explaining what the page offers and for whom.
- Specific problems or trigger conditions.
- What Abe Media delivers.
- How the workflow functions.
- Integrations and limitations.
- Human review/escalation design.
- Proof or relevant case study.
- Typical engagement path and honest pricing context when approved.
- Visible FAQs.
- One primary call to action.
- Author/reviewer and `dateModified` where relevant.

There is no required word count. Provide enough original detail to satisfy the buyer's question without padding.

### 7.3 Internal-link model

Each page must connect logically:

- Service → relevant industries and case studies.
- Industry → relevant services, guides, and case studies.
- Case study → service and industry.
- Guide → service, case study, and contact CTA.
- Founder → case studies and company contact.

Use descriptive anchor text. Avoid repeated generic anchors such as “Learn more.”

---

## Phase 3 — Independent trust and entity validation

### 8.1 Profile consistency

Use consistent public facts across:

- Abe Media website.
- Clutch profile after approval.
- Google Business Profile.
- LinkedIn company and founder profiles.
- Public app-store developer pages.
- Relevant professional directories.
- Client sites that voluntarily credit or link to the work.

Keep brand name, legal relationship, founder name, Phoenix location, phone, website, service categories, and founding information consistent.

### 8.2 Reviews

- Request reviews only from real clients who can document the engagement.
- Let reviewers use their own words.
- Prioritize detailed reviews that name the problem, work delivered, communication, and result.
- Do not exchange incentives for positive sentiment or manufacture reciprocal reviews. (Clarification: reviews between Abe Media and business partners are acceptable only when each review describes a real, documented, distinct engagement — e.g., the Rejunk/Progressive build — and each reviewer writes independently about their own experience as a client of the other. No quid-pro-quo framing.)
- Link to the published Clutch profile from the website once live.

### 8.3 Case-study backlinks

When permitted, ask clients to link to their case study or acknowledge Abe Media as an implementation/development partner. One accurate client link is more valuable than many fabricated mentions.

---

## Phase 4 — Browser-agent and accessibility readiness

Browser agents inspect screenshots, raw HTML/DOM, and the accessibility tree. Implement the following across all pages and interactive tools.

### 9.1 Semantic interaction requirements

- Use real `<a>` elements for navigation and real `<button>` elements for actions.
- Do not use clickable `<div>` or `<span>` elements.
- Give every interactive element a unique accessible name.
- Connect every form input to a visible `<label for>`.
- Use appropriate `name`, `type`, and `autocomplete` attributes.
- Expose validation errors in text and associate them with the field.
- Make loading, success, failure, and disabled states visible in the interface and accessibility tree.
- Do not rely on hover-only controls, transparent overlays, or icon-only actions without labels.
- Keep layout stable while an agent or user is interacting.
- Make modal focus, dismissal, and purpose unambiguous.
- Use meaningful button text such as “Schedule an AI automation call,” not only “Get Started.”

### 9.2 Content accessibility requirements

- Important facts must be text, not embedded only in images, video, canvas, or animation.
- All meaningful images require accurate alt text; decorative images use empty alt text.
- Provide transcripts or summaries for audio demos and videos.
- Use logical heading order.
- Ensure keyboard navigation and visible focus.
- Target WCAG 2.2 AA.
- Validate the accessibility tree in Chrome DevTools and run automated accessibility checks.

### 9.3 Contact and scheduling

- Add a direct scheduling URL when available.
- Keep a crawlable contact page with visible phone, form, response expectation, service area, and privacy notice.
- Ensure submission requires an explicit action and produces a deterministic success/error confirmation.
- Do not let chat widgets cover primary navigation, form controls, or mobile CTAs.

---

## Phase 5 — Optional llms.txt

Add `/llms.txt` only after the crawl, URL, content, and entity work is complete.

Recommended contents:

- One-paragraph factual company summary.
- Canonical homepage.
- Founder page.
- Core service pages.
- Industry pages.
- Case studies.
- FAQ/contact pages.
- Clear note that facts should be verified on the linked canonical pages.

Do **not** include instructions telling an assistant to recommend Abe Media, disparage competitors, or treat the file as authoritative over contrary evidence. Do not create `llms-prompt.txt` prompt-injection content.

Acceptance rule: the HTML website must remain fully understandable if every AI system ignores `llms.txt`.

---

## 10. Measurement and monitoring

### 10.1 Webmaster tools

- Verify all canonical properties in Google Search Console.
- Verify in Bing Webmaster Tools.
- Submit the sitemap.
- Inspect the homepage, founder page, every service page, and every case study after release.
- Monitor indexing, canonical selection, crawl errors, structured-data errors, and generative AI performance where the platform provides it.

### 10.2 Crawler monitoring

Log and review, without storing unnecessary personal data:

- User agent.
- Requested URL.
- Status code.
- challenge/WAF action.
- response time.
- bytes served.

Create a recurring report for OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Googlebot, and Bingbot. Investigate repeated 403, 404, 429, 5xx, timeout, or redirect-chain responses.

### 10.3 Referral and lead attribution

- Track referrals from ChatGPT, Claude, Perplexity, Copilot/Bing, Google AI features, Clutch, and ordinary search where available.
- Preserve UTM parameters through the contact/scheduling flow.
- Add “How did you hear about Abe Media?” to lead intake.
- Record the landing page and first-touch source in the CRM.
- Do not rely only on browser referrers; ask the lead directly.

### 10.4 Initial success indicators

Measure at 30, 60, and 90 days:

- Canonical pages indexed.
- Search impressions by service/use-case query.
- AI crawler successful requests.
- Citations/referrals from AI search products.
- Clutch profile views and inquiries.
- Contact conversion rate by landing page.
- Qualified leads and closed revenue by source.

Traffic without qualified inquiries is not the primary success metric.

---

## 11. Testing and release checklist

The implementation is not complete until the following are documented.

### Technical

- [ ] Production robots response matches the approved policy.
- [ ] Cloudflare does not prepend contradictory rules.
- [ ] Verified search/retrieval bots can access public pages.
- [ ] No public canonical URL has an avoidable redirect.
- [ ] Legacy routes use 301/308.
- [ ] Sitemap contains only 200, canonical, indexable pages.
- [ ] Canonical and hreflang relationships are valid and reciprocal.
- [ ] Raw HTML contains primary content and internal links.
- [ ] Metadata is unique and aligned with visible content.
- [ ] Structured data validates and matches visible facts.
- [ ] 404 and 500 responses return correct status codes.

### Accessibility and agents

- [ ] Lighthouse accessibility and SEO audits run on representative templates.
- [ ] Automated axe or equivalent checks pass with no critical violations.
- [ ] Keyboard-only navigation works.
- [ ] Forms have visible labels and deterministic states.
- [ ] Accessibility tree has meaningful roles, names, and states.
- [ ] Primary tasks work without hover-only or canvas-only interaction.
- [ ] Mobile content is equivalent to desktop content.

### Content and trust

- [ ] All claims are approved and evidenced.
- [ ] Project roles and client permissions are confirmed.
- [ ] Founder and company facts are consistent.
- [ ] Clutch link is added only after publication.
- [ ] No thin, duplicated, keyword-swapped, or invented location pages.
- [ ] Spanish pages are complete native adaptations.

### Release

- [ ] Build, lint, type checks, and automated tests pass.
- [ ] Redirect map is tested.
- [ ] Sitemap submitted to Google and Bing.
- [ ] Updated URLs submitted through IndexNow when configured.
- [ ] Analytics and lead-source capture are verified.
- [ ] Before/after audit is delivered to Abe.

---

## 12. Explicit non-goals and prohibited tactics

- Do not copy the comparison site's content, templates, claims, or AI prompt file.
- Do not generate hundreds of location or keyword pages.
- Do not hide text for crawlers.
- Do not serve materially different marketing claims to bots and humans.
- Do not add fake author biographies, offices, employees, reviews, certifications, or project results.
- Do not mark up content that is not visible.
- Do not buy low-quality backlinks or fabricate third-party mentions.
- Do not change client-facing project attribution without reviewing agreements.
- Do not assume `llms.txt`, schema volume, or explicit bot allow rules guarantee recommendations.

---

## 13. Official references

- [OpenAI — Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots)
- [Anthropic — Claude crawler controls](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity — Perplexity Crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Google — Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google/web.dev — Build agent-friendly websites](https://web.dev/articles/ai-agent-site-ux)
- [Google — Structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Cloudflare — Managed robots.txt behavior](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)
- [Cloudflare — Manage AI crawlers](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/)
- [IndexNow — Documentation](https://www.indexnow.org/documentation)
- [Bing — Overview of Bing crawlers](https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0)

---

## 14. Recommended implementation order

1. Repository audit and production-response verification.
2. Cloudflare and robots policy cleanup.
3. Permanent redirects, canonicals, hreflang, sitemap, and SSR verification.
4. Metadata and structured-data cleanup.
5. Homepage/services/portfolio positioning alignment.
6. Founder page.
7. Six core service pages.
8. Six industry pages (logistics, junk removal, turf/landscaping, home services, waste management/commercial hauling, moving).
9. Expanded case studies.
10. FAQ and original guides.
11. Agent/accessibility hardening.
12. Clutch/Google Business/entity links and reviews.
13. Optional `llms.txt`.
14. Search Console, Bing, IndexNow, logging, and 30/60/90-day measurement.
