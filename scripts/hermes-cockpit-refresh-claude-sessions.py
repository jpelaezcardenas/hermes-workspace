#!/usr/bin/env python3
"""Refresh the read-only Hermes Cockpit Claude sessions projection.

This is a tiny operator launcher around hermes-cockpit-claude-sessions.py. It
regenerates source 6 (`claude-sessions`) on demand or for a bounded/unbounded
watch interval. It does not start, send to, stop, or otherwise mutate Claude
sessions; lifecycle authority stays outside the Cockpit TUI.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

SCHEMA = "hermes-cockpit.claude-sessions-refresh.v1"
SOURCE = {"key": "6", "name": "claude-sessions"}


class RefreshError(RuntimeError):
    pass


def parse_args(argv: list[str]) -> argparse.Namespace:
    script_dir = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser(description="Refresh Cockpit source 6 Claude sessions projection JSON")
    parser.add_argument("--registry", required=True, help="Claude session registry JSON")
    parser.add_argument("--output", required=True, help="Projection output path for source 6 claude-sessions")
    parser.add_argument("--summary", help="Optional refresh summary JSON path")
    parser.add_argument(
        "--projection-script",
        default=str(script_dir / "hermes-cockpit-claude-sessions.py"),
        help="Projection builder script to invoke",
    )
    parser.add_argument("--claude-bin", default="claude", help="Claude Code CLI path; tests pass a fake executable")
    parser.add_argument("--tmux-bin", default="tmux", help="tmux executable path; tests pass a fake executable")
    parser.add_argument("--max-preview-chars", type=int, default=240, help="Preview cap passed to projection builder")
    parser.add_argument("--watch", action="store_true", help="Repeat refreshes on an interval")
    parser.add_argument("--interval-seconds", type=float, default=5.0, help="Seconds between watch refreshes")
    parser.add_argument(
        "--iterations",
        type=int,
        default=1,
        help="Refresh count. Use 0 only with --watch for an unbounded loop.",
    )
    return parser.parse_args(argv)


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def canonical(path: str) -> Path:
    try:
        return Path(path).resolve(strict=False)
    except OSError as exc:
        raise RefreshError(f"invalid path {path}: {exc}") from exc


def validate_paths(registry: Path, output: Path, summary: Path | None) -> None:
    if registry == output:
        raise RefreshError("output must not overwrite registry")
    if summary is not None:
        if summary == registry:
            raise RefreshError("summary must not overwrite registry")
        if summary == output:
            raise RefreshError("summary must not overwrite projection output")


def run_projection(args: argparse.Namespace, registry: Path, output: Path, projection_script: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [
            sys.executable,
            str(projection_script),
            "--registry",
            str(registry),
            "--output",
            str(output),
            "--claude-bin",
            args.claude_bin,
            "--tmux-bin",
            args.tmux_bin,
            "--max-preview-chars",
            str(args.max_preview_chars),
        ],
        text=True,
        capture_output=True,
        check=False,
    )


def load_projection(output: Path) -> dict[str, Any]:
    try:
        return json.loads(output.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise RefreshError(f"projection builder did not write output: {output}") from exc
    except json.JSONDecodeError as exc:
        raise RefreshError(f"projection output is not valid JSON: {exc}") from exc


def summarize(
    *,
    status: str,
    registry: Path,
    output: Path,
    projection_script: Path,
    refresh_count: int,
    projection: dict[str, Any] | None = None,
    error: str | None = None,
) -> dict[str, Any]:
    sessions = projection.get("claude_sessions", []) if projection else []
    source = projection.get("source", {}) if projection else {}
    return {
        "schema_version": SCHEMA,
        "status": status,
        "generated_at": utc_now(),
        "source": SOURCE,
        "projection_source_name": source.get("name", SOURCE["name"]),
        "registry_path": str(registry),
        "projection_path": str(output),
        "projection_script": str(projection_script),
        "refresh_count": refresh_count,
        "read_only": bool(projection.get("read_only")) if projection else False,
        "session_count": len(sessions),
        "session_ids": [session.get("id") for session in sessions if isinstance(session, dict)],
        "error": error,
        "non_claims": {
            "no_tui_lifecycle_control": True,
            "no_session_mutation": True,
            "no_real_session_discovery": True,
            "no_write_capable_authority": True,
        },
    }


def write_summary(path: Path | None, summary: dict[str, Any]) -> None:
    if path is None:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(summary, indent=2) + "\n", encoding="utf-8")


def refresh_once(
    args: argparse.Namespace,
    registry: Path,
    output: Path,
    summary_path: Path | None,
    projection_script: Path,
    refresh_count: int,
) -> dict[str, Any]:
    completed = run_projection(args, registry, output, projection_script)
    if completed.returncode != 0:
        detail = (completed.stderr or completed.stdout or "projection builder failed").strip()
        summary = summarize(
            status="fail",
            registry=registry,
            output=output,
            projection_script=projection_script,
            refresh_count=refresh_count,
            error=detail,
        )
        write_summary(summary_path, summary)
        raise RefreshError(detail)

    projection = load_projection(output)
    summary = summarize(
        status="pass",
        registry=registry,
        output=output,
        projection_script=projection_script,
        refresh_count=refresh_count,
        projection=projection,
    )
    write_summary(summary_path, summary)
    return summary


def main(argv: list[str]) -> int:
    args = parse_args(argv)
    registry = canonical(args.registry)
    output = canonical(args.output)
    projection_script = canonical(args.projection_script)
    summary_path = canonical(args.summary) if args.summary else None
    validate_paths(registry, output, summary_path)

    if args.interval_seconds < 0:
        raise RefreshError("--interval-seconds must be non-negative")
    if args.iterations < 0:
        raise RefreshError("--iterations must be non-negative")
    if args.iterations == 0 and not args.watch:
        raise RefreshError("--iterations 0 requires --watch")

    refresh_count = 0
    while True:
        refresh_count += 1
        summary = refresh_once(args, registry, output, summary_path, projection_script, refresh_count)
        print(f"refresh={refresh_count} status={summary['status']} projection={output}")

        if not args.watch:
            break
        if args.iterations and refresh_count >= args.iterations:
            break
        time.sleep(args.interval_seconds)

    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main(sys.argv[1:]))
    except RefreshError as exc:
        print(str(exc), file=sys.stderr)
        raise SystemExit(2)
