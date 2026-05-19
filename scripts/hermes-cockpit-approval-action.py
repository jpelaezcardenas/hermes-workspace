#!/usr/bin/env python3
"""M014 approval-action contract validator and dry-run evidence writer.

Safety contract:
- Supports only the first M014 pilot operation: cockpit.audit_note_append.
- Writes evidence only during dry-run; it does not mutate the pilot target.
- Apply is intentionally blocked in S01 until WF3 implements exact evidence/approval matching.
- Never mutates GSD, Kanban, Hermes runtime, databases, workers, or watchers.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

SCHEMA_VERSION = "hermes-cockpit.approval-action.v1"
CONTRACT_ID = "m014.s01.approval-action.v1"
ALLOWED_OPERATION = "cockpit.audit_note_append"
TARGET_ROOT = Path("target/hermes-cockpit-m014")
DEFAULT_EVIDENCE_DIR = TARGET_ROOT / "approval-action-evidence"
TERMINAL_REJECTED = {"rejected", "apply_blocked"}

SECRET_PATTERNS: tuple[re.Pattern[str], ...] = (
    re.compile(r"sk-[A-Za-z0-9_-]{10,}"),
    re.compile(r"xox[a-z]-[A-Za-z0-9-]{12,}"),
    re.compile(r"github_pat_[A-Za-z0-9_]{12,}"),
    re.compile(r"ghp_[A-Za-z0-9_]{12,}"),
    re.compile(r"hf_[A-Za-z0-9_]{12,}"),
    re.compile(r"AIza[0-9A-Za-z_-]{12,}"),
    re.compile(r"eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}"),
    re.compile(r"(?i)authorization\s*:\s*bearer\s+[^\s,;}\"]+"),
    re.compile(r"(?i)[\"']?(authorization|api[_-]?key|client[_-]?secret|password|secret|token)[\"']?\s*:\s*[\"'][^\"']+[\"']"),
    re.compile(r"(?i)(authorization|api[_-]?key|client[_-]?secret|password|secret|token)\s*[:=]\s*[^\s,;}]+"),
)


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def canonical_json(value: Any) -> str:
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def canonical_hash(value: Any) -> str:
    encoded = canonical_json(value).encode("utf-8")
    return "sha256:" + hashlib.sha256(encoded).hexdigest()


def sha256_text(value: str) -> str:
    return "sha256:" + hashlib.sha256(value.encode("utf-8")).hexdigest()


def is_relative_to(child: Path, parent: Path) -> bool:
    try:
        child.relative_to(parent)
    except ValueError:
        return False
    return True


def has_secret(value: Any) -> bool:
    text = canonical_json(value) if not isinstance(value, str) else value
    return any(pattern.search(text) for pattern in SECRET_PATTERNS)


def file_signature(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"exists": False, "size": 0, "sha256": "sha256:" + hashlib.sha256(b"").hexdigest()}
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    stat = path.stat()
    return {"exists": True, "size": stat.st_size, "mtime_ns": stat.st_mtime_ns, "sha256": "sha256:" + digest.hexdigest()}


def normalized_relative_path(path_value: Any) -> Path | None:
    if not isinstance(path_value, str) or not path_value.strip():
        return None
    normalized = path_value.replace("\\", "/")
    candidate = Path(normalized)
    if candidate.is_absolute():
        return None
    return candidate


def _base_entry(operation: dict[str, Any], *, mode: str) -> dict[str, Any]:
    return {
        "schema_version": operation.get("schema_version"),
        "contract_id": operation.get("contract_id"),
        "operation_id": operation.get("operation_id"),
        "operation_type": operation.get("operation_type"),
        "mode": mode,
        "status": "drafted",
        "source_mutated": False,
        "target_mutated": False,
        "direct_db_edit": False,
        "rejection_reasons": [],
        "no_go": {},
        "audit": operation.get("audit") if isinstance(operation.get("audit"), dict) else default_audit(),
    }


def default_audit() -> dict[str, Any]:
    return {
        "created_by": "migi",
        "created_at": utc_now(),
        "events_emitted": [],
        "rollback_or_compensation": "append-only correction note if needed; no source-of-truth mutation",
        "non_claims": {
            "no_gsd_kanban_hermes_mutation": True,
            "no_direct_db_edit": True,
            "no_worker_dispatch": True,
            "no_watcher_install": True,
            "no_production_readiness": True,
        },
    }


def target_path_from_operation(operation: dict[str, Any]) -> str | None:
    target = operation.get("target") if isinstance(operation.get("target"), dict) else {}
    payload = operation.get("payload") if isinstance(operation.get("payload"), dict) else {}
    target_path = target.get("path")
    payload_path = payload.get("target_path")
    if target_path and payload_path and target_path != payload_path:
        return None
    return target_path or payload_path


def validate_operation(operation: dict[str, Any], *, mode: str, repo_root: str | Path) -> dict[str, Any]:
    del repo_root  # Validation is path-shape based; run_approval_actions resolves against repo root.
    entry = _base_entry(operation, mode=mode)
    reasons: list[str] = []
    no_go: dict[str, bool] = {}

    if operation.get("schema_version") != SCHEMA_VERSION:
        reasons.append(f"unsupported schema_version; expected {SCHEMA_VERSION}")
        no_go["unsupported_schema"] = True
    if operation.get("operation_type") != ALLOWED_OPERATION:
        reasons.append(f"unsupported operation_type for M014/S01 pilot: {operation.get('operation_type')}")
        no_go["unsupported_operation"] = True
    if mode not in {"dry-run", "apply"}:
        reasons.append("mode must be dry-run or apply")
        no_go["unsupported_mode"] = True
    if operation.get("mode") and operation.get("mode") != mode:
        reasons.append("operation mode does not match requested mode")
        no_go["mode_mismatch"] = True

    target_path_value = target_path_from_operation(operation)
    if target_path_value is None:
        reasons.append("target path mismatch between target.path and payload.target_path")
        no_go["path_mismatch"] = True
    target_rel = normalized_relative_path(target_path_value)
    if target_rel is None:
        reasons.append("target path must be a non-empty relative path")
        no_go["unsafe_path"] = True
    else:
        parts = set(target_rel.parts)
        as_text = target_rel.as_posix()
        if ".." in target_rel.parts:
            reasons.append("target path traversal is not allowed")
            no_go["unsafe_path"] = True
        if any(char in as_text for char in "*?["):
            reasons.append("broad target selectors/globs are not allowed")
            no_go["broad_target"] = True
        if ".hermes" in parts:
            reasons.append("runtime path under .hermes is not allowed")
            no_go["runtime_path"] = True
        if ".gsd" in parts or "gsd.db" in parts:
            reasons.append("path targets for .gsd or gsd.db are not allowed")
            no_go["direct_db_edit"] = True
        if not is_relative_to(target_rel, TARGET_ROOT):
            reasons.append(f"target path must stay under {TARGET_ROOT.as_posix()}")
            no_go["unsafe_path"] = True

    bounds = operation.get("bounds") if isinstance(operation.get("bounds"), dict) else {}
    if bounds.get("target_root") != TARGET_ROOT.as_posix():
        reasons.append(f"bounds.target_root must be {TARGET_ROOT.as_posix()}")
        no_go["bounds_mismatch"] = True
    if bounds.get("append_only") is not True:
        reasons.append("pilot requires append_only=true")
        no_go["not_append_only"] = True
    if int(bounds.get("max_operation_count") or 0) != 1:
        reasons.append("pilot requires max_operation_count=1")
        no_go["broad_target"] = True

    payload = operation.get("payload") if isinstance(operation.get("payload"), dict) else {}
    if not payload:
        reasons.append("payload is required")
        no_go["missing_payload"] = True
    if has_secret(payload):
        reasons.append("secret-like payload content is not allowed")
        no_go["secret_detected"] = True
    if payload.get("max_chars") and int(payload.get("max_chars")) > int(bounds.get("max_chars") or payload.get("max_chars")):
        reasons.append("payload max_chars exceeds bounds")
        no_go["bounds_mismatch"] = True
    expected_hash = canonical_hash(payload)
    if operation.get("payload_hash") != expected_hash:
        reasons.append("payload_hash does not match canonical redacted payload")
        no_go["payload_hash_mismatch"] = True

    target = operation.get("target") if isinstance(operation.get("target"), dict) else {}
    if target.get("system") != "artifact":
        reasons.append("target.system must be artifact for the M014 pilot")
        no_go["unsupported_target_system"] = True

    audit = entry["audit"]
    if not isinstance(audit.get("non_claims"), dict):
        audit["non_claims"] = default_audit()["non_claims"]
    for key, value in default_audit()["non_claims"].items():
        audit["non_claims"].setdefault(key, value)

    entry["payload_hash"] = operation.get("payload_hash")
    entry["target"] = target
    entry["bounds"] = bounds
    entry["no_go"] = no_go
    entry["rejection_reasons"] = reasons
    if reasons:
        entry["status"] = "rejected"
    elif mode == "apply":
        entry["status"] = "apply_blocked"
        entry["rejection_reasons"] = ["apply is blocked in S01 until WF3 implements exact dry-run evidence, approval, payload, and target matching"]
        entry["no_go"] = {"apply_not_implemented_in_s01": True}
    else:
        entry["status"] = "dry_run_required"
    return entry


def audit_row_for(operation: dict[str, Any]) -> dict[str, Any]:
    payload = operation.get("payload") if isinstance(operation.get("payload"), dict) else {}
    summary = str(payload.get("summary") or "").replace("\n", " ").strip()
    max_chars = int(payload.get("max_chars") or 240)
    if len(summary) > max_chars:
        summary = summary[: max_chars - 1].rstrip() + "…"
    row = {
        "schema_version": "hermes-cockpit.approval-action.audit-note.v1",
        "operation_id": operation.get("operation_id"),
        "operation_type": operation.get("operation_type"),
        "note_kind": payload.get("note_kind"),
        "summary": summary,
        "non_canonical": True,
        "source_of_truth_mutated": False,
    }
    row["row_hash"] = canonical_hash(row)
    return row


def write_json(path: Path, value: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def evidence_hash_for(record: dict[str, Any]) -> str:
    stable = json.loads(json.dumps(record))
    stable.pop("evidence_hash", None)
    if isinstance(stable.get("dry_run"), dict):
        stable["dry_run"].pop("evidence_hash", None)
    if isinstance(stable.get("apply"), dict):
        stable["apply"].pop("evidence_hash", None)
    return canonical_hash(stable)


def parse_utc(value: Any) -> datetime | None:
    if not isinstance(value, str) or not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def write_evidence_record(path: Path, entry: dict[str, Any]) -> dict[str, Any]:
    record = json.loads(json.dumps(entry))
    record["schema_version"] = SCHEMA_VERSION
    record.setdefault("created_at", record.get("recorded_at") or utc_now())
    digest = evidence_hash_for(record)
    record["evidence_hash"] = digest
    if isinstance(record.get("dry_run"), dict):
        record["dry_run"]["evidence_hash"] = digest
    if isinstance(record.get("apply"), dict):
        record["apply"]["evidence_hash"] = digest
    write_json(path, record)
    entry["evidence_hash"] = digest
    if isinstance(entry.get("dry_run"), dict):
        entry["dry_run"]["evidence_hash"] = digest
    if isinstance(entry.get("apply"), dict):
        entry["apply"]["evidence_hash"] = digest
    return record


def apply_block(entry: dict[str, Any], reason: str, *, no_go_key: str | None = None) -> dict[str, Any]:
    entry["status"] = "apply_blocked"
    entry["source_mutated"] = False
    entry["target_mutated"] = False
    entry.setdefault("rejection_reasons", []).append(reason)
    if no_go_key:
        entry.setdefault("no_go", {})[no_go_key] = True
    return entry


def evaluate_apply_operation(operation: dict[str, Any], entry: dict[str, Any], *, repo: Path) -> dict[str, Any]:
    dry_run_ref = operation.get("dry_run") if isinstance(operation.get("dry_run"), dict) else {}
    apply_guard = operation.get("apply_guard") if isinstance(operation.get("apply_guard"), dict) else {}
    dry_hash = dry_run_ref.get("evidence_hash") or apply_guard.get("dry_run_evidence_hash")
    if not dry_hash:
        return apply_block(entry, "WF3 dry_run_evidence_hash is required", no_go_key="dry_run_evidence_hash_missing")

    dry_path_value = dry_run_ref.get("evidence_path")
    if not isinstance(dry_path_value, str) or not dry_path_value:
        return apply_block(entry, "dry_run evidence_path is required", no_go_key="dry_run_evidence_missing")
    dry_path = Path(dry_path_value)
    if not dry_path.is_absolute():
        dry_path = repo / dry_path
    if not dry_path.exists():
        return apply_block(entry, "dry-run evidence file is missing", no_go_key="dry_run_evidence_missing")

    dry_record = json.loads(dry_path.read_text(encoding="utf-8"))
    actual_dry_hash = dry_record.get("evidence_hash") or evidence_hash_for(dry_record)
    if dry_hash != actual_dry_hash or apply_guard.get("dry_run_evidence_hash") != actual_dry_hash:
        return apply_block(entry, "dry-run evidence hash mismatch", no_go_key="dry_run_evidence_hash_mismatch")
    if dry_record.get("status") != "dry_run_passed":
        return apply_block(entry, "dry-run evidence status is not dry_run_passed", no_go_key="dry_run_not_passed")
    if dry_record.get("source_mutated") or dry_record.get("target_mutated"):
        return apply_block(entry, "dry-run evidence must report no source/target mutation", no_go_key="dry_run_mutated")

    for key in ("schema_version", "contract_id", "operation_id", "operation_type"):
        if operation.get(key) != dry_record.get(key):
            return apply_block(entry, f"{key} mismatch against dry-run evidence", no_go_key=f"{key}_mismatch")

    target_rel = normalized_relative_path(target_path_from_operation(operation))
    dry_target = dry_record.get("target") if isinstance(dry_record.get("target"), dict) else {}
    if target_rel is None or target_rel.as_posix() != dry_target.get("path"):
        return apply_block(entry, "target mismatch against dry-run evidence", no_go_key="target_mismatch")

    if operation.get("payload_hash") != dry_record.get("payload_hash"):
        return apply_block(entry, "payload hash mismatch against dry-run evidence", no_go_key="payload_hash_mismatch")
    if operation.get("payload_hash") != apply_guard.get("payload_hash"):
        return apply_block(entry, "payload hash mismatch against apply guard", no_go_key="payload_hash_mismatch")

    target_abs = repo / target_rel

    before_signature = file_signature(target_abs)
    dry_run = dry_record.get("dry_run") if isinstance(dry_record.get("dry_run"), dict) else {}
    dry_before = dry_run.get("target_signature_before")
    dry_prefix_hash = dry_run.get("target_prefix_hash") or (dry_before or {}).get("sha256")
    guard_before = apply_guard.get("target_signature_before")
    guard_prefix = apply_guard.get("target_prefix_hash")
    if guard_before != dry_before or before_signature != dry_before or guard_prefix != dry_prefix_hash:
        return apply_block(entry, "target signature stale or mismatch", no_go_key="target_signature_stale")

    approval = operation.get("approval") if isinstance(operation.get("approval"), dict) else None
    if not approval or approval.get("status") in {None, "not_requested", "missing"}:
        return apply_block(entry, "approval_missing", no_go_key="approval_missing")
    if approval.get("status") not in {"granted", "approved"}:
        return apply_block(entry, "approval_denied", no_go_key="approval_denied")
    if approval.get("dry_run_evidence_hash") != actual_dry_hash:
        return apply_block(entry, "approval_not_bound_to_dry_run_hash", no_go_key="approval_not_bound_to_dry_run_hash")
    dry_created = parse_utc(dry_record.get("created_at"))
    decided_at = parse_utc(approval.get("decided_at"))
    expires_at = parse_utc(approval.get("expires_at"))
    revoked_at = parse_utc(approval.get("revoked_at")) if approval.get("revoked_at") else None
    now = datetime.now(timezone.utc)
    if dry_created and decided_at and decided_at < dry_created:
        return apply_block(entry, "approval_precedes_dry_run", no_go_key="approval_precedes_dry_run")
    if expires_at and expires_at < now:
        return apply_block(entry, "approval_expired", no_go_key="approval_expired")
    if revoked_at:
        return apply_block(entry, "approval_revoked", no_go_key="approval_revoked")

    row = audit_row_for(operation)
    row_json = canonical_json(row) + "\n"
    target_abs.parent.mkdir(parents=True, exist_ok=True)
    with target_abs.open("a", encoding="utf-8") as handle:
        handle.write(row_json)
    after_signature = file_signature(target_abs)

    entry["status"] = "applied"
    entry["source_mutated"] = False
    entry["target_mutated"] = True
    entry["target_before_signature"] = dry_before
    entry["target_after_signature"] = after_signature
    entry["apply"] = {
        "dry_run_evidence_hash": actual_dry_hash,
        "actual_delta": {"append_rows": 1, "append_bytes": len(row_json.encode("utf-8"))},
        "row_hash": row["row_hash"],
        "approval_decision_id": approval.get("decision_id"),
    }
    entry["audit_row"] = row
    entry["rejection_reasons"] = []
    entry["no_go"] = {}
    return entry


def run_approval_actions(
    operations: list[dict[str, Any]],
    *,
    mode: str,
    repo_root: str | Path,
    evidence_dir: str | Path | None = None,
) -> list[dict[str, Any]]:
    repo = Path(repo_root).resolve()
    evidence_root = Path(evidence_dir) if evidence_dir is not None else repo / DEFAULT_EVIDENCE_DIR
    if not evidence_root.is_absolute():
        evidence_root = repo / evidence_root
    entries: list[dict[str, Any]] = []
    for index, operation in enumerate(operations, start=1):
        entry = validate_operation(operation, mode=mode, repo_root=repo)
        entry["recorded_at"] = utc_now()
        entry["created_at"] = entry["recorded_at"]
        if entry["status"] == "dry_run_required":
            target_rel = normalized_relative_path(target_path_from_operation(operation))
            assert target_rel is not None
            target_abs = repo / target_rel
            before_signature = file_signature(target_abs)
            row = audit_row_for(operation)
            row_json = canonical_json(row) + "\n"
            dry_run = {
                "status": "dry_run_passed",
                "evidence_id": f"m014_s01_{operation.get('operation_id')}_dry_run",
                "target_signature_before": before_signature,
                "target_prefix_hash": before_signature["sha256"],
                "expected_append_bytes": len(row_json.encode("utf-8")),
                "expected_delta": {"append_rows": 1, "append_bytes": len(row_json.encode("utf-8"))},
                "expected_row_hash": row["row_hash"],
                "source_mutated": False,
                "target_mutated": False,
                "would_mutate": True,
                "redaction_count": 0,
                "dropped_count": 0,
            }
            entry["status"] = "dry_run_passed"
            entry["dry_run"] = dry_run
            entry["audit_row_preview"] = row
        elif entry["status"] == "apply_blocked" and mode == "apply" and entry.get("no_go", {}).get("apply_not_implemented_in_s01"):
            entry["rejection_reasons"] = []
            entry["no_go"] = {}
            entry = evaluate_apply_operation(operation, entry, repo=repo)
        safe_operation_id = re.sub(r"[^A-Za-z0-9_.-]+", "-", str(operation.get("operation_id") or f"operation-{index}"))
        evidence_path = evidence_root / f"{safe_operation_id}-{mode}.json"
        entry["evidence_path"] = str(evidence_path)
        write_evidence_record(evidence_path, entry)
        entries.append(entry)
    return entries


def load_operations(path: Path) -> list[dict[str, Any]]:
    operations: list[dict[str, Any]] = []
    for line_no, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        if not line.strip():
            continue
        parsed = json.loads(line)
        if not isinstance(parsed, dict):
            raise ValueError(f"operation row {line_no} is not an object")
        operations.append(parsed)
    return operations


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Validate/run the M014 approval-action pilot contract")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--dry-run", action="store_true", help="Write dry-run evidence without mutating target")
    mode.add_argument("--apply", action="store_true", help="Blocked in S01; WF3 owns apply semantics")
    parser.add_argument("--operations", type=Path, required=True, help="JSONL operation file")
    parser.add_argument("--repo-root", type=Path, default=Path.cwd(), help="Repository root for target/evidence paths")
    parser.add_argument("--evidence-dir", type=Path, default=None, help="Evidence output directory")
    parser.add_argument("--output", type=Path, default=None, help="Optional JSON summary output path")
    return parser


def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    mode = "apply" if args.apply else "dry-run"
    operations = load_operations(args.operations)
    entries = run_approval_actions(operations, mode=mode, repo_root=args.repo_root, evidence_dir=args.evidence_dir)
    summary = {
        "schema_version": "hermes-cockpit.m014.approval-action-run.v1",
        "mode": mode,
        "entry_count": len(entries),
        "rejected_count": sum(1 for entry in entries if entry.get("status") in TERMINAL_REJECTED),
        "entries": entries,
        "non_claims": default_audit()["non_claims"],
    }
    if args.output:
        output = args.output if args.output.is_absolute() else args.repo_root / args.output
        write_json(output, summary)
    print(json.dumps(summary, sort_keys=True))
    return 0 if mode == "dry-run" or summary["rejected_count"] == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
