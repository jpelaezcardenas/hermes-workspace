#!/usr/bin/env python3
"""Bounded Windows/GPC worker helper for Hermes Cockpit M012/S03.

This helper is intentionally narrow:
- Migi/Pi remains orchestrator and verifier.
- Windows/GPC is a bounded worker target reached over SSH.
- Tux/WSL is labelled as context-only unless a later slice explicitly changes that.
- Worker output is evidence only; it never marks GSD tasks complete.
"""

from __future__ import annotations

import argparse
import json
import subprocess
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable

SCHEMA_VERSION = "hermes-cockpit.windows-worker-evidence.v1"
ALLOWED_TARGETS = {"joe25@gpc"}
DEFAULT_TIMEOUT_SECONDS = 20
DEFAULT_OUTPUT_LIMIT_CHARS = 2000
MAX_TIMEOUT_SECONDS = 120


class CommandResult:
    def __init__(self, stdout: str = "", stderr: str = "", returncode: int = 0) -> None:
        self.stdout = stdout
        self.stderr = stderr
        self.returncode = returncode


Runner = Callable[..., Any]


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def truncate(value: str, limit: int) -> str:
    if len(value) <= limit:
        return value
    return value[: max(0, limit - 1)] + "…"


def result_stdout(result: Any) -> str:
    return str(getattr(result, "stdout", "") or "")


def result_stderr(result: Any) -> str:
    return str(getattr(result, "stderr", "") or "")


def result_returncode(result: Any) -> int:
    try:
        return int(getattr(result, "returncode", 0))
    except Exception:
        return 1


def run_subprocess(args: list[str], timeout: int | None = None) -> CommandResult:
    try:
        completed = subprocess.run(args, text=True, capture_output=True, check=False, timeout=timeout)
    except subprocess.TimeoutExpired as exc:
        return CommandResult(stdout=exc.stdout or "", stderr=(exc.stderr or "") + "\nwindows worker timed out", returncode=124)
    return CommandResult(stdout=completed.stdout, stderr=completed.stderr, returncode=completed.returncode)


def host_labels() -> dict[str, str]:
    return {
        "migi_pi": "orchestrator",
        "windows_gpc": "bounded_worker",
        "tux_wsl": "context_only",
    }


def non_claims() -> dict[str, bool]:
    return {
        "no_task_completion_claim": True,
        "no_public_agent_loop": True,
        "no_gsd_writeback_from_worker_output": True,
        "no_broad_windows_authority": True,
        "no_production_readiness": True,
    }


def validate_command(target: str, command: str, mode: str) -> list[str]:
    reasons: list[str] = []
    if mode not in {"dry-run", "apply"}:
        reasons.append("mode must be dry-run or apply")
    if target not in ALLOWED_TARGETS:
        reasons.append(f"target {target!r} is outside the allowlist")
    normalized = " ".join(command.strip().split())
    lowered = normalized.lower()
    if not normalized:
        reasons.append("command is required")
    elif not (lowered.startswith("cmd /c ") or lowered.startswith("powershell -noprofile ")):
        reasons.append("command must be an explicit cmd /c or powershell -NoProfile command")
    if "encodedcommand" in lowered or "-enc" in lowered:
        reasons.append("command must not use encoded PowerShell payloads")
    if any(token in lowered for token in ("&& del ", "&& erase ", "format ", "shutdown ", "restart-computer")):
        reasons.append("command contains a disallowed destructive token")
    return reasons


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def base_evidence(*, mode: str, target: str, command: str, timeout_seconds: int) -> dict[str, Any]:
    return {
        "schema_version": SCHEMA_VERSION,
        "mode": mode,
        "target": target,
        "target_host": "GPC" if target == "joe25@gpc" else target,
        "command_shape": command.split()[0] if command.strip() else None,
        "command_body_excluded": True,
        "host_labels": host_labels(),
        "worker_spawned": False,
        "spawnable": False,
        "exit_code": None,
        "duration_ms": 0,
        "cleanup_status": "not_started",
        "stdout_preview": "",
        "stderr_preview": "",
        "timeout_seconds": timeout_seconds,
        "rejection_reasons": [],
        "non_claims": non_claims(),
        "created_at": utc_now(),
    }


def run_windows_worker(
    *,
    mode: str,
    target: str,
    command: str,
    output_path: str | Path,
    runner: Runner = run_subprocess,
    timeout_seconds: int = DEFAULT_TIMEOUT_SECONDS,
    output_limit_chars: int = DEFAULT_OUTPUT_LIMIT_CHARS,
) -> dict[str, Any]:
    timeout = max(1, min(int(timeout_seconds), MAX_TIMEOUT_SECONDS))
    limit = max(1, int(output_limit_chars))
    evidence = base_evidence(mode=mode, target=target, command=command, timeout_seconds=timeout)
    reasons = validate_command(target, command, mode)
    output = Path(output_path)

    if reasons:
        evidence.update({"status": "rejected", "rejection_reasons": reasons, "cleanup_status": "not_started"})
        write_json(output, evidence)
        return evidence

    ssh_args = ["ssh", "-o", "BatchMode=yes", "-o", "ConnectTimeout=10", target, command]
    evidence["ssh_arg_shape"] = ["ssh", "-o", "BatchMode=yes", "-o", "ConnectTimeout=10", "<target>", "<command>"]

    if mode == "dry-run":
        evidence.update(
            {
                "status": "dry_run_passed",
                "spawnable": True,
                "worker_spawned": False,
                "cleanup_status": "not_started",
            }
        )
        write_json(output, evidence)
        return evidence

    start = time.monotonic()
    try:
        result = runner(ssh_args, timeout=timeout)
    except TypeError:
        result = runner(ssh_args)
    duration_ms = int((time.monotonic() - start) * 1000)
    exit_code = result_returncode(result)
    evidence.update(
        {
            "status": "completed" if exit_code == 0 else "failed",
            "spawnable": True,
            "worker_spawned": True,
            "exit_code": exit_code,
            "duration_ms": duration_ms,
            "cleanup_status": "completed" if exit_code == 0 else "completed_with_worker_failure",
            "stdout_preview": truncate(result_stdout(result), limit),
            "stderr_preview": truncate(result_stderr(result), limit),
        }
    )
    write_json(output, evidence)
    return evidence


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run one bounded Windows/GPC worker command over SSH")
    parser.add_argument("--mode", choices=["dry-run", "apply"], required=True)
    parser.add_argument("--target", required=True)
    parser.add_argument("--command", required=True)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--timeout", type=int, default=DEFAULT_TIMEOUT_SECONDS)
    parser.add_argument("--output-limit-chars", type=int, default=DEFAULT_OUTPUT_LIMIT_CHARS)
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    evidence = run_windows_worker(
        mode=args.mode,
        target=args.target,
        command=args.command,
        output_path=args.output,
        timeout_seconds=args.timeout,
        output_limit_chars=args.output_limit_chars,
    )
    print(json.dumps(evidence, sort_keys=True))
    if evidence.get("status") in {"dry_run_passed", "completed"}:
        return 0
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
