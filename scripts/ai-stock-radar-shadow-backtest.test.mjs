import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  assessShadowOutcomes,
  captureShadowSnapshots,
  renderShadowBacktestReport,
  summarizeShadowBacktest,
  writeShadowBacktestRun,
} from "./ai-stock-radar-shadow-backtest.mjs";

function candidate(overrides = {}) {
  return {
    ticker: "AICORE",
    company: "AI Core Systems Inc.",
    category: "Breakout Watch",
    score: 82,
    data_quality: "A",
    idea_grade: "A",
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
      latest_date: "2026-05-01",
      latest_close: 10,
      confirmation: "positive",
    },
    ...overrides,
  };
}

function watchlist(candidates) {
  return {
    version: 1,
    updated_at: "2026-05-01",
    provider_status: {
      market_data: "free_price_data_unavailable",
      filings: "available",
      news: "public_sources_only",
    },
    candidates,
  };
}

describe("AI stock radar shadow backtest", () => {
  it("captures immutable 30-day snapshots without duplicating ticker/date rows", () => {
    const first = captureShadowSnapshots({
      ledger: { version: 1, snapshots: [] },
      watchlist: watchlist([candidate()]),
      date: "2026-05-01",
      horizonDays: 30,
    });
    const second = captureShadowSnapshots({
      ledger: first,
      watchlist: watchlist([candidate({ score: 99 })]),
      date: "2026-05-01",
      horizonDays: 30,
    });

    expect(second.snapshots).toHaveLength(1);
    expect(second.snapshots[0]).toMatchObject({
      id: "2026-05-01:AICORE",
      observed_at: "2026-05-01",
      due_at: "2026-05-31",
      ticker: "AICORE",
      idea_grade: "A",
      score: 82,
      status: "pending",
      entry_price: {
        status: "available",
        close: 10,
        date: "2026-05-01",
      },
      ceo_lane: "monitor",
      firewall_verdict: "pass",
      source_confidence: {
        facts: 3,
        interpretations: 2,
        missing: 0,
      },
    });
  });

  it("assesses due snapshots as constructive, risk_confirmed, or unavailable", () => {
    const ledger = captureShadowSnapshots({
      ledger: { version: 1, snapshots: [] },
      watchlist: watchlist([
        candidate({ ticker: "GOOD", price_volume: { status: "available", latest_date: "2026-05-01", latest_close: 10, confirmation: "positive" } }),
        candidate({ ticker: "RISK", price_volume: { status: "available", latest_date: "2026-05-01", latest_close: 10, confirmation: "neutral" } }),
        candidate({ ticker: "MISS", price_volume: { status: "unavailable", confirmation: "unavailable" } }),
      ]),
      date: "2026-05-01",
      horizonDays: 30,
    });

    const assessed = assessShadowOutcomes({
      ledger,
      watchlist: watchlist([
        candidate({ ticker: "GOOD", price_volume: { status: "available", latest_date: "2026-05-31", latest_close: 11.5, confirmation: "positive" } }),
        candidate({
          ticker: "RISK",
          evidence_firewall: { verdict: "reject", risk_flags: ["delisting_watch"] },
          ceo_control: { lane: "reject", action: "CEO_ARCHIVE_REVIEW" },
          price_volume: { status: "available", latest_date: "2026-05-31", latest_close: 7.5, confirmation: "neutral" },
        }),
        candidate({ ticker: "MISS", price_volume: { status: "unavailable", confirmation: "unavailable" } }),
      ]),
      date: "2026-05-31",
    });

    expect(assessed.snapshots.find((snapshot) => snapshot.ticker === "GOOD")).toMatchObject({
      status: "assessed",
      outcome_label: "constructive",
      observed_return_pct: 15,
    });
    expect(assessed.snapshots.find((snapshot) => snapshot.ticker === "RISK")).toMatchObject({
      status: "assessed",
      outcome_label: "risk_confirmed",
      observed_return_pct: -25,
    });
    expect(assessed.snapshots.find((snapshot) => snapshot.ticker === "MISS")).toMatchObject({
      status: "unavailable",
      outcome_label: "unavailable",
    });
  });

  it("summarizes calibration counts by status, grade, and CEO lane", () => {
    const summary = summarizeShadowBacktest({
      version: 1,
      snapshots: [
        { status: "assessed", outcome_label: "constructive", idea_grade: "A", ceo_lane: "monitor" },
        { status: "assessed", outcome_label: "risk_confirmed", idea_grade: "X", ceo_lane: "reject" },
        { status: "pending", idea_grade: "B", ceo_lane: "monitor" },
        { status: "unavailable", outcome_label: "unavailable", idea_grade: "C", ceo_lane: "manual_review" },
      ],
    });

    expect(summary).toMatchObject({
      total_snapshots: 4,
      assessed: 2,
      pending: 1,
      unavailable: 1,
      outcome_counts: {
        constructive: 1,
        risk_confirmed: 1,
        unavailable: 1,
      },
      grade_outcomes: {
        A: { constructive: 1 },
        X: { risk_confirmed: 1 },
      },
      lane_outcomes: {
        monitor: { constructive: 1 },
        reject: { risk_confirmed: 1 },
      },
    });
  });

  it("renders a safe shadow report without trading language", () => {
    const report = renderShadowBacktestReport({
      date: "2026-05-31",
      reportPath: "/tmp/ai-stock-shadow-backtest.md",
      ledger: {
        version: 1,
        snapshots: [
          {
            id: "2026-05-01:AICORE",
            ticker: "AICORE",
            idea_grade: "A",
            ceo_lane: "monitor",
            status: "assessed",
            outcome_label: "constructive",
            observed_return_pct: 12.5,
          },
        ],
      },
    });

    expect(report).toContain("# AI Stock Radar Shadow Backtest - 2026-05-31");
    expect(report).toContain("## 30-Day Calibration");
    expect(report).toContain("constructive");
    expect(report).toContain("- SOFORT_MACHEN: nichts");
    expect(report).toContain("Keine automatischen Trades");
    expect(report.toLowerCase()).not.toMatch(/buy now|sell now|strong buy|strong sell|open position|enter position|exit position|jetzt kaufen|jetzt verkaufen/);
  });

  it("writes the shadow ledger and report from the current watchlist", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "ai-stock-shadow-backtest-"));
    fs.mkdirSync(path.join(root, "projects/ai-stock-radar"), { recursive: true });
    fs.writeFileSync(
      path.join(root, "projects/ai-stock-radar/watchlist.json"),
      `${JSON.stringify(watchlist([candidate()]), null, 2)}\n`,
    );

    const result = writeShadowBacktestRun({
      root,
      date: "2026-05-01",
      horizonDays: 30,
    });
    const ledger = JSON.parse(fs.readFileSync(result.ledgerPath, "utf8"));
    const report = fs.readFileSync(result.reportPath, "utf8");

    expect(ledger.snapshots).toHaveLength(1);
    expect(ledger.snapshots[0].due_at).toBe("2026-05-31");
    expect(report).toContain("AICORE");
    expect(result.snapshotCount).toBe(1);
  });
});
