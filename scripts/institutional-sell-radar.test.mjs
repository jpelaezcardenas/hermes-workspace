import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  buildInstitutionalSellPressureSignal,
  buildSellRadarUniverse,
  detectExistingStockJobs,
  renderInstitutionalSellRadarReport,
  summarizeInstitutionalSellPressure,
  writeInstitutionalSellRadarRun,
} from "./institutional-sell-radar.mjs";

function baseCandidate(overrides = {}) {
  return {
    ticker: "AIUS",
    company: "AI US Infrastructure Inc.",
    exchange: "Nasdaq",
    score: 72,
    idea_grade: "B",
    evidence_firewall: { verdict: "pass", risk_flags: [] },
    price_volume: {
      status: "available",
      confirmation: "neutral",
      return_20d_pct: -4,
      volume_ratio_20d: 1.1,
    },
    ...overrides,
  };
}

describe("Institutional sell pressure radar", () => {
  it("detects existing stock jobs and recommends same morning block scheduling", () => {
    const jobs = [
      { id: "230fd5468b64", name: "AI_STOCK_RADAR_DAILY", schedule: "35 9 * * 1-5" },
      { id: "d157c13def75", name: "AI_STOCK_DEEPDIVE_WEEKLY", schedule: "30 16 * * 0" },
    ];

    const alignment = detectExistingStockJobs(jobs);

    expect(alignment.daily_job?.name).toBe("AI_STOCK_RADAR_DAILY");
    expect(alignment.weekly_job?.name).toBe("AI_STOCK_DEEPDIVE_WEEKLY");
    expect(alignment.recommended_daily_schedule).toBe("50 9 * * 1-5");
    expect(alignment.reason).toMatch(/same morning block/i);
  });

  it("builds a US-focused universe from the AI stock watchlist and optional extras", () => {
    const universe = buildSellRadarUniverse({
      aiWatchlist: {
        candidates: [
          baseCandidate({ ticker: "AIUS", exchange: "Nasdaq" }),
          baseCandidate({ ticker: "AIGB", exchange: "London Stock Exchange" }),
        ],
      },
      sellWatchlist: {
        extra_tickers: [
          { ticker: "NVDA", company: "NVIDIA Corporation", exchange: "Nasdaq", country: "US" },
        ],
      },
    });

    expect(universe.map((candidate) => candidate.ticker)).toEqual(["AIUS", "NVDA"]);
    expect(universe.every((candidate) => candidate.country === "US")).toBe(true);
  });

  it("caps delayed 13F-only reductions at watch instead of urgent review", () => {
    const signal = buildInstitutionalSellPressureSignal(baseCandidate(), {
      observations: [
        {
          ticker: "AIUS",
          source: "SEC",
          form: "13F-HR",
          holder: "Global Mega Asset Management",
          holder_scope: "global_institution",
          shares_previous: 10_000_000,
          shares_current: 5_000_000,
          report_date: "2026-03-31",
          filed_at: "2026-05-15",
        },
      ],
      date: "2026-05-31",
    });

    expect(signal.risk_level).toBe("WATCH");
    expect(signal.score).toBeLessThan(60);
    expect(signal.source_latency).toBe("quarterly_delayed");
    expect(signal.reasons).toEqual(expect.arrayContaining(["13F-only signal capped because data is delayed quarterly"]));
  });

  it("escalates beneficial-owner reductions plus insider sell cluster and negative context", () => {
    const signal = buildInstitutionalSellPressureSignal(baseCandidate({
      evidence_firewall: { verdict: "caution", risk_flags: ["dilution_trend_watch"] },
      price_volume: {
        status: "available",
        confirmation: "negative",
        return_20d_pct: -22,
        volume_ratio_20d: 2.4,
      },
    }), {
      observations: [
        {
          ticker: "AIUS",
          source: "SEC",
          form: "SC 13D/A",
          holder: "Sovereign Tech Fund",
          holder_scope: "global_institution",
          shares_previous: 6_000_000,
          shares_current: 3_000_000,
          filed_at: "2026-05-30",
        },
        {
          ticker: "AIUS",
          source: "SEC",
          form: "4",
          holder: "Director A",
          transaction_code: "S",
          shares_current: 100_000,
          filed_at: "2026-05-30",
        },
        {
          ticker: "AIUS",
          source: "SEC",
          form: "4",
          holder: "10 Percent Holder B",
          transaction_code: "S",
          shares_current: 250_000,
          filed_at: "2026-05-30",
        },
      ],
      date: "2026-05-31",
    });

    expect(signal.risk_level).toBe("CRITICAL_REVIEW");
    expect(signal.review_action).toBe("SELL_PRESSURE_ESCALATE");
    expect(signal.evidence.beneficial_owner_alerts).toHaveLength(1);
    expect(signal.evidence.insider_or_ten_percent_holder_sales).toHaveLength(2);
    expect(signal.reasons).toEqual(expect.arrayContaining(["beneficial ownership reduction detected", "insider or 10 percent holder sale cluster detected"]));
  });

  it("keeps short-pressure-only context informational", () => {
    const signal = buildInstitutionalSellPressureSignal(baseCandidate(), {
      observations: [
        {
          ticker: "AIUS",
          source: "FINRA",
          form: "DAILY_SHORT_VOLUME",
          short_volume_ratio: 0.72,
          trade_date: "2026-05-29",
        },
      ],
      date: "2026-05-31",
    });

    expect(signal.risk_level).toBe("INFO");
    expect(signal.review_action).toBe("SELL_PRESSURE_MONITOR");
    expect(signal.reasons).toEqual(expect.arrayContaining(["short-pressure-only context is not institutional selling evidence"]));
  });

  it("summarizes and renders safe daily report sections", () => {
    const candidates = [
      {
        ...baseCandidate({ ticker: "WATCH" }),
        institutional_sell_pressure: buildInstitutionalSellPressureSignal(baseCandidate({ ticker: "WATCH" }), {
          observations: [{ ticker: "WATCH", form: "13F-HR", holder: "Mega Fund", shares_previous: 100, shares_current: 50 }],
          date: "2026-05-31",
        }),
      },
      {
        ...baseCandidate({ ticker: "INFO" }),
        institutional_sell_pressure: buildInstitutionalSellPressureSignal(baseCandidate({ ticker: "INFO" }), {
          observations: [],
          date: "2026-05-31",
        }),
      },
    ];

    const summary = summarizeInstitutionalSellPressure(candidates);
    const report = renderInstitutionalSellRadarReport({
      date: "2026-05-31",
      candidates,
      summary,
      reportPath: "/tmp/institutional.md",
      jobAlignment: { daily_job: { name: "AI_STOCK_RADAR_DAILY", schedule: "35 9 * * 1-5" }, recommended_daily_schedule: "50 9 * * 1-5" },
    });

    for (const section of [
      "# Institutional Sell Pressure Radar - 2026-05-31",
      "## Existing Stock Job Alignment",
      "## New Warnings",
      "## Top Sell Pressure",
      "## 13F Ownership Changes",
      "## 13D/13G Alerts",
      "## Insider / 10 Percent Holder Activity",
      "## Short Pressure Context",
      "## Price/Volume Confirmation",
      "## False Positive Checks",
      "## Datenqualitaet Und Luecken",
      "## Decision Inbox",
    ]) {
      expect(report).toContain(section);
    }

    expect(summary.risk_counts.WATCH).toBe(1);
    expect(report.toLowerCase()).not.toMatch(/sell now|short now|buy now|strong sell|price target|kursziel|option|leverage|margin|garantiert/);
  });

  it("writes state and report artifacts for a daily run", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "sell-radar-"));
    fs.mkdirSync(path.join(root, "projects/ai-stock-radar"), { recursive: true });
    fs.writeFileSync(path.join(root, "projects/ai-stock-radar/watchlist.json"), JSON.stringify({
      candidates: [baseCandidate()],
    }));

    const result = writeInstitutionalSellRadarRun({
      root,
      date: "2026-05-31",
      observations: [
        { ticker: "AIUS", form: "SC 13G/A", holder: "Global Fund", shares_previous: 1_000, shares_current: 600, filed_at: "2026-05-30" },
      ],
      cronJobs: [{ name: "AI_STOCK_RADAR_DAILY", schedule: "35 9 * * 1-5" }],
    });

    expect(fs.existsSync(result.reportPath)).toBe(true);
    expect(fs.existsSync(result.ledgerPath)).toBe(true);
    expect(fs.existsSync(result.memoryPath)).toBe(true);
    expect(result.summary.risk_counts.WARNING + result.summary.risk_counts.CRITICAL_REVIEW).toBeGreaterThanOrEqual(1);
  });
});
