#!/usr/bin/env python3
"""Bounded Cockpit worker dispatch adapter for M011.

Safety posture:
- Accepts explicit `hermes-cockpit.operation.v1` JSONL only.
- Supports dry-run spawnability checks and bounded local worker apply.
- Requires prior dry-run evidence before apply.
- Allows only explicitly allowlisted profiles and command roots.
- Uses subprocess argument lists only; no shell strings or public agent loops.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable, Iterable

OPERATION_SCHEMA_VERSION = "hermes-cockpit.operation.v1"
EVENT_SCHEMA_VERSION = "hermes-cockpit.event.v1"
SUPPORTED_OPERATIONS = {"dispatch.worker_start", "dispatch.worker_dry_run"}
APPLY_OPERATION = "dispatch.worker_start"
DEFAULT_OUTPUT_LIMIT_CHARS = 2000
DEFAULT_MAX_RUNTIME_SECONDS = 30
MAX_RUNTIME_CAP_SECONDS = 300


class CommandResult:
    def __init__(self, stdout: str = "", stderr: str = "", returncode: int = 0) -> None:
        self.stdout = stdout
        self.stderr = stderr
        self.returncode = returncode


Runner = Callable[..., Any]


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


def run_subprocess(args: list[str], timeout: int | None = None) -> CommandResult:
    try:
        completed = subprocess.run(args, text=True, capture_output=True, check=False, timeout=timeout)
    except subprocess.TimeoutExpired as exc:
        return CommandResult(stdout=exc.stdout or "", stderr=(exc.stderr or "") + "\nworker timed out", returncode=124)
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


def truncate(value: str, limit: int) -> str:
    if len(value) <= limit:
        return value
    return value[: max(0, limit - 1)] + "…"


def int_payload(payload: dict[str, Any], key: str, default: int, cap: int | None = None) -> int:
    try:
        value = int(payload.get(key, default))
    except Exception:
        value = default
    if cap is not None:
        value = min(value, cap)
    return max(1, value)


def command_from_payload(payload: dict[str, Any]) -> list[str] | None:
    command = payload.get("command")
    if isinstance(command, list) and command and all(isinstance(part, str) and part for part in command):
        return list(command)
    return None


def base_evidence(operation: dict[str, Any], mode: str) -> dict[str, Any]:
    payload = operation.get("payload") if isinstance(operation.get("payload"), dict) else {}
    target = operation.get("target") if isinstance(operation.get("target"), dict) else {}
    command = command_from_payload(payload)
    return {
        "schema_version": "hermes-cockpit.dispatch-evidence.v1",
        "operation_id": operation.get("operation_id"),
        "operation_type": operation.get("operation_type"),
        "mode": mode,
        "actor": operation.get("actor"),
        "source": operation.get("source"),
        "target_id": target.get("id"),
        "target_system": target.get("system"),
        "profile": payload.get("profile"),
        "host": payload.get("host"),
        "worker_spawned": False,
        "cleanup_status": "not_started",
        "command_shape": command[0] if command else payload.get("command_shape"),
        "command_hash": short_hash(command) if command else None,
        "created_at": utc_now(),
        "rejection_reasons": [],
        "non_claims": {
            "no_task_completion_claim": True,
            "no_public_agent_loop": True,
            "no_writeback_without_separate_approval": True,
        },
    }


def validate_operation(
    operation: dict[str, Any],
    *,
    mode: str,
    allow_profiles: set[str],
    allow_command_roots: set[str],
    prior_dry_run_ids: set[str],
) -> list[str]:
    reasons: list[str] = []
    if operation.get("schema_version") != OPERATION_SCHEMA_VERSION:
        reasons.append("operation schema_version must be hermes-cockpit.operation.v1")
    operation_id = operation.get("operation_id")
    if not isinstance(operation_id, str) or not operation_id:
        reasons.append("operation_id is required")
    operation_type = operation.get("operation_type")
    if operation_type not in SUPPORTED_OPERATIONS:
        reasons.append(f"unsupported operation_type {operation_type!r}")
    if mode == "apply" and operation_type != APPLY_OPERATION:
        reasons.append("apply only supports dispatch.worker_start")
    target = operation.get("target") if isinstance(operation.get("target"), dict) else {}
    if target.get("system") != "worker":
        reasons.append("target.system must be worker")
    if not isinstance(target.get("id"), str) or not target.get("id"):
        reasons.append("target.id is required")
    payload = operation.get("payload") if isinstance(operation.get("payload"), dict) else {}
    profile = payload.get("profile")
    if not isinstance(profile, str) or not profile:
        reasons.append("payload.profile is required")
    elif profile not in allow_profiles:
        reasons.append(f"profile {profile!r} is outside the allowlist")
    command = command_from_payload(payload)
    if operation_type == APPLY_OPERATION:
        if command is None:
            reasons.append("payload.command must be a non-empty argument list for dispatch.worker_start")
        elif command[0] not in allow_command_roots:
            reasons.append(f"command root {command[0]!r} is outside the allowlist")
    if payload.get("max_runtime_seconds") is not None:
        try:
            runtime = int(payload.get("max_runtime_seconds"))
            if runtime < 1 or runtime > MAX_RUNTIME_CAP_SECONDS:
                reasons.append(f"max_runtime_seconds must be between 1 and {MAX_RUNTIME_CAP_SECONDS}")
        except Exception:
            reasons.append("max_runtime_seconds must be an integer")
    if mode == "apply" and operation_id not in prior_dry_run_ids:
        reasons.append("apply requires matching dry-run evidence for the same operation_id")
    return reasons


def make_event(
    *,
    sequence: int,
    event_type: str,
    operation: dict[str, Any],
    status: str,
    worker_spawned: bool,
    rejection_reasons: list[str] | None = None,
) -> dict[str, Any]:
    payload_obj = operation.get("payload") if isinstance(operation.get("payload"), dict) else {}
    target = operation.get("target") if isinstance(operation.get("target"), dict) else {}
    operation_id = str(operation.get("operation_id", f"operation-{sequence}"))
    target_id = str(target.get("id", ""))
    event_payload = {
        "operation_id": operation_id,
        "operation_type": operation.get("operation_type"),
        "operation_mode": operation.get("mode"),
        "target_id": target_id,
        "profile": payload_obj.get("profile"),
        "host": payload_obj.get("host"),
        "status": status,
        "worker_spawned": worker_spawned,
        "rejection_reasons": rejection_reasons or [],
        "prompt_body_excluded": True,
        "command_body_excluded": True,
    }
    now = utc_now()
    event_basis = {"event_type": event_type, "operation_id": operation_id, "target_id": target_id, "status": status}
    return {
        "id": f"evt_dispatch_{short_hash(event_basis)}",
        "ts": now,
        "schema_version": EVENT_SCHEMA_VERSION,
        "source": "hermes-cockpit-dispatch",
        "event_type": event_type,
        "actor": str(operation.get("actor") or "Migi"),
        "task_id": target_id or None,
        "run_id": operation_id,
        "agent_id": str(payload_obj.get("profile") or "worker"),
        "artifact_uri": None,
        "evidence_uri": f"file://dispatch-evidence.json#operation_id={operation_id}",
        "trust": {
            "status": "verified" if status in {"dry_run_passed", "completed"} else "rejected",
            "evidence_state": "operation_evidence",
            "confidence": 0.9 if status in {"dry_run_passed", "completed"} else 0.7,
            "reason": "Generated by bounded M011 dispatch adapter from explicit operation JSON.",
        },
        "payload": event_payload,
        "replay": {
            "stream": "m011-dispatch",
            "sequence": sequence,
            "visible": True,
            "checkpoint": status == "completed",
            "summary": f"{event_type.replace('_', ' ')} for {target_id or operation_id}",
            "caused_by": operation_id,
        },
    }


def run_dispatch_operations(
    operations: list[dict[str, Any]],
    *,
    mode: str,
    allow_profiles: set[str],
    allow_command_roots: set[str],
    prior_dry_run_ids: set[str] | None = None,
    runner: Runner = run_subprocess,
) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    prior_ids = prior_dry_run_ids or set()
    events: list[dict[str, Any]] = []
    evidence: list[dict[str, Any]] = []

    for sequence, operation in enumerate(operations, start=1):
        entry = base_evidence(operation, mode)
        reasons = validate_operation(
            operation,
            mode=mode,
            allow_profiles=allow_profiles,
            allow_command_roots=allow_command_roots,
            prior_dry_run_ids=prior_ids,
        )
        if reasons:
            entry["status"] = "rejected"
            entry["rejection_reasons"] = reasons
            evidence.append(entry)
            events.append(
                make_event(
                    sequence=sequence,
                    event_type="dispatch_rejected",
                    operation=operation,
                    status="rejected",
                    worker_spawned=False,
                    rejection_reasons=reasons,
                )
            )
            continue

        payload = operation.get("payload") if isinstance(operation.get("payload"), dict) else {}
        command = command_from_payload(payload)
        max_runtime_seconds = int_payload(payload, "max_runtime_seconds", DEFAULT_MAX_RUNTIME_SECONDS, MAX_RUNTIME_CAP_SECONDS)
        output_limit_chars = int_payload(payload, "output_limit_chars", DEFAULT_OUTPUT_LIMIT_CHARS)

        if mode == "dry-run":
            entry.update(
                {
                    "status": "dry_run_passed",
                    "worker_spawned": False,
                    "cleanup_status": "not_started",
                    "spawnable": True,
                    "max_runtime_seconds": max_runtime_seconds,
                    "output_limit_chars": output_limit_chars,
                }
            )
            evidence.append(entry)
            events.append(
                make_event(
                    sequence=sequence,
                    event_type="dispatch_dry_run_passed",
                    operation=operation,
                    status="dry_run_passed",
                    worker_spawned=False,
                )
            )
            continue

        if mode != "apply":
            reasons = [f"unsupported adapter mode {mode!r}"]
            entry["status"] = "rejected"
            entry["rejection_reasons"] = reasons
            evidence.append(entry)
            events.append(
                make_event(
                    sequence=sequence,
                    event_type="dispatch_rejected",
                    operation=operation,
                    status="rejected",
                    worker_spawned=False,
                    rejection_reasons=reasons,
                )
            )
            continue

        assert command is not None  # validated above
        start = time.monotonic()
        try:
            result = runner(command, timeout=max_runtime_seconds)
        except TypeError:
            result = runner(command)
        duration_ms = int((time.monotonic() - start) * 1000)
        exit_code = result_returncode(result)
        status = "completed" if exit_code == 0 else "failed"
        event_type = "dispatch_completed" if exit_code == 0 else "dispatch_failed"
        entry.update(
            {
                "status": status,
                "worker_spawned": True,
                "cleanup_status": "completed" if exit_code == 0 else "completed_with_worker_failure",
                "exit_code": exit_code,
                "duration_ms": duration_ms,
                "max_runtime_seconds": max_runtime_seconds,
                "output_limit_chars": output_limit_chars,
                "stdout_preview": truncate(result_stdout(result), output_limit_chars),
                "stderr_preview": truncate(result_stderr(result), output_limit_chars),
            }
        )
        evidence.append(entry)
        events.append(
            make_event(
                sequence=sequence,
                event_type=event_type,
                operation=operation,
                status=status,
                worker_spawned=True,
            )
        )

    return events, evidence


def prior_ids_from_evidence(path: Path | None) -> set[str]:
    if path is None or not path.exists():
        return set()
    parsed = json.loads(path.read_text(encoding="utf-8"))
    entries = parsed.get("entries", []) if isinstance(parsed, dict) else parsed
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
        "schema_version": "hermes-cockpit.dispatch-run-evidence.v1",
        "created_at": utc_now(),
        "mode": mode,
        "operations_path": str(operations_path),
        "entries": entries,
        "summary": {
            "operation_count": len(entries),
            "dry_run_passed_count": sum(1 for entry in entries if entry.get("status") == "dry_run_passed"),
            "completed_count": sum(1 for entry in entries if entry.get("status") == "completed"),
            "failed_count": sum(1 for entry in entries if entry.get("status") == "failed"),
            "rejected_count": sum(1 for entry in entries if entry.get("status") == "rejected"),
            "worker_spawned": any(bool(entry.get("worker_spawned")) for entry in entries),
            "no_public_agent_loop": True,
            "no_task_completion_claim": True,
        },
    }
    path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run bounded Hermes Cockpit worker dispatch operations")
    parser.add_argument("--operations", required=True, type=Path, help="Operation JSONL path")
    parser.add_argument("--events-output", required=True, type=Path, help="Generated Cockpit event NDJSON path")
    parser.add_argument("--evidence-output", required=True, type=Path, help="Generated evidence JSON path")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--dry-run", action="store_true", help="Validate spawnability without starting a worker")
    mode.add_argument("--apply", action="store_true", help="Start bounded worker with prior dry-run evidence")
    parser.add_argument("--allow-profile", action="append", default=[], help="Allowlisted profile; defaults to local_echo")
    parser.add_argument("--allow-command-root", action="append", default=[], help="Allowlisted argv[0]; defaults to python3")
    parser.add_argument("--prior-dry-run-evidence", type=Path, help="Evidence JSON from the matching dry-run")
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        validate_generated_output_paths(args.operations, args.events_output, args.evidence_output)
        operations = load_operations(args.operations)
        mode = "apply" if args.apply else "dry-run"
        profiles = set(args.allow_profile or ["local_echo"])
        roots = set(args.allow_command_root or ["python3"])
        prior_ids = prior_ids_from_evidence(args.prior_dry_run_evidence)
        events, evidence = run_dispatch_operations(
            operations,
            mode=mode,
            allow_profiles=profiles,
            allow_command_roots=roots,
            prior_dry_run_ids=prior_ids,
            runner=run_subprocess,
        )
        write_events(args.events_output, events)
        write_evidence(args.evidence_output, evidence, operations_path=args.operations, mode=mode)
    except ValueError as exc:
        print(f"refusing dispatch operation: {exc}", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
