---
title: "RULES.md — Locked Workflow for dalp-for-x"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.652971Z
---

# RULES.md — Locked Workflow for dalp-for-x

This file is the authoritative source of truth for how "DALP for X" audience pages are built and maintained. Do not deviate from these rules without explicit approval from Gyan (URGPRND7Z).

---

## 🔴 TRUTH GROUNDING — NON-NEGOTIABLE (Roderik directive, 2026-03-24)

Every single claim on every page must be grounded in verifiable truth. No exceptions.

### DALP Claims
- Every DALP capability claim must be verified against the actual DALP source:
  1. `~/dalp/kit/dapp/content/docs/` — primary source (199 .mdx files)
  2. `/Users/quark/Public/quark/workspace/product/dalp/capability-mapping/` — structured capability map
  3. `/Users/quark/Public/quark/workspace/product/dalp/bid-kit/sections/rfi-question-bank.md` — confidence-flagged answers
- If a claim cannot be verified in these sources, it does not go on the page. Period.
- Use the rfi-question-bank confidence flags: ✅ Verified = safe to claim. 🟡 Partial = qualify it. ❌ Gap = do not claim it.
- Numbers must be exact: "298 CLI commands", "21 dashboards", "7 asset templates", "12 compliance module types" — verify before using.

### External Claims (Regulations, Market Context)
- Every regulatory claim must be verified against current public documentation from regulators (FSA, MAS, FSRA, DFSA, etc.)
- Do not rely on memory alone for regulatory facts — fetch and verify at the time of writing
- If you cannot verify a regulatory claim, state it as context without asserting it as current fact, or omit it
- Key players (banks, exchanges) mentioned must be real and their digital asset activity publicly documented

### Verification Checklist (run before every PATCH)
Before publishing any page:
- [ ] Every DALP claim verified against `~/dalp` docs or capability-mapping
- [ ] All regulatory and market context claims verified against public sources
- [ ] No speculative or inferred capabilities
- [ ] Numbers are exact and sourced
- [ ] No banned phrases (em dashes, no-go list, "production-grade", etc.)
- [ ] **WIDGET W/X VALIDATION (hard stop)**: After constructing layoutSections but BEFORE calling PATCH, iterate every widget in every section and assert `w=12, x=0`. Any widget with any other value will break the HubSpot editor silently. The ONLY exception is section-6 (see below). Fix before patching — do not rely on post-patch checks.
- [ ] All 6 sections present in the layoutSections object (section-1 through section-6)
- [ ] Section-3 rowMetaData has navy background (`backgroundColor: {r:0, g:0, b:72, a:1}`)
- [ ] All `<td>` cells in the context table have `color: #1a1a2e;` in their style attribute
- [ ] Meta description is under 155 characters
- [ ] FAQ schema in headHtml
- [ ] Canonical URL set to `https://www.settlemint.com/for/[slug]`

---

## Mandatory Skills (Load Before Writing Any Page)

Read ALL of these skill files before writing copy for any page. They are non-negotiable:

| Skill | Path | Why |
|-------|------|-----|
| `ai-seo` | `/Users/quark/Public/quark/workspace/skills/ai-seo/SKILL.md` | Optimize for AI search engines, LLM citations, AI Overviews, Perplexity, ChatGPT |
| `competitor-alternatives` | `/Users/quark/Public/quark/workspace/skills/competitor-alternatives/SKILL.md` | Audience-fit page structure and SEO intent framing |
| `copy-editing` | `/Users/quark/Public/quark/workspace/skills/copy-editing/SKILL.md` | Review and polish all copy before publishing |
| `copywriting` | `/Users/quark/Public/quark/workspace/skills/copywriting/SKILL.md` | Punchy, benefit-led, specific copy — no vague claims |
| `marketing-psychology` | `/Users/quark/Public/quark/workspace/skills/marketing-psychology/SKILL.md` | Apply psychological principles to framing and persuasion |
| `page-cro` | `/Users/quark/Public/quark/workspace/skills/page-cro/SKILL.md` | Optimize page structure and CTAs for conversions |
| `programmatic-seo` | `/Users/quark/Public/quark/workspace/skills/programmatic-seo/SKILL.md` | Build pages at scale with unique value, avoid thin content |
| `schema-markup` | `/Users/quark/Public/quark/workspace/skills/schema-markup/SKILL.md` | Add structured data (FAQ schema, SoftwareApplication, etc.) |
| `seo-audit` | `/Users/quark/Public/quark/workspace/skills/seo-audit/SKILL.md` | Audit page SEO before publishing |

---

## HubSpot API Patterns

### Authentication
Always use `Authorization: Bearer $HUBSPOT_ACCESS_TOKEN`. Never hardcode the token.

### Template
- **Template path** (used in `templatePath` field): `Marketplace/One_Elements child-theme/templates/One - Competitors Comparison.html`
  - ⚠️ No leading slash. This exact string. Deviating breaks template rendering.
- **Template ID**: `382464945387`

### Widget Width Rule
**ALL widgets inside columns use `w=12, x=0`** — the column carries grid position.

The ONLY exception is section-6, where:
- Column 1 (text): `w=8, x=0` — widgets inside are also `w=8, x=0`
- Column 2 (button): `w=4, x=8` — widget inside is `w=4, x=8`

### 🔴 ROW DICT KEY RULE (critical — breaks editor silently if wrong)

In HubSpot DnD `layoutSections`, each row is a dict where the **key must equal the column's `x` value**. NOT sequential integers.

**Wrong** (sequential keys — breaks editor):
```json
"rows": [{ "0": {column, x=0}, "1": {column, x=6} }]
```

**Correct** (positional keys — x value as key):
```json
"rows": [{ "0": {column, x=0}, "6": {column, x=6} }]
```

Canonical key mapping for this template:
- section-4: left column → key `"0"` (x=0), right column → key `"6"` (x=6)
- section-5: left column → key `"0"` (x=0), right column → key `"6"` (x=6)
- section-6: left column → key `"0"` (x=0), right column → key `"8"` (x=8)

**Validation step**: Before every PATCH, assert that every multi-column row dict key matches its column's x value. This is the #1 cause of "page won't render" errors.

### Endpoints

**List pages (find existing):**
```
GET https://api.hubapi.com/cms/v3/pages/site-pages?limit=100&slug__icontains=for/
Authorization: Bearer $HUBSPOT_ACCESS_TOKEN
```

**Get a single page:**
```
GET https://api.hubapi.com/cms/v3/pages/site-pages/{pageId}
Authorization: Bearer $HUBSPOT_ACCESS_TOKEN
```

**Update existing page:**
```
PATCH https://api.hubapi.com/cms/v3/pages/site-pages/{pageId}
Authorization: Bearer $HUBSPOT_ACCESS_TOKEN
Content-Type: application/json

{ "layoutSections": { ... all 6 sections ... } }
```

**Create new page:**
```
POST https://api.hubapi.com/cms/v3/pages/site-pages
Authorization: Bearer $HUBSPOT_ACCESS_TOKEN
Content-Type: application/json

{
  "domain": "",
  "slug": "for/[target-slug]",
  "name": "SettleMint DALP for [Target] — [brief description]",
  "htmlTitle": "SettleMint DALP for [Target]: [value prop]",
  "metaDescription": "...",  // ⚠️ MAX 155 chars — HubSpot flags anything longer
  "linkRelCanonicalUrl": "https://www.settlemint.com/for/[target-slug]",
  "templatePath": "Marketplace/One_Elements child-theme/templates/One - Competitors Comparison.html",
  "headHtml": "...",  // FAQ schema + SoftwareApplication schema
  "layoutSections": { ... all 6 sections ... }
}
```

### ⚠️ Critical: layoutSections PATCH replaces the entire object
When PATCHing, you MUST include ALL 6 sections in the `layoutSections` object. Missing sections will be deleted from the page. Always include section-1 through section-6.

---

## Template Structure — 6 Sections

All widget names below are from the **live Tokeny page (ID: 381457666273)** and are the canonical names used across all pages using this template. Widget names must match exactly.

### section-1 — Hero
Dark-to-light gradient background. Contains eyebrow + H1 + intro paragraph + CTA button.

| Widget Name | Label | Type | Notes |
|-------------|-------|------|-------|
| `widget_tokeny_hero_eyebrow` | Eyebrow Heading | custom_widget (module_id: 374272770289) | Contains `eyebrow_text` (e.g. "DALP for Japan") and `heading_text` (the H1) and `heading_level: "h1"` |
| `widget_tokeny_hero_richtext` | Rich Text | custom_widget (module_id: 1155639) | Contains intro paragraph HTML in `html` field |
| `widget_tokeny_hero_cta` | (unlabeled) | custom_widget | CTA button, `btn-primary-dark` class, links to `/demo` |

All three widgets: `w=12, x=0`

### section-2 — Context Table
White background. Contains section heading + "What [Target] needs" vs "How DALP delivers" table.

| Widget Name | Label | Type | Notes |
|-------------|-------|------|-------|
| `widget_tokeny_table_heading` | Eyebrow Heading | custom_widget (module_id: 374272770289) | `eyebrow_text: "Fit for Purpose"`, `heading_text: "What [Target] institutions need — and how DALP delivers"` |
| `widget_tokeny_table_richtext` | Rich Text | custom_widget (module_id: 1155639) | Full HTML table in `html` field |

Both widgets: `w=12, x=0`

**Table structure:**
- Left column header: "What [Target] institutions need" (navy background, white text)
- Right column header: "How DALP delivers it" (navy background, white text)
- 8-10 rows covering the most relevant requirements for this specific audience
- Alternating row background: `background:#f8f8fc` on even rows
- Cell padding: `12px 16px`, border: `1px solid #d9d9e3`
- All `<td>` cells must have `color: #1a1a2e;` in their style attribute

### section-3 — 3 Dark Cards (Why DALP for [Target])
Dark navy background (`backgroundColor: {a:1, b:72, g:0, r:0}`). Contains section heading + intro text + 3 cards grid.

| Widget Name | Label | Type | Notes |
|-------------|-------|------|-------|
| `widget_tokeny_reasons_heading` | Eyebrow Heading | custom_widget (module_id: 374272770289) | `eyebrow_text: "Built for [Target]"`, `heading_text: "3 Reasons [Target] institutions choose DALP"` |
| `widget_tokeny_reasons_richtext` | Rich Text | custom_widget (module_id: 1155639) | 1-sentence dark-text intro in `html` field (use `color: #ececec`) |
| `widget_tokeny_reasons_cards` | One - Cards - Grid | custom_widget (module_id: 376294640884) | `items` array with 3 objects, each has `number_text` (card title) and `description` (card body) |

All three widgets: `w=12, x=0`

Card themes — each card is audience-specific and outcome-focused:
1. **Regulatory fit** — how DALP's compliance capabilities align with this audience's specific regulatory requirements
2. **Operational control** — observability, maker-checker, RBAC/ABAC — the operational governance this audience requires
3. **Infrastructure ownership** — deployment flexibility, data residency, self-hosting — relevant for this audience's sovereignty requirements

Adjust card themes to be maximally relevant to the specific target. For regulated markets, lean on compliance. For asset classes, lean on lifecycle capability. For sectors, lean on operational fit.

### section-4 — Key Capabilities for [Target]
White background. **TWO-COLUMN layout**: heading on the left (w=5), checkmark list on the right (w=6, offset=6).

⚠️ Do NOT use a richtext `<ul>` here. Use the "One - List Items" module with checkmark icons. This is what renders the two-column checkmark layout in the template.

| Widget Name | Label | Column | Type | Notes |
|-------------|-------|--------|------|-------|
| `widget_tokeny_diff_heading` | Eyebrow Heading | Left col (w=5, x=0) | custom_widget (module_id: 374272770289) | `eyebrow_text: "Platform Capabilities"`, `heading_text: "DALP capabilities for [Target]"` |
| `widget_tokeny_diff_list` | One - List Items | Right col (w=6, x=6) | custom_widget | module_id: `362517245149`, path: `/Marketplace/One_Elements child-theme/modules/One - List Items.module` |

All widgets: `w=12, x=0` (columns carry grid position)

**One - List Items format**:
```json
{
  "name": "widget_tokeny_diff_list",
  "type": "custom_widget",
  "w": 12, "x": 0,
  "label": "One - List Items",
  "params": {
    "css_class": "dnd-module",
    "module_id": 362517245149,
    "schema_version": 2,
    "items": [
      {
        "text": "<p style=\"color: #1a1a2e; font-weight: 500;\">Capability description here</p>",
        "icon": {"alt": "checkmark", "height": 30, "loading": "disabled", "size_type": "exact", "src": "https://8639589.fs1.hubspotusercontent-eu1.net/hubfs/8639589/Icons/Tick_icon_blue.png", "width": 30}, "icon_color": {"color": "#2253FF", "opacity": 100}, "icon_field": {"name": "check", "type": "SOLID", "unicode": "f00c"}, "icon_size": 20, "type_icon": "image"
      }
    ]
  }
}
```

Select 5-6 capabilities most relevant to this audience. Use specific numbers where possible. Do not just list all DALP features — choose what matters to THIS audience.

### section-5 — CTA Banner (Split)
Dark blue background (`backgroundColor: {a:1, b:72, g:0, r:0}`). Split layout: headline+body left (col w=6), button right (col w=6, x=6).

| Widget Name | Label | Column | Notes |
|-------------|-------|--------|-------|
| `widget_tokeny_cta_richtext` | Rich Text | section-5-column-1 (w=6, x=0) | `<h2>` in white + `<p>` body. Widget: `w=12, x=0` |
| `widget_tokeny_cta_buttons` | Buttons | section-5-column-2 (w=6, x=6) | `btn-primary-white` class, links to `/demo`. Widget: `w=12, x=0` |

### section-6 — Final CTA (Full-Width Dark)
Same dark blue background, large padding (150px top/bottom). Split: text block left (col w=8), button right (col w=4, x=8).

| Widget Name | Label | Column | Notes |
|-------------|-------|--------|-------|
| `widget_tokeny_ctah2_heading` | Rich Text | section-6-column-1 (w=8, x=0) | `<h2>` with `color: #ffffff`. Widget: `w=8, x=0` |
| `widget_tokeny_ctah2_subtext` | Rich Text | section-6-column-1 (w=8, x=0) | `<p>` with `color: #d0d0e0`. Widget: `w=8, x=0` |
| `widget_tokeny_ctah2_buttons` | Buttons | section-6-column-2 (w=4, x=8) | `btn-secondary-dark` class, links to `https://www.settlemint.com/request-a-demo`. Widget: `w=4, x=8` |

⚠️ **section-6 uses different column widths and widget widths than the other sections.** Do not use w=12 for these widgets.

---

## Content Framework

### Page Framing
These are audience-first pages, not product-first. The structure is:
1. Start with the audience's world — what do they face, what do they need, what regulations govern them?
2. Then show how DALP is the right fit for that world
3. Close with outcomes — what does working with DALP look like for this audience?

Do NOT open with DALP. Open with the audience.

### Hero (section-1)
- **Eyebrow**: "DALP for [Target]" — exactly this format
- **H1**: Punchy, outcome-led, audience-specific. Must address what this audience actually cares about.
  - For regions: reference regulatory context or market ambition (e.g. "Digital assets, built for Japan's financial regulations")
  - For asset classes: reference the specific lifecycle or complexity (e.g. "Bond tokenization, from issuance to maturity")
  - For sectors: reference what this sector is trying to achieve (e.g. "Asset servicing infrastructure for custodians")
  - For regulations: reference what compliance looks like in practice (e.g. "MiFID II compliance built into every transfer")
- **Intro**: 2-3 sentences. Start with the audience's context (what they face, what's changing in their market). End with a bridge to DALP.
- **CTA**: "See DALP in Action" → `/demo`

No hedging in H1. No em dashes. No banned phrases. Present tense.

### Context Table (section-2)
NOT a competitor comparison. This is an audience-needs table:
- Left column: "What [Target] institutions need" — each row is a specific requirement for this audience
- Right column: "How DALP delivers it" — each row is a specific, verifiable DALP capability
- 8-10 rows covering the most relevant requirements
- Requirements must be real, verifiable needs for this specific audience (from regulatory research, RFPs, buyer questions)
- DALP delivery claims must be verified against capability mapping

### 3 Dark Cards (section-3)
Three audience-specific reasons. Focus on outcomes, not features. Each card:
- `number_text`: Short punchy title (not a number)
- `description`: 2-3 sentences with specific, verified claims. Audience-specific framing.

### Key Capabilities (section-4)
5-6 DALP capabilities most relevant to this audience. Use `<ul>` with `<li>` items starting with `<strong>` labels. Each bullet should address something this audience specifically values. Do not just copy the standard DALP facts list — filter to what matters.

### CTA Banner (section-5)
- H2: Audience-specific question or statement that surfaces the value for this audience specifically
- Body: 1-2 sentences on what DALP covers that matters to them
- Button: "See DALP in Action" → `/demo`

### Final CTA (section-6)
- H2: "Build digital asset operations that meet [Target]'s standards." (adapt to audience)
- Body: 2-3 sentences summarizing the fit + invitation to talk
- Button: "Book a Demo" → `https://www.settlemint.com/request-a-demo`

---

## Schema Markup (headHtml)

Every page must include in `headHtml`:

### 1. FAQ Schema
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is DALP for [Target]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    },
    {
      "@type": "Question",
      "name": "How does DALP support [target-specific regulatory/operational question]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    },
    {
      "@type": "Question",
      "name": "Can DALP be deployed [on-prem/in-region/with data residency]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DALP supports cloud, on-prem, hybrid, and air-gapped deployment via Kubernetes/Helm, with configurable data residency for institutions with sovereignty requirements."
      }
    }
  ]
}
</script>
```

### 2. SoftwareApplication Schema
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SettleMint DALP",
  "description": "Digital Asset Lifecycle Platform for [target] institutions. Covers issuance, compliance, servicing, settlement, and custody via a single EVM-based platform.",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Cloud, On-Premises, Kubernetes",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SettleMint",
    "url": "https://www.settlemint.com"
  }
}
</script>
```

Use 3-4 FAQ items targeting the primary search queries for this audience.

---

## Research Protocol

For each target being written:

1. **Read DALP narrative** (first 300 lines): `/Users/quark/.openclaw/workspace/notion/dalp-narrative.md`
2. **Read relevant capability mapping files** from `/Users/quark/Public/quark/workspace/product/dalp/capability-mapping/`
   - Always read: `compliance-and-identity.md`, `custody-settlement.md`, `asset-lifecycle.md`
   - Read as relevant: `observability-architecture.md`, `deployment-topology-architecture.md`, `operations-and-reliability.md`
3. **Read the RFI question bank**: `/Users/quark/Public/quark/workspace/product/dalp/bid-kit/sections/rfi-question-bank.md`
   - This reveals what institutional buyers in this space actually ask in procurement
   - Use buyer language from the RFI bank in the context table and copy
4. **Web research the target** — fetch and verify:
   - Regulatory framework and key regulations that apply to this audience
   - Key institutions and players in this market
   - Recent market developments and activity (2023-2025)
   - What these institutions care about when evaluating digital asset infrastructure
5. **Check for relevant RFP inputs** (optional): `/Users/quark/Public/quark/workspace/settlemint-office-agents/bid-manager/input/`
   - Real RFPs from institutions in this market reveal specific buyer priorities

---

## DALP Facts — Always Include (Select Relevant Ones)

These facts must appear in relevant pages. Use specific numbers:

| Fact | Value |
|------|-------|
| Blockchain support | EVM-only: Hyperledger Besu + Ethereum + any EVM network |
| Asset templates | 7: bonds, deposits, stablecoins, equity, funds, real estate, precious metals |
| CLI commands | 298 |
| Grafana dashboards | 21 pre-built |
| Observability stack | VictoriaMetrics (metrics), Loki (logs), Tempo (traces), Grafana |
| Access control | RBAC/ABAC, maker-checker approval workflows |
| Custody | HSM compatibility, Fireblocks + DFNS integration, weighted multisig vaults |
| Settlement | XvP/DvP atomic settlement with HTLC hashlock |
| Deployment | On-prem, air-gapped, hybrid, cloud via Kubernetes/Helm |
| Compliance modules | 12 module types |

Select 4-6 of these based on what matters to the target audience. Not all facts are equally relevant to every audience.

---

## 🔴 EM DASHES FORBIDDEN (Roderik directive, 2026-03-24)

**NEVER use em dashes (—) anywhere in copy.** This is a hard rule with no exceptions.
- No em dashes in headings, body text, table cells, CTAs, or any section
- Use a comma, colon, period, or rewrite the sentence instead
- Treat any — character as a hard error that must be fixed before publishing

---

## SOUL.md Banned Phrases — NO-GO LIST

The following phrases are **absolutely banned** in all page copy. Never write them:

**Hard stops:**
- "production-grade" / "production grade" / "production-ready" / "production ready"
- "enterprise-grade" / "enterprise grade" / "enterprise-ready"
- "from pilot to production" / "pilot to production" / "pilot purgatory" / "pilot trap" / "stuck in pilot mode"
- "from ambition to" / "ambition to production" / "from ambition to scalability"
- "fragmented stack" as DALP's value story
- "stitched together" / "cobbled together" / "patchwork"
- "we aim to" / "we aspire to" / "we strive to"
- "designed to help you" / "helping you to achieve" / "enabling you to realize"
- "on the path to" / "journey to" / "vision to"
- "bridge the gap" / "from PoC to" / "from proof of concept to"

---

## Canonical URL

Every page must have `linkRelCanonicalUrl` set to `https://www.settlemint.com/for/[slug]`.
This must also appear in the headHtml or as a link tag.
