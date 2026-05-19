import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-claude-lifecycle-drafts.py"
PYTHON = sys.executable


class ClaudeLifecycleDraftsTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tmp = tempfile.TemporaryDirectory(prefix="m021-claude-drafts-")
        self.addCleanup(self.tmp.cleanup)
        self.tmp_path = Path(self.tmp.name)
        self.output_root = self.tmp_path / "out"
        self.projection = self.output_root / "claude-lifecycle-projection.json"

    def write_plan(self, **overrides) -> Path:
        plan = {
            "schema_version": "hermes-cockpit.claude-parallel-workflow-plan.v1",
            "workflow_id": "m021_parallel_smoke",
            "registry_path": "target/hermes-cockpit-m021/registry.json",
            "output_root": str(self.output_root),
            "defaults": {
                "host": "gpc",
                "repo_path": "/home/joe/hermes-workspace",
                "permission_mode": "read_only",
            },
            "lanes": [
                {
                    "lane_id": "wf1_docs",
                    "display_name": "Docs scout",
                    "delegation_role": "docs-scout",
                    "priority": "high",
                    "task": "Summarize lifecycle docs without changing files",
                    "depends_on": [],
                },
                {
                    "lane_id": "wf2_review",
                    "display_name": "Implementation reviewer",
                    "delegation_role": "reviewer",
                    "priority": "normal",
                    "task": "Review the drafted request artifacts",
                    "depends_on": ["wf1_docs"],
                    "permission_mode": "accept_edits",
                    "worktree_path": "/home/joe/hermes-workspace/.worktrees/wf2_review",
                },
            ],
        }
        plan.update(overrides)
        path = self.tmp_path / "workflow-plan.json"
        path.write_text(json.dumps(plan, indent=2) + "\n", encoding="utf-8")
        return path

    def run_cli(self, *extra: str) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            [PYTHON, str(SCRIPT), *extra],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )

    def test_drafts_parallel_lifecycle_requests_without_invoking_claude(self):
        plan = self.write_plan()

        result = self.run_cli(
            "--plan",
            str(plan),
            "--output",
            str(self.projection),
        )

        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn("requests=2", result.stdout)
        projection = json.loads(self.projection.read_text(encoding="utf-8"))
        self.assertEqual(projection["schema_version"], "hermes-cockpit.claude-lifecycle-projection.v1")
        self.assertTrue(projection["read_only"])
        self.assertEqual(projection["source"]["name"], "claude-lifecycle")
        rows = projection["claude_lifecycle_requests"]
        self.assertEqual(len(rows), 2)

        first = rows[0]
        self.assertEqual(first["lane_id"], "wf1_docs")
        self.assertEqual(first["delegation_role"], "docs-scout")
        self.assertEqual(first["priority"], "high")
        self.assertEqual(first["depends_on"], [])
        self.assertEqual(first["action"], "launch")
        self.assertEqual(first["status"], "drafted")
        self.assertIn("prepare-launch", first["next_cli_command"])
        self.assertNotIn("apply-launch", first["next_cli_command"])
        self.assertIn("REQUEST ONLY", first["safety_labels"])
        self.assertIn("No TUI apply", first["safety_labels"])
        self.assertIn("Migi verifies; GSD is truth", first["safety_labels"])

        request_path = Path(first["request_path"])
        self.assertTrue(request_path.exists())
        request = json.loads(request_path.read_text(encoding="utf-8"))
        self.assertEqual(request["operation_id"], "m021_parallel_smoke-wf1_docs-launch")
        self.assertEqual(request["display_name"], "Docs scout")
        self.assertEqual(request["permission_mode"], "read_only")
        self.assertIsNone(request["worktree_path"])
        self.assertNotIn("claude -p", request["task"])

        second = rows[1]
        self.assertEqual(second["lane_id"], "wf2_review")
        self.assertEqual(second["depends_on"], ["wf1_docs"])
        second_request = json.loads(Path(second["request_path"]).read_text(encoding="utf-8"))
        self.assertEqual(second_request["permission_mode"], "accept_edits")
        self.assertEqual(second_request["worktree_path"], "/home/joe/hermes-workspace/.worktrees/wf2_review")

    def test_rejects_duplicate_lanes_before_writing_projection(self):
        plan = self.write_plan(
            lanes=[
                {
                    "lane_id": "wf1_docs",
                    "display_name": "One",
                    "delegation_role": "docs",
                    "priority": "high",
                    "task": "Summarize docs",
                    "depends_on": [],
                },
                {
                    "lane_id": "wf1_docs",
                    "display_name": "Duplicate",
                    "delegation_role": "reviewer",
                    "priority": "normal",
                    "task": "Review docs",
                    "depends_on": [],
                },
            ]
        )

        result = self.run_cli("--plan", str(plan), "--output", str(self.projection))

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("duplicate lane_id", result.stderr)
        self.assertFalse(self.projection.exists())

    def test_rejects_unsafe_task_text_and_unknown_dependency(self):
        for unsafe_task in [
            "claude -p summarize token=SECRET123",
            "Claude   -p summarize docs",
            "claude\t-p summarize docs",
        ]:
            with self.subTest(unsafe_task=unsafe_task):
                plan = self.write_plan(
                    lanes=[
                        {
                            "lane_id": "wf1_bad",
                            "display_name": "Bad lane",
                            "delegation_role": "docs",
                            "priority": "high",
                            "task": unsafe_task,
                            "depends_on": [],
                        }
                    ]
                )

                result = self.run_cli("--plan", str(plan), "--output", str(self.projection))

                self.assertNotEqual(result.returncode, 0)
                self.assertIn("claude -p is not allowed", result.stderr)
                self.assertFalse(self.projection.exists())

        plan = self.write_plan(
            lanes=[
                {
                    "lane_id": "wf1_unknown_dep",
                    "display_name": "Unknown dependency lane",
                    "delegation_role": "docs",
                    "priority": "high",
                    "task": "Summarize docs",
                    "depends_on": ["missing_lane"],
                }
            ]
        )

        result = self.run_cli("--plan", str(plan), "--output", str(self.projection))

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("unknown dependency", result.stderr)
        self.assertFalse(self.projection.exists())

    def test_rejects_projection_output_outside_plan_root(self):
        plan = self.write_plan()
        outside_projection = self.tmp_path / "outside-projection.json"

        result = self.run_cli("--plan", str(plan), "--output", str(outside_projection))

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("projection output must be inside output_root", result.stderr)
        self.assertFalse(outside_projection.exists())

    def test_rejects_missing_host_or_permission_mode_without_defaults(self):
        plan = {
            "schema_version": "hermes-cockpit.claude-parallel-workflow-plan.v1",
            "workflow_id": "m021_missing_defaults",
            "registry_path": "target/hermes-cockpit-m021/registry.json",
            "output_root": str(self.output_root),
            "lanes": [
                {
                    "lane_id": "wf1_docs",
                    "display_name": "Docs scout",
                    "delegation_role": "docs-scout",
                    "priority": "high",
                    "repo_path": "/home/joe/hermes-workspace",
                    "task": "Summarize lifecycle docs",
                    "depends_on": [],
                }
            ],
        }
        path = self.tmp_path / "workflow-plan-missing-defaults.json"
        path.write_text(json.dumps(plan, indent=2) + "\n", encoding="utf-8")

        result = self.run_cli("--plan", str(path), "--output", str(self.projection))

        self.assertNotEqual(result.returncode, 0)
        self.assertTrue(
            "missing required field: host" in result.stderr
            or "missing required field: permission_mode" in result.stderr,
            result.stderr,
        )
        self.assertFalse(self.projection.exists())

    def test_rejects_write_capable_lane_without_worktree(self):
        plan = self.write_plan(
            lanes=[
                {
                    "lane_id": "wf_impl",
                    "display_name": "Implementation lane",
                    "delegation_role": "implementation",
                    "priority": "high",
                    "task": "Implement bounded changes",
                    "depends_on": [],
                    "permission_mode": "accept_edits",
                }
            ]
        )

        result = self.run_cli("--plan", str(plan), "--output", str(self.projection))

        self.assertNotEqual(result.returncode, 0)
        self.assertIn("write-capable lane requires worktree_path", result.stderr)
        self.assertFalse(self.projection.exists())


if __name__ == "__main__":
    unittest.main()
