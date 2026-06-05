import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  applyEntryReadiness,
  classifyEntryReadiness,
  classifyExitRisk,
  renderPaperPortfolioReport,
  summarizePaperPortfolio,
  updatePaperPortfolio,
  writePaperPortfolioRun,
} from "./ai-stock-radar-paper-portfolio.mjs";

function candidate(overrides = {}) {
  return {
    ticker: "BANG",
    company: "Banger AI Infrastructure Inc.",
    category: "Breakout Watch",
    score: 88,
    data_quality: "A",
    idea_grade: "A",
    themes: ["ai_infrastructure", "gpu_capacity"],
    evidence_firewall: {
      verdict: "pass",
      risk_flags: [],
    },
    ceo_control: {
      lane: "monitor",
      action: "CEO_MONITOR",
    },
    source_confidence: {
      summary: {
        facts: 3,
        interpretations: 2,
        missing: 0,
      },
    },
    price_volume: {
      status: "available",
      source: "stooq",
      confirmation: "positive",
      latest_date: "2026-05-31",
      latest_close: 12,
      return_20d_pct: 18,
      volume_ratio_20d: 2.1,
    },
    top_risks: [],
    ...overrides,
  };
}

function watchlist(candidates) {
  return {
    version: 1,
    updated_at: "2026-05-31",
    provider_status: {
      market_data: "free_price_data_unavailable",
      filings: "available",
      news: "public_sources_only",
    },
    candidates,
  };
}

describe("AI stock radar paper portfolio and readiness", () => {
  it("classifies entry readiness without creating real trade advice", () => {
    expect(classifyEntryReadiness(candidate())).toMatchObject({
      label: "ENTRY_READY",
      action: "PAPER_ENTRY_REVIEW",
    });
    expect(classifyEntryReadiness(candidate({
      evidence_firewall: { verdict: "caution", risk_flags: ["cash_runway_watch"] },
    }))).toMatchObject({
      label: "TOO_RISKY",
      action: "PAPER_ARCHIVE_REVIEW",
    });
    expect(classifyEntryReadiness(candidate({
      themes: ["ai_keyword_match"],
      evidence_firewall: { verdict: "pass", risk_flags: ["name_only_ai_watch"] },
    }))).toMatchObject({
      label: "FAKE_AI_HYPE",
      action: "PAPER_ARCHIVE_REVIEW",
    });
    expect(classifyEntryReadiness(candidate({
      price_volume: { status: "available", confirmation: "stretched", latest_close: 30, latest_date: "2026-05-31" },
    }))).toMatchObject({
      label: "LATE_MOVE",
      action: "PAPER_HOLD_REVIEW",
    });
    expect(classifyEntryReadiness(candidate({
      price_volume: { status: "unavailable", confirmation: "unavailable" },
    }))).toMatchObject({
      label: "WAIT_FOR_CONFIRMATION",
      action: "PAPER_HOLD_REVIEW",
    });
  });

  it("attaches entry readiness to watchlist candidates", () => {
    const annotated = applyEntryReadiness(candidate());

    expect(annotated.entry_readiness).toMatchObject({
      label: "ENTRY_READY",
      action: "PAPER_ENTRY_REVIEW",
    });
  });

  it("opens simulated paper positions only once for entry-ready candidates", () => {
    const portfolio = updatePaperPortfolio({
      portfolio: { version: 1, positions: [] },
      watchlist: watchlist([
        applyEntryReadiness(candidate({ ticker: "BANG" })),
        applyEntryReadiness(candidate({
          ticker: "RISK",
          evidence_firewall: { verdict: "reject", risk_flags: ["delisting_watch"] },
          ceo_control: { lane: "reject", action: "CEO_ARCHIVE_REVIEW" },
        })),
      ]),
      date: "2026-05-31",
    });
    const again = updatePaperPortfolio({
      portfolio,
      watchlist: watchlist([applyEntryReadiness(candidate({ ticker: "BANG", score: 99 }))]),
      date: "2026-05-31",
    });

    expect(again.positions).toHaveLength(1);
    expect(again.positions[0]).toMatchObject({
      id: "BANG:2026-05-31",
      ticker: "BANG",
      status: "paper_open",
      opened_at: "2026-05-31",
      paper_action: "PAPER_ENTRY_REVIEW",
      entry_price: {
        status: "available",
        close: 12,
        date: "2026-05-31",
      },
    });
  });

  it("marks paper positions for exit-risk review when the thesis weakens", () => {
    const position = updatePaperPortfolio({
      portfolio: { version: 1, positions: [] },
      watchlist: watchlist([applyEntryReadiness(candidate({ ticker: "BANG" }))]),
      date: "2026-05-31",
    }).positions[0];
    const riskCandidate = applyEntryReadiness(candidate({
      ticker: "BANG",
      evidence_firewall: { verdict: "reject", risk_flags: ["offering_watch", "dilution_trend_watch"] },
      ceo_control: { lane: "reject", action: "CEO_ARCHIVE_REVIEW" },
      price_volume: { status: "available", confirmation: "neutral", latest_close: 8, latest_date: "2026-06-10" },
    }));

    expect(classifyExitRisk(position, riskCandidate)).toMatchObject({
      label: "EXIT_RISK_REVIEW",
      action: "PAPER_EXIT_REVIEW",
    });

    const reviewed = updatePaperPortfolio({
      portfolio: { version: 1, positions: [position] },
      watchlist: watchlist([riskCandidate]),
      date: "2026-06-10",
    });
    expect(reviewed.positions[0]).toMatchObject({
      exit_risk: {
        label: "EXIT_RISK_REVIEW",
        action: "PAPER_EXIT_REVIEW",
      },
      latest_price: {
        close: 8,
      },
    });
  });

  it("summarizes paper portfolio state by action and exit risk", () => {
    const portfolio = {
      version: 1,
      positions: [
        { status: "paper_open", paper_action: "PAPER_ENTRY_REVIEW", exit_risk: { label: "THESIS_INTACT" } },
        { status: "paper_open", paper_action: "PAPER_ENTRY_REVIEW", exit_risk: { label: "EXIT_RISK_REVIEW" } },
      ],
    };

    expect(summarizePaperPortfolio(portfolio)).toMatchObject({
      total_positions: 2,
      open_positions: 2,
      action_counts: {
        PAPER_ENTRY_REVIEW: 2,
      },
      exit_risk_counts: {
        THESIS_INTACT: 1,
        EXIT_RISK_REVIEW: 1,
      },
    });
  });

  it("renders a safe paper portfolio report without real trade instructions", () => {
    const portfolio = updatePaperPortfolio({
      portfolio: { version: 1, positions: [] },
      watchlist: watchlist([applyEntryReadiness(candidate())]),
      date: "2026-05-31",
    });
    const report = renderPaperPortfolioReport({
      date: "2026-05-31",
      portfolio,
      reportPath: "/tmp/ai-stock-paper-portfolio.md",
    });

    expect(report).toContain("# AI Stock Radar Paper Portfolio - 2026-05-31");
    expect(report).toContain("## Entry Readiness");
    expect(report).toContain("PAPER_ENTRY_REVIEW");
    expect(report).toContain("- SOFORT_MACHEN: nichts");
    expect(report).toContain("Keine echten Trades");
    expect(report.toLowerCase()).not.toMatch(/buy now|sell now|strong buy|strong sell|open position|enter position|exit position|jetzt kaufen|jetzt verkaufen/);
  });

  it("writes paper portfolio state and report", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "ai-stock-paper-portfolio-"));
    fs.mkdirSync(path.join(root, "projects/ai-stock-radar"), { recursive: true });
    fs.writeFileSync(
      path.join(root, "projects/ai-stock-radar/watchlist.json"),
      `${JSON.stringify(watchlist([applyEntryReadiness(candidate())]), null, 2)}\n`,
    );

    const result = writePaperPortfolioRun({ root, date: "2026-05-31" });
    const portfolio = JSON.parse(fs.readFileSync(result.portfolioPath, "utf8"));
    const report = fs.readFileSync(result.reportPath, "utf8");

    expect(portfolio.positions).toHaveLength(1);
    expect(report).toContain("BANG");
    expect(result.summary.open_positions).toBe(1);
  });
});
