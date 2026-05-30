import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  buildCandidatesFromEvidence,
  classifyFreeSourceCandidate,
  computeDataQuality,
  enrichCandidatesWithPriceVolume,
  loadFreeSourceSeeds,
  renderFreeSourceReport,
  selectFreeSignalDossierCandidates,
  scoreFreeSourceEvidence,
  writeFreeSignalRun,
} from "./ai-stock-radar-free-signal-engine.mjs";
import { countSofortMachenItems, validateWatchlist } from "./ai-stock-radar-dry-run.mjs";

const root = process.cwd();

function evidence(overrides = {}) {
  return {
    ticker: "TEST",
    company: "Test AI Infrastructure Inc.",
    exchange: "Nasdaq",
    listed: true,
    themes: ["ai_infrastructure", "gpu_capacity", "cloud_compute"],
    ai_exposure: "core",
    source_types: ["nasdaq_symbol_directory", "sec_submissions", "sec_companyfacts"],
    recent_filings: ["10-K", "10-Q", "8-K"],
    catalyst_labels: ["ai_infrastructure_capacity", "customer_expansion_watch"],
    has_company_facts: true,
    finra_context: "not_checked",
    risk_flags: [],
    source_urls: [
      "https://www.nasdaqtrader.com/trader.aspx?id=symbollookup",
      "https://data.sec.gov/submissions/",
      "https://data.sec.gov/api/xbrl/companyfacts/",
    ],
    ...overrides,
  };
}

describe("AI stock radar free signal engine", () => {
  it("loads the deterministic free-source seed universe without paid providers", () => {
    const seeds = loadFreeSourceSeeds({ root });

    expect(seeds.version).toBe(1);
    expect(seeds.free_source_status.paid_market_data).toBe("not_configured");
    expect(seeds.records.length).toBeGreaterThanOrEqual(3);
    expect(seeds.records.every((record) => record.listed === true)).toBe(true);
  });

  it("computes data quality from independent public source breadth", () => {
    expect(computeDataQuality(evidence()).grade).toBe("A");
    expect(
      computeDataQuality(
        evidence({
          source_types: ["nasdaq_symbol_directory"],
          recent_filings: [],
          has_company_facts: false,
        }),
      ).grade,
    ).toBe("C");
  });

  it("caps market momentum when no reliable free price data is present", () => {
    const score = scoreFreeSourceEvidence(evidence());

    expect(score.market_momentum).toBeLessThanOrEqual(8);
    expect(score.reasons.market_momentum).toMatch(/capped/i);
  });

  it("turns public evidence into Phase-1-compatible candidates", () => {
    const candidates = buildCandidatesFromEvidence({
      date: "2026-05-30",
      records: [evidence({ ticker: "AICORE" })],
    });

    expect(candidates).toHaveLength(1);
    expect(candidates[0]).toMatchObject({
      ticker: "AICORE",
      category: "Breakout Watch",
      data_quality: "A",
      last_checked: "2026-05-30",
    });
    expect(() =>
      validateWatchlist({
        version: 1,
        updated_at: "2026-05-30",
        provider_status: {
          market_data: "free_price_data_unavailable",
          filings: "available",
          news: "public_sources_only",
        },
        candidates,
      }),
    ).not.toThrow();
  });

  it("prevents name-only AI evidence from becoming Breakout Watch", () => {
    const candidates = buildCandidatesFromEvidence({
      date: "2026-05-30",
      records: [
        evidence({
          ticker: "NOISE",
          company: "Noisy AI Name Inc.",
          themes: ["ai_keyword_match"],
          catalyst_labels: ["recent_public_company_filings", "recent_8k"],
          risk_flags: ["name_only_ai_watch"],
          quality_notes: ["name-only AI evidence; needs manual substance check"],
          score_penalty: 25,
          max_category: "Early Watch",
        }),
      ],
    });

    expect(candidates[0].category).toBe("Avoid");
    expect(candidates[0].score).toBeLessThan(55);
    expect(candidates[0].top_risks).toContain("name only ai watch");
    expect(candidates[0].quality_notes).toContain("name-only AI evidence; needs manual substance check");
  });

  it("blocks Deep Dive classification when source breadth is weak", () => {
    const weak = evidence({
      source_types: ["nasdaq_symbol_directory"],
      recent_filings: [],
      has_company_facts: false,
      catalyst_labels: ["single_source_ai_claim"],
    });
    const score = { total: 90 };

    expect(classifyFreeSourceCandidate({ record: weak, score, dataQuality: computeDataQuality(weak) })).toBe(
      "Early Watch",
    );
  });

  it("renders a safe report with public-source gaps and no immediate action", () => {
    const candidates = buildCandidatesFromEvidence({
      date: "2026-05-30",
      records: [evidence({ ticker: "SAFEAI" })],
    });
    const report = renderFreeSourceReport({
      date: "2026-05-30",
      candidates,
      reportPath: "/tmp/ai-stock-radar-free.md",
      sourceStatus: {
        sec_submissions: "available_without_api_key",
        nasdaq_symbol_directory: "available_without_api_key",
        finra_public_data: "not_checked",
        paid_market_data: "not_configured",
      },
    });

    expect(report).toContain("## Top Kandidaten Heute");
    expect(report).toContain("SAFEAI");
    expect(report).toContain("free_price_data_unavailable");
    expect(report).toContain("- SOFORT_MACHEN: nichts");
    expect(report).toContain("Keine automatischen Trades");
    expect(countSofortMachenItems(report)).toBe(0);
    expect(report.toLowerCase()).not.toMatch(/buy now|sell now|will explode|jetzt kaufen|jetzt verkaufen/);
  });

  it("keeps reject-grade candidates out of the top-candidate section", () => {
    const candidates = buildCandidatesFromEvidence({
      date: "2026-05-30",
      records: [
        evidence({ ticker: "ROBOT", company: "Robot AI Systems Inc.", themes: ["robotics"] }),
        evidence({
          ticker: "NOISE",
          company: "Noisy AI Name Inc.",
          themes: ["ai_keyword_match"],
          risk_flags: ["name_only_ai_watch"],
          quality_notes: ["name-only AI evidence; needs manual substance check"],
          score_penalty: 25,
          max_category: "Early Watch",
        }),
      ],
    });
    const report = renderFreeSourceReport({
      date: "2026-05-30",
      candidates,
      reportPath: "/tmp/ai-stock-radar-free.md",
    });
    const topSection = report.match(/## Top Kandidaten Heute\n([\s\S]*?)\n\n## Neue Auffaelligkeiten/)?.[1] || "";

    expect(topSection).toContain("ROBOT");
    expect(topSection).not.toContain("NOISE");
    expect(report).toContain("## Overheated / Avoid");
    expect(report).toContain("NOISE");
  });

  it("writes a free-source report and watchlist without API keys", async () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ai-stock-radar-free-"));
    fs.mkdirSync(path.join(tempRoot, "projects/ai-stock-radar"), { recursive: true });
    fs.copyFileSync(
      path.join(root, "projects/ai-stock-radar/free-source-seeds.json"),
      path.join(tempRoot, "projects/ai-stock-radar/free-source-seeds.json"),
    );

    const result = await writeFreeSignalRun({ root: tempRoot, date: "2026-05-30", priceMode: "off" });
    const watchlist = JSON.parse(
      fs.readFileSync(path.join(tempRoot, "projects/ai-stock-radar/watchlist.json"), "utf8"),
    );

    expect(fs.existsSync(result.reportPath)).toBe(true);
    expect(result.candidateCount).toBeGreaterThan(0);
    expect(watchlist.provider_status.market_data).toBe("free_price_data_unavailable");
    expect(() => validateWatchlist(watchlist)).not.toThrow();
  });

  it("uses positive price/volume as a bounded score confirmation", async () => {
    const [candidate] = buildCandidatesFromEvidence({
      date: "2026-05-30",
      records: [evidence({ ticker: "PRICEAI", themes: ["robotics", "ai_keyword_match"] })],
    });

    const [enriched] = await enrichCandidatesWithPriceVolume({
      candidates: [candidate],
      priceProvider: async () => ({
        status: "available",
        source: "stooq",
        confirmation: "positive",
        latest_close: 12,
        return_20d_pct: 22,
        volume_ratio_20d: 2.3,
      }),
    });

    expect(enriched.price_volume.confirmation).toBe("positive");
    expect(enriched.market_momentum).toBe(candidate.market_momentum + 4);
    expect(enriched.score).toBe(candidate.score + 4);
  });

  it("prioritizes research-grade dossiers before reject-risk dossiers", () => {
    const candidates = buildCandidatesFromEvidence({
      date: "2026-05-30",
      records: [
        evidence({ ticker: "BEST", company: "Best Robotics Inc.", themes: ["robotics"], catalyst_labels: ["hard_catalyst"] }),
        evidence({ ticker: "GOOD", company: "Good Robotics Inc.", themes: ["robotics"] }),
        evidence({
          ticker: "BADAI",
          company: "Bad AI Name Inc.",
          themes: ["ai_keyword_match"],
          risk_flags: ["name_only_ai_watch"],
          quality_notes: ["name-only AI evidence; needs manual substance check"],
          score_penalty: 25,
          max_category: "Early Watch",
        }),
      ],
    });

    const selectedTickers = selectFreeSignalDossierCandidates(candidates).map((candidate) => candidate.ticker);

    expect(selectedTickers.slice(0, 2).sort()).toEqual(["BEST", "GOOD"]);
    expect(selectedTickers[2]).toBe("BADAI");
  });

  it("prefers live discovery in auto mode when injected discovery returns records", async () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ai-stock-radar-live-auto-"));
    fs.mkdirSync(path.join(tempRoot, "projects/ai-stock-radar"), { recursive: true });
    fs.copyFileSync(
      path.join(root, "projects/ai-stock-radar/free-source-seeds.json"),
      path.join(tempRoot, "projects/ai-stock-radar/free-source-seeds.json"),
    );

    const result = await writeFreeSignalRun({
      root: tempRoot,
      date: "2026-05-30",
      discoveryMode: "auto",
      priceMode: "stooq",
      priceProvider: async () => ({
        status: "available",
        source: "stooq",
        confirmation: "positive",
        latest_close: 12,
        return_20d_pct: 22,
        volume_ratio_20d: 2.3,
      }),
      liveDiscovery: async () => ({
        mode: "live",
        fallbackReason: "",
        sourceStatus: {
          nasdaq_symbol_directory: "live_available",
          sec_company_tickers: "live_available",
          sec_submissions: "live_available",
          sec_companyfacts: "available_without_api_key",
          finra_public_data: "not_checked",
          paid_market_data: "not_configured",
        },
        records: [evidence({ ticker: "LIVEAI", company: "Live AI Discovery Inc." })],
      }),
    });
    const report = fs.readFileSync(result.reportPath, "utf8");

    expect(result.discoveryMode).toBe("live");
    expect(report).toContain("Discovery mode: live");
    expect(report).toContain("Idea Grade");
    expect(report).toContain("Price/Volume Confirmation");
    expect(report).toContain("LIVEAI");
  });

  it("reports seed fallback reason in auto mode when live discovery fails", async () => {
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "ai-stock-radar-seed-auto-"));
    fs.mkdirSync(path.join(tempRoot, "projects/ai-stock-radar"), { recursive: true });
    fs.copyFileSync(
      path.join(root, "projects/ai-stock-radar/free-source-seeds.json"),
      path.join(tempRoot, "projects/ai-stock-radar/free-source-seeds.json"),
    );

    const result = await writeFreeSignalRun({
      root: tempRoot,
      date: "2026-05-30",
      discoveryMode: "auto",
      priceMode: "off",
      liveDiscovery: async ({ seedRecords }) => ({
        mode: "seed_fallback",
        fallbackReason: "fixture live failure",
        sourceStatus: {
          nasdaq_symbol_directory: "live_failed_seed_fallback",
          sec_company_tickers: "live_failed_seed_fallback",
          sec_submissions: "live_failed_seed_fallback",
          sec_companyfacts: "available_without_api_key",
          finra_public_data: "not_checked",
          paid_market_data: "not_configured",
        },
        records: seedRecords,
      }),
    });
    const report = fs.readFileSync(result.reportPath, "utf8");

    expect(result.discoveryMode).toBe("seed_fallback");
    expect(report).toContain("Discovery mode: seed_fallback");
    expect(report).toContain("Fallback reason: fixture live failure");
  });
});
