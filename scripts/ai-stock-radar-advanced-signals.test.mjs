import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  applyAdvancedSignals,
  buildAdvancedSignals,
  loadAdvancedSignalContext,
  renderAdvancedSignalsReport,
  summarizeAdvancedSignals,
  writeAdvancedSignalsRun,
} from "./ai-stock-radar-advanced-signals.mjs";

function candidate(overrides = {}) {
  return {
    ticker: "CORE",
    company: "Core AI Infrastructure Inc.",
    category: "Breakout Watch",
    idea_grade: "A",
    score: 82,
    data_quality: "A",
    themes: ["ai_infrastructure", "gpu_capacity"],
    filing_events: {
      positive_labels: ["material_agreement", "major_customer"],
      risk_labels: [],
      hard_catalyst: true,
      hard_blocker: false,
    },
    evidence_firewall: {
      verdict: "pass",
      risk_flags: [],
      positive_labels: ["material_agreement", "major_customer"],
      support_labels: ["revenue_growth_support"],
      score_penalty: 0,
      notes: [],
    },
    ceo_control: {
      lane: "focus",
      action: "CEO_VERIFY",
      reasons: ["profile fit", "strong evidence stack"],
    },
    source_confidence: {
      summary: { facts: 3, interpretations: 2, missing: 0 },
      entries: [],
    },
    entry_readiness: {
      label: "ENTRY_READY",
      action: "PAPER_ENTRY_REVIEW",
      reasons: ["paper context aligned"],
    },
    price_volume: {
      status: "available",
      source: "stooq",
      confirmation: "positive",
      latest_close: 12.4,
      latest_volume: 1450000,
      return_20d_pct: 28,
      volume_ratio_20d: 2.1,
    },
    fundamental_snapshot: {
      status: "available",
      revenue_growth_yoy_pct: 31,
      cash_runway_quarters: 5,
      risks: [],
      supports: ["revenue_growth_support"],
    },
    top_risks: [],
    quality_notes: ["8-K material agreement and customer expansion evidence"],
    sources: ["Nasdaq Symbol Directory", "SEC submissions", "SEC companyfacts"],
    last_checked: "2026-05-31",
    ...overrides,
  };
}

const context = {
  basket: {
    version: 1,
    default_return_20d_pct: 9,
    tickers: {
      CORE: { return_20d_pct: 9 },
    },
  },
  ownership: {
    version: 1,
    tickers: {
      CORE: {
        form4_signal: "supportive",
        institutional_signal: "supportive_accumulation",
        notes: ["optional local context only"],
      },
    },
  },
};

describe("AI stock radar advanced signals", () => {
  it("labels the strongest evidence stack as a banger candidate for research review", () => {
    const signals = buildAdvancedSignals(candidate(), context);

    expect(signals.banger_label).toBe("BANGER_CANDIDATE_REVIEW");
    expect(signals.review_action).toBe("ADVANCED_REVIEW");
    expect(signals.banger_score).toBeGreaterThanOrEqual(70);
    expect(signals.components.sec_catalyst.label).toBe("material_agreement");
    expect(signals.components.customer_proof.label).toBe("hard_customer_or_contract");
    expect(signals.components.relative_strength.label).toBe("outperform");
    expect(signals.components.liquidity.label).toBe("usable");
    expect(signals.components.ownership.label).toBe("supportive");
    expect(signals.components.thesis_invalidation.label).toBe("none");
    expect(JSON.stringify(signals)).not.toMatch(/buy|sell|option|leverage|margin|price target/i);
  });

  it("turns hard evidence and structure risks into risk traps before score promotion", () => {
    const signals = buildAdvancedSignals(
      candidate({
        ticker: "RISK",
        category: "Avoid",
        idea_grade: "X",
        evidence_firewall: {
          verdict: "reject",
          risk_flags: ["delisting_watch", "reverse_split_watch"],
          positive_labels: [],
          support_labels: [],
          notes: ["delisting watch"],
        },
        ceo_control: { lane: "reject", action: "CEO_ARCHIVE_REVIEW" },
        entry_readiness: { label: "TOO_RISKY", action: "PAPER_ARCHIVE_REVIEW", reasons: ["risk gate"] },
      }),
      context,
    );

    expect(signals.banger_label).toBe("RISK_TRAP");
    expect(signals.review_action).toBe("ADVANCED_ARCHIVE_REVIEW");
    expect(signals.banger_score).toBeLessThanOrEqual(25);
    expect(signals.components.thesis_invalidation.label).toBe("invalidated");
    expect(signals.reasons.join(" ")).toContain("hard risk gate");
  });

  it("keeps name-only AI candidates out of positive labels", () => {
    const signals = buildAdvancedSignals(
      candidate({
        ticker: "NOISE",
        category: "Avoid",
        idea_grade: "X",
        themes: ["ai_keyword_match"],
        evidence_firewall: {
          verdict: "caution",
          risk_flags: ["name_only_ai_watch"],
          positive_labels: [],
          support_labels: [],
          notes: ["name-only AI evidence"],
        },
        ceo_control: { lane: "manual_review", action: "CEO_REVIEW_RISK" },
        entry_readiness: { label: "FAKE_AI_HYPE", action: "PAPER_ARCHIVE_REVIEW", reasons: ["name-only AI"] },
      }),
      context,
    );

    expect(signals.banger_label).toBe("RISK_TRAP");
    expect(signals.components.customer_proof.label).toBe("none");
    expect(signals.components.thesis_invalidation.reasons.join(" ")).toMatch(/name-only/i);
  });

  it("treats missing basket and ownership context as unavailable instead of bullish", () => {
    const signals = buildAdvancedSignals(candidate({ ticker: "GAP" }), {});

    expect(signals.components.relative_strength.label).toBe("unavailable");
    expect(signals.components.ownership.label).toBe("unavailable");
    expect(signals.banger_score).toBeLessThan(buildAdvancedSignals(candidate(), context).banger_score);
  });

  it("attaches advanced signals and summarizes labels", () => {
    const enriched = [
      applyAdvancedSignals(candidate({ ticker: "CORE" }), context),
      applyAdvancedSignals(candidate({ ticker: "WAIT", idea_grade: "B", ceo_control: { lane: "monitor" }, price_volume: { status: "unavailable", confirmation: "unavailable" } }), context),
      applyAdvancedSignals(candidate({ ticker: "RISK", category: "Avoid", idea_grade: "X", evidence_firewall: { verdict: "reject", risk_flags: ["delisting_watch"] } }), context),
    ];
    const summary = summarizeAdvancedSignals(enriched);

    expect(enriched.every((item) => item.advanced_signals)).toBe(true);
    expect(summary.label_counts.BANGER_CANDIDATE_REVIEW).toBe(1);
    expect(summary.label_counts.RISK_TRAP).toBe(1);
    expect(summary.review_queue[0].ticker).toBe("CORE");
  });

  it("renders and writes a safe companion report", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ai-stock-advanced-"));
    const watchlist = {
      version: 1,
      updated_at: "2026-05-31",
      candidates: [applyAdvancedSignals(candidate(), context)],
    };
    const report = renderAdvancedSignalsReport({
      date: "2026-05-31",
      watchlist,
      reportPath: "/tmp/advanced.md",
    });

    expect(report).toContain("# AI Stock Radar Advanced Signals - 2026-05-31");
    expect(report).toContain("## Banger Score");
    expect(report).toContain("## Component Summary");
    expect(report).toContain("CORE");
    expect(report).toContain("- SOFORT_MACHEN: nichts");
    expect(report).toContain("research-only");
    expect(report.toLowerCase()).not.toMatch(/buy now|sell now|strong buy|strong sell|open position|price target|jetzt kaufen|jetzt verkaufen/);

    const result = writeAdvancedSignalsRun({ root: tempRoot, date: "2026-05-31", watchlist });
    expect(fs.existsSync(result.reportPath)).toBe(true);
    expect(result.summary.label_counts.BANGER_CANDIDATE_REVIEW).toBe(1);
  });

  it("loads optional context files when they exist", () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ai-stock-advanced-context-"));
    fs.mkdirSync(path.join(tempRoot, "projects/ai-stock-radar"), { recursive: true });
    fs.writeFileSync(
      path.join(tempRoot, "projects/ai-stock-radar/ai-basket-context.json"),
      `${JSON.stringify({ version: 1, default_return_20d_pct: 7 }, null, 2)}\n`,
    );
    fs.writeFileSync(
      path.join(tempRoot, "projects/ai-stock-radar/ownership-context.json"),
      `${JSON.stringify({ version: 1, tickers: { CORE: { form4_signal: "supportive" } } }, null, 2)}\n`,
    );

    const loaded = loadAdvancedSignalContext({ root: tempRoot });

    expect(loaded.basket.default_return_20d_pct).toBe(7);
    expect(loaded.ownership.tickers.CORE.form4_signal).toBe("supportive");
  });
});
