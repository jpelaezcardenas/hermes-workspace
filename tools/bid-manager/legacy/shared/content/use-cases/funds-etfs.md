# Funds and ETFs

## Problem Statement
Funds and ETF-style structures suffer from slow subscription and redemption cycles, manual investor checks, and too many disconnected handoffs between transfer agents, administrators, and reporting systems. Even when issuance is digitized, NAV-linked operations, distributions, and investor servicing usually stay fragmented.

## DALP Solution
DALP supports fund-style asset operations with class-specific issuance workflows, investor eligibility controls, subscription and redemption handling, distribution-related servicing, and integration points for valuation or NAV data. Fund-specific economics can map into configurable features such as AUM fee support, while identity and transfer controls stay consistent across the lifecycle.

## Key Differentiators
- Fund is a pre-built DALP asset class with class-aware issuance and lifecycle handling.
- DALP combines investor identity, compliance, servicing, and settlement instead of isolating issuance from operations.
- Fund-specific parameters such as management-fee-related behavior map into the configurable asset factory model.
- The same platform can support a first tokenized fund and later expand into adjacent instruments without stack sprawl.

## Slide Content Blocks

### Title Slide Content
- **Title:** Funds and ETFs need lifecycle operations, not just issuance
- **Subtitle:** Subscription, redemption, investor controls, and servicing on one governed platform
- **Recommended layout:** Slide 18 or Slide 21

### Problem Slide
- Subscription and redemption workflows are still too dependent on batch processing and manual coordination
- Investor onboarding, jurisdiction checks, and transfer rules create friction across distribution channels
- NAV-linked reporting, fee handling, and distribution events remain operationally fragmented
- Issuance-only platforms do not solve the day-two fund operating model

### Solution Slide
- **Pre-built fund asset class** with class-specific creation workflows and investor lifecycle handling
- **Identity registry + compliance modules** govern who can subscribe, hold, and transfer units
- **AUM-fee and lifecycle feature support** extend the asset model beyond static token issuance
- **Integration-ready operating model** connects fund operations to valuation feeds, custody, and reporting systems

### Architecture Slide
- DALP creates the fund instrument through governed asset workflows with class-specific parameters
- Verified identities and claim-based policies drive investor eligibility, transfer restrictions, and distribution rules
- External valuation or NAV data can feed operating processes without DALP pretending to be the oracle network itself
- Servicing, claims, and settlement events run through the same control plane used for issuance and compliance

### Benefits Slide
- Compress investor onboarding and subscription operations by reusing identity and compliance profiles across workflows
- Reduce manual fund servicing work by keeping fees, redemptions, and lifecycle events in a governed platform
- Improve distribution readiness through a programmable operating model instead of transfer-agent-heavy exception handling
- Reuse the same infrastructure for funds, ETFs, deposits, bonds, or other regulated products as the program scales

## Supporting Proof Points
- Fund is one of DALP’s seven pre-built asset classes with type-specific workflow routing
- Capability mapping links fund management fees to the configurable `aum-fee` feature in the DALP asset factory
- Canonical narrative calls out subscription/redemption improvement, NAV integration, and fund-like instruments on one platform
- Sources: `notion/dalp-narrative.md`, `product/dalp/capability-mapping/asset-lifecycle.md`, `product/dalp/capability-mapping/dalp-asset-factory-architecture.md`, `product/dalp/capability-mapping/feeds.md`, `product/dalp/capability-mapping/compliance-and-identity.md`
