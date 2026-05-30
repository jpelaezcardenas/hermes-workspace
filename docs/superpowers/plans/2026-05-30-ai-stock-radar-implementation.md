# AI Stock Radar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Phase 1 of `AI_STOCK_RADAR`: a read-only Hermes skill, initial watchlist state, deterministic dry-run report generator, report validation, and recurring Hermes job wiring.

**Architecture:** The first slice is report-first and provider-neutral. Hermes gets a reusable `ai-stock-radar` skill, project state under `projects/ai-stock-radar/`, reports under `reports/ai-stock-radar/`, a tested dry-run script for safe verification, and cron jobs that use Hermes' existing Decision Inbox pattern.

**Tech Stack:** Hermes local skills, Hermes cron, Markdown reports, JSON state, Node.js ESM, Vitest, shell verification commands.

---

## Scope Check

This plan implements only Phase 1 from `/Users/zondrius/hermes-workspace/docs/superpowers/specs/2026-05-30-ai-stock-radar-design.md`.

Included:

- Create the `ai-stock-radar` Hermes skill in the user-local and Neva profile skill trees.
- Create initial project directories and `watchlist.json`.
- Add a deterministic no-provider dry-run generator.
- Add tests for report structure, Decision Inbox safety, dossier limits, and `Deep Dive` data-quality rules.
- Add prompt source files and Hermes cron jobs after the dry run works.

Excluded from this plan:

- Paid market/news provider setup.
- Broker connections.
- UI.
- Backtesting.
- Automatic trading.

## File Structure

- Create: `/Users/zondrius/.hermes/skills/finance/ai-stock-radar/SKILL.md`
  - Global Hermes skill used by recurring jobs and manual runs.
- Create: `/Users/zondrius/.hermes/profiles/neva/skills/finance/ai-stock-radar/SKILL.md`
  - Neva profile copy so the `neva` profile can resolve the skill.
- Create: `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/watchlist.json`
  - Versioned watchlist state and provider status.
- Create: `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/dossiers/.gitkeep`
  - Keeps the dossier directory visible before the first dossier.
- Create: `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/prompts/daily.md`
  - Source prompt for `AI_STOCK_RADAR_DAILY`.
- Create: `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/prompts/weekly.md`
  - Source prompt for `AI_STOCK_DEEPDIVE_WEEKLY`.
- Create: `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/.gitkeep`
  - Keeps the report directory visible before the first generated report.
- Create: `/Users/zondrius/hermes-workspace/scripts/ai-stock-radar-dry-run.mjs`
  - No-provider report generator and validation helpers.
- Create: `/Users/zondrius/hermes-workspace/scripts/ai-stock-radar-dry-run.test.mjs`
  - Vitest coverage for safety and report shape.
- Modify: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
  - Add two Hermes cron jobs through `hermes cron create`, not by hand-editing JSON.

## Task 1: Add Hermes Skill

**Files:**
- Create: `/Users/zondrius/.hermes/skills/finance/ai-stock-radar/SKILL.md`
- Create: `/Users/zondrius/.hermes/profiles/neva/skills/finance/ai-stock-radar/SKILL.md`

- [ ] **Step 1: Verify the skill is absent**

Run:

```bash
test ! -f /Users/zondrius/.hermes/skills/finance/ai-stock-radar/SKILL.md
test ! -f /Users/zondrius/.hermes/profiles/neva/skills/finance/ai-stock-radar/SKILL.md
```

Expected: both commands exit with status `0`.

- [ ] **Step 2: Create the global skill**

Create `/Users/zondrius/.hermes/skills/finance/ai-stock-radar/SKILL.md` with this exact content:

```markdown
---
name: ai-stock-radar
description: Use when Hermes scans, scores, reports, or reviews AI-related public equities as a read-only radar with watchlists, dossiers, Decision Inbox output, and strict no-trading safety gates.
version: 1.0.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [finance, ai-stocks, radar, watchlist, riskgate, decision-inbox]
    related_skills: [hermes-agent-operating-system, hermes-decision-inbox, github-rising-integration]
---

# AI Stock Radar

## Overview

This skill turns AI stock research into a cautious Hermes radar. It finds and explains public-market AI candidates, keeps a watchlist, writes Markdown reports, creates research dossiers only when trigger rules fire, and always ends with a Decision Inbox block.

The skill is read-only. It does not trade, connect brokers, recommend certainty, or turn weak data into high-confidence signals.

## When to Use

Use this skill when:

- running `AI_STOCK_RADAR_DAILY`;
- running `AI_STOCK_DEEPDIVE_WEEKLY`;
- creating or refreshing `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/watchlist.json`;
- writing reports under `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/`;
- creating dossiers under `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/dossiers/`;
- reviewing AI public-equity candidates from a finance, research, or market-trend angle.

Do not use this skill for:

- broker setup;
- order execution;
- options, leverage, margin, or real-money trading workflows;
- penny-stock, pump, Discord, or meme-signal workflows;
- unsupported claims that a stock will certainly rise.

## Required Workflow

1. Load the current watchlist.
2. Check configured data source availability.
3. Gather market, filing, news, and AI-sector context from approved sources.
4. Score candidates.
5. Apply RiskGate and data-quality gates.
6. Update categories.
7. Create or refresh dossiers only when trigger rules fire.
8. Write the daily or weekly report.
9. End with the Decision Inbox block.
10. Explicitly name tempting actions that should not be taken automatically.

## Categories

| Category | Meaning |
|---|---|
| `Early Watch` | Interesting, but not enough evidence for a deep dive. |
| `Breakout Watch` | Multiple signals are aligning. |
| `Deep Dive` | Score is high, data quality is `A` or `B`, and a current thesis or catalyst exists. |
| `Overheated` | Momentum looks late, parabolic, or detached from new evidence. |
| `Avoid` | Weak substance, poor data, hype behavior, unclear AI exposure, or unacceptable risk. |

## Score Contract

Maximum score: 100.

- `AI relevance` 0-20.
- `Catalyst` 0-20.
- `Market momentum` 0-20.
- `Earliness` 0-15.
- `Fundamental quality` 0-15.
- `Signal breadth` 0-10.

Every high score needs a short reason. A score without explanation is invalid.

## Data Quality

| Grade | Meaning |
|---|---|
| `A` | Multiple independent, fresh, plausible sources. |
| `B` | Usable with some gaps. |
| `C` | Thin, stale, or single-source. |
| `D` | Not suitable for decisions. |

Only `A` or `B` can become `Deep Dive`.

## Dossier Rules

Create or refresh at most 3 dossiers per daily run.

Dossier triggers:

- Score is 75 or higher with data quality `A` or `B`.
- Score increased by 15 or more since the previous run.
- A new hard catalyst appears.
- Price, volume, and news all become unusual at the same time.
- A watchlist candidate changes category into `Deep Dive`, `Overheated`, or `Avoid`.

Dossier creation is not promotion. A `C` or `D` candidate may receive a cautionary dossier after becoming `Overheated` or `Avoid`, but it cannot become `Deep Dive`.

## Report Shape

Daily reports must use:

```markdown
# AI Stock Radar - YYYY-MM-DD

## Kurzfazit
## Marktumfeld
## Top Kandidaten Heute
## Neue Auffaelligkeiten
## Watchlist Aenderungen
## Deep-Dive Kandidaten
## Overheated / Avoid
## Datenqualitaet Und Luecken
## Naechste Aktion

## Decision Inbox
- Signal: Green / Yellow / Red
- SOFORT_MACHEN:
- CHRIS_ENTSCHEIDET:
- BEOBACHTEN:
- SPAETER:
- BLOCKIERT:
- NICHT_TUN:
- Naechste kleinste Aktion:
- Beleg / Datei:
```

## Decision Inbox Safety

- `SOFORT_MACHEN` contains at most one small safe action.
- `SOFORT_MACHEN` cannot be a trade.
- `CHRIS_ENTSCHEIDET` includes paid providers, API keys, broker setup, purchases, leverage, options, and any alert with trade character.
- `NICHT_TUN` must warn against automatic trades and hype chasing.
- Weak data must be visible, not hidden.

## Approved Baseline Sources

- SEC EDGAR APIs and bulk data.
- Nasdaq symbol directory.
- FINRA public data, interpreted cautiously.

Paid or key-based market/news providers require `CHRIS_ENTSCHEIDET` before setup.

## Common Pitfalls

1. Treating a dossier as a promotion. A cautionary dossier can exist for `Overheated` or `Avoid`.
2. Letting one news item drive a category change. Promotion needs source breadth or a hard catalyst.
3. Hiding missing market data. Missing data makes the report Yellow.
4. Using trade language. The radar can say "watch", "review", or "risk"; it must not say what to trade.
5. Growing the watchlist forever. Weekly reviews must prune stale candidates.

## Verification Checklist

- [ ] Report includes all required sections.
- [ ] Decision Inbox has at most one `SOFORT_MACHEN` item.
- [ ] `Deep Dive` is blocked for data quality `C` or `D`.
- [ ] No automatic trading language appears.
- [ ] No more than 3 dossiers are created in a daily run.
- [ ] Weak or missing data appears under `Datenqualitaet Und Luecken`.
```

- [ ] **Step 3: Copy the skill into Neva's profile**

Run:

```bash
mkdir -p /Users/zondrius/.hermes/profiles/neva/skills/finance/ai-stock-radar
cp /Users/zondrius/.hermes/skills/finance/ai-stock-radar/SKILL.md \
  /Users/zondrius/.hermes/profiles/neva/skills/finance/ai-stock-radar/SKILL.md
```

Expected: command exits with status `0`.

- [ ] **Step 4: Validate both skill files**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
import re
import yaml

paths = [
    Path("/Users/zondrius/.hermes/skills/finance/ai-stock-radar/SKILL.md"),
    Path("/Users/zondrius/.hermes/profiles/neva/skills/finance/ai-stock-radar/SKILL.md"),
]

for path in paths:
    content = path.read_text()
    assert content.startswith("---"), path
    match = re.search(r"\n---\s*\n", content[3:])
    assert match, path
    frontmatter = yaml.safe_load(content[3:match.start() + 3])
    assert frontmatter["name"] == "ai-stock-radar", path
    assert "description" in frontmatter, path
    assert len(frontmatter["description"]) <= 1024, path
    assert "# AI Stock Radar" in content, path

print("ai-stock-radar skill validation passed")
PY
```

Expected: `ai-stock-radar skill validation passed`.

## Task 2: Create Project State Directories

**Files:**
- Create: `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/watchlist.json`
- Create: `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/dossiers/.gitkeep`
- Create: `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/prompts/.gitkeep`
- Create: `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/.gitkeep`

- [ ] **Step 1: Verify the watchlist is absent**

Run:

```bash
test ! -f /Users/zondrius/hermes-workspace/projects/ai-stock-radar/watchlist.json
```

Expected: command exits with status `0`.

- [ ] **Step 2: Create directories and initial watchlist**

Create the directories:

```bash
mkdir -p /Users/zondrius/hermes-workspace/projects/ai-stock-radar/dossiers
mkdir -p /Users/zondrius/hermes-workspace/projects/ai-stock-radar/prompts
mkdir -p /Users/zondrius/hermes-workspace/reports/ai-stock-radar
```

Create `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/watchlist.json` with this exact content:

```json
{
  "version": 1,
  "updated_at": "2026-05-30",
  "provider_status": {
    "market_data": "not_configured",
    "filings": "available",
    "news": "not_configured"
  },
  "candidates": []
}
```

Create empty marker files:

```bash
touch /Users/zondrius/hermes-workspace/projects/ai-stock-radar/dossiers/.gitkeep
touch /Users/zondrius/hermes-workspace/projects/ai-stock-radar/prompts/.gitkeep
touch /Users/zondrius/hermes-workspace/reports/ai-stock-radar/.gitkeep
```

- [ ] **Step 3: Validate the watchlist JSON**

Run:

```bash
python3 - <<'PY'
import json
from pathlib import Path

path = Path("/Users/zondrius/hermes-workspace/projects/ai-stock-radar/watchlist.json")
data = json.loads(path.read_text())
assert data["version"] == 1
assert data["provider_status"]["market_data"] == "not_configured"
assert data["provider_status"]["filings"] == "available"
assert data["provider_status"]["news"] == "not_configured"
assert data["candidates"] == []
print("watchlist validation passed")
PY
```

Expected: `watchlist validation passed`.

- [ ] **Step 4: Commit project state**

Run:

```bash
cd /Users/zondrius/hermes-workspace
git add projects/ai-stock-radar/watchlist.json \
  projects/ai-stock-radar/dossiers/.gitkeep \
  projects/ai-stock-radar/prompts/.gitkeep \
  reports/ai-stock-radar/.gitkeep
git commit -m "feat: initialize AI stock radar state"
```

Expected: commit succeeds and stages no unrelated files.

## Task 3: Add Failing Dry-Run Tests

**Files:**
- Create: `/Users/zondrius/hermes-workspace/scripts/ai-stock-radar-dry-run.test.mjs`

- [ ] **Step 1: Create the test file**

Create `/Users/zondrius/hermes-workspace/scripts/ai-stock-radar-dry-run.test.mjs` with this exact content:

```javascript
import { describe, expect, it } from "vitest";

import {
  FORBIDDEN_LANGUAGE,
  candidateCanDeepDive,
  countSofortMachenItems,
  renderDailyReport,
  selectDossierCandidates,
  validateWatchlist,
} from "./ai-stock-radar-dry-run.mjs";

const baseWatchlist = {
  version: 1,
  updated_at: "2026-05-30",
  provider_status: {
    market_data: "not_configured",
    filings: "available",
    news: "not_configured",
  },
  candidates: [],
};

describe("AI stock radar dry run", () => {
  it("validates the initial watchlist shape", () => {
    expect(() => validateWatchlist(baseWatchlist)).not.toThrow();
  });

  it("blocks Deep Dive promotion when data quality is weak", () => {
    expect(
      candidateCanDeepDive({
        ticker: "WEAK",
        company: "Weak Data Inc",
        category: "Breakout Watch",
        score: 92,
        previous_score: 70,
        data_quality: "C",
        ai_relevance: 20,
        catalyst: 20,
        market_momentum: 20,
        earliness: 12,
        fundamental_quality: 12,
        signal_breadth: 8,
        thesis: "High score but weak data quality.",
        top_risks: ["single-source"],
        last_checked: "2026-05-30",
        next_action: "Keep as watch only.",
        sources: ["single-source"],
      }),
    ).toBe(false);
  });

  it("renders every required report section", () => {
    const report = renderDailyReport({
      date: "2026-05-30",
      watchlist: baseWatchlist,
    });

    for (const section of [
      "# AI Stock Radar - 2026-05-30",
      "## Kurzfazit",
      "## Marktumfeld",
      "## Top Kandidaten Heute",
      "## Neue Auffaelligkeiten",
      "## Watchlist Aenderungen",
      "## Deep-Dive Kandidaten",
      "## Overheated / Avoid",
      "## Datenqualitaet Und Luecken",
      "## Naechste Aktion",
      "## Decision Inbox",
    ]) {
      expect(report).toContain(section);
    }
  });

  it("keeps SOFORT_MACHEN empty in no-provider dry runs", () => {
    const report = renderDailyReport({
      date: "2026-05-30",
      watchlist: baseWatchlist,
    });

    expect(countSofortMachenItems(report)).toBe(0);
    expect(report).toContain("- SOFORT_MACHEN: nichts");
  });

  it("does not render forbidden certainty language", () => {
    const report = renderDailyReport({
      date: "2026-05-30",
      watchlist: baseWatchlist,
    }).toLowerCase();

    for (const phrase of FORBIDDEN_LANGUAGE) {
      expect(report).not.toContain(phrase);
    }
  });

  it("limits daily dossier candidates to three", () => {
    const candidates = ["AAA", "BBB", "CCC", "DDD"].map((ticker, index) => ({
      ticker,
      company: `${ticker} Corp`,
      category: "Breakout Watch",
      score: 90 - index,
      previous_score: 70,
      data_quality: "A",
      ai_relevance: 20,
      catalyst: 18,
      market_momentum: 18,
      earliness: 12,
      fundamental_quality: 12,
      signal_breadth: 9,
      thesis: `${ticker} has a current AI infrastructure thesis.`,
      top_risks: ["valuation"],
      last_checked: "2026-05-30",
      next_action: "Refresh dossier.",
      sources: ["SEC", "approved-market-data-provider"],
    }));

    expect(selectDossierCandidates(candidates)).toHaveLength(3);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
cd /Users/zondrius/hermes-workspace
pnpm test -- scripts/ai-stock-radar-dry-run.test.mjs
```

Expected: FAIL because `scripts/ai-stock-radar-dry-run.mjs` does not exist.

## Task 4: Implement Dry-Run Generator

**Files:**
- Create: `/Users/zondrius/hermes-workspace/scripts/ai-stock-radar-dry-run.mjs`
- Test: `/Users/zondrius/hermes-workspace/scripts/ai-stock-radar-dry-run.test.mjs`

- [ ] **Step 1: Create the implementation**

Create `/Users/zondrius/hermes-workspace/scripts/ai-stock-radar-dry-run.mjs` with this exact content:

```javascript
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const VALID_CATEGORIES = new Set([
  "Early Watch",
  "Breakout Watch",
  "Deep Dive",
  "Overheated",
  "Avoid",
]);

export const VALID_DATA_QUALITIES = new Set(["A", "B", "C", "D"]);

export const FORBIDDEN_LANGUAGE = [
  "buy now",
  "sell now",
  "sure winner",
  "will explode",
  "safe winner",
  "garantierter gewinner",
  "sicherer gewinner",
  "jetzt kaufen",
  "jetzt verkaufen",
];

const REQUIRED_PROVIDER_KEYS = ["market_data", "filings", "news"];

export function defaultWatchlist(date) {
  return {
    version: 1,
    updated_at: date,
    provider_status: {
      market_data: "not_configured",
      filings: "available",
      news: "not_configured",
    },
    candidates: [],
  };
}

export function validateWatchlist(watchlist) {
  if (!watchlist || typeof watchlist !== "object") {
    throw new Error("watchlist must be an object");
  }

  if (watchlist.version !== 1) {
    throw new Error("watchlist.version must be 1");
  }

  if (!watchlist.provider_status || typeof watchlist.provider_status !== "object") {
    throw new Error("watchlist.provider_status must be an object");
  }

  for (const key of REQUIRED_PROVIDER_KEYS) {
    if (typeof watchlist.provider_status[key] !== "string") {
      throw new Error(`watchlist.provider_status.${key} must be a string`);
    }
  }

  if (!Array.isArray(watchlist.candidates)) {
    throw new Error("watchlist.candidates must be an array");
  }

  for (const candidate of watchlist.candidates) {
    validateCandidate(candidate);
  }

  return watchlist;
}

export function validateCandidate(candidate) {
  for (const key of ["ticker", "company", "category", "data_quality", "thesis"]) {
    if (typeof candidate[key] !== "string" || candidate[key].trim() === "") {
      throw new Error(`candidate.${key} must be a non-empty string`);
    }
  }

  if (!VALID_CATEGORIES.has(candidate.category)) {
    throw new Error(`invalid category for ${candidate.ticker}: ${candidate.category}`);
  }

  if (!VALID_DATA_QUALITIES.has(candidate.data_quality)) {
    throw new Error(`invalid data quality for ${candidate.ticker}: ${candidate.data_quality}`);
  }

  for (const key of [
    "score",
    "previous_score",
    "ai_relevance",
    "catalyst",
    "market_momentum",
    "earliness",
    "fundamental_quality",
    "signal_breadth",
  ]) {
    if (!Number.isFinite(candidate[key])) {
      throw new Error(`candidate.${key} must be numeric for ${candidate.ticker}`);
    }
  }

  if (!Array.isArray(candidate.top_risks)) {
    throw new Error(`candidate.top_risks must be an array for ${candidate.ticker}`);
  }

  if (!Array.isArray(candidate.sources)) {
    throw new Error(`candidate.sources must be an array for ${candidate.ticker}`);
  }

  if (candidate.category === "Deep Dive" && !candidateCanDeepDive(candidate)) {
    throw new Error(`Deep Dive requires score >= 75, A/B data quality, and a current thesis for ${candidate.ticker}`);
  }

  return candidate;
}

export function candidateCanDeepDive(candidate) {
  const hasUsableData = candidate.data_quality === "A" || candidate.data_quality === "B";
  const hasCurrentThesis = typeof candidate.thesis === "string" && candidate.thesis.trim().length > 12;
  return candidate.score >= 75 && hasUsableData && hasCurrentThesis;
}

export function selectDossierCandidates(candidates) {
  const qualityRank = { A: 4, B: 3, C: 2, D: 1 };

  return candidates
    .filter((candidate) => {
      if (candidateCanDeepDive(candidate)) return true;
      return candidate.category === "Overheated" || candidate.category === "Avoid";
    })
    .sort((left, right) => {
      const qualityDelta = qualityRank[right.data_quality] - qualityRank[left.data_quality];
      if (qualityDelta !== 0) return qualityDelta;
      return right.score - left.score;
    })
    .slice(0, 3);
}

export function countSofortMachenItems(report) {
  const line = report
    .split("\n")
    .find((entry) => entry.startsWith("- SOFORT_MACHEN:"));

  if (!line) return 0;

  const value = line.replace("- SOFORT_MACHEN:", "").trim();
  if (value === "" || value.toLowerCase() === "nichts") return 0;
  return 1;
}

function formatCandidate(candidate) {
  return `- ${candidate.ticker} (${candidate.company}): ${candidate.category}, Score ${candidate.score}, Datenqualitaet ${candidate.data_quality}. These: ${candidate.thesis}`;
}

function formatCandidateList(candidates, emptyText) {
  if (candidates.length === 0) return `- ${emptyText}`;
  return candidates.map(formatCandidate).join("\n");
}

export function renderDailyReport({ date, watchlist }) {
  validateWatchlist(watchlist);

  const candidates = [...watchlist.candidates].sort((left, right) => right.score - left.score);
  const deepDiveCandidates = candidates.filter(candidateCanDeepDive);
  const overheatedOrAvoid = candidates.filter((candidate) =>
    candidate.category === "Overheated" || candidate.category === "Avoid"
  );
  const signal = watchlist.provider_status.market_data === "not_configured" ? "Yellow" : "Green";
  const reportPath = `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-${date}.md`;

  return `# AI Stock Radar - ${date}

## Kurzfazit
- Dry-run ohne kostenpflichtigen Markt- oder Newsprovider.
- Der Radar ist betriebsbereit fuer Watchlist- und Reportstruktur, aber Markt-Momentum bleibt bis zur Provider-Entscheidung eingeschraenkt.

## Marktumfeld
- Market data: ${watchlist.provider_status.market_data}
- Filings: ${watchlist.provider_status.filings}
- News: ${watchlist.provider_status.news}

## Top Kandidaten Heute
${formatCandidateList(candidates.slice(0, 10), "Keine Kandidaten in der Watchlist.")}

## Neue Auffaelligkeiten
- Keine neuen Auffaelligkeiten im Dry-run.

## Watchlist Aenderungen
- Watchlist geladen mit ${candidates.length} Kandidaten.

## Deep-Dive Kandidaten
${formatCandidateList(deepDiveCandidates, "Keine Deep-Dive-Kandidaten mit A/B-Datenqualitaet.")}

## Overheated / Avoid
${formatCandidateList(overheatedOrAvoid, "Keine ueberhitzten oder zu meidenden Kandidaten markiert.")}

## Datenqualitaet Und Luecken
- Markt- und Newsdaten sind nicht konfiguriert.
- SEC/Nasdaq/FINRA bleiben als Baseline vorgesehen.
- Keine Schätzwerte wurden eingesetzt.

## Naechste Aktion
- Datenprovider-Entscheidung vorbereiten, aber keine Handelsaktion ausloesen.

## Decision Inbox
- Signal: ${signal}
- SOFORT_MACHEN: nichts
- CHRIS_ENTSCHEIDET: Ob und welcher Markt-/Newsprovider fuer Phase 2 freigegeben wird.
- BEOBACHTEN: Ob Watchlist-Kandidaten nach Provider-Anbindung belastbare A/B-Datenqualitaet erreichen.
- SPAETER: Hermes-Cockpit UI und Backtesting erst nach stabilen Report-Laeufen.
- BLOCKIERT: nichts
- NICHT_TUN: Keine automatischen Trades; keinen Hype-Kandidaten ohne A/B-Datenqualitaet hochstufen.
- Naechste kleinste Aktion: Dry-run pruefen und Provider-Entscheidung vorbereiten.
- Beleg / Datei: ${reportPath}
`;
}

export function renderDossier({ date, candidate }) {
  return `# ${candidate.ticker} - ${candidate.company} - ${date}

## Thesis
${candidate.thesis}

## Why AI-Relevant
AI-Relevanz Score: ${candidate.ai_relevance}/20

## Catalyst
Katalysator Score: ${candidate.catalyst}/20

## Evidence
- Datenqualitaet: ${candidate.data_quality}
- Quellen: ${candidate.sources.join(", ")}

## Score Breakdown
- AI relevance: ${candidate.ai_relevance}
- Catalyst: ${candidate.catalyst}
- Market momentum: ${candidate.market_momentum}
- Earliness: ${candidate.earliness}
- Fundamental quality: ${candidate.fundamental_quality}
- Signal breadth: ${candidate.signal_breadth}
- Total: ${candidate.score}

## Risks
${candidate.top_risks.map((risk) => `- ${risk}`).join("\n")}

## What Would Prove This Wrong
- These verliert Gueltigkeit, wenn Katalysator, Datenqualitaet oder AI-Bezug nicht mehr belegbar sind.

## Data Quality
${candidate.data_quality}

## Next Review Trigger
${candidate.next_action}

## Sources
${candidate.sources.map((source) => `- ${source}`).join("\n")}
`;
}

export function ensureDirectories(root) {
  fs.mkdirSync(path.join(root, "projects/ai-stock-radar/dossiers"), { recursive: true });
  fs.mkdirSync(path.join(root, "reports/ai-stock-radar"), { recursive: true });
}

export function readOrCreateWatchlist({ root, date }) {
  const watchlistPath = path.join(root, "projects/ai-stock-radar/watchlist.json");

  if (!fs.existsSync(watchlistPath)) {
    const watchlist = defaultWatchlist(date);
    fs.mkdirSync(path.dirname(watchlistPath), { recursive: true });
    fs.writeFileSync(watchlistPath, `${JSON.stringify(watchlist, null, 2)}\n`);
    return watchlist;
  }

  return validateWatchlist(JSON.parse(fs.readFileSync(watchlistPath, "utf8")));
}

export function writeDryRun({ root = process.cwd(), date = process.env.AI_STOCK_RADAR_DATE }) {
  const resolvedDate = date || new Date().toISOString().slice(0, 10);
  ensureDirectories(root);

  const watchlist = readOrCreateWatchlist({ root, date: resolvedDate });
  const report = renderDailyReport({ date: resolvedDate, watchlist });
  const reportPath = path.join(root, `reports/ai-stock-radar/ai-stock-radar-${resolvedDate}.md`);
  fs.writeFileSync(reportPath, report);

  const dossierCandidates = selectDossierCandidates(watchlist.candidates);
  const dossierPaths = dossierCandidates.map((candidate) => {
    const dossierPath = path.join(
      root,
      `projects/ai-stock-radar/dossiers/${candidate.ticker}-${resolvedDate}.md`,
    );
    fs.writeFileSync(dossierPath, renderDossier({ date: resolvedDate, candidate }));
    return dossierPath;
  });

  return { reportPath, dossierPaths };
}

function isCliRun() {
  return process.argv[1] === fileURLToPath(import.meta.url);
}

if (isCliRun()) {
  const result = writeDryRun({ root: process.cwd() });
  console.log(`AI_STOCK_RADAR_REPORT=${result.reportPath}`);
  console.log(`AI_STOCK_RADAR_DOSSIERS=${result.dossierPaths.length}`);
}
```

- [ ] **Step 2: Run the focused test**

Run:

```bash
cd /Users/zondrius/hermes-workspace
pnpm test -- scripts/ai-stock-radar-dry-run.test.mjs
```

Expected: PASS for all tests in `scripts/ai-stock-radar-dry-run.test.mjs`.

- [ ] **Step 3: Commit tests and implementation**

Run:

```bash
cd /Users/zondrius/hermes-workspace
git add scripts/ai-stock-radar-dry-run.mjs scripts/ai-stock-radar-dry-run.test.mjs
git commit -m "feat: add AI stock radar dry run"
```

Expected: commit succeeds and stages no unrelated files.

## Task 5: Run And Verify Dry Report

**Files:**
- Create: `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-2026-05-30.md`

- [ ] **Step 1: Run the deterministic dry report**

Run:

```bash
cd /Users/zondrius/hermes-workspace
AI_STOCK_RADAR_DATE=2026-05-30 node scripts/ai-stock-radar-dry-run.mjs
```

Expected output includes:

```text
AI_STOCK_RADAR_REPORT=/Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-2026-05-30.md
AI_STOCK_RADAR_DOSSIERS=0
```

- [ ] **Step 2: Verify required report sections**

Run:

```bash
cd /Users/zondrius/hermes-workspace
for section in \
  "# AI Stock Radar - 2026-05-30" \
  "## Kurzfazit" \
  "## Marktumfeld" \
  "## Top Kandidaten Heute" \
  "## Neue Auffaelligkeiten" \
  "## Watchlist Aenderungen" \
  "## Deep-Dive Kandidaten" \
  "## Overheated / Avoid" \
  "## Datenqualitaet Und Luecken" \
  "## Naechste Aktion" \
  "## Decision Inbox"; do
  rg -F "$section" reports/ai-stock-radar/ai-stock-radar-2026-05-30.md
done
```

Expected: every section is printed once.

- [ ] **Step 3: Verify safety language and Decision Inbox**

Run:

```bash
cd /Users/zondrius/hermes-workspace
rg -F -- "- SOFORT_MACHEN: nichts" reports/ai-stock-radar/ai-stock-radar-2026-05-30.md
rg -F -- "Keine automatischen Trades" reports/ai-stock-radar/ai-stock-radar-2026-05-30.md
! rg -i "buy now|sell now|sure winner|will explode|jetzt kaufen|jetzt verkaufen" reports/ai-stock-radar/ai-stock-radar-2026-05-30.md
```

Expected: the first two commands print matching lines, and the final command exits with status `0`.

- [ ] **Step 4: Commit dry report**

Run:

```bash
cd /Users/zondrius/hermes-workspace
git add reports/ai-stock-radar/ai-stock-radar-2026-05-30.md
git commit -m "test: add AI stock radar dry report"
```

Expected: commit succeeds and stages no unrelated files.

## Task 6: Add Job Prompt Sources

**Files:**
- Create: `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/prompts/daily.md`
- Create: `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/prompts/weekly.md`

- [ ] **Step 1: Create the daily prompt source**

Create `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/prompts/daily.md` with this exact content:

```markdown
You are Neva running Chris' AI_STOCK_RADAR_DAILY.

Goal:
Create a read-only daily radar report for AI-related public equities. The job finds early signals, updates the watchlist, creates at most 3 dossiers when trigger rules fire, and ends with a Decision Inbox block.

Use these skills:
- ai-stock-radar
- hermes-agent-operating-system
- hermes-decision-inbox

Required files:
- Spec: /Users/zondrius/hermes-workspace/docs/superpowers/specs/2026-05-30-ai-stock-radar-design.md
- Watchlist: /Users/zondrius/hermes-workspace/projects/ai-stock-radar/watchlist.json
- Dossiers: /Users/zondrius/hermes-workspace/projects/ai-stock-radar/dossiers/
- Reports: /Users/zondrius/hermes-workspace/reports/ai-stock-radar/

Allowed behavior:
- Read public sources and existing local files.
- Use SEC EDGAR, Nasdaq symbol directory, and FINRA public data when available.
- Use configured provider state from watchlist.json.
- Write a report to /Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-YYYY-MM-DD.md.
- Update watchlist.json only when the update can be justified from the report.
- Create at most 3 dossiers.

Safety:
- No broker access.
- No automatic trades.
- No options, leverage, margin, or real-money workflow.
- No paid provider or API key setup without CHRIS_ENTSCHEIDET.
- No certainty language.
- Missing market or news data must make the report Yellow and must be listed under Datenqualitaet Und Luecken.

Required report sections:
# AI Stock Radar - YYYY-MM-DD
## Kurzfazit
## Marktumfeld
## Top Kandidaten Heute
## Neue Auffaelligkeiten
## Watchlist Aenderungen
## Deep-Dive Kandidaten
## Overheated / Avoid
## Datenqualitaet Und Luecken
## Naechste Aktion
## Decision Inbox

Decision Inbox requirement:
- Signal: Green / Yellow / Red
- SOFORT_MACHEN: at most one small safe action; use nichts if none.
- CHRIS_ENTSCHEIDET: provider, API key, broker, purchase, leverage, option, or trade-like alert decisions.
- BEOBACHTEN: useful signals to watch.
- SPAETER: useful but not this week.
- BLOCKIERT: real blockers only.
- NICHT_TUN: explicitly block automatic trades and hype chasing.
- Naechste kleinste Aktion: one concrete next step or keine.
- Beleg / Datei: the main report path.
```

- [ ] **Step 2: Create the weekly prompt source**

Create `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/prompts/weekly.md` with this exact content:

```markdown
You are Neva running Chris' AI_STOCK_DEEPDIVE_WEEKLY.

Goal:
Clean and improve the AI stock radar watchlist. Review the strongest candidates, document false positives, prune stale entries, and update dossiers whose thesis materially changed.

Use these skills:
- ai-stock-radar
- hermes-agent-operating-system
- hermes-decision-inbox

Required files:
- Spec: /Users/zondrius/hermes-workspace/docs/superpowers/specs/2026-05-30-ai-stock-radar-design.md
- Watchlist: /Users/zondrius/hermes-workspace/projects/ai-stock-radar/watchlist.json
- Dossiers: /Users/zondrius/hermes-workspace/projects/ai-stock-radar/dossiers/
- Reports: /Users/zondrius/hermes-workspace/reports/ai-stock-radar/

Tasks:
1. Review the top 3 to 5 candidates by score and data quality.
2. Confirm, downgrade, or remove stale candidates.
3. Check whether each Deep Dive still has thesis, catalyst, risks, and sources.
4. Record false positives and why the signal failed.
5. Recommend at most one scoring adjustment, with evidence.
6. Keep the watchlist from growing without pruning.

Output:
Write /Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-deepdive-YYYY-MM-DD.md.

Safety:
- No broker access.
- No automatic trades.
- No options, leverage, margin, or real-money workflow.
- No paid provider or API key setup without CHRIS_ENTSCHEIDET.
- No certainty language.

Decision Inbox requirement:
- Signal: Green / Yellow / Red
- SOFORT_MACHEN: at most one small safe action; use nichts if none.
- CHRIS_ENTSCHEIDET: provider, API key, broker, purchase, leverage, option, or trade-like alert decisions.
- BEOBACHTEN: useful signals to watch.
- SPAETER: useful but not this week.
- BLOCKIERT: real blockers only.
- NICHT_TUN: explicitly block automatic trades and hype chasing.
- Naechste kleinste Aktion: one concrete next step or keine.
- Beleg / Datei: the main report path.
```

- [ ] **Step 3: Commit prompt sources**

Run:

```bash
cd /Users/zondrius/hermes-workspace
git add projects/ai-stock-radar/prompts/daily.md projects/ai-stock-radar/prompts/weekly.md
git commit -m "docs: add AI stock radar job prompts"
```

Expected: commit succeeds and stages no unrelated files.

## Task 7: Create Hermes Cron Jobs

**Files:**
- Modify via CLI: `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

- [ ] **Step 1: Back up the Neva cron file**

Run:

```bash
cp /Users/zondrius/.hermes/profiles/neva/cron/jobs.json \
  /Users/zondrius/.hermes/profiles/neva/cron/jobs.json.backup-$(date +%Y%m%d-%H%M%S)-before-ai-stock-radar
```

Expected: command exits with status `0`.

- [ ] **Step 2: Create the daily job**

Run:

```bash
cd /Users/zondrius/hermes-workspace
hermes cron create \
  --profile neva \
  --name AI_STOCK_RADAR_DAILY \
  --deliver telegram \
  --workdir /Users/zondrius/hermes-workspace \
  --skill ai-stock-radar \
  --skill hermes-agent-operating-system \
  --skill hermes-decision-inbox \
  '35 9 * * 1-5' \
  "$(cat /Users/zondrius/hermes-workspace/projects/ai-stock-radar/prompts/daily.md)"
```

Expected: Hermes prints a created scheduled job.

- [ ] **Step 3: Create the weekly job**

Run:

```bash
cd /Users/zondrius/hermes-workspace
hermes cron create \
  --profile neva \
  --name AI_STOCK_DEEPDIVE_WEEKLY \
  --deliver telegram \
  --workdir /Users/zondrius/hermes-workspace \
  --skill ai-stock-radar \
  --skill hermes-agent-operating-system \
  --skill hermes-decision-inbox \
  '30 16 * * 0' \
  "$(cat /Users/zondrius/hermes-workspace/projects/ai-stock-radar/prompts/weekly.md)"
```

Expected: Hermes prints a created scheduled job.

- [ ] **Step 4: Verify cron JSON and job listing**

Run:

```bash
python3 -m json.tool /Users/zondrius/.hermes/profiles/neva/cron/jobs.json >/tmp/ai-stock-radar-jobs.json
hermes cron list | rg "AI_STOCK_RADAR_DAILY|AI_STOCK_DEEPDIVE_WEEKLY" -C 5
```

Expected: JSON parsing succeeds, and both job names appear with active schedules.

## Task 8: Final Verification

**Files:**
- Verify: `/Users/zondrius/hermes-workspace/docs/superpowers/specs/2026-05-30-ai-stock-radar-design.md`
- Verify: `/Users/zondrius/hermes-workspace/docs/superpowers/plans/2026-05-30-ai-stock-radar-implementation.md`
- Verify: `/Users/zondrius/hermes-workspace/projects/ai-stock-radar/watchlist.json`
- Verify: `/Users/zondrius/hermes-workspace/reports/ai-stock-radar/ai-stock-radar-2026-05-30.md`

- [ ] **Step 1: Run focused tests**

Run:

```bash
cd /Users/zondrius/hermes-workspace
pnpm test -- scripts/ai-stock-radar-dry-run.test.mjs
```

Expected: PASS.

- [ ] **Step 2: Validate watchlist and report**

Run:

```bash
cd /Users/zondrius/hermes-workspace
python3 -m json.tool projects/ai-stock-radar/watchlist.json >/tmp/ai-stock-radar-watchlist.json
rg -F "## Decision Inbox" reports/ai-stock-radar/ai-stock-radar-2026-05-30.md
rg -F -- "- SOFORT_MACHEN: nichts" reports/ai-stock-radar/ai-stock-radar-2026-05-30.md
```

Expected: JSON parsing succeeds and both report checks print matches.

- [ ] **Step 3: Verify no forbidden language**

Run:

```bash
cd /Users/zondrius/hermes-workspace
! rg -i "buy now|sell now|sure winner|will explode|jetzt kaufen|jetzt verkaufen|garantierter gewinner|sicherer gewinner" \
  reports/ai-stock-radar/ai-stock-radar-2026-05-30.md \
  projects/ai-stock-radar/prompts/daily.md \
  projects/ai-stock-radar/prompts/weekly.md
```

Expected: command exits with status `0`.

- [ ] **Step 4: Verify cron jobs are present**

Run:

```bash
hermes cron list | rg "AI_STOCK_RADAR_DAILY|AI_STOCK_DEEPDIVE_WEEKLY" -C 5
```

Expected: both job names appear.

- [ ] **Step 5: Inspect Git status**

Run:

```bash
cd /Users/zondrius/hermes-workspace
git status --short
```

Expected: unrelated pre-existing workspace changes may remain. New AI stock radar repo files should already be committed, and `.hermes` cron/skill changes are outside this repo.

## Self-Review Checklist

- Spec coverage: Tasks 1-7 cover skill, watchlist, reports, dry-run verification, dossiers limit, Decision Inbox, and cron jobs.
- Provider safety: No paid provider is configured.
- Trading safety: No broker, options, leverage, real-money, or automatic trade behavior is added.
- Data-quality safety: Tests block `Deep Dive` promotion for `C` and `D` quality.
- Report safety: Tests enforce required sections, empty `SOFORT_MACHEN` in dry-run, and forbidden-language absence.
- Operational safety: Cron JSON is backed up before job creation.
