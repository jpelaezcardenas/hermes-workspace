# DALP Overview

## Suggested Slide Title
DALP: One Platform for the Full Digital Asset Lifecycle

## Suggested Layout
- Primary: Slide 6 - big statement with supporting bullets
- Alternate: Slide 5 - lifecycle capability overview

## Key Talking Points
- DALP is SettleMint's Digital Asset Lifecycle Platform for designing, launching, and operating tokenized assets
- Covers issuance, compliance, custody integration, settlement, and servicing in one operating model
- Built for regulated institutions that need governance, auditability, and production reliability
- Solves the real problem: the complexity of doing tokenization right at scale
- **True composability**: one contract type (DALPAsset) represents any financial instrument by combining runtime-pluggable token features and compliance modules. No fixed token types. Features and compliance rules are building blocks that can be mixed, matched, added, and removed at any time, even after deployment.

## Composability as Key Differentiator
- One configurable contract (DALPAsset) replaces 7 legacy specialized contract types
- 11 runtime-pluggable token features across 4 categories (fees, governance, lifecycle, transformation)
- 12 composable compliance modules across 6 categories with RPN expression engine
- 7 pre-seeded regulatory templates (MiCA EU, Reg D 506(b)/(c), MAS Singapore, UK FCA, Japan FSA, Reg CF)
- Up to 32 features per token, atomic replacement via setFeatures()
- Post-deployment reconfiguration: add/remove features and compliance modules without redeploying
- Free-form asset type names: create "carbon-credit", "invoice", "loyalty-point", anything
- Organizations can create custom asset classes, custom compliance templates, and custom feature implementations

## Supporting Proof Points
- Supports 7 pre-built asset presets: bonds, equity, funds, deposits, stablecoins, real estate, and precious metals (starting points, not limits)
- Extends beyond presets through the composable DALPAsset model with any combination of features and modules
- Configuration-driven: hours to days per instrument type versus 3-7 months with traditional custom development
- Sources: `notion/dalp-narrative.md`, `product/dalp/positioning/complexity-of-doing-it-right.md`, `product/dalp/composability.md`
