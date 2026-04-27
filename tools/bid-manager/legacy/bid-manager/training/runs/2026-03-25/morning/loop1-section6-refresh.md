# Section 6: Technical Proposal — Loop 1 Refresh

## Refresh Focus Areas

After comparing the existing Section 6 content against the latest DALP codebase and the scoring rubric, the following areas need improvement:

1. **Executive Summary** — needs stronger client-centric framing, currently leads with DALP features
2. **Architecture principles** — too abstract, needs concrete mechanisms attached to each principle
3. **Security section** — strong but could benefit from clearer competitive framing
4. **HA/DR section** — tables are useful but prose connecting them to client outcomes is thin
5. **Monitoring section** — reads like internal docs, needs evaluator-facing framing
6. **Integration section** — needs clearer positioning against competitor integration approaches
7. **Visual communication hooks** — section references are there but diagram integration points need strengthening

---

## Refreshed Executive Summary

Institutional adoption of digital asset infrastructure depends on a straightforward question: can the technology meet the same operational standards that traditional financial systems have spent decades establishing? High availability measured in four nines. Security controls that satisfy regulators and auditors. Deployment models that respect data sovereignty requirements. Upgrade paths that do not require taking the platform offline or redeploying existing assets.

DALP's architecture is designed around these requirements, not retrofitted to accommodate them. The platform runs on Kubernetes (standard distributions and Red Hat OpenShift), supports cloud, on-premises, and hybrid deployment models, and integrates with institutional infrastructure including HSM-backed key management, enterprise observability stacks, and existing identity providers. Every architectural decision prioritizes the concerns that matter most to regulated financial institutions: operational sustainability, defense-in-depth security, auditability, and the ability to evolve without disruption.

This section presents the technical architecture in sufficient detail for a technical evaluation committee to assess the platform's fitness for institutional deployment, and in sufficient clarity for business and compliance stakeholders to understand why each architectural choice matters for their operational and regulatory requirements.

---

## Refreshed 6.1.1: Architectural Principles (Concrete Mechanisms)

DALP's architecture follows five foundational principles, each with concrete implementation consequences:

**Lifecycle-first design** means every architectural component serves the full digital asset lifecycle, not just token creation. In practice, this means the platform's data model, workflow engine, and compliance infrastructure account for ongoing operations such as coupon payments, corporate actions, holder management, and asset maturity from day one. Platforms designed primarily for token issuance typically discover these operational requirements only when their first asset reaches a coupon date or maturity event, requiring emergency engineering.

**Durable execution** is the core reliability mechanism. All stateful operations run through a durable execution engine that guarantees workflow completion even through infrastructure failures, process restarts, and network partitions. A bond coupon payment that processes 50,000 distributions will complete all 50,000 even if the platform restarts mid-execution, resuming from the exact distribution where it was interrupted. This is not an optional reliability layer; it is the execution model for every multi-step operation on the platform.

**Defense-in-depth** enforces security at five independent layers: authentication, authorization, wallet verification, on-chain compliance, and custody provider policy. The independence is critical. A compromised session token is blocked by wallet verification. A bypassed API authorization check is blocked by on-chain compliance. Even if all off-chain controls fail, custody provider policies provide the final gate before any transaction reaches the blockchain. No single control failure grants unauthorized access to blockchain operations.

**Separation of concerns** means the architecture cleanly separates API routing, business logic, blockchain interaction, data indexing, and observability into independently deployable and scalable components. When transaction processing needs more capacity, it scales independently of the API layer. When the indexer requires an upgrade, it rebuilds data in an isolated schema and switches atomically without affecting API availability.

**Provider abstraction** prevents vendor lock-in across infrastructure dependencies. Database, cache, object storage, secrets management, and custody are all accessed through abstracted interfaces. The same DALP deployment can run on AWS with RDS and S3, on Azure with Azure Database and Blob Storage, or on-premises with CloudNativePG and RustFS, without any application code changes. Configuration changes in the deployment values are sufficient to switch providers.

---

## Refreshed 6.4.1: Defense-in-Depth (Enhanced Competitive Framing)

DALP enforces security at every platform layer, with each layer operating independently. This five-layer model means that the security posture does not depend on any single control working correctly, which is a fundamentally different approach from platforms that rely primarily on application-layer access control.

The five layers operate in sequence for every blockchain write operation:

**Identity (Layer 1)** resolves and verifies the caller's identity through browser sessions, API keys, or CLI device flows. Session-based authentication supports email/password with mandatory email verification and passkey (WebAuthn) login. API keys are organization-scoped with explicit read-only or read-write scope enforcement. The authentication boundary includes an architectural decision that most platforms do not implement: API keys are explicitly blocked on the browser-facing endpoint, and browser sessions are explicitly blocked on the programmatic endpoint. This endpoint affinity prevents credential type confusion attacks.

**Access Control (Layer 2)** enforces role-based authorization through a middleware chain that reconciles on-chain access control state into platform authorization at request time. This means role changes made directly on the blockchain are reflected in the next API request without requiring a synchronization batch. Per-asset roles are independent, which means authority on one asset does not grant authority on another. The permission model is granular enough to distinguish between "can manage compliance" and "can issue tokens" even for the same user.

**Wallet Verification (Layer 3)** provides step-up authentication for sensitive blockchain write operations. Before any transaction is signed, the user must provide a secondary factor: PIN, TOTP, or backup codes. Each factor has per-use replay protection tracked in dedicated database tables, preventing the same verification response from being reused across multiple transactions. This layer exists specifically because a compromised session should not be sufficient to move assets.

**On-Chain Compliance (Layer 4)** evaluates identity claims and compliance modules at the smart contract level, both during simulation (pre-check) and during actual transaction execution. This enforcement is protocol-level, which means it cannot be bypassed by application-layer modifications, API manipulation, or database changes. Every transfer must satisfy all attached compliance modules, and the check evaluates the full claim chain including expiry timestamps and trusted issuer validity.

**Custody Policy (Layer 5)** applies the custody provider's own policy engine as the final gate before signing. For DFNS deployments, this includes programmatic policy evaluation with amount thresholds, IP restrictions, time restrictions, and multi-party approval requirements. For Fireblocks deployments, the Transaction Authorization Policy (TAP) applies institutional-grade approval workflows. These custody policies operate entirely outside DALP's control, providing a hard external boundary that even a fully compromised DALP deployment cannot bypass.

The independence of these layers is the key architectural property. Most competing platforms implement two or three of these controls but treat them as complementary rather than independently sufficient. In DALP, any single layer can prevent an unauthorized transaction, which means the effective security posture is the product of all five layers' reliability, not the reliability of the weakest one.

---

## Refreshed 6.5: HA/DR (Client Outcome Framing)

### Why HA/DR Architecture Matters for Digital Assets

Digital asset infrastructure has a characteristic that traditional application platforms do not: the blockchain ledger is inherently replicated. Every validator node maintains a complete copy of the on-chain state. This means that the HA/DR conversation for DALP focuses on the application layer (API availability, database durability, operational continuity) rather than on the asset data itself, which is protected by the distributed ledger's own replication.

This is a meaningful advantage. If the application database is lost entirely, on-chain data (asset balances, compliance state, identity claims) can be re-derived by re-indexing from the blockchain. The indexer's zero-downtime reindexing architecture makes this practical rather than theoretical: a new indexer version can build a fresh dataset in an isolated schema alongside the running version, then switch atomically.

DALP's HA/DR approach provides four deployment scenarios, each matching different institutional requirements for recovery time, data loss tolerance, and operational effort.

**Cloud-native deployment** (recommended for most institutions) provides RTO of 2 to 15 minutes and RPO of seconds to one minute, using managed services across three or more availability zones within a single region. Managed PostgreSQL with synchronous replication handles automatic database failover. Managed Redis with zone-redundant replication handles session and cache durability. Object storage provides eleven nines of durability. This model requires the least operational effort: 8 to 16 hours per month, which is achievable with 0.25 FTE as part of broader platform team responsibilities.

**Hot-warm deployment** provides geographic redundancy for organizations that require cross-region protection, with RTO of 30 to 180 minutes and manual or automated switchover. The secondary region maintains near-real-time data replication and can assume primary duties if the primary region experiences a sustained outage.

**Hot-hot deployment** supports active-active multi-region requirements where multiple regions serve traffic simultaneously. The blockchain layer's inherent distribution simplifies the data replication challenge, since nodes in each region maintain consistent ledger state through consensus. Application-layer state requires cross-region database replication, which represents the primary complexity and operational cost.

For each scenario, DALP provides concrete operational guidance including setup timelines, team skill requirements, ongoing monthly effort estimates, and quarterly DR drill procedures. The platform's backup strategy covers PostgreSQL point-in-time recovery, Kubernetes resource backups through Velero, versioned object storage with lifecycle policies, and WAL archiving for self-hosted deployments.

---

## Refreshed 6.7: Monitoring (Evaluator-Facing Framing)

### Operational Visibility Without Custom Development

Operating a digital asset platform requires visibility into both traditional application health (API availability, error rates, resource utilization) and blockchain-specific operational state (block production, consensus health, transaction confirmation, compliance enforcement patterns). DALP provides this visibility out of the box through three integrated observability pillars: time-series metrics (VictoriaMetrics), structured logs (Loki), and distributed traces (Tempo).

The distributed tracing architecture deserves specific attention because it addresses a challenge unique to delegated custody deployments. When a transaction involves MPC signing through an external custody provider, the execution path crosses trust boundaries that DALP does not control. The platform's tracing architecture instruments these external calls with dedicated tracer namespaces (20+ instrumentation points for Fireblocks API calls, dedicated DFNS operation tracing), enabling operations teams to diagnose whether latency or failures originate in the platform, the custody provider, or the blockchain network.

Pre-built Grafana dashboards ship with the platform covering node utilization, blockchain infrastructure health, operations overview, transaction monitoring, compliance activity, and security events. These dashboards provide immediate operational visibility from day one without requiring custom dashboard development.

For compliance and regulatory reporting, DALP's indexer maintains 18+ PostgreSQL analytics views across five domains (identity, compliance, addons, cross-cutting operations, and pricing). These views are accessible through standard SQL queries, which means any enterprise BI tool (Looker, Tableau, Power BI, Metabase) can connect directly to the analytics layer without requiring custom integration development. Compliance officers can query transfer patterns, claim coverage gaps, trusted issuer activity, and module enforcement statistics through the same tools their organization already uses for business intelligence.

Blockchain-specific health monitoring implements three-sample hysteresis for status changes, preventing false alerts from transient network blips while ensuring genuine issues surface quickly. Health events are published through Server-Sent Events for real-time dashboard consumption and through hourly API metrics rollups for trend analysis. Structured alert delivery uses DALP-branded Slack notification templates with actionable content: severity, affected components, relevant labels, description, and a one-click silence URL for acknowledged alerts.
