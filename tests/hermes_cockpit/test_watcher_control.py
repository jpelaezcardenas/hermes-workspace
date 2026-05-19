#!/usr/bin/env python3
"""RED tests for M012/S05 durable no-agent watcher controls."""

from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-watcher-control.py"


def load_module():
    spec = importlib.util.spec_from_file_location("hermes_cockpit_watcher_control", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


def append_row(path: Path, row_id: str, summary: str = "watcher payload") -> None:
    row = {
        "schema_version": "hermes-cockpit.operation.v1",
        "operation_id": row_id,
        "operation_type": "watcher.synthetic_change",
        "target": {"system": "watcher", "id": "M012/S05/T-watch"},
        "payload": {"summary": summary, "secret_body": "RAW_SOURCE_BODY_MUST_NOT_APPEAR"},
    }
    with path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(row, separators=(",", ":")) + "\n")


class WatcherControlTests(unittest.TestCase):
    def setUp(self) -> None:
        self.module = load_module()
        self.tmp = tempfile.TemporaryDirectory(prefix="watcher-control-")
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.source = self.root / "source.jsonl"
        self.config = self.root / "watcher-control-config.json"
        self.state = self.root / "watcher-state.json"
        self.events = self.root / "watcher-events.jsonl"
        self.evidence = self.root / "watcher-evidence.json"
        self.notifications = self.root / "watcher-notifications.jsonl"

    def install(self) -> dict:
        return self.module.install_watcher(
            config_path=self.config,
            source_path=self.source,
            state_path=self.state,
            events_output=self.events,
            evidence_output=self.evidence,
            notifications_output=self.notifications,
            watcher_id="m012-s05-watch",
            output_limit_chars=48,
        )

    def test_install_run_pause_remove_no_agent_watcher_controls(self) -> None:
        append_row(self.source, "op_existing_1", "existing baseline row")

        install_evidence = self.install()

        self.assertTrue(self.config.exists())
        config = json.loads(self.config.read_text(encoding="utf-8"))
        self.assertEqual(config["schema_version"], "hermes-cockpit.watcher-control.v1")
        self.assertTrue(config["enabled"])
        self.assertTrue(config["no_agent"])
        self.assertEqual(install_evidence["status"], "installed")
        self.assertTrue(install_evidence["non_claims"]["no_public_agent_loop"])

        baseline = self.module.run_once(self.config)
        self.assertEqual(baseline["watcher_evidence"]["status"], "baseline")
        self.assertEqual(baseline["notification_count"], 0)
        self.assertFalse(self.notifications.exists() and self.notifications.read_text(encoding="utf-8").strip())

        no_change = self.module.run_once(self.config)
        self.assertEqual(no_change["watcher_evidence"]["status"], "no_change")
        self.assertEqual(no_change["notification_count"], 0)
        self.assertEqual(self.notifications.read_text(encoding="utf-8") if self.notifications.exists() else "", "")

        append_row(self.source, "op_new_1", "one bounded change notification with RAW_SOURCE_BODY_MUST_NOT_APPEAR")
        changed = self.module.run_once(self.config)
        self.assertEqual(changed["watcher_evidence"]["status"], "changed")
        self.assertEqual(changed["notification_count"], 1)
        notification_lines = [line for line in self.notifications.read_text(encoding="utf-8").splitlines() if line.strip()]
        self.assertEqual(len(notification_lines), 1)
        notification = json.loads(notification_lines[0])
        self.assertEqual(notification["schema_version"], "hermes-cockpit.watcher-notification.v1")
        self.assertEqual(notification["watcher_id"], "m012-s05-watch")
        self.assertLessEqual(len(notification["summary"]), 49)
        serialized = json.dumps(notification, sort_keys=True)
        self.assertNotIn("RAW_SOURCE_BODY_MUST_NOT_APPEAR", serialized)
        self.assertTrue(notification["non_claims"]["no_agent_llm_run"])

        pause_evidence = self.module.pause_watcher(self.config)
        self.assertEqual(pause_evidence["status"], "paused")
        append_row(self.source, "op_new_2", "should not notify while paused")
        paused_run = self.module.run_once(self.config)
        self.assertEqual(paused_run["status"], "paused")
        self.assertEqual(paused_run["notification_count"], 0)
        self.assertEqual(len([line for line in self.notifications.read_text(encoding="utf-8").splitlines() if line.strip()]), 1)

        remove_evidence = self.module.remove_watcher(self.config)
        self.assertEqual(remove_evidence["status"], "removed")
        self.assertFalse(self.config.exists())
        self.assertFalse(self.state.exists())
        self.assertTrue(remove_evidence["config_removed"])
        self.assertTrue(remove_evidence["state_removed"])

    def test_cli_run_once_is_silent_on_no_change_and_prints_one_change(self) -> None:
        append_row(self.source, "op_existing_1", "existing baseline row")
        self.install()
        subprocess.run([sys.executable, str(SCRIPT), "run-once", "--config", str(self.config)], check=True, text=True, capture_output=True)

        no_change = subprocess.run(
            [sys.executable, str(SCRIPT), "run-once", "--config", str(self.config)],
            check=False,
            text=True,
            capture_output=True,
        )
        self.assertEqual(no_change.returncode, 0, no_change.stderr)
        self.assertEqual(no_change.stdout, "")

        append_row(self.source, "op_new_1", "cli bounded change")
        changed = subprocess.run(
            [sys.executable, str(SCRIPT), "run-once", "--config", str(self.config)],
            check=False,
            text=True,
            capture_output=True,
        )
        self.assertEqual(changed.returncode, 0, changed.stderr)
        self.assertEqual(changed.stdout.count("m012-s05-watch"), 1)
        self.assertNotIn("RAW_SOURCE_BODY_MUST_NOT_APPEAR", changed.stdout)


if __name__ == "__main__":
    unittest.main()
