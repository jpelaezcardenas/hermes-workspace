import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { classifyCalibrationBucket } from "./ai-stock-radar-quality-rules.mjs";
import { buildFalsePositiveMemory } from "./ai-stock-radar-ceo-control.mjs";
import { summarizeShadowBacktest } from "./ai-stock-radar-shadow-backtest.mjs";

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
  return `- ${candidate.ticker} (${candidate.company || "unknown"}): Grade ${candidate.idea_grade || "?"}, ${candidate.category}, Score ${candidate.score}, Datenqualitaet ${candidate.data_quality}, Status ${candidate.status || "unknown"}. Notes: ${notes}`;
}

function formatBucket(candidates, emptyText) {
  if (!candidates.length) return `- ${emptyText}`;
  return candidates.map(formatCandidate).join("\n");
}

export function summarizeIdeaGrades(candidates) {
  const counts = { S: 0, A: 0, B: 0, C: 0, X: 0, "?": 0 };

  for (const candidate of candidates || []) {
    const grade = ["S", "A", "B", "C", "X"].includes(candidate.idea_grade) ? candidate.idea_grade : "?";
    counts[grade] += 1;
  }

  return counts;
}

export function summarizeFirewallVerdicts(candidates) {
  const counts = { pass: 0, caution: 0, reject: 0, unknown: 0 };

  for (const candidate of candidates || []) {
    const verdict = candidate.evidence_firewall?.verdict;
    if (["pass", "caution", "reject"].includes(verdict)) {
      counts[verdict] += 1;
    } else {
      counts.unknown += 1;
    }
  }

  return counts;
}

export function summarizeCeoControlLanes(candidates) {
  const counts = { focus: 0, monitor: 0, manual_review: 0, reject: 0, unknown: 0 };

  for (const candidate of candidates || []) {
    const lane = candidate.ceo_control?.lane;
    if (["focus", "monitor", "manual_review", "reject"].includes(lane)) {
      counts[lane] += 1;
    } else {
      counts.unknown += 1;
    }
  }

  return counts;
}

function formatGradeSummary(counts) {
  return ["S", "A", "B", "C", "X", "?"]
    .filter((grade) => counts[grade] > 0 || grade !== "?")
    .map((grade) => `- ${grade}: ${counts[grade]}`)
    .join("\n");
}

function formatFirewallSummary(counts) {
  return ["pass", "caution", "reject", "unknown"]
    .filter((verdict) => counts[verdict] > 0 || verdict !== "unknown")
    .map((verdict) => `- ${verdict}: ${counts[verdict]}`)
    .join("\n");
}

function formatCeoControlSummary(counts) {
  return ["focus", "monitor", "manual_review", "reject", "unknown"]
    .filter((lane) => counts[lane] > 0 || lane !== "unknown")
    .map((lane) => `- ${lane}: ${counts[lane]}`)
    .join("\n");
}

function formatFalsePositiveMemory(memory) {
  const patterns = Object.entries(memory.pattern_counts || {})
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, 8);
  if (!patterns.length) return "- Keine wiederkehrenden False-Positive-Muster.";

  return patterns
    .map(([pattern, count]) => `- ${pattern.replaceAll("_", "-")}: ${count}`)
    .join("\n");
}

function formatShadowBacktestSummary(summary) {
  const outcomes = summary.outcome_counts || {};
  return [
    `- total_snapshots: ${summary.total_snapshots || 0}`,
    `- assessed: ${summary.assessed || 0}`,
    `- pending: ${summary.pending || 0}`,
    `- unavailable: ${summary.unavailable || 0}`,
    `- constructive: ${outcomes.constructive || 0}`,
    `- risk_confirmed: ${outcomes.risk_confirmed || 0}`,
    `- inconclusive: ${outcomes.inconclusive || 0}`,
  ].join("\n");
}

export function bucketWatchlistCandidates(candidates) {
  const buckets = emptyBuckets();

  for (const candidate of candidates || []) {
    buckets[classifyCalibrationBucket(candidate)].push(candidate);
  }

  return buckets;
}

export function renderWeeklyCalibrationReport({ date, watchlist, reportPath, shadowBacktestLedger = { version: 1, snapshots: [] } }) {
  const buckets = bucketWatchlistCandidates(watchlist.candidates || []);
  const gradeSummary = summarizeIdeaGrades(watchlist.candidates || []);
  const firewallSummary = summarizeFirewallVerdicts(watchlist.candidates || []);
  const ceoControlSummary = summarizeCeoControlLanes(watchlist.candidates || []);
  const falsePositiveMemory = buildFalsePositiveMemory(watchlist.candidates || []);
  const shadowBacktestSummary = summarizeShadowBacktest(shadowBacktestLedger);

  return `# AI Stock Radar Weekly Calibration - ${date}

## Kurzfazit
- Weekly calibration reviews false positives, stale candidates, and quality-rule effects.
- Watchlist candidates reviewed: ${(watchlist.candidates || []).length}
- This report does not modify the watchlist automatically.

## Grade Summary
${formatGradeSummary(gradeSummary)}

## Firewall Summary
${formatFirewallSummary(firewallSummary)}

## CEO Control Summary
${formatCeoControlSummary(ceoControlSummary)}

## False Positive Memory
${formatFalsePositiveMemory(falsePositiveMemory)}

## Shadow Backtest Summary
${formatShadowBacktestSummary(shadowBacktestSummary)}

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
  const shadowBacktestLedgerPath = path.join(root, "projects/ai-stock-radar/shadow-backtest-ledger.json");
  const shadowBacktestLedger = fs.existsSync(shadowBacktestLedgerPath)
    ? JSON.parse(fs.readFileSync(shadowBacktestLedgerPath, "utf8"))
    : { version: 1, snapshots: [] };
  const reportDir = path.join(root, "reports/ai-stock-radar");
  fs.mkdirSync(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, `ai-stock-deepdive-${resolvedDate}.md`);
  const report = renderWeeklyCalibrationReport({ date: resolvedDate, watchlist, reportPath, shadowBacktestLedger });
  fs.writeFileSync(reportPath, report);
  const memoryPath = path.join(root, "projects/ai-stock-radar/false-positive-memory.json");
  fs.writeFileSync(memoryPath, `${JSON.stringify(buildFalsePositiveMemory(watchlist.candidates || []), null, 2)}\n`);

  const buckets = bucketWatchlistCandidates(watchlist.candidates || []);

  return {
    reportPath,
    memoryPath,
    shadowBacktestLedgerPath,
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
