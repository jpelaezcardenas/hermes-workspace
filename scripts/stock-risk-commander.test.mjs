import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  buildCommanderCandidates,
  computeCommanderAssessment,
  detectStockRiskCommanderSchedule,
  renderStockRiskCommanderReport,
  selectSafeActions,
  writeStockRiskCommanderRun,
} from "./stock-risk-commander.mjs";

function aiCandidate(overrides = {}) {
  return {
    ticker: "SAFE",
    company: "Safe AI Inc.",
    score: 82,
    idea_grade: "A",
    category: "Breakout Watch",
    evidence_firewall: { verdict: "pass", risk_flags: [] },
    ceo_control: { lane: "monitor", action: "CEO_MONITOR" },
    thesis_intelligence: { thesis_verdict: "WATCH_THESIS" },
    alpha_memory: { hypothesis_label: "WATCH_ONLY", contradiction_detector: { severity: "none" } },
    price_volume: { status: "available", confirmation: "neutral" },
    top_risks: [],
    ...overrides,
  };
}

describe("Stock Risk Commander", () => {
  it("aligns after daily AI and institutional stock jobs", () => {
    const alignment = detectStockRiskCommanderSchedule([
      { name: "AI_STOCK_RADAR_DAILY", schedule: "35 9 * * 1-5" },
      { name: "INSTITUTIONAL_SELL_PRESSURE_DAILY", schedule: "50 9 * * 1-5" },
      { name: "AI_STOCK_DEEPDIVE_WEEKLY", schedule: "30 16 * * 0" },
    ]);

    expect(alignment.recommended_schedule).toBe("0 10 * * 1-5");
    expect(alignment.daily_ai_job?.schedule).toBe("35 9 * * 1-5");
    expect(alignment.institutional_job?.schedule).toBe("50 9 * * 1-5");
  });

  it("keeps clean candidates as research attention when risk overlays are quiet", () => {
    const assessment = computeCommanderAssessment(aiCandidate(), {
      risk_level: "INFO",
      score: 0,
      source_latency: "unavailable",
      reasons: ["no public institutional sell-pressure signal detected"],
    });

    expect(assessment.risk_posture).toBe("RESEARCH_ATTENTION");
    expect(assessment.commander_action).toBe("COMMANDER_RESEARCH_REVIEW");
    expect(assessment.combined_score).toBeGreaterThanOrEqual(60);
    expect(assessment.risk_overrides).toHaveLength(0);
  });

  it("lets risk overrides dominate a high idea grade", () => {
    const assessment = computeCommanderAssessment(aiCandidate({
      idea_grade: "S",
      evidence_firewall: { verdict: "pass", risk_flags: [] },
      alpha_memory: { hypothesis_label: "RISK_PATTERN", contradiction_detector: { severity: "critical" } },
      thesis_intelligence: { thesis_verdict: "BROKEN_THESIS" },
    }), {
      risk_level: "WARNING",
      score: 74,
      source_latency: "short_delay",
      reasons: ["beneficial ownership reduction detected"],
    });

    expect(assessment.risk_posture).toBe("RISK_REVIEW");
    expect(assessment.commander_action).toBe("COMMANDER_RISK_REVIEW");
    expect(assessment.risk_overrides).toEqual(expect.arrayContaining(["Alpha Memory risk pattern", "broken thesis", "institutional sell pressure WARNING"]));
  });

  it("merges AI candidates with institutional pressure by ticker", () => {
    const candidates = buildCommanderCandidates({
      aiWatchlist: { candidates: [aiCandidate({ ticker: "SAFE" })] },
      institutionalObservations: [
        { ticker: "SAFE", form: "SC 13G/A", holder: "Global Fund", shares_previous: 1000, shares_current: 500, filed_at: "2026-05-31" },
      ],
      date: "2026-05-31",
    });

    expect(candidates).toHaveLength(1);
    expect(candidates[0].ticker).toBe("SAFE");
    expect(candidates[0].institutional_sell_pressure.risk_level).toMatch(/WARNING|CRITICAL_REVIEW/);
    expect(candidates[0].commander_assessment.risk_posture).toBe("RISK_REVIEW");
  });

  it("selects at most three safe actions and excludes trade language", () => {
    const candidates = ["AAA", "BBB", "CCC", "DDD"].map((ticker, index) => ({
      ticker,
      company: `${ticker} Inc.`,
      commander_assessment: {
        risk_posture: index === 0 ? "RESEARCH_ATTENTION" : "RISK_REVIEW",
        commander_action: index === 0 ? "COMMANDER_RESEARCH_REVIEW" : "COMMANDER_RISK_REVIEW",
        combined_score: 90 - index,
        attention_reasons: ["clean research candidate"],
        risk_overrides: index === 0 ? [] : ["institutional pressure"],
        data_gaps: [],
      },
    }));

    const actions = selectSafeActions(candidates);

    expect(actions).toHaveLength(3);
    expect(actions.join("\n").toLowerCase()).not.toMatch(/buy|sell|short|option|leverage|margin|kaufen|verkaufen/);
  });

  it("renders all required report sections safely", () => {
    const candidates = buildCommanderCandidates({
      aiWatchlist: { candidates: [aiCandidate()] },
      institutionalObservations: [],
      date: "2026-05-31",
    });
    const report = renderStockRiskCommanderReport({
      date: "2026-05-31",
      candidates,
      reportPath: "/tmp/commander.md",
      alignment: { recommended_schedule: "0 10 * * 1-5" },
    });

    for (const section of [
      "# Stock Risk Commander - 2026-05-31",
      "## Kurzfazit",
      "## Job Alignment",
      "## Combined Risk Board",
      "## Potential Candidate Board",
      "## Top Research Attention",
      "## Risk Overrides",
      "## Institutional Pressure Overlay",
      "## Noise / Ignore",
      "## Data Gaps",
      "## Max 3 Safe Actions",
      "## Decision Inbox",
    ]) {
      expect(report).toContain(section);
    }
    const potentialSection = report.match(/## Potential Candidate Board\n([\s\S]*?)\n\n## Top Research Attention/)?.[1] || "";
    expect(potentialSection).toContain("SAFE");
    expect(potentialSection).toMatch(/Research Review|Watch|Risk Review|Archive\/Avoid Review/);
    expect(report.toLowerCase()).not.toMatch(/buy now|sell now|short now|strong buy|strong sell|price target|kursziel|option|leverage|margin|garantiert/);
  });

  it("writes a daily commander report", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "stock-risk-commander-"));
    fs.mkdirSync(path.join(root, "projects/ai-stock-radar"), { recursive: true });
    fs.mkdirSync(path.join(root, "projects/institutional-sell-radar"), { recursive: true });
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/watchlist.json"), JSON.stringify({ candidates: [aiCandidate()] }));
    fs.writeFileSync(path.join(root, "projects/institutional-sell-radar/holder-ledger.json"), JSON.stringify({
      observations: [{ ticker: "SAFE", form: "13F-HR", holder: "Mega Fund", shares_previous: 1000, shares_current: 600, filed_at: "2026-05-15" }],
    }));

    const result = writeStockRiskCommanderRun({ root, date: "2026-05-31" });

    expect(fs.existsSync(result.reportPath)).toBe(true);
    expect(result.candidates).toHaveLength(1);
    expect(result.safeActions.length).toBeLessThanOrEqual(3);
  });
});
