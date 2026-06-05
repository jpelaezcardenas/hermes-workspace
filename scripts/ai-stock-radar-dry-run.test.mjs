import { describe, expect, it } from "vitest";

import {
  candidateCanDeepDive,
  countSofortMachenItems,
  renderDailyReport,
  selectDossierCandidates,
  validateWatchlist,
} from "./ai-stock-radar-dry-run.mjs";

const baseWatchlist = {
  version: 1,
  updated_at: "2026-05-30",
  provider_status: {
    market_data: "not_configured",
    filings: "available",
    news: "not_configured",
  },
  candidates: [],
};

const requiredForbiddenLanguage = [
  "buy now",
  "sell now",
  "sure winner",
  "will explode",
  "jetzt kaufen",
  "jetzt verkaufen",
];

function validCandidate(overrides = {}) {
  return {
    ticker: "SAFE",
    company: "Safe Data Inc",
    category: "Breakout Watch",
    score: 82,
    previous_score: 70,
    data_quality: "A",
    ai_relevance: 18,
    catalyst: 17,
    market_momentum: 15,
    earliness: 12,
    fundamental_quality: 12,
    signal_breadth: 8,
    thesis: "Current AI infrastructure thesis with multiple sources.",
    top_risks: ["valuation"],
    last_checked: "2026-05-30",
    next_action: "Refresh dossier.",
    sources: ["SEC", "approved-market-data-provider"],
    ...overrides,
  };
}

describe("AI stock radar dry run", () => {
  it("validates the initial watchlist shape", () => {
    expect(() => validateWatchlist(baseWatchlist)).not.toThrow();
  });

  it("blocks Deep Dive promotion when data quality is weak", () => {
    expect(
      candidateCanDeepDive({
        ticker: "WEAK",
        company: "Weak Data Inc",
        category: "Breakout Watch",
        score: 92,
        previous_score: 70,
        data_quality: "C",
        ai_relevance: 20,
        catalyst: 20,
        market_momentum: 20,
        earliness: 12,
        fundamental_quality: 12,
        signal_breadth: 8,
        thesis: "High score but weak data quality.",
        top_risks: ["single-source"],
        last_checked: "2026-05-30",
        next_action: "Keep as watch only.",
        sources: ["single-source"],
      }),
    ).toBe(false);
  });

  it("rejects Deep Dive watchlist candidates with weak data quality", () => {
    expect(() =>
      validateWatchlist({
        ...baseWatchlist,
        candidates: [
          {
            ticker: "WEAK",
            company: "Weak Data Inc",
            category: "Deep Dive",
            score: 92,
            previous_score: 70,
            data_quality: "C",
            ai_relevance: 20,
            catalyst: 20,
            market_momentum: 20,
            earliness: 12,
            fundamental_quality: 12,
            signal_breadth: 8,
            thesis: "High score but weak data quality.",
            top_risks: ["single-source"],
            last_checked: "2026-05-30",
            next_action: "Keep as watch only.",
            sources: ["single-source"],
          },
        ],
      }),
    ).toThrow();
  });

  it("rejects candidate-derived report text with forbidden language", () => {
    expect(() =>
      validateWatchlist({
        ...baseWatchlist,
        candidates: [
          validCandidate({
            thesis: "This candidate says buy now despite weak safety posture.",
          }),
        ],
      }),
    ).toThrow(/candidate\.thesis/i);
  });

  it("rejects candidates missing next action or last checked values", () => {
    expect(() =>
      validateWatchlist({
        ...baseWatchlist,
        candidates: [validCandidate({ next_action: "" })],
      }),
    ).toThrow(/candidate\.next_action/i);

    expect(() =>
      validateWatchlist({
        ...baseWatchlist,
        candidates: [validCandidate({ last_checked: undefined })],
      }),
    ).toThrow(/candidate\.last_checked/i);
  });

  it("renders every required report section", () => {
    const report = renderDailyReport({
      date: "2026-05-30",
      watchlist: baseWatchlist,
    });

    for (const section of [
      "# AI Stock Radar - 2026-05-30",
      "## Kurzfazit",
      "## Marktumfeld",
      "## Top Kandidaten Heute",
      "## Neue Auffaelligkeiten",
      "## Watchlist Aenderungen",
      "## Deep-Dive Kandidaten",
      "## Overheated / Avoid",
      "## Datenqualitaet Und Luecken",
      "## Naechste Aktion",
      "## Decision Inbox",
    ]) {
      expect(report).toContain(section);
    }
  });

  it("keeps SOFORT_MACHEN empty in no-provider dry runs", () => {
    const report = renderDailyReport({
      date: "2026-05-30",
      watchlist: baseWatchlist,
    });

    expect(countSofortMachenItems(report)).toBe(0);
    expect(report).toContain("- SOFORT_MACHEN: nichts");

    const sofortMachenLine = report
      .split("\n")
      .find((line) => line.startsWith("- SOFORT_MACHEN:"));
    expect(sofortMachenLine).not.toMatch(/buy|sell|kaufen|verkaufen|trade/i);
  });

  it("renders the provided report path in the Decision Inbox", () => {
    const report = renderDailyReport({
      date: "2026-05-30",
      watchlist: baseWatchlist,
      reportPath: "/tmp/custom.md",
    });

    expect(report).toContain("- Beleg / Datei: /tmp/custom.md");
  });

  it("does not render forbidden certainty language", () => {
    const report = renderDailyReport({
      date: "2026-05-30",
      watchlist: baseWatchlist,
    }).toLowerCase();

    for (const phrase of requiredForbiddenLanguage) {
      expect(report).not.toContain(phrase);
    }
  });

  it("limits daily dossier candidates to three", () => {
    const candidates = ["AAA", "BBB", "CCC", "DDD"].map((ticker, index) => ({
      ticker,
      company: `${ticker} Corp`,
      category: "Breakout Watch",
      score: 90 - index,
      previous_score: 70,
      data_quality: "A",
      ai_relevance: 20,
      catalyst: 18,
      market_momentum: 18,
      earliness: 12,
      fundamental_quality: 12,
      signal_breadth: 9,
      thesis: `${ticker} has a current AI infrastructure thesis.`,
      top_risks: ["valuation"],
      last_checked: "2026-05-30",
      next_action: "Refresh dossier.",
      sources: ["SEC", "approved-market-data-provider"],
    }));

    expect(selectDossierCandidates(candidates)).toHaveLength(3);
  });

  it("ranks dossier candidates by catalyst before total score when data quality ties", () => {
    const higherScore = validCandidate({
      ticker: "SCORE",
      score: 94,
      catalyst: 10,
    });
    const higherCatalyst = validCandidate({
      ticker: "CAT",
      score: 82,
      catalyst: 19,
    });

    expect(selectDossierCandidates([higherScore, higherCatalyst])[0].ticker).toBe("CAT");
  });
});
