const STRUCTURE_RISK_PATTERNS = [
  /\bwarrants?\b/i,
  /\bunits?\b/i,
  /\brights?\b/i,
  /\bpreferred\b/i,
  /\bfund\b/i,
  /\betf\b/i,
];

const SEED_OR_SUBSTANCE_THEMES = [
  "ai_infrastructure",
  "cloud_compute",
  "gpu_capacity",
  "ai_healthcare",
  "data_platform",
  "precision_medicine",
  "voice_ai",
  "enterprise_ai_software",
  "automotive_ai",
  "ai_biotech",
  "drug_discovery",
  "defense_ai",
  "robotics",
  "automation",
];

function unique(values) {
  return [...new Set((values || []).filter(Boolean))];
}

function daysBetween(startDate, endDate) {
  const start = Date.parse(startDate);
  const end = Date.parse(endDate);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return 0;
  return Math.max(0, Math.floor((end - start) / 86_400_000));
}

export function extractFilingQualityLabels(descriptions) {
  const text = (descriptions || []).join("\n").toLowerCase();
  const labels = [];

  if (/results of operations|financial condition|guidance|earnings/.test(text)) {
    labels.push("earnings_or_guidance_context");
  }
  if (/offering|registered direct|atm program|warrant/.test(text)) {
    labels.push("offering_watch");
  }
  if (/going concern|substantial doubt/.test(text)) {
    labels.push("going_concern_watch");
  }
  if (/reverse stock split|reverse split/.test(text)) {
    labels.push("reverse_split_watch");
  }
  if (/merger|acquisition|business combination/.test(text)) {
    labels.push("ma_catalyst");
  }
  if (/shell company|spac|blank check/.test(text)) {
    labels.push("shell_or_spac_watch");
  }

  return unique(labels);
}

export function evaluateEvidenceQuality(record) {
  const themes = unique(record.themes);
  const catalystLabels = unique(record.catalyst_labels);
  const existingRiskFlags = unique(record.risk_flags);
  const sourceTypes = unique(record.source_types);
  const riskFlags = [...existingRiskFlags];
  const qualityNotes = [];
  let scorePenalty = 0;
  let maxCategory = "Deep Dive";

  const hasOnlyAiKeywordTheme = themes.length > 0 && themes.every((theme) => theme === "ai_keyword_match");
  const hasSubstanceTheme = themes.some((theme) => SEED_OR_SUBSTANCE_THEMES.includes(theme));

  if (hasOnlyAiKeywordTheme && !hasSubstanceTheme) {
    riskFlags.push("name_only_ai_watch");
    qualityNotes.push("name-only AI evidence; needs manual substance check");
    scorePenalty += 25;
    maxCategory = "Early Watch";
  }

  if (STRUCTURE_RISK_PATTERNS.some((pattern) => pattern.test(record.security_name || ""))) {
    riskFlags.push("security_structure_watch");
    qualityNotes.push("security structure is not clean common equity");
    scorePenalty += 40;
    maxCategory = "Avoid";
  }

  for (const label of catalystLabels) {
    if (["offering_watch", "going_concern_watch", "reverse_split_watch", "shell_or_spac_watch"].includes(label)) {
      riskFlags.push(label);
      qualityNotes.push(label.replaceAll("_", " "));
      scorePenalty += label === "offering_watch" ? 12 : 18;
      if (label !== "offering_watch") maxCategory = "Avoid";
    }
  }

  if (sourceTypes.length <= 1) {
    qualityNotes.push("single public source only");
    scorePenalty += 10;
  }

  return {
    riskFlags: unique(riskFlags),
    qualityNotes: unique(qualityNotes),
    scorePenalty,
    maxCategory,
  };
}

export function applyQualityPenalty({ score, penalty }) {
  return Math.max(0, score - penalty);
}

export function limitCategoryByQuality({ category, maxCategory }) {
  const rank = {
    Avoid: 0,
    Overheated: 1,
    "Early Watch": 2,
    "Breakout Watch": 3,
    "Deep Dive": 4,
  };

  if (!maxCategory || rank[category] <= rank[maxCategory]) return category;
  return maxCategory;
}

export function updateCandidateAging({ candidate, date }) {
  const firstSeen = candidate.first_seen || candidate.last_checked || date;
  const ageDays = daysBetween(firstSeen, date);
  let status = candidate.status || "fresh";

  if (ageDays >= 14 && (candidate.score < 55 || candidate.data_quality === "C" || candidate.data_quality === "D")) {
    status = "stale";
  } else if (ageDays >= 7 && status === "fresh") {
    status = "watching";
  }

  return {
    ...candidate,
    first_seen: firstSeen,
    age_days: ageDays,
    status,
  };
}

export function classifyCalibrationBucket(candidate) {
  const notes = (candidate.quality_notes || []).join(" ").toLowerCase();

  if (notes.includes("name-only") && candidate.score < 55) {
    return "false_positive_review";
  }
  if (candidate.status === "stale" && (candidate.data_quality === "D" || candidate.score < 45)) {
    return "archive_review";
  }
  if (candidate.status === "stale" || candidate.score < 55 || candidate.data_quality === "C") {
    return "downgrade_review";
  }
  return "keep_review";
}
