#!/usr/bin/env python3
"""Author: Migi
Date: 2026-05-17
Summary: Read-only Hermes Kanban board adapter for Hermes Cockpit projections.

This adapter intentionally shells out only to `hermes kanban ... list --json` or
reads an explicit fixture file. It never mutates Kanban/GSD state. The emitted
JSON is shaped like the static Cockpit projection so the Ratatui prototype can
render live board/card data without becoming a control plane.
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import subprocess
import sys
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Sequence

PROJECTION_VERSION = "hermes-cockpit.kanban-projection.v1"
SCHEMA_VERSION = "hermes-cockpit.event.v1"
READ_ONLY_COMMAND_VERBS = {"list", "ls"}


def utc_now() -> str:
    return dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def epoch_to_iso(value: Any) -> Optional[str]:
    if value is None:
        return None
    try:
        timestamp = float(value)
    except (TypeError, ValueError):
        return str(value)
    return dt.datetime.fromtimestamp(timestamp, tz=dt.timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def task_id(card: Dict[str, Any]) -> str:
    return str(card.get("id") or card.get("task_id") or "unknown-task")


def card_title(card: Dict[str, Any]) -> str:
    return str(card.get("title") or card.get("card_title") or task_id(card))


def card_status(card: Dict[str, Any]) -> str:
    return str(card.get("status") or "unknown")


def read_cards_from_file(path: Path) -> List[Dict[str, Any]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(data, dict) and isinstance(data.get("cards"), list):
        data = data["cards"]
    if not isinstance(data, list):
        raise ValueError(f"{path} must contain a card list or an object with a cards list")
    cards: List[Dict[str, Any]] = []
    for index, item in enumerate(data):
        if not isinstance(item, dict):
            raise ValueError(f"card at index {index} is not an object")
        cards.append(item)
    return cards


def read_cards_from_kanban(board: str, hermes_bin: str = "hermes") -> tuple[List[Dict[str, Any]], str]:
    command = [hermes_bin, "kanban", "--board", board, "list", "--json"]
    assert command[4] in READ_ONLY_COMMAND_VERBS
    completed = subprocess.run(command, text=True, capture_output=True, check=True)
    data = json.loads(completed.stdout)
    if not isinstance(data, list):
        raise ValueError("kanban list --json returned non-list JSON")
    return data, " ".join(command)


def project_cards(cards: Iterable[Dict[str, Any]], *, board: str, source_command: str, generated_at: Optional[str] = None) -> Dict[str, Any]:
    generated_at = generated_at or utc_now()
    card_list = list(cards)
    projected_cards: List[Dict[str, Any]] = []
    active_runs: List[Dict[str, Any]] = []
    completed_runs: List[Dict[str, Any]] = []
    warnings: List[Dict[str, Any]] = []
    replay: List[Dict[str, Any]] = []

    for sequence, card in enumerate(card_list, start=1):
        tid = task_id(card)
        title = card_title(card)
        status = card_status(card)
        created_at = epoch_to_iso(card.get("created_at"))
        completed_at = epoch_to_iso(card.get("completed_at"))
        last_event_ts = completed_at or created_at or generated_at
        run_id = f"kanban-{board}-{tid}"
        warning_count = 1 if status in {"blocked", "failed"} else 0

        projected_card = {
            "task_id": tid,
            "board": board,
            "title": title,
            "status": status,
            "assignee": card.get("assignee"),
            "priority": card.get("priority", 0),
            "first_event_ts": created_at,
            "last_event_ts": last_event_ts,
            "runs": [run_id],
            "artifacts": [],
            "warning_count": warning_count,
            "approval_required_count": 0,
            "approval_recorded_count": 0,
            "trust_counts": {"verified": 1},
        }
        projected_cards.append(projected_card)

        run = {
            "run_id": run_id,
            "task_id": tid,
            "agent_id": card.get("assignee") or "kanban-board",
            "actor": card.get("created_by") or "kanban",
            "status": status,
            "started_at": created_at,
            "completed_at": completed_at,
            "last_event_ts": last_event_ts,
            "goal": title,
            "outcome": card.get("result"),
            "events": [f"evt-kanban-{tid}"],
        }
        if status in {"done", "complete", "completed", "skipped", "archived"}:
            completed_runs.append(run)
        else:
            active_runs.append(run)

        if warning_count:
            warnings.append(
                {
                    "event_id": f"evt-kanban-{tid}",
                    "task_id": tid,
                    "run_id": run_id,
                    "severity": "warning",
                    "message": f"Kanban card {tid} is {status}.",
                    "action": "Inspect the card in GSD/Hermes Kanban before continuing.",
                    "evidence_state": "board_status_checked",
                    "evidence_uri": f"kanban://{board}/{tid}",
                }
            )

        replay.append(
            {
                "event_id": f"evt-kanban-{tid}",
                "ts": last_event_ts,
                "schema_version": SCHEMA_VERSION,
                "source": "kanban",
                "event_type": "kanban_card_observed",
                "actor": "kanban-board",
                "task_id": tid,
                "run_id": run_id,
                "agent_id": card.get("assignee") or "kanban-board",
                "artifact_uri": None,
                "evidence_uri": f"kanban://{board}/{tid}",
                "trust": {
                    "status": "verified",
                    "evidence_state": "board_readback",
                    "confidence": 1.0,
                    "reason": "Observed through read-only hermes kanban list --json output.",
                },
                "payload": {
                    "board": board,
                    "card_title": title,
                    "status": status,
                    "assignee": card.get("assignee"),
                },
                "replay": {
                    "stream": f"kanban-{board}",
                    "sequence": sequence,
                    "visible": True,
                    "checkpoint": True,
                    "summary": f"Observed {status} Kanban card: {title}",
                    "caused_by": None,
                },
                "summary": f"Observed {status} Kanban card: {title}",
            }
        )

    return {
        "projection_version": PROJECTION_VERSION,
        "schema_version": SCHEMA_VERSION,
        "generated_at": generated_at,
        "source": {
            "kind": "hermes-kanban",
            "mode": "read-only",
            "board": board,
            "command": source_command,
            "card_count": len(projected_cards),
        },
        "source_file": None,
        "event_count": len(replay),
        "cards": projected_cards,
        "active_runs": active_runs,
        "completed_runs": completed_runs,
        "artifacts": [],
        "warnings": warnings,
        "approvals": {"pending": [], "recorded": [], "required": []},
        "replay": replay,
    }


def write_projection(projection: Dict[str, Any], output: Optional[Path]) -> None:
    rendered = json.dumps(projection, indent=2, sort_keys=True)
    if output is None:
        print(rendered)
        return
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(rendered + "\n", encoding="utf-8")


def parse_args(argv: Optional[Sequence[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate a read-only Hermes Cockpit projection from a Hermes Kanban board.")
    parser.add_argument("--board", default="hermes-cockpit-trial", help="Kanban board slug to read")
    parser.add_argument("--output", "-o", type=Path, help="Projection JSON output path; stdout when omitted")
    parser.add_argument("--input", type=Path, help="Optional fixture JSON of cards; skips the Hermes CLI when set")
    parser.add_argument("--hermes-bin", default="hermes", help="Hermes CLI binary name/path")
    return parser.parse_args(argv)


def main(argv: Optional[Sequence[str]] = None) -> int:
    args = parse_args(argv)
    if args.input:
        cards = read_cards_from_file(args.input)
        source_command = f"fixture:{args.input}"
    else:
        cards, source_command = read_cards_from_kanban(args.board, args.hermes_bin)
    projection = project_cards(cards, board=args.board, source_command=source_command)
    write_projection(projection, args.output)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (subprocess.CalledProcessError, ValueError, OSError, json.JSONDecodeError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1)
