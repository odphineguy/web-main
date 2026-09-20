import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createAbeMediaServer } from "../src/appServer.js";

const expectedTools = [
  "assess_call_coverage",
  "estimate_missed_call_value",
  "build_intake_playbook",
  "recommend_automation_path",
  "request_ai_readiness_audit",
  "show_sample_agent_call",
  "submit_lead",
  "schedule_abemedia_consultation",
];

const server = createAbeMediaServer();
const client = new Client({ name: "abemedia-chatgpt-plugin-smoke-test", version: "1.0.0" });
const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);

try {
  const tools = await client.listTools();
  assert.deepEqual(tools.tools.map((tool) => tool.name).sort(), [...expectedTools].sort());

  const resources = await client.listResources();
  assert.ok(resources.resources.some((resource) => resource.uri === "ui://abemedia-chatgpt-plugin/main.html"));
  const widget = await client.readResource({ uri: "ui://abemedia-chatgpt-plugin/main.html" });
  assert.match(String(widget.contents[0]?.text), /Abe Media/);

  const assessment = await client.callTool({
    name: "assess_call_coverage",
    arguments: {
      businessType: "HVAC",
      weeklyInboundCalls: 80,
      weeklyMissedCalls: 12,
      averageJobValue: 650,
      estimatedCloseRatePercent: 35,
      afterHoursCoverage: "voicemail",
      bookingMethod: "manual callback",
      spanishDemand: "regular",
      dispatchNeeds: "same day",
    },
  });
  const assessmentData = assessment.structuredContent as { coverageScore: number; gaps: string[]; priorities: string[]; disclaimer: string };
  assert.ok(assessmentData.coverageScore < 55);
  assert.ok(assessmentData.gaps.length >= 4);
  assert.ok(assessmentData.priorities.length >= 3);
  assert.match(assessmentData.disclaimer, /estimate|planning/i);

  const estimate = await client.callTool({
    name: "estimate_missed_call_value",
    arguments: { weeklyMissedCalls: 10, estimatedCloseRatePercent: 30, averageJobValue: 500 },
  });
  const estimateData = estimate.structuredContent as { monthlyMissedCalls: number; estimatedCompletedJobs: number; estimatedMonthlyValue: number };
  assert.equal(estimateData.monthlyMissedCalls, 43);
  assert.equal(estimateData.estimatedCompletedJobs, 13);
  assert.equal(estimateData.estimatedMonthlyValue, 6495);

  const playbook = await client.callTool({
    name: "build_intake_playbook",
    arguments: {
      businessType: "junk removal",
      services: ["junk removal", "hauling"],
      businessHours: "Monday-Friday 8 AM-5 PM",
      languages: ["English", "Spanish"],
      dispatchNeeds: "same day",
      bookingMethod: "calendar",
      humanEscalationContactRole: "on-call dispatcher",
    },
  });
  const playbookData = playbook.structuredContent as { opening: string; escalation: string[]; bookingHandoff: string };
  assert.match(playbookData.opening, /Spanish/);
  assert.match(playbookData.escalation.join(" "), /on-call dispatcher/);
  assert.doesNotMatch(playbookData.bookingHandoff, /promise/i);

  const recommendation = await client.callTool({
    name: "recommend_automation_path",
    arguments: { primaryNeed: "dispatch", businessType: "hauling", urgency: "this quarter" },
  });
  assert.match(JSON.stringify(recommendation.structuredContent), /Dispatch and operations platform/);

  const audit = await client.callTool({ name: "request_ai_readiness_audit", arguments: { primaryInterest: "not sure" } });
  assert.match(JSON.stringify(audit.structuredContent), /https:\/\/abemedia\.online\/en#contact/);

  const sample = await client.callTool({ name: "show_sample_agent_call", arguments: { language: "spanish" } });
  assert.match(JSON.stringify(sample.structuredContent), /Spanish/);

  const schedule = await client.callTool({ name: "schedule_abemedia_consultation", arguments: {} });
  assert.match(JSON.stringify(schedule.structuredContent), /https:\/\/abemedia\.online\/en#contact/);

  const rejectedLead = await client.callTool({
    name: "submit_lead",
    arguments: {
      contactConsentConfirmed: false,
      name: "Plugin Test",
      phone: "+1 202-555-0147",
      email: "plugin-test@example.com",
      businessName: "Example Service Company",
      businessType: "other",
      primaryNeed: "not sure",
      timeline: "just researching",
    },
  });
  assert.equal(rejectedLead.isError, true);

  console.log("Abe Media ChatGPT Plugin: all smoke tests passed.");
} finally {
  await client.close();
  await server.close();
}
