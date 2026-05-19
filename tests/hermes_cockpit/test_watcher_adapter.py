#!/usr/bin/env python3
"""RED tests for M011 Cockpit watcher adapter."""

from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-watch.py"


def load_module():
    spec = importlib.util.spec_from_file_location("hermes_cockpit_watch", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


def append_row(path: Path, row_id: str, payload: str = "payload") -> None:
    row = {
        "schema_version": "hermes-cockpit.operation.v1",
        "operation_id": row_id,
        "operation_type": "watcher.synthetic_change",
        "target": {"system": "watcher", "id": "M011/S04/T-watch"},
        "payload": {"summary": payload},
    }
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(row, separators=(",", ":")) + "\n")


class WatcherAdapterTests(unittest.TestCase):
    def test_first_run_baselines_without_replaying_existing_rows(self) -> None:
        module = load_module()
        with tempfile.TemporaryDirectory() as tmp:
            source = Path(tmp) / "source.jsonl"
            state = Path(tmp) / "state.json"
            append_row(source, "op_existing_1")
            append_row(source, "op_existing_2")

            events, evidence = module.watch_jsonl_source(
                source_path=source,
                state_path=state,
                watcher_id="m011-s04-test",
                output_limit_chars=200,
                max_watermark_ids=10,
            )

            self.assertEqual(events, [])
            self.assertEqual(evidence["status"], "baseline")
            self.assertEqual(evidence["emitted_count"], 0)
            self.assertFalse(evidence["changed"])
            saved = json.loads(state.read_text())
            self.assertEqual(saved["line_count"], 2)

    def test_no_change_is_quiet_and_emits_no_events(self) -> None:
        module = load_module()
        with tempfile.TemporaryDirectory() as tmp:
            source = Path(tmp) / "source.jsonl"
            state = Path(tmp) / "state.json"
            append_row(source, "op_existing_1")
            module.watch_jsonl_source(source, state, "m011-s04-test", 200, 10)

            events, evidence = module.watch_jsonl_source(source, state, "m011-s04-test", 200, 10)

            self.assertEqual(events, [])
            self.assertEqual(evidence["status"], "no_change")
            self.assertEqual(evidence["emitted_count"], 0)
            self.assertFalse(evidence["changed"])

    def test_one_new_item_emits_one_bounded_event(self) -> None:
        module = load_module()
        with tempfile.TemporaryDirectory() as tmp:
            source = Path(tmp) / "source.jsonl"
            state = Path(tmp) / "state.json"
            append_row(source, "op_existing_1")
            module.watch_jsonl_source(source, state, "m011-s04-test", 200, 10)
            append_row(source, "op_new_1", "new bounded change")

            events, evidence = module.watch_jsonl_source(source, state, "m011-s04-test", 20, 10)

            self.assertEqual(len(events), 1)
            self.assertEqual(events[0]["event_type"], "watcher_change_observed")
            self.assertEqual(events[0]["run_id"], "m011-s04-test")
            self.assertEqual(evidence["status"], "changed")
            self.assertEqual(evidence["emitted_count"], 1)
            self.assertTrue(evidence["changed"])
            self.assertLessEqual(len(events[0]["replay"]["summary"]), 21)

    def test_watermark_ids_are_bounded_while_line_count_advances(self) -> None:
        module = load_module()
        with tempfile.TemporaryDirectory() as tmp:
            source = Path(tmp) / "source.jsonl"
            state = Path(tmp) / "state.json"
            for i in range(6):
                append_row(source, f"op_{i}")

            module.watch_jsonl_source(source, state, "m011-s04-test", 200, 3)

            saved = json.loads(state.read_text())
            self.assertEqual(saved["line_count"], 6)
            self.assertLessEqual(len(saved["seen_ids"]), 3)

    def test_remove_state_deletes_watermark_and_records_evidence(self) -> None:
        module = load_module()
        with tempfile.TemporaryDirectory() as tmp:
            state = Path(tmp) / "state.json"
            state.write_text('{"line_count": 1, "seen_ids": ["op_1"]}\n')

            evidence = module.remove_state(state, watcher_id="m011-s04-test")

            self.assertFalse(state.exists())
            self.assertTrue(evidence["state_removed"])
            self.assertEqual(evidence["status"], "state_removed")

    def test_cli_rejects_path_collisions(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            source = Path(tmp) / "source.jsonl"
            append_row(source, "op_1")
            output = Path(tmp) / "events.ndjson"

            source_collision = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "--source",
                    str(source),
                    "--state",
                    str(Path(tmp) / "state.json"),
                    "--events-output",
                    str(source),
                    "--evidence-output",
                    str(Path(tmp) / "evidence.json"),
                    "--watcher-id",
                    "m011-s04-test",
                ],
                cwd=ROOT,
                text=True,
                capture_output=True,
            )
            shared_collision = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "--source",
                    str(source),
                    "--state",
                    str(Path(tmp) / "state.json"),
                    "--events-output",
                    str(output),
                    "--evidence-output",
                    str(output),
                    "--watcher-id",
                    "m011-s04-test",
                ],
                cwd=ROOT,
                text=True,
                capture_output=True,
            )

            self.assertNotEqual(source_collision.returncode, 0)
            self.assertNotEqual(shared_collision.returncode, 0)
            self.assertIn("refusing", source_collision.stderr.lower())
            self.assertIn("refusing", shared_collision.stderr.lower())


if __name__ == "__main__":
    unittest.main()
