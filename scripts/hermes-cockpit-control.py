#!/usr/bin/env python3
"""Unified safe operator entrypoint for Hermes Cockpit M012.

Safety posture:
- Accepts explicit `hermes-cockpit.operation.v1` JSONL only.
- Routes to the existing M011 writeback/dispatch/watcher primitives.
- Requires matching dry-run registry evidence before apply.
- Writes a bounded read-only registry for Cockpit projection/rendering.
- Never edits databases directly and never infers mutations from transcript prose.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Callable

OPERATION_SCHEMA_VERSION = "hermes-cockpit.operation.v1"
REGISTRY_SCHEMA_VERSION = "hermes-cockpit.control-registry.v1"
STATUS_SCHEMA_VERSION = "hermes-cockpit.control-status.v1"
SUPPORTED_LANES = {"writeback", "dispatch", "watcher"}
DEFAULT_BOARD = "hermes-cockpit-m012-control"
DEFAULT_ALLOW_TARGET_PREFIXES = ["M012/", "target/hermes-cockpit-m012/", "tests/fixtures/hermes_cockpit/"]
DEFAULT_ALLOW_PROFILES = {"local_echo", "windows_gpc", "claude", "codex"}
DEFAULT_ALLOW_COMMAND_ROOTS = {"python3", "python", "bash", "echo"}

ROOT = Path(__file__).resolve().parents[1]


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def load_script_module(module_name: str, relative_path: str) -> Any:
    path = ROOT / relative_path
    spec = importlib.util.spec_from_file_location(module_name, path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"unable to load module from {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def writeback_module() -> Any:
    return load_script_module("hermes_cockpit_writeback", "scripts/hermes-cockpit-writeback.py")


def dispatch_module() -> Any:
    return load_script_module("hermes_cockpit_dispatch", "scripts/hermes-cockpit-dispatch.py")


def watcher_module() -> Any:
    return load_script_module("hermes_cockpit_watch", "scripts/hermes-cockpit-watch.py")


def load_operations(path: str | Path) -> list[dict[str, Any]]:
    operations: list[dict[str, Any]] = []
    source_path = Path(path)
    with source_path.open("r", encoding="utf-8-sig") as handle:
        for line_number, raw_line in enumerate(handle, start=1):
            line = raw_line.strip()
            if not line:
                continue
            try:
                parsed = json.loads(line)
            except json.JSONDecodeError as exc:
                raise ValueError(f"line {line_number}: invalid operation JSON: {exc}") from exc
            if not isinstance(parsed, dict):
                raise ValueError(f"line {line_number}: operation must be a JSON object")
            parsed.setdefault("_source_line", line_number)
            operations.append(parsed)
    return operations


def load_registry(path: str | Path) -> list[dict[str, Any]]:
    registry = Path(path)
    if not registry.exists():
        return []
    entries: list[dict[str, Any]] = []
    with registry.open("r", encoding="utf-8-sig") as handle:
        for raw_line in handle:
            line = raw_line.strip()
            if not line:
                continue
            try:
                parsed = json.loads(line)
            except json.JSONDecodeError:
                continue
            if isinstance(parsed, dict):
                entries.append(parsed)
    return entries


def dry_run_ids_from_registry(entries: list[dict[str, Any]] | None) -> set[str]:
    ids: set[str] = set()
    for entry in entries or []:
        if entry.get("status") == "dry_run_passed" and isinstance(entry.get("operation_id"), str):
            ids.add(entry["operation_id"])
    return ids


def operation_lane(operation: dict[str, Any]) -> str:
    operation_type = str(operation.get("operation_type") or "")
    if operation_type.startswith("writeback."):
        return "writeback"
    if operation_type.startswith("dispatch."):
        return "dispatch"
    if operation_type.startswith("watcher."):
        return "watcher"
    return "rejected"


def registry_entry(
    operation: dict[str, Any],
    *,
    mode: str,
    lane: str,
    status: str,
    evidence_path: str | None,
    control_run_id: str,
    source_mutated: bool = False,
    target_mutated: bool = False,
    direct_db_edit: bool = False,
    rejection_reasons: list[str] | None = None,
    detail: dict[str, Any] | None = None,
) -> dict[str, Any]:
    target = operation.get("target") if isinstance(operation.get("target"), dict) else {}
    entry = {
        "schema_version": REGISTRY_SCHEMA_VERSION,
        "operation_id": operation.get("operation_id"),
        "operation_type": operation.get("operation_type"),
        "mode": mode,
        "lane": lane,
        "status": status,
        "target": target,
        "source_mutated": bool(source_mutated),
        "target_mutated": bool(target_mutated),
        "direct_db_edit": bool(direct_db_edit),
        "evidence_path": evidence_path,
        "control_run_id": control_run_id,
        "recorded_at": utc_now(),
        "rejection_reasons": list(rejection_reasons or []),
        "non_claims": {
            "no_direct_db_edit": True,
            "no_transcript_prose_mutation": True,
            "no_public_agent_loop": True,
            "no_task_completion_claim": True,
            "no_production_readiness": True,
        },
    }
    if detail:
        entry["detail"] = detail
    return entry


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def append_registry(path: Path, entries: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as handle:
        for entry in entries:
            handle.write(json.dumps(entry, sort_keys=True, separators=(",", ":")) + "\n")


def evidence_dir_for(registry_path: Path, workspace_dir: Path) -> Path:
    # Keep evidence under the explicit workspace so the registry can be moved/replayed safely.
    return workspace_dir / "evidence"


def route_writeback(
    operation: dict[str, Any],
    *,
    mode: str,
    workspace_dir: Path,
    control_run_id: str,
    prior_dry_run_ids: set[str],
    runner: Callable[..., Any],
) -> dict[str, Any]:
    mod = writeback_module()
    events, evidence = mod.run_writeback_operations(
        [operation],
        board=DEFAULT_BOARD,
        mode=mode,
        allow_target_prefixes=DEFAULT_ALLOW_TARGET_PREFIXES,
        prior_dry_run_ids=prior_dry_run_ids,
        runner=runner,
    )
    evidence_payload = evidence[0] if evidence else {"status": "rejected", "rejection_reasons": ["writeback produced no evidence"]}
    op_id = str(operation.get("operation_id") or "operation")
    path = evidence_dir_for(workspace_dir / "control-registry.jsonl", workspace_dir) / f"{op_id}-writeback-evidence.json"
    write_json(path, {"entries": evidence, "events": events})
    status = str(evidence_payload.get("status") or "rejected")
    return registry_entry(
        operation,
        mode=mode,
        lane="writeback",
        status=status,
        evidence_path=str(path),
        control_run_id=control_run_id,
        source_mutated=bool(evidence_payload.get("source_mutated", False)),
        target_mutated=bool(evidence_payload.get("target_mutated", False)),
        rejection_reasons=list(evidence_payload.get("rejection_reasons") or []),
        detail={"event_count": len(events), "evidence_schema": evidence_payload.get("schema_version")},
    )


def route_dispatch(
    operation: dict[str, Any],
    *,
    mode: str,
    workspace_dir: Path,
    control_run_id: str,
    prior_dry_run_ids: set[str],
    runner: Callable[..., Any],
) -> dict[str, Any]:
    mod = dispatch_module()
    effective_operation = dict(operation)
    # The fixture uses dispatch.worker_dry_run as a dry-run preview operation. Apply mode should use worker_start only.
    if mode == "apply" and effective_operation.get("operation_type") == "dispatch.worker_dry_run":
        effective_operation["operation_type"] = "dispatch.worker_start"
    events, evidence = mod.run_dispatch_operations(
        [effective_operation],
        mode=mode,
        allow_profiles=DEFAULT_ALLOW_PROFILES,
        allow_command_roots=DEFAULT_ALLOW_COMMAND_ROOTS,
        prior_dry_run_ids=prior_dry_run_ids,
        runner=runner,
    )
    evidence_payload = evidence[0] if evidence else {"status": "rejected", "rejection_reasons": ["dispatch produced no evidence"]}
    op_id = str(operation.get("operation_id") or "operation")
    path = evidence_dir_for(workspace_dir / "control-registry.jsonl", workspace_dir) / f"{op_id}-dispatch-evidence.json"
    write_json(path, {"entries": evidence, "events": events})
    status = str(evidence_payload.get("status") or "rejected")
    return registry_entry(
        operation,
        mode=mode,
        lane="dispatch",
        status="applied" if status == "completed" else status,
        evidence_path=str(path),
        control_run_id=control_run_id,
        target_mutated=False,
        rejection_reasons=list(evidence_payload.get("rejection_reasons") or []),
        detail={"event_count": len(events), "worker_spawned": evidence_payload.get("worker_spawned", False)},
    )


def resolve_workspace_path(workspace_dir: Path, value: Any) -> Path:
    raw = Path(str(value))
    if raw.is_absolute():
        return raw
    return workspace_dir / raw


def route_watcher(
    operation: dict[str, Any],
    *,
    mode: str,
    workspace_dir: Path,
    control_run_id: str,
    prior_dry_run_ids: set[str],
) -> dict[str, Any]:
    del prior_dry_run_ids  # watcher dry-runs do not currently use apply gating in S02
    if mode == "apply":
        return registry_entry(
            operation,
            mode=mode,
            lane="watcher",
            status="rejected",
            evidence_path=None,
            control_run_id=control_run_id,
            rejection_reasons=["watcher apply is not enabled by the S02 unified entrypoint"],
        )
    payload = operation.get("payload") if isinstance(operation.get("payload"), dict) else {}
    op_id = str(operation.get("operation_id") or "operation")
    watcher_id = str(payload.get("watcher_name") or payload.get("watcher_id") or op_id)
    source_path = resolve_workspace_path(workspace_dir, payload.get("source_path", ""))
    state_path = resolve_workspace_path(workspace_dir, payload.get("watermark_path", f"watcher-state/{watcher_id}.json"))
    output_limit_chars = int(payload.get("output_limit_chars", 500) or 500)
    mod = watcher_module()
    try:
        events, evidence = mod.watch_jsonl_source(source_path, state_path, watcher_id, output_limit_chars=output_limit_chars)
        status = "dry_run_passed"
        reasons: list[str] = []
    except Exception as exc:  # keep control registry bounded even if watcher fixture is wrong
        events = []
        evidence = {
            "schema_version": "hermes-cockpit.watcher-evidence.v1",
            "watcher_id": watcher_id,
            "status": "rejected",
            "rejection_reasons": [str(exc)],
            "source_path": str(source_path),
            "state_path": str(state_path),
            "non_claims": {"no_direct_writeback": True, "no_worker_dispatch": True, "no_public_agent_loop": True},
        }
        status = "rejected"
        reasons = [str(exc)]
    path = evidence_dir_for(workspace_dir / "control-registry.jsonl", workspace_dir) / f"{op_id}-watcher-evidence.json"
    write_json(path, {"evidence": evidence, "events": events})
    return registry_entry(
        operation,
        mode=mode,
        lane="watcher",
        status=status,
        evidence_path=str(path),
        control_run_id=control_run_id,
        source_mutated=False,
        target_mutated=False,
        rejection_reasons=reasons,
        detail={"event_count": len(events), "watcher_status": evidence.get("status")},
    )


def reject_operation(operation: dict[str, Any], *, mode: str, control_run_id: str, reasons: list[str]) -> dict[str, Any]:
    return registry_entry(
        operation,
        mode=mode,
        lane="rejected",
        status="rejected",
        evidence_path=None,
        control_run_id=control_run_id,
        rejection_reasons=reasons,
    )


def run_control_operations(
    operations: list[dict[str, Any]],
    *,
    mode: str,
    registry_path: str | Path,
    workspace_dir: str | Path,
    prior_registry: list[dict[str, Any]] | None = None,
    runner: Callable[..., Any] | None = None,
) -> list[dict[str, Any]]:
    if mode not in {"dry-run", "apply"}:
        raise ValueError("mode must be dry-run or apply")
    registry = Path(registry_path)
    workspace = Path(workspace_dir)
    workspace.mkdir(parents=True, exist_ok=True)
    control_run_id = f"control_{utc_now().replace(':', '').replace('-', '').replace('Z', 'Z')}"
    prior_entries = prior_registry if prior_registry is not None else load_registry(registry)
    prior_ids = dry_run_ids_from_registry(prior_entries)
    run = runner or dispatch_module().run_subprocess

    entries: list[dict[str, Any]] = []
    for operation in operations:
        lane = operation_lane(operation)
        if operation.get("schema_version") != OPERATION_SCHEMA_VERSION:
            entries.append(reject_operation(operation, mode=mode, control_run_id=control_run_id, reasons=["operation schema_version must be hermes-cockpit.operation.v1"]))
            continue
        operation_id = operation.get("operation_id")
        if not isinstance(operation_id, str) or not operation_id:
            entries.append(reject_operation(operation, mode=mode, control_run_id=control_run_id, reasons=["operation_id is required"]))
            continue
        if mode == "apply" and operation_id not in prior_ids:
            entries.append(reject_operation(operation, mode=mode, control_run_id=control_run_id, reasons=["apply requires matching dry-run evidence for the same operation_id"]))
            continue
        if lane == "writeback":
            entries.append(route_writeback(operation, mode=mode, workspace_dir=workspace, control_run_id=control_run_id, prior_dry_run_ids=prior_ids, runner=run))
        elif lane == "dispatch":
            entries.append(route_dispatch(operation, mode=mode, workspace_dir=workspace, control_run_id=control_run_id, prior_dry_run_ids=prior_ids, runner=run))
        elif lane == "watcher":
            entries.append(route_watcher(operation, mode=mode, workspace_dir=workspace, control_run_id=control_run_id, prior_dry_run_ids=prior_ids))
        else:
            entries.append(reject_operation(operation, mode=mode, control_run_id=control_run_id, reasons=[f"unsupported operation_type {operation.get('operation_type')!r}"]))

    append_registry(registry, entries)
    return entries


def status_snapshot(registry_path: str | Path) -> dict[str, Any]:
    entries = load_registry(registry_path)
    summary = {
        "entry_count": len(entries),
        "dry_run_passed_count": sum(1 for row in entries if row.get("status") == "dry_run_passed"),
        "applied_count": sum(1 for row in entries if row.get("status") in {"applied", "completed"}),
        "rejected_count": sum(1 for row in entries if row.get("status") == "rejected"),
    }
    return {
        "schema_version": STATUS_SCHEMA_VERSION,
        "generated_at": utc_now(),
        "registry_path": str(registry_path),
        "entries": entries,
        "summary": summary,
    }


def is_relative_to(child: Path, parent: Path) -> bool:
    try:
        child.relative_to(parent)
    except ValueError:
        return False
    return True


def validate_control_paths(operations_path: Path | None, registry_path: Path, workspace_dir: Path) -> None:
    registry = registry_path.expanduser().resolve(strict=False)
    workspace = workspace_dir.expanduser().resolve(strict=False)
    hermes_runtime = (Path.home() / ".hermes").resolve(strict=False)
    if operations_path is not None:
        operations = operations_path.expanduser().resolve(strict=False)
        if registry == operations:
            raise ValueError(f"refusing to write registry over source operations: {operations_path}")
        if workspace == operations:
            raise ValueError(f"refusing to use source operations as workspace directory: {operations_path}")
    if workspace == registry:
        raise ValueError(f"refusing to use registry as workspace directory: {registry_path}")
    if is_relative_to(registry, hermes_runtime) or is_relative_to(workspace, hermes_runtime):
        raise ValueError("refusing to write control artifacts inside Hermes runtime directory")
    if workspace.exists() and not workspace.is_dir():
        raise ValueError(f"refusing to use non-directory workspace path: {workspace_dir}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Unified Hermes Cockpit operator control entrypoint")
    sub = parser.add_subparsers(dest="command", required=True)
    for name in ("dry-run", "apply"):
        cmd = sub.add_parser(name, help=f"Run control operations in {name} mode")
        cmd.add_argument("--operations", required=True, type=Path)
        cmd.add_argument("--registry", required=True, type=Path)
        cmd.add_argument("--workspace", required=True, type=Path)
    status = sub.add_parser("status", help="Print control registry status JSON")
    status.add_argument("--registry", required=True, type=Path)
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        if args.command == "status":
            validate_control_paths(None, args.registry, args.registry.parent)
            print(json.dumps(status_snapshot(args.registry), indent=2, sort_keys=True))
            return 0
        validate_control_paths(args.operations, args.registry, args.workspace)
        operations = load_operations(args.operations)
        prior = load_registry(args.registry) if args.command == "apply" else None
        entries = run_control_operations(
            operations,
            mode=args.command,
            registry_path=args.registry,
            workspace_dir=args.workspace,
            prior_registry=prior,
        )
        rejected = sum(1 for entry in entries if entry.get("status") == "rejected")
        print(json.dumps({"schema_version": STATUS_SCHEMA_VERSION, "mode": args.command, "entry_count": len(entries), "rejected_count": rejected}, sort_keys=True))
        return 0 if args.command == "dry-run" or rejected == 0 else 1
    except Exception as exc:
        print(f"refusing control operation: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
