#!/usr/bin/env python3
"""Seed Tim's Executive Queue with durable, approval-ready backlog items.

This is intentionally local-only. It does not contact people, change Motion,
write finance records, or mutate Notion beyond normal Activity Log elsewhere.
"""
from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

QUEUE_ROOT = Path('/Users/hermes/.hermes/profiles/executive/executive-queue')
TODAY = datetime.now(timezone.utc).astimezone().isoformat()
DATE_DIR = TODAY[:10]
ITEMS_DIR = QUEUE_ROOT / 'items' / DATE_DIR

ALLOWED_DOMAINS = {
    'AI Ops', 'Restored', 'Travel Multiplier', 'Personal', 'Finance', 'Code',
    'Research', 'Email', 'Calendar', 'Meetings', 'Home', 'Health',
}
ALLOWED_OWNERS = {
    'Executive', 'Restored COS', 'TM COS', 'Personal COS', 'Coding Agent',
    'Research Agent', 'Finance CFO', 'Email Assistant', 'Calendar Assistant',
    'Meeting Notes Agent', 'Voice Lab', 'Tim',
}

def slug(value: str) -> str:
    return re.sub(r'[^a-z0-9]+', '-', value.lower()).strip('-')[:58]

RAW_ITEMS = [
    {
        'title': 'Rate first canonical AI Learning output',
        'outcome': 'AI Learning keeps surfacing useful, weekly agent-roadmap decisions instead of becoming another ignored digest.',
        'status': 'Proposed', 'priority': 'P1', 'domain': 'AI Ops', 'owner': 'Executive',
        'riskLevel': 'Low', 'approvalLevel': 'Manual Only', 'confidence': 'High',
        'source_id': 'active-queue-ai-learning-canonical',
        'excerpt': 'Active queue item: first Executive AI Learning Agent output needs Tim review.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#item-3',
        'context': 'First canonical run completed and produced ranked recommendations. Tuning should happen after Tim reaction, not before.',
        'constraints': ['No paid transcription without approval.'],
        'nextAction': 'Open the latest AI Learning report and choose: looks good, needs tuning, or not useful.',
    },
    {
        'title': 'Approve Operating KB extraction batch',
        'outcome': 'Turn the metadata inventory into useful cross-domain operating knowledge without reading everything blindly.',
        'status': 'Proposed', 'priority': 'P1', 'domain': 'AI Ops', 'owner': 'Executive',
        'riskLevel': 'Medium', 'approvalLevel': 'Ask Before System Change', 'confidence': 'High',
        'source_id': 'active-queue-operating-kb-inventory',
        'excerpt': 'Inventory found 100 Drive candidate documents and 40 TM email candidate threads. Tim needs to approve Phase 2 extraction.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#item-15',
        'context': 'Metadata-first inventory is complete. No full docs or full emails were read in that phase.',
        'constraints': ['Do not save memory or create skills until extracted facts are reviewed.'],
        'nextAction': 'Approve a first extraction batch, such as top 5 Restored and top 5 Travel Multiplier sources.',
    },
    {
        'title': 'Draft Communion ministry lunch response',
        'outcome': 'Sunday lunch and communion ministry agenda items get handled before they bury Tim.',
        'status': 'Proposed', 'priority': 'P1', 'domain': 'Restored', 'owner': 'Restored COS',
        'riskLevel': 'Medium', 'approvalLevel': 'Ask Before External', 'confidence': 'High',
        'source_id': 'reliability-queue-communion-thread',
        'excerpt': 'Superhuman inbox thread about shut-ins, meals, and centralized process.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#queue-review-snapshot-2026-05-29',
        'context': 'Email was in inbox and marked important in the queue review snapshot.',
        'constraints': ['Draft only. No external reply without Tim approval.'],
        'nextAction': 'Restored COS reads the thread and drafts a concise response or agenda for Tim approval.',
    },
    {
        'title': 'Review Judy pastoral follow-up',
        'outcome': 'A sensitive pastoral follow-up does not disappear in the inbox.',
        'status': 'Proposed', 'priority': 'P1', 'domain': 'Restored', 'owner': 'Restored COS',
        'riskLevel': 'High', 'approvalLevel': 'Manual Only', 'confidence': 'High',
        'source_id': 'reliability-queue-judy-pastoral-email',
        'excerpt': 'Judy pastoral follow-up email was marked important and private enough to treat as high risk.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#queue-review-snapshot-2026-05-29',
        'context': 'Queue review identified this as pastoral/private. Summary and reply should be handled carefully.',
        'constraints': ['No sensitive note or external reply without Tim approval.'],
        'nextAction': 'Restored COS prepares a short private summary for Tim only.',
    },
    {
        'title': 'Recover baptism candidate follow-up',
        'outcome': 'A Restored people task gets scheduled instead of staying due and unscheduled.',
        'status': 'Triage', 'priority': 'P1', 'domain': 'Restored', 'owner': 'Executive',
        'riskLevel': 'Medium', 'approvalLevel': 'Ask Before External', 'confidence': 'High',
        'source_id': 'reliability-queue-baptism-motion',
        'excerpt': 'Motion scan found Baptism candidate follow-up due with no scheduled time.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#queue-review-snapshot-2026-05-29',
        'context': 'Read-only scan only. External contact requires approval.',
        'constraints': ['Respect Friday protection. Ask before contacting people.'],
        'nextAction': 'Check if the Motion task is still open, then schedule a recovery block or draft contact for approval.',
    },
    {
        'title': 'Decide Saturday overload plan',
        'outcome': 'Tim gets a realistic Saturday instead of 315 minutes of stacked work by inertia.',
        'status': 'Proposed', 'priority': 'P1', 'domain': 'Personal', 'owner': 'Executive',
        'riskLevel': 'Medium', 'approvalLevel': 'Ask Before System Change', 'confidence': 'High',
        'source_id': 'reliability-queue-saturday-overload',
        'excerpt': 'Motion scan showed 5 Saturday tasks totaling 315 minutes across finance, Restored, sermon prep, and TM.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#queue-review-snapshot-2026-05-29',
        'context': 'This is exactly the kind of capacity conflict the Executive layer should surface.',
        'constraints': ['Do not move external hard deadlines without Tim approval.'],
        'nextAction': 'Rank the Saturday tasks and propose what to keep, move, or drop.',
    },
    {
        'title': 'Prepare elder onboarding packet',
        'outcome': 'Elder onboarding prep becomes a reviewable packet instead of scattered tasks.',
        'status': 'Queued', 'priority': 'P2', 'domain': 'Restored', 'owner': 'Restored COS',
        'riskLevel': 'Medium', 'approvalLevel': 'Ask Before External', 'confidence': 'High',
        'source_id': 'reliability-queue-elder-onboarding-packet',
        'excerpt': 'Motion scan found three Elder Onboarding Prep tasks due June 4.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#queue-review-snapshot-2026-05-29',
        'context': 'Safe local prep is allowed. External sharing requires approval.',
        'constraints': ['Draft locally. Ask before sharing.'],
        'nextAction': 'Draft the onboarding outline and meeting plan for Tim review.',
    },
    {
        'title': 'Review next Finance Watcher report',
        'outcome': 'Every dollar tracking improves without making noisy or unsafe automatic finance writes.',
        'status': 'Queued', 'priority': 'P1', 'domain': 'Finance', 'owner': 'Finance CFO',
        'riskLevel': 'Medium', 'approvalLevel': 'Ask Before System Change', 'confidence': 'High',
        'source_id': 'active-queue-finance-watcher-tuned-report',
        'excerpt': 'Finance Watcher prompts now require completeness status, unresolved count, source tracing blockers, and no writes without approval.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#item-4',
        'context': 'Sunday and Wednesday Finance Watcher prompts were updated after Tim clarified every dollar must be tracked accurately.',
        'constraints': ['No finance writes without explicit approval.'],
        'nextAction': 'Inspect the next natural Finance Watcher artifact and approve only high-confidence ready items.',
    },
    {
        'title': 'Resolve AI transcript backfill blockers',
        'outcome': 'AI Learning has full transcripts rather than partial summaries or inaccessible queued items.',
        'status': 'Proposed', 'priority': 'P2', 'domain': 'AI Ops', 'owner': 'Executive',
        'riskLevel': 'Low', 'approvalLevel': 'Manual Only', 'confidence': 'High',
        'source_id': 'reliability-queue-transcript-backfill',
        'excerpt': 'Transcript backfill still reports missing or unacceptable transcripts. No paid transcription used.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/reports/reliability-queue-2026-05-29/reliability_queue_report.json',
        'context': 'Tim has stated partial/summary/queued/inaccessible transcripts are unacceptable and paid transcription requires approval.',
        'constraints': ['Ask before paid transcription. No partial transcripts.'],
        'nextAction': 'Prepare a short list of blocked transcript candidates and ask which are worth paid/manual recovery.',
    },
    {
        'title': 'Tune Travel Multiplier weekly review sources',
        'outcome': 'TM lane surfaces profit and system-protection moves, not silent empty reports.',
        'status': 'Triage', 'priority': 'P2', 'domain': 'Travel Multiplier', 'owner': 'TM COS',
        'riskLevel': 'Medium', 'approvalLevel': 'Auto', 'confidence': 'Medium',
        'source_id': 'active-queue-tm-weekly-review-coverage',
        'excerpt': 'First real TM weekly review returned silent because live sources were too thin.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#item-7',
        'context': 'TM needs profit/system lane coverage so inconsistency does not cripple the business.',
        'constraints': ['No customer contact or public changes without approval.'],
        'nextAction': 'Identify the next two TM live sources or explicit TM tasks the weekly review should monitor.',
    },
    {
        'title': 'Scope broader referral link monitoring',
        'outcome': 'TM protects core affiliate revenue links beyond the existing referrals page watcher.',
        'status': 'Proposed', 'priority': 'P2', 'domain': 'Travel Multiplier', 'owner': 'TM COS',
        'riskLevel': 'Low', 'approvalLevel': 'Ask Before System Change', 'confidence': 'High',
        'source_id': 'active-queue-referral-link-monitoring-scope',
        'excerpt': 'Current watcher checks Travel Multiplier referrals page. Broader card-program monitoring is a separate scope.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#item-10',
        'context': 'Existing deterministic watcher is healthy, but broader monitoring could catch program-page changes.',
        'constraints': ['Do not edit TM cron or scripts without approval.'],
        'nextAction': 'Decide whether to scope broader card-program monitoring beyond the referral page.',
    },
    {
        'title': 'Decide Voice Bridge production hardening',
        'outcome': 'Voice Lab moves from prototype to reliable production only if it is worth the operational cost.',
        'status': 'Proposed', 'priority': 'P2', 'domain': 'AI Ops', 'owner': 'Executive',
        'riskLevel': 'High', 'approvalLevel': 'Ask Before System Change', 'confidence': 'High',
        'source_id': 'active-queue-voice-bridge-hardening',
        'excerpt': 'Live Speech Engine browser bridge works, but uses temporary Cloudflare quick tunnels and background process.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#item-11',
        'context': 'Gateway/process restarts and public tunnels are gated. Local readiness prep is safe.',
        'constraints': ['No public tunnels, launchd services, or restarts without approval.'],
        'nextAction': 'Choose whether to harden Voice Lab now, keep it as prototype, or defer.',
    },
    {
        'title': 'Run Four-Lane output quality check',
        'outcome': 'The operating cadence actually protects AI Learning, Restored, Finance, and TM instead of just existing on paper.',
        'status': 'Queued', 'priority': 'P1', 'domain': 'AI Ops', 'owner': 'Executive',
        'riskLevel': 'Low', 'approvalLevel': 'Auto', 'confidence': 'High',
        'source_id': 'active-queue-four-lane-quality-check',
        'excerpt': 'Four-Lane Operating System is built and awaiting natural-run quality check.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#item-1',
        'context': 'Tuesday Executive Queue, Wednesday Finance, Thursday AI Learning, and Monday TM outputs should be checked before tuning.',
        'constraints': ['Do not overbuild scoring. Tune after real outputs.'],
        'nextAction': 'Review each natural output and mark useful, noisy, missing, or action-worthy.',
    },
    {
        'title': 'Make Motion queue compensation real',
        'outcome': 'Motion becomes Tim’s executive-function operating system, not just a passive task list.',
        'status': 'Queued', 'priority': 'P1', 'domain': 'Personal', 'owner': 'Executive',
        'riskLevel': 'Medium', 'approvalLevel': 'Auto', 'confidence': 'High',
        'source_id': 'active-queue-motion-operating-system',
        'excerpt': 'Executive has Full Motion ops for clear low-risk task/deadline management.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#item-2',
        'context': 'Executive may create, update, schedule, and reschedule clear low-risk Motion tasks. Sensitive or external commitments are gated.',
        'constraints': ['No Friday work. Ask before deletes, external hard deadlines, or sensitive decisions.'],
        'nextAction': 'Use Motion scans to turn overload and unscheduled work into approval-ready moves.',
    },
    {
        'title': 'Review Product Pass monitor output',
        'outcome': 'Lenny/Product Pass AI tool monitoring turns into concrete experiments or rejections.',
        'status': 'Triage', 'priority': 'P3', 'domain': 'AI Ops', 'owner': 'Research Agent',
        'riskLevel': 'Low', 'approvalLevel': 'Auto', 'confidence': 'Medium',
        'source_id': 'four-lane-product-pass-monitor',
        'excerpt': 'Lenny Product Pass AI tool monitor runs Mondays and is part of AI Learning visibility.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/four-lane-operating-system/reports/status-snapshot-2026-06-01.json',
        'context': 'This should feed the AI Learning lane only when it creates a decision or experiment.',
        'constraints': ['No paid tool adoption without approval.'],
        'nextAction': 'Pull latest Product Pass monitor output and propose one adopt/test/reject decision.',
    },
    {
        'title': 'Review Meeting Follow-Up drafts',
        'outcome': 'Granola-derived follow-ups do not pile up without Tim seeing draftable next actions.',
        'status': 'Triage', 'priority': 'P2', 'domain': 'Meetings', 'owner': 'Meeting Notes Agent',
        'riskLevel': 'Medium', 'approvalLevel': 'Ask Before External', 'confidence': 'Medium',
        'source_id': 'cron-meeting-follow-up-drafts',
        'excerpt': 'Meeting Follow-Up Drafts cron runs Monday through Thursday and Saturday at 4:30 PM.',
        'fullReference': 'cron:3e39f6f7dc1a',
        'context': 'Drafts are useful only if they become approval-ready replies or Motion tasks.',
        'constraints': ['No sending without approval.'],
        'nextAction': 'Open the latest follow-up artifact and surface only drafts that need Tim approval.',
    },
    {
        'title': 'Blitz Executive inbox review leftovers',
        'outcome': 'Inbox action items become approvals, drafts, or archived noise instead of staying invisible.',
        'status': 'Triage', 'priority': 'P1', 'domain': 'Email', 'owner': 'Email Assistant',
        'riskLevel': 'Medium', 'approvalLevel': 'Ask Before External', 'confidence': 'Medium',
        'source_id': 'cron-executive-inbox-review',
        'excerpt': 'Executive Inbox Review runs daily at 8:25 AM and should produce action items.',
        'fullReference': 'cron:afba478b85e6',
        'context': 'Email scans should report inbox emails and create drafts for approval rather than hiding behind ok statuses.',
        'constraints': ['Never send without approval.'],
        'nextAction': 'Read latest inbox review output and turn remaining inbox actions into queue cards.',
    },
    {
        'title': 'Decide Chase Paze nudge',
        'outcome': 'Travel card optimization either gets completed or stops consuming reminder cycles.',
        'status': 'Proposed', 'priority': 'P3', 'domain': 'Travel Multiplier', 'owner': 'TM COS',
        'riskLevel': 'Low', 'approvalLevel': 'Manual Only', 'confidence': 'Medium',
        'source_id': 'active-queue-chase-paze-nudge',
        'excerpt': 'Chase Paze 10x setup nudge was marked Later.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#item-5',
        'context': 'This is not urgent, but it is a small money-optimization loose end.',
        'constraints': ['Do not spend or apply without Tim.'],
        'nextAction': 'Choose complete now, keep nudging, or kill the reminder.',
    },
    {
        'title': 'Convert elder onboarding email draft',
        'outcome': 'The strong elder onboarding inbox draft becomes a usable packet and meeting plan.',
        'status': 'Queued', 'priority': 'P2', 'domain': 'Restored', 'owner': 'Restored COS',
        'riskLevel': 'Medium', 'approvalLevel': 'Ask Before External', 'confidence': 'High',
        'source_id': 'active-queue-elder-onboarding-email',
        'excerpt': 'Strong draft exists in Tim inbox and likely needs conversion into usable elder onboarding packet.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#item-6',
        'context': 'This is related to but distinct from the Motion packet task.',
        'constraints': ['No external sharing without Tim approval.'],
        'nextAction': 'Find the inbox draft and convert it into a structured packet outline.',
    },
    {
        'title': 'Recheck Restored Morning Brief quality',
        'outcome': 'Restored morning brief repairs are verified by useful output, not merely ok status.',
        'status': 'Queued', 'priority': 'P2', 'domain': 'Restored', 'owner': 'Restored COS',
        'riskLevel': 'Low', 'approvalLevel': 'Auto', 'confidence': 'Medium',
        'source_id': 'active-queue-mcp-reliability-scorecard',
        'excerpt': 'Approved repairs completed. Watch next natural Restored Morning Brief and Finance Watcher runs.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#item-13',
        'context': 'The reliability lesson was that last_status ok is not enough.',
        'constraints': ['Do read-only verification unless a fresh failure needs repair approval.'],
        'nextAction': 'Inspect next Restored Morning Brief output and confirm it contains useful data.',
    },
    {
        'title': 'Prepare Tim Morris onboarding SOP later pack',
        'outcome': 'Tim Morris operations ideas are parked as a batch instead of rediscovered repeatedly.',
        'status': 'Triage', 'priority': 'P4', 'domain': 'Restored', 'owner': 'Restored COS',
        'riskLevel': 'Low', 'approvalLevel': 'Auto', 'confidence': 'Medium',
        'source_id': 'active-queue-tim-morris-sop',
        'excerpt': 'Tim Morris: On and Off Boarding SOP was chosen Later.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#item-8',
        'context': 'Bring back only when reviewing elder/governance ops.',
        'constraints': ['Do not distract current queue unless Tim asks for governance ops.'],
        'nextAction': 'Keep parked and batch with volunteer recognition when Restored systems review starts.',
    },
    {
        'title': 'Prepare volunteer recognition later pack',
        'outcome': 'Volunteer systems idea is preserved without cluttering active priorities.',
        'status': 'Triage', 'priority': 'P4', 'domain': 'Restored', 'owner': 'Restored COS',
        'riskLevel': 'Low', 'approvalLevel': 'Auto', 'confidence': 'Medium',
        'source_id': 'active-queue-volunteer-recognition',
        'excerpt': 'Tim Morris: Volunteer Recognition Program was chosen Later.',
        'fullReference': '/Users/hermes/.hermes/profiles/executive/workspaces/executive-orchestrator/active-queue.md#item-9',
        'context': 'Bring back only when reviewing volunteer systems or Tim Morris agenda.',
        'constraints': ['Do not distract active priorities.'],
        'nextAction': 'Keep parked until Restored volunteer systems review.',
    },
]

assert len(RAW_ITEMS) >= 20

ITEMS_DIR.mkdir(parents=True, mode=0o700, exist_ok=True)
QUEUE_ROOT.mkdir(parents=True, mode=0o700, exist_ok=True)

# Archive obsolete smoke-test item so it stops poisoning the operating picture.
archived = 0
for path in (QUEUE_ROOT / 'items').rglob('*.json'):
    try:
        item = json.loads(path.read_text())
    except Exception:
        continue
    if item.get('id') == 'eq_20260522_status-approval-smoke' or 'smoke test' in item.get('title', '').lower():
        if item.get('status') != 'Archived':
            item['status'] = 'Archived'
            item['updatedAt'] = TODAY
            item.setdefault('auditTrail', []).append({
                'action': 'archived',
                'actor': 'Executive Backlog Compiler',
                'timestamp': TODAY,
                'from': 'In Progress',
                'to': 'Archived',
                'note': 'Archived obsolete smoke-test item so the Command Center reflects real work.',
            })
            path.write_text(json.dumps(item, indent=2) + '\n')
            archived += 1

existing_ids = set()
if (QUEUE_ROOT / 'items').exists():
    for path in (QUEUE_ROOT / 'items').rglob('*.json'):
        try:
            existing_ids.add(json.loads(path.read_text()).get('id'))
        except Exception:
            pass

created = 0
updated = 0
for raw in RAW_ITEMS:
    domain = raw['domain'] if raw['domain'] in ALLOWED_DOMAINS else 'AI Ops'
    owner = raw['owner'] if raw['owner'] in ALLOWED_OWNERS else 'Executive'
    item_id = 'eq_blitz_' + slug(raw['source_id'])
    local_path = ITEMS_DIR / f'{item_id}.json'
    record = {
        'schemaVersion': 1,
        'id': item_id,
        'title': raw['title'],
        'outcome': raw['outcome'],
        'status': raw['status'],
        'priority': raw['priority'],
        'domain': domain,
        'owner': owner,
        'riskLevel': raw['riskLevel'],
        'approvalLevel': raw['approvalLevel'],
        'confidence': raw['confidence'],
        'source': {
            'type': 'Voice Lab',
            'id': raw['source_id'],
            'timestamp': TODAY,
            'excerpt': raw['excerpt'],
            'fullReference': raw['fullReference'],
        },
        'context': raw['context'],
        'constraints': raw['constraints'],
        'nextAction': raw['nextAction'],
        'blockedReason': '',
        'resultSummary': '',
        'createdAt': TODAY,
        'updatedAt': TODAY,
        'dueAt': '',
        'completedAt': '',
        'completedBy': '',
        'auditTrail': [{
            'action': 'created',
            'actor': 'Executive Backlog Compiler',
            'timestamp': TODAY,
            'note': 'Seeded from durable active queue and reliability queue sources so Workspace is blitz-ready.',
        }],
        'sync': {
            'notionPageId': '',
            'lastSyncedAt': '',
            'lastSyncStatus': 'not_synced',
        },
        'localPath': str(local_path),
    }
    if item_id in existing_ids:
        # Preserve any Tim-updated status/result while refreshing metadata only if file exists.
        try:
            old_path = next((QUEUE_ROOT / 'items').rglob(f'{item_id}.json'))
            old = json.loads(old_path.read_text())
            for key in ['status', 'blockedReason', 'resultSummary', 'completedAt', 'completedBy', 'auditTrail', 'createdAt']:
                record[key] = old.get(key, record[key])
            record['updatedAt'] = TODAY
            record['localPath'] = str(old_path)
            old_path.write_text(json.dumps(record, indent=2) + '\n')
            updated += 1
        except StopIteration:
            local_path.write_text(json.dumps(record, indent=2) + '\n')
            created += 1
    else:
        local_path.write_text(json.dumps(record, indent=2) + '\n')
        with (QUEUE_ROOT / 'index.jsonl').open('a') as f:
            f.write(json.dumps({
                'id': record['id'],
                'status': record['status'],
                'priority': record['priority'],
                'owner': record['owner'],
                'updatedAt': record['updatedAt'],
                'localPath': record['localPath'],
            }) + '\n')
        created += 1

print(json.dumps({'created': created, 'updated': updated, 'archived': archived, 'total_seed_items': len(RAW_ITEMS)}, indent=2))
