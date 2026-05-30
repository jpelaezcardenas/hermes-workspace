const SEVERE_RISK_PATTERNS = [
  /name[-_ ]only/i,
  /going concern/i,
  /reverse split/i,
  /shell/i,
  /security structure/i,
];

const SUBSTANCE_THEMES = [
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

export function gradeSortRank(grade) {
  return {
    S: 0,
    A: 1,
    B: 2,
    C: 3,
    X: 4,
  }[grade] ?? 5;
}

function textIncludesSevereRisk(candidate) {
  const text = [
    candidate.category,
    ...(candidate.top_risks || []),
    ...(candidate.quality_notes || []),
  ].join(" ");

  return SEVERE_RISK_PATTERNS.some((pattern) => pattern.test(text));
}

function hasOnlyGenericAiTheme(candidate) {
  const themes = candidate.themes || [];
  return themes.length > 0 && themes.every((theme) => theme === "ai_keyword_match");
}

function hasSubstanceTheme(candidate) {
  const themes = candidate.themes || [];
  return themes.length === 0 || themes.some((theme) => SUBSTANCE_THEMES.includes(theme));
}

function hasPositivePriceVolume(candidate) {
  return candidate.price_volume?.status === "available" && candidate.price_volume?.confirmation === "positive";
}

function hasHardCatalyst(candidate) {
  return (
    candidate.catalyst >= 18 ||
    (candidate.catalyst_labels || []).some((label) =>
      ["hard_catalyst", "contract_award", "material_guidance_change", "major_customer"].includes(label),
    )
  );
}

function firewallVerdict(candidate) {
  return candidate.evidence_firewall?.verdict || "caution";
}

export function assignIdeaGrade(candidate) {
  const reasons = [];
  const usableData = candidate.data_quality === "A" || candidate.data_quality === "B";
  const positivePriceVolume = hasPositivePriceVolume(candidate);
  const hardCatalyst = hasHardCatalyst(candidate);
  const firewall = firewallVerdict(candidate);

  if (firewall === "reject" || candidate.category === "Avoid" || textIncludesSevereRisk(candidate) || hasOnlyGenericAiTheme(candidate) || candidate.score < 45) {
    return {
      grade: "X",
      reasons: ["reject/avoid quality gate triggered"],
    };
  }

  if (candidate.score >= 85 && usableData && firewall === "pass" && hasSubstanceTheme(candidate) && hardCatalyst && positivePriceVolume) {
    reasons.push("high score", "usable data quality", "hard catalyst", "price/volume confirmation");
    return { grade: "S", reasons };
  }

  if (candidate.score >= 75 && usableData && firewall === "pass" && hasSubstanceTheme(candidate) && (hardCatalyst || positivePriceVolume)) {
    reasons.push("strong score", "usable data quality", hardCatalyst ? "catalyst strength" : "price/volume confirmation");
    return { grade: "A", reasons };
  }

  if (candidate.score >= 65 && usableData) {
    reasons.push("watchable score with evidence gaps");
    return { grade: "B", reasons };
  }

  if (candidate.score >= 50) {
    reasons.push("low-confidence watch only");
    return { grade: "C", reasons };
  }

  return {
    grade: "X",
    reasons: ["score below quality threshold"],
  };
}
