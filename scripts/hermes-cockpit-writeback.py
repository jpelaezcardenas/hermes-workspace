#!/usr/bin/env python3
"""Gated Cockpit write-back adapter for M011.

Safety posture:
- Accepts explicit `hermes-cockpit.operation.v1` JSONL only.
- Supports bounded `writeback.task_comment` mutation through Hermes Kanban CLI.
- Requires dry-run evidence before apply.
- Emits sanitized Cockpit events plus JSON evidence.
- Uses subprocess argument lists only; never shells raw operation payloads.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable, Iterable

OPERATION_SCHEMA_VERSION = "hermes-cockpit.operation.v1"
EVENT_SCHEMA_VERSION = "hermes-cockpit.event.v1"
SUPPORTED_APPLY_OPERATIONS = {"writeback.task_comment"}
DEFAULT_MAX_COMMENT_CHARS = 500


class CommandResult:
    def __init__(self, stdout: str = "", stderr: str = "", returncode: int = 0) -> None:
        self.stdout = stdout
        self.stderr = stderr
        self.returncode = returncode


Runner = Callable[[list[str]], Any]


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def short_hash(value: Any) -> str:
    encoded = json.dumps(value, sort_keys=True, separators=(",", ":"), default=str).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()[:12]


def load_operations(path: str | Path) -> list[dict[str, Any]]:
    operations: list[dict[str, Any]] = []
    source_path = Path(path)
    with source_path.open("r", encoding="utf-8-sig") as handle:
        for line_number, raw_line in enumerate(handle, start=1):
            line = raw_line.strip()
            if not line:
                continue
            try:
                parsed = json.loads(line)
            except json.JSONDecodeError as exc:
                raise ValueError(f"line {line_number}: invalid operation JSON: {exc}") from exc
            if not isinstance(parsed, dict):
                raise ValueError(f"line {line_number}: operation must be a JSON object")
            parsed.setdefault("_source_line", line_number)
            operations.append(parsed)
    return operations


def is_relative_to(child: Path, parent: Path) -> bool:
    try:
        child.relative_to(parent)
    except ValueError:
        return False
    return True


def validate_generated_output_paths(operations_path: Path, events_output: Path, evidence_output: Path) -> None:
    source = operations_path.expanduser().resolve(strict=False)
    events = events_output.expanduser().resolve(strict=False)
    evidence = evidence_output.expanduser().resolve(strict=False)
    hermes_runtime = (Path.home() / ".hermes").resolve(strict=False)

    if events == evidence:
        raise ValueError(f"refusing to use the same path for events and evidence: {events_output}")
    for label, candidate in (("events", events), ("evidence", evidence)):
        if candidate == source:
            raise ValueError(f"refusing to write {label} output over source operations: {operations_path}")
        if is_relative_to(candidate, hermes_runtime):
            raise ValueError(f"refusing to write generated {label} inside Hermes runtime directory: {candidate}")


def run_subprocess(args: list[str]) -> CommandResult:
    completed = subprocess.run(args, text=True, capture_output=True, check=False)
    return CommandResult(stdout=completed.stdout, stderr=completed.stderr, returncode=completed.returncode)


def result_stdout(result: Any) -> str:
    return str(getattr(result, "stdout", "") or "")


def result_stderr(result: Any) -> str:
    return str(getattr(result, "stderr", "") or "")


def result_returncode(result: Any) -> int:
    try:
        return int(getattr(result, "returncode", 0))
    except Exception:
        return 1


def parse_show_output(stdout: str, target_id: str) -> dict[str, Any]:
    text = stdout.strip()
    parsed: Any = None
    if text:
        try:
            parsed = json.loads(text)
        except json.JSONDecodeError:
            parsed = None

    if isinstance(parsed, dict):
        task = parsed.get("task") if isinstance(parsed.get("task"), dict) else parsed
        top_level_comments = parsed.get("comments")
        task_comments = task.get("comments") if isinstance(task, dict) else None
        if isinstance(top_level_comments, list):
            comments = len(top_level_comments)
        elif isinstance(top_level_comments, int):
            comments = top_level_comments
        elif isinstance(task_comments, list):
            comments = len(task_comments)
        elif isinstance(task_comments, int):
            comments = task_comments
        else:
            events = parsed.get("events") if isinstance(parsed.get("events"), list) else []
            comments = sum(
                1
                for item in events
                if isinstance(item, dict) and str(item.get("type") or item.get("kind") or "").lower() == "comment"
            )
        status = task.get("status") if isinstance(task, dict) else parsed.get("status")
        title = task.get("title") if isinstance(task, dict) else parsed.get("title")
        return {
            "id": str(task.get("id", target_id)) if isinstance(task, dict) else target_id,
            "comments": int(comments),
            "status": str(status) if status is not None else None,
            "title": str(title) if title is not None else None,
            "signature": short_hash(parsed),
        }

    lowered = text.lower()
    comments = lowered.count("comment")
    return {
        "id": target_id,
        "comments": comments,
        "status": None,
        "title": None,
        "signature": hashlib.sha256(text.encode("utf-8", errors="replace")).hexdigest()[:12],
    }


def make_event(
    *,
    sequence: int,
    event_type: str,
    operation: dict[str, Any],
    board: str,
    status: str,
    target_mutated: bool,
    rejection_reasons: list[str] | None = None,
) -> dict[str, Any]:
    target = operation.get("target") if isinstance(operation.get("target"), dict) else {}
    operation_id = str(operation.get("operation_id", f"operation-{sequence}"))
    target_id = str(target.get("id", ""))
    payload = {
        "operation_id": operation_id,
        "operation_type": operation.get("operation_type"),
        "operation_mode": operation.get("mode"),
        "board": board,
        "target_id": target_id,
        "target_system": target.get("system"),
        "status": status,
        "target_mutated": target_mutated,
        "rejection_reasons": rejection_reasons or [],
        "source_body_excluded": True,
    }
    now = utc_now()
    event_basis = {"event_type": event_type, "operation_id": operation_id, "target_id": target_id, "status": status}
    return {
        "id": f"evt_writeback_{short_hash(event_basis)}",
        "ts": now,
        "schema_version": EVENT_SCHEMA_VERSION,
        "source": "hermes-cockpit-writeback",
        "event_type": event_type,
        "actor": str(operation.get("actor") or "Migi"),
        "task_id": target_id or None,
        "run_id": operation_id,
        "agent_id": "migi",
        "artifact_uri": None,
        "evidence_uri": f"file://writeback-evidence.json#operation_id={operation_id}",
        "trust": {
            "status": "verified" if status in {"dry_run_passed", "applied"} else "rejected",
            "evidence_state": "operation_evidence",
            "confidence": 0.9 if status in {"dry_run_passed", "applied"} else 0.7,
            "reason": "Generated by gated M011 write-back adapter from explicit operation JSON.",
        },
        "payload": payload,
        "replay": {
            "stream": "m011-writeback",
            "sequence": sequence,
            "visible": True,
            "checkpoint": status == "applied",
            "summary": f"{event_type.replace('_', ' ')} for {target_id or operation_id}",
            "caused_by": operation_id,
        },
    }


def base_evidence(operation: dict[str, Any], board: str, mode: str) -> dict[str, Any]:
    target = operation.get("target") if isinstance(operation.get("target"), dict) else {}
    return {
        "schema_version": "hermes-cockpit.writeback-evidence.v1",
        "operation_id": operation.get("operation_id"),
        "operation_type": operation.get("operation_type"),
        "mode": mode,
        "actor": operation.get("actor"),
        "source": operation.get("source"),
        "board": board,
        "target_id": target.get("id"),
        "target_system": target.get("system"),
        "source_mutated": False,
        "target_mutated": False,
        "read_only_dry_run": mode == "dry-run",
        "rollback_note": "Rollback/remediation: append a follow-up correction comment; this adapter never marks completion or rewrites source history.",
        "created_at": utc_now(),
        "rejection_reasons": [],
    }


def validate_operation(
    operation: dict[str, Any],
    *,
    mode: str,
    allow_target_prefixes: Iterable[str],
    prior_dry_run_ids: set[str],
) -> list[str]:
    reasons: list[str] = []
    if operation.get("schema_version") != OPERATION_SCHEMA_VERSION:
        reasons.append("operation schema_version must be hermes-cockpit.operation.v1")
    operation_id = operation.get("operation_id")
    if not isinstance(operation_id, str) or not operation_id:
        reasons.append("operation_id is required")
    operation_type = operation.get("operation_type")
    if operation_type not in SUPPORTED_APPLY_OPERATIONS:
        reasons.append(f"unsupported operation_type {operation_type!r}; only writeback.task_comment is currently allowlisted")
    target = operation.get("target") if isinstance(operation.get("target"), dict) else {}
    target_id = target.get("id")
    target_system = target.get("system")
    if target_system not in {"gsd", "kanban"}:
        reasons.append("target.system must be gsd or kanban")
    prefixes = list(allow_target_prefixes)
    if not isinstance(target_id, str) or not target_id:
        reasons.append("target.id is required")
    elif prefixes and not any(target_id.startswith(prefix) for prefix in prefixes):
        reasons.append(f"target.id {target_id!r} is outside the allowlist prefixes {prefixes!r}")
    payload = operation.get("payload") if isinstance(operation.get("payload"), dict) else {}
    comment = payload.get("comment")
    max_chars = payload.get("max_chars", DEFAULT_MAX_COMMENT_CHARS)
    try:
        max_chars_int = int(max_chars)
    except Exception:
        max_chars_int = DEFAULT_MAX_COMMENT_CHARS
    if operation_type == "writeback.task_comment":
        if not isinstance(comment, str) or not comment.strip():
            reasons.append("payload.comment is required for writeback.task_comment")
        elif len(comment) > max_chars_int:
            reasons.append(f"payload.comment exceeds max_chars {max_chars_int}")
    if mode == "apply" and operation_id not in prior_dry_run_ids:
        reasons.append("apply requires matching dry-run evidence for the same operation_id")
    return reasons


def show_target(*, board: str, target_id: str, runner: Runner) -> tuple[dict[str, Any] | None, str | None]:
    result = runner(["hermes", "kanban", "--board", board, "show", "--json", target_id])
    if result_returncode(result) != 0:
        return None, result_stderr(result) or result_stdout(result) or "show command failed"
    return parse_show_output(result_stdout(result), target_id), None


def append_comment(*, board: str, target_id: str, comment: str, actor: str, runner: Runner) -> str | None:
    result = runner(["hermes", "kanban", "--board", board, "comment", "--author", actor, target_id, comment])
    if result_returncode(result) != 0:
        return result_stderr(result) or result_stdout(result) or "comment command failed"
    return None


def run_writeback_operations(
    operations: list[dict[str, Any]],
    *,
    board: str,
    mode: str,
    allow_target_prefixes: list[str],
    prior_dry_run_ids: set[str] | None = None,
    runner: Runner = run_subprocess,
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    prior_ids = prior_dry_run_ids or set()
    events: list[dict[str, Any]] = []
    evidence: list[dict[str, Any]] = []

    for sequence, operation in enumerate(operations, start=1):
        effective_mode = mode
        entry = base_evidence(operation, board, effective_mode)
        target = operation.get("target") if isinstance(operation.get("target"), dict) else {}
        target_id = str(target.get("id", ""))
        actor = str(operation.get("actor") or "Migi")
        reasons = validate_operation(
            operation,
            mode=effective_mode,
            allow_target_prefixes=allow_target_prefixes,
            prior_dry_run_ids=prior_ids,
        )
        if reasons:
            entry["status"] = "rejected"
            entry["rejection_reasons"] = reasons
            evidence.append(entry)
            events.append(
                make_event(
                    sequence=sequence,
                    event_type="writeback_rejected",
                    operation=operation,
                    board=board,
                    status="rejected",
                    target_mutated=False,
                    rejection_reasons=reasons,
                )
            )
            continue

        payload = operation.get("payload") if isinstance(operation.get("payload"), dict) else {}
        comment = str(payload.get("comment", "")).strip()

        if effective_mode == "dry-run":
            entry.update(
                {
                    "status": "dry_run_passed",
                    "read_only_dry_run": True,
                    "target_mutated": False,
                    "preview": {
                        "command": "hermes kanban comment",
                        "target_id": target_id,
                        "comment_chars": len(comment),
                        "comment_hash": hashlib.sha256(comment.encode("utf-8")).hexdigest()[:12],
                    },
                }
            )
            evidence.append(entry)
            events.append(
                make_event(
                    sequence=sequence,
                    event_type="writeback_dry_run_passed",
                    operation=operation,
                    board=board,
                    status="dry_run_passed",
                    target_mutated=False,
                )
            )
            continue

        if effective_mode != "apply":
            reasons = [f"unsupported adapter mode {effective_mode!r}"]
            entry["status"] = "rejected"
            entry["rejection_reasons"] = reasons
            evidence.append(entry)
            events.append(
                make_event(
                    sequence=sequence,
                    event_type="writeback_rejected",
                    operation=operation,
                    board=board,
                    status="rejected",
                    target_mutated=False,
                    rejection_reasons=reasons,
                )
            )
            continue

        before, show_error = show_target(board=board, target_id=target_id, runner=runner)
        if show_error:
            reasons = [f"target lookup failed before apply: {show_error}"]
            entry["status"] = "rejected"
            entry["rejection_reasons"] = reasons
            evidence.append(entry)
            events.append(
                make_event(
                    sequence=sequence,
                    event_type="writeback_rejected",
                    operation=operation,
                    board=board,
                    status="rejected",
                    target_mutated=False,
                    rejection_reasons=reasons,
                )
            )
            continue

        comment_error = append_comment(board=board, target_id=target_id, comment=comment, actor=actor, runner=runner)
        if comment_error:
            reasons = [f"comment apply failed: {comment_error}"]
            entry["status"] = "rejected"
            entry["before"] = before
            entry["rejection_reasons"] = reasons
            evidence.append(entry)
            events.append(
                make_event(
                    sequence=sequence,
                    event_type="writeback_rejected",
                    operation=operation,
                    board=board,
                    status="rejected",
                    target_mutated=False,
                    rejection_reasons=reasons,
                )
            )
            continue

        after, after_error = show_target(board=board, target_id=target_id, runner=runner)
        if after_error:
            after = {"id": target_id, "comments": None, "status": None, "signature": "unknown", "error": after_error}
        before_comments = int(before.get("comments", 0) if before else 0)
        after_comments = after.get("comments") if isinstance(after, dict) else None
        comment_delta = int(after_comments - before_comments) if isinstance(after_comments, int) else None
        entry.update(
            {
                "status": "applied",
                "read_only_dry_run": False,
                "target_mutated": True,
                "before": before,
                "after": after,
                "comment_delta": comment_delta,
                "applied_command": {
                    "argv": ["hermes", "kanban", "--board", board, "comment", "--author", actor, target_id, "<comment_body_excluded>"],
                    "comment_hash": hashlib.sha256(comment.encode("utf-8")).hexdigest()[:12],
                    "comment_chars": len(comment),
                },
            }
        )
        evidence.append(entry)
        events.append(
            make_event(
                sequence=sequence,
                event_type="writeback_applied",
                operation=operation,
                board=board,
                status="applied",
                target_mutated=True,
            )
        )

    return events, evidence


def prior_ids_from_evidence(path: Path | None) -> set[str]:
    if path is None or not path.exists():
        return set()
    parsed = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(parsed, dict):
        entries = parsed.get("entries", [])
    else:
        entries = parsed
    ids: set[str] = set()
    if isinstance(entries, list):
        for entry in entries:
            if isinstance(entry, dict) and entry.get("status") == "dry_run_passed" and isinstance(entry.get("operation_id"), str):
                ids.add(entry["operation_id"])
    return ids


def write_events(path: Path, events: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        for event in events:
            handle.write(json.dumps(event, sort_keys=True, separators=(",", ":")) + "\n")


def write_evidence(path: Path, entries: list[dict[str, Any]], *, operations_path: Path, mode: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "schema_version": "hermes-cockpit.writeback-run-evidence.v1",
        "created_at": utc_now(),
        "mode": mode,
        "operations_path": str(operations_path),
        "entries": entries,
        "summary": {
            "operation_count": len(entries),
            "applied_count": sum(1 for entry in entries if entry.get("status") == "applied"),
            "dry_run_passed_count": sum(1 for entry in entries if entry.get("status") == "dry_run_passed"),
            "rejected_count": sum(1 for entry in entries if entry.get("status") == "rejected"),
            "target_mutated": any(bool(entry.get("target_mutated")) for entry in entries),
            "source_mutated": False,
            "no_production_readiness": True,
        },
    }
    path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run gated Hermes Cockpit write-back operations")
    parser.add_argument("--operations", required=True, type=Path, help="Operation JSONL path")
    parser.add_argument("--events-output", required=True, type=Path, help="Generated Cockpit event NDJSON path")
    parser.add_argument("--evidence-output", required=True, type=Path, help="Generated evidence JSON path")
    parser.add_argument("--board", required=True, help="Hermes Kanban board slug")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--dry-run", action="store_true", help="Preview operations without mutating targets")
    mode.add_argument("--apply", action="store_true", help="Apply operations with prior dry-run evidence")
    parser.add_argument(
        "--allow-target-prefix",
        action="append",
        default=[],
        help="Allowed target.id prefix; may be repeated. Defaults to M011/S02/ if omitted.",
    )
    parser.add_argument("--prior-dry-run-evidence", type=Path, help="Evidence JSON from the matching dry-run")
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        validate_generated_output_paths(args.operations, args.events_output, args.evidence_output)
        operations = load_operations(args.operations)
        mode = "apply" if args.apply else "dry-run"
        prefixes = args.allow_target_prefix or ["M011/S02/"]
        prior_ids = prior_ids_from_evidence(args.prior_dry_run_evidence)
        events, evidence = run_writeback_operations(
            operations,
            board=args.board,
            mode=mode,
            allow_target_prefixes=prefixes,
            prior_dry_run_ids=prior_ids,
            runner=run_subprocess,
        )
        write_events(args.events_output, events)
        write_evidence(args.evidence_output, evidence, operations_path=args.operations, mode=mode)
    except ValueError as exc:
        print(f"refusing write-back operation: {exc}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
