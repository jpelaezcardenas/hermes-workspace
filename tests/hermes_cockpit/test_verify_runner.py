import pathlib
import unittest


ROOT = pathlib.Path(__file__).resolve().parents[2]
SCRIPT = ROOT / "scripts" / "hermes-cockpit-verify.sh"
WINDOWS_SCRIPT = ROOT / "scripts" / "hermes-cockpit-windows-smoke.ps1"
WINDOWS_RUNBOOK = ROOT / "docs" / "hermes-cockpit" / "m012-windows-runbook.md"
M014_RUNBOOK = ROOT / "docs" / "hermes-cockpit" / "m014-approval-action-pilot-runbook.md"


class PiVerifyRunnerTests(unittest.TestCase):
    def test_pi_verify_runner_exists_and_is_bash_runnable(self):
        self.assertTrue(SCRIPT.exists(), f"missing {SCRIPT}")
        text = SCRIPT.read_text()
        self.assertTrue(text.startswith("#!/usr/bin/env bash"))

    def test_pi_verify_runner_declares_required_gates_and_summary(self):
        text = SCRIPT.read_text()
        self.assertIn("python3 -m unittest discover tests/hermes_cockpit -v", text)
        self.assertIn("cargo fmt --check", text)
        self.assertIn("cargo check", text)
        self.assertIn("cargo test", text)
        self.assertIn("target/hermes-cockpit-m012/pi-verify-summary.json", text)
        self.assertIn("overall_status", text)
        for key in ["python", "cargo_fmt", "cargo_check", "cargo_test"]:
            self.assertIn(key, text)


class WindowsVerifyRunnerTests(unittest.TestCase):
    def test_windows_runner_and_runbook_exist(self):
        self.assertTrue(WINDOWS_SCRIPT.exists(), f"missing {WINDOWS_SCRIPT}")
        self.assertTrue(WINDOWS_RUNBOOK.exists(), f"missing {WINDOWS_RUNBOOK}")

    def test_windows_runner_declares_sync_allowlist_and_gates(self):
        text = WINDOWS_SCRIPT.read_text()
        for needle in [
            "D:\\projects\\hermes-workspace-m011-win",
            "SourceRoot",
            "MirrorRoot",
            "robocopy",
            "scripts",
            "hermes-cockpit-*",
            "start-hermes-cockpit.*",
            "tests\\hermes_cockpit",
            "tests\\fixtures\\hermes_cockpit",
            "prototypes\\hermes-cockpit",
            "docs\\hermes-cockpit",
            "target\\hermes-cockpit-m010\\hermes-projection.json",
            "target\\hermes-cockpit-m012\\control-registry.jsonl",
            "target\\hermes-cockpit-m012\\windows-worker-registry.jsonl",
            "target\\hermes-cockpit-m012\\windows-worker-smoke-summary.json",
            "target\\hermes-cockpit-m012\\control-plane-projection.json",
            "target\\hermes-cockpit-m013\\watcher-projection.json",
            "python -m unittest discover tests/hermes_cockpit -v",
            "cargo fmt --check",
            "cargo check",
            "cargo test",
            "target\\hermes-cockpit-m012\\windows-verify-summary.json",
            "Tux runs on Windows/WSL",
            "Migi/Pi",
        ]:
            self.assertIn(needle, text)

    def test_windows_runbook_documents_boundaries_and_commands(self):
        text = WINDOWS_RUNBOOK.read_text()
        for needle in [
            "D:\\projects\\hermes-workspace-m011-win",
            "\\\\TOWER\\The Goods\\Serena-Projects\\hermes-workspace",
            "powershell -NoProfile -ExecutionPolicy Bypass",
            "windows-verify-summary.json",
            "Tux runs on Windows/WSL",
            "Pi-only",
            "Migi",
            "claude -p",
            "claude --bg",
            "gsd --version",
            "not production readiness",
        ]:
            self.assertIn(needle, text)


class M014ApprovalVerificationPrepTests(unittest.TestCase):
    def test_windows_runner_declares_m014_sync_required_files_and_summary(self):
        text = WINDOWS_SCRIPT.read_text()
        for needle in [
            "hermes-cockpit.m014.windows-verify-summary.v1",
            "target\\hermes-cockpit-m014",
            "target\\hermes-cockpit-m014\\windows-verify-summary.json",
            "scripts\\hermes-cockpit-approval-action.py",
            "docs\\hermes-cockpit\\m014-approval-action-contract.md",
            "tests\\fixtures\\hermes_cockpit\\approval-action\\approval-pilot-ops.jsonl",
            "tests\\hermes_cockpit\\test_approval_contract.py",
            "approval-surface-smoke-summary.json",
            "safe-executor-pilot-smoke-summary.json",
            "Copy-OptionalEvidenceFile",
            "closeout_gates",
            "production_readiness_claim = $false",
        ]:
            self.assertIn(needle, text)

    def test_m014_runbook_documents_pi_windows_commands_safety_and_non_claims(self):
        self.assertTrue(M014_RUNBOOK.exists(), f"missing {M014_RUNBOOK}")
        text = M014_RUNBOOK.read_text()
        for needle in [
            "# M014 Approval Action Pilot Verification Runbook",
            "cd /home/joe/hermes-workspace",
            "python3 -m unittest tests.hermes_cockpit.test_approval_contract -v",
            "python3 scripts/hermes-cockpit-approval-action.py --dry-run",
            "--operations tests/fixtures/hermes_cockpit/approval-action/approval-pilot-ops.jsonl",
            "target/hermes-cockpit-m014/approval-action-evidence",
            "target/hermes-cockpit-m014/pi-verify.stdout",
            "D:\\projects\\hermes-workspace-m011-win",
            "powershell -NoProfile -ExecutionPolicy Bypass",
            "hermes-cockpit-windows-smoke.ps1",
            "target\\hermes-cockpit-m014\\windows-verify-summary.json",
            "artifact-only target",
            "dry-run writes evidence only",
            "Apply remains blocked unless WF3 evidence/approval matching is present",
            "does not claim production readiness",
            "does not mutate GSD, Kanban, or Hermes",
            "approval-surface-smoke-summary.json",
            "safe-executor-pilot-smoke-summary.json",
            "expected closeout gates",
        ]:
            self.assertIn(needle, text)


if __name__ == "__main__":
    unittest.main()
