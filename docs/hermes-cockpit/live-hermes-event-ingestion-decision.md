# Live Hermes Event Ingestion Decision — M010/S04

**Decision:** GO — continue the read-only Hermes event ingestion path for Cockpit.

**Date:** 2026-05-17T20:05:12Z
**Milestone:** M010 — Hermes Cockpit Read Only Live Hermes Event Ingestion
**Dogfood source:** `20260517_145048_a0e5d5.jsonl` selected as the latest stable `~/.hermes/sessions/*.jsonl` file older than 300 seconds.
**Mode:** bounded, explicit, read-only source transform.

## Evidence Summary

- Read-only: `True`
- Source mutated: `False`
- Event count: `2`
- Adapter rows seen: `1`
- Adapter events emitted: `2`
- Redaction count: `0`
- Dropped count: `0`
- Smoke verdict: `pass`
- Secret-like output scan: `pass`
- Raw tool result body excluded: `True`
- Redaction placeholders omit secret field labels: `True`
- Output/evidence/source collision rejected by CLI: `True`
- Event IDs stable across wall-clock seconds: `True`
- Token, Authorization Bearer, and JSON secret keys redacted: `True`

Projection counts:

| Surface | Count |
|---|---:|
| Cards | 0 |
| Replay rows | 2 |
| Active runs | 1 |
| Completed runs | 0 |
| Artifacts | 0 |
| Warnings | 0 |

Evidence artifacts:

- `target/hermes-cockpit-m010/live-hermes-events.ndjson`
- `target/hermes-cockpit-m010/live-adapter-evidence.json`
- `target/hermes-cockpit-m010/live-hermes-projection.json`
- `target/hermes-cockpit-m010/live_hermes_dogfood.smoke.txt`
- `target/hermes-cockpit-m010/dogfood-summary.json`

## What the GO Means

The bounded live dogfood proves Cockpit can ingest an explicitly selected Hermes session JSONL source, sanitize it into `hermes-cockpit.event.v1` events, project those events, and render the projection without mutating the source file.

This is enough to continue with read-only Cockpit ingestion work in a follow-up milestone, especially around better safe source selectors and explicit task metadata feeds.

## Review Tightening After Independent Evaluation

Independent review found in-scope hardening gaps, and they were fixed before this decision was reconfirmed:

1. The CLI now rejects output/evidence paths that collide with the source input, collide with each other, or write inside the Hermes runtime directory.
2. Redaction coverage now includes Slack-style `xox...` tokens, token key/value pairs, Authorization Bearer values, JSON-style secret key/value forms, and long base64-ish credential strings.
3. Redaction placeholders no longer preserve secret field labels such as password/token assignments.
4. Synthetic run-start event IDs now use deterministic source metadata rather than wall-clock time, so event IDs are stable across wall-clock seconds for the same source and bounds.

The validation suite includes regression coverage for these points.

## Limitation Observed

The selected live session source did not include explicit `task_id` / `task_title` metadata, so live dogfood rendered replay/run surfaces but **0 cards**. This is expected under the S03 rule: Cockpit must not invent cards from arbitrary transcript text.

Future live-card work needs a safe source that explicitly supplies task metadata, or a separate user-approved mapping contract.

## Privacy Finding and Fix

Initial dogfood showed raw JSON-like tool result bodies could reach event summaries. Before accepting the dogfood result, a RED regression test was added and the adapter was changed so tool result rows emit only bounded summaries like `Observed Hermes tool result from <tool>.` The raw body is excluded from Cockpit output, while content hashes and redaction/drop counts remain available as evidence.

## Non-Claims

- **No write-back automation** was implemented or approved.
- **No live worker dispatch** was implemented or approved.
- **No production-readiness claim** is made.
- Assistant/user/tool observations remain claims unless separately verified.
- Response completion remains a response boundary, not task completion.

## Decision Rationale

GO is appropriate because the live source signature matched before and after, the adapter evidence reports read-only behavior, the Cockpit smoke passed, privacy guardrails were tightened based on dogfood and independent review evidence, output/evidence/source collisions are rejected, redaction covers the explicit contract classes, and event IDs are deterministic for replay/correlation. The zero-card live result is not a failure of ingestion; it is a source-contract limitation that correctly prevents invented cards.

## Follow-Up Recommendation

Plan the next Cockpit milestone around one of these scoped read-only lanes:

1. A safe explicit task-metadata feed for live cards.
2. A richer read-only source selector that avoids broad session scanning and captures stable source signatures.
3. Additional UI affordances for replay-only Hermes sessions that have no card metadata.

Write-back, dispatch, and production operation should remain out of scope unless Joe explicitly approves them.
