#!/usr/bin/env python3
"""RED tests for M011 gated Cockpit write-back adapter."""

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
SCRIPT = ROOT / "scripts" / "hermes-cockpit-writeback.py"
FIXTURE = ROOT / "tests" / "fixtures" / "hermes_cockpit" / "automation-ops" / "writeback-ops.jsonl"


def load_module():
    spec = importlib.util.spec_from_file_location("hermes_cockpit_writeback", SCRIPT)
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
    def __init__(self) -> None:
        self.calls: list[list[str]] = []
        self.show_count = 0

    def __call__(self, args: list[str]) -> FakeResult:
        self.calls.append(args)
        self.assert_argument_list(args)
        if "show" in args:
            self.show_count += 1
            comments = 0 if self.show_count == 1 else 1
            return FakeResult(stdout=json.dumps({"id": args[-1], "comments": comments, "status": "todo"}))
        if "comment" in args:
            return FakeResult(stdout="comment appended")
        return FakeResult(stdout="ok")

    @staticmethod
    def assert_argument_list(args: list[str]) -> None:
        assert isinstance(args, list)
        assert args
        assert all(isinstance(part, str) for part in args)


class WritebackAdapterTests(unittest.TestCase):
    def test_dry_run_comment_preview_does_not_mutate(self) -> None:
        module = load_module()
        operation = module.load_operations(FIXTURE)[0]
        runner = FakeRunner()

        events, evidence = module.run_writeback_operations(
            [operation],
            board="hermes-cockpit-m011-sandbox",
            mode="dry-run",
            allow_target_prefixes=["M011/S02/"],
            runner=runner,
        )

        self.assertEqual(evidence[0]["status"], "dry_run_passed")
        self.assertTrue(evidence[0]["read_only_dry_run"])
        self.assertFalse(evidence[0]["target_mutated"])
        self.assertIn("rollback_note", evidence[0])
        self.assertIn("writeback_dry_run_passed", {event["event_type"] for event in events})
        self.assertFalse(any("comment" in call for call in runner.calls), runner.calls)

    def test_apply_requires_matching_dry_run_evidence(self) -> None:
        module = load_module()
        operation = module.load_operations(FIXTURE)[0] | {"mode": "apply"}
        runner = FakeRunner()

        events, evidence = module.run_writeback_operations(
            [operation],
            board="hermes-cockpit-m011-sandbox",
            mode="apply",
            allow_target_prefixes=["M011/S02/"],
            prior_dry_run_ids=set(),
            runner=runner,
        )

        self.assertEqual(evidence[0]["status"], "rejected")
        self.assertIn("dry-run", " ".join(evidence[0]["rejection_reasons"]).lower())
        self.assertIn("writeback_rejected", {event["event_type"] for event in events})
        self.assertFalse(any("comment" in call for call in runner.calls), runner.calls)

    def test_rejects_non_allowlisted_targets(self) -> None:
        module = load_module()
        operation = module.load_operations(FIXTURE)[0]
        operation["target"] = {"system": "gsd", "id": "M999/S99/T-bad"}

        events, evidence = module.run_writeback_operations(
            [operation],
            board="hermes-cockpit-m011-sandbox",
            mode="dry-run",
            allow_target_prefixes=["M011/S02/"],
            runner=FakeRunner(),
        )

        self.assertEqual(evidence[0]["status"], "rejected")
        self.assertIn("allowlist", " ".join(evidence[0]["rejection_reasons"]).lower())
        self.assertIn("writeback_rejected", {event["event_type"] for event in events})

    def test_apply_comment_uses_argument_list_and_records_before_after(self) -> None:
        module = load_module()
        operation = module.load_operations(FIXTURE)[0] | {"mode": "apply"}
        runner = FakeRunner()

        events, evidence = module.run_writeback_operations(
            [operation],
            board="hermes-cockpit-m011-sandbox",
            mode="apply",
            allow_target_prefixes=["M011/S02/"],
            prior_dry_run_ids={operation["operation_id"]},
            runner=runner,
        )

        self.assertEqual(evidence[0]["status"], "applied")
        self.assertTrue(evidence[0]["target_mutated"])
        self.assertEqual(evidence[0]["before"]["comments"], 0)
        self.assertEqual(evidence[0]["after"]["comments"], 1)
        self.assertEqual(evidence[0]["comment_delta"], 1)
        self.assertIn("writeback_applied", {event["event_type"] for event in events})
        comment_calls = [call for call in runner.calls if "comment" in call]
        self.assertEqual(len(comment_calls), 1)
        self.assertNotIsInstance(comment_calls[0], str)

    def test_parse_show_output_counts_top_level_comments_from_real_kanban_shape(self) -> None:
        module = load_module()
        stdout = json.dumps(
            {
                "task": {"id": "t_smoke", "status": "ready", "title": "Smoke"},
                "comments": [{"text": "one"}, {"text": "two"}],
                "events": [],
            }
        )

        parsed = module.parse_show_output(stdout, "t_smoke")

        self.assertEqual(parsed["comments"], 2)
        self.assertEqual(parsed["id"], "t_smoke")

    def test_cli_rejects_path_collisions(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            source = Path(tmp) / "ops.jsonl"
            source.write_text(FIXTURE.read_text(encoding="utf-8"), encoding="utf-8")
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
                    "--board",
                    "hermes-cockpit-m011-sandbox",
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
                    "--board",
                    "hermes-cockpit-m011-sandbox",
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
