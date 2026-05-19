#!/usr/bin/env python3
"""Project M012 control-plane registry rows into read-only Cockpit projection JSON.

The projection is intentionally read-only. It summarizes existing control registry
artifacts for UI rendering and never mutates GSD, Hermes, Kanban, or source
registry/evidence files.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from collections import Counter
from pathlib import Path
from typing import Any, Iterable

CONTROL_REGISTRY_SCHEMA = "hermes-cockpit.control-registry.v1"
PROJECTION_SCHEMA = "hermes-cockpit.control-projection.v1"
UNSAFE_ACTIONS_DISABLED = [
    "direct_db_edit",
    "transcript_prose_mutation",
    "unbounded_worker_loop",
    "production_readiness_claim",
    "worker_output_task_completion",
]


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def load_json(path: Path) -> dict[str, Any]:
    parsed = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(parsed, dict):
        raise ValueError(f"{path}: expected JSON object")
    return parsed


def load_registry(path: Path) -> list[dict[str, Any]]:
    rows: list[dict[str, Any]] = []
    with path.open("r", encoding="utf-8-sig") as handle:
        for line_number, raw_line in enumerate(handle, start=1):
            line = raw_line.strip()
            if not line:
                continue
            try:
                parsed = json.loads(line)
            except json.JSONDecodeError as exc:
                raise ValueError(f"{path}:{line_number}: invalid JSON: {exc}") from exc
            if not isinstance(parsed, dict):
                raise ValueError(f"{path}:{line_number}: registry row must be an object")
            if parsed.get("schema_version") != CONTROL_REGISTRY_SCHEMA:
                raise ValueError(f"{path}:{line_number}: unsupported schema {parsed.get('schema_version')!r}")
            rows.append(parsed)
    return rows


def artifact_name(path: str | None) -> str:
    if not path:
        return "missing-evidence"
    return Path(path).name or str(path)


def bool_count(rows: Iterable[dict[str, Any]], key: str) -> int:
    return sum(1 for row in rows if bool(row.get(key)))


def merged_non_claims(rows: list[dict[str, Any]], smoke_summaries: list[dict[str, Any]]) -> dict[str, bool]:
    observed: dict[str, bool] = {
        "no_direct_db_edit": bool_count(rows, "direct_db_edit") == 0,
        "no_transcript_prose_mutation": True,
        "no_public_agent_loop": True,
        "no_task_completion_claim": True,
        "no_production_readiness": True,
        "worker_output_is_evidence_only": True,
    }
    for row in rows:
        claims = row.get("non_claims") if isinstance(row.get("non_claims"), dict) else {}
        for key, value in claims.items():
            observed[key] = observed.get(key, True) and bool(value)
    for summary in smoke_summaries:
        claims = summary.get("non_claims") if isinstance(summary.get("non_claims"), dict) else {}
        for key, value in claims.items():
            observed[key] = observed.get(key, True) and bool(value)
    return observed


def host_labels_for(row: dict[str, Any], smoke_summaries: list[dict[str, Any]]) -> dict[str, str]:
    target = row.get("target") if isinstance(row.get("target"), dict) else {}
    if target.get("system") == "worker":
        for summary in smoke_summaries:
            labels = summary.get("host_labels")
            if isinstance(labels, dict) and labels:
                return {str(k): str(v) for k, v in labels.items()}
    return {
        "migi_pi": "orchestrator",
        "windows_gpc": "bounded_worker" if target.get("id") == "windows-gpc-smoke" else "available_worker",
        "tux_wsl": "context_only",
    }


def summarize_operation(row: dict[str, Any], smoke_summaries: list[dict[str, Any]]) -> dict[str, Any]:
    target = row.get("target") if isinstance(row.get("target"), dict) else {}
    non_claims = row.get("non_claims") if isinstance(row.get("non_claims"), dict) else {}
    return {
        "operation_id": row.get("operation_id"),
        "operation_type": row.get("operation_type"),
        "lane": row.get("lane"),
        "mode": row.get("mode"),
        "status": row.get("status"),
        "target": target,
        "evidence_path": row.get("evidence_path"),
        "recorded_at": row.get("recorded_at"),
        "control_run_id": row.get("control_run_id"),
        "direct_db_edit": bool(row.get("direct_db_edit")),
        "source_mutated": bool(row.get("source_mutated")),
        "target_mutated": bool(row.get("target_mutated")),
        "rejection_reasons": list(row.get("rejection_reasons") or []),
        "host_labels": host_labels_for(row, smoke_summaries),
        "non_claims": {str(k): bool(v) for k, v in non_claims.items()},
        "requires_approval_before_apply": False,
    }


def approval_required(operation: dict[str, Any], applied_ids: set[str]) -> bool:
    if operation.get("status") != "dry_run_passed":
        return False
    operation_id = operation.get("operation_id")
    if operation_id in applied_ids:
        return False
    # Watcher baselines are rendered as controls but still need later S05 approval before durable install/apply.
    return True


def make_approval(operation: dict[str, Any]) -> dict[str, Any]:
    target = operation.get("target") if isinstance(operation.get("target"), dict) else {}
    return {
        "approval_id": f"approval_{operation.get('operation_id')}",
        "operation_id": operation.get("operation_id"),
        "operation_type": operation.get("operation_type"),
        "lane": operation.get("lane"),
        "target_id": target.get("id"),
        "evidence_path": operation.get("evidence_path"),
        "reason": "dry-run passed; explicit approval is required before apply or durable control action",
        "decision_options": ["approve_apply", "keep_dry_run_only", "reject"],
    }


def make_warning(row: dict[str, Any]) -> dict[str, Any] | None:
    reasons = list(row.get("rejection_reasons") or [])
    unsafe = []
    if row.get("direct_db_edit"):
        unsafe.append("direct DB edit flag observed")
    if row.get("source_mutated"):
        unsafe.append("source mutation flag observed")
    if row.get("status") == "rejected" or reasons or unsafe:
        op_type = row.get("operation_type")
        message_parts = [str(op_type or row.get("operation_id") or "control operation")]
        message_parts.extend(str(reason) for reason in reasons)
        message_parts.extend(unsafe)
        return {
            "severity": "warning" if not unsafe else "critical",
            "operation_id": row.get("operation_id"),
            "message": " | ".join(message_parts),
            "evidence_uri": row.get("evidence_path"),
        }
    return None


def make_artifact(row: dict[str, Any]) -> dict[str, Any] | None:
    evidence_path = row.get("evidence_path")
    if not evidence_path:
        return None
    return {
        "artifact_uri": f"file://{evidence_path}",
        "name": artifact_name(str(evidence_path)),
        "kind": "control-evidence",
        "summary": f"{row.get('lane')} {row.get('mode')} {row.get('status')} evidence for {row.get('operation_id')}",
        "trust_status": "verified" if row.get("status") in {"dry_run_passed", "applied", "completed"} else "rejected",
        "approval_state": "required" if row.get("status") == "dry_run_passed" else "none",
        "evidence_state": "control_registry",
        "evidence_uri": f"file://{evidence_path}",
    }


def project_control_plane(
    *,
    registry_paths: list[str | Path],
    smoke_summary_paths: list[str | Path] | None = None,
) -> dict[str, Any]:
    registry_path_objs = [Path(path) for path in registry_paths]
    smoke_path_objs = [Path(path) for path in (smoke_summary_paths or [])]
    source_manifest = [
        {"path": str(path), "sha256": sha256(path), "kind": "control-registry"}
        for path in registry_path_objs
    ]
    smoke_summaries = [load_json(path) for path in smoke_path_objs if path.exists()]
    source_manifest.extend(
        {"path": str(path), "sha256": sha256(path), "kind": "smoke-summary"}
        for path in smoke_path_objs
        if path.exists()
    )

    rows: list[dict[str, Any]] = []
    for path in registry_path_objs:
        rows.extend(load_registry(path))
    rows.sort(key=lambda row: (str(row.get("recorded_at") or ""), str(row.get("operation_id") or ""), str(row.get("mode") or "")))

    operations = [summarize_operation(row, smoke_summaries) for row in rows]
    applied_ids = {str(op.get("operation_id")) for op in operations if op.get("status") in {"applied", "completed"}}
    approvals_required = []
    for operation in operations:
        if approval_required(operation, applied_ids):
            operation["requires_approval_before_apply"] = True
            approvals_required.append(make_approval(operation))

    warnings = [warning for row in rows if (warning := make_warning(row)) is not None]
    artifacts = [artifact for row in rows if (artifact := make_artifact(row)) is not None]
    status_counts = Counter(str(row.get("status") or "unknown") for row in rows)
    lane_counts = Counter(str(row.get("lane") or "unknown") for row in rows)
    summary = {
        "entry_count": len(rows),
        "dry_run_passed_count": status_counts.get("dry_run_passed", 0),
        "applied_count": status_counts.get("applied", 0) + status_counts.get("completed", 0),
        "rejected_count": status_counts.get("rejected", 0),
        "direct_db_edit_count": bool_count(rows, "direct_db_edit"),
        "source_mutated_count": bool_count(rows, "source_mutated"),
        "target_mutated_count": bool_count(rows, "target_mutated"),
        "lane_counts": dict(sorted(lane_counts.items())),
    }
    non_claims = merged_non_claims(rows, smoke_summaries)

    return {
        "projection_version": PROJECTION_SCHEMA,
        "source": {
            "kind": "control-plane",
            "mode": "read-only",
            "read_only": True,
            "registries": [str(path) for path in registry_path_objs],
            "smoke_summaries": [str(path) for path in smoke_path_objs if path.exists()],
            "manifest": source_manifest,
        },
        "source_mutated": False,
        "control_plane": {
            "summary": summary,
            "operations": operations,
            "unsafe_actions_disabled": list(UNSAFE_ACTIONS_DISABLED),
            "non_claims": non_claims,
        },
        "approvals": {"required": approvals_required, "pending": approvals_required, "recorded": []},
        "warnings": warnings,
        "artifacts": artifacts,
        "cards": [],
        "active_runs": [],
        "completed_runs": [],
        "replay": [],
        "event_count": len(rows),
    }


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Project M012 control registry rows for Hermes Cockpit rendering")
    parser.add_argument("--registry", action="append", required=True, type=Path, help="Control registry JSONL path; repeatable")
    parser.add_argument("--smoke-summary", action="append", default=[], type=Path, help="Optional smoke summary JSON path; repeatable")
    parser.add_argument("--output", required=True, type=Path)
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    try:
        projection = project_control_plane(registry_paths=args.registry, smoke_summary_paths=args.smoke_summary)
        write_json(args.output, projection)
        summary = {
            "output": str(args.output),
            "summary": projection["control_plane"]["summary"],
            "unsafe_actions_disabled": projection["control_plane"]["unsafe_actions_disabled"],
            "approval_required_count": len(projection["approvals"]["required"]),
        }
        print(json.dumps(summary, sort_keys=True))
        return 0
    except Exception as exc:
        print(f"control projection failed: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
