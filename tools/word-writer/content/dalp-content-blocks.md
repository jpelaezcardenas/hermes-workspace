---
title: "DALP Content Blocks for Word Writer"
type: page
source: gbrain-metadata-normalizer
metadata_normalized_at: 2026-04-27T12:36:05.911454Z
---

# DALP Content Blocks for Word Writer

> Reusable content blocks for documents that reference SettleMint or DALP. Pull from these when drafting reports, memos, briefings, or any document that needs accurate platform descriptions. All content is verified against the DALP codebase and product documentation.

---

## Company Overview

### SettleMint (short)
SettleMint builds DALP, the Digital Asset Lifecycle Platform. Founded in 2016 and headquartered in Belgium, SettleMint works with regulated financial institutions, market infrastructure providers, and sovereign entities across Europe, the Middle East, and Asia Pacific.

### SettleMint (one-liner)
SettleMint provides the infrastructure regulated institutions need to design, launch, and operate tokenized financial assets under a single control plane.

---

## Platform Overview

### What DALP Is
DALP (Digital Asset Lifecycle Platform) is a configurable platform for issuing, managing, and servicing tokenized financial assets. It covers the full asset lifecycle: design, compliance configuration, issuance, distribution, servicing (coupon payments, corporate actions), and redemption. Institutions configure and operate it themselves using the same software that powers live deployments at regulated banks and market infrastructure providers.

### What DALP Is Not
DALP is not a consulting engagement, a custom development project, or a blockchain toolkit. It is a platform product. There is no custom Solidity development required to launch a tokenized bond, issue fractional real estate tokens, or enforce multi-jurisdictional compliance.

### Core Capabilities (bullet format)
- **Asset Designer**: Step-by-step wizard for configuring tokenized instruments across seven asset types (bonds, equities, funds, deposits, stablecoins, real estate, precious metals) without writing smart contracts
- **Compliance Engine**: Pre-built compliance modules for MiCA EU, MAS Singapore, Japan FSA, SEC Reg CF, SEC Reg D 506(b), and custom rule expressions using boolean logic
- **Identity & Verification**: On-chain identity management with KYC/AML verification, trusted issuer networks, and claim-based eligibility enforcement
- **Governance & Access Control**: Per-asset role model with seven distinct roles (Default Admin, Governance, Supply Management, Custodian, Emergency, Sale Admin, Funds Manager) and RBAC/ABAC controls
- **Lifecycle Operations**: Minting, burning, transfers, forced transfers, freezing, pausing, coupon distribution, maturity processing, and corporate actions
- **Settlement**: Atomic delivery-versus-payment (DvP) settlement using on-chain denomination assets
- **Observability**: Full-stack monitoring with VictoriaMetrics (metrics), Loki (logs), Tempo (traces), pre-built Grafana dashboards, and automated alerting
- **Multi-chain**: Deploy on multiple EVM-compatible blockchain networks from a single control plane

---

## Asset Classes

### Seven Asset Types
DALP supports seven asset types organized into four classes:

| Class | Asset Types | Key Features |
|---|---|---|
| Fixed Income | Bonds | Maturity dates, coupon schedules, ISIN, denomination assets, yield distribution |
| Flexible Income | Equities, Funds | Dividend distribution, NAV tracking, share class management |
| Cash Equivalents | Deposits, Stablecoins | Reserve management, mint/redeem workflows, payment rail integration |
| Real World Assets | Real Estate, Precious Metals | Fractional ownership, property metadata, physical asset backing |

### Configuration-Driven Model
Tokenizing an asset in DALP does not require custom smart contract development. The platform uses DALPAsset, a unified token contract built on the ERC-3643 (T-REX) standard. Operators configure instruments through a guided wizard that captures asset class, token parameters, compliance rules, governance structure, and deployment settings. Every component has been independently audited.

---

## Compliance

### Compliance Approach
DALP enforces compliance at the protocol level. Eligibility rules are evaluated before execution, not after review. When a transfer is attempted, the compliance engine checks the sender and receiver against configured rules (KYC status, AML clearance, accredited investor status, jurisdiction restrictions, holding limits) and blocks non-compliant transactions on-chain.

### Regulatory Frameworks
Pre-built compliance templates cover:
- **MiCA EU**: Country allowlists for all 27 EU member states, rolling annual supply caps (8,000,000 EUR)
- **MAS Singapore**: Singapore-specific investor eligibility and reporting controls
- **Japan FSA**: Japanese regulatory framework controls
- **SEC Reg CF**: US crowdfunding compliance
- **SEC Reg D 506(b)**: US private placement compliance
- **Custom**: Expression builder for institution-specific rules combining multiple conditions

### Access Control & Action Verification
DALP separates account access from blockchain action approval. Browser users can sign in with passkeys for account access, but sensitive on-chain mutations still require wallet verification at execution time. For transaction gating, DALP currently supports PIN code, one-time password (TOTP), and secret-code verification; passkey-based transaction verification is not yet active in the DAPI middleware. Authorization combines off-chain organization roles with token-level permissions and trusted-issuer topics, so a user must satisfy both session-level access rules and asset-specific rights before a mutation is submitted.

---

## Deployment & Operations

### Deployment Model
Tokens deploy through durable workflows orchestrated by Restate (DALP's execution engine). Deployment is idempotent: if any step fails, it resumes from the last successful step without creating orphaned contracts. Tokens deploy in a paused state by default, giving the compliance team time to verify configuration before activation.

### Integration
DALP integrates with existing custodians, core banking systems, and payment rails via standard APIs. The platform does not replace existing infrastructure; it connects to it.

---

## Infrastructure & Self-Hosting

### Deployment Options
DALP runs on Kubernetes (1.27+) and OpenShift (4.14+), deployed as a 4-chart Helm hierarchy: core application (DApp, DAPI, durable workflows, indexer, block explorer, subgraph, IPFS), observability (VictoriaMetrics, Loki, Tempo, Grafana with 21 pre-built dashboards), support services (PostgreSQL, Redis, S3-compatible storage), and development tools. Clients provision infrastructure; SettleMint handles platform deployment, typically completed in 2 to 4 business days.

### Production Infrastructure Requirements
A production deployment requires a minimum of three Kubernetes nodes across three availability zones, each with at least 4 vCPU and 16 GB RAM (8 vCPU / 32 GB recommended). Managed PostgreSQL 17.x with Multi-AZ HA, managed Redis 8.x with TLS and AUTH, and S3-compatible object storage (or in-cluster RustFS). All external routes are HTTPS-only.

### High Availability
DALP documents five HA patterns, each with defined RTO/RPO targets:

| Pattern | RTO | RPO | Use Case |
|---|---|---|---|
| Cloud-native (recommended) | 2 to 15 min | Seconds to 1 min | Most deployments |
| Hot-warm | 30 to 180 min | 5 to 60 min | Geographic redundancy |
| Hot-cold | 8 to 72 hours | 4 to 24 hours | Cost optimization |
| Hot-hot (consortium) | 1 to 10 min | Seconds to minutes | Multi-region active-active |
| Hot-hot (public) | 1 to 10 min | 1 to 5 min | Public networks |

### Observability (summary)
Full-stack observability ships in-cluster: VictoriaMetrics for metrics, Loki for logs, Tempo for distributed tracing, Alloy for collection (dual-receiver OTLP architecture supporting both in-cluster and remote forwarders), and Grafana with 21 dashboards as code (8 DALP-specific, 13 infrastructure). Automated alerting covers infrastructure health, blockchain connectivity, and backup status with Slack and email routing.

### Enterprise Integration Points
For regulated OpenShift deployments, DALP supports CyberArk Conjur for secret injection via Kubernetes Authenticator. Signer providers are pluggable: local, DFNS, or Fireblocks. The platform auto-detects Kubernetes vs. OpenShift and renders the appropriate ingress or route resources.

---

## Custody & Settlement

### Custody Model
DALP provides logical on-chain custody through deterministic vault provisioning. Custody vaults are deployed as system addons with role-gated factory registration, identity binding, and built-in de-duplication. DALP controls governance boundaries and on-chain provisioning but does not provision off-chain custody hardware or partner-run key ceremonies.

### Settlement
DALP supports atomic delivery-versus-payment (DvP) settlement using on-chain denomination assets. Settlement sessions terminate into one auditable end-state (executed, cancelled, or expired-withdrawn) with closure-readiness checks and projection convergence. The platform does not execute fiat transfers directly; it coordinates with external payment rails.

---

## Usage Notes for Word Writer

- Use the short company overview for internal documents; use the one-liner for executive summaries or brief references.
- When describing capabilities, pull specific items from the bullet list rather than listing everything. Match detail level to audience and purpose.
- For compliance-focused documents, include the regulatory frameworks table. For technical audiences, include the deployment model details.
- Use the Access Control & Action Verification block in security questionnaires, operating notes, and governance memos that need to explain who can do what, and what extra verification is required before blockchain writes.
- All stats and descriptions are verified. Do not embellish or extrapolate beyond what is stated here.
- For infrastructure-focused documents (architecture memos, technical briefings, security questionnaires), use the Infrastructure & Self-Hosting blocks. Adapt detail level: executives get the deployment timeline and HA summary; technical audiences get the full requirements and topology.
- Use the Custody & Settlement block when documents touch operational controls, risk management, or asset safekeeping. Note the explicit boundary: DALP handles on-chain governance, not off-chain key ceremonies.
- When in doubt about a specific DALP capability not covered in these blocks, flag it for verification rather than guessing.
