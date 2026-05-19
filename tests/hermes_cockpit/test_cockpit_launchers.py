import json
import pathlib
import re
import unittest


ROOT = pathlib.Path(__file__).resolve().parents[2]
POSIX_SCRIPT = ROOT / "scripts" / "start-hermes-cockpit.sh"
WINDOWS_SCRIPT = ROOT / "scripts" / "start-hermes-cockpit.ps1"
SOURCE_CATALOG = ROOT / "docs" / "hermes-cockpit" / "projection-sources.json"
EXPECTED_SOURCES = {
    "cards": "docs/hermes-cockpit/live-kanban-projection.json",
    "events": "target/hermes-cockpit-m010/hermes-projection.json",
    "control": "target/hermes-cockpit-m012/control-plane-projection.json",
    "watchers": "target/hermes-cockpit-m013/watcher-projection.json",
    "approval-queue": "target/hermes-cockpit-m015/approval-queue-surface-projection.json",
    "claude-sessions": "target/hermes-cockpit-m018/claude-sessions-projection.json",
    "claude-lifecycle": "target/hermes-cockpit-m021/claude-lifecycle-projection.json",
}


class CockpitLauncherStaticTests(unittest.TestCase):
    def test_projection_sources_catalog_matches_launcher_sources(self):
        self.assertTrue(SOURCE_CATALOG.exists(), f"missing {SOURCE_CATALOG}")
        catalog = json.loads(SOURCE_CATALOG.read_text())
        self.assertTrue(catalog["read_only"])

        sources = {entry["name"]: entry for entry in catalog["sources"]}
        self.assertEqual(set(sources), set(EXPECTED_SOURCES))
        for index, (name, path) in enumerate(EXPECTED_SOURCES.items(), start=1):
            self.assertEqual(sources[name]["key"], str(index))
            self.assertEqual(sources[name]["path"], path)

    def test_posix_launcher_exists_and_supports_sources_and_smoke(self):
        self.assertTrue(POSIX_SCRIPT.exists(), f"missing {POSIX_SCRIPT}")
        text = POSIX_SCRIPT.read_text()

        self.assertTrue(text.startswith("#!/usr/bin/env bash"))
        self.assertIn("set -euo pipefail", text)
        self.assertIn("SCRIPT_DIR", text)
        self.assertIn("REPO_ROOT", text)
        self.assertIn("--source", text)
        self.assertIn("--smoke", text)
        self.assertIn("cargo run", text)
        self.assertIn("--manifest-path", text)
        self.assertIn("prototypes/hermes-cockpit/Cargo.toml", text)
        self.assertIn('"$REPO_ROOT"', text, "paths should be quoted")
        self.assertIn("docs/hermes-cockpit/projection-sources.json", text)

        for source_name, source_path in EXPECTED_SOURCES.items():
            self.assertRegex(text, rf"\b{re.escape(source_name)}\b")
            self.assertIn(source_path, text)

    def test_windows_launcher_exists_and_supports_sources_and_smoke(self):
        self.assertTrue(WINDOWS_SCRIPT.exists(), f"missing {WINDOWS_SCRIPT}")
        text = WINDOWS_SCRIPT.read_text()

        self.assertIn("param(", text)
        self.assertIn("$PSScriptRoot", text)
        self.assertIn("$RepoRoot", text)
        self.assertIn("Source", text)
        self.assertIn("Smoke", text)
        self.assertIn("cargo", text)
        self.assertIn("--manifest-path", text)
        self.assertIn("prototypes\\hermes-cockpit\\Cargo.toml", text)
        self.assertIn("docs\\hermes-cockpit\\projection-sources.json", text)
        self.assertRegex(
            text,
            r"ValidateSet\([^)]*cards[^)]*events[^)]*control[^)]*watchers[^)]*approval-queue[^)]*claude-sessions[^)]*claude-lifecycle[^)]*\)",
        )

        for source_name, source_path in EXPECTED_SOURCES.items():
            self.assertRegex(text, rf"\b{re.escape(source_name)}\b")
            self.assertIn(source_path.replace("/", "\\"), text)

    def test_launchers_remain_read_only(self):
        combined = "\n".join(
            path.read_text() if path.exists() else ""
            for path in [POSIX_SCRIPT, WINDOWS_SCRIPT]
        ).lower()

        forbidden_patterns = [
            r"\bapply\b",
            r"\bwriteback\b",
            r"\bdispatch\b",
            r"\bgsd\s+(task|slice|milestone)",
            r"\bkanban\s+(move|update|comment)",
            r"hermes-cockpit-control\.py",
            r"hermes-cockpit-watcher-control\.py\s+install",
        ]
        for pattern in forbidden_patterns:
            self.assertIsNone(
                re.search(pattern, combined),
                f"launcher should stay read-only and avoid {pattern!r}",
            )


if __name__ == "__main__":
    unittest.main()
