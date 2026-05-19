#!/usr/bin/env python3
"""Watermark-dedup Cockpit watcher adapter for M011.

Safety posture:
- Watches an explicit JSONL source path only.
- First run baselines existing rows and emits nothing.
- Subsequent no-change runs emit no events and print nothing.
- Changes emit bounded Cockpit events with source bodies excluded.
- State stores line_count plus bounded watermark IDs.
- No direct write-back, worker dispatch, or public agent loop is performed.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

EVENT_SCHEMA_VERSION = "hermes-cockpit.event.v1"
STATE_SCHEMA_VERSION = "hermes-cockpit.watcher-state.v1"
EVIDENCE_SCHEMA_VERSION = "hermes-cockpit.watcher-evidence.v1"
DEFAULT_OUTPUT_LIMIT_CHARS = 500
DEFAULT_MAX_WATERMARK_IDS = 500


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def short_hash(value: Any) -> str:
    encoded = json.dumps(value, sort_keys=True, separators=(",", ":"), default=str).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()[:12]


def truncate(value: str, limit: int) -> str:
    if len(value) <= limit:
        return value
    return value[: max(0, limit - 1)] + "…"


def is_relative_to(child: Path, parent: Path) -> bool:
    try:
        child.relative_to(parent)
    except ValueError:
        return False
    return True


def validate_paths(source_path: Path, state_path: Path, events_output: Path, evidence_output: Path) -> None:
    source = source_path.expanduser().resolve(strict=False)
    state = state_path.expanduser().resolve(strict=False)
    events = events_output.expanduser().resolve(strict=False)
    evidence = evidence_output.expanduser().resolve(strict=False)
    hermes_runtime = (Path.home() / ".hermes").resolve(strict=False)

    pairs = {
        "source/state": (source, state),
        "source/events": (source, events),
        "source/evidence": (source, evidence),
        "events/evidence": (events, evidence),
        "state/events": (state, events),
        "state/evidence": (state, evidence),
    }
    for label, (left, right) in pairs.items():
        if left == right:
            raise ValueError(f"refusing watcher path collision for {label}: {left}")
    for label, candidate in (("events", events), ("evidence", evidence)):
        if is_relative_to(candidate, hermes_runtime):
            raise ValueError(f"refusing to write generated {label} inside Hermes runtime directory: {candidate}")


def load_rows(source_path: Path) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    if not source_path.exists():
        return rows
    with source_path.open("r", encoding="utf-8-sig") as handle:
        for line_number, raw_line in enumerate(handle, start=1):
            line = raw_line.strip()
            if not line:
                continue
            try:
                parsed = json.loads(line)
            except json.JSONDecodeError:
                parsed = {"id": f"malformed-line-{line_number}", "payload": {"summary": "malformed JSON row excluded"}}
            if not isinstance(parsed, dict):
                parsed = {"id": f"non-object-line-{line_number}", "payload": {"summary": "non-object JSON row excluded"}}
            parsed["_line_number"] = line_number
            rows.append(parsed)
    return rows


def row_id(row: dict[str, Any]) -> str:
    for key in ("operation_id", "id", "event_id"):
        value = row.get(key)
        if isinstance(value, str) and value:
            return value
    return f"row-{row.get('_line_number', 'unknown')}-{short_hash(row)}"


def row_summary(row: dict[str, Any], limit: int) -> str:
    payload = row.get("payload") if isinstance(row.get("payload"), dict) else {}
    candidates = [payload.get("summary"), row.get("summary"), row.get("operation_type"), row_id(row)]
    for candidate in candidates:
        if isinstance(candidate, str) and candidate.strip():
            return truncate(candidate.strip().replace("\n", " "), limit)
    return truncate(row_id(row), limit)


def row_target_id(row: dict[str, Any]) -> str | None:
    target = row.get("target") if isinstance(row.get("target"), dict) else {}
    value = target.get("id")
    return value if isinstance(value, str) and value else None


def load_state(state_path: Path) -> dict[str, Any] | None:
    if not state_path.exists():
        return None
    try:
        parsed = json.loads(state_path.read_text(encoding="utf-8"))
    except Exception:
        return None
    return parsed if isinstance(parsed, dict) else None


def save_state(state_path: Path, *, watcher_id: str, line_count: int, ids: list[str], max_watermark_ids: int) -> None:
    state_path.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "schema_version": STATE_SCHEMA_VERSION,
        "watcher_id": watcher_id,
        "line_count": line_count,
        "seen_ids": ids[-max_watermark_ids:],
        "updated_at": utc_now(),
    }
    state_path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def make_event(*, sequence: int, watcher_id: str, source_path: Path, row: dict[str, Any], output_limit_chars: int) -> dict[str, Any]:
    rid = row_id(row)
    summary = row_summary(row, output_limit_chars)
    task_id = row_target_id(row)
    basis = {"watcher_id": watcher_id, "row_id": rid, "line": row.get("_line_number")}
    return {
        "id": f"evt_watcher_{short_hash(basis)}",
        "ts": utc_now(),
        "schema_version": EVENT_SCHEMA_VERSION,
        "source": "hermes-cockpit-watch",
        "event_type": "watcher_change_observed",
        "actor": "watcher",
        "task_id": task_id,
        "run_id": watcher_id,
        "agent_id": None,
        "artifact_uri": None,
        "evidence_uri": f"file://watcher-evidence.json#row_id={rid}",
        "trust": {
            "status": "observed",
            "evidence_state": "watcher_watermark",
            "confidence": 0.8,
            "reason": "Observed by M011 watermark watcher from explicit JSONL source path.",
        },
        "payload": {
            "watcher_id": watcher_id,
            "source_path": str(source_path),
            "row_id": rid,
            "source_line": row.get("_line_number"),
            "summary": summary,
            "source_body_excluded": True,
        },
        "replay": {
            "stream": f"watcher:{watcher_id}",
            "sequence": sequence,
            "visible": True,
            "checkpoint": False,
            "summary": summary,
            "caused_by": rid,
        },
    }


def watch_jsonl_source(
    source_path: str | Path,
    state_path: str | Path,
    watcher_id: str,
    output_limit_chars: int = DEFAULT_OUTPUT_LIMIT_CHARS,
    max_watermark_ids: int = DEFAULT_MAX_WATERMARK_IDS,
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    source = Path(source_path)
    state = Path(state_path)
    rows = load_rows(source)
    ids = [row_id(row) for row in rows]
    previous = load_state(state)
    previous_line_count = int(previous.get("line_count", 0)) if previous else 0
    first_run = previous is None
    truncated = previous_line_count > len(rows)

    if first_run or truncated:
        save_state(state, watcher_id=watcher_id, line_count=len(rows), ids=ids, max_watermark_ids=max_watermark_ids)
        status = "baseline" if first_run else "baseline_after_truncate"
        evidence = evidence_payload(
            watcher_id=watcher_id,
            source=source,
            state=state,
            status=status,
            changed=False,
            emitted_count=0,
            line_count_before=previous_line_count,
            line_count_after=len(rows),
            max_watermark_ids=max_watermark_ids,
            new_ids=[],
        )
        return [], evidence

    new_rows = rows[previous_line_count:]
    events = [
        make_event(sequence=index, watcher_id=watcher_id, source_path=source, row=row, output_limit_chars=output_limit_chars)
        for index, row in enumerate(new_rows, start=1)
    ]
    save_state(state, watcher_id=watcher_id, line_count=len(rows), ids=ids, max_watermark_ids=max_watermark_ids)
    new_ids = [row_id(row) for row in new_rows]
    changed = bool(new_rows)
    evidence = evidence_payload(
        watcher_id=watcher_id,
        source=source,
        state=state,
        status="changed" if changed else "no_change",
        changed=changed,
        emitted_count=len(events),
        line_count_before=previous_line_count,
        line_count_after=len(rows),
        max_watermark_ids=max_watermark_ids,
        new_ids=new_ids,
    )
    return events, evidence


def evidence_payload(
    *,
    watcher_id: str,
    source: Path,
    state: Path,
    status: str,
    changed: bool,
    emitted_count: int,
    line_count_before: int,
    line_count_after: int,
    max_watermark_ids: int,
    new_ids: list[str],
) -> dict[str, Any]:
    return {
        "schema_version": EVIDENCE_SCHEMA_VERSION,
        "watcher_id": watcher_id,
        "source_path": str(source),
        "state_path": str(state),
        "status": status,
        "changed": changed,
        "emitted_count": emitted_count,
        "line_count_before": line_count_before,
        "line_count_after": line_count_after,
        "new_ids": new_ids,
        "watermark_ids_count": min(line_count_after, max_watermark_ids),
        "max_watermark_ids": max_watermark_ids,
        "created_at": utc_now(),
        "non_claims": {
            "no_direct_writeback": True,
            "no_worker_dispatch": True,
            "no_public_agent_loop": True,
            "no_production_readiness": True,
        },
    }


def remove_state(state_path: str | Path, watcher_id: str) -> dict[str, Any]:
    path = Path(state_path)
    existed = path.exists()
    if existed:
        path.unlink()
    return {
        "schema_version": EVIDENCE_SCHEMA_VERSION,
        "watcher_id": watcher_id,
        "state_path": str(path),
        "status": "state_removed",
        "state_removed": existed,
        "created_at": utc_now(),
        "non_claims": {
            "no_direct_writeback": True,
            "no_worker_dispatch": True,
            "no_public_agent_loop": True,
            "no_production_readiness": True,
        },
    }


def write_events(path: Path, events: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        for event in events:
            handle.write(json.dumps(event, sort_keys=True, separators=(",", ":")) + "\n")


def write_evidence(path: Path, evidence: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(evidence, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run a bounded Hermes Cockpit JSONL watcher")
    parser.add_argument("--source", required=True, type=Path, help="JSONL source path to watch")
    parser.add_argument("--state", required=True, type=Path, help="Watcher state/watermark JSON path")
    parser.add_argument("--events-output", required=True, type=Path, help="Generated Cockpit event NDJSON path")
    parser.add_argument("--evidence-output", required=True, type=Path, help="Generated watcher evidence JSON path")
    parser.add_argument("--watcher-id", required=True, help="Stable watcher ID")
    parser.add_argument("--output-limit-chars", type=int, default=DEFAULT_OUTPUT_LIMIT_CHARS)
    parser.add_argument("--max-watermark-ids", type=int, default=DEFAULT_MAX_WATERMARK_IDS)
    parser.add_argument("--remove-state", action="store_true", help="Remove watcher state instead of polling source")
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        validate_paths(args.source, args.state, args.events_output, args.evidence_output)
        if args.remove_state:
            evidence = remove_state(args.state, args.watcher_id)
            events: list[dict[str, Any]] = []
        else:
            events, evidence = watch_jsonl_source(
                args.source,
                args.state,
                args.watcher_id,
                output_limit_chars=args.output_limit_chars,
                max_watermark_ids=args.max_watermark_ids,
            )
        write_events(args.events_output, events)
        write_evidence(args.evidence_output, evidence)
    except ValueError as exc:
        print(f"refusing watcher operation: {exc}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
