#!/usr/bin/env python3
"""Durable no-agent watcher controls for Hermes Cockpit M012/S05.

This wrapper controls the existing watermark watcher without introducing an LLM
or public agent loop. It stores an explicit config, runs one bounded poll on
demand, stays silent on baseline/no-change, writes one notification per observed
change event, and supports pause/remove cleanup evidence.
"""

from __future__ import annotations

import argparse
import importlib.util
import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

CONFIG_SCHEMA = "hermes-cockpit.watcher-control.v1"
EVIDENCE_SCHEMA = "hermes-cockpit.watcher-control-evidence.v1"
NOTIFICATION_SCHEMA = "hermes-cockpit.watcher-notification.v1"
ROOT = Path(__file__).resolve().parents[1]


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def watch_module() -> Any:
    path = ROOT / "scripts" / "hermes-cockpit-watch.py"
    spec = importlib.util.spec_from_file_location("hermes_cockpit_watch", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"unable to load watcher adapter from {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def append_jsonl(path: Path, rows: list[dict[str, Any]]) -> None:
    if not rows:
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, sort_keys=True, separators=(",", ":")) + "\n")


def load_config(config_path: str | Path) -> dict[str, Any]:
    path = Path(config_path)
    parsed = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(parsed, dict):
        raise ValueError("watcher config must be a JSON object")
    if parsed.get("schema_version") != CONFIG_SCHEMA:
        raise ValueError(f"unsupported watcher config schema {parsed.get('schema_version')!r}")
    return parsed


def save_config(config_path: str | Path, config: dict[str, Any]) -> None:
    write_json(Path(config_path), config)


def non_claims() -> dict[str, bool]:
    return {
        "no_agent_llm_run": True,
        "no_public_agent_loop": True,
        "no_direct_writeback": True,
        "no_worker_dispatch": True,
        "no_production_readiness": True,
    }


def evidence_payload(*, status: str, config_path: Path, watcher_id: str, detail: dict[str, Any] | None = None) -> dict[str, Any]:
    payload = {
        "schema_version": EVIDENCE_SCHEMA,
        "status": status,
        "watcher_id": watcher_id,
        "config_path": str(config_path),
        "created_at": utc_now(),
        "non_claims": non_claims(),
    }
    if detail:
        payload.update(detail)
    return payload


def install_watcher(
    *,
    config_path: str | Path,
    source_path: str | Path,
    state_path: str | Path,
    events_output: str | Path,
    evidence_output: str | Path,
    notifications_output: str | Path,
    watcher_id: str,
    output_limit_chars: int = 80,
    max_watermark_ids: int = 500,
) -> dict[str, Any]:
    config_file = Path(config_path)
    config = {
        "schema_version": CONFIG_SCHEMA,
        "watcher_id": watcher_id,
        "enabled": True,
        "no_agent": True,
        "source_path": str(source_path),
        "state_path": str(state_path),
        "events_output": str(events_output),
        "evidence_output": str(evidence_output),
        "notifications_output": str(notifications_output),
        "output_limit_chars": int(output_limit_chars),
        "max_watermark_ids": int(max_watermark_ids),
        "installed_at": utc_now(),
        "non_claims": non_claims(),
    }
    save_config(config_file, config)
    evidence = evidence_payload(
        status="installed",
        config_path=config_file,
        watcher_id=watcher_id,
        detail={
            "enabled": True,
            "no_agent": True,
            "source_path": str(source_path),
            "state_path": str(state_path),
            "events_output": str(events_output),
            "notifications_output": str(notifications_output),
        },
    )
    write_json(Path(evidence_output), evidence)
    return evidence


def notification_from_event(event: dict[str, Any], *, watcher_id: str, output_limit_chars: int) -> dict[str, Any]:
    payload = event.get("payload") if isinstance(event.get("payload"), dict) else {}
    row_id = str(payload.get("row_id") or event.get("id") or "row")
    summary = f"observed {row_id}"
    if len(summary) > output_limit_chars:
        summary = summary[: max(0, output_limit_chars - 1)] + "…"
    return {
        "schema_version": NOTIFICATION_SCHEMA,
        "watcher_id": watcher_id,
        "event_id": event.get("id"),
        "row_id": row_id,
        "summary": summary,
        "source_body_excluded": True,
        "created_at": utc_now(),
        "non_claims": non_claims(),
    }


def run_once(config_path: str | Path) -> dict[str, Any]:
    config_file = Path(config_path)
    config = load_config(config_file)
    watcher_id = str(config["watcher_id"])
    evidence_output = Path(config["evidence_output"])
    events_output = Path(config["events_output"])
    notifications_output = Path(config["notifications_output"])

    if not bool(config.get("enabled", False)):
        evidence = evidence_payload(
            status="paused",
            config_path=config_file,
            watcher_id=watcher_id,
            detail={"notification_count": 0, "enabled": False},
        )
        write_json(evidence_output, evidence)
        return {**evidence, "notification_count": 0}

    mod = watch_module()
    events, watcher_evidence = mod.watch_jsonl_source(
        config["source_path"],
        config["state_path"],
        watcher_id,
        output_limit_chars=int(config.get("output_limit_chars", 80)),
        max_watermark_ids=int(config.get("max_watermark_ids", 500)),
    )
    mod.write_events(events_output, events)
    mod.write_evidence(evidence_output, watcher_evidence)

    notifications = [
        notification_from_event(event, watcher_id=watcher_id, output_limit_chars=int(config.get("output_limit_chars", 80)))
        for event in events
    ]
    append_jsonl(notifications_output, notifications)
    evidence = evidence_payload(
        status=str(watcher_evidence.get("status")),
        config_path=config_file,
        watcher_id=watcher_id,
        detail={
            "watcher_evidence": watcher_evidence,
            "event_count": len(events),
            "notification_count": len(notifications),
            "notifications_output": str(notifications_output),
            "events_output": str(events_output),
        },
    )
    write_json(evidence_output, evidence)
    return evidence


def pause_watcher(config_path: str | Path) -> dict[str, Any]:
    config_file = Path(config_path)
    config = load_config(config_file)
    config["enabled"] = False
    config["paused_at"] = utc_now()
    save_config(config_file, config)
    evidence = evidence_payload(
        status="paused",
        config_path=config_file,
        watcher_id=str(config["watcher_id"]),
        detail={"enabled": False, "notification_count": 0},
    )
    write_json(Path(config["evidence_output"]), evidence)
    return evidence


def remove_watcher(config_path: str | Path) -> dict[str, Any]:
    config_file = Path(config_path)
    config = load_config(config_file)
    watcher_id = str(config["watcher_id"])
    state_path = Path(config["state_path"])
    evidence_output = Path(config["evidence_output"])
    config_existed = config_file.exists()
    state_existed = state_path.exists()
    if state_path.exists():
        state_path.unlink()
    if config_file.exists():
        config_file.unlink()
    evidence = evidence_payload(
        status="removed",
        config_path=config_file,
        watcher_id=watcher_id,
        detail={
            "config_removed": config_existed,
            "state_removed": state_existed,
            "state_path": str(state_path),
            "notification_count": 0,
        },
    )
    write_json(evidence_output, evidence)
    return evidence


def status_watcher(config_path: str | Path) -> dict[str, Any]:
    config_file = Path(config_path)
    config = load_config(config_file)
    state = Path(config["state_path"])
    notifications = Path(config["notifications_output"])
    return evidence_payload(
        status="enabled" if config.get("enabled") else "paused",
        config_path=config_file,
        watcher_id=str(config["watcher_id"]),
        detail={
            "enabled": bool(config.get("enabled")),
            "state_exists": state.exists(),
            "notification_count": sum(1 for line in notifications.read_text(encoding="utf-8").splitlines() if line.strip()) if notifications.exists() else 0,
        },
    )


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Control a no-agent Hermes Cockpit watcher")
    sub = parser.add_subparsers(dest="command", required=True)

    install = sub.add_parser("install")
    install.add_argument("--config", required=True, type=Path)
    install.add_argument("--source", required=True, type=Path)
    install.add_argument("--state", required=True, type=Path)
    install.add_argument("--events-output", required=True, type=Path)
    install.add_argument("--evidence-output", required=True, type=Path)
    install.add_argument("--notifications-output", required=True, type=Path)
    install.add_argument("--watcher-id", required=True)
    install.add_argument("--output-limit-chars", type=int, default=80)
    install.add_argument("--max-watermark-ids", type=int, default=500)

    for name in ("run-once", "pause", "remove", "status"):
        cmd = sub.add_parser(name)
        cmd.add_argument("--config", required=True, type=Path)
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        if args.command == "install":
            evidence = install_watcher(
                config_path=args.config,
                source_path=args.source,
                state_path=args.state,
                events_output=args.events_output,
                evidence_output=args.evidence_output,
                notifications_output=args.notifications_output,
                watcher_id=args.watcher_id,
                output_limit_chars=args.output_limit_chars,
                max_watermark_ids=args.max_watermark_ids,
            )
            print(json.dumps(evidence, sort_keys=True))
        elif args.command == "run-once":
            evidence = run_once(args.config)
            if int(evidence.get("notification_count", 0)) > 0:
                notifications_path = Path(load_config(args.config)["notifications_output"])
                last = [line for line in notifications_path.read_text(encoding="utf-8").splitlines() if line.strip()][-1]
                print(last)
        elif args.command == "pause":
            print(json.dumps(pause_watcher(args.config), sort_keys=True))
        elif args.command == "remove":
            print(json.dumps(remove_watcher(args.config), sort_keys=True))
        elif args.command == "status":
            print(json.dumps(status_watcher(args.config), sort_keys=True))
        return 0
    except Exception as exc:
        print(f"watcher control failed: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
