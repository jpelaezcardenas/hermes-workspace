# Stock image library for SettleMint presentations

Shared presentation-safe visuals for SettleMint decks, proposals, and lightweight collateral.

## What changed

This library now has a stronger **real-photography layer** on top of the original generic stock set and the first-pass DALP-themed generated illustrations.

- **54 total assets** across **15 categories**
- **39 Pexels photos**
- **15 workspace-generated DALP / tokenization illustrations**
- **18 new photographic additions** covering:
  - digital assets and trading desks
  - enterprise software and developer environments
  - compliance / document review / legal-office style moments
  - custody / security / infrastructure
  - settlement / payment rails
  - fintech / market-data workflows

The point is simple: ppt-maker and related agents now have better visuals for **blockchain, digital assets, custody, compliance, fintech, settlement, and enterprise software** without leaning too hard on generic handshake photos or abstract AI art.

## Structure

```text
stock-images/
  abstract/
  architecture/
  blockchain/
  business/
  compliance/
  custody/
  dalp/
  digital-assets/
  finance/
  fintech/
  settlement/
  software/
  teamwork/
  technology/
  tokenization/
  metadata/
    index.json
    categories.json
    build_index.py
  scripts/
    generate_thematic_images.py
  USAGE-EXAMPLES.md
```

## Category inventory

### Legacy general photo categories
- `abstract/` — 3 photos
- `architecture/` — 3 photos
- `blockchain/` — 3 photos
- `business/` — 3 photos
- `finance/` — 3 photos
- `teamwork/` — 3 photos
- `technology/` — 3 photos

### DALP-oriented mixed categories
These now combine the original generated illustrations with real photography.

- `compliance/` — 6 assets total
- `digital-assets/` — 6 assets total
- `software/` — 6 assets total

### DALP-oriented illustration-only categories
- `dalp/` — 3 generated illustrations
- `tokenization/` — 3 generated illustrations

### New photographic categories added in this pass
- `custody/` — 3 photos
- `fintech/` — 3 photos
- `settlement/` — 3 photos

## Best-use guidance

### Use these first for DALP / platform / digital asset decks
- `digital-assets/` — tokenized-asset narrative, holders, market activity, operator workflows
- `software/` — APIs, enterprise platforming, dev teams, implementation credibility
- `compliance/` — controls, reviews, policy, regulated workflow framing
- `custody/` — security posture, safekeeping, infra trust, controlled access
- `fintech/` — market-data, trading operations, analytics, capital-markets tone
- `settlement/` — transaction flow, payments, cash movement, rail modernization

### Use these as support layers
- `dalp/` — when you want a cleaner conceptual background rather than literal photography
- `tokenization/` — issuance / lifecycle / fractionalization stories
- `blockchain/`, `finance/`, `technology/` — broader context
- `business/`, `teamwork/` — stakeholder and delivery slides
- `abstract/` — section breaks and low-noise backgrounds

## Photo sourcing and license

### Photography
- Source site: https://www.pexels.com/
- License summary: https://www.pexels.com/license/
- Attribution is appreciated but not required by Pexels.
- New photo assets were normalized to **1920×1080** for slide-friendly use.

### Generated illustrations
- Created locally in this workspace for internal SettleMint use
- Best used as presentation backgrounds or conceptual support art
- Do **not** use them as evidence of product functionality

## Important caveats

- Some photographic assets include **screens, dashboards, terminals, or documents**. They are presentation-safe in context, but if a slide will go to a highly sensitive external audience, do a quick human review for visible logos, card details, or screen text.
- Use **DALP screenshots and diagrams** for product proof. Use this library for framing, mood, and narrative support.
- Dark overlays and sensible cropping still matter. Don’t drop dense text straight on top of a busy photo and blame the library.

## Metadata and indexing

Use the machine-readable catalog instead of guessing filenames:

- `metadata/index.json` — full asset index with counts, source URL, style, dimensions, tags, and recommended usage
- `metadata/categories.json` — category summary, including photo/generative mix per category
- `metadata/build_index.py` — regenerates the catalog after additions

## Usage examples

See `USAGE-EXAMPLES.md` for concrete slide-level recommendations and path examples.
