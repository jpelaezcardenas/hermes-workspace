import { describe, expect, it } from "vitest";

import {
  applyEvidenceFirewall,
  chooseReviewAction,
  decodeFilingEvents,
  evaluateFundamentalSnapshot,
} from "./ai-stock-radar-evidence-firewall.mjs";

function companyFacts(overrides = {}) {
  return {
    facts: {
      "us-gaap": {
        RevenueFromContractWithCustomerExcludingAssessedTax: {
          units: {
            USD: [
              { form: "10-Q", fy: 2025, fp: "Q1", end: "2025-03-31", filed: "2025-05-05", val: 10_000_000 },
              { form: "10-Q", fy: 2026, fp: "Q1", end: "2026-03-31", filed: "2026-05-05", val: 14_000_000 },
            ],
          },
        },
        CashAndCashEquivalentsAtCarryingValue: {
          units: {
            USD: [
              { form: "10-Q", fy: 2026, fp: "Q1", end: "2026-03-31", filed: "2026-05-05", val: 6_000_000 },
            ],
          },
        },
        NetCashProvidedByUsedInOperatingActivities: {
          units: {
            USD: [
              { form: "10-Q", fy: 2026, fp: "Q1", end: "2026-03-31", filed: "2026-05-05", val: -1_500_000 },
            ],
          },
        },
        EntityCommonStockSharesOutstanding: {
          units: {
            shares: [
              { form: "10-Q", fy: 2025, fp: "Q1", end: "2025-03-31", filed: "2025-05-05", val: 10_000_000 },
              { form: "10-Q", fy: 2026, fp: "Q1", end: "2026-03-31", filed: "2026-05-05", val: 11_000_000 },
            ],
          },
        },
        ...(overrides["us-gaap"] || {}),
      },
    },
  };
}

describe("AI stock radar evidence firewall", () => {
  it("decodes filing events into positive catalysts and hard risk blockers", () => {
    const events = decodeFilingEvents({
      forms: ["8-K", "10-Q"],
      items: ["1.01", "2.02", "3.01", "3.02", "5.03"],
      descriptions: [
        "Entry into a material definitive agreement with a major customer",
        "Results of operations and financial condition with updated guidance",
        "Notice of Nasdaq non-compliance and potential delisting",
        "Registered direct offering of common stock and warrants",
        "Reverse stock split approved by the board",
      ],
    });

    expect(events.positive_labels).toEqual(["material_agreement", "major_customer", "earnings_or_guidance_context"]);
    expect(events.risk_labels).toEqual(["delisting_watch", "offering_watch", "warrant_watch", "reverse_split_watch"]);
    expect(events.hard_catalyst).toBe(true);
    expect(events.hard_blocker).toBe(true);
  });

  it("extracts a conservative fundamental snapshot from SEC companyfacts", () => {
    const snapshot = evaluateFundamentalSnapshot(companyFacts());

    expect(snapshot.status).toBe("available");
    expect(snapshot.revenue_growth_yoy_pct).toBe(40);
    expect(snapshot.cash_runway_quarters).toBe(4);
    expect(snapshot.share_count_growth_yoy_pct).toBe(10);
    expect(snapshot.supports).toContain("revenue_growth_support");
    expect(snapshot.risks).toEqual([]);
  });

  it("marks weak cash runway and dilution trend as risks", () => {
    const snapshot = evaluateFundamentalSnapshot(
      companyFacts({
        "us-gaap": {
          CashAndCashEquivalentsAtCarryingValue: {
            units: { USD: [{ form: "10-Q", fy: 2026, fp: "Q1", end: "2026-03-31", filed: "2026-05-05", val: 1_000_000 }] },
          },
          NetCashProvidedByUsedInOperatingActivities: {
            units: { USD: [{ form: "10-Q", fy: 2026, fp: "Q1", end: "2026-03-31", filed: "2026-05-05", val: -2_000_000 }] },
          },
          EntityCommonStockSharesOutstanding: {
            units: {
              shares: [
                { form: "10-Q", fy: 2025, fp: "Q1", end: "2025-03-31", filed: "2025-05-05", val: 10_000_000 },
                { form: "10-Q", fy: 2026, fp: "Q1", end: "2026-03-31", filed: "2026-05-05", val: 14_000_000 },
              ],
            },
          },
        },
      }),
    );

    expect(snapshot.cash_runway_quarters).toBe(0.5);
    expect(snapshot.share_count_growth_yoy_pct).toBe(40);
    expect(snapshot.risks).toContain("cash_runway_watch");
    expect(snapshot.risks).toContain("dilution_trend_watch");
  });

  it("applies reject verdict and Avoid cap for hard filing blockers", () => {
    const firewall = applyEvidenceFirewall({
      filingEvents: decodeFilingEvents({
        items: ["3.01", "5.03"],
        descriptions: ["Nasdaq delisting notice", "Reverse stock split"],
      }),
      fundamentalSnapshot: evaluateFundamentalSnapshot(companyFacts()),
      existingRiskFlags: [],
    });

    expect(firewall.verdict).toBe("reject");
    expect(firewall.max_category).toBe("Avoid");
    expect(firewall.score_penalty).toBeGreaterThanOrEqual(30);
    expect(firewall.risk_flags).toContain("delisting_watch");
    expect(firewall.risk_flags).toContain("reverse_split_watch");
    expect(chooseReviewAction(firewall)).toBe("ARCHIVE_REVIEW");
  });

  it("applies caution verdict for dilution and weak cash without hard blockers", () => {
    const firewall = applyEvidenceFirewall({
      filingEvents: decodeFilingEvents({
        items: ["3.02"],
        descriptions: ["Registered direct offering of common stock and warrants"],
      }),
      fundamentalSnapshot: {
        status: "available",
        risks: ["cash_runway_watch", "dilution_trend_watch"],
        supports: [],
      },
      existingRiskFlags: [],
    });

    expect(firewall.verdict).toBe("caution");
    expect(firewall.max_category).toBe("Early Watch");
    expect(firewall.risk_flags).toContain("offering_watch");
    expect(firewall.risk_flags).toContain("cash_runway_watch");
    expect(chooseReviewAction(firewall)).toBe("CHECK_DILUTION");
  });
});
