---
title: Joint Response: Digital Post-Trade FMI for NGEX
author: CMA Small Systems AB and SettleMint NV
subject: NGEX Joint Proposal
---

# Joint Response: Digital Post-Trade FMI for NGEX
### CMA Small Systems AB + SettleMint NV
Prepared for Next Generation Holding – L.L.C – S.P.C (NGEX) • Abu Dhabi • 13 March 2026

---

## Agenda
- NGEX vision and the opportunity
- Why a joint response now
- CMA credentials and post-trade infrastructure footprint
- SettleMint DALP capabilities for regulated digital assets
- Joint operating model and solution architecture
- Security, compliance, implementation, and delivery approach
- Why CMA + SettleMint is the right delivery team

---

## Executive Summary
### The complexity of doing it right
- NGEX is not building a demo; it is building market infrastructure that must be resilient, auditable, and regulator-ready.
- Tokenization itself is easy. The hard part is trade ingestion, settlement coordination, compliance enforcement, reconciliation, governance, and 24/7 operations.
- CMA brings proven post-trade orchestration, settlement workflows, reconciliation, monitoring, and reporting.
- SettleMint brings DALP: token lifecycle management, on-chain identity, compliance controls, DvP/XvP settlement, and immutable audit trails.
- Together, the joint solution gives NGEX one integrated operating model for digital twins today and broader digital securities tomorrow.

---

## NGEX Vision
- NGEX, a wholly owned subsidiary of ADQ, is building a digital securities post-trade and settlement infrastructure for the region.
- The MVP starts with tokenized ETF units issued as digital twins while the underlying securities remain immobilized in conventional infrastructure.
- The objective is to prove the operating model in a controlled environment, then extend the same foundation to bonds, equities, funds, and native digital issuance.
- The design goal is practical modernization: lower friction, stronger transparency, and a future-proof post-trade stack.

---

## Why a Joint Response
- This initiative sits across two disciplines that are rarely covered credibly by one vendor.
- **CMA** covers FMI-grade post-trade operations: trade intake, settlement workflows, reconciliation, exception handling, and reporting.
- **SettleMint** covers the digital asset lifecycle: issuance, compliance, identity, custody integration, settlement, servicing, and retirement.
- NGEX gets a complete stack with clear accountability instead of stitching together point solutions and carrying the integration risk itself.
- The joint response is built around one idea: a production operating model matters more than a flashy token demo.

---

## CMA Overview
- Swedish technology company with more than 30 years focused on financial institutions and financial market infrastructures.
- Systems deployed in **55+ countries** across national, regional, and cross-border financial infrastructures.
- Proven in mission-critical environments serving central banks, depositories, payment operators, and market institutions.
- Relevant references include **BUNA**, **Bank Indonesia**, **Vietnam Securities Depository**, **MAS Singapore**, and **State Bank of Pakistan**.
- CMA's role here: the operational control layer for NGEX post-trade processing.

---

## CMA Product Portfolio
- **DEPO/X** — central securities depository and registry: custody, issuance, settlement, and corporate actions.
- **TMS/X** — transaction management and integration across institutions and infrastructure layers.
- **TRAD/X** — electronic trading for bonds, equities, treasury instruments, and other capital markets products.
- **RTS/X** — real-time gross settlement and liquidity management.
- **IPS / BCS/X** — retail and instant payment systems for high-volume transaction environments.
- **CAP/X** — participant connectivity for brokers, custodians, and market participants.

| Platform | Relevance to NGEX |
| --- | --- |
| DEPO/X | Securities custody, registry, settlement, corporate actions |
| TMS/X | Trade intake, workflow coordination, integration |
| CAP/X | Participant access and operational connectivity |

---

## SettleMint Overview
- SettleMint is the digital asset lifecycle platform company for regulated financial markets and sovereign use cases.
- Nearly a decade of focused experience building blockchain infrastructure for institutions, not speculative crypto tooling.
- Live work spans regulated banks in Asia and Europe, sovereign-scale programmes in the Middle East, and market infrastructure use cases.
- DALP is the platform outcome of that experience: one operating layer from asset design through issuance, compliance, settlement, servicing, and retirement.
- For NGEX, SettleMint provides every blockchain and tokenization component in the joint solution.

---

## DALP Core Capabilities
- Supports **7 asset classes** out of the box: bonds, equities, funds, deposits, stablecoins, real estate, and precious metals, plus a configurable token type.
- Built on **ERC-3643** with **OnchainID** for regulated-token compliance and verifiable on-chain identity.
- Provides **18 configurable compliance module types** covering country restrictions, investor eligibility, supply limits, holding periods, and transfer controls.
- Delivers maker-checker governance, five-role RBAC, emergency pause, custody integration, and immutable audit trails.
- Enables atomic **DvP/XvP** settlement and multi-ledger EVM deployment across public or permissioned networks.

---

## Joint Positioning
### Clear separation, one integrated operating model
- **CMA** runs the post-trade operating backbone:
  - Trade confirmation ingestion
  - Settlement workflow orchestration
  - Reconciliation and exception handling
  - Operational monitoring and regulatory reporting
- **SettleMint DALP** runs the digital asset layer:
  - Token issuance, transfer, burn, and servicing
  - On-chain identity and compliance enforcement
  - DvP/XvP settlement and wallet integration
  - Immutable on-chain evidence and governance trails
- **NGEX** governs the ecosystem, participant model, trading venue, custody model, and regulatory coordination.

---

## Target Operating Model — MVP
- Start with a controlled MVP: tokenized ETF units as digital twins, limited participants, one external trading venue, and gross settlement.
- Trading venue execution remains out of scope; trade confirmations flow into the CMA platform.
- CMA validates and normalizes trade data, generates settlement instructions, and coordinates the downstream workflow.
- DALP executes the on-chain asset transfer with pre-trade compliance checks and atomic settlement logic.
- CMA then reconciles on-chain state against custody records for the immobilized underlying securities.

---

## Target Operating Model — Run State
- The same architecture extends beyond the MVP without redesign.
- CMA can add more trading venues, broader participant connectivity, and more advanced settlement models.
- DALP can add more asset classes through existing templates for bonds, equities, funds, deposits, and custom instruments.
- Compliance modules can evolve with jurisdictional rules without rewriting smart contracts.
- NGEX can grow from digital twins into native digital issuance while preserving the same governance and operating controls.

---

## Architecture Overview
- **Layer 1 — External trading venues:** execute trades and send confirmations.
- **Layer 2 — CMA post-trade platform:** ingestion, workflow orchestration, reconciliation, monitoring, reporting, and corporate actions.
- **Layer 3 — DALP:** token lifecycle, compliance engine, OnchainID, DvP/XvP, custody integration, and observability.
- **Layer 4 — Blockchain network:** EVM-compatible ledger as the authoritative token registry.
- **Layer 5 — External infrastructure:** custodian/CSD for immobilized securities, settlement bank for cash, KYC/AML providers, and cloud infrastructure.

| Integration flow | Primary owner |
| --- | --- |
| Venue confirmation to post-trade control | CMA |
| Settlement instruction to token layer | CMA + DALP |
| On-chain registry state back to reconciliation | CMA + DALP |
| Custody and cash leg coordination | CMA with third parties |

---

## Key Solution Area 1 — Settlement and DvP
- DALP executes atomic Delivery-versus-Payment and Exchange-versus-Payment so asset and cash legs complete together or revert together.
- Deterministic closure ensures every settlement ends in an auditable state: executed, cancelled, or expired-withdrawn.
- CMA orchestrates the end-to-end settlement workflow and manages the off-chain dependencies around the cash leg and participant coordination.
- The combined model reduces counterparty risk while preserving operational control and evidence.

---

## Key Solution Area 2 — Compliance and Identity
- Every wallet must have a verified identity through **OnchainID** before it can receive regulated tokens.
- DALP enforces compliance **before execution**, not after: country restrictions, investor accreditation, allowlists, freezes, holding periods, and sanctions hooks.
- Compliance rules are configurable through modules rather than hard-coded rewrites, so NGEX can adapt faster to regulatory change.
- CMA complements this with operational validation steps, audit evidence, and integration into broader compliance workflows.

---

## Key Solution Area 3 — Reconciliation and Exception Handling
- The digital twin model only works if on-chain token supply remains continuously aligned with immobilized underlying securities.
- CMA runs reconciliation between ledger state and custody records at configurable intervals with automated break detection.
- DALP enforces supply limits and maker-checker controls around mint and burn actions.
- When a discrepancy occurs, CMA drives structured triage, documented resolution, and evidence production for regulated review.
- This is where infrastructure-grade operations separate themselves from prototype token platforms.

---

## Security and Resilience
- Defense-in-depth across network, application, smart contract, and operations layers.
- DALP supports encrypted database, cloud secret manager, HSM, Fireblocks, and DFNS-backed key management patterns.
- Five-role RBAC, multi-approver governance, emergency pause, and formal recovery procedures reduce operational risk.
- CMA provides resilient post-trade infrastructure patterns proven in national and regional financial systems.
- Both platforms support 24/7 operation, monitoring, alerting, investigation workflows, and incident response integration.

---

## Regulatory and Compliance Framework
- The architecture is designed for regulated environments where auditability and segregation of duties are not optional.
- DALP aligns with regulated token standards and supports evidence outputs for KYC/KYB, identity claims, compliance checks, governance actions, and settlement events.
- CMA produces operational reports covering processing, settlement, reconciliation, participant activity, and supervisory reporting.
- NGEX remains the accountable operator for market rules, participant onboarding, and coordination with regulators.
- The design is suitable for UAE deployment patterns, GCC oversight expectations, and later expansion to other regulated frameworks.

---

## Implementation Approach — Phase Plan
- **Weeks 1–4:** architecture, design workshops, compliance mapping, integration planning.
- **Weeks 5–12:** CMA platform configuration, DALP deployment, blockchain setup, custody and venue integration.
- **Weeks 13–17:** functional, integration, scenario, performance, and security testing.
- **Weeks 18–22:** controlled pilot deployment, training, go-live gating, and launch.
- **Weeks 23–26:** hypercare, operational support, issue resolution, and knowledge transfer.

---

## Implementation Approach — Governance and Dependencies
- NGEX designates project sponsor, project manager, operational stakeholders, and regulatory decision-makers.
- Early decisions are required on trading venue, custody provider, settlement-bank model, hosting model, and blockchain network selection.
- Critical-path dependencies are venue readiness, custody readiness, cash-leg readiness, regulatory approval, and staffing.
- The joint team mitigates these risks through early interface definition, phased testing, and parallel workstreams where possible.
- Go-live readiness is assessed formally across functionality, security, operations, and regulatory preparedness.

---

## MVP Scope and Timeline
- Initial scope focuses on **tokenized ETF units** as digital twins in a tightly controlled participant environment.
- One external venue, one defined settlement model, and clear custody coordination keep the MVP operationally disciplined.
- Core scope includes trade intake, settlement orchestration, DvP execution, reconciliation, monitoring, reporting, and governance controls.
- Indicative timeline to MVP go-live: **19 to 24 weeks** from kickoff, followed by hypercare.
- The MVP is designed as a foundation, not a throwaway pilot.

---

## Team and Governance
- **NGEX**: platform operator, ecosystem governance owner, regulator interface, participant onboarding authority.
- **CMA**: accountable for post-trade orchestration capability, settlement workflow coordination, reconciliation, operational dashboards, and reporting.
- **SettleMint**: accountable for DALP, token lifecycle operations, compliance enforcement, identity framework, settlement engine, and custody integration.
- **Third parties**: trading venue, custodian/CSD, settlement bank, KYC/AML provider, and hosting provider where selected.
- Cross-platform maker-checker and segregation-of-duties controls keep accountability explicit rather than implied.

---

## Risk Management
- **Integration risk:** reduced through clear separation of responsibilities and API-based interfaces between CMA and DALP.
- **Reconciliation risk:** managed through continuous supply checks, supply limits, and break-handling workflows.
- **Compliance risk:** reduced by ex-ante enforcement and governed policy changes rather than manual after-the-fact review.
- **Operational risk:** reduced by monitoring, alerting, retry semantics, dead-letter handling, and documented incident response.
- **Technology lock-in risk:** reduced by CMA's ledger-neutral orchestration model and DALP's multi-EVM network support.

---

## Why CMA + SettleMint
- NGEX needs both **institutional post-trade muscle** and **production-grade digital asset controls**.
- CMA has spent decades operating where resilience, governance, and regulatory confidence matter.
- SettleMint has spent years turning tokenization from pilot theatre into real operating infrastructure for regulated institutions.
- The joint solution closes the gap between traditional FMI expectations and digital asset execution.
- Bottom line: CMA + SettleMint gives NGEX the shortest credible path from MVP to a scalable digital post-trade infrastructure.

---

## Closing and Contact
### Building the right infrastructure, not just a demo
- NGEX has the chance to establish a regional benchmark for digital post-trade infrastructure.
- This proposal is built to validate the model quickly without compromising the controls needed for production.
- CMA and SettleMint are ready to move into architecture workshops, integration planning, and detailed solution scoping.
- Contact: CMA Small Systems AB and SettleMint NV joint response team.
SettleMint NV joint response team.
