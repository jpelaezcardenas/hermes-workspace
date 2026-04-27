#!/usr/bin/env python3
"""Audit bid-manager user-facing runtime naming contract."""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CHECKS = [
    ROOT / "README.md",
    ROOT / "bin" / "bid-manager",
]
BANNED_ACTIVE_NAMES = ["proposal-maker", "proposal-factory"]
ALLOWED_LEGACY_CONTEXT = re.compile(r"legacy|not agent identities|not introduce|competing agent", re.IGNORECASE)


def scan_file(path: Path) -> list[dict]:
    findings = []
    text = path.read_text(encoding="utf-8", errors="replace")
    for line_no, line in enumerate(text.splitlines(), 1):
        lower = line.lower()
        for name in BANNED_ACTIVE_NAMES:
            if name in lower and not ALLOWED_LEGACY_CONTEXT.search(line):
                findings.append({"file": str(path.relative_to(ROOT)), "line": line_no, "name": name, "text": line.strip()})
    return findings


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Audit active bid-manager naming contract")
    parser.add_argument("--json", action="store_true")
    ns = parser.parse_args(argv)
    findings = []
    for path in CHECKS:
        findings.extend(scan_file(path))
    payload = {
        "agent": "bid-manager",
        "checked_files": [str(p.relative_to(ROOT)) for p in CHECKS],
        "banned_active_names": BANNED_ACTIVE_NAMES,
        "findings": findings,
        "ok": not findings,
    }
    print(json.dumps(payload, indent=2) if ns.json else f"bid-manager agent contract audit: {'OK' if payload['ok'] else 'FAIL'}")
    return 0 if payload["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
