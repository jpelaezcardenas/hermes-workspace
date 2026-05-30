import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { classifyCalibrationBucket } from "./ai-stock-radar-quality-rules.mjs";

const DEFAULT_ROOT = "/Users/zondrius/hermes-workspace";

function emptyBuckets() {
  return {
    keep_review: [],
    downgrade_review: [],
    archive_review: [],
    false_positive_review: [],
  };
}

function formatCandidate(candidate) {
  const notes = (candidate.quality_notes || []).join("; ") || "no quality notes";
  return `- ${candidate.ticker} (${candidate.company || "unknown"}): ${candidate.category}, Score ${candidate.score}, Datenqualitaet ${candidate.data_quality}, Status ${candidate.status || "unknown"}. Notes: ${notes}`;
}

function formatBucket(candidates, emptyText) {
  if (!candidates.length) return `- ${emptyText}`;
  return candidates.map(formatCandidate).join("\n");
}

export function bucketWatchlistCandidates(candidates) {
  const buckets = emptyBuckets();

  for (const candidate of candidates || []) {
    buckets[classifyCalibrationBucket(candidate)].push(candidate);
  }

  return buckets;
}

export function renderWeeklyCalibrationReport({ date, watchlist, reportPath }) {
  const buckets = bucketWatchlistCandidates(watchlist.candidates || []);

  return `# AI Stock Radar Weekly Calibration - ${date}

## Kurzfazit
- Weekly calibration reviews false positives, stale candidates, and quality-rule effects.
- Watchlist candidates reviewed: ${(watchlist.candidates || []).length}
- This report does not modify the watchlist automatically.

## Keep Review
${formatBucket(buckets.keep_review, "Keine Kandidaten im Keep Review.")}

## Downgrade Review
${formatBucket(buckets.downgrade_review, "Keine Kandidaten im Downgrade Review.")}

## Archive Review
${formatBucket(buckets.archive_review, "Keine Kandidaten im Archive Review.")}

## False Positive Review
${formatBucket(buckets.false_positive_review, "Keine Kandidaten im False Positive Review.")}

## Scoring Adjustment Candidate
- Wenn mehr als 30 Prozent der Kandidaten im False Positive Review landen, name_only_ai_watch Penalty weiter erhoehen.

## Datenqualitaet Und Luecken
- Market data: ${watchlist.provider_status?.market_data || "unknown"}
- Filings: ${watchlist.provider_status?.filings || "unknown"}
- News: ${watchlist.provider_status?.news || "unknown"}

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob Archivierungs- oder Downgrade-Vorschlaege manuell uebernommen werden.
- BEOBACHTEN: False-positive Muster, stale Kandidaten und wiederkehrende name-only AI Treffer.
- SPAETER: Backtesting der Qualitaetsregeln nach mehreren Wochenlaeufen.
- BLOCKIERT: Keine automatische Watchlist-Aenderung ohne dokumentierte Review-Entscheidung.
- NICHT_TUN: Keine automatischen Trades; keine stillen Loeschungen aus der Watchlist.
- Naechste kleinste Aktion: Einen False-Positive-Kandidaten manuell pruefen und Entscheidung dokumentieren.
- Beleg / Datei: ${reportPath}
`;
}

export function writeWeeklyCalibration({ root = DEFAULT_ROOT, date = process.env.AI_STOCK_RADAR_DATE } = {}) {
  const resolvedDate = date || new Date().toISOString().slice(0, 10);
  const watchlistPath = path.join(root, "projects/ai-stock-radar/watchlist.json");
  const watchlist = JSON.parse(fs.readFileSync(watchlistPath, "utf8"));
  const reportDir = path.join(root, "reports/ai-stock-radar");
  fs.mkdirSync(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, `ai-stock-deepdive-${resolvedDate}.md`);
  const report = renderWeeklyCalibrationReport({ date: resolvedDate, watchlist, reportPath });
  fs.writeFileSync(reportPath, report);

  const buckets = bucketWatchlistCandidates(watchlist.candidates || []);

  return {
    reportPath,
    buckets: Object.fromEntries(Object.entries(buckets).map(([key, value]) => [key, value.length])),
  };
}

function isCliRun() {
  return process.argv[1] === fileURLToPath(import.meta.url);
}

if (isCliRun()) {
  const result = writeWeeklyCalibration({ root: process.cwd() });
  console.log(`AI_STOCK_WEEKLY_CALIBRATION_REPORT=${result.reportPath}`);
  console.log(`AI_STOCK_WEEKLY_FALSE_POSITIVES=${result.buckets.false_positive_review}`);
  console.log(`AI_STOCK_WEEKLY_ARCHIVE_REVIEW=${result.buckets.archive_review}`);
}
