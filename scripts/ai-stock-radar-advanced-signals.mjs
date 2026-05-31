import fs from "node:fs";
import path from "node:path";

const DEFAULT_ROOT = "/Users/zondrius/hermes-workspace";

const BANGER_LABELS = [
  "BANGER_CANDIDATE_REVIEW",
  "EARLY_BUT_THIN",
  "WAIT",
  "RISK_TRAP",
];

const HARD_RISK_FLAGS = [
  "delisting_watch",
  "going_concern_watch",
  "reverse_split_watch",
  "shell_or_spac_watch",
  "security_structure_watch",
  "name_only_ai_watch",
];

const MANUAL_RISK_FLAGS = [
  "offering_watch",
  "warrant_watch",
  "cash_runway_watch",
  "dilution_trend_watch",
  "revenue_decline_watch",
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function finiteNumber(value) {
  return Number.isFinite(Number(value)) ? Number(value) : null;
}

function readJsonIfExists(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function normalizeRiskText(text) {
  return String(text || "").toLowerCase().replaceAll(" ", "_").replaceAll("-", "_");
}

function candidateRiskFlags(candidate) {
  return unique([
    ...(candidate.evidence_firewall?.risk_flags || []),
    ...(candidate.top_risks || []).map(normalizeRiskText),
  ]);
}

function positiveLabels(candidate) {
  return unique([
    ...(candidate.filing_events?.positive_labels || []),
    ...(candidate.evidence_firewall?.positive_labels || []),
    ...(candidate.catalyst_labels || []),
  ]);
}

function tickerContext(source, ticker) {
  const tickers = source?.tickers || {};
  return tickers[ticker] || tickers[String(ticker || "").toUpperCase()] || null;
}

function addDays(dateText, days) {
  const date = new Date(`${dateText || new Date().toISOString().slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function loadAdvancedSignalContext({ root = DEFAULT_ROOT } = {}) {
  const baseDir = path.join(root, "projects/ai-stock-radar");
  return {
    basket: readJsonIfExists(path.join(baseDir, "ai-basket-context.json"), {
      version: 1,
      status: "unavailable",
      tickers: {},
    }),
    ownership: readJsonIfExists(path.join(baseDir, "ownership-context.json"), {
      version: 1,
      status: "unavailable",
      tickers: {},
    }),
  };
}

function decodeSecCatalyst(candidate) {
  const labels = positiveLabels(candidate);
  const risks = candidateRiskFlags(candidate);
  const notes = candidate.quality_notes || [];

  if (risks.some((flag) => ["offering_watch", "warrant_watch", "dilution_trend_watch"].includes(flag))) {
    return {
      label: "offering_or_dilution",
      score: -18,
      reasons: ["filing risk points to offering, warrants, or dilution review"],
    };
  }
  if (risks.some((flag) => HARD_RISK_FLAGS.includes(flag))) {
    return {
      label: "listing_or_structure_risk",
      score: -22,
      reasons: ["hard filing or security-structure risk before promotion"],
    };
  }
  if (labels.includes("material_agreement")) {
    return {
      label: "material_agreement",
      score: 18,
      reasons: ["SEC catalyst includes material agreement evidence"],
    };
  }
  if (labels.some((label) => ["contract_award", "major_customer", "hard_catalyst"].includes(label)) || candidate.filing_events?.hard_catalyst) {
    return {
      label: "hard_catalyst",
      score: 15,
      reasons: ["filing context contains hard catalyst or major customer evidence"],
    };
  }
  if (labels.some((label) => /guidance|customer|partnership|expansion/.test(label)) || notes.some((note) => /8-k|customer|guidance/i.test(note))) {
    return {
      label: "soft_catalyst",
      score: 8,
      reasons: ["filing or notes suggest a catalyst that still needs review"],
    };
  }
  return {
    label: "none",
    score: 0,
    reasons: ["no specific SEC catalyst decoded"],
  };
}

function scoreCustomerProof(candidate) {
  const labels = positiveLabels(candidate);
  const risks = candidateRiskFlags(candidate);

  if (risks.includes("name_only_ai_watch")) {
    return {
      label: "none",
      score: 0,
      reasons: ["name-only AI evidence cannot count as customer proof"],
    };
  }
  if (labels.some((label) => ["material_agreement", "contract_award", "major_customer", "customer_expansion_watch"].includes(label))) {
    return {
      label: "hard_customer_or_contract",
      score: 14,
      reasons: ["customer, contract, or material agreement label is present"],
    };
  }
  if (labels.some((label) => /customer|partnership|deployment|commercial/.test(label))) {
    return {
      label: "soft_customer_context",
      score: 6,
      reasons: ["customer context exists but is not hard proof"],
    };
  }
  return {
    label: "none",
    score: 0,
    reasons: ["no customer or contract proof found"],
  };
}

function scoreRelativeStrength(candidate, context) {
  const candidateReturn = finiteNumber(candidate.price_volume?.return_20d_pct);
  const basketTicker = tickerContext(context?.basket, candidate.ticker);
  const benchmarkReturn = finiteNumber(basketTicker?.return_20d_pct ?? context?.basket?.default_return_20d_pct);

  if (candidateReturn === null || benchmarkReturn === null) {
    return {
      label: "unavailable",
      score: 0,
      spread_20d_pct: null,
      benchmark_return_20d_pct: benchmarkReturn,
      reasons: ["candidate or AI basket 20d return unavailable"],
    };
  }

  const spread = Number((candidateReturn - benchmarkReturn).toFixed(2));
  if (spread >= 8) {
    return {
      label: "outperform",
      score: 12,
      spread_20d_pct: spread,
      benchmark_return_20d_pct: benchmarkReturn,
      reasons: [`20d return spread is ${spread}% versus AI basket context`],
    };
  }
  if (spread >= -5) {
    return {
      label: "inline",
      score: 4,
      spread_20d_pct: spread,
      benchmark_return_20d_pct: benchmarkReturn,
      reasons: [`20d return spread is ${spread}% versus AI basket context`],
    };
  }
  return {
    label: "underperform",
    score: -8,
    spread_20d_pct: spread,
    benchmark_return_20d_pct: benchmarkReturn,
    reasons: [`20d return spread is ${spread}% versus AI basket context`],
  };
}

function scoreLiquidity(candidate) {
  const priceVolume = candidate.price_volume || {};
  const latestVolume = finiteNumber(priceVolume.latest_volume);
  const latestClose = finiteNumber(priceVolume.latest_close);
  const volumeRatio = finiteNumber(priceVolume.volume_ratio_20d);
  const return20d = finiteNumber(priceVolume.return_20d_pct);

  if (priceVolume.status !== "available") {
    return {
      label: "unavailable",
      score: 0,
      reasons: ["free price/volume context unavailable"],
    };
  }
  if ((latestClose !== null && latestClose < 1) || (latestVolume !== null && latestVolume < 100000)) {
    return {
      label: "thin",
      score: -14,
      reasons: ["price or volume context looks too thin for confident research ranking"],
    };
  }
  if (return20d !== null && return20d > 55 && volumeRatio !== null && volumeRatio > 4) {
    return {
      label: "stretched",
      score: -6,
      reasons: ["price/volume context looks extended and needs late-move review"],
    };
  }
  if ((latestVolume !== null && latestVolume >= 200000) || (volumeRatio !== null && volumeRatio >= 1.2)) {
    return {
      label: "usable",
      score: 10,
      reasons: ["free price/volume context is usable for confirmation"],
    };
  }
  return {
    label: "unknown",
    score: 0,
    reasons: ["price/volume context is available but not decisive"],
  };
}

function scoreOwnership(candidate, context) {
  const ownership = tickerContext(context?.ownership, candidate.ticker);
  if (!ownership) {
    return {
      label: "unavailable",
      score: 0,
      reasons: ["local ownership context unavailable"],
    };
  }

  const form4 = String(ownership.form4_signal || "").toLowerCase();
  const institutional = String(ownership.institutional_signal || "").toLowerCase();
  if (/risk|selling|distribution|dilution/.test(`${form4} ${institutional}`)) {
    return {
      label: "risk",
      score: -7,
      reasons: ["ownership context adds risk"],
    };
  }
  if (/supportive|accumulation|accumulating|positive/.test(`${form4} ${institutional}`)) {
    return {
      label: "supportive",
      score: 5,
      reasons: ["local ownership context is supportive"],
    };
  }
  return {
    label: "neutral",
    score: 0,
    reasons: ["ownership context is neutral"],
  };
}

function monitorThesisInvalidation(candidate) {
  const risks = candidateRiskFlags(candidate);
  const hardRiskFlags = risks.filter((flag) => HARD_RISK_FLAGS.includes(flag));
  const manualFlags = risks.filter((flag) => MANUAL_RISK_FLAGS.includes(flag));
  const reasons = [];

  if (candidate.evidence_firewall?.verdict === "reject") reasons.push("hard risk gate: Evidence Firewall reject");
  if (candidate.ceo_control?.lane === "reject") reasons.push("hard risk gate: CEO reject lane");
  if (candidate.category === "Avoid" || candidate.idea_grade === "X") reasons.push("hard risk gate: Avoid or X classification");
  if (["TOO_RISKY", "FAKE_AI_HYPE"].includes(candidate.entry_readiness?.label)) reasons.push(`hard risk gate: ${candidate.entry_readiness.label}`);
  for (const flag of hardRiskFlags) {
    reasons.push(flag === "name_only_ai_watch" ? "hard risk gate: name-only AI evidence" : `hard risk gate: ${flag}`);
  }

  if (reasons.length) {
    return {
      label: "invalidated",
      score_penalty: 55,
      hard_gate: true,
      reasons: unique(reasons),
    };
  }

  if (candidate.evidence_firewall?.verdict === "caution" || candidate.ceo_control?.lane === "manual_review" || manualFlags.length) {
    return {
      label: "weakening",
      score_penalty: 18,
      hard_gate: false,
      reasons: unique(["manual risk review required", ...manualFlags]),
    };
  }

  if (candidate.entry_readiness?.label === "LATE_MOVE") {
    return {
      label: "needs_review",
      score_penalty: 10,
      hard_gate: false,
      reasons: ["late move requires confirmation before higher priority"],
    };
  }

  return {
    label: "none",
    score_penalty: 0,
    hard_gate: false,
    reasons: ["no thesis invalidation signal detected"],
  };
}

function buildCatalystCalendar(candidate) {
  const lastChecked = candidate.last_checked || new Date().toISOString().slice(0, 10);
  const nextReview = addDays(lastChecked, candidate.filing_events?.hard_catalyst ? 5 : 10);

  if (candidate.filing_events?.hard_catalyst || positiveLabels(candidate).length > 0) {
    return {
      label: "review_window",
      score: 3,
      next_review_at: nextReview,
      reasons: ["known filing or catalyst context should be reviewed again"],
    };
  }
  return {
    label: "no_known_event",
    score: 0,
    next_review_at: nextReview,
    reasons: ["no specific upcoming catalyst event is known from local evidence"],
  };
}

function baseCandidateScore(candidate) {
  const gradeScore = { S: 16, A: 12, B: 6, C: 0, X: -20 }[candidate.idea_grade] ?? 0;
  const categoryScore = {
    "Deep Dive": 8,
    "Breakout Watch": 6,
    "Early Watch": 2,
    Overheated: -8,
    Avoid: -20,
  }[candidate.category] ?? 0;
  const readinessScore = {
    ENTRY_READY: 12,
    WAIT_FOR_CONFIRMATION: 2,
    LATE_MOVE: -8,
    TOO_RISKY: -20,
    FAKE_AI_HYPE: -25,
  }[candidate.entry_readiness?.label] ?? 0;
  const ceoScore = {
    focus: 10,
    monitor: 4,
    manual_review: -5,
    reject: -25,
  }[candidate.ceo_control?.lane] ?? 0;
  const sourceSummary = candidate.source_confidence?.summary || {};
  const sourceScore =
    (sourceSummary.facts || 0) >= 3 && (sourceSummary.missing || 0) === 0
      ? 8
      : (sourceSummary.facts || 0) >= 2
        ? 4
        : 0;

  return 20 + gradeScore + categoryScore + readinessScore + ceoScore + sourceScore;
}

function labelFromScore({ score, components }) {
  if (components.thesis_invalidation.hard_gate) return "RISK_TRAP";
  if (components.thesis_invalidation.label === "weakening" && score < 60) return "RISK_TRAP";
  if (
    score >= 75 &&
    components.sec_catalyst.score > 0 &&
    components.customer_proof.score > 0 &&
    components.relative_strength.label === "outperform" &&
    components.liquidity.label === "usable"
  ) {
    return "BANGER_CANDIDATE_REVIEW";
  }
  if (score >= 50) return "EARLY_BUT_THIN";
  return "WAIT";
}

function actionFromLabel(label, thesisInvalidation) {
  if (label === "BANGER_CANDIDATE_REVIEW") return "ADVANCED_REVIEW";
  if (label === "RISK_TRAP") {
    return thesisInvalidation.hard_gate ? "ADVANCED_ARCHIVE_REVIEW" : "ADVANCED_RISK_REVIEW";
  }
  return "ADVANCED_WAIT";
}

export function buildAdvancedSignals(candidate, context = {}) {
  const components = {
    sec_catalyst: decodeSecCatalyst(candidate),
    customer_proof: scoreCustomerProof(candidate),
    relative_strength: scoreRelativeStrength(candidate, context),
    liquidity: scoreLiquidity(candidate),
    ownership: scoreOwnership(candidate, context),
    thesis_invalidation: monitorThesisInvalidation(candidate),
    catalyst_calendar: buildCatalystCalendar(candidate),
  };

  const rawScore =
    baseCandidateScore(candidate) +
    components.sec_catalyst.score +
    components.customer_proof.score +
    components.relative_strength.score +
    components.liquidity.score +
    components.ownership.score +
    components.catalyst_calendar.score -
    components.thesis_invalidation.score_penalty;
  const contextCap =
    (components.relative_strength.label === "unavailable" ? 88 : 100) -
    (components.ownership.label === "unavailable" ? 5 : 0);
  const score = components.thesis_invalidation.hard_gate
    ? clamp(Math.min(rawScore, 20), 0, 25)
    : clamp(rawScore, 0, contextCap);
  const bangerLabel = labelFromScore({ score, components });

  return {
    version: 1,
    banger_score: score,
    banger_label: bangerLabel,
    review_action: actionFromLabel(bangerLabel, components.thesis_invalidation),
    components,
    reasons: unique([
      ...components.sec_catalyst.reasons,
      ...components.customer_proof.reasons,
      ...components.relative_strength.reasons,
      ...components.liquidity.reasons,
      ...components.ownership.reasons,
      ...components.thesis_invalidation.reasons,
    ]).slice(0, 10),
  };
}

export function applyAdvancedSignals(candidate, context = {}) {
  return {
    ...candidate,
    advanced_signals: buildAdvancedSignals(candidate, context),
  };
}

export function summarizeAdvancedSignals(candidates = []) {
  const labelCounts = Object.fromEntries(BANGER_LABELS.map((label) => [label, 0]));
  const actionCounts = {};
  const riskTraps = [];
  const reviewQueue = [];
  let unavailableRelativeStrength = 0;
  let unavailableOwnership = 0;
  let unavailableLiquidity = 0;

  for (const candidate of candidates || []) {
    const signals = candidate.advanced_signals || buildAdvancedSignals(candidate, {});
    const label = BANGER_LABELS.includes(signals.banger_label) ? signals.banger_label : "WAIT";
    labelCounts[label] += 1;
    actionCounts[signals.review_action] = (actionCounts[signals.review_action] || 0) + 1;
    if (signals.components?.relative_strength?.label === "unavailable") unavailableRelativeStrength += 1;
    if (signals.components?.ownership?.label === "unavailable") unavailableOwnership += 1;
    if (signals.components?.liquidity?.label === "unavailable") unavailableLiquidity += 1;
    if (label === "RISK_TRAP") {
      riskTraps.push({
        ticker: candidate.ticker,
        score: signals.banger_score,
        reason: signals.components?.thesis_invalidation?.reasons?.[0] || "risk review required",
      });
    }
    if (["BANGER_CANDIDATE_REVIEW", "EARLY_BUT_THIN"].includes(label)) {
      reviewQueue.push({
        ticker: candidate.ticker,
        company: candidate.company,
        label,
        score: signals.banger_score,
      });
    }
  }

  reviewQueue.sort((left, right) => right.score - left.score || left.ticker.localeCompare(right.ticker));
  riskTraps.sort((left, right) => left.ticker.localeCompare(right.ticker));

  return {
    label_counts: labelCounts,
    action_counts: actionCounts,
    review_queue: reviewQueue.slice(0, 10),
    risk_traps: riskTraps,
    data_gaps: {
      relative_strength_unavailable: unavailableRelativeStrength,
      ownership_unavailable: unavailableOwnership,
      liquidity_unavailable: unavailableLiquidity,
    },
  };
}

function formatCountMap(counts) {
  return Object.entries(counts || {})
    .map(([key, count]) => `- ${key}: ${count}`)
    .join("\n");
}

function formatBangerCandidate(candidate) {
  const signals = candidate.advanced_signals || {};
  const components = signals.components || {};
  return `- ${candidate.ticker}: ${signals.banger_label || "WAIT"} / ${signals.review_action || "ADVANCED_WAIT"}; score ${signals.banger_score ?? 0}; SEC ${components.sec_catalyst?.label || "none"}; proof ${components.customer_proof?.label || "none"}; strength ${components.relative_strength?.label || "unavailable"}; liquidity ${components.liquidity?.label || "unavailable"}`;
}

function formatReviewQueue(queue) {
  if (!queue.length) return "- Keine Kandidaten in der Advanced Review Queue.";
  return queue.map((item) => `- ${item.ticker}: ${item.label}, score ${item.score}`).join("\n");
}

function formatRiskTraps(riskTraps) {
  if (!riskTraps.length) return "- Keine Risk Traps im Advanced Stack.";
  return riskTraps.map((item) => `- ${item.ticker}: ${item.reason}`).join("\n");
}

export function renderAdvancedSignalsReport({ date, watchlist, reportPath }) {
  const candidates = watchlist.candidates || [];
  const summary = summarizeAdvancedSignals(candidates);

  return `# AI Stock Radar Advanced Signals - ${date}

## Kurzfazit
- Advanced Signal Stack is research-only and ranks evidence quality, risk gates, data gaps, and review priority.
- Candidates reviewed: ${candidates.length}
- Hard risk gates override every positive component.

## Banger Score
${candidates.length ? candidates.map(formatBangerCandidate).join("\n") : "- Keine Kandidaten bewertet."}

## Component Summary
${formatCountMap(summary.label_counts)}

## Risk Traps
${formatRiskTraps(summary.risk_traps)}

## Review Queue
${formatReviewQueue(summary.review_queue)}

## Data Gaps
- relative_strength_unavailable: ${summary.data_gaps.relative_strength_unavailable}
- ownership_unavailable: ${summary.data_gaps.ownership_unavailable}
- liquidity_unavailable: ${summary.data_gaps.liquidity_unavailable}

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob spaeter zusaetzliche kostenlose Kontextquellen fuer Basket oder Ownership eingebunden werden sollen.
- BEOBACHTEN: BANGER_CANDIDATE_REVIEW, EARLY_BUT_THIN, RISK_TRAP und wiederkehrende Datenluecken.
- SPAETER: Mehrwoechige Kalibrierung gegen Shadow Backtest und Paper Portfolio.
- BLOCKIERT: Keine Live-Provider fuer optionale Basket- oder Ownership-Kontexte konfiguriert.
- NICHT_TUN: Keine automatischen Trades; keine Hype-Hochstufung trotz Risk Trap.
- Naechste kleinste Aktion: Advanced Review Queue neben Evidence Firewall und CEO Control pruefen.
- Beleg / Datei: ${reportPath}
`;
}

export function writeAdvancedSignalsRun({ root = DEFAULT_ROOT, date = process.env.AI_STOCK_RADAR_DATE, watchlist } = {}) {
  const resolvedDate = date || new Date().toISOString().slice(0, 10);
  const reportDir = path.join(root, "reports/ai-stock-radar");
  fs.mkdirSync(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, `ai-stock-advanced-signals-${resolvedDate}.md`);
  const report = renderAdvancedSignalsReport({ date: resolvedDate, watchlist, reportPath });
  fs.writeFileSync(reportPath, report);
  return {
    reportPath,
    summary: summarizeAdvancedSignals(watchlist.candidates || []),
  };
}
