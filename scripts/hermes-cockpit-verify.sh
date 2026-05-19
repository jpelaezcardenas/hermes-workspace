#!/usr/bin/env bash
set -u

REPO_ROOT="${1:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
# Keep heavy Rust build cache off the shared CIFS workspace unless caller overrides it.
export CARGO_TARGET_DIR="${CARGO_TARGET_DIR:-/tmp/hermes-cockpit-target}"

python3 - "$REPO_ROOT" <<'PY'
import datetime
import json
import os
import pathlib
import subprocess
import sys
import time

repo = pathlib.Path(sys.argv[1]).resolve()
out_dir = repo / "target/hermes-cockpit-m012"
out_dir.mkdir(parents=True, exist_ok=True)
summary_path = out_dir / "pi-verify-summary.json"

COMMANDS = [
    {
        "key": "python",
        "label": "python3 -m unittest discover tests/hermes_cockpit -v",
        "argv": ["python3", "-m", "unittest", "discover", "tests/hermes_cockpit", "-v"],
        "cwd": repo,
        "log": out_dir / "pi-verify-python.log",
    },
    {
        "key": "cargo_fmt",
        "label": "cargo fmt --check",
        "argv": ["cargo", "fmt", "--check"],
        "cwd": repo / "prototypes/hermes-cockpit",
        "log": out_dir / "pi-verify-cargo-fmt.log",
    },
    {
        "key": "cargo_check",
        "label": "cargo check",
        "argv": ["cargo", "check"],
        "cwd": repo / "prototypes/hermes-cockpit",
        "log": out_dir / "pi-verify-cargo-check.log",
    },
    {
        "key": "cargo_test",
        "label": "cargo test",
        "argv": ["cargo", "test"],
        "cwd": repo / "prototypes/hermes-cockpit",
        "log": out_dir / "pi-verify-cargo-test.log",
    },
]

def tail(text: str, limit: int = 4000) -> str:
    if len(text) <= limit:
        return text
    return text[-limit:]

summary = {
    "schema_version": "hermes-cockpit.m012.pi-verify-summary.v1",
    "created_at": datetime.datetime.now(datetime.UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
    "repo_root": str(repo),
    "cargo_target_dir": os.environ.get("CARGO_TARGET_DIR"),
    "summary_path": "target/hermes-cockpit-m012/pi-verify-summary.json",
    "commands": [],
}

overall_exit = 0
for spec in COMMANDS:
    start = time.monotonic()
    completed = subprocess.run(
        spec["argv"],
        cwd=spec["cwd"],
        text=True,
        capture_output=True,
        check=False,
        env=os.environ.copy(),
    )
    duration_ms = int((time.monotonic() - start) * 1000)
    combined = ""
    if completed.stdout:
        combined += completed.stdout
    if completed.stderr:
        if combined and not combined.endswith("\n"):
            combined += "\n"
        combined += completed.stderr
    spec["log"].write_text(combined)
    if completed.returncode != 0 and overall_exit == 0:
        overall_exit = completed.returncode
    entry = {
        "key": spec["key"],
        "label": spec["label"],
        "argv": spec["argv"],
        "cwd": str(spec["cwd"]),
        "exit_code": completed.returncode,
        "duration_ms": duration_ms,
        "log_path": str(spec["log"].relative_to(repo)),
        "log_tail": tail(combined),
    }
    summary[spec["key"]] = entry
    summary["commands"].append(entry)
    print(f"{spec['key']}: exit={completed.returncode} duration_ms={duration_ms} log={entry['log_path']}")

summary["overall_exit_code"] = overall_exit
summary["overall_status"] = "pass" if overall_exit == 0 else "fail"
summary_path.write_text(json.dumps(summary, indent=2, sort_keys=True) + "\n")
print(f"summary={summary_path.relative_to(repo)}")
sys.exit(overall_exit)
PY
