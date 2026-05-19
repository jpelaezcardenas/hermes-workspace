#!/usr/bin/env python3
"""Build a read-only Hermes Cockpit projection for Claude Code sessions.

The adapter is intentionally registry-backed: it does not try to discover
undocumented Claude Code internal state. For each known session in the registry,
it reads official background logs or tmux captures, redacts/caps the preview,
and writes a Ratatui-compatible `claude_sessions` projection. Stopped tmux
sessions use cached registry preview text so the read-only Cockpit source can
project finalized real dogfood evidence without resurrecting or mutating a pane.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

SCHEMA = "hermes-cockpit.claude-sessions-projection.v1"
REGISTRY_SCHEMA = "hermes-cockpit.claude-session-registry.v1"
SOURCE_NAME = "claude-sessions"
REQUIRED_FIELDS = [
    "id",
    "display_name",
    "kind",
    "status",
    "host",
    "repo_path",
    "permission_mode",
    "command",
    "started_at",
]
OPTIONAL_PROJECTION_FIELDS = ["operation_id", "captured_at", "last_sent_at", "stopped_at"]
SECRET_PATTERNS = [
    re.compile(r"(?<![\w.%+-])[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}(?![\w.-])"),
    re.compile(r"(?i)(api[_-]?key\s*[=:]\s*)\S+"),
    re.compile(r"(?i)(token\s*[=:]\s*)\S+"),
    re.compile(r"(?i)(password\s*[=:]\s*)\S+"),
    re.compile(r"(?i)(secret\s*[=:]\s*)\S+"),
]


class AdapterError(RuntimeError):
    pass


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Emit read-only Claude Code background session projection JSON for Hermes Cockpit."
    )
    parser.add_argument("--registry", required=True, help="Registry JSON containing known Claude sessions")
    parser.add_argument("--output", required=True, help="Projection JSON output path")
    parser.add_argument("--claude-bin", default="claude", help="Claude Code CLI path; tests pass a fake executable")
    parser.add_argument("--tmux-bin", default="tmux", help="tmux executable path; tests pass a fake executable")
    parser.add_argument(
        "--max-preview-chars",
        type=int,
        default=240,
        help="Maximum characters of redacted log preview to keep per session",
    )
    return parser.parse_args(argv)


def canonical(path: Path) -> Path:
    try:
        return path.resolve(strict=False)
    except OSError as exc:
        raise AdapterError(f"invalid path {path}: {exc}") from exc


def load_registry(path: Path) -> dict[str, Any]:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise AdapterError(f"registry not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise AdapterError(f"registry is not valid JSON: {exc}") from exc

    sessions = data.get("sessions")
    if not isinstance(sessions, list):
        raise AdapterError("registry missing required field: sessions")
    return data


def validate_session(entry: dict[str, Any], index: int) -> None:
    for field in REQUIRED_FIELDS:
        value = entry.get(field)
        if value is None or value == "":
            raise AdapterError(f"session[{index}] missing required field: {field}")
    if "worktree_path" in entry and entry["worktree_path"] is not None and not isinstance(entry["worktree_path"], str):
        raise AdapterError(f"session[{index}] field worktree_path must be string or null")
    if "log_path" in entry and entry["log_path"] is not None and not isinstance(entry["log_path"], str):
        raise AdapterError(f"session[{index}] field log_path must be string or null")


def redact(text: str) -> str:
    text = " ".join(text.split())
    for pattern in SECRET_PATTERNS:
        if pattern.groups:
            text = pattern.sub(lambda match: match.group(1) + "[REDACTED]", text)
        else:
            text = pattern.sub("[REDACTED]", text)
    return text


def preview(text: str, max_chars: int) -> str:
    if max_chars < 16:
        raise AdapterError("--max-preview-chars must be at least 16")
    redacted = redact(text)
    if len(redacted) <= max_chars:
        return redacted
    return redacted[: max_chars - 1].rstrip() + "…"


def claude_subprocess_env() -> dict[str, str]:
    env = os.environ.copy()
    env.setdefault("DISABLE_AUTOUPDATER", "1")
    env.setdefault("DISABLE_UPDATES", "1")
    return env


def claude_logs(claude_bin: str, session_id: str) -> str:
    try:
        completed = subprocess.run(
            [claude_bin, "logs", session_id],
            text=True,
            capture_output=True,
            check=False,
            env=claude_subprocess_env(),
        )
    except OSError as exc:
        raise AdapterError(f"failed to run claude logs for {session_id}: {exc}") from exc
    if completed.returncode != 0:
        detail = (completed.stderr or completed.stdout or "unknown error").strip()
        raise AdapterError(f"claude logs failed for {session_id}: {detail}")
    return completed.stdout


def tmux_capture(tmux_bin: str, session: dict[str, Any], lines: int = 80) -> str:
    session_name = str(session.get("tmux_session_name") or session.get("id"))
    try:
        completed = subprocess.run(
            [tmux_bin, "capture-pane", "-t", session_name, "-p", "-S", f"-{lines}"],
            text=True,
            capture_output=True,
            check=False,
        )
    except OSError as exc:
        raise AdapterError(f"failed to run tmux capture-pane for {session_name}: {exc}") from exc
    if completed.returncode != 0:
        detail = (completed.stderr or completed.stdout or "unknown error").strip()
        raise AdapterError(f"tmux capture-pane failed for {session_name}: {detail}")
    return completed.stdout


def session_output(entry: dict[str, Any], claude_bin: str, tmux_bin: str) -> str:
    if entry.get("kind") == "ClaudeTmux":
        cached_preview = entry.get("last_output_preview")
        if entry.get("status") != "running" and isinstance(cached_preview, str) and cached_preview.strip():
            return cached_preview
        return tmux_capture(tmux_bin, entry)
    return claude_logs(claude_bin, str(entry["id"]))


def session_safety_labels(entry: dict[str, Any]) -> list[str]:
    labels = list(entry.get("safety_labels") or [])
    if entry.get("status") == "stop_attention_required":
        labels.extend(["cleanup_required", "verifier_required"])
    if entry.get("kind") in {"ClaudeBackground", "ClaudeTmux", "ClaudePty", "ClaudePrint"}:
        labels.append("verifier_required")
    seen: list[str] = []
    for label in labels:
        if isinstance(label, str) and label and label not in seen:
            seen.append(label)
    return seen


def project_session(entry: dict[str, Any], log_text: str, max_preview_chars: int) -> dict[str, Any]:
    session = {field: entry[field] for field in REQUIRED_FIELDS}
    session["worktree_path"] = entry.get("worktree_path")
    session["last_output_preview"] = preview(log_text, max_preview_chars)
    session["log_path"] = entry.get("log_path")
    if "stop_verification" in entry:
        session["stop_verification"] = entry["stop_verification"]
    for field in OPTIONAL_PROJECTION_FIELDS:
        if field in entry:
            session[field] = entry[field]
    for field in ("tmux_session_name", "attach_command", "send_command_template", "stop_command"):
        if field in entry:
            session[field] = entry[field]
    session["safety_labels"] = session_safety_labels(entry)
    return session


def build_projection(registry: dict[str, Any], claude_bin: str, tmux_bin: str, max_preview_chars: int) -> dict[str, Any]:
    sessions: list[dict[str, Any]] = []
    for index, raw_entry in enumerate(registry["sessions"]):
        if not isinstance(raw_entry, dict):
            raise AdapterError(f"session[{index}] must be an object")
        validate_session(raw_entry, index)
        log_text = session_output(raw_entry, claude_bin, tmux_bin)
        sessions.append(project_session(raw_entry, log_text, max_preview_chars))

    return {
        "schema_version": SCHEMA,
        "read_only": True,
        "generated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "source": {
            "name": SOURCE_NAME,
            "registry_schema": registry.get("schema_version", REGISTRY_SCHEMA),
            "session_count": len(sessions),
        },
        "claude_sessions": sessions,
        "cards": [],
        "warnings": [],
        "artifacts": [],
        "non_claims": {
            "no_real_session_discovery": True,
            "no_session_mutation": True,
            "no_tui_lifecycle_control": True,
        },
    }


def write_projection(output_path: Path, projection: dict[str, Any]) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(projection, indent=2) + "\n", encoding="utf-8")


def main(argv: list[str]) -> int:
    args = parse_args(argv)
    registry_path = canonical(Path(args.registry))
    output_path = canonical(Path(args.output))

    if registry_path == output_path:
        raise AdapterError("output must not overwrite registry")

    registry = load_registry(registry_path)
    projection = build_projection(registry, args.claude_bin, args.tmux_bin, args.max_preview_chars)
    write_projection(output_path, projection)
    print(f"projection={output_path}")
    print(f"sessions={len(projection['claude_sessions'])}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main(sys.argv[1:]))
    except AdapterError as exc:
        print(str(exc), file=sys.stderr)
        raise SystemExit(2)
