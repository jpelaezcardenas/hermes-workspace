#!/usr/bin/env python3
"""Run the consolidated bid-manager health/parity gate.

This is the operator-grade command that proves the active wrapper works from a
stripped cron/operator environment, not just an interactive shell.
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import time
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
WRAPPER = ROOT / "bin" / "bid-manager"
BID = ROOT / "legacy" / "bid-manager"

STACK = [
    "status",
    "smoke",
    "skeleton-audit",
    "golden-regressions",
    "e2e-regression",
    "full-regression",
    "questionnaire-regression",
    "agent-contract-audit",
    "final-artifact-qa",
]


def clean_env() -> dict[str, str]:
    # Simulate cron/operator shells that do not inherit interactive PATH,
    # PYTHONPATH, venv activation, or user shell rc files.  The wrapper must add
    # /root/.local/bin and its Python path itself.
    return {
        "HOME": str(Path.home()),
        "PATH": "/usr/bin:/bin",
        "LANG": "C.UTF-8",
        "LC_ALL": "C.UTF-8",
    }


def parse_json(stdout: str) -> Any | None:
    text = stdout.strip()
    if not text:
        return None
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start = text.find("{")
        end = text.rfind("}")
        if start >= 0 and end > start:
            try:
                return json.loads(text[start : end + 1])
            except json.JSONDecodeError:
                return None
    return None


def run_case(command: str, out_dir: Path, use_clean_env: bool) -> dict[str, Any]:
    args = [str(WRAPPER), command]
    if command not in {"status", "smoke"}:
        args.append("--json")
    case_out = out_dir / command
    if command in {"golden-regressions", "e2e-regression", "full-regression", "questionnaire-regression", "final-artifact-qa"}:
        case_out.mkdir(parents=True, exist_ok=True)
        args.extend(["--out-dir", str(case_out)])
    start = time.time()
    proc = subprocess.run(
        args,
        cwd=str(ROOT),
        env=clean_env() if use_clean_env else os.environ.copy(),
        text=True,
        capture_output=True,
    )
    payload = parse_json(proc.stdout)
    ok_from_payload = payload.get("ok") if isinstance(payload, dict) else None
    ok = proc.returncode == 0 and (ok_from_payload is not False)
    return {
        "command": command,
        "cmd": args,
        "exit": proc.returncode,
        "ok": ok,
        "payload_ok": ok_from_payload,
        "duration_seconds": round(time.time() - start, 3),
        "stdout_tail": proc.stdout[-5000:],
        "stderr_tail": proc.stderr[-5000:],
        "artifact_dir": str(case_out) if case_out.exists() else None,
        "parsed_payload": payload,
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Run consolidated bid-manager parity/health gate")
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--out-dir", default=None)
    parser.add_argument("--no-clean-env", action="store_true", help="Use current environment instead of stripped cron-like env")
    ns = parser.parse_args(argv)

    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    out_dir = Path(ns.out_dir).resolve() if ns.out_dir else BID / "output" / f"parity-gate-{stamp}"
    out_dir.mkdir(parents=True, exist_ok=True)

    cases = [run_case(command, out_dir, use_clean_env=not ns.no_clean_env) for command in STACK]
    ok = all(case["ok"] for case in cases)
    summary = {
        "agent": "bid-manager",
        "gate": "parity-gate",
        "ok": ok,
        "clean_environment": not ns.no_clean_env,
        "artifact_dir": str(out_dir),
        "commands_total": len(cases),
        "commands_passed": sum(1 for case in cases if case["ok"]),
        "commands_failed": [case["command"] for case in cases if not case["ok"]],
        "cases": cases,
    }
    (out_dir / "parity-gate.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps(summary, indent=2) if ns.json else f"bid-manager parity gate: {'OK' if ok else 'FAIL'} artifacts={out_dir}")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
