import { describe, expect, it } from "vitest";

import { assignIdeaGrade, gradeSortRank } from "./ai-stock-radar-idea-grade.mjs";

function candidate(overrides = {}) {
  return {
    ticker: "CORE",
    category: "Breakout Watch",
    score: 82,
    data_quality: "A",
    themes: ["robotics", "ai_keyword_match"],
    catalyst: 18,
    signal_breadth: 10,
    top_risks: ["free-source evidence still needs manual review"],
    quality_notes: [],
    catalyst_labels: ["hard_catalyst"],
    price_volume: {
      status: "available",
      confirmation: "positive",
      volume_ratio_20d: 2.4,
      return_20d_pct: 24,
    },
    evidence_firewall: {
      verdict: "pass",
      risk_flags: [],
    },
    ...overrides,
  };
}

describe("AI stock radar idea grade", () => {
  it("assigns S only to high-quality, catalyst-backed, price-confirmed ideas", () => {
    expect(assignIdeaGrade(candidate({ score: 88 })).grade).toBe("S");
  });

  it("assigns A to strong ideas that are missing one S-tier confirmation", () => {
    expect(assignIdeaGrade(candidate({ price_volume: { status: "unavailable" } })).grade).toBe("A");
  });

  it("assigns B/C to watch ideas with gaps", () => {
    expect(assignIdeaGrade(candidate({ score: 67, data_quality: "B", catalyst: 12 })).grade).toBe("B");
    expect(assignIdeaGrade(candidate({ score: 52, data_quality: "C", catalyst: 8 })).grade).toBe("C");
  });

  it("assigns X to avoid, name-only, or severe-risk candidates", () => {
    expect(assignIdeaGrade(candidate({ category: "Avoid" })).grade).toBe("X");
    expect(assignIdeaGrade(candidate({ quality_notes: ["name-only AI evidence; needs manual substance check"] })).grade).toBe("X");
    expect(assignIdeaGrade(candidate({ themes: ["ai_keyword_match"] })).grade).toBe("X");
    expect(assignIdeaGrade(candidate({ top_risks: ["going concern watch"] })).grade).toBe("X");
    expect(assignIdeaGrade(candidate({ evidence_firewall: { verdict: "reject", risk_flags: ["delisting_watch"] } })).grade).toBe("X");
  });

  it("blocks S and A when the evidence firewall is not pass", () => {
    expect(assignIdeaGrade(candidate({ score: 88, evidence_firewall: { verdict: "caution", risk_flags: ["offering_watch"] } })).grade).toBe("B");
    expect(assignIdeaGrade(candidate({ evidence_firewall: { verdict: "caution", risk_flags: ["cash_runway_watch"] } })).grade).toBe("B");
  });

  it("sorts grades from S to X", () => {
    expect(["C", "S", "X", "A", "B"].sort((a, b) => gradeSortRank(a) - gradeSortRank(b))).toEqual([
      "S",
      "A",
      "B",
      "C",
      "X",
    ]);
  });
});
