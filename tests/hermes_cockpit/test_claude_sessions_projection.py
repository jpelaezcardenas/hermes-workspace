import json
import os
import stat
import subprocess
import sys
import tempfile
import textwrap
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-claude-sessions.py"
FIXTURE = ROOT / "tests" / "fixtures" / "hermes_cockpit" / "claude-sessions" / "registry.json"
PYTHON = sys.executable


class ClaudeSessionsProjectionTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tmp = tempfile.TemporaryDirectory(prefix="m018-claude-sessions-")
        self.addCleanup(self.tmp.cleanup)
        self.tmp_path = Path(self.tmp.name)
        self.fake_claude = self.tmp_path / "claude"
        self.fake_tmux = self.tmp_path / "tmux"
        self.calls_log = self.tmp_path / "calls.jsonl"
        self.tmux_calls_log = self.tmp_path / "tmux-calls.jsonl"
        self.write_fake_claude()
        self.write_fake_tmux()

    def write_fake_claude(self) -> None:
        script = f"""#!/usr/bin/env python3
import json
import sys
from pathlib import Path
calls = Path({str(self.calls_log)!r})
calls.parent.mkdir(parents=True, exist_ok=True)
args = sys.argv[1:]
with calls.open('a', encoding='utf-8') as fh:
    fh.write(json.dumps(args) + '\\n')
if len(args) == 2 and args[0] == 'logs':
    session_id = args[1]
    if session_id == 'bg_fake_001':
        print('Docs scout complete. token=SECRET123 should not leak. api_key=ABCDEF should be redacted.')
    elif session_id == 'bg_fake_002':
        print('Waiting for input: approve docs wording. password=hunter2 should be redacted.')
    elif session_id == 'bg_attention_001':
        print('Stopped but cleanup required. secret=NOPE should be redacted.')
    else:
        print('Unknown session ' + session_id)
    raise SystemExit(0)
print('unexpected args: ' + repr(args), file=sys.stderr)
raise SystemExit(2)
"""
        self.fake_claude.write_text(script, encoding="utf-8")
        self.fake_claude.chmod(self.fake_claude.stat().st_mode | stat.S_IXUSR)

    def write_fake_tmux(self) -> None:
        script = f"""#!/usr/bin/env python3
import json
import sys
from pathlib import Path
calls = Path({str(self.tmux_calls_log)!r})
calls.parent.mkdir(parents=True, exist_ok=True)
args = sys.argv[1:]
with calls.open('a', encoding='utf-8') as fh:
    fh.write(json.dumps(args) + '\\n')
if args[:1] == ['capture-pane']:
    print('Claude tmux pane ready. token=TMUXSECRET api_key=TMUXKEY should redact.')
    raise SystemExit(0)
print('unexpected tmux args: ' + repr(args), file=sys.stderr)
raise SystemExit(2)
"""
        self.fake_tmux.write_text(script, encoding="utf-8")
        self.fake_tmux.chmod(self.fake_tmux.stat().st_mode | stat.S_IXUSR)

    def run_cli(self, *extra: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [PYTHON, str(SCRIPT), *extra],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )

    def test_cli_projects_registry_to_claude_sessions_with_fake_logs(self):
        output = self.tmp_path / "claude-sessions-projection.json"
        result = self.run_cli(
            "--registry",
            str(FIXTURE),
            "--output",
            str(output),
            "--claude-bin",
            str(self.fake_claude),
            "--max-preview-chars",
            "80",
        )

        self.assertEqual(result.returncode, 0, result.stderr)
        projection = json.loads(output.read_text(encoding="utf-8"))
        self.assertEqual(projection["schema_version"], "hermes-cockpit.claude-sessions-projection.v1")
        self.assertTrue(projection["read_only"])
        self.assertEqual(projection["source"]["name"], "claude-sessions")
        self.assertEqual(len(projection["claude_sessions"]), 2)

        first = projection["claude_sessions"][0]
        self.assertEqual(first["id"], "bg_fake_001")
        self.assertEqual(first["kind"], "ClaudeBackground")
        self.assertEqual(first["status"], "running")
        self.assertEqual(first["host"], "gpc")
        self.assertEqual(first["repo_path"], "/home/joe/hermes-workspace")
        self.assertEqual(first["permission_mode"], "read_only")
        self.assertIn("Docs scout complete", first["last_output_preview"])
        self.assertLessEqual(len(first["last_output_preview"]), 80)
        self.assertNotIn("SECRET123", first["last_output_preview"])
        self.assertNotIn("ABCDEF", first["last_output_preview"])
        self.assertIn("[REDACTED]", first["last_output_preview"])

        calls = [json.loads(line) for line in self.calls_log.read_text(encoding="utf-8").splitlines()]
        self.assertEqual(calls, [["logs", "bg_fake_001"], ["logs", "bg_fake_002"]])

    def test_cli_projects_stop_attention_fields(self):
        registry = self.tmp_path / "registry-attention.json"
        registry.write_text(
            json.dumps(
                {
                    "schema_version": "hermes-cockpit.claude-session-registry.v1",
                    "sessions": [
                        {
                            "id": "bg_attention_001",
                            "display_name": "Cleanup Smoke",
                            "kind": "ClaudeBackground",
                            "status": "stop_attention_required",
                            "host": "pi",
                            "repo_path": "/home/joe/hermes-workspace",
                            "worktree_path": None,
                            "permission_mode": "read_only",
                            "command": "claude --bg harmless smoke",
                            "started_at": "2026-05-19T00:00:00Z",
                            "log_path": "target/hermes-cockpit-m024/attention.log",
                            "stop_verification": {
                                "verdict": "needs_attention",
                                "remaining_count": 2,
                                "remaining_processes": [
                                    {
                                        "pid": "4242",
                                        "matched_alias": "bg_attention_001",
                                        "command_preview": "claude --bg bg_attention_001 token=[REDACTED]",
                                    }
                                ],
                            },
                        }
                    ],
                }
            ),
            encoding="utf-8",
        )
        output = self.tmp_path / "attention-projection.json"
        result = self.run_cli(
            "--registry",
            str(registry),
            "--output",
            str(output),
            "--claude-bin",
            str(self.fake_claude),
        )

        self.assertEqual(result.returncode, 0, result.stderr)
        projection = json.loads(output.read_text(encoding="utf-8"))
        session = projection["claude_sessions"][0]
        self.assertEqual(session["status"], "stop_attention_required")
        self.assertEqual(session["stop_verification"]["verdict"], "needs_attention")
        self.assertEqual(session["stop_verification"]["remaining_count"], 2)
        self.assertIn("cleanup_required", session["safety_labels"])
        self.assertIn("verifier_required", session["safety_labels"])
        self.assertIn("Stopped but cleanup required", session["last_output_preview"])
        self.assertNotIn("NOPE", session["last_output_preview"])

    def test_cli_projects_tmux_sessions_from_tmux_capture_without_claude_logs(self):
        registry = self.tmp_path / "registry-tmux.json"
        registry.write_text(
            json.dumps(
                {
                    "schema_version": "hermes-cockpit.claude-session-registry.v1",
                    "sessions": [
                        {
                            "id": "claude-task-1",
                            "display_name": "Tmux Docs Scout",
                            "kind": "ClaudeTmux",
                            "status": "running",
                            "host": "pi",
                            "repo_path": "/home/joe/hermes-workspace",
                            "worktree_path": None,
                            "permission_mode": "read_only",
                            "command": "cd /home/joe/hermes-workspace && claude",
                            "tmux_session_name": "claude-task-1",
                            "started_at": "2026-05-19T00:00:00Z",
                            "attach_command": "tmux attach -t claude-task-1",
                            "send_command_template": "tmux send-keys -t claude-task-1 '<prompt>' Enter",
                            "stop_command": "tmux kill-session -t claude-task-1",
                            "safety_labels": ["interactive", "display_only"],
                        }
                    ],
                }
            ),
            encoding="utf-8",
        )
        output = self.tmp_path / "tmux-projection.json"
        result = self.run_cli(
            "--registry",
            str(registry),
            "--output",
            str(output),
            "--claude-bin",
            str(self.fake_claude),
            "--tmux-bin",
            str(self.fake_tmux),
            "--max-preview-chars",
            "90",
        )

        self.assertEqual(result.returncode, 0, result.stderr)
        projection = json.loads(output.read_text(encoding="utf-8"))
        session = projection["claude_sessions"][0]
        self.assertEqual(session["kind"], "ClaudeTmux")
        self.assertEqual(session["last_output_preview"].count("[REDACTED]"), 2)
        self.assertNotIn("TMUXSECRET", session["last_output_preview"])
        self.assertNotIn("TMUXKEY", session["last_output_preview"])
        self.assertEqual(session["attach_command"], "tmux attach -t claude-task-1")
        self.assertIn("send_command_template", session)
        self.assertIn("stop_command", session)
        tmux_calls = [json.loads(line) for line in self.tmux_calls_log.read_text(encoding="utf-8").splitlines()]
        self.assertEqual(tmux_calls, [["capture-pane", "-t", "claude-task-1", "-p", "-S", "-80"]])
        self.assertFalse(self.calls_log.exists(), "ClaudeTmux projection should not call claude logs")

    def test_cli_projects_stopped_tmux_session_from_cached_preview_without_tmux_capture(self):
        registry = self.tmp_path / "registry-stopped-tmux.json"
        registry.write_text(
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
        output = self.tmp_path / "stopped-tmux-projection.json"
        result = self.run_cli(
            "--registry",
            str(registry),
            "--output",
            str(output),
            "--claude-bin",
            str(self.fake_claude),
            "--tmux-bin",
            str(self.fake_tmux),
            "--max-preview-chars",
            "160",
        )

        self.assertEqual(result.returncode, 0, result.stderr)
        projection = json.loads(output.read_text(encoding="utf-8"))
        session = projection["claude_sessions"][0]
        self.assertEqual(session["kind"], "ClaudeTmux")
        self.assertEqual(session["status"], "stopped")
        self.assertEqual(session["operation_id"], "m026-real-tmux-dogfood-20260519")
        self.assertEqual(session["captured_at"], "2026-05-19T10:51:39Z")
        self.assertEqual(session["last_sent_at"], "2026-05-19T10:50:20Z")
        self.assertEqual(session["stopped_at"], "2026-05-19T10:52:03Z")
        self.assertIn("M026_TMUX_READONLY_SMOKE_READY", session["last_output_preview"])
        self.assertIn("[REDACTED]", session["last_output_preview"])
        self.assertNotIn("joe@example.com", session["last_output_preview"])
        self.assertNotIn("TMUXSECRET", session["last_output_preview"])
        self.assertEqual(session["safety_labels"], ["interactive", "verifier_required", "display_only"])
        self.assertFalse(self.tmux_calls_log.exists(), "stopped cached tmux projection should not capture a dead pane")
        self.assertFalse(self.calls_log.exists(), "ClaudeTmux projection should not call claude logs")

    def test_cli_rejects_output_registry_collision(self):
        result = self.run_cli(
            "--registry",
            str(FIXTURE),
            "--output",
            str(FIXTURE),
            "--claude-bin",
            str(self.fake_claude),
        )

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("output must not overwrite registry", result.stderr)
        self.assertFalse(self.calls_log.exists(), "should fail before calling claude")

    def test_cli_rejects_missing_required_registry_fields(self):
        bad_registry = self.tmp_path / "bad-registry.json"
        bad_registry.write_text(json.dumps({"sessions": [{"id": "bg_missing"}]}), encoding="utf-8")
        output = self.tmp_path / "projection.json"

        result = self.run_cli(
            "--registry",
            str(bad_registry),
            "--output",
            str(output),
            "--claude-bin",
            str(self.fake_claude),
        )

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("missing required field", result.stderr)
        self.assertFalse(output.exists())
        self.assertFalse(self.calls_log.exists(), "should validate registry before calling claude")


if __name__ == "__main__":
    unittest.main()
