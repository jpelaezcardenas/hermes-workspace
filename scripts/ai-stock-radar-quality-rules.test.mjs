import { describe, expect, it } from "vitest";

import {
  applyQualityPenalty,
  classifyCalibrationBucket,
  evaluateEvidenceQuality,
  extractFilingQualityLabels,
  updateCandidateAging,
} from "./ai-stock-radar-quality-rules.mjs";

function record(overrides = {}) {
  return {
    ticker: "AISP",
    company: "Airship AI Holdings, Inc.",
    security_name: "Airship AI Holdings, Inc. Class A Common Stock",
    themes: ["ai_keyword_match"],
    ai_exposure: "core",
    catalyst_labels: ["recent_public_company_filings", "recent_8k"],
    source_types: ["nasdaq_symbol_directory", "sec_company_tickers", "sec_submissions", "sec_companyfacts"],
    recent_filings: ["10-K", "10-Q", "8-K"],
    risk_flags: [],
    ...overrides,
  };
}

describe("AI stock radar quality rules", () => {
  it("flags and penalizes name-only AI evidence", () => {
    const quality = evaluateEvidenceQuality(record());

    expect(quality.riskFlags).toContain("name_only_ai_watch");
    expect(quality.scorePenalty).toBeGreaterThanOrEqual(20);
    expect(quality.maxCategory).toBe("Early Watch");
  });

  it("does not apply name-only penalty when seed themes or hard catalysts support the evidence", () => {
    const quality = evaluateEvidenceQuality(
      record({
        themes: ["enterprise_ai_software", "ai_keyword_match"],
        catalyst_labels: ["hard_catalyst", "recent_8k"],
      }),
    );

    expect(quality.riskFlags).not.toContain("name_only_ai_watch");
    expect(quality.maxCategory).toBe("Deep Dive");
  });

  it("labels weak security structures as avoid risks", () => {
    const quality = evaluateEvidenceQuality(
      record({
        security_name: "Example AI Corp. Warrants",
      }),
    );

    expect(quality.riskFlags).toContain("security_structure_watch");
    expect(quality.maxCategory).toBe("Avoid");
  });

  it("extracts filing quality labels from recent filing descriptions", () => {
    const labels = extractFilingQualityLabels([
      "Entry 2.02 Results of Operations and Financial Condition",
      "Registered direct offering of common stock and warrants",
      "Going concern disclosure in annual report",
      "Reverse stock split approved by board",
      "Merger agreement announced",
    ]);

    expect(labels).toContain("earnings_or_guidance_context");
    expect(labels).toContain("offering_watch");
    expect(labels).toContain("going_concern_watch");
    expect(labels).toContain("reverse_split_watch");
    expect(labels).toContain("ma_catalyst");
  });

  it("applies score penalties without going below zero", () => {
    expect(applyQualityPenalty({ score: 18, penalty: 25 })).toBe(0);
    expect(applyQualityPenalty({ score: 73, penalty: 25 })).toBe(48);
  });

  it("updates candidate aging and marks stale weak candidates", () => {
    const aged = updateCandidateAging({
      candidate: {
        ticker: "NOISE",
        score: 48,
        data_quality: "C",
        status: "fresh",
        first_seen: "2026-05-20",
        last_checked: "2026-05-30",
        quality_notes: ["name-only AI evidence"],
      },
      date: "2026-06-05",
    });

    expect(aged.age_days).toBe(16);
    expect(aged.status).toBe("stale");
  });

  it("assigns false-positive and archive buckets for weekly calibration", () => {
    expect(
      classifyCalibrationBucket({
        ticker: "NOISE",
        score: 44,
        data_quality: "C",
        status: "stale",
        quality_notes: ["name-only AI evidence"],
      }),
    ).toBe("false_positive_review");

    expect(
      classifyCalibrationBucket({
        ticker: "ARCH",
        score: 38,
        data_quality: "D",
        status: "stale",
        quality_notes: ["single public source only"],
      }),
    ).toBe("archive_review");
  });
});
