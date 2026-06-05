import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_ROOT = "/Users/zondrius/hermes-workspace";

const HARD_RISK_FLAGS = [
  "delisting_watch",
  "going_concern_watch",
  "reverse_split_watch",
  "shell_or_spac_watch",
  "security_structure_watch",
  "offering_watch",
  "dilution_trend_watch",
  "cash_runway_watch",
  "warrant_watch",
  "name_only_ai_watch",
];

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function countBy(values) {
  return values.reduce((counts, value) => {
    const key = value || "unknown";
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {});
}

function readJsonIfExists(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function normalizePortfolio(portfolio = {}) {
  return {
    version: 1,
    generated_at: portfolio.generated_at || null,
    mode: "research_only_paper",
    positions: Array.isArray(portfolio.positions) ? portfolio.positions : [],
  };
}

function riskFlags(candidate) {
  return unique([
    ...(candidate.evidence_firewall?.risk_flags || []),
    ...(candidate.top_risks || []).map((risk) => risk.replaceAll(" ", "_")),
  ]);
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

function pctChange(start, end) {
  if (!Number.isFinite(start) || !Number.isFinite(end) || start === 0) return null;
  return Number((((end - start) / start) * 100).toFixed(2));
}

export function classifyEntryReadiness(candidate) {
  const flags = riskFlags(candidate);
  const sourceSummary = candidate.source_confidence?.summary || {};
  const price = candidate.price_volume || {};

  if (flags.includes("name_only_ai_watch") || (candidate.themes || []).every((theme) => theme === "ai_keyword_match")) {
    return {
      label: "FAKE_AI_HYPE",
      action: "PAPER_ARCHIVE_REVIEW",
      reasons: ["name-only AI evidence"],
    };
  }

  const severeFlags = flags.filter((flag) => HARD_RISK_FLAGS.includes(flag));
  if (
    candidate.evidence_firewall?.verdict === "reject" ||
    candidate.evidence_firewall?.verdict === "caution" ||
    candidate.ceo_control?.lane === "reject" ||
    severeFlags.length > 0
  ) {
    return {
      label: "TOO_RISKY",
      action: "PAPER_ARCHIVE_REVIEW",
      reasons: unique(["risk gate active", ...severeFlags]),
    };
  }

  if (price.status === "available" && price.confirmation === "stretched") {
    return {
      label: "LATE_MOVE",
      action: "PAPER_HOLD_REVIEW",
      reasons: ["price/volume context is stretched"],
    };
  }

  const ready =
    ["S", "A"].includes(candidate.idea_grade) &&
    ["focus", "monitor"].includes(candidate.ceo_control?.lane) &&
    candidate.evidence_firewall?.verdict === "pass" &&
    price.status === "available" &&
    price.confirmation === "positive" &&
    (sourceSummary.facts || 0) >= 3 &&
    (sourceSummary.missing || 0) === 0;

  if (ready) {
    return {
      label: "ENTRY_READY",
      action: "PAPER_ENTRY_REVIEW",
      reasons: ["evidence stack ready", "positive price/volume context"],
    };
  }

  return {
    label: "WAIT_FOR_CONFIRMATION",
    action: "PAPER_HOLD_REVIEW",
    reasons: ["not enough confirmation for paper entry review"],
  };
}

export function applyEntryReadiness(candidate) {
  return {
    ...candidate,
    entry_readiness: classifyEntryReadiness(candidate),
  };
}

export function classifyExitRisk(position, candidate) {
  if (!candidate) {
    return {
      label: "THESIS_WEAKENING",
      action: "PAPER_HOLD_REVIEW",
      reasons: ["candidate missing from current watchlist"],
    };
  }

  const flags = riskFlags(candidate);
  const severeFlags = flags.filter((flag) => HARD_RISK_FLAGS.includes(flag));
  const currentPrice = priceSnapshot(candidate);
  const move = pctChange(position.entry_price?.close, currentPrice.close);

  if (candidate.evidence_firewall?.verdict === "reject" || candidate.ceo_control?.lane === "reject" || severeFlags.length > 0) {
    return {
      label: "EXIT_RISK_REVIEW",
      action: "PAPER_EXIT_REVIEW",
      reasons: unique(["risk gate active", ...severeFlags]),
    };
  }

  if (candidate.category === "Avoid" || candidate.idea_grade === "X") {
    return {
      label: "ARCHIVE_REVIEW",
      action: "PAPER_ARCHIVE_REVIEW",
      reasons: ["candidate downgraded to avoid/reject"],
    };
  }

  if (candidate.evidence_firewall?.verdict === "caution" || (Number.isFinite(move) && move <= -20)) {
    return {
      label: "THESIS_WEAKENING",
      action: "PAPER_HOLD_REVIEW",
      reasons: ["later context weakened thesis"],
    };
  }

  return {
    label: "THESIS_INTACT",
    action: "PAPER_HOLD_REVIEW",
    reasons: ["no thesis invalidation found"],
  };
}

function createPaperPosition({ candidate, date }) {
  const price = priceSnapshot(candidate);
  return {
    id: `${candidate.ticker}:${date}`,
    ticker: candidate.ticker,
    company: candidate.company || "unknown",
    status: "paper_open",
    opened_at: date,
    last_reviewed_at: date,
    paper_action: "PAPER_ENTRY_REVIEW",
    entry_readiness: candidate.entry_readiness || classifyEntryReadiness(candidate),
    entry_price: price,
    latest_price: price,
    initial_grade: candidate.idea_grade || "?",
    initial_score: candidate.score || 0,
    ceo_lane: candidate.ceo_control?.lane || "unknown",
    firewall_verdict: candidate.evidence_firewall?.verdict || "unknown",
    exit_risk: {
      label: "THESIS_INTACT",
      action: "PAPER_HOLD_REVIEW",
      reasons: ["new paper simulation"],
    },
  };
}

export function updatePaperPortfolio({ portfolio, watchlist, date }) {
  const normalized = normalizePortfolio(portfolio);
  const candidates = (watchlist.candidates || []).map((candidate) =>
    candidate.entry_readiness ? candidate : applyEntryReadiness(candidate)
  );
  const candidateByTicker = new Map(candidates.map((candidate) => [candidate.ticker, candidate]));
  const openTickers = new Set(normalized.positions.filter((position) => position.status === "paper_open").map((position) => position.ticker));
  const reviewedPositions = normalized.positions.map((position) => {
    if (position.status !== "paper_open") return position;
    const currentCandidate = candidateByTicker.get(position.ticker);
    const exitRisk = classifyExitRisk(position, currentCandidate);
    return {
      ...position,
      last_reviewed_at: date,
      latest_price: currentCandidate ? priceSnapshot(currentCandidate) : position.latest_price,
      latest_grade: currentCandidate?.idea_grade || position.latest_grade || position.initial_grade,
      latest_score: currentCandidate?.score ?? position.latest_score ?? position.initial_score,
      paper_action: exitRisk.label === "THESIS_INTACT" && position.opened_at === date ? position.paper_action : exitRisk.action,
      exit_risk: exitRisk,
      simulated_return_pct: currentCandidate ? pctChange(position.entry_price?.close, priceSnapshot(currentCandidate).close) : position.simulated_return_pct ?? null,
    };
  });

  const additions = [];
  for (const candidate of candidates) {
    if (openTickers.has(candidate.ticker)) continue;
    if (candidate.entry_readiness?.label !== "ENTRY_READY") continue;
    if (candidate.price_volume?.status !== "available") continue;
    additions.push(createPaperPosition({ candidate, date }));
    openTickers.add(candidate.ticker);
  }

  return {
    ...normalized,
    generated_at: new Date().toISOString(),
    updated_at: date,
    positions: [...reviewedPositions, ...additions],
  };
}

export function summarizePaperPortfolio(portfolio) {
  const positions = normalizePortfolio(portfolio).positions;
  return {
    total_positions: positions.length,
    open_positions: positions.filter((position) => position.status === "paper_open").length,
    action_counts: countBy(positions.map((position) => position.paper_action)),
    exit_risk_counts: countBy(positions.map((position) => position.exit_risk?.label)),
  };
}

function formatCountMap(counts, emptyText) {
  const rows = Object.entries(counts || {}).sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]));
  if (!rows.length) return `- ${emptyText}`;
  return rows.map(([key, value]) => `- ${key}: ${value}`).join("\n");
}

function formatSimulations(positions) {
  const rows = [...(positions || [])].filter((position) => position.status === "paper_open").slice(0, 12);
  if (!rows.length) return "- Keine offenen Paper-Simulationen.";

  return rows.map((position) => {
    const move = Number.isFinite(position.simulated_return_pct) ? `, simulated return ${position.simulated_return_pct}%` : "";
    return `- ${position.ticker}: ${position.paper_action}; exit risk ${position.exit_risk?.label || "unknown"}${move}; initial grade ${position.initial_grade}.`;
  }).join("\n");
}

export function renderPaperPortfolioReport({ date, portfolio, reportPath }) {
  const normalized = normalizePortfolio(portfolio);
  const summary = summarizePaperPortfolio(normalized);

  return `# AI Stock Radar Paper Portfolio - ${date}

## Kurzfazit
- Paper Portfolio is a research-only simulation layer.
- It records paper reviews so Hermes can learn which criteria would have worked.
- Total simulations: ${summary.total_positions}; open simulations: ${summary.open_positions}.

## Entry Readiness
${formatCountMap(summary.action_counts, "Keine Paper-Aktionen.")}

## Exit Risk
${formatCountMap(summary.exit_risk_counts, "Keine Exit-Risk-Signale.")}

## Paper Simulations
${formatSimulations(normalized.positions)}

## Datenqualitaet Und Luecken
- Paper labels are not real recommendations.
- Missing price context blocks new paper entry review.
- Evidence Firewall, CEO Control, Source Confidence, and Shadow Backtest remain higher-priority safety layers.

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob Paper-Regeln nach mehreren Auswertungen angepasst werden sollen.
- BEOBACHTEN: ENTRY_READY, PAPER_EXIT_REVIEW, THESIS_WEAKENING, EXIT_RISK_REVIEW.
- SPAETER: Paper-Simulation mit 30/90-Tage Outcomes vergleichen.
- BLOCKIERT: Echte Depot- oder Broker-Aktionen sind nicht Teil dieses Systems.
- NICHT_TUN: Keine echten Trades; keine Preisziele; keine Optionen; keine Hebel.
- Naechste kleinste Aktion: naechsten planmaessigen Lauf abwarten.
- Beleg / Datei: ${reportPath}
`;
}

export function writePaperPortfolioRun({
  root = DEFAULT_ROOT,
  date = process.env.AI_STOCK_RADAR_DATE || new Date().toISOString().slice(0, 10),
  watchlist = null,
} = {}) {
  const watchlistPath = path.join(root, "projects/ai-stock-radar/watchlist.json");
  const portfolioPath = path.join(root, "projects/ai-stock-radar/paper-portfolio.json");
  const reportDir = path.join(root, "reports/ai-stock-radar");
  const reportPath = path.join(reportDir, `ai-stock-paper-portfolio-${date}.md`);
  const currentWatchlist = watchlist || readJsonIfExists(watchlistPath, { candidates: [] });
  const currentPortfolio = readJsonIfExists(portfolioPath, { version: 1, positions: [] });
  const portfolio = updatePaperPortfolio({
    portfolio: currentPortfolio,
    watchlist: currentWatchlist,
    date,
  });

  fs.mkdirSync(path.dirname(portfolioPath), { recursive: true });
  fs.mkdirSync(reportDir, { recursive: true });
  fs.writeFileSync(portfolioPath, `${JSON.stringify(portfolio, null, 2)}\n`);
  fs.writeFileSync(reportPath, renderPaperPortfolioReport({ date, portfolio, reportPath }));

  return {
    portfolioPath,
    reportPath,
    summary: summarizePaperPortfolio(portfolio),
  };
}

function isCliRun() {
  return process.argv[1] === fileURLToPath(import.meta.url);
}

if (isCliRun()) {
  const result = writePaperPortfolioRun({ root: process.cwd() });
  console.log(`AI_STOCK_PAPER_PORTFOLIO=${result.portfolioPath}`);
  console.log(`AI_STOCK_PAPER_REPORT=${result.reportPath}`);
  console.log(`AI_STOCK_PAPER_OPEN=${result.summary.open_positions}`);
}
