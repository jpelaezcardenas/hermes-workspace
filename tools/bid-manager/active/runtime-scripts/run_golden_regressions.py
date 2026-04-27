#!/usr/bin/env python3
"""Run curated bid-manager golden regressions.

The suite proves the active wrapper can still operate core recovered paths and
separates expected legacy fail-baselines from true regressions.
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
WRAPPER = ROOT / "bin" / "bid-manager"
VERIFY_ROOT = ROOT / "verification"
BID = ROOT / "legacy" / "bid-manager"
FORGE = ROOT / "legacy" / "rfp-forge"


def run_case(name: str, cmd: list[str], *, expected_exit: int | None = 0, expect_fail: bool = False, cwd: Path | None = None) -> dict[str, Any]:
    start = time.time()
    proc = subprocess.run(cmd, cwd=str(cwd or ROOT), text=True, capture_output=True)
    if expect_fail:
        passed = proc.returncode != 0
        expected = "nonzero"
    elif expected_exit is None:
        passed = proc.returncode == 0
        expected = "zero"
    else:
        passed = proc.returncode == expected_exit
        expected = str(expected_exit)
    return {
        "name": name,
        "cmd": cmd,
        "expected_exit": expected,
        "actual_exit": proc.returncode,
        "expected_failure_baseline": expect_fail,
        "passed": passed,
        "duration_seconds": round(time.time() - start, 3),
        "stdout_tail": proc.stdout[-4000:],
        "stderr_tail": proc.stderr[-4000:],
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Run bid-manager active-runtime golden regressions")
    parser.add_argument("--json", action="store_true", help="Emit JSON")
    parser.add_argument("--out-dir", default=None, help="Regression artifact directory")
    parser.add_argument("--keep", action="store_true", help="Keep generated artifacts (default already keeps under verification)")
    ns = parser.parse_args(argv)

    stamp = time.strftime("%Y%m%dT%H%M%SZ", time.gmtime())
    # Recovered converters deliberately guard writes to the canonical bid-manager
    # output root. Keep generated artifacts there; write the JSON report beside
    # them and mirror latest summaries in verification via the caller if needed.
    out_dir = Path(ns.out_dir).resolve() if ns.out_dir else BID / "output" / f"golden-{stamp}"
    out_dir.mkdir(parents=True, exist_ok=True)

    tech_md = BID / "skeletons" / "1_technical" / "markdown" / "technical-compact.md"
    tech_docx = BID / "skeletons" / "1_technical" / "docx" / "technical-compact.docx"
    comm_md = BID / "skeletons" / "2_commercial" / "markdown" / "commercial-compact.md"
    generic_md = BID / "skeletons" / "7_generic" / "markdown" / "generic-compact.md"
    questionnaire_csv = ROOT / "active" / "fixtures" / "questionnaire-approved.csv"
    questionnaire_xlsx = BID / "skeletons" / "5_questionnaire" / "excel" / "settlemint-questionnaire-template.xlsx"
    forge_broken = FORGE / "scripts" / "generate_mea_docs.py"

    cases: list[dict[str, Any]] = []
    cases.append(run_case("smoke_active_wrapper", [str(WRAPPER), "smoke"]))
    cases.append(run_case("skeleton_audit", [str(WRAPPER), "skeleton-audit", "--json"]))
    cases.append(run_case("technical_md_to_docx", [str(WRAPPER), "md-to-docx", str(tech_md), str(out_dir / "technical-compact.docx")]))
    cases.append(run_case("technical_docx_to_md", [str(WRAPPER), "docx-to-md", str(tech_docx), str(out_dir / "technical-compact-roundtrip.md")]))
    cases.append(run_case("questionnaire_csv_to_xlsx", [str(WRAPPER), "csv-to-xlsx", str(questionnaire_csv), str(out_dir / "questionnaire-template.xlsx")]))
    cases.append(run_case("questionnaire_xlsx_to_csv", [str(WRAPPER), "xlsx-to-csv", str(questionnaire_xlsx), str(out_dir / "questionnaire-template.csv")]))
    cases.append(run_case("bid_checker_technical_compact", [str(WRAPPER), "check-proposal", str(tech_md)]))
    cases.append(run_case("bid_checker_commercial_compact", [str(WRAPPER), "check-proposal", str(comm_md)]))
    cases.append(run_case("validator_generic_compact_expected_fail_visuals", [str(WRAPPER), "validate", str(generic_md), "compact", "--json"], expect_fail=True))
    cases.append(run_case("rfp_forge_generate_mea_expected_syntax_fail", [sys.executable, "-m", "py_compile", str(forge_broken)], expect_fail=True))

    unexpected = [c for c in cases if not c["passed"]]
    payload = {
        "agent": "bid-manager",
        "root": str(ROOT),
        "artifact_dir": str(out_dir),
        "case_count": len(cases),
        "passed_count": sum(1 for c in cases if c["passed"]),
        "expected_failure_baselines": [c["name"] for c in cases if c["expected_failure_baseline"]],
        "unexpected": unexpected,
        "cases": cases,
        "ok": not unexpected,
    }

    report = out_dir / "golden-regressions.json"
    report.write_text(json.dumps(payload, indent=2), encoding="utf-8")

    if ns.json:
        print(json.dumps(payload, indent=2))
    else:
        print(f"bid-manager golden regressions: {payload['passed_count']}/{payload['case_count']} cases matched expectation")
        print(f"artifacts: {out_dir}")
        for case in cases:
            state = "OK" if case["passed"] else "REGRESSION"
            suffix = " (expected fail baseline)" if case["expected_failure_baseline"] else ""
            print(f"- {state}: {case['name']}{suffix} exit={case['actual_exit']}")
    return 0 if payload["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
