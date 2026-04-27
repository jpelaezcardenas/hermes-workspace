# Verification Notes: 03 Integrations

## Source Grounding

### Verified Against Source Material

| Claim | Source | Status |
|-------|--------|--------|
| Two-endpoint auth model (RPC sessions-only, REST API-key) | `platform-administration.md`: PR #6242 evidence | ✅ Verified |
| API keys blocked on RPC endpoint with FORBIDDEN | `platform-administration.md`: `session.middleware.ts` | ✅ Verified |
| HTTP-method-based scope enforcement on REST | `platform-administration.md`: `scope-enforcement.ts` | ✅ Verified |
| SDK routes to `/api/v2` not `/api/rpc` | `sdk-integration-architecture.md`: `kit/sdk/scripts/client.ts` | ✅ Verified |
| SDK published as `@settlemint/dalp-sdk`, public, ESM, Node 20+ | `sdk-integration-architecture.md`: `package.json` | ✅ Verified |
| SDK exposes 15 namespaces (account, actions, addons, etc.) | `sdk-integration-architecture.md`: `types.ts` | ✅ Verified |
| SDK security headers applied last (can't override auth) | `sdk-integration-architecture.md`: source deep read | ✅ Verified |
| SDK Dnum/bigint/Date serializers | `sdk-integration-architecture.md`: `serializers.ts` | ✅ Verified |
| CLI: 301 commands, 26 groups | `platform-administration.md`: `main.ts` evidence | ✅ Verified |
| CLI device-code auth with Keychain storage | `platform-administration.md`: `login.ts`, `credential-store.ts` | ✅ Verified |
| CLI monitoring streaming (logs-stream, snapshots-stream) | `platform-administration.md`: `monitoring.ts` evidence | ✅ Verified |
| Custom PostgreSQL indexer replacing TheGraph | `indexer-v2.md` | ✅ Verified |
| Genesis Directory Discovery | `indexer-v2.md`: PR #5664 | ✅ Verified |
| Reorg detection and rollback | `indexer-v2.md`: PR #6058 | ✅ Verified |
| Zero-downtime reindexing with schema isolation | `indexer-v2.md`: PR #6213 | ✅ Verified |
| 18 PostgreSQL analytics views across 5 domains | `analytics-and-reporting.md`: PRD-5055 | ✅ Verified |
| Event latency <5s | `analytics-and-reporting.md` | ✅ Verified |
| TheGraph deprecation phases (1-4) | `analytics-and-reporting.md`: PRD-4926 | ✅ Verified |
| Custody: Local, DFNS, Fireblocks backends | `services-architecture.md`: signer service; `custody-settlement.md` | ✅ Verified |
| DFNS: list + resolve approvals; Fireblocks: list only | `compliance-and-identity.md`: 2026-03-11 evidence | ✅ Verified |
| Transaction Processor: partition-locked Restate virtual object | `services-architecture.md` | ✅ Verified |
| Nonce manager: self-healing, operator repair surfaces | `services-architecture.md` | ✅ Verified |
| Feeds API: unified data feed layer, async mutations | `feeds.md`: PR #6287, #6290, #6292 | ✅ Verified |
| Feed submission via EIP-712 signing through Restate | `feeds.md`: `feeds.submit.shared.ts` | ✅ Verified |
| Secrets management: encrypted DB, Conjur, env vars | `secrets-management.md`: PRs #5493, #5501, #5700, #5824 | ✅ Verified |
| 534 contract error codes with i18n (4 locales) | `operations-and-reliability.md`: PRs #6309, #6308, #6300 | ✅ Verified |
| Middleware chain: session → auth → org role sync → system → token → wallet verification → tx queue | `dapi-middleware-architecture.md` | ✅ Verified |
| Async transaction pipeline: 11-state lifecycle | `operations-and-reliability.md` | ✅ Verified |
| XvP settlement: local + HTLC cross-chain | `custody-settlement.md`; `dalp-narrative.md` | ✅ Verified |
| Exchange rates from open.er-api.com, manual overrides | `platform-administration.md`: exchange rates evidence | ✅ Verified |
| Observability: 21 dashboard JSONs, Grafana/VictoriaMetrics/Loki/Tempo/Alloy | `observability-architecture.md` | ✅ Verified |
| DALP-specific telemetry: tx.submit/sign/broadcast/confirm spans | `observability-architecture.md`: transaction-processor telemetry | ✅ Verified |
| Indexer metrics families (blocks_processed, block_lag, etc.) | `observability-architecture.md`: `metrics.ts` | ✅ Verified |
| API metrics redaction (cookies, auth, API keys, sensitive body keys) | `observability-architecture.md`: `api-metrics-redact.ts` | ✅ Verified |
| OTLP receivers on 4317 (gRPC) and 4318 (HTTP) | `observability-architecture.md`: values.yaml | ✅ Verified |
| OpenShift Route support | `observability-architecture.md`: `grafana-route.yaml` | ✅ Verified |

### Items from Narrative (Not Code-Verified)

| Claim | Source | Status |
|-------|--------|--------|
| ISO 20022 integration for SWIFT/SEPA/RTGS | `dalp-narrative.md`: listed in platform foundations | ⚠️ Narrative-level claim; architecture supports it via API integration, no dedicated ISO 20022 codec found in capability mapping |
| Deployment models (SaaS, dedicated cloud, on-prem, hybrid) | `dalp-narrative.md`: deployment flexibility section | ✅ Verified at narrative level; Helm charts confirmed in `observability-architecture.md` |

### Gaps Noted

- ISO 20022: The narrative claims ISO 20022 support for SWIFT/SEPA/RTGS connectivity. The capability mapping confirms API-first architecture that could support this, but no dedicated ISO 20022 message parser/generator was found in the capability mapping files. The integration is likely handled at the API/middleware layer or through partner integrations.
- Real-time event streaming (WebSocket-based push to browsers) is in design phase, not yet implemented.
- Materialized view refresh scheduler not yet implemented (manual refresh via psql).
- No automated regulatory export pipelines (manual CSV export only).

## Confidence Level

**Overall: High**: core integration architecture claims (DAPI, SDK, CLI, indexer, custody, feeds, observability) are all grounded in capability mapping evidence with code-level verification. ISO 20022 and some ERP integration patterns are narrative-level claims.
