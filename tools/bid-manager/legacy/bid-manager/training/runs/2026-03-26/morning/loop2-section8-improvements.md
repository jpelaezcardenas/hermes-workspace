# Loop 2: Section 8 (RFI Response Bank) — Revised Improvements

## Date: 2026-03-26 | Exercise: Content Refresh Sections 7–8 (Week 2)

### Changes from Loop 1 Review

- Q2.7: Added client-centric framing ("your integration team", "your operations team")
- Q2.22: Added deployment model comparison table
- Q3.4 DORA: Added transition sentence from MiCA
- Q5.4: Tightened by ~15%, removed redundancy

---

## NEW: Q2.22 — What deployment models does DALP support? — FINAL

DALP supports three deployment models, each designed for different institutional governance and data residency requirements. Your infrastructure and security teams select the model that fits your control posture; the platform capabilities remain identical across all three.

| Model | Infrastructure Control | Time to Production | Best Fit |
|---|---|---|---|
| Cloud-managed | Institution owns the cloud account; SettleMint provides Helm deployment guidance | Fastest (standard cloud provisioning) | Institutions with cloud-first policies and no on-premises mandate |
| On-premises | Institution owns all compute, storage, and networking on Kubernetes (standard distributions or OpenShift) | Longer (depends on institutional provisioning) | Institutions with data residency mandates, sovereign requirements, or policies prohibiting cloud |
| Hybrid | Non-production in cloud, production on-premises (or any split) | Moderate | Institutions wanting fast iteration in development with maximum production control |

**Cloud-managed deployment** runs DALP on your cloud accounts (AWS, GCP, or Azure). Infrastructure costs are pass-through, not marked up by SettleMint. Your team controls region selection, network configuration, and access policies.

**On-premises deployment** installs DALP on your Kubernetes infrastructure within your data centers. This addresses mandates where data must remain within national borders and satisfies governance requirements where cloud deployment is not permitted.

**Hybrid deployment** combines both. A common pattern runs development and staging in cloud for faster iteration, while production operates on-premises for maximum control. The same Helm charts and configuration management apply across both environments.

Deployment model selection does not limit platform capabilities, asset class support, compliance module availability, or API surface. The choice is driven by your governance requirements and operational preferences, not by platform constraints.

---

## REVISED: Q2.7 — API and SDK — FINAL

DALP provides five programmatic interfaces designed to fit into your existing integration architecture:

**REST API (v2)** is the primary interface for connecting DALP to your core banking systems, payment rails, and internal middleware. It covers all platform capabilities with API-key authentication and HTTP-method-based scope enforcement (read-only keys can only call GET/HEAD/OPTIONS; read-write keys access mutating methods). For blockchain operations that take time to confirm, your integration layer sends `Prefer: respond-async`, receives HTTP 202 with a transaction ID, and polls for completion. All mutations accept idempotency keys, so your upstream systems can retry safely without creating duplicate transactions.

**SDK (@settlemint/dalp-sdk)** is a typed TypeScript library for teams embedding DALP operations into custom applications or integration middleware. The SDK provides contract-bound REST client methods, blockchain-aware serializers for BigInt and address types, and a zero-dependency error mirror covering 534 structured error codes. Your developers reuse CLI credentials, sharing a single authentication context across development tools.

**CLI (301 commands across 26 groups)** covers the full operational surface: system administration, token lifecycle, identity/KYC, compliance, monitoring, and all addon domains. Every command validates inputs through typed Zod schemas, making the CLI suitable for scripting and CI/CD pipeline integration. Dedicated AI agent integration documentation enables your team to build LLM-driven operational automation on top of the CLI.

**GraphQL** provides subgraph-based query access for read-heavy workloads: portfolio views, holder analytics, reporting dashboards, and any use case where your team needs flexible query composition rather than predefined REST endpoints.

**Event webhooks** deliver configurable notifications when settlement completes, compliance decisions execute, lifecycle states change, or identity events occur. Your downstream systems receive events without polling.

All interfaces share a consistent security model. API keys are scoped, replay-protected, and blocked from the session-authenticated RPC endpoint by design.

---

## REVISED: Q3.4 — DORA Addition (with transition) — FINAL

*[Insert after the MiCA full application paragraph]*

This regulatory momentum extends beyond securities-specific regulation. **DORA (Digital Operational Resilience Act), fully applicable since January 2025**, imposes ICT risk management, incident classification and reporting, operational resilience testing, and third-party ICT risk management requirements on EU financial entities. Banks, investment firms, insurance companies, and payment service providers evaluating DALP as a technology provider will need to satisfy DORA's third-party due diligence obligations. DALP supports this in two ways. First, ISO 27001 and SOC 2 Type II certifications provide a documented control baseline for your vendor risk assessment. Second, DALP's deployment flexibility (cloud-managed, on-premises, or hybrid) gives your institution the infrastructure control necessary to satisfy DORA's expectations around data integrity, service continuity, and operational resilience. Specific DORA compliance mapping for your deployment is addressed during the Discovery and Architecture phase, where SettleMint works with your risk and compliance teams to document ICT risk controls aligned to your DORA obligations.

---

## REVISED: Q5.4 — Disaster Recovery — FINAL (tightened)

DALP's disaster recovery architecture rests on two principles: durable state persistence and rebuildable read models.

**Durable execution guarantees workflow completion.** All stateful operations run through DALP's execution engine, which persists state at every phase transition. Multi-step operations (token creation, identity recovery, settlement coordination) survive process restarts and infrastructure failures by resuming from their last committed phase rather than restarting.

**Blockchain is the source of truth.** On-chain state is replicated across the blockchain network. In a catastrophic infrastructure failure, the authoritative ownership registry, compliance configuration, and transaction history remain intact. DALP's PostgreSQL-based indexer rebuilds its entire read model from on-chain events through zero-downtime reindexing (rotating deployment schemas with pass-through views maintain read availability during reconstruction).

**Kubernetes-native resilience.** Helm-based deployment provides pod auto-restart, node failover, rolling updates, and health-probe-driven routing. Each component (API, indexer, execution engine, observability) scales and recovers independently.

**Identity recovery.** For wallet loss or compromise, DALP provides operator-governed recovery with deterministic phase tracking: preview, wallet creation, identity deployment, registry recovery, credential reset, and token migration. Each phase executes with confirmation gates. An optional compromised-wallet blocklist prevents recovered wallets from reuse.

RPO and RTO targets depend on your deployment architecture and are defined during implementation. Cloud-managed deployments with multi-AZ clusters and database replication achieve the tightest objectives.

---

## NEW: Q2.23 — How does DALP support sustainable finance instruments? — FINAL

As green bond issuance, sustainability-linked bonds, and ESG-labeled instruments accelerate across Europe, the Middle East, and Asia-Pacific, your institution may need to issue or service these instruments alongside conventional fixed-income products. DALP's bond module and configurable token architecture support sustainable finance instruments through existing platform capabilities rather than a separate sustainability module.

**Use-of-proceeds enforcement.** Your compliance team can configure DALP's compliance modules to encode use-of-proceeds restrictions as on-chain rules, ensuring capital raised through green or social bond issuances is allocated according to your bond framework. Configuration happens through the platform's compliance interface; no smart contract code changes are required.

**Coupon schedules.** Fixed treasury yield features handle standard coupon schedules for green bonds. For sustainability-linked bonds with step-up coupon mechanics tied to KPI performance, the coupon rate adjustment depends on external KPI verification. DALP executes distributions at the configured rates; the KPI assessment and resulting rate determination is an external process whose output your team feeds into DALP's distribution configuration. This boundary is by design: KPI assessment involves third-party sustainability verifiers and methodologies outside platform scope.

**Metadata and reporting linkages.** Custom metadata schemas configured through instrument templates capture green bond framework details, verification body references, ICMA Principles alignment, and impact reporting linkages. These fields provide the structured data foundation that your sustainability reporting workflows consume. Field mutability is configurable (immutable for framework commitments, restricted-mutable for periodic updates).

**Applicable frameworks.** DALP's metadata and compliance infrastructure supports alignment with ICMA Green Bond Principles, EU Green Bond Standard (EU GBS), Climate Bonds Standard, and institution-specific sustainability frameworks. Legal structuring and external verification remain your responsibility; DALP provides the operational and data infrastructure.

Sovereign wealth funds, multilateral development banks, and programs requiring ESG-eligible collateral can deploy DALP's bond infrastructure for these instrument variants without custom smart contract development.
