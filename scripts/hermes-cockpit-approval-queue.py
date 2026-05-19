#!/usr/bin/env python3
"""M015 approval queue + evidence ledger contract validator.

Safety contract:
- Supports exactly one artifact-only operation: cockpit.audit_note_append.
- Targets only the M015 sandbox root: target/hermes-cockpit-m015/.
- Validates queue, dry-run evidence, manual approval grant, ledger row, and no-go records.
- Does not mutate GSD, Kanban, Hermes runtime, databases, workers, watchers, cron, or Discord.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from copy import deepcopy
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any

SCHEMA_VERSION = "hermes-cockpit.approval-queue.v1"
CONTRACT_ID = "m015.s01.approval-queue.v1"
ALLOWED_OPERATION = "cockpit.audit_note_append"
TARGET_ROOT = Path("target/hermes-cockpit-m015")
ALLOWED_STATES = {
    "drafted",
    "dry_run_required",
    "dry_run_passed",
    "approval_pending",
    "approved",
    "denied",
    "rejected",
    "apply_blocked",
    "applied",
    "verified",
    "compensation_recorded",
}
DIRECT_TARGET_SYSTEMS = {
    "gsd": "direct_gsd_target",
    "kanban": "direct_kanban_target",
    "hermes": "direct_hermes_target",
}
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


def canonical_json(value: Any) -> str:
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def canonical_hash(value: Any) -> str:
    return "sha256:" + hashlib.sha256(canonical_json(value).encode("utf-8")).hexdigest()


def hash_without(record: dict[str, Any], field: str) -> str:
    stable = deepcopy(record)
    stable.pop(field, None)
    return canonical_hash(stable)


def parse_utc(value: Any) -> datetime | None:
    if not isinstance(value, str) or not value:
        return None
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed.astimezone(timezone.utc)


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def iso_utc(value: datetime) -> str:
    return value.astimezone(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def file_signature(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"exists": False, "size": 0, "sha256": "sha256:" + hashlib.sha256(b"").hexdigest()}
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    stat = path.stat()
    return {"exists": True, "size": stat.st_size, "sha256": "sha256:" + digest.hexdigest()}


def default_non_claims() -> dict[str, bool]:
    return {
        "no_gsd_kanban_hermes_mutation": True,
        "no_direct_db_edit": True,
        "no_worker_dispatch": True,
        "no_watcher_install": True,
        "no_durable_watcher": True,
        "no_cron_schedule": True,
        "no_discord_call": True,
        "no_tui_apply": True,
        "no_production_readiness": True,
        "artifact_only": True,
    }


def is_relative_to(child: Path, parent: Path) -> bool:
    try:
        child.relative_to(parent)
    except ValueError:
        return False
    return True


def normalized_relative_path(path_value: Any) -> Path | None:
    if not isinstance(path_value, str) or not path_value.strip():
        return None
    normalized = path_value.replace("\\", "/")
    candidate = Path(normalized)
    if candidate.is_absolute():
        return None
    return candidate


def target_path_from_entry(entry: dict[str, Any]) -> str | None:
    target = entry.get("target") if isinstance(entry.get("target"), dict) else {}
    payload = entry.get("payload") if isinstance(entry.get("payload"), dict) else {}
    target_path = target.get("path")
    payload_path = payload.get("target_path")
    if target_path and payload_path and target_path != payload_path:
        return None
    return target_path or payload_path


def has_secret(value: Any) -> bool:
    text = value if isinstance(value, str) else canonical_json(value)
    return any(pattern.search(text) for pattern in SECRET_PATTERNS)


def result_base(entry: dict[str, Any] | None = None) -> dict[str, Any]:
    non_claims: dict[str, Any] = {}
    if isinstance(entry, dict):
        audit = entry.get("audit") if isinstance(entry.get("audit"), dict) else {}
        non_claims = audit.get("non_claims") if isinstance(audit.get("non_claims"), dict) else {}
    merged_non_claims = default_non_claims() | {k: bool(v) for k, v in non_claims.items()}
    return {
        "schema_version": (entry or {}).get("schema_version") if isinstance(entry, dict) else None,
        "contract_id": (entry or {}).get("contract_id") if isinstance(entry, dict) else None,
        "queue_id": (entry or {}).get("queue_id") if isinstance(entry, dict) else None,
        "operation_id": (entry or {}).get("operation_id") if isinstance(entry, dict) else None,
        "operation_type": (entry or {}).get("operation_type") if isinstance(entry, dict) else None,
        "status": "accepted",
        "source_mutated": False,
        "target_mutated": False,
        "direct_db_edit": False,
        "artifact_only": True,
        "non_claims": merged_non_claims,
        "rejection_reasons": [],
        "no_go": {},
    }


def add_rejection(result: dict[str, Any], reason: str, key: str) -> None:
    result.setdefault("rejection_reasons", []).append(reason)
    result.setdefault("no_go", {})[key] = True


def validate_queue_entry(entry: dict[str, Any], *, repo_root: str | Path | None = None) -> dict[str, Any]:
    """Validate one M015 approval queue entry without mutating the repository."""
    del repo_root  # Contract validation is path-shape based for S01.
    result = result_base(entry)

    if entry.get("schema_version") != SCHEMA_VERSION:
        add_rejection(result, f"unsupported schema_version; expected {SCHEMA_VERSION}", "unsupported_schema")
    if entry.get("contract_id") != CONTRACT_ID:
        add_rejection(result, f"unsupported contract_id; expected {CONTRACT_ID}", "unsupported_contract")
    if entry.get("operation_type") != ALLOWED_OPERATION:
        add_rejection(result, f"unsupported operation for M015/S01: {entry.get('operation_type')}", "unsupported_operation")

    state = entry.get("state")
    if state not in ALLOWED_STATES:
        add_rejection(result, "queue state is unsupported or missing", "unsupported_state")

    target = entry.get("target") if isinstance(entry.get("target"), dict) else {}
    target_system = str(target.get("system") or "").lower()
    if target_system in DIRECT_TARGET_SYSTEMS:
        label = target_system.upper() if target_system == "gsd" else target_system.capitalize()
        add_rejection(result, f"direct {label} target is prohibited", DIRECT_TARGET_SYSTEMS[target_system])
    elif target.get("system") != "artifact":
        add_rejection(result, "target.system must be artifact for M015/S01", "unsupported_target_system")

    target_path_value = target_path_from_entry(entry)
    if target_path_value is None:
        add_rejection(result, "target path mismatch between target.path and payload.target_path", "target_mismatch")
    target_path = normalized_relative_path(target_path_value)
    if target_path is None:
        add_rejection(result, f"target path must be a relative path under {TARGET_ROOT.as_posix()}", "unsafe_root")
    else:
        as_text = target_path.as_posix()
        parts = set(target_path.parts)
        if ".." in target_path.parts:
            add_rejection(result, "target path traversal is not allowed", "path_traversal")
        if any(char in as_text for char in "*?["):
            add_rejection(result, "broad mutation selectors/globs are not allowed", "broad_mutation")
        if ".gsd" in parts or "gsd.db" in parts:
            add_rejection(result, "direct GSD target is prohibited", "direct_gsd_target")
        if ".hermes" in parts:
            add_rejection(result, "direct Hermes target is prohibited", "direct_hermes_target")
        if not is_relative_to(target_path, TARGET_ROOT):
            add_rejection(result, f"target path must stay under {TARGET_ROOT.as_posix()}", "unsafe_root")

    bounds = entry.get("bounds") if isinstance(entry.get("bounds"), dict) else {}
    target_root = bounds.get("target_root") or target.get("root")
    if target_root != TARGET_ROOT.as_posix():
        add_rejection(result, f"unsafe root: target_root must be {TARGET_ROOT.as_posix()}", "unsafe_root")
    if target.get("root") and target.get("root") != TARGET_ROOT.as_posix():
        add_rejection(result, f"unsafe root: target.root must be {TARGET_ROOT.as_posix()}", "unsafe_root")
    if bounds.get("append_only") is not True:
        add_rejection(result, "artifact operation must be append_only=true", "broad_mutation")
    if int(bounds.get("max_operation_count") or 0) != 1:
        add_rejection(result, "approval queue requires max_operation_count=1", "broad_mutation")
    if bounds.get("artifact_only") is not True:
        add_rejection(result, "approval queue is artifact-only", "broad_mutation")

    payload = entry.get("payload") if isinstance(entry.get("payload"), dict) else {}
    if not payload:
        add_rejection(result, "payload is required", "missing_payload")
    if has_secret(payload) or has_secret(entry.get("approval", {})):
        add_rejection(result, "secret-like content is not allowed", "secret_detected")
    expected_payload_hash = canonical_hash(payload)
    if entry.get("payload_hash") != expected_payload_hash:
        add_rejection(result, "payload_hash mismatch against canonical redacted payload", "payload_hash_mismatch")
    apply_guard = entry.get("apply_guard") if isinstance(entry.get("apply_guard"), dict) else {}
    if apply_guard and apply_guard.get("payload_hash") != entry.get("payload_hash"):
        add_rejection(result, "apply_guard payload_hash mismatch", "payload_hash_mismatch")

    for key, expected in default_non_claims().items():
        if result["non_claims"].get(key) is not expected:
            add_rejection(result, f"required non-claim missing or false: {key}", "missing_non_claim")

    if result["rejection_reasons"]:
        result["status"] = "rejected"
    else:
        result["status"] = "accepted"
    return result


def reject_bundle(base: dict[str, Any], reason: str, key: str) -> None:
    add_rejection(base, reason, key)
    base["status"] = "rejected"


def same_target(left: Any, right: Any) -> bool:
    if not isinstance(left, dict) or not isinstance(right, dict):
        return False
    comparable_keys = ("system", "id", "path", "root", "scope")
    return {key: left.get(key) for key in comparable_keys} == {key: right.get(key) for key in comparable_keys}


def validate_contract_bundle(bundle: dict[str, Any], *, repo_root: str | Path | None = None, as_of: str | None = None) -> dict[str, Any]:
    """Validate a queue entry + dry-run evidence + approval grant + ledger row bundle."""
    queue = bundle.get("queue_entry") if isinstance(bundle.get("queue_entry"), dict) else {}
    evidence = bundle.get("dry_run_evidence") if isinstance(bundle.get("dry_run_evidence"), dict) else {}
    approval = bundle.get("approval_grant") if isinstance(bundle.get("approval_grant"), dict) else {}
    ledger = bundle.get("ledger_row") if isinstance(bundle.get("ledger_row"), dict) else {}

    queue_result = validate_queue_entry(queue, repo_root=repo_root)
    result = result_base(queue)
    result.update(
        {
            "status": "valid",
            "queue_entry": queue,
            "dry_run_evidence": evidence,
            "approval_grant": approval,
            "ledger_row": ledger,
        }
    )
    if queue_result["status"] == "rejected":
        result["status"] = "rejected"
        result["rejection_reasons"].extend(queue_result["rejection_reasons"])
        result["no_go"].update(queue_result["no_go"])

    expected_evidence_hash = hash_without(evidence, "evidence_hash") if evidence else None
    evidence_hash = evidence.get("evidence_hash")
    dry_run = queue.get("dry_run") if isinstance(queue.get("dry_run"), dict) else {}
    apply_guard = queue.get("apply_guard") if isinstance(queue.get("apply_guard"), dict) else {}
    if not evidence or evidence_hash != expected_evidence_hash:
        reject_bundle(result, "dry-run evidence hash mismatch", "dry_run_evidence_hash_mismatch")
    if dry_run.get("evidence_hash") != evidence_hash or apply_guard.get("dry_run_evidence_hash") != evidence_hash:
        reject_bundle(result, "dry-run evidence hash mismatch", "dry_run_evidence_hash_mismatch")
    if evidence.get("status") != "dry_run_passed":
        reject_bundle(result, "dry-run evidence status must be dry_run_passed", "dry_run_not_passed")
    if evidence.get("source_mutated") or evidence.get("target_mutated"):
        reject_bundle(result, "dry-run evidence must report no source/target mutation", "dry_run_mutated")

    as_of_dt = parse_utc(as_of) or datetime.now(timezone.utc)
    evidence_expiry = parse_utc(evidence.get("expires_at"))
    if evidence_expiry is None or evidence_expiry <= as_of_dt:
        reject_bundle(result, "stale evidence: dry-run evidence is expired", "stale_evidence")

    common_keys = ("schema_version", "contract_id", "queue_id", "operation_id", "operation_type")
    for record_name, record in (("dry-run evidence", evidence), ("approval grant", approval), ("ledger row", ledger)):
        for key in common_keys:
            if record.get(key) != queue.get(key):
                reject_bundle(result, f"{record_name} {key} mismatch", "evidence_mismatch")

    if not same_target(evidence.get("target"), queue.get("target")):
        reject_bundle(result, "target mismatch between queue entry and dry-run evidence", "target_mismatch")
    if not same_target(approval.get("target"), queue.get("target")):
        reject_bundle(result, "target mismatch between queue entry and approval grant", "target_mismatch")
    if not same_target(ledger.get("target"), queue.get("target")):
        reject_bundle(result, "target mismatch between queue entry and ledger row", "target_mismatch")

    payload_hash = queue.get("payload_hash")
    if evidence.get("payload_hash") != payload_hash:
        reject_bundle(result, "dry-run evidence payload_hash mismatch", "evidence_mismatch")
    if approval.get("payload_hash") != payload_hash:
        reject_bundle(result, "approval payload_hash mismatch", "payload_hash_mismatch")
    if ledger.get("payload_hash") != payload_hash:
        reject_bundle(result, "ledger payload_hash mismatch", "ledger_mismatch")

    if approval.get("status") != "granted":
        reject_bundle(result, "approval grant status must be granted", "approval_missing")
    decider = approval.get("decider") if isinstance(approval.get("decider"), dict) else {}
    if decider.get("approval_authority") is not True:
        reject_bundle(result, "approval grant must come from an approval authority", "approval_missing")
    if approval.get("dry_run_evidence_hash") != evidence_hash:
        reject_bundle(result, "approval is not bound to the dry-run evidence hash", "dry_run_evidence_hash_mismatch")
    decided_at = parse_utc(approval.get("decided_at"))
    evidence_created_at = parse_utc(evidence.get("created_at"))
    approval_expires_at = parse_utc(approval.get("expires_at"))
    if decided_at and evidence_created_at and decided_at < evidence_created_at:
        reject_bundle(result, "approval predates dry-run evidence", "approval_timing_mismatch")
    if approval_expires_at is None or approval_expires_at <= as_of_dt:
        reject_bundle(result, "approval grant is expired", "stale_evidence")
    if approval.get("revoked_at"):
        reject_bundle(result, "approval grant is revoked", "approval_revoked")

    target_signature_before = evidence.get("target_signature_before")
    if approval.get("target_signature_before") != target_signature_before:
        reject_bundle(result, "approval target signature mismatch", "target_mismatch")
    if ledger.get("target_signature_before") != target_signature_before:
        reject_bundle(result, "ledger target signature mismatch", "ledger_mismatch")

    if ledger.get("row_hash") != hash_without(ledger, "row_hash"):
        reject_bundle(result, "ledger row_hash mismatch", "ledger_mismatch")
    if ledger.get("event_type") != "approval_granted":
        reject_bundle(result, "ledger event_type must be approval_granted", "ledger_mismatch")
    if ledger.get("dry_run_evidence_hash") != evidence_hash:
        reject_bundle(result, "ledger dry_run_evidence_hash mismatch", "ledger_mismatch")
    if ledger.get("approval_id") != approval.get("approval_id") or ledger.get("approval_status") != approval.get("status"):
        reject_bundle(result, "ledger approval reference mismatch", "ledger_mismatch")
    if ledger.get("source_mutated") or ledger.get("target_mutated") or ledger.get("direct_db_edit"):
        reject_bundle(result, "ledger must report no source/target/DB mutation", "ledger_mismatch")

    non_claims = default_non_claims()
    for record in (evidence, approval, ledger):
        record_claims = record.get("non_claims") if isinstance(record.get("non_claims"), dict) else {}
        non_claims.update({k: bool(v) for k, v in record_claims.items()})
    for key, expected in default_non_claims().items():
        if non_claims.get(key) is not expected:
            reject_bundle(result, f"required non-claim missing or false: {key}", "missing_non_claim")
    result["non_claims"] = non_claims
    result["source_mutated"] = False
    result["target_mutated"] = False
    result["direct_db_edit"] = False
    result["artifact_only"] = True
    if result["rejection_reasons"]:
        result["status"] = "rejected"
    return result


def validate_no_go_record(record: dict[str, Any], *, repo_root: str | Path | None = None) -> dict[str, Any]:
    """Validate a hash-bound no-go record without attempting apply or mutation."""
    del repo_root
    result = result_base(record)
    if record.get("schema_version") != SCHEMA_VERSION:
        add_rejection(result, f"unsupported schema_version; expected {SCHEMA_VERSION}", "unsupported_schema")
    if record.get("contract_id") != CONTRACT_ID:
        add_rejection(result, f"unsupported contract_id; expected {CONTRACT_ID}", "unsupported_contract")
    if record.get("status") != "rejected":
        add_rejection(result, "no-go record status must be rejected", "invalid_no_go_record")
    if record.get("record_hash") != hash_without(record, "record_hash"):
        add_rejection(result, "no-go record_hash mismatch", "no_go_hash_mismatch")
    if record.get("source_mutated") or record.get("target_mutated") or record.get("direct_db_edit"):
        add_rejection(result, "no-go record must report no source/target/DB mutation", "invalid_no_go_record")
    no_go = record.get("no_go") if isinstance(record.get("no_go"), dict) else {}
    if not no_go:
        add_rejection(result, "no-go record requires machine-readable no_go reasons", "invalid_no_go_record")
    non_claims = default_non_claims() | {
        k: bool(v)
        for k, v in (record.get("non_claims") if isinstance(record.get("non_claims"), dict) else {}).items()
    }
    for key, expected in default_non_claims().items():
        if non_claims.get(key) is not expected:
            add_rejection(result, f"required non-claim missing or false: {key}", "missing_non_claim")
    result["non_claims"] = non_claims
    result["no_go"] = dict(no_go) | result.get("no_go", {})
    result["source_mutated"] = False
    result["target_mutated"] = False
    result["direct_db_edit"] = False
    result["artifact_only"] = True
    if result["rejection_reasons"]:
        result["status"] = "rejected"
    else:
        result["status"] = "no_go_recorded"
    return result


def read_json(path: Path) -> dict[str, Any]:
    parsed = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(parsed, dict):
        raise ValueError(f"{path} must contain a JSON object")
    return parsed


def write_json(path: Path, value: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def resolve_input_path(repo_root: Path, path_value: str | Path) -> Path:
    path = Path(path_value)
    return path if path.is_absolute() else repo_root / path


def repo_relative_path(repo_root: Path, path_value: str | Path) -> Path | None:
    path = Path(path_value)
    if path.is_absolute():
        try:
            return path.resolve().relative_to(repo_root.resolve())
        except ValueError:
            return None
    return normalized_relative_path(path.as_posix())


def resolve_target_artifact_output(repo_root: Path, path_value: str | Path) -> tuple[Path | None, str | None]:
    relative = repo_relative_path(repo_root, path_value)
    if relative is None:
        return None, "output path must be inside the repository"
    if ".." in relative.parts:
        return None, "output path traversal is not allowed"
    if not is_relative_to(relative, TARGET_ROOT):
        return None, f"output path must stay under {TARGET_ROOT.as_posix()}"
    return repo_root / relative, None


def manual_result_base(queue: dict[str, Any] | None, *, status: str) -> dict[str, Any]:
    queue = queue if isinstance(queue, dict) else {}
    audit = queue.get("audit") if isinstance(queue.get("audit"), dict) else {}
    audit_claims = audit.get("non_claims") if isinstance(audit.get("non_claims"), dict) else {}
    return {
        "schema_version": SCHEMA_VERSION,
        "contract_id": CONTRACT_ID,
        "queue_id": queue.get("queue_id"),
        "operation_id": queue.get("operation_id"),
        "operation_type": queue.get("operation_type"),
        "status": status,
        "source_mutated": False,
        "target_mutated": False,
        "direct_db_edit": False,
        "artifact_only": True,
        "non_claims": default_non_claims() | {key: bool(value) for key, value in audit_claims.items()},
        "rejection_reasons": [],
        "no_go": {},
    }


def reject_manual(result: dict[str, Any], reason: str, key: str) -> None:
    add_rejection(result, reason, key)
    if result.get("status") == "valid":
        result["status"] = "rejected"


def target_relative_from_queue(queue: dict[str, Any]) -> Path | None:
    target_path = normalized_relative_path(target_path_from_entry(queue))
    if target_path is None or ".." in target_path.parts or not is_relative_to(target_path, TARGET_ROOT):
        return None
    return target_path


def validate_queue_dry_run_for_manual_runner(
    queue: dict[str, Any],
    dry_run_evidence: dict[str, Any],
    *,
    repo_root: Path,
    as_of: str | None,
) -> dict[str, Any]:
    result = manual_result_base(queue, status="valid")
    queue_result = validate_queue_entry(queue, repo_root=repo_root)
    if queue_result.get("status") == "rejected":
        result["rejection_reasons"].extend(queue_result.get("rejection_reasons", []))
        result["no_go"].update(queue_result.get("no_go", {}))
        result["status"] = "rejected"

    dry_hash = dry_run_evidence.get("evidence_hash") if isinstance(dry_run_evidence, dict) else None
    expected_dry_hash = hash_without(dry_run_evidence, "evidence_hash") if isinstance(dry_run_evidence, dict) else None
    dry_run_ref = queue.get("dry_run") if isinstance(queue.get("dry_run"), dict) else {}
    apply_guard = queue.get("apply_guard") if isinstance(queue.get("apply_guard"), dict) else {}
    if not dry_hash or dry_hash != expected_dry_hash:
        reject_manual(result, "dry-run evidence hash mismatch", "dry_run_evidence_hash_mismatch")
    if dry_run_ref.get("evidence_hash") != dry_hash or apply_guard.get("dry_run_evidence_hash") != dry_hash:
        reject_manual(result, "dry-run evidence hash mismatch", "dry_run_evidence_hash_mismatch")
    if dry_run_evidence.get("status") != "dry_run_passed":
        reject_manual(result, "dry-run evidence status must be dry_run_passed", "dry_run_not_passed")
    if dry_run_evidence.get("source_mutated") or dry_run_evidence.get("target_mutated"):
        reject_manual(result, "dry-run evidence must report no source/target mutation", "dry_run_mutated")

    as_of_dt = parse_utc(as_of) or datetime.now(timezone.utc)
    evidence_expiry = parse_utc(dry_run_evidence.get("expires_at"))
    if evidence_expiry is None or evidence_expiry <= as_of_dt:
        reject_manual(result, "stale evidence: dry-run evidence is expired", "stale_evidence")

    common_keys = ("schema_version", "contract_id", "queue_id", "operation_id", "operation_type")
    for key in common_keys:
        if dry_run_evidence.get(key) != queue.get(key):
            reject_manual(result, f"dry-run evidence {key} mismatch", "evidence_mismatch")
    if not same_target(dry_run_evidence.get("target"), queue.get("target")):
        reject_manual(result, "target mismatch against dry-run evidence", "target_mismatch")
    if dry_run_evidence.get("payload_hash") != queue.get("payload_hash"):
        reject_manual(result, "payload hash mismatch against dry-run evidence", "payload_hash_mismatch")

    target_signature_before = dry_run_evidence.get("target_signature_before")
    target_prefix_hash = dry_run_evidence.get("target_prefix_hash") or (
        target_signature_before.get("sha256") if isinstance(target_signature_before, dict) else None
    )
    if apply_guard.get("target_signature_before") != target_signature_before:
        reject_manual(result, "target signature mismatch against apply guard", "target_mismatch")
    if apply_guard.get("target_prefix_hash") and apply_guard.get("target_prefix_hash") != target_prefix_hash:
        reject_manual(result, "target prefix hash mismatch against dry-run evidence", "target_mismatch")

    target_relative = target_relative_from_queue(queue)
    result["dry_run_evidence_hash"] = dry_hash
    result["target_signature_before"] = target_signature_before
    result["target_prefix_hash"] = target_prefix_hash
    result["target_relative_path"] = target_relative.as_posix() if target_relative else None
    result["target_path"] = str(repo_root / target_relative) if target_relative else None
    return result


def build_manual_approval_grant(
    queue: dict[str, Any],
    dry_run_evidence: dict[str, Any],
    *,
    approval_id: str | None,
    decider_id: str,
    decider_kind: str,
    decided_at: str | None,
    expires_at: str | None,
    reason: str | None,
) -> dict[str, Any]:
    dry_hash = dry_run_evidence["evidence_hash"]
    decided_dt = parse_utc(decided_at) or datetime.now(timezone.utc)
    expiry_dt = parse_utc(expires_at) or decided_dt + timedelta(hours=1)
    safe_operation_id = re.sub(r"[^A-Za-z0-9_.-]+", "-", str(queue.get("operation_id") or "operation"))
    grant = {
        "schema_version": SCHEMA_VERSION,
        "contract_id": CONTRACT_ID,
        "approval_id": approval_id or f"approval-m015-s03-{safe_operation_id}",
        "queue_id": queue.get("queue_id"),
        "operation_id": queue.get("operation_id"),
        "operation_type": queue.get("operation_type"),
        "status": "granted",
        "decider": {"id": decider_id, "kind": decider_kind, "approval_authority": True},
        "decided_at": iso_utc(decided_dt),
        "expires_at": iso_utc(expiry_dt),
        "revoked_at": None,
        "dry_run_evidence_hash": dry_hash,
        "payload_hash": queue.get("payload_hash"),
        "target": deepcopy(queue.get("target")),
        "target_signature_before": deepcopy(dry_run_evidence.get("target_signature_before")),
        "target_prefix_hash": dry_run_evidence.get("target_prefix_hash")
        or (dry_run_evidence.get("target_signature_before") or {}).get("sha256"),
        "reason": reason or "manual CLI approval grant",
        "source_mutated": False,
        "target_mutated": False,
        "direct_db_edit": False,
        "artifact_only": True,
        "non_claims": default_non_claims(),
    }
    return grant


def run_manual_grant(
    *,
    queue_entry_path: Path,
    dry_run_evidence_path: Path,
    approval_output_path: Path,
    repo_root: Path,
    as_of: str | None,
    approval_id: str | None,
    decider_id: str,
    decider_kind: str,
    decided_at: str | None,
    expires_at: str | None,
    reason: str | None,
) -> dict[str, Any]:
    repo_root = repo_root.resolve()
    output_path, output_error = resolve_target_artifact_output(repo_root, approval_output_path)
    queue = read_json(resolve_input_path(repo_root, queue_entry_path))
    dry_run_evidence = read_json(resolve_input_path(repo_root, dry_run_evidence_path))
    validation = validate_queue_dry_run_for_manual_runner(queue, dry_run_evidence, repo_root=repo_root, as_of=as_of)
    if output_error:
        reject_manual(validation, output_error, "unsafe_root")
    if validation.get("status") != "valid":
        validation["status"] = "grant_blocked"
        if output_path:
            write_json(output_path, validation)
        return validation
    grant = build_manual_approval_grant(
        queue,
        dry_run_evidence,
        approval_id=approval_id,
        decider_id=decider_id,
        decider_kind=decider_kind,
        decided_at=decided_at,
        expires_at=expires_at,
        reason=reason,
    )
    assert output_path is not None
    write_json(output_path, grant)
    result = manual_result_base(queue, status="granted")
    result.update(
        {
            "approval_grant_path": str(output_path),
            "approval_grant": grant,
            "dry_run_evidence_hash": dry_run_evidence["evidence_hash"],
            "target_signature_before": dry_run_evidence.get("target_signature_before"),
            "target_prefix_hash": grant.get("target_prefix_hash"),
        }
    )
    return result


def build_audit_note_row(queue: dict[str, Any]) -> dict[str, Any]:
    payload = queue.get("payload") if isinstance(queue.get("payload"), dict) else {}
    summary = " ".join(str(payload.get("summary") or "").split())
    max_chars = int(payload.get("max_chars") or 240)
    if len(summary) > max_chars:
        summary = summary[: max_chars - 1].rstrip() + "…"
    row = {
        "schema_version": "hermes-cockpit.approval-queue.audit-note.v1",
        "queue_id": queue.get("queue_id"),
        "operation_id": queue.get("operation_id"),
        "operation_type": queue.get("operation_type"),
        "note_kind": payload.get("note_kind"),
        "summary": summary,
        "non_canonical": True,
        "source_of_truth_mutated": False,
    }
    row["row_hash"] = canonical_hash(row)
    return row


def apply_block_result(queue: dict[str, Any] | None, reason: str, key: str) -> dict[str, Any]:
    result = manual_result_base(queue, status="apply_blocked")
    add_rejection(result, reason, key)
    return result


def merge_block_rejections(result: dict[str, Any], source: dict[str, Any]) -> dict[str, Any]:
    result["rejection_reasons"].extend(source.get("rejection_reasons", []))
    result["no_go"].update(source.get("no_go", {}))
    return result


def ledger_contains_replay(ledger_path: Path, *, approval_id: Any, dry_run_evidence_hash: Any, operation_id: Any) -> bool:
    if not ledger_path.exists():
        return False
    for line in ledger_path.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        try:
            row = json.loads(line)
        except json.JSONDecodeError:
            continue
        if approval_id and row.get("approval_id") == approval_id:
            return True
        if dry_run_evidence_hash and row.get("dry_run_evidence_hash") == dry_run_evidence_hash and row.get("operation_id") == operation_id:
            return True
    return False


def validate_manual_approval_for_apply(
    queue: dict[str, Any],
    dry_run_evidence: dict[str, Any],
    approval: dict[str, Any] | None,
    *,
    as_of: str | None,
) -> dict[str, Any]:
    if not approval:
        return apply_block_result(queue, "approval_missing", "approval_missing")
    result = manual_result_base(queue, status="valid")
    dry_hash = dry_run_evidence.get("evidence_hash")
    if approval.get("status") in {None, "not_requested", "missing"}:
        reject_manual(result, "approval_missing", "approval_missing")
    elif approval.get("status") != "granted":
        reject_manual(result, "approval_denied", "approval_denied")
    decider = approval.get("decider") if isinstance(approval.get("decider"), dict) else {}
    if decider.get("approval_authority") is not True:
        reject_manual(result, "approval decider lacks approval authority", "approval_missing")
    if approval.get("dry_run_evidence_hash") != dry_hash:
        reject_manual(result, "approval is not bound to the dry-run evidence hash", "dry_run_evidence_hash_mismatch")
    if approval.get("payload_hash") != queue.get("payload_hash"):
        reject_manual(result, "approval payload_hash mismatch", "payload_hash_mismatch")
    if not same_target(approval.get("target"), queue.get("target")):
        reject_manual(result, "approval target mismatch", "target_mismatch")
    target_signature_before = dry_run_evidence.get("target_signature_before")
    target_prefix_hash = dry_run_evidence.get("target_prefix_hash") or (
        target_signature_before.get("sha256") if isinstance(target_signature_before, dict) else None
    )
    if approval.get("target_signature_before") != target_signature_before:
        reject_manual(result, "approval target signature mismatch", "target_mismatch")
    if approval.get("target_prefix_hash") and approval.get("target_prefix_hash") != target_prefix_hash:
        reject_manual(result, "approval target prefix hash mismatch", "target_mismatch")
    dry_created_at = parse_utc(dry_run_evidence.get("created_at"))
    decided_at = parse_utc(approval.get("decided_at"))
    expires_at = parse_utc(approval.get("expires_at"))
    as_of_dt = parse_utc(as_of) or datetime.now(timezone.utc)
    if dry_created_at and decided_at and decided_at < dry_created_at:
        reject_manual(result, "approval predates dry-run evidence", "approval_timing_mismatch")
    if expires_at is None or expires_at <= as_of_dt:
        reject_manual(result, "approval_expired", "approval_expired")
    if approval.get("revoked_at"):
        reject_manual(result, "approval_revoked", "approval_revoked")
    if result["rejection_reasons"]:
        result["status"] = "apply_blocked"
    return result


def build_apply_ledger_row(
    queue: dict[str, Any],
    approval: dict[str, Any],
    dry_run_evidence_hash: str,
    audit_row: dict[str, Any],
    before_signature: dict[str, Any],
    after_signature: dict[str, Any],
    *,
    ledger_id: str,
) -> dict[str, Any]:
    row = {
        "schema_version": SCHEMA_VERSION,
        "contract_id": CONTRACT_ID,
        "ledger_id": ledger_id,
        "event_type": "audit_note_appended",
        "queue_id": queue.get("queue_id"),
        "operation_id": queue.get("operation_id"),
        "operation_type": queue.get("operation_type"),
        "recorded_at": utc_now(),
        "dry_run_evidence_hash": dry_run_evidence_hash,
        "approval_id": approval.get("approval_id"),
        "approval_status": approval.get("status"),
        "payload_hash": queue.get("payload_hash"),
        "target": deepcopy(queue.get("target")),
        "target_signature_before": before_signature,
        "target_signature_after": after_signature,
        "audit_row_hash": audit_row.get("row_hash"),
        "source_mutated": False,
        "target_mutated": True,
        "direct_db_edit": False,
        "artifact_only": True,
        "non_claims": default_non_claims(),
        "no_go": {},
    }
    row["row_hash"] = hash_without(row, "row_hash")
    return row


def run_manual_apply(
    *,
    queue_entry_path: Path,
    dry_run_evidence_path: Path,
    approval_grant_path: Path,
    apply_output_path: Path,
    ledger_output_path: Path,
    repo_root: Path,
    as_of: str | None,
) -> dict[str, Any]:
    repo_root = repo_root.resolve()
    output_path, output_error = resolve_target_artifact_output(repo_root, apply_output_path)
    ledger_path, ledger_error = resolve_target_artifact_output(repo_root, ledger_output_path)
    queue: dict[str, Any] | None = None

    if output_error or ledger_error:
        result = apply_block_result(None, output_error or ledger_error or "unsafe output path", "unsafe_root")
        if output_error and ledger_error:
            add_rejection(result, ledger_error, "unsafe_root")
        if output_path:
            write_json(output_path, result)
        return result

    def finish(result: dict[str, Any]) -> dict[str, Any]:
        result["status"] = "applied" if not result.get("rejection_reasons") and result.get("target_mutated") else "apply_blocked"
        if output_path:
            write_json(output_path, result)
        return result

    try:
        queue = read_json(resolve_input_path(repo_root, queue_entry_path))
        dry_run_evidence = read_json(resolve_input_path(repo_root, dry_run_evidence_path))
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        return finish(apply_block_result(queue, f"input artifact missing or invalid: {exc}", "missing_input"))

    validation = validate_queue_dry_run_for_manual_runner(queue, dry_run_evidence, repo_root=repo_root, as_of=as_of)
    if validation.get("status") != "valid":
        return finish(merge_block_rejections(apply_block_result(queue, "queue or dry-run evidence rejected", "apply_guard_rejected"), validation))

    approval_path = resolve_input_path(repo_root, approval_grant_path)
    if not approval_path.exists():
        return finish(apply_block_result(queue, "approval_missing", "approval_missing"))
    try:
        approval = read_json(approval_path)
    except (OSError, ValueError, json.JSONDecodeError) as exc:
        return finish(apply_block_result(queue, f"approval artifact missing or invalid: {exc}", "approval_missing"))

    approval_result = validate_manual_approval_for_apply(queue, dry_run_evidence, approval, as_of=as_of)
    if approval_result.get("status") != "valid":
        return finish(merge_block_rejections(apply_block_result(queue, "approval rejected", "approval_rejected"), approval_result))

    assert ledger_path is not None
    dry_hash = dry_run_evidence["evidence_hash"]
    if ledger_contains_replay(
        ledger_path,
        approval_id=approval.get("approval_id"),
        dry_run_evidence_hash=dry_hash,
        operation_id=queue.get("operation_id"),
    ):
        return finish(apply_block_result(queue, "approval_replayed", "approval_replayed"))

    target_relative = target_relative_from_queue(queue)
    if target_relative is None:
        return finish(apply_block_result(queue, "target path is unsafe", "unsafe_root"))
    target_path = repo_root / target_relative
    before_signature = file_signature(target_path)
    target_signature_before = dry_run_evidence.get("target_signature_before")
    target_prefix_hash = dry_run_evidence.get("target_prefix_hash") or (
        target_signature_before.get("sha256") if isinstance(target_signature_before, dict) else None
    )
    if before_signature != target_signature_before or before_signature.get("sha256") != target_prefix_hash:
        return finish(apply_block_result(queue, "target signature stale or mismatch", "target_signature_stale"))

    audit_row = build_audit_note_row(queue)
    row_json = canonical_json(audit_row) + "\n"
    target_path.parent.mkdir(parents=True, exist_ok=True)
    with target_path.open("a", encoding="utf-8") as handle:
        handle.write(row_json)
    after_signature = file_signature(target_path)

    ledger_row = build_apply_ledger_row(
        queue,
        approval,
        dry_hash,
        audit_row,
        before_signature,
        after_signature,
        ledger_id=f"ledger-m015-s03-{queue.get('operation_id')}",
    )
    ledger_path.parent.mkdir(parents=True, exist_ok=True)
    with ledger_path.open("a", encoding="utf-8") as handle:
        handle.write(canonical_json(ledger_row) + "\n")

    result = manual_result_base(queue, status="applied")
    result.update(
        {
            "target_mutated": True,
            "dry_run_evidence_hash": dry_hash,
            "approval_id": approval.get("approval_id"),
            "target_before_signature": before_signature,
            "target_after_signature": after_signature,
            "actual_delta": {"append_rows": 1, "append_bytes": len(row_json.encode("utf-8"))},
            "audit_row": audit_row,
            "ledger_row": ledger_row,
            "ledger_path": str(ledger_path),
        }
    )
    return finish(result)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Validate/run the M015 approval queue + ledger artifact-only contract")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--bundle", type=Path, help="JSON object with queue_entry, dry_run_evidence, approval_grant, and ledger_row")
    group.add_argument("--no-go-record", type=Path, help="JSON no-go record to validate")
    group.add_argument("--grant", action="store_true", help="Write a manual approval grant artifact after exact queue/dry-run matching")
    group.add_argument("--apply", action="store_true", help="Apply one approved cockpit.audit_note_append artifact append")
    parser.add_argument("--repo-root", type=Path, default=Path.cwd(), help="Repository root; runner writes only target/hermes-cockpit-m015 artifacts")
    parser.add_argument("--as-of", default=None, help="UTC ISO timestamp for stale evidence/approval checks")
    parser.add_argument("--output", type=Path, default=None, help="Optional JSON output path for validation modes")
    parser.add_argument("--queue-entry", type=Path, default=None, help="M015 queue entry JSON for --grant/--apply")
    parser.add_argument("--dry-run-evidence", type=Path, default=None, help="M015 dry-run evidence JSON for --grant/--apply")
    parser.add_argument("--approval-output", type=Path, default=None, help="Manual approval grant output path for --grant")
    parser.add_argument("--approval-grant", type=Path, default=None, help="Manual approval grant JSON for --apply")
    parser.add_argument("--apply-output", type=Path, default=None, help="Apply evidence output path for --apply")
    parser.add_argument("--ledger-output", type=Path, default=None, help="Apply ledger JSONL path for --apply")
    parser.add_argument("--approval-id", default=None, help="Optional approval id for --grant")
    parser.add_argument("--decider-id", default="joe", help="Approval-authoritative decider id for --grant")
    parser.add_argument("--decider-kind", default="operator", help="Approval-authoritative decider kind for --grant")
    parser.add_argument("--decided-at", default=None, help="UTC ISO decision timestamp for --grant")
    parser.add_argument("--expires-at", default=None, help="UTC ISO approval expiry timestamp for --grant")
    parser.add_argument("--reason", default=None, help="Manual approval reason for --grant")
    return parser


def require_path(parser: argparse.ArgumentParser, args: argparse.Namespace, name: str) -> Path:
    value = getattr(args, name)
    if value is None:
        parser.error(f"--{name.replace('_', '-')} is required")
    return value


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    if args.bundle:
        result = validate_contract_bundle(read_json(args.bundle), repo_root=args.repo_root, as_of=args.as_of)
        if args.output:
            output = args.output if args.output.is_absolute() else args.repo_root / args.output
            write_json(output, result)
        print(json.dumps(result, sort_keys=True))
        return 0 if result.get("status") == "valid" else 1
    if args.no_go_record:
        result = validate_no_go_record(read_json(args.no_go_record), repo_root=args.repo_root)
        if args.output:
            output = args.output if args.output.is_absolute() else args.repo_root / args.output
            write_json(output, result)
        print(json.dumps(result, sort_keys=True))
        return 0 if result.get("status") == "no_go_recorded" else 1
    if args.grant:
        result = run_manual_grant(
            queue_entry_path=require_path(parser, args, "queue_entry"),
            dry_run_evidence_path=require_path(parser, args, "dry_run_evidence"),
            approval_output_path=require_path(parser, args, "approval_output"),
            repo_root=args.repo_root,
            as_of=args.as_of,
            approval_id=args.approval_id,
            decider_id=args.decider_id,
            decider_kind=args.decider_kind,
            decided_at=args.decided_at,
            expires_at=args.expires_at,
            reason=args.reason,
        )
        print(json.dumps(result, sort_keys=True))
        return 0 if result.get("status") == "granted" else 1
    result = run_manual_apply(
        queue_entry_path=require_path(parser, args, "queue_entry"),
        dry_run_evidence_path=require_path(parser, args, "dry_run_evidence"),
        approval_grant_path=require_path(parser, args, "approval_grant"),
        apply_output_path=require_path(parser, args, "apply_output"),
        ledger_output_path=require_path(parser, args, "ledger_output"),
        repo_root=args.repo_root,
        as_of=args.as_of,
    )
    print(json.dumps(result, sort_keys=True))
    return 0 if result.get("status") == "applied" else 1


if __name__ == "__main__":
    sys.exit(main())
