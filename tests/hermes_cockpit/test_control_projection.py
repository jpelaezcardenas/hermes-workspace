#!/usr/bin/env python3
"""RED tests for projecting M012 control registry evidence into Cockpit UI state."""

from __future__ import annotations

import hashlib
import importlib.util
import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-control-project.py"
FIXTURE_ROOT = ROOT / "tests" / "fixtures" / "hermes_cockpit" / "control-plane"
CONTROL_REGISTRY = FIXTURE_ROOT / "control-registry.jsonl"
WINDOWS_REGISTRY = FIXTURE_ROOT / "windows-worker-registry.jsonl"
WINDOWS_SMOKE = FIXTURE_ROOT / "windows-worker-smoke-summary.json"


def load_module():
    spec = importlib.util.spec_from_file_location("hermes_cockpit_control_project", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


class ControlPlaneProjectionTests(unittest.TestCase):
    def setUp(self) -> None:
        self.module = load_module()
        self.tmp_dir = tempfile.mkdtemp(prefix="control-plane-projection-")
        self.addCleanup(shutil.rmtree, self.tmp_dir, ignore_errors=True)
        self.tmp = Path(self.tmp_dir)

    def test_project_registries_exposes_control_status_safety_and_approvals(self) -> None:
        before_hashes = {path: sha256(path) for path in (CONTROL_REGISTRY, WINDOWS_REGISTRY, WINDOWS_SMOKE)}

        projection = self.module.project_control_plane(
            registry_paths=[CONTROL_REGISTRY, WINDOWS_REGISTRY],
            smoke_summary_paths=[WINDOWS_SMOKE],
        )

        after_hashes = {path: sha256(path) for path in before_hashes}
        self.assertEqual(before_hashes, after_hashes, "projection must be read-only over source artifacts")
        self.assertEqual(projection["projection_version"], "hermes-cockpit.control-projection.v1")
        self.assertEqual(projection["source"]["kind"], "control-plane")
        self.assertTrue(projection["source"]["read_only"])
        self.assertFalse(projection["source_mutated"])

        control = projection["control_plane"]
        summary = control["summary"]
        self.assertEqual(summary["entry_count"], 6)
        self.assertEqual(summary["dry_run_passed_count"], 4)
        self.assertEqual(summary["applied_count"], 1)
        self.assertEqual(summary["rejected_count"], 1)
        self.assertEqual(summary["direct_db_edit_count"], 0)
        self.assertEqual(summary["source_mutated_count"], 0)

        operation_ids = {op["operation_id"] for op in control["operations"]}
        self.assertIn("op_m012_control_wb_001", operation_ids)
        self.assertIn("m012_s03_windows_worker_smoke", operation_ids)
        windows = next(op for op in control["operations"] if op["operation_id"] == "m012_s03_windows_worker_smoke" and op["mode"] == "apply")
        self.assertEqual(windows["status"], "applied")
        self.assertEqual(windows["host_labels"]["windows_gpc"], "bounded_worker")
        self.assertIn("windows-worker-workspace", windows["evidence_path"])
        self.assertTrue(windows["non_claims"]["no_task_completion_claim"])

        approval_ids = {item["operation_id"] for item in projection["approvals"]["required"]}
        self.assertIn("op_m012_control_wb_001", approval_ids)
        self.assertTrue(any("dry-run" in item["reason"] for item in projection["approvals"]["required"]))
        self.assertIn("direct_db_edit", control["unsafe_actions_disabled"])
        self.assertIn("transcript_prose_mutation", control["unsafe_actions_disabled"])
        self.assertIn("unbounded_worker_loop", control["unsafe_actions_disabled"])
        self.assertIn("production_readiness_claim", control["unsafe_actions_disabled"])

        warnings = projection["warnings"]
        self.assertTrue(any("unsupported.lane" in warning["message"] for warning in warnings))
        artifacts = projection["artifacts"]
        self.assertTrue(any(artifact["name"].endswith("dispatch-evidence.json") for artifact in artifacts))

    def test_cli_writes_projection_json_and_safety_summary(self) -> None:
        output = self.tmp / "control-plane-projection.json"
        cmd = [
            sys.executable,
            str(SCRIPT),
            "--registry",
            str(CONTROL_REGISTRY),
            "--registry",
            str(WINDOWS_REGISTRY),
            "--smoke-summary",
            str(WINDOWS_SMOKE),
            "--output",
            str(output),
        ]

        completed = subprocess.run(cmd, text=True, capture_output=True, check=False)

        self.assertEqual(completed.returncode, 0, completed.stderr)
        self.assertTrue(output.exists())
        written = json.loads(output.read_text(encoding="utf-8"))
        self.assertEqual(written["control_plane"]["summary"]["entry_count"], 6)
        self.assertIn("unsafe_actions_disabled", completed.stdout)
        self.assertTrue(written["control_plane"]["non_claims"]["no_direct_db_edit"])


if __name__ == "__main__":
    unittest.main()
