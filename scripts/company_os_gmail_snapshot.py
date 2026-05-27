#!/usr/bin/env python3
"""Refresh the local Company OS Gmail lead snapshot.

This uses the existing readonly Gmail OAuth token on this machine and writes a
small, cleaned cache for the dashboard. It never sends, labels, archives, or
modifies email.
"""

import argparse
import base64
import json
import os
import re
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

import google.auth.transport.requests
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build


SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]
CLIENT_SECRET_FILE = Path("~/.config/google-credentials/client_secret.json").expanduser()
TOKEN_FILE = Path("~/.config/google-credentials/gmail-token.json").expanduser()
DEFAULT_QUERY = (
    '("Follow Up From X" OR "Collaboration Inquiry for 360" OR "Paid Collaboration" '
    'OR "paid collab" OR "sponsorship information" OR "quote rates" OR '
    '"thread post" OR "Robert\'s rate" OR "Scobleizer\'s manager") '
    "newer_than:30d -in:spam -in:trash -category:promotions"
)
QUOTE_MARKERS = (
    "\nOn ",
    "\n> On ",
    "\n---------- Forwarded message",
    "\nFrom: ",
    "\nSent from ",
)


def get_gmail_service():
    creds = None
    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)

    if not creds:
        flow = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRET_FILE), SCOPES)
        creds = flow.run_local_server(port=0)
        TOKEN_FILE.write_text(creds.to_json())

    if creds.expired and creds.refresh_token:
        creds.refresh(google.auth.transport.requests.Request())
        TOKEN_FILE.write_text(creds.to_json())

    return build("gmail", "v1", credentials=creds)


def header_value(payload, name):
    for header in payload.get("headers", []):
        if header.get("name", "").lower() == name.lower():
            return header.get("value", "")
    return ""


def decode_part_body(part):
    data = part.get("body", {}).get("data")
    if not data:
        return ""
    try:
        return base64.urlsafe_b64decode(data.encode("utf-8")).decode(
            "utf-8", errors="replace"
        )
    except Exception:
        return ""


def extract_text(payload):
    mime_type = payload.get("mimeType", "")
    if mime_type == "text/plain":
        return decode_part_body(payload)

    for part in payload.get("parts", []) or []:
        text = extract_text(part)
        if text:
            return text

    if not payload.get("parts"):
        return decode_part_body(payload)

    return ""


def clean_body(body, limit=900):
    text = re.sub(r"\r\n?", "\n", body or "").strip()
    for marker in QUOTE_MARKERS:
        index = text.find(marker)
        if index > 80:
            text = text[:index].strip()
            break

    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    if len(text) > limit:
        text = text[: limit - 1].rstrip() + "..."
    return text or "No readable plain-text body found."


def parse_ts(value, fallback_ms=None):
    if value:
        try:
            return parsedate_to_datetime(value).isoformat()
        except Exception:
            pass
    if fallback_ms:
        return datetime.fromtimestamp(int(fallback_ms) / 1000, timezone.utc).isoformat()
    return datetime.now(timezone.utc).isoformat()


def message_to_snapshot(message):
    payload = message.get("payload", {})
    subject = header_value(payload, "Subject")
    from_ = header_value(payload, "From")
    to = header_value(payload, "To")
    cc = header_value(payload, "Cc")
    date = header_value(payload, "Date")
    attachments = []

    def walk_parts(part):
        filename = part.get("filename")
        if filename:
            attachments.append(filename)
        for child in part.get("parts", []) or []:
            walk_parts(child)

    walk_parts(payload)

    return {
        "id": message.get("id", ""),
        "from": from_ or "Unknown sender",
        "to": [item.strip() for item in to.split(",") if item.strip()],
        "cc": [item.strip() for item in cc.split(",") if item.strip()],
        "timestamp": parse_ts(date, message.get("internalDate")),
        "subject": subject,
        "body": clean_body(extract_text(payload)),
        "attachments": attachments,
    }


def classify_kind(subject, from_, body):
    haystack = f"{subject} {from_} {body}".lower()
    if re.search(r"receipt|invoice|payment|stripe", haystack):
        return "expense" if "receipt" in haystack else "lead"
    if re.search(r"sponsor|collaboration|paid|rates|quote|follow up|qrt|thread", haystack):
        return "lead"
    if re.search(r"briefing|webinar|invitation|nvidia|handoff", haystack):
        return "handoff"
    return "lead"


def needs_for(kind, subject, latest_body):
    haystack = f"{subject} {latest_body}".lower()
    if kind == "expense":
        return "Classify as expense/receipt, not client revenue invoice."
    if "qrt" in haystack or "kombai" in haystack:
        return "Confirm timing, product test requirements, and posting window before any commitment."
    if "rates" in haystack or "quote" in haystack or "paid" in haystack:
        return "Track as active sponsorship lead and confirm follow-up owner."
    if kind == "handoff":
        return "Mark as low-risk access/admin item unless a reply is required."
    return "Review thread, assign owner, and draft next reply for approval."


def status_for(kind, subject):
    if kind == "expense":
        return "Finance signal; review before moving invoice or payment status."
    if kind == "handoff":
        return "Handoff/admin signal; review whether action is required."
    if "follow up from x" in subject.lower():
        return "Active sponsorship lead; timing and product-use comfort need review."
    return "Active inbound lead; review thread before replying."


def read_threads(service, query, max_threads, max_messages):
    results = (
        service.users()
        .messages()
        .list(userId="me", q=query, maxResults=max_threads * 3)
        .execute()
    )
    seen_threads = []
    for ref in results.get("messages", []):
        thread_id = ref.get("threadId")
        if thread_id and thread_id not in seen_threads:
            seen_threads.append(thread_id)
        if len(seen_threads) >= max_threads:
            break

    signals = []
    for thread_id in seen_threads:
        thread = (
            service.users()
            .threads()
            .get(userId="me", id=thread_id, format="full")
            .execute()
        )
        messages = [message_to_snapshot(item) for item in thread.get("messages", [])]
        if not messages:
            continue

        kept_messages = messages[-max_messages:]
        latest = messages[-1]
        first = messages[0]
        subject = latest.get("subject") or first.get("subject") or "Gmail thread"
        latest_body = latest.get("body", "")
        kind = classify_kind(subject, latest.get("from", ""), latest_body)

        signals.append(
            {
                "kind": kind,
                "subject": subject,
                "from": latest.get("from", ""),
                "timestamp": latest.get("timestamp"),
                "summary": latest_body[:240],
                "needs": needs_for(kind, subject, latest_body),
                "threadId": thread_id,
                "messageId": latest.get("id"),
                "gmailUrl": f"https://mail.google.com/mail/u/0/#inbox/{thread_id}",
                "thread": {
                    "status": status_for(kind, subject),
                    "latestAction": f"Latest message from {latest.get('from', 'unknown sender')}: {latest_body[:220]}",
                    "messages": kept_messages,
                },
            }
        )

    return signals


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", default="unalignedos")
    parser.add_argument("--query", default=DEFAULT_QUERY)
    parser.add_argument("--max-threads", type=int, default=8)
    parser.add_argument("--max-messages", type=int, default=6)
    args = parser.parse_args()

    service = get_gmail_service()
    signals = read_threads(service, args.query, args.max_threads, args.max_messages)
    target = Path("~/.hermes/company-os").expanduser() / args.slug / "live" / "email-signals.json"
    target.parent.mkdir(parents=True, exist_ok=True)
    snapshot = {
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "refreshMode": "gmail-readonly",
        "scope": args.query,
        "signals": signals,
    }
    target.write_text(json.dumps(snapshot, indent=2, ensure_ascii=False) + "\n")
    print(json.dumps({"ok": True, "path": str(target), "count": len(signals)}))


if __name__ == "__main__":
    main()
