# DALP Architecture

## Suggested Slide Title
DALP Sits Between Core Systems and Blockchain Networks

## Suggested Layout
- Primary: Slide 24 — architecture/components
- Alternate: Slide 20 — process flow with outcome list

## Key Talking Points
- DALP is the governance and orchestration layer between institutional systems and EVM networks
- Unifies API access, identity, compliance, transaction execution, and lifecycle services
- Designed for tenant-scoped, permission-aware, auditable operations
- Extends existing banking, custody, and risk systems instead of replacing them
- **Three-layer composability model**: DALPAsset + Token Features + Compliance Modules. One configurable contract, any instrument.

## Three-Layer Composability Architecture
The on-chain architecture follows a three-layer composability model:

1. **DALPAsset (base layer)**: Single configurable contract built on SMART Protocol (ERC-3643) + ERC-20. Replaces 7 legacy specialized types. Supports any `assetTypeName` as a free-form string.
2. **Token Features (extension layer)**: 11 runtime-pluggable features via `ISMARTFeature` interface. 6 lifecycle hooks per feature. Features with `supportsRewriting()` can modify transfer amounts in-flight. Up to 32 per token, atomic replacement via `setFeatures()`. Each feature has a factory for CREATE2 deployment.
3. **Compliance Modules (policy layer)**: 12 composable modules via `ISMARTComplianceModule`. Two-tier architecture (per-token + system-wide). RPN expression engine for arbitrary eligibility logic. Sequential evaluation with single-veto blocking.

All three layers are runtime-configurable under GOVERNANCE_ROLE. Features and compliance modules can be added, removed, and reconfigured post-deployment without redeploying the token contract.

## Supporting Proof Points
- API surface includes REST, GraphQL, event webhooks, and oRPC references in the canonical narrative
- Supports public and private EVM-compatible networks
- Observability and operational control are productized, not left to ad hoc tooling
- Sources: `notion/dalp-narrative.md`, `product/dalp/capability-mapping/dapi-middleware-architecture.md`, `product/dalp/capability-mapping/services-architecture.md`, `product/dalp/composability.md`
