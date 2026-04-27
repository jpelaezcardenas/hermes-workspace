# Response to Request for Information, Post-Trade Modernization Platform

## Executive Summary

Valmere Stock Exchange is seeking a post-trade architecture that shortens settlement cycles, reduces reconciliation effort, and gives operations and regulators a cleaner, more auditable view of securities ownership. DALP is well suited to that objective because it combines regulated asset tokenization, configurable compliance controls, identity-linked participant onboarding, and atomic settlement workflows within a single operating model. For an exchange environment, that means the asset register, transfer controls, participant permissions, and settlement events can be governed together rather than stitched across separate tools.

The strongest fit is the move toward T+0 settlement for listed equities where the exchange wants to reduce counterparty exposure and free trapped collateral. DALP supports atomic exchange workflows for asset and payment flows, with approval states, expiry handling, and participant validation built into the settlement process. That provides a practical base for same-transaction settlement when the cash leg is represented in a compatible on-chain form or coordinated through an integrated settlement process. Where external fiat rails remain in the loop, the platform still provides the securities control layer and audit trail, but final cash synchronization depends on the connected payment infrastructure.

DALP also aligns well with the governance and control requirements of a market infrastructure operator. Identity and compliance checks are enforced before issuance and transfer, permissions can be separated across exchange, custodian, and supervisory roles, and historical balance tracking supports record-date driven processes such as dividend eligibility and other holder-based events. This gives the exchange a path to modernize post-trade operations without discarding the institutional controls that regulators and market participants expect.

Several requirements in this RFI sit outside pure out-of-the-box platform scope and should be framed honestly. DALP does not ship as a full order matching engine, a national regulatory filing engine, or a native FIX connectivity layer. Those parts of the target model are handled through integration. In the same way, 99.99% availability is an end-to-end service objective that depends on deployment topology, operational discipline, and the characteristics of the selected blockchain and hosting environment, not on application software alone. A credible program therefore uses DALP as the digital securities and post-trade control layer, with exchange-specific connectivity and reporting flows designed around it.

## Settlement Architecture

DALP supports atomic exchange workflows that are directly relevant to T+0 post-trade settlement. The platform manages settlement instructions with explicit participant involvement, approval status, deadline handling, and execution controls, which creates a reliable control model for securities settlement rather than a simple transfer trigger. In practice, this allows the exchange to create a settlement instruction from a matched trade, bind the asset and payment flows together, and execute them only when the required participants and conditions are satisfied.

This is the right architectural base for reducing counterparty risk because the securities transfer does not need to be released independently from the payment obligation. When the cash leg is represented by an on-chain settlement asset, or by a tightly orchestrated external payment process, DALP can support true atomic settlement logic for the transaction. If the exchange keeps the cash leg on existing fiat infrastructure, DALP still adds value by controlling the securities movement, participant approvals, expiry, and exception workflow, but the final degree of simultaneity depends on how the external payment connection is implemented.

The platform also provides the operational mechanics that post-trade teams need when a settlement cannot simply execute immediately. Instructions can be approved by the relevant participants, prevented from executing when conditions are incomplete, and expired when the valid settlement window has passed. That matters for a market infrastructure environment because failed or stale settlement instructions create operational and regulatory risk unless they are governed through explicit lifecycle states.

## Integration with Existing Exchange Infrastructure

DALP is designed to sit alongside existing institutional systems rather than forcing a wholesale replacement on day one. For Valmere Stock Exchange, the practical pattern is to keep the order matching engine in place and integrate execution events into the DALP post-trade layer. Once an order is matched, the exchange can send the trade details into the platform to create the corresponding securities settlement workflow, enrich it with participant and instrument metadata, and feed settlement status back into exchange operations and participant systems.

That integration boundary is important. DALP is not an order matching engine and should not be positioned as one. Its role begins once the trade event is authoritative and the post-trade process needs to control entitlement, transfer restrictions, settlement state, and audit evidence.

The platform is API-first and can support integration patterns suitable for exchange infrastructure programs. ISO 20022 alignment is a sensible target for settlement and reconciliation data exchange, and DALP can participate in that model through integration design. Pre-built native FIX connectivity is not part of the shipped product, so connectivity to dealer or exchange trading systems would normally be handled through a middleware layer that translates exchange events into DALP workflow calls and returns status updates in the protocol each connected system expects.

## Equity Instrument Support and Corporate Actions

DALP natively supports equity tokenization and the associated ownership record model needed for listed securities. Equity instruments can be issued with identity-linked holdings, compliance controls, custodial intervention capability where legally required, and historical balance tracking for audit and entitlement purposes. That gives the exchange a controlled digital register of positions rather than a loose wallet-based transfer model.

Corporate action support is strongest where the event depends on position snapshots, entitlement logic, and distribution or supply changes. Historical balance features are particularly relevant because they allow the platform to determine who held a position at a specific record date, which is the foundation for dividend and other holder-based processes. Fixed-rate distribution features and yield-style distribution logic provide a usable pattern for cash distributions where an amount has already been calculated and approved by the issuer or market operator.

For stock splits, reverse splits, buybacks, and similar security lifecycle events, the platform provides the token-side controls needed to change balances, manage supply, and preserve an auditable history of what occurred. Forced transfer and custodial controls are also available where legal orders, sanctions actions, or correction workflows require them. That makes DALP a credible control layer for equity operations in regulated environments.

Rights issues require a more nuanced boundary statement. DALP can support the entitlement and allocation side of a rights event through holder snapshots, identity-linked eligibility, and issuance workflows, but a full exchange-grade rights subscription process, with market communications, election handling, and timetable management, is usually part platform and part registrar or market operations process. The platform supports the digital asset record and control points; the surrounding market event choreography is implementation-dependent.

## Participant Onboarding and Access Control

A post-trade platform succeeds only when participant identity and authority are unambiguous. DALP addresses that through identity-linked account registration, compliance checks tied to that identity layer, and role-based permissions that separate what each participant type is allowed to do. For Valmere Stock Exchange, that supports a clear distinction between exchange administrators, brokers, custodians, settlement operators, compliance officers, and supervisory viewers.

This control model matters beyond initial onboarding. The same identity registry and permission framework can support participant approval workflows, suspension where required, and the prevention of transfer or issuance activity when the participant no longer meets the configured conditions. Because transfer compliance is checked before the token movement is accepted, the exchange gains a preventative control rather than a reconciliation-only control after the fact.

DALP also supports wallet and identity recovery patterns that are relevant in institutional operations. That is valuable in a broker and custodian environment, where operational continuity depends on recovering access safely without breaking the integrity of the ownership register. The result is a more resilient participant lifecycle than a model where access is bound to unmanaged keys alone.

## Regulatory Reporting and Supervisory Access

DALP creates a strong evidential base for regulatory oversight because the platform records issuance, transfer, settlement, identity, and compliance events in a structured and auditable way. Regulators and internal supervision teams can therefore review what happened, who initiated it, which controls were applied, and whether the resulting state change was valid within the configured rule set. For a stock exchange modernization program, that is often more valuable than a static report, because it supports both routine supervision and issue investigation.

The right delivery boundary here is clear. DALP natively provides the underlying transaction, entitlement, and control data, together with the audit trail required to support oversight. It does not, by itself, act as a jurisdiction-specific securities reporting engine that outputs every regulator-mandated filing format out of the box. CSDR-style reporting, national transaction reporting, and other local filing packs are normally produced through an external reporting layer that consumes DALP data and applies the regulator's required schema and submission process.

Read-only supervisory access is well aligned with the platform model, provided it is implemented through the exchange's governance and security framework. That can allow a regulator or oversight team to inspect authorized data without granting operational rights. The exact access design should be agreed with the regulator early, because the legal and operational expectations for supervisory visibility vary by jurisdiction.

## Migration from Existing Dematerialized Holdings

The safest migration approach is phased rather than disruptive. DALP can support a transition in which the exchange cleans and maps the current holdings data, imports opening positions into the new asset register, and runs reconciliation controls between the legacy environment and the new platform before changing the legal or operational source of truth. That reduces transition risk and gives participants time to adapt their internal operations.

A practical program would start with one instrument cohort or participant segment, prove the onboarding and settlement operating model, and only then expand coverage. During the transition, the exchange should maintain a disciplined reconciliation process across participant accounts, instrument identifiers, opening balances, and corporate action entitlements. DALP provides the controlled target record and audit trail, but migration quality still depends heavily on the integrity of the source records and the design of the cutover process.

Where mismatches appear between legacy and target records, the exchange should resolve them through an exceptions workflow rather than forcing silent balance adjustments. DALP's controlled administrative features can support corrective actions when these are properly authorized, which is important for legal defensibility. In market infrastructure programs, migration discipline matters as much as platform capability.

## Availability, Resilience, and Operations

DALP can be deployed in architectures designed for high availability, operational monitoring, and disaster recovery, but the exchange should treat 99.99% uptime as a program-level service objective rather than a software attribute claimed in isolation. The achieved result depends on infrastructure redundancy, node topology, database and application failover design, key management, operating procedures, and the resilience characteristics of the chosen blockchain environment.

That said, the platform is well suited to a resilient deployment model. A market operator can deploy multiple application instances, resilient supporting services, and a permissioned blockchain topology spread across fault domains or data centers. This architecture allows failover planning, maintenance isolation, and controlled recovery procedures in a way that aligns with regulated operations.

The operational model should include continuous monitoring, alerting, backup discipline, and tested recovery procedures across both the application and blockchain layers. DALP provides the functional layer for token, identity, compliance, and settlement operations, but the exchange should expect the final service design to include infrastructure engineering and formal operational runbooks. This is especially important where service continuity obligations are set by the regulator rather than by internal IT targets alone.

## Security and Control Framework

DALP applies security and control at multiple layers, which is the right design for a post-trade environment where an error can affect legal ownership. Role-based permissions govern which actors can issue, approve, transfer, intervene, or supervise. Identity-linked participation ensures that actions are tied to known entities rather than anonymous accounts. Compliance checks operate before transfers and issuances are accepted, which reduces the chance of invalid post-trade states entering the register.

The platform also supports controlled administrative intervention capabilities such as custodial actions and forced transfers where these are legally required. For a stock exchange and CSD modernization scenario, that matters because courts, regulators, sanctions requirements, and operational corrections can all require action that pure bearer-style token systems cannot handle well. DALP's design acknowledges that institutional securities platforms must support lawful intervention while preserving audit evidence.

This combination of preventative control, operational authority separation, and historical evidence is a strong fit for regulated securities infrastructure. It allows the exchange to modernize the ledger and settlement model without losing the institutional control framework that underpins market confidence.

## Implementation Approach

The most credible implementation path is phased across design, integration, controlled pilot activity, and progressive production expansion. The first phase should define the operating model, target instrument scope, participant roles, settlement design, and legal record position for the pilot. That is followed by the core integration work, linking the order matching environment, participant reference data, cash settlement coordination, and reporting outputs to the DALP platform.

The next phase should focus on participant onboarding, test scenarios, and migration rehearsals. This includes instrument setup, opening balance validation, participant permissioning, settlement lifecycle testing, and selected corporate action scenarios such as dividends and splits. A controlled pilot with a narrow instrument and participant scope gives the exchange and regulator evidence before the model is expanded.

Production rollout can then proceed instrument by instrument or participant segment by participant segment. This staged path is better than a big-bang replacement because it allows the exchange to prove T+0 workflows, operational readiness, and reporting outputs under real conditions. It also gives space to resolve integration dependencies, especially around cash coordination, reporting adapters, and external market messaging.

## Closing Position

DALP is a strong fit for the digital securities register, participant control, compliance, and settlement coordination layers of a post-trade modernization program. It is particularly well aligned where the exchange wants atomic post-trade workflows, identity-governed participation, auditable ownership records, and a phased path away from reconciliation-heavy legacy infrastructure. The best outcome comes from positioning DALP precisely where it is strongest, then designing the exchange-specific market connectivity and reporting layers around it with clear accountability from the start.
