#!/usr/bin/env python3
"""Manual evidence-gated lifecycle runner for Claude Code background sessions.

M019 intentionally keeps this as a CLI runner, not a Ratatui live-control path.
Automated tests pass fake Claude binaries; real Claude use is operator-approved only.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

REGISTRY_SCHEMA = "hermes-cockpit.claude-session-registry.v1"
EVIDENCE_SCHEMA = "hermes-cockpit.claude-bg-lifecycle.evidence.v1"
GRANT_SCHEMA = "hermes-cockpit.claude-bg-lifecycle.grant.v1"
RESULT_SCHEMA = "hermes-cockpit.claude-bg-lifecycle.result.v1"
SESSION_KIND = "ClaudeBackground"
WRITE_CAPABLE_MODES = {"accept_edits", "bypass_permissions"}
PERMISSION_MODES = {"read_only", "accept_edits", "bypass_permissions"}
SECRET_PATTERN = re.compile(r"(?i)(api[_-]?key|token|password|secret)\s*[=:]\s*\S+")
BG_SESSION_ID_PATTERN = re.compile(r"\b(bg_[A-Za-z0-9_-]+)\b")
UUID_SESSION_ID_PATTERN = re.compile(
    r"\b([0-9a-fA-F]{8})-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b"
)


class LifecycleError(RuntimeError):
    pass


def now_utc() -> datetime:
    return datetime.now(timezone.utc).replace(microsecond=0)


def iso_now() -> str:
    return now_utc().isoformat().replace("+00:00", "Z")


def parse_utc(value: str) -> datetime:
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError as exc:
        raise LifecycleError(f"invalid timestamp: {value}") from exc


def canonical(path: Path) -> Path:
    try:
        return path.resolve(strict=False)
    except OSError as exc:
        raise LifecycleError(f"invalid path {path}: {exc}") from exc


def read_json(path: Path, label: str) -> dict[str, Any]:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise LifecycleError(f"{label} not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise LifecycleError(f"{label} is not valid JSON: {exc}") from exc
    if not isinstance(data, dict):
        raise LifecycleError(f"{label} must be a JSON object")
    return data


def write_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def file_hash(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(65536), b""):
            digest.update(chunk)
    return digest.hexdigest()


def registry_template() -> dict[str, Any]:
    return {
        "schema_version": REGISTRY_SCHEMA,
        "generated_at": iso_now(),
        "sessions": [],
    }


def load_registry(path: Path) -> dict[str, Any]:
    if not path.exists():
        return registry_template()
    registry = read_json(path, "registry")
    sessions = registry.get("sessions")
    if not isinstance(sessions, list):
        raise LifecycleError("registry missing required field: sessions")
    registry.setdefault("schema_version", REGISTRY_SCHEMA)
    registry.setdefault("generated_at", iso_now())
    return registry


def save_registry(path: Path, registry: dict[str, Any]) -> None:
    registry["schema_version"] = REGISTRY_SCHEMA
    registry["generated_at"] = iso_now()
    write_json(path, registry)


def require_fields(data: dict[str, Any], fields: list[str], label: str) -> None:
    for field in fields:
        value = data.get(field)
        if value is None or value == "":
            raise LifecycleError(f"{label} missing required field: {field}")


def validate_launch_request(request: dict[str, Any]) -> None:
    require_fields(
        request,
        ["operation_id", "display_name", "task", "host", "repo_path", "permission_mode"],
        "launch request",
    )
    task = str(request["task"])
    if "claude -p" in task:
        raise LifecycleError("claude -p is not allowed for Claude BG lifecycle launch")
    if SECRET_PATTERN.search(task):
        raise LifecycleError("task text contains secret-like material")
    permission_mode = str(request["permission_mode"])
    if permission_mode not in PERMISSION_MODES:
        raise LifecycleError(f"unsupported permission_mode: {permission_mode}")
    if permission_mode in WRITE_CAPABLE_MODES and not request.get("worktree_path"):
        raise LifecycleError("write-capable Claude sessions require worktree_path")


def ensure_not_same(left: Path, right: Path, message: str) -> None:
    if canonical(left) == canonical(right):
        raise LifecycleError(message)


def build_launch_evidence(request_path: Path, registry_path: Path) -> dict[str, Any]:
    request = read_json(request_path, "launch request")
    validate_launch_request(request)
    registry = load_registry(registry_path)
    operation_id = str(request["operation_id"])
    if any(session.get("operation_id") == operation_id for session in registry["sessions"]):
        raise LifecycleError(f"operation already registered: {operation_id}")
    task = str(request["task"])
    return {
        "schema_version": EVIDENCE_SCHEMA,
        "action": "launch",
        "status": "dry_run_passed",
        "operation_id": operation_id,
        "generated_at": iso_now(),
        "registry_path": str(canonical(registry_path)),
        "request_path": str(canonical(request_path)),
        "request": {
            "display_name": request["display_name"],
            "task": task,
            "host": request["host"],
            "repo_path": request["repo_path"],
            "worktree_path": request.get("worktree_path"),
            "permission_mode": request["permission_mode"],
        },
        "expected_command": ["claude", "--bg", task],
        "source_mutated": False,
        "target_mutated": False,
        "non_claims": {
            "no_claude_print_default": True,
            "no_tui_lifecycle_control": True,
            "no_real_claude_required_for_tests": True,
        },
    }


def find_session(registry: dict[str, Any], session_id: str) -> dict[str, Any] | None:
    for session in registry["sessions"]:
        if isinstance(session, dict) and session.get("id") == session_id:
            return session
    return None


def build_stop_evidence(session_id: str, registry_path: Path) -> dict[str, Any]:
    registry = load_registry(registry_path)
    session = find_session(registry, session_id)
    if session is None:
        raise LifecycleError(f"unknown session: {session_id}")
    return {
        "schema_version": EVIDENCE_SCHEMA,
        "action": "stop",
        "status": "dry_run_passed",
        "operation_id": f"stop-{session_id}",
        "generated_at": iso_now(),
        "registry_path": str(canonical(registry_path)),
        "session_id": session_id,
        "session_before": session,
        "expected_command": ["claude", "stop", session_id],
        "source_mutated": False,
        "target_mutated": False,
        "non_claims": {
            "no_tui_lifecycle_control": True,
            "no_real_claude_required_for_tests": True,
        },
    }


def prepare_launch(args: argparse.Namespace) -> int:
    request_path = Path(args.request)
    registry_path = Path(args.registry)
    evidence_path = Path(args.evidence)
    ensure_not_same(registry_path, evidence_path, "evidence must not overwrite registry")
    evidence = build_launch_evidence(request_path, registry_path)
    write_json(evidence_path, evidence)
    print(f"evidence={canonical(evidence_path)}")
    print("status=dry_run_passed")
    return 0


def prepare_stop(args: argparse.Namespace) -> int:
    registry_path = Path(args.registry)
    evidence_path = Path(args.evidence)
    ensure_not_same(registry_path, evidence_path, "evidence must not overwrite registry")
    evidence = build_stop_evidence(args.session_id, registry_path)
    write_json(evidence_path, evidence)
    print(f"evidence={canonical(evidence_path)}")
    print("status=dry_run_passed")
    return 0


def write_grant(args: argparse.Namespace, expected_action: str) -> int:
    evidence_path = Path(args.evidence)
    grant_path = Path(args.grant)
    ensure_not_same(evidence_path, grant_path, "grant must not overwrite evidence")
    evidence = read_json(evidence_path, "evidence")
    if evidence.get("schema_version") != EVIDENCE_SCHEMA:
        raise LifecycleError("unsupported evidence schema")
    if evidence.get("action") != expected_action:
        raise LifecycleError(f"evidence action mismatch: expected {expected_action}")
    if evidence.get("status") != "dry_run_passed":
        raise LifecycleError("evidence is not dry_run_passed")
    granted_at = now_utc()
    expires_at = granted_at + timedelta(seconds=int(args.ttl_seconds))
    if int(args.ttl_seconds) <= 0:
        raise LifecycleError("ttl-seconds must be positive")
    grant = {
        "schema_version": GRANT_SCHEMA,
        "status": "granted",
        "action": expected_action,
        "operation_id": evidence["operation_id"],
        "dry_run_evidence_hash": file_hash(evidence_path),
        "evidence_path": str(canonical(evidence_path)),
        "registry_path": evidence.get("registry_path"),
        "session_id": evidence.get("session_id"),
        "decider": args.decider,
        "granted_at": granted_at.isoformat().replace("+00:00", "Z"),
        "expires_at": expires_at.isoformat().replace("+00:00", "Z"),
        "consumed": False,
    }
    write_json(grant_path, grant)
    print(f"grant={canonical(grant_path)}")
    print("status=granted")
    return 0


def grant_launch(args: argparse.Namespace) -> int:
    return write_grant(args, "launch")


def grant_stop(args: argparse.Namespace) -> int:
    return write_grant(args, "stop")


def validate_apply_inputs(evidence_path: Path, grant_path: Path, registry_path: Path, expected_action: str) -> tuple[dict[str, Any], dict[str, Any]]:
    evidence = read_json(evidence_path, "evidence")
    grant = read_json(grant_path, "grant")
    if evidence.get("schema_version") != EVIDENCE_SCHEMA:
        raise LifecycleError("unsupported evidence schema")
    if grant.get("schema_version") != GRANT_SCHEMA:
        raise LifecycleError("unsupported grant schema")
    if evidence.get("action") != expected_action or grant.get("action") != expected_action:
        raise LifecycleError(f"action mismatch for {expected_action}")
    if grant.get("status") != "granted":
        raise LifecycleError("grant is not granted")
    if grant.get("consumed"):
        raise LifecycleError("grant already consumed")
    if grant.get("operation_id") != evidence.get("operation_id"):
        raise LifecycleError("grant operation_id mismatch")
    if grant.get("dry_run_evidence_hash") != file_hash(evidence_path):
        raise LifecycleError("dry-run evidence hash mismatch")
    if canonical(Path(str(evidence.get("registry_path")))) != canonical(registry_path):
        raise LifecycleError("evidence registry path mismatch")
    if grant.get("registry_path") and canonical(Path(str(grant.get("registry_path")))) != canonical(registry_path):
        raise LifecycleError("grant registry path mismatch")
    expires_at = parse_utc(str(grant.get("expires_at")))
    if now_utc() >= expires_at:
        raise LifecycleError("grant expired")
    return evidence, grant


def mark_consumed(grant_path: Path, grant: dict[str, Any]) -> None:
    grant["consumed"] = True
    grant["consumed_at"] = iso_now()
    write_json(grant_path, grant)


def claude_subprocess_env() -> dict[str, str]:
    """Use official Claude CLI while preventing background smoke from stalling on auto-update."""
    env = os.environ.copy()
    env.setdefault("DISABLE_AUTOUPDATER", "1")
    env.setdefault("DISABLE_UPDATES", "1")
    return env


def normalize_session_id(value: str) -> str:
    uuid_match = UUID_SESSION_ID_PATTERN.fullmatch(value)
    if uuid_match:
        return uuid_match.group(1).lower()
    return value


def parse_session_id(output: str) -> str:
    match = BG_SESSION_ID_PATTERN.search(output)
    if match:
        return match.group(1)
    uuid_match = UUID_SESSION_ID_PATTERN.search(output)
    if uuid_match:
        return uuid_match.group(1).lower()
    raise LifecycleError("unable to parse Claude background session id")


def discover_session_id_from_process(task: str) -> str | None:
    """Recover current Claude Code short job id when real `claude --bg` emits no stdout."""
    try:
        completed = subprocess.run(
            ["ps", "-eww", "-o", "args="],
            text=True,
            capture_output=True,
            check=False,
        )
    except OSError:
        return None
    if completed.returncode != 0:
        return None
    for line in completed.stdout.splitlines():
        if "--session-id" not in line or task not in line:
            continue
        try:
            return parse_session_id(line)
        except LifecycleError:
            continue
    return None


def quote_task(task: str) -> str:
    return task.replace('"', '\\"')


def redact_process_text(value: str) -> str:
    redacted = SECRET_PATTERN.sub(lambda match: f"{match.group(1)}=[REDACTED]", value)
    redacted = " ".join(redacted.split())
    if len(redacted) > 180:
        return redacted[:177] + "..."
    return redacted


def session_process_aliases(session: dict[str, Any], session_id: str) -> list[str]:
    aliases: list[str] = []
    for value in [session_id, session.get("id"), session.get("full_session_id"), session.get("session_id")]:
        if not isinstance(value, str) or not value:
            continue
        normalized = normalize_session_id(value)
        for candidate in [value, normalized]:
            if len(candidate) >= 8 and candidate not in aliases:
                aliases.append(candidate)
    return aliases


def process_snapshot_lines(snapshot_path: str | None) -> list[str]:
    if snapshot_path:
        path = Path(snapshot_path)
        try:
            return path.read_text(encoding="utf-8").splitlines()
        except FileNotFoundError as exc:
            raise LifecycleError(f"process snapshot not found: {path}") from exc
    try:
        completed = subprocess.run(
            ["ps", "-eww", "-o", "pid=", "-o", "args="],
            text=True,
            capture_output=True,
            check=False,
        )
    except OSError as exc:
        raise LifecycleError(f"failed to inspect process table: {exc}") from exc
    if completed.returncode != 0:
        detail = (completed.stderr or completed.stdout or "unknown error").strip()
        raise LifecycleError(f"process inspection failed: {detail}")
    return completed.stdout.splitlines()


def parse_process_line(line: str) -> tuple[str | None, str]:
    stripped = line.strip()
    if not stripped:
        return None, ""
    parts = stripped.split(maxsplit=1)
    if len(parts) == 2 and parts[0].isdigit():
        return parts[0], parts[1]
    return None, stripped


def verify_stop_processes(session: dict[str, Any], session_id: str, snapshot_path: str | None) -> dict[str, Any]:
    aliases = session_process_aliases(session, session_id)
    remaining: list[dict[str, Any]] = []
    for line in process_snapshot_lines(snapshot_path):
        pid, command = parse_process_line(line)
        if not command or "claude" not in command.lower():
            continue
        matched_alias = next((alias for alias in aliases if alias in command), None)
        if matched_alias is None:
            continue
        remaining.append(
            {
                "pid": pid,
                "matched_alias": matched_alias,
                "command_preview": redact_process_text(command),
            }
        )
    verdict = "clear" if not remaining else "needs_attention"
    return {
        "schema_version": "hermes-cockpit.claude-bg.stop-verification.v1",
        "verdict": verdict,
        "checked_at": iso_now(),
        "matched_aliases": aliases,
        "remaining_count": len(remaining),
        "remaining_processes": remaining[:5],
        "remaining_processes_truncated": max(0, len(remaining) - 5),
        "snapshot_source": "file" if snapshot_path else "live_ps",
    }


def apply_launch(args: argparse.Namespace) -> int:
    evidence_path = Path(args.evidence)
    grant_path = Path(args.grant)
    registry_path = Path(args.registry)
    result_path = Path(args.result)
    ensure_not_same(registry_path, result_path, "result must not overwrite registry")
    evidence, grant = validate_apply_inputs(evidence_path, grant_path, registry_path, "launch")
    request = evidence["request"]
    task = str(request["task"])
    session_id_source = "output"
    try:
        completed = subprocess.run(
            [args.claude_bin, "--bg", task],
            text=True,
            capture_output=True,
            check=False,
            env=claude_subprocess_env(),
        )
    except OSError as exc:
        raise LifecycleError(f"failed to run claude --bg: {exc}") from exc
    if completed.returncode != 0:
        detail = (completed.stderr or completed.stdout or "unknown error").strip()
        raise LifecycleError(f"claude --bg failed: {detail}")
    try:
        session_id = parse_session_id(completed.stdout + "\n" + completed.stderr)
    except LifecycleError:
        discovered_session_id = discover_session_id_from_process(task)
        if discovered_session_id is None:
            raise
        session_id = discovered_session_id
        session_id_source = "process_table"
    registry = load_registry(registry_path)
    if find_session(registry, session_id) is not None:
        raise LifecycleError(f"session already exists in registry: {session_id}")
    session = {
        "id": session_id,
        "operation_id": evidence["operation_id"],
        "display_name": request["display_name"],
        "kind": SESSION_KIND,
        "status": "running",
        "host": request["host"],
        "repo_path": request["repo_path"],
        "worktree_path": request.get("worktree_path"),
        "permission_mode": request["permission_mode"],
        "command": f'claude --bg "{quote_task(task)}"',
        "started_at": iso_now(),
        "log_path": f"target/hermes-cockpit-m019/{session_id}.log",
    }
    registry["sessions"].append(session)
    save_registry(registry_path, registry)
    result = {
        "schema_version": RESULT_SCHEMA,
        "action": "launch",
        "status": "applied",
        "operation_id": evidence["operation_id"],
        "session_id": session_id,
        "session_id_source": session_id_source,
        "registry_path": str(canonical(registry_path)),
        "applied_at": iso_now(),
        "claude_stdout_preview": " ".join(completed.stdout.split())[:240],
        "non_claims": {
            "no_tui_lifecycle_control": True,
            "no_auto_commit_or_push": True,
        },
    }
    write_json(result_path, result)
    mark_consumed(grant_path, grant)
    print(f"session_id={session_id}")
    print("status=applied")
    return 0


def apply_stop(args: argparse.Namespace) -> int:
    evidence_path = Path(args.evidence)
    grant_path = Path(args.grant)
    registry_path = Path(args.registry)
    result_path = Path(args.result)
    ensure_not_same(registry_path, result_path, "result must not overwrite registry")
    evidence, grant = validate_apply_inputs(evidence_path, grant_path, registry_path, "stop")
    session_id = str(evidence.get("session_id"))
    if grant.get("session_id") != session_id:
        raise LifecycleError("grant session_id mismatch")
    registry = load_registry(registry_path)
    session = find_session(registry, session_id)
    if session is None:
        raise LifecycleError(f"unknown session: {session_id}")
    try:
        completed = subprocess.run(
            [args.claude_bin, "stop", session_id],
            text=True,
            capture_output=True,
            check=False,
            env=claude_subprocess_env(),
        )
    except OSError as exc:
        raise LifecycleError(f"failed to run claude stop: {exc}") from exc
    if completed.returncode != 0:
        detail = (completed.stderr or completed.stdout or "unknown error").strip()
        raise LifecycleError(f"claude stop failed: {detail}")
    stop_verification = verify_stop_processes(session, session_id, args.process_snapshot)
    needs_attention = stop_verification["verdict"] != "clear"
    if needs_attention:
        session["status"] = "stop_attention_required"
        session["attention_required_at"] = iso_now()
    else:
        session["status"] = "stopped"
        session["stopped_at"] = iso_now()
    session["stop_verification"] = stop_verification
    save_registry(registry_path, registry)
    result_status = "needs_attention" if needs_attention else "applied"
    result = {
        "schema_version": RESULT_SCHEMA,
        "action": "stop",
        "status": result_status,
        "operation_id": evidence["operation_id"],
        "session_id": session_id,
        "registry_path": str(canonical(registry_path)),
        "applied_at": iso_now(),
        "claude_stdout_preview": " ".join(completed.stdout.split())[:240],
        "stop_verification": stop_verification,
        "non_claims": {
            "no_tui_lifecycle_control": True,
            "no_auto_commit_or_push": True,
        },
    }
    write_json(result_path, result)
    mark_consumed(grant_path, grant)
    print(f"session_id={session_id}")
    print(f"status={result_status}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Evidence-gated Claude BG lifecycle runner for Hermes Cockpit.")
    sub = parser.add_subparsers(dest="action", required=True)

    p = sub.add_parser("prepare-launch")
    p.add_argument("--request", required=True)
    p.add_argument("--registry", required=True)
    p.add_argument("--evidence", required=True)
    p.set_defaults(func=prepare_launch)

    p = sub.add_parser("grant-launch")
    p.add_argument("--evidence", required=True)
    p.add_argument("--grant", required=True)
    p.add_argument("--decider", required=True)
    p.add_argument("--ttl-seconds", type=int, default=300)
    p.set_defaults(func=grant_launch)

    p = sub.add_parser("apply-launch")
    p.add_argument("--evidence", required=True)
    p.add_argument("--grant", required=True)
    p.add_argument("--registry", required=True)
    p.add_argument("--result", required=True)
    p.add_argument("--claude-bin", default="claude")
    p.set_defaults(func=apply_launch)

    p = sub.add_parser("prepare-stop")
    p.add_argument("--session-id", required=True)
    p.add_argument("--registry", required=True)
    p.add_argument("--evidence", required=True)
    p.set_defaults(func=prepare_stop)

    p = sub.add_parser("grant-stop")
    p.add_argument("--evidence", required=True)
    p.add_argument("--grant", required=True)
    p.add_argument("--decider", required=True)
    p.add_argument("--ttl-seconds", type=int, default=300)
    p.set_defaults(func=grant_stop)

    p = sub.add_parser("apply-stop")
    p.add_argument("--evidence", required=True)
    p.add_argument("--grant", required=True)
    p.add_argument("--registry", required=True)
    p.add_argument("--result", required=True)
    p.add_argument("--claude-bin", default="claude")
    p.add_argument(
        "--process-snapshot",
        help="Optional newline-delimited process snapshot for deterministic tests; live ps is used when omitted.",
    )
    p.set_defaults(func=apply_stop)
    return parser


def main(argv: list[str]) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    try:
        raise SystemExit(main(sys.argv[1:]))
    except LifecycleError as exc:
        print(str(exc), file=sys.stderr)
        raise SystemExit(2)
