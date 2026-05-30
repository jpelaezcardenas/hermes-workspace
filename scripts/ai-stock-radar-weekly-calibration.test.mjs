import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  bucketWatchlistCandidates,
  renderWeeklyCalibrationReport,
  writeWeeklyCalibration,
} from "./ai-stock-radar-weekly-calibration.mjs";
import { countSofortMachenItems } from "./ai-stock-radar-dry-run.mjs";

const watchlist = {
  version: 1,
  updated_at: "2026-06-05",
  provider_status: {
    market_data: "free_price_data_unavailable",
    filings: "available",
    news: "public_sources_only",
  },
  candidates: [
    {
      ticker: "KEEP",
      company: "Keep AI Inc.",
      category: "Breakout Watch",
      idea_grade: "A",
      score: 74,
      data_quality: "A",
      status: "watching",
      quality_notes: ["seed overlay and SEC evidence"],
    },
    {
      ticker: "FALSE",
      company: "False AI Name Inc.",
      category: "Avoid",
      idea_grade: "X",
      score: 44,
      data_quality: "C",
      status: "stale",
      quality_notes: ["name-only AI evidence; needs manual substance check"],
    },
    {
      ticker: "ARCH",
      company: "Archive Corp.",
      category: "Avoid",
      idea_grade: "X",
      score: 38,
      data_quality: "D",
      status: "stale",
      quality_notes: ["single public source only"],
    },
  ],
};

describe("AI stock radar weekly calibration", () => {
  it("buckets candidates for weekly calibration", () => {
    const buckets = bucketWatchlistCandidates(watchlist.candidates);

    expect(buckets.keep_review.map((candidate) => candidate.ticker)).toEqual(["KEEP"]);
    expect(buckets.false_positive_review.map((candidate) => candidate.ticker)).toEqual(["FALSE"]);
    expect(buckets.archive_review.map((candidate) => candidate.ticker)).toEqual(["ARCH"]);
  });

  it("renders a safe weekly calibration report", () => {
    const report = renderWeeklyCalibrationReport({
      date: "2026-06-07",
      watchlist,
      reportPath: "/tmp/weekly.md",
    });

    expect(report).toContain("# AI Stock Radar Weekly Calibration - 2026-06-07");
    expect(report).toContain("## Grade Summary");
    expect(report).toContain("- A: 1");
    expect(report).toContain("- X: 2");
    expect(report).toContain("## False Positive Review");
    expect(report).toContain("FALSE");
    expect(report).toContain("- SOFORT_MACHEN: nichts");
    expect(report).toContain("Keine automatischen Trades");
    expect(countSofortMachenItems(report)).toBe(0);
  });

  it("writes weekly calibration report without changing watchlist", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "ai-stock-weekly-"));
    fs.mkdirSync(path.join(root, "projects/ai-stock-radar"), { recursive: true });
    fs.writeFileSync(
      path.join(root, "projects/ai-stock-radar/watchlist.json"),
      `${JSON.stringify(watchlist, null, 2)}\n`,
    );

    const result = writeWeeklyCalibration({ root, date: "2026-06-07" });

    expect(fs.existsSync(result.reportPath)).toBe(true);
    expect(result.buckets.false_positive_review).toBe(1);
    expect(result.buckets.archive_review).toBe(1);
    expect(JSON.parse(fs.readFileSync(path.join(root, "projects/ai-stock-radar/watchlist.json"), "utf8"))).toEqual(
      watchlist,
    );
  });
});
