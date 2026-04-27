# Verification Notes — 04 Access Control and Permissions

## Source Grounding

### Verified Against Source Material

| Claim | Source | Status |
|-------|--------|--------|
| Organization is the tenant boundary | `platform-administration.md` | ✅ Verified |
| Organization creation: name-only, slug auto-derived, admin-only route access | `platform-administration.md` — organization setup evidence | ✅ Verified |
| `lastActiveOrganizationId` persisted only after membership check | `platform-administration.md`; `compliance-and-identity.md` | ✅ Verified |
| Invitation model separates org-scoped list vs user-scoped inbox | `platform-administration.md`; `compliance-and-identity.md` | ✅ Verified |
| `membershipLimit` and `cancelPendingInvitationsOnReInvite` in auth plugin | `platform-administration.md`; `compliance-and-identity.md` | ✅ Verified |
| Request middleware composes auth → org role sync → system context → token context | `dapi-middleware-architecture.md`; `operations-and-reliability.md` | ✅ Verified |
| `orgRoleSyncMiddleware` synchronizes on-chain roles into organization membership roles | `dapi-middleware-architecture.md` | ✅ Verified |
| System context derives user-specific actions from mapped on-chain roles | `dapi-middleware-architecture.md` | ✅ Verified |
| Token context derives actions from `TOKEN_PERMISSIONS`, mapped roles, and trusted-issuer topic requirements | `dapi-middleware-architecture.md` | ✅ Verified |
| `tokenPermissionMiddleware(...)` enforces interface support and role requirements | `dapi-middleware-architecture.md` | ✅ Verified |
| Asset creation defaults creator to `governance` role if none provided | `asset-lifecycle.md` — token.create.workflow.ts | ✅ Verified |
| `unpauseOnCreation=true` injects/extends `emergency` role | `asset-lifecycle.md` | ✅ Verified |
| Example explicit role matrix for asset classes: read = admin/systemManager/tokenManager; write = admin/systemManager | `platform-administration.md` | ✅ Verified |
| `DIRECTORY_ADMIN_ROLE` governs Global Trusted Issuers Registry | `compliance-and-identity.md` | ✅ Verified |
| Global TIR is platform-scoped, not system-scoped | `compliance-and-identity.md` | ✅ Verified |
| Wallet verification factors: PINCODE, SECRET_CODES, OTP | `compliance-and-identity.md`; `dapi-middleware-architecture.md` | ✅ Verified |
| PASSKEY unsupported in wallet verification middleware | `compliance-and-identity.md`; `dapi-middleware-architecture.md` | ✅ Verified |
| CLI device auth flow | `platform-administration.md`; `cli-automation-surface.md` | ✅ Verified |
| API key vs session auth split | `dapi-middleware-architecture.md`; `platform-administration.md` | ✅ Verified |
| API keys rejected on `/api/rpc` | `platform-administration.md`; `dapi-middleware-architecture.md` | ✅ Verified |
| External-token queries are tenant-scoped to current org registry | `platform-administration.md` | ✅ Verified |
| Asset-class custom definitions are org-scoped; system ones global | `platform-administration.md` | ✅ Verified |
| Secrets management backends: encrypted DB, Conjur, env vars | `secrets-management.md` | ✅ Verified |
| Wallet secrets migrated to dapp DB | `secrets-management.md` | ✅ Verified |
| Signer abstraction covers local, DFNS, Fireblocks | `services-architecture.md` | ✅ Verified |
| Vault events track signer weights, requirements, approvals, execution | `custody-settlement.md` | ✅ Verified |
| Identity recovery deletes sessions, two-factor rows, passkeys, wallet-verification rows | `operations-and-reliability.md` | ✅ Verified |
| Identity recovery requires wallet verification + confirmation | `operations-and-reliability.md` | ✅ Verified |
| Durable 11-state transaction lifecycle with audit trail | `operations-and-reliability.md` | ✅ Verified |
| `transaction_request_history` table/audit trail | `operations-and-reliability.md` | ✅ Verified |
| No built-in continuous SoD machine validation | `compliance-and-identity.md` | ✅ Verified |
| No built-in certification cycles by job function | `platform-administration.md` | ✅ Verified |
| No SSO federation for all user pools in default profile | `platform-administration.md` | ✅ Verified |
| Blocklist requests are currently audit-only intent logs | `operations-and-reliability.md`; `custody-settlement.md` | ✅ Verified |

### Carefully Framed / [TO VERIFY]

| Claim | Reason | Status |
|-------|--------|--------|
| "Key Guardian" as exact productized feature/module name | The DALP narrative uses this name, but no capability-mapping file reviewed here has a dedicated architecture note with that exact name | ⚠️ [TO VERIFY] |
| Exact canonical total role count across platform/system/token/custody surfaces | Sources confirm specific named roles and scopes, but not one single canonical complete role table in the reviewed material | ⚠️ [TO VERIFY] |
| Enterprise SSO / OAuth federation as broad default capability | Better Auth foundation and device auth are verified; broad SSO federation is explicitly incomplete in default profile | ⚠️ Partial / [TO VERIFY] |
| "Maker-checker" as exact term implemented everywhere in custody workflows | Narrative uses the term; capability mapping verifies approval boundaries, signer weights, requirements, approvals, and provider-side approval flows | ⚠️ Concept verified, exact universal implementation naming [TO VERIFY] |

### Notes on Auth Language

- **Verified**: session auth, API key auth, device-code auth, Better Auth integration, invitation onboarding, passkey schema persistence, wallet verification factors.
- **Not fully verified**: broad enterprise SSO across all user pools.
- **Best phrasing used in section**: Better Auth-based authentication foundation with device/OAuth-style operational flows and explicit note that full SSO federation for all user pools is not verified.

## Confidence Level

**Overall: High** for tenancy, permission projection, verification gates, audit trails, and signer/secrets architecture.

**Medium** for exact product branding around "Key Guardian" and any claim implying a fully enumerated canonical role catalog or complete enterprise SSO suite.
