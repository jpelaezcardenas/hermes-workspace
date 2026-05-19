import json
import os
import subprocess
import sys
import tempfile
import textwrap
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[2] / "scripts" / "hermes-cockpit-claude-tmux.py"
TARGET = Path(__file__).resolve().parents[2] / "target" / "hermes-cockpit-m025"


class ClaudeTmuxLifecycleTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = Path(self.tmp.name)
        self.registry = self.root / "registry.json"
        self.request = self.root / "request.json"
        self.evidence = self.root / "evidence.json"
        self.grant = self.root / "grant.json"
        self.result = self.root / "result.json"
        self.capture = self.root / "capture.json"
        self.calls_log = TARGET / "fake-tmux-calls.jsonl"
        self.calls_log.parent.mkdir(parents=True, exist_ok=True)
        self.calls_log.write_text("", encoding="utf-8")
        self.fake_tmux = self.root / "tmux"
        self.fake_tmux.write_text(
            textwrap.dedent(
                f"""
                #!/usr/bin/env python3
                import json
                import sys
                from pathlib import Path
                calls = Path({str(self.calls_log)!r})
                args = sys.argv[1:]
                with calls.open('a', encoding='utf-8') as fh:
                    fh.write(json.dumps(args) + '\\n')
                if args[:1] == ['capture-pane']:
                    print('Claude tmux output: ready token=SECRET123 api_key=SHOULD_REDACT')
                elif args[:1] == ['has-session']:
                    sys.exit(0)
                sys.exit(0)
                """
            ).strip()
            + "\n",
            encoding="utf-8",
        )
        self.fake_tmux.chmod(0o755)

    def tearDown(self):
        self.tmp.cleanup()

    def run_cli(self, *args, check=False):
        completed = subprocess.run(
            [sys.executable, str(SCRIPT), *map(str, args)],
            text=True,
            capture_output=True,
            check=False,
        )
        if check and completed.returncode != 0:
            self.fail(f"command failed: {completed.args}\nstdout={completed.stdout}\nstderr={completed.stderr}")
        return completed

    def write_request(self, **overrides):
        data = {
            "operation_id": "tmux-op-1",
            "session_name": "claude-task-1",
            "display_name": "Claude tmux docs scout",
            "task": "Summarize README and wait for follow-up.",
            "host": "pi",
            "repo_path": str(self.root / "repo"),
            "worktree_path": None,
            "permission_mode": "read_only",
        }
        data.update(overrides)
        self.request.write_text(json.dumps(data, indent=2), encoding="utf-8")
        return data

    def prepare_grant_start(self):
        self.write_request()
        self.run_cli(
            "prepare-start",
            "--request",
            self.request,
            "--registry",
            self.registry,
            "--evidence",
            self.evidence,
            check=True,
        )
        self.run_cli("grant-start", "--evidence", self.evidence, "--grant", self.grant, check=True)

    def read_calls(self):
        if not self.calls_log.exists():
            return []
        return [json.loads(line) for line in self.calls_log.read_text(encoding="utf-8").splitlines() if line]

    def test_rejects_print_mode_and_write_capable_without_worktree(self):
        self.write_request(task="Use claude -p for this", operation_id="bad-print")
        rejected = self.run_cli(
            "prepare-start",
            "--request",
            self.request,
            "--registry",
            self.registry,
            "--evidence",
            self.evidence,
        )
        self.assertNotEqual(rejected.returncode, 0)
        self.assertIn("claude -p", rejected.stderr)

        self.write_request(permission_mode="accept_edits", operation_id="bad-write")
        rejected = self.run_cli(
            "prepare-start",
            "--request",
            self.request,
            "--registry",
            self.registry,
            "--evidence",
            self.evidence,
        )
        self.assertNotEqual(rejected.returncode, 0)
        self.assertIn("worktree_path", rejected.stderr)

    def test_prepare_grant_and_apply_start_create_tmux_session_registry(self):
        self.prepare_grant_start()
        self.run_cli(
            "apply-start",
            "--evidence",
            self.evidence,
            "--grant",
            self.grant,
            "--registry",
            self.registry,
            "--result",
            self.result,
            "--tmux-bin",
            self.fake_tmux,
            check=True,
        )
        result = json.loads(self.result.read_text(encoding="utf-8"))
        registry = json.loads(self.registry.read_text(encoding="utf-8"))
        session = registry["sessions"][0]
        self.assertEqual(result["status"], "applied")
        self.assertEqual(session["kind"], "ClaudeTmux")
        self.assertEqual(session["status"], "running")
        self.assertEqual(session["id"], "claude-task-1")
        self.assertEqual(session["tmux_session_name"], "claude-task-1")
        self.assertIn("tmux attach -t claude-task-1", session["attach_command"])
        self.assertIn("tmux kill-session -t claude-task-1", session["stop_command"])
        calls = self.read_calls()
        self.assertIn(["new-session", "-d", "-s", "claude-task-1", "cd " + str(self.root / "repo") + " && claude"], calls)
        self.assertIn(["send-keys", "-t", "claude-task-1", "Summarize README and wait for follow-up.", "Enter"], calls)

    def test_capture_send_and_stop_use_tmux_without_real_claude(self):
        self.prepare_grant_start()
        self.run_cli(
            "apply-start",
            "--evidence",
            self.evidence,
            "--grant",
            self.grant,
            "--registry",
            self.registry,
            "--result",
            self.result,
            "--tmux-bin",
            self.fake_tmux,
            check=True,
        )
        self.run_cli(
            "capture",
            "--session-id",
            "claude-task-1",
            "--registry",
            self.registry,
            "--output",
            self.capture,
            "--tmux-bin",
            self.fake_tmux,
            check=True,
        )
        capture = json.loads(self.capture.read_text(encoding="utf-8"))
        self.assertEqual(capture["status"], "captured")
        self.assertIn("token=[REDACTED]", capture["preview"])
        self.assertIn("api_key=[REDACTED]", capture["preview"])

        self.run_cli(
            "send",
            "--session-id",
            "claude-task-1",
            "--registry",
            self.registry,
            "--text",
            "Follow up safely",
            "--tmux-bin",
            self.fake_tmux,
            check=True,
        )
        self.run_cli(
            "stop",
            "--session-id",
            "claude-task-1",
            "--registry",
            self.registry,
            "--result",
            self.result,
            "--tmux-bin",
            self.fake_tmux,
            check=True,
        )
        registry = json.loads(self.registry.read_text(encoding="utf-8"))
        self.assertEqual(registry["sessions"][0]["status"], "stopped")
        calls = self.read_calls()
        self.assertIn(["capture-pane", "-t", "claude-task-1", "-p", "-S", "-80"], calls)
        self.assertIn(["send-keys", "-t", "claude-task-1", "Follow up safely", "Enter"], calls)
        self.assertIn(["kill-session", "-t", "claude-task-1"], calls)


if __name__ == "__main__":
    unittest.main()
