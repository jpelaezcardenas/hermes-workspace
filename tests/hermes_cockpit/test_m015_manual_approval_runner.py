#!/usr/bin/env python3
"""M015/S03 strict-TDD tests for the manual approval grant + artifact-only apply runner."""

from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from copy import deepcopy
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-approval-queue.py"
PYTHON = sys.executable

SCHEMA = "hermes-cockpit.approval-queue.v1"
CONTRACT_ID = "m015.s01.approval-queue.v1"
ALLOWED_OPERATION = "cockpit.audit_note_append"
TARGET_ROOT = "target/hermes-cockpit-m015"
TARGET_REL = f"{TARGET_ROOT}/manual-runner-audit-log.jsonl"
QUEUE_REL = f"{TARGET_ROOT}/manual-runner/queue-entry.json"
DRY_REL = f"{TARGET_ROOT}/manual-runner/dry-run-evidence.json"
GRANT_REL = f"{TARGET_ROOT}/manual-runner/manual-approval-grant.json"
APPLY_REL = f"{TARGET_ROOT}/manual-runner/apply-evidence.json"
LEDGER_REL = f"{TARGET_ROOT}/manual-runner/apply-ledger.jsonl"
AS_OF = "2026-05-18T00:20:00Z"
DRY_CREATED_AT = "2026-05-18T00:05:00Z"
DRY_EXPIRES_AT = "2026-05-18T01:00:00Z"
DECIDED_AT = "2026-05-18T00:10:00Z"
APPROVAL_EXPIRES_AT = "2026-05-18T01:00:00Z"


def canonical_json(value: Any) -> str:
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False)


def canonical_hash(value: Any) -> str:
    return "sha256:" + hashlib.sha256(canonical_json(value).encode("utf-8")).hexdigest()


def hash_without(record: dict[str, Any], field: str) -> str:
    clone = deepcopy(record)
    clone.pop(field, None)
    return canonical_hash(clone)


def file_signature(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {"exists": False, "size": 0, "sha256": "sha256:" + hashlib.sha256(b"").hexdigest()}
    data = path.read_bytes()
    return {"exists": True, "size": len(data), "sha256": "sha256:" + hashlib.sha256(data).hexdigest()}


def read_json(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


class ManualApprovalRunnerTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tmp_dir = tempfile.mkdtemp(prefix="m015-manual-runner-")
        self.addCleanup(shutil.rmtree, self.tmp_dir, ignore_errors=True)
        self.repo = Path(self.tmp_dir) / "repo"
        self.repo.mkdir()
        self.target = self.repo / TARGET_REL
        self.target.parent.mkdir(parents=True, exist_ok=True)
        self.target.write_text("existing baseline\n", encoding="utf-8")

    def payload(self, *, target_path: str = TARGET_REL, summary: str = "line one\nline two sanitized") -> dict[str, Any]:
        return {
            "note_kind": "m015_s03_manual_runner",
            "summary": summary,
            "max_chars": 240,
            "target_path": target_path,
        }

    def queue_entry(
        self,
        *,
        operation_type: str = ALLOWED_OPERATION,
        target_path: str = TARGET_REL,
        target_root: str = TARGET_ROOT,
        summary: str = "line one\nline two sanitized",
    ) -> dict[str, Any]:
        payload = self.payload(target_path=target_path, summary=summary)
        signature = file_signature(self.repo / target_path)
        prefix_hash = signature["sha256"]
        return {
            "schema_version": SCHEMA,
            "contract_id": CONTRACT_ID,
            "queue_id": "queue-m015-s03-001",
            "operation_id": "op_m015_s03_audit_note_append_001",
            "operation_type": operation_type,
            "state": "approval_pending",
            "requested_at": "2026-05-18T00:00:00Z",
            "actor": {"id": "migi", "kind": "agent", "approval_authority": False},
            "source": "cockpit",
            "target": {
                "system": "artifact",
                "id": "m015-manual-runner-audit-log",
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
                "evidence_path": DRY_REL,
                "evidence_hash": "sha256:pending",
                "evidence_expires_at": DRY_EXPIRES_AT,
            },
            "approval": {"required": True, "status": "pending"},
            "apply_guard": {
                "dry_run_evidence_hash": "sha256:pending",
                "payload_hash": canonical_hash(payload),
                "target_signature_before": signature,
                "target_prefix_hash": prefix_hash,
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
                "ledger_path": LEDGER_REL,
                "rollback_or_compensation": "append a correction artifact only; no source-of-truth mutation",
            },
            "no_go": {},
        }

    def dry_run_evidence(self, entry: dict[str, Any]) -> dict[str, Any]:
        row_preview = {
            "schema_version": "hermes-cockpit.approval-queue.audit-note.v1",
            "queue_id": entry["queue_id"],
            "operation_id": entry["operation_id"],
            "operation_type": entry["operation_type"],
            "note_kind": entry["payload"]["note_kind"],
            "summary": "line one line two sanitized",
            "non_canonical": True,
            "source_of_truth_mutated": False,
        }
        row_preview["row_hash"] = canonical_hash(row_preview)
        record = {
            "schema_version": SCHEMA,
            "contract_id": CONTRACT_ID,
            "evidence_id": "dry-run-m015-s03-001",
            "queue_id": entry["queue_id"],
            "operation_id": entry["operation_id"],
            "operation_type": entry["operation_type"],
            "status": "dry_run_passed",
            "created_at": DRY_CREATED_AT,
            "expires_at": DRY_EXPIRES_AT,
            "target": deepcopy(entry["target"]),
            "payload_hash": entry["payload_hash"],
            "target_signature_before": deepcopy(entry["apply_guard"]["target_signature_before"]),
            "target_prefix_hash": entry["apply_guard"]["target_prefix_hash"],
            "expected_delta": {"append_rows": 1, "append_bytes_max": 4096},
            "expected_row_hash": row_preview["row_hash"],
            "audit_row_preview": row_preview,
            "source_mutated": False,
            "target_mutated": False,
            "redaction_count": 0,
            "dropped_count": 0,
            "non_claims": deepcopy(entry["audit"]["non_claims"]),
        }
        record["evidence_hash"] = hash_without(record, "evidence_hash")
        return record

    def write_fixture_files(self, entry: dict[str, Any] | None = None) -> tuple[dict[str, Any], dict[str, Any], Path, Path, Path, Path, Path]:
        queue = entry or self.queue_entry()
        dry = self.dry_run_evidence(queue)
        queue["dry_run"]["evidence_hash"] = dry["evidence_hash"]
        queue["apply_guard"]["dry_run_evidence_hash"] = dry["evidence_hash"]
        queue_path = self.repo / QUEUE_REL
        dry_path = self.repo / DRY_REL
        grant_path = self.repo / GRANT_REL
        apply_path = self.repo / APPLY_REL
        ledger_path = self.repo / LEDGER_REL
        for path, value in ((queue_path, queue), (dry_path, dry)):
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(json.dumps(value, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        return queue, dry, queue_path, dry_path, grant_path, apply_path, ledger_path

    def run_cli(self, *args: Any) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [PYTHON, str(SCRIPT), *map(str, args)],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )

    def grant_cli(self, queue_path: Path, dry_path: Path, grant_path: Path, **extra: str) -> subprocess.CompletedProcess[str]:
        args: list[Any] = [
            "--grant",
            "--queue-entry",
            queue_path,
            "--dry-run-evidence",
            dry_path,
            "--approval-output",
            grant_path,
            "--repo-root",
            self.repo,
            "--decider-id",
            extra.get("decider_id", "joe"),
            "--decided-at",
            extra.get("decided_at", DECIDED_AT),
            "--expires-at",
            extra.get("expires_at", APPROVAL_EXPIRES_AT),
            "--reason",
            extra.get("reason", "manual S03 test approval"),
            "--as-of",
            extra.get("as_of", AS_OF),
        ]
        return self.run_cli(*args)

    def apply_cli(self, queue_path: Path, dry_path: Path, grant_path: Path, apply_path: Path, ledger_path: Path) -> subprocess.CompletedProcess[str]:
        return self.run_cli(
            "--apply",
            "--queue-entry",
            queue_path,
            "--dry-run-evidence",
            dry_path,
            "--approval-grant",
            grant_path,
            "--apply-output",
            apply_path,
            "--ledger-output",
            ledger_path,
            "--repo-root",
            self.repo,
            "--as-of",
            AS_OF,
        )

    def assert_blocked_without_mutation(
        self,
        queue_path: Path,
        dry_path: Path,
        grant_path: Path,
        apply_path: Path,
        ledger_path: Path,
        expected_no_go: str,
    ) -> dict[str, Any]:
        before = self.target.read_text(encoding="utf-8")
        result = self.apply_cli(queue_path, dry_path, grant_path, apply_path, ledger_path)
        self.assertNotEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(self.target.read_text(encoding="utf-8"), before)
        self.assertTrue(apply_path.exists(), result.stdout + result.stderr)
        evidence = read_json(apply_path)
        self.assertEqual(evidence["status"], "apply_blocked", evidence)
        self.assertFalse(evidence["source_mutated"])
        self.assertFalse(evidence["target_mutated"])
        self.assertFalse(evidence["direct_db_edit"])
        self.assertTrue(evidence["no_go"].get(expected_no_go), evidence)
        return evidence

    def test_cli_grant_writes_exact_manual_approval_artifact_without_target_mutation(self) -> None:
        _queue, dry, queue_path, dry_path, grant_path, _apply_path, _ledger_path = self.write_fixture_files()
        before = self.target.read_text(encoding="utf-8")

        result = self.grant_cli(queue_path, dry_path, grant_path)

        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(self.target.read_text(encoding="utf-8"), before)
        grant = read_json(grant_path)
        self.assertEqual(grant["schema_version"], SCHEMA)
        self.assertEqual(grant["contract_id"], CONTRACT_ID)
        self.assertEqual(grant["status"], "granted")
        self.assertEqual(grant["decider"], {"id": "joe", "kind": "operator", "approval_authority": True})
        self.assertEqual(grant["dry_run_evidence_hash"], dry["evidence_hash"])
        self.assertEqual(grant["payload_hash"], dry["payload_hash"])
        self.assertEqual(grant["target"], dry["target"])
        self.assertEqual(grant["target_signature_before"], dry["target_signature_before"])
        self.assertEqual(grant["target_prefix_hash"], dry["target_prefix_hash"])
        self.assertFalse(grant["source_mutated"])
        self.assertFalse(grant["target_mutated"])
        self.assertFalse(grant["direct_db_edit"])
        self.assertTrue(grant["non_claims"]["no_gsd_kanban_hermes_mutation"])

    def test_cli_apply_appends_one_sanitized_audit_note_and_apply_evidence_when_exact_grant_matches(self) -> None:
        _queue, dry, queue_path, dry_path, grant_path, apply_path, ledger_path = self.write_fixture_files()
        grant_result = self.grant_cli(queue_path, dry_path, grant_path)
        self.assertEqual(grant_result.returncode, 0, grant_result.stdout + grant_result.stderr)
        before_lines = self.target.read_text(encoding="utf-8").splitlines()

        result = self.apply_cli(queue_path, dry_path, grant_path, apply_path, ledger_path)

        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        after_lines = self.target.read_text(encoding="utf-8").splitlines()
        self.assertEqual(after_lines[: len(before_lines)], before_lines)
        self.assertEqual(len(after_lines), len(before_lines) + 1)
        appended = json.loads(after_lines[-1])
        self.assertEqual(appended["schema_version"], "hermes-cockpit.approval-queue.audit-note.v1")
        self.assertEqual(appended["operation_type"], ALLOWED_OPERATION)
        self.assertEqual(appended["summary"], "line one line two sanitized")
        self.assertNotIn("\n", appended["summary"])
        self.assertFalse(appended["source_of_truth_mutated"])
        self.assertEqual(appended["row_hash"], canonical_hash({k: v for k, v in appended.items() if k != "row_hash"}))

        evidence = read_json(apply_path)
        self.assertEqual(evidence["status"], "applied")
        self.assertEqual(evidence["dry_run_evidence_hash"], dry["evidence_hash"])
        self.assertEqual(evidence["target_before_signature"], dry["target_signature_before"])
        self.assertNotEqual(evidence["target_after_signature"], evidence["target_before_signature"])
        self.assertFalse(evidence["source_mutated"])
        self.assertTrue(evidence["target_mutated"])
        self.assertFalse(evidence["direct_db_edit"])
        ledger_lines = ledger_path.read_text(encoding="utf-8").splitlines()
        self.assertEqual(len(ledger_lines), 1)
        ledger_row = json.loads(ledger_lines[0])
        self.assertEqual(ledger_row["event_type"], "audit_note_appended")
        self.assertEqual(ledger_row["dry_run_evidence_hash"], dry["evidence_hash"])
        self.assertEqual(ledger_row["approval_id"], read_json(grant_path)["approval_id"])

    def test_apply_rejects_missing_denied_expired_and_replayed_approval_without_mutation(self) -> None:
        # missing approval artifact
        _queue, _dry, queue_path, dry_path, grant_path, apply_path, ledger_path = self.write_fixture_files()
        self.assert_blocked_without_mutation(queue_path, dry_path, grant_path, apply_path, ledger_path, "approval_missing")

        # denied approval artifact
        _queue, _dry, queue_path, dry_path, grant_path, apply_path, ledger_path = self.write_fixture_files()
        self.assertEqual(self.grant_cli(queue_path, dry_path, grant_path).returncode, 0)
        denied = read_json(grant_path)
        denied["status"] = "denied"
        grant_path.write_text(json.dumps(denied, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        self.assert_blocked_without_mutation(queue_path, dry_path, grant_path, apply_path, ledger_path, "approval_denied")

        # expired approval artifact
        _queue, _dry, queue_path, dry_path, grant_path, apply_path, ledger_path = self.write_fixture_files()
        self.assertEqual(self.grant_cli(queue_path, dry_path, grant_path, expires_at="2026-05-18T00:10:01Z").returncode, 0)
        self.assert_blocked_without_mutation(queue_path, dry_path, grant_path, apply_path, ledger_path, "approval_expired")

        # replayed approval after one successful apply
        _queue, _dry, queue_path, dry_path, grant_path, apply_path, ledger_path = self.write_fixture_files()
        self.assertEqual(self.grant_cli(queue_path, dry_path, grant_path).returncode, 0)
        first = self.apply_cli(queue_path, dry_path, grant_path, apply_path, ledger_path)
        self.assertEqual(first.returncode, 0, first.stdout + first.stderr)
        after_first = self.target.read_text(encoding="utf-8")
        replay_output = self.repo / f"{TARGET_ROOT}/manual-runner/replay-apply-evidence.json"
        replayed = self.apply_cli(queue_path, dry_path, grant_path, replay_output, ledger_path)
        self.assertNotEqual(replayed.returncode, 0, replayed.stdout + replayed.stderr)
        self.assertEqual(self.target.read_text(encoding="utf-8"), after_first)
        self.assertTrue(read_json(replay_output)["no_go"]["approval_replayed"])

    def test_apply_rejects_wrong_hashes_target_prefix_and_stale_target_without_mutation(self) -> None:
        # wrong evidence hash in queue/apply guard
        _queue, _dry, queue_path, dry_path, grant_path, apply_path, ledger_path = self.write_fixture_files()
        self.assertEqual(self.grant_cli(queue_path, dry_path, grant_path).returncode, 0)
        queue = read_json(queue_path)
        queue["dry_run"]["evidence_hash"] = "sha256:" + "0" * 64
        queue["apply_guard"]["dry_run_evidence_hash"] = "sha256:" + "0" * 64
        queue_path.write_text(json.dumps(queue, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        self.assert_blocked_without_mutation(queue_path, dry_path, grant_path, apply_path, ledger_path, "dry_run_evidence_hash_mismatch")

        # wrong payload hash in approval grant
        _queue, _dry, queue_path, dry_path, grant_path, apply_path, ledger_path = self.write_fixture_files()
        self.assertEqual(self.grant_cli(queue_path, dry_path, grant_path).returncode, 0)
        grant = read_json(grant_path)
        grant["payload_hash"] = "sha256:" + "1" * 64
        grant_path.write_text(json.dumps(grant, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        self.assert_blocked_without_mutation(queue_path, dry_path, grant_path, apply_path, ledger_path, "payload_hash_mismatch")

        # wrong target signature/prefix in approval grant
        _queue, _dry, queue_path, dry_path, grant_path, apply_path, ledger_path = self.write_fixture_files()
        self.assertEqual(self.grant_cli(queue_path, dry_path, grant_path).returncode, 0)
        grant = read_json(grant_path)
        grant["target_signature_before"] = {"exists": True, "size": 999, "sha256": "sha256:" + "2" * 64}
        grant["target_prefix_hash"] = "sha256:" + "3" * 64
        grant_path.write_text(json.dumps(grant, indent=2, sort_keys=True) + "\n", encoding="utf-8")
        self.assert_blocked_without_mutation(queue_path, dry_path, grant_path, apply_path, ledger_path, "target_mismatch")

        # stale target changed after dry-run evidence
        _queue, _dry, queue_path, dry_path, grant_path, apply_path, ledger_path = self.write_fixture_files()
        self.assertEqual(self.grant_cli(queue_path, dry_path, grant_path).returncode, 0)
        self.target.write_text("existing baseline\nunapproved intervening write\n", encoding="utf-8")
        self.assert_blocked_without_mutation(queue_path, dry_path, grant_path, apply_path, ledger_path, "target_signature_stale")

    def test_apply_rejects_unsupported_operation_unsafe_paths_roots_and_secret_payload_without_mutation(self) -> None:
        valid_queue, _dry, queue_path, dry_path, grant_path, apply_path, ledger_path = self.write_fixture_files()
        grant_result = self.grant_cli(queue_path, dry_path, grant_path)
        self.assertEqual(grant_result.returncode, 0, grant_result.stdout + grant_result.stderr)

        cases = []
        unsupported = deepcopy(valid_queue)
        unsupported["operation_type"] = "dispatch.worker_start"
        cases.append((unsupported, "unsupported_operation"))

        traversal = deepcopy(valid_queue)
        traversal["target"]["path"] = "../target/hermes-cockpit-m015/escape.jsonl"
        traversal["payload"]["target_path"] = "../target/hermes-cockpit-m015/escape.jsonl"
        traversal["payload_hash"] = canonical_hash(traversal["payload"])
        traversal["apply_guard"]["payload_hash"] = traversal["payload_hash"]
        cases.append((traversal, "path_traversal"))

        unsafe_root = deepcopy(valid_queue)
        unsafe_root["target"]["path"] = "target/hermes-cockpit-m014/wrong-root.jsonl"
        unsafe_root["payload"]["target_path"] = "target/hermes-cockpit-m014/wrong-root.jsonl"
        unsafe_root["target"]["root"] = "target/hermes-cockpit-m014"
        unsafe_root["bounds"]["target_root"] = "target/hermes-cockpit-m014"
        unsafe_root["payload_hash"] = canonical_hash(unsafe_root["payload"])
        unsafe_root["apply_guard"]["payload_hash"] = unsafe_root["payload_hash"]
        cases.append((unsafe_root, "unsafe_root"))

        secret = deepcopy(valid_queue)
        secret["payload"]["summary"] = "do not leak token sk-testsecretvalue12345"
        secret["payload_hash"] = canonical_hash(secret["payload"])
        secret["apply_guard"]["payload_hash"] = secret["payload_hash"]
        cases.append((secret, "secret_detected"))

        for index, (bad_entry, expected_no_go) in enumerate(cases, start=1):
            with self.subTest(expected_no_go=expected_no_go):
                queue_path.write_text(json.dumps(bad_entry, indent=2, sort_keys=True) + "\n", encoding="utf-8")
                case_apply_path = self.repo / f"{TARGET_ROOT}/manual-runner/blocked-{index}-apply-evidence.json"
                self.assert_blocked_without_mutation(queue_path, dry_path, grant_path, case_apply_path, ledger_path, expected_no_go)


if __name__ == "__main__":
    unittest.main()
