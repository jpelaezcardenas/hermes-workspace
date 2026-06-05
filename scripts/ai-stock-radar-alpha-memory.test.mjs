import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  applyAlphaMemorySignal,
  buildAlphaMemorySignal,
  renderAlphaMemoryReport,
  summarizeAlphaMemory,
  updateAlphaMemoryState,
  writeAlphaMemoryRun,
} from "./ai-stock-radar-alpha-memory.mjs";

function candidate(overrides = {}) {
  return {
    ticker: "CORE",
    company: "Core AI Learning Inc.",
    category: "Breakout Watch",
    idea_grade: "A",
    score: 84,
    data_quality: "A",
    themes: ["ai_infrastructure"],
    last_checked: "2026-05-31",
    thesis: "Core AI Learning Inc. has AI infrastructure customer evidence.",
    evidence_firewall: {
      verdict: "pass",
      risk_flags: [],
      positive_labels: ["material_agreement", "major_customer"],
      support_labels: ["revenue_growth_support"],
      notes: [],
    },
    ceo_control: { lane: "focus", action: "CEO_VERIFY" },
    entry_readiness: { label: "ENTRY_READY", action: "PAPER_ENTRY_REVIEW" },
    advanced_signals: {
      banger_score: 86,
      banger_label: "BANGER_CANDIDATE_REVIEW",
      review_action: "ADVANCED_REVIEW",
      components: {
        sec_catalyst: { label: "material_agreement" },
        customer_proof: { label: "hard_customer_or_contract" },
        relative_strength: { label: "outperform" },
        liquidity: { label: "usable" },
      },
    },
    thesis_intelligence: {
      thesis_verdict: "THESIS_CONFIRMED_REVIEW",
      research_action: "THESIS_DEEPEN_REVIEW",
      confidence_score: 78,
      ai_revenue_reality: { label: "verified_ai_revenue" },
      negative_catalysts: { severity: "none", labels: [] },
      graph: { gaps: [] },
    },
    source_confidence: { summary: { facts: 3, interpretations: 2, missing: 0 }, entries: [] },
    price_volume: {
      status: "available",
      confirmation: "positive",
      latest_close: 10,
      return_20d_pct: 18,
      volume_ratio_20d: 2.2,
    },
    quality_notes: ["material customer agreement tied to AI infrastructure"],
    top_risks: [],
    ...overrides,
  };
}

describe("AI stock radar alpha memory", () => {
  it("tracks a clean high-quality hypothesis with a fresh catalyst timeline", () => {
    const memory = buildAlphaMemorySignal(candidate(), { date: "2026-05-31" });

    expect(memory.hypothesis_label).toBe("TRACK_HYPOTHESIS");
    expect(memory.memory_action).toBe("ALPHA_TRACK");
    expect(memory.learning_score).toBeGreaterThanOrEqual(70);
    expect(memory.contradiction_detector.severity).toBe("none");
    expect(memory.catalyst_timeline.timing_label).toBe("fresh_catalyst");
    expect(memory.catalyst_timeline.events.map((event) => event.kind)).toEqual(
      expect.arrayContaining(["filing_catalyst", "thesis", "advanced_signal"]),
    );
    expect(JSON.stringify(memory)).not.toMatch(/buy now|sell now|strong buy|strong sell|price target|option|leverage/i);
  });

  it("detects critical contradictions when positive framing conflicts with risk gates", () => {
    const memory = buildAlphaMemorySignal(candidate({
      ticker: "RISK",
      evidence_firewall: {
        verdict: "reject",
        risk_flags: ["offering_watch", "dilution_trend_watch"],
        positive_labels: ["material_agreement"],
        support_labels: [],
        notes: ["offering risk"],
      },
      advanced_signals: { banger_label: "BANGER_CANDIDATE_REVIEW", banger_score: 80, components: { liquidity: { label: "usable" } } },
      thesis_intelligence: {
        thesis_verdict: "BROKEN_THESIS",
        ai_revenue_reality: { label: "reality_risk" },
        negative_catalysts: { severity: "critical", labels: ["offering_watch"] },
        graph: { gaps: ["AI revenue proof missing"] },
      },
    }), { date: "2026-05-31" });

    expect(memory.hypothesis_label).toBe("RISK_PATTERN");
    expect(memory.memory_action).toBe("ALPHA_RISK_ARCHIVE");
    expect(memory.contradiction_detector.severity).toBe("critical");
    expect(memory.contradiction_detector.labels).toEqual(
      expect.arrayContaining(["positive_label_vs_broken_thesis", "positive_story_with_dilution_risk"]),
    );
    expect(memory.catalyst_timeline.timing_label).toBe("late_or_risk");
  });

  it("flags AI narrative without revenue proof as contradiction review", () => {
    const memory = buildAlphaMemorySignal(candidate({
      ticker: "NOISE",
      idea_grade: "B",
      advanced_signals: { banger_label: "WAIT", banger_score: 38, components: {} },
      thesis_intelligence: {
        thesis_verdict: "WATCH_THESIS",
        ai_revenue_reality: { label: "ai_context_only" },
        negative_catalysts: { severity: "none", labels: [] },
        graph: { gaps: ["AI revenue proof missing"] },
      },
      evidence_firewall: { verdict: "pass", risk_flags: [], positive_labels: [], support_labels: [], notes: [] },
    }), { date: "2026-05-31" });

    expect(memory.hypothesis_label).toBe("CONTRADICTION_REVIEW");
    expect(memory.contradiction_detector.labels).toContain("ai_story_without_revenue_proof");
    expect(memory.memory_action).toBe("ALPHA_CONTRADICTION_REVIEW");
  });

  it("names critical risk reasons instead of saying no contradiction for broken theses", () => {
    const memory = buildAlphaMemorySignal(candidate({
      ticker: "BROK",
      idea_grade: "C",
      score: 55,
      evidence_firewall: { verdict: "caution", risk_flags: ["cash_runway_watch"], positive_labels: [], support_labels: [], notes: [] },
      advanced_signals: { banger_label: "RISK_TRAP", banger_score: 10, components: {} },
      thesis_intelligence: {
        thesis_verdict: "BROKEN_THESIS",
        ai_revenue_reality: { label: "product_core_no_revenue_split" },
        negative_catalysts: { severity: "critical", labels: ["cash_runway_watch"] },
        graph: { gaps: ["AI revenue split not verified"] },
      },
    }), { date: "2026-05-31" });

    expect(memory.hypothesis_label).toBe("RISK_PATTERN");
    expect(memory.contradiction_detector.severity).toBe("critical");
    expect(memory.contradiction_detector.labels).toEqual(
      expect.arrayContaining(["critical_negative_catalyst", "advanced_signal_risk_trap", "broken_thesis"]),
    );
    expect(memory.contradiction_detector.reasons).not.toContain("no current contradiction detected");
  });

  it("updates memory state without duplicate ticker-date snapshots and assesses due outcomes", () => {
    const memory = {
      version: 1,
      snapshots: [
        {
          id: "OLD-2026-05-01",
          ticker: "OLD",
          date: "2026-05-01",
          horizon_days: 30,
          entry_close: 10,
          hypothesis_label: "TRACK_HYPOTHESIS",
          thesis_verdict: "THESIS_CONFIRMED_REVIEW",
          contradiction_severity: "none",
          status: "pending",
        },
      ],
      assessments: [],
    };
    const current = candidate({ ticker: "OLD", price_volume: { status: "available", latest_close: 13 }, thesis_intelligence: { thesis_verdict: "THESIS_CONFIRMED_REVIEW", ai_revenue_reality: { label: "verified_ai_revenue" }, negative_catalysts: { severity: "none", labels: [] }, graph: { gaps: [] } } });

    const updated = updateAlphaMemoryState({
      memory,
      watchlist: { candidates: [applyAlphaMemorySignal(current, { date: "2026-05-31" })] },
      date: "2026-05-31",
    });

    expect(updated.snapshots.filter((snapshot) => snapshot.ticker === "OLD" && snapshot.date === "2026-05-31")).toHaveLength(1);
    expect(updated.snapshots.filter((snapshot) => snapshot.ticker === "OLD" && snapshot.date === "2026-05-31")).toHaveLength(1);
    expect(updated.assessments).toEqual(
      expect.arrayContaining([expect.objectContaining({ ticker: "OLD", outcome_label: "constructive" })]),
    );
  });

  it("summarizes candidate labels and memory outcomes", () => {
    const candidates = [
      applyAlphaMemorySignal(candidate({ ticker: "CORE" }), { date: "2026-05-31" }),
      applyAlphaMemorySignal(candidate({ ticker: "RISK", thesis_intelligence: { thesis_verdict: "BROKEN_THESIS", ai_revenue_reality: { label: "reality_risk" }, negative_catalysts: { severity: "critical", labels: ["name_only_ai_watch"] }, graph: { gaps: [] } } }), { date: "2026-05-31" }),
    ];
    const summary = summarizeAlphaMemory({
      candidates,
      memory: { version: 1, snapshots: [], assessments: [{ outcome_label: "risk_confirmed" }] },
    });

    expect(summary.hypothesis_counts.TRACK_HYPOTHESIS).toBe(1);
    expect(summary.hypothesis_counts.RISK_PATTERN).toBe(1);
    expect(summary.contradiction_severity_counts.critical).toBe(1);
    expect(summary.contradiction_label_counts.critical_negative_catalyst).toBe(1);
    expect(summary.recurring_risk_counts.name_only_ai_watch).toBe(1);
    expect(summary.assessment_counts.risk_confirmed).toBe(1);
  });

  it("renders and writes safe alpha memory artifacts", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ai-stock-alpha-"));
    const watchlist = {
      version: 1,
      updated_at: "2026-05-31",
      candidates: [applyAlphaMemorySignal(candidate(), { date: "2026-05-31" })],
    };
    const report = renderAlphaMemoryReport({
      date: "2026-05-31",
      watchlist,
      memory: { version: 1, snapshots: [], assessments: [] },
      reportPath: "/tmp/alpha.md",
    });

    expect(report).toContain("# AI Stock Radar Alpha Memory - 2026-05-31");
    expect(report).toContain("## Hypothesis Memory");
    expect(report).toContain("## Contradiction Detector");
    expect(report).toContain("### Top Contradiction Labels");
    expect(report).toContain("## Catalyst Timeline");
    expect(report).toContain("### Recurring Risk Patterns");
    expect(report).toContain("## Memory Assessments");
    expect(report).toContain("- SOFORT_MACHEN: nichts");
    expect(report.toLowerCase()).not.toMatch(/buy now|sell now|strong buy|strong sell|open position|price target|jetzt kaufen|jetzt verkaufen/);

    const result = writeAlphaMemoryRun({ root: tempRoot, date: "2026-05-31", watchlist });
    expect(fs.existsSync(result.memoryPath)).toBe(true);
    expect(fs.existsSync(result.reportPath)).toBe(true);
    expect(result.summary.hypothesis_counts.TRACK_HYPOTHESIS).toBe(1);
  });
});
