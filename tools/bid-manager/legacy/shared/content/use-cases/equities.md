# Equities

## Problem Statement
Equity tokenization usually gets pitched as digital issuance, but the hard part is controlling who can hold, transfer, and service the instrument once it is live. Teams end up with manual investor controls, fragmented cap table processes, and corporate actions that still run outside the platform.

## DALP Solution
DALP supports equity issuance under the same governed lifecycle model used across regulated assets. Equity can be created through class-specific issuance orchestration, linked to verified identities and compliance policies, and operated with transfer controls, servicing events, and optional voting-power infrastructure where the use case requires it.

## Key Differentiators
- Equity is a supported DALP asset class, not a generic ERC-20 wrapped in marketing language.
- Compliance is identity-aware and enforced before transfer using OnchainID, ERC-3643-aligned hooks, and transfer policies.
- DALP extends beyond issuance into settlement, servicing, audit trails, and integration with custody and enterprise systems.
- Voting-power support exists in the configurable feature stack, but DALP is positioned honestly as lifecycle infrastructure, not a trading venue.

## Slide Content Blocks

### Title Slide Content
- **Title:** Equity tokenization with governance and transfer control
- **Subtitle:** A regulated operating model for issuance, investor eligibility, and lifecycle servicing
- **Recommended layout:** Slide 8 or Slide 15

### Problem Slide
- Equity programs often digitize issuance but keep transfer control and servicing in manual operational layers
- Investor accreditation, jurisdiction rules, and holding restrictions become exception-driven compliance work
- Corporate actions, entitlement tracking, and ownership evidence remain fragmented across systems
- Point solutions rarely give institutions a reusable path across other asset classes or jurisdictions

### Solution Slide
- **Pre-built equity issuance path** with class-aware validation and deterministic asset creation workflows
- **Identity registry + compliance modules** connect verified investor claims to ex-ante transfer control
- **Settlement and custody integration points** support institutional operating boundaries instead of retail-style wallets only
- **Lifecycle servicing and voting-power feature support** extend the platform beyond day-one issuance

### Architecture Slide
- DALP defines the equity instrument, metadata, and issuance parameters through governed workflows
- OnchainID-backed identity profiles and compliance modules determine who can receive and transfer the asset
- Transfer execution runs through DALP compliance hooks before state changes are finalized on-chain
- Read models, audit trails, and integration surfaces connect equity operations to reporting, custody, and core systems

### Benefits Slide
- Reduce manual investor validation and transfer exceptions through policy enforcement before execution
- Improve auditability by keeping issuance, identity checks, and lifecycle events on one platform record
- Shorten time to launch by reusing a pre-built equity asset class rather than custom contract design
- Create an expansion path from one equity program to broader multi-asset infrastructure without re-architecting

## Supporting Proof Points
- Equity is one of DALP’s seven pre-built asset classes with class-specific factory dispatch and validation
- Canonical narrative positions servicing and lifecycle control as core differentiators beyond issuance
- Capability mapping documents voting-power as an available feature while staying honest about product scope
- Sources: `notion/dalp-narrative.md`, `product/dalp/capability-mapping/asset-lifecycle.md`, `product/dalp/capability-mapping/compliance-and-identity.md`, `product/dalp/capability-mapping/dalp-asset-factory-architecture.md`
