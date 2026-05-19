import json
import stat
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-claude-bg-lifecycle.py"
PYTHON = sys.executable


class ClaudeBgLifecycleRunnerTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tmp = tempfile.TemporaryDirectory(prefix="m019-claude-bg-lifecycle-")
        self.addCleanup(self.tmp.cleanup)
        self.tmp_path = Path(self.tmp.name)
        self.registry = self.tmp_path / "registry.json"
        self.calls_log = self.tmp_path / "claude-calls.jsonl"
        self.fake_claude = self.tmp_path / "claude"
        self.write_registry([])
        self.write_fake_claude()

    def write_registry(self, sessions):
        self.registry.write_text(
            json.dumps(
                {
                    "schema_version": "hermes-cockpit.claude-session-registry.v1",
                    "generated_at": "2026-05-18T19:00:00Z",
                    "sessions": sessions,
                },
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )

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
if len(args) == 2 and args[0] == '--bg':
    print('Claude background session bg_m019_001 started')
    raise SystemExit(0)
if len(args) == 2 and args[0] == 'stop':
    print('stopped ' + args[1])
    raise SystemExit(0)
print('unexpected args: ' + repr(args), file=sys.stderr)
raise SystemExit(2)
"""
        self.fake_claude.write_text(script, encoding="utf-8")
        self.fake_claude.chmod(self.fake_claude.stat().st_mode | stat.S_IXUSR)

    def run_cli(self, *extra: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [PYTHON, str(SCRIPT), *extra],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )

    def launch_request(self, **overrides):
        request = {
            "operation_id": "launch-docs-scout",
            "display_name": "Docs scout",
            "task": "Summarize docs without changing files",
            "host": "gpc",
            "repo_path": "/home/joe/hermes-workspace",
            "worktree_path": None,
            "permission_mode": "read_only",
        }
        request.update(overrides)
        path = self.tmp_path / f"request-{request['operation_id']}.json"
        path.write_text(json.dumps(request, indent=2) + "\n", encoding="utf-8")
        return path

    def test_launch_lifecycle_uses_official_bg_and_updates_registry(self):
        request = self.launch_request()
        evidence = self.tmp_path / "launch-dry-run.json"
        grant = self.tmp_path / "launch-grant.json"
        result_path = self.tmp_path / "launch-result.json"

        prepare = self.run_cli(
            "prepare-launch",
            "--request",
            str(request),
            "--registry",
            str(self.registry),
            "--evidence",
            str(evidence),
        )
        self.assertEqual(prepare.returncode, 0, prepare.stderr)
        self.assertTrue(evidence.exists())
        self.assertFalse(self.calls_log.exists(), "prepare-launch must not invoke Claude")

        grant_result = self.run_cli(
            "grant-launch",
            "--evidence",
            str(evidence),
            "--grant",
            str(grant),
            "--decider",
            "joe",
            "--ttl-seconds",
            "300",
        )
        self.assertEqual(grant_result.returncode, 0, grant_result.stderr)
        self.assertFalse(self.calls_log.exists(), "grant-launch must not invoke Claude")

        apply = self.run_cli(
            "apply-launch",
            "--evidence",
            str(evidence),
            "--grant",
            str(grant),
            "--registry",
            str(self.registry),
            "--result",
            str(result_path),
            "--claude-bin",
            str(self.fake_claude),
        )
        self.assertEqual(apply.returncode, 0, apply.stderr)

        calls = [json.loads(line) for line in self.calls_log.read_text(encoding="utf-8").splitlines()]
        self.assertEqual(calls, [["--bg", "Summarize docs without changing files"]])

        registry = json.loads(self.registry.read_text(encoding="utf-8"))
        self.assertEqual(len(registry["sessions"]), 1)
        session = registry["sessions"][0]
        self.assertEqual(session["id"], "bg_m019_001")
        self.assertEqual(session["display_name"], "Docs scout")
        self.assertEqual(session["kind"], "ClaudeBackground")
        self.assertEqual(session["status"], "running")
        self.assertEqual(session["permission_mode"], "read_only")
        self.assertEqual(session["command"], 'claude --bg "Summarize docs without changing files"')
        self.assertNotIn("claude -p", session["command"])

        result = json.loads(result_path.read_text(encoding="utf-8"))
        self.assertEqual(result["status"], "applied")
        self.assertEqual(result["session_id"], "bg_m019_001")
        self.assertEqual(result["session_id_source"], "output")
        consumed = json.loads(grant.read_text(encoding="utf-8"))
        self.assertTrue(consumed["consumed"])

    def test_launch_lifecycle_accepts_uuid_session_output(self):
        self.fake_claude.write_text(
            """#!/usr/bin/env python3
import sys
if sys.argv[1:2] == ['--bg']:
    print('Claude background session 178df827-53f1-487c-a130-dde5a99b07ac started')
    raise SystemExit(0)
print('unexpected args: ' + repr(sys.argv[1:]), file=sys.stderr)
raise SystemExit(2)
""",
            encoding="utf-8",
        )
        self.fake_claude.chmod(self.fake_claude.stat().st_mode | stat.S_IXUSR)
        request = self.launch_request(operation_id="launch-uuid-smoke")
        evidence = self.tmp_path / "uuid-dry-run.json"
        grant = self.tmp_path / "uuid-grant.json"
        result_path = self.tmp_path / "uuid-result.json"

        self.assertEqual(
            self.run_cli(
                "prepare-launch",
                "--request",
                str(request),
                "--registry",
                str(self.registry),
                "--evidence",
                str(evidence),
            ).returncode,
            0,
        )
        self.assertEqual(
            self.run_cli(
                "grant-launch",
                "--evidence",
                str(evidence),
                "--grant",
                str(grant),
                "--decider",
                "joe",
                "--ttl-seconds",
                "300",
            ).returncode,
            0,
        )
        apply = self.run_cli(
            "apply-launch",
            "--evidence",
            str(evidence),
            "--grant",
            str(grant),
            "--registry",
            str(self.registry),
            "--result",
            str(result_path),
            "--claude-bin",
            str(self.fake_claude),
        )
        self.assertEqual(apply.returncode, 0, apply.stderr)
        result = json.loads(result_path.read_text(encoding="utf-8"))
        self.assertEqual(result["session_id"], "178df827")
        self.assertEqual(result["session_id_source"], "output")
        registry = json.loads(self.registry.read_text(encoding="utf-8"))
        self.assertEqual(registry["sessions"][0]["id"], "178df827")

    def test_stop_lifecycle_invokes_official_stop_and_blocks_replay(self):
        self.write_registry(
            [
                {
                    "id": "bg_m019_001",
                    "display_name": "Docs scout",
                    "kind": "ClaudeBackground",
                    "status": "running",
                    "host": "gpc",
                    "repo_path": "/home/joe/hermes-workspace",
                    "worktree_path": None,
                    "permission_mode": "read_only",
                    "command": 'claude --bg "Summarize docs without changing files"',
                    "started_at": "2026-05-18T19:00:00Z",
                }
            ]
        )
        evidence = self.tmp_path / "stop-dry-run.json"
        grant = self.tmp_path / "stop-grant.json"
        result_path = self.tmp_path / "stop-result.json"

        prepare = self.run_cli(
            "prepare-stop",
            "--session-id",
            "bg_m019_001",
            "--registry",
            str(self.registry),
            "--evidence",
            str(evidence),
        )
        self.assertEqual(prepare.returncode, 0, prepare.stderr)
        self.assertFalse(self.calls_log.exists(), "prepare-stop must not invoke Claude")

        grant_result = self.run_cli(
            "grant-stop",
            "--evidence",
            str(evidence),
            "--grant",
            str(grant),
            "--decider",
            "joe",
            "--ttl-seconds",
            "300",
        )
        self.assertEqual(grant_result.returncode, 0, grant_result.stderr)

        apply = self.run_cli(
            "apply-stop",
            "--evidence",
            str(evidence),
            "--grant",
            str(grant),
            "--registry",
            str(self.registry),
            "--result",
            str(result_path),
            "--claude-bin",
            str(self.fake_claude),
        )
        self.assertEqual(apply.returncode, 0, apply.stderr)
        calls = [json.loads(line) for line in self.calls_log.read_text(encoding="utf-8").splitlines()]
        self.assertEqual(calls, [["stop", "bg_m019_001"]])
        registry = json.loads(self.registry.read_text(encoding="utf-8"))
        self.assertEqual(registry["sessions"][0]["status"], "stopped")
        self.assertIn("stopped_at", registry["sessions"][0])

        replay = self.run_cli(
            "apply-stop",
            "--evidence",
            str(evidence),
            "--grant",
            str(grant),
            "--registry",
            str(self.registry),
            "--result",
            str(self.tmp_path / "replay-result.json"),
            "--claude-bin",
            str(self.fake_claude),
        )
        self.assertNotEqual(replay.returncode, 0)
        self.assertIn("grant already consumed", replay.stderr)

    def test_stop_lifecycle_records_clear_process_verification(self):
        self.write_registry(
            [
                {
                    "id": "bg_m024_clear",
                    "display_name": "Clear stop smoke",
                    "kind": "ClaudeBackground",
                    "status": "running",
                    "host": "gpc",
                    "repo_path": "/home/joe/hermes-workspace",
                    "worktree_path": None,
                    "permission_mode": "read_only",
                    "command": 'claude --bg "Harmless clear stop smoke"',
                    "started_at": "2026-05-19T06:20:00Z",
                }
            ]
        )
        process_snapshot = self.tmp_path / "processes-clear.txt"
        process_snapshot.write_text("1001 python unrelated-worker.py\n", encoding="utf-8")
        evidence = self.tmp_path / "clear-stop-dry-run.json"
        grant = self.tmp_path / "clear-stop-grant.json"
        result_path = self.tmp_path / "clear-stop-result.json"

        self.assertEqual(
            self.run_cli(
                "prepare-stop",
                "--session-id",
                "bg_m024_clear",
                "--registry",
                str(self.registry),
                "--evidence",
                str(evidence),
            ).returncode,
            0,
        )
        self.assertEqual(
            self.run_cli(
                "grant-stop",
                "--evidence",
                str(evidence),
                "--grant",
                str(grant),
                "--decider",
                "joe",
                "--ttl-seconds",
                "300",
            ).returncode,
            0,
        )

        apply = self.run_cli(
            "apply-stop",
            "--evidence",
            str(evidence),
            "--grant",
            str(grant),
            "--registry",
            str(self.registry),
            "--result",
            str(result_path),
            "--claude-bin",
            str(self.fake_claude),
            "--process-snapshot",
            str(process_snapshot),
        )

        self.assertEqual(apply.returncode, 0, apply.stderr)
        result = json.loads(result_path.read_text(encoding="utf-8"))
        self.assertEqual(result["status"], "applied")
        self.assertEqual(result["stop_verification"]["verdict"], "clear")
        self.assertEqual(result["stop_verification"]["remaining_count"], 0)
        registry = json.loads(self.registry.read_text(encoding="utf-8"))
        self.assertEqual(registry["sessions"][0]["status"], "stopped")

    def test_stop_lifecycle_surfaces_lingering_process_attention(self):
        full_session_id = "0179814f-96fd-407a-9665-adbc8f580389"
        self.write_registry(
            [
                {
                    "id": "0179814f",
                    "full_session_id": full_session_id,
                    "display_name": "M024 lingering stop smoke",
                    "kind": "ClaudeBackground",
                    "status": "running",
                    "host": "gpc",
                    "repo_path": "/home/joe/hermes-workspace",
                    "worktree_path": None,
                    "permission_mode": "read_only",
                    "command": 'claude --bg "Harmless lingering stop smoke"',
                    "started_at": "2026-05-19T06:21:00Z",
                }
            ]
        )
        process_snapshot = self.tmp_path / "processes-lingering.txt"
        process_snapshot.write_text(
            "4242 /usr/bin/node claude --session-id 0179814f-96fd-407a-9665-adbc8f580389 token=SECRET123\n"
            "4243 /usr/bin/node claude --session-id 0179814f --api_key=ABCDEF\n",
            encoding="utf-8",
        )
        evidence = self.tmp_path / "attention-stop-dry-run.json"
        grant = self.tmp_path / "attention-stop-grant.json"
        result_path = self.tmp_path / "attention-stop-result.json"

        self.assertEqual(
            self.run_cli(
                "prepare-stop",
                "--session-id",
                "0179814f",
                "--registry",
                str(self.registry),
                "--evidence",
                str(evidence),
            ).returncode,
            0,
        )
        self.assertEqual(
            self.run_cli(
                "grant-stop",
                "--evidence",
                str(evidence),
                "--grant",
                str(grant),
                "--decider",
                "joe",
                "--ttl-seconds",
                "300",
            ).returncode,
            0,
        )

        apply = self.run_cli(
            "apply-stop",
            "--evidence",
            str(evidence),
            "--grant",
            str(grant),
            "--registry",
            str(self.registry),
            "--result",
            str(result_path),
            "--claude-bin",
            str(self.fake_claude),
            "--process-snapshot",
            str(process_snapshot),
        )

        self.assertEqual(apply.returncode, 0, apply.stderr)
        result = json.loads(result_path.read_text(encoding="utf-8"))
        self.assertEqual(result["status"], "needs_attention")
        verification = result["stop_verification"]
        self.assertEqual(verification["verdict"], "needs_attention")
        self.assertEqual(verification["remaining_count"], 2)
        previews = [item["command_preview"] for item in verification["remaining_processes"]]
        self.assertTrue(all(len(preview) <= 180 for preview in previews))
        self.assertTrue(all("[REDACTED]" in preview for preview in previews))
        self.assertFalse(any("SECRET123" in preview or "ABCDEF" in preview for preview in previews))
        registry = json.loads(self.registry.read_text(encoding="utf-8"))
        self.assertEqual(registry["sessions"][0]["status"], "stop_attention_required")
        consumed = json.loads(grant.read_text(encoding="utf-8"))
        self.assertTrue(consumed["consumed"])

    def test_rejects_write_capable_launch_without_worktree(self):
        request = self.launch_request(permission_mode="accept_edits", worktree_path=None)
        evidence = self.tmp_path / "bad-dry-run.json"

        result = self.run_cli(
            "prepare-launch",
            "--request",
            str(request),
            "--registry",
            str(self.registry),
            "--evidence",
            str(evidence),
        )

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("write-capable Claude sessions require worktree_path", result.stderr)
        self.assertFalse(evidence.exists())
        self.assertFalse(self.calls_log.exists())

    def test_rejects_print_mode_and_secret_like_task_text(self):
        request = self.launch_request(task="claude -p summarize token=SECRET123")
        evidence = self.tmp_path / "print-mode-dry-run.json"

        result = self.run_cli(
            "prepare-launch",
            "--request",
            str(request),
            "--registry",
            str(self.registry),
            "--evidence",
            str(evidence),
        )

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("claude -p is not allowed", result.stderr)
        self.assertFalse(evidence.exists())
        self.assertFalse(self.calls_log.exists())

    def test_rejects_unknown_stop_session_before_invoking_claude(self):
        evidence = self.tmp_path / "unknown-stop.json"

        result = self.run_cli(
            "prepare-stop",
            "--session-id",
            "bg_missing",
            "--registry",
            str(self.registry),
            "--evidence",
            str(evidence),
        )

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("unknown session", result.stderr)
        self.assertFalse(evidence.exists())
        self.assertFalse(self.calls_log.exists())


if __name__ == "__main__":
    unittest.main()
