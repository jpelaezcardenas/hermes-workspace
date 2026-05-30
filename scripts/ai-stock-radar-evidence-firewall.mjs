const REJECT_RISKS = new Set([
  "delisting_watch",
  "going_concern_watch",
  "reverse_split_watch",
  "shell_or_spac_watch",
]);

const DILUTION_RISKS = new Set([
  "offering_watch",
  "warrant_watch",
  "dilution_trend_watch",
  "cash_runway_watch",
]);

const CATEGORY_RANK = {
  Avoid: 0,
  Overheated: 1,
  "Early Watch": 2,
  "Breakout Watch": 3,
  "Deep Dive": 4,
};

const REVENUE_TAGS = [
  "RevenueFromContractWithCustomerExcludingAssessedTax",
  "Revenues",
  "SalesRevenueNet",
];

const CASH_TAGS = [
  "CashAndCashEquivalentsAtCarryingValue",
  "CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents",
  "CashAndCashEquivalentsFairValueDisclosure",
];

const OPERATING_CASH_FLOW_TAGS = [
  "NetCashProvidedByUsedInOperatingActivities",
  "NetCashProvidedByUsedInOperatingActivitiesContinuingOperations",
];

const SHARE_TAGS = [
  "EntityCommonStockSharesOutstanding",
  "WeightedAverageNumberOfDilutedSharesOutstanding",
  "WeightedAverageNumberOfSharesOutstandingBasic",
];

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function roundMetric(value, digits = 2) {
  if (!Number.isFinite(value)) return null;
  const scale = 10 ** digits;
  return Math.round(value * scale) / scale;
}

function includesAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function hasItem(items, code) {
  return (items || []).some((item) => String(item).trim().startsWith(code));
}

function addIf(condition, list, label) {
  if (condition) list.push(label);
}

export function decodeFilingEvents({ forms = [], items = [], descriptions = [] } = {}) {
  const text = `${forms.join(" ")} ${items.join(" ")} ${descriptions.join(" ")}`.toLowerCase();
  const positiveLabels = [];
  const riskLabels = [];

  addIf(hasItem(items, "1.01") || /material definitive agreement/.test(text), positiveLabels, "material_agreement");
  addIf(/major customer|customer agreement|contract award|purchase order/.test(text), positiveLabels, "major_customer");
  addIf(hasItem(items, "2.02") || /results of operations|financial condition|guidance|earnings/.test(text), positiveLabels, "earnings_or_guidance_context");
  addIf(/merger|acquisition|business combination/.test(text), positiveLabels, "ma_catalyst");

  addIf(hasItem(items, "3.01") || /delisting|nasdaq non-compliance|minimum bid|listing rule/.test(text), riskLabels, "delisting_watch");
  addIf(hasItem(items, "3.02") || /offering|registered direct|atm program|private placement/.test(text), riskLabels, "offering_watch");
  addIf(/warrant|warrants/.test(text), riskLabels, "warrant_watch");
  addIf(hasItem(items, "5.03") && /reverse stock split|reverse split/.test(text), riskLabels, "reverse_split_watch");
  addIf(/going concern|substantial doubt/.test(text), riskLabels, "going_concern_watch");
  addIf(/shell company|blank check|spac/.test(text), riskLabels, "shell_or_spac_watch");

  const positive_labels = unique(positiveLabels);
  const risk_labels = unique(riskLabels);

  return {
    positive_labels,
    risk_labels,
    hard_catalyst: positive_labels.some((label) =>
      ["material_agreement", "major_customer", "ma_catalyst"].includes(label),
    ),
    hard_blocker: risk_labels.some((label) => REJECT_RISKS.has(label)),
  };
}

function factsForTags(companyFacts, tags, unitNames) {
  const usGaap = companyFacts?.facts?.["us-gaap"] || {};
  const facts = [];

  for (const tag of tags) {
    const units = usGaap[tag]?.units || {};
    for (const unitName of unitNames) {
      for (const fact of units[unitName] || []) {
        if (!Number.isFinite(fact.val)) continue;
        facts.push({
          tag,
          unit: unitName,
          form: fact.form,
          fy: Number(fact.fy),
          fp: fact.fp,
          end: fact.end,
          filed: fact.filed,
          val: fact.val,
        });
      }
    }
  }

  return facts
    .filter((fact) => Number.isFinite(fact.fy) && fact.fp && (fact.end || fact.filed))
    .sort((left, right) => String(left.end || left.filed).localeCompare(String(right.end || right.filed)));
}

function latestFact(facts) {
  return facts.length ? facts[facts.length - 1] : null;
}

function priorComparableFact(facts, latest) {
  if (!latest) return null;
  return [...facts]
    .reverse()
    .find((fact) => fact !== latest && fact.fp === latest.fp && fact.fy === latest.fy - 1);
}

function growthPct(latest, prior) {
  if (!latest || !prior || prior.val === 0) return null;
  return roundMetric(((latest.val - prior.val) / Math.abs(prior.val)) * 100, 2);
}

function operatingCashFlowAsQuarterlyBurn(fact) {
  if (!fact || fact.val >= 0) return null;
  const burn = Math.abs(fact.val);
  return fact.fp === "FY" ? burn / 4 : burn;
}

export function evaluateFundamentalSnapshot(companyFacts) {
  const revenueFacts = factsForTags(companyFacts, REVENUE_TAGS, ["USD"]);
  const cashFacts = factsForTags(companyFacts, CASH_TAGS, ["USD"]);
  const operatingCashFlowFacts = factsForTags(companyFacts, OPERATING_CASH_FLOW_TAGS, ["USD"]);
  const shareFacts = factsForTags(companyFacts, SHARE_TAGS, ["shares"]);

  const latestRevenue = latestFact(revenueFacts);
  const priorRevenue = priorComparableFact(revenueFacts, latestRevenue);
  const latestCash = latestFact(cashFacts);
  const latestOperatingCashFlow = latestFact(operatingCashFlowFacts);
  const latestShares = latestFact(shareFacts);
  const priorShares = priorComparableFact(shareFacts, latestShares);

  const revenueGrowth = growthPct(latestRevenue, priorRevenue);
  const shareGrowth = growthPct(latestShares, priorShares);
  const quarterlyBurn = operatingCashFlowAsQuarterlyBurn(latestOperatingCashFlow);
  const cashRunway = latestCash && quarterlyBurn ? roundMetric(latestCash.val / quarterlyBurn, 2) : null;

  const hasAnyMetric = [revenueGrowth, latestCash?.val, latestOperatingCashFlow?.val, shareGrowth].some(Number.isFinite);
  if (!hasAnyMetric) {
    return {
      status: "unavailable",
      risks: [],
      supports: [],
      reason: "no comparable SEC companyfacts metrics",
    };
  }

  const risks = [];
  const supports = [];

  if (Number.isFinite(cashRunway) && cashRunway < 2) risks.push("cash_runway_watch");
  if (Number.isFinite(shareGrowth) && shareGrowth > 20) risks.push("dilution_trend_watch");
  if (Number.isFinite(revenueGrowth) && revenueGrowth < -30) risks.push("revenue_decline_watch");

  if (Number.isFinite(revenueGrowth) && revenueGrowth >= 20) supports.push("revenue_growth_support");
  if (Number.isFinite(cashRunway) && cashRunway >= 4) supports.push("cash_runway_support");

  return {
    status: "available",
    revenue_growth_yoy_pct: revenueGrowth,
    latest_cash: latestCash?.val ?? null,
    latest_operating_cash_flow: latestOperatingCashFlow?.val ?? null,
    cash_runway_quarters: cashRunway,
    share_count_growth_yoy_pct: shareGrowth,
    risks: unique(risks),
    supports: unique(supports),
  };
}

function stricterCategory(left, right) {
  if (!left) return right;
  if (!right) return left;
  return CATEGORY_RANK[left] <= CATEGORY_RANK[right] ? left : right;
}

function noteForFlag(flag) {
  return flag.replaceAll("_", " ");
}

export function applyEvidenceFirewall({
  filingEvents = decodeFilingEvents(),
  fundamentalSnapshot = { status: "unavailable", risks: [], supports: [] },
  existingRiskFlags = [],
} = {}) {
  const riskFlags = unique([
    ...existingRiskFlags,
    ...(filingEvents.risk_labels || []),
    ...(fundamentalSnapshot.risks || []),
  ]);
  const hardBlocker = filingEvents.hard_blocker || riskFlags.some((flag) => REJECT_RISKS.has(flag));
  let scorePenalty = 0;
  let maxCategory = null;
  const notes = [];

  if (hardBlocker) {
    scorePenalty += 30;
    maxCategory = "Avoid";
  }

  if (riskFlags.some((flag) => ["offering_watch", "warrant_watch"].includes(flag))) {
    scorePenalty += 15;
    maxCategory = stricterCategory(maxCategory, "Early Watch");
  }
  if (riskFlags.includes("cash_runway_watch")) {
    scorePenalty += 14;
    maxCategory = stricterCategory(maxCategory, "Early Watch");
  }
  if (riskFlags.includes("dilution_trend_watch")) {
    scorePenalty += 12;
    maxCategory = stricterCategory(maxCategory, "Early Watch");
  }
  if (riskFlags.includes("revenue_decline_watch")) {
    scorePenalty += 8;
    maxCategory = stricterCategory(maxCategory, "Breakout Watch");
  }

  notes.push(...riskFlags.map(noteForFlag));
  if (fundamentalSnapshot.status !== "available") {
    notes.push("SEC companyfacts fundamentals unavailable");
  }

  const verdict = hardBlocker
    ? "reject"
    : riskFlags.length > 0 || fundamentalSnapshot.status !== "available"
      ? "caution"
      : "pass";

  return {
    verdict,
    risk_flags: riskFlags,
    positive_labels: filingEvents.positive_labels || [],
    support_labels: fundamentalSnapshot.supports || [],
    score_penalty: scorePenalty,
    max_category: maxCategory,
    notes: unique(notes),
  };
}

export function chooseReviewAction(firewall) {
  const riskFlags = firewall?.risk_flags || [];

  if (firewall?.verdict === "reject") return "ARCHIVE_REVIEW";
  if (riskFlags.some((flag) => DILUTION_RISKS.has(flag))) return "CHECK_DILUTION";
  if (firewall?.verdict === "pass" && (firewall.positive_labels || []).length > 0) return "VERIFY_CATALYST";
  if (firewall?.verdict === "caution") return "DOWNGRADE_REVIEW";
  return "WAIT_FOR_CONFIRMATION";
}
