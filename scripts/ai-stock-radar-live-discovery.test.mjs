import { describe, expect, it } from "vitest";

import {
  AI_KEYWORDS,
  buildLiveEvidenceRecords,
  discoverLiveEvidence,
  inferAiProfile,
  normalizeSecCompanyTickers,
  parseNasdaqListed,
  parseOtherListed,
  summarizeSubmissions,
} from "./ai-stock-radar-live-discovery.mjs";

const nasdaqListedText = [
  "Symbol|Security Name|Market Category|Test Issue|Financial Status|Round Lot Size|ETF|NextShares",
  "SOUN|SoundHound AI, Inc. - Class A Common Stock|G|N|N|100|N|N",
  "QQQ|Invesco QQQ Trust|G|N|N|100|Y|N",
  "TEST|Test Security Inc.|S|Y|N|100|N|N",
  "File Creation Time: 0530202620:00|||||||",
].join("\n");

const otherListedText = [
  "ACT Symbol|Security Name|Exchange|CQS Symbol|ETF|Round Lot Size|Test Issue|NASDAQ Symbol",
  "PLTR|Palantir Technologies Inc. Class A Common Stock|N|PLTR|N|100|N|PLTR",
  "SPY|SPDR S&P 500 ETF Trust|P|SPY|Y|100|N|SPY",
  "BADT|Bad Test Corp|A|BADT|N|100|Y|BADT",
  "File Creation Time: 0530202620:00|||||||",
].join("\n");

const secCompanyTickers = {
  0: { cik_str: 783412, ticker: "SOUN", title: "SoundHound AI, Inc." },
  1: { cik_str: 1321655, ticker: "PLTR", title: "Palantir Technologies Inc." },
};

const submissionsByCik = {
  "0000783412": {
    filings: {
      recent: {
        form: ["10-Q", "8-K", "4"],
        filingDate: ["2026-05-10", "2026-05-20", "2026-05-21"],
        items: ["1.01", "2.02"],
        primaryDocDescription: [
          "Entry into a material definitive agreement with a major customer",
          "Results of operations and financial condition",
        ],
      },
    },
  },
  "0001321655": {
    filings: {
      recent: {
        form: ["10-K", "10-Q"],
        filingDate: ["2026-02-20", "2026-05-05"],
      },
    },
  },
};

const companyFactsByCik = {
  "0000783412": {
    facts: {
      "us-gaap": {
        RevenueFromContractWithCustomerExcludingAssessedTax: {
          units: {
            USD: [
              { form: "10-Q", fy: 2025, fp: "Q1", end: "2025-03-31", filed: "2025-05-05", val: 10_000_000 },
              { form: "10-Q", fy: 2026, fp: "Q1", end: "2026-03-31", filed: "2026-05-05", val: 13_000_000 },
            ],
          },
        },
        CashAndCashEquivalentsAtCarryingValue: {
          units: {
            USD: [{ form: "10-Q", fy: 2026, fp: "Q1", end: "2026-03-31", filed: "2026-05-05", val: 8_000_000 }],
          },
        },
        NetCashProvidedByUsedInOperatingActivities: {
          units: {
            USD: [{ form: "10-Q", fy: 2026, fp: "Q1", end: "2026-03-31", filed: "2026-05-05", val: -1_000_000 }],
          },
        },
      },
    },
  },
  "0001321655": {
    facts: {
      "us-gaap": {},
    },
  },
};

function fetcherForFixtures(url) {
  if (url.includes("nasdaqlisted.txt")) return Promise.resolve(nasdaqListedText);
  if (url.includes("otherlisted.txt")) return Promise.resolve(otherListedText);
  if (url.includes("company_tickers.json")) return Promise.resolve(secCompanyTickers);
  if (url.includes("/api/xbrl/companyfacts/")) {
    const cikMatch = url.match(/CIK(\d{10})\.json$/);
    return Promise.resolve(companyFactsByCik[cikMatch[1]]);
  }
  const cikMatch = url.match(/CIK(\d{10})\.json$/);
  if (cikMatch) return Promise.resolve(submissionsByCik[cikMatch[1]]);
  throw new Error(`unexpected url ${url}`);
}

describe("AI stock radar live discovery", () => {
  it("parses Nasdaq-listed equities and excludes ETFs, test issues, and timestamps", () => {
    expect(parseNasdaqListed(nasdaqListedText)).toEqual([
      {
        ticker: "SOUN",
        company: "SoundHound AI, Inc.",
        exchange: "Nasdaq",
        listed: true,
        security_name: "SoundHound AI, Inc. - Class A Common Stock",
      },
    ]);
  });

  it("parses other-listed equities and normalizes exchanges", () => {
    expect(parseOtherListed(otherListedText)).toEqual([
      {
        ticker: "PLTR",
        company: "Palantir Technologies Inc.",
        exchange: "NYSE",
        listed: true,
        security_name: "Palantir Technologies Inc. Class A Common Stock",
      },
    ]);
  });

  it("normalizes SEC company tickers with padded CIK values", () => {
    expect(normalizeSecCompanyTickers(secCompanyTickers)).toEqual({
      SOUN: {
        cik: "0000783412",
        ticker: "SOUN",
        title: "SoundHound AI, Inc.",
      },
      PLTR: {
        cik: "0001321655",
        ticker: "PLTR",
        title: "Palantir Technologies Inc.",
      },
    });
  });

  it("infers AI profile from public names and seed overlays", () => {
    const profileFromName = inferAiProfile({
      ticker: "SOUN",
      company: "SoundHound AI, Inc.",
      security_name: "SoundHound AI, Inc. Class A Common Stock",
      seedByTicker: {},
    });
    const profileFromSeed = inferAiProfile({
      ticker: "PLTR",
      company: "Palantir Technologies Inc.",
      security_name: "Palantir Technologies Inc. Class A Common Stock",
      seedByTicker: {
        PLTR: {
          themes: ["enterprise_ai_software", "defense_ai"],
          ai_exposure: "material",
        },
      },
    });

    expect(AI_KEYWORDS).toContain("artificial intelligence");
    expect(profileFromName.isAiRelevant).toBe(true);
    expect(profileFromName.themes).toContain("ai_keyword_match");
    expect(
      inferAiProfile({
        ticker: "ROBO",
        company: "Focused Robotics Inc.",
        security_name: "Focused Robotics Inc. Common Stock",
        seedByTicker: {},
      }).themes,
    ).toContain("robotics");
    expect(profileFromSeed.isAiRelevant).toBe(true);
    expect(profileFromSeed.themes).toContain("defense_ai");
    expect(profileFromSeed.ai_exposure).toBe("material");

    expect(
      inferAiProfile({
        ticker: "AIRG",
        company: "Airgain, Inc.",
        security_name: "Airgain, Inc. Common Stock",
        seedByTicker: {},
      }).isAiRelevant,
    ).toBe(false);
  });

  it("summarizes recent SEC submission forms and identifies company facts availability", () => {
    expect(summarizeSubmissions(submissionsByCik["0000783412"])).toEqual({
      recent_filings: ["10-Q", "8-K"],
      has_company_facts: true,
      catalyst_labels: [
        "recent_public_company_filings",
        "recent_8k",
        "hard_catalyst",
        "material_agreement",
        "major_customer",
        "earnings_or_guidance_context",
      ],
      filing_events: {
        positive_labels: ["material_agreement", "major_customer", "earnings_or_guidance_context"],
        risk_labels: [],
        hard_catalyst: true,
        hard_blocker: false,
      },
    });
  });

  it("adds filing risk labels from SEC item descriptions", () => {
    expect(
      summarizeSubmissions({
        filings: {
          recent: {
            form: ["8-K", "10-Q"],
            items: ["2.02", "3.02", "5.03"],
            primaryDocDescription: [
              "Results of operations and financial condition",
              "Registered direct offering of common stock and warrants",
              "Reverse stock split",
            ],
          },
        },
      }).catalyst_labels,
    ).toEqual([
      "recent_public_company_filings",
      "recent_8k",
      "earnings_or_guidance_context",
      "offering_watch",
      "reverse_split_watch",
    ]);
  });

  it("builds live evidence records by joining Nasdaq and SEC records", async () => {
    const records = await buildLiveEvidenceRecords({
      nasdaqListedText,
      otherListedText,
      secCompanyTickers,
      submissionsByCik,
      companyFactsByCik,
      seedRecords: [
        {
          ticker: "PLTR",
          themes: ["enterprise_ai_software", "defense_ai"],
          ai_exposure: "material",
          risk_flags: ["overheated_watch"],
        },
      ],
      maxSubmissionFetches: 10,
    });

    expect(records.map((record) => record.ticker)).toEqual(["SOUN", "PLTR"]);
    expect(records[0]).toMatchObject({
      ticker: "SOUN",
      source_types: ["nasdaq_symbol_directory", "sec_company_tickers", "sec_submissions", "sec_companyfacts"],
      recent_filings: ["10-Q", "8-K"],
      ai_exposure: "core",
      has_company_facts: true,
      fundamental_snapshot: {
        status: "available",
        revenue_growth_yoy_pct: 30,
      },
      evidence_firewall: {
        verdict: "caution",
      },
    });
    expect(records[0].filing_events.positive_labels).toContain("material_agreement");
    expect(records[0].risk_flags).toContain("name_only_ai_watch");
    expect(records[0].quality_notes).toContain("name-only AI evidence; needs manual substance check");
    expect(records[1].source_types).not.toContain("sec_companyfacts");
    expect(records[1].fundamental_snapshot.status).toBe("unavailable");
    expect(records[1].themes).toContain("defense_ai");
    expect(records[1].risk_flags).toContain("overheated_watch");
  });

  it("prioritizes seeded or substantive AI candidates before applying the live fetch cap", async () => {
    const noisyNasdaqListedText = [
      "Symbol|Security Name|Market Category|Test Issue|Financial Status|Round Lot Size|ETF|NextShares",
      "AIA|Alpha AI Holdings, Inc. - Common Stock|G|N|N|100|N|N",
      "AIB|Beta AI Systems, Inc. - Common Stock|G|N|N|100|N|N",
      "File Creation Time: 0530202620:00|||||||",
    ].join("\n");
    const seededOtherListedText = [
      "ACT Symbol|Security Name|Exchange|CQS Symbol|ETF|Round Lot Size|Test Issue|NASDAQ Symbol",
      "PLTR|Palantir Technologies Inc. Class A Common Stock|N|PLTR|N|100|N|PLTR",
      "File Creation Time: 0530202620:00|||||||",
    ].join("\n");
    const broadSecCompanyTickers = {
      0: { cik_str: 1, ticker: "AIA", title: "Alpha AI Holdings, Inc." },
      1: { cik_str: 2, ticker: "AIB", title: "Beta AI Systems, Inc." },
      2: { cik_str: 1321655, ticker: "PLTR", title: "Palantir Technologies Inc." },
    };
    const broadSubmissionsByCik = {
      "0000000001": { filings: { recent: { form: ["10-Q"], filingDate: ["2026-05-01"] } } },
      "0000000002": { filings: { recent: { form: ["10-Q"], filingDate: ["2026-05-01"] } } },
      "0001321655": { filings: { recent: { form: ["10-K", "10-Q"], filingDate: ["2026-02-20", "2026-05-05"] } } },
    };

    const records = await buildLiveEvidenceRecords({
      nasdaqListedText: noisyNasdaqListedText,
      otherListedText: seededOtherListedText,
      secCompanyTickers: broadSecCompanyTickers,
      submissionsByCik: broadSubmissionsByCik,
      companyFactsByCik: {},
      seedRecords: [
        {
          ticker: "PLTR",
          themes: ["enterprise_ai_software", "defense_ai"],
          ai_exposure: "material",
        },
      ],
      maxSubmissionFetches: 2,
      maxRecords: 2,
    });

    expect(records.map((record) => record.ticker)).toContain("PLTR");
  });

  it("discovers live evidence with source status and no paid providers", async () => {
    const result = await discoverLiveEvidence({
      fetcher: fetcherForFixtures,
      seedRecords: [
        {
          ticker: "PLTR",
          themes: ["enterprise_ai_software", "defense_ai"],
          ai_exposure: "material",
        },
      ],
      maxSubmissionFetches: 10,
    });

    expect(result.mode).toBe("live");
    expect(result.records.map((record) => record.ticker)).toEqual(["SOUN", "PLTR"]);
    expect(result.sourceStatus.paid_market_data).toBe("not_configured");
    expect(result.sourceStatus.sec_submissions).toBe("live_available");
    expect(result.fallbackReason).toBe("");
  });

  it("returns seed fallback when live fetches fail", async () => {
    const result = await discoverLiveEvidence({
      fetcher: async () => {
        throw new Error("network unavailable");
      },
      seedRecords: [
        {
          ticker: "SEED",
          company: "Seed AI Inc.",
          listed: true,
          source_types: ["nasdaq_symbol_directory"],
          themes: ["seed_ai"],
          ai_exposure: "core",
        },
      ],
    });

    expect(result.mode).toBe("seed_fallback");
    expect(result.records[0].ticker).toBe("SEED");
    expect(result.fallbackReason).toContain("network unavailable");
    expect(result.sourceStatus.nasdaq_symbol_directory).toBe("live_failed_seed_fallback");
  });
});
