# Access Control and Permissions

## Executive Summary

Production-grade tokenization requires more than token logic — it demands the governance infrastructure that most institutions underestimate. DALP's access-control model is designed for regulated institutions that need more than a login screen and a generic admin role. The platform combines **organization-scoped tenancy**, **chain-authoritative role assignment**, **off-chain membership governance**, **step-up verification for sensitive actions**, **durable audit trails**, **custody-layer policy enforcement**, and a **comprehensive CLI administration surface** into one operating model.

At a practical level, DALP answers eight institutional questions:

1. **Who is this actor?** — via Better Auth sessions, API keys, passkeys, invitation-based onboarding, and wallet-linked identity.
2. **Which tenant do they belong to?** — via organization-scoped membership, active-organization context, and tenant-scoped system resolution.
3. **What are they allowed to do?** — via off-chain platform roles, on-chain system roles, token roles, and route-level permission middleware.
4. **What extra verification is required for sensitive actions?** — via wallet verification factors (PINCODE, TOTP/OTP, backup/secret codes), passkey enrollment support, and confirmation-gated destructive flows with replay protection.
5. **How are digital signing keys protected?** — via Key Guardian storage tiers, HSM integration, MPC custody backends, and provider-abstracted signing.
6. **How are duties separated?** — via role partitioning across 26 roles, maker-checker flows, custody approval rules, and dual-layer authorization.
7. **How are organizations isolated?** — via Better Auth organizations, tenant-scoped system resolution, organization-bound API keys, hybrid relational-plus-subgraph listing, and query-level isolation.
8. **Can we prove what happened later?** — via event-storming-modeled verification lifecycle, durable transaction history, on-chain events, custody audit trails, session and verification logs, and indexed operational read models.

The architecture is opinionated. DALP does not treat authorization as a flat role table. It treats it as a **runtime context-composition pipeline**:

**authenticated request → organization scope → system context → token context → verification gates → durable execution → custody approval → blockchain settlement**

That matters because regulated digital-asset operations are full of actions that should not be performed by the wrong person, in the wrong tenant, with the wrong wallet, or without the right approval evidence.

---

## 1. Authorization Architecture

### 1.1 Dual-Layer Permission Model

DALP enforces authorization through a **dual-layer model**:

- **Off-chain platform roles** managed by Better Auth control API and console access, organization administration, invitation handling, and membership governance.
- **On-chain roles** in Solidity contracts govern blockchain operations, identity management, token lifecycle actions, and module-level authority.

Every blockchain write operation requires both layers to pass:

1. The caller must be authenticated and belong to the active organization.
2. The caller must have the relevant off-chain platform permission to reach the route surface.
3. The caller must hold the appropriate on-chain role on the system or token contract.
4. If the action is sensitive, the caller must pass wallet verification or custody approval.

Missing either layer results in denial.

This is a critical design choice. DALP does not maintain a separate off-chain permission database as the source of truth for blockchain authority. The **on-chain `AccessManager` contract is the authoritative source for role assignments**.

### 1.2 Chain as Source of Truth

DALP's authorization docs make one architectural invariant explicit: **the chain is the source of truth**.

The authority chain works as follows:

1. Role assignments are made directly on-chain via the `AccessManager` contract.
2. Role events (`RoleGranted`, `RoleRevoked`) are emitted and indexed by the chain indexer / subgraph.
3. The UI and API query indexed on-chain state — not a separate manually maintained permissions table.
4. Role changes are reflected in UI and API behavior immediately after indexing.
5. If a role is revoked on-chain, the UI hides or disables corresponding operations without any manual synchronization process.

That means DALP is not pretending the chain is only an execution target. For authorization, the chain is the authority layer.

### 1.3 Route-Level Access Guards

DALP enforces permissions at the route level through dedicated middleware that checks the caller's role before any business logic executes. Every API route — whether exposed via the RPC endpoint or the REST v2 surface — declares its required permissions as part of the route definition. When a request arrives, middleware intercepts it and:

1. Resolves the caller's identity from the session or API key.
2. Validates organization membership for the active tenant.
3. Queries the caller's on-chain role assignments against the target system or token contract.
4. Compares the resolved roles against the permissions declared on the route.
5. Returns an immediate rejection if any required role is missing.

This pattern means that authorization is not scattered across individual handler functions. It is centralized in middleware and enforced uniformly. Adding a new route requires declaring its permission surface; the middleware does the rest. Removing a role from a user on-chain causes all routes gated by that role to become inaccessible in real time — there is no propagation delay beyond indexer latency.

Route-level guards also enforce interface-aware constraints. If a route requires a token interface or extension that the asset does not implement, DALP rejects the request with `TOKEN_INTERFACE_NOT_SUPPORTED` even if the caller otherwise has a privileged role. This prevents operators from invoking incompatible actions on the wrong token class — an important safeguard in multi-asset platforms where bonds, funds, stablecoins, deposits, and other instrument types do not all support identical behaviors.

### 1.4 Request-Time Permission Projection

When a user makes an authenticated request, DALP composes authorization in stages:

1. **Session and identity resolution** — browser session or API key is resolved into a user context.
2. **Organization membership validation** — the active organization is validated against actual membership, not client-declared context.
3. **Role synchronization** — on-chain role state is synchronized into organization membership context at request time.
4. **System context hydration** — DALP resolves the active tenant system address, checks bootstrap readiness, and derives system actions from on-chain roles.
5. **Token context hydration** (for token-scoped actions) — DALP resolves token metadata, interface support, mapped token roles, and optional trusted-issuer requirements.
6. **Permission enforcement** — middleware rejects unsupported interfaces, missing roles, or out-of-scope actions before business logic runs.
7. **Wallet verification / step-up auth** — sensitive writes require PINCODE, TOTP/OTP, or secret/backup codes unless authenticated via API key.
8. **Custody provider policy checks** — for custody-backed signing flows, DFNS or Fireblocks policies may impose additional approval gates.

This is materially different from a generic CRUD SaaS permission model. DALP authorization depends on **who you are, which tenant you are acting in, which system you are targeting, which token interfaces are present, which on-chain roles currently authorize that action, and whether you satisfy the required verification factors**.

---

## 2. Full RBAC Model — 26 Roles Across 4 Layers

DALP defines **26 distinct roles** across four layers, excluding one deprecated legacy role. This is not a vague "admin / editor / viewer" scheme. It is a formal role taxonomy covering off-chain membership, human system operators, per-asset administrators, and system modules.

### 2.1 The Five Core Operational Roles

While DALP defines 26 roles in total, five roles form the operational backbone of most deployments:

| Role | Layer | Core Responsibility |
|------|-------|---------------------|
| **admin** | Platform (Off-chain) | Full administrative access, role assignment, organization configuration, user management |
| **systemManager** | System People (On-chain) | Bootstrap system, manage upgrades, register factories/addons/modules, system-level governance |
| **tokenManager** | System People (On-chain) | Deploy and configure tokens, manage asset creation workflows |
| **complianceManager** | System People (On-chain) | Register compliance modules, configure global compliance settings, manage bypass rules |
| **identityManager** | System People (On-chain) | Register and recover identities, manage user onboarding to the blockchain layer |

These five roles cover the critical operational surface: platform administration, system lifecycle, asset creation, compliance configuration, and identity management. Additional roles provide finer-grained separation for specialized functions.

Role provisioning in production environments is managed through the **Security Governance Team** — the organizational function responsible for reviewing role requests, approving assignments, conducting periodic access reviews, and revoking roles when personnel changes occur. DALP provides the technical enforcement; the Security Governance Team provides the human governance layer that determines who should hold which roles and when those assignments should be reviewed or revoked.

### 2.2 Role Taxonomy Summary

| Layer | Scope | Count | Roles |
|-------|-------|-------|-------|
| **1. Platform** | Off-chain (Better Auth) | 3 | `owner`, `admin`, `member` |
| **2. System People** | On-chain (`DALPPeopleRoles.sol`) | 9 | `systemManager`, `identityManager`, `tokenManager`, `complianceManager`, `claimPolicyManager`, `organisationIdentityManager`, `claimIssuer`, `auditor`, `feedsManager` |
| **3. Per-Asset** | On-chain (`DALPAssetRoles.sol`) | 7 | `admin`, `governance`, `supplyManagement`, `custodian`, `emergency`, `saleAdmin`, `fundsManager` |
| **4. System Modules** | On-chain (`DALPSystemRoles.sol`) | 7 | `systemModule`, `identityRegistryModule`, `tokenFactoryRegistryModule`, `tokenFactoryModule`, `addonFactoryRegistryModule`, `addonFactoryModule`, `trustedIssuersMetaRegistryModule` |

> Note: `addonManager` from v1 still exists in `DALPPeopleRoles.sol` for backward compatibility but is explicitly deprecated and excluded from the 26-role count.

### 2.3 Layer 1 — Platform Roles

These roles are organization-scoped and managed by Better Auth.

| Role | Capabilities |
|------|-------------|
| **owner** | Full administrative access, role assignment, organization configuration |
| **admin** | User management, platform configuration, organization administration |
| **member** | Standard operations based on assigned permissions |

These roles govern access to off-chain platform surfaces: organizations, invitations, admin pages, profile settings, and membership-scoped features. They are necessary but not sufficient for blockchain writes.

### 2.4 Layer 2 — System People Roles

These roles are assigned to human operators and defined in `DALPPeopleRoles.sol`.

| Role | Responsibilities |
|------|------------------|
| **systemManager** | Bootstrap system, manage upgrades, register factories/addons/modules |
| **identityManager** | Register and recover identities, manage user onboarding |
| **tokenManager** | Deploy and configure tokens |
| **complianceManager** | Register compliance modules, configure global settings, manage bypass |
| **claimPolicyManager** | Manage trusted issuers and claim topics |
| **organisationIdentityManager** | Manage claims for the organisation identity |
| **claimIssuer** | Create and attach claims to identity contracts |
| **auditor** | View-only access to permissions, identities, audit logs, system state |
| **feedsManager** | Register, replace, and remove feeds in the FeedsDirectory |

These are the core operational roles for regulated digital-asset administration.

### 2.5 Layer 3 — Per-Asset Roles

These roles are scoped per token contract and defined in `DALPAssetRoles.sol`.

| Role | Responsibilities |
|------|------------------|
| **admin** (`DEFAULT_ADMIN_ROLE`) | Grant and revoke all other per-asset roles |
| **governance** | Configure identity registry, compliance modules, features, metadata |
| **supplyManagement** | Mint, burn, batch operations, set supply cap |
| **custodian** | Freeze/unfreeze, forced transfers, wallet recovery |
| **emergency** | Pause/unpause operations, recover stuck ERC20 tokens |
| **saleAdmin** | Manage token sale configuration and lifecycle |
| **fundsManager** | Withdraw funds from token sales |

These roles are crucial because they partition operational duties at the asset level. A user may be allowed to manage issuance for one token but have no authority over another.

### 2.6 Layer 4 — System Module Roles

These roles are assigned to contract addresses rather than people.

| Role | Responsibilities |
|------|------------------|
| **systemModule** | Manage system modules, register compliance modules |
| **identityRegistryModule** | Modify identity registry storage |
| **tokenFactoryRegistryModule** | `roleAdmin` of `tokenFactoryModule` |
| **tokenFactoryModule** | Add token contracts to compliance allow list |
| **addonFactoryRegistryModule** | `roleAdmin` of `addonFactoryModule` |
| **addonFactoryModule** | Add addon instance contracts to compliance allow list |
| **trustedIssuersMetaRegistryModule** | Add trusted issuers to the registry |

These roles formalize contract-to-contract authority. DALP does not assume every privileged action is human-operated. Some authority is delegated to sanctioned system modules under explicit role control.

### 2.7 Per-Asset Permission Matrix

DALP also documents a summarized permission matrix at the asset level:

| Action | Required Role | Notes |
|--------|---------------|-------|
| Set OnchainID / identity registry / compliance | `governance` | All asset types |
| Set features / metadata | `governance` | DALPAsset only |
| Set yield schedule / mature bond | `governance` | Bond only |
| Mint / burn / batch operations | `supplyManagement` | RealEstate and PreciousMetal: no burn |
| Set supply cap | `supplyManagement` | Bond and RealEstate only |
| Freeze / forced transfer / recovery | `custodian` | All asset types |
| Pause / unpause / recover ERC20 | `emergency` | All asset types |
| Configure / manage token sale | `saleAdmin` | Assets with sale addon |
| Withdraw sale funds | `fundsManager` | Assets with sale addon |

That matrix matters because DALP is not using one oversized "asset admin" role. Authority is separated by function.

### 2.8 Bootstrap Role Invariants

DALP's token lifecycle docs reveal an important governance invariant: newly created assets do not emerge role-less.

When a token is created, the creator automatically receives:
- **`admin`** — allows granting other roles on this token
- **`governance`** — allows configuring compliance modules and token parameters

Operational guidance then requires:
1. Grant `supplyManagement` role for minting
2. Grant `emergency` role for unpausing
3. Unpause the token
4. Add collateral for stablecoins
5. Mint initial supply

This is a workflow-enforced control pattern, not just a UI convention.

---

## 3. Platform Permissions vs Token Permissions

### 3.1 System-Scoped Permissions

System-scoped permissions govern actions such as:
- system bootstrapping and upgrades
- identity registration and recovery
- trusted issuer management
- compliance module registration
- addon factory operations
- feeds directory management
- external token registration
- global settings and administrative operations

Middleware derives these actions in `systemMiddleware` by mapping on-chain roles to a request-scoped `userPermissions.actions` object.

### 3.2 Token-Scoped Permissions

Token-scoped permissions govern actions tied to a specific asset instance:
- minting and burning
- pausing and unpausing
- freezing and forced transfer
- document upload/delete
- claim revocation
- compliance configuration
- token sale setup and fund withdrawal
- yield and addon-specific operations

DALP computes token actions from three sources:
1. `TOKEN_PERMISSIONS`
2. mapped on-chain roles
3. optional trusted-issuer topic requirements

This enriched token context is then validated through `tokenPermissionMiddleware(...)`.

### 3.3 Interface-Aware Authorization

One of DALP's stronger access-control properties is that permissions are not evaluated only against the user. They are also evaluated against the **asset interface**.

If a route requires a token interface or extension that the asset does not implement, DALP rejects the request with `TOKEN_INTERFACE_NOT_SUPPORTED` even if the caller otherwise has a privileged role.

That prevents operators from invoking incompatible actions on the wrong token class — an important safeguard in multi-asset platforms where bonds, funds, stablecoins, deposits, and other instrument types do not all support identical behaviors.

### 3.4 Trusted-Issuer-Aware Authorization

Some actions depend not only on role assignment but also on trusted-issuer status for particular claim topics. DALP joins token metadata, wallet identity, role state, and trusted-issuer topic authorization into one execution context. That is more sophisticated than generic RBAC and matters for claims issuance, compliance proofs, and regulated attestation workflows.

---

## 4. Multi-Tenancy and Organization Isolation

### 4.1 Organization as the Tenant Boundary

DALP's fundamental tenant boundary is the **organization**, implemented through Better Auth's organization system.

An organization is the administrative container for:
- users and memberships
- invitations
- active system context
- platform settings
- asset classes and templates
- external-token registry scope
- organization-level audit and admin surfaces

DALP supports both:
- **Single-tenant mode** — all users in one organization; creation blocked after the first exists
- **Multi-tenant mode** — separate organizations with isolated membership, roles, assets, compliance records, and audit trails

### 4.2 Organization Setup and Slug Derivation

Organization creation is intentionally lightweight and consistent:

- Admin-only access to the organizations page
- Name-only creation flow — the operator provides a display name
- **Slug auto-derived** via `getOrganizationSlug()`: the system converts the display name to lowercase, collapses all non-alphanumeric characters to hyphens (kebab-case), and trims leading/trailing hyphens
- The derived slug becomes the URL-safe, machine-readable identifier for the organization
- No manual slug entry — this eliminates slug collision caused by inconsistent manual naming conventions

Example: an organization named "Acme Capital Markets" receives the slug `acme-capital-markets` automatically. This convention is enforced at the platform level, not left to operator preference, ensuring consistency across multi-tenant deployments.

Organization list views combine **relational DB metadata with indexed on-chain asset counts** — a hybrid listing approach that gives operators tenant-level visibility. The relational database provides fast metadata queries (name, slug, creation date, member count), while TheGraph subgraph integration surfaces on-chain data (deployed assets, total transaction volume, identity count) without breaking isolation boundaries. This hybrid approach avoids the latency and cost of querying the blockchain for every organization-list render while still providing real-time on-chain state where it matters.

### 4.3 Tenant Isolation Model — Organization-Scoped Data

The authorization docs state the boundary plainly: **cross-tenant operations are not possible**.

Isolation is enforced at several levels:

- **Organization membership checks** for every authenticated request
- **Query-level scoping**: all database queries are scoped to `organizationId` — there is no code path that returns data across organization boundaries without explicit administrative override
- **Tenant-scoped system resolution** through active organization context
- **Organization-bound API keys** — keys inherit permissions and org scope from the creator
- **Registry scoping** — external-token discovery hard-filters to the tenant's `externalTokenRegistry.id`
- **Settings scoping** — custom asset classes and other operator-managed records filter by `organizationId`
- **Hybrid listing isolation** — relational DB metadata queries and TheGraph subgraph queries both respect organization boundaries

The `organizationId` scoping pattern is pervasive. It is not a filter applied at the API layer that could be bypassed by direct database access. It is embedded in query construction throughout the data access layer, meaning that even internal service-to-service calls respect tenant boundaries.

### 4.4 Membership-Gated Active Organization Switching

DALP does not trust the client to set arbitrary organization context. Active-organization persistence is membership-gated.

When a user switches organizations, the platform performs a membership verification before writing the `lastActiveOrganizationId`:

1. The client requests a switch to organization X.
2. DALP queries the membership table to confirm the user holds active membership in organization X.
3. Only after membership verification succeeds does DALP write `lastActiveOrganizationId = X` to the user's session state.
4. If verification fails, the switch is rejected — the user remains in their current organization context.

This prevents client-side context spoofing and is an example of tenancy control enforced in the auth layer itself. Even if a client-side application were compromised to send arbitrary organization IDs, the server-side membership check would reject unauthorized switches.

On subsequent session restoration (login, page refresh, API key resolution), `lastActiveOrganizationId` is loaded — but only if the user still holds membership in that organization. If membership has been revoked since the last session, the user falls back to their first available organization or is presented with an organization-selection flow.

### 4.5 Invitation Model and Tenant Boundary Enforcement

Participant invitation handling preserves tenant boundaries through a complete lifecycle:

**Invitation Lifecycle**: Invitations follow a structured progression: **send → accept/reject**, with clear state transitions at each stage. When an invitation is sent, it creates a pending record scoped to the target organization.

**Re-Invitation Behavior**: The `cancelPendingInvitationsOnReInvite` flag controls what happens when an administrator sends a second invitation to the same email address. When enabled, the previous pending invitation is automatically cancelled before the new one is created — preventing confusion from multiple outstanding invitations and ensuring only the most recent invitation link is valid.

**Membership Limits**: Better Auth's organization plugin enforces configurable membership limits per organization. When the limit is reached, new invitation sends are blocked until existing members are removed or the limit is raised. This prevents uncontrolled growth and supports licensing models where tenant capacity is contractually capped.

**Separate Invitation Views**: DALP maintains two distinct invitation perspectives:
- **Organization-scoped view**: Administrators see all pending, accepted, and rejected invitations for their organization — used for managing onboarding pipelines.
- **User-scoped view**: Individual users see invitations addressed to them across all organizations — used for the personal invitation inbox where users accept or decline.

These views are query-isolated. Organization administrators cannot see invitations from other organizations, and users cannot see invitations addressed to other users.

**Post-Acceptance Flow**: When a user accepts an invitation, DALP executes a deterministic sequence:
1. The invitation state transitions to `accepted`.
2. The organization data is refetched to include the new member.
3. The user's active organization is set to the accepting organization via `setActive`.
4. The user's on-chain identity is registered in the organization's identity registry if not already present.

This ensures that invitation acceptance is not just a database flag change. It is a full onboarding event that establishes the user's tenant context and blockchain identity in a single flow.

**Link Validation**: Malformed invitation links render an invalid-link state rather than falling through to permissive flows. Password-reset and email-verification links normalize malformed token parameters instead of creating router inconsistencies.

### 4.6 Tenant-Scoped System Resolution

After authentication, DALP resolves a tenant-specific system context:
- active system address from DALP settings
- bootstrap readiness validation (`SYSTEM_NOT_CREATED` if absent)
- user permission projection from mapped on-chain roles
- user identity metadata such as registered status and country
- request-scoped caching keyed by `sessionId:systemAddress:userAddress`

DALP exposes both strict and optional system middleware variants so pre-bootstrap onboarding flows can proceed without incorrectly asserting that a tenant system already exists.

### 4.7 Cross-Org Visibility Rules

The intended rule is simple: **what belongs to one organization stays in that organization** unless a global system-level component explicitly governs it.

Examples:
- custom asset class definitions are organization-specific
- external token list queries are registry-scoped to the organization
- user statistics derive from organization membership data
- API keys require `organizationId` metadata to authenticate against system endpoints
- users created via admin flows belong to the admin's organization by default

This gives DALP a clear enterprise posture: one deployment can host multiple organizations, but they do not see or operate each other's data by default.

### 4.8 Limits and Honest Boundaries

DALP's tenancy model is strong, but not magical. Documented or implied boundaries include:
- no built-in cross-tenant governance arbitration
- no cross-organization asset-class inheritance or sharing
- no claim that every analytics view is yet protected by native row-level security in all migration stages
- some read paths remain in transition from subgraph-backed to PostgreSQL-backed models

The right claim is: DALP clearly implements organization-scoped tenancy and request-time tenant isolation, while some deeper analytics-enforcement details remain under active evolution.

---

## 5. Authentication Architecture

### 5.1 Better Auth Foundation

DALP uses **Better Auth** as the foundation for identity and session management.

Documented installed plugins include:
- `passkey`
- `admin`
- `apiKey`
- `walletPincode`
- `walletTwoFactor`
- `walletSecretCodes`
- `twoFactor`
- `customSession`
- `organization`
- `openAPI`

Supported authentication methods and status:

| Method | Use Case | Status |
|--------|----------|--------|
| Email / password | Standard operator and user access | **Active** |
| Passkeys (WebAuthn) | Hardware keys, Face ID, Touch ID, Windows Hello | **Active** |
| LDAP / Active Directory | Corporate directory integration | Available via plugin |
| OAuth 2.0 / OIDC | Okta, Auth0, Azure AD integration | Available via plugin |
| SAML 2.0 | Legacy enterprise SSO | Available via plugin |

Important distinction: LDAP, OIDC, and SAML are **supported through installable Better Auth plugins**, but they are **not active by default**. Enabling them is not a config toggle alone — the corresponding plugin must be added to auth configuration.

### 5.2 Two-Endpoint Authentication Architecture

DALP enforces a strict **two-endpoint authentication model** that separates interactive and programmatic access:

**`/api/rpc` — Session/Cookie Authentication Only**

The RPC endpoint serves the interactive web application. It accepts only session cookies issued by Better Auth during browser-based login flows. This endpoint powers the DALP console UI and handles all interactive operations.

**`/api/v2` — API Key Authentication**

The v2 REST endpoint serves programmatic integrations, SDK consumers, and CLI operations. It accepts API keys passed via request headers and applies HTTP-method-based scope enforcement.

**The Hard Boundary**: API keys are **NEVER** usable on the RPC endpoint. Any attempt to authenticate to `/api/rpc` with an API key receives a hard `FORBIDDEN` response — not a soft redirect, not a helpful error message suggesting the correct endpoint, but an explicit rejection. This is a deliberate security boundary.

The rationale: the RPC endpoint carries session state, CSRF protections, and interactive verification flows that do not apply to API key authentication. Allowing API keys on the RPC surface would bypass interactive security controls. Conversely, session cookies are not accepted on the v2 endpoint, ensuring that programmatic integrations cannot piggyback on browser sessions.

**HTTP-Method-Based Scope Enforcement on v2**:

API keys on the v2 endpoint enforce scope based on the HTTP method of the request:

| Scope | Allowed Methods | Use Case |
|-------|----------------|----------|
| **Read-only** | `GET`, `HEAD`, `OPTIONS` | Monitoring, reporting, data synchronization, analytics |
| **Read-write** | All methods including `POST`, `PUT`, `PATCH`, `DELETE` | Full operational access for automation, SDK operations, CI/CD pipelines |

This gives institutions a straightforward least-privilege model: monitoring and reporting integrations receive read-only keys, while operational automation receives read-write keys. The scope is enforced at the middleware layer — a read-only key that sends a `POST` request receives an immediate rejection regardless of the endpoint's business logic.

**DALP SDK Migration**: The DALP SDK has been migrated from the proprietary RPC protocol to **OpenAPI + /api/v2**, meaning that all SDK operations now flow through the documented REST surface with standard API key authentication. This migration eliminated the need for SDK consumers to manage session cookies or understand the RPC protocol, simplifying integration patterns and making the SDK compatible with standard HTTP client libraries.

### 5.3 Session Authentication

Browser-based clients authenticate using HTTP-only session cookies managed by Better Auth.

Session properties:
- **HTTP-only cookies** — inaccessible to client-side JavaScript
- **Secure flag** — cookies transmit only over HTTPS
- **SameSite attribute** — protects against CSRF
- **Expiration** — 7 days
- **Refresh window** — 24 hours
- **Cookie cache** — 10-minute max age to reduce database lookups
- **Session binding** — session binds to both user identity and active organization

Every authentication event is logged with timestamp, method, and result.

### 5.4 Passkey Authentication

Passkeys provide passwordless authentication using WebAuthn.

Benefits:
- phishing resistance
- no shared secrets stored server-side
- biometric or device-PIN verification on supported devices
- hardware-bound credentials

Passkeys are active as an authentication method at the Better Auth layer.

### 5.5 API Key Authentication

Machine-to-machine integrations authenticate with API keys.

| Aspect | Implementation |
|--------|----------------|
| Format | `sm_atk_` / `sm_dalp_` prefix + random suffix |
| Storage | Hashed in database; cleartext shown once at creation |
| Metadata | Custom key-value pairs including `organizationId` |
| Scoping | Per-key permissions limit access to procedure namespaces |
| Rate limit | 10,000 requests per 60-second window per key |
| Lifecycle | Create, rotate, revoke, optional expiration |

API keys inherit permissions from the creating user's role and are scoped to a single organization. If a user belongs to multiple organizations, separate keys should be created for each one.

### 5.6 Device Authentication for CLI

The DALP CLI uses a browser-based device authentication flow designed to bring the same security guarantees of interactive login to command-line environments:

1. **Device code request** — the CLI requests a device authorization code from the platform.
2. **Browser-based approval** — the user opens a browser URL and approves the device session with their existing authenticated session.
3. **Token exchange** — the CLI exchanges the approved device code for an authentication token.
4. **API key upgrade** — the token is upgraded to a long-lived API key for persistent CLI access.
5. **Secure credential storage** — the API key is stored securely based on the operating system:
   - **macOS (Darwin)**: Stored in the macOS Keychain, leveraging the operating system's hardware-backed credential protection
   - **Other platforms**: Stored in a local configuration file with appropriate file permissions

This creates a practical operational auth path for administrators without encouraging password sharing or manually managed long-lived static tokens. The browser-based approval step ensures that CLI authentication benefits from whatever MFA and session controls are configured on the platform — a CLI user cannot bypass passkey requirements or TOTP enforcement.

### 5.7 SSO, OIDC, and SAML Positioning

DALP does support enterprise SSO patterns, but the correct framing is important:
- OIDC, SAML, and LDAP/Active Directory are **available via Better Auth plugin architecture**
- they are **not enabled by default in every deployment**
- enabling them requires implementation/configuration work, not just checking a box

That is still valuable. It means DALP is architecturally compatible with enterprise IAM ecosystems such as Okta, Auth0, and Azure AD, but deployments should present these as configurable integration options, not blanket "always on" defaults.

---

## 6. Wallet Verification, MFA, and Step-Up Security

### 6.1 Why Wallet Verification Exists

DALP separates **identity authentication** from **wallet verification**.

- Session authentication proves who the user is.
- Wallet verification proves intent and control for blockchain write operations.

This separation means a compromised session cookie alone cannot trigger minting, transfers, forced transfers, burns, or other state-changing blockchain actions.

### 6.2 Supported Verification Methods

DALP supports three active wallet verification methods, each implemented as a distinct Better Auth plugin:

| Method | Plugin | Description | Trade-Off |
|--------|--------|-------------|-----------|
| **PINCODE** | `walletPincode` | 6-digit PIN set during wallet setup | Fastest; weaker against shoulder-surfing than TOTP |
| **TOTP / OTP** | `walletTwoFactor` | Time-based one-time password per RFC 6238 | Stronger; requires authenticator device |
| **SECRET_CODES** | `walletSecretCodes` | One-time recovery codes generated during setup | Recovery mechanism; limited supply; each code usable exactly once |

All three methods are registered as verification factors in DALP's wallet verification middleware. When a sensitive operation requires step-up authentication, the middleware accepts any of the configured factors — the choice of factor is the user's, but at least one must be presented.

### 6.3 Replay Protection

DALP implements explicit replay protection on verification factors:

- **OTP codes**: Each TOTP code is valid for a single verification window. The platform tracks recently used OTP codes and rejects any code that has already been consumed within its validity window. This prevents an attacker who observes a TOTP code from replaying it within the same 30-second window.
- **Secret codes**: Each backup/secret code is single-use. Once consumed, the code is marked as used in the database and cannot be presented again. The platform tracks which codes in the set have been consumed and how many remain available.
- **PINCODE**: PINs are not time-limited but are protected by progressive lockout on failed attempts.

Replay protection is enforced at the middleware layer, meaning it applies uniformly to all routes that require wallet verification — not just specific high-risk operations.

### 6.4 Passkey-Based Verification

DALP's security docs describe passkey-based wallet verification as a supported concept through WebAuthn challenge-response. However, the actual middleware capability mapping shows an important runtime constraint:

- **PASSKEY requests are currently hard-rejected in wallet-verification middleware**
- passkeys exist in the auth layer and schema support
- passkey-based step-up verification for sensitive write authorization is **not yet a fully active runtime factor**

That distinction matters in proposal language. DALP supports passkey login. Passkey-based wallet verification is not yet the primary active step-up mechanism.

### 6.5 API Key Sessions Bypass Interactive Verification

When a request is authenticated via API key, wallet verification is not required. This is intentional. API keys are scoped, rate-limited credentials designed for machine-to-machine flows. Requiring an interactive second factor would make automation impractical.

### 6.6 Rate Limiting and Lockout

Security controls around verification include:
- progressive lockout on failed verification attempts
- audit logging for every verification attempt, success or failure
- no administrative "skip wallet verification" bypass
- recovery only through backup codes or credential re-enrollment

### 6.7 MFA Support

Beyond wallet verification, DALP supports:
- email/password auth
- TOTP-based two-factor auth
- passkey login
- backup recovery flows

This gives institutions multiple MFA patterns for both account access and transaction-level security.

### 6.8 IP Whitelisting

The DALP docs reviewed do not expose a platform-wide, first-class documented IP-whitelisting feature as a general UI/API control surface. However, DFNS policy engine supports IP and time restrictions at the custody-policy level.

So the honest position is:
- **custody-layer IP restrictions are supported through DFNS policy controls**
- **a generalized DALP-native platform IP whitelist feature is not explicitly verified in the reviewed docs**

---

## 7. Key Management and Key Guardian

### 7.1 What Key Guardian Is

DALP documents **Key Guardian** as the service responsible for secure private key storage and signing orchestration.

Key Guardian protects private keys controlling digital assets through defense-in-depth with multiple storage backends at escalating security levels. The Guardian API receives signature requests without exposing raw key material. Storage routers direct requests to appropriate backends based on key metadata.

### 7.2 Storage Hierarchy

| Storage Tier | Protection Level | Use Case |
|-------------|------------------|----------|
| Encrypted database | Application-level encryption | Development, low-value assets |
| Cloud secret manager | Platform-managed encryption | Standard production deployments |
| Hardware security module | FIPS 140-2 Level 3 | Regulated financial services |
| Third-party custody | Delegated institutional custody | Highest security requirements |

The progression is deliberate: not every deployment needs HSM or MPC custody, but DALP supports escalation to those levels where regulatory or institutional policy requires them.

### 7.3 Security Architecture

Key Guardian sits behind the Transaction Signer. Signature requests flow:

**Transaction Signer → Key Guardian API → Storage Router → Backend (DB / Secret Manager / HSM / DFNS / Fireblocks)**

That means application code never interacts with raw keys. It interacts with a signer abstraction.

### 7.4 Key Lifecycle

DALP documents four key lifecycle stages:

- **Generation** — HSM-backed keys generate entirely within hardware. Software keys use cryptographically secure random sources with immediate encryption before memory clearing.
- **Rotation** — replaces active signing keys while maintaining historical keys for verification. Coordinates with blockchain address updates and registry notifications.
- **Recovery** — enterprise deployments use sharded backups with threshold signature schemes requiring multiple custodians.
- **Revocation** — compromised keys are immediately removed from active use. Smart contract permissions update to reject signatures from revoked keys.

### 7.5 API Key Lifecycle Management

Separate from cryptographic key management, DALP provides a complete API key lifecycle:

| Stage | Operation | Description |
|-------|-----------|-------------|
| **Create** | `POST /api/v2/api-keys` | Generate a new API key scoped to the creating user's organization and role. The cleartext key is returned exactly once and must be stored immediately. |
| **Use** | HTTP header authentication | The key is presented on every request to `/api/v2`. Scope enforcement (read-only vs read-write) applies per request. |
| **Revoke** | `DELETE /api/v2/api-keys/{id}` | Immediately invalidate the key. All subsequent requests using this key receive `401 Unauthorized`. Revocation is instantaneous — there is no grace period or eventual consistency lag. |

Keys are stored hashed in the database — DALP never stores API keys in cleartext after initial creation. If a key is lost, it cannot be recovered; a new key must be created and the old one revoked.

### 7.6 HSM Support

HSM-backed deployments are explicitly supported and positioned for regulated financial services. The docs reference FIPS 140-2 Level 3 protection and note that signing occurs within the secure enclave.

### 7.7 DFNS and Fireblocks as Key Guardian Backends

Key Guardian treats DFNS and Fireblocks as pluggable backends:

- **DFNS**: delegated MPC custody, programmatic approval resolution, synchronized audit logs
- **Fireblocks**: vault account model, TAP policy enforcement, no programmatic approval resolution from DALP, approvals handled in console or Co-Signer

### 7.8 Transaction Signing with Wallet Verification Gates

Every blockchain write operation that flows through the Transaction Signer is gated by the wallet verification layer described in Section 6. The signing flow is:

1. The caller submits a transaction request through the API.
2. Route-level middleware validates the caller's role and organization scope.
3. If the operation requires wallet verification, the middleware checks for a valid verification factor (PINCODE, OTP, or SECRET_CODES).
4. Only after verification succeeds does the request reach the Transaction Signer.
5. The Transaction Signer delegates to Key Guardian for the actual cryptographic signing.
6. The signed transaction is submitted to the blockchain through the execution engine.

This means that transaction signing is never just a technical operation. It is a governed operation with identity, role, tenant, and verification controls applied before any key material is accessed.

### 7.9 Logged Operations

| Operation | Logged Attributes |
|-----------|-------------------|
| Key generation | Key identifier, algorithm, storage tier, generator identity |
| Signature request | Key identifier, message hash, requester identity, workflow correlation |
| Rotation | Old key identifier, new key identifier, initiator, approval chain |
| Access denial | Key identifier, requester, denial reason |

---

## 8. Audit Trails and Operational Evidence

### 8.1 Event-Storming-Modeled Verification Lifecycle

DALP models its verification lifecycle using **event-storming methodology**, resulting in a state machine with well-defined transitions and audit events at every state change:

| State | Description | Transitions |
|-------|-------------|-------------|
| **Disabled** | Verification factor not yet configured | → Enabled (on factor setup) |
| **Enabled** | Factor is active and accepting verification attempts | → Locked (on too many failures) |
| **Locked** | Factor is temporarily or permanently locked due to failed attempts | → Enabled (on admin unlock or cooldown), → Compromised (on security event) |
| **Compromised** | Factor is flagged as potentially compromised | → Disabled (on factor reset and re-enrollment) |

Every state transition is recorded as an audit event with:
- Timestamp of the transition
- Actor who triggered the transition (user, system, administrator)
- Previous state and new state
- Reason for the transition (e.g., "3 consecutive failed PINCODE attempts", "administrator manual lock", "suspicious activity detected")
- Correlation ID linking the event to the broader session and request context

This event-storming approach means that the verification system's audit trail is not a bolted-on logging concern. It is a first-class design artifact — the state machine was designed with auditability as a structural property, not retrofitted after implementation.

### 8.2 Role-Gated Middleware Audit Trail

All mutations in DALP pass through role-gated middleware, and this middleware layer generates audit events for every authorization decision:

- **Granted access**: Logged with the caller's identity, the required role, the matched role, and the target resource.
- **Denied access**: Logged with the caller's identity, the required role, the missing role, and the denial reason.
- **Escalation events**: Logged when wallet verification is required and the verification outcome (success/failure) is recorded.

Because all mutations flow through this middleware — there are no "backdoor" routes that bypass role checks — the middleware audit trail provides complete coverage of every write operation attempted against the platform. This is particularly valuable for post-incident forensics: if an unauthorized operation occurred, the audit trail shows exactly which middleware check was passed and which verification factor was presented.

### 8.3 Transaction Lifecycle Audit Trail

DALP provides a durable transaction lifecycle for blockchain writes. Writes pass through durable transaction-request history and Restate-backed state machines.

Operationally, this gives DALP:
- persistent state per workflow step
- exactly-once execution semantics
- state-transition history
- dead-letter handling for exhausted retry budgets
- replay / resume capability after root-cause resolution

### 8.4 Authentication and Verification Logs

DALP's authentication layer logs every authentication event with timestamp, method, and result. Wallet verification attempts — success and failure — are also logged.

That gives institutions evidence for:
- who logged in
- how they authenticated
- whether they used API key, session, passkey, or wallet verification factor
- whether step-up verification succeeded before sensitive operations

### 8.5 On-Chain Event Evidence

The Chain Indexer provides evidence from blockchain state and logs:
- token creation and supply changes
- identity registration and claims
- role grants and revocations
- forced transfers and freezes
- settlement execution / cancellation / expiry withdrawals
- feed registration / replacement / removal
- vault approvals and execution events

Because DALP treats the chain as authority for roles and compliance, these events are not just technical artifacts. They are governance evidence.

### 8.6 Custody Audit Trails

DFNS audit logs synchronize with DALP audit records. Fireblocks exposes policy and approval history through its own operational surfaces, and DALP surfaces pending approvals and transaction status where integration allows.

### 8.7 Read-Side Queryability and Export

DALP exposes operational and analytical read models through:
- admin interfaces
- monitoring routes
- PostgreSQL analytics views
- transaction status endpoints
- CLI monitoring commands

This makes audit evidence queryable and exportable into institutional monitoring, compliance, and reporting systems.

### 8.8 Audit Retention

The reviewed docs do not publish a single fixed retention period that applies to all audit data classes across all deployments. Instead, DALP exposes the infrastructure and query surfaces required for retention-aligned enterprise operations. Retention policy can therefore be aligned with deployment and regulatory requirements rather than assumed as a one-size-fits-all SaaS default.

---

## 9. Session Management and API-Key Governance

### 9.1 Session Properties

DALP session management is conservative by design:
- HTTP-only cookies
- Secure-only transport
- SameSite protection
- 7-day expiry
- 24-hour refresh window
- organization binding in session context
- session caching with 10-minute TTL

### 9.2 API Key Lifecycle

API keys can be:
- created
- rotated
- revoked
- optionally expired

Revoked keys immediately lose access. The full key is shown only once at creation and stored hashed in the database.

### 9.3 Organization Context Requirement

API keys need organization context to access system endpoints. DALP docs explicitly note that without `organizationId` in metadata, API keys can fail with 401 errors when calling system endpoints.

This matters because it prevents ambiguous or tenantless machine access.

### 9.4 Read-Only vs Read-Write Keys

Scope enforcement is HTTP-method-based on REST endpoints:
- read-only keys: `GET`, `HEAD`, `OPTIONS`
- read-write keys: all methods including `POST`, `PUT`, `PATCH`, `DELETE`

This gives institutions a basic but effective least-privilege model for service integrations.

---

## 10. Segregation of Duties and Maker-Checker Controls

### 10.1 Role-Based Separation of Duties

DALP's role design naturally supports separation of duties because key operational functions are partitioned:
- identity operations vs token deployment vs compliance vs claims vs feeds
- governance vs supply management vs custody vs emergency at token level
- sale administration vs sale fund withdrawal
- auditor as view-only role

This means one person does not need to hold all powers to operate the platform.

### 10.2 Dual-Layer Authorization as SoD

Segregation of duties in DALP is not only about distinct roles. It also comes from **dual-layer authorization**:
- off-chain route permission
- on-chain role permission

A user may be an organization admin but still lack on-chain `supplyManagement` authority. Conversely, an on-chain role alone does not bypass platform authentication and organization scoping.

### 10.3 Wallet Verification as Intent Control

Step-up verification also acts as a separation-of-duties-style control. Being logged in is not enough. The user must present a second factor for sensitive blockchain writes, unless an API key is intentionally used for automation.

### 10.4 Custody-Layer Maker-Checker

Custody providers add another approval layer:

- **DFNS** can enforce multi-party approval workflows and supports programmatic resolution surfaced through DALP.
- **Fireblocks** enforces TAP rules and multi-approver requirements, but approvals occur through Fireblocks-controlled channels.

### 10.5 Forced Transfer and Emergency Separation

DALP's token role model separates:
- **`custodian`** for freeze/unfreeze, forced transfer, recovery
- **`emergency`** for pause/unpause and emergency controls
- **`supplyManagement`** for mint/burn

The person who can mint does not automatically gain forced-transfer authority. The person who can pause the system does not automatically gain sale-fund withdrawal rights.

### 10.6 Auditor Role

The presence of an explicit **`auditor`** role is particularly valuable. It gives institutions a view-only role for permissions, identities, audit logs, and system state without conflating oversight with operational control.

### 10.7 SoD Limits

The docs are also honest about what DALP is not yet:
- no continuous machine-generated SoD conflict detection
- no built-in certification cycles by job function
- no claim that DALP is a complete enterprise IAM-governance suite

The right framing is: DALP provides strong operational SoD boundaries and maker-checker integration points, while broader access-governance programs remain part of institutional IAM processes.

---

## 11. Identity Recovery and Administrative Intervention

### 11.1 Identity Recovery Workflow

DALP supports identity recovery as a formal governed workflow, not an ad hoc support action.

The capability mapping verifies:
- preflight recoverability checks
- destructive confirmation-gated execution
- signer wallet creation
- identity factory `createIdentity`
- identity registry `recoverIdentity`
- local security reconciliation in one DB transaction

### 11.2 Security Reconciliation After Recovery

Recovery includes cleanup of compromised or obsolete auth material:
- delete sessions
- delete two-factor rows
- delete passkeys
- delete wallet-verification rows
- rewrite wallet/security flags

Recovery is not just "change an address." It is a full security-context reset.

### 11.3 Forced Movement and Recovery Boundaries

DALP also supports governed emergency movement controls via token-level forced transfer and identity-recovery handoff flows. However, the capability mapping is clear about limits:
- post-recovery token movement may still require manual recovery worklists
- compromised-wallet blocklist is currently audit-log only rather than universal on-chain enforcement
- forced-recover success-path coverage is thinner than forced-transfer coverage

---

## 12. CLI Administration Surface

### 12.1 Scope and Scale

The DALP CLI provides a comprehensive administration interface with **26 top-level command groups** encompassing **301 individual commands**. This is not a thin wrapper around a few API calls — it is a full operational surface that covers every aspect of platform administration, asset lifecycle, compliance management, identity operations, and system monitoring.

The 26 command groups span:

| Category | Example Groups | Purpose |
|----------|---------------|---------|
| **Platform Administration** | `organization`, `user`, `invitation`, `api-key` | Tenant management, user lifecycle, API key administration |
| **System Operations** | `system`, `bootstrap`, `upgrade`, `module` | System lifecycle, bootstrapping, upgrades, module management |
| **Identity Management** | `identity`, `claim`, `trusted-issuer`, `kyc` | Identity registration, claims issuance, trusted issuer management, KYC review |
| **Asset Lifecycle** | `token`, `asset-class`, `compliance`, `sale` | Token deployment, configuration, compliance module management, token sales |
| **Data and Feeds** | `feed`, `exchange-rate`, `external-token` | Feed management, exchange rate sync, external asset registration |
| **Monitoring** | `health`, `monitor`, `status` | API health checks, blockchain health, streaming endpoints |

### 12.2 Typed Argument Validation with Zod

Every CLI command enforces typed argument validation through **Zod schemas**. This means:

- Arguments are validated before any API call is made — invalid inputs are caught at the CLI layer, not at the API layer.
- Type coercion is handled consistently: numeric strings are converted to numbers, boolean flags are parsed correctly, enum values are validated against allowed sets.
- Error messages are specific and actionable: instead of generic "invalid argument" errors, users see exactly which argument failed validation and what was expected.
- Complex nested arguments (such as compliance module parameters or claim topic configurations) are validated structurally, not just as strings.

The Zod-backed validation layer also enables automatic help generation: each command's `--help` output reflects the actual schema, including required vs optional arguments, allowed values for enum fields, and default values.

### 12.3 Monitoring and Health Checks

The CLI provides dedicated monitoring capabilities that are essential for production operations:

**API Health Monitoring**: Commands that check the DALP API's availability, response times, and error rates. These integrate with standard monitoring infrastructure (Prometheus, Grafana, Datadog) through machine-readable output formats.

**Blockchain Health Monitoring**: Commands that verify blockchain node connectivity, block production, gas price status, and chain synchronization state. These are critical for detecting blockchain-level issues before they affect platform operations.

**Streaming Endpoints**: The CLI supports streaming monitoring endpoints that provide real-time event feeds for:
- Transaction status changes (pending → submitted → confirmed → finalized)
- Identity registration events
- Compliance verification outcomes
- Feed value updates

These streaming endpoints enable operators to build real-time dashboards and alerting systems without polling.

### 12.4 CLI as Operational Runbook Surface

The CLI's comprehensive coverage makes it the primary surface for operational runbooks. Common administrative procedures — system bootstrap, identity recovery, compliance module deployment, feed registration, emergency token pause — are all executable through CLI commands with full audit logging.

This matters for institutional operations because CLI commands can be scripted, versioned in source control, reviewed in pull requests, and executed through controlled deployment pipelines. Interactive console operations are convenient for exploration, but production operations benefit from the repeatability and auditability that CLI-driven workflows provide.

---

## 13. Permission Granularity in Practice

### 13.1 Resource-Level Permissions

DALP permissions are applied at multiple resource scopes:
- organization
- system
- token
- addon
- feed
- asset-class definition
- external-token registry
- identity record

### 13.2 Action-Level Permissions

Routes enforce action-specific authority. Examples verified in the docs/code:
- asset-class definitions: `list/read` vs `create/update/delete` split across roles
- token document upload/delete routes gated by token permission middleware
- fixed-yield top-up routes gated by token permissions
- external-token registration requires token creation/system authority
- feeds registration/removal requires `feedsManager` or token governance depending on scope

### 13.3 Field-Level and Capability-Level Effects

DALP's permission system is not primarily a generic "field-level ACL" product. Its equivalent in practice is **capability-level gating**:
- interface-aware middleware blocks unsupported operations
- route contracts expose only allowed actions in context
- UI derives renderable features from indexed on-chain role state

So the practical answer is: DALP's granularity is strongest at **resource + action + capability/interface** level rather than arbitrary spreadsheet-style per-field record ACLs.

### 13.4 Permission Projection into UI

Because the UI reads indexed on-chain role state, access control is not just enforced in the backend. It also affects feature visibility. If a role is removed on-chain, the UI can stop rendering the relevant action surfaces.

---

## 14. Practical Institutional Reading

If you strip away the product language, DALP's access-control posture is this:

- Authentication is modern and layered: sessions, API keys (with hard endpoint separation), passkeys, MFA, CLI device auth, and org context.
- The two-endpoint model (`/api/rpc` for sessions, `/api/v2` for API keys) prevents authentication method crossover and enforces HTTP-method-based scoping.
- Organization scoping is real and enforced at request time, with membership-gated active-org switching and auto-derived slugs for consistency.
- On-chain roles are the authoritative source for blockchain authority, with 26 clearly partitioned roles across platform, people, asset, and module layers.
- Route-level access guards enforce permissions before business logic executes, with role checks happening at the middleware layer.
- Wallet verification separates login from transaction intent, with three active factors (PINCODE, OTP, SECRET_CODES) and replay protection on all time-limited factors.
- The invitation model preserves tenant boundaries with configurable re-invitation behavior, membership limits, and a deterministic post-acceptance flow that includes identity registration.
- Event-storming-modeled verification lifecycle provides a state machine with full audit coverage (Disabled → Enabled → Locked → Compromised).
- All mutations pass through role-gated middleware, creating a complete authorization audit trail.
- Key Guardian gives DALP a credible enterprise key-management architecture across DB, secret managers, HSMs, and MPC custody backends, with transaction signing gated by wallet verification.
- Custody integrations add a second control plane for approvals and policy checks.
- The CLI provides 26 command groups and 301 commands with Zod-backed typed validation, covering the full operational surface including monitoring with API and blockchain health checks and streaming endpoints.
- Segregation of duties is practical and meaningful even if DALP is not trying to be a full-blown enterprise IGA product.
- Role provisioning is governed through the Security Governance Team, providing human oversight over the technical enforcement layer.

That is exactly what a regulated digital-asset platform should do. It should not try to replace a bank's identity governance program. It should make the risky parts of digital-asset operations governable, tenant-scoped, role-bound, and provable.
