# Plugin verification cases

Run `npm test` to exercise the resource and all eight tools in memory without sending a real lead.

## Automated checks

- `assess_call_coverage` returns a score, gaps, priorities, transparent assumptions, and a planning disclaimer.
- `estimate_missed_call_value` returns 43 monthly missed calls, 13 estimated completed jobs, and $6,495 estimated monthly value for 10 weekly missed calls, a 30% close rate, and a $500 average job.
- `build_intake_playbook` includes bilingual intake, approved urgency wording, human escalation, and no arrival-time promise.
- `recommend_automation_path` returns a relevant path and a first step.
- `request_ai_readiness_audit` returns the public Abe Media booking address and does not collect contact data.
- `show_sample_agent_call` returns both transcript structure and safety notes.
- `schedule_abemedia_consultation` returns the public scheduling address and makes no external change.
- `submit_lead` rejects a call when explicit consent is false.
- The embedded plugin interface is registered as an MCP resource.

## Live lead check

After deployment, submit one clearly labelled test lead with explicit consent. Confirm that:

1. the tool reports success;
2. the request appears in Convex with `referralSource: "chatgpt-app"`;
3. the notification arrives at the Abe Media inbox;
4. repeating the same email within 24 hours is rejected;
5. no email is sent for the rejected duplicate.
