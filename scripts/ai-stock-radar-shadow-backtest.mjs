import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_ROOT = "/Users/zondrius/hermes-workspace";
const DEFAULT_HORIZON_DAYS = 30;

function normalizeLedger(ledger = {}) {
  return {
    version: 1,
    generated_at: ledger.generated_at || null,
    horizon_days: ledger.horizon_days || DEFAULT_HORIZON_DAYS,
    snapshots: Array.isArray(ledger.snapshots) ? ledger.snapshots : [],
  };
}

function parseDate(date) {
  return new Date(`${date}T00:00:00.000Z`);
}

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  const parsed = parseDate(date);
  parsed.setUTCDate(parsed.getUTCDate() + days);
  return formatDate(parsed);
}

function pctChange(start, end) {
  if (!Number.isFinite(start) || !Number.isFinite(end) || start === 0) return null;
  return Number((((end - start) / start) * 100).toFixed(2));
}

function countBy(values) {
  return values.reduce((counts, value) => {
    const key = value || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function nestedCount(rows, keySelector, valueSelector) {
  const result = {};
  for (const row of rows) {
    const key = keySelector(row) || "unknown";
    const value = valueSelector(row) || "unknown";
    result[key] = result[key] || {};
    result[key][value] = (result[key][value] || 0) + 1;
  }
  return result;
}

function readJsonIfExists(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function priceSnapshot(candidate) {
  const price = candidate.price_volume || {};
  if (price.status !== "available" || !Number.isFinite(price.latest_close)) {
    return {
      status: "unavailable",
      close: null,
      date: price.latest_date || null,
      confirmation: price.confirmation || "unavailable",
    };
  }

  return {
    status: "available",
    close: price.latest_close,
    date: price.latest_date || null,
    confirmation: price.confirmation || "unknown",
  };
}

function snapshotFromCandidate({ candidate, date, horizonDays }) {
  const riskFlags = candidate.evidence_firewall?.risk_flags || [];
  return {
    id: `${date}:${candidate.ticker}`,
    observed_at: date,
    due_at: addDays(date, horizonDays),
    ticker: candidate.ticker,
    company: candidate.company || "unknown",
    idea_grade: candidate.idea_grade || "?",
    category: candidate.category || "unknown",
    score: candidate.score,
    data_quality: candidate.data_quality || "unknown",
    ceo_lane: candidate.ceo_control?.lane || "unknown",
    ceo_action: candidate.ceo_control?.action || "unknown",
    firewall_verdict: candidate.evidence_firewall?.verdict || "unknown",
    risk_flags: [...riskFlags],
    source_confidence: {
      facts: candidate.source_confidence?.summary?.facts || 0,
      interpretations: candidate.source_confidence?.summary?.interpretations || 0,
      missing: candidate.source_confidence?.summary?.missing || 0,
    },
    entry_price: priceSnapshot(candidate),
    status: "pending",
    outcome_label: null,
  };
}

export function captureShadowSnapshots({
  ledger,
  watchlist,
  date,
  horizonDays = DEFAULT_HORIZON_DAYS,
}) {
  const normalized = normalizeLedger(ledger);
  const existingIds = new Set(normalized.snapshots.map((snapshot) => snapshot.id));
  const additions = [];

  for (const candidate of watchlist.candidates || []) {
    const id = `${date}:${candidate.ticker}`;
    if (existingIds.has(id)) continue;
    additions.push(snapshotFromCandidate({ candidate, date, horizonDays }));
  }

  return {
    ...normalized,
    generated_at: new Date().toISOString(),
    horizon_days: horizonDays,
    snapshots: [...normalized.snapshots, ...additions],
  };
}

export function assessShadowOutcomes({ ledger, watchlist, date }) {
  const normalized = normalizeLedger(ledger);
  const currentByTicker = new Map((watchlist.candidates || []).map((candidate) => [candidate.ticker, candidate]));

  return {
    ...normalized,
    generated_at: new Date().toISOString(),
    snapshots: normalized.snapshots.map((snapshot) => {
      if (snapshot.due_at > date) return snapshot;

      const current = currentByTicker.get(snapshot.ticker);
      const currentPrice = current ? priceSnapshot(current) : { status: "unavailable", close: null, date: null };
      const observedReturn = pctChange(snapshot.entry_price?.close, currentPrice.close);

      if (observedReturn === null) {
        return {
          ...snapshot,
          status: "unavailable",
          outcome_label: "unavailable",
          assessed_at: date,
          current_price: currentPrice,
          outcome_reason: "missing original or later free price context",
        };
      }

      const currentVerdict = current?.evidence_firewall?.verdict || "unknown";
      const currentLane = current?.ceo_control?.lane || "unknown";
      const riskConfirmed = ["reject", "caution"].includes(currentVerdict) || currentLane === "reject" || observedReturn <= -20;
      const constructive = observedReturn >= 10 && !riskConfirmed;

      return {
        ...snapshot,
        status: "assessed",
        outcome_label: riskConfirmed ? "risk_confirmed" : constructive ? "constructive" : "inconclusive",
        assessed_at: date,
        observed_return_pct: observedReturn,
        current_price: currentPrice,
        current_firewall_verdict: currentVerdict,
        current_ceo_lane: currentLane,
        outcome_reason: riskConfirmed
          ? "later context confirmed risk or weak price context"
          : constructive
            ? "later context remained constructive"
            : "later context was mixed or too small to calibrate strongly",
      };
    }),
  };
}

export function summarizeShadowBacktest(ledger) {
  const snapshots = normalizeLedger(ledger).snapshots;
  const assessedRows = snapshots.filter((snapshot) => snapshot.status === "assessed");
  const unavailableRows = snapshots.filter((snapshot) => snapshot.status === "unavailable");
  const outcomeRows = [...assessedRows, ...unavailableRows];

  return {
    total_snapshots: snapshots.length,
    assessed: assessedRows.length,
    pending: snapshots.filter((snapshot) => snapshot.status === "pending").length,
    unavailable: unavailableRows.length,
    outcome_counts: countBy(outcomeRows.map((snapshot) => snapshot.outcome_label)),
    grade_outcomes: nestedCount(outcomeRows, (snapshot) => snapshot.idea_grade, (snapshot) => snapshot.outcome_label),
    lane_outcomes: nestedCount(outcomeRows, (snapshot) => snapshot.ceo_lane, (snapshot) => snapshot.outcome_label),
    risk_pattern_counts: countBy(outcomeRows.flatMap((snapshot) => snapshot.risk_flags || [])),
  };
}

function formatCountMap(counts, emptyText) {
  const entries = Object.entries(counts || {}).sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
  if (!entries.length) return `- ${emptyText}`;
  return entries.map(([key, value]) => `- ${key}: ${value}`).join("\n");
}

function formatNestedCounts(counts, emptyText) {
  const rows = Object.entries(counts || {});
  if (!rows.length) return `- ${emptyText}`;
  return rows
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, outcomes]) => `- ${key}: ${Object.entries(outcomes).map(([outcome, count]) => `${outcome}: ${count}`).join(", ")}`)
    .join("\n");
}

function formatRecentOutcomes(snapshots) {
  const rows = [...(snapshots || [])]
    .filter((snapshot) => ["assessed", "unavailable"].includes(snapshot.status))
    .sort((left, right) => String(right.assessed_at || "").localeCompare(String(left.assessed_at || "")) || left.ticker.localeCompare(right.ticker))
    .slice(0, 10);

  if (!rows.length) return "- Noch keine faelligen 30-Tage-Snapshots.";
  return rows.map((snapshot) => {
    const move = Number.isFinite(snapshot.observed_return_pct) ? `, observed return ${snapshot.observed_return_pct}%` : "";
    return `- ${snapshot.ticker}: ${snapshot.outcome_label}${move}; original grade ${snapshot.idea_grade}, lane ${snapshot.ceo_lane}.`;
  }).join("\n");
}

function formatPendingSnapshots(snapshots) {
  const rows = [...(snapshots || [])]
    .filter((snapshot) => snapshot.status === "pending")
    .sort((left, right) => left.due_at.localeCompare(right.due_at) || left.ticker.localeCompare(right.ticker))
    .slice(0, 10);

  if (!rows.length) return "- Keine offenen Snapshots.";
  return rows.map((snapshot) => `- ${snapshot.ticker}: due ${snapshot.due_at}; grade ${snapshot.idea_grade}, lane ${snapshot.ceo_lane}.`).join("\n");
}

export function renderShadowBacktestReport({ date, ledger, reportPath }) {
  const summary = summarizeShadowBacktest(ledger);
  const snapshots = normalizeLedger(ledger).snapshots;

  return `# AI Stock Radar Shadow Backtest - ${date}

## Kurzfazit
- 30-day shadow backtest calibrates research-signal quality from free public context.
- It is a learning and risk-control loop, not investment advice.
- Snapshots total: ${summary.total_snapshots}; assessed: ${summary.assessed}; pending: ${summary.pending}; unavailable: ${summary.unavailable}.

## 30-Day Calibration
${formatCountMap(summary.outcome_counts, "Noch keine faelligen Outcomes.")}

## Grade Calibration
${formatNestedCounts(summary.grade_outcomes, "Noch keine Grade-Outcomes.")}

## CEO Lane Calibration
${formatNestedCounts(summary.lane_outcomes, "Noch keine CEO-Lane-Outcomes.")}

## Risk Pattern Calibration
${formatCountMap(summary.risk_pattern_counts, "Noch keine Risk-Pattern-Outcomes.")}

## Recent Outcomes
${formatRecentOutcomes(snapshots)}

## Pending Snapshots
${formatPendingSnapshots(snapshots)}

## Datenqualitaet Und Luecken
- Missing Stooq entry or later close keeps an outcome unavailable.
- Calendar-day horizon is used for calibration simplicity; it is not a trading clock.
- Shadow outcomes cannot override Evidence Firewall, CEO Control, or source-confidence gaps.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob nach 30+ Tagen eine manuelle Regelkalibrierung gewuenscht ist.
- BEOBACHTEN: constructive, risk_confirmed, inconclusive, unavailable Muster nach Grade und CEO Lane.
- SPAETER: Mehrwoechige Kalibrierung nach mehreren faelligen Snapshot-Kohorten.
- BLOCKIERT: Vollstaendige Outcome-Bewertung wenn kostenlose Preisdaten fehlen.
- NICHT_TUN: Keine automatischen Trades; keine Promotion aus Shadow-Outcome allein.
- Naechste kleinste Aktion: naechsten planmaessigen Lauf abwarten.
- Beleg / Datei: ${reportPath}
`;
}

export function writeShadowBacktestRun({
  root = DEFAULT_ROOT,
  date = process.env.AI_STOCK_RADAR_DATE || new Date().toISOString().slice(0, 10),
  horizonDays = DEFAULT_HORIZON_DAYS,
  watchlist = null,
} = {}) {
  const watchlistPath = path.join(root, "projects/ai-stock-radar/watchlist.json");
  const ledgerPath = path.join(root, "projects/ai-stock-radar/shadow-backtest-ledger.json");
  const reportDir = path.join(root, "reports/ai-stock-radar");
  const reportPath = path.join(reportDir, `ai-stock-shadow-backtest-${date}.md`);
  const currentWatchlist = watchlist || readJsonIfExists(watchlistPath, { candidates: [] });
  const existingLedger = readJsonIfExists(ledgerPath, { version: 1, snapshots: [] });
  const captured = captureShadowSnapshots({
    ledger: existingLedger,
    watchlist: currentWatchlist,
    date,
    horizonDays,
  });
  const assessed = assessShadowOutcomes({
    ledger: captured,
    watchlist: currentWatchlist,
    date,
  });

  fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(ledgerPath, `${JSON.stringify(assessed, null, 2)}\n`);
  fs.writeFileSync(reportPath, renderShadowBacktestReport({ date, ledger: assessed, reportPath }));

  return {
    ledgerPath,
    reportPath,
    snapshotCount: assessed.snapshots.length,
    summary: summarizeShadowBacktest(assessed),
  };
}

function isCliRun() {
  return process.argv[1] === fileURLToPath(import.meta.url);
}

if (isCliRun()) {
  const result = writeShadowBacktestRun({ root: process.cwd() });
  console.log(`AI_STOCK_SHADOW_BACKTEST_LEDGER=${result.ledgerPath}`);
  console.log(`AI_STOCK_SHADOW_BACKTEST_REPORT=${result.reportPath}`);
  console.log(`AI_STOCK_SHADOW_BACKTEST_SNAPSHOTS=${result.snapshotCount}`);
}
