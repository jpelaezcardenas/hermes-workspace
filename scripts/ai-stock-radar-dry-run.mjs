import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const VALID_CATEGORIES = new Set([
  "Early Watch",
  "Breakout Watch",
  "Deep Dive",
  "Overheated",
  "Avoid",
]);

export const VALID_DATA_QUALITIES = new Set(["A", "B", "C", "D"]);

export const FORBIDDEN_LANGUAGE = [
  "buy now",
  "sell now",
  "sure winner",
  "will explode",
  "safe winner",
  "garantierter gewinner",
  "sicherer gewinner",
  "jetzt kaufen",
  "jetzt verkaufen",
];

const REQUIRED_PROVIDER_KEYS = ["market_data", "filings", "news"];
const DEFAULT_REPORT_ROOT = "/Users/zondrius/hermes-workspace/reports/ai-stock-radar";

export function defaultWatchlist(date) {
  return {
    version: 1,
    updated_at: date,
    provider_status: {
      market_data: "not_configured",
      filings: "available",
      news: "not_configured",
    },
    candidates: [],
  };
}

export function validateWatchlist(watchlist) {
  if (!watchlist || typeof watchlist !== "object") {
    throw new Error("watchlist must be an object");
  }

  if (watchlist.version !== 1) {
    throw new Error("watchlist.version must be 1");
  }

  if (!watchlist.provider_status || typeof watchlist.provider_status !== "object") {
    throw new Error("watchlist.provider_status must be an object");
  }

  for (const key of REQUIRED_PROVIDER_KEYS) {
    if (typeof watchlist.provider_status[key] !== "string") {
      throw new Error(`watchlist.provider_status.${key} must be a string`);
    }
  }

  if (!Array.isArray(watchlist.candidates)) {
    throw new Error("watchlist.candidates must be an array");
  }

  for (const candidate of watchlist.candidates) {
    validateCandidate(candidate);
  }

  return watchlist;
}

export function validateCandidate(candidate) {
  for (const key of ["ticker", "company", "category", "data_quality", "thesis", "next_action", "last_checked"]) {
    if (typeof candidate[key] !== "string" || candidate[key].trim() === "") {
      throw new Error(`candidate.${key} must be a non-empty string`);
    }
  }

  for (const key of ["ticker", "company", "thesis", "next_action"]) {
    assertSafeText(candidate[key], `candidate.${key}`);
  }

  if (!VALID_CATEGORIES.has(candidate.category)) {
    throw new Error(`invalid category for ${candidate.ticker}: ${candidate.category}`);
  }

  if (!VALID_DATA_QUALITIES.has(candidate.data_quality)) {
    throw new Error(`invalid data quality for ${candidate.ticker}: ${candidate.data_quality}`);
  }

  for (const key of [
    "score",
    "previous_score",
    "ai_relevance",
    "catalyst",
    "market_momentum",
    "earliness",
    "fundamental_quality",
    "signal_breadth",
  ]) {
    if (!Number.isFinite(candidate[key])) {
      throw new Error(`candidate.${key} must be numeric for ${candidate.ticker}`);
    }
  }

  if (!Array.isArray(candidate.top_risks)) {
    throw new Error(`candidate.top_risks must be an array for ${candidate.ticker}`);
  }

  candidate.top_risks.forEach((risk, index) => {
    if (typeof risk !== "string" || risk.trim() === "") {
      throw new Error(`candidate.top_risks[${index}] must be a non-empty string for ${candidate.ticker}`);
    }
    assertSafeText(risk, `candidate.top_risks[${index}]`);
  });

  if (!Array.isArray(candidate.sources)) {
    throw new Error(`candidate.sources must be an array for ${candidate.ticker}`);
  }

  candidate.sources.forEach((source, index) => {
    if (typeof source !== "string" || source.trim() === "") {
      throw new Error(`candidate.sources[${index}] must be a non-empty string for ${candidate.ticker}`);
    }
    assertSafeText(source, `candidate.sources[${index}]`);
  });

  if (candidate.category === "Deep Dive" && !candidateCanDeepDive(candidate)) {
    throw new Error(`Deep Dive requires score >= 75, A/B data quality, and a current thesis for ${candidate.ticker}`);
  }

  return candidate;
}

export function assertSafeText(value, context) {
  if (typeof value !== "string") return;

  const normalizedValue = value.toLowerCase();
  const forbiddenPhrase = FORBIDDEN_LANGUAGE.find((phrase) => normalizedValue.includes(phrase));

  if (forbiddenPhrase) {
    throw new Error(`${context} contains forbidden language: ${forbiddenPhrase}`);
  }
}

export function candidateCanDeepDive(candidate) {
  const hasUsableData = candidate.data_quality === "A" || candidate.data_quality === "B";
  const hasCurrentThesis = typeof candidate.thesis === "string" && candidate.thesis.trim().length > 12;
  return candidate.score >= 75 && hasUsableData && hasCurrentThesis;
}

export function selectDossierCandidates(candidates) {
  const qualityRank = { A: 4, B: 3, C: 2, D: 1 };

  return candidates
    .filter((candidate) => {
      if (candidateCanDeepDive(candidate)) return true;
      return candidate.category === "Overheated" || candidate.category === "Avoid";
    })
    .sort((left, right) => {
      const qualityDelta = qualityRank[right.data_quality] - qualityRank[left.data_quality];
      if (qualityDelta !== 0) return qualityDelta;
      const catalystDelta = right.catalyst - left.catalyst;
      if (catalystDelta !== 0) return catalystDelta;
      return right.score - left.score;
    })
    .slice(0, 3);
}

export function countSofortMachenItems(report) {
  const line = report
    .split("\n")
    .find((entry) => entry.startsWith("- SOFORT_MACHEN:"));

  if (!line) return 0;

  const value = line.replace("- SOFORT_MACHEN:", "").trim();
  if (value === "" || value.toLowerCase() === "nichts") return 0;
  return 1;
}

function formatCandidate(candidate) {
  return `- ${candidate.ticker} (${candidate.company}): ${candidate.category}, Score ${candidate.score}, Datenqualitaet ${candidate.data_quality}. These: ${candidate.thesis}`;
}

function formatCandidateList(candidates, emptyText) {
  if (candidates.length === 0) return `- ${emptyText}`;
  return candidates.map(formatCandidate).join("\n");
}

export function renderDailyReport({
  date,
  watchlist,
  reportPath = path.join(DEFAULT_REPORT_ROOT, `ai-stock-radar-${date}.md`),
}) {
  validateWatchlist(watchlist);

  const candidates = [...watchlist.candidates].sort((left, right) => right.score - left.score);
  const deepDiveCandidates = candidates.filter(candidateCanDeepDive);
  const overheatedOrAvoid = candidates.filter((candidate) =>
    candidate.category === "Overheated" || candidate.category === "Avoid"
  );
  const signal = watchlist.provider_status.market_data === "not_configured" ? "Yellow" : "Green";

  return `# AI Stock Radar - ${date}

## Kurzfazit
- Dry-run ohne kostenpflichtigen Markt- oder Newsprovider.
- Der Radar ist betriebsbereit fuer Watchlist- und Reportstruktur, aber Markt-Momentum bleibt bis zur Provider-Entscheidung eingeschraenkt.

## Marktumfeld
- Market data: ${watchlist.provider_status.market_data}
- Filings: ${watchlist.provider_status.filings}
- News: ${watchlist.provider_status.news}

## Top Kandidaten Heute
${formatCandidateList(candidates.slice(0, 10), "Keine Kandidaten in der Watchlist.")}

## Neue Auffaelligkeiten
- Keine neuen Auffaelligkeiten im Dry-run.

## Watchlist Aenderungen
- Watchlist geladen mit ${candidates.length} Kandidaten.

## Deep-Dive Kandidaten
${formatCandidateList(deepDiveCandidates, "Keine Deep-Dive-Kandidaten mit A/B-Datenqualitaet.")}

## Overheated / Avoid
${formatCandidateList(overheatedOrAvoid, "Keine ueberhitzten oder zu meidenden Kandidaten markiert.")}

## Datenqualitaet Und Luecken
- Markt- und Newsdaten sind nicht konfiguriert.
- SEC/Nasdaq/FINRA bleiben als Baseline vorgesehen.
- Keine Schätzwerte wurden eingesetzt.

## Naechste Aktion
- Datenprovider-Entscheidung vorbereiten, aber keine Handelsaktion ausloesen.

## Decision Inbox
- Signal: ${signal}
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob und welcher Markt-/Newsprovider fuer Phase 2 freigegeben wird.
- BEOBACHTEN: Ob Watchlist-Kandidaten nach Provider-Anbindung belastbare A/B-Datenqualitaet erreichen.
- SPAETER: Hermes-Cockpit UI und Backtesting erst nach stabilen Report-Laeufen.
- BLOCKIERT: nichts
- NICHT_TUN: Keine automatischen Trades; keinen Hype-Kandidaten ohne A/B-Datenqualitaet hochstufen.
- Naechste kleinste Aktion: Dry-run pruefen und Provider-Entscheidung vorbereiten.
- Beleg / Datei: ${reportPath}
`;
}

export function renderDossier({ date, candidate }) {
  return `# ${candidate.ticker} - ${candidate.company} - ${date}

## Thesis
${candidate.thesis}

## Why AI-Relevant
AI-Relevanz Score: ${candidate.ai_relevance}/20

## Catalyst
Katalysator Score: ${candidate.catalyst}/20

## Evidence
- Datenqualitaet: ${candidate.data_quality}
- Quellen: ${candidate.sources.join(", ")}

## Score Breakdown
- AI relevance: ${candidate.ai_relevance}
- Catalyst: ${candidate.catalyst}
- Market momentum: ${candidate.market_momentum}
- Earliness: ${candidate.earliness}
- Fundamental quality: ${candidate.fundamental_quality}
- Signal breadth: ${candidate.signal_breadth}
- Total: ${candidate.score}

## Risks
${candidate.top_risks.map((risk) => `- ${risk}`).join("\n")}

## What Would Prove This Wrong
- These verliert Gueltigkeit, wenn Katalysator, Datenqualitaet oder AI-Bezug nicht mehr belegbar sind.

## Data Quality
${candidate.data_quality}

## Next Review Trigger
${candidate.next_action}

## Sources
${candidate.sources.map((source) => `- ${source}`).join("\n")}
`;
}

export function ensureDirectories(root) {
  fs.mkdirSync(path.join(root, "projects/ai-stock-radar/dossiers"), { recursive: true });
  fs.mkdirSync(path.join(root, "reports/ai-stock-radar"), { recursive: true });
}

export function readOrCreateWatchlist({ root, date }) {
  const watchlistPath = path.join(root, "projects/ai-stock-radar/watchlist.json");

  if (!fs.existsSync(watchlistPath)) {
    const watchlist = defaultWatchlist(date);
    fs.mkdirSync(path.dirname(watchlistPath), { recursive: true });
    fs.writeFileSync(watchlistPath, `${JSON.stringify(watchlist, null, 2)}\n`);
    return watchlist;
  }

  return validateWatchlist(JSON.parse(fs.readFileSync(watchlistPath, "utf8")));
}

export function writeDryRun({ root = process.cwd(), date = process.env.AI_STOCK_RADAR_DATE }) {
  const resolvedDate = date || new Date().toISOString().slice(0, 10);
  ensureDirectories(root);

  const watchlist = readOrCreateWatchlist({ root, date: resolvedDate });
  const reportPath = path.join(root, `reports/ai-stock-radar/ai-stock-radar-${resolvedDate}.md`);
  const report = renderDailyReport({ date: resolvedDate, watchlist, reportPath });
  fs.writeFileSync(reportPath, report);

  const dossierCandidates = selectDossierCandidates(watchlist.candidates);
  const dossierPaths = dossierCandidates.map((candidate) => {
    const dossierPath = path.join(
      root,
      `projects/ai-stock-radar/dossiers/${candidate.ticker}-${resolvedDate}.md`,
    );
    fs.writeFileSync(dossierPath, renderDossier({ date: resolvedDate, candidate }));
    return dossierPath;
  });

  return { reportPath, dossierPaths };
}

function isCliRun() {
  return process.argv[1] === fileURLToPath(import.meta.url);
}

if (isCliRun()) {
  const result = writeDryRun({ root: process.cwd() });
  console.log(`AI_STOCK_RADAR_REPORT=${result.reportPath}`);
  console.log(`AI_STOCK_RADAR_DOSSIERS=${result.dossierPaths.length}`);
}
