import json
import stat
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-refresh-claude-sessions.py"
PROJECTION_SCRIPT = ROOT / "scripts" / "hermes-cockpit-claude-sessions.py"
PYTHON = sys.executable


class ClaudeSessionsRefreshTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tmp = tempfile.TemporaryDirectory(prefix="m026-claude-sessions-refresh-")
        self.addCleanup(self.tmp.cleanup)
        self.tmp_path = Path(self.tmp.name)
        self.registry = self.tmp_path / "registry.json"
        self.output = self.tmp_path / "claude-sessions-projection.json"
        self.summary = self.tmp_path / "refresh-summary.json"
        self.fake_claude = self.tmp_path / "claude"
        self.fake_tmux = self.tmp_path / "tmux"
        self.claude_calls = self.tmp_path / "claude-calls.jsonl"
        self.tmux_calls = self.tmp_path / "tmux-calls.jsonl"
        self.write_stopped_tmux_registry()
        self.write_fail_if_called(self.fake_claude, self.claude_calls, "claude")
        self.write_fail_if_called(self.fake_tmux, self.tmux_calls, "tmux")

    def write_stopped_tmux_registry(self) -> None:
        self.registry.write_text(
            json.dumps(
                {
                    "schema_version": "hermes-cockpit.claude-session-registry.v1",
                    "sessions": [
                        {
                            "id": "claude-m026-tmux-dogfood",
                            "display_name": "M026 real Claude tmux dogfood",
                            "kind": "ClaudeTmux",
                            "status": "stopped",
                            "host": "pi-hermes",
                            "repo_path": "/home/joe/hermes-workspace",
                            "worktree_path": None,
                            "permission_mode": "read_only",
                            "command": "cd /home/joe/hermes-workspace && claude",
                            "tmux_session_name": "claude-m026-tmux-dogfood",
                            "started_at": "2026-05-19T10:49:25Z",
                            "captured_at": "2026-05-19T10:51:39Z",
                            "last_sent_at": "2026-05-19T10:50:20Z",
                            "stopped_at": "2026-05-19T10:52:03Z",
                            "operation_id": "m026-real-tmux-dogfood-20260519",
                            "last_output_preview": "joe@example.com M026_TMUX_READONLY_SMOKE_READY token=TMUXSECRET",
                            "attach_command": "tmux attach -t claude-m026-tmux-dogfood",
                            "send_command_template": "tmux send-keys -t claude-m026-tmux-dogfood '<prompt>' Enter",
                            "stop_command": "tmux kill-session -t claude-m026-tmux-dogfood",
                            "safety_labels": ["interactive", "verifier_required", "display_only"],
                        }
                    ],
                }
            ),
            encoding="utf-8",
        )

    def write_fail_if_called(self, path: Path, calls_log: Path, label: str) -> None:
        path.write_text(
            f"""#!/usr/bin/env python3
import json
import sys
from pathlib import Path
calls = Path({str(calls_log)!r})
calls.parent.mkdir(parents=True, exist_ok=True)
with calls.open('a', encoding='utf-8') as fh:
    fh.write(json.dumps(sys.argv[1:]) + '\\n')
print('{label} should not be called for stopped tmux cached refresh', file=sys.stderr)
raise SystemExit(2)
""",
            encoding="utf-8",
        )
        path.chmod(path.stat().st_mode | stat.S_IXUSR)

    def run_refresh(self, *extra: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [
                PYTHON,
                str(SCRIPT),
                "--registry",
                str(self.registry),
                "--output",
                str(self.output),
                "--summary",
                str(self.summary),
                "--projection-script",
                str(PROJECTION_SCRIPT),
                "--claude-bin",
                str(self.fake_claude),
                "--tmux-bin",
                str(self.fake_tmux),
                "--max-preview-chars",
                "180",
                *extra,
            ],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )

    def test_refresh_replaces_stale_projection_with_redacted_read_only_source_6(self) -> None:
        self.output.write_text(
            json.dumps({"schema_version": "stale", "claude_sessions": [{"last_output_preview": "STALE"}]}),
            encoding="utf-8",
        )

        result = self.run_refresh()

        self.assertEqual(result.returncode, 0, result.stderr)
        projection = json.loads(self.output.read_text(encoding="utf-8"))
        session = projection["claude_sessions"][0]
        self.assertEqual(projection["source"]["name"], "claude-sessions")
        self.assertTrue(projection["read_only"])
        self.assertEqual(session["kind"], "ClaudeTmux")
        self.assertEqual(session["status"], "stopped")
        self.assertEqual(session["operation_id"], "m026-real-tmux-dogfood-20260519")
        self.assertIn("M026_TMUX_READONLY_SMOKE_READY", session["last_output_preview"])
        self.assertIn("[REDACTED]", session["last_output_preview"])
        self.assertNotIn("joe@example.com", session["last_output_preview"])
        self.assertNotIn("TMUXSECRET", session["last_output_preview"])
        self.assertNotIn("STALE", json.dumps(projection))

        summary = json.loads(self.summary.read_text(encoding="utf-8"))
        self.assertEqual(summary["schema_version"], "hermes-cockpit.claude-sessions-refresh.v1")
        self.assertEqual(summary["status"], "pass")
        self.assertEqual(summary["refresh_count"], 1)
        self.assertEqual(summary["source"], {"key": "6", "name": "claude-sessions"})
        self.assertTrue(summary["read_only"])
        self.assertEqual(summary["session_count"], 1)
        self.assertEqual(summary["projection_path"], str(self.output.resolve()))
        self.assertTrue(summary["non_claims"]["no_tui_lifecycle_control"])
        self.assertTrue(summary["non_claims"]["no_session_mutation"])
        self.assertFalse(self.claude_calls.exists(), "stopped ClaudeTmux refresh should not call claude logs")
        self.assertFalse(self.tmux_calls.exists(), "stopped ClaudeTmux refresh should not capture dead tmux panes")

    def test_watch_mode_refreshes_on_interval_for_bounded_iterations(self) -> None:
        result = self.run_refresh("--watch", "--interval-seconds", "0", "--iterations", "2")

        self.assertEqual(result.returncode, 0, result.stderr)
        summary = json.loads(self.summary.read_text(encoding="utf-8"))
        self.assertEqual(summary["status"], "pass")
        self.assertEqual(summary["refresh_count"], 2)
        self.assertIn("refresh=1 status=pass", result.stdout)
        self.assertIn("refresh=2 status=pass", result.stdout)
        self.assertFalse(self.claude_calls.exists())
        self.assertFalse(self.tmux_calls.exists())

    def test_rejects_output_registry_collision_before_refreshing(self) -> None:
        result = subprocess.run(
            [
                PYTHON,
                str(SCRIPT),
                "--registry",
                str(self.registry),
                "--output",
                str(self.registry),
                "--summary",
                str(self.summary),
                "--projection-script",
                str(PROJECTION_SCRIPT),
            ],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("output must not overwrite registry", result.stderr)
        self.assertFalse(self.summary.exists())


if __name__ == "__main__":
    unittest.main()
