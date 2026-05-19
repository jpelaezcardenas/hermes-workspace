#!/usr/bin/env python3
"""RED tests for M014/S01 approval-action contract safety envelope."""

from __future__ import annotations

import hashlib
import importlib.util
import json
import shutil
import tempfile
import unittest
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-approval-action.py"
SCHEMA = "hermes-cockpit.approval-action.v1"
ALLOWED_OPERATION = "cockpit.audit_note_append"
TARGET_REL = "target/hermes-cockpit-m014/pilot-audit-log.jsonl"


def canonical_hash(value: Any) -> str:
    encoded = json.dumps(value, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return "sha256:" + hashlib.sha256(encoded).hexdigest()


def load_module():
    if not SCRIPT.exists():
        raise AssertionError(f"expected approval-action contract script at {SCRIPT}")
    spec = importlib.util.spec_from_file_location("hermes_cockpit_approval_action", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


def pilot_payload(summary: str = "bounded non-canonical Cockpit approval pilot note") -> dict[str, Any]:
    return {
        "note_kind": "wf1_pilot_smoke",
        "summary": summary,
        "max_chars": 240,
        "target_path": TARGET_REL,
    }


def pilot_operation(operation_type: str = ALLOWED_OPERATION, *, mode: str = "dry-run", target_path: str = TARGET_REL, summary: str = "bounded non-canonical Cockpit approval pilot note") -> dict[str, Any]:
    payload = pilot_payload(summary=summary) | {"target_path": target_path}
    return {
        "schema_version": SCHEMA,
        "contract_id": "m014.s01.approval-action.v1",
        "operation_id": "op_m014_audit_note_001",
        "operation_type": operation_type,
        "mode": mode,
        "requested_at": "2026-05-18T00:00:00Z",
        "actor": {"id": "migi", "kind": "agent", "approval_authority": False},
        "source": "cockpit",
        "target": {
            "system": "artifact",
            "id": "pilot-audit-log",
            "path": target_path,
            "scope": "m014_sandbox",
        },
        "payload": payload,
        "payload_hash": canonical_hash(payload),
        "bounds": {
            "target_root": "target/hermes-cockpit-m014",
            "max_chars": 240,
            "max_bytes": 4096,
            "append_only": True,
            "max_operation_count": 1,
        },
        "dry_run": {},
        "approval": {"required": True, "status": "not_requested"},
        "apply_guard": {},
        "audit": {
            "created_by": "migi",
            "created_at": "2026-05-18T00:00:00Z",
            "events_emitted": [],
            "rollback_or_compensation": "append a correction note only; no source-of-truth mutation",
            "non_claims": {
                "no_gsd_kanban_hermes_mutation": True,
                "no_direct_db_edit": True,
                "no_worker_dispatch": True,
                "no_watcher_install": True,
            },
        },
        "no_go": {},
    }


class ApprovalContractSafetyEnvelopeTests(unittest.TestCase):
    def setUp(self) -> None:
        self.module = load_module()
        self.tmp_dir = tempfile.mkdtemp(prefix="approval-action-contract-")
        self.addCleanup(shutil.rmtree, self.tmp_dir, ignore_errors=True)
        self.repo = Path(self.tmp_dir) / "repo"
        self.repo.mkdir()
        self.evidence_dir = self.repo / "target" / "hermes-cockpit-m014" / "evidence"

    def test_contract_accepts_only_m014_schema_and_allowed_pilot(self) -> None:
        accepted = self.module.validate_operation(pilot_operation(), mode="dry-run", repo_root=self.repo)
        self.assertEqual(accepted["schema_version"], SCHEMA)
        self.assertEqual(accepted["operation_type"], ALLOWED_OPERATION)
        self.assertIn(accepted["status"], {"dry_run_required", "dry_run_passed"})
        self.assertFalse(accepted["target_mutated"])
        self.assertFalse(accepted["direct_db_edit"])

        for operation_type in ("writeback.task_comment", "dispatch.worker_start", "watcher.start", "unknown.verb"):
            rejected = self.module.validate_operation(
                pilot_operation(operation_type=operation_type),
                mode="dry-run",
                repo_root=self.repo,
            )
            self.assertEqual(rejected["status"], "rejected", operation_type)
            self.assertIn("unsupported", " ".join(rejected["rejection_reasons"]).lower())
            self.assertFalse(rejected["target_mutated"])
            self.assertFalse(rejected["direct_db_edit"])

    def test_no_go_rules_block_secrets_runtime_paths_and_broad_targets(self) -> None:
        cases = [
            (pilot_operation(target_path="../.gsd/gsd.db"), "path"),
            (pilot_operation(target_path=".hermes/runtime.json"), "runtime"),
            (pilot_operation(target_path="target/hermes-cockpit-m014/*.jsonl"), "broad"),
            (pilot_operation(summary="contains secret sk-test-1234567890abcdef"), "secret"),
        ]
        for operation, expected_reason in cases:
            rejected = self.module.validate_operation(operation, mode="dry-run", repo_root=self.repo)
            self.assertEqual(rejected["status"], "rejected", operation)
            joined = " ".join(rejected["rejection_reasons"]).lower()
            self.assertIn(expected_reason, joined)
            self.assertFalse(rejected["target_mutated"])
            self.assertFalse(rejected["source_mutated"])

    def test_dry_run_writes_evidence_without_target_mutation(self) -> None:
        target = self.repo / TARGET_REL
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text("existing\n", encoding="utf-8")
        before = target.read_text(encoding="utf-8")

        entries = self.module.run_approval_actions(
            [pilot_operation()],
            mode="dry-run",
            repo_root=self.repo,
            evidence_dir=self.evidence_dir,
        )

        self.assertEqual(len(entries), 1)
        entry = entries[0]
        self.assertEqual(entry["status"], "dry_run_passed")
        self.assertFalse(entry["source_mutated"])
        self.assertFalse(entry["target_mutated"])
        self.assertEqual(target.read_text(encoding="utf-8"), before)
        self.assertEqual(entry["payload_hash"], pilot_operation()["payload_hash"])
        self.assertIn("target_signature_before", entry["dry_run"])
        self.assertGreater(entry["dry_run"]["expected_append_bytes"], 0)
        self.assertTrue(entry["audit"]["non_claims"]["no_gsd_kanban_hermes_mutation"])
        evidence_path = Path(entry["evidence_path"])
        self.assertTrue(evidence_path.exists(), evidence_path)
        evidence = json.loads(evidence_path.read_text(encoding="utf-8"))
        self.assertEqual(evidence["status"], "dry_run_passed")
        self.assertFalse(evidence["target_mutated"])

    def test_apply_is_blocked_in_s01_until_wf3_executor_implements_matching(self) -> None:
        target = self.repo / TARGET_REL
        entries = self.module.run_approval_actions(
            [pilot_operation(mode="apply")],
            mode="apply",
            repo_root=self.repo,
            evidence_dir=self.evidence_dir,
        )

        self.assertEqual(len(entries), 1)
        entry = entries[0]
        self.assertEqual(entry["status"], "apply_blocked")
        self.assertIn("wf3", " ".join(entry["rejection_reasons"]).lower())
        self.assertFalse(entry["target_mutated"])
        self.assertFalse(target.exists())


if __name__ == "__main__":
    unittest.main()
