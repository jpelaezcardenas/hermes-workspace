#!/usr/bin/env python3
"""Run a compact RFP Forge → Bid Manager → Bid Checker regression."""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
import time
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
WRAPPER = ROOT / "bin" / "bid-manager"
BID = ROOT / "legacy" / "bid-manager"
FORGE_OUTPUT = ROOT / "legacy" / "rfp-forge" / "output"
TECH_SKELETON = BID / "skeletons" / "1_technical" / "markdown" / "technical-compact.md"


def run(name: str, cmd: list[str], cwd: Path | None = None) -> dict[str, Any]:
    start = time.time()
    proc = subprocess.run(cmd, cwd=str(cwd or ROOT), text=True, capture_output=True)
    return {
        "name": name,
        "cmd": cmd,
        "exit": proc.returncode,
        "ok": proc.returncode == 0,
        "duration_seconds": round(time.time() - start, 3),
        "stdout_tail": proc.stdout[-4000:],
        "stderr_tail": proc.stderr[-4000:],
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Run bid-manager compact end-to-end regression")
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--out-dir", default=None)
    ns = parser.parse_args(argv)

    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    out_dir = Path(ns.out_dir).resolve() if ns.out_dir else BID / "output" / f"e2e-{stamp}"
    out_dir.mkdir(parents=True, exist_ok=True)

    cases: list[dict[str, Any]] = []
    cases.append(run("forge_generate_mea", [str(WRAPPER), "forge-generate-mea"]))

    rfp_md = FORGE_OUTPUT / "RFP" / "Middle-East-Africa" / "banks" / "emirates-nbd-rfp-tokenized-deposits-trade-finance-202603-v1.0.md"
    rfp_docx = out_dir / "forge-enbd-rfp.docx"
    extracted_json = out_dir / "forge-enbd-extract.json"
    response_md = out_dir / "bid-manager-enbd-response.md"
    response_docx = out_dir / "bid-manager-enbd-response.docx"

    cases.append(run("forge_rfp_md_to_docx", [str(WRAPPER), "md-to-docx", str(rfp_md), str(rfp_docx)]))
    extract = run("forge_extract_docx", [str(WRAPPER), "forge-extract", str(rfp_docx)])
    cases.append(extract)
    if extract["ok"]:
        extracted_json.write_text(extract["stdout_tail"], encoding="utf-8")

    skeleton = TECH_SKELETON.read_text(encoding="utf-8", errors="replace")
    response_md.write_text(
        "# Emirates NBD — Bid Manager E2E Technical Response Fixture\n\n"
        "## Executive Summary\n\n"
        "This regression fixture proves that a generated RFP Forge source can pass through the active bid-manager response surface and into bid-checker. It is not a client deliverable.\n\n"
        "## Source RFP Context\n\n"
        f"- Source RFP: `{rfp_md.relative_to(ROOT)}`\n"
        f"- Generated DOCX: `{rfp_docx.relative_to(ROOT)}`\n"
        f"- Extracted question JSON: `{extracted_json.relative_to(ROOT)}`\n\n"
        "---\n\n"
        + skeleton,
        encoding="utf-8",
    )

    cases.append(run("bid_manager_response_md_to_docx", [str(WRAPPER), "md-to-docx", str(response_md), str(response_docx)]))
    cases.append(run("bid_checker_response", [str(WRAPPER), "check-proposal", str(response_md)]))

    unexpected = [c for c in cases if not c["ok"]]
    payload = {
        "agent": "bid-manager",
        "root": str(ROOT),
        "artifact_dir": str(out_dir),
        "source_rfp": str(rfp_md),
        "response_md": str(response_md),
        "response_docx": str(response_docx),
        "case_count": len(cases),
        "passed_count": sum(1 for c in cases if c["ok"]),
        "unexpected": unexpected,
        "cases": cases,
        "ok": not unexpected,
    }
    (out_dir / "e2e-regression.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")

    if ns.json:
        print(json.dumps(payload, indent=2))
    else:
        print(f"bid-manager e2e regression: {payload['passed_count']}/{payload['case_count']} cases passed")
        print(f"artifacts: {out_dir}")
        for case in cases:
            print(f"- {'OK' if case['ok'] else 'FAIL'}: {case['name']} exit={case['exit']}")
    return 0 if payload["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
