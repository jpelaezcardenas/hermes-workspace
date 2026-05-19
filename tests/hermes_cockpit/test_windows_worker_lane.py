#!/usr/bin/env python3
"""RED tests for the M012/S03 bounded Windows/GPC worker lane."""

from __future__ import annotations

import importlib.util
import json
import shutil
import tempfile
import unittest
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-windows-worker.py"
FIXTURE = ROOT / "tests" / "fixtures" / "hermes_cockpit" / "control-plane" / "windows-worker-ops.jsonl"

WINDOWS_EVIDENCE_SCHEMA = "hermes-cockpit.windows-worker-evidence.v1"


def load_module():
    spec = importlib.util.spec_from_file_location("hermes_cockpit_windows_worker", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


@dataclass
class FakeResult:
    stdout: str = "WINDOWS_WORKER_OK\r\nGPC\r\n"
    stderr: str = ""
    returncode: int = 0


class FakeRunner:
    def __init__(self, result: FakeResult | None = None) -> None:
        self.result = result or FakeResult()
        self.calls: list[tuple[list[str], int | None]] = []

    def __call__(self, args, timeout=None):
        assert isinstance(args, list)
        assert all(isinstance(part, str) for part in args)
        self.calls.append((list(args), timeout))
        return self.result


class WindowsWorkerFixtureTests(unittest.TestCase):
    def test_fixture_uses_control_plane_dispatch_and_helper_command(self) -> None:
        rows = [json.loads(line) for line in FIXTURE.read_text(encoding="utf-8").splitlines() if line.strip()]
        self.assertEqual(len(rows), 1)
        op = rows[0]
        self.assertEqual(op["schema_version"], "hermes-cockpit.operation.v1")
        self.assertEqual(op["operation_type"], "dispatch.worker_dry_run")
        self.assertEqual(op["operation_id"], "m012_s03_windows_worker_smoke")
        self.assertEqual(op["target"]["system"], "worker")
        self.assertEqual(op["payload"]["profile"], "windows_gpc")
        self.assertEqual(op["payload"]["host"], "GPC")
        command = op["payload"]["command"]
        self.assertEqual(command[:2], ["python3", "scripts/hermes-cockpit-windows-worker.py"])
        self.assertIn("--target", command)
        self.assertIn("joe25@gpc", command)
        self.assertIn("WINDOWS_WORKER_OK", " ".join(command))
        self.assertIn("boundary_labels", op["payload"])
        self.assertEqual(op["payload"]["boundary_labels"]["migi_pi"], "orchestrator")
        self.assertEqual(op["payload"]["boundary_labels"]["windows_gpc"], "bounded_worker")
        self.assertEqual(op["payload"]["boundary_labels"]["tux_wsl"], "context_only")


class WindowsWorkerHelperTests(unittest.TestCase):
    def setUp(self) -> None:
        self.module = load_module()
        self.tmp_dir = tempfile.mkdtemp(prefix="windows-worker-lane-")
        self.addCleanup(shutil.rmtree, self.tmp_dir, ignore_errors=True)
        self.output = Path(self.tmp_dir) / "windows-worker-output.json"

    def test_dry_run_records_spawnability_without_calling_ssh(self) -> None:
        runner = FakeRunner()

        evidence = self.module.run_windows_worker(
            mode="dry-run",
            target="joe25@gpc",
            command='cmd /c "echo WINDOWS_WORKER_OK && hostname"',
            output_path=self.output,
            runner=runner,
        )

        self.assertEqual(evidence["schema_version"], WINDOWS_EVIDENCE_SCHEMA)
        self.assertEqual(evidence["mode"], "dry-run")
        self.assertEqual(evidence["status"], "dry_run_passed")
        self.assertTrue(evidence["spawnable"])
        self.assertFalse(evidence["worker_spawned"])
        self.assertEqual(runner.calls, [])
        self.assertEqual(evidence["host_labels"]["migi_pi"], "orchestrator")
        self.assertEqual(evidence["host_labels"]["windows_gpc"], "bounded_worker")
        self.assertEqual(evidence["host_labels"]["tux_wsl"], "context_only")
        self.assertTrue(evidence["non_claims"]["no_task_completion_claim"])
        self.assertTrue(self.output.exists())

    def test_apply_runs_one_bounded_ssh_command_and_captures_output(self) -> None:
        runner = FakeRunner()

        evidence = self.module.run_windows_worker(
            mode="apply",
            target="joe25@gpc",
            command='cmd /c "echo WINDOWS_WORKER_OK && hostname"',
            output_path=self.output,
            runner=runner,
            timeout_seconds=12,
        )

        self.assertEqual(evidence["schema_version"], WINDOWS_EVIDENCE_SCHEMA)
        self.assertEqual(evidence["mode"], "apply")
        self.assertEqual(evidence["status"], "completed")
        self.assertTrue(evidence["worker_spawned"])
        self.assertEqual(evidence["exit_code"], 0)
        self.assertEqual(evidence["duration_ms"] >= 0, True)
        self.assertIn("WINDOWS_WORKER_OK", evidence["stdout_preview"])
        self.assertEqual(evidence["cleanup_status"], "completed")
        self.assertEqual(len(runner.calls), 1)
        ssh_args, timeout = runner.calls[0]
        self.assertEqual(ssh_args[:5], ["ssh", "-o", "BatchMode=yes", "-o", "ConnectTimeout=10"])
        self.assertIn("joe25@gpc", ssh_args)
        self.assertIn('cmd /c "echo WINDOWS_WORKER_OK && hostname"', ssh_args)
        self.assertEqual(timeout, 12)
        persisted = json.loads(self.output.read_text(encoding="utf-8"))
        self.assertEqual(persisted["status"], "completed")

    def test_rejects_unapproved_target_and_command(self) -> None:
        runner = FakeRunner()

        evidence = self.module.run_windows_worker(
            mode="apply",
            target="root@example.invalid",
            command="powershell -EncodedCommand abc",
            output_path=self.output,
            runner=runner,
        )

        self.assertEqual(evidence["status"], "rejected")
        self.assertFalse(evidence["worker_spawned"])
        self.assertEqual(runner.calls, [])
        joined = " ".join(evidence["rejection_reasons"]).lower()
        self.assertIn("target", joined)
        self.assertIn("command", joined)


if __name__ == "__main__":
    unittest.main()
