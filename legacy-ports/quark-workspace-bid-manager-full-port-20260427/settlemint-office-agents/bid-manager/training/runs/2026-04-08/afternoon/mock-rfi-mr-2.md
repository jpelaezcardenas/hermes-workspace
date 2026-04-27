# Request for Information, Post-Trade Modernization Platform

**Issuing Institution:** Valmere Stock Exchange

**Issue Date:** 8 April 2026

**Response Due Date:** 22 April 2026

**RFI Reference:** VSE-RFI-PTM-2026-04

---

## Background

Valmere Stock Exchange is a mid-tier national exchange operating cash equities markets for domestic and regional issuers. The exchange currently relies on a legacy central securities depository and clearing environment built around end-of-day batch processes, fragmented participant interfaces, and reconciliation-heavy operating procedures. The exchange is evaluating a modern post-trade platform that can reduce settlement risk, shorten the settlement cycle to T+0 where appropriate, and provide a practical migration path from its current dematerialized holdings register.

The target operating model must support the exchange, its clearing operations, participant firms, and the national securities regulator through a shared, auditable infrastructure. Valmere Stock Exchange is seeking information from technology providers with experience in digital asset infrastructure, regulated market operations, securities settlement workflows, and integration with institutional market infrastructure.

---

## Objectives

Valmere Stock Exchange is gathering information to assess whether a modern digital securities platform can:

- reduce counterparty and reconciliation risk through same-transaction asset and cash settlement
- support listed equity instruments and the full post-trade lifecycle
- integrate with existing order matching, participant, and reporting systems
- improve transparency for operations, risk, and regulatory supervision
- enable phased migration from the current securities record model to a more modern architecture

---

## Scope of Information Requested

Respondents are asked to describe their platform capabilities, implementation approach, operating model, and delivery boundaries in the following areas.

## Settlement Architecture

Please describe how your platform supports T+0 settlement for listed equities, including the mechanism used to ensure that securities transfer and the corresponding cash movement remain synchronized. Explain which parts of the settlement flow are native platform capabilities and which depend on integration with external payment rails, cash tokens, or banking systems.

Describe how settlement instructions are created, approved, matched, executed, cancelled, and expired. Include any support for bilateral or multi-party settlement workflows, settlement windows, participant approvals, and exception handling.

## Integration with Existing Exchange Infrastructure

Explain how your platform integrates with an existing order matching engine without requiring immediate replacement of the exchange trading stack. Describe the interfaces you expose for order execution events, settlement instruction creation, trade enrichment, and post-trade status updates.

Please state whether you provide native support for market infrastructure protocols such as FIX, ISO 20022, SWIFT messaging, or equivalent institutional messaging standards. Where native support is not available, explain the integration pattern you recommend.

## Equity Instrument Support and Corporate Actions

Describe how listed equities are represented on your platform. Explain how the platform manages issuance, transfer, ownership records, and participant holdings.

Provide details on how the platform supports corporate actions, including at minimum:

- cash dividends
- rights issues
- stock splits and reverse splits
- treasury or buyback related events
- record date and holder snapshot processing

For each of these, distinguish between native support, configurable workflows, and functionality that depends on external registrar, issuer, or corporate action processing systems.

## Participant Onboarding and Access Control

Explain how brokers, custodians, clearing participants, and exchange operators are onboarded. Describe identity verification, participant roles, permissions, approval workflows, and segregation of duties.

Please include how the platform handles participant lifecycle events such as suspension, reinstatement, role changes, and wallet or account recovery.

## Regulatory Reporting and Supervisory Access

Describe how your platform supports regulatory oversight and reporting to a national securities regulator. Explain what data is captured in the audit trail, how regulators can access it, and whether read-only supervisory access is supported.

State clearly whether your platform natively generates jurisdiction-specific regulatory reports or instead provides the underlying data and export interfaces for external reporting systems.

## Migration from Existing Dematerialized Holdings

Explain your recommended migration approach from an existing book-entry or dematerialized holdings environment. Please address data quality review, opening position import, participant readiness, reconciliation, parallel run options, and cutover sequencing.

Describe how you would manage mismatches between legacy holdings records and the new platform during a transition period.

## Availability, Resilience, and Operations

Valmere Stock Exchange requires 99.99% service availability with proven failover mechanisms. Please describe your deployment architecture options, high-availability model, data replication approach, and disaster recovery strategy.

Include your approach to operational monitoring, alerting, incident response, backups, and recovery objectives. If performance depends on the selected blockchain network or hosting model, explain that dependency explicitly.

## Security and Control Framework

Describe your security model across application, smart contract, key management, and infrastructure layers. Include role-based access control, transaction approval controls, separation of duties, and auditability.

Please describe how the platform supports controlled administrative actions such as forced transfers, freezes, or other court or regulatory interventions where legally required.

## Implementation Approach

Provide an indicative implementation approach for a phased deployment covering design, integration, participant onboarding, test cycles, migration, and production launch. Include major workstreams, critical dependencies, and the areas where exchange-side decisions materially affect delivery.

## Vendor Response Format

Respondents should provide:

- an executive summary
- a capability response for each section above
- a clear statement of native capabilities, configuration-based capabilities, and integration-dependent capabilities
- key assumptions and dependencies
- relevant implementation examples or reference patterns from comparable regulated environments

---

## Evaluation Emphasis

Valmere Stock Exchange will prioritize responses that show clear delivery boundaries, operational realism, and credible migration planning. Responses that overstate native capability or blur the line between platform features and project-specific integration work may be marked down.
