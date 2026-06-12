#!/usr/bin/env python3
"""Butterboard/Faust 1-bit silent partner.

Monitors recent Hermes conversation text and writes private, low-noise suggestions
for Faust AGI only when useful. Designed for cron/no_agent use: default stdout is
empty so the user sees nothing unless --verbose is passed.
"""
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import os
import sqlite3
import subprocess
import sys
from pathlib import Path

HOME = Path.home()
DEFAULT_DB = HOME / ".hermes" / "state.db"
DEFAULT_STATE = HOME / ".hermes" / "butterboard-1bit-silent-partner.json"
DEFAULT_OUT = HOME / ".hermes" / "profiles" / "faust" / "memory" / "bitnet_subconscious_suggestions.md"
DEFAULT_MODEL = os.getenv("BUTTER_1BIT_SILENT_PARTNER_MODEL", "BitNet-b1.58-2B-4T")

SYSTEM_PROMPT = """You are Faust AGI's private 1-bit subconscious monitor.
Read the recent conversation excerpt. Return JSON only with:
{"suggest": boolean, "priority": "low|medium|high", "suggestion": "one concise private suggestion for Faust"}
Suggest only for concrete risks, contradictions, missed durable learning, missing verification, or a useful next step.
Stay silent for routine chatter. Never address the user. Never request secrets. Never propose external sends.
"""

KEYWORDS = (
    "faust", "butter", "railway", "deploy", "error", "failed", "blocked",
    "remember", "skill", "agi", "token", "secret", "credential", "urgent",
    "test", "verify", "caveman", "mythos", "design", "1-bit", "bitnet",
)


def read_recent_messages(db_path: Path, limit: int = 24) -> list[dict]:
    if not db_path.exists():
        return []
    con = sqlite3.connect(str(db_path))
    con.row_factory = sqlite3.Row
    try:
        tables = {r[0] for r in con.execute("select name from sqlite_master where type='table'")}
        if "messages" not in tables:
            return []
        cols = {r[1] for r in con.execute("pragma table_info(messages)")}
        role_col = "role" if "role" in cols else "speaker" if "speaker" in cols else None
        content_col = "content" if "content" in cols else "text" if "text" in cols else None
        id_col = "id" if "id" in cols else "rowid"
        if not role_col or not content_col:
            return []
        rows = con.execute(
            f"select {id_col} as id, {role_col} as role, {content_col} as content from messages "
            f"where {content_col} is not null order by rowid desc limit ?",
            (limit,),
        ).fetchall()
        return [dict(r) for r in reversed(rows)]
    finally:
        con.close()


def digest_messages(messages: list[dict]) -> str:
    raw = "\n".join(f"{m.get('id')}:{m.get('role')}:{m.get('content','')[:500]}" for m in messages)
    return hashlib.sha256(raw.encode()).hexdigest()


def heuristic(messages: list[dict]) -> dict:
    text = "\n".join(str(m.get("content", "")) for m in messages)[-6000:]
    lower = text.lower()
    hits = [k for k in KEYWORDS if k in lower]
    if len(hits) < 2 and len(text) < 2500:
        return {"suggest": False, "priority": "low", "suggestion": ""}
    if "failed" in lower or "error" in lower or "blocked" in lower:
        suggestion = "Check the latest blocker, verify with a read-back command, and preserve the exact failure evidence before taking the next action."
        priority = "medium"
    elif "token" in lower or "secret" in lower or "credential" in lower:
        suggestion = "Watch for secret handling: avoid echoing credentials, prefer scoped env injection, and report only redacted auth status."
        priority = "high"
    elif "skill" in lower or "caveman" in lower or "mythos" in lower:
        suggestion = "After installing or changing skills, verify profile-level skill loading and update the durable skill roster/source manifest."
        priority = "low"
    else:
        suggestion = "Look for a concise next-step recommendation only if the active thread has unresolved verification or deployment risk."
        priority = "low"
    return {"suggest": True, "priority": priority, "suggestion": suggestion}


def call_model(messages: list[dict]) -> dict | None:
    excerpt = "\n".join(f"{m.get('role')}: {m.get('content','')}" for m in messages)[-8000:]
    prompt = SYSTEM_PROMPT + "\nRECENT EXCERPT:\n" + excerpt
    cmd_template = os.getenv("BITNET_SILENT_PARTNER_CMD")
    if cmd_template:
        # Tokenize without a shell. The optional command template is an admin-set
        # local integration hook; placeholders are substituted as single argv items.
        import shlex
        argv = [part.format(prompt=prompt, model=DEFAULT_MODEL) for part in shlex.split(cmd_template)]
        try:
            out = subprocess.check_output(argv, text=True, timeout=45, stderr=subprocess.DEVNULL)
            return json.loads(out[out.find("{"): out.rfind("}") + 1])
        except Exception:
            return None
    # Conservative default: only use Ollama if an explicitly 1-bit/bitnet model is already present.
    try:
        listed = subprocess.check_output(["ollama", "list"], text=True, timeout=5, stderr=subprocess.DEVNULL)
        model = None
        for line in listed.splitlines()[1:]:
            name = line.split()[0] if line.split() else ""
            if "bitnet" in name.lower() or "1bit" in name.lower() or "1.58" in name.lower():
                model = name
                break
        if not model:
            return None
        req = {"model": model, "prompt": prompt, "stream": False, "options": {"temperature": 0.1, "num_predict": 180}}
        out = subprocess.check_output(
            ["curl", "-fsS", "http://127.0.0.1:11434/api/generate", "-d", json.dumps(req)],
            text=True,
            timeout=60,
            stderr=subprocess.DEVNULL,
        )
        response = json.loads(out).get("response", "")
        return json.loads(response[response.find("{"): response.rfind("}") + 1])
    except Exception:
        return None


def append_suggestion(out_path: Path, result: dict, source_digest: str) -> None:
    if not result.get("suggest"):
        return
    suggestion = str(result.get("suggestion", "")).strip()
    if not suggestion:
        return
    out_path.parent.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now(dt.timezone.utc).isoformat()
    entry = f"\n## {stamp} · priority={result.get('priority','low')} · digest={source_digest[:12]}\n\n{suggestion}\n"
    old = out_path.read_text() if out_path.exists() else "# BitNet subconscious suggestions for Faust\n"
    if source_digest[:12] in old:
        return
    out_path.write_text(old + entry)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--db", default=str(DEFAULT_DB))
    ap.add_argument("--state", default=str(DEFAULT_STATE))
    ap.add_argument("--out", default=str(DEFAULT_OUT))
    ap.add_argument("--limit", type=int, default=24)
    ap.add_argument("--verbose", action="store_true")
    args = ap.parse_args()

    if os.getenv("BUTTER_1BIT_SILENT_PARTNER_ENABLED", "true").lower() in {"0", "false", "no"}:
        return 0
    messages = read_recent_messages(Path(args.db), args.limit)
    if not messages:
        if args.verbose:
            print("no messages")
        return 0
    dg = digest_messages(messages)
    state_path = Path(args.state)
    if state_path.exists():
        try:
            if json.loads(state_path.read_text()).get("last_digest") == dg:
                if args.verbose:
                    print("unchanged")
                return 0
        except Exception:
            pass
    result = call_model(messages) or heuristic(messages)
    append_suggestion(Path(args.out), result, dg)
    state_path.parent.mkdir(parents=True, exist_ok=True)
    state_path.write_text(json.dumps({"last_digest": dg, "checked_at": dt.datetime.now(dt.timezone.utc).isoformat()}, indent=2))
    if args.verbose:
        print(json.dumps(result, indent=2))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
