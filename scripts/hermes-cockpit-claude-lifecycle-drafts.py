#!/usr/bin/env python3
"""Draft parallel Claude BG lifecycle requests for Hermes Cockpit.

M021 helper: converts a static workflow plan into M019-compatible launch
request JSON files and a M020-compatible `claude_lifecycle_requests`
projection. It never invokes Claude and never applies lifecycle actions.
"""

from __future__ import annotations

import argparse
import json
import re
import shlex
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

PLAN_SCHEMA = "hermes-cockpit.claude-parallel-workflow-plan.v1"
PROJECTION_SCHEMA = "hermes-cockpit.claude-lifecycle-projection.v1"
REQUEST_SCHEMA = "hermes-cockpit.claude-bg-lifecycle.launch-request.v1"
PERMISSION_MODES = {"read_only", "accept_edits", "bypass_permissions"}
WRITE_CAPABLE_MODES = {"accept_edits", "bypass_permissions"}
LANE_ID_PATTERN = re.compile(r"^[A-Za-z0-9][A-Za-z0-9_.-]{0,79}$")
SECRET_PATTERN = re.compile(r"(?i)(api[_-]?key|token|password|secret)\s*[=:]\s*\S+")
CLAUDE_PRINT_PATTERN = re.compile(r"(?i)\bclaude\s+-p\b")


class DraftError(RuntimeError):
    pass


def iso_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def read_json(path: Path, label: str) -> dict[str, Any]:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise DraftError(f"{label} not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise DraftError(f"{label} is not valid JSON: {exc}") from exc
    if not isinstance(data, dict):
        raise DraftError(f"{label} must be a JSON object")
    return data


def write_json(path: Path, data: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def require_text(data: dict[str, Any], key: str, label: str) -> str:
    value = data.get(key)
    if value is None or str(value).strip() == "":
        raise DraftError(f"{label} missing required field: {key}")
    return str(value)


def as_string_list(value: Any, label: str) -> list[str]:
    if value is None:
        return []
    if not isinstance(value, list):
        raise DraftError(f"{label} must be a list")
    result: list[str] = []
    for item in value:
        if not isinstance(item, str) or not item:
            raise DraftError(f"{label} entries must be non-empty strings")
        result.append(item)
    return result


def validate_task_text(task: str) -> None:
    if CLAUDE_PRINT_PATTERN.search(task):
        raise DraftError("claude -p is not allowed in draft task text")
    if SECRET_PATTERN.search(task):
        raise DraftError("task text contains secret-like material")


def output_root_for(plan: dict[str, Any], output_path: Path) -> Path:
    root = plan.get("output_root")
    if root:
        return Path(str(root))
    return output_path.parent


def is_relative_to(child: Path, parent: Path) -> bool:
    try:
        child.resolve(strict=False).relative_to(parent.resolve(strict=False))
        return True
    except ValueError:
        return False


def lane_path(output_root: Path, subdir: str, lane_id: str, suffix: str) -> Path:
    return output_root / subdir / f"{lane_id}-{suffix}.json"


def validate_and_normalize_plan(plan: dict[str, Any], output_path: Path) -> tuple[dict[str, Any], list[dict[str, Any]]]:
    if plan.get("schema_version") != PLAN_SCHEMA:
        raise DraftError(f"unsupported plan schema: {plan.get('schema_version')}")
    workflow_id = require_text(plan, "workflow_id", "workflow plan")
    registry_path = require_text(plan, "registry_path", "workflow plan")
    defaults = plan.get("defaults") or {}
    if not isinstance(defaults, dict):
        raise DraftError("workflow defaults must be a JSON object")
    lanes = plan.get("lanes")
    if not isinstance(lanes, list) or not lanes:
        raise DraftError("workflow plan must include non-empty lanes")

    output_root = output_root_for(plan, output_path)
    if not is_relative_to(output_path, output_root):
        raise DraftError("projection output must be inside output_root")
    normalized_plan = {
        "workflow_id": workflow_id,
        "registry_path": registry_path,
        "output_root": output_root,
        "defaults": defaults,
    }

    seen: set[str] = set()
    normalized_lanes: list[dict[str, Any]] = []
    for raw_lane in lanes:
        if not isinstance(raw_lane, dict):
            raise DraftError("lane entries must be JSON objects")
        lane_id = require_text(raw_lane, "lane_id", "lane")
        if not LANE_ID_PATTERN.match(lane_id):
            raise DraftError(f"invalid lane_id: {lane_id}")
        if lane_id in seen:
            raise DraftError(f"duplicate lane_id: {lane_id}")
        seen.add(lane_id)
        display_name = require_text(raw_lane, "display_name", f"lane {lane_id}")
        delegation_role = require_text(raw_lane, "delegation_role", f"lane {lane_id}")
        priority = str(raw_lane.get("priority") or "normal")
        task = require_text(raw_lane, "task", f"lane {lane_id}")
        validate_task_text(task)
        depends_on = as_string_list(raw_lane.get("depends_on", []), f"lane {lane_id} depends_on")
        permission_source = raw_lane.get("permission_mode") or defaults.get("permission_mode")
        if not permission_source:
            raise DraftError(f"lane {lane_id} missing required field: permission_mode")
        permission_mode = str(permission_source)
        if permission_mode not in PERMISSION_MODES:
            raise DraftError(f"unsupported permission_mode for lane {lane_id}: {permission_mode}")
        worktree_value = raw_lane.get("worktree_path") or defaults.get("worktree_path")
        worktree_path = str(worktree_value) if worktree_value else None
        if permission_mode in WRITE_CAPABLE_MODES and not worktree_path:
            raise DraftError("write-capable lane requires worktree_path")
        host_source = raw_lane.get("host") or defaults.get("host")
        if not host_source:
            raise DraftError(f"lane {lane_id} missing required field: host")
        host = str(host_source)
        repo_path = str(raw_lane.get("repo_path") or defaults.get("repo_path") or "")
        if not repo_path:
            raise DraftError(f"lane {lane_id} missing required field: repo_path")
        normalized_lanes.append(
            {
                "lane_id": lane_id,
                "display_name": display_name,
                "delegation_role": delegation_role,
                "priority": priority,
                "task": task,
                "depends_on": depends_on,
                "permission_mode": permission_mode,
                "worktree_path": worktree_path,
                "host": host,
                "repo_path": repo_path,
            }
        )

    known = {lane["lane_id"] for lane in normalized_lanes}
    for lane in normalized_lanes:
        for dep in lane["depends_on"]:
            if dep not in known:
                raise DraftError(f"unknown dependency for lane {lane['lane_id']}: {dep}")
    return normalized_plan, normalized_lanes


def build_request(workflow_id: str, lane: dict[str, Any]) -> dict[str, Any]:
    return {
        "schema_version": REQUEST_SCHEMA,
        "operation_id": f"{workflow_id}-{lane['lane_id']}-launch",
        "display_name": lane["display_name"],
        "task": lane["task"],
        "host": lane["host"],
        "repo_path": lane["repo_path"],
        "worktree_path": lane["worktree_path"],
        "permission_mode": lane["permission_mode"],
        "source": "hermes-cockpit-m021-parallel-draft",
        "lane_id": lane["lane_id"],
        "delegation_role": lane["delegation_role"],
        "priority": lane["priority"],
        "depends_on": lane["depends_on"],
    }


def prepare_launch_command(request_path: Path, registry_path: str, evidence_path: Path) -> str:
    request_arg = shlex.quote(str(request_path))
    registry_arg = shlex.quote(str(registry_path))
    evidence_arg = shlex.quote(str(evidence_path))
    return (
        "python3 scripts/hermes-cockpit-claude-bg-lifecycle.py prepare-launch "
        f"--request {request_arg} --registry {registry_arg} --evidence {evidence_arg}"
    )


def build_projection(plan: dict[str, Any], lanes: list[dict[str, Any]], output_path: Path) -> tuple[dict[str, Any], list[Path]]:
    output_root: Path = plan["output_root"]
    workflow_id = plan["workflow_id"]
    registry_path = plan["registry_path"]
    generated_at = iso_now()
    rows: list[dict[str, Any]] = []
    request_paths: list[Path] = []

    for lane in lanes:
        lane_id = lane["lane_id"]
        request_path = lane_path(output_root, "requests", lane_id, "launch-request")
        evidence_path = lane_path(output_root, "evidence", lane_id, "dry-run")
        grant_path = lane_path(output_root, "grants", lane_id, "grant")
        result_path = lane_path(output_root, "results", lane_id, "result")
        request = build_request(workflow_id, lane)
        write_json(request_path, request)
        request_paths.append(request_path)
        rows.append(
            {
                "id": f"draft_{lane_id}",
                "operation_id": request["operation_id"],
                "lane_id": lane_id,
                "delegation_role": lane["delegation_role"],
                "priority": lane["priority"],
                "depends_on": lane["depends_on"],
                "action": "launch",
                "status": "drafted",
                "display_name": lane["display_name"],
                "host": lane["host"],
                "repo_path": lane["repo_path"],
                "worktree_path": lane["worktree_path"],
                "permission_mode": lane["permission_mode"],
                "registry_path": registry_path,
                "request_path": str(request_path),
                "evidence_path": str(evidence_path),
                "grant_path": str(grant_path),
                "result_path": str(result_path),
                "next_cli_command": prepare_launch_command(request_path, registry_path, evidence_path),
                "updated_at": generated_at,
                "safety_labels": [
                    "REQUEST ONLY",
                    "DISPLAY ONLY",
                    "CLI required",
                    "No TUI apply",
                    "Verifier required",
                    "Migi verifies; GSD is truth",
                ],
            }
        )

    projection = {
        "schema_version": PROJECTION_SCHEMA,
        "generated_at": generated_at,
        "read_only": True,
        "source": {"name": "claude-lifecycle", "mode": "request-only", "workflow_id": workflow_id},
        "claude_lifecycle_requests": rows,
        "cards": [],
        "warnings": [],
        "artifacts": [
            {"label": "workflow_plan", "path": str(output_root / "workflow-plan.json")},
            {"label": "projection", "path": str(output_path)},
        ],
        "non_claims": {
            "no_claude_invocation": True,
            "no_tui_lifecycle_control": True,
            "no_auto_commit_or_push": True,
            "no_source_of_truth_mutation": True,
        },
    }
    return projection, request_paths


def draft(args: argparse.Namespace) -> int:
    plan_path = Path(args.plan)
    output_path = Path(args.output)
    plan = read_json(plan_path, "workflow plan")
    normalized_plan, lanes = validate_and_normalize_plan(plan, output_path)
    projection, request_paths = build_projection(normalized_plan, lanes, output_path)
    write_json(output_path, projection)
    print(f"projection={output_path}")
    print(f"requests={len(request_paths)}")
    print("status=drafted")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Draft parallel Claude BG lifecycle requests")
    parser.add_argument("--plan", required=True, help="workflow plan JSON")
    parser.add_argument("--output", required=True, help="projection JSON output path")
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        return draft(args)
    except DraftError as exc:
        print(f"error: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
