#!/usr/bin/env python3
"""Read-only Hermes session JSONL -> Cockpit event adapter.

M010 safety contract:
- Reads bounded session JSONL only.
- Emits sanitized `hermes-cockpit.event.v1` NDJSON.
- Writes generated output/evidence only to explicit paths.
- Does not mutate the source file.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

SCHEMA_VERSION = "hermes-cockpit.event.v1"
SOURCE_KIND = "hermes-session-jsonl"
DEFAULT_STREAM = "hermes-live-ingestion"

SECRET_PATTERNS: tuple[re.Pattern[str], ...] = (
    re.compile(r"sk-[A-Za-z0-9_-]{16,}"),
    re.compile(r"xox[a-z]-[A-Za-z0-9-]{16,}"),
    re.compile(r"github_pat_[A-Za-z0-9_]{16,}"),
    re.compile(r"ghp_[A-Za-z0-9_]{16,}"),
    re.compile(r"hf_[A-Za-z0-9_]{16,}"),
    re.compile(r"AIza[0-9A-Za-z_-]{16,}"),
    re.compile(r"eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}"),
    re.compile(r"(?i)authorization\s*:\s*bearer\s+[^\s,;}\"]+"),
    re.compile(r"(?i)[\"']?(authorization|api[_-]?key|client[_-]?secret|password|secret|token)[\"']?\s*:\s*[\"'][^\"']+[\"']"),
    re.compile(r"(?i)(authorization|api[_-]?key|client[_-]?secret|password|secret|token)\s*[:=]\s*[^\s,;}]+"),
    re.compile(r"\b[A-Fa-f0-9]{32,}\b"),
    re.compile(r"(?<![A-Za-z0-9+/=])[A-Za-z0-9+/]{40,}={0,2}(?![A-Za-z0-9+/=])"),
)


def utc_now() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9_-]+", "-", value.strip()).strip("-").lower()
    return slug or "hermes-source"


def redact_text(value: str) -> tuple[str, int]:
    redacted = value
    count = 0
    for pattern in SECRET_PATTERNS:
        redacted, n = pattern.subn(lambda match: _placeholder_for(match.group(0)), redacted)
        count += n
    return redacted, count


def _placeholder_for(match: str) -> str:
    del match
    return "[REDACTED_SECRET]"


def summarize_text(value: Any, max_chars: int) -> tuple[str, int, str]:
    if value is None:
        return "", 0, hashlib.sha256(b"").hexdigest()
    text = str(value).replace("\n", " ").strip()
    content_hash = hashlib.sha256(text.encode("utf-8", errors="replace")).hexdigest()
    redacted, redactions = redact_text(text)
    if len(redacted) > max_chars:
        redacted = redacted[: max_chars - 1].rstrip() + "…"
    return redacted, redactions, content_hash


def file_signature(path: Path) -> dict[str, Any]:
    stat = path.stat()
    digest = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            digest.update(chunk)
    return {
        "size": stat.st_size,
        "mtime_ns": stat.st_mtime_ns,
        "sha256": digest.hexdigest(),
    }


def signature_timestamp(signature: dict[str, Any]) -> str:
    seconds = int(signature["mtime_ns"]) / 1_000_000_000
    return datetime.fromtimestamp(seconds, timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def is_relative_to(child: Path, parent: Path) -> bool:
    try:
        child.relative_to(parent)
    except ValueError:
        return False
    return True


def validate_generated_output_paths(input_path: Path, output_path: Path, evidence_path: Path) -> None:
    source = input_path.expanduser().resolve()
    hermes_runtime = (Path.home() / ".hermes").resolve()
    output_resolved = output_path.expanduser().resolve(strict=False)
    evidence_resolved = evidence_path.expanduser().resolve(strict=False)
    if output_resolved == evidence_resolved:
        raise ValueError(f"refusing to use the same path for output and evidence: {output_path}")
    for label, candidate, resolved in (("output", output_path, output_resolved), ("evidence", evidence_path, evidence_resolved)):
        if resolved == source:
            raise ValueError(f"refusing to write {label} path over source input: {candidate}")
        if is_relative_to(resolved, hermes_runtime):
            raise ValueError(f"refusing to write generated {label} inside Hermes runtime directory: {candidate}")


def event_id(source_slug: str, sequence: int, basis: dict[str, Any]) -> str:
    encoded = json.dumps(basis, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return f"evt_hermes_{source_slug}_{sequence:04d}_{hashlib.sha256(encoded).hexdigest()[:12]}"


def actor_for_role(role: str) -> tuple[str, str | None]:
    if role == "user":
        return "Joe", None
    if role == "assistant":
        return "Migi", "hermes-agent"
    if role == "tool":
        return "tool", "tool"
    if role == "system":
        return "system", None
    return role or "system", None


def base_event(
    *,
    source_slug: str,
    sequence: int,
    ts: str,
    event_type: str,
    actor: str,
    agent_id: str | None,
    run_id: str,
    evidence_row: int | None,
    payload: dict[str, Any],
    trust_status: str,
    evidence_state: str,
    trust_reason: str,
    summary: str,
    task_id: str | None = None,
    checkpoint: bool = False,
    caused_by: str | None = None,
    artifact_uri: str | None = None,
) -> dict[str, Any]:
    basis = {
        "ts": ts,
        "event_type": event_type,
        "actor": actor,
        "run_id": run_id,
        "row": evidence_row,
        "payload": payload,
        "summary": summary,
    }
    eid = event_id(source_slug, sequence, basis)
    return {
        "id": eid,
        "ts": ts,
        "schema_version": SCHEMA_VERSION,
        "source": "hermes",
        "event_type": event_type,
        "actor": actor,
        "task_id": task_id,
        "run_id": run_id,
        "agent_id": agent_id,
        "artifact_uri": artifact_uri,
        "evidence_uri": f"file://{source_slug}#row={evidence_row}" if evidence_row is not None else f"file://{source_slug}",
        "trust": {
            "status": trust_status,
            "evidence_state": evidence_state,
            "confidence": 0.0 if trust_status == "unknown" else 0.25,
            "reason": trust_reason,
        },
        "payload": payload,
        "replay": {
            "stream": source_slug or DEFAULT_STREAM,
            "sequence": sequence,
            "visible": True,
            "checkpoint": checkpoint,
            "summary": summary,
            "caused_by": caused_by,
        },
    }


def safe_artifact_uri(path_value: Any) -> str | None:
    if not isinstance(path_value, str) or not path_value:
        return None
    normalized = path_value.replace("\\", "/")
    allowed_prefixes = ("docs/", "target/hermes-cockpit-m010/", "prototypes/hermes-cockpit/")
    if normalized.startswith(allowed_prefixes) and ".." not in Path(normalized).parts:
        return f"file://{normalized}"
    return None


def tool_names_from_row(row: dict[str, Any]) -> list[str]:
    names: list[str] = []
    for call in row.get("tool_calls") or []:
        if not isinstance(call, dict):
            continue
        function = call.get("function") if isinstance(call.get("function"), dict) else {}
        name = function.get("name") or call.get("name")
        if isinstance(name, str) and name:
            names.append(name)
    return names


def parse_tool_content(content: str) -> dict[str, Any] | None:
    try:
        parsed = json.loads(content)
    except Exception:
        return None
    return parsed if isinstance(parsed, dict) else None


def project_session_jsonl(
    input_path: str | Path,
    *,
    source_label: str = DEFAULT_STREAM,
    limit: int = 100,
    summary_max_chars: int = 160,
) -> tuple[list[dict[str, Any]], dict[str, Any]]:
    path = Path(input_path)
    source_slug = slugify(source_label or path.stem)
    run_id = f"run_hermes_{source_slug}"
    before = file_signature(path)
    source_ts = signature_timestamp(before)
    events: list[dict[str, Any]] = []
    redaction_count = 0
    dropped_count = 0
    rows_seen = 0
    warnings: list[str] = []
    sequence = 1

    start_event = base_event(
        source_slug=source_slug,
        sequence=sequence,
        ts=source_ts,
        event_type="run_started",
        actor="system",
        agent_id=None,
        run_id=run_id,
        evidence_row=None,
        payload={"source_label": source_slug, "source_kind": SOURCE_KIND, "row_count_bound": limit},
        trust_status="unknown",
        evidence_state="claim_only",
        trust_reason="Bounded Hermes session source read started; no evidence conclusion yet.",
        summary=f"Started bounded Hermes source read for {source_slug}.",
        checkpoint=True,
    )
    events.append(start_event)
    start_id = start_event["id"]
    sequence += 1

    with path.open("r", encoding="utf-8", errors="replace") as fh:
        for row_index, line in enumerate(fh):
            if not line.strip():
                continue
            if rows_seen >= limit:
                warnings.append(f"row limit {limit} reached")
                break
            rows_seen += 1
            try:
                row = json.loads(line)
                if not isinstance(row, dict):
                    raise ValueError("row is not an object")
            except Exception:
                dropped_count += 1
                events.append(
                    base_event(
                        source_slug=source_slug,
                        sequence=sequence,
                        ts=source_ts,
                        event_type="trust_flagged",
                        actor="system",
                        agent_id=None,
                        run_id=run_id,
                        evidence_row=row_index,
                        payload={"severity": "warning", "summary": "Malformed JSONL row skipped.", "action": "drop_row"},
                        trust_status="rejected",
                        evidence_state="claim_only",
                        trust_reason="The adapter could not parse the source row as a JSON object.",
                        summary="Skipped malformed Hermes source row.",
                        caused_by=start_id,
                    )
                )
                sequence += 1
                continue

            role = str(row.get("role") or "system")
            actor, agent_id = actor_for_role(role)
            ts = str(row.get("timestamp") or source_ts)
            task_id = str(row.get("task_id") or "").strip() or None
            task_title = str(row.get("task_title") or "").strip() or None
            card_fields = {"card_title": task_title} if task_title else {}
            summary, redactions, content_hash = summarize_text(row.get("content", ""), summary_max_chars)
            redaction_count += redactions
            tool_names = tool_names_from_row(row)

            if tool_names:
                events.append(
                    base_event(
                        source_slug=source_slug,
                        sequence=sequence,
                        ts=ts,
                        event_type="claim_observed",
                        actor="Migi",
                        agent_id="hermes-agent",
                        run_id=run_id,
                        evidence_row=row_index,
                        task_id=task_id,
                        payload={
                            **card_fields,
                            "role": role,
                            "tool_names": tool_names[:20],
                            "tool_call_count": len(tool_names),
                            "arguments_excluded": True,
                            "content_hash": content_hash[:12],
                            "redacted": bool(redactions),
                        },
                        trust_status="unverified",
                        evidence_state="claim_only",
                        trust_reason="Tool-call shape was observed, but arguments and results are not proof of task completion.",
                        summary=f"Observed Hermes tool call(s): {', '.join(tool_names[:3])}.",
                        caused_by=start_id,
                    )
                )
                sequence += 1

            parsed_tool = parse_tool_content(str(row.get("content") or "")) if role == "tool" else None
            artifact_uri = None
            if parsed_tool:
                artifact_uri = safe_artifact_uri(parsed_tool.get("artifact_path")) or safe_artifact_uri(parsed_tool.get("evidence_path"))
            if artifact_uri:
                artifact_name = artifact_uri.removeprefix("file://").split("/")[-1]
                events.append(
                    base_event(
                        source_slug=source_slug,
                        sequence=sequence,
                        ts=ts,
                        event_type="artifact_created",
                        actor="tool",
                        agent_id="tool",
                        run_id=run_id,
                        evidence_row=row_index,
                        task_id=task_id,
                        artifact_uri=artifact_uri,
                        payload={
                            **card_fields,
                            "artifact_name": artifact_name,
                            "artifact_kind": "adapter-evidence",
                            "summary": "Safe project-local generated artifact path observed in tool result.",
                            "content_hash": content_hash[:12],
                        },
                        trust_status="unverified",
                        evidence_state="artifact_produced",
                        trust_reason="A safe artifact path was observed; semantic truth is not validated by path existence alone.",
                        summary=f"Observed generated artifact {artifact_name}.",
                        caused_by=start_id,
                    )
                )
                sequence += 1
                continue

            if role == "tool":
                tool_name = str(row.get("name") or row.get("tool_name") or "unknown_tool").strip() or "unknown_tool"
                parsed_status = ""
                if parsed_tool:
                    parsed_status = str(parsed_tool.get("status") or parsed_tool.get("success") or "").lower()
                result_has_problem = parsed_status in {"false", "error", "failed", "failure"} or "WARNING" in summary.upper() or "ERROR" in summary.upper() or bool(redactions)
                result_summary = f"Observed Hermes tool result from {tool_name}."
                if result_has_problem:
                    result_summary = f"Observed Hermes tool result from {tool_name} requiring review."
                events.append(
                    base_event(
                        source_slug=source_slug,
                        sequence=sequence,
                        ts=ts,
                        event_type="trust_flagged" if result_has_problem else "claim_observed",
                        actor="tool",
                        agent_id="tool",
                        run_id=run_id,
                        evidence_row=row_index,
                        task_id=task_id,
                        payload={
                            **card_fields,
                            "role": role,
                            "tool_name": tool_name,
                            "result_body_excluded": True,
                            "content_hash": content_hash[:12],
                            "redacted": bool(redactions),
                            "redaction_count": redactions,
                        },
                        trust_status="unverified",
                        evidence_state="claim_only",
                        trust_reason="Hermes tool result body was observed but excluded from Cockpit projection; it is not proof of task completion.",
                        summary=result_summary,
                        caused_by=start_id,
                    )
                )
                sequence += 1
                continue

            upper_summary = summary.upper()
            if "WARNING" in upper_summary or "ERROR" in upper_summary or redactions:
                severity = "warning" if "ERROR" not in upper_summary else "error"
                events.append(
                    base_event(
                        source_slug=source_slug,
                        sequence=sequence,
                        ts=ts,
                        event_type="trust_flagged",
                        actor=actor,
                        agent_id=agent_id,
                        run_id=run_id,
                        evidence_row=row_index,
                        task_id=task_id,
                        payload={
                            **card_fields,
                            "severity": severity,
                            "summary": summary or "Hermes source row required privacy or trust handling.",
                            "action": "review_or_redact",
                            "redaction_count": redactions,
                        },
                        trust_status="unverified",
                        evidence_state="claim_only",
                        trust_reason="The source row contained warning/error language or redacted sensitive-looking text.",
                        summary=(summary or "Observed Hermes trust warning."),
                        caused_by=start_id,
                    )
                )
                sequence += 1
            elif summary:
                events.append(
                    base_event(
                        source_slug=source_slug,
                        sequence=sequence,
                        ts=ts,
                        event_type="claim_observed",
                        actor=actor,
                        agent_id=agent_id,
                        run_id=run_id,
                        evidence_row=row_index,
                        task_id=task_id,
                        payload={**card_fields, "summary": summary, "role": role, "content_hash": content_hash[:12], "redacted": False},
                        trust_status="unverified",
                        evidence_state="claim_only",
                        trust_reason="Hermes transcript text is an observed claim, not verified evidence.",
                        summary=summary,
                        caused_by=start_id,
                    )
                )
                sequence += 1

            finish_reason = row.get("finish_reason")
            if finish_reason:
                events.append(
                    base_event(
                        source_slug=source_slug,
                        sequence=sequence,
                        ts=ts,
                        event_type="run_completed",
                        actor=actor,
                        agent_id=agent_id,
                        run_id=run_id,
                        evidence_row=row_index,
                        task_id=task_id,
                        payload={**card_fields, "status": "completed", "outcome": str(finish_reason)},
                        trust_status="unknown",
                        evidence_state="claim_only",
                        trust_reason="Hermes response segment ended; this is not task completion.",
                        summary=f"Hermes response segment ended with finish reason {finish_reason}.",
                        checkpoint=True,
                        caused_by=start_id,
                    )
                )
                sequence += 1

    after = file_signature(path)
    evidence = {
        "source_path": str(path),
        "source_kind": SOURCE_KIND,
        "read_only": True,
        "before": before,
        "after": after,
        "source_mutated": before != after,
        "rows_seen": rows_seen,
        "events_emitted": len(events),
        "redaction_count": redaction_count,
        "dropped_count": dropped_count,
        "warnings": warnings,
    }
    return events, evidence


def write_ndjson(events: list[dict[str, Any]], output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("".join(json.dumps(event, sort_keys=True) + "\n" for event in events), encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Project bounded Hermes session JSONL into Cockpit event NDJSON.")
    parser.add_argument("--input", required=True, help="Hermes session JSONL or synthetic fixture to read")
    parser.add_argument("--output", required=True, help="NDJSON output path")
    parser.add_argument("--evidence", required=True, help="Evidence JSON output path")
    parser.add_argument("--source-label", default=DEFAULT_STREAM, help="Safe source label used for run/event IDs")
    parser.add_argument("--limit", type=int, default=100, help="Maximum non-empty source rows to inspect")
    parser.add_argument("--summary-max-chars", type=int, default=160, help="Maximum replay summary characters")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    input_path = Path(args.input)
    output = Path(args.output)
    evidence_path = Path(args.evidence)
    try:
        validate_generated_output_paths(input_path, output, evidence_path)
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 2
    events, evidence = project_session_jsonl(
        input_path,
        source_label=args.source_label,
        limit=args.limit,
        summary_max_chars=args.summary_max_chars,
    )
    write_ndjson(events, output)
    evidence_path.parent.mkdir(parents=True, exist_ok=True)
    evidence_path.write_text(json.dumps(evidence, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
