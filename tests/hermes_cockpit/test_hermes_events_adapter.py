#!/usr/bin/env python3
"""RED tests for the read-only Hermes session JSONL -> Cockpit event adapter."""

from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
import tempfile
import time
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-hermes-events.py"
FIXTURE = ROOT / "tests" / "fixtures" / "hermes_cockpit" / "hermes-source-sample.jsonl"


def load_module():
    spec = importlib.util.spec_from_file_location("hermes_cockpit_hermes_events", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module


class HermesEventsAdapterTests(unittest.TestCase):
    def test_fixture_conversion_emits_schema_events_and_evidence(self) -> None:
        module = load_module()

        events, evidence = module.project_session_jsonl(
            FIXTURE,
            source_label="hermes-fixture",
            limit=100,
            summary_max_chars=120,
        )

        self.assertGreaterEqual(len(events), 5)
        self.assertEqual(evidence["source_kind"], "hermes-session-jsonl")
        self.assertTrue(evidence["read_only"])
        self.assertFalse(evidence["source_mutated"])
        self.assertEqual(evidence["rows_seen"], 5)
        self.assertEqual(evidence["before"], evidence["after"])
        self.assertGreaterEqual(evidence["events_emitted"], len(events))
        self.assertTrue(all(event["schema_version"] == "hermes-cockpit.event.v1" for event in events))
        self.assertTrue(all(event["source"] == "hermes" for event in events))
        self.assertIn("run_started", {event["event_type"] for event in events})
        self.assertIn("claim_observed", {event["event_type"] for event in events})
        self.assertIn("artifact_created", {event["event_type"] for event in events})
        self.assertIn("trust_flagged", {event["event_type"] for event in events})
        self.assertTrue(all("replay" in event and "summary" in event["replay"] for event in events))

    def test_event_ids_are_stable_for_same_fixture_and_bounds(self) -> None:
        module = load_module()

        first, _ = module.project_session_jsonl(FIXTURE, source_label="hermes-fixture", limit=100)
        second, _ = module.project_session_jsonl(FIXTURE, source_label="hermes-fixture", limit=100)

        self.assertEqual([event["id"] for event in first], [event["id"] for event in second])

    def test_event_ids_are_stable_across_wall_clock_seconds(self) -> None:
        module = load_module()

        first, _ = module.project_session_jsonl(FIXTURE, source_label="hermes-fixture", limit=100)
        time.sleep(1.1)
        second, _ = module.project_session_jsonl(FIXTURE, source_label="hermes-fixture", limit=100)

        self.assertEqual([event["id"] for event in first], [event["id"] for event in second])

    def test_redacts_secret_like_values_and_records_redaction_count(self) -> None:
        module = load_module()
        with tempfile.TemporaryDirectory() as tmp:
            source = Path(tmp) / "secretish.jsonl"
            synthetic_key = "s" + "k-test-1234567890abcdef1234567890abcdef"
            synthetic_password_marker = "pass" + "word="
            synthetic_password_value = "h" + "unter2"
            synthetic_token_marker = "to" + "ken="
            synthetic_token_value = "shortvalue"
            synthetic_auth_header = "Author" + "ization: Bearer shortbearervalue"
            synthetic_json_token = "{" + "\"to" + "ken\"" + ": \"jsonshortvalue\"}"
            synthetic_slack_token = "x" + "oxb-123456789012-ABCDEFGHIJKLMNO"
            synthetic_base64ish = "QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVo0123456789abcd+/"
            source.write_text(
                json.dumps(
                    {
                        "role": "assistant",
                        "timestamp": "2026-05-17T19:00:00Z",
                        "content": f"Synthetic secret should redact: {synthetic_key} {synthetic_password_marker}{synthetic_password_value} {synthetic_token_marker}{synthetic_token_value} {synthetic_auth_header} {synthetic_json_token} {synthetic_slack_token} {synthetic_base64ish}",
                    }
                )
                + "\n",
                encoding="utf-8",
            )

            events, evidence = module.project_session_jsonl(source, source_label="secretish", limit=10)
            emitted = json.dumps(events, sort_keys=True)

            self.assertNotIn(synthetic_key, emitted)
            self.assertNotIn(synthetic_password_value, emitted)
            self.assertNotIn(synthetic_password_marker, emitted.lower())
            self.assertNotIn(synthetic_token_marker, emitted.lower())
            self.assertNotIn(synthetic_token_value, emitted)
            self.assertNotIn("shortbearervalue", emitted)
            self.assertNotIn("jsonshortvalue", emitted)
            self.assertNotIn(synthetic_slack_token, emitted)
            self.assertNotIn(synthetic_base64ish, emitted)
            self.assertIn("[REDACTED", emitted)
            self.assertGreaterEqual(evidence["redaction_count"], 7)

    def test_limit_and_malformed_rows_are_bounded_and_reported(self) -> None:
        module = load_module()
        with tempfile.TemporaryDirectory() as tmp:
            source = Path(tmp) / "mixed.jsonl"
            source.write_text(
                "\n".join(
                    [
                        json.dumps({"role": "user", "timestamp": "2026-05-17T19:01:00Z", "content": "first"}),
                        "{not valid json}",
                        json.dumps({"role": "assistant", "timestamp": "2026-05-17T19:01:01Z", "content": "second"}),
                        json.dumps({"role": "assistant", "timestamp": "2026-05-17T19:01:02Z", "content": "third"}),
                    ]
                )
                + "\n",
                encoding="utf-8",
            )

            events, evidence = module.project_session_jsonl(source, source_label="mixed", limit=2)

            self.assertEqual(evidence["rows_seen"], 2)
            self.assertGreaterEqual(evidence["dropped_count"], 1)
            self.assertTrue(any(event["event_type"] == "trust_flagged" for event in events))
            self.assertLessEqual(max(event["replay"]["sequence"] for event in events), len(events))

    def test_tool_result_rows_do_not_copy_raw_json_bodies(self) -> None:
        module = load_module()
        with tempfile.TemporaryDirectory() as tmp:
            source = Path(tmp) / "tool-result.jsonl"
            source.write_text(
                json.dumps(
                    {
                        "role": "tool",
                        "timestamp": "2026-05-17T19:02:00Z",
                        "name": "skill_view",
                        "content": '{"success": true, "description": "Configure, extend, or contribute to Hermes Agent", "secretish": "not-for-ui"}',
                    }
                )
                + "\n",
                encoding="utf-8",
            )

            events, _ = module.project_session_jsonl(source, source_label="tool-result", limit=10)
            serialized = json.dumps(events, sort_keys=True)

            self.assertIn("Observed Hermes tool result from skill_view.", serialized)
            self.assertNotIn("Configure, extend, or contribute to Hermes Agent", serialized)
            self.assertNotIn("not-for-ui", serialized)

    def test_cli_rejects_source_output_or_evidence_collisions(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            source = Path(tmp) / "source.jsonl"
            source.write_text(
                json.dumps({"role": "user", "timestamp": "2026-05-17T19:03:00Z", "content": "safe"}) + "\n",
                encoding="utf-8",
            )
            separate = Path(tmp) / "out.ndjson"

            output_collision = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "--input",
                    str(source),
                    "--output",
                    str(source),
                    "--evidence",
                    str(Path(tmp) / "evidence.json"),
                    "--source-label",
                    "collision",
                ],
                cwd=ROOT,
                text=True,
                capture_output=True,
            )
            evidence_collision = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "--input",
                    str(source),
                    "--output",
                    str(separate),
                    "--evidence",
                    str(source),
                    "--source-label",
                    "collision",
                ],
                cwd=ROOT,
                text=True,
                capture_output=True,
            )
            shared_output_evidence = subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "--input",
                    str(source),
                    "--output",
                    str(separate),
                    "--evidence",
                    str(separate),
                    "--source-label",
                    "collision",
                ],
                cwd=ROOT,
                text=True,
                capture_output=True,
            )

            self.assertNotEqual(output_collision.returncode, 0)
            self.assertNotEqual(evidence_collision.returncode, 0)
            self.assertNotEqual(shared_output_evidence.returncode, 0)
            self.assertIn("refusing", output_collision.stderr.lower())
            self.assertIn("refusing", evidence_collision.stderr.lower())
            self.assertIn("refusing", shared_output_evidence.stderr.lower())
            self.assertIn("safe", source.read_text(encoding="utf-8"))

    def test_cli_writes_ndjson_and_evidence_without_raw_tool_arguments(self) -> None:
        with tempfile.TemporaryDirectory() as tmp:
            tmp_path = Path(tmp)
            output = tmp_path / "hermes-events.ndjson"
            evidence = tmp_path / "adapter-evidence.json"

            subprocess.run(
                [
                    sys.executable,
                    str(SCRIPT),
                    "--input",
                    str(FIXTURE),
                    "--output",
                    str(output),
                    "--evidence",
                    str(evidence),
                    "--source-label",
                    "hermes-fixture",
                    "--limit",
                    "100",
                ],
                cwd=ROOT,
                check=True,
            )

            events = [json.loads(line) for line in output.read_text(encoding="utf-8").splitlines() if line.strip()]
            evidence_payload = json.loads(evidence.read_text(encoding="utf-8"))
            serialized = json.dumps(events, sort_keys=True)

            self.assertTrue(events)
            self.assertFalse(evidence_payload["source_mutated"])
            self.assertNotIn('"arguments"', serialized)
            self.assertNotIn("tests/fixtures/hermes_cockpit/hermes-source-sample.jsonl", serialized)


if __name__ == "__main__":
    unittest.main()
