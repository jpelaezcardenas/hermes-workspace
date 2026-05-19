#!/usr/bin/env python3
"""RED tests for the M012/S02 unified operator control entry."""

from __future__ import annotations

import importlib.util
import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-control.py"
FIXTURE = ROOT / "tests" / "fixtures" / "hermes_cockpit" / "control-plane" / "control-ops.jsonl"

CONTROL_REGISTRY_SCHEMA = "hermes-cockpit.control-registry.v1"
SUPPORTED_LANES = {"writeback", "dispatch", "watcher"}


def load_module():
    spec = importlib.util.spec_from_file_location("hermes_cockpit_control", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


@dataclass
class FakeResult:
    stdout: str = ""
    stderr: str = ""
    returncode: int = 0


class FakeRunner:
    """Drop-in replacement for subprocess runners used by the writeback/dispatch primitives."""

    def __init__(self) -> None:
        self.calls: list[list[str]] = []
        self.show_count = 0

    def __call__(self, args, timeout=None):
        assert isinstance(args, list)
        assert args
        assert all(isinstance(part, str) for part in args)
        self.calls.append(args)
        if "show" in args:
            self.show_count += 1
            comments = 0 if self.show_count == 1 else 1
            return FakeResult(stdout=json.dumps({"id": args[-1], "comments": comments, "status": "todo"}))
        if "comment" in args:
            return FakeResult(stdout="comment appended")
        return FakeResult(stdout="control fake runner ok")


def writeback_op_from_fixture(operations):
    for op in operations:
        if op.get("operation_type") == "writeback.task_comment":
            return op
    raise AssertionError("control fixture is missing writeback.task_comment")


def dispatch_op_from_fixture(operations):
    for op in operations:
        if str(op.get("operation_type", "")).startswith("dispatch."):
            return op
    raise AssertionError("control fixture is missing dispatch operation")


def watcher_op_from_fixture(operations):
    for op in operations:
        if str(op.get("operation_type", "")).startswith("watcher."):
            return op
    raise AssertionError("control fixture is missing watcher operation")


def unsupported_op_from_fixture(operations):
    for op in operations:
        op_type = str(op.get("operation_type", ""))
        if not any(op_type.startswith(prefix) for prefix in ("writeback.", "dispatch.", "watcher.")):
            return op
    raise AssertionError("control fixture is missing an unsupported operation")


class ControlEntryRegistryShapeTests(unittest.TestCase):
    def setUp(self) -> None:
        self.module = load_module()
        self.tmp_dir = tempfile.mkdtemp(prefix="control-entry-")
        self.addCleanup(shutil.rmtree, self.tmp_dir, ignore_errors=True)
        self.tmp = Path(self.tmp_dir)
        self.registry = self.tmp / "control-registry.jsonl"
        self.workspace = self.tmp / "control-workspace"
        self.operations_path = self.tmp / "control-ops.jsonl"
        shutil.copyfile(FIXTURE, self.operations_path)

    def test_dry_run_writes_registry_with_required_schema_and_safe_flags(self) -> None:
        operations = self.module.load_operations(self.operations_path)
        runner = FakeRunner()

        entries = self.module.run_control_operations(
            operations,
            mode="dry-run",
            registry_path=self.registry,
            workspace_dir=self.workspace,
            runner=runner,
        )

        self.assertEqual(len(entries), len(operations))
        for entry in entries:
            self.assertEqual(entry["schema_version"], CONTROL_REGISTRY_SCHEMA)
            self.assertIn(entry["lane"], SUPPORTED_LANES | {"rejected"})
            self.assertFalse(entry["direct_db_edit"])
            self.assertFalse(entry["source_mutated"])
            self.assertIn("operation_id", entry)
            self.assertIn("operation_type", entry)
            self.assertIn("status", entry)
            self.assertIn("recorded_at", entry)
            self.assertIn("evidence_path", entry)
            self.assertIn("control_run_id", entry)
            self.assertIn("rejection_reasons", entry)
            self.assertIsInstance(entry["rejection_reasons"], list)

        registry_rows = [
            json.loads(line)
            for line in self.registry.read_text(encoding="utf-8").splitlines()
            if line.strip()
        ]
        self.assertEqual(len(registry_rows), len(entries))
        for row in registry_rows:
            self.assertEqual(row["schema_version"], CONTROL_REGISTRY_SCHEMA)
            self.assertFalse(row["direct_db_edit"])

    def test_supported_lanes_dry_run_produce_evidence_files(self) -> None:
        operations = self.module.load_operations(self.operations_path)
        runner = FakeRunner()

        entries = self.module.run_control_operations(
            operations,
            mode="dry-run",
            registry_path=self.registry,
            workspace_dir=self.workspace,
            runner=runner,
        )

        evidence_paths = {entry["operation_id"]: entry["evidence_path"] for entry in entries if entry["lane"] in SUPPORTED_LANES}
        self.assertTrue(evidence_paths, "expected at least one supported-lane evidence path")
        for evidence_path in evidence_paths.values():
            self.assertTrue(Path(evidence_path).exists(), f"missing evidence at {evidence_path}")

    def test_unsupported_operation_type_is_rejected_without_calling_runner(self) -> None:
        operations = self.module.load_operations(self.operations_path)
        unsupported = unsupported_op_from_fixture(operations)
        runner = FakeRunner()

        entries = self.module.run_control_operations(
            [unsupported],
            mode="dry-run",
            registry_path=self.registry,
            workspace_dir=self.workspace,
            runner=runner,
        )

        self.assertEqual(entries[0]["status"], "rejected")
        self.assertEqual(entries[0]["lane"], "rejected")
        self.assertTrue(entries[0]["rejection_reasons"])
        self.assertEqual(runner.calls, [])


class ControlEntryApplyGatingTests(unittest.TestCase):
    def setUp(self) -> None:
        self.module = load_module()
        self.tmp_dir = tempfile.mkdtemp(prefix="control-entry-apply-")
        self.addCleanup(shutil.rmtree, self.tmp_dir, ignore_errors=True)
        self.tmp = Path(self.tmp_dir)
        self.registry = self.tmp / "control-registry.jsonl"
        self.workspace = self.tmp / "control-workspace"
        self.operations_path = self.tmp / "control-ops.jsonl"
        shutil.copyfile(FIXTURE, self.operations_path)

    def test_apply_without_matching_dry_run_evidence_is_rejected(self) -> None:
        operations = self.module.load_operations(self.operations_path)
        wb_op = writeback_op_from_fixture(operations) | {"mode": "apply"}
        runner = FakeRunner()

        entries = self.module.run_control_operations(
            [wb_op],
            mode="apply",
            registry_path=self.registry,
            workspace_dir=self.workspace,
            prior_registry=[],
            runner=runner,
        )

        self.assertEqual(entries[0]["status"], "rejected")
        joined = " ".join(entries[0]["rejection_reasons"]).lower()
        self.assertIn("dry-run", joined)
        self.assertFalse(entries[0]["target_mutated"])
        self.assertFalse(entries[0]["direct_db_edit"])
        # No kanban comment subprocess attempted.
        self.assertFalse(any("comment" in call for call in runner.calls), runner.calls)

    def test_apply_after_prior_dry_run_evidence_is_accepted(self) -> None:
        operations = self.module.load_operations(self.operations_path)
        wb_op = writeback_op_from_fixture(operations)
        runner = FakeRunner()

        dry_entries = self.module.run_control_operations(
            [wb_op],
            mode="dry-run",
            registry_path=self.registry,
            workspace_dir=self.workspace,
            runner=runner,
        )
        prior_registry = self.module.load_registry(self.registry)
        self.assertTrue(prior_registry)
        self.assertEqual(dry_entries[0]["status"], "dry_run_passed")

        apply_entries = self.module.run_control_operations(
            [wb_op | {"mode": "apply"}],
            mode="apply",
            registry_path=self.registry,
            workspace_dir=self.workspace,
            prior_registry=prior_registry,
            runner=runner,
        )

        self.assertEqual(apply_entries[0]["status"], "applied")
        self.assertTrue(apply_entries[0]["target_mutated"])
        self.assertFalse(apply_entries[0]["direct_db_edit"])
        self.assertFalse(apply_entries[0]["source_mutated"])

    def test_apply_rejects_when_prior_dry_run_evidence_targets_different_operation_id(self) -> None:
        operations = self.module.load_operations(self.operations_path)
        wb_op = writeback_op_from_fixture(operations)
        runner = FakeRunner()

        # Build prior registry with a *different* operation_id so the apply must be rejected.
        self.module.run_control_operations(
            [wb_op | {"operation_id": "op_unrelated_dry_run"}],
            mode="dry-run",
            registry_path=self.registry,
            workspace_dir=self.workspace,
            runner=runner,
        )
        prior_registry = self.module.load_registry(self.registry)

        apply_entries = self.module.run_control_operations(
            [wb_op | {"mode": "apply"}],
            mode="apply",
            registry_path=self.registry,
            workspace_dir=self.workspace,
            prior_registry=prior_registry,
            runner=runner,
        )

        self.assertEqual(apply_entries[0]["status"], "rejected")
        self.assertFalse(apply_entries[0]["target_mutated"])
        joined = " ".join(apply_entries[0]["rejection_reasons"]).lower()
        self.assertIn("dry-run", joined)


class ControlEntryStatusTests(unittest.TestCase):
    def setUp(self) -> None:
        self.module = load_module()
        self.tmp_dir = tempfile.mkdtemp(prefix="control-entry-status-")
        self.addCleanup(shutil.rmtree, self.tmp_dir, ignore_errors=True)
        self.tmp = Path(self.tmp_dir)
        self.registry = self.tmp / "control-registry.jsonl"
        self.workspace = self.tmp / "control-workspace"
        self.operations_path = self.tmp / "control-ops.jsonl"
        shutil.copyfile(FIXTURE, self.operations_path)

    def test_status_returns_registry_snapshot_with_required_fields(self) -> None:
        operations = self.module.load_operations(self.operations_path)
        runner = FakeRunner()
        self.module.run_control_operations(
            operations,
            mode="dry-run",
            registry_path=self.registry,
            workspace_dir=self.workspace,
            runner=runner,
        )

        snapshot = self.module.status_snapshot(self.registry)

        self.assertEqual(snapshot["schema_version"], "hermes-cockpit.control-status.v1")
        self.assertIn("entries", snapshot)
        self.assertIn("summary", snapshot)
        ids_in_snapshot = {row["operation_id"] for row in snapshot["entries"]}
        for op in operations:
            self.assertIn(op["operation_id"], ids_in_snapshot)
        summary = snapshot["summary"]
        for required in {"entry_count", "dry_run_passed_count", "applied_count", "rejected_count"}:
            self.assertIn(required, summary)


class ControlEntryCliSafetyTests(unittest.TestCase):
    def test_cli_rejects_path_collisions(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            tmp_path = Path(tmp)
            source = tmp_path / "control-ops.jsonl"
            source.write_text(FIXTURE.read_text(encoding="utf-8"), encoding="utf-8")
            registry = tmp_path / "control-registry.jsonl"
            workspace = tmp_path / "control-workspace"

            collision_registry = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "dry-run",
                    "--operations",
                    str(source),
                    "--registry",
                    str(source),
                    "--workspace",
                    str(workspace),
                ],
                cwd=ROOT,
                text=True,
                capture_output=True,
            )
            collision_workspace = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "dry-run",
                    "--operations",
                    str(source),
                    "--registry",
                    str(registry),
                    "--workspace",
                    str(source),
                ],
                cwd=ROOT,
                text=True,
                capture_output=True,
            )

            self.assertNotEqual(collision_registry.returncode, 0)
            self.assertNotEqual(collision_workspace.returncode, 0)
            self.assertIn("refusing", collision_registry.stderr.lower())
            self.assertIn("refusing", collision_workspace.stderr.lower())

    def test_cli_dry_run_writes_registry_and_returns_zero(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            tmp_path = Path(tmp)
            source = tmp_path / "control-ops.jsonl"
            source.write_text(FIXTURE.read_text(encoding="utf-8"), encoding="utf-8")
            registry = tmp_path / "control-registry.jsonl"
            workspace = tmp_path / "control-workspace"

            completed = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "dry-run",
                    "--operations",
                    str(source),
                    "--registry",
                    str(registry),
                    "--workspace",
                    str(workspace),
                ],
                cwd=ROOT,
                text=True,
                capture_output=True,
            )

            self.assertEqual(completed.returncode, 0, msg=completed.stderr)
            self.assertTrue(registry.exists())
            rows = [
                json.loads(line)
                for line in registry.read_text(encoding="utf-8").splitlines()
                if line.strip()
            ]
            self.assertTrue(rows)
            for row in rows:
                self.assertEqual(row["schema_version"], CONTROL_REGISTRY_SCHEMA)
                self.assertFalse(row["direct_db_edit"])


if __name__ == "__main__":
    unittest.main()
