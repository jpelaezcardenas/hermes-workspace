#!/usr/bin/env python3
"""M015/S01 RED tests for the artifact-only approval queue + ledger contract."""

from __future__ import annotations

import hashlib
import importlib.util
import json
import shutil
import tempfile
import unittest
from copy import deepcopy
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-approval-queue.py"
DOC = ROOT / "docs" / "hermes-cockpit" / "m015-approval-queue-contract.md"
FIXTURE_DIR = ROOT / "tests" / "fixtures" / "hermes_cockpit" / "approval-queue"

SCHEMA = "hermes-cockpit.approval-queue.v1"
CONTRACT_ID = "m015.s01.approval-queue.v1"
ALLOWED_OPERATION = "cockpit.audit_note_append"
TARGET_ROOT = "target/hermes-cockpit-m015"
TARGET_REL = f"{TARGET_ROOT}/pilot-audit-log.jsonl"
AS_OF = "2026-05-18T00:30:00Z"


def canonical_json(value: Any) -> str:
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def canonical_hash(value: Any) -> str:
    return "sha256:" + hashlib.sha256(canonical_json(value).encode("utf-8")).hexdigest()


def attach_hash(record: dict[str, Any], field: str) -> dict[str, Any]:
    clone = deepcopy(record)
    clone.pop(field, None)
    clone[field] = canonical_hash(clone)
    return clone


def load_module():
    if not SCRIPT.exists():
        raise AssertionError(f"expected M015 approval-queue script at {SCRIPT}")
    spec = importlib.util.spec_from_file_location("hermes_cockpit_approval_queue", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


def target_signature() -> dict[str, Any]:
    return {"exists": True, "size": 18, "sha256": "sha256:" + "a" * 64}


def pilot_payload(*, target_path: str = TARGET_REL, summary: str = "bounded M015 approval queue audit note") -> dict[str, Any]:
    return {
        "note_kind": "m015_s01_queue_contract",
        "summary": summary,
        "max_chars": 240,
        "target_path": target_path,
    }


def queue_entry(
    *,
    operation_type: str = ALLOWED_OPERATION,
    target_path: str = TARGET_REL,
    target_system: str = "artifact",
    target_root: str = TARGET_ROOT,
    summary: str = "bounded M015 approval queue audit note",
) -> dict[str, Any]:
    payload = pilot_payload(target_path=target_path, summary=summary)
    return {
        "schema_version": SCHEMA,
        "contract_id": CONTRACT_ID,
        "queue_id": "queue-m015-s01-001",
        "operation_id": "op_m015_s01_audit_note_append_001",
        "operation_type": operation_type,
        "state": "approval_pending",
        "requested_at": "2026-05-18T00:00:00Z",
        "actor": {"id": "migi", "kind": "agent", "approval_authority": False},
        "source": "cockpit",
        "target": {
            "system": target_system,
            "id": "m015-pilot-audit-log",
            "path": target_path,
            "root": target_root,
            "scope": "m015_sandbox",
        },
        "payload": payload,
        "payload_hash": canonical_hash(payload),
        "bounds": {
            "target_root": target_root,
            "max_chars": 240,
            "max_bytes": 4096,
            "append_only": True,
            "max_operation_count": 1,
            "artifact_only": True,
        },
        "dry_run": {
            "required": True,
            "status": "passed",
            "evidence_path": f"{TARGET_ROOT}/evidence/op_m015_s01_audit_note_append_001-dry-run.json",
            "evidence_hash": "sha256:pending",
            "evidence_expires_at": "2026-05-18T01:00:00Z",
        },
        "approval": {"required": True, "status": "pending"},
        "apply_guard": {
            "dry_run_evidence_hash": "sha256:pending",
            "payload_hash": canonical_hash(payload),
            "target_signature_before": target_signature(),
        },
        "audit": {
            "non_claims": {
                "no_gsd_kanban_hermes_mutation": True,
                "no_direct_db_edit": True,
                "no_worker_dispatch": True,
                "no_watcher_install": True,
                "no_cron_schedule": True,
                "no_discord_call": True,
                "artifact_only": True,
            },
            "ledger_path": f"{TARGET_ROOT}/approval-ledger.jsonl",
            "rollback_or_compensation": "append a correction artifact only; no source-of-truth mutation",
        },
        "no_go": {},
    }


def dry_run_evidence(entry: dict[str, Any]) -> dict[str, Any]:
    record = {
        "schema_version": SCHEMA,
        "contract_id": CONTRACT_ID,
        "evidence_id": "dry-run-m015-s01-001",
        "queue_id": entry["queue_id"],
        "operation_id": entry["operation_id"],
        "operation_type": entry["operation_type"],
        "status": "dry_run_passed",
        "created_at": "2026-05-18T00:05:00Z",
        "expires_at": "2026-05-18T01:00:00Z",
        "target": deepcopy(entry["target"]),
        "payload_hash": entry["payload_hash"],
        "target_signature_before": target_signature(),
        "expected_delta": {"append_rows": 1, "append_bytes_max": 4096},
        "source_mutated": False,
        "target_mutated": False,
        "redaction_count": 0,
        "dropped_count": 0,
        "non_claims": deepcopy(entry["audit"]["non_claims"]),
    }
    return attach_hash(record, "evidence_hash")


def approval_grant(entry: dict[str, Any], evidence: dict[str, Any]) -> dict[str, Any]:
    return {
        "schema_version": SCHEMA,
        "contract_id": CONTRACT_ID,
        "approval_id": "approval-m015-s01-001",
        "queue_id": entry["queue_id"],
        "operation_id": entry["operation_id"],
        "operation_type": entry["operation_type"],
        "status": "granted",
        "decider": {"id": "joe", "kind": "operator", "approval_authority": True},
        "decided_at": "2026-05-18T00:10:00Z",
        "expires_at": "2026-05-18T01:00:00Z",
        "revoked_at": None,
        "dry_run_evidence_hash": evidence["evidence_hash"],
        "payload_hash": entry["payload_hash"],
        "target": deepcopy(entry["target"]),
        "target_signature_before": target_signature(),
        "reason": "manual S01 contract fixture grant",
    }


def ledger_row(entry: dict[str, Any], evidence: dict[str, Any], approval: dict[str, Any]) -> dict[str, Any]:
    row = {
        "schema_version": SCHEMA,
        "contract_id": CONTRACT_ID,
        "ledger_id": "ledger-m015-s01-001",
        "event_type": "approval_granted",
        "queue_id": entry["queue_id"],
        "operation_id": entry["operation_id"],
        "operation_type": entry["operation_type"],
        "recorded_at": "2026-05-18T00:11:00Z",
        "dry_run_evidence_hash": evidence["evidence_hash"],
        "approval_id": approval["approval_id"],
        "approval_status": approval["status"],
        "payload_hash": entry["payload_hash"],
        "target": deepcopy(entry["target"]),
        "target_signature_before": target_signature(),
        "source_mutated": False,
        "target_mutated": False,
        "direct_db_edit": False,
        "non_claims": deepcopy(entry["audit"]["non_claims"]),
        "no_go": {},
    }
    return attach_hash(row, "row_hash")


def contract_bundle() -> dict[str, Any]:
    entry = queue_entry()
    evidence = dry_run_evidence(entry)
    entry["dry_run"]["evidence_hash"] = evidence["evidence_hash"]
    entry["apply_guard"]["dry_run_evidence_hash"] = evidence["evidence_hash"]
    approval = approval_grant(entry, evidence)
    row = ledger_row(entry, evidence, approval)
    return {
        "queue_entry": entry,
        "dry_run_evidence": evidence,
        "approval_grant": approval,
        "ledger_row": row,
    }


def no_go_record() -> dict[str, Any]:
    bad_entry = queue_entry(operation_type="dispatch.worker_start", target_system="hermes", target_path=".hermes/workers/start.json")
    record = {
        "schema_version": SCHEMA,
        "contract_id": CONTRACT_ID,
        "no_go_id": "no-go-m015-s01-unsupported-dispatch",
        "queue_id": bad_entry["queue_id"],
        "operation_id": bad_entry["operation_id"],
        "operation_type": bad_entry["operation_type"],
        "status": "rejected",
        "recorded_at": "2026-05-18T00:12:00Z",
        "target": deepcopy(bad_entry["target"]),
        "source_mutated": False,
        "target_mutated": False,
        "direct_db_edit": False,
        "rejection_reasons": ["unsupported operation", "direct Hermes runtime target is prohibited"],
        "no_go": {"unsupported_operation": True, "direct_hermes_target": True},
        "non_claims": deepcopy(bad_entry["audit"]["non_claims"]),
    }
    return attach_hash(record, "record_hash")


class ApprovalQueueContractTests(unittest.TestCase):
    def setUp(self) -> None:
        self.module = load_module()
        self.tmp_dir = tempfile.mkdtemp(prefix="m015-approval-queue-")
        self.addCleanup(shutil.rmtree, self.tmp_dir, ignore_errors=True)
        self.repo = Path(self.tmp_dir) / "repo"
        self.repo.mkdir()

    def assert_rejected(self, entry: dict[str, Any], expected_reason: str) -> dict[str, Any]:
        result = self.module.validate_queue_entry(entry, repo_root=self.repo)
        self.assertEqual(result["status"], "rejected")
        self.assertFalse(result["source_mutated"])
        self.assertFalse(result["target_mutated"])
        self.assertFalse(result["direct_db_edit"])
        joined = " ".join(result["rejection_reasons"]).lower()
        self.assertIn(expected_reason.lower(), joined)
        self.assertTrue(result["no_go"], result)
        return result

    def test_valid_bundle_covers_queue_evidence_approval_and_ledger_without_mutation(self) -> None:
        bundle = contract_bundle()

        result = self.module.validate_contract_bundle(bundle, repo_root=self.repo, as_of=AS_OF)

        self.assertEqual(result["status"], "valid")
        self.assertEqual(result["operation_type"], ALLOWED_OPERATION)
        self.assertEqual(result["queue_entry"]["state"], "approval_pending")
        self.assertEqual(result["dry_run_evidence"]["status"], "dry_run_passed")
        self.assertEqual(result["approval_grant"]["status"], "granted")
        self.assertEqual(result["ledger_row"]["event_type"], "approval_granted")
        self.assertFalse(result["source_mutated"])
        self.assertFalse(result["target_mutated"])
        self.assertFalse(result["direct_db_edit"])
        self.assertTrue(result["artifact_only"])
        self.assertTrue(result["non_claims"]["no_gsd_kanban_hermes_mutation"])
        self.assertTrue(result["non_claims"]["no_worker_dispatch"])

    def test_queue_rejects_unsupported_operations_unsafe_roots_paths_secrets_and_broad_mutation(self) -> None:
        for operation_type in ("writeback.task_comment", "dispatch.worker_start", "watcher.start", "unknown.verb"):
            with self.subTest(operation_type=operation_type):
                rejected = self.assert_rejected(queue_entry(operation_type=operation_type), "unsupported operation")
                self.assertTrue(rejected["no_go"]["unsupported_operation"])

        cases = [
            (queue_entry(target_path="../target/hermes-cockpit-m015/pilot.jsonl"), "path traversal", "path_traversal"),
            (queue_entry(target_path=str((self.repo.parent / "outside-pilot.jsonl").resolve())), "relative path", "unsafe_root"),
            (queue_entry(target_path="target/hermes-cockpit-m015/*.jsonl"), "broad", "broad_mutation"),
            (queue_entry(target_path="target/hermes-cockpit-m015/pilot.jsonl", target_root="target"), "unsafe root", "unsafe_root"),
            (queue_entry(target_path="target/hermes-cockpit-m014/pilot.jsonl", target_root="target/hermes-cockpit-m014"), TARGET_ROOT, "unsafe_root"),
            (queue_entry(target_path=".gsd/gsd.db", target_system="gsd"), "GSD", "direct_gsd_target"),
            (queue_entry(target_path="docs/hermes-cockpit/kanban.json", target_system="kanban"), "Kanban", "direct_kanban_target"),
            (queue_entry(target_path=".hermes/sessions/live.jsonl", target_system="hermes"), "Hermes", "direct_hermes_target"),
            (queue_entry(summary="contains raw token sk-test0123456789abcdef"), "secret", "secret_detected"),
        ]
        for entry, expected_reason, expected_no_go in cases:
            with self.subTest(expected_reason=expected_reason):
                rejected = self.assert_rejected(entry, expected_reason)
                self.assertTrue(rejected["no_go"][expected_no_go], rejected)

        broad = queue_entry()
        broad["bounds"]["max_operation_count"] = 2
        rejected = self.assert_rejected(broad, "max_operation_count=1")
        self.assertTrue(rejected["no_go"]["broad_mutation"])

    def test_bundle_rejects_stale_evidence_and_mismatched_evidence_payload_or_target_basics(self) -> None:
        cases: list[tuple[str, dict[str, Any], str]] = []

        stale = contract_bundle()
        stale["dry_run_evidence"]["expires_at"] = "2026-05-18T00:01:00Z"
        stale["dry_run_evidence"] = attach_hash(stale["dry_run_evidence"], "evidence_hash")
        stale["queue_entry"]["dry_run"]["evidence_hash"] = stale["dry_run_evidence"]["evidence_hash"]
        stale["queue_entry"]["apply_guard"]["dry_run_evidence_hash"] = stale["dry_run_evidence"]["evidence_hash"]
        stale["approval_grant"]["dry_run_evidence_hash"] = stale["dry_run_evidence"]["evidence_hash"]
        stale["ledger_row"]["dry_run_evidence_hash"] = stale["dry_run_evidence"]["evidence_hash"]
        stale["ledger_row"] = attach_hash(stale["ledger_row"], "row_hash")
        cases.append(("stale evidence", stale, "stale_evidence"))

        payload_mismatch = contract_bundle()
        payload_mismatch["queue_entry"]["payload"]["summary"] = "changed after hash"
        cases.append(("payload hash mismatch", payload_mismatch, "payload_hash_mismatch"))

        evidence_hash_mismatch = contract_bundle()
        evidence_hash_mismatch["queue_entry"]["dry_run"]["evidence_hash"] = "sha256:" + "0" * 64
        cases.append(("dry-run evidence hash mismatch", evidence_hash_mismatch, "dry_run_evidence_hash_mismatch"))

        target_mismatch = contract_bundle()
        target_mismatch["approval_grant"]["target"]["path"] = f"{TARGET_ROOT}/other-audit-log.jsonl"
        cases.append(("target mismatch", target_mismatch, "target_mismatch"))

        ledger_mismatch = contract_bundle()
        ledger_mismatch["ledger_row"]["payload_hash"] = "sha256:" + "1" * 64
        ledger_mismatch["ledger_row"] = attach_hash(ledger_mismatch["ledger_row"], "row_hash")
        cases.append(("ledger payload mismatch", ledger_mismatch, "ledger_mismatch"))

        for label, bundle, expected_no_go in cases:
            with self.subTest(label=label):
                result = self.module.validate_contract_bundle(bundle, repo_root=self.repo, as_of=AS_OF)
                self.assertEqual(result["status"], "rejected", result)
                self.assertTrue(result["no_go"].get(expected_no_go), result)
                self.assertFalse(result["source_mutated"])
                self.assertFalse(result["target_mutated"])
                self.assertFalse(result["direct_db_edit"])

    def test_no_go_records_are_hash_bound_and_artifact_only(self) -> None:
        result = self.module.validate_no_go_record(no_go_record(), repo_root=self.repo)

        self.assertEqual(result["status"], "no_go_recorded")
        self.assertTrue(result["no_go"]["unsupported_operation"])
        self.assertTrue(result["no_go"]["direct_hermes_target"])
        self.assertFalse(result["source_mutated"])
        self.assertFalse(result["target_mutated"])
        self.assertFalse(result["direct_db_edit"])
        self.assertTrue(result["artifact_only"])

    def test_contract_docs_and_fixtures_validate_the_same_bundle_and_no_go_shape(self) -> None:
        self.assertTrue(DOC.exists(), DOC)
        doc_text = DOC.read_text(encoding="utf-8")
        for phrase in (
            "queue entry",
            "dry-run evidence",
            "approval grant",
            "ledger row",
            "no-go record",
            ALLOWED_OPERATION,
            TARGET_ROOT,
            "no GSD/Kanban/Hermes mutation",
            "no worker dispatch",
            "no durable watcher",
        ):
            self.assertIn(phrase, doc_text)

        fixture_paths = {
            "queue_entry": FIXTURE_DIR / "m015-queue-entry.json",
            "dry_run_evidence": FIXTURE_DIR / "m015-dry-run-evidence.json",
            "approval_grant": FIXTURE_DIR / "m015-approval-grant.json",
            "ledger_row": FIXTURE_DIR / "m015-ledger-row.json",
            "no_go_record": FIXTURE_DIR / "m015-no-go-record.json",
        }
        for path in fixture_paths.values():
            self.assertTrue(path.exists(), path)

        bundle = {key: json.loads(path.read_text(encoding="utf-8")) for key, path in fixture_paths.items() if key != "no_go_record"}
        result = self.module.validate_contract_bundle(bundle, repo_root=self.repo, as_of=AS_OF)
        self.assertEqual(result["status"], "valid", result)

        no_go_result = self.module.validate_no_go_record(
            json.loads(fixture_paths["no_go_record"].read_text(encoding="utf-8")),
            repo_root=self.repo,
        )
        self.assertEqual(no_go_result["status"], "no_go_recorded", no_go_result)


if __name__ == "__main__":
    unittest.main()
