import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  applyCeoControl,
  buildFalsePositiveMemory,
  buildIntegrationAudit,
  buildSourceConfidenceLedger,
  evaluateRiskProfileFit,
  loadRiskProfile,
  writeIntegrationAudit,
} from "./ai-stock-radar-ceo-control.mjs";
import { applyEntryReadiness } from "./ai-stock-radar-paper-portfolio.mjs";
import { applyAdvancedSignals } from "./ai-stock-radar-advanced-signals.mjs";
import { applyThesisIntelligence } from "./ai-stock-radar-thesis-intelligence.mjs";
import { applyAlphaMemorySignal } from "./ai-stock-radar-alpha-memory.mjs";

function candidate(overrides = {}) {
  return {
    ticker: "CORE",
    company: "Core Robotics Inc.",
    category: "Breakout Watch",
    idea_grade: "B",
    score: 72,
    data_quality: "A",
    themes: ["robotics"],
    sources: ["Nasdaq Symbol Directory", "SEC submissions", "SEC companyfacts", "https://data.sec.gov/submissions/CIK0000000001.json"],
    price_volume: { status: "unavailable", confirmation: "unavailable" },
    evidence_firewall: {
      verdict: "pass",
      risk_flags: [],
      positive_labels: ["material_agreement"],
      support_labels: ["cash_runway_support"],
    },
    fundamental_snapshot: {
      status: "available",
      revenue_growth_yoy_pct: 22,
      cash_runway_quarters: 5,
      risks: [],
      supports: ["cash_runway_support"],
    },
    review_action: "WAIT_FOR_CONFIRMATION",
    quality_notes: [],
    top_risks: ["free-source evidence still needs manual review"],
    ...overrides,
  };
}

describe("AI stock radar CEO control", () => {
  it("builds a source confidence ledger that separates facts, interpretations, and gaps", () => {
    const ledger = buildSourceConfidenceLedger(candidate());

    expect(ledger.entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Listed common-equity universe", kind: "fact", confidence: "high" }),
        expect.objectContaining({ label: "SEC filing activity", kind: "fact", confidence: "high" }),
        expect.objectContaining({ label: "AI exposure thesis", kind: "interpretation", confidence: "medium" }),
        expect.objectContaining({ label: "Price/volume confirmation", kind: "missing", confidence: "none" }),
      ]),
    );
    expect(ledger.summary).toMatchObject({
      facts: 3,
      interpretations: 2,
      missing: 1,
    });
  });

  it("evaluates conservative CEO risk lanes without creating trade advice", () => {
    const profile = loadRiskProfile({ root: process.cwd() });

    expect(evaluateRiskProfileFit(candidate({ idea_grade: "A", price_volume: { status: "available", confirmation: "positive" } }), profile)).toMatchObject({
      lane: "focus",
      action: "CEO_VERIFY",
    });
    expect(evaluateRiskProfileFit(candidate({ evidence_firewall: { verdict: "caution", risk_flags: ["cash_runway_watch"] }, review_action: "CHECK_DILUTION" }), profile)).toMatchObject({
      lane: "manual_review",
      action: "CEO_REVIEW_RISK",
    });
    expect(evaluateRiskProfileFit(candidate({ category: "Avoid", idea_grade: "X", evidence_firewall: { verdict: "reject", risk_flags: ["delisting_watch"] } }), profile)).toMatchObject({
      lane: "reject",
      action: "CEO_ARCHIVE_REVIEW",
    });
  });

  it("attaches CEO control and source confidence to candidates", () => {
    const controlled = applyCeoControl(candidate(), loadRiskProfile({ root: process.cwd() }));

    expect(controlled.ceo_control).toMatchObject({
      lane: "monitor",
      action: "CEO_MONITOR",
    });
    expect(controlled.source_confidence.entries.length).toBeGreaterThan(3);
    expect(JSON.stringify(controlled)).not.toMatch(/buy|sell|option|leverage/i);
  });

  it("builds false-positive memory from recurring reject and caution patterns", () => {
    const memory = buildFalsePositiveMemory([
      candidate({ ticker: "NOISE", idea_grade: "X", evidence_firewall: { verdict: "caution", risk_flags: ["name_only_ai_watch"] }, review_action: "DOWNGRADE_REVIEW" }),
      candidate({ ticker: "DILUTE", idea_grade: "X", evidence_firewall: { verdict: "caution", risk_flags: ["offering_watch", "dilution_trend_watch"] }, review_action: "CHECK_DILUTION" }),
      candidate({ ticker: "DELIST", idea_grade: "X", evidence_firewall: { verdict: "reject", risk_flags: ["delisting_watch"] }, review_action: "ARCHIVE_REVIEW" }),
    ]);

    expect(memory.pattern_counts).toMatchObject({
      name_only_ai_watch: 1,
      offering_watch: 1,
      dilution_trend_watch: 1,
      delisting_watch: 1,
    });
    expect(memory.verdict_counts).toMatchObject({ caution: 2, reject: 1 });
    expect(memory.calibration_notes.join(" ")).toContain("delisting_watch");
  });

  it("audits whether phase 5 and phase 6 integration surfaces are present", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "ai-stock-ceo-audit-"));
    fs.mkdirSync(path.join(root, "projects/ai-stock-radar/prompts"), { recursive: true });
    fs.mkdirSync(path.join(root, "reports/ai-stock-radar"), { recursive: true });
    fs.mkdirSync(path.join(root, "scripts"), { recursive: true });
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/prompts/daily.md"), "Idea Grade\nPrice/Volume Confirmation\nEvidence Firewall\nCEO Control\nShadow Backtest\nPaper Portfolio\nAdvanced Signal Stack\nThesis Intelligence\nAlpha Memory\nPotential Candidate Board\n");
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/prompts/weekly.md"), "Grade Summary\nFirewall Summary\nCEO Control Summary\nFalse Positive Memory\nShadow Backtest Summary\nPaper Portfolio Summary\nAdvanced Signal Summary\nThesis Intelligence Summary\nAlpha Memory Summary\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-radar-2026-05-30.md"), "## Idea Grade\n## Price/Volume Confirmation\n## Evidence Firewall\n## CEO Control\n## Advanced Signal Stack\n## Thesis Intelligence\n## Alpha Memory\n## Potential Candidate Board\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-deepdive-2026-05-31.md"), "## Grade Summary\n## Firewall Summary\n## CEO Control Summary\n## False Positive Memory\n## Shadow Backtest Summary\n## Paper Portfolio Summary\n## Advanced Signal Summary\n## Thesis Intelligence Summary\n## Alpha Memory Summary\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-shadow-backtest-2026-05-30.md"), "# AI Stock Radar Shadow Backtest\n## 30-Day Calibration\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-paper-portfolio-2026-05-30.md"), "# AI Stock Radar Paper Portfolio\n## Entry Readiness\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-advanced-signals-2026-05-30.md"), "# AI Stock Radar Advanced Signals\n## Banger Score\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-thesis-intelligence-2026-05-30.md"), "# AI Stock Radar Thesis Intelligence\n## Thesis Verdicts\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-alpha-memory-2026-05-30.md"), "# AI Stock Radar Alpha Memory\n## Hypothesis Memory\n");
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/shadow-backtest-ledger.json"), JSON.stringify({ version: 1, snapshots: [] }));
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/paper-portfolio.json"), JSON.stringify({ version: 1, positions: [] }));
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/alpha-memory.json"), JSON.stringify({ version: 1, snapshots: [], assessments: [] }));
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-idea-grade.mjs"), "assignIdeaGrade");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-evidence-firewall.mjs"), "applyEvidenceFirewall");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-shadow-backtest.mjs"), "writeShadowBacktestRun");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-paper-portfolio.mjs"), "writePaperPortfolioRun");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-advanced-signals.mjs"), "writeAdvancedSignalsRun");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-thesis-intelligence.mjs"), "writeThesisIntelligenceRun");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-alpha-memory.mjs"), "writeAlphaMemoryRun");
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/watchlist.json"), JSON.stringify({
      version: 1,
      updated_at: "2026-05-30",
      provider_status: { market_data: "free_price_data_unavailable", filings: "available", news: "public_sources_only" },
      candidates: [applyAlphaMemorySignal(applyThesisIntelligence(applyAdvancedSignals(applyEntryReadiness(applyCeoControl(candidate(), loadRiskProfile({ root: process.cwd() }))))))]
    }));

    const audit = buildIntegrationAudit({ root, date: "2026-05-30" });

    expect(audit.status).toBe("pass");
    expect(audit.checks.every((check) => check.status === "pass")).toBe(true);
    expect(audit.checks.find((check) => check.id === "shadow_backtest_artifacts")).toMatchObject({ status: "pass" });
    expect(audit.checks.find((check) => check.id === "paper_portfolio_artifacts")).toMatchObject({ status: "pass" });
    expect(audit.checks.find((check) => check.id === "advanced_signals_module")).toMatchObject({ status: "pass" });
    expect(audit.checks.find((check) => check.id === "advanced_signals_artifacts")).toMatchObject({ status: "pass" });
    expect(audit.checks.find((check) => check.id === "thesis_intelligence_module")).toMatchObject({ status: "pass" });
    expect(audit.checks.find((check) => check.id === "thesis_intelligence_artifacts")).toMatchObject({ status: "pass" });
    expect(audit.checks.find((check) => check.id === "alpha_memory_module")).toMatchObject({ status: "pass" });
    expect(audit.checks.find((check) => check.id === "alpha_memory_artifacts")).toMatchObject({ status: "pass" });
  });

  it("fails the daily audit when the potential candidate board is missing", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "ai-stock-ceo-audit-potential-board-"));
    fs.mkdirSync(path.join(root, "projects/ai-stock-radar/prompts"), { recursive: true });
    fs.mkdirSync(path.join(root, "reports/ai-stock-radar"), { recursive: true });
    fs.mkdirSync(path.join(root, "scripts"), { recursive: true });
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/prompts/daily.md"), "Idea Grade\nPrice/Volume Confirmation\nEvidence Firewall\nCEO Control\nShadow Backtest\nPaper Portfolio\nAdvanced Signal Stack\nThesis Intelligence\nAlpha Memory\n");
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/prompts/weekly.md"), "Grade Summary\nFirewall Summary\nCEO Control Summary\nFalse Positive Memory\nShadow Backtest Summary\nPaper Portfolio Summary\nAdvanced Signal Summary\nThesis Intelligence Summary\nAlpha Memory Summary\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-radar-2026-05-30.md"), "## Idea Grade\n## Price/Volume Confirmation\n## Evidence Firewall\n## CEO Control\n## Advanced Signal Stack\n## Thesis Intelligence\n## Alpha Memory\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-deepdive-2026-05-31.md"), "## Grade Summary\n## Firewall Summary\n## CEO Control Summary\n## False Positive Memory\n## Shadow Backtest Summary\n## Paper Portfolio Summary\n## Advanced Signal Summary\n## Thesis Intelligence Summary\n## Alpha Memory Summary\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-shadow-backtest-2026-05-30.md"), "# AI Stock Radar Shadow Backtest\n## 30-Day Calibration\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-paper-portfolio-2026-05-30.md"), "# AI Stock Radar Paper Portfolio\n## Entry Readiness\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-advanced-signals-2026-05-30.md"), "# AI Stock Radar Advanced Signals\n## Banger Score\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-thesis-intelligence-2026-05-30.md"), "# AI Stock Radar Thesis Intelligence\n## Thesis Verdicts\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-alpha-memory-2026-05-30.md"), "# AI Stock Radar Alpha Memory\n## Hypothesis Memory\n");
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/shadow-backtest-ledger.json"), JSON.stringify({ version: 1, snapshots: [] }));
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/paper-portfolio.json"), JSON.stringify({ version: 1, positions: [] }));
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/alpha-memory.json"), JSON.stringify({ version: 1, snapshots: [], assessments: [] }));
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-idea-grade.mjs"), "assignIdeaGrade");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-evidence-firewall.mjs"), "applyEvidenceFirewall");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-shadow-backtest.mjs"), "writeShadowBacktestRun");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-paper-portfolio.mjs"), "writePaperPortfolioRun");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-advanced-signals.mjs"), "writeAdvancedSignalsRun");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-thesis-intelligence.mjs"), "writeThesisIntelligenceRun");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-alpha-memory.mjs"), "writeAlphaMemoryRun");
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/watchlist.json"), JSON.stringify({
      version: 1,
      updated_at: "2026-05-30",
      provider_status: { market_data: "free_price_data_unavailable", filings: "available", news: "public_sources_only" },
      candidates: [applyAlphaMemorySignal(applyThesisIntelligence(applyAdvancedSignals(applyEntryReadiness(applyCeoControl(candidate(), loadRiskProfile({ root: process.cwd() }))))))]
    }));

    const audit = buildIntegrationAudit({ root, date: "2026-05-30" });

    expect(audit.status).toBe("fail");
    expect(audit.checks.find((check) => check.id === "daily_prompt_sections").missing).toContain("Potential Candidate Board");
    expect(audit.checks.find((check) => check.id === "daily_report_sections").missing).toContain("## Potential Candidate Board");
  });

  it("writes a safe integration audit report", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "ai-stock-ceo-audit-write-"));
    fs.mkdirSync(path.join(root, "projects/ai-stock-radar/prompts"), { recursive: true });
    fs.mkdirSync(path.join(root, "reports/ai-stock-radar"), { recursive: true });
    fs.mkdirSync(path.join(root, "scripts"), { recursive: true });
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/prompts/daily.md"), "Idea Grade\nPrice/Volume Confirmation\nEvidence Firewall\nCEO Control\nShadow Backtest\nPaper Portfolio\nAdvanced Signal Stack\nThesis Intelligence\nAlpha Memory\nPotential Candidate Board\n");
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/prompts/weekly.md"), "Grade Summary\nFirewall Summary\nCEO Control Summary\nFalse Positive Memory\nShadow Backtest Summary\nPaper Portfolio Summary\nAdvanced Signal Summary\nThesis Intelligence Summary\nAlpha Memory Summary\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-radar-2026-05-30.md"), "## Idea Grade\n## Price/Volume Confirmation\n## Evidence Firewall\n## CEO Control\n## Advanced Signal Stack\n## Thesis Intelligence\n## Alpha Memory\n## Potential Candidate Board\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-deepdive-2026-05-31.md"), "## Grade Summary\n## Firewall Summary\n## CEO Control Summary\n## False Positive Memory\n## Shadow Backtest Summary\n## Paper Portfolio Summary\n## Advanced Signal Summary\n## Thesis Intelligence Summary\n## Alpha Memory Summary\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-shadow-backtest-2026-05-30.md"), "# AI Stock Radar Shadow Backtest\n## 30-Day Calibration\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-paper-portfolio-2026-05-30.md"), "# AI Stock Radar Paper Portfolio\n## Entry Readiness\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-advanced-signals-2026-05-30.md"), "# AI Stock Radar Advanced Signals\n## Banger Score\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-thesis-intelligence-2026-05-30.md"), "# AI Stock Radar Thesis Intelligence\n## Thesis Verdicts\n");
    fs.writeFileSync(path.join(root, "reports/ai-stock-radar/ai-stock-alpha-memory-2026-05-30.md"), "# AI Stock Radar Alpha Memory\n## Hypothesis Memory\n");
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/shadow-backtest-ledger.json"), JSON.stringify({ version: 1, snapshots: [] }));
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/paper-portfolio.json"), JSON.stringify({ version: 1, positions: [] }));
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/alpha-memory.json"), JSON.stringify({ version: 1, snapshots: [], assessments: [] }));
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-idea-grade.mjs"), "assignIdeaGrade");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-evidence-firewall.mjs"), "applyEvidenceFirewall");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-shadow-backtest.mjs"), "writeShadowBacktestRun");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-paper-portfolio.mjs"), "writePaperPortfolioRun");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-advanced-signals.mjs"), "writeAdvancedSignalsRun");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-thesis-intelligence.mjs"), "writeThesisIntelligenceRun");
    fs.writeFileSync(path.join(root, "scripts/ai-stock-radar-alpha-memory.mjs"), "writeAlphaMemoryRun");
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/watchlist.json"), JSON.stringify({
      version: 1,
      updated_at: "2026-05-30",
      provider_status: { market_data: "free_price_data_unavailable", filings: "available", news: "public_sources_only" },
      candidates: [applyAlphaMemorySignal(applyThesisIntelligence(applyAdvancedSignals(applyEntryReadiness(applyCeoControl(candidate(), loadRiskProfile({ root: process.cwd() }))))))]
    }));

    const result = writeIntegrationAudit({ root, date: "2026-05-30" });
    const report = fs.readFileSync(result.reportPath, "utf8");

    expect(report).toContain("# AI Stock Radar CEO Audit - 2026-05-30");
    expect(report).toContain("Status: pass");
    expect(report).toContain("- SOFORT_MACHEN: nichts");
    expect(report).not.toMatch(/buy now|sell now|jetzt kaufen|jetzt verkaufen/i);
  });
});
