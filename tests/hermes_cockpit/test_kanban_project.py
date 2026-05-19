#!/usr/bin/env python3
"""Tests for the read-only Hermes Kanban -> Cockpit projection adapter."""

from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-kanban-project.py"


def load_module():
    spec = importlib.util.spec_from_file_location("hermes_cockpit_kanban_project", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


class KanbanProjectionAdapterTests(unittest.TestCase):
    def test_project_cards_emits_projection_shape_without_mutating_commands(self) -> None:
        module = load_module()
        cards = [
            {
                "id": "t_example",
                "title": "Example live Kanban card",
                "status": "triage",
                "assignee": None,
                "created_at": 1778998127,
                "completed_at": None,
                "result": None,
            }
        ]

        projection = module.project_cards(cards, board="hermes-cockpit-trial", source_command="hermes kanban --board hermes-cockpit-trial list --json")

        self.assertEqual(projection["projection_version"], "hermes-cockpit.kanban-projection.v1")
        self.assertEqual(projection["source"]["mode"], "read-only")
        self.assertEqual(projection["source"]["board"], "hermes-cockpit-trial")
        self.assertIn("list --json", projection["source"]["command"])
        self.assertEqual(projection["cards"][0]["task_id"], "t_example")
        self.assertEqual(projection["cards"][0]["title"], "Example live Kanban card")
        self.assertEqual(projection["cards"][0]["status"], "triage")
        self.assertIn("replay", projection)
        self.assertIn("active_runs", projection)
        self.assertIn("completed_runs", projection)
        self.assertIn("warnings", projection)
        self.assertEqual(projection["approvals"], {"pending": [], "recorded": [], "required": []})

    def test_cli_writes_valid_json_from_fixture_without_shelling_to_kanban(self) -> None:
        cards = [
            {"id": "t_fixture", "title": "Fixture card", "status": "triage", "created_at": 1778998127}
        ]
        with tempfile.TemporaryDirectory() as tmp:
            tmp_path = Path(tmp)
            fixture = tmp_path / "cards.json"
            output = tmp_path / "projection.json"
            fixture.write_text(json.dumps(cards), encoding="utf-8")

            subprocess.run(
                [sys.executable, str(SCRIPT), "--board", "hermes-cockpit-trial", "--input", str(fixture), "--output", str(output)],
                cwd=ROOT,
                check=True,
            )

            projection = json.loads(output.read_text(encoding="utf-8"))
            self.assertEqual(projection["cards"][0]["task_id"], "t_fixture")
            self.assertEqual(projection["source"]["mode"], "read-only")


if __name__ == "__main__":
    unittest.main()
