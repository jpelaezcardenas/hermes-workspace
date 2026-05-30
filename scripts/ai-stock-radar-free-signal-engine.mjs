import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  assertSafeText,
  selectDossierCandidates,
  validateWatchlist,
  renderDossier,
} from "./ai-stock-radar-dry-run.mjs";
import { discoverLiveEvidence } from "./ai-stock-radar-live-discovery.mjs";
import {
  applyQualityPenalty,
  limitCategoryByQuality,
  updateCandidateAging,
} from "./ai-stock-radar-quality-rules.mjs";
import { assignIdeaGrade, gradeSortRank } from "./ai-stock-radar-idea-grade.mjs";
import { fetchStooqPriceVolume } from "./ai-stock-radar-price-volume.mjs";
import {
  applyEvidenceFirewall,
  chooseReviewAction,
  decodeFilingEvents,
  evaluateFundamentalSnapshot,
} from "./ai-stock-radar-evidence-firewall.mjs";

const DEFAULT_ROOT = "/Users/zondrius/hermes-workspace";
const DEFAULT_SOURCE_STATUS = {
  sec_submissions: "available_without_api_key",
  sec_companyfacts: "available_without_api_key",
  sec_company_tickers: "not_checked",
  nasdaq_symbol_directory: "available_without_api_key",
  finra_public_data: "not_checked",
  paid_market_data: "not_configured",
};

const SOURCE_LABELS = {
  nasdaq_symbol_directory: "Nasdaq Symbol Directory",
  sec_company_tickers: "SEC company tickers",
  sec_submissions: "SEC submissions",
  sec_companyfacts: "SEC companyfacts",
  finra_public_data: "FINRA public data",
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function sourceLabel(sourceType) {
  return SOURCE_LABELS[sourceType] || sourceType;
}

function stricterCategory(left, right) {
  const rank = {
    Avoid: 0,
    Overheated: 1,
    "Early Watch": 2,
    "Breakout Watch": 3,
    "Deep Dive": 4,
  };

  if (!left) return right;
  if (!right) return left;
  return rank[left] <= rank[right] ? left : right;
}

export function loadFreeSourceSeeds({ root = process.cwd() } = {}) {
  const seedPath = path.join(root, "projects/ai-stock-radar/free-source-seeds.json");
  return JSON.parse(fs.readFileSync(seedPath, "utf8"));
}

export function computeDataQuality(record) {
  const sourceTypes = unique(record.source_types);
  const hasListing = record.listed === true && sourceTypes.includes("nasdaq_symbol_directory");
  const hasSec = sourceTypes.includes("sec_submissions");
  const hasFacts = record.has_company_facts === true || sourceTypes.includes("sec_companyfacts");
  const riskFlags = unique(record.risk_flags);

  if (!hasListing) {
    return {
      grade: "D",
      reasons: ["listed-universe check missing"],
    };
  }

  if (hasSec && hasFacts && sourceTypes.length >= 3) {
    return {
      grade: riskFlags.includes("hype_sensitive") || riskFlags.includes("recent_ipo") ? "B" : "A",
      reasons: ["listed symbol", "SEC filings", "SEC company facts"],
    };
  }

  if (hasSec && sourceTypes.length >= 2) {
    return {
      grade: "B",
      reasons: ["listed symbol", "SEC filing history"],
    };
  }

  if (sourceTypes.length >= 1) {
    return {
      grade: "C",
      reasons: ["single public source only"],
    };
  }

  return {
    grade: "D",
    reasons: ["no usable public source"],
  };
}

export function scoreFreeSourceEvidence(record) {
  const themes = unique(record.themes);
  const sourceTypes = unique(record.source_types);
  const filings = unique(record.recent_filings);
  const catalysts = unique(record.catalyst_labels);
  const riskFlags = unique(record.risk_flags);
  const coreExposure = record.ai_exposure === "core";
  const materialExposure = record.ai_exposure === "material";

  const ai_relevance = clamp((coreExposure ? 14 : materialExposure ? 10 : 5) + themes.length * 2, 0, 20);
  const catalyst = clamp(filings.length * 2 + catalysts.length * 4 + (filings.includes("8-K") ? 2 : 0), 0, 20);
  const market_momentum = clamp(
    riskFlags.includes("overheated_watch") ? 4 : sourceTypes.includes("finra_public_data") ? 8 : 6,
    0,
    8,
  );
  const earliness = clamp(12 - (riskFlags.includes("overheated_watch") ? 5 : 0) - (riskFlags.includes("hype_sensitive") ? 2 : 0), 0, 15);
  const fundamental_quality = clamp(
    (record.has_company_facts ? 9 : 4) +
      (filings.includes("10-K") ? 2 : 0) +
      (filings.includes("10-Q") ? 2 : 0) -
      (riskFlags.includes("cash_burn_watch") ? 2 : 0),
    0,
    15,
  );
  const signal_breadth = clamp(sourceTypes.length * 3 + (catalysts.length > 1 ? 1 : 0), 0, 10);
  const total =
    ai_relevance +
    catalyst +
    market_momentum +
    earliness +
    fundamental_quality +
    signal_breadth;

  return {
    ai_relevance,
    catalyst,
    market_momentum,
    earliness,
    fundamental_quality,
    signal_breadth,
    total,
    reasons: {
      ai_relevance: `${record.ai_exposure || "unknown"} exposure across ${themes.length} AI themes`,
      catalyst: `${filings.length} recent filing types and ${catalysts.length} catalyst labels`,
      market_momentum: "capped because reliable free price data is unavailable",
      earliness: riskFlags.length ? `risk flags: ${riskFlags.join(", ")}` : "no late-cycle risk flag in seed evidence",
      fundamental_quality: record.has_company_facts ? "SEC companyfacts available" : "limited public fact coverage",
      signal_breadth: `${sourceTypes.length} independent public source types`,
    },
  };
}

export function classifyFreeSourceCandidate({ record, score, dataQuality }) {
  const riskFlags = unique(record.risk_flags);
  const catalystLabels = unique(record.catalyst_labels);
  const hasHardCatalyst = catalystLabels.some((label) =>
    ["hard_catalyst", "contract_award", "material_guidance_change", "major_customer"].includes(label),
  );

  if (dataQuality.grade === "D" || record.listed !== true) return "Avoid";
  if (riskFlags.includes("overheated_watch")) return "Overheated";
  if ((dataQuality.grade === "A" || dataQuality.grade === "B") && score.total >= 75 && hasHardCatalyst) {
    return "Deep Dive";
  }
  if (dataQuality.grade === "C") return score.total >= 55 ? "Early Watch" : "Avoid";
  if (score.total >= 70) return "Breakout Watch";
  if (score.total >= 55) return "Early Watch";
  return "Avoid";
}

function buildThesis(record, score, dataQuality) {
  const themes = unique(record.themes).join(", ");
  const sourceTypes = unique(record.source_types).map(sourceLabel).join(", ");
  return `${record.company} shows public AI exposure in ${themes}; score ${score.total} is based on ${sourceTypes}. Data quality ${dataQuality.grade}.`;
}

function buildRisks(record) {
  const risks = unique(record.risk_flags).map((flag) => flag.replaceAll("_", " "));
  if (risks.length === 0) return ["free-source evidence still needs manual review"];
  return risks;
}

function buildSources(record) {
  const sourceTypes = unique(record.source_types).map(sourceLabel);
  const urls = unique(record.source_urls);
  return [...sourceTypes, ...urls];
}

function resolveRecordFirewall(record) {
  if (record.evidence_firewall) return record.evidence_firewall;

  const filingEvents = record.filing_events || decodeFilingEvents({
    forms: record.recent_filings || [],
    descriptions: record.quality_notes || [],
  });
  const fundamentalSnapshot = record.fundamental_snapshot || evaluateFundamentalSnapshot(null);

  return applyEvidenceFirewall({
    filingEvents,
    fundamentalSnapshot,
    existingRiskFlags: unique(record.risk_flags),
  });
}

function reviewActionText(action) {
  return {
    VERIFY_CATALYST: "VERIFY_CATALYST: Check filing catalyst and source quality; no trade action.",
    CHECK_DILUTION: "CHECK_DILUTION: Check offering, warrants, cash runway, and share-count trend; no trade action.",
    WAIT_FOR_CONFIRMATION: "WAIT_FOR_CONFIRMATION: Wait for stronger evidence or price/volume context; no trade action.",
    DOWNGRADE_REVIEW: "DOWNGRADE_REVIEW: Review whether the candidate should be capped or downgraded; no trade action.",
    ARCHIVE_REVIEW: "ARCHIVE_REVIEW: Review for archive or Avoid status because a hard risk gate fired; no trade action.",
  }[action] || "WAIT_FOR_CONFIRMATION: Wait for stronger evidence; no trade action.";
}

export function buildCandidatesFromEvidence({ date, records }) {
  return records
    .filter((record) => record.listed === true)
    .map((record) => {
      assertSafeText(record.ticker, "record.ticker");
      assertSafeText(record.company, "record.company");

      const score = scoreFreeSourceEvidence(record);
      const evidenceFirewall = resolveRecordFirewall(record);
      const reviewAction = record.review_action || chooseReviewAction(evidenceFirewall);
      const totalPenalty =
        record.score_penalty === undefined
          ? evidenceFirewall.score_penalty || 0
          : record.score_penalty || 0;
      const adjustedTotal = applyQualityPenalty({
        score: score.total,
        penalty: totalPenalty,
      });
      const adjustedScore = {
        ...score,
        total: adjustedTotal,
      };
      const dataQuality = computeDataQuality(record);
      const rawCategory = classifyFreeSourceCandidate({ record, score: adjustedScore, dataQuality });
      const maxCategory = stricterCategory(record.max_category, evidenceFirewall.max_category);
      const category = limitCategoryByQuality({
        category: rawCategory,
        maxCategory,
      });

      const agedCandidate = updateCandidateAging({
        date,
        candidate: {
          ticker: record.ticker,
          company: record.company,
          category,
          score: adjustedScore.total,
          previous_score: 0,
          data_quality: dataQuality.grade,
          themes: unique(record.themes),
          filing_events: record.filing_events || null,
          fundamental_snapshot: record.fundamental_snapshot || { status: "unavailable" },
          evidence_firewall: evidenceFirewall,
          review_action: reviewAction,
          ai_relevance: score.ai_relevance,
          catalyst: score.catalyst,
          market_momentum: score.market_momentum,
          earliness: score.earliness,
          fundamental_quality: score.fundamental_quality,
          signal_breadth: score.signal_breadth,
          thesis: buildThesis(record, adjustedScore, dataQuality),
          top_risks: buildRisks(record),
          quality_notes: unique([...(record.quality_notes || []), ...(evidenceFirewall.notes || [])]),
          score_penalty: totalPenalty,
          last_checked: date,
          next_action: reviewActionText(reviewAction),
          sources: buildSources(record),
          score_reasons: score.reasons,
        },
      });
      const grade = assignIdeaGrade(agedCandidate);
      return {
        ...agedCandidate,
        idea_grade: grade.grade,
        grade_reasons: grade.reasons,
      };
    })
    .sort((left, right) => gradeSortRank(left.idea_grade) - gradeSortRank(right.idea_grade) || right.score - left.score || left.ticker.localeCompare(right.ticker));
}

function formatCandidate(candidate) {
  return `- ${candidate.ticker} (${candidate.company}): Grade ${candidate.idea_grade || "?"}, ${candidate.category}, Score ${candidate.score}, Datenqualitaet ${candidate.data_quality}. ${candidate.thesis}`;
}

function formatScoreReasons(candidate) {
  const reasons = candidate.score_reasons || {};
  return [
    `  - AI relevance: ${candidate.ai_relevance}/20 - ${reasons.ai_relevance || "not available"}`,
    `  - Catalyst: ${candidate.catalyst}/20 - ${reasons.catalyst || "not available"}`,
    `  - Market momentum: ${candidate.market_momentum}/20 - ${reasons.market_momentum || "not available"}`,
    `  - Earliness: ${candidate.earliness}/15 - ${reasons.earliness || "not available"}`,
    `  - Fundamental quality: ${candidate.fundamental_quality}/15 - ${reasons.fundamental_quality || "not available"}`,
    `  - Signal breadth: ${candidate.signal_breadth}/10 - ${reasons.signal_breadth || "not available"}`,
  ].join("\n");
}

function formatFirewallCandidate(candidate) {
  const firewall = candidate.evidence_firewall || {};
  const risks = (firewall.risk_flags || []).join(", ") || "none";
  const supports = (firewall.support_labels || []).join(", ") || "none";
  const snapshot = candidate.fundamental_snapshot || {};
  const revenue = Number.isFinite(snapshot.revenue_growth_yoy_pct) ? `${snapshot.revenue_growth_yoy_pct}% revenue YoY` : "revenue n/a";
  const runway = Number.isFinite(snapshot.cash_runway_quarters) ? `${snapshot.cash_runway_quarters}q cash runway` : "cash runway n/a";
  return `- ${candidate.ticker}: ${firewall.verdict || "caution"} / ${candidate.review_action || "WAIT_FOR_CONFIRMATION"}; risks: ${risks}; supports: ${supports}; fundamentals: ${revenue}, ${runway}`;
}

export function renderFreeSourceReport({
  date,
  candidates,
  reportPath,
  sourceStatus = DEFAULT_SOURCE_STATUS,
  discoveryMode = "seed",
  fallbackReason = "",
}) {
  const topCandidates = candidates
    .filter((candidate) => candidate.idea_grade !== "X" && candidate.category !== "Avoid")
    .slice(0, 10);
  const gradeCandidates = candidates.slice(0, 10);
  const deepDiveCandidates = candidates.filter((candidate) => candidate.category === "Deep Dive");
  const overheatedOrAvoid = candidates.filter((candidate) =>
    candidate.category === "Overheated" || candidate.category === "Avoid"
  );

  return `# AI Stock Radar - ${date}

## Kurzfazit
- Kostenloser Public-Source-Lauf: SEC/Nasdaq sind als Baseline vorgesehen, FINRA bleibt optionale Risikokontextquelle.
- Discovery mode: ${discoveryMode}
${fallbackReason ? `- Fallback reason: ${fallbackReason}\n` : ""}- Kurs-Momentum bleibt ohne verfuegbare kostenlose Price/Volume-Bestaetigung gedeckelt; optionale Stooq-Daten sind nur Kontext.
- Dieser Report ist Research-Infrastruktur, keine Anlageempfehlung.

## Marktumfeld
- SEC submissions: ${sourceStatus.sec_submissions}
- SEC companyfacts: ${sourceStatus.sec_companyfacts || "available_without_api_key"}
- SEC company tickers: ${sourceStatus.sec_company_tickers || "not_checked"}
- Nasdaq symbol directory: ${sourceStatus.nasdaq_symbol_directory}
- FINRA public data: ${sourceStatus.finra_public_data}
- Market data: free_price_data_unavailable
- Price/volume source: ${sourceStatus.price_volume || "not_checked"} (confirmation only, kein Trading-Signal)
- Paid market data: ${sourceStatus.paid_market_data}

## Top Kandidaten Heute
${topCandidates.length ? topCandidates.map(formatCandidate).join("\n") : "- Keine Kandidaten aus kostenlosen Quellen."}

## Neue Auffaelligkeiten
${topCandidates.length ? topCandidates.map((candidate) => `${formatCandidate(candidate)}\n${formatScoreReasons(candidate)}`).join("\n") : "- Keine neuen Auffaelligkeiten."}

## Idea Grade
${gradeCandidates.length ? gradeCandidates.map((candidate) => `- ${candidate.ticker}: ${candidate.idea_grade || "?"} (${(candidate.grade_reasons || []).join("; ") || "no grade reasons"})`).join("\n") : "- Keine Grades berechnet."}

## Price/Volume Confirmation
${gradeCandidates.length ? gradeCandidates.map((candidate) => `- ${candidate.ticker}: ${candidate.price_volume?.status || "unavailable"} / ${candidate.price_volume?.confirmation || "unavailable"}${candidate.price_volume?.volume_ratio_20d ? `, volume ratio 20d ${candidate.price_volume.volume_ratio_20d}` : ""}${candidate.price_volume?.return_20d_pct ? `, return 20d ${candidate.price_volume.return_20d_pct}%` : ""}`).join("\n") : "- Keine Price/Volume-Daten."}

## Evidence Firewall
${gradeCandidates.length ? gradeCandidates.map(formatFirewallCandidate).join("\n") : "- Keine Evidence-Firewall-Daten."}

## Watchlist Aenderungen
- Watchlist wurde aus kostenlosen Public-Source-Belegen neu berechnet; Seeds dienen nur als Fallback oder Themen-Overlay.
- Kandidaten im Lauf: ${candidates.length}
- Deep-Dive bleibt an A/B-Datenqualitaet und belegbare These gebunden.

## Deep-Dive Kandidaten
${deepDiveCandidates.length ? deepDiveCandidates.map(formatCandidate).join("\n") : "- Keine Deep-Dive-Kandidaten aus kostenlosen Quellen."}

## Overheated / Avoid
${overheatedOrAvoid.length ? overheatedOrAvoid.map(formatCandidate).join("\n") : "- Keine ueberhitzten oder zu meidenden Kandidaten markiert."}

## Datenqualitaet Und Luecken
- free_price_data_unavailable: kein bezahlter oder API-key-basierter Preisprovider aktiv; Stooq-Kontext kann je Ticker fehlen.
- FINRA-Kontext kann fehlen oder einzelne Endpunkte koennen Authentifizierung verlangen.
- SEC-Filings und Symbolverzeichnisse sind Belege fuer Existenz, Filing-Aktivitaet und AI-Bezug, aber kein Kurs-Signal.
- Keine Schaetzwerte wurden als harte Daten eingesetzt.

## Naechste Aktion
- Oeffentliche Belege fuer die staerksten Kandidaten manuell querpruefen und erst danach Dossiers schaerfen.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob spaeter ein kostenloser, terms-konformer Preisdatensatz ergaenzt werden soll; keine bezahlten Provider ohne Freigabe.
- BEOBACHTEN: Kandidaten mit A/B-Datenqualitaet, mehreren oeffentlichen Quellen und frischem Filing-Kontext.
- SPAETER: Backtesting und UI erst nach stabilen Free-Source-Laeufen.
- BLOCKIERT: Vollstaendig verlaessliches Kurs-Momentum ohne geprueften, stabilen Datenprovider.
- NICHT_TUN: Keine automatischen Trades; keine Hype-Hochstufung aus nur einer Quelle.
- Naechste kleinste Aktion: Free-Source-Report lesen und einen Kandidaten fuer manuelle Quellenpruefung auswaehlen.
- Beleg / Datei: ${reportPath}
`;
}

export async function resolveDiscoveryRecords({
  root,
  seeds,
  discoveryMode = process.env.AI_STOCK_RADAR_DISCOVERY_MODE || "seed",
  liveDiscovery = discoverLiveEvidence,
}) {
  if (discoveryMode === "seed") {
    return {
      discoveryMode: "seed",
      records: seeds.records || [],
      fallbackReason: "",
      sourceStatus: {
        ...DEFAULT_SOURCE_STATUS,
        ...(seeds.free_source_status || {}),
      },
    };
  }

  if (discoveryMode !== "auto" && discoveryMode !== "live") {
    throw new Error(`unsupported discovery mode: ${discoveryMode}`);
  }

  const result = await liveDiscovery({
    seedRecords: seeds.records || [],
    root,
  });

  if (discoveryMode === "live" && result.mode !== "live") {
    throw new Error(`live discovery failed: ${result.fallbackReason || "unknown reason"}`);
  }

  return {
    discoveryMode: result.mode,
    records: result.records || [],
    fallbackReason: result.fallbackReason || "",
    sourceStatus: {
      ...DEFAULT_SOURCE_STATUS,
      ...(seeds.free_source_status || {}),
      ...(result.sourceStatus || {}),
    },
  };
}

export async function writeFreeSignalRun({
  root = DEFAULT_ROOT,
  date = process.env.AI_STOCK_RADAR_DATE,
  discoveryMode = process.env.AI_STOCK_RADAR_DISCOVERY_MODE || "seed",
  liveDiscovery = discoverLiveEvidence,
  priceMode = process.env.AI_STOCK_RADAR_PRICE_MODE || "stooq_optional",
  priceProvider = fetchStooqPriceVolume,
} = {}) {
  const resolvedDate = date || new Date().toISOString().slice(0, 10);
  const seeds = loadFreeSourceSeeds({ root });
  const discovery = await resolveDiscoveryRecords({
    root,
    seeds,
    discoveryMode,
    liveDiscovery,
  });
  let candidates = buildCandidatesFromEvidence({
    date: resolvedDate,
    records: discovery.records,
  });
  candidates = await enrichCandidatesWithPriceVolume({
    candidates,
    priceMode,
    priceProvider,
  });
  candidates = candidates.sort((left, right) => gradeSortRank(left.idea_grade) - gradeSortRank(right.idea_grade) || right.score - left.score || left.ticker.localeCompare(right.ticker));
  const watchlist = validateWatchlist({
    version: 1,
    updated_at: resolvedDate,
    provider_status: {
      market_data: "free_price_data_unavailable",
      filings: "available",
      news: "public_sources_only",
    },
    candidates,
  });

  const reportDir = path.join(root, "reports/ai-stock-radar");
  const dossierDir = path.join(root, "projects/ai-stock-radar/dossiers");
  fs.mkdirSync(reportDir, { recursive: true });
  fs.mkdirSync(dossierDir, { recursive: true });

  const reportPath = path.join(reportDir, `ai-stock-radar-${resolvedDate}.md`);
  fs.writeFileSync(
    reportPath,
    renderFreeSourceReport({
      date: resolvedDate,
      candidates,
      reportPath,
      sourceStatus: {
        ...discovery.sourceStatus,
        price_volume: priceMode === "off" ? "off" : "stooq_optional",
      },
      discoveryMode: discovery.discoveryMode,
      fallbackReason: discovery.fallbackReason,
    }),
  );

  const watchlistPath = path.join(root, "projects/ai-stock-radar/watchlist.json");
  fs.writeFileSync(watchlistPath, `${JSON.stringify(watchlist, null, 2)}\n`);

  const dossierPaths = selectFreeSignalDossierCandidates(candidates).map((candidate) => {
    const dossierPath = path.join(dossierDir, `${candidate.ticker}-${resolvedDate}.md`);
    fs.writeFileSync(dossierPath, renderDossier({ date: resolvedDate, candidate }));
    return dossierPath;
  });

  return {
    reportPath,
    watchlistPath,
    dossierPaths,
    candidateCount: candidates.length,
    discoveryMode: discovery.discoveryMode,
    fallbackReason: discovery.fallbackReason,
  };
}

export async function enrichCandidatesWithPriceVolume({ candidates, priceMode = "stooq_optional", priceProvider = fetchStooqPriceVolume }) {
  if (priceMode === "off") return candidates;

  const enriched = [];
  for (const candidate of candidates) {
    const priceVolume = await priceProvider({ ticker: candidate.ticker });
    const momentumBonus =
      priceVolume.status === "available" && priceVolume.confirmation === "positive"
        ? Math.min(4, 20 - candidate.market_momentum)
        : 0;
    const withPrice = {
      ...candidate,
      price_volume: priceVolume,
      score: Math.min(100, candidate.score + momentumBonus),
      market_momentum: candidate.market_momentum + momentumBonus,
    };
    const grade = assignIdeaGrade(withPrice);
    enriched.push({
      ...withPrice,
      idea_grade: grade.grade,
      grade_reasons: grade.reasons,
    });
  }
  return enriched;
}

export function selectFreeSignalDossierCandidates(candidates) {
  const selected = [];
  const seen = new Set();
  const addCandidate = (candidate) => {
    if (!candidate || seen.has(candidate.ticker) || selected.length >= 3) return;
    seen.add(candidate.ticker);
    selected.push(candidate);
  };

  const researchCandidates = [...candidates]
    .filter((candidate) => candidate.idea_grade !== "X" && candidate.category !== "Avoid")
    .sort((left, right) => gradeSortRank(left.idea_grade) - gradeSortRank(right.idea_grade) || right.score - left.score || left.ticker.localeCompare(right.ticker));

  researchCandidates.forEach(addCandidate);
  selectDossierCandidates(candidates).forEach(addCandidate);

  return selected;
}

function isCliRun() {
  return process.argv[1] === fileURLToPath(import.meta.url);
}

if (isCliRun()) {
  const result = await writeFreeSignalRun({ root: process.cwd() });
  console.log(`AI_STOCK_RADAR_FREE_REPORT=${result.reportPath}`);
  console.log(`AI_STOCK_RADAR_FREE_CANDIDATES=${result.candidateCount}`);
  console.log(`AI_STOCK_RADAR_FREE_DOSSIERS=${result.dossierPaths.length}`);
  console.log(`AI_STOCK_RADAR_DISCOVERY_MODE=${result.discoveryMode}`);
}
