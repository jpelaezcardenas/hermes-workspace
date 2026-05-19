#!/usr/bin/env python3
"""Fake-testable tmux lifecycle adapter for Claude Code interactive sessions.

M025 keeps this as a manual CLI adapter, not a Ratatui lifecycle executor.
Automated tests pass a fake tmux binary; real tmux/Claude use is operator-approved
only. The adapter starts official interactive `claude` inside tmux and sends the
initial task via `tmux send-keys`, avoiding `claude -p` as the default path.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shlex
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

REGISTRY_SCHEMA = "hermes-cockpit.claude-session-registry.v1"
EVIDENCE_SCHEMA = "hermes-cockpit.claude-tmux-lifecycle.evidence.v1"
GRANT_SCHEMA = "hermes-cockpit.claude-tmux-lifecycle.grant.v1"
RESULT_SCHEMA = "hermes-cockpit.claude-tmux-lifecycle.result.v1"
CAPTURE_SCHEMA = "hermes-cockpit.claude-tmux-lifecycle.capture.v1"
SESSION_KIND = "ClaudeTmux"
PERMISSION_MODES = {"read_only", "accept_edits", "bypass_permissions"}
WRITE_CAPABLE_MODES = {"accept_edits", "bypass_permissions"}
SECRET_PATTERN = re.compile(r"(?i)(api[_-]?key|token|password|secret)\s*[=:]\s*\S+")
SESSION_NAME_PATTERN = re.compile(r"^[A-Za-z0-9_.:-]{1,80}$")


class TmuxLifecycleError(RuntimeError):
    pass


def now_utc() -> datetime:
    return datetime.now(timezone.utc).replace(microsecond=0)


def iso_now() -> str:
    return now_utc().isoformat().replace("+00:00", "Z")


def parse_utc(value: str) -> datetime:
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError as exc:
        raise TmuxLifecycleError(f"invalid timestamp: {value}") from exc


def canonical(path: Path) -> Path:
    try:
        return path.resolve(strict=False)
    except OSError as exc:
        raise TmuxLifecycleError(f"invalid path {path}: {exc}") from exc


def read_json(path: Path, label: str) -> dict[str, Any]:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise TmuxLifecycleError(f"{label} not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise TmuxLifecycleError(f"{label} is not valid JSON: {exc}") from exc
    if not isinstance(data, dict):
        raise TmuxLifecycleError(f"{label} must be a JSON object")
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
    return {"schema_version": REGISTRY_SCHEMA, "generated_at": iso_now(), "sessions": []}


def load_registry(path: Path) -> dict[str, Any]:
    if not path.exists():
        return registry_template()
    registry = read_json(path, "registry")
    sessions = registry.get("sessions")
    if not isinstance(sessions, list):
        raise TmuxLifecycleError("registry missing required field: sessions")
    registry.setdefault("schema_version", REGISTRY_SCHEMA)
    registry.setdefault("generated_at", iso_now())
    return registry


def save_registry(path: Path, registry: dict[str, Any]) -> None:
    registry["schema_version"] = REGISTRY_SCHEMA
    registry["generated_at"] = iso_now()
    write_json(path, registry)


def redact(text: str) -> str:
    text = " ".join(text.split())
    return SECRET_PATTERN.sub(lambda match: f"{match.group(1)}=[REDACTED]", text)


def preview(text: str, max_chars: int = 240) -> str:
    redacted = redact(text)
    if len(redacted) <= max_chars:
        return redacted
    return redacted[: max_chars - 1].rstrip() + "…"


def require_fields(data: dict[str, Any], fields: list[str], label: str) -> None:
    for field in fields:
        if data.get(field) in (None, ""):
            raise TmuxLifecycleError(f"{label} missing required field: {field}")


def validate_request(request: dict[str, Any]) -> None:
    require_fields(
        request,
        ["operation_id", "session_name", "display_name", "task", "host", "repo_path", "permission_mode"],
        "tmux start request",
    )
    session_name = str(request["session_name"])
    if not SESSION_NAME_PATTERN.match(session_name):
        raise TmuxLifecycleError("session_name must be 1-80 chars of alnum, underscore, dash, dot, colon")
    task = str(request["task"])
    if "claude -p" in task:
        raise TmuxLifecycleError("claude -p is not allowed for Claude tmux lifecycle start")
    if SECRET_PATTERN.search(task):
        raise TmuxLifecycleError("task text contains secret-like material")
    permission_mode = str(request["permission_mode"])
    if permission_mode not in PERMISSION_MODES:
        raise TmuxLifecycleError(f"unsupported permission_mode: {permission_mode}")
    if permission_mode in WRITE_CAPABLE_MODES and not request.get("worktree_path"):
        raise TmuxLifecycleError("write-capable Claude tmux sessions require worktree_path")


def ensure_not_same(left: Path, right: Path, message: str) -> None:
    if canonical(left) == canonical(right):
        raise TmuxLifecycleError(message)


def find_session(registry: dict[str, Any], session_id: str) -> dict[str, Any] | None:
    for session in registry["sessions"]:
        if isinstance(session, dict) and session.get("id") == session_id:
            return session
    return None


def session_command(repo_path: str) -> str:
    return f"cd {shlex.quote(repo_path)} && claude"


def build_start_evidence(request_path: Path, registry_path: Path) -> dict[str, Any]:
    request = read_json(request_path, "tmux start request")
    validate_request(request)
    registry = load_registry(registry_path)
    operation_id = str(request["operation_id"])
    session_name = str(request["session_name"])
    if find_session(registry, session_name):
        raise TmuxLifecycleError(f"session already registered: {session_name}")
    if any(session.get("operation_id") == operation_id for session in registry["sessions"] if isinstance(session, dict)):
        raise TmuxLifecycleError(f"operation already registered: {operation_id}")
    command = session_command(str(request["repo_path"]))
    return {
        "schema_version": EVIDENCE_SCHEMA,
        "action": "start",
        "status": "dry_run_passed",
        "operation_id": operation_id,
        "generated_at": iso_now(),
        "registry_path": str(canonical(registry_path)),
        "request_path": str(canonical(request_path)),
        "request": {
            "session_name": session_name,
            "display_name": request["display_name"],
            "task": request["task"],
            "host": request["host"],
            "repo_path": request["repo_path"],
            "worktree_path": request.get("worktree_path"),
            "permission_mode": request["permission_mode"],
        },
        "expected_commands": [
            ["tmux", "new-session", "-d", "-s", session_name, command],
            ["tmux", "send-keys", "-t", session_name, str(request["task"]), "Enter"],
        ],
        "source_mutated": False,
        "target_mutated": False,
        "non_claims": {
            "no_claude_print_default": True,
            "no_real_claude_required_for_tests": True,
            "no_tui_lifecycle_control": True,
        },
    }


def validate_grant(evidence_path: Path, grant_path: Path, expected_action: str) -> tuple[dict[str, Any], dict[str, Any]]:
    evidence = read_json(evidence_path, "evidence")
    grant = read_json(grant_path, "grant")
    if evidence.get("schema_version") != EVIDENCE_SCHEMA:
        raise TmuxLifecycleError("unsupported evidence schema")
    if evidence.get("action") != expected_action:
        raise TmuxLifecycleError(f"evidence action mismatch: expected {expected_action}")
    if grant.get("schema_version") != GRANT_SCHEMA:
        raise TmuxLifecycleError("unsupported grant schema")
    if grant.get("evidence_sha256") != file_hash(evidence_path):
        raise TmuxLifecycleError("grant evidence hash mismatch")
    if grant.get("action") != expected_action:
        raise TmuxLifecycleError(f"grant action mismatch: expected {expected_action}")
    if parse_utc(str(grant["expires_at"])) < now_utc():
        raise TmuxLifecycleError("grant expired")
    return evidence, grant


def run_tmux(tmux_bin: str, args: list[str]) -> subprocess.CompletedProcess[str]:
    try:
        completed = subprocess.run([tmux_bin, *args], text=True, capture_output=True, check=False)
    except OSError as exc:
        raise TmuxLifecycleError(f"failed to run tmux: {exc}") from exc
    if completed.returncode != 0:
        detail = (completed.stderr or completed.stdout or "unknown tmux error").strip()
        raise TmuxLifecycleError(f"tmux command failed ({' '.join(args)}): {detail}")
    return completed


def prepare_start(args: argparse.Namespace) -> int:
    evidence_path = Path(args.evidence)
    registry_path = Path(args.registry)
    ensure_not_same(evidence_path, registry_path, "evidence must not overwrite registry")
    evidence = build_start_evidence(Path(args.request), registry_path)
    write_json(evidence_path, evidence)
    print(f"evidence={canonical(evidence_path)}")
    print("status=dry_run_passed")
    return 0


def grant_start(args: argparse.Namespace) -> int:
    evidence_path = Path(args.evidence)
    grant_path = Path(args.grant)
    ensure_not_same(evidence_path, grant_path, "grant must not overwrite evidence")
    evidence = read_json(evidence_path, "evidence")
    if evidence.get("schema_version") != EVIDENCE_SCHEMA:
        raise TmuxLifecycleError("unsupported evidence schema")
    if evidence.get("action") != "start":
        raise TmuxLifecycleError("evidence action mismatch: expected start")
    grant = {
        "schema_version": GRANT_SCHEMA,
        "action": "start",
        "operation_id": evidence["operation_id"],
        "evidence_sha256": file_hash(evidence_path),
        "approved_at": iso_now(),
        "expires_at": (now_utc() + timedelta(minutes=int(args.ttl_minutes))).isoformat().replace("+00:00", "Z"),
        "approved_by": args.approved_by,
        "used": False,
    }
    write_json(grant_path, grant)
    print(f"grant={canonical(grant_path)}")
    print("status=granted")
    return 0


def apply_start(args: argparse.Namespace) -> int:
    evidence_path = Path(args.evidence)
    grant_path = Path(args.grant)
    registry_path = Path(args.registry)
    result_path = Path(args.result)
    evidence, grant = validate_grant(evidence_path, grant_path, "start")
    if grant.get("used"):
        raise TmuxLifecycleError("grant already used")
    request = evidence["request"]
    session_name = str(request["session_name"])
    command = session_command(str(request["repo_path"]))
    run_tmux(args.tmux_bin, ["new-session", "-d", "-s", session_name, command])
    run_tmux(args.tmux_bin, ["send-keys", "-t", session_name, str(request["task"]), "Enter"])
    registry = load_registry(registry_path)
    if find_session(registry, session_name):
        raise TmuxLifecycleError(f"session already registered: {session_name}")
    session = {
        "id": session_name,
        "operation_id": evidence["operation_id"],
        "display_name": request["display_name"],
        "kind": SESSION_KIND,
        "status": "running",
        "host": request["host"],
        "repo_path": request["repo_path"],
        "worktree_path": request.get("worktree_path"),
        "permission_mode": request["permission_mode"],
        "command": command,
        "tmux_session_name": session_name,
        "started_at": iso_now(),
        "attach_command": f"tmux attach -t {session_name}",
        "send_command_template": f"tmux send-keys -t {session_name} '<prompt>' Enter",
        "stop_command": f"tmux kill-session -t {session_name}",
        "safety_labels": ["interactive", "verifier_required", "display_only"],
    }
    registry["sessions"].append(session)
    save_registry(registry_path, registry)
    grant["used"] = True
    grant["used_at"] = iso_now()
    write_json(grant_path, grant)
    result = {
        "schema_version": RESULT_SCHEMA,
        "action": "start",
        "status": "applied",
        "session_id": session_name,
        "tmux_session_name": session_name,
        "registry_path": str(canonical(registry_path)),
        "commands": [[args.tmux_bin, "new-session", "-d", "-s", session_name, command], [args.tmux_bin, "send-keys", "-t", session_name, str(request["task"]), "Enter"]],
        "real_claude_used": False,
        "non_claims": {"no_tui_lifecycle_control": True, "no_claude_print_default": True},
    }
    write_json(result_path, result)
    print(f"session_id={session_name}")
    print("status=applied")
    return 0


def require_session(registry_path: Path, session_id: str) -> tuple[dict[str, Any], dict[str, Any]]:
    registry = load_registry(registry_path)
    session = find_session(registry, session_id)
    if session is None:
        raise TmuxLifecycleError(f"unknown session: {session_id}")
    return registry, session


def capture(args: argparse.Namespace) -> int:
    registry, session = require_session(Path(args.registry), args.session_id)
    session_name = str(session.get("tmux_session_name") or session["id"])
    completed = run_tmux(args.tmux_bin, ["capture-pane", "-t", session_name, "-p", "-S", f"-{int(args.lines)}"])
    captured_preview = preview(completed.stdout, int(args.max_preview_chars))
    session["last_output_preview"] = captured_preview
    session["captured_at"] = iso_now()
    save_registry(Path(args.registry), registry)
    data = {
        "schema_version": CAPTURE_SCHEMA,
        "action": "capture",
        "status": "captured",
        "session_id": args.session_id,
        "tmux_session_name": session_name,
        "preview": captured_preview,
        "real_claude_used": False,
    }
    write_json(Path(args.output), data)
    print(f"capture={canonical(Path(args.output))}")
    print("status=captured")
    return 0


def send(args: argparse.Namespace) -> int:
    if SECRET_PATTERN.search(args.text):
        raise TmuxLifecycleError("follow-up text contains secret-like material")
    registry, session = require_session(Path(args.registry), args.session_id)
    session_name = str(session.get("tmux_session_name") or session["id"])
    run_tmux(args.tmux_bin, ["send-keys", "-t", session_name, args.text, "Enter"])
    session["status"] = "waiting_for_input"
    session["last_sent_at"] = iso_now()
    save_registry(Path(args.registry), registry)
    print(f"session_id={args.session_id}")
    print("status=sent")
    return 0


def stop(args: argparse.Namespace) -> int:
    registry, session = require_session(Path(args.registry), args.session_id)
    session_name = str(session.get("tmux_session_name") or session["id"])
    run_tmux(args.tmux_bin, ["kill-session", "-t", session_name])
    session["status"] = "stopped"
    session["stopped_at"] = iso_now()
    save_registry(Path(args.registry), registry)
    result = {
        "schema_version": RESULT_SCHEMA,
        "action": "stop",
        "status": "applied",
        "session_id": args.session_id,
        "tmux_session_name": session_name,
        "command": [args.tmux_bin, "kill-session", "-t", session_name],
        "real_claude_used": False,
        "non_claims": {"no_tui_lifecycle_control": True},
    }
    write_json(Path(args.result), result)
    print(f"session_id={args.session_id}")
    print("status=stopped")
    return 0


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Manual tmux lifecycle adapter for Claude Code sessions")
    sub = parser.add_subparsers(dest="command", required=True)

    p = sub.add_parser("prepare-start")
    p.add_argument("--request", required=True)
    p.add_argument("--registry", required=True)
    p.add_argument("--evidence", required=True)
    p.set_defaults(func=prepare_start)

    p = sub.add_parser("grant-start")
    p.add_argument("--evidence", required=True)
    p.add_argument("--grant", required=True)
    p.add_argument("--ttl-minutes", type=int, default=15)
    p.add_argument("--approved-by", default="operator")
    p.set_defaults(func=grant_start)

    p = sub.add_parser("apply-start")
    p.add_argument("--evidence", required=True)
    p.add_argument("--grant", required=True)
    p.add_argument("--registry", required=True)
    p.add_argument("--result", required=True)
    p.add_argument("--tmux-bin", default="tmux")
    p.set_defaults(func=apply_start)

    p = sub.add_parser("capture")
    p.add_argument("--session-id", required=True)
    p.add_argument("--registry", required=True)
    p.add_argument("--output", required=True)
    p.add_argument("--tmux-bin", default="tmux")
    p.add_argument("--lines", type=int, default=80)
    p.add_argument("--max-preview-chars", type=int, default=240)
    p.set_defaults(func=capture)

    p = sub.add_parser("send")
    p.add_argument("--session-id", required=True)
    p.add_argument("--registry", required=True)
    p.add_argument("--text", required=True)
    p.add_argument("--tmux-bin", default="tmux")
    p.set_defaults(func=send)

    p = sub.add_parser("stop")
    p.add_argument("--session-id", required=True)
    p.add_argument("--registry", required=True)
    p.add_argument("--result", required=True)
    p.add_argument("--tmux-bin", default="tmux")
    p.set_defaults(func=stop)
    return parser.parse_args(argv)


def main(argv: list[str]) -> int:
    args = parse_args(argv)
    return int(args.func(args))


if __name__ == "__main__":
    try:
        raise SystemExit(main(sys.argv[1:]))
    except TmuxLifecycleError as exc:
        print(str(exc), file=sys.stderr)
        raise SystemExit(2)
