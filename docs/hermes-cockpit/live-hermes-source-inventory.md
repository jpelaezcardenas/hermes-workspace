# M010 Live Hermes Source Inventory

**Milestone:** M010 — Hermes Cockpit Read Only Live Hermes Event Ingestion
**Slice/Task:** S01/T01 — Inventory safe Hermes runtime sources
**Host inspected:** Hermes/Pi
**Project root:** `/home/joe/hermes-workspace` → `/mnt/serena-hermes-workspace`
**Raw evidence summary:** `target/hermes-cockpit-m010/source-inventory-raw-summary.json`

## Safety boundary

This inventory is for **read-only** ingestion only. M010 may inspect bounded local Hermes runtime sources and generate Cockpit events, but it must not mutate Hermes sessions, GSD/Kanban state, worker queues, dispatch state, gateway state, or source logs.

Secret policy:

- Do not print, persist, or forward raw tokens, API keys, passwords, auth headers, or credential files.
- Do not store raw private transcripts in Cockpit artifacts by default.
- Prefer structural metadata, bounded summaries, redacted excerpts, event types, role/timestamp/identifier fields, and hashes/signatures.
- Treat `.env`, `config.yaml`, raw logs, raw session transcripts, and SQLite message content as sensitive even when file permissions allow reading.

## Inspection summary

A metadata-only probe inspected path existence, modes, sizes, mtimes, JSON keys, SQLite table names/counts, and command exit/status previews. It did **not** print raw session bodies, raw log lines, token values, or secret-bearing config values.

Observed surfaces:

| Source | Exists | Mode | Current shape | Initial policy | Notes |
|---|---:|---:|---|---|---|
| `~/.hermes/sessions/` | yes | `0700` | 684 files / 17+ session roots sampled | **summarize only** | Richest event source; contains raw messages, system prompt, tool calls, and tool outputs. |
| `~/.hermes/sessions/sessions.json` | yes | under sessions dir | JSON object keyed by platform/session origin | **metadata only** | Useful for active session IDs/origin routing; contains Discord/Telegram origin identifiers. |
| `~/.hermes/sessions/session_*.json` | yes | under sessions dir | JSON object keys include `session_id`, `session_start`, `last_updated`, `platform`, `model`, `message_count`, `messages`, `tools`, `system_prompt` | **bounded metadata + redacted summaries only** | Do not copy `messages` or `system_prompt` raw into Cockpit artifacts. |
| `~/.hermes/sessions/*.jsonl` | yes | under sessions dir | JSONL rows with keys like `role`, `content`, `timestamp`, `finish_reason`, `tool_calls`, `tool_call_id` | **bounded redacted transform** | Good S02 fixture/live adapter shape if we only emit role, timestamp, tool names/counts, finish state, and short redacted summaries. |
| `~/.hermes/logs/` | yes | `0700` | 37 log files sampled | **exclude raw; count/classify only** | Contains gateway/agent/error/MCP logs; likely includes prompts, exceptions, file paths, and possibly sensitive operational text. |
| `~/.hermes/logs/agent.log` | yes | under logs dir | active log, ~1.9 MB at inspection | **exclude raw** | May be useful later for error counts, not S02 primary event source. |
| `~/.hermes/logs/gateway.log` | yes | under logs dir | active log, ~1.2 MB at inspection | **exclude raw** | Could produce coarse gateway health events after strict redaction. |
| `~/.hermes/logs/errors.log` | yes | under logs dir | active log, ~1.2 MB at inspection | **exclude raw** | Candidate for future trust/error warning events, but high privacy risk. |
| `~/.hermes/logs/mcp/gsd-mcp/latest.jsonl` | yes | under logs dir | MCP tap JSONL log | **exclude raw for M010** | Useful for diagnosing GSD shared-root issues; not needed for first Hermes event adapter. |
| `~/.hermes/channel_directory.json` | yes | `0600` | JSON object keys: `platforms`, `updated_at` | **metadata only** | Useful for platform/source labels and delivery context; IDs should be treated as private metadata. |
| `~/.hermes/state.db` | yes | `0644` | SQLite tables include `sessions` and 27,233 `messages` rows plus FTS tables | **read-only metadata queries only** | Powerful but large; avoid raw `content` extraction for M010 unless separately justified and redacted. |
| `~/.hermes/kanban.db` | yes | default DB file | Kanban tables present, currently zero rows in sampled DB | **out of scope for M010** | Kanban live projection was handled by M008. |
| `~/.hermes/response_store.db` | yes | default DB file | `conversations`, `responses`, both zero rows at inspection | **low priority** | Not enough data for first adapter path. |
| `~/.hermes/config.yaml` | yes | `0600` | config file | **exclude raw** | May contain routing and tool policy; never ingest raw values into Cockpit. |
| `~/.hermes/.env` | yes | `0600` | env/secrets file | **forbidden** | Never ingest, hash only if a future safety task explicitly requires presence proof. |

## Non-mutating command probes

The probe also checked command availability/status without preserving full output:

| Command | Result | Policy |
|---|---:|---|
| `hermes gateway status` | exit `0`; gateway service active | May emit coarse `gateway_status_observed` event after redaction. |
| `hermes status` | exit `0`; status UI available | May emit coarse `hermes_status_observed` event after redaction. |
| `hermes kanban list --board hermes-cockpit-trial --json` | exit `2`; command syntax mismatch for this Hermes version | Ignore for M010; M008 adapter already covers Kanban. |

No command probe is allowed to mutate state. Future adapter commands should capture exit code, command name, redacted first-line summary, and timestamp only.

## Recommended S02 primary source

Use a **session JSONL transform** as the first live Hermes ingestion source:

```text
~/.hermes/sessions/<bounded session>.jsonl
```

Rationale:

- It already has event-like rows with role, timestamp, finish reason, and tool-call shape.
- It is append-only from Hermes' perspective, so a read-only adapter can hash the file before and after and prove non-mutation.
- It can be bounded by max rows, max summary length, allowed roles, and redaction rules.
- It maps naturally into `hermes-cockpit.event.v1` replay entries without needing direct database queries or log scraping.

For S02 tests, use a tracked synthetic fixture instead of a real transcript:

```text
tests/fixtures/hermes_cockpit/hermes-source-sample.jsonl
```

For S04 dogfood, select a recent non-secret session JSONL and emit only:

- source label
- session/run identifier
- row timestamp when present
- role
- finish reason
- tool-call names/counts, not arguments
- redacted short summary bounded to a small character limit
- content hash/signature, not raw full content
- warning events for tool errors or redaction hits

## Explicit exclusions for M010

Do **not** use these as raw Cockpit event sources in M010:

- `~/.hermes/.env`
- raw `~/.hermes/config.yaml`
- raw `~/.hermes/logs/*.log`
- raw `~/.hermes/state.db.messages.content`
- full `system_prompt` values from `session_*.json`
- full transcript message bodies or tool outputs
- any live worker queue, dispatcher, Kanban mutation API, or GSD mutation API

## Mapping candidates into Cockpit events

Initial mapping for S02/S03:

| Hermes observation | Cockpit event type | Trust default | Notes |
|---|---|---|---|
| First accepted row for a session file | `run_started` | `unknown` / `claim_only` | `run_id` can be derived from session id or source file stem. |
| Assistant text row with bounded redacted summary | `claim_observed` | `unverified` / `claim_only` | Do not treat assistant output as evidence. |
| Tool call row, by tool name only | `claim_observed` or future `tool_call_observed` if schema expands | `unknown` / `claim_only` | M010 should not store tool arguments by default. |
| Tool result row referencing a generated project artifact path | `artifact_created` | `artifact_produced` only if file exists and path is inside project or target evidence scope | Never infer human approval. |
| Error/exception/tool failure row | `trust_flagged` | `unverified` or `rejected` depending on shape | Useful for Cockpit warnings. |
| Terminal final/finish row | `run_completed` | `unknown` | Completion of a Hermes response is not task completion. |

## Source signatures for non-mutation proof

S02 and S04 should capture before/after signatures for any live source:

- path
- size
- mtime
- SHA-256 of the read source, when bounded and safe
- row count
- generated output path
- redaction count
- `source_mutated: false` verdict

Generated artifacts belong under:

```text
target/hermes-cockpit-m010/
```

## Decision for T01

Proceed to S01/T02 with the **session JSONL bounded transform** as the preferred adapter contract. Keep logs, config, `.env`, raw SQLite message content, and mutation APIs out of scope for M010. This preserves the M008 decision: GO for read-only event ingestion, NO-GO for write-back automation or live worker dispatch.
