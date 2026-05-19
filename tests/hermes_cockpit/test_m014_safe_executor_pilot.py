#!/usr/bin/env python3
"""M014/S03 strict-TDD tests for the artifact-only safe executor pilot."""

from __future__ import annotations

import hashlib
import importlib.util
import json
import os
import shutil
import subprocess
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Any
from unittest import mock

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-approval-action.py"
SCHEMA = "hermes-cockpit.approval-action.v1"
CONTRACT_ID = "m014.s01.approval-action.v1"
ALLOWED_OPERATION = "cockpit.audit_note_append"
TARGET_REL = "target/hermes-cockpit-m014/pilot-audit-log.jsonl"
EVIDENCE_ROOT_REL = "target/hermes-cockpit-m014/s03-test-evidence"


def canonical_json(value: Any) -> str:
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def canonical_hash(value: Any) -> str:
    return "sha256:" + hashlib.sha256(canonical_json(value).encode("utf-8")).hexdigest()


def parse_utc(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def iso(dt: datetime) -> str:
    return dt.astimezone(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def load_module():
    if not SCRIPT.exists():
        raise AssertionError(f"expected approval-action script at {SCRIPT}")
    spec = importlib.util.spec_from_file_location("hermes_cockpit_approval_action", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


def pilot_payload(*, target_path: str = TARGET_REL, summary: str = "bounded non-canonical Cockpit approval pilot note") -> dict[str, Any]:
    return {
        "note_kind": "wf3_safe_executor_pilot",
        "summary": summary,
        "max_chars": 240,
        "target_path": target_path,
    }


def pilot_operation(
    *,
    operation_id: str = "op_m014_wf3_audit_note_append_001",
    mode: str = "dry-run",
    target_path: str = TARGET_REL,
    summary: str = "bounded non-canonical Cockpit approval pilot note",
    operation_type: str = ALLOWED_OPERATION,
) -> dict[str, Any]:
    payload = pilot_payload(target_path=target_path, summary=summary)
    return {
        "schema_version": SCHEMA,
        "contract_id": CONTRACT_ID,
        "operation_id": operation_id,
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
                "no_cron_schedule": True,
                "no_discord_call": True,
            },
        },
        "no_go": {},
    }


def evidence_hash(record: dict[str, Any]) -> str:
    stable = json.loads(json.dumps(record))
    stable.pop("evidence_hash", None)
    if isinstance(stable.get("dry_run"), dict):
        stable["dry_run"].pop("evidence_hash", None)
    if isinstance(stable.get("apply"), dict):
        stable["apply"].pop("evidence_hash", None)
    return canonical_hash(stable)


class SafeExecutorPilotTests(unittest.TestCase):
    def setUp(self) -> None:
        self.module = load_module()
        self.tmp_dir = tempfile.mkdtemp(prefix="m014-safe-executor-")
        self.addCleanup(shutil.rmtree, self.tmp_dir, ignore_errors=True)
        self.repo = Path(self.tmp_dir) / "repo"
        self.repo.mkdir()
        self.evidence_dir = self.repo / EVIDENCE_ROOT_REL
        self.target = self.repo / TARGET_REL
        self.target.parent.mkdir(parents=True, exist_ok=True)
        self.target.write_text("existing baseline\n", encoding="utf-8")

    def dry_run(self, operation: dict[str, Any] | None = None) -> tuple[dict[str, Any], Path, str, dict[str, Any]]:
        op = operation or pilot_operation()
        entries = self.module.run_approval_actions(
            [op],
            mode="dry-run",
            repo_root=self.repo,
            evidence_dir=self.evidence_dir,
        )
        self.assertEqual(len(entries), 1)
        entry = entries[0]
        evidence_path = Path(entry["evidence_path"])
        self.assertTrue(evidence_path.exists(), evidence_path)
        record = json.loads(evidence_path.read_text(encoding="utf-8"))
        dry_hash = record["evidence_hash"]
        self.assertEqual(dry_hash, evidence_hash(record))
        self.assertEqual(entry["dry_run"]["evidence_hash"], dry_hash)
        return entry, evidence_path, dry_hash, record

    def approval_for(self, dry_record: dict[str, Any], dry_hash: str, **overrides: Any) -> dict[str, Any]:
        dry_created_at = parse_utc(dry_record["created_at"])
        approval = {
            "required": True,
            "status": "granted",
            "decision_id": "approval-m014-s03-test",
            "decided_at": iso(dry_created_at + timedelta(seconds=30)),
            "expires_at": iso(dry_created_at + timedelta(hours=1)),
            "revoked_at": None,
            "dry_run_evidence_hash": dry_hash,
            "approver": {"id": "joe", "kind": "operator", "approval_authority": True},
        }
        approval.update(overrides)
        return approval

    def apply_operation(
        self,
        dry_path: Path,
        dry_hash: str,
        dry_record: dict[str, Any],
        *,
        approval: dict[str, Any] | None = None,
        target_path: str = TARGET_REL,
        summary: str = "bounded non-canonical Cockpit approval pilot note",
    ) -> dict[str, Any]:
        op = pilot_operation(mode="apply", target_path=target_path, summary=summary)
        op["dry_run"] = {"evidence_path": str(dry_path), "evidence_hash": dry_hash}
        op["apply_guard"] = {
            "dry_run_evidence_hash": dry_hash,
            "payload_hash": op["payload_hash"],
            "target_signature_before": dry_record["dry_run"]["target_signature_before"],
            "target_prefix_hash": dry_record["dry_run"]["target_prefix_hash"],
        }
        op["approval"] = approval if approval is not None else self.approval_for(dry_record, dry_hash)
        return op

    def assert_apply_blocked_without_mutation(self, op: dict[str, Any], expected_reason: str) -> dict[str, Any]:
        before = self.target.read_text(encoding="utf-8")
        entries = self.module.run_approval_actions(
            [op],
            mode="apply",
            repo_root=self.repo,
            evidence_dir=self.evidence_dir,
        )
        self.assertEqual(len(entries), 1)
        entry = entries[0]
        self.assertEqual(entry["status"], "apply_blocked")
        self.assertFalse(entry["source_mutated"])
        self.assertFalse(entry["target_mutated"])
        self.assertEqual(self.target.read_text(encoding="utf-8"), before)
        joined = " ".join(entry["rejection_reasons"]).lower()
        self.assertIn(expected_reason.lower(), joined)
        self.assertTrue(Path(entry["evidence_path"]).exists())
        return entry

    def test_dry_run_evidence_hash_prefix_and_no_target_mutation(self) -> None:
        before = self.target.read_text(encoding="utf-8")
        entry, _path, dry_hash, record = self.dry_run()

        self.assertEqual(entry["status"], "dry_run_passed")
        self.assertEqual(self.target.read_text(encoding="utf-8"), before)
        self.assertFalse(record["source_mutated"])
        self.assertFalse(record["target_mutated"])
        self.assertEqual(record["payload_hash"], pilot_operation()["payload_hash"])
        self.assertEqual(record["dry_run"]["evidence_hash"], dry_hash)
        self.assertEqual(record["dry_run"]["target_signature_before"]["sha256"], record["dry_run"]["target_prefix_hash"])
        self.assertEqual(record["dry_run"]["expected_delta"]["append_rows"], 1)
        self.assertGreater(record["dry_run"]["expected_delta"]["append_bytes"], 0)
        non_claims = record["audit"]["non_claims"]
        for key in (
            "no_gsd_kanban_hermes_mutation",
            "no_direct_db_edit",
            "no_worker_dispatch",
            "no_watcher_install",
            "no_cron_schedule",
            "no_discord_call",
        ):
            self.assertTrue(non_claims[key], key)

    def test_apply_rejects_missing_and_wrong_dry_run_evidence_hash(self) -> None:
        entry, dry_path, dry_hash, dry_record = self.dry_run()
        missing_hash_op = self.apply_operation(dry_path, dry_hash, dry_record)
        missing_hash_op["dry_run"].pop("evidence_hash")
        missing_hash_op["apply_guard"].pop("dry_run_evidence_hash")
        self.assert_apply_blocked_without_mutation(missing_hash_op, "dry_run_evidence_hash")

        wrong_hash_op = self.apply_operation(dry_path, "sha256:" + "0" * 64, dry_record)
        wrong_hash_op["approval"] = self.approval_for(dry_record, "sha256:" + "0" * 64)
        self.assert_apply_blocked_without_mutation(wrong_hash_op, "dry-run evidence hash mismatch")
        self.assertEqual(entry["status"], "dry_run_passed")

    def test_apply_rejects_payload_hash_and_target_mismatches(self) -> None:
        _entry, dry_path, dry_hash, dry_record = self.dry_run()

        changed_payload = self.apply_operation(
            dry_path,
            dry_hash,
            dry_record,
            summary="changed payload with same operation id",
        )
        self.assert_apply_blocked_without_mutation(changed_payload, "payload hash")

        wrong_target = self.apply_operation(
            dry_path,
            dry_hash,
            dry_record,
            target_path="target/hermes-cockpit-m014/other-audit-log.jsonl",
        )
        other_target = self.repo / "target/hermes-cockpit-m014/other-audit-log.jsonl"
        self.assert_apply_blocked_without_mutation(wrong_target, "target")
        self.assertFalse(other_target.exists())

    def test_apply_rejects_stale_target_signature_or_prefix(self) -> None:
        _entry, dry_path, dry_hash, dry_record = self.dry_run()
        self.target.write_text("existing baseline\nunapproved intervening write\n", encoding="utf-8")
        op = self.apply_operation(dry_path, dry_hash, dry_record)
        blocked = self.assert_apply_blocked_without_mutation(op, "target signature")
        self.assertIn("target_signature_stale", blocked["no_go"])

    def test_apply_rejects_missing_denied_expired_revoked_or_pre_dry_run_approval(self) -> None:
        _entry, dry_path, dry_hash, dry_record = self.dry_run()
        dry_created_at = parse_utc(dry_record["created_at"])
        approval_cases = [
            ({"required": True, "status": "not_requested", "dry_run_evidence_hash": dry_hash, "decided_at": iso(dry_created_at + timedelta(seconds=30))}, "approval_missing"),
            ({"required": True, "status": "denied", "dry_run_evidence_hash": dry_hash, "decided_at": iso(dry_created_at + timedelta(seconds=30))}, "approval_denied"),
            (self.approval_for(dry_record, dry_hash, expires_at="2000-01-01T00:00:00Z"), "approval_expired"),
            (self.approval_for(dry_record, dry_hash, revoked_at=iso(dry_created_at + timedelta(seconds=45))), "approval_revoked"),
            (self.approval_for(dry_record, dry_hash, decided_at=iso(dry_created_at - timedelta(seconds=1))), "approval_precedes_dry_run"),
            (self.approval_for(dry_record, "sha256:" + "1" * 64), "approval_not_bound_to_dry_run_hash"),
        ]
        for approval, expected_reason in approval_cases:
            with self.subTest(expected_reason=expected_reason):
                op = self.apply_operation(dry_path, dry_hash, dry_record, approval=approval)
                self.assert_apply_blocked_without_mutation(op, expected_reason)

    def test_successful_apply_appends_one_sanitized_jsonl_row_and_apply_evidence(self) -> None:
        before = self.target.read_text(encoding="utf-8")
        before_lines = before.splitlines()
        _entry, dry_path, dry_hash, dry_record = self.dry_run(
            pilot_operation(summary="line one\nline two with sanitized newline")
        )
        op = self.apply_operation(
            dry_path,
            dry_hash,
            dry_record,
            summary="line one\nline two with sanitized newline",
        )

        entries = self.module.run_approval_actions(
            [op],
            mode="apply",
            repo_root=self.repo,
            evidence_dir=self.evidence_dir,
        )

        self.assertEqual(len(entries), 1)
        entry = entries[0]
        self.assertEqual(entry["status"], "applied")
        self.assertFalse(entry["source_mutated"])
        self.assertTrue(entry["target_mutated"])
        after_lines = self.target.read_text(encoding="utf-8").splitlines()
        self.assertEqual(after_lines[: len(before_lines)], before_lines)
        self.assertEqual(len(after_lines), len(before_lines) + 1)
        appended = json.loads(after_lines[-1])
        self.assertEqual(appended["operation_type"], ALLOWED_OPERATION)
        self.assertEqual(appended["summary"], "line one line two with sanitized newline")
        self.assertNotIn("\n", appended["summary"])
        self.assertFalse(appended["source_of_truth_mutated"])
        self.assertEqual(appended["row_hash"], canonical_hash({k: v for k, v in appended.items() if k != "row_hash"}))

        evidence = json.loads(Path(entry["evidence_path"]).read_text(encoding="utf-8"))
        self.assertEqual(evidence["status"], "applied")
        self.assertEqual(evidence["apply"]["actual_delta"]["append_rows"], 1)
        self.assertEqual(evidence["apply"]["dry_run_evidence_hash"], dry_hash)
        self.assertEqual(evidence["target_before_signature"], dry_record["dry_run"]["target_signature_before"])
        self.assertNotEqual(evidence["target_after_signature"], evidence["target_before_signature"])

    def test_no_external_mutation_calls_or_side_effect_paths(self) -> None:
        _entry, dry_path, dry_hash, dry_record = self.dry_run()
        op = self.apply_operation(dry_path, dry_hash, dry_record)
        with mock.patch.object(subprocess, "run", side_effect=AssertionError("subprocess.run called")), \
            mock.patch.object(subprocess, "Popen", side_effect=AssertionError("subprocess.Popen called")), \
            mock.patch.object(subprocess, "check_call", side_effect=AssertionError("subprocess.check_call called")), \
            mock.patch.object(os, "system", side_effect=AssertionError("os.system called")):
            entries = self.module.run_approval_actions(
                [op],
                mode="apply",
                repo_root=self.repo,
                evidence_dir=self.evidence_dir,
            )
        self.assertEqual(entries[0]["status"], "applied")

        file_paths = {path.relative_to(self.repo).as_posix() for path in self.repo.rglob("*") if path.is_file()}
        allowed_prefix = EVIDENCE_ROOT_REL + "/"
        for rel in file_paths:
            self.assertTrue(
                rel == TARGET_REL or rel.startswith(allowed_prefix),
                f"unexpected side-effect path: {rel}",
            )
        self.assertFalse((self.repo / ".gsd").exists())
        self.assertFalse((self.repo / ".hermes").exists())
        self.assertFalse(any(path.suffix in {".db", ".sqlite", ".sqlite3"} for path in self.repo.rglob("*")))


if __name__ == "__main__":
    unittest.main()
