#!/usr/bin/env python3
"""Project Hermes Cockpit flight-recorder NDJSON into read-only UI state.

The projection is intentionally conservative: GSD/Hermes Kanban remains the
source of truth for durable card state. This script only summarizes observed
cards, runs, artifacts, warnings, approvals, and replay entries from an
append-only event file.
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from pathlib import Path
from typing import Any, Dict, Iterable, List, MutableMapping, Optional, Tuple

REQUIRED_FIELDS = (
    "id",
    "ts",
    "schema_version",
    "source",
    "event_type",
    "actor",
    "task_id",
    "run_id",
    "agent_id",
    "artifact_uri",
    "evidence_uri",
    "trust",
    "payload",
    "replay",
)

TERMINAL_RUN_EVENTS = {
    "run_completed": "completed",
    "run_failed": "failed",
    "run_cancelled": "cancelled",
}

DEFAULT_SCHEMA_VERSION = "hermes-cockpit.event.v1"


def repo_root() -> Path:
    """Return the repository root for the checked-in script location."""
    return Path(__file__).resolve().parents[1]


def default_input_path() -> Path:
    return repo_root() / "docs" / "hermes-cockpit" / "sample-google-pitch-run.ndjson"


def event_sort_key(event: Dict[str, Any]) -> Tuple[int, str, str]:
    replay = event.get("replay") if isinstance(event.get("replay"), dict) else {}
    sequence = replay.get("sequence")
    if not isinstance(sequence, int):
        sequence = 10**12
    return sequence, str(event.get("ts", "")), str(event.get("id", ""))


def require_event_shape(event: Dict[str, Any], line_number: int) -> None:
    missing = [field for field in REQUIRED_FIELDS if field not in event]
    if missing:
        raise ValueError(f"line {line_number}: missing required field(s): {', '.join(missing)}")
    if not isinstance(event.get("payload"), dict):
        raise ValueError(f"line {line_number}: payload must be an object")
    if not isinstance(event.get("replay"), dict):
        raise ValueError(f"line {line_number}: replay must be an object")
    if not isinstance(event.get("trust"), dict):
        raise ValueError(f"line {line_number}: trust must be an object")


def load_events(path: Path) -> List[Dict[str, Any]]:
    events: List[Dict[str, Any]] = []
    seen_ids = set()
    with path.open("r", encoding="utf-8") as handle:
        for line_number, raw_line in enumerate(handle, start=1):
            line = raw_line.strip()
            if not line:
                continue
            try:
                event = json.loads(line)
            except json.JSONDecodeError as exc:
                raise ValueError(f"line {line_number}: invalid JSON: {exc}") from exc
            if not isinstance(event, dict):
                raise ValueError(f"line {line_number}: event must be a JSON object")
            require_event_shape(event, line_number)
            event_id = event["id"]
            if event_id in seen_ids:
                raise ValueError(f"line {line_number}: duplicate event id {event_id!r}")
            seen_ids.add(event_id)
            events.append(event)
    return sorted(events, key=event_sort_key)


def trust_status(event: Dict[str, Any]) -> str:
    trust = event.get("trust")
    if isinstance(trust, dict):
        status = trust.get("status")
        return str(status) if status is not None else "unknown"
    if isinstance(trust, str):
        return trust
    return "unknown"


def evidence_state(event: Dict[str, Any]) -> str:
    trust = event.get("trust")
    if isinstance(trust, dict):
        state = trust.get("evidence_state")
        return str(state) if state is not None else "unknown"
    return "unknown"


def payload_text(payload: Dict[str, Any], *keys: str, default: str = "") -> str:
    for key in keys:
        value = payload.get(key)
        if value is not None:
            return str(value)
    return default


def ensure_card(cards: MutableMapping[str, Dict[str, Any]], event: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    task_id = event.get("task_id")
    if not task_id:
        return None
    payload = event.get("payload", {})
    card = cards.setdefault(
        str(task_id),
        {
            "task_id": str(task_id),
            "board": payload.get("board"),
            "title": payload.get("card_title") or payload.get("task_title") or str(task_id),
            "first_event_ts": event.get("ts"),
            "last_event_ts": event.get("ts"),
            "runs": [],
            "artifacts": [],
            "warning_count": 0,
            "approval_required_count": 0,
            "approval_recorded_count": 0,
            "trust_counts": Counter(),
        },
    )
    if payload.get("board") and not card.get("board"):
        card["board"] = payload.get("board")
    if payload.get("card_title") and (card.get("title") == str(task_id) or not card.get("title")):
        card["title"] = payload.get("card_title")
    card["last_event_ts"] = event.get("ts")
    card["trust_counts"][trust_status(event)] += 1
    return card


def append_unique(target: List[str], value: Optional[str]) -> None:
    if value and value not in target:
        target.append(value)


def project(events: Iterable[Dict[str, Any]], source_file: Optional[Path] = None) -> Dict[str, Any]:
    cards: Dict[str, Dict[str, Any]] = {}
    runs: Dict[str, Dict[str, Any]] = {}
    artifacts: Dict[str, Dict[str, Any]] = {}
    warnings: List[Dict[str, Any]] = []
    approvals_required: List[Dict[str, Any]] = []
    approvals_recorded: List[Dict[str, Any]] = []
    replay_entries: List[Dict[str, Any]] = []

    ordered_events = list(events)
    for event in ordered_events:
        payload = event.get("payload", {})
        event_type = str(event.get("event_type"))
        task_id = event.get("task_id")
        run_id = event.get("run_id")
        artifact_uri = event.get("artifact_uri")
        card = ensure_card(cards, event)

        if run_id:
            run = runs.setdefault(
                str(run_id),
                {
                    "run_id": str(run_id),
                    "task_id": task_id,
                    "agent_id": event.get("agent_id"),
                    "actor": event.get("actor"),
                    "status": "observed",
                    "started_at": None,
                    "completed_at": None,
                    "last_event_ts": event.get("ts"),
                    "goal": None,
                    "outcome": None,
                    "events": [],
                },
            )
            append_unique(run["events"], event.get("id"))
            run["last_event_ts"] = event.get("ts")
            if not run.get("task_id") and task_id:
                run["task_id"] = task_id
            if not run.get("agent_id") and event.get("agent_id"):
                run["agent_id"] = event.get("agent_id")
            if event_type == "run_started":
                run["status"] = "active"
                run["started_at"] = event.get("ts")
                run["goal"] = payload.get("run_goal") or run.get("goal")
            elif event_type in TERMINAL_RUN_EVENTS:
                run["status"] = payload.get("status") or TERMINAL_RUN_EVENTS[event_type]
                run["completed_at"] = event.get("ts")
                run["outcome"] = payload.get("outcome") or run.get("outcome")
            if card is not None:
                append_unique(card["runs"], str(run_id))

        if artifact_uri:
            artifact = artifacts.setdefault(
                str(artifact_uri),
                {
                    "artifact_uri": str(artifact_uri),
                    "task_id": task_id,
                    "run_id": run_id,
                    "name": payload.get("artifact_name") or Path(str(artifact_uri)).name,
                    "kind": payload.get("artifact_kind"),
                    "summary": payload.get("summary"),
                    "created_at": None,
                    "last_event_ts": event.get("ts"),
                    "trust_status": trust_status(event),
                    "evidence_state": evidence_state(event),
                    "evidence_uri": event.get("evidence_uri"),
                    "approval_state": "none",
                    "approval_id": None,
                },
            )
            artifact["last_event_ts"] = event.get("ts")
            artifact["trust_status"] = trust_status(event)
            artifact["evidence_state"] = evidence_state(event)
            if event.get("evidence_uri"):
                artifact["evidence_uri"] = event.get("evidence_uri")
            if event_type == "artifact_created":
                artifact["created_at"] = event.get("ts")
                artifact["name"] = payload.get("artifact_name") or artifact.get("name")
                artifact["kind"] = payload.get("artifact_kind") or artifact.get("kind")
                artifact["summary"] = payload.get("summary") or artifact.get("summary")
            if event_type == "approval_required":
                artifact["approval_state"] = "required"
                artifact["approval_id"] = payload.get("approval_id")
            elif event_type == "approval_recorded":
                decision = str(payload.get("decision", "recorded"))
                artifact["approval_state"] = decision
                artifact["approval_id"] = payload.get("approval_id")
            if card is not None:
                append_unique(card["artifacts"], str(artifact_uri))

        if event_type == "trust_flagged" or trust_status(event) == "rejected":
            warnings.append(
                {
                    "event_id": event.get("id"),
                    "ts": event.get("ts"),
                    "task_id": task_id,
                    "run_id": run_id,
                    "claim_id": payload.get("claim_id"),
                    "severity": payload.get("severity", "warning"),
                    "message": payload_text(payload, "summary", "claim", "reason", default="Trust warning"),
                    "action": payload.get("action"),
                    "evidence_uri": event.get("evidence_uri"),
                    "trust_status": trust_status(event),
                    "evidence_state": evidence_state(event),
                }
            )
            if card is not None:
                card["warning_count"] += 1

        if event_type == "approval_required":
            item = {
                "event_id": event.get("id"),
                "ts": event.get("ts"),
                "approval_id": payload.get("approval_id"),
                "task_id": task_id,
                "run_id": run_id,
                "artifact_uri": artifact_uri,
                "approver": payload.get("approver"),
                "reason": payload.get("reason"),
                "decision_options": payload.get("decision_options", []),
            }
            approvals_required.append(item)
            if card is not None:
                card["approval_required_count"] += 1
        elif event_type == "approval_recorded":
            item = {
                "event_id": event.get("id"),
                "ts": event.get("ts"),
                "approval_id": payload.get("approval_id"),
                "task_id": task_id,
                "run_id": run_id,
                "artifact_uri": artifact_uri,
                "decision": payload.get("decision"),
                "approved_by": payload.get("approved_by") or event.get("actor"),
                "conditions": payload.get("conditions", []),
            }
            approvals_recorded.append(item)
            if card is not None:
                card["approval_recorded_count"] += 1

        replay = event.get("replay", {})
        if replay.get("visible", True):
            replay_entries.append(
                {
                    "sequence": replay.get("sequence"),
                    "event_id": event.get("id"),
                    "ts": event.get("ts"),
                    "event_type": event_type,
                    "task_id": task_id,
                    "run_id": run_id,
                    "actor": event.get("actor"),
                    "summary": replay.get("summary"),
                    "checkpoint": bool(replay.get("checkpoint", False)),
                    "caused_by": replay.get("caused_by"),
                }
            )

    recorded_ids = {item.get("approval_id") for item in approvals_recorded if item.get("approval_id")}
    pending_approvals = [
        item for item in approvals_required if item.get("approval_id") not in recorded_ids
    ]

    card_list: List[Dict[str, Any]] = []
    for card in sorted(cards.values(), key=lambda c: c["task_id"]):
        trust_counts = dict(sorted(card.pop("trust_counts").items()))
        card_list.append({**card, "trust_counts": trust_counts})

    active_runs = [
        run for run in runs.values() if str(run.get("status")) not in {"completed", "failed", "cancelled"}
    ]
    completed_runs = [
        run for run in runs.values() if str(run.get("status")) in {"completed", "failed", "cancelled"}
    ]

    return {
        "projection_version": "hermes-cockpit.projection.v1",
        "source_file": str(source_file) if source_file else None,
        "schema_version": DEFAULT_SCHEMA_VERSION,
        "event_count": len(ordered_events),
        "cards": card_list,
        "active_runs": sorted(active_runs, key=lambda r: (str(r.get("started_at")), r["run_id"])),
        "completed_runs": sorted(completed_runs, key=lambda r: (str(r.get("completed_at")), r["run_id"])),
        "artifacts": sorted(artifacts.values(), key=lambda a: a["artifact_uri"]),
        "warnings": warnings,
        "approvals": {
            "required": approvals_required,
            "recorded": approvals_recorded,
            "pending": pending_approvals,
        },
        "replay": sorted(replay_entries, key=lambda r: (r.get("sequence") if isinstance(r.get("sequence"), int) else 10**12, str(r.get("ts")), str(r.get("event_id")))),
    }


def parse_args(argv: Optional[List[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "input",
        nargs="?",
        type=Path,
        default=default_input_path(),
        help="NDJSON event file to project (default: docs/hermes-cockpit/sample-google-pitch-run.ndjson)",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        help="Write projection JSON to this file instead of stdout.",
    )
    parser.add_argument(
        "--compact",
        action="store_true",
        help="Emit compact JSON instead of pretty-printed JSON.",
    )
    return parser.parse_args(argv)


def main(argv: Optional[List[str]] = None) -> int:
    args = parse_args(argv)
    input_path = args.input
    try:
        events = load_events(input_path)
        projection = project(events, source_file=input_path)
        if args.compact:
            output = json.dumps(projection, sort_keys=True, separators=(",", ":")) + "\n"
        else:
            output = json.dumps(projection, indent=2, sort_keys=True) + "\n"
        if args.output:
            args.output.parent.mkdir(parents=True, exist_ok=True)
            args.output.write_text(output, encoding="utf-8")
        else:
            sys.stdout.write(output)
    except (OSError, ValueError) as exc:
        print(f"hermes-cockpit-project: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
