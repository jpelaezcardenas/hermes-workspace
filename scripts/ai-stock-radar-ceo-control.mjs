import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const DEFAULT_RISK_PROFILE = {
  version: 1,
  name: "CEO Conservative Research Control",
  mode: "research_only",
  allow_trading_actions: false,
  focus_requires: {
    grades: ["S", "A"],
    firewall_verdict: "pass",
    price_volume_confirmation: "positive",
  },
  blocking_risk_flags: [
    "delisting_watch",
    "going_concern_watch",
    "reverse_split_watch",
    "shell_or_spac_watch",
    "security_structure_watch",
  ],
  manual_review_risk_flags: [
    "offering_watch",
    "warrant_watch",
    "cash_runway_watch",
    "dilution_trend_watch",
    "revenue_decline_watch",
    "name_only_ai_watch",
  ],
  allowed_review_actions: [
    "CEO_VERIFY",
    "CEO_MONITOR",
    "CEO_REVIEW_RISK",
    "CEO_ARCHIVE_REVIEW",
  ],
};

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function readIfExists(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

function hasSource(candidate, pattern) {
  return (candidate.sources || []).some((source) => pattern.test(source));
}

function countBy(values) {
  return values.reduce((counts, value) => {
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
}

export function loadRiskProfile({ root = process.cwd() } = {}) {
  const profilePath = path.join(root, "projects/ai-stock-radar/risk-profile.json");
  if (!fs.existsSync(profilePath)) return DEFAULT_RISK_PROFILE;
  return {
    ...DEFAULT_RISK_PROFILE,
    ...JSON.parse(fs.readFileSync(profilePath, "utf8")),
  };
}

export function buildSourceConfidenceLedger(candidate) {
  const entries = [];
  const add = (entry) => entries.push(entry);

  add({
    label: "Listed common-equity universe",
    kind: "fact",
    confidence: hasSource(candidate, /nasdaq/i) ? "high" : "low",
    detail: "Nasdaq/NYSE listing universe hygiene check.",
  });

  add({
    label: "SEC filing activity",
    kind: "fact",
    confidence: hasSource(candidate, /sec submissions|data\.sec\.gov\/submissions/i) ? "high" : "low",
    detail: "Recent SEC forms and filing labels.",
  });

  if (candidate.fundamental_snapshot?.status === "available" || hasSource(candidate, /companyfacts/i)) {
    add({
      label: "SEC companyfacts fundamentals",
      kind: "fact",
      confidence: "high",
      detail: "Revenue, cash runway, operating cash flow, or share-count facts are available.",
    });
  } else {
    add({
      label: "SEC companyfacts fundamentals",
      kind: "missing",
      confidence: "none",
      detail: "Comparable companyfacts metrics are unavailable.",
    });
  }

  add({
    label: "AI exposure thesis",
    kind: "interpretation",
    confidence: (candidate.themes || []).some((theme) => theme !== "ai_keyword_match") ? "medium" : "low",
    detail: `Themes: ${(candidate.themes || []).join(", ") || "none"}.`,
  });

  add({
    label: "Evidence Firewall verdict",
    kind: "interpretation",
    confidence: candidate.evidence_firewall?.verdict === "pass" ? "medium" : "low",
    detail: `Verdict: ${candidate.evidence_firewall?.verdict || "unknown"}.`,
  });

  if (candidate.price_volume?.status === "available") {
    add({
      label: "Price/volume confirmation",
      kind: "fact",
      confidence: "medium",
      detail: `Confirmation: ${candidate.price_volume.confirmation || "unknown"}.`,
    });
  } else {
    add({
      label: "Price/volume confirmation",
      kind: "missing",
      confidence: "none",
      detail: "Free price/volume context is unavailable or insufficient.",
    });
  }

  return {
    entries,
    summary: {
      facts: entries.filter((entry) => entry.kind === "fact").length,
      interpretations: entries.filter((entry) => entry.kind === "interpretation").length,
      missing: entries.filter((entry) => entry.kind === "missing").length,
    },
  };
}

export function evaluateRiskProfileFit(candidate, profile = DEFAULT_RISK_PROFILE) {
  const riskFlags = unique([
    ...(candidate.evidence_firewall?.risk_flags || []),
    ...(candidate.top_risks || []).map((risk) => risk.replaceAll(" ", "_")),
  ]);
  const blocking = riskFlags.filter((flag) => (profile.blocking_risk_flags || []).includes(flag));
  const manual = riskFlags.filter((flag) => (profile.manual_review_risk_flags || []).includes(flag));

  if (
    candidate.category === "Avoid" ||
    candidate.idea_grade === "X" ||
    candidate.evidence_firewall?.verdict === "reject" ||
    blocking.length > 0
  ) {
    return {
      lane: "reject",
      action: "CEO_ARCHIVE_REVIEW",
      reasons: unique(["reject quality gate", ...blocking]),
    };
  }

  if (
    candidate.evidence_firewall?.verdict === "caution" ||
    manual.length > 0 ||
    ["CHECK_DILUTION", "DOWNGRADE_REVIEW", "ARCHIVE_REVIEW"].includes(candidate.review_action)
  ) {
    return {
      lane: "manual_review",
      action: "CEO_REVIEW_RISK",
      reasons: unique(["manual risk review", ...manual]),
    };
  }

  const focusGrades = profile.focus_requires?.grades || ["S", "A"];
  if (
    focusGrades.includes(candidate.idea_grade) &&
    candidate.evidence_firewall?.verdict === profile.focus_requires?.firewall_verdict &&
    candidate.price_volume?.confirmation === profile.focus_requires?.price_volume_confirmation
  ) {
    return {
      lane: "focus",
      action: "CEO_VERIFY",
      reasons: ["profile fit", "strong evidence stack"],
    };
  }

  return {
    lane: "monitor",
    action: "CEO_MONITOR",
    reasons: ["not enough confirmation for focus"],
  };
}

export function applyCeoControl(candidate, profile = DEFAULT_RISK_PROFILE) {
  const fit = evaluateRiskProfileFit(candidate, profile);
  const ledger = buildSourceConfidenceLedger(candidate);

  return {
    ...candidate,
    ceo_control: {
      profile: profile.name,
      lane: fit.lane,
      action: fit.action,
      reasons: fit.reasons,
    },
    source_confidence: ledger,
  };
}

export function buildFalsePositiveMemory(candidates) {
  const riskyCandidates = (candidates || []).filter((candidate) =>
    candidate.idea_grade === "X" ||
    candidate.category === "Avoid" ||
    ["caution", "reject"].includes(candidate.evidence_firewall?.verdict),
  );
  const patternCounts = countBy(riskyCandidates.flatMap((candidate) => candidate.evidence_firewall?.risk_flags || []));
  const verdictCounts = countBy((candidates || []).map((candidate) => candidate.evidence_firewall?.verdict || "unknown"));
  const actionCounts = countBy((candidates || []).map((candidate) => candidate.review_action || "unknown"));
  const calibrationNotes = [];

  for (const [pattern, count] of Object.entries(patternCounts).sort((a, b) => b[1] - a[1])) {
    if (count > 0) calibrationNotes.push(`${pattern}: ${count} candidates`);
  }
  if (calibrationNotes.length === 0) calibrationNotes.push("No recurring false-positive pattern detected.");

  return {
    version: 1,
    generated_at: new Date().toISOString(),
    candidate_count: (candidates || []).length,
    risky_candidate_count: riskyCandidates.length,
    pattern_counts: patternCounts,
    verdict_counts: verdictCounts,
    action_counts: actionCounts,
    calibration_notes: calibrationNotes,
  };
}

function checkContains({ id, filePath, text, required }) {
  const missing = required.filter((pattern) => !text.includes(pattern));
  return {
    id,
    file: filePath,
    status: missing.length === 0 ? "pass" : "fail",
    missing,
  };
}

export function buildIntegrationAudit({ root = process.cwd(), date = new Date().toISOString().slice(0, 10) } = {}) {
  const dailyPromptPath = path.join(root, "projects/ai-stock-radar/prompts/daily.md");
  const weeklyPromptPath = path.join(root, "projects/ai-stock-radar/prompts/weekly.md");
  const dailyReportPath = path.join(root, `reports/ai-stock-radar/ai-stock-radar-${date}.md`);
  const weeklyReportPath = path.join(root, "reports/ai-stock-radar/ai-stock-deepdive-2026-05-31.md");
  const shadowReportPath = path.join(root, `reports/ai-stock-radar/ai-stock-shadow-backtest-${date}.md`);
  const shadowLedgerPath = path.join(root, "projects/ai-stock-radar/shadow-backtest-ledger.json");
  const paperReportPath = path.join(root, `reports/ai-stock-radar/ai-stock-paper-portfolio-${date}.md`);
  const paperPortfolioPath = path.join(root, "projects/ai-stock-radar/paper-portfolio.json");
  const advancedReportPath = path.join(root, `reports/ai-stock-radar/ai-stock-advanced-signals-${date}.md`);
  const thesisReportPath = path.join(root, `reports/ai-stock-radar/ai-stock-thesis-intelligence-${date}.md`);
  const watchlistPath = path.join(root, "projects/ai-stock-radar/watchlist.json");
  const shadowArtifactCheck = checkContains({
    id: "shadow_backtest_artifacts",
    filePath: shadowReportPath,
    text: readIfExists(shadowReportPath),
    required: ["# AI Stock Radar Shadow Backtest", "## 30-Day Calibration"],
  });
  const paperArtifactCheck = checkContains({
    id: "paper_portfolio_artifacts",
    filePath: paperReportPath,
    text: readIfExists(paperReportPath),
    required: ["# AI Stock Radar Paper Portfolio", "## Entry Readiness"],
  });
  const advancedArtifactCheck = checkContains({
    id: "advanced_signals_artifacts",
    filePath: advancedReportPath,
    text: readIfExists(advancedReportPath),
    required: ["# AI Stock Radar Advanced Signals", "## Banger Score"],
  });
  const thesisArtifactCheck = checkContains({
    id: "thesis_intelligence_artifacts",
    filePath: thesisReportPath,
    text: readIfExists(thesisReportPath),
    required: ["# AI Stock Radar Thesis Intelligence", "## Thesis Verdicts"],
  });
  const checks = [
    checkContains({
      id: "daily_prompt_sections",
      filePath: dailyPromptPath,
      text: readIfExists(dailyPromptPath),
      required: ["Idea Grade", "Price/Volume Confirmation", "Evidence Firewall", "CEO Control", "Shadow Backtest", "Paper Portfolio", "Advanced Signal Stack", "Thesis Intelligence"],
    }),
    checkContains({
      id: "weekly_prompt_sections",
      filePath: weeklyPromptPath,
      text: readIfExists(weeklyPromptPath),
      required: ["Grade Summary", "Firewall Summary", "CEO Control Summary", "False Positive Memory", "Shadow Backtest Summary", "Paper Portfolio Summary", "Advanced Signal Summary", "Thesis Intelligence Summary"],
    }),
    checkContains({
      id: "daily_report_sections",
      filePath: dailyReportPath,
      text: readIfExists(dailyReportPath),
      required: ["## Idea Grade", "## Price/Volume Confirmation", "## Evidence Firewall", "## CEO Control", "## Advanced Signal Stack", "## Thesis Intelligence"],
    }),
    checkContains({
      id: "weekly_report_sections",
      filePath: weeklyReportPath,
      text: readIfExists(weeklyReportPath),
      required: ["## Grade Summary", "## Firewall Summary", "## CEO Control Summary", "## False Positive Memory", "## Shadow Backtest Summary", "## Paper Portfolio Summary", "## Advanced Signal Summary", "## Thesis Intelligence Summary"],
    }),
    checkContains({
      id: "idea_grade_module",
      filePath: path.join(root, "scripts/ai-stock-radar-idea-grade.mjs"),
      text: readIfExists(path.join(root, "scripts/ai-stock-radar-idea-grade.mjs")),
      required: ["assignIdeaGrade"],
    }),
    checkContains({
      id: "firewall_module",
      filePath: path.join(root, "scripts/ai-stock-radar-evidence-firewall.mjs"),
      text: readIfExists(path.join(root, "scripts/ai-stock-radar-evidence-firewall.mjs")),
      required: ["applyEvidenceFirewall"],
    }),
    checkContains({
      id: "shadow_backtest_module",
      filePath: path.join(root, "scripts/ai-stock-radar-shadow-backtest.mjs"),
      text: readIfExists(path.join(root, "scripts/ai-stock-radar-shadow-backtest.mjs")),
      required: ["writeShadowBacktestRun"],
    }),
    checkContains({
      id: "paper_portfolio_module",
      filePath: path.join(root, "scripts/ai-stock-radar-paper-portfolio.mjs"),
      text: readIfExists(path.join(root, "scripts/ai-stock-radar-paper-portfolio.mjs")),
      required: ["writePaperPortfolioRun"],
    }),
    checkContains({
      id: "advanced_signals_module",
      filePath: path.join(root, "scripts/ai-stock-radar-advanced-signals.mjs"),
      text: readIfExists(path.join(root, "scripts/ai-stock-radar-advanced-signals.mjs")),
      required: ["writeAdvancedSignalsRun"],
    }),
    checkContains({
      id: "thesis_intelligence_module",
      filePath: path.join(root, "scripts/ai-stock-radar-thesis-intelligence.mjs"),
      text: readIfExists(path.join(root, "scripts/ai-stock-radar-thesis-intelligence.mjs")),
      required: ["writeThesisIntelligenceRun"],
    }),
    {
      ...shadowArtifactCheck,
      status: fs.existsSync(shadowLedgerPath) && shadowArtifactCheck.status === "pass" ? "pass" : "fail",
    },
    {
      ...paperArtifactCheck,
      status: fs.existsSync(paperPortfolioPath) && paperArtifactCheck.status === "pass" ? "pass" : "fail",
    },
    advancedArtifactCheck,
    thesisArtifactCheck,
  ];

  try {
    const watchlist = JSON.parse(readIfExists(watchlistPath));
    const candidates = watchlist.candidates || [];
    checks.push({
      id: "watchlist_candidate_fields",
      file: watchlistPath,
      status: candidates.length > 0 && candidates.every((candidate) =>
        candidate.idea_grade &&
        candidate.evidence_firewall &&
        candidate.ceo_control &&
        candidate.source_confidence &&
        candidate.entry_readiness &&
        candidate.advanced_signals &&
        candidate.thesis_intelligence
      ) ? "pass" : "fail",
      missing: [],
    });
  } catch {
    checks.push({
      id: "watchlist_candidate_fields",
      file: watchlistPath,
      status: "fail",
      missing: ["watchlist unreadable"],
    });
  }

  return {
    date,
    status: checks.every((check) => check.status === "pass") ? "pass" : "fail",
    checks,
  };
}

export function renderIntegrationAuditReport({ audit, reportPath }) {
  return `# AI Stock Radar CEO Audit - ${audit.date}

Status: ${audit.status}

## Checks
${audit.checks.map((check) => `- ${check.id}: ${check.status}${check.missing?.length ? ` (missing: ${check.missing.join(", ")})` : ""}`).join("\n")}

## Decision Inbox
- Signal: ${audit.status === "pass" ? "Green" : "Yellow"}
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Keine Trading-Entscheidung; nur ob weitere Research-Gates gewuenscht sind.
- BEOBACHTEN: Checks mit fail oder fehlenden Report-Sektionen.
- SPAETER: Cron-Historie ueber mehrere Laeufe vergleichen.
- BLOCKIERT: ${audit.status === "pass" ? "nichts" : "Mindestens ein Integrationscheck ist nicht vollstaendig."}
- NICHT_TUN: Keine automatischen Trades; keine Schlussfolgerung aus einem Audit allein.
- Naechste kleinste Aktion: ${audit.status === "pass" ? "naechsten planmaessigen Lauf abwarten" : "fehlenden Check reparieren"}
- Beleg / Datei: ${reportPath}
`;
}

export function writeIntegrationAudit({ root = process.cwd(), date = new Date().toISOString().slice(0, 10) } = {}) {
  const audit = buildIntegrationAudit({ root, date });
  const reportDir = path.join(root, "reports/ai-stock-radar");
  fs.mkdirSync(reportDir, { recursive: true });
  const reportPath = path.join(reportDir, `ai-stock-radar-ceo-audit-${date}.md`);
  fs.writeFileSync(reportPath, renderIntegrationAuditReport({ audit, reportPath }));
  return { audit, reportPath };
}

function isCliRun() {
  return process.argv[1] === fileURLToPath(import.meta.url);
}

if (isCliRun()) {
  const result = writeIntegrationAudit({ root: process.cwd(), date: process.env.AI_STOCK_RADAR_DATE });
  console.log(`AI_STOCK_CEO_AUDIT_REPORT=${result.reportPath}`);
  console.log(`AI_STOCK_CEO_AUDIT_STATUS=${result.audit.status}`);
}
