import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { classifyCalibrationBucket } from "./ai-stock-radar-quality-rules.mjs";
import { buildFalsePositiveMemory } from "./ai-stock-radar-ceo-control.mjs";
import { summarizeShadowBacktest } from "./ai-stock-radar-shadow-backtest.mjs";
import { summarizePaperPortfolio } from "./ai-stock-radar-paper-portfolio.mjs";
import { summarizeAdvancedSignals } from "./ai-stock-radar-advanced-signals.mjs";
import { summarizeThesisIntelligence } from "./ai-stock-radar-thesis-intelligence.mjs";
import { summarizeAlphaMemory } from "./ai-stock-radar-alpha-memory.mjs";

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

function formatPaperPortfolioSummary(summary) {
  return [
    `- total_positions: ${summary.total_positions || 0}`,
    `- open_positions: ${summary.open_positions || 0}`,
    `- PAPER_ENTRY_REVIEW: ${summary.action_counts?.PAPER_ENTRY_REVIEW || 0}`,
    `- PAPER_EXIT_REVIEW: ${summary.action_counts?.PAPER_EXIT_REVIEW || 0}`,
    `- THESIS_INTACT: ${summary.exit_risk_counts?.THESIS_INTACT || 0}`,
    `- EXIT_RISK_REVIEW: ${summary.exit_risk_counts?.EXIT_RISK_REVIEW || 0}`,
  ].join("\n");
}

function formatAdvancedSignalSummary(summary) {
  const counts = summary.label_counts || {};
  const queue = summary.review_queue || [];
  const gaps = summary.data_gaps || {};
  return [
    `- BANGER_CANDIDATE_REVIEW: ${counts.BANGER_CANDIDATE_REVIEW || 0}`,
    `- EARLY_BUT_THIN: ${counts.EARLY_BUT_THIN || 0}`,
    `- WAIT: ${counts.WAIT || 0}`,
    `- RISK_TRAP: ${counts.RISK_TRAP || 0}`,
    `- review_queue: ${queue.map((item) => item.ticker).join(", ") || "none"}`,
    `- relative_strength_unavailable: ${gaps.relative_strength_unavailable || 0}`,
    `- ownership_unavailable: ${gaps.ownership_unavailable || 0}`,
    `- liquidity_unavailable: ${gaps.liquidity_unavailable || 0}`,
  ].join("\n");
}

function formatThesisIntelligenceSummary(summary) {
  const verdicts = summary.verdict_counts || {};
  const severities = summary.negative_severity_counts || {};
  const revenue = summary.revenue_reality_counts || {};
  const gaps = summary.top_gaps || [];
  return [
    `- THESIS_CONFIRMED_REVIEW: ${verdicts.THESIS_CONFIRMED_REVIEW || 0}`,
    `- WATCH_THESIS: ${verdicts.WATCH_THESIS || 0}`,
    `- WEAK_THESIS: ${verdicts.WEAK_THESIS || 0}`,
    `- BROKEN_THESIS: ${verdicts.BROKEN_THESIS || 0}`,
    `- critical_negative_catalysts: ${severities.critical || 0}`,
    `- serious_negative_catalysts: ${severities.serious || 0}`,
    `- verified_ai_revenue: ${revenue.verified_ai_revenue || 0}`,
    `- reality_risk: ${revenue.reality_risk || 0}`,
    `- top_gaps: ${gaps.map((item) => `${item.gap} (${item.count})`).join(", ") || "none"}`,
  ].join("\n");
}

function formatAlphaMemorySummary(summary) {
  const hypotheses = summary.hypothesis_counts || {};
  const contradictions = summary.contradiction_severity_counts || {};
  const labels = Object.entries(summary.contradiction_label_counts || {})
    .sort(([, left], [, right]) => right - left)
    .slice(0, 5)
    .map(([label, count]) => `${label} (${count})`)
    .join(", ") || "none";
  const riskPatterns = Object.entries(summary.recurring_risk_counts || {})
    .sort(([, left], [, right]) => right - left)
    .slice(0, 5)
    .map(([label, count]) => `${label} (${count})`)
    .join(", ") || "none";
  const timing = summary.catalyst_timing_counts || {};
  const outcomes = summary.assessment_counts || {};
  return [
    `- TRACK_HYPOTHESIS: ${hypotheses.TRACK_HYPOTHESIS || 0}`,
    `- WATCH_ONLY: ${hypotheses.WATCH_ONLY || 0}`,
    `- CONTRADICTION_REVIEW: ${hypotheses.CONTRADICTION_REVIEW || 0}`,
    `- RISK_PATTERN: ${hypotheses.RISK_PATTERN || 0}`,
    `- critical_contradictions: ${contradictions.critical || 0}`,
    `- serious_contradictions: ${contradictions.serious || 0}`,
    `- top_contradiction_labels: ${labels}`,
    `- recurring_risk_patterns: ${riskPatterns}`,
    `- fresh_catalyst: ${timing.fresh_catalyst || 0}`,
    `- late_or_risk: ${timing.late_or_risk || 0}`,
    `- constructive_assessments: ${outcomes.constructive || 0}`,
    `- risk_confirmed_assessments: ${outcomes.risk_confirmed || 0}`,
    `- false_positive_assessments: ${outcomes.false_positive || 0}`,
  ].join("\n");
}

export function bucketWatchlistCandidates(candidates) {
  const buckets = emptyBuckets();

  for (const candidate of candidates || []) {
    buckets[classifyCalibrationBucket(candidate)].push(candidate);
  }

  return buckets;
}

export function renderWeeklyCalibrationReport({
  date,
  watchlist,
  reportPath,
  shadowBacktestLedger = { version: 1, snapshots: [] },
  paperPortfolio = { version: 1, positions: [] },
  alphaMemory = { version: 1, snapshots: [], assessments: [] },
}) {
  const buckets = bucketWatchlistCandidates(watchlist.candidates || []);
  const gradeSummary = summarizeIdeaGrades(watchlist.candidates || []);
  const firewallSummary = summarizeFirewallVerdicts(watchlist.candidates || []);
  const ceoControlSummary = summarizeCeoControlLanes(watchlist.candidates || []);
  const falsePositiveMemory = buildFalsePositiveMemory(watchlist.candidates || []);
  const shadowBacktestSummary = summarizeShadowBacktest(shadowBacktestLedger);
  const paperPortfolioSummary = summarizePaperPortfolio(paperPortfolio);
  const advancedSignalSummary = summarizeAdvancedSignals(watchlist.candidates || []);
  const thesisIntelligenceSummary = summarizeThesisIntelligence(watchlist.candidates || []);
  const alphaMemorySummary = summarizeAlphaMemory({ candidates: watchlist.candidates || [], memory: alphaMemory });

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

## Paper Portfolio Summary
${formatPaperPortfolioSummary(paperPortfolioSummary)}

## Advanced Signal Summary
${formatAdvancedSignalSummary(advancedSignalSummary)}

## Thesis Intelligence Summary
${formatThesisIntelligenceSummary(thesisIntelligenceSummary)}

## Alpha Memory Summary
${formatAlphaMemorySummary(alphaMemorySummary)}

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
  const paperPortfolioPath = path.join(root, "projects/ai-stock-radar/paper-portfolio.json");
  const paperPortfolio = fs.existsSync(paperPortfolioPath)
    ? JSON.parse(fs.readFileSync(paperPortfolioPath, "utf8"))
    : { version: 1, positions: [] };
  const alphaMemoryPath = path.join(root, "projects/ai-stock-radar/alpha-memory.json");
  const alphaMemory = fs.existsSync(alphaMemoryPath)
    ? JSON.parse(fs.readFileSync(alphaMemoryPath, "utf8"))
    : { version: 1, snapshots: [], assessments: [] };
  const reportDir = path.join(root, "reports/ai-stock-radar");
  fs.mkdirSync(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, `ai-stock-deepdive-${resolvedDate}.md`);
  const report = renderWeeklyCalibrationReport({ date: resolvedDate, watchlist, reportPath, shadowBacktestLedger, paperPortfolio, alphaMemory });
  fs.writeFileSync(reportPath, report);
  const memoryPath = path.join(root, "projects/ai-stock-radar/false-positive-memory.json");
  fs.writeFileSync(memoryPath, `${JSON.stringify(buildFalsePositiveMemory(watchlist.candidates || []), null, 2)}\n`);

  const buckets = bucketWatchlistCandidates(watchlist.candidates || []);

  return {
    reportPath,
    memoryPath,
    shadowBacktestLedgerPath,
    paperPortfolioPath,
    alphaMemoryPath,
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
