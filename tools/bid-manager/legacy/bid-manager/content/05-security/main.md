# Section 5: Security Architecture

## Executive Summary

DALP treats security as a structural property of the platform, not an afterthought bolted onto the application layer. The architecture enforces defense-in-depth across five independent control layers: identity verification, role-based access control, transaction-level wallet verification, on-chain compliance enforcement, and custody provider policy evaluation. No single-layer failure grants unauthorized access to digital assets.

SettleMint holds ISO 27001 and SOC 2 Type II certifications, confirming that security controls are not just designed but independently audited and continuously maintained.

This section covers authentication and authorization, key management, smart contract security, network and data protection, operational security, compliance certifications, penetration testing, and disaster recovery.

---

## 1. Authentication

### 1.1 Authentication Methods

DALP uses Better Auth for identity management, supporting multiple authentication methods appropriate to different operational contexts.

| Method | Use Case | Status |
|--------|----------|--------|
| Email and password | Standard operator and user access | Active |
| Passkeys (WebAuthn) | Hardware security keys, platform authenticators (Face ID, Touch ID, Windows Hello) | Active |
| LDAP / Active Directory | Corporate directory integration | Available via plugin |
| OAuth 2.0 / OIDC | Okta, Auth0, Azure AD integration | Available via plugin |
| SAML 2.0 | Legacy enterprise SSO | Available via plugin |

Passkeys provide phishing-resistant authentication. They are cryptographically bound to the origin domain, eliminate shared secrets, and support biometric verification on compatible devices.

### 1.2 Session Management

Browser-based clients authenticate using HTTP-only session cookies with the following protections:

- HTTP-only flag prevents client-side script access to session tokens
- Secure flag ensures cookies transmit only over HTTPS
- SameSite attribute protects against cross-site request forgery
- Sessions expire after 7 days with a 24-hour refresh window
- Cookie caching with a 10-minute max age reduces database lookups
- Each session binds to user identity and active organization for complete audit trails

Every authentication event is logged with timestamp, method, and result.

### 1.3 API Key Authentication

Machine-to-machine integrations authenticate with scoped API keys.

| Aspect | Implementation |
|--------|----------------|
| Format | "sm_atk_" prefix plus 16 random characters |
| Storage | Hashed in database; cleartext shown once at creation |
| Scoping | Per-key permissions limit access to specific procedure namespaces |
| Rate limiting | 10,000 requests per 60-second window per key |
| Lifecycle | Keys can be created, rotated, and revoked through console or API; revocation is immediate |

API keys follow the principle of least privilege. Each integration receives only the permissions it requires, inherited from the creating user's role.

### 1.4 Wallet Verification (Step-Up Authentication)

Beyond session authentication, DALP enforces a dedicated second factor for all blockchain write operations. Even with a valid authenticated session, no on-chain transaction executes without the user proving control of their wallet.

| Method | Description |
|--------|-------------|
| PIN | 6-digit code set during wallet setup |
| TOTP | Time-based one-time passwords via authenticator app (RFC 6238, 30-second rotation) |
| Backup codes | One-time recovery codes generated during wallet setup, consumed on use |
| Passkey | WebAuthn challenge-response with hardware key or biometric |

If wallet verification fails, the request is rejected immediately. No gas is consumed, no custody provider interaction occurs, and no on-chain state changes. There is no administrative override that skips wallet verification; recovery requires backup codes or credential re-enrollment.

---

## 2. Authorization

### 2.1 Dual-Layer Permission Model

DALP enforces authorization through two independent layers. Both must pass for any blockchain write operation:

- Off-chain platform roles managed by Better Auth control API and console access
- On-chain roles in Solidity contracts govern blockchain operations

The on-chain AccessManager contract is the authoritative source for all role assignments. Roles granted or revoked on-chain are immediately reflected in the UI through chain indexer event processing. There is no separate off-chain permission database.

### 2.2 Role Taxonomy

26 distinct roles organized across four layers:

**Platform Roles (3 roles):** owner, admin, member. Organization-scoped, managed by Better Auth. Owner has full administrative access; admin manages users and configuration; member operates based on assigned permissions.

**System People Roles (9 roles):** systemManager, identityManager, tokenManager, complianceManager, claimPolicyManager, organisationIdentityManager, claimIssuer, auditor, feedsManager. Assigned to human operators via on-chain AccessManager.

**Per-Asset Roles (7 roles):** admin (DEFAULT_ADMIN_ROLE), governance, supplyManagement, custodian, emergency, saleAdmin, fundsManager. Scoped per token contract, enabling fine-grained control over individual asset operations.

**System Module Roles (7 roles):** Assigned to contract addresses for system-level operations including module management, identity registry operations, and factory registrations.

### 2.3 Multi-Tenant Isolation

The platform supports configurable multi-tenancy through Better Auth organizations. Tenant isolation is enforced at the database query level on every API request. Cross-tenant operations are not possible. Each tenant has isolated membership, roles, assets, compliance records, and audit trails.

---

## 3. Key Management

### 3.1 Key Guardian Architecture

The Key Guardian service manages cryptographic key material through defense-in-depth with multiple storage backends at escalating security levels. Keys never leave secure boundaries in plaintext.

| Storage Tier | Protection Level | Use Case |
|-------------|-----------------|----------|
| Encrypted database | Application-level encryption | Development and proof-of-concept |
| Cloud secret manager | Platform-managed encryption | Standard production deployments |
| Hardware security module | FIPS 140-2 Level 3 | Regulated financial services |
| Third-party custody (DFNS, Fireblocks) | Delegated institutional MPC | Highest security requirements |

Organizations select their tier based on security requirements and regulatory obligations. Mixed deployments are supported: HSM for treasury operations, database keys for automated processes.

### 3.2 Key Lifecycle

- Generation: HSM-backed keys generate entirely within hardware. Software keys use cryptographically secure random sources with immediate encryption before memory clearing.
- Rotation: Active signing keys are replaced while maintaining historical keys for verification. Rotation coordinates with blockchain address updates and registry notifications.
- Recovery: Enterprise deployments use sharded backups with threshold signature schemes requiring multiple custodians.
- Revocation: Compromised keys are immediately removed from active use. Smart contract permissions update to reject signatures from revoked keys.

### 3.3 MPC Custody Integration

DALP integrates with DFNS and Fireblocks for institutional-grade MPC custody. The unified signer abstraction makes custody providers interchangeable through configuration changes alone, with no workflow or code modifications required.

**DFNS:** Threshold MPC with distributed key shards. Supports fully programmatic approval workflows through its API. DFNS policy engine enforces transaction limits and multi-party approval requirements before signing. Pending approvals surface through the DALP interface for operator resolution.

**Fireblocks:** MPC-CMP with continuous key refresh, eliminating static key shares. Transaction Authorization Policy (TAP) enforces amount thresholds, whitelisted destinations, velocity limits, and multi-approver requirements. Approvals require the Fireblocks Console or Co-Signer appliance.

Both providers ensure that no single private key ever exists in one place. DALP owns permissioning, wallet verification, queueing, and workflow state transitions; the custody provider owns nonce allocation, gas handling, signing, and broadcast.

### 3.4 Signer Abstraction

The platform implements a unified signer interface that abstracts over all custody backends. Runtime capability detection via supportsBroadcast() allows the platform to select local or provider-delegated execution paths dynamically. Adding a new custody provider requires implementing the signer adapter, not changing platform workflows.

---

## 4. Smart Contract Security

### 4.1 ERC-3643 Foundation

All DALP smart contracts build on the SMART Protocol (SettleMint Adaptable Regulated Token), an implementation of the ERC-3643 standard. The standard enforces compliance at the protocol level: every transfer must pass through a modular compliance engine before execution. This is not application-layer validation that can be bypassed; it is enforced by the smart contract itself.

### 4.2 Upgrade Controls

DALPAsset contracts use the SMARTConfigurable extension, allowing token features and compliance modules to be attached and reconfigured at runtime after deployment. This design eliminates the need to redeploy contracts for configuration changes while maintaining on-chain governance controls over who can modify settings.

Smart contract upgrades and configuration changes require specific on-chain roles:

- The governance role controls identity registry, compliance modules, features, and metadata configuration
- The systemManager role manages system upgrades, factory registrations, and module deployments
- The admin (DEFAULT_ADMIN_ROLE) grants and revokes all other per-asset roles

No single role can unilaterally modify the entire system. Role separation ensures that operational, compliance, and administrative functions are governed independently.

### 4.3 On-Chain Access Control Patterns

The AccessManager contract enforces role-based access at the smart contract level. Every state-changing function checks the caller's on-chain role before execution. Forced transfers (ERC-3643 forcedTransfer) bypass compliance checks by design but remain restricted to the custodian role and are fully logged on-chain.

The emergency role provides circuit-breaker capability: pause and unpause operations across an asset without requiring broader administrative access.

### 4.4 Audit History

[TO VERIFY] Details on third-party smart contract security audits, audit firms engaged, and audit report availability. SettleMint's SMART Protocol contracts have been through security review, but specific audit firm names and report references should be confirmed with the engineering team.

---

## 5. Network Security

### 5.1 Transport Layer Security

All communication between clients and the DALP platform is encrypted using TLS. The platform enforces HTTPS for all API endpoints, console access, and inter-service communication.

Session cookies carry the Secure flag, ensuring they are only transmitted over encrypted connections. API keys are transmitted only during creation (cleartext shown once) and stored as hashed values.

### 5.2 Private Network Deployments

DALP supports self-hosted deployments on private infrastructure, including on-premises Kubernetes and OpenShift clusters. For consortium blockchain deployments, validator nodes and RPC endpoints can be deployed within private networks with no public internet exposure.

Network isolation is configurable per deployment:

- Kubernetes network policies restrict pod-to-pod communication
- Ingress controllers manage external access points
- Internal services communicate within the cluster network boundary

### 5.3 Blockchain Network Security

For private and consortium blockchain networks, DALP manages validator node deployment within controlled infrastructure. Validator keys can be pre-staged in standby clusters for geographic redundancy scenarios without exposing them to public networks.

The Chain Gateway component manages RPC connectivity with health monitoring, connection pooling, and automatic failover for degraded endpoints.

---

## 6. Data Protection

### 6.1 Encryption at Rest

Database-managed keys are encrypted at application level before storage. Cloud secret manager backends provide platform-managed encryption for production deployments. HSM-backed keys never leave the hardware boundary.

Object storage supports seven provider backends (AWS S3, GCP Cloud Storage, Azure Blob Storage, S3-compatible, MinIO, RustFS, local filesystem) with provider-native encryption-at-rest capabilities. A dual-bucket model separates public assets from sensitive data in private buckets.

### 6.2 Encryption in Transit

All API communication uses TLS. Inter-service communication within the Kubernetes cluster uses cluster-internal networking. Session cookies are HTTP-only and Secure-flagged. Webhook and notification payloads are transmitted over encrypted channels.

### 6.3 Sensitive Data Handling

API keys are hashed in the database; cleartext is shown once at creation and never stored. Wallet verification credentials (PINs, TOTP secrets, backup codes) are stored with cryptographic protections and rotate independently of session tokens.

The filesystem object storage provider uses HMAC-SHA256 signed presigned URLs with constant-time comparison for verification. Production deployments enforce rejection of default development signing keys at startup.

Tenant data isolation is enforced at the database query level. Every API request is scoped to the active organization, preventing cross-tenant data access.

---

## 7. Operational Security

### 7.1 Observability Stack

The platform includes a comprehensive observability stack built on three pillars: metrics, logs, and traces.

**Metrics:** Time-series data captures request rates, latencies, error rates, resource utilization, transaction volumes, block lag, gas prices, and confirmation times. Prometheus scraping is opt-in per pod via annotations.

**Logs:** Structured JSON logs with correlation identifiers link related entries across components. Configurable log levels (debug, info, warn, error, fatal) per environment. ORPC request/response logging available for API debugging.

**Traces:** Distributed traces follow operations across component boundaries with span-level timing and metadata for bottleneck identification.

### 7.2 Pre-Built Dashboards and Alerting

| Dashboard | Audience | Key Metrics |
|-----------|----------|-------------|
| Operations overview | Platform operators | Request rates, error rates, latency |
| Transaction monitor | Operations team | Pending transactions, gas usage, confirmations |
| Compliance activity | Compliance officers | Verification volumes, approval rates |
| Security overview | Security team | Authentication events, access patterns |
| Infrastructure health | DevOps | Resource utilization, node health |

Alert rules trigger notifications when metrics exceed thresholds:

| Alert Category | Condition | Severity |
|---------------|-----------|----------|
| Error rate spike | Error rate above 5% for 5 minutes | Critical |
| Latency degradation | P99 latency above 2x baseline | Warning |
| Resource exhaustion | Memory above 90% for 10 minutes | Warning |
| Chain connectivity | No blocks for 5 minutes | Critical |
| Transaction failure | Failure rate above 1% | Warning |

Alert routing supports PagerDuty for critical alerts, Slack for warnings (with DALP-branded notification templates), and email for informational notifications. Grafana-based alerting with configurable Slack contact points provides structured alert context including namespace, pod, container, summary, and silence links.

### 7.3 Blockchain Infrastructure Monitoring

Admin-only operational health monitoring provides real-time visibility into chain RPC and graph-node services. Snapshot history, timeline aggregation, and live SSE streaming give operators continuous insight into blockchain infrastructure status. Health status detection is fail-safe: unknown service types are dropped rather than rendered incorrectly.

### 7.4 Audit Trails

The platform captures comprehensive audit trails for compliance and forensic purposes:

- All authentication events with outcome and context
- Authorization decisions with resource and action
- Data access with query details and results
- Configuration changes with before/after state
- Administrative actions with operator identity
- Wallet verification attempts (success and failure) with user identity and timestamp
- Key lifecycle events: generation, signature requests, rotation, and access denials

Audit logs are retained according to regulatory requirements, typically seven years for financial services. Tamper-evident storage ensures log integrity.

### 7.5 Incident Response

The observability tooling supports rapid incident response through:

- Correlation: Trace IDs link logs, metrics, and traces for affected operations
- Timeline reconstruction: Log search with time filters reveals event sequences
- Impact assessment: Metrics dashboards quantify affected users and operations
- Root cause analysis: Trace visualization identifies failing components

[TO VERIFY] Application-level incident management (incident queue, alert-rule engine, automated remediation) is on the roadmap but not yet implemented as a first-class product capability. Current incident detection relies on the observability infrastructure layer (Prometheus, Grafana alerting, structured logging, Sentry integration) rather than a built-in incident management API.

---

## 8. Compliance Certifications

### 8.1 ISO 27001

SettleMint maintains ISO 27001 certification, the international standard for information security management systems (ISMS). This certification confirms that SettleMint has established, implemented, maintained, and continually improves a systematic approach to managing sensitive information. The certification covers risk assessment, security controls, organizational policies, and continuous improvement processes.

### 8.2 SOC 2 Type II

SettleMint holds SOC 2 Type II certification, which goes beyond point-in-time control design (Type I) to verify that security controls operate effectively over an extended audit period. The Type II report provides assurance to clients that:

- Security controls are not just designed but consistently enforced
- Access controls, change management, and incident response procedures are followed in practice
- The organization monitors and responds to security events on an ongoing basis

### 8.3 On-Chain Compliance Enforcement

Beyond organizational certifications, DALP enforces regulatory compliance at the protocol layer through the ERC-3643 standard. On-chain compliance modules evaluate every token transfer against configurable rules including country restrictions, investor limits, supply caps, time-based locks, transfer approval workflows, and identity verification requirements. Compliance checks execute on-chain and cannot be bypassed by the application layer.

---

## 9. Penetration Testing and Vulnerability Management

[TO VERIFY] Specific details on penetration testing frequency, third-party testing firms engaged, and vulnerability disclosure processes should be confirmed with SettleMint's security team. Standard practice for ISO 27001-certified organizations includes regular penetration testing and vulnerability assessments.

The platform incorporates multiple layers of vulnerability prevention:

- Wallet verification rate limiting with progressive lockout prevents brute-force attacks
- API key rate limiting at 10,000 requests per 60-second window per key
- Input validation at the API contract layer with Zod schema enforcement
- Path traversal protection in object storage with resolved path validation against base paths
- HMAC-signed presigned URLs with constant-time comparison to prevent timing attacks
- Production safety checks that reject default development credentials at startup

---

## 10. Disaster Recovery and Business Continuity

### 10.1 High Availability Architecture

DALP supports multiple HA deployment patterns, with cloud-native as the recommended approach for most deployments.

| Scenario | RTO | RPO | Use Case |
|----------|-----|-----|----------|
| Cloud-native (recommended) | 2 to 15 minutes | Seconds to 1 minute | Most deployments; single-region, multi-AZ with managed services |
| Hot-warm (active-standby) | 30 to 180 minutes | 5 to 60 minutes | Geographic redundancy requirements |
| Hot-cold (backup-based) | 8 to 72 hours | 4 to 24 hours | Cost optimization, non-critical systems |
| Hot-hot (consortium) | 1 to 10 minutes | Seconds to minutes | Multi-region active-active |

### 10.2 Cloud-Native Deployment (Recommended)

The recommended cloud-native pattern uses managed Kubernetes services (EKS, AKS, GKE, OpenShift), managed PostgreSQL with HA, and Velero for backup and restore. Multi-AZ pod distribution provides automatic failover for most failures with an RTO of 2 to 15 minutes and synchronous replication achieving RPO of seconds to 1 minute.

Supported cloud providers include AWS (EKS with RDS Multi-AZ, S3), Azure (AKS with zone-redundant database, Blob Storage ZRS/GRS), GCP (GKE regional with Cloud SQL HA, Cloud Storage multi-regional), and OpenShift (multi-master with etcd quorum, OpenShift Data Foundation).

### 10.3 Geographic Redundancy

For organizations requiring geographic redundancy, the hot-warm pattern provides active-standby deployment across two clusters with continuous PostgreSQL replication. Failover includes database replica promotion, warm validator enablement, DNS switching, and quorum validation. Validator keys are pre-staged in the standby cluster.

### 10.4 Recovery Coordination

DALP includes durable, operator-governed recovery workflows for wallet-loss remediation with deterministic phase tracking: preview, durable recovery execution, credential reset, and per-token balance migration. Recovery workflows are idempotent and keyed by user ID to prevent duplicate concurrent recovery operations.

The recovery workflow handles local security reconciliation inline: session deletion, two-factor removal, passkey cleanup, wallet verification reset, and user credential rewrite all execute within a single database transaction before token recovery begins.

### 10.5 Backup and Restore

- Velero provides Kubernetes resource and persistent volume backup
- CloudNativePG manages PostgreSQL backup with WAL archival
- Object storage provides 99.999999999% durability (S3-class)
- Quarterly DR drills are recommended in the operational runbook
- Backup verification is part of the standard maintenance schedule

### 10.6 Durable Workflow Orchestration

All critical operations run as durable, deterministic workflows through Restate. Workflow phases are explicitly state-tracked with persisted status, enabling recovery from any interruption point. Configurable retry handling with exponential backoff (fast, standard, and long-running presets) ensures operations complete even through transient failures. Durable nonce coordination serializes local-signer nonce allocation per wallet-and-chain partition to prevent transaction conflicts.

---

## 11. Trust Boundaries

Three trust boundaries define the security perimeter:

1. **Platform boundary:** Between external users and systems and DALP's API surface. Controlled by authentication, session management, and rate limiting.
2. **Execution boundary:** Between the API layer and the Execution Engine. Controlled by authorization, input validation, and wallet verification.
3. **Chain boundary:** Between the Execution Engine and the blockchain. Controlled by on-chain compliance, custody provider policies, and MPC signing.

Each boundary operates independently. A compromised session token is blocked by wallet verification. A bypassed API authorization check is blocked by on-chain compliance. Custody provider policies provide the final gate before any transaction reaches the blockchain.
