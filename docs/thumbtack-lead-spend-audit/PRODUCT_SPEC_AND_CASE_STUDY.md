# Thumbtack Lead Spend Audit — Product, Form, Site, and Case Study Plan

## Product ladder

### Free Snapshot — lead magnet

- One-page report with exactly three findings.
- Inputs: Thumbtack contacts CSV, monthly spend, and service category.
- No Thumbtack account access.
- Every percentage includes lead count.
- Cost per matched hire is shown alongside hire rate.
- Every finding carries a sample-size label.
- First 10 are built manually and delivered on a 15-minute call.
- Positioning promise: clarity about response time and spend allocation.
- Explicit non-promise: no guaranteed hire-rate lift.

### Lead Efficiency Baseline — paid onboarding

- Full economic and operational baseline.
- Becomes the reference period for later optimization.
- Required content: spend, leads, matched hires, platform-reported hires, refunds, category economics, day/time, response time, ZIP/travel, max lead prices, targeting changes, and a 30-day experiment.
- Every recommendation labeled High confidence, Promising, or Insufficient data.

### Monthly Optimization — retention

- Re-runs the baseline.
- Adds month-over-month deltas, the result of the prior experiment, and no more than three “what to change this month” actions.
- Confidence may rise or fall as the sample grows or tracking quality changes.

## Concierge form specification

### Public form fields

| Field | Type | Required | Validation / purpose |
|---|---|---|---|
| Full name | Text | Yes | 100 characters; delivery contact |
| Work email | Email | Yes | Valid email; report handoff |
| Business name | Text | Yes | 160 characters |
| Phone | Telephone | No | 40 characters; scheduling backup |
| Thumbtack service category | Text | Yes | 120 characters; primary analysis segment |
| Approximate monthly spend | Currency number | Yes | $0–$100,000 |
| Reporting period | Select | Yes | 30, 60, 90 days, or 6+ months |
| CSV status | Select | Yes | Export ready / needs export instructions |
| Context | Textarea | No | 1,500 characters; budget, seasonality, or service changes only |

### File handling

- V1 deliberately has no browser file upload.
- The form warns the visitor not to paste customer names or messages.
- After form receipt, Abe sends separate CSV handoff instructions.
- The website never asks for Thumbtack credentials.
- The request is protected by the site’s existing bot-verification step and submitted through the existing consultation endpoint with a fixed service identifier and allowlisted fields.

### Form states

1. **Default:** inputs, “first 10” concierge label, privacy note, and disabled submit until bot verification succeeds.
2. **Field error:** specific message at the invalid field; focus moves to it.
3. **Submission error:** human-readable retry guidance without exposing server details.
4. **Success:** “Request received,” CSV handoff expectation, 15-minute call, and no-login reminder.

### Internal intake record

Store or route:

- Submitted contact and company data.
- Service identifier: `thumbtack-lead-spend-audit`.
- Category, monthly spend, period, CSV readiness, and context as a bounded description.
- Campaign attribution already captured by the site.
- Timestamp and bot-verification result through the existing lead endpoint.

Do not store a CSV in the public form workflow until a dedicated upload-retention and deletion policy exists.

### Concierge operations checklist

1. Confirm the category, period, and spend definition.
2. Send export and handoff instructions.
3. Confirm the file contains the fields required for contact date, response time, category, location, and hire matching.
4. Redact customer-identifying fields from working views.
5. Reconcile duplicates, refunds, matched hires, and platform-reported hires.
6. Generate the one-page report.
7. Schedule the 15-minute review.
8. Record the selected test and next review date.

## Site and CTA plan

### New page

**URL:** `/en/thumbtack-lead-spend-audit`

Page sequence:

1. Hero: “See where your Thumbtack budget produces hires.”
2. Reference strip: 314 contacts, 42 matched hires, 95 Thumbtack-reported hires; “our data, approximately 300 leads.”
3. Story: “My $500 budget was gone by Tuesday.”
4. Redacted one-page sample with exactly three findings.
5. Product ladder: Free Snapshot, Lead Efficiency Baseline, Monthly Optimization.
6. Expanded baseline coverage.
7. Four-step concierge process.
8. Intake form.
9. FAQ and final CTA.

Primary CTA everywhere: **Analyze my Thumbtack spend**.

### Placement 1 — under the homepage conversation replay

- Transition: “Fast response is one part of the picture.”
- Heading: “See when your best Thumbtack leads arrive.”
- Body: “Turn your contacts export into a clear view of response time, spend, and cost per matched hire.”
- CTA: “Analyze my Thumbtack spend.”

### Placement 2 — Thumbtack automation article

- Hero CTA now points to the spend audit.
- Inline CTA follows the response-speed evidence.
- Heading: “Fast response matters. So does knowing when your budget produces hires.”
- Body names the three inputs and states that account access is not required.
- CTA: “Analyze my Thumbtack spend.”

### Placement 3 — audit page

- Primary hero CTA anchors to the request form.
- Repeated final CTA after proof, deliverables, process, and FAQ.

### Measurement plan

Track when analytics events are available:

- `thumbtack_audit_cta_click` with placement: replay / article / audit_page.
- `thumbtack_audit_form_start`.
- `thumbtack_audit_form_submit`.
- `thumbtack_audit_qualified` after CSV receipt.
- `thumbtack_audit_delivered` after the 15-minute call.
- `thumbtack_audit_baseline_conversion` if the lead becomes a paid client.

The primary pilot conversion is qualified CSV receipts divided by unique audit-page visitors—not raw form submissions.

---

# Case Study Outline

## Working title

**My $500 Thumbtack budget was gone by Tuesday. Here’s what 314 leads revealed.**

## Search / social description

I analyzed 314 Thumbtack contacts after a weekly budget disappeared in two days. Here is what the data said about day, time, response speed, and the experiment I ran next.

## 1. Cold open: $500, gone by Tuesday

- Monday budget available.
- Tuesday realization: no room left to capture later-week demand.
- The core question was not “How do I get more leads?” It was “When does this budget have the best observed chance of producing a matched hire?”
- Screenshot or account view with customer and financial details redacted.

## 2. What I pulled—and what I did not claim

- 314 contact-level leads.
- 42 deterministically matched hires used for contact-level analysis.
- 95 Thumbtack-reported hires retained as a separate platform metric.
- Explain why the two hire counts are not interchangeable.
- State the spend/refund inputs used in the final experiment write-up.
- State that historical association is not proof that a schedule change will create more hires.

## 3. The first surprise: volume and efficiency were not the same thing

- Show leads by day and matched-hire rate by day.
- Sunday reference: 8 matched hires / 41 leads, 19.5%.
- Saturday reference: 3 / 41, 7.3%.
- Compare equal-volume days to make the contrast understandable.
- Add cost per matched hire after spend is allocated accurately.

## 4. The useful window

- Show time-block counts, not a smoothed curve alone.
- Reference observation: the strongest period appeared around 8–10 AM Phoenix time.
- Separate peak rate, peak volume, and the chosen operating window.
- Call out low-count hours as insufficient data.

## 5. Response speed still mattered—but the evidence needed counts

- Reference rates: under 5 minutes 17%; 5–15 minutes 16%; 16–30 minutes 15%; 31+ minutes 8%.
- Publish lead counts and matched hires for every band in the final article.
- If the old export cannot recover those counts, label the chart directional and use the experiment period for a clean response-time table.
- Explain confounders: category, hour, owner availability, and customer urgency.

## 6. Category economics

- Heavy Lifting reference rate: approximately 21%.
- Local Moving reference rate: approximately 14%.
- Assembly and Piano reference rates: approximately 13% each.
- Final version must add lead counts, matched hires, spend, refunds, and cost per matched hire for each category.

## 7. The test: refill selectively, then watch the cost per hire

### Protocol to document before results

- Add $50 Sunday morning.
- Add $50 Monday morning.
- Add $50 Wednesday morning.
- Add nothing Thursday through Saturday.
- Define the exact morning window before the first refill.
- Hold service category, profile, lead-price settings, travel area, and response workflow steady where possible.
- Log each lead, lead fee, refund, response time, matched hire, and job value.
- Primary outcome: cost per matched hire.
- Secondary outcomes: lead count, matched-hire rate, refund rate, and under-five-minute response share.
- Stop or annotate the test if capacity, pricing, targeting, or data capture changes materially.

## 8. Results — fill after the experiment

| Metric | Prior baseline | Experiment | Delta |
|---|---:|---:|---:|
| Spend | `[$]` | `[$]` | `[$ / %]` |
| Leads | `[n]` | `[n]` | `[n / %]` |
| Matched hires | `[n]` | `[n]` | `[n / %]` |
| Cost per lead | `[$]` | `[$]` | `[$ / %]` |
| Cost per matched hire | `[$]` | `[$]` | `[$ / %]` |
| Refund rate | `[x.x%]` | `[x.x%]` | `[points]` |

For each test day, report spend, leads, matched hires, hire rate, and cost per matched hire. Do not call the test a win based on hire rate without spend and counts.

## 9. What changed, what did not, and what I would test next

- Keep / reverse / extend the refill schedule.
- Identify whether the result came from better lead mix, faster response, lower lead cost, refunds, or chance.
- Name what remains unknown.
- Choose one next variable—not multiple simultaneous changes.

## 10. Reader takeaway and CTA

- The lesson: a full lead inbox is not the same as an efficient budget.
- Invite the reader to use their own export, not copy the Phoenix schedule.
- CTA: **Analyze my Thumbtack spend.**
- Offer: one-page snapshot, built by hand for the first 10, delivered on a 15-minute call, no account access.

## Assumptions

1. “Contacts” and “leads” refer to the 314 contact-level records in the Opus reference analysis.
2. The 42 matched hires are the only outcomes used for contact-level hire-rate findings; 95 Thumbtack-reported hires remain a separate contextual metric.
3. Day counts were recovered from the reference chart: Sunday 41/8, Monday 53/9, Tuesday 48/6, Wednesday 47/5, Thursday 39/5, Friday 45/6, Saturday 41/3 (314 leads and 42 matched hires total).
4. The response-time chart preserved rates but not bin-level counts. Public sample counts remain pending and must not be inferred.
5. Cost per hire cannot be calculated for the public reference until spend (and refund treatment) for the same period is supplied.
6. The experiment’s “morning” window will be recorded before results are interpreted; 8–10 AM Phoenix time is the provisional window from the reference analysis.
7. The public form is an intake request, not a CSV uploader. CSV retention, deletion, and access rules will be defined before automated uploading is built.
8. The pilot is English-only and available to the first 10 qualified submissions with a usable contacts export.
9. Confidence labels are practical decision labels, not formal statistical-significance claims.
10. All marketing copy promises clarity from supplied historical data and never guarantees a hire-rate lift.
