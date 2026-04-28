#!/usr/bin/env python3
"""Audit recovered bid-manager skeleton coverage.

This is an active-runtime audit script. It does not mutate the preserved legacy
mirror; it reads the recovered skeleton assets and reports whether each skeleton
family has explicit working evidence.
"""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
LEGACY_BID = ROOT / "legacy" / "bid-manager"
SKELETONS = LEGACY_BID / "skeletons"

EXPECTED = {
    "1_technical": {"markdown": ["technical-compact.md", "technical-medium.md", "technical-full.md", "technical-colossus.md"], "docx": ["technical-compact.docx", "technical-medium.docx", "technical-full.docx", "technical-colossus.docx"]},
    "2_commercial": {"markdown": ["commercial-compact.md", "commercial-medium.md", "commercial-full.md"], "docx": ["commercial-compact.docx", "commercial-medium.docx", "commercial-full.docx"]},
    "3_rfi": {"markdown": ["rfi-compact.md", "rfi-medium.md", "rfi-full.md"], "docx": ["rfi-compact.docx", "rfi-medium.docx", "rfi-full.docx"]},
    "4_joint-response": {"markdown": ["joint-response-compact.md", "joint-response-medium.md", "joint-response-full.md"], "docx": ["joint-response-compact.docx", "joint-response-medium.docx", "joint-response-full.docx"]},
    "5_questionnaire": {"markdown": ["questionnaire-response.md"], "excel": ["settlemint-questionnaire-template.csv", "settlemint-questionnaire-template.xlsx", "settlemint-questionnaire-template-v1.0.0.xlsx"]},
    "7_generic": {"markdown": ["generic-compact.md", "generic-medium.md", "generic-full.md"]},
}


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8", errors="replace")


def md_metrics(path: Path) -> dict[str, Any]:
    text = read_text(path)
    return {
        "path": str(path.relative_to(ROOT)),
        "bytes": path.stat().st_size,
        "word_count": len(re.findall(r"\b\w+\b", text)),
        "headings": len(re.findall(r"^#{1,6}\s+", text, re.MULTILINE)),
        "mermaid_blocks": len(re.findall(r"```mermaid\b", text, re.IGNORECASE)),
        "image_refs": len(re.findall(r"!\[[^\]]*\]\([^\)]+\)", text)),
        "has_visual_spec": bool(re.search(r"visual spec|visual element policy|section-to-screenshot", text, re.IGNORECASE)),
        "has_quality_gate": bool(re.search(r"quality gates?|writer'?s checklist|must pass", text, re.IGNORECASE)),
    }


def audit_family(name: str) -> dict[str, Any]:
    base = SKELETONS / name
    family: dict[str, Any] = {"name": name, "exists": base.exists(), "missing": [], "artifacts": {}, "metrics": {}, "ok": False}
    if not base.exists():
        family["missing"].append(str(base.relative_to(ROOT)))
        return family

    spec = EXPECTED.get(name, {})
    for bucket, files in spec.items():
        if bucket == "markdown":
            subdir = base / "markdown"
        elif bucket == "docx":
            subdir = base / "docx"
        elif bucket == "excel":
            subdir = base / "excel"
        else:
            subdir = base
        found = []
        for fn in files:
            p = subdir / fn
            if p.exists() and p.stat().st_size > 0:
                found.append(str(p.relative_to(ROOT)))
            else:
                family["missing"].append(str(p.relative_to(ROOT)))
        family["artifacts"][bucket] = found

    md_paths = sorted((base / "markdown").glob("*.md")) if (base / "markdown").exists() else []
    if md_paths:
        metrics = [md_metrics(p) for p in md_paths]
        family["metrics"]["markdown"] = metrics
        family["metrics"]["total_mermaid_blocks"] = sum(m["mermaid_blocks"] for m in metrics)
        family["metrics"]["visual_spec_files"] = sum(1 for m in metrics if m["has_visual_spec"])
        family["metrics"]["quality_gate_files"] = sum(1 for m in metrics if m["has_quality_gate"])

    family["ok"] = not family["missing"]
    return family


def audit_diagrams() -> dict[str, Any]:
    base = SKELETONS / "6_diagrams"
    mmds = sorted((base / "skeletons").glob("*.mmd")) if (base / "skeletons").exists() else []
    docs = [base / "README.md", base / "DIAGRAM-TYPES.md", base / "STYLE-GUIDE.md"]
    missing = [str(p.relative_to(ROOT)) for p in docs if not p.exists() or p.stat().st_size == 0]
    return {
        "name": "6_diagrams",
        "exists": base.exists(),
        "mmd_count": len(mmds),
        "examples": [str(p.relative_to(ROOT)) for p in mmds[:10]],
        "docs": [str(p.relative_to(ROOT)) for p in docs if p.exists()],
        "missing": missing,
        "ok": base.exists() and len(mmds) >= 25 and not missing,
    }


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Audit recovered bid-manager skeleton-family coverage")
    parser.add_argument("--json", action="store_true", help="Emit JSON")
    ns = parser.parse_args(argv)

    families = [audit_family(name) for name in EXPECTED]
    families.insert(5, audit_diagrams())
    totals = {
        "families": len(families),
        "families_ok": sum(1 for f in families if f.get("ok")),
        "markdown_files": sum(len(f.get("artifacts", {}).get("markdown", [])) for f in families),
        "docx_files": sum(len(f.get("artifacts", {}).get("docx", [])) for f in families),
        "excel_files": sum(len(f.get("artifacts", {}).get("excel", [])) for f in families),
        "diagram_skeletons": next((f.get("mmd_count", 0) for f in families if f["name"] == "6_diagrams"), 0),
    }
    payload = {
        "agent": "bid-manager",
        "root": str(ROOT),
        "skeleton_root": str(SKELETONS),
        "totals": totals,
        "families": families,
        "ok": totals["families_ok"] == totals["families"],
    }

    if ns.json:
        print(json.dumps(payload, indent=2))
    else:
        print(f"bid-manager skeleton audit: {totals['families_ok']}/{totals['families']} families OK")
        print(f"markdown={totals['markdown_files']} docx={totals['docx_files']} excel={totals['excel_files']} diagrams={totals['diagram_skeletons']}")
        for fam in families:
            mark = "OK" if fam.get("ok") else "FAIL"
            print(f"- {mark}: {fam['name']}")
            for missing in fam.get("missing", []):
                print(f"  missing: {missing}")
    return 0 if payload["ok"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
