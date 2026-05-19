# M010 Live Hermes Event Ingestion Contract

**Milestone:** M010 — Hermes Cockpit Read Only Live Hermes Event Ingestion
**Slice/Task:** S01/T02 — Define Hermes event ingestion contract
**Schema target:** `hermes-cockpit.event.v1`
**Primary source selected by S01/T01:** bounded session JSONL transform from `~/.hermes/sessions/*.jsonl`

## Purpose

This contract defines how M010 converts bounded Hermes runtime observations into the existing Cockpit event spine. It is intentionally conservative: Hermes Cockpit remains a read-only projection surface and must not mutate Hermes, GSD, Kanban, session files, logs, worker queues, or dispatcher state.

M010 proves read-only live event ingestion only. It makes **no write-back**, **no live worker dispatch**, and **no production-readiness** claim.

## Source selection

### Primary source for S02/S03

```text
~/.hermes/sessions/<bounded-session>.jsonl
```

Allowed source record shapes are JSONL rows with structural fields such as:

- `role`
- `timestamp`
- `finish_reason`
- `tool_calls`
- `tool_call_id`
- `content`

The adapter may parse these fields but must not preserve raw `content` by default. Content-derived output must be bounded, redacted, and summarized.

### Test fixture source

```text
tests/fixtures/hermes_cockpit/hermes-source-sample.jsonl
```

The fixture must be synthetic and non-secret. It should represent the source shape without copying real private transcript text.

### Explicitly excluded raw sources

The adapter must not ingest these as raw Cockpit content in M010:

- `~/.hermes/.env`
- raw `~/.hermes/config.yaml`
- raw `~/.hermes/logs/*.log`
- raw `~/.hermes/state.db.messages.content`
- full `system_prompt` values from `session_*.json`
- full transcript message bodies
- full tool outputs
- live worker queues, dispatcher APIs, Kanban mutation APIs, or GSD mutation APIs

## Event identity rules

Every emitted event must include a stable `id`.

Recommended format:

```text
evt_hermes_<source_slug>_<row_index>_<short_hash>
```

Where:

- `source_slug` is derived from the input file stem or explicit `--source-label`, normalized to `[a-z0-9_-]`.
- `row_index` is the zero-based row number in the bounded source read.
- `short_hash` is the first 10-12 hex characters of SHA-256 over the sanitized event basis, not raw secret content.

The same input file and bounds should produce deterministic event IDs.

## Run and session correlation

Map one bounded source file to a Cockpit run/session correlation:

| Cockpit field | Mapping |
|---|---|
| `run_id` | `run_hermes_<source_slug>` unless an explicit source session id is available. |
| `task_id` | Existing GSD/Kanban task id if explicitly present in sanitized content or CLI metadata; otherwise `null`. Do not infer task completion. |
| `agent_id` | `migi`, `hermes-agent`, `tool:<tool_name>`, or `null` depending on role/tool-call shape. |
| `actor` | `Joe` for user role, `Migi` for assistant role, `tool:<name>` for tool-call/tool-result rows, or `system` for runtime/status observations. |

The adapter may emit a synthetic `run_started` for the first accepted row and `run_completed` for a terminal assistant row with a finish reason, but this only means the Hermes response/session segment ended. It does **not** mean the GSD task or Kanban card is complete.

## Allowed top-level field mapping

All emitted records must conform to `hermes-cockpit.event.v1`:

| Field | Required mapping |
|---|---|
| `id` | Deterministic event id from event identity rules. |
| `ts` | Row `timestamp` if valid; otherwise source file mtime or adapter run UTC timestamp. |
| `schema_version` | Always `hermes-cockpit.event.v1`. |
| `source` | `hermes`. |
| `event_type` | One of the approved event type mappings below. |
| `actor` | From role/tool/status mapping. |
| `task_id` | Explicit known task id only; otherwise `null`. |
| `run_id` | Derived run/session id. |
| `agent_id` | Derived agent/tool id where available. |
| `artifact_uri` | Only project-local or target evidence artifact URI after path validation; otherwise `null`. |
| `evidence_uri` | Redacted source URI such as `file://~/.hermes/sessions/<file>#row=<n>`; do not include raw secret values. |
| `trust` | Trust defaults below. |
| `payload` | Sanitized event-specific metadata. |
| `replay` | Replay metadata below. |

## Event type mapping

| Hermes observation | Cockpit `event_type` | Required payload keys | Notes |
|---|---|---|---|
| First accepted row for source file | `run_started` | `source_label`, `source_kind`, `row_count_bound` | Emits one per adapter run/source file. |
| Assistant response row with bounded redacted summary | `claim_observed` | `summary`, `role`, `content_hash`, `redacted` | Assistant text is a claim, not proof. |
| User request row with bounded redacted summary | `claim_observed` | `summary`, `role`, `content_hash`, `redacted` | Useful for context; do not overexpose private text. |
| Tool-call row | `claim_observed` | `tool_names`, `tool_call_count`, `arguments_excluded` | Store tool names/counts only, not raw arguments. |
| Tool-result row referencing a safe project artifact | `artifact_created` | `artifact_name`, `artifact_kind`, `summary` | Only if artifact path is project-local/target and exists. |
| Tool result or assistant row containing an error/failure marker | `trust_flagged` | `severity`, `summary`, `action` | Used for Cockpit warning panel. |
| Terminal assistant row with `finish_reason` | `run_completed` | `status`, `outcome` | This is response/session completion, not task completion. |
| Redaction hit or dropped unsafe field | `trust_flagged` | `severity`, `summary`, `action`, `redaction_count` | Makes privacy filtering visible without leaking content. |

If an observation cannot be safely summarized, the adapter should drop it and increment `dropped_count` in evidence JSON rather than emitting unsafe content.

## Trust defaults

| Event type | `trust.status` | `trust.evidence_state` | Reason pattern |
|---|---|---|---|
| `run_started` | `unknown` | `claim_only` | Source segment started; no evidence conclusion. |
| `claim_observed` | `unverified` | `claim_only` | Transcript text or tool-call shape was observed but not verified. |
| `artifact_created` | `unverified` or `verified` | `artifact_produced` | `verified` only means the artifact exists at a safe path; it does not validate semantic truth. |
| `trust_flagged` | `unverified` or `rejected` | `claim_only` | Use `rejected` only when the adapter can prove the row is unsafe or malformed. |
| `run_completed` | `unknown` | `claim_only` | Response/session ended; no task-state conclusion. |

The adapter must never convert positive assistant prose into `human_approved` or task completion.

## Replay metadata rules

Every event must include:

```json
{
  "stream": "hermes-live-ingestion",
  "sequence": 1,
  "visible": true,
  "checkpoint": false,
  "summary": "Observed bounded Hermes assistant claim.",
  "caused_by": null
}
```

Rules:

- `stream` defaults to the CLI `--source-label`, e.g. `hermes-live-ingestion`.
- `sequence` is monotonic within emitted events after filtering.
- `visible` defaults to `true` for accepted events.
- `checkpoint` is `true` for synthetic `run_started` and final `run_completed`; otherwise `false`.
- `summary` is a one-line, redacted, bounded string. Recommended max: 160 characters.
- `caused_by` may point at the synthetic `run_started` id for later events from the same source, otherwise `null`.

## Redaction rules

The adapter must redact before writing NDJSON, projection JSON, evidence JSON, or logs.

Minimum redaction patterns:

- API-key-like strings beginning with known prefixes such as `sk-`, `xox`, `ghp_`, `github_pat_`, `hf_`, `AIza`, `eyJ` JWT-like tokens.
- Long hex/base64-ish secrets: contiguous credential-like strings of 32+ characters.
- `Authorization`, `token`, `api_key`, `password`, `secret`, `client_secret`, and similar key-value pairs.
- Full local secret paths such as `.env` values; path names may be mentioned, values must not.

Use placeholders:

```text
[REDACTED_SECRET]
[REDACTED_TOKEN]
[REDACTED_LONG_VALUE]
```

Evidence JSON must include counts:

```json
{
  "redaction_count": 0,
  "dropped_count": 0
}
```

## Bounds and limits

Default adapter bounds:

| Bound | Default | Rationale |
|---|---:|---|
| `--limit` | 100 rows | Prevent large transcript dumps. |
| `--summary-max-chars` | 160 | Keep replay rows readable and private. |
| `--max-tool-names` | 20 | Keep payloads bounded. |
| `--max-artifacts` | 20 | Avoid scanning arbitrary output. |
| `--allow-raw-content` | unavailable in M010 | M010 should not expose raw content. |

If bounds are exceeded, emit a `trust_flagged` event or evidence warning rather than silently pretending the source was fully ingested.

## Artifact and evidence URI rules

Allowed artifact URIs:

- `file://docs/...`
- `file://target/hermes-cockpit-m010/...`
- `file://prototypes/hermes-cockpit/...` only for generated smoke/test artifacts when explicitly produced by this milestone

Disallowed artifact URIs:

- `file://~/.hermes/.env`
- `file://~/.hermes/config.yaml`
- raw session file paths as artifacts
- arbitrary absolute paths outside the project unless represented as redacted evidence URI only

Evidence URI for source rows should use a non-secret pointer:

```text
file://~/.hermes/sessions/<session-file>#row=<n>
```

Do not embed the row content in the URI.

## Non-mutation proof

For any live source, write evidence JSON under:

```text
target/hermes-cockpit-m010/adapter-evidence.json
```

Required fields:

```json
{
  "source_path": "~/.hermes/sessions/example.jsonl",
  "source_kind": "hermes-session-jsonl",
  "read_only": true,
  "before": {
    "size": 0,
    "mtime": "",
    "sha256": ""
  },
  "after": {
    "size": 0,
    "mtime": "",
    "sha256": ""
  },
  "source_mutated": false,
  "rows_seen": 0,
  "events_emitted": 0,
  "redaction_count": 0,
  "dropped_count": 0,
  "warnings": []
}
```

`source_mutated` must be computed by comparing before/after signatures after the adapter closes the input file.

## CLI contract for S02

Planned adapter:

```bash
python3 scripts/hermes-cockpit-hermes-events.py \
  --input tests/fixtures/hermes_cockpit/hermes-source-sample.jsonl \
  --output target/hermes-cockpit-m010/hermes-events.ndjson \
  --evidence target/hermes-cockpit-m010/adapter-evidence.json \
  --source-label hermes-fixture \
  --limit 100
```

For live dogfood, the input path must be explicit or selected by a documented safe selector. Do not scan every session file by default.

## Non-claims preserved

M010 does not prove or enable:

- no write-back to Hermes, GSD, or Kanban
- no live worker dispatch
- no live queue claim or worker assignment
- no production-readiness
- no semantic truth validation of assistant claims
- no human approval unless an explicit future `approval_recorded` source exists

M010 only proves that bounded Hermes runtime observations can be converted into a read-only Cockpit projection with redaction, correlation, and non-mutation evidence.

## S02 handoff

S02 should start with RED tests for:

1. fixture JSONL conversion into `hermes-cockpit.event.v1` records,
2. deterministic event IDs,
3. redaction and redaction counts,
4. bounded row limiting,
5. malformed input behavior,
6. before/after source signature comparison, and
7. no raw tool arguments or secret-like content in emitted NDJSON.
