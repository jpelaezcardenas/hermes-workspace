# Access Control and Permissions

## Executive Summary

DALP implements access control as a layered control system rather than a single login or role table. The design separates:

1. **Platform authentication and organization membership** at the application layer,
2. **On-chain role assignment and enforcement** at the system and asset-contract layers,
3. **Execution-time transaction verification** for sensitive blockchain writes, and
4. **Provider-side custody controls** where external custody providers such as DFNS or Fireblocks are used.

This matters in regulated environments because DALP does not rely on a single brittle permission boundary. A user or service must satisfy the relevant controls at the relevant layer:

- an authenticated session or scoped API key at the platform edge;
- the appropriate DALP on-chain role for the system or token operation;
- wallet verification for sensitive blockchain writes unless the flow is intentionally machine-to-machine via API key; and
- any custody-provider approval policy when signing is delegated to an external custodian.

DALP’s core architectural invariant is explicit in the authorization documentation: **the on-chain AccessManager is the authoritative source for role assignments**, and the UI/API consume indexed on-chain state rather than maintaining a separate off-chain permission database (`kit/dapp/content/docs/architecture/security/authorization.mdx`). In practice, DALP combines enterprise application controls with blockchain-native authorization, which is materially stronger than products that treat one layer as a shadow copy of the other.

## 1. Access Control Architecture Overview

### 1.1 Architectural model

DALP’s access-control model is built on a dual-layer authorization pattern:

- **Off-chain platform roles** govern access to the console, API surfaces, organization context, and session lifecycle.
- **On-chain roles** govern system-level and token-level blockchain operations.

The formal DALP architecture documentation states that write operations require both the platform layer and the on-chain layer, while on-chain role assignments remain the source of truth for operational authority (`kit/dapp/content/docs/architecture/security/authorization.mdx`).

At runtime, the DAPI middleware enforces this model through request-context composition:

- `orgRoleSyncMiddleware` reconciles on-chain role assignments into organization membership roles during authenticated bootstrap (`packages/dalp/dapi/middleware/src/org-role-sync.middleware.ts`).
- `system.middleware.ts` loads tenant system context, maps the caller’s wallet to on-chain roles, and computes allowed system actions through `getSystemPermissions(...)` (`packages/dalp/dapi/middleware/src/system.middleware.ts`, `packages/dalp/dapi/middleware/src/helpers/system-permissions.ts`).
- `token.middleware.ts` and `token-permission.middleware.ts` apply the same pattern at token scope, deriving token actions from token roles and blocking execution when required roles or interfaces are missing (`packages/dalp/dapi/middleware/src/token-permission.middleware.ts`, `packages/dalp/dapi/middleware/src/permissions/token.permissions.ts`).

This is not a cosmetic RBAC layer. DALP converts authenticated requests into **tenant-scoped, permission-aware execution contexts** before handlers run.

### 1.2 Role layers

DALP documents four distinct role layers in its authorization architecture (`kit/dapp/content/docs/architecture/security/authorization.mdx`):

1. **Platform roles**: `owner`, `admin`, `member`
2. **System people roles**: operational human roles such as `systemManager`, `identityManager`, `tokenManager`
3. **Per-asset roles**: token-scoped roles such as `governance`, `supplyManagement`, `custodian`, `emergency`
4. **System module roles**: contract/module roles such as `systemModule`, `tokenFactoryModule`, `trustedIssuersMetaRegistryModule`

The code confirms the concrete role enumerations in DALP’s validation layer:

- all access-control roles are enumerated in `packages/core/validation/src/access-control-roles.ts`;
- system-scoped role subsets are defined in `systemAccessControlRoles`;
- asset-scoped role subsets are defined in `assetAccessControlRoles`.

### 1.3 OpenZeppelin-based enforcement

Both DALP’s system access manager and token access manager are implemented on top of OpenZeppelin’s upgradeable access-control stack:

- `AccessControlUpgradeable`
- `Initializable`
- `ERC2771ContextUpgradeable`
- `UUPSUpgradeable` for the system access manager

This is visible in:

- `kit/contracts/contracts/system/access-manager/DALPSystemAccessManagerImplementation.sol`
- `kit/contracts/contracts/system/tokens/access/DALPTokenAccessManagerImplementation.sol`

The use of OpenZeppelin matters for proposal assessment because DALP is not using ad hoc authorization primitives. It inherits a well-understood RBAC model with standard role-grant, revoke, renounce, and admin-role patterns, while adding DALP-specific hierarchy and governance logic on top.

## 2. Role-Based Access Control (RBAC) Implementation

### 2.1 System access manager

`DALPSystemAccessManagerImplementation` is the authoritative system-level role manager. Its key characteristics are:

- initialization requires at least one initial admin, otherwise it reverts with `NoInitialAdmins()`;
- initial administrators receive `DEFAULT_ADMIN_ROLE`;
- role checks support both single-role and multi-role authorization via `onlyRoles(bytes32[] memory roles)`;
- grants and revocations are controlled by the role’s admin chain, not by arbitrary callers;
- upgrades are restricted to `DEFAULT_ADMIN_ROLE` or `SYSTEM_MANAGER_ROLE` (`_authorizeUpgrade(...)`).

Source: `kit/contracts/contracts/system/access-manager/DALPSystemAccessManagerImplementation.sol`

The most important DALP-specific implementation detail is `_getRoleAdmins(bytes32 role)`, which traverses the admin-role hierarchy up to `DEFAULT_ADMIN_ROLE`. Grants and revocations are therefore constrained by the full admin chain, not merely by a flat superuser check. That is stronger than simplistic RBAC where one unchecked admin role implicitly governs everything.

### 2.2 Token access manager

`DALPTokenAccessManagerImplementation` applies the same OpenZeppelin model at asset level. It centralizes role management for DALP token contracts so that token contracts can delegate authorization checks to a dedicated access manager rather than each token reinventing access control.

Key properties:

- multiple initial admins supported;
- standard `hasRole`, `batchGrantRole`, `batchRevokeRole`, `grantMultipleRoles`, `revokeMultipleRoles`, `renounceMultipleRoles`;
- ERC-2771 meta-transaction support via `_msgSender()` overrides.

Source: `kit/contracts/contracts/system/tokens/access/DALPTokenAccessManagerImplementation.sol`

The token access manager is simpler than the system access manager because the system-level hierarchy and upgrade governance are concentrated in the platform’s system layer. Asset-level administration is intentionally narrower and oriented to operational separation of duties.

### 2.3 Role resolution in the platform layer

DALP does not keep a separate permission database for operational blockchain roles. Instead, request middleware maps indexed on-chain role assignments into action permissions.

Mechanically:

- `mapUserRoles(...)` builds a boolean role map for the authenticated wallet from indexed access-control state (`packages/dalp/dapi/middleware/src/helpers/role-validation.ts`).
- `getSystemPermissions(...)` evaluates `SYSTEM_PERMISSIONS` against that role set (`packages/dalp/dapi/middleware/src/helpers/system-permissions.ts`).
- `tokenPermissionMiddleware(...)` evaluates token role requirements using `satisfiesRoleRequirement(...)` (`packages/dalp/dapi/middleware/src/token-permission.middleware.ts`, `packages/core/validation/src/role-requirement.ts`).

The `RoleRequirement` model supports:

- single-role requirements,
- OR logic via `{ any: [...] }`, and
- AND logic via `{ all: [...] }`.

That means DALP can express more than trivial “has this one role” checks when needed.

## 3. Available Roles and Their Permissions

## 3.1 Off-chain platform roles

DALP defines three application-layer organization roles in Better Auth:

- `owner`
- `admin`
- `member`

Source: `packages/core/validation/src/user-roles.ts`

These roles govern organization-level application behavior such as who can create organizations, who can access admin routes, and who can perform business/onboarding/system bootstrap actions in the web application. For example:

- organization creation routes check `session.user.role === "admin"` in admin UI routing (`kit/dapp/src/routes/_private/_onboarded/_sidebar/admin/organizations.tsx`);
- onboarding logic allows system creation for `admin` or `owner` (`kit/dapp/src/routes/_private/onboarding/_sidebar/identity.tsx`, `completed.tsx`).

These roles are not a substitute for on-chain authority. They are a platform access layer and tenant-membership boundary.

## 3.2 System people roles

DALP defines the following human/operator roles in `DALPPeopleRoles.sol`:

### `SYSTEM_MANAGER_ROLE`
Purpose: core platform/system management.

Documented responsibilities include:

- bootstrapping the system,
- managing upgrades,
- managing implementation references,
- update linking in identity registry,
- registering token factories,
- registering addons,
- registering compliance modules.

Source: `kit/contracts/contracts/system/DALPPeopleRoles.sol`

Runtime mappings confirm that `systemManager` is required for actions such as:

- addon creation (`addonCreate`),
- system factory creation (`tokenFactoryCreate`),
- compliance module creation (`complianceModuleCreate`),
- admin listing,
- various settings operations.

Source: `packages/dalp/dapi/middleware/src/permissions/system.permissions.ts`

### `IDENTITY_MANAGER_ROLE`
Purpose: identity administration.

Documented responsibilities include:

- registering identities,
- recovering identities,
- managing user onboarding.

Source: `kit/contracts/contracts/system/DALPPeopleRoles.sol`

Runtime mappings show `identityManager` controls:

- identity creation, deletion, registration, recovery;
- user creation and security management;
- KYC profile and document operations;
- identity search/list operations.

Source: `packages/dalp/dapi/middleware/src/permissions/system.permissions.ts`

### `TOKEN_MANAGER_ROLE`
Purpose: token deployment and configuration.

Documented responsibility: deploy and configure tokens.

Source: `kit/contracts/contracts/system/DALPPeopleRoles.sol`

Runtime mappings show `tokenManager` is required for:

- `tokenCreate`,
- fixed-yield schedule creation,
- token sale creation,
- selected settings surfaces such as asset-class list/read.

Sources: `packages/dalp/dapi/middleware/src/permissions/system.permissions.ts`, `product/dalp/capability-mapping/platform-administration.md`

### `COMPLIANCE_MANAGER_ROLE`
Purpose: platform-wide compliance governance.

Documented responsibilities include:

- registering compliance modules,
- configuring global compliance settings,
- managing bypass lists.

Source: `kit/contracts/contracts/system/DALPPeopleRoles.sol`

Runtime mappings show `complianceManager` is explicitly required for `complianceModuleRemove`, while broader compliance configuration capability is reflected in documentation and compliance architecture sources.

### `CLAIM_POLICY_MANAGER_ROLE`
Purpose: trusted issuer and claim-topic governance.

Documented responsibilities include:

- managing trusted issuers,
- managing claim topics.

Source: `kit/contracts/contracts/system/DALPPeopleRoles.sol`

Runtime mappings show this role is required for:

- `topicCreate`, `topicUpdate`, `topicDelete`;
- `trustedIssuerCreate`, `trustedIssuerUpdate`, `trustedIssuerDelete`.

Source: `packages/dalp/dapi/middleware/src/permissions/system.permissions.ts`

### `ORGANISATION_IDENTITY_MANAGER_ROLE`
Purpose: managing claims for the organisation identity itself.

Documented use cases include organization-level KYC, AML, licenses, and similar organizational attestations.

Source: `kit/contracts/contracts/system/DALPPeopleRoles.sol`

### `CLAIM_ISSUER_ROLE`
Purpose: issuing claims on identities.

DALP’s contract documentation makes an important distinction: this role allows an address to create and attach claims to identities, **but it does not automatically make the address a trusted issuer**. Trust is separately governed by the trusted-issuer registries.

Source: `kit/contracts/contracts/system/DALPPeopleRoles.sol`

That separation is strong design. It prevents “can technically issue a claim” from being conflated with “claims are accepted in compliance decisions.”

### `AUDITOR_ROLE`
Purpose: view-only oversight.

The contract documentation describes this as a view-only role for permissions, identities, audit logs, and system state.

Source: `kit/contracts/contracts/system/DALPPeopleRoles.sol`

### `FEEDS_MANAGER_ROLE`
Purpose: governance of the FeedsDirectory.

Documented responsibilities include registering, replacing, and removing feeds.

Source: `kit/contracts/contracts/system/DALPPeopleRoles.sol`

Runtime mappings show `feedsManager` is required for `feedsRegister`, `feedsReplace`, and `feedsRemove` (`packages/dalp/dapi/middleware/src/permissions/system.permissions.ts`).

### `ADDON_MANAGER_ROLE` (legacy/deprecated)
DALP explicitly marks this as a V1 compatibility role retained for backward compatibility and deprecated in V2.

Source: `kit/contracts/contracts/system/DALPPeopleRoles.sol`

## 3.3 Asset roles

DALP defines the following per-asset roles in `DALPAssetRoles.sol`:

### `DEFAULT_ADMIN_ROLE`
Purpose: asset-level permission administration.

This is the OpenZeppelin admin role and is represented in DALP’s user-facing docs as the **Permission manager** role for assets. It governs granting and revoking the other asset-scoped roles.

Sources:

- `kit/contracts/contracts/assets/DALPAssetRoles.sol`
- `kit/dapp/content/docs/user-guides/asset-servicing/change-asset-admin-roles.mdx`

### `GOVERNANCE_ROLE`
Purpose: governance, compliance, metadata, and policy configuration at token level.

Code documentation describes it as managing token governance, verification, and compliance. Runtime permission mappings show it controls:

- adding/removing compliance modules,
- setting compliance parameters,
- maturing bonds,
- setting caps,
- setting metadata,
- claim issue/revoke at token scope,
- AUM fee settings,
- collateral updates (subject to trusted issuer constraints as applicable).

Sources:

- `kit/contracts/contracts/assets/DALPAssetRoles.sol`
- `packages/dalp/dapi/middleware/src/permissions/token.permissions.ts`

### `SUPPLY_MANAGEMENT_ROLE`
Purpose: supply operations.

Code and docs align that this role governs minting and burning. Runtime mappings confirm it also governs selected supply-adjacent actions such as denomination-asset withdrawal.

Sources:

- `kit/contracts/contracts/assets/DALPAssetRoles.sol`
- `packages/dalp/dapi/middleware/src/permissions/token.permissions.ts`
- `kit/dapp/content/docs/user-guides/asset-servicing/change-asset-admin-roles.mdx`

### `CUSTODIAN_ROLE`
Purpose: custody and enforcement operations.

DALP defines this role for:

- freezing addresses,
- partial freezes,
- forced transfers,
- forced recovery / recovery operations.

This maps directly to legal-order handling, sanctions controls, dispute remediation, and exceptional asset protection actions.

Sources:

- `kit/contracts/contracts/assets/DALPAssetRoles.sol`
- `packages/dalp/dapi/middleware/src/permissions/token.permissions.ts`
- `kit/dapp/content/docs/user-guides/asset-servicing/change-asset-admin-roles.mdx`

### `EMERGENCY_ROLE`
Purpose: emergency intervention.

This role governs pausing/unpausing asset operations and emergency token recovery functions.

Sources:

- `kit/contracts/contracts/assets/DALPAssetRoles.sol`
- `packages/dalp/dapi/middleware/src/permissions/token.permissions.ts`

### `SALE_ADMIN_ROLE`
Purpose: token-sale lifecycle management.

DALP documents this role as able to configure vesting, payment currencies, limits, and to activate/pause/end token sale flows.

Source: `kit/contracts/contracts/assets/DALPAssetRoles.sol`

### `FUNDS_MANAGER_ROLE`
Purpose: treasury withdrawal for token sales.

DALP explicitly separates this from `SALE_ADMIN_ROLE`, noting that treasury operations do not require broader sale-administration powers.

Source: `kit/contracts/contracts/assets/DALPAssetRoles.sol`

That is a concrete segregation-of-duties measure, not just a best-practice statement.

## 3.4 System module roles

DALP defines contract/module roles in `DALPSystemRoles.sol`:

- `SYSTEM_MODULE_ROLE`
- `IDENTITY_REGISTRY_MODULE_ROLE`
- `TOKEN_FACTORY_REGISTRY_MODULE_ROLE`
- `TOKEN_FACTORY_MODULE_ROLE`
- `ADDON_FACTORY_REGISTRY_MODULE_ROLE`
- `ADDON_FACTORY_MODULE_ROLE`
- `TRUSTED_ISSUERS_META_REGISTRY_MODULE_ROLE`

These are not end-user roles. They are assigned to system modules/contracts for controlled automated operations such as registry updates, allowlist maintenance, and trusted-issuer meta-registry actions.

Source: `kit/contracts/contracts/system/DALPSystemRoles.sol`

## 4. On-Chain vs Platform-Level Access Control

## 4.1 Platform-level controls

At platform level, DALP uses Better Auth for:

- browser session authentication,
- API keys,
- passkeys/WebAuthn,
- organization membership,
- admin plugin features,
- device/CLI authentication.

Source: `kit/dapp/content/docs/architecture/security/authentication.mdx`

Platform-layer roles and memberships determine who can sign in, which organization is active, which admin pages are visible, and whether a caller is eligible to invoke specific application/API surfaces.

## 4.2 On-chain controls

On-chain controls are where DALP authorizes blockchain operations. DALP’s own authorization reference states that the on-chain `AccessManager` is the authoritative source for role assignments and that UI/API behavior reflects indexed on-chain state (`kit/dapp/content/docs/architecture/security/authorization.mdx`).

This means DALP is not merely storing roles in a database and mirroring them to chain. The chain role assignment itself is the authoritative operational control.

## 4.3 Transaction-time controls

For sensitive writes, DALP adds **wallet verification** as a further control layer. The wallet-verification architecture documentation states that session authentication proves identity, while wallet verification proves intent/control before blockchain state changes can occur (`kit/dapp/content/docs/architecture/security/wallet-verification.mdx`).

Representative write routes chain:

1. permission middleware,
2. wallet verification middleware,
3. transaction queue middleware.

This is documented in the capability mapping and visible in route/middleware references such as:

- `token.v2.transfer.ts`
- `compliance-module.v2.create.ts`
- `recovery.v2.execute.ts`

as summarized in `product/dalp/capability-mapping/compliance-and-identity.md` and `operations-and-reliability.md`.

## 4.4 API-key exception path

DALP intentionally bypasses interactive wallet verification for API-key-authenticated machine-to-machine requests. The wallet-verification architecture doc and the session/API-key architecture mapping both describe this explicitly (`kit/dapp/content/docs/architecture/security/wallet-verification.mdx`, `product/dalp/capability-mapping/platform-administration.md`).

That is not a loophole; it is a designed automation path with compensating controls:

- API keys are scoped,
- API keys are rate-limited,
- API keys are endpoint-constrained,
- API keys cannot be used on `/api/rpc`; programmatic clients must use `/api/v2` REST.

Source: `product/dalp/capability-mapping/platform-administration.md`

## 5. Multi-Tenancy and Organizational Boundaries

DALP supports both single-tenant and multi-tenant models through Better Auth’s organization system (`kit/dapp/content/docs/architecture/security/authorization.mdx`).

### 5.1 Organization boundary model

The capability mapping confirms that DALP maintains explicit organization boundaries in onboarding and membership handling:

- invitations are organization-scoped;
- active organization switching is membership-gated;
- `lastActiveOrganizationId` is only persisted after membership verification;
- user-scoped invitation inbox and organization-scoped invitation management are separate read models.

Sources:

- `packages/dalp/auth/src/index.ts`
- `packages/dalp/auth/src/hooks/use-auth-queries.ts`
- `product/dalp/capability-mapping/platform-administration.md`
- `product/dalp/capability-mapping/compliance-and-identity.md`

### 5.2 Tenant-scoped data and token visibility

DALP’s capability mapping repeatedly documents tenant scoping at query and route level. Examples include:

- external-token discovery constrained to the current tenant’s external token registry (`product/dalp/capability-mapping/platform-administration.md`);
- token visibility and global search behavior varying by user scope (`product/dalp/capability-mapping/operations-and-reliability.md`);
- custom asset classes constrained to the requesting `organizationId` when non-system classes are listed (`product/dalp/capability-mapping/platform-administration.md`).

### 5.3 On-chain role synchronization into organization context

`orgRoleSyncMiddleware` exists specifically to synchronize on-chain role state into organization membership roles at sign-in bootstrap (`packages/dalp/dapi/middleware/src/org-role-sync.middleware.ts`).

That is important in a bid context because DALP is not treating tenant membership and blockchain authority as unrelated silos. The architecture is designed to keep the organization experience aligned with the chain-authoritative role state.

## 6. Key Management and Custody Models

DALP’s authentication architecture documents a three-tier key-management model, and the custody-provider architecture extends it into external institutional custody (`kit/dapp/content/docs/architecture/security/authentication.mdx`, `kit/dapp/content/docs/architecture/integrations/custody-providers.mdx`).

### 6.1 Database-managed keys

DALP supports encrypted keys stored in the platform database for lower-assurance or development-oriented deployments.

### 6.2 HSM-backed keys

DALP supports hardware security modules where signing occurs inside the HSM boundary.

### 6.3 External custody integration

DALP supports delegated key management to external custody providers, specifically:

- **DFNS**
- **Fireblocks**

DALP’s custody integration documentation is explicit that in these models the custody provider handles key storage, approval workflows, and custody-layer audit trails, while DALP initiates signing requests and governs platform-side permissions (`kit/dapp/content/docs/architecture/integrations/custody-providers.mdx`).

### 6.4 Division of control in custody scenarios

DALP’s capability mapping describes the control split accurately:

- DALP still enforces permissions, wallet verification, queueing, and workflow state transitions;
- provider-native signers may own nonce allocation, gas handling, signing, broadcast, and status polling;
- DFNS supports programmatic approval resolution through DALP integration;
- Fireblocks supports listing pending approvals but not DALP-side programmatic approval resolution, requiring external console or co-signer action.

Sources:

- `product/dalp/capability-mapping/compliance-and-identity.md`
- `product/dalp/capability-mapping/operations-and-reliability.md`
- `kit/dapp/content/docs/architecture/integrations/custody-providers.mdx`

This separation is exactly what regulated buyers expect: DALP does not pretend to replace institutional custody controls when external custody is in use.

## 7. Audit Trails and Access Logging

DALP provides auditability across multiple layers, though the evidence shows different strengths at different layers.

### 7.1 On-chain role and action audit trail

Because DALP role assignment is on-chain and built on OpenZeppelin access control, grants and revocations emit the standard `RoleGranted` and `RoleRevoked` events inherited through `AccessControlUpgradeable`. DALP’s authorization architecture explicitly relies on indexed role events to propagate permission changes into the UI/API (`kit/dapp/content/docs/architecture/security/authorization.mdx`).

At the business-operation level, many contract and workflow actions emit specific domain events. Examples in the capability mapping include:

- `RefundClaimed` for claim/refund paths (`product/dalp/capability-mapping/custody-settlement.md`);
- `TokenComplianceBound`/`TokenComplianceUnbound` for compliance bindings (`product/dalp/capability-mapping/compliance-and-identity.md`);
- vault and addon provisioning events in custody/governance flows.

### 7.2 Authentication and verification logs

DALP’s authentication architecture states:

- every authentication event is logged with timestamp, method, and result;
- wallet verification attempts, success and failure, are logged with user identity and timestamp.

Sources:

- `kit/dapp/content/docs/architecture/security/authentication.mdx`
- `kit/dapp/content/docs/architecture/security/wallet-verification.mdx`

### 7.3 Workflow and operational status tracking

DALP uses durable workflows for sensitive operations such as system deployment and identity recovery, with explicit phase-tracking in workflow state (`product/dalp/capability-mapping/operations-and-reliability.md`).

For identity recovery, the documented phases are:

- `creating-wallet`
- `deploying-identity`
- `recovering-identity`
- `revoking-sessions`
- `recovering-tokens`
- terminal state

This produces auditable operational state even where a process spans multiple off-chain and on-chain steps.

### 7.4 Limits and current gaps

The evidence set also shows that DALP documents gaps honestly. For example:

- analytics/reporting mapping notes “No audit trail for exports (who exported what, when)” in the current reporting layer (`product/dalp/capability-mapping/analytics-and-reporting.md`);
- some incident-management/operator workflows remain infrastructure-layer rather than first-class DALP application entities (`product/dalp/capability-mapping/operations-and-reliability.md`).

That candor is useful in a proposal because it distinguishes shipped auditability from roadmap assumptions.

## 8. Segregation of Duties

DALP implements segregation of duties in code, documentation, and route-level permission maps.

### 8.1 Separation between system administration domains

The system people roles deliberately split system responsibilities across:

- system configuration (`systemManager`),
- identity administration (`identityManager`),
- token operations (`tokenManager`),
- compliance governance (`complianceManager`),
- claim-policy governance (`claimPolicyManager`),
- claim issuance (`claimIssuer`),
- feed governance (`feedsManager`),
- audit/oversight (`auditor`).

Source: `kit/contracts/contracts/system/DALPPeopleRoles.sol`

This is materially better than collapsing all administrative authority into a single “operator” or “super-admin” role.

### 8.2 Separation inside token/asset operations

At token level, DALP explicitly splits:

- permission administration (`DEFAULT_ADMIN_ROLE` / Permission manager),
- governance configuration (`GOVERNANCE_ROLE`),
- supply operations (`SUPPLY_MANAGEMENT_ROLE`),
- custody enforcement (`CUSTODIAN_ROLE`),
- emergency shutdown/recovery (`EMERGENCY_ROLE`),
- token-sale administration (`SALE_ADMIN_ROLE`),
- treasury withdrawal (`FUNDS_MANAGER_ROLE`).

Sources:

- `kit/contracts/contracts/assets/DALPAssetRoles.sol`
- `kit/dapp/content/docs/user-guides/asset-servicing/change-asset-admin-roles.mdx`

The strongest example is the explicit separation of `SALE_ADMIN_ROLE` and `FUNDS_MANAGER_ROLE`, where DALP’s contract documentation states treasury does not need broader sale-administration rights.

### 8.3 Separation between claim creation and trust

DALP also separates **claim issuance capability** from **trusted issuer status**. An address with `CLAIM_ISSUER_ROLE` can create claims, but whether those claims are relied upon in verification contexts depends on trusted-issuer registry governance (`kit/contracts/contracts/system/DALPPeopleRoles.sol`, `product/dalp/capability-mapping/compliance-and-identity.md`).

That is a strong control pattern for compliance environments because it prevents technical write ability from automatically becoming trust authority.

### 8.4 No universal administrative bypass

The wallet-verification architecture explicitly states there is **no administrative override that skips wallet verification**; recovery requires backup codes or re-enrollment rather than an admin bypass (`kit/dapp/content/docs/architecture/security/wallet-verification.mdx`).

That is a meaningful operational control in environments concerned with privileged-user abuse.

## 9. Integration with Compliance Modules and Identity Controls

Access control in DALP is tightly integrated with compliance and identity rather than isolated from them.

### 9.1 Identity operations are role-gated

Identity creation, registration, recovery, country updates, and KYC workflows are all gated through `SYSTEM_PERMISSIONS` to `identityManager`, `claimIssuer`, or both depending on the specific action (`packages/dalp/dapi/middleware/src/permissions/system.permissions.ts`).

### 9.2 Trusted issuer and claim-topic governance

`claimPolicyManager` governs topic and trusted-issuer administration. This links authorization directly to compliance policy administration.

Source: `packages/dalp/dapi/middleware/src/permissions/system.permissions.ts`

### 9.3 Token-level compliance governance

At token level, `governance` controls:

- adding/removing compliance modules,
- setting compliance module parameters,
- claim issue/revoke in token context,
- selected metadata and lifecycle settings.

Source: `packages/dalp/dapi/middleware/src/permissions/token.permissions.ts`

### 9.4 Trusted-issuer overlays on top of role checks

DALP adds non-role authorization requirements where appropriate. `TOKEN_TRUSTED_ISSUER_REQUIREMENTS` shows that some token actions require trusted-issuer authorization in addition to role resolution:

- `updateCollateral` requires trusted issuer status for the `collateral` topic;
- `claimIssue` requires the caller to be a trusted issuer.

Source: `packages/dalp/dapi/middleware/src/permissions/token.permissions.ts`

This is an important nuance: DALP’s model is not “RBAC only.” It can compose RBAC with claim/trust constraints.

### 9.5 Global and system-scoped trusted issuer governance

The compliance/identity capability mapping documents DALP’s global trusted issuer registry model, including:

- a platform-wide `DALPGlobalTrustedIssuersRegistryImplementation`;
- three-tier trusted-issuer resolution (subject-scoped → system-scoped → global) in MetaRegistry V2;
- `DIRECTORY_ADMIN_ROLE` rather than per-system `SYSTEM_MANAGER_ROLE` for the global registry.

Source: `product/dalp/capability-mapping/compliance-and-identity.md`

That shows DALP’s trust and authorization structures are designed to scale beyond a single asset or single tenant bootstrap routine.

## 10. Proposal-Relevant Security Characteristics

From a bid-evaluation perspective, the following characteristics are especially relevant:

### 10.1 Chain-authoritative authorization
DALP’s on-chain AccessManager is the source of truth for role assignments. The platform does not maintain a divergent operational permission database (`kit/dapp/content/docs/architecture/security/authorization.mdx`).

### 10.2 Standards-based implementation
DALP uses OpenZeppelin `AccessControlUpgradeable` rather than custom RBAC primitives (`DALPSystemAccessManagerImplementation.sol`, `DALPTokenAccessManagerImplementation.sol`).

### 10.3 Layered control model
Authentication, authorization, wallet verification, and optional custodian approval are distinct controls rather than a single overloaded one (`authentication.mdx`, `wallet-verification.mdx`, `custody-providers.mdx`).

### 10.4 Fine-grained SoD
DALP separates identity, compliance, token, custody, emergency, treasury, and trust-governance duties into discrete roles (`DALPPeopleRoles.sol`, `DALPAssetRoles.sol`).

### 10.5 Tenant-aware enforcement
Organization membership, active organization selection, and tenant-scoped queries are explicitly enforced in both auth flows and operational routes (`packages/dalp/auth/src/index.ts`, capability mapping files).

### 10.6 Automation without collapsing control
API keys, CLI device auth, durable workflows, and provider-native execution paths enable automation, but DALP still preserves scoped access and execution boundaries (`platform-administration.md`, `operations-and-reliability.md`).

## 11. Key Differentiators

### 11.1 On-chain roles are not decorative; they are authoritative
Many platforms market “blockchain-native permissions” while actually enforcing access in an off-chain admin database. DALP’s architecture is materially different: the authorization reference states plainly that the on-chain AccessManager is the authoritative source for role assignments, and the UI consumes indexed chain state rather than a separate permission store (`kit/dapp/content/docs/architecture/security/authorization.mdx`).

### 11.2 DALP combines RBAC with trust and compliance assertions
DALP does not reduce all authorization to simple role checks. Token actions can require both a role and trusted-issuer status (`packages/dalp/dapi/middleware/src/permissions/token.permissions.ts`). Claim issuance capability is distinct from trusted-issuer acceptance (`DALPPeopleRoles.sol`). That is a stronger model for regulated asset workflows.

### 11.3 Segregation of duties is implemented in the contract model itself
The split between token governance, supply control, custody enforcement, emergency intervention, sale administration, and fund withdrawal is hard-coded in `DALPAssetRoles.sol`. The separation of `SALE_ADMIN_ROLE` and `FUNDS_MANAGER_ROLE` is a particularly strong example of treasury segregation built into the access model rather than left to policy documentation.

### 11.4 External custody does not weaken DALP’s own controls
Where DFNS or Fireblocks are used, DALP still retains responsibility for initiation-side permissions, wallet verification gates, queueing, and workflow state. Custody-provider controls add another approval layer; they do not replace DALP’s internal controls (`custody-providers.mdx`, `compliance-and-identity.md`, `operations-and-reliability.md`).

### 11.5 Multi-tenant administration is integrated with blockchain authority
DALP’s organization layer, invitation lifecycle, active-organization enforcement, and role synchronization middleware show that tenant administration and on-chain access control are architected together rather than bolted together after the fact (`packages/dalp/auth/src/index.ts`, `org-role-sync.middleware.ts`, capability mapping files).

## 12. Conclusion

DALP’s access-control and permissions model is suitable for institutional and regulated digital-asset deployments because it combines:

- standards-based RBAC contracts,
- chain-authoritative role assignments,
- explicit separation between platform authentication and blockchain authority,
- tenant-aware organization boundaries,
- multi-factor transaction verification,
- support for HSM and external custody models,
- auditable workflow state and on-chain event trails,
- and fine-grained segregation of duties across identity, compliance, asset governance, emergency control, custody enforcement, and treasury.

Just as importantly, the DALP codebase and product documentation are internally consistent on this point: access control is not treated as a UI convenience. It is a core platform control plane implemented across contracts, middleware, identity flows, and custody integrations.

## Source References

Primary sources used in this section:

- `kit/contracts/contracts/system/access-manager/DALPSystemAccessManagerImplementation.sol`
- `kit/contracts/contracts/system/tokens/access/DALPTokenAccessManagerImplementation.sol`
- `kit/contracts/contracts/system/DALPPeopleRoles.sol`
- `kit/contracts/contracts/system/DALPSystemRoles.sol`
- `kit/contracts/contracts/assets/DALPAssetRoles.sol`
- `packages/dalp/dapi/middleware/src/permissions/system.permissions.ts`
- `packages/dalp/dapi/middleware/src/permissions/token.permissions.ts`
- `packages/dalp/dapi/middleware/src/helpers/system-permissions.ts`
- `packages/dalp/dapi/middleware/src/helpers/role-validation.ts`
- `packages/dalp/dapi/middleware/src/system.middleware.ts`
- `packages/dalp/dapi/middleware/src/token-permission.middleware.ts`
- `packages/dalp/dapi/middleware/src/org-role-sync.middleware.ts`
- `packages/core/validation/src/access-control-roles.ts`
- `packages/core/validation/src/role-requirement.ts`
- `packages/core/validation/src/user-roles.ts`
- `kit/dapp/content/docs/architecture/security/authorization.mdx`
- `kit/dapp/content/docs/architecture/security/authentication.mdx`
- `kit/dapp/content/docs/architecture/security/wallet-verification.mdx`
- `kit/dapp/content/docs/architecture/integrations/custody-providers.mdx`
- `kit/dapp/content/docs/user-guides/platform-setup/platform-overview.mdx`
- `kit/dapp/content/docs/user-guides/asset-servicing/change-asset-admin-roles.mdx`
- `kit/dapp/content/docs/developer-guides/platform-setup/add-admins.mdx`
- `product/dalp/capability-mapping/platform-administration.md`
- `product/dalp/capability-mapping/compliance-and-identity.md`
- `product/dalp/capability-mapping/operations-and-reliability.md`
- `product/dalp/capability-mapping/custody-settlement.md`
- `product/dalp/capability-mapping/analytics-and-reporting.md`
