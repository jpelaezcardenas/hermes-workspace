import fs from "node:fs";
import path from "node:path";

const DEFAULT_ROOT = "/Users/zondrius/hermes-workspace";

const THESIS_VERDICTS = [
  "THESIS_CONFIRMED_REVIEW",
  "WATCH_THESIS",
  "WEAK_THESIS",
  "BROKEN_THESIS",
];

const REVENUE_REALITY_LABELS = [
  "verified_ai_revenue",
  "product_core_no_revenue_split",
  "ai_context_only",
  "marketing_only",
  "unknown",
  "reality_risk",
];

const NEGATIVE_SEVERITIES = ["none", "watch", "serious", "critical"];

const CRITICAL_NEGATIVE_LABELS = [
  "delisting_watch",
  "going_concern_watch",
  "reverse_split_watch",
  "shell_or_spac_watch",
  "security_structure_watch",
  "name_only_ai_watch",
];

const SERIOUS_NEGATIVE_LABELS = [
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

function normalizeRisk(text) {
  return String(text || "").toLowerCase().replaceAll(" ", "_").replaceAll("-", "_");
}

function positiveLabels(candidate) {
  return unique([
    ...(candidate.filing_events?.positive_labels || []),
    ...(candidate.evidence_firewall?.positive_labels || []),
    ...(candidate.evidence_firewall?.support_labels || []),
    ...(candidate.catalyst_labels || []),
  ]);
}

function riskLabels(candidate) {
  return unique([
    ...(candidate.evidence_firewall?.risk_flags || []),
    ...(candidate.filing_events?.risk_labels || []),
    ...(candidate.fundamental_snapshot?.risks || []),
    ...(candidate.top_risks || []).map(normalizeRisk),
  ]);
}

function detectNegativeCatalysts(candidate) {
  const labels = riskLabels(candidate);
  const reasons = [];

  if (candidate.evidence_firewall?.verdict === "reject") reasons.push("Evidence Firewall reject");
  if (candidate.ceo_control?.lane === "reject") reasons.push("CEO reject lane");
  if (candidate.advanced_signals?.banger_label === "RISK_TRAP") reasons.push("Advanced Signal risk trap");
  if (["TOO_RISKY", "FAKE_AI_HYPE"].includes(candidate.entry_readiness?.label)) {
    reasons.push(`Entry readiness ${candidate.entry_readiness.label}`);
  }

  const critical = labels.filter((label) => CRITICAL_NEGATIVE_LABELS.includes(label));
  const serious = labels.filter((label) => SERIOUS_NEGATIVE_LABELS.includes(label));

  if (critical.length || reasons.some((reason) => /reject|risk trap|TOO_RISKY|FAKE_AI_HYPE/.test(reason))) {
    return {
      severity: "critical",
      labels: unique([...critical, ...serious, ...labels.filter((label) => label === "name_only_ai_watch")]),
      reasons: unique(["critical negative catalyst before thesis promotion", ...reasons]),
    };
  }

  if (serious.length) {
    return {
      severity: "serious",
      labels: serious,
      reasons: ["serious negative catalyst requires thesis risk review"],
    };
  }

  if (candidate.evidence_firewall?.verdict === "caution" || candidate.ceo_control?.lane === "manual_review") {
    return {
      severity: "watch",
      labels: labels,
      reasons: ["caution or manual review lane requires thesis monitoring"],
    };
  }

  return {
    severity: "none",
    labels: [],
    reasons: ["no negative catalyst detected"],
  };
}

function checkAiRevenueReality(candidate, negativeCatalysts) {
  const labels = positiveLabels(candidate);
  const risks = riskLabels(candidate);
  const themes = candidate.themes || [];
  const supports = candidate.fundamental_snapshot?.supports || [];
  const hasNameOnlyRisk = risks.includes("name_only_ai_watch") || candidate.entry_readiness?.label === "FAKE_AI_HYPE";
  const hasVerifiedAiRevenue =
    labels.some((label) => ["ai_revenue_growth", "revenue_tied_ai_contract", "ai_segment_revenue"].includes(label)) ||
    candidate.ai_revenue_evidence?.verified === true;
  const hasHardCommercialProof = labels.some((label) =>
    ["material_agreement", "major_customer", "contract_award", "customer_expansion_watch"].includes(label),
  ) || candidate.advanced_signals?.components?.customer_proof?.label === "hard_customer_or_contract";
  const hasCoreAiTheme = themes.some((theme) => !["ai_keyword_match"].includes(theme));

  if (hasNameOnlyRisk || negativeCatalysts.labels.includes("name_only_ai_watch")) {
    return {
      label: "reality_risk",
      score: -25,
      reasons: ["name-only AI or fake-hype risk blocks revenue reality"],
    };
  }

  if (hasVerifiedAiRevenue && (supports.includes("revenue_growth_support") || hasHardCommercialProof)) {
    return {
      label: "verified_ai_revenue",
      score: 22,
      reasons: ["AI revenue evidence is tied to revenue support or hard customer proof"],
    };
  }

  if (hasCoreAiTheme && hasHardCommercialProof) {
    return {
      label: "product_core_no_revenue_split",
      score: 10,
      reasons: ["AI appears product-core, but a dedicated revenue split is not verified"],
    };
  }

  if (hasCoreAiTheme) {
    return {
      label: "ai_context_only",
      score: 3,
      reasons: ["AI context exists without verified revenue proof"],
    };
  }

  if (themes.includes("ai_keyword_match")) {
    return {
      label: "marketing_only",
      score: -10,
      reasons: ["AI evidence is keyword-level only"],
    };
  }

  return {
    label: "unknown",
    score: 0,
    reasons: ["AI revenue reality is unknown"],
  };
}

function buildGraph(candidate, negativeCatalysts, revenueReality) {
  const labels = positiveLabels(candidate);
  const sourceSummary = candidate.source_confidence?.summary || {};
  const evidence = [];
  const risks = [];
  const counterEvidence = [];
  const gaps = [];

  if (candidate.evidence_firewall?.verdict === "pass") evidence.push("Evidence Firewall pass");
  if (candidate.ceo_control?.lane === "focus") evidence.push("CEO focus lane");
  if (candidate.advanced_signals?.banger_label === "BANGER_CANDIDATE_REVIEW") evidence.push("Advanced Signal review priority");
  if (labels.some((label) => /customer|contract|agreement|revenue/i.test(label))) evidence.push("customer or revenue-linked public label");
  if ((sourceSummary.facts || 0) >= 3) evidence.push("source confidence has at least three fact entries");

  for (const label of negativeCatalysts.labels) risks.push(label);
  if (negativeCatalysts.severity !== "none") {
    counterEvidence.push(`negative catalyst severity ${negativeCatalysts.severity}`);
    counterEvidence.push(...negativeCatalysts.reasons);
  }

  if (candidate.fundamental_snapshot?.status !== "available") gaps.push("fundamentals unavailable");
  if (candidate.price_volume?.status !== "available") gaps.push("price volume context unavailable");
  if ((sourceSummary.missing || 0) > 0) gaps.push("source confidence has missing data");
  if (candidate.advanced_signals?.components?.relative_strength?.label === "unavailable") gaps.push("relative strength unavailable");
  if (candidate.advanced_signals?.components?.ownership?.label === "unavailable") gaps.push("ownership context unavailable");
  if (revenueReality.label === "unknown") gaps.push("AI revenue reality unknown");
  if (revenueReality.label === "product_core_no_revenue_split") gaps.push("AI revenue split not verified");
  if (["marketing_only", "reality_risk", "ai_context_only"].includes(revenueReality.label)) gaps.push("AI revenue proof missing");

  return {
    thesis: [candidate.thesis || `${candidate.company || candidate.ticker} has public AI exposure that needs evidence review.`],
    evidence: unique(evidence),
    risks: unique(risks),
    counter_evidence: unique(counterEvidence),
    gaps: unique(gaps),
  };
}

function confidenceScore(candidate, negativeCatalysts, revenueReality, graph) {
  const gradeScore = { S: 18, A: 14, B: 8, C: 2, X: -20 }[candidate.idea_grade] ?? 0;
  const firewallScore = { pass: 15, caution: -5, reject: -25 }[candidate.evidence_firewall?.verdict] ?? 0;
  const ceoScore = { focus: 12, monitor: 5, manual_review: -6, reject: -25 }[candidate.ceo_control?.lane] ?? 0;
  const advancedScore = candidate.advanced_signals?.banger_label === "BANGER_CANDIDATE_REVIEW"
    ? 10
    : candidate.advanced_signals?.banger_label === "RISK_TRAP"
      ? -25
      : 0;
  const gapPenalty = graph.gaps.length * 4;
  const severityPenalty = { none: 0, watch: 8, serious: 22, critical: 60 }[negativeCatalysts.severity] || 0;

  return clamp(
    30 + gradeScore + firewallScore + ceoScore + advancedScore + revenueReality.score - gapPenalty - severityPenalty,
    0,
    100,
  );
}

function verdictFrom({ confidence, negativeCatalysts, revenueReality }) {
  if (negativeCatalysts.severity === "critical" || revenueReality.label === "reality_risk") {
    return {
      thesis_verdict: "BROKEN_THESIS",
      research_action: "THESIS_ARCHIVE_REVIEW",
    };
  }
  if (negativeCatalysts.severity === "serious" || confidence < 35 || revenueReality.label === "marketing_only") {
    return {
      thesis_verdict: "WEAK_THESIS",
      research_action: "THESIS_RISK_REVIEW",
    };
  }
  if (confidence >= 70 && ["verified_ai_revenue", "product_core_no_revenue_split"].includes(revenueReality.label)) {
    return {
      thesis_verdict: "THESIS_CONFIRMED_REVIEW",
      research_action: "THESIS_DEEPEN_REVIEW",
    };
  }
  return {
    thesis_verdict: "WATCH_THESIS",
    research_action: "THESIS_MONITOR",
  };
}

export function buildThesisIntelligence(candidate) {
  const negativeCatalysts = detectNegativeCatalysts(candidate);
  const revenueReality = checkAiRevenueReality(candidate, negativeCatalysts);
  const graph = buildGraph(candidate, negativeCatalysts, revenueReality);
  const confidence = confidenceScore(candidate, negativeCatalysts, revenueReality, graph);
  const verdict = verdictFrom({ confidence, negativeCatalysts, revenueReality });

  return {
    version: 1,
    thesis_verdict: verdict.thesis_verdict,
    research_action: verdict.research_action,
    confidence_score: confidence,
    graph,
    negative_catalysts: negativeCatalysts,
    ai_revenue_reality: revenueReality,
    reasons: unique([
      ...negativeCatalysts.reasons,
      ...revenueReality.reasons,
      ...(graph.evidence || []),
      ...(graph.gaps || []),
    ]).slice(0, 12),
  };
}

export function applyThesisIntelligence(candidate) {
  return {
    ...candidate,
    thesis_intelligence: buildThesisIntelligence(candidate),
  };
}

export function summarizeThesisIntelligence(candidates = []) {
  const verdictCounts = Object.fromEntries(THESIS_VERDICTS.map((label) => [label, 0]));
  const negativeSeverityCounts = Object.fromEntries(NEGATIVE_SEVERITIES.map((label) => [label, 0]));
  const revenueRealityCounts = Object.fromEntries(REVENUE_REALITY_LABELS.map((label) => [label, 0]));
  const gapCounts = {};

  for (const candidate of candidates || []) {
    const thesis = candidate.thesis_intelligence || buildThesisIntelligence(candidate);
    const verdict = THESIS_VERDICTS.includes(thesis.thesis_verdict) ? thesis.thesis_verdict : "WATCH_THESIS";
    const severity = NEGATIVE_SEVERITIES.includes(thesis.negative_catalysts?.severity)
      ? thesis.negative_catalysts.severity
      : "watch";
    const revenue = REVENUE_REALITY_LABELS.includes(thesis.ai_revenue_reality?.label)
      ? thesis.ai_revenue_reality.label
      : "unknown";

    verdictCounts[verdict] += 1;
    negativeSeverityCounts[severity] += 1;
    revenueRealityCounts[revenue] += 1;
    for (const gap of thesis.graph?.gaps || []) {
      gapCounts[gap] = (gapCounts[gap] || 0) + 1;
    }
  }

  return {
    verdict_counts: verdictCounts,
    negative_severity_counts: negativeSeverityCounts,
    revenue_reality_counts: revenueRealityCounts,
    top_gaps: Object.entries(gapCounts)
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .slice(0, 8)
      .map(([gap, count]) => ({ gap, count })),
  };
}

function countLines(counts) {
  return Object.entries(counts || {}).map(([key, value]) => `- ${key}: ${value}`).join("\n");
}

function formatCandidate(candidate) {
  const thesis = candidate.thesis_intelligence || {};
  return `- ${candidate.ticker}: ${thesis.thesis_verdict || "WATCH_THESIS"} / ${thesis.research_action || "THESIS_MONITOR"}; confidence ${thesis.confidence_score ?? 0}; negative ${thesis.negative_catalysts?.severity || "watch"}; revenue ${thesis.ai_revenue_reality?.label || "unknown"}`;
}

function formatGaps(gaps) {
  if (!gaps.length) return "- Keine wiederkehrenden Thesis-Gaps.";
  return gaps.map((item) => `- ${item.gap}: ${item.count}`).join("\n");
}

export function renderThesisIntelligenceReport({ date, watchlist, reportPath }) {
  const candidates = watchlist.candidates || [];
  const summary = summarizeThesisIntelligence(candidates);

  return `# AI Stock Radar Thesis Intelligence - ${date}

## Kurzfazit
- Thesis Intelligence is research-only and checks thesis quality before conviction.
- Candidates reviewed: ${candidates.length}
- Negative catalysts and AI revenue reality override weak AI narratives.

## Thesis Verdicts
${candidates.length ? candidates.map(formatCandidate).join("\n") : "- Keine Kandidaten bewertet."}

## Negative Catalysts
${countLines(summary.negative_severity_counts)}

## AI Revenue Reality
${countLines(summary.revenue_reality_counts)}

## Thesis Graph Gaps
${formatGaps(summary.top_gaps)}

## Decision Inbox
- Signal: Yellow
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob spaeter zusaetzliche kostenlose Quellen fuer segmentierte AI-Umsatzbelege eingebunden werden sollen.
- BEOBACHTEN: BROKEN_THESIS, WEAK_THESIS, reality_risk und wiederkehrende Thesis-Gaps.
- SPAETER: Thesis-Gaps gegen Shadow Backtest und Paper Portfolio kalibrieren.
- BLOCKIERT: Segmentierte AI-Umsatzdaten fehlen bei vielen Small-Cap-Kandidaten.
- NICHT_TUN: Keine automatischen Trades; keine These ohne Gegenbeweis-Pruefung hochstufen.
- Naechste kleinste Aktion: Kandidaten mit THESIS_CONFIRMED_REVIEW manuell gegen Gegenbelege pruefen.
- Beleg / Datei: ${reportPath}
`;
}

export function writeThesisIntelligenceRun({ root = DEFAULT_ROOT, date = process.env.AI_STOCK_RADAR_DATE, watchlist } = {}) {
  const resolvedDate = date || new Date().toISOString().slice(0, 10);
  const reportDir = path.join(root, "reports/ai-stock-radar");
  fs.mkdirSync(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, `ai-stock-thesis-intelligence-${resolvedDate}.md`);
  fs.writeFileSync(reportPath, renderThesisIntelligenceReport({ date: resolvedDate, watchlist, reportPath }));
  return {
    reportPath,
    summary: summarizeThesisIntelligence(watchlist.candidates || []),
  };
}
