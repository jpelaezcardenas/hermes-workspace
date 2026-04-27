# ADI FinStreet Questionnaire Response Pack

## Purpose and use of this document

This document consolidates the working answers, assumptions, and open points captured in the Slack opportunity history for ADI FinStreet. It is designed as a reusable response pack for follow-up questionnaires, workshops, and internal deal preparation. It does not assume facts that were not evidenced in the source material. Where the channel history suggested a likely answer but not a fully verified one, that answer is marked as an inference. Where neither the Slack history nor DALP documentation provided a safe answer, the item is left as an open question for client confirmation.

**Evidence legend**

- **Confirmed**: directly supported by Slack history, meeting notes, screenshots, or DALP docs/code
- **Inferred**: likely based on the available material, but requires confirmation before use in a client-facing commitment
- **Open**: requires explicit ADI FinStreet confirmation, solution-design work, or additional DALP validation

---

## Working opportunity summary

**Confirmed.** The opportunity centers on ADI FinStreet's plan to move assets from a traditional exchange and CSD environment into a tokenized operating model on the ADI blockchain. The working use cases in the notes include primary issuance, post-matching lifecycle handling, on-chain clearing and settlement, and a distribution model in which one underlying security position can support tokenized access across multiple crypto exchanges.

**Confirmed.** The meeting notes describe FinStreet as a multi-asset exchange in ADGM, with interest across public equities, funds, private assets, real estate, ETFs, and alternative investments. The notes also distinguish between primary issuance and subscription on-chain, secondary trading executed off-chain where millisecond latency is required, and on-chain clearing and settlement.

**Confirmed.** The channel history shows that SettleMint connected DALP to the ADI chain, demonstrated a token lifecycle flow, and shared live screenshots, explorer links, and planning drawings. Internal notes indicate a working demonstration of token creation, compliance controls, and transaction processing against the ADI environment.

**Inferred.** ADI FinStreet appears to be evaluating DALP as the tokenization, servicing, and settlement layer rather than as the matching engine for high-frequency secondary trading. This is consistent with the notes that place secondary execution off-chain and use the blockchain for exact, final post-trade settlement.

---

## Proposed response structure for questionnaire reuse

## Client objective and target operating model

**Confirmed answer.** DALP is best positioned to support the post-trade and lifecycle layer of the target model: token creation, compliant issuance, subscription, custody integration, on-chain settlement, and ongoing servicing such as redemption, yield handling, and selected corporate actions. The Slack notes consistently frame the target architecture as a hybrid model in which the exchange matching function remains off-chain for latency reasons, while blockchain is used where finality, programmability, entitlement enforcement, and reconciliation matter most.

**Confirmed answer.** The working target model discussed in the opportunity includes the following steps:

- traditional asset held or controlled through a CSD-linked model
- token representation created on the ADI blockchain
- issuance and investor access governed through identity and compliance controls
- settlement and ledger finality recorded on-chain
- servicing and lifecycle events managed through DALP capabilities and surrounding operational workflows

**Open question for client confirmation.** The exact legal relationship between the traditional security, the CSD position, and the on-chain token still needs to be confirmed. The notes describe the concept, including the example of Apple stock moving from DTCC to FinStreet CSD and then being tokenized, but they do not yet establish the definitive legal wrapper, beneficial ownership model, or nominee structure.

---

## Questionnaire responses by topic

## Solution fit and architectural role

**Question:** What role does SettleMint DALP play in the ADI FinStreet architecture?

**Confirmed answer.** DALP fits as the digital asset platform for tokenization, issuance, compliance enforcement, investor onboarding hooks, custody and signing integration, on-chain settlement, and asset servicing. The meeting notes explicitly position SettleMint as the platform handling the post-matching lifecycle, with primary issuance and subscription on-chain, secondary execution off-chain, and clearing and settlement on-chain.

**Confirmed answer.** DALP does not need to be presented as the low-latency matching engine. The notes are clear that secondary trading has millisecond requirements and remains off-chain. That distinction should be preserved in all questionnaire responses to avoid overselling the platform.

**Open question.** Whether ADI FinStreet wants DALP only for issuance and settlement, or also for transfer-agent style servicing, registrar functions, investor portals, and selected exchange-facing workflows, still needs explicit scope confirmation.

## ADI blockchain integration status

**Question:** Has DALP already been integrated with the ADI blockchain?

**Confirmed answer.** Yes, the opportunity history states that SettleMint successfully integrated the ADI chain with the asset management platform and demonstrated transaction processing against that environment. Internal Slack updates also indicate that a fuller ATK stack on the ADI network was close to operational and that working explorer links and screenshots were shared.

**Confirmed answer.** The channel includes visual proof points, including platform screenshots, explorer links, and planning diagrams, which support the claim that this was not only a slideware discussion.

**Open question.** The final hardening status of the integration, including production-readiness criteria, operational support boundaries, and any chain-specific limitations, is not fully documented in the channel and should be confirmed before any formal delivery commitment.

## Token standards and smart contract model

**Question:** What tokenization model does DALP support for regulated assets?

**Confirmed answer.** DALP documentation supports ERC-3643 style regulated asset patterns, backed by identity, claim, and compliance controls. Internal meeting notes also refer to an ERC-3643 implementation with proxy-based deployment for cost efficiency.

**Confirmed answer.** DALP docs show that asset contracts can be assembled from instrument profiles and modular compliance features, including identity verification, jurisdiction checks, transfer approval, supply controls, and collateral-backed minting where relevant.

**Inferred answer.** For ADI FinStreet, the most credible starting point is to position DALP as a configurable regulated-token framework rather than as one fixed token template. That matches both the Slack notes and the DALP architecture, which is built around profiles, features, and compliance modules.

## Compliance, identity, and investor eligibility

**Question:** How does DALP enforce investor eligibility and transfer restrictions?

**Confirmed answer.** DALP uses on-chain identity and claim-based compliance controls. The DALP docs reference ERC-735 style claims, trusted issuers, identity verification, jurisdiction controls, transfer approval logic, and collateral claim verification for minting where needed.

**Confirmed answer.** The meeting notes specifically mention modular compliance controls for country restrictions, identity verification, custody controls, configurable risk levels, transaction rules, and DID-provider feasibility through on-chain identity claims.

**Confirmed answer.** This means DALP can support a model in which only verified wallets or account holders can subscribe, receive, hold, or transfer instruments, subject to the configured compliance policy.

**Open question.** The actual KYC, AML, screening, and travel-rule providers ADI FinStreet expects to use are not finalized in the evidence set. The notes explicitly say this provider discussion is still needed.

## Custody, wallets, and signing

**Question:** Does SettleMint provide custody?

**Confirmed answer.** No. The most accurate position is that DALP provides the transaction-signing and orchestration layer, while institutional custody remains with external custody or HSM providers. This is stated directly in the November 25 meeting notes.

**Confirmed answer.** The notes reference integrations with Fireblocks, HSMs, and cloud HSMs, while DALP documentation and architecture notes indicate support for a signing layer and operational roles without claiming that SettleMint itself is the regulated custodian.

**Confirmed answer.** This should be communicated as a strength of the architecture: DALP can sit between business workflows and institution-approved key-management infrastructure rather than forcing a proprietary custody model.

**Open question.** The target custody topology for ADI FinStreet remains open. The team still needs to decide whether wallets are controlled per exchange, per end-investor, per omnibus participant, or through another market-structure model.

## Primary issuance and subscription

**Question:** Can DALP support primary issuance and subscription flows?

**Confirmed answer.** Yes. DALP documentation includes a DAIO flow for primary distribution in which verified investors participate under configured offering terms, with atomic settlement and lock-up enforcement where required.

**Confirmed answer.** The opportunity notes also state that primary issuance and subscription are intended to occur on-chain.

**Inferred answer.** DALP is therefore a credible fit for the primary issuance layer in the ADI FinStreet model, provided the offering structure, investor categorization, and settlement asset design are defined in the solution blueprint.

## Secondary trading and market model

**Question:** Can DALP run the exchange trading engine?

**Confirmed answer.** The current evidence supports a more limited and more accurate answer: DALP is suitable for on-chain post-trade settlement and lifecycle processing, not for positioning as the millisecond-sensitive matching engine. The November 25 notes explicitly separate off-chain secondary execution from on-chain settlement.

**Open question.** If ADI FinStreet expects order book management, market surveillance, market data dissemination, and other venue functions inside the same product scope, that expectation must be clarified and decomposed into what DALP does versus what exchange infrastructure does.

## Clearing, settlement, and delivery-versus-payment

**Question:** Can DALP support atomic settlement or DvP-style flows?

**Confirmed answer.** Yes. DALP documentation includes XvP settlement, which provides atomic multi-party token exchanges. The docs explicitly state that all token transfers in a settlement succeed together or revert together, which is the core DvP-style control expected for tokenized settlement patterns.

**Confirmed answer.** The opportunity notes refer to XCP or exchange-versus-payment functionality for multi-party transactions. The DALP docs use the XvP terminology. In client-facing language, it is safer to describe this as atomic exchange-versus-payment or delivery-versus-payment style settlement, then map the exact legal settlement model during design.

**Inferred answer.** For ADI FinStreet, this capability is relevant both for primary subscriptions and for post-trade settlement flows where tokenized asset legs and payment legs need synchronized execution.

## Corporate actions and lifecycle servicing

**Question:** What lifecycle and corporate action support is available?

**Confirmed answer.** DALP documentation supports several important lifecycle primitives directly, including maturity redemption for bonds, fixed treasury yield for coupon-like or yield distributions, voting power with historical tracking, and historical balances for snapshot-based entitlements.

**Confirmed answer.** DALP developer docs also state that the platform can trigger corporate actions such as dividends, redemptions, yield adjustments, and maturities programmatically.

**Inferred answer.** This supports a strong answer for fixed income and selected structured servicing use cases.

**Important limit.** The November 25 notes correctly say that equities require additional functional analysis for less predictable events such as splits and dividends, and that some capabilities may require custom wrapping around available primitives. That caveat should remain in the response. We should not imply that every equity-servicing workflow is already productized in a one-click configuration.

## Proof of reserves and collateral-backed minting

**Question:** Can the tokenized supply be constrained by backing or reserve evidence?

**Confirmed answer.** Yes, for relevant product structures DALP includes a collateral compliance module that enforces minting limits against on-chain collateral claims. The docs explicitly describe ERC-735 claim-based collateral verification, trusted issuers, configurable collateral ratios, and proof-of-reserves style enforcement on minting.

**Confirmed answer.** This is particularly relevant for stablecoin, deposit-token, or other reserve-backed issuance patterns.

**Inferred answer.** For a CSD-backed tokenized securities model, the same pattern may be useful conceptually, but the exact reserve proof design would need to be tailored to how the CSD position, issuer attestations, and reconciliation data are represented.

## Multi-venue distribution and shared liquidity model

**Question:** Can one underlying asset position be exposed to multiple exchanges through tokenization?

**Inferred answer.** The notes describe this as a core design objective: a common liquidity pool accessible by multiple exchanges, with create and redeem facilities and real-time reconciliation to the traditional ledger backing. DALP can credibly support parts of this model, especially token issuance, controlled mint and burn, compliant transfer restrictions, and synchronized settlement.

**Open question.** The final market-structure answer remains open. The available evidence does not yet prove the full legal, operational, and liquidity-fragmentation model across multiple venues. This requires design work around fungibility, venue access controls, wallet segmentation, entitlement records, and who is allowed to create or redeem.

## APIs and integration model

**Question:** How is DALP integrated with external systems?

**Confirmed answer.** DALP exposes standard APIs for asset lifecycle operations and platform orchestration. The meeting notes also mention standard APIs, required integration work, and compatibility considerations for external standards and existing exchange infrastructure.

**Confirmed answer.** DALP documentation references unified APIs, structured messaging, asset lifecycle APIs, and integration guidance. This supports a measured answer that DALP is API-first and designed to be integrated into existing operating environments.

**Open question.** The exact interface mix for ADI FinStreet remains undefined. The notes mention standards and FIX compatibility, but the final system contract between exchange, CSD, custody, identity providers, settlement asset providers, and DALP has not yet been fully specified.

## Operational readiness and evaluation status

**Question:** What has already been demonstrated to the client?

**Confirmed answer.** The Slack history indicates that ADI stakeholders were given console access, tested the environment, reviewed a live demonstration, and requested follow-up storyline material for internal presentation to their CEO. The history also records planned in-person and technical follow-up sessions.

**Confirmed answer.** Internal stakeholders considered the opportunity strategically significant and worked toward a fuller demonstration stack on the ADI network.

**Open question.** The exact evaluation criteria, scoring model, and procurement path for the questionnaire are not completely captured in the channel history and should be obtained if a formal response is expected.

---

## Suggested polished questionnaire answers

## What SettleMint can state confidently

SettleMint DALP can be positioned as the tokenization and post-trade lifecycle platform for the ADI FinStreet initiative. Based on the opportunity history and DALP product documentation, the platform supports regulated asset issuance, identity- and claim-based compliance controls, custody-provider integration, on-chain primary distribution, atomic settlement patterns, and key lifecycle functions such as yield handling, maturity redemption, and entitlement snapshots. The platform has already been connected to the ADI blockchain in a demonstration context, and the working architecture discussed with the client aligns with DALP's strengths: use blockchain for issuance, compliance, finality, and servicing, while keeping latency-sensitive matching off-chain.

## What SettleMint should state carefully

SettleMint should not present DALP as the exchange matching engine, the regulated custodian, or a turnkey answer to every equity corporate action edge case. The strongest and most credible message is that DALP provides the programmable asset, compliance, settlement, and servicing layer, while integrating with external custody, KYC, screening, and market-infrastructure components. For equity workflows involving unpredictable events, the channel notes themselves point to additional functional analysis and possible wrapping around existing primitives.

## What requires joint solution design

Several critical items still require joint confirmation with ADI FinStreet. These include the legal wrapper for tokenized representations of traditionally held securities, the exact create and redeem mechanics for multi-exchange distribution, the target custody and wallet segmentation model, the selected KYC and travel-rule providers, the operating model for proof of reserves or reconciliation against the CSD, and the exact boundary between exchange systems and the DALP layer.

---

## Open questions to send back to ADI FinStreet

1. What is the intended legal structure of the tokenized instrument relative to the underlying security and CSD position?
2. Which functions should remain in exchange infrastructure, and which should sit in DALP?
3. Which custody model is preferred: direct investor wallets, omnibus wallets, participant wallets, or another structure?
4. Which KYC, AML, sanctions, and travel-rule providers should be integrated?
5. Is the first target asset class fixed income, equity, fund interests, or another instrument family?
6. For multi-exchange distribution, who is authorized to create and redeem tokens against the underlying pool?
7. What reconciliation frequency and evidence model are required between the traditional ledger and on-chain supply?
8. Are dividend, split, voting, and other equity corporate actions in scope for phase one, or only issuance and settlement?
9. What is the target settlement asset for DvP flows?
10. What are the production-readiness and security sign-off criteria for the ADI chain integration?

---

## Appendix A, evidence map

## Slack and note-derived evidence

| Topic | Evidence status | Source summary |
|---|---|---|
| ADI chain integrated with DALP demo environment | Confirmed | Granola note dated Nov 14, 2025 and Slack updates state successful integration and live demo |
| Primary issuance on-chain | Confirmed | Nov 25 note says primary issuance and subscription on-chain |
| Secondary trading off-chain | Confirmed | Nov 25 note says secondary execution off-chain due to millisecond requirements |
| Clearing and settlement on-chain | Confirmed | Nov 25 note explicitly states on-chain clearing and settlement |
| DALP as post-matching lifecycle layer | Confirmed | Nov 25 note explicitly describes this role |
| External custody rather than SettleMint as custodian | Confirmed | Nov 25 note says SettleMint provides transaction-signing layer, not direct custody |
| Fireblocks/HSM integration pattern | Confirmed | Nov 25 note references Fireblocks, HSMs, cloud HSMs |
| Modular compliance and identity controls | Confirmed | Nov 14 note plus DALP docs |
| XvP atomic settlement capability | Confirmed | DALP docs, architecture flows |
| Fixed income lifecycle support | Confirmed | DALP docs for maturity redemption and fixed treasury yield |
| Equity edge cases need further analysis | Confirmed | Nov 25 note says equities need functional analysis for splits and dividends |
| Multi-exchange common liquidity pool concept | Inferred/Open | Described in Nov 25 note as target requirement, not yet validated as final design |
| KYC and travel-rule provider selection | Open | Nov 14 note says provider discussion still needed |

## DALP documentation checks used in this pack

- ERC-3643 and regulated asset positioning: DALP architecture and asset-contract documentation
- Identity and claim-based compliance: compliance docs covering trusted issuers, identity verification, transfer restrictions, and collateral claims
- Collateral-backed minting and proof-of-reserves style enforcement: `architecture/security/compliance/supply-cap-collateral.mdx` and related developer guides
- Atomic settlement and XvP: `architecture/flows/xvp-settlement.mdx`
- Primary issuance and subscription: `architecture/flows/daio-offering.mdx`
- Bond maturity and coupon-style servicing: `token-features/maturity-redemption.mdx` and `token-features/fixed-treasury-yield.mdx`
- Voting and snapshots: `token-features/voting-power.mdx` and `token-features/historical-balances.mdx`

---

## Handoff note

**Overall confidence:** Medium to high for platform-fit, compliance, issuance, settlement, signing-layer, and fixed-income lifecycle statements. Medium for broader securities-market structure positioning. Low to medium for final legal architecture, multi-exchange liquidity design, and phase-one scope boundaries.

**Safe to reuse immediately:** DALP as post-trade tokenization and servicing platform, ADI chain demo integration, on-chain issuance, on-chain settlement, external custody integration model, modular compliance, atomic settlement, and fixed-income lifecycle support.

**Use with caution:** Equity corporate actions, shared liquidity across multiple exchanges, proof-of-reserves design for CSD-backed securities, and any statement implying a turnkey exchange stack.

**Main gaps:** legal wrapper, provider choices, custody topology, production-readiness criteria, exact questionnaire wording, and asset-class prioritization for phase one.
