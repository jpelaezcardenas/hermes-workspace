# Tokenized Securities Trading Platform
## Technical Proposal for Revolut Ltd
### SettleMint | March 2026 | v1.0 | SettleMint Confidential

---

**Prepared by:** SettleMint NV
**Prepared for:** Revolut Ltd, 7 Westferry Circus, Canary Wharf, London, E14 4HD, United Kingdom
**Document reference:** SM-TECH-REVOLUT-2026-001
**Classification:** Strictly Confidential
**Version:** 1.0
**Date:** March 2026
**Contact:** bids@settlemint.com

---

## Table of Contents

1. Executive Summary
2. About SettleMint
3. About DALP
4. Customer References
5. Understanding of Requirements
6. Proposed Solution and Functional Capabilities
7. Technical Architecture
8. Security
9. Project Implementation and Delivery
10. Deployment
11. Training and Knowledge Transfer
12. Support and SLA
13. Risk Management
14. Compliance Matrix
15. Appendices

---

## 1. Executive Summary

Revolut serves over 45 million retail and business customers across 38 markets as a financial super-app that already offers crypto trading, stock trading, savings products, and cross-border payments within a single mobile experience. The tokenized securities trading platform procurement reflects a different challenge from a new entrant: Revolut does not need to build digital asset capability from zero. Revolut needs to industrialize the institutional-grade control layer underneath its consumer-scale distribution engine, tighten the boundary between its digital asset operations and its core trading infrastructure, and do this under FCA supervision in the UK and under MiCA in EEA markets simultaneously.

The specific gap this procurement addresses: Revolut's current digital asset trading capability operates in a consumer UX layer that has grown faster than the institutional control infrastructure underneath it. Tokenized securities -- tokenized equities, tokenized ETFs, and stablecoin-funded trading -- require a regulated issuance, servicing, and settlement platform with the compliance enforcement, audit trail, and operational controls that FCA-supervised and MiCA-regulated securities products demand. DALP provides exactly this infrastructure layer.

SettleMint proposes DALP, the Digital Asset Lifecycle Platform, as the institutional control and lifecycle infrastructure for Revolut's tokenized securities trading programme. DALP provides tokenized equity and ETF issuance with ERC-3643 compliance enforcement, on-chain investor eligibility at the protocol level, DvP settlement with deterministic finality, yield and corporate action automation, stablecoin funding integration for cash ledger synchronization, and the API-first developer experience Revolut's super-app engineering teams expect.

### The Value Proposition

DALP gives Revolut's tokenized securities programme the institutional-grade compliance and lifecycle control layer that FCA and MiCA require, delivered through an API-first platform that integrates into Revolut's super-app infrastructure without requiring a parallel operational back office.

### Why DALP for Revolut

**Consumer-scale architecture:** DALP's API handles 100,000+ concurrent requests through auto-scaling Kubernetes pods. Retail fintech traffic spikes are handled without manual intervention. Performance benchmarks: P99 transaction confirmation 4.2 seconds on private Besu; batch corporate action processing for 500,000 investor positions within 4 hours.

**FCA and MiCA dual-jurisdiction compliance:** DALP's 18 compliance module types enforce investor eligibility at the protocol level. FCA investor categorization (retail, professional, high-net-worth) maps to DALP's eligibility claim types. MiCA consumer protection obligations (Art. 72-76) enforced on-chain before every transfer. Separate compliance module configurations per legal entity (Revolut UK vs Revolut EU).

**Super-app integration architecture:** DALP's OpenAPI 3.1 REST API integrates as a microservice within Revolut's API gateway. Webhooks deliver settlement events to Revolut's internal ledger. TypeScript SDK aligns with Revolut's engineering stack. 534 structured error codes for clean error handling in Revolut's mobile clients.

**Regulatory audit trail:** Every compliance module decision, product configuration change, and investor eligibility action recorded in DALP's tamper-evident audit log. FCA examination access through read-only export API. MiCA Article 83 transaction reporting supported through structured data export.

### Requirements Coverage Summary

| Requirement Domain | Coverage | DALP Mechanism |
|---|---|---|
| Tokenized equity issuance | Supported | Equity token template with ERC-3643 |
| Tokenized ETF issuance | Supported | Fund token template with NAV feeds |
| Stablecoin funding integration | Supported | Denomination asset configuration |
| DvP settlement | Supported | Atomic settlement engine |
| FCA investor eligibility enforcement | Supported | On-chain compliance modules |
| MiCA consumer protection (Art. 72) | Supported | 18 compliance module types |
| FCA audit trail | Supported | Tamper-evident event log |
| DORA ICT resilience | Supported | HA deployment, third-party risk docs |
| API integration with super-app | Supported | OpenAPI 3.1, TypeScript SDK |
| Multi-jurisdiction control | Supported | Per-entity compliance configurations |
| Corporate action automation | Supported | Dividend, vote, split automation |
| Phased rollout controls | Supported | Token pause, cohort controls |

---

## 2. About SettleMint

### Company Overview

SettleMint builds institutional digital asset lifecycle infrastructure for regulated financial markets and sovereign use cases. Founded in 2017 and headquartered in Antwerp, Belgium, SettleMint combines over 200 years of combined banking and blockchain experience across teams in Europe, the Middle East, Asia, and North America.

ISO 27001 and SOC 2 Type II certifications confirm independently audited security and operational controls. Multi-year production deployments at Tier-1 banks across Europe, the Middle East, and Asia demonstrate DALP's operational credibility at institutional scale. For Revolut's tokenized securities programme, SettleMint brings consumer-scale API design experience from fintech deployments, ERC-3643 regulated token implementation meeting MiCA and FCA technical standards, and institutional custody integrations with Fireblocks and DFNS.

### FCA and UK Regulatory Experience

SettleMint's Barclays deployment demonstrates DALP's operation under FCA supervision for digital securities infrastructure. DALP's compliance module framework addresses MiCA consumer protection and FCA investor categorization requirements in separate configurations on the same platform instance. For Revolut's dual-jurisdiction operating model (FCA in UK, Bank of Lithuania or ECB-supervised entity in EEA), DALP's per-entity compliance configuration provides independent control sets without requiring two platform instances.

---

## 3. About DALP

### Platform Overview

DALP is SettleMint's Digital Asset Lifecycle Platform for regulated securities issuance, servicing, and settlement. For Revolut's tokenized securities trading platform, the most relevant capabilities are tokenized equity and ETF issuance using ERC-3643 regulated token standards, corporate action automation (dividend, vote, stock split), DvP settlement with deterministic finality under 5 seconds, 18 compliance module types for investor eligibility enforcement, stablecoin denomination assets for cash ledger synchronization, and the developer-grade API infrastructure that Revolut's engineering teams require.

### DALP Platform Architecture

```mermaid
graph TB
    subgraph DALP_Platform["DALP Platform"]
        direction TB
        subgraph Issuance_Core["Issuance and Lifecycle"]
            equity_tmpl["Equity Token Template\n(ERC-3643, dividends)"]
            fund_tmpl["Fund Token Template\n(ETF, NAV, redemption)"]
            asset_designer_r["Asset Designer\n(Product Configuration)"]
        end
        subgraph Compliance_R["Compliance Engine"]
            investor_cat["Investor Categorization\n(FCA: Retail/Professional/HNW)"]
            mica_prot["MiCA Consumer Protection\n(Art. 72-76 modules)"]
            country_r["Country Restriction\n(38 markets)"]
            transfer_r["Transfer Controls\n(Position limits)"]
        end
        subgraph Settlement_R["Settlement Layer"]
            dvp_r["DvP Settlement Engine\n(Atomic, < 5s finality)"]
            corporate_action["Corporate Action Engine\n(Dividend, Vote, Split)"]
            stablecoin_int["Stablecoin Denomination\n(EUR, USD, GBP)"]
        end
        subgraph API_R["API and Developer Layer"]
            openapi_r["OpenAPI 3.1\nTrading, Compliance, Settlement namespaces"]
            ts_sdk_r["TypeScript SDK"]
            webhooks_r["Event Webhooks\n(Settlement, Corporate Action)"]
        end
        subgraph Custody_R["Custody Layer"]
            fireblocks_r["Fireblocks MPC\n(Institutional)"]
            dfns_r["DFNS Passkey\n(Consumer wallets)"]
        end
    end
    Issuance_Core --> Compliance_R
    Compliance_R --> Settlement_R
    Settlement_R --> Custody_R
    API_R --> Issuance_Core
    API_R --> Settlement_R
```

### DALP Lifecycle Pillars for Tokenized Securities

**Issuance:** Equity token template deploys tokenized equities with on-chain cap table, dividend rights, voting rights, and transfer restrictions. Fund template deploys tokenized ETFs with NAV feed integration, creation/redemption mechanism, and distribution automation. All tokens implement ERC-3643 with on-chain compliance enforcement.

**Compliance:** Per-jurisdiction compliance module configurations:
- *Revolut UK (FCA)*: Investor categorization (retail, certified high-net-worth, sophisticated investor), country restriction (UK), transfer limits (position caps), MiFID II suitability integration
- *Revolut EU (MiCA)*: Consumer eligibility verification, MiCA Article 72 transfer restrictions, country restriction (EEA), disclosure acknowledgment

**Settlement:** DvP settlement for all tokenized securities trades. Atomic execution: asset and cash tokens exchange simultaneously with no partial completion risk. Settlement finality P50 2.1 seconds, P99 4.2 seconds on private Besu. Stablecoin denomination asset enables cash leg settlement on-chain, eliminating the traditional T+2 delay.

**Corporate Actions:** Dividend distribution automation for tokenized equities. Vote proposal and tally for tokenized governance rights. Stock split adjustment for token supply. All corporate actions durable through DALP's workflow execution engine; partially-completed corporate actions surface in the operations queue for resolution.

**Servicing:** Position management for Revolut's trading book. Mark-to-market via NAV feed integration for ETF positions. Quarterly and annual reporting data exports for investor account statements.

---

## 4. Customer References

### Reference Summary

| Institution | Use Case | Relevance to Revolut |
|---|---|---|
| Barclays | Digital securities platform, FCA regulated | High: UK FCA-supervised, same regulatory context |
| UBS | Tokenized equities trading platform, Swiss | High: equities trading, institutional grade |
| Standard Chartered | Fractional tokenized securities | High: fractional securities for retail distribution |
| BNP Paribas | Tokenized funds distribution, retail | High: consumer-scale fund distribution |
| ING Group | Tokenized trade finance, Dutch bank | Medium: MiCA-applicable European context |
| Nordea | Tokenized funds, Nordic consumer bank | Medium: consumer-facing digital asset products |
| Adyen | Payment infrastructure, stablecoin | Medium: stablecoin cash leg integration |
| Deutsche Borse | Digital asset trading venue | Medium: tokenized securities trading infrastructure |
| Euronext | Digital securities listing | Medium: equities market infrastructure reference |

### Barclays Expanded Reference

Barclays deployed DALP for digital securities infrastructure under FCA supervision in the UK. The deployment demonstrates DALP's ability to satisfy FCA technology systems and controls guidance (SYSC 8.1) for outsourced technology infrastructure, UK SMCR governance, and DORA-equivalent UK operational resilience requirements. The Barclays reference is directly relevant to Revolut's UK entity operating under FCA supervision. Reference calls available subject to confidentiality constraints.

### UBS Expanded Reference

UBS deployed DALP for a tokenized equities trading platform in Switzerland under FINMA supervision for a high-net-worth client segment. The deployment demonstrates DALP's equity token template with dividend automation, investor eligibility enforcement at the protocol level, and DvP settlement for equities. Outcomes: settlement finality reduced from T+2 to same-session (under 5 seconds), corporate action processing automated for dividend distributions. The UBS reference demonstrates DALP handling the institutional-grade equity tokenization that Revolut's programme requires.

### Standard Chartered Expanded Reference

Standard Chartered deployed DALP for fractional tokenized securities distribution to retail and high-net-worth clients across multiple jurisdictions. The deployment demonstrates DALP managing fractional token positions, investor eligibility verification across jurisdictions, and the reconciliation between tokenized position records and traditional account records. Directly relevant to Revolut's requirement for tokenized securities tradable by retail customers at fractional amounts.

---

## 5. Understanding of Requirements

### Business Requirements Analysis

**BR-01: Configurable product and account workflows aligned to internal governance**

DALP's Asset Designer provides Revolut's product governance team with a configurable product creation and approval workflow. For Revolut's dual-jurisdiction model, product configurations are separately controlled per legal entity: Revolut UK tokenized equity products configure FCA investor categorization modules; Revolut EU products configure MiCA consumer protection modules. Maker-checker approval enforced on-chain for all product configurations and compliance rule changes.

**BR-02: Deterministic state transitions for lifecycle events**

Tokenized equity lifecycle: Draft, Compliance Review, Approved, Paused, Active Trading, Corporate Action Pending, Dividend Processing, Matured, Redeemed, Closed. Trade lifecycle: Order Initiated, Compliance Checked, DvP Locked, Settled, Failed, Dead Letter. All transitions durable through DALP's workflow execution engine with atomic guarantee: no partial settlement.

**BR-03: Entitlement and balance accuracy across investor, omnibus, treasury**

On-chain token balances are authoritative and immutable. DALP's blockchain event indexing service projects on-chain state to a PostgreSQL read model in real time. Revolut's trading ledger integration: DALP exports position changes via webhook to Revolut's internal ledger system in real time. Reconciliation: DALP's PostgreSQL direct access allows Revolut's reconciliation process to detect discrepancies between on-chain position and internal ledger within the same processing cycle.

**BR-04: Role-based segregation (maker, checker, approver, support)**

26 role types with on-chain enforcement:
- Product Manager: configure tokenized security products
- Compliance Officer: attach/modify compliance modules per jurisdiction
- Supply Manager: manage issuance supply and trading window
- Corporate Action Manager: initiate dividend, vote, split
- Investor Support: read-only position queries
- Emergency: product pause/unpause

**BR-05: Configurable limits, risk controls, and investor eligibility per market and segment**

FCA-specific compliance modules: Investor Category (retail capped to position limits, professional investor uncapped), Country Restriction (UK only for UK entity), Transfer Limits (daily position caps by investor category), Identity Verification (Revolut KYC completion required).

MiCA-specific compliance modules: Consumer Eligibility (MiCA Art. 72), Country Restriction (EEA markets), Transfer Approval (Art. 23 for high-value transfers), Disclosure Acknowledgment.

**BR-06: Automated notifications and event emission**

Event catalog for Revolut's super-app integration:
- ProductListed: new tokenized security available for trading
- TradeSettled: DvP settlement confirmed, position updated
- DividendDistributed: per-investor dividend amount settled
- VoteProposed: governance vote opened
- VoteCompleted: governance vote result on-chain
- CorporateActionProcessed: split/merger adjustment applied
- CompliancePassed/Failed: eligibility check result
- PositionUpdated: investor position change

**BR-07: Business continuity for failed transactions**

Durable workflow execution persists all trade state. If Revolut's internal ledger or custody provider is temporarily unavailable, trades queue in DALP's workflow without data loss. Atomic DvP guarantees: if either leg of a trade cannot complete, both legs revert. No partial settlement exposure.

**BR-08: Audit-ready reporting**

FCA transaction reporting (COBS 16 equivalent): full trade lifecycle from order initiation to settlement, investor eligibility checks, corporate action records, position history. MiCA Article 83 transaction reporting: structured export in regulatory reporting format. Export APIs: JSON, CSV, PostgreSQL direct.

**BR-09: Phased rollout controls**

Tokenized equity phase controls: launch with UK market (Revolut UK), expand to EEA markets (Revolut EU) through country restriction module updates. Cohort controls: early-access eligibility claims for beta customer group. Product pause for instant suspension without affecting other securities.

**BR-10: Reusable for adjacent services**

Same DALP instance supporting tokenized equities extends to tokenized ETFs, tokenized bonds, and stablecoin-funded payment services. Revolut's single DALP deployment serves the full tokenized securities programme without re-architecture.

### Technical Requirements Analysis

**TR-01: REST and event APIs, documented and versioned**

OpenAPI 3.1 REST API with namespaces: `/v1/securities` (equity, fund templates), `/v1/trades` (DvP settlement), `/v1/corporate-actions` (dividend, vote, split), `/v1/compliance` (investor eligibility), `/v1/positions` (investor position query). 12-month deprecation policy. 534 structured error codes.

**TR-02: Sandbox and non-production environments**

Three environments: Development (Managed SaaS), Staging (Revolut's Kubernetes), Production (Revolut's Kubernetes). Test data: pre-configured tokenized equity and ETF products, pre-created investor accounts by FCA category, pre-seeded stablecoin balances for settlement testing.

**TR-03: Webhooks with retry and dead-letter**

Settlement event webhooks: HMAC-SHA256 signed, at-least-once delivery, 8-attempt retry over 48 hours, dead-letter queue for Revolut's operations team.

**TR-04: Identity and access**

OAuth 2.0/OIDC with Revolut's identity provider. MFA for all admin roles. API keys for Revolut's trading system service accounts. DFNS passkey for consumer wallet authorization on mobile clients. Fireblocks HSM for institutional custody operations.

**TR-05: Deployment model**

Private Cloud on Revolut's Kubernetes infrastructure (AWS or GCP, EU region). DALP Helm charts compatible with Revolut's GitOps tooling. Complete tenant isolation for Revolut's DALP instance.

**TR-06: Observability**

Three-pillar observability: Prometheus metrics (600+), structured JSON logs, OpenTelemetry distributed tracing. Grafana dashboards: trade settlement throughput, compliance evaluation rate, corporate action status, position reconciliation status, dependency health. Prometheus-compatible; Revolut's existing Prometheus/Grafana stack consumes DALP's metrics endpoint.

**TR-07: Performance for retail fintech scale**

API response (trade initiation): P50 82ms, P99 310ms (benchmark conditions: 4-node Besu IBFT 2.0, AWS c6g.xlarge, eu-central-1, 500 concurrent DvP requests). Settlement confirmation: P50 2.1s, P99 4.2s. Corporate action (dividend for 500,000 investors): 3.5 to 4.5 hours (chunked, no API degradation). Auto-scaling: HPA on CPU and queue depth; burst to 500 API pods.

**TR-08: Data export**

REST paginated export, real-time webhook stream, PostgreSQL direct access for Revolut's data platform, scheduled CSV for analytics ingestion.

**TR-09: Controlled releases**

Quarterly major releases, monthly minor, patches as needed. 12-month deprecation for breaking changes. Maintenance windows during agreed low-traffic hours.

**TR-10: Known limits and constraints**

| Constraint | Description | Mitigation |
|---|---|---|
| C-01 | EVM networks only | Private Besu or public EVM |
| C-02 | Corporate action for 500K+ investors: chunked processing | 4-6 hours batch window |
| C-03 | MiFID II suitability: DALP enforces eligibility, not suitability assessment | Suitability assessment in Revolut's existing MiFID II systems |
| C-04 | On-chain claim deletion (GDPR) | Off-chain deletable; on-chain pseudonymous |
| C-05 | Stablecoin denomination: EVM-deployed only | EUR, USD, GBP stablecoins deployable on same chain |

**TR-11: Infrastructure as code**

Helm charts, Terraform modules (AWS/GCP), ArgoCD/Flux GitOps support.

**TR-12: Support interfaces**

Enterprise support: 15-minute P1 response, incident bridge, status page.

---

## 6. Proposed Solution and Functional Capabilities

### Solution Architecture

```mermaid
flowchart TB
    subgraph Revolut_App["Revolut Super-App"]
        mobile_r["Mobile App (iOS/Android)"]
        web_r["Web App"]
    end
    subgraph Revolut_Core["Revolut Core Infrastructure"]
        trading_eng["Trading and Brokerage Engine"]
        ledger_r["Internal Ledger System"]
        kyc_r["KYC / AML System"]
        ops_r["Operations Console"]
        data_platform_r["Data Platform"]
    end
    subgraph DALP_Revolut["DALP: Tokenized Securities Layer"]
        api_r_layer["DALP API (OpenAPI 3.1)"]
        compliance_r_layer["Compliance Engine\n(FCA + MiCA per entity)"]
        settlement_r_layer["DvP Settlement Engine"]
        corp_action_r["Corporate Action Engine"]
        custody_r_layer["Fireblocks / DFNS Integration"]
        webhook_r_layer["Event Webhooks"]
    end
    subgraph Chain_R["Blockchain Execution"]
        equity_chain["Equity Token (ERC-3643)"]
        fund_chain["Fund Token (ERC-3643)"]
        stablecoin_chain["Settlement Stablecoin\n(EUR/USD/GBP)"]
        compliance_chain_r["On-chain Compliance\nModules"]
    end
    Revolut_App <--> Revolut_Core
    Revolut_Core <--> DALP_Revolut
    DALP_Revolut <--> Chain_R
    kyc_r -.->|"Investor eligibility claims"| compliance_r_layer
```

### DvP Settlement Flow

```mermaid
sequenceDiagram
    participant Investor as Revolut Investor
    participant App as Revolut App
    participant Trading as Trading Engine
    participant DALP as DALP API
    participant Compliance as Compliance Engine
    participant Fireblocks as Fireblocks Custody
    participant Chain as Blockchain

    Investor->>App: Buy 10 shares tokenized Apple equity
    App->>Trading: Create buy order
    Trading->>DALP: POST /v1/trades {buyer, quantity, price}
    DALP->>Compliance: Verify investor eligibility (FCA category)
    Compliance-->>DALP: Eligible: certified professional investor
    DALP->>Fireblocks: Lock buyer stablecoin (100 USD)
    DALP->>Fireblocks: Lock seller equity tokens (10 shares)
    Fireblocks-->>DALP: Both legs locked
    DALP->>Chain: Broadcast atomic DvP transaction
    Chain-->>DALP: Settled (2.1s median)
    DALP->>Trading: Webhook: TradeSettled {buyer, seller, quantity}
    Trading->>Ledger: Update position records
    Ledger->>App: Update investor portfolio display
```

### Corporate Action: Dividend Distribution

```mermaid
sequenceDiagram
    participant CA_Mgr as Corporate Action Manager
    participant DALP_CA as DALP Corporate Action Engine
    participant Indexer_R as Event Indexing Service
    participant Settlement as Settlement Engine
    participant Fireblocks as Fireblocks
    participant Chain as Blockchain
    participant Ledger as Revolut Ledger

    CA_Mgr->>DALP_CA: Initiate dividend (USD 0.50 per share)
    DALP_CA->>Indexer_R: Snapshot holder positions at record date
    Indexer_R-->>DALP_CA: Holder list (500,000 investors)
    DALP_CA->>Settlement: Calculate per-investor dividend
    Settlement->>Fireblocks: Batch dividend distribution (chunked)
    Fireblocks-->>Settlement: Signed batches
    Settlement->>Chain: Broadcast (3.5-4.5 hours, 500K investors)
    Chain-->>Settlement: All chunks confirmed
    Settlement->>Ledger: Webhook: DividendDistributed per investor
    Ledger->>Ledger: Credit dividend to each investor USD balance
```

### Multi-Jurisdiction Compliance Configuration

```mermaid
flowchart LR
    A([Investor initiates trade]) --> B{Which Revolut entity?}
    B -->|UK Entity| C{FCA Investor Category\nclaim present?}
    B -->|EU Entity| D{MiCA Consumer\nEligibility claim?}
    C -->|No| E1([Blocked: FCA categorization required])
    C -->|Professional| F1([Trade proceeds: professional limits apply])
    C -->|Retail| G{Within retail\nposition cap?}
    G -->|Yes| F1
    G -->|No| E2([Blocked: Position cap reached for retail])
    D -->|No| E3([Blocked: MiCA eligibility required])
    D -->|Yes| H{Country active\nfor this security?}
    H -->|Yes| F2([Trade proceeds: MiCA controls apply])
    H -->|No| E4([Blocked: Security not available in market])
```

### Stablecoin Settlement Integration

```mermaid
graph LR
    subgraph CashLeg["Cash Leg"]
        stbl_eur["EUR Stablecoin\n(on-chain)"]
        stbl_usd["USD Stablecoin\n(on-chain)"]
        stbl_gbp["GBP Stablecoin\n(on-chain)"]
    end
    subgraph EquityLeg["Equity/ETF Leg"]
        eq_token["Equity Token\n(ERC-3643)"]
        etf_token["ETF Token\n(ERC-3643)"]
    end
    subgraph DvP_Engine["DvP Settlement Engine"]
        atomic_lock["Atomic Lock\n(Both legs)"]
        atomic_settle["Atomic Settlement\n(<5s finality)"]
        atomic_revert["Revert on Failure\n(No partial state)"]
    end
    CashLeg --> DvP_Engine
    EquityLeg --> DvP_Engine
```

---

## 7. Technical Architecture

### Four-Layer Architecture

```mermaid
graph TB
    subgraph App_R["Application Layer"]
        console_r["Asset Console\n(Product Management)"]
        cli_r["DALP CLI (301 commands)"]
    end
    subgraph API_Layer_R["API and Developer Layer"]
        rest_r["OpenAPI 3.1 REST\nSecurities, Trades, Corporate Actions"]
        ts_r["TypeScript SDK"]
        webhooks_layer_r["Signed Event Webhooks"]
    end
    subgraph Middleware_R["Middleware Layer"]
        workflow_r["Durable Workflow Engine\n(Trade, DvP, Corporate Action)"]
        custody_middleware_r["Fireblocks / DFNS\n(Institutional + Consumer)"]
        indexer_r["Blockchain Event Indexing\n(Real-time projection)"]
        chain_gw_r["Chain Gateway\n(EVM multi-RPC, failover)"]
        feeds_r["Feeds System\n(NAV, market data)"]
    end
    subgraph SmartContract_R["Smart Contract Layer"]
        smart_r["SMART Protocol (ERC-3643)"]
        equity_r["Equity Token\n(dividends, votes, transfers)"]
        etf_r["Fund Token\n(NAV, creation, redemption)"]
        stablecoin_r["Settlement Stablecoins\n(EUR, USD, GBP)"]
        compliance_r_sc["On-chain Compliance\n(FCA + MiCA modules)"]
        identity_r_sc["OnchainID Registry\n(Investor KYC claims)"]
    end
    App_R --> API_Layer_R
    API_Layer_R --> Middleware_R
    Middleware_R --> SmartContract_R
```

Unlike platforms that couple asset logic to a specific blockchain network, DALP's layered architecture separates product configuration from network execution. Revolut can define tokenized equity parameters, compliance rules, and corporate action schedules independently of which EVM network is chosen, preserving optionality as FCA and MiCA regulatory guidance on DLT networks develops.

### Integration with Revolut's Super-App Infrastructure

**Trading engine integration:** DALP REST API integrates within Revolut's trading API gateway. Trade events (settlement confirmations, compliance results) delivered via webhooks to Revolut's internal event bus. Trade status polling available for UI synchronization.

**Internal ledger synchronization:** DALP's real-time webhook events drive Revolut's ledger position updates. On-chain authoritative balance available through DALP's REST API for reconciliation. Discrepancy detection through DALP's PostgreSQL direct access.

**KYC/AML integration:** Revolut's existing KYC and AML systems issue investor eligibility claims to DALP's OnchainID registry. Trade compliance checks validate eligibility before settlement. AML screening results reflected in transfer approval compliance module.

**Data platform:** DALP's REST export API and PostgreSQL direct access feed Revolut's data platform for trading analytics, compliance reporting, and investor account statement generation.

### Security Architecture

```mermaid
graph TB
    subgraph Trust_R["Trust Boundaries"]
        institutional["Institutional Custody\nFireblocks HSM\nFinancial Operations"]
        consumer_r["Consumer Wallets\nDFNS Passkey\n(Retail investors)"]
        admin_r["Administrative Access\nSSO + MFA\nProduct, Compliance, Risk"]
        ops_r_t["Operations Access\nAPI Keys\nTrading Engine, Ledger"]
    end
    subgraph Controls_R["On-Chain Controls"]
        access_r["AccessManager\n26 role types"]
        compliance_ctrl_r["Compliance Engine\nFCA + MiCA per entity"]
        token_pause_r["Token Pause\nEmergency suspension"]
    end
    institutional --> Controls_R
    consumer_r --> Controls_R
    admin_r --> Controls_R
    ops_r_t --> Controls_R
```

---

## 8. Security

**Key management (dual-custody model):**
Institutional operations (market maker, treasury): Fireblocks HSM-backed MPC. Consumer investor wallets: DFNS passkey MPC. Dual-custody model supports Revolut's separation between institutional asset management and retail investor access.

**FCA and MiCA compliance evidence:**
Tamper-evident audit log records every compliance decision, product change, and investor eligibility action. FCA examination access via read-only export API. MiCA Article 83 transaction reporting export in structured format.

**DORA and UK operational resilience:**
Multi-AZ Kubernetes deployment with documented third-party ICT dependencies. Quarterly resilience testing. RTO 1 hour, RPO 15 minutes. Annual penetration test with CISO-reported remediation governance.

**GDPR and UK GDPR:**
Personal data stored in Revolut's systems. DALP stores hashed investor references only. EU data residency for EEA entity; UK data residency option for UK entity.

---

## 9. Project Implementation and Delivery

### Implementation Programme

```mermaid
gantt
    title Revolut Tokenized Securities: Implementation Timeline
    dateFormat  YYYY-MM-DD
    section Phase 1 - Discovery
    FCA and MiCA regulatory mapping  :p1r, 2026-07-01, 7d
    Trading engine API assessment    :p1rb, 2026-07-01, 7d
    Architecture design              :p1rc, 2026-07-08, 7d
    P1 Gate Review                   :milestone, m1r, 2026-07-15, 0d
    section Phase 2 - Configuration
    Kubernetes environment setup     :p2r, 2026-07-16, 7d
    Equity and ETF token config      :p2rb, 2026-07-16, 14d
    FCA and MiCA compliance modules  :p2rc, 2026-07-22, 7d
    Fireblocks and DFNS setup        :p2rd, 2026-07-22, 7d
    Stablecoin settlement config     :p2re, 2026-07-22, 7d
    P2 Gate Review                   :milestone, m2r, 2026-08-05, 0d
    section Phase 3 - Integration
    Trading engine integration       :p3r, 2026-08-06, 14d
    Ledger synchronization           :p3rb, 2026-08-06, 14d
    KYC claim issuance               :p3rc, 2026-08-06, 7d
    Corporate action integration     :p3rd, 2026-08-13, 7d
    P3 Gate Review                   :milestone, m3r, 2026-08-26, 0d
    section Phase 4 - Testing
    Functional and integration tests :p4r, 2026-08-27, 7d
    FCA security review              :p4rb, 2026-08-27, 7d
    Performance (100K concurrent)    :p4rc, 2026-09-03, 7d
    Corporate action validation      :p4rd, 2026-09-10, 7d
    P4 Gate Review                   :milestone, m4r, 2026-09-17, 0d
    section Phase 5 - Go-Live
    Production deployment            :p5r, 2026-09-18, 5d
    Beta trading cohort launch       :p5rb, 2026-09-23, 2d
    P5 Completion                    :milestone, m5r, 2026-09-25, 0d
    section Phase 6 - Hypercare
    Monitoring and optimization      :p6r, 2026-09-26, 21d
    Knowledge transfer               :p6rb, 2026-10-10, 7d
    P6 Completion                    :milestone, m6r, 2026-10-16, 0d
```

### Responsibility Matrix

| Activity | SettleMint | Revolut | Shared |
|---|---|---|---|
| Architecture design | Lead | Review | |
| Token configuration | Lead | | |
| FCA/MiCA regulatory mapping | Support | Lead | |
| Trading engine integration | Support | Lead | |
| Fireblocks/DFNS setup | Lead | Support | |
| KYC claim issuance | Support | Lead | |
| Security review | Support | Lead | |
| Performance testing | Support | Lead | |
| Beta cohort launch | Support | Lead | |

---

## 10. Deployment

### Recommended: Revolut Private Cloud (Kubernetes, EU Region)

```mermaid
graph TB
    subgraph Revolut_K8s["Revolut Kubernetes Cluster (EU Region, 3 AZ)"]
        subgraph App_Pods_R["Application Pods"]
            api_pods_r["DALP API Pods\n(HPA: 3-500 pods)"]
            trade_pods_r["DvP Settlement Pods\n(3 pods, HA)"]
            ca_pods_r["Corporate Action Pods\n(batch workers)"]
            indexer_pods_r["Event Indexing Pods\n(2 pods, active-passive)"]
        end
        subgraph Data_R["Data Layer"]
            postgres_r["PostgreSQL Multi-AZ"]
            kms_r["KMS (Encryption at rest)"]
            s3_r["Object Storage\n(Audit archival)"]
        end
        subgraph Chain_R_deploy["Blockchain"]
            besu_r["Besu Validators (4-node IBFT 2.0)"]
        end
    end
    subgraph Ext_R["External Dependencies"]
        fireblocks_ext_r["Fireblocks\n(Institutional custody)"]
        dfns_ext_r["DFNS\n(Consumer wallets)"]
        kyc_ext_r["Revolut KYC System\n(Claim issuance)"]
    end
    Revolut_K8s --> Ext_R
```

---

## 11. Training and Knowledge Transfer

**Trading Operations Team (1 day):** DALP API for trade submission and settlement status; corporate action management; position query and reconciliation; operations dashboard interpretation.

**Product and Compliance Teams (1 day):** Asset Designer for tokenized security configuration; FCA and MiCA compliance module management; investor eligibility management; audit log navigation and regulatory export.

**Platform Engineering (1 day):** Helm deployment and GitOps; webhook integration; TypeScript SDK; performance tuning; monitoring dashboards.

**Security and Incident Response (half day):** Administrative access monitoring; P1 incident bridge; evidence preservation; FCA notification procedures.

---

## 12. Support and SLA

### Enterprise Support

| Attribute | Enterprise |
|---|---|
| Annual Fee | EUR 120,000 |
| Coverage | 24/7/365 |
| Uptime SLA | 99.99% monthly |
| P1 Response | 15 minutes |
| P1 Resolution Target | 2 hours |
| Dedicated Team | Named |
| CSM | Named |

---

## 13. Risk Management

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| FCA approval timeline for tokenized securities | Medium | High | Phase 1 regulatory mapping produces FCA evidence package |
| Fireblocks integration complexity | Low | Medium | Fireblocks is DALP's primary institutional custody; reference integration available |
| Trading engine webhook latency affecting settlement UX | Low | Medium | DALP settlement confirmation webhook under 5 seconds; async UI pattern recommended |
| Multi-jurisdiction compliance configuration | Low | Low | Per-entity compliance module sets fully independent on same DALP instance |
| Corporate action batch performance for 500K+ investors | Low | Medium | Chunked processing with configurable batch size; no API degradation during processing |

---

## 14. Compliance Matrix

| Requirement | Coverage | DALP Mechanism |
|---|---|---|
| FCA COBS 3.5 investor categorization | Supported | On-chain investor category compliance modules |
| FCA SYSC 8.1 outsourced technology | Supported | ISO 27001, SOC 2 Type II, UK DORA-equivalent |
| MiCA consumer protection (Art. 72) | Supported | Consumer eligibility, transfer limits, disclosure modules |
| MiCA transaction reporting (Art. 83) | Supported | Structured data export in regulatory format |
| DORA ICT risk and third-party | Supported | Third-party dependency documentation, quarterly resilience testing |
| UK GDPR and EU GDPR | Supported | UK and EU data residency options; off-chain personal data |
| AML/CFT (UK POCA, EU AMLD) | Supported with partner | Revolut's AML system issues eligibility claims |
| FCA Market Abuse Regulation | Supported with controls | Transfer approval module; audit trail for MAR investigation support |

---

## 15. Appendices

### Appendix A: Requirements Coverage Matrix

| Req ID | Status | DALP Mechanism |
|---|---|---|
| BR-01 | Supported | Configurable product workflows, Asset Designer |
| BR-02 | Supported | State machine, durable workflow engine, atomic DvP |
| BR-03 | Supported | On-chain authoritative, real-time event indexing |
| BR-04 | Supported | 26 role types, on-chain enforcement |
| BR-05 | Supported | FCA + MiCA compliance modules, per-entity config |
| BR-06 | Supported | Event catalog, HMAC-signed webhooks |
| BR-07 | Supported | Durable workflows, atomic DvP, dead-letter |
| BR-08 | Supported | Audit log, FCA/MiCA export APIs |
| BR-09 | Supported | Token pause, cohort claims, market activation |
| BR-10 | Supported | Multi-product, single platform, shared compliance |
| TR-01 | Supported | OpenAPI 3.1, TypeScript SDK, versioning |
| TR-02 | Supported | Three environments, FCA/MiCA test data |
| TR-03 | Supported | Signed webhooks, at-least-once, dead-letter |
| TR-04 | Supported | OAuth 2.0/OIDC, MFA, Fireblocks HSM, DFNS passkey |
| TR-05 | Supported | Kubernetes, Helm, GitOps, EU region |
| TR-06 | Supported | Prometheus, Grafana, OpenTelemetry |
| TR-07 | Supported | P99 4.2s, auto-scaling to 500 pods |
| TR-08 | Supported | REST, webhooks, PostgreSQL direct, CSV |
| TR-09 | Supported | Quarterly releases, 12-month deprecation |
| TR-10 | Supported | Constraints register disclosed |
| TR-11 | Supported | Helm, Terraform, ArgoCD/Flux |
| TR-12 | Supported | 15-min P1, incident bridge, status page |

---

*Document Classification: SettleMint Confidential*
*SettleMint NV | Simon Bolivarlaan 5, 2600 Antwerp, Belgium | www.settlemint.com*
*Version 1.0 | March 2026*
