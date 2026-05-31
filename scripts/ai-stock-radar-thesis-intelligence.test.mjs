import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  applyThesisIntelligence,
  buildThesisIntelligence,
  renderThesisIntelligenceReport,
  summarizeThesisIntelligence,
  writeThesisIntelligenceRun,
} from "./ai-stock-radar-thesis-intelligence.mjs";

function candidate(overrides = {}) {
  return {
    ticker: "CORE",
    company: "Core AI Revenue Inc.",
    category: "Breakout Watch",
    idea_grade: "A",
    score: 84,
    data_quality: "A",
    themes: ["ai_infrastructure", "gpu_capacity"],
    thesis: "Core AI Revenue Inc. has AI infrastructure exposure with customer evidence.",
    filing_events: {
      positive_labels: ["material_agreement", "major_customer"],
      risk_labels: [],
      hard_catalyst: true,
      hard_blocker: false,
    },
    evidence_firewall: {
      verdict: "pass",
      risk_flags: [],
      positive_labels: ["material_agreement", "major_customer", "ai_revenue_growth"],
      support_labels: ["revenue_growth_support"],
      notes: [],
    },
    ceo_control: { lane: "focus", action: "CEO_VERIFY", reasons: ["profile fit"] },
    source_confidence: { summary: { facts: 3, interpretations: 2, missing: 0 }, entries: [] },
    entry_readiness: { label: "ENTRY_READY", action: "PAPER_ENTRY_REVIEW", reasons: ["aligned"] },
    advanced_signals: {
      banger_score: 88,
      banger_label: "BANGER_CANDIDATE_REVIEW",
      review_action: "ADVANCED_REVIEW",
      components: {
        customer_proof: { label: "hard_customer_or_contract" },
        relative_strength: { label: "outperform" },
        liquidity: { label: "usable" },
        ownership: { label: "supportive" },
      },
    },
    fundamental_snapshot: {
      status: "available",
      revenue_growth_yoy_pct: 32,
      cash_runway_quarters: 5,
      risks: [],
      supports: ["revenue_growth_support"],
    },
    price_volume: { status: "available", confirmation: "positive" },
    top_risks: [],
    quality_notes: ["material customer agreement tied to AI infrastructure"],
    last_checked: "2026-05-31",
    ...overrides,
  };
}

describe("AI stock radar thesis intelligence", () => {
  it("builds a confirmed research thesis when evidence, customer proof, and AI revenue reality align", () => {
    const thesis = buildThesisIntelligence(candidate());

    expect(thesis.thesis_verdict).toBe("THESIS_CONFIRMED_REVIEW");
    expect(thesis.research_action).toBe("THESIS_DEEPEN_REVIEW");
    expect(thesis.confidence_score).toBeGreaterThanOrEqual(70);
    expect(thesis.graph.thesis.length).toBeGreaterThan(0);
    expect(thesis.graph.evidence).toEqual(expect.arrayContaining([expect.stringMatching(/customer/i)]));
    expect(thesis.graph.gaps).not.toContain("AI revenue reality unknown");
    expect(thesis.negative_catalysts.severity).toBe("none");
    expect(thesis.ai_revenue_reality.label).toBe("verified_ai_revenue");
    expect(JSON.stringify(thesis)).not.toMatch(/buy now|sell now|strong buy|strong sell|price target|option|leverage/i);
  });

  it("breaks the thesis when critical negative catalysts appear", () => {
    const thesis = buildThesisIntelligence(candidate({
      ticker: "RISK",
      category: "Avoid",
      idea_grade: "X",
      evidence_firewall: {
        verdict: "reject",
        risk_flags: ["delisting_watch", "reverse_split_watch"],
        positive_labels: [],
        support_labels: [],
        notes: ["listing risk"],
      },
      ceo_control: { lane: "reject", action: "CEO_ARCHIVE_REVIEW" },
      entry_readiness: { label: "TOO_RISKY", action: "PAPER_ARCHIVE_REVIEW", reasons: ["risk gate"] },
      advanced_signals: { banger_label: "RISK_TRAP", banger_score: 0 },
    }));

    expect(thesis.thesis_verdict).toBe("BROKEN_THESIS");
    expect(thesis.research_action).toBe("THESIS_ARCHIVE_REVIEW");
    expect(thesis.negative_catalysts.severity).toBe("critical");
    expect(thesis.negative_catalysts.labels).toEqual(expect.arrayContaining(["delisting_watch", "reverse_split_watch"]));
    expect(thesis.graph.counter_evidence.join(" ")).toMatch(/negative catalyst/i);
  });

  it("flags name-only AI as a revenue reality risk", () => {
    const thesis = buildThesisIntelligence(candidate({
      ticker: "NOISE",
      themes: ["ai_keyword_match"],
      evidence_firewall: {
        verdict: "caution",
        risk_flags: ["name_only_ai_watch"],
        positive_labels: [],
        support_labels: [],
        notes: ["name-only AI evidence"],
      },
      entry_readiness: { label: "FAKE_AI_HYPE", action: "PAPER_ARCHIVE_REVIEW", reasons: ["name-only AI"] },
      advanced_signals: { banger_label: "RISK_TRAP", banger_score: 0 },
    }));

    expect(thesis.thesis_verdict).toBe("BROKEN_THESIS");
    expect(thesis.ai_revenue_reality.label).toBe("reality_risk");
    expect(thesis.graph.gaps).toEqual(expect.arrayContaining(["AI revenue proof missing"]));
  });

  it("separates product-core context from verified AI revenue", () => {
    const thesis = buildThesisIntelligence(candidate({
      evidence_firewall: {
        verdict: "pass",
        risk_flags: [],
        positive_labels: ["material_agreement"],
        support_labels: [],
        notes: [],
      },
      fundamental_snapshot: { status: "available", risks: [], supports: [] },
    }));

    expect(thesis.ai_revenue_reality.label).toBe("product_core_no_revenue_split");
    expect(thesis.graph.gaps).toEqual(expect.arrayContaining(["AI revenue split not verified"]));
  });

  it("attaches thesis intelligence and summarizes verdicts", () => {
    const enriched = [
      applyThesisIntelligence(candidate({ ticker: "CORE" })),
      applyThesisIntelligence(candidate({
        ticker: "WATCH",
        idea_grade: "B",
        ceo_control: { lane: "monitor", action: "CEO_MONITOR" },
        source_confidence: { summary: { facts: 2, interpretations: 2, missing: 1 }, entries: [] },
        entry_readiness: { label: "WAIT_FOR_CONFIRMATION", action: "PAPER_HOLD_REVIEW", reasons: ["gap"] },
        advanced_signals: { banger_label: "WAIT", banger_score: 32, components: {} },
        evidence_firewall: { verdict: "pass", risk_flags: [], positive_labels: [], support_labels: [] },
        fundamental_snapshot: { status: "unavailable" },
      })),
      applyThesisIntelligence(candidate({ ticker: "RISK", evidence_firewall: { verdict: "reject", risk_flags: ["delisting_watch"], positive_labels: [], support_labels: [] } })),
    ];
    const summary = summarizeThesisIntelligence(enriched);

    expect(enriched.every((item) => item.thesis_intelligence)).toBe(true);
    expect(summary.verdict_counts.THESIS_CONFIRMED_REVIEW).toBe(1);
    expect(summary.verdict_counts.BROKEN_THESIS).toBe(1);
    expect(summary.negative_severity_counts.critical).toBe(1);
    expect(summary.revenue_reality_counts.verified_ai_revenue).toBe(1);
  });

  it("renders and writes a safe companion report", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ai-stock-thesis-"));
    const watchlist = {
      version: 1,
      updated_at: "2026-05-31",
      candidates: [applyThesisIntelligence(candidate())],
    };
    const report = renderThesisIntelligenceReport({
      date: "2026-05-31",
      watchlist,
      reportPath: "/tmp/thesis.md",
    });

    expect(report).toContain("# AI Stock Radar Thesis Intelligence - 2026-05-31");
    expect(report).toContain("## Thesis Verdicts");
    expect(report).toContain("## Negative Catalysts");
    expect(report).toContain("## AI Revenue Reality");
    expect(report).toContain("## Thesis Graph Gaps");
    expect(report).toContain("- SOFORT_MACHEN: nichts");
    expect(report.toLowerCase()).not.toMatch(/buy now|sell now|strong buy|strong sell|open position|price target|jetzt kaufen|jetzt verkaufen/);

    const result = writeThesisIntelligenceRun({ root: tempRoot, date: "2026-05-31", watchlist });
    expect(fs.existsSync(result.reportPath)).toBe(true);
    expect(result.summary.verdict_counts.THESIS_CONFIRMED_REVIEW).toBe(1);
  });
});
