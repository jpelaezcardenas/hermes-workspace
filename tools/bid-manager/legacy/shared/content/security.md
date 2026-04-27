# Security

## Suggested Slide Title
Security and Control Are Native to DALP

## Suggested Layout
- Primary: Slide 24 — architecture/component explanation
- Alternate: Slide 23 — evidence grid with checklist

## Key Talking Points
- RBAC, maker-checker approvals, and emergency controls are built into the operating model
- DALP orchestrates secure signing across local and external custody providers
- Auditability spans transaction history, operational workflows, and observability data
- Recovery, retry, and durable workflow patterns reduce operational failure risk

## Supporting Proof Points
- 5 defined RBAC roles are referenced in the canonical DALP narrative
- Bring-your-own-custodian model supports Fireblocks and DFNS integrations; DALP is not a custodian
- Observability stack ships with metrics, logs, and traces across VictoriaMetrics, Loki, Tempo, and Grafana
- Capability mapping currently documents 21 packaged observability dashboards and Slack alert templates
- Sources: `notion/dalp-narrative.md`, `product/dalp/capability-mapping/observability-architecture.md`, `product/dalp/capability-mapping/operations-and-reliability.md`
