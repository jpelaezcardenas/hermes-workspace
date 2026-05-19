#!/usr/bin/env python3
"""RED tests for M011 bounded Cockpit worker dispatch adapter."""

from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-dispatch.py"
FIXTURE = ROOT / "tests" / "fixtures" / "hermes_cockpit" / "automation-ops" / "dispatch-ops.jsonl"


def load_module():
    spec = importlib.util.spec_from_file_location("hermes_cockpit_dispatch", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


@dataclass
class FakeResult:
    stdout: str = "worker-output: bounded dispatch ok\n"
    stderr: str = ""
    returncode: int = 0


class FakeRunner:
    def __init__(self) -> None:
        self.calls: list[list[str]] = []

    def __call__(self, args: list[str], timeout: int | None = None) -> FakeResult:
        self.calls.append(args)
        self.assert_argument_list(args)
        self.timeout = timeout
        return FakeResult()

    @staticmethod
    def assert_argument_list(args: list[str]) -> None:
        assert isinstance(args, list)
        assert args
        assert all(isinstance(part, str) for part in args)


def local_worker_operation(mode: str = "dry-run") -> dict:
    return {
        "schema_version": "hermes-cockpit.operation.v1",
        "operation_id": "op_m011_dispatch_local_001",
        "operation_type": "dispatch.worker_start",
        "mode": mode,
        "actor": "Migi",
        "source": "cockpit",
        "target": {"system": "worker", "id": "M011/S03/T-local"},
        "payload": {
            "profile": "local_echo",
            "host": "hermes-pi",
            "command": ["python3", "-c", "print('worker-output: bounded dispatch ok')"],
            "max_runtime_seconds": 5,
            "output_limit_chars": 200,
        },
        "approval": {"required": True, "status": "granted"},
    }


class DispatchAdapterTests(unittest.TestCase):
    def test_dry_run_reports_spawnability_without_spawning_worker(self) -> None:
        module = load_module()
        operation = local_worker_operation("dry-run")
        runner = FakeRunner()

        events, evidence = module.run_dispatch_operations(
            [operation],
            mode="dry-run",
            allow_profiles={"local_echo"},
            allow_command_roots={"python3"},
            prior_dry_run_ids=set(),
            runner=runner,
        )

        self.assertEqual(evidence[0]["status"], "dry_run_passed")
        self.assertFalse(evidence[0]["worker_spawned"])
        self.assertEqual(evidence[0]["profile"], "local_echo")
        self.assertEqual(evidence[0]["cleanup_status"], "not_started")
        self.assertIn("dispatch_dry_run_passed", {event["event_type"] for event in events})
        self.assertEqual(runner.calls, [])

    def test_apply_requires_matching_dry_run_evidence(self) -> None:
        module = load_module()
        operation = local_worker_operation("apply")
        runner = FakeRunner()

        events, evidence = module.run_dispatch_operations(
            [operation],
            mode="apply",
            allow_profiles={"local_echo"},
            allow_command_roots={"python3"},
            prior_dry_run_ids=set(),
            runner=runner,
        )

        self.assertEqual(evidence[0]["status"], "rejected")
        self.assertIn("dry-run", " ".join(evidence[0]["rejection_reasons"]).lower())
        self.assertFalse(evidence[0]["worker_spawned"])
        self.assertIn("dispatch_rejected", {event["event_type"] for event in events})
        self.assertEqual(runner.calls, [])

    def test_rejects_non_allowlisted_profile_from_fixture(self) -> None:
        module = load_module()
        operation = module.load_operations(FIXTURE)[2]

        events, evidence = module.run_dispatch_operations(
            [operation],
            mode="apply",
            allow_profiles={"local_echo"},
            allow_command_roots={"python3"},
            prior_dry_run_ids={operation["operation_id"]},
            runner=FakeRunner(),
        )

        self.assertEqual(evidence[0]["status"], "rejected")
        self.assertIn("profile", " ".join(evidence[0]["rejection_reasons"]).lower())
        self.assertIn("dispatch_rejected", {event["event_type"] for event in events})

    def test_rejects_unsafe_command_shape(self) -> None:
        module = load_module()
        operation = local_worker_operation("dry-run")
        operation["payload"]["command"] = ["bash", "-lc", "echo unsafe"]

        events, evidence = module.run_dispatch_operations(
            [operation],
            mode="dry-run",
            allow_profiles={"local_echo"},
            allow_command_roots={"python3"},
            prior_dry_run_ids=set(),
            runner=FakeRunner(),
        )

        self.assertEqual(evidence[0]["status"], "rejected")
        self.assertIn("command", " ".join(evidence[0]["rejection_reasons"]).lower())
        self.assertIn("dispatch_rejected", {event["event_type"] for event in events})

    def test_apply_runs_bounded_worker_and_captures_output(self) -> None:
        module = load_module()
        operation = local_worker_operation("apply")
        runner = FakeRunner()

        events, evidence = module.run_dispatch_operations(
            [operation],
            mode="apply",
            allow_profiles={"local_echo"},
            allow_command_roots={"python3"},
            prior_dry_run_ids={operation["operation_id"]},
            runner=runner,
        )

        self.assertEqual(evidence[0]["status"], "completed")
        self.assertTrue(evidence[0]["worker_spawned"])
        self.assertEqual(evidence[0]["exit_code"], 0)
        self.assertIn("bounded dispatch ok", evidence[0]["stdout_preview"])
        self.assertEqual(evidence[0]["cleanup_status"], "completed")
        self.assertTrue(evidence[0]["non_claims"]["no_task_completion_claim"])
        self.assertIn("dispatch_completed", {event["event_type"] for event in events})
        self.assertEqual(len(runner.calls), 1)
        self.assertNotIsInstance(runner.calls[0], str)

    def test_cli_rejects_path_collisions(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            source = Path(tmp) / "ops.jsonl"
            source.write_text(json.dumps(local_worker_operation("dry-run")) + "\n", encoding="utf-8")
            output = Path(tmp) / "events.ndjson"

            output_collision = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "--operations",
                    str(source),
                    "--events-output",
                    str(source),
                    "--evidence-output",
                    str(Path(tmp) / "evidence.json"),
                    "--dry-run",
                ],
                cwd=ROOT,
                text=True,
                capture_output=True,
            )
            shared_collision = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "--operations",
                    str(source),
                    "--events-output",
                    str(output),
                    "--evidence-output",
                    str(output),
                    "--dry-run",
                ],
                cwd=ROOT,
                text=True,
                capture_output=True,
            )

            self.assertNotEqual(output_collision.returncode, 0)
            self.assertNotEqual(shared_collision.returncode, 0)
            self.assertIn("refusing", output_collision.stderr.lower())
            self.assertIn("refusing", shared_collision.stderr.lower())


if __name__ == "__main__":
    unittest.main()
