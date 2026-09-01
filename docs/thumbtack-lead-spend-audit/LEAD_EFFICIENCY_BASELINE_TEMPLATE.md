# Thumbtack Lead Efficiency Baseline — Paid Client Template

Version: onboarding v1
Format: expanded report plus working tables
Primary decision metric: cost per deterministically matched hire
Required recommendation labels: **High confidence**, **Promising**, or **Insufficient data**

## 1. Executive summary

### Reporting period

`[Start date]–[End date]` · `[Primary market]` · `[Service categories]`

### What the baseline says

1. `[Most material spend or cost-per-hire observation.]` — **[confidence]**
2. `[Most material targeting observation.]` — **[confidence]**
3. `[Most material response-process observation.]` — **[confidence]**

### What changes first

- **Keep:** `[one behavior or target to preserve]`
- **Change:** `[one specific adjustment]`
- **Measure:** `[one event or field that must be captured for 30 days]`
- **Do not conclude yet:** `[thin or confounded pattern]`

## 2. Data receipt and reconciliation

| Source | Period | Rows / total | Usable | Excluded | Reason |
|---|---|---:|---:|---:|---|
| Contacts CSV | `[dates]` | `[n]` | `[n]` | `[n]` | `[duplicates / missing date / other]` |
| Spend | `[dates]` | `[$]` | `[$]` | `[$]` | `[refund treatment]` |
| Thumbtack-reported hires | `[dates]` | `[n]` | n/a | n/a | Kept separate from matched hires |

Document:

- Time zone used.
- Definition of a lead/contact.
- Definition and matching rule for a hire.
- Duplicate treatment.
- Refund treatment.
- Missing response-time, ZIP, category, or price fields.
- Any change in service area, pricing, seasonality, or lead settings during the period.

## 3. Core economics

| Metric | Current baseline | Notes |
|---|---:|---|
| Gross spend | `[$]` | Before refunds |
| Refunds | `[$]` | Confirmed refunds only |
| Net spend | `[$]` | Gross spend − refunds |
| Contacts / leads | `[n]` | Clean contact rows |
| Matched hires | `[n]` | Contact-level matches |
| Thumbtack-reported hires | `[n]` | Separate reference metric |
| Matched-hire rate | `[x.x%]` | Matched hires ÷ contacts |
| Cost per lead | `[$]` | Net spend ÷ contacts |
| Cost per matched hire | `[$]` | Net spend ÷ matched hires |

## 4. Cost per hire by category

| Category | Spend | Refunds | Leads | Matched hires | Hire rate | Cost / matched hire | Confidence |
|---|---:|---:|---:|---:|---:|---:|---|
| `[Category]` | `[$]` | `[$]` | `[n]` | `[n]` | `[x.x%]` | `[$]` | `[label]` |

**Recommendation:** `[Keep, reduce, expand, or collect more data.]` — **[confidence]**
**Evidence:** `[Counts, cost, period, and confounders.]`

## 5. Hire rate by day and time block

Use the client’s local time zone. Standard time blocks:

- Early morning: 12:00–6:59 AM
- Morning: 7:00–10:59 AM
- Midday: 11:00 AM–2:59 PM
- Afternoon: 3:00–5:59 PM
- Evening: 6:00–9:59 PM
- Late night: 10:00–11:59 PM

| Day / block | Leads | Matched hires | Hire rate | Allocated spend | Cost / matched hire | Sample label |
|---|---:|---:|---:|---:|---:|---|
| `[Sunday · morning]` | `[n]` | `[n]` | `[x.x%]` | `[$]` | `[$]` | `[label]` |

**Recommendation:** `[Budget window or observation rule.]` — **[confidence]**
Do not recommend a permanent daypart exclusion from a thin sample.

## 6. Response-time impact

| Response-time band | Leads | Matched hires | Hire rate | Cost / matched hire | Missing-time rows | Sample label |
|---|---:|---:|---:|---:|---:|---|
| Under 5 minutes | `[n]` | `[n]` | `[x.x%]` | `[$]` | `[n]` | `[label]` |
| 5–15 minutes | `[n]` | `[n]` | `[x.x%]` | `[$]` | `[n]` | `[label]` |
| 16–30 minutes | `[n]` | `[n]` | `[x.x%]` | `[$]` | `[n]` | `[label]` |
| 31+ minutes | `[n]` | `[n]` | `[x.x%]` | `[$]` | `[n]` | `[label]` |

**Recommendation:** `[Response workflow change.]` — **[confidence]**
**Caution:** Response time can correlate with time of day, job type, and owner availability. Describe association unless an experiment isolates the effect.

## 7. Travel-area and ZIP performance

| ZIP / area | Leads | Matched hires | Hire rate | Est. travel burden | Cost / matched hire | Sample label |
|---|---:|---:|---:|---:|---:|---|
| `[ZIP]` | `[n]` | `[n]` | `[x.x%]` | `[miles / minutes / band]` | `[$]` | `[label]` |

Flag:

- High lead volume but weak matched-hire economics.
- Strong hire economics but high operating/travel cost.
- ZIPs with insufficient data.
- Boundary changes worth testing rather than applying permanently.

**Recommendation:** `[Targeting boundary change or no change.]` — **[confidence]**

## 8. Recommended max lead prices

Use a client-approved allowable acquisition-cost ceiling. Do not derive a max price from hire rate alone.

**Inputs**

- Average gross profit per completed job: `[$]`
- Allowable acquisition share of gross profit: `[x%]`
- Target cost per matched hire: `[$]`
- Observed matched-hire rate by segment: `[x.x%]`

**Working formula**

`Recommended max lead price = target cost per matched hire × observed matched-hire rate`

| Segment | Target cost / hire | Observed hire rate | Calculated max lead price | Current price | Action | Confidence |
|---|---:|---:|---:|---:|---|---|
| `[Category / ZIP / window]` | `[$]` | `[x.x%]` | `[$]` | `[$]` | `[hold / lower / test higher]` | `[label]` |

If gross profit or current lead prices are missing, label the recommendation **Insufficient data** and list the missing input.

## 9. Targeting changes

| Proposed change | Evidence | Expected learning | Guardrail | Confidence |
|---|---|---|---|---|
| `[Example: narrow one ZIP band]` | `[counts and cost]` | `[question the test answers]` | `[budget / duration / stop rule]` | `[label]` |

Recommendations must be specific enough to execute and reversible for the 30-day test.

## 10. Thirty-day experiment plan

### Hypothesis

`[If we change X for segment Y while holding Z steady, cost per matched hire may differ from the prior baseline.]`

### Protocol

| Element | Plan |
|---|---|
| Start / end | `[dates]` |
| Budget schedule | `[days, windows, amounts]` |
| Control / baseline | `[comparison period or unchanged segment]` |
| Variables held steady | `[pricing, profile, service area, response workflow]` |
| Primary measure | `Cost per matched hire` |
| Secondary measures | `Lead count, matched-hire rate, response-time mix, refund rate` |
| Minimum evidence | `[lead and hire threshold]` |
| Stop rule | `[overspend, operational capacity, tracking failure]` |
| Decision date | `[date]` |

### Experiment log

| Date | Budget / setting change | Leads | Matched hires | Spend | Notes |
|---|---|---:|---:|---:|---|
| `[date]` | `[change]` | `[n]` | `[n]` | `[$]` | `[context]` |

## 11. Recommendation confidence rubric

- **High confidence:** at least 100 relevant leads, complete spend/outcome fields, stable result across more than one period or corroborating cuts, and no known material confounder.
- **Promising:** at least 30 relevant leads with a meaningful observed difference, but only one period or a plausible confounder remains.
- **Insufficient data:** fewer than 30 relevant leads, missing spend/outcome fields, zero matched hires in the segment, unstable results, or a material tracking issue.

These are operating thresholds, not claims of statistical significance.

---

# Monthly Optimization Addendum

Use this section for the recurring service. Re-run all baseline tables, then lead with the deltas and decisions below.

## Month-over-month scorecard

| Metric | Prior month | Current month | Delta | Interpretation |
|---|---:|---:|---:|---|
| Net spend | `[$]` | `[$]` | `[$ / %]` | `[read]` |
| Leads | `[n]` | `[n]` | `[n / %]` | `[read]` |
| Matched hires | `[n]` | `[n]` | `[n / %]` | `[read]` |
| Cost per lead | `[$]` | `[$]` | `[$ / %]` | `[read]` |
| Cost per matched hire | `[$]` | `[$]` | `[$ / %]` | `[read]` |
| Refund rate | `[x.x%]` | `[x.x%]` | `[points]` | `[read]` |
| Under-5-minute response share | `[x.x%]` | `[x.x%]` | `[points]` | `[read]` |

## What to change this month

Limit this list to three actions:

1. **`[Action]`** — `[why now]` — **[confidence]**
2. **`[Action]`** — `[why now]` — **[confidence]**
3. **`[Measurement fix or hold]`** — `[why now]` — **[confidence]**

## Last experiment: decision

`[Keep / reverse / extend]` the prior change because `[cost-per-hire result with counts and caveats]`.

## Next experiment

`[One-variable test with budget, dates, guardrail, and decision threshold.]`

## Required footer

This analysis describes observed performance in supplied historical data. Month-over-month changes may reflect seasonality, marketplace demand, pricing, profile changes, competition, or operational capacity. Recommendations are controlled tests, not promises of future results.
