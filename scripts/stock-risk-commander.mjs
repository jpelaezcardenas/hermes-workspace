import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildInstitutionalSellPressureSignal } from "./institutional-sell-radar.mjs";

const DEFAULT_ROOT = process.env.HERMES_WORKSPACE || process.cwd();
const FORBIDDEN_REPORT_PATTERN =
  /buy now|sell now|short now|strong buy|strong sell|price target|kursziel|jetzt kaufen|jetzt verkaufen|option|leverage|margin|garantiert|sichere rendite/i;

const DEFAULT_STOCK_JOBS = [
  { id: "230fd5468b64", name: "AI_STOCK_RADAR_DAILY", schedule: "35 9 * * 1-5" },
  { id: "e51ae70020f8", name: "INSTITUTIONAL_SELL_PRESSURE_DAILY", schedule: "50 9 * * 1-5" },
  { id: "d157c13def75", name: "AI_STOCK_DEEPDIVE_WEEKLY", schedule: "30 16 * * 0" },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function safeReadJson(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

function normalizeTicker(ticker) {
  return String(ticker || "").trim().toUpperCase();
}

function compactList(values, fallback = "none") {
  const clean = [...new Set((values || []).filter(Boolean))];
  return clean.length ? clean.join("; ") : fallback;
}

function normalizeRiskText(value) {
  const text = String(value || "").toLowerCase();
  const normalized = text.replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  const known = [
    ["name_only_ai", "name_only_ai_watch"],
    ["delisting", "delisting_watch"],
    ["dilution", "dilution_trend_watch"],
    ["offering", "offering_watch"],
    ["cash_runway", "cash_runway_watch"],
    ["going_concern", "going_concern_watch"],
    ["warrant", "warrant_watch"],
  ];
  for (const [needle, label] of known) {
    if (normalized.includes(needle)) return label;
  }
  return normalized;
}

function riskFlags(candidate) {
  return [
    ...(candidate.evidence_firewall?.risk_flags || []),
    ...(candidate.top_risks || []),
    ...(candidate.quality_notes || []),
  ].map(normalizeRiskText).filter(Boolean);
}

export function detectStockRiskCommanderSchedule(jobs = DEFAULT_STOCK_JOBS) {
  const effectiveJobs = jobs.length ? jobs : DEFAULT_STOCK_JOBS;
  return {
    daily_ai_job: effectiveJobs.find((job) => /AI_STOCK_RADAR_DAILY/i.test(job.name || "")) || null,
    institutional_job: effectiveJobs.find((job) => /INSTITUTIONAL_SELL_PRESSURE_DAILY/i.test(job.name || "")) || null,
    weekly_job: effectiveJobs.find((job) => /AI_STOCK_DEEPDIVE_WEEKLY/i.test(job.name || "")) || null,
    recommended_schedule: "0 10 * * 1-5",
    reason: "Run after the 09:35 AI radar and 09:50 institutional sell-pressure radar.",
  };
}

export function computeCommanderAssessment(candidate, institutionalSignal = { risk_level: "INFO", score: 0, reasons: [] }) {
  const attentionReasons = [];
  const riskOverrides = [];
  const dataGaps = [];
  const gradeScore = { S: 35, A: 28, B: 18, C: 6, X: -25 }[candidate.idea_grade] ?? 0;
  let score = clamp(35 + gradeScore + Math.round((candidate.score || 0) / 5), 0, 100);

  if (["S", "A", "B"].includes(candidate.idea_grade)) attentionReasons.push(`idea grade ${candidate.idea_grade}`);
  if (candidate.evidence_firewall?.verdict === "pass") attentionReasons.push("Evidence Firewall pass");
  if (["focus", "monitor"].includes(candidate.ceo_control?.lane)) attentionReasons.push(`CEO lane ${candidate.ceo_control.lane}`);
  if (["WATCH_ONLY", "TRACK_HYPOTHESIS"].includes(candidate.alpha_memory?.hypothesis_label)) attentionReasons.push(`Alpha Memory ${candidate.alpha_memory.hypothesis_label}`);

  if (candidate.evidence_firewall?.verdict === "reject") riskOverrides.push("Evidence Firewall reject");
  if (candidate.evidence_firewall?.verdict === "caution") riskOverrides.push("Evidence Firewall caution");
  if (candidate.ceo_control?.lane === "reject") riskOverrides.push("CEO reject");
  if (candidate.ceo_control?.lane === "manual_review") riskOverrides.push("CEO manual review");
  if (candidate.alpha_memory?.hypothesis_label === "RISK_PATTERN") riskOverrides.push("Alpha Memory risk pattern");
  if (candidate.alpha_memory?.hypothesis_label === "CONTRADICTION_REVIEW") riskOverrides.push("Alpha Memory contradiction review");
  if (candidate.thesis_intelligence?.thesis_verdict === "BROKEN_THESIS") riskOverrides.push("broken thesis");
  if (["WARNING", "CRITICAL_REVIEW"].includes(institutionalSignal.risk_level)) {
    riskOverrides.push(`institutional sell pressure ${institutionalSignal.risk_level}`);
  }

  const severeIssuerRisks = riskFlags(candidate).filter((risk) => /dilution|offering|delisting|going_concern|cash_runway|warrant|name_only/.test(risk));
  for (const risk of severeIssuerRisks.slice(0, 4)) riskOverrides.push(`issuer risk ${risk}`);

  if (candidate.price_volume?.status !== "available") dataGaps.push("price/volume unavailable");
  if (institutionalSignal.source_latency === "unavailable") dataGaps.push("institutional pressure source unavailable");
  if (candidate.source_confidence?.summary?.missing > 0) dataGaps.push("source confidence has missing data");

  if (riskOverrides.length) score = clamp(score - 40 - Math.min(25, riskOverrides.length * 5), 0, 100);
  else if (institutionalSignal.risk_level === "WATCH") score = clamp(score - 10, 0, 100);

  let riskPosture = "CLEAN_WATCH";
  let commanderAction = "COMMANDER_MONITOR";
  if (riskOverrides.length) {
    riskPosture = "RISK_REVIEW";
    commanderAction = "COMMANDER_RISK_REVIEW";
  } else if (score >= 60 && attentionReasons.length) {
    riskPosture = "RESEARCH_ATTENTION";
    commanderAction = "COMMANDER_RESEARCH_REVIEW";
  } else if ((candidate.idea_grade === "X" || candidate.category === "Avoid") && score < 30) {
    riskPosture = "IGNORE_NOISE";
    commanderAction = "COMMANDER_IGNORE";
  }

  return {
    version: 1,
    risk_posture: riskPosture,
    commander_action: commanderAction,
    combined_score: score,
    attention_reasons: [...new Set(attentionReasons)],
    risk_overrides: [...new Set(riskOverrides)],
    data_gaps: [...new Set(dataGaps)],
  };
}

export function buildCommanderCandidates({ aiWatchlist = { candidates: [] }, institutionalObservations = [], date = new Date().toISOString().slice(0, 10) } = {}) {
  return (aiWatchlist.candidates || []).map((candidate) => {
    const ticker = normalizeTicker(candidate.ticker);
    const institutionalSignal = buildInstitutionalSellPressureSignal(
      { ...candidate, ticker },
      {
        observations: (institutionalObservations || []).filter((observation) => normalizeTicker(observation.ticker) === ticker),
        date,
      },
    );
    const commanderAssessment = computeCommanderAssessment(candidate, institutionalSignal);
    return {
      ...candidate,
      ticker,
      institutional_sell_pressure: institutionalSignal,
      commander_assessment: commanderAssessment,
    };
  }).sort((left, right) =>
    (right.commander_assessment?.combined_score || 0) - (left.commander_assessment?.combined_score || 0)
  );
}

export function selectSafeActions(candidates = []) {
  const priority = [...candidates].sort((left, right) => {
    const postureRank = { RISK_REVIEW: 3, RESEARCH_ATTENTION: 2, CLEAN_WATCH: 1, IGNORE_NOISE: 0 };
    return (postureRank[right.commander_assessment?.risk_posture] || 0) - (postureRank[left.commander_assessment?.risk_posture] || 0) ||
      (right.commander_assessment?.combined_score || 0) - (left.commander_assessment?.combined_score || 0);
  });

  return priority.slice(0, 3).map((candidate) => {
    const assessment = candidate.commander_assessment || {};
    if (assessment.risk_posture === "RISK_REVIEW") {
      return `${candidate.ticker}: Risiken pruefen (${compactList(assessment.risk_overrides)})`;
    }
    if (assessment.risk_posture === "RESEARCH_ATTENTION") {
      return `${candidate.ticker}: Research-These gegen Filing, Thesis und Source-Gaps verifizieren`;
    }
    if (assessment.risk_posture === "IGNORE_NOISE") {
      return `${candidate.ticker}: als Noise/Avoid im Review belassen`;
    }
    return `${candidate.ticker}: weiter beobachten und Datenluecken notieren`;
  }).filter((action) => !/\bbuy\b|\bsell\b|\bshort\b|option|leverage|margin|kaufen|verkaufen/i.test(action));
}

function countPostures(candidates) {
  const counts = { CLEAN_WATCH: 0, RESEARCH_ATTENTION: 0, RISK_REVIEW: 0, IGNORE_NOISE: 0 };
  for (const candidate of candidates || []) {
    const posture = candidate.commander_assessment?.risk_posture || "CLEAN_WATCH";
    counts[posture] = (counts[posture] || 0) + 1;
  }
  return counts;
}

function potentialCandidateLane(candidate) {
  const posture = candidate.commander_assessment?.risk_posture;
  if (posture === "RESEARCH_ATTENTION") return "Research Review";
  if (posture === "RISK_REVIEW") return "Risk Review";
  if (posture === "IGNORE_NOISE" || candidate.idea_grade === "X" || candidate.category === "Avoid") {
    return "Archive/Avoid Review";
  }
  return "Watch";
}

function formatCandidate(candidate) {
  const assessment = candidate.commander_assessment || {};
  return `- ${candidate.ticker}: ${assessment.risk_posture || "CLEAN_WATCH"} / ${assessment.commander_action || "COMMANDER_MONITOR"}; score ${assessment.combined_score ?? 0}; attention ${compactList(assessment.attention_reasons)}; risk ${compactList(assessment.risk_overrides)}`;
}

function formatPotentialCandidate(candidate) {
  const assessment = candidate.commander_assessment || {};
  return `- ${candidate.ticker}: ${potentialCandidateLane(candidate)}; posture ${assessment.risk_posture || "CLEAN_WATCH"}; Grade ${candidate.idea_grade || "?"}; ${candidate.category || "Watch"}; score ${assessment.combined_score ?? 0}; risk ${compactList(assessment.risk_overrides)}; data ${compactList(assessment.data_gaps)}`;
}

function formatSection(candidates, filter, emptyText) {
  const lines = candidates.filter(filter).slice(0, 10).map(formatCandidate);
  return lines.length ? lines.join("\n") : emptyText;
}

export function renderStockRiskCommanderReport({
  date,
  candidates,
  reportPath,
  alignment = detectStockRiskCommanderSchedule(),
}) {
  const counts = countPostures(candidates);
  const safeActions = selectSafeActions(candidates);
  const report = `# Stock Risk Commander - ${date}

## Kurzfazit
- Research-only combined commander for AI Stock Radar and Institutional Sell Pressure Radar.
- Candidates reviewed: ${candidates.length}
- Research attention: ${counts.RESEARCH_ATTENTION}
- Risk review: ${counts.RISK_REVIEW}
- Ignore/noise: ${counts.IGNORE_NOISE}

## Job Alignment
- AI Stock Radar: ${alignment.daily_ai_job?.name || "AI_STOCK_RADAR_DAILY"} (${alignment.daily_ai_job?.schedule || "35 9 * * 1-5"})
- Institutional Sell Pressure: ${alignment.institutional_job?.name || "INSTITUTIONAL_SELL_PRESSURE_DAILY"} (${alignment.institutional_job?.schedule || "50 9 * * 1-5"})
- Commander schedule: ${alignment.recommended_schedule || "0 10 * * 1-5"}

## Combined Risk Board
${candidates.length ? candidates.slice(0, 15).map(formatCandidate).join("\n") : "- Keine Kandidaten."}

## Potential Candidate Board
- Sichtbarkeitsboard fuer bis zu 15 Kandidaten aus AI Stock Radar plus Risk Overlay; Research-only, keine Anlageempfehlung.
${candidates.length ? candidates.slice(0, 15).map(formatPotentialCandidate).join("\n") : "- Keine Kandidaten."}

## Top Research Attention
${formatSection(candidates, (candidate) => candidate.commander_assessment?.risk_posture === "RESEARCH_ATTENTION", "- Keine sauberen Research-Attention-Kandidaten.")}

## Risk Overrides
${formatSection(candidates, (candidate) => candidate.commander_assessment?.risk_posture === "RISK_REVIEW", "- Keine Risk-Override-Kandidaten.")}

## Institutional Pressure Overlay
${candidates.slice(0, 15).map((candidate) => `- ${candidate.ticker}: ${candidate.institutional_sell_pressure?.risk_level || "INFO"}; latency ${candidate.institutional_sell_pressure?.source_latency || "unavailable"}; reasons ${compactList(candidate.institutional_sell_pressure?.reasons)}`).join("\n") || "- Keine Kandidaten."}

## Noise / Ignore
${formatSection(candidates, (candidate) => candidate.commander_assessment?.risk_posture === "IGNORE_NOISE", "- Keine Noise/Ignore-Kandidaten.")}

## Data Gaps
${candidates.slice(0, 15).map((candidate) => `- ${candidate.ticker}: ${compactList(candidate.commander_assessment?.data_gaps)}`).join("\n") || "- Keine Kandidaten."}

## Max 3 Safe Actions
${safeActions.length ? safeActions.map((action) => `- ${action}`).join("\n") : "- nichts"}

## Decision Inbox
- Signal: ${counts.RISK_REVIEW ? "Yellow" : "Green"}
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob einzelne Risk-Review-Faelle manuell in Dossier, Downgrade oder Archiv-Review uebernommen werden.
- BEOBACHTEN: Research-Attention-Kandidaten, Risk-Overrides, institutionelle Pressure-Overlays und Datenluecken.
- SPAETER: Commander Memory fuer genutzte und ignorierte Review-Aktionen kalibrieren.
- BLOCKIERT: Fehlende kostenlose Preis-/Ownership-Kontexte muessen als Datenluecken sichtbar bleiben.
- NICHT_TUN: Keine automatischen Trades, keine Short-, Derivate- oder Hebel-Workflows, keine numerischen Zielmarken oder Gewissheitslogik.
- Naechste kleinste Aktion: Maximal drei Safe Actions aus diesem Bericht pruefen.
- Beleg / Datei: ${reportPath}
`;

  if (FORBIDDEN_REPORT_PATTERN.test(report)) {
    throw new Error("Stock Risk Commander report contains forbidden trading or certainty language");
  }
  return report;
}

export function writeStockRiskCommanderRun({ root = DEFAULT_ROOT, date = process.env.STOCK_RISK_COMMANDER_DATE || process.env.AI_STOCK_RADAR_DATE || new Date().toISOString().slice(0, 10), cronJobs = DEFAULT_STOCK_JOBS } = {}) {
  const aiWatchlistPath = path.join(root, "projects/ai-stock-radar/watchlist.json");
  const ledgerPath = path.join(root, "projects/institutional-sell-radar/holder-ledger.json");
  const reportDir = path.join(root, "reports/stock-risk-commander");
  fs.mkdirSync(reportDir, { recursive: true });

  const aiWatchlist = safeReadJson(aiWatchlistPath, { candidates: [] });
  const institutionalLedger = safeReadJson(ledgerPath, { observations: [] });
  const candidates = buildCommanderCandidates({
    aiWatchlist,
    institutionalObservations: institutionalLedger.observations || [],
    date,
  });
  const safeActions = selectSafeActions(candidates);
  const reportPath = path.join(reportDir, `stock-risk-commander-${date}.md`);
  const alignment = detectStockRiskCommanderSchedule(cronJobs);
  fs.writeFileSync(reportPath, renderStockRiskCommanderReport({ date, candidates, reportPath, alignment }));
  return { reportPath, candidates, safeActions, alignment };
}

async function main() {
  const root = process.env.HERMES_WORKSPACE || DEFAULT_ROOT;
  const date = process.env.STOCK_RISK_COMMANDER_DATE || process.env.AI_STOCK_RADAR_DATE || new Date().toISOString().slice(0, 10);
  const result = writeStockRiskCommanderRun({ root, date });
  console.log(`STOCK_RISK_COMMANDER_REPORT=${result.reportPath}`);
  console.log(`STOCK_RISK_COMMANDER_CANDIDATES=${result.candidates.length}`);
  console.log(`STOCK_RISK_COMMANDER_SAFE_ACTIONS=${result.safeActions.length}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
