---
title: "Slide Writing Guide — ppt-maker"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.699595Z
---

# Slide Writing Guide — ppt-maker

Rules for writing text that goes onto slides. Every line of slide copy must earn its place.

---

## Core Principles

1. **One idea per slide.** If a slide tries to say two things, split it or cut one.
2. **Lead with the takeaway.** Titles state the conclusion, not the topic. "DALP cuts settlement from T+2 to T+0" beats "Settlement Overview."
3. **Specifics over generics.** Numbers, names, and concrete outcomes. Never "significant reduction" when you can say "87% fewer manual steps."
4. **Active voice always.** "DALP processes 200+ asset types" not "200+ asset types are supported by the platform."
5. **No filler words.** Cut "in order to," "it is important to note that," "as a matter of fact," "at the end of the day," "leverage," "utilize." Say the thing directly.

---

## Title Rules

- **Assertion titles:** State what the audience should remember, not what the slide discusses.
  - ✅ "Atomic settlement eliminates counterparty risk"
  - ❌ "About Settlement"
  - ✅ "Seven asset templates ship out of the box"
  - ❌ "Asset Templates"
- **Length:** 4 to 10 words. If it wraps to two lines, it is too long. Rewrite.
- **No punctuation** at the end of titles (no periods, no colons).
- **No questions** as titles unless the slide immediately answers them in the body.

---

## Bullet Point Rules

- Start each bullet with a **different verb or noun.** Repetitive starts ("DALP provides... DALP provides... DALP provides...") signal lazy writing.
- **Front-load the important word.** The first 3 words of each bullet carry 80% of the scanning weight.
  - ✅ "Maker-checker approvals enforce dual control on every transaction"
  - ❌ "The platform has a feature called maker-checker that enforces approvals"
- **Parallel structure.** All bullets in a group must follow the same grammatical pattern. If bullet 1 starts with a noun phrase, they all do. If bullet 1 starts with an imperative verb, they all do.
- **8 to 20 words per bullet.** Under 8 lacks substance. Over 20 belongs in a document, not a slide.
- **No sub-bullets.** If you need hierarchy, use a different slide layout (grid or multi-column) instead.

---

## Number and Stat Rules

- **Always include units.** "18" means nothing. "18 compliance modules" means something.
- **Round aggressively for hero stats.** Use "200+" not "207." Use "$13T" not "$13.2 trillion."
- **Pair every number with a "so what" label.** The stat says what; the label says why it matters.
  - ✅ Stat: "T+0" / Label: "Atomic settlement, same-day finality"
  - ❌ Stat: "T+0" / Label: "Settlement time"
- **Source stats from `content/dalp-content-banks/platform-stats.json`.** Do not invent numbers.

---

## Banned Patterns

These patterns signal weak slide writing. Rewrite on sight.

| Pattern | Problem | Fix |
|---|---|---|
| "Overview of X" as a title | Topic label, not a takeaway | State what matters about X |
| "Key benefits" / "Key features" | Generic, adds nothing | Name the specific benefits in the title |
| Starting 3+ bullets with the same word | Monotonous, hard to scan | Vary the lead word |
| "We" as the subject | Self-centered framing | Lead with the outcome or the customer's gain |
| Sentences ending with "etc." | Signals incomplete thinking | List the actual items or cut the sentence |
| "Various" / "numerous" / "multiple" | Vague quantifiers | Use the real number |
| Parenthetical asides in bullets | Clutters the scan path | Move to a footnote or cut |
| "In today's rapidly evolving..." | Cliché opener | Delete. Start with the point |
| "Best-in-class" / "world-class" / "cutting-edge" | Empty superlatives | Describe the specific capability |

---

## Tone by Audience

| Audience | Tone | Example title |
|---|---|---|
| Executive / C-suite | Strategic, outcome-focused, financial language | "Reduce tokenization time-to-market from months to weeks" |
| Technical / architects | Precise, component-level, integration-aware | "HSM-backed key management with RBAC enforcement" |
| Sales / partners | Proof-driven, competitive, ROI language | "Commerzbank: EUR 7M annual savings on bond operations" |
| Investor | Scale, traction, market-sizing language | "Tokenized asset market projected at $16T by 2030" |

## Proof-Point Writing Patterns

When a slide makes a claim, pair it with the shortest proof pattern that fits the layout.

1. **Capability + mechanism**
   - Formula: `[Capability] + [how it works] + [why it matters]`
   - Example: `Transfer policies enforce eligibility before execution, reducing failed downstream checks and manual exception handling.`
2. **Stat + label + context**
   - Formula: `[Number] + [unit/label] + [one context sentence]`
   - Example: `21 dashboards, pre-built observability across metrics, logs, traces, and alerting.`
3. **Named reference + outcome**
   - Formula: `[Institution] + [what ran on DALP] + [specific result or operational scope]`
   - Example: `Maybank used DALP for Project Photon, running FX tokenization and XvP settlement within bank-controlled workflows.`

Do not stack three unsupported claims in one bullet. One claim, one proof, one reason it matters.

---

## Grid and Cell Writing Rules

Grid layouts (2x2, 2x3) and table cells demand a different writing discipline than bullet-based slides. Every cell is a self-contained micro-argument.

### Cell anatomy (2x2 and 2x3 grids)
Each cell follows a strict three-part structure:
1. **Heading** (2-4 words): Name the capability or concept. Front-load the differentiator.
   - ✅ "Atomic Settlement"
   - ❌ "Our Settlement Capabilities"
2. **Body** (15-30 words): One concrete claim with a proof point. No setup sentences.
   - ✅ "Trades settle in T+0 with on-chain finality. Commerzbank processes EUR 20M+ in digital bonds through this flow."
   - ❌ "SettleMint offers a settlement solution that enables faster processing times for various types of digital assets."
3. **Stat anchor** (optional, when using STAT typography): One number + unit + "so what" label.
   - ✅ "18 modules" / "Pre-built compliance for MiCA, MAS, VARA, and 14 more frameworks"
   - ❌ "18" / "Compliance modules"

### Cell balance rules
- All cells in a grid must be within 20% word count of each other. A 40-word cell next to a 15-word cell signals bad content planning.
- If you cannot fill all cells to similar density, use a smaller layout (2x2 instead of 2x3, Three Column instead of 2x2).
- Empty cells are never acceptable. Every cell in the chosen layout must carry content.

### Table cell writing
- Header row: 1-3 words per cell, noun phrases only. No verbs, no articles.
  - ✅ "Asset Type" | "Settlement" | "Compliance"
  - ❌ "The Type of Asset" | "How Settlement Works" | "Compliance Features We Offer"
- Body cells: 1-8 words. Prefer sentence fragments over full sentences.
  - ✅ "T+0 atomic, on-chain finality"
  - ❌ "The settlement is completed atomically with on-chain finality in real time."
- Consistency across columns: if column 1 uses sentence fragments, all columns use sentence fragments. If column 1 uses single values, all columns use single values.
- Comparison tables: use parallel structure across rows. If row 1 says "Yes / No / Partial", every row follows that pattern.

### Common grid mistakes
| Mistake | Problem | Fix |
|---|---|---|
| One cell has 50 words, another has 12 | Visual imbalance, audience reads the long one and skips the short ones | Rewrite to equalize, or drop to a simpler layout |
| Generic headings ("Feature 1", "Benefit 2") | Audience cannot scan the grid at a glance | Each heading must name the specific thing |
| Body text restates the heading | Wastes half the cell's capacity on redundancy | Heading names it, body proves it with a different fact |
| Mixing stats and prose across cells | Inconsistent scanning pattern | Pick one format for all cells in the grid |

---

## Conciseness Checklist (apply to every slide before finalizing)

- [ ] Can any bullet lose a word without changing meaning? Cut it.
- [ ] Does the title pass the "billboard test"? (Readable at a glance from 3 meters away.)
- [ ] Is every number sourced from content-banks or verified content files?
- [ ] Are all bullets under 20 words?
- [ ] Does the slide say ONE thing, clearly?
