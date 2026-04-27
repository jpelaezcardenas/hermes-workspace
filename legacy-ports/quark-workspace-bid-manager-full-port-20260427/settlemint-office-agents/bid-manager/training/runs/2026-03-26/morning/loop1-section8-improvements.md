# Loop 1: Section 8 (RFI Response Bank) — Targeted Improvements

## Date: 2026-03-26 | Exercise: Content Refresh Sections 7–8 (Week 2)

### Focus Areas

The source docs reveal updated content on: sustainable finance/ESG instruments (Q2.2 update), DORA regulatory requirements (Q3.4 update), expanded SDK documentation references, and new developer guide structure. The RFI bank needs several answers refreshed and three new entries added.

---

## NEW: Q2.22 — What deployment models does DALP support?

**Rationale:** Deployment flexibility is one of the most frequently asked questions in RFIs from regulated institutions, yet Section 8 has no dedicated answer. Current content is scattered across Q3.9 (data residency) and Q6.2 (infrastructure requirements).

**New answer:**

DALP supports three deployment models, each meeting different institutional governance and data residency requirements:

**Cloud-managed deployment** runs DALP on institutional cloud accounts (AWS, GCP, or Azure) with SettleMint providing Helm chart deployment guidance and operational support. Infrastructure costs are pass-through, not marked up. The institution controls the cloud account, region selection, and network configuration. This model offers the fastest path to production because infrastructure provisioning follows standard cloud patterns.

**On-premises deployment** installs DALP on client-owned Kubernetes infrastructure, including standard distributions and Red Hat OpenShift. The institution retains full physical control over compute, storage, and networking. This model addresses data residency mandates where data must remain within specific national borders or institutional data centers, and satisfies governance requirements where cloud deployment is not permitted by internal policy or regulation.

**Hybrid deployment** combines cloud and on-premises components. A common pattern runs non-production environments (development, staging, UAT) in cloud for faster iteration, while production operates on-premises for maximum control. The same Helm charts and configuration management apply across both environments, ensuring consistent platform behavior regardless of infrastructure location.

All three models deploy the identical DALP platform codebase. Deployment model selection does not limit platform capabilities, asset class support, compliance module availability, or API surface. The choice is driven by institutional governance requirements, data residency obligations, and operational preferences, not by platform constraints.

---

## REVISED: Q2.7 — API and SDK (strengthen with latest source data)

**Current weakness:** Lists interfaces without connecting them to integration outcomes. Reads like a capability inventory rather than a response that helps evaluators understand how integration works in practice.

**Improved version:**

DALP provides five programmatic interfaces, each designed for a specific integration pattern:

**REST API (v2)** is the primary interface for system-to-system integration. It covers all platform capabilities with API-key authentication and HTTP-method-based scope enforcement (read-only keys can only call GET/HEAD/OPTIONS; read-write keys access POST/PUT/PATCH/DELETE). For long-running blockchain operations, the `Prefer: respond-async` header returns HTTP 202 with a transaction ID that the calling system polls for completion. All mutations accept idempotency keys, enabling safe retry from upstream systems without duplicate transaction risk.

**SDK (@settlemint/dalp-sdk)** is a typed TypeScript library published to npm for institutions embedding DALP operations into existing middleware, integration layers, or custom applications. The SDK provides contract-bound REST client methods, blockchain-aware serializers for BigInt and address types, and a zero-dependency contract error mirror covering 534 error codes with structured metadata. The SDK reuses CLI credentials, so development teams working with both tools share a single authentication context.

**CLI (301 commands across 26 groups)** covers system administration, token lifecycle, identity/KYC, compliance configuration, monitoring, and all addon domains. Commands accept typed arguments validated through Zod schemas, making them suitable for scripting and CI/CD pipeline integration. The CLI includes dedicated documentation for AI agent integration, enabling LLM-driven operational automation.

**GraphQL** provides subgraph-based query access to on-chain state and indexed data. This interface is optimized for read-heavy workloads such as portfolio views, holder analytics, and reporting dashboards where clients need flexible query composition rather than predefined REST endpoints.

**Event webhooks** enable configurable event-driven notifications for downstream system integration. Settlement completions, compliance decisions, lifecycle state changes, and identity events can trigger outbound notifications to subscribing systems without polling.

All interfaces share a consistent security model. API keys are scoped, replay-protected, and blocked from the session-authenticated RPC endpoint by design. The RPC endpoint (`/api/rpc`) is reserved exclusively for the DALP dApp frontend and accepts only session/cookie authentication.

---

## REVISED: Q3.4 — Regulatory Compliance (add DORA content and tighten structure)

**Addition to insert after the MiCA paragraph:**

**DORA (Digital Operational Resilience Act), fully applicable January 2025.** DORA imposes ICT risk management, incident classification and reporting, operational resilience testing, and third-party ICT risk management requirements on EU financial entities, including banks, investment firms, insurance companies, and payment service providers. For institutions evaluating DALP, this has two practical implications. First, DALP's ISO 27001 and SOC 2 Type II certifications provide a documented control baseline that supports third-party due diligence obligations under DORA's ICT third-party risk management framework. Second, DALP's deployment flexibility (cloud-managed, on-premises, or hybrid) gives institutions the infrastructure control necessary to satisfy DORA's expectations around data integrity, service continuity, and operational resilience. Specific DORA compliance mapping for a given deployment is addressed during the Discovery and Architecture phase, where SettleMint works with the institution's risk and compliance teams to document ICT risk controls and operational resilience measures aligned to the institution's DORA obligations.

---

## REVISED: Q5.4 — Disaster Recovery (add durable execution detail)

**Current weakness:** Generic list of mechanisms without explaining how they combine into a recovery story. Evaluators reading this section need to understand the recovery guarantee, not just inventory components.

**Improved version:**

DALP's disaster recovery architecture is built around two principles: durable state persistence and rebuildable read models.

**Durable execution guarantees workflow completion.** All stateful operations, from token creation through identity recovery, run through DALP's durable execution engine. This engine persists workflow state at every phase transition, so multi-step operations survive process restarts, infrastructure failures, and node replacements. A token creation workflow interrupted mid-deployment resumes from its last committed phase rather than restarting. Settlement workflows in progress, identity recovery coordination, and compliance policy deployments all carry the same durability guarantee.

**Blockchain is the source of truth.** On-chain state is inherently replicated across the blockchain network. Even in a catastrophic infrastructure failure, the authoritative ownership registry, compliance configuration, and transaction history remain intact on the blockchain. DALP's custom PostgreSQL-based indexer can rebuild its entire read model from on-chain events through reindexing. The zero-downtime reindexing architecture (rotating deployment schemas with pass-through views) means read availability is maintained even during reconstruction.

**Kubernetes-native resilience.** Helm-based deployment on Kubernetes provides standard infrastructure resilience: pod auto-restart on failure, node failover, rolling updates without downtime, and health-probe-driven traffic routing. Each platform component (API service, indexer, execution engine, observability stack) scales and recovers independently.

**Identity recovery.** For wallet loss or compromise scenarios, DALP provides operator-governed recovery coordination with deterministic phase tracking: preview, wallet creation, identity deployment, registry recovery, credential reset, and token migration. Each phase executes with confirmation gates, and the optional compromised-wallet blocklist prevents recovered wallets from being reused.

Specific RPO and RTO targets depend on deployment architecture and are defined during implementation. Cloud-managed deployments with multi-AZ Kubernetes clusters and database replication achieve the tightest recovery objectives. On-premises deployments achieve targets based on the institution's infrastructure redundancy.

---

## NEW: Q2.23 — How does DALP support sustainable finance instruments?

**Rationale:** The source docs now include a sustainable finance section under Q2.2. This deserves a standalone RFI answer given the rapid growth of green bond and ESG-labeled issuance.

**New answer:**

DALP's bond module and configurable token architecture directly support sustainable finance instruments, including green bonds, sustainability-linked bonds (SLBs), social bonds, and blue bonds. These instruments share the same underlying token structure as conventional fixed-income instruments. The differentiation lies in reporting obligations, use-of-proceeds restrictions, and, for SLBs, step-up coupon mechanics tied to KPI performance.

DALP supports these requirements through existing platform capabilities rather than a separate sustainability module:

**Use-of-proceeds enforcement.** DALP's configurable compliance modules can encode use-of-proceeds restrictions as on-chain rules, ensuring capital raised through green or social bond issuances is allocated according to the bond framework. Compliance officers configure these restrictions without modifying smart contract code.

**Coupon schedules.** Fixed treasury yield features handle standard coupon schedules for green bonds. For sustainability-linked bonds with step-up mechanisms, the coupon adjustment logic depends on external KPI verification. DALP can execute distributions at configured rates; the KPI assessment and coupon rate determination is an external process whose output feeds into DALP's distribution configuration.

**Metadata and reporting linkages.** Custom metadata schemas configured through instrument templates capture green bond framework details, verification body references, ICMA Principles alignment, and impact reporting linkages. These fields are immutable or restricted-mutable depending on configuration, providing the data foundation for sustainability reporting.

**Applicable frameworks.** DALP's metadata and compliance infrastructure supports alignment with ICMA Green Bond Principles, EU Green Bond Standard (EU GBS), Climate Bonds Standard, and institution-specific sustainability frameworks. Legal structuring and external verification remain the issuer's responsibility; DALP provides the operational and data infrastructure.

Institutions responding to green finance mandates, including sovereign wealth funds, multilateral development banks, and central bank programs requiring ESG-eligible collateral, can deploy DALP's bond infrastructure without custom smart contract development for these instrument variants.
