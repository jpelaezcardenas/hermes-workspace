# Access Control and Permissions

## Executive Summary

Institutional tokenization demands governance infrastructure that most organizations underestimate until a regulatory audit or security incident exposes the gap. DALP's access-control model is designed for regulated institutions that need more than a login screen and a generic admin role. The platform combines organization-scoped tenancy, chain-authoritative role assignment, off-chain membership governance, step-up verification for sensitive actions, durable audit trails, custody-layer policy enforcement, and a comprehensive CLI administration surface into a single operating model.

At a practical level, DALP addresses eight institutional governance questions: who is this actor (via sessions, API keys, passkeys, and wallet-linked identity), which tenant do they belong to (via organization-scoped membership and tenant-scoped system resolution), what are they allowed to do (via off-chain platform roles, on-chain system roles, and token roles enforced at the route level), what extra verification is required for sensitive actions (via wallet verification factors with replay protection), how are digital signing keys protected (via Key Guardian with escalating storage tiers from encrypted database through HSM to MPC custody), how are duties separated (via 26 roles across four layers with maker-checker flows), how are organizations isolated (via tenant-scoped data access, membership-gated context switching, and organization-bound API keys), and can we prove what happened later (via event-sourced verification lifecycle, durable transaction history, on-chain events, and custody audit trails).

The architecture treats authorization as a runtime context-composition pipeline: authenticated request, then organization scope, then system context, then token context, then verification gates, then durable execution, then custody approval, then blockchain settlement. That matters because regulated digital-asset operations are full of actions that should not be performed by the wrong person, in the wrong tenant, with the wrong wallet, or without the right approval evidence.

---

## Authorization Architecture

### Dual-Layer Permission Model

DALP enforces authorization through a dual-layer model. Off-chain platform roles managed by Better Auth control API and console access, organization administration, invitation handling, and membership governance. On-chain roles in Solidity contracts govern blockchain operations, identity management, token lifecycle actions, and module-level authority. Every blockchain write operation requires both layers to pass.

This is a critical design choice. DALP does not maintain a separate off-chain permission database as the source of truth for blockchain authority. The on-chain `AccessManager` contract is the authoritative source for role assignments. Role events emitted on-chain are indexed, and the UI and API query indexed on-chain state rather than a manually maintained permissions table. Role changes are reflected in UI and API behavior immediately after indexing.

### Route-Level Access Guards

DALP enforces permissions at the route level through dedicated middleware that checks the caller's role before any business logic executes. Every API route declares its required permissions as part of the route definition. When a request arrives, middleware resolves the caller's identity, validates organization membership, queries on-chain role assignments, and compares resolved roles against declared permissions. An immediate rejection occurs if any required role is missing.

Route-level guards also enforce interface-aware constraints. If a route requires a token interface or extension that the asset does not implement, the request is rejected even if the caller otherwise holds a privileged role. This prevents operators from invoking incompatible actions on the wrong token class, an important safeguard in multi-asset platforms where bonds, funds, stablecoins, deposits, and other instrument types do not all support identical behaviors.

### Request-Time Permission Projection

When a user makes an authenticated request, DALP composes authorization in stages: session and identity resolution, organization membership validation (validated against actual membership, not client-declared context), on-chain role synchronization into organization membership context, system context hydration (tenant system address, bootstrap readiness, permission derivation from on-chain roles), token context hydration (metadata, interface support, mapped roles, trusted-issuer requirements), permission enforcement, wallet verification or step-up authentication for sensitive writes, and custody provider policy checks for custody-backed signing flows.

This is materially different from a generic CRUD SaaS permission model. Authorization depends on who you are, which tenant you are acting in, which system you are targeting, which token interfaces are present, which on-chain roles currently authorize that action, and whether you satisfy the required verification factors.

---

## Full RBAC Model: 26 Roles Across 4 Layers

DALP defines 26 distinct roles across four layers. This is not a vague admin/editor/viewer scheme. It is a formal role taxonomy covering off-chain membership, human system operators, per-asset administrators, and system modules.

### The Five Core Operational Roles

While DALP defines 26 roles in total, five roles form the operational backbone of most deployments:

| Role | Layer | Core Responsibility |
| --- | --- | --- |
| admin | Platform (Off-chain) | Full administrative access, role assignment, organization configuration, user management |
| systemManager | System People (On-chain) | Bootstrap system, manage upgrades, register factories/addons/modules, system-level governance |
| tokenManager | System People (On-chain) | Deploy and configure tokens, manage asset creation workflows |
| complianceManager | System People (On-chain) | Register compliance modules, configure global and per-token compliance settings, manage bypass rules |
| identityManager | System People (On-chain) | Register and recover identities, manage user onboarding to the blockchain layer |

Role provisioning in production environments is managed through the Security Governance Team, the organizational function responsible for reviewing role requests, approving assignments, conducting periodic access reviews, and revoking roles when personnel changes occur. DALP provides the technical enforcement; the governance team provides the human oversight layer.

### Role Taxonomy

| Layer | Scope | Count | Roles |
| --- | --- | --- | --- |
| 1. Platform | Off-chain (Better Auth) | 3 | owner, admin, member |
| 2. System People | On-chain | 9 | systemManager, identityManager, tokenManager, complianceManager, claimPolicyManager, organisationIdentityManager, claimIssuer, auditor, feedsManager |
| 3. Per-Asset | On-chain | 7 | admin, governance, supplyManagement, custodian, emergency, saleAdmin, fundsManager |
| 4. System Modules | On-chain | 7 | systemModule, identityRegistryModule, tokenFactoryRegistryModule, tokenFactoryModule, addonFactoryRegistryModule, addonFactoryModule, trustedIssuersMetaRegistryModule |

### Layer 1: Platform Roles

Platform roles are organization-scoped and managed by Better Auth. The owner role provides full administrative access and role assignment. The admin role governs user management and platform configuration. The member role enables standard operations based on assigned permissions. These roles govern access to off-chain platform surfaces, but they are necessary and not sufficient for blockchain writes.

### Layer 2: System People Roles

These roles are assigned to human operators and defined on-chain. The systemManager handles system bootstrap, upgrades, and factory/addon/module registration. The identityManager registers and recovers identities. The tokenManager deploys and configures tokens. The complianceManager registers compliance modules and configures global and per-token settings. The claimPolicyManager manages trusted issuers and claim topics. The organisationIdentityManager manages claims for the organization identity. The claimIssuer creates and attaches claims to identity contracts. The auditor has view-only access to permissions, identities, audit logs, and system state. The feedsManager registers, replaces, and removes feeds in the FeedsDirectory.

### Layer 3: Per-Asset Roles

These roles are scoped per token contract, which means authority is partitioned at the asset level. A user may be allowed to manage issuance for one token but have no authority over another.

The admin role grants and revokes all other per-asset roles. The governance role configures identity registry, compliance modules, features, and metadata. The supplyManagement role controls minting, burning, batch operations, and supply caps. The custodian role manages freeze/unfreeze, forced transfers, and wallet recovery. The emergency role controls pause/unpause and emergency token recovery. The saleAdmin role manages token sale configuration and lifecycle. The fundsManager role handles withdrawal of funds from token sales.

### Layer 4: System Module Roles

These roles are assigned to contract addresses rather than people, formalizing contract-to-contract authority. DALP does not assume every privileged action is human-operated. Some authority is delegated to sanctioned system modules under explicit role control.

### Bootstrap Role Invariants

Newly created assets do not emerge role-less. When a token is created, the creator automatically receives admin and governance roles. Operational guidance then requires granting supplyManagement for minting, granting emergency for unpausing, unpausing the token, adding collateral for stablecoins, and minting initial supply. This is a workflow-enforced control pattern.

---

## Platform Permissions vs Token Permissions

### System-Scoped Permissions

System-scoped permissions govern system bootstrapping and upgrades, identity registration and recovery, trusted issuer management, compliance module registration, addon factory operations, feeds directory management, external token registration, and global settings. Middleware derives these actions by mapping on-chain roles to a request-scoped permission object.

### Token-Scoped Permissions

Token-scoped permissions govern actions tied to a specific asset instance: minting and burning, pausing and unpausing, freezing and forced transfer, document management, claim revocation, compliance configuration, token sale operations, and yield and addon-specific operations. Token actions are computed from three sources: declared token permissions, mapped on-chain roles, and optional trusted-issuer topic requirements.

### Interface-Aware Authorization

Permissions are evaluated not only against the user but also against the asset interface. If a route requires a token interface or extension that the asset does not implement, the request is rejected regardless of the caller's privilege level. This prevents operators from invoking incompatible actions on the wrong token class.

### Trusted-Issuer-Aware Authorization

Some actions depend not only on role assignment but also on trusted-issuer status for particular claim topics. DALP joins token metadata, wallet identity, role state, and trusted-issuer topic authorization into one execution context. With the chain-of-trust architecture, trusted issuer resolution follows a hierarchical bottom-up pattern: token-level registries are checked first, then system-level, then global registries, with a maximum chain depth of three levels. This means different tokens can have different trusted issuer requirements while inheriting system and global defaults.

---

## Multi-Tenancy and Organization Isolation

### Organization as the Tenant Boundary

DALP's fundamental tenant boundary is the organization. An organization is the administrative container for users and memberships, invitations, active system context, platform settings, asset classes, external-token registry scope, and audit surfaces. The platform supports both single-tenant mode (creation blocked after the first organization) and multi-tenant mode (separate organizations with isolated data).

### Organization Setup and Slug Derivation

Organization creation follows a consistent, lightweight process. Administrators provide a display name, and the system auto-derives a URL-safe slug through kebab-case conversion. No manual slug entry is allowed, eliminating collision from inconsistent naming conventions. Organization list views combine relational database metadata with indexed on-chain asset counts, giving operators tenant-level visibility without breaking isolation boundaries.

### Tenant Isolation Model

Cross-tenant operations are not possible. Isolation is enforced through organization membership checks on every authenticated request, query-level scoping where all database queries filter by organization ID, organization-bound API keys that inherit scope from the creator, registry scoping for external token discovery, settings scoping for custom asset classes, and hybrid listing isolation. The organization ID scoping pattern is embedded in query construction throughout the data access layer, meaning even internal service-to-service calls respect tenant boundaries.

### Membership-Gated Active Organization Switching

DALP does not trust the client to set arbitrary organization context. When a user switches organizations, the platform verifies active membership before writing the active organization to session state. If membership has been revoked since the last session, the user falls back to their first available organization. This prevents client-side context spoofing through server-side membership enforcement.

### Invitation Model

The invitation model preserves tenant boundaries through a structured lifecycle. Re-invitation behavior is configurable: previous pending invitations can be automatically cancelled when a new invitation is sent. Membership limits per organization are enforced, preventing uncontrolled growth and supporting licensing models where tenant capacity is contractually capped. Separate organization-scoped and user-scoped invitation views maintain query isolation. Post-acceptance, DALP executes a deterministic sequence: state transition, organization data refresh, active organization setting, and on-chain identity registration in the organization's identity registry.

---

## Authentication Architecture

### Better Auth Foundation

DALP uses Better Auth as the foundation for identity and session management. Active authentication methods include email/password, passkeys (WebAuthn with Face ID, Touch ID, Windows Hello), and API keys. Enterprise SSO patterns (LDAP, OIDC, SAML) are available via the Better Auth plugin architecture and can be configured for enterprise deployments integrating with Okta, Auth0, or Azure AD.

### Two-Endpoint Authentication Architecture

DALP enforces a strict two-endpoint authentication model. The RPC endpoint (`/api/rpc`) accepts only session cookies for interactive web application use. The v2 REST endpoint (`/api/v2`) accepts API keys with HTTP-method-based scope enforcement. API keys are never usable on the RPC endpoint. This is a deliberate security boundary: the RPC endpoint carries session state and CSRF protections that do not apply to API key authentication.

API keys on the v2 endpoint enforce scope based on HTTP method: read-only keys are restricted to GET, HEAD, and OPTIONS; read-write keys can access all methods. This gives institutions a straightforward least-privilege model for service integrations.

The DALP SDK has been migrated from the proprietary RPC protocol to OpenAPI and the v2 REST surface, meaning all SDK operations flow through the documented REST surface with standard API key authentication.

### Session Properties

Browser-based sessions use HTTP-only cookies with secure-only transport, SameSite protection, 7-day expiry, 24-hour refresh window, and 10-minute cookie cache. Sessions bind to both user identity and active organization.

### API Key Properties

API keys use a prefixed format, are stored hashed in the database (cleartext shown only once at creation), support custom metadata including organization ID, and are rate-limited at 10,000 requests per 60-second window. Keys can be created, rotated, revoked, and optionally expired. Revocation is immediate with no grace period.

### Device Authentication for CLI

The CLI uses a browser-based device-code flow for authentication, ensuring CLI users benefit from whatever MFA and session controls are configured on the platform. After browser approval, the session is upgraded to a long-lived API key stored in the operating system's secure credential store.

---

## Wallet Verification, MFA, and Step-Up Security

### Why Wallet Verification Exists

DALP separates identity authentication from wallet verification. Session authentication proves who the user is. Wallet verification proves intent and control for blockchain write operations. This separation means a compromised session cookie alone cannot trigger minting, transfers, forced transfers, burns, or other state-changing blockchain actions.

### Supported Verification Methods

Three active wallet verification methods are supported: PINCODE (6-digit PIN set during wallet setup, fastest but weaker against shoulder-surfing), TOTP/OTP (time-based one-time password per RFC 6238, stronger but requires an authenticator device), and SECRET_CODES (one-time recovery codes, each usable exactly once). When a sensitive operation requires step-up authentication, the middleware accepts any configured factor.

### Replay Protection

Explicit replay protection operates on all verification factors. OTP codes are valid for a single verification window, with recently used codes tracked and rejected within their validity window. Secret codes are single-use, with consumed codes tracked and remaining count maintained. PINs are protected by progressive lockout on failed attempts. Replay protection is enforced at the middleware layer uniformly across all routes requiring wallet verification.

### API Key Sessions Bypass Interactive Verification

API key authentication intentionally bypasses wallet verification. API keys are scoped, rate-limited credentials designed for machine-to-machine flows where interactive second factors would make automation impractical.

---

## Key Management and Key Guardian

### Storage Hierarchy

Key Guardian manages cryptographic key material through defense-in-depth with multiple storage backends: encrypted database for development, cloud secret manager for standard production, HSM (FIPS 140-2 Level 3) for regulated financial services, and third-party MPC custody (DFNS/Fireblocks) for the highest security requirements. Application code never interacts with raw keys; it interacts with a signer abstraction.

### Key Lifecycle

The four lifecycle stages are generation (HSM-backed keys generate entirely within hardware; software keys use cryptographically secure random sources with immediate encryption), rotation (replaces active signing keys while maintaining historical keys for verification), recovery (sharded backups with threshold signature schemes requiring multiple custodians in enterprise deployments), and revocation (compromised keys are immediately removed from active use with smart contract permissions updated to reject signatures from revoked keys).

### Transaction Signing with Verification Gates

Every blockchain write operation flowing through the transaction signer is gated by the wallet verification layer. The signing flow requires identity authentication, role and organization scope validation, wallet verification factor presentation (for interactive sessions), and only then does the request reach the signer for cryptographic signing and blockchain submission.

---

## Audit Trails and Operational Evidence

### Event-Sourced Verification Lifecycle

DALP models its verification lifecycle using event-sourcing methodology, resulting in a state machine with well-defined transitions (Disabled, Enabled, Locked, Compromised) and audit events at every state change. Every transition records timestamp, actor, previous and new state, reason, and correlation ID. The state machine was designed with auditability as a structural property.

### Role-Gated Middleware Audit Trail

All mutations pass through role-gated middleware, generating audit events for every authorization decision: granted access, denied access, and escalation events. Because all mutations flow through this middleware with no bypass routes, the audit trail provides complete coverage of every write operation attempted against the platform.

### Transaction Lifecycle Audit Trail

DALP provides durable transaction lifecycle for blockchain writes through persistent state per workflow step, exactly-once execution semantics, state-transition history, dead-letter handling, and replay/resume capability. With timestamp-enriched indexing, all indexed events now carry both block-height references and calendar-time timestamps, simplifying integration with time-based compliance reporting systems.

### On-Chain Event Evidence

The chain indexer provides governance evidence from blockchain state: token creation and supply changes, identity registration and claims, role grants and revocations, forced transfers and freezes, settlement execution and lifecycle events, feed operations, and vault approvals. Because DALP treats the chain as authority for roles and compliance, these events are governance evidence, not just technical artifacts.

---

## Segregation of Duties and Maker-Checker Controls

### Role-Based Separation

DALP's role design supports separation of duties by partitioning key operational functions: identity operations vs token deployment vs compliance vs claims vs feeds at the system level, and governance vs supply management vs custody vs emergency at the token level. Sale administration is separated from sale fund withdrawal. The auditor role provides view-only access without conflating oversight with operational control.

### Dual-Layer Authorization

Segregation of duties comes from both distinct roles and dual-layer authorization. A user may be an organization admin but lack on-chain supplyManagement authority. An on-chain role alone does not bypass platform authentication and organization scoping.

### Custody-Layer Maker-Checker

Custody providers add another approval layer. DFNS supports multi-party approval workflows with programmatic resolution surfaced through DALP. Fireblocks enforces TAP rules and multi-approver requirements through its own controlled channels.

### Forced Transfer and Emergency Separation

The token role model separates the custodian role (freeze/unfreeze, forced transfer, recovery), emergency role (pause/unpause), and supplyManagement role (mint/burn). The person who can mint does not automatically gain forced-transfer authority.

### Transfer Approval Revocation

Transfer approvals can now be revoked by any authorized party, not only the original approver. Consumed one-time-use approvals are guarded against revocation attempts, preventing confusion in audit trails. This flexibility supports institutional workflows where supervisory override is needed to cancel pending transfer authorizations.

---

## Compliance V2 and Per-Token Compliance

The Compliance V2 architecture introduces per-token compliance engines alongside the existing system-level compliance. Each token can have its own compliance configuration with dedicated compliance module instances, while inheriting system-level defaults for modules not explicitly overridden at the token level.

The V2 module interface simplifies hook implementation for compliance module developers. A compatibility adapter wraps legacy V1 modules behind the V2 interface, enabling existing deployments to continue operating without modification. The module registry automatically detects V1 and V2 module versions and routes through the appropriate interface.

Per-token compliance engines are deployed through a dedicated factory and bound to the global compliance layer. The three-tier module lifecycle (add, remove, uninstall) provides granular control over which modules are active on each token, with clear state transitions that are auditable at every step.

This architecture matters for institutions managing multiple asset classes on a single DALP deployment. A sovereign bond may require different compliance rules than a real estate token or a fund unit, and each can be configured independently while sharing the same underlying compliance module implementations.

---

## Permission Granularity in Practice

### Resource-Level Permissions

Permissions apply at multiple resource scopes: organization, system, token, addon, feed, asset-class definition, external-token registry, and identity record.

### Action-Level Permissions

Routes enforce action-specific authority with verified splits between list/read and create/update/delete operations across all resource types.

### Capability-Level Gating

DALP's permission system operates at the resource, action, and capability/interface level rather than arbitrary field-level ACLs. Interface-aware middleware blocks unsupported operations, route contracts expose only allowed actions in context, and the UI derives renderable features from indexed on-chain role state. If a role is removed on-chain, the UI stops rendering the relevant action surfaces.

---

## Institutional Summary

DALP's access-control posture provides layered authentication (sessions, API keys with hard endpoint separation, passkeys, MFA, CLI device auth), real organization-scoped tenancy with request-time enforcement, 26 clearly partitioned on-chain roles as the authoritative source for blockchain authority, route-level middleware enforcement before business logic executes, wallet verification separating login from transaction intent with replay protection, event-sourced verification lifecycle with full audit coverage, complete authorization audit trail through role-gated middleware, Key Guardian with defense-in-depth key management, custody integrations as a second control plane, CLI with 26 command groups and 301 commands for operational administration, and meaningful segregation of duties. The platform makes the risky parts of digital-asset operations governable, tenant-scoped, role-bound, and provable.
