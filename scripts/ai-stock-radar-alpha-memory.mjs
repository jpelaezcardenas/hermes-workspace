import fs from "node:fs";
import path from "node:path";

const DEFAULT_ROOT = "/Users/zondrius/hermes-workspace";

const HYPOTHESIS_LABELS = ["TRACK_HYPOTHESIS", "WATCH_ONLY", "CONTRADICTION_REVIEW", "RISK_PATTERN"];
const CONTRADICTION_SEVERITIES = ["none", "watch", "serious", "critical"];
const TIMING_LABELS = ["fresh_catalyst", "watch", "late_or_risk", "stale_or_thin"];
const OUTCOME_LABELS = ["pending", "constructive", "risk_confirmed", "false_positive", "inconclusive", "unavailable"];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function normalizeRisk(value) {
  return String(value || "").toLowerCase().replaceAll(" ", "_").replaceAll("-", "_");
}

function daysBetween(startDate, endDate) {
  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  return Math.floor((end.getTime() - start.getTime()) / 86400000);
}

function addDays(dateText, days) {
  const date = new Date(`${dateText}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return dateText;
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function riskLabels(candidate) {
  return unique([
    ...(candidate.evidence_firewall?.risk_flags || []),
    ...(candidate.thesis_intelligence?.negative_catalysts?.labels || []),
    ...(candidate.top_risks || []).map(normalizeRisk),
  ]);
}

function positiveLabels(candidate) {
  return unique([
    ...(candidate.evidence_firewall?.positive_labels || []),
    ...(candidate.filing_events?.positive_labels || []),
  ]);
}

function detectContradictions(candidate) {
  const labels = [];
  const reasons = [];
  const risks = riskLabels(candidate);
  const positives = positiveLabels(candidate);
  const thesis = candidate.thesis_intelligence || {};
  const advanced = candidate.advanced_signals || {};
  const revenueLabel = thesis.ai_revenue_reality?.label || "unknown";
  const thesisVerdict = thesis.thesis_verdict || "WATCH_THESIS";
  const contradictionGaps = thesis.graph?.gaps || [];

  if (["ai_context_only", "marketing_only", "unknown", "reality_risk"].includes(revenueLabel)) {
    labels.push("ai_story_without_revenue_proof");
    reasons.push(`AI revenue reality is ${revenueLabel}`);
  }

  if (
    (positives.some((label) => /customer|partnership|agreement|contract/i.test(label)) ||
      (candidate.quality_notes || []).some((note) => /customer|partner|contract/i.test(note))) &&
    advanced.components?.customer_proof?.label !== "hard_customer_or_contract" &&
    !positives.includes("material_agreement")
  ) {
    labels.push("customer_claim_without_hard_filing");
    reasons.push("customer wording lacks hard filing proof");
  }

  if (
    risks.some((label) => ["offering_watch", "warrant_watch", "dilution_trend_watch"].includes(label)) &&
    (candidate.score >= 70 || ["BANGER_CANDIDATE_REVIEW", "EARLY_BUT_THIN"].includes(advanced.banger_label))
  ) {
    labels.push("positive_story_with_dilution_risk");
    reasons.push("positive framing conflicts with dilution or offering risk");
  }

  if (
    candidate.price_volume?.confirmation === "positive" &&
    (thesisVerdict === "BROKEN_THESIS" || revenueLabel === "reality_risk")
  ) {
    labels.push("price_strength_with_broken_thesis");
    reasons.push("positive price context conflicts with thesis or revenue reality risk");
  }

  if (advanced.banger_label === "BANGER_CANDIDATE_REVIEW" && thesisVerdict === "BROKEN_THESIS") {
    labels.push("positive_label_vs_broken_thesis");
    reasons.push("advanced review priority conflicts with broken thesis");
  }

  if (contradictionGaps.length >= 3 && candidate.idea_grade && ["A", "S"].includes(candidate.idea_grade)) {
    labels.push("high_grade_with_many_gaps");
    reasons.push("high idea grade has multiple unresolved thesis gaps");
  }

  if (thesisVerdict === "BROKEN_THESIS") {
    labels.push("broken_thesis");
    reasons.push("thesis intelligence marks the thesis as broken");
  }

  if (thesis.negative_catalysts?.severity === "critical") {
    labels.push("critical_negative_catalyst");
    reasons.push("critical negative catalyst is active");
  }

  if (advanced.banger_label === "RISK_TRAP") {
    labels.push("advanced_signal_risk_trap");
    reasons.push("advanced signal stack marks the candidate as risk trap");
  }

  const criticalLabels = [
    "positive_label_vs_broken_thesis",
    "positive_story_with_dilution_risk",
    "price_strength_with_broken_thesis",
    "broken_thesis",
    "critical_negative_catalyst",
    "advanced_signal_risk_trap",
  ];
  const severity = labels.some((label) => criticalLabels.includes(label)) || thesis.negative_catalysts?.severity === "critical"
    ? "critical"
    : labels.length >= 2
      ? "serious"
      : labels.length === 1
        ? "watch"
        : "none";

  return {
    severity,
    labels: unique(labels),
    reasons: unique(reasons.length ? reasons : ["no current contradiction detected"]),
  };
}

function buildCatalystTimeline(candidate, { date }) {
  const events = [];
  const add = (kind, eventDate, label, detail) => {
    events.push({ kind, date: eventDate || date, label, detail });
  };

  add("checked", candidate.last_checked || date, "last_checked", "candidate was reviewed");

  if (candidate.filing_events?.hard_catalyst || positiveLabels(candidate).includes("material_agreement")) {
    add("filing_catalyst", candidate.last_checked || date, "hard_catalyst", "filing or material-agreement catalyst detected");
  }

  if (candidate.evidence_firewall?.verdict) {
    add("evidence_firewall", candidate.last_checked || date, candidate.evidence_firewall.verdict, "evidence firewall verdict");
  }

  if (candidate.advanced_signals?.banger_label) {
    add("advanced_signal", candidate.last_checked || date, candidate.advanced_signals.banger_label, "advanced signal stack label");
  }

  if (candidate.thesis_intelligence?.thesis_verdict) {
    add("thesis", candidate.last_checked || date, candidate.thesis_intelligence.thesis_verdict, "thesis intelligence verdict");
  }

  if (candidate.price_volume?.status === "available") {
    add("price_volume", candidate.last_checked || date, candidate.price_volume.confirmation || "available", "free price/volume context");
  }

  const riskEvents = riskLabels(candidate);
  for (const risk of riskEvents.slice(0, 4)) {
    add("risk_event", candidate.last_checked || date, risk, "risk label in current evidence stack");
  }

  const hasHardRisk =
    candidate.thesis_intelligence?.thesis_verdict === "BROKEN_THESIS" ||
    candidate.advanced_signals?.banger_label === "RISK_TRAP" ||
    riskEvents.some((risk) => /offering|dilution|delisting|reverse_split|going_concern|name_only/.test(risk));
  const hasFreshCatalyst = events.some((event) => event.kind === "filing_catalyst");
  const hasThinData =
    candidate.price_volume?.status !== "available" ||
    candidate.thesis_intelligence?.ai_revenue_reality?.label === "unknown" ||
    candidate.source_confidence?.summary?.missing > 0;
  const timingLabel = hasHardRisk
    ? "late_or_risk"
    : hasFreshCatalyst
      ? "fresh_catalyst"
      : hasThinData
        ? "stale_or_thin"
        : "watch";

  return {
    timing_label: timingLabel,
    events,
    reasons: [
      hasHardRisk ? "risk event dominates timeline" : null,
      hasFreshCatalyst ? "fresh filing or catalyst context present" : null,
      hasThinData ? "timeline has data gaps or thin context" : null,
    ].filter(Boolean),
  };
}

function learningScore(candidate, contradiction, timeline) {
  const gradeScore = { S: 18, A: 14, B: 8, C: 3, X: -20 }[candidate.idea_grade] ?? 0;
  const thesisScore = {
    THESIS_CONFIRMED_REVIEW: 18,
    WATCH_THESIS: 6,
    WEAK_THESIS: -8,
    BROKEN_THESIS: -25,
  }[candidate.thesis_intelligence?.thesis_verdict] ?? 0;
  const advancedScore = {
    BANGER_CANDIDATE_REVIEW: 12,
    EARLY_BUT_THIN: 4,
    WAIT: 0,
    RISK_TRAP: -25,
  }[candidate.advanced_signals?.banger_label] ?? 0;
  const contradictionPenalty = { none: 0, watch: 10, serious: 22, critical: 55 }[contradiction.severity] || 0;
  const timelineScore = { fresh_catalyst: 10, watch: 4, stale_or_thin: -6, late_or_risk: -18 }[timeline.timing_label] || 0;

  return clamp(35 + gradeScore + thesisScore + advancedScore + timelineScore - contradictionPenalty, 0, 100);
}

function classifyHypothesis(score, contradiction, timeline, candidate) {
  if (contradiction.severity === "critical" || timeline.timing_label === "late_or_risk" || candidate.thesis_intelligence?.thesis_verdict === "BROKEN_THESIS") {
    return { hypothesis_label: "RISK_PATTERN", memory_action: "ALPHA_RISK_ARCHIVE" };
  }
  if (["watch", "serious"].includes(contradiction.severity)) {
    return { hypothesis_label: "CONTRADICTION_REVIEW", memory_action: "ALPHA_CONTRADICTION_REVIEW" };
  }
  if (score >= 70 && timeline.timing_label === "fresh_catalyst") {
    return { hypothesis_label: "TRACK_HYPOTHESIS", memory_action: "ALPHA_TRACK" };
  }
  return { hypothesis_label: "WATCH_ONLY", memory_action: "ALPHA_MONITOR" };
}

export function buildAlphaMemorySignal(candidate, { date = new Date().toISOString().slice(0, 10) } = {}) {
  const contradiction = detectContradictions(candidate);
  const timeline = buildCatalystTimeline(candidate, { date });
  const score = learningScore(candidate, contradiction, timeline);
  const classification = classifyHypothesis(score, contradiction, timeline, candidate);

  return {
    version: 1,
    hypothesis_label: classification.hypothesis_label,
    memory_action: classification.memory_action,
    learning_score: score,
    contradiction_detector: contradiction,
    catalyst_timeline: timeline,
    reasons: unique([
      ...contradiction.reasons,
      ...timeline.reasons,
    ]).slice(0, 10),
  };
}

export function applyAlphaMemorySignal(candidate, { date = new Date().toISOString().slice(0, 10) } = {}) {
  return {
    ...candidate,
    alpha_memory: buildAlphaMemorySignal(candidate, { date }),
  };
}

function snapshotFromCandidate(candidate, date) {
  const alpha = candidate.alpha_memory || buildAlphaMemorySignal(candidate, { date });
  return {
    id: `${candidate.ticker}-${date}`,
    ticker: candidate.ticker,
    date,
    due_dates: {
      d7: addDays(date, 7),
      d30: addDays(date, 30),
      d90: addDays(date, 90),
    },
    horizon_days: 30,
    entry_close: Number.isFinite(Number(candidate.price_volume?.latest_close)) ? Number(candidate.price_volume.latest_close) : null,
    idea_grade: candidate.idea_grade || "?",
    score: candidate.score || 0,
    category: candidate.category || "unknown",
    hypothesis_label: alpha.hypothesis_label,
    thesis_verdict: candidate.thesis_intelligence?.thesis_verdict || "unknown",
    advanced_label: candidate.advanced_signals?.banger_label || "unknown",
    contradiction_severity: alpha.contradiction_detector.severity,
    catalyst_timing: alpha.catalyst_timeline.timing_label,
    risk_labels: riskLabels(candidate),
    status: "pending",
  };
}

function assessSnapshot(snapshot, currentCandidate, date) {
  const ageDays = daysBetween(snapshot.date, date);
  if (ageDays < (snapshot.horizon_days || 30)) return null;
  if (!currentCandidate) {
    return {
      id: `${snapshot.id}-${date}`,
      ticker: snapshot.ticker,
      snapshot_date: snapshot.date,
      assessed_at: date,
      outcome_label: "unavailable",
      reasons: ["candidate unavailable in current watchlist"],
    };
  }

  const currentClose = Number.isFinite(Number(currentCandidate.price_volume?.latest_close))
    ? Number(currentCandidate.price_volume.latest_close)
    : null;
  const pctReturn = snapshot.entry_close && currentClose
    ? Number((((currentClose - snapshot.entry_close) / snapshot.entry_close) * 100).toFixed(2))
    : null;
  const currentAlpha = currentCandidate.alpha_memory || buildAlphaMemorySignal(currentCandidate, { date });
  const currentBroken =
    currentCandidate.thesis_intelligence?.thesis_verdict === "BROKEN_THESIS" ||
    currentCandidate.advanced_signals?.banger_label === "RISK_TRAP" ||
    currentAlpha.contradiction_detector.severity === "critical";

  let outcome = "inconclusive";
  const reasons = [];
  if (currentBroken) {
    outcome = snapshot.hypothesis_label === "RISK_PATTERN" ? "risk_confirmed" : "false_positive";
    reasons.push("current evidence confirms risk or broken thesis");
  } else if (pctReturn === null) {
    outcome = "unavailable";
    reasons.push("price comparison unavailable");
  } else if (pctReturn >= 15) {
    outcome = "constructive";
    reasons.push(`comparison return ${pctReturn}% without critical current risk`);
  } else if (pctReturn <= -20) {
    outcome = "false_positive";
    reasons.push(`comparison return ${pctReturn}% is adverse`);
  } else {
    reasons.push(`comparison return ${pctReturn}% is inconclusive`);
  }

  return {
    id: `${snapshot.id}-${date}`,
    ticker: snapshot.ticker,
    snapshot_date: snapshot.date,
    assessed_at: date,
    outcome_label: outcome,
    return_pct: pctReturn,
    reasons,
  };
}

export function updateAlphaMemoryState({ memory = { version: 1, snapshots: [], assessments: [] }, watchlist, date }) {
  const existing = {
    version: 1,
    snapshots: [...(memory.snapshots || [])],
    assessments: [...(memory.assessments || [])],
  };
  const candidates = watchlist.candidates || [];
  const candidateByTicker = new Map(candidates.map((candidate) => [candidate.ticker, candidate]));
  const snapshotIds = new Set(existing.snapshots.map((snapshot) => snapshot.id));

  for (const candidate of candidates) {
    const snapshot = snapshotFromCandidate(candidate, date);
    if (!snapshotIds.has(snapshot.id)) {
      existing.snapshots.push(snapshot);
      snapshotIds.add(snapshot.id);
    }
  }

  const assessmentIds = new Set(existing.assessments.map((assessment) => assessment.id));
  for (const snapshot of existing.snapshots) {
    const assessment = assessSnapshot(snapshot, candidateByTicker.get(snapshot.ticker), date);
    if (assessment && !assessmentIds.has(assessment.id)) {
      existing.assessments.push(assessment);
      assessmentIds.add(assessment.id);
    }
  }

  existing.generated_at = new Date().toISOString();
  return existing;
}

function countBy(values, allowed = []) {
  const counts = Object.fromEntries(allowed.map((item) => [item, 0]));
  for (const value of values || []) {
    const key = allowed.includes(value) ? value : value || "unknown";
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function countLoose(values) {
  const counts = {};
  for (const value of values || []) {
    const key = value || "unknown";
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function sortCounts(counts) {
  return Object.entries(counts || {})
    .sort(([leftKey, leftValue], [rightKey, rightValue]) => rightValue - leftValue || leftKey.localeCompare(rightKey));
}

export function summarizeAlphaMemory({ candidates = [], memory = { snapshots: [], assessments: [] } } = {}) {
  return {
    hypothesis_counts: countBy(candidates.map((candidate) => candidate.alpha_memory?.hypothesis_label), HYPOTHESIS_LABELS),
    contradiction_severity_counts: countBy(candidates.map((candidate) => candidate.alpha_memory?.contradiction_detector?.severity), CONTRADICTION_SEVERITIES),
    contradiction_label_counts: countLoose(candidates.flatMap((candidate) => candidate.alpha_memory?.contradiction_detector?.labels || [])),
    catalyst_timing_counts: countBy(candidates.map((candidate) => candidate.alpha_memory?.catalyst_timeline?.timing_label), TIMING_LABELS),
    recurring_risk_counts: countLoose(candidates.flatMap((candidate) => riskLabels(candidate))),
    assessment_counts: countBy((memory.assessments || []).map((assessment) => assessment.outcome_label), OUTCOME_LABELS),
    snapshot_count: (memory.snapshots || []).length,
    due_assessment_count: (memory.assessments || []).length,
  };
}

function formatCountMap(counts) {
  return Object.entries(counts || {}).map(([key, value]) => `- ${key}: ${value}`).join("\n");
}

function formatTopCounts(counts, emptyText = "- none") {
  const entries = sortCounts(counts).slice(0, 8);
  if (!entries.length) return emptyText;
  return entries.map(([key, value]) => `- ${key}: ${value}`).join("\n");
}

function formatCandidate(candidate) {
  const alpha = candidate.alpha_memory || {};
  const labels = (alpha.contradiction_detector?.labels || []).slice(0, 3).join(", ") || "none";
  return `- ${candidate.ticker}: ${alpha.hypothesis_label || "WATCH_ONLY"} / ${alpha.memory_action || "ALPHA_MONITOR"}; learning ${alpha.learning_score ?? 0}; contradiction ${alpha.contradiction_detector?.severity || "watch"}; labels ${labels}; timeline ${alpha.catalyst_timeline?.timing_label || "watch"}`;
}

function formatAssessments(assessments = []) {
  if (!assessments.length) return "- Keine faelligen Alpha-Memory-Assessments.";
  return assessments
    .slice(-10)
    .map((assessment) => `- ${assessment.ticker}: ${assessment.outcome_label}; reasons: ${(assessment.reasons || []).join("; ") || "none"}`)
    .join("\n");
}

export function renderAlphaMemoryReport({ date, watchlist, memory, reportPath }) {
  const candidates = watchlist.candidates || [];
  const summary = summarizeAlphaMemory({ candidates, memory });

  return `# AI Stock Radar Alpha Memory - ${date}

## Kurzfazit
- Alpha Memory is research-only and tracks hypotheses, contradictions, catalyst timing, and later calibration.
- Candidates reviewed: ${candidates.length}
- Memory snapshots: ${summary.snapshot_count}

## Hypothesis Memory
${candidates.length ? candidates.map(formatCandidate).join("\n") : "- Keine Kandidaten bewertet."}

## Contradiction Detector
${formatCountMap(summary.contradiction_severity_counts)}

### Top Contradiction Labels
${formatTopCounts(summary.contradiction_label_counts)}

## Catalyst Timeline
${formatCountMap(summary.catalyst_timing_counts)}

### Recurring Risk Patterns
${formatTopCounts(summary.recurring_risk_counts)}

## Memory Assessments
${formatAssessments(memory.assessments || [])}

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob spaeter laengere Vergleichshorizonte oder zusaetzliche kostenlose Kontextquellen eingebunden werden sollen.
- BEOBACHTEN: CONTRADICTION_REVIEW, RISK_PATTERN, risk_confirmed, false_positive und wiederkehrende Timeline-Risiken.
- SPAETER: Alpha-Memory-Assessments nach mehreren 7/30/90-Tage-Zyklen kalibrieren.
- BLOCKIERT: Faellige Bewertungen brauchen spaetere Beobachtungsdaten.
- NICHT_TUN: Keine automatischen Trades; keine konstruktive Memory-Bewertung als Empfehlung behandeln.
- Naechste kleinste Aktion: Contradiction-Review-Kandidaten gegen Thesis Intelligence und Evidence Firewall pruefen.
- Beleg / Datei: ${reportPath}
`;
}

export function writeAlphaMemoryRun({ root = DEFAULT_ROOT, date = process.env.AI_STOCK_RADAR_DATE, watchlist } = {}) {
  const resolvedDate = date || new Date().toISOString().slice(0, 10);
  const stateDir = path.join(root, "projects/ai-stock-radar");
  const reportDir = path.join(root, "reports/ai-stock-radar");
  fs.mkdirSync(stateDir, { recursive: true });
  fs.mkdirSync(reportDir, { recursive: true });
  const memoryPath = path.join(stateDir, "alpha-memory.json");
  const existing = fs.existsSync(memoryPath)
    ? JSON.parse(fs.readFileSync(memoryPath, "utf8"))
    : { version: 1, snapshots: [], assessments: [] };
  const memory = updateAlphaMemoryState({ memory: existing, watchlist, date: resolvedDate });
  fs.writeFileSync(memoryPath, `${JSON.stringify(memory, null, 2)}\n`);

  const reportPath = path.join(reportDir, `ai-stock-alpha-memory-${resolvedDate}.md`);
  fs.writeFileSync(reportPath, renderAlphaMemoryReport({ date: resolvedDate, watchlist, memory, reportPath }));

  return {
    memoryPath,
    reportPath,
    summary: summarizeAlphaMemory({ candidates: watchlist.candidates || [], memory }),
  };
}
