import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_ROOT = process.env.HERMES_WORKSPACE || process.cwd();
const SEC_SUBMISSIONS_ROOT = "https://data.sec.gov/submissions";
const SEC_USER_AGENT =
  process.env.INSTITUTIONAL_SELL_RADAR_SEC_USER_AGENT ||
  "HermesInstitutionalSellRadar/1.0 contact=local-research@example.invalid";

const OWNERSHIP_FORMS = new Set(["13F-HR", "13F-HR/A", "SC 13D", "SC 13D/A", "SC 13G", "SC 13G/A", "4"]);
const US_EXCHANGE_PATTERN = /\b(nasdaq|nyse|nyse american|nyse arca|iex|bats|otc|amex)\b/i;
const FORBIDDEN_REPORT_PATTERN =
  /buy now|sell now|short now|strong buy|strong sell|price target|kursziel|jetzt kaufen|jetzt verkaufen|option|leverage|margin|garantiert|sichere rendite/i;
const DEFAULT_STOCK_JOBS = [
  { id: "230fd5468b64", name: "AI_STOCK_RADAR_DAILY", schedule: "35 9 * * 1-5" },
  { id: "d157c13def75", name: "AI_STOCK_DEEPDIVE_WEEKLY", schedule: "30 16 * * 0" },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function safeReadJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function normalizeTicker(ticker) {
  return String(ticker || "").trim().toUpperCase();
}

function numberOrNull(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function reductionPct(observation) {
  const previous = numberOrNull(observation.shares_previous);
  const current = numberOrNull(observation.shares_current);
  if (!previous || current === null || current >= previous) return null;
  return Number((((previous - current) / previous) * 100).toFixed(2));
}

function observationDate(observation) {
  return observation.filed_at || observation.report_date || observation.trade_date || observation.date || "";
}

function is13F(form) {
  return /^13F/i.test(String(form || ""));
}

function is13DG(form) {
  return /^SC 13[DG]/i.test(String(form || ""));
}

function isForm4Sale(observation) {
  const transactionCode = String(observation.transaction_code || observation.transaction_type || "").trim();
  return String(observation.form || "") === "4" && /^(S|SALE|SELL)$/i.test(transactionCode);
}

function isShortObservation(observation) {
  return /SHORT/i.test(String(observation.form || observation.source || ""));
}

function isUsListed(candidate) {
  const country = String(candidate.country || "").toUpperCase();
  if (country && !["US", "USA", "UNITED STATES"].includes(country)) return false;

  const exchange = String(candidate.exchange || candidate.market || "");
  if (US_EXCHANGE_PATTERN.test(exchange)) return true;
  if (!exchange && (candidate.sources || []).some((source) => /nasdaqtrader|sec company tickers|data\.sec\.gov/i.test(source))) return true;
  return country === "US" || country === "USA";
}

function extractCik(candidate) {
  const sourceMatch = (candidate.sources || [])
    .map(String)
    .map((source) => source.match(/CIK(\d{10})/i)?.[1])
    .find(Boolean);
  if (sourceMatch) return sourceMatch;
  if (candidate.cik) return String(candidate.cik).replace(/\D/g, "").padStart(10, "0");
  return null;
}

function makeCandidate(entry) {
  return {
    ticker: normalizeTicker(entry.ticker),
    company: entry.company || entry.title || entry.name || normalizeTicker(entry.ticker),
    exchange: entry.exchange || "",
    country: entry.country || (US_EXCHANGE_PATTERN.test(entry.exchange || "") ? "US" : entry.country),
    sources: entry.sources || [],
    evidence_firewall: entry.evidence_firewall || { verdict: "unknown", risk_flags: [] },
    price_volume: entry.price_volume || { status: "unavailable", confirmation: "unavailable" },
    original: entry,
  };
}

export function buildSellRadarUniverse({ aiWatchlist = { candidates: [] }, sellWatchlist = { extra_tickers: [] } } = {}) {
  const byTicker = new Map();
  for (const candidate of aiWatchlist.candidates || []) {
    const normalized = makeCandidate(candidate);
    if (normalized.ticker && isUsListed(normalized)) byTicker.set(normalized.ticker, normalized);
  }
  for (const candidate of sellWatchlist.extra_tickers || []) {
    const normalized = makeCandidate(candidate);
    if (normalized.ticker && isUsListed(normalized)) byTicker.set(normalized.ticker, normalized);
  }
  return [...byTicker.values()].sort((left, right) => left.ticker.localeCompare(right.ticker));
}

export function detectExistingStockJobs(jobs = DEFAULT_STOCK_JOBS) {
  const effectiveJobs = jobs.length ? jobs : DEFAULT_STOCK_JOBS;
  const daily = effectiveJobs.find((job) => /AI_STOCK_RADAR_DAILY/i.test(job.name || ""));
  const weekly = effectiveJobs.find((job) => /AI_STOCK_DEEPDIVE_WEEKLY/i.test(job.name || ""));
  return {
    daily_job: daily || null,
    weekly_job: weekly || null,
    recommended_daily_schedule: "50 9 * * 1-5",
    reason: "Run in the same morning block after AI_STOCK_RADAR_DAILY, so stock alerts stay together.",
  };
}

function classifySourceLatency(observations) {
  if (!observations.length) return "unavailable";
  const has13F = observations.some((observation) => is13F(observation.form));
  const hasFresh = observations.some((observation) => is13DG(observation.form) || String(observation.form || "") === "4");
  if (has13F && hasFresh) return "mixed";
  if (has13F) return "quarterly_delayed";
  if (hasFresh) return "short_delay";
  return "near_real_time";
}

function groupEvidence(observations) {
  const ownership13f = [];
  const beneficial = [];
  const insiders = [];
  const form4Review = [];
  const shortContext = [];

  for (const observation of observations) {
    const normalized = {
      ...observation,
      reduction_pct: reductionPct(observation),
    };
    if (is13F(observation.form)) ownership13f.push(normalized);
    else if (is13DG(observation.form)) beneficial.push(normalized);
    else if (isForm4Sale(observation)) insiders.push(normalized);
    else if (String(observation.form || "") === "4") form4Review.push(normalized);
    else if (isShortObservation(observation)) shortContext.push(normalized);
  }

  return {
    thirteen_f_reductions: ownership13f.filter((observation) => (observation.reduction_pct || 0) > 0),
    beneficial_owner_alerts: beneficial,
    insider_or_ten_percent_holder_sales: insiders,
    form4_review_filings: form4Review,
    short_pressure_context: shortContext,
  };
}

function negativePriceVolume(candidate) {
  const price = candidate.price_volume || {};
  return price.confirmation === "negative" ||
    (Number(price.return_20d_pct) <= -15 && Number(price.volume_ratio_20d) >= 1.5);
}

function riskFlags(candidate) {
  return unique([
    ...(candidate.evidence_firewall?.risk_flags || []),
    ...(candidate.top_risks || []).map((risk) => String(risk || "").toLowerCase().replaceAll(" ", "_").replaceAll("-", "_")),
    ...(candidate.original?.top_risks || []).map((risk) => String(risk || "").toLowerCase().replaceAll(" ", "_").replaceAll("-", "_")),
  ]);
}

function dataQuality({ observations, candidate, sourceLatency }) {
  if (!observations.length) return "D";
  if (sourceLatency === "quarterly_delayed") return "C";
  if (candidate.price_volume?.status !== "available") return "B";
  return "A";
}

export function buildInstitutionalSellPressureSignal(candidate, { observations = [], date = new Date().toISOString().slice(0, 10) } = {}) {
  const ticker = normalizeTicker(candidate.ticker);
  const relevant = (observations || []).filter((observation) => normalizeTicker(observation.ticker || ticker) === ticker);
  const evidence = groupEvidence(relevant);
  const sourceLatency = classifySourceLatency(relevant);
  const reasons = [];
  const gaps = [];
  let score = 0;

  for (const observation of evidence.thirteen_f_reductions) {
    if ((observation.reduction_pct || 0) >= 40) score += 40;
    else if ((observation.reduction_pct || 0) >= 25) score += 20;
    reasons.push(`${observation.holder || "institution"} reduced reported 13F position by ${observation.reduction_pct}%`);
  }

  const beneficialReduction = evidence.beneficial_owner_alerts.some((observation) => (observation.reduction_pct || 0) > 0);
  if (evidence.beneficial_owner_alerts.length) {
    score += beneficialReduction ? 60 : 25;
    reasons.push(beneficialReduction ? "beneficial ownership reduction detected" : "beneficial ownership filing requires review");
  }

  if (evidence.insider_or_ten_percent_holder_sales.length >= 2) {
    score += 20;
    reasons.push("insider or 10 percent holder sale cluster detected");
  } else if (evidence.insider_or_ten_percent_holder_sales.length === 1) {
    score += 10;
    reasons.push("insider or 10 percent holder sale detected");
  }

  if (evidence.form4_review_filings.length) {
    score += 5;
    reasons.push("Form 4 ownership filing requires transaction-code review");
  }

  if (evidence.short_pressure_context.some((observation) => Number(observation.short_volume_ratio) >= 0.6)) {
    score += 10;
    reasons.push("FINRA short-pressure context elevated");
  }

  if (negativePriceVolume(candidate)) {
    score += 10;
    reasons.push("negative price/volume context confirms pressure");
  } else if (candidate.price_volume?.status !== "available") {
    gaps.push("free price/volume context unavailable");
  }

  const risks = riskFlags(candidate);
  const severeRisks = risks.filter((risk) => /dilution|offering|delisting|going_concern|cash_runway|warrant/.test(risk));
  if (severeRisks.length) {
    score += 15;
    reasons.push(`issuer risk context present: ${severeRisks.slice(0, 3).join(", ")}`);
  }

  const shortOnly = relevant.length > 0 && relevant.every(isShortObservation);
  const thirteenFOnly = relevant.length > 0 && relevant.every((observation) => is13F(observation.form));
  if (shortOnly) {
    score = Math.min(score, 25);
    reasons.push("short-pressure-only context is not institutional selling evidence");
  }
  if (thirteenFOnly) {
    score = Math.min(score, 55);
    reasons.push("13F-only signal capped because data is delayed quarterly");
  }
  if (!relevant.length) {
    gaps.push("no institutional ownership observations available yet");
  }

  score = clamp(score, 0, 100);
  let riskLevel = "INFO";
  if (score >= 80 && !thirteenFOnly && !shortOnly) riskLevel = "CRITICAL_REVIEW";
  else if (score >= 60 && !shortOnly) riskLevel = "WARNING";
  else if (score >= 35) riskLevel = "WATCH";

  const reviewAction = {
    INFO: "SELL_PRESSURE_MONITOR",
    WATCH: "SELL_PRESSURE_REVIEW",
    WARNING: "SELL_PRESSURE_REVIEW",
    CRITICAL_REVIEW: "SELL_PRESSURE_ESCALATE",
  }[riskLevel];

  return {
    version: 1,
    date,
    risk_level: riskLevel,
    review_action: reviewAction,
    score,
    source_latency: sourceLatency,
    data_quality: dataQuality({ observations: relevant, candidate, sourceLatency }),
    evidence,
    reasons: unique(reasons.length ? reasons : ["no public institutional sell-pressure signal detected"]),
    gaps: unique(gaps),
  };
}

function countBy(values, allowed = []) {
  const counts = Object.fromEntries(allowed.map((item) => [item, 0]));
  for (const value of values || []) {
    const key = allowed.includes(value) ? value : value || "unknown";
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

export function summarizeInstitutionalSellPressure(candidates = []) {
  return {
    candidate_count: candidates.length,
    risk_counts: countBy(candidates.map((candidate) => candidate.institutional_sell_pressure?.risk_level), ["INFO", "WATCH", "WARNING", "CRITICAL_REVIEW"]),
    latency_counts: countBy(candidates.map((candidate) => candidate.institutional_sell_pressure?.source_latency), ["near_real_time", "short_delay", "quarterly_delayed", "mixed", "unavailable"]),
    warning_count: candidates.filter((candidate) => ["WARNING", "CRITICAL_REVIEW"].includes(candidate.institutional_sell_pressure?.risk_level)).length,
  };
}

function formatCandidate(candidate) {
  const signal = candidate.institutional_sell_pressure || {};
  const reasons = (signal.reasons || []).slice(0, 2).join("; ") || "no reason";
  return `- ${candidate.ticker}: ${signal.risk_level || "INFO"} / ${signal.review_action || "SELL_PRESSURE_MONITOR"}; score ${signal.score ?? 0}; latency ${signal.source_latency || "unavailable"}; reasons: ${reasons}`;
}

function formatEvidenceList(candidates, selector, emptyText) {
  const lines = [];
  for (const candidate of candidates) {
    for (const item of selector(candidate.institutional_sell_pressure?.evidence || {})) {
      const detail = item.reduction_pct ? `reduction ${item.reduction_pct}%` : "review required";
      lines.push(`- ${candidate.ticker}: ${item.form || item.source || "source"}; ${item.holder || "holder unknown"}; ${detail}; date ${observationDate(item) || "unknown"}`);
    }
  }
  return lines.length ? lines.join("\n") : emptyText;
}

function formatCountMap(counts) {
  return Object.entries(counts || {}).map(([key, value]) => `- ${key}: ${value}`).join("\n");
}

export function renderInstitutionalSellRadarReport({
  date,
  candidates,
  summary = summarizeInstitutionalSellPressure(candidates),
  reportPath,
  jobAlignment = {},
}) {
  const sorted = [...(candidates || [])].sort((left, right) =>
    (right.institutional_sell_pressure?.score || 0) - (left.institutional_sell_pressure?.score || 0)
  );
  const warnings = sorted.filter((candidate) => ["WARNING", "CRITICAL_REVIEW"].includes(candidate.institutional_sell_pressure?.risk_level));

  const report = `# Institutional Sell Pressure Radar - ${date}

## Kurzfazit
- Research-only radar for public institutional sell-pressure signals.
- Candidates reviewed: ${summary.candidate_count}
- WARNING or CRITICAL_REVIEW: ${summary.warning_count}
- 13F data is delayed quarterly and cannot prove live selling by itself.

## Existing Stock Job Alignment
- Existing daily stock job: ${jobAlignment.daily_job?.name || "AI_STOCK_RADAR_DAILY not detected"} (${jobAlignment.daily_job?.schedule || "unknown"})
- Existing weekly stock job: ${jobAlignment.weekly_job?.name || "AI_STOCK_DEEPDIVE_WEEKLY not detected"} (${jobAlignment.weekly_job?.schedule || "unknown"})
- Recommended sell-pressure schedule: ${jobAlignment.recommended_daily_schedule || "50 9 * * 1-5"}

## New Warnings
${warnings.length ? warnings.map(formatCandidate).join("\n") : "- Keine WARNING oder CRITICAL_REVIEW Signale."}

## Top Sell Pressure
${sorted.length ? sorted.slice(0, 10).map(formatCandidate).join("\n") : "- Keine Kandidaten."}

## 13F Ownership Changes
${formatEvidenceList(sorted, (evidence) => evidence.thirteen_f_reductions || [], "- Keine 13F-Reduktionssignale.")}

## 13D/13G Alerts
${formatEvidenceList(sorted, (evidence) => evidence.beneficial_owner_alerts || [], "- Keine 13D/13G-Alerts.")}

## Insider / 10 Percent Holder Activity
${formatEvidenceList(sorted, (evidence) => [...(evidence.insider_or_ten_percent_holder_sales || []), ...(evidence.form4_review_filings || [])], "- Keine Form-4-Aktivitaet.")}

## Short Pressure Context
${formatEvidenceList(sorted, (evidence) => evidence.short_pressure_context || [], "- Keine FINRA-Short-Kontextsignale.")}

## Price/Volume Confirmation
${sorted.length ? sorted.slice(0, 10).map((candidate) => `- ${candidate.ticker}: ${candidate.price_volume?.status || "unavailable"} / ${candidate.price_volume?.confirmation || "unavailable"}; 20d ${candidate.price_volume?.return_20d_pct ?? "n/a"}; volume ratio ${candidate.price_volume?.volume_ratio_20d ?? "n/a"}`).join("\n") : "- Keine Kandidaten."}

## False Positive Checks
- 13F-only signals stay capped because they are delayed quarterly.
- Short-volume-only signals remain context, not institutional selling proof.
- Index rebalancing, CUSIP changes, split effects, amendments, and issuer actions require manual review.

## Datenqualitaet Und Luecken
${formatCountMap(summary.latency_counts)}

## Decision Inbox
- Signal: ${summary.warning_count ? "Yellow" : "Green"}
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob WARNING/CRITICAL_REVIEW Faelle manuell gegen SEC-Filings geprueft werden sollen.
- BEOBACHTEN: 13D/13G-Aenderungen, Form-4-Cluster, 13F-Reduktionen, Short-Kontext und Preis/Volumen-Bestaetigung.
- SPAETER: Vollmarkt-13F-Ingestion mit CUSIP-Mapping nur nach stabiler Watchlist-Version ausbauen.
- BLOCKIERT: Live-Intraday-Verkaeufe von Institutionen sind in kostenlosen oeffentlichen Daten nicht direkt sichtbar.
- NICHT_TUN: Keine automatischen Trades, keine Short-, Derivate- oder Hebel-Workflows, keine 13F-Daten als Live-Verkauf missverstehen.
- Naechste kleinste Aktion: WARNING/CRITICAL_REVIEW Kandidaten mit Original-Filing und Datenlatenz pruefen.
- Beleg / Datei: ${reportPath}
`;

  if (FORBIDDEN_REPORT_PATTERN.test(report)) {
    throw new Error("Institutional sell radar report contains forbidden trading or certainty language");
  }
  return report;
}

function defaultSellWatchlist() {
  return {
    version: 1,
    updated_at: new Date().toISOString().slice(0, 10),
    focus: "US-listed companies plus large global institutions visible in public SEC filings",
    extra_tickers: [],
    source_limits: [
      "13F is delayed quarterly data",
      "13D/13G is threshold-based beneficial ownership data",
      "Form 4 covers insiders and 10 percent holders, not every institution",
      "FINRA short data is context, not proof of institutional selling",
    ],
  };
}

function mergeLedgerObservations(existingLedger, observations, date) {
  const existing = {
    version: 1,
    observations: [...(existingLedger.observations || [])],
  };
  const ids = new Set(existing.observations.map((observation) => observation.id));
  for (const observation of observations || []) {
    const id = [
      normalizeTicker(observation.ticker),
      observation.form || observation.source || "source",
      observation.accession || observation.holder || "holder",
      observationDate(observation) || date,
    ].join("-");
    if (!ids.has(id)) {
      existing.observations.push({ id, observed_at: date, ...observation });
      ids.add(id);
    }
  }
  existing.generated_at = new Date().toISOString();
  return existing;
}

function updateMemory(memory, candidates, date) {
  const existing = {
    version: 1,
    alerts: [...(memory.alerts || [])],
    false_positive_notes: [...(memory.false_positive_notes || [])],
  };
  const ids = new Set(existing.alerts.map((alert) => alert.id));
  for (const candidate of candidates) {
    const signal = candidate.institutional_sell_pressure;
    if (!signal || !["WARNING", "CRITICAL_REVIEW"].includes(signal.risk_level)) continue;
    const id = `${candidate.ticker}-${date}-${signal.risk_level}`;
    if (!ids.has(id)) {
      existing.alerts.push({
        id,
        ticker: candidate.ticker,
        date,
        risk_level: signal.risk_level,
        score: signal.score,
        source_latency: signal.source_latency,
        status: "pending_review",
      });
      ids.add(id);
    }
  }
  existing.generated_at = new Date().toISOString();
  return existing;
}

export function writeInstitutionalSellRadarRun({
  root = DEFAULT_ROOT,
  date = process.env.INSTITUTIONAL_SELL_RADAR_DATE || process.env.AI_STOCK_RADAR_DATE || new Date().toISOString().slice(0, 10),
  observations = [],
  cronJobs = [],
} = {}) {
  const projectDir = path.join(root, "projects/institutional-sell-radar");
  const reportDir = path.join(root, "reports/institutional-sell-radar");
  fs.mkdirSync(projectDir, { recursive: true });
  fs.mkdirSync(reportDir, { recursive: true });

  const aiWatchlistPath = path.join(root, "projects/ai-stock-radar/watchlist.json");
  const sellWatchlistPath = path.join(projectDir, "watchlist.json");
  const ledgerPath = path.join(projectDir, "holder-ledger.json");
  const memoryPath = path.join(projectDir, "sell-pressure-memory.json");

  const aiWatchlist = safeReadJson(aiWatchlistPath, { candidates: [] });
  const sellWatchlist = safeReadJson(sellWatchlistPath, defaultSellWatchlist());
  if (!fs.existsSync(sellWatchlistPath)) writeJson(sellWatchlistPath, sellWatchlist);

  const previousLedger = safeReadJson(ledgerPath, { version: 1, observations: [] });
  const ledger = mergeLedgerObservations(previousLedger, observations, date);
  writeJson(ledgerPath, ledger);

  const universe = buildSellRadarUniverse({ aiWatchlist, sellWatchlist });
  const candidates = universe.map((candidate) => ({
    ...candidate,
    cik: extractCik(candidate),
    institutional_sell_pressure: buildInstitutionalSellPressureSignal(candidate, {
      observations: ledger.observations,
      date,
    }),
  }));
  const summary = summarizeInstitutionalSellPressure(candidates);
  const previousMemory = safeReadJson(memoryPath, { version: 1, alerts: [], false_positive_notes: [] });
  const memory = updateMemory(previousMemory, candidates, date);
  writeJson(memoryPath, memory);

  const reportPath = path.join(reportDir, `institutional-sell-radar-${date}.md`);
  const jobAlignment = detectExistingStockJobs(cronJobs);
  fs.writeFileSync(reportPath, renderInstitutionalSellRadarReport({ date, candidates, summary, reportPath, jobAlignment }));

  return {
    reportPath,
    ledgerPath,
    memoryPath,
    watchlistPath: sellWatchlistPath,
    summary,
    candidates,
  };
}

export function buildSecSubmissionsUrl(cik) {
  return `${SEC_SUBMISSIONS_ROOT}/CIK${String(cik).replace(/\D/g, "").padStart(10, "0")}.json`;
}

export async function fetchRecentSecOwnershipObservations({ candidates = [], date = new Date().toISOString().slice(0, 10), fetcher = fetch, lookbackDays = 7 } = {}) {
  const observations = [];
  const cutoff = new Date(`${date}T00:00:00Z`);
  cutoff.setUTCDate(cutoff.getUTCDate() - lookbackDays);

  for (const candidate of candidates) {
    const cik = candidate.cik || extractCik(candidate);
    if (!cik) continue;
    try {
      const response = await fetcher(buildSecSubmissionsUrl(cik), {
        headers: { "User-Agent": SEC_USER_AGENT, Accept: "application/json" },
      });
      const submissions = typeof response === "string" ? JSON.parse(response) : await response.json();
      const recent = submissions?.filings?.recent || {};
      const forms = recent.form || [];
      const filingDates = recent.filingDate || [];
      const accessions = recent.accessionNumber || [];
      const primaryDocs = recent.primaryDocument || [];
      for (let index = 0; index < forms.length; index += 1) {
        const form = forms[index];
        const filedAt = filingDates[index];
        if (!OWNERSHIP_FORMS.has(form)) continue;
        if (filedAt && new Date(`${filedAt}T00:00:00Z`) < cutoff) continue;
        observations.push({
          ticker: candidate.ticker,
          source: "SEC",
          form,
          holder: submissions.name || "SEC filer",
          cik,
          accession: accessions[index],
          primary_document: primaryDocs[index],
          filed_at: filedAt,
          document_review_required: true,
        });
      }
    } catch {
      observations.push({
        ticker: candidate.ticker,
        source: "SEC",
        form: "SEC_SUBMISSIONS_UNAVAILABLE",
        cik,
        filed_at: date,
      });
    }
  }

  return observations;
}

async function main() {
  const root = process.env.HERMES_WORKSPACE || DEFAULT_ROOT;
  const date = process.env.INSTITUTIONAL_SELL_RADAR_DATE || process.env.AI_STOCK_RADAR_DATE || new Date().toISOString().slice(0, 10);
  const projectDir = path.join(root, "projects/institutional-sell-radar");
  const aiWatchlist = safeReadJson(path.join(root, "projects/ai-stock-radar/watchlist.json"), { candidates: [] });
  const sellWatchlist = safeReadJson(path.join(projectDir, "watchlist.json"), defaultSellWatchlist());
  const universe = buildSellRadarUniverse({ aiWatchlist, sellWatchlist }).map((candidate) => ({ ...candidate, cik: extractCik(candidate) }));
  const liveMode = process.env.INSTITUTIONAL_SELL_RADAR_LIVE_MODE !== "off";
  const observations = liveMode ? await fetchRecentSecOwnershipObservations({ candidates: universe, date }) : [];
  const result = writeInstitutionalSellRadarRun({ root, date, observations });
  console.log(`INSTITUTIONAL_SELL_RADAR_REPORT=${result.reportPath}`);
  console.log(`INSTITUTIONAL_SELL_RADAR_CANDIDATES=${result.summary.candidate_count}`);
  console.log(`INSTITUTIONAL_SELL_RADAR_WARNINGS=${result.summary.warning_count}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
