#!/usr/bin/env python3
"""Shared runtime guards and metadata logging for office-agent deliverables."""

from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


class OfficeRuntimeGuardError(RuntimeError):
    """Raised when a runtime output violates canonical office-agent rules."""


WORKSPACE_ROOT = Path(__file__).resolve().parents[3]
OFFICE_AGENTS_ROOT = WORKSPACE_ROOT / "settlemint-office-agents"


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def canonical_agent_output_dir(agent_slug: str) -> Path:
    return (OFFICE_AGENTS_ROOT / agent_slug / "output").resolve()


def assert_output_within_agent(agent_slug: str, output_path: str | Path) -> Path:
    resolved_output = Path(output_path).expanduser().resolve()
    canonical_root = canonical_agent_output_dir(agent_slug)
    try:
        resolved_output.relative_to(canonical_root)
    except ValueError as exc:
        raise OfficeRuntimeGuardError(
            f"Refusing to write outside canonical {agent_slug} output root. "
            f"Requested: {resolved_output} | Allowed root: {canonical_root}"
        ) from exc
    return resolved_output


def detect_model_context(explicit: dict[str, Any] | None = None) -> dict[str, Any]:
    env = os.environ
    selected_model = (
        env.get("OPENCLAW_MODEL")
        or env.get("MODEL")
        or env.get("OPENAI_MODEL")
        or env.get("ANTHROPIC_MODEL")
        or env.get("LLM_MODEL")
        or "unknown"
    )
    primary_model = env.get("OPENCLAW_PRIMARY_MODEL") or env.get("PRIMARY_MODEL") or selected_model
    failover_model = env.get("OPENCLAW_FAILOVER_MODEL") or env.get("FAILOVER_MODEL")
    failover_triggered_raw = (
        env.get("OPENCLAW_MODEL_FAILOVER")
        or env.get("MODEL_FAILOVER")
        or env.get("FAILOVER_TRIGGERED")
        or "false"
    )
    failover_triggered = str(failover_triggered_raw).strip().lower() in {"1", "true", "yes", "on"}
    failover_status = env.get("OPENCLAW_FAILOVER_STATUS") or ("triggered" if failover_triggered else "not-triggered")

    payload: dict[str, Any] = {
        "selected_model": selected_model,
        "primary_model": primary_model,
        "failover": {
            "status": failover_status,
            "triggered": failover_triggered,
            "fallback_model": failover_model,
        },
    }
    if explicit:
        payload.update(explicit)
    return payload


def append_build_metadata(
    agent_slug: str,
    *,
    output_path: str | Path,
    operation: str,
    log_name: str = "build-metadata.jsonl",
    log_markdown_name: str | None = "build-log.md",
    extra: dict[str, Any] | None = None,
) -> Path:
    resolved_output = assert_output_within_agent(agent_slug, output_path)
    output_root = canonical_agent_output_dir(agent_slug)
    output_root.mkdir(parents=True, exist_ok=True)

    entry: dict[str, Any] = {
        "timestamp": utc_now_iso(),
        "agent": agent_slug,
        "operation": operation,
        "output": str(resolved_output.relative_to(output_root)),
        "model": detect_model_context(explicit=extra),
    }

    jsonl_path = output_root / log_name
    with jsonl_path.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(entry, ensure_ascii=False) + "\n")

    if log_markdown_name:
        markdown_path = output_root / log_markdown_name
        summary = (
            f"- {entry['timestamp']} | {operation} | {entry['output']} | "
            f"model={entry['model']['selected_model']} | "
            f"failover={entry['model']['failover']['status']}"
        )
        with markdown_path.open("a", encoding="utf-8") as handle:
            handle.write(summary + "\n")

    return jsonl_path
