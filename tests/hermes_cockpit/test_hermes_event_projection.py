#!/usr/bin/env python3
"""Projection regression tests for Hermes-ingested Cockpit events."""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
ADAPTER = ROOT / "scripts" / "hermes-cockpit-hermes-events.py"
PROJECTOR = ROOT / "scripts" / "hermes-cockpit-project.py"
FIXTURE = ROOT / "tests" / "fixtures" / "hermes_cockpit" / "hermes-source-sample.jsonl"


class HermesEventProjectionTests(unittest.TestCase):
    def test_hermes_events_project_to_cards_runs_artifacts_warnings_and_replay(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            tmp_path = Path(tmp)
            events_path = tmp_path / "hermes-events.ndjson"
            evidence_path = tmp_path / "adapter-evidence.json"
            projection_path = tmp_path / "hermes-projection.json"

            subprocess.run(
                [
                    sys.executable,
                    str(ADAPTER),
                    "--input",
                    str(FIXTURE),
                    "--output",
                    str(events_path),
                    "--evidence",
                    str(evidence_path),
                    "--source-label",
                    "hermes-fixture",
                    "--limit",
                    "100",
                ],
                cwd=ROOT,
                check=True,
            )
            subprocess.run(
                [sys.executable, str(PROJECTOR), str(events_path), "--output", str(projection_path)],
                cwd=ROOT,
                check=True,
            )

            projection = json.loads(projection_path.read_text(encoding="utf-8"))
            evidence = json.loads(evidence_path.read_text(encoding="utf-8"))

            self.assertEqual(projection["projection_version"], "hermes-cockpit.projection.v1")
            self.assertEqual(projection["schema_version"], "hermes-cockpit.event.v1")
            self.assertFalse(evidence["source_mutated"])
            self.assertGreaterEqual(projection["event_count"], 5)
            self.assertTrue(projection["cards"])
            self.assertTrue(projection["completed_runs"])
            self.assertTrue(projection["artifacts"])
            self.assertTrue(projection["warnings"])
            self.assertGreaterEqual(len(projection["replay"]), 5)

            card = projection["cards"][0]
            self.assertEqual(card["task_id"], "M010/S02")
            self.assertEqual(card["title"], "M010 read-only Hermes ingestion fixture")
            self.assertIn("run_hermes_hermes-fixture", card["runs"])
            self.assertGreaterEqual(card["warning_count"], 1)
            self.assertIn("unverified", card["trust_counts"])

            replay_text = "\n".join(str(row.get("summary", "")) for row in projection["replay"])
            self.assertIn("bounded Hermes source", replay_text)
            self.assertIn("generated artifact", replay_text)


if __name__ == "__main__":
    unittest.main()
