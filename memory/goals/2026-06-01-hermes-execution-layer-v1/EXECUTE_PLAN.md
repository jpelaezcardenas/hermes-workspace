# Hermes Execution Layer v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local execution layer that turns existing Hermes reports, handoffs, goals and memory signals into one short, source-backed daily action view.

**Architecture:** Start with a pure server-side snapshot builder that reads local files and returns a typed model. Render that model to Markdown. Expose the same model through a local API. Add a small UI only after the model and report pass validation.

**Tech Stack:** React 19, TanStack Router/Start, TypeScript, Vitest, Node filesystem APIs, existing Hermes Workspace conventions.

---

## Scope Decision

This is one goal with four implementation slices:

1. Data model and local snapshot builder.
2. Markdown report rendering.
3. Local API endpoint.
4. Small UI surface.

Do not add cron automation in this plan. If the report proves useful twice, a later goal can decide whether to wire it into `HERMES_CONTROL_DAILY`.

## File Map

Create:

- `/Users/zondrius/hermes-workspace/src/server/execution-layer.ts`
  - Pure local file reader and classifier.
  - No network calls.
  - No writes except when explicitly rendering a report through an exported function.

- `/Users/zondrius/hermes-workspace/src/server/execution-layer.test.ts`
  - Tests snapshot building, handoff detection, source citation, bucket limits and Markdown rendering.

- `/Users/zondrius/hermes-workspace/src/routes/api/execution-layer.ts`
  - Authenticated `GET /api/execution-layer` endpoint.
  - Returns JSON by default and Markdown when `?format=markdown` is provided.

- `/Users/zondrius/hermes-workspace/src/routes/execution.tsx`
  - UI route wrapper.

- `/Users/zondrius/hermes-workspace/src/screens/execution/execution-screen.tsx`
  - Small UI showing today actions, Chris decisions, open handoffs and next slice.

- `/Users/zondrius/hermes-workspace/src/screens/execution/execution-screen.test.tsx`
  - Component tests for empty, green and yellow states.

Modify only after the new route works:

- `/Users/zondrius/hermes-workspace/src/routeTree.gen.ts`
  - Generated route tree if the project requires route generation.

Do not modify in v1:

- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`
- `/Users/zondrius/hermes-workspace/handoff/codex-inbox/**`
- `/Users/zondrius/hermes-workspace/handoff/codex-outbox/**`
- `/Users/zondrius/hermes-workspace/handoff/archive/**`
- `/Users/zondrius/hermes-workspace/projects/**`

## Data Contract

Use these exact types in `/Users/zondrius/hermes-workspace/src/server/execution-layer.ts`.

```ts
export type ExecutionSignal = 'Green' | 'Yellow' | 'Red'

export type ExecutionRisk = 'Low' | 'Medium' | 'High'

export type ExecutionSource = {
  path: string
  kind:
    | 'decision-inbox'
    | 'hermes-control'
    | 'momentum-cockpit'
    | 'codex-handoff-scout'
    | 'handoff-overview'
    | 'codex-inbox'
    | 'codex-outbox'
    | 'goal'
    | 'product-report'
    | 'job-map'
}

export type ExecutionAction = {
  title: string
  owner: 'Chris' | 'Hermes' | 'Codex' | 'Neva'
  timebox: string
  source: string
  doneWhen: string
  risk: ExecutionRisk
}

export type ExecutionDecision = {
  title: string
  whyChris: string
  risk: ExecutionRisk
  source: string
}

export type ExecutionHandoff = {
  filename: string
  status: 'open' | 'blocked' | 'ready-for-review'
  source: string
  next: string
}

export type ExecutionWin = {
  title: string
  whyItMatters: string
  proof: string
}

export type ExecutionMemoryCandidate = {
  title: string
  category: 'stable-rule' | 'project-state' | 'temporary-signal' | 'do-not-store'
  source: string
  recommendation: 'review' | 'skip' | 'candidate'
}

export type ExecutionLayerSnapshot = {
  generatedAt: string
  signal: ExecutionSignal
  focus: string
  today: Array<ExecutionAction>
  waitingForChris: Array<ExecutionDecision>
  codexOpen: Array<ExecutionHandoff>
  wins: Array<ExecutionWin>
  dontTouch: Array<{ item: string; reason: string; source: string }>
  memoryCandidates: Array<ExecutionMemoryCandidate>
  nextSmallestSlice: {
    action: string
    whyThis: string
    acceptance: string
    shouldBecomeCodexHandoff: boolean
  }
  proofLog: Array<ExecutionSource>
  warnings: Array<string>
}

export type ExecutionLayerOptions = {
  workspaceRoot?: string
  now?: Date
}
```

## Task 1: Build Snapshot Test Fixtures

**Files:**

- Create: `/Users/zondrius/hermes-workspace/src/server/execution-layer.test.ts`

- [ ] **Step 1: Add a temporary fixture builder**

Add this test helper at the top of `execution-layer.test.ts`.

```ts
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  buildExecutionLayerSnapshot,
  renderExecutionLayerMarkdown,
} from './execution-layer'

const tempRoots: Array<string> = []

function makeWorkspaceFixture(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-execution-layer-'))
  tempRoots.push(root)

  const dirs = [
    'reports/decision-inbox',
    'reports/hermes-control',
    'reports/codex-handoff-scout',
    'handoff/codex-inbox',
    'handoff/codex-outbox',
    'memory/goals/2026-06-01-demo-goal',
  ]
  for (const dir of dirs) {
    fs.mkdirSync(path.join(root, dir), { recursive: true })
  }

  fs.writeFileSync(
    path.join(root, 'reports/decision-inbox/decision-inbox-2026-06-01.md'),
    [
      '# Decision Inbox 2026-06-01',
      '## Decision Inbox',
      '- Signal: Yellow',
      '- SOFORT_MACHEN: Finish one open Codex handoff.',
      '- CHRIS_ENTSCHEIDET: codegraph P2 freigeben oder parken.',
      '- BEOBACHTEN: agentmemory MCP-only weiter beobachten.',
      '- SPAETER: Dashboard UI erst nach zwei nuetzlichen Reports.',
      '- BLOCKIERT: Keine.',
      '- NICHT_TUN: Keine neuen Cronjobs.',
      '- Naechste kleinste Aktion: Offenen Handoff abschliessen.',
      '- Beleg / Datei: handoff/codex-inbox/codex-handoff-2026-06-01-demo.md',
      '',
    ].join('\n'),
  )

  fs.writeFileSync(
    path.join(root, 'reports/hermes-control/hermes-momentum-cockpit-2026-06-01.md'),
    [
      '# Hermes Momentum Cockpit - 2026-06-01',
      'Signal: Yellow',
      'Fokus: Offene Codex-Handoffs klaeren.',
      '## Nicht anfassen',
      '- Item: Neue Cronjobs fuer Momentum Cockpit.',
      '  Reason: Erst manuell validieren.',
      '',
    ].join('\n'),
  )

  fs.writeFileSync(
    path.join(root, 'reports/codex-handoff-scout/codex-handoff-scout-2026-06-01.md'),
    [
      '# Codex Handoff Scout 2026-06-01',
      'Created handoff: codex-handoff-2026-06-01-demo.md',
      '',
    ].join('\n'),
  )

  fs.writeFileSync(
    path.join(root, 'handoff/HANDOFF_OVERVIEW.md'),
    [
      '# Handoff Overview',
      '- Open: codex-handoff-2026-06-01-demo.md',
      '',
    ].join('\n'),
  )

  fs.writeFileSync(
    path.join(root, 'handoff/codex-inbox/codex-handoff-2026-06-01-demo.md'),
    [
      '# Codex Handoff',
      '## Ziel',
      'Demo handoff abschliessen.',
      '## Akzeptanzkriterien',
      '- Outbox result exists.',
      '',
    ].join('\n'),
  )

  fs.writeFileSync(
    path.join(root, 'memory/goals/2026-06-01-demo-goal/GOAL.md'),
    [
      '# Goal: Demo',
      'Status: active',
      'No new cronjobs.',
      '',
    ].join('\n'),
  )

  return root
}

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true })
  }
})
```

- [ ] **Step 2: Add snapshot tests**

Append these tests.

```ts
describe('buildExecutionLayerSnapshot', () => {
  it('creates a small source-backed execution snapshot from existing files', () => {
    const workspaceRoot = makeWorkspaceFixture()
    const snapshot = buildExecutionLayerSnapshot({
      workspaceRoot,
      now: new Date('2026-06-01T10:00:00.000Z'),
    })

    expect(snapshot.signal).toBe('Yellow')
    expect(snapshot.today.length).toBeLessThanOrEqual(3)
    expect(snapshot.codexOpen).toEqual([
      expect.objectContaining({
        filename: 'codex-handoff-2026-06-01-demo.md',
        status: 'open',
      }),
    ])
    expect(snapshot.waitingForChris).toEqual([
      expect.objectContaining({
        title: expect.stringContaining('codegraph P2'),
      }),
    ])
    expect(snapshot.dontTouch).toEqual([
      expect.objectContaining({
        item: expect.stringContaining('Cronjobs'),
      }),
    ])
    expect(snapshot.nextSmallestSlice.action).toContain('codex-handoff-2026-06-01-demo.md')
    expect(snapshot.proofLog.map((entry) => entry.path)).toContain(
      path.join(workspaceRoot, 'reports/decision-inbox/decision-inbox-2026-06-01.md'),
    )
  })

  it('renders markdown with required sections and exact source paths', () => {
    const workspaceRoot = makeWorkspaceFixture()
    const snapshot = buildExecutionLayerSnapshot({
      workspaceRoot,
      now: new Date('2026-06-01T10:00:00.000Z'),
    })

    const markdown = renderExecutionLayerMarkdown(snapshot)

    expect(markdown).toContain('# Hermes Execution Layer - 2026-06-01')
    expect(markdown).toContain('## Heute wirklich tun')
    expect(markdown).toContain('## Wartet auf Chris')
    expect(markdown).toContain('## Codex offen')
    expect(markdown).toContain('## Nicht anfassen')
    expect(markdown).toContain('## Naechster kleinster Slice')
    expect(markdown).toContain(
      path.join(workspaceRoot, 'handoff/codex-inbox/codex-handoff-2026-06-01-demo.md'),
    )
  })
})
```

- [ ] **Step 3: Run the failing tests**

Run:

```bash
cd /Users/zondrius/hermes-workspace && pnpm vitest run src/server/execution-layer.test.ts
```

Expected result:

```text
FAIL src/server/execution-layer.test.ts
Cannot find module './execution-layer'
```

## Task 2: Implement Snapshot Builder

**Files:**

- Create: `/Users/zondrius/hermes-workspace/src/server/execution-layer.ts`
- Test: `/Users/zondrius/hermes-workspace/src/server/execution-layer.test.ts`

- [ ] **Step 1: Create the server module**

Create `/Users/zondrius/hermes-workspace/src/server/execution-layer.ts` with this implementation.

```ts
import fs from 'node:fs'
import path from 'node:path'

export type ExecutionSignal = 'Green' | 'Yellow' | 'Red'
export type ExecutionRisk = 'Low' | 'Medium' | 'High'

export type ExecutionSource = {
  path: string
  kind:
    | 'decision-inbox'
    | 'hermes-control'
    | 'momentum-cockpit'
    | 'codex-handoff-scout'
    | 'handoff-overview'
    | 'codex-inbox'
    | 'codex-outbox'
    | 'goal'
    | 'product-report'
    | 'job-map'
}

export type ExecutionAction = {
  title: string
  owner: 'Chris' | 'Hermes' | 'Codex' | 'Neva'
  timebox: string
  source: string
  doneWhen: string
  risk: ExecutionRisk
}

export type ExecutionDecision = {
  title: string
  whyChris: string
  risk: ExecutionRisk
  source: string
}

export type ExecutionHandoff = {
  filename: string
  status: 'open' | 'blocked' | 'ready-for-review'
  source: string
  next: string
}

export type ExecutionWin = {
  title: string
  whyItMatters: string
  proof: string
}

export type ExecutionMemoryCandidate = {
  title: string
  category: 'stable-rule' | 'project-state' | 'temporary-signal' | 'do-not-store'
  source: string
  recommendation: 'review' | 'skip' | 'candidate'
}

export type ExecutionLayerSnapshot = {
  generatedAt: string
  signal: ExecutionSignal
  focus: string
  today: Array<ExecutionAction>
  waitingForChris: Array<ExecutionDecision>
  codexOpen: Array<ExecutionHandoff>
  wins: Array<ExecutionWin>
  dontTouch: Array<{ item: string; reason: string; source: string }>
  memoryCandidates: Array<ExecutionMemoryCandidate>
  nextSmallestSlice: {
    action: string
    whyThis: string
    acceptance: string
    shouldBecomeCodexHandoff: boolean
  }
  proofLog: Array<ExecutionSource>
  warnings: Array<string>
}

export type ExecutionLayerOptions = {
  workspaceRoot?: string
  now?: Date
}

type ReadFile = {
  path: string
  content: string
}

function defaultWorkspaceRoot(): string {
  return process.env.HERMES_WORKSPACE
    ? path.resolve(process.env.HERMES_WORKSPACE)
    : path.resolve(process.cwd())
}

function readTextFile(filePath: string): ReadFile | null {
  try {
    const stat = fs.statSync(filePath)
    if (!stat.isFile()) return null
    return { path: filePath, content: fs.readFileSync(filePath, 'utf-8') }
  } catch {
    return null
  }
}

function listMarkdownFiles(dirPath: string): Array<string> {
  try {
    return fs
      .readdirSync(dirPath)
      .filter((name) => name.toLowerCase().endsWith('.md'))
      .map((name) => path.join(dirPath, name))
      .sort()
  } catch {
    return []
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function latestMarkdownFile(dirPath: string, prefix: string): ReadFile | null {
  const datedName = new RegExp(
    `^${escapeRegExp(prefix)}\\d{4}-\\d{2}-\\d{2}.*\\.md$`,
  )
  const files = listMarkdownFiles(dirPath).filter((filePath) => {
    const name = path.basename(filePath)
    return name.startsWith(prefix) && datedName.test(name)
  })
  const latest = files.at(-1)
  return latest ? readTextFile(latest) : null
}

function firstMatchingLine(content: string, marker: string): string | null {
  const line = content
    .split(/\r?\n/)
    .find((entry) => entry.toLowerCase().includes(marker.toLowerCase()))
  return line?.replace(/^[-*]\s*/, '').trim() || null
}

function stripDecisionPrefix(line: string): string {
  return line.replace(/^CHRIS_ENTSCHEIDET:\s*/i, '').trim()
}

function source(pathValue: string, kind: ExecutionSource['kind']): ExecutionSource {
  return { path: pathValue, kind }
}

function uniqueSources(sources: Array<ExecutionSource>): Array<ExecutionSource> {
  const seen = new Set<string>()
  return sources.filter((entry) => {
    const key = `${entry.kind}:${entry.path}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function classifySignal(openHandoffs: number, warnings: number): ExecutionSignal {
  if (warnings > 0) return 'Red'
  if (openHandoffs > 0) return 'Yellow'
  return 'Green'
}

function listOpenHandoffs(workspaceRoot: string): Array<ExecutionHandoff> {
  const inboxDir = path.join(workspaceRoot, 'handoff/codex-inbox')
  return listMarkdownFiles(inboxDir).map((filePath) => ({
    filename: path.basename(filePath),
    status: 'open',
    source: filePath,
    next: 'Bearbeiten, zur Review geben oder explizit blockieren.',
  }))
}

function buildTodayActions(
  codexOpen: Array<ExecutionHandoff>,
  latestDecisionInbox: ReadFile | null,
): Array<ExecutionAction> {
  const actions: Array<ExecutionAction> = []

  for (const handoff of codexOpen.slice(0, 2)) {
    actions.push({
      title: `Offenen Codex-Handoff ${handoff.filename} abschliessen oder sauber blockieren.`,
      owner: 'Codex',
      timebox: '30-45 Minuten',
      source: handoff.source,
      doneWhen: 'Outbox-Ergebnis existiert oder ein Blocker ist dokumentiert.',
      risk: 'Low',
    })
  }

  if (actions.length === 0 && latestDecisionInbox) {
    const immediate = firstMatchingLine(latestDecisionInbox.content, 'SOFORT_MACHEN:')
    if (immediate) {
      actions.push({
        title: immediate.replace(/^SOFORT_MACHEN:\s*/i, '').trim(),
        owner: 'Hermes',
        timebox: '20 Minuten',
        source: latestDecisionInbox.path,
        doneWhen: 'Aktion ist erledigt oder als blockiert markiert.',
        risk: 'Low',
      })
    }
  }

  return actions.slice(0, 3)
}

function buildChrisDecisions(latestDecisionInbox: ReadFile | null): Array<ExecutionDecision> {
  if (!latestDecisionInbox) return []
  const decision = firstMatchingLine(latestDecisionInbox.content, 'CHRIS_ENTSCHEIDET:')
  if (!decision) return []

  return [
    {
      title: stripDecisionPrefix(decision),
      whyChris: 'Diese Entscheidung betrifft Risiko, dauerhafte Struktur oder Prioritaet.',
      risk: 'Medium',
      source: latestDecisionInbox.path,
    },
  ]
}

function buildDontTouch(
  latestDecisionInbox: ReadFile | null,
  latestMomentum: ReadFile | null,
): Array<{ item: string; reason: string; source: string }> {
  const items: Array<{ item: string; reason: string; source: string }> = []

  if (latestDecisionInbox) {
    const noGo = firstMatchingLine(latestDecisionInbox.content, 'NICHT_TUN:')
    if (noGo) {
      items.push({
        item: noGo.replace(/^NICHT_TUN:\s*/i, '').trim(),
        reason: 'Decision Inbox markiert dies als Nicht-Tun.',
        source: latestDecisionInbox.path,
      })
    }
  }

  if (latestMomentum && latestMomentum.content.includes('Neue Cronjobs')) {
    items.push({
      item: 'Neue Cronjobs fuer die Execution Layer.',
      reason: 'Erst manuell validieren; keine neue Automatik in v1.',
      source: latestMomentum.path,
    })
  }

  return items.slice(0, 5)
}

function buildWins(workspaceRoot: string): Array<ExecutionWin> {
  const reportsDir = path.join(workspaceRoot, 'reports')
  const productReport = latestMarkdownFile(reportsDir, 'productklarheit-v1-ceo-synthesis-')
  if (!productReport) return []

  return [
    {
      title: 'Productklarheit v1 ist belegt.',
      whyItMatters: 'Schulwerkstatt und LeseWerk haben eine klarere Verbindung und weniger Startreibung.',
      proof: productReport.path,
    },
  ]
}

function buildMemoryCandidates(
  latestDecisionInbox: ReadFile | null,
  latestMomentum: ReadFile | null,
): Array<ExecutionMemoryCandidate> {
  const candidates: Array<ExecutionMemoryCandidate> = []

  if (latestDecisionInbox) {
    candidates.push({
      title: 'Decision Inbox Regeln nur nach Review dauerhaft speichern.',
      category: 'stable-rule',
      source: latestDecisionInbox.path,
      recommendation: 'candidate',
    })
  }

  if (latestMomentum) {
    candidates.push({
      title: 'Momentum Cockpit Status bleibt Projektstand, nicht Langzeit-Memory.',
      category: 'project-state',
      source: latestMomentum.path,
      recommendation: 'review',
    })
  }

  return candidates
}

export function buildExecutionLayerSnapshot(
  options: ExecutionLayerOptions = {},
): ExecutionLayerSnapshot {
  const workspaceRoot = path.resolve(options.workspaceRoot ?? defaultWorkspaceRoot())
  const now = options.now ?? new Date()

  const latestDecisionInbox = latestMarkdownFile(
    path.join(workspaceRoot, 'reports/decision-inbox'),
    'decision-inbox-',
  )
  const latestMomentum = latestMarkdownFile(
    path.join(workspaceRoot, 'reports/hermes-control'),
    'hermes-momentum-cockpit-',
  )
  const latestHandoffScout = latestMarkdownFile(
    path.join(workspaceRoot, 'reports/codex-handoff-scout'),
    'codex-handoff-scout-',
  )
  const handoffOverview = readTextFile(path.join(workspaceRoot, 'handoff/HANDOFF_OVERVIEW.md'))

  const codexOpen = listOpenHandoffs(workspaceRoot)
  const waitingForChris = buildChrisDecisions(latestDecisionInbox)
  const today = buildTodayActions(codexOpen, latestDecisionInbox)
  const dontTouch = buildDontTouch(latestDecisionInbox, latestMomentum)
  const wins = buildWins(workspaceRoot)
  const memoryCandidates = buildMemoryCandidates(latestDecisionInbox, latestMomentum)
  const warnings: Array<string> = []

  const proofLog = uniqueSources(
    [
      latestDecisionInbox ? source(latestDecisionInbox.path, 'decision-inbox') : null,
      latestMomentum ? source(latestMomentum.path, 'momentum-cockpit') : null,
      latestHandoffScout ? source(latestHandoffScout.path, 'codex-handoff-scout') : null,
      handoffOverview ? source(handoffOverview.path, 'handoff-overview') : null,
      ...codexOpen.map((handoff) => source(handoff.source, 'codex-inbox')),
      ...wins.map((win) => source(win.proof, 'product-report')),
    ].filter((entry): entry is ExecutionSource => Boolean(entry)),
  )

  const signal = classifySignal(codexOpen.length, warnings.length)
  const firstHandoff = codexOpen[0]

  return {
    generatedAt: now.toISOString(),
    signal,
    focus:
      codexOpen.length > 0
        ? 'Offene Codex-Handoffs klaeren, bevor neue Slices gestartet werden.'
        : 'Keine offenen Codex-Handoffs; naechste sichere Tagesaktion waehlen.',
    today,
    waitingForChris,
    codexOpen,
    wins,
    dontTouch,
    memoryCandidates,
    nextSmallestSlice: firstHandoff
      ? {
          action: `Codex-Handoff ${firstHandoff.filename} abschliessen oder sauber blockieren.`,
          whyThis: 'Offene Handoffs senken, bevor Hermes neue Arbeit erzeugt.',
          acceptance: 'Outbox-Ergebnis existiert oder ein Blocker ist dokumentiert.',
          shouldBecomeCodexHandoff: false,
        }
      : {
          action: today[0]?.title ?? 'Naechsten Decision-Inbox-Eintrag pruefen.',
          whyThis: 'Es gibt keinen offenen Codex-Handoff.',
          acceptance: 'Aktion ist erledigt oder als blockiert markiert.',
          shouldBecomeCodexHandoff: false,
        },
    proofLog,
    warnings,
  }
}

function renderAction(action: ExecutionAction, index: number): string {
  return [
    `${index + 1}. Action: ${action.title}`,
    `   Owner: ${action.owner}`,
    `   Timebox: ${action.timebox}`,
    `   Source: \`${action.source}\``,
    `   Done when: ${action.doneWhen}`,
  ].join('\n')
}

export function renderExecutionLayerMarkdown(snapshot: ExecutionLayerSnapshot): string {
  const day = snapshot.generatedAt.slice(0, 10)
  return [
    `# Hermes Execution Layer - ${day}`,
    '',
    `Signal: ${snapshot.signal}`,
    `Fokus: ${snapshot.focus}`,
    '',
    '## Heute wirklich tun',
    snapshot.today.length > 0
      ? snapshot.today.map(renderAction).join('\n\n')
      : '- Keine sichere Tagesaktion gefunden.',
    '',
    '## Wartet auf Chris',
    snapshot.waitingForChris.length > 0
      ? snapshot.waitingForChris
          .map(
            (decision) =>
              [
                `- Decision: ${decision.title}`,
                `  Why Chris: ${decision.whyChris}`,
                `  Risk: ${decision.risk}`,
                `  Source: \`${decision.source}\``,
              ].join('\n'),
          )
          .join('\n\n')
      : '- Keine Chris-Entscheidung aus den aktuellen Quellen erkannt.',
    '',
    '## Codex offen',
    snapshot.codexOpen.length > 0
      ? snapshot.codexOpen
          .map(
            (handoff) =>
              [
                `- Handoff: \`${handoff.filename}\``,
                `  Status: ${handoff.status}`,
                `  Next: ${handoff.next}`,
                `  Source: \`${handoff.source}\``,
              ].join('\n'),
          )
          .join('\n\n')
      : '- Keine offenen Codex-Handoffs gefunden.',
    '',
    '## Gewonnen diese Woche',
    snapshot.wins.length > 0
      ? snapshot.wins
          .map(
            (win) =>
              [
                `- Win: ${win.title}`,
                `  Why it matters: ${win.whyItMatters}`,
                `  Proof: \`${win.proof}\``,
              ].join('\n'),
          )
          .join('\n\n')
      : '- Kein belegter Wochengewinn erkannt.',
    '',
    '## Nicht anfassen',
    snapshot.dontTouch.length > 0
      ? snapshot.dontTouch
          .map(
            (item) =>
              [
                `- Item: ${item.item}`,
                `  Reason: ${item.reason}`,
                `  Source: \`${item.source}\``,
              ].join('\n'),
          )
          .join('\n\n')
      : '- Keine Nicht-Tun-Regel aus den aktuellen Quellen erkannt.',
    '',
    '## Memory Kandidaten',
    snapshot.memoryCandidates.length > 0
      ? snapshot.memoryCandidates
          .map(
            (candidate) =>
              [
                `- Candidate: ${candidate.title}`,
                `  Category: ${candidate.category}`,
                `  Recommendation: ${candidate.recommendation}`,
                `  Source: \`${candidate.source}\``,
              ].join('\n'),
          )
          .join('\n\n')
      : '- Keine Memory-Kandidaten.',
    '',
    '## Naechster kleinster Slice',
    `Action: ${snapshot.nextSmallestSlice.action}`,
    `Why this: ${snapshot.nextSmallestSlice.whyThis}`,
    `Acceptance: ${snapshot.nextSmallestSlice.acceptance}`,
    `Should become Codex handoff: ${snapshot.nextSmallestSlice.shouldBecomeCodexHandoff ? 'yes' : 'no'}`,
    '',
    '## Belege',
    ...snapshot.proofLog.map((entry) => `- \`${entry.path}\` (${entry.kind})`),
    '',
  ].join('\n')
}
```

- [ ] **Step 2: Run the server tests**

Run:

```bash
cd /Users/zondrius/hermes-workspace && pnpm vitest run src/server/execution-layer.test.ts
```

Expected result:

```text
PASS src/server/execution-layer.test.ts
```

- [ ] **Step 3: Commit slice 1**

Run:

```bash
cd /Users/zondrius/hermes-workspace
git add src/server/execution-layer.ts src/server/execution-layer.test.ts
git commit -m "feat: add hermes execution snapshot builder"
```

## Task 3: Add Local API Endpoint

**Files:**

- Create: `/Users/zondrius/hermes-workspace/src/routes/api/execution-layer.ts`
- Test: `/Users/zondrius/hermes-workspace/src/server/execution-layer.test.ts`

- [ ] **Step 1: Create the endpoint**

Create `/Users/zondrius/hermes-workspace/src/routes/api/execution-layer.ts`.

```ts
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { isAuthenticated } from '../../server/auth-middleware'
import {
  buildExecutionLayerSnapshot,
  renderExecutionLayerMarkdown,
} from '../../server/execution-layer'

export const Route = createFileRoute('/api/execution-layer')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAuthenticated(request)) {
          return json({ error: 'Unauthorized' }, { status: 401 })
        }

        const url = new URL(request.url)
        const format = url.searchParams.get('format')

        try {
          const snapshot = buildExecutionLayerSnapshot()
          if (format === 'markdown') {
            return new Response(renderExecutionLayerMarkdown(snapshot), {
              headers: {
                'Content-Type': 'text/markdown; charset=utf-8',
                'Cache-Control': 'private, max-age=10',
              },
            })
          }

          return json(
            { ok: true, snapshot },
            {
              headers: {
                'Cache-Control': 'private, max-age=10',
              },
            },
          )
        } catch (error) {
          return json(
            {
              ok: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to build execution layer',
            },
            { status: 500 },
          )
        }
      },
    },
  },
})
```

- [ ] **Step 2: Run typecheck/build**

Run:

```bash
cd /Users/zondrius/hermes-workspace && pnpm build
```

Expected result:

```text
vite build completed
```

- [ ] **Step 3: Commit slice 2**

Run:

```bash
cd /Users/zondrius/hermes-workspace
git add src/routes/api/execution-layer.ts
git commit -m "feat: expose hermes execution layer api"
```

## Task 4: Add Markdown Report Writer

**Files:**

- Modify: `/Users/zondrius/hermes-workspace/src/server/execution-layer.ts`
- Modify: `/Users/zondrius/hermes-workspace/src/server/execution-layer.test.ts`

- [ ] **Step 1: Add report writer test**

Append this test to `/Users/zondrius/hermes-workspace/src/server/execution-layer.test.ts`.

```ts
import { writeExecutionLayerReport } from './execution-layer'

it('writes a dated markdown report into reports/hermes-control', () => {
  const workspaceRoot = makeWorkspaceFixture()
  const snapshot = buildExecutionLayerSnapshot({
    workspaceRoot,
    now: new Date('2026-06-01T10:00:00.000Z'),
  })

  const reportPath = writeExecutionLayerReport(snapshot, { workspaceRoot })

  expect(reportPath).toBe(
    path.join(workspaceRoot, 'reports/hermes-control/hermes-execution-layer-2026-06-01.md'),
  )
  expect(fs.readFileSync(reportPath, 'utf-8')).toContain(
    '# Hermes Execution Layer - 2026-06-01',
  )
})
```

- [ ] **Step 2: Run failing test**

Run:

```bash
cd /Users/zondrius/hermes-workspace && pnpm vitest run src/server/execution-layer.test.ts
```

Expected result:

```text
FAIL writeExecutionLayerReport is not exported
```

- [ ] **Step 3: Add writer implementation**

Append this export to `/Users/zondrius/hermes-workspace/src/server/execution-layer.ts`.

```ts
export function writeExecutionLayerReport(
  snapshot: ExecutionLayerSnapshot,
  options: { workspaceRoot?: string } = {},
): string {
  const workspaceRoot = path.resolve(options.workspaceRoot ?? defaultWorkspaceRoot())
  const day = snapshot.generatedAt.slice(0, 10)
  const reportDir = path.join(workspaceRoot, 'reports/hermes-control')
  fs.mkdirSync(reportDir, { recursive: true })
  const reportPath = path.join(reportDir, `hermes-execution-layer-${day}.md`)
  fs.writeFileSync(reportPath, renderExecutionLayerMarkdown(snapshot), 'utf-8')
  return reportPath
}
```

- [ ] **Step 4: Run tests**

Run:

```bash
cd /Users/zondrius/hermes-workspace && pnpm vitest run src/server/execution-layer.test.ts
```

Expected result:

```text
PASS src/server/execution-layer.test.ts
```

- [ ] **Step 5: Commit slice 3**

Run:

```bash
cd /Users/zondrius/hermes-workspace
git add src/server/execution-layer.ts src/server/execution-layer.test.ts
git commit -m "feat: write hermes execution layer reports"
```

## Task 5: Add Small UI Route

**Files:**

- Create: `/Users/zondrius/hermes-workspace/src/routes/execution.tsx`
- Create: `/Users/zondrius/hermes-workspace/src/screens/execution/execution-screen.tsx`
- Create: `/Users/zondrius/hermes-workspace/src/screens/execution/execution-screen.test.tsx`

- [ ] **Step 1: Create route wrapper**

Create `/Users/zondrius/hermes-workspace/src/routes/execution.tsx`.

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { usePageTitle } from '@/hooks/use-page-title'
import { ExecutionScreen } from '@/screens/execution/execution-screen'

export const Route = createFileRoute('/execution')({
  ssr: false,
  component: ExecutionRoute,
})

function ExecutionRoute() {
  usePageTitle('Execution')
  return <ExecutionScreen />
}
```

- [ ] **Step 2: Create screen component**

Create `/Users/zondrius/hermes-workspace/src/screens/execution/execution-screen.tsx`.

```tsx
import { useQuery } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import type { ExecutionLayerSnapshot } from '@/server/execution-layer'

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="rounded-lg border border-[var(--theme-border)] bg-[var(--theme-card)] p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
        {title}
      </h2>
      {children}
    </section>
  )
}

async function fetchExecutionLayer(): Promise<ExecutionLayerSnapshot> {
  const response = await fetch('/api/execution-layer')
  if (!response.ok) throw new Error('Execution Layer konnte nicht geladen werden.')
  const payload = (await response.json()) as {
    ok: boolean
    snapshot?: ExecutionLayerSnapshot
    error?: string
  }
  if (!payload.ok || !payload.snapshot) {
    throw new Error(payload.error ?? 'Execution Layer konnte nicht geladen werden.')
  }
  return payload.snapshot
}

export function ExecutionScreen() {
  const query = useQuery({
    queryKey: ['execution-layer'],
    queryFn: fetchExecutionLayer,
    refetchInterval: 60_000,
  })

  if (query.isLoading) {
    return (
      <main className="h-full overflow-auto bg-[var(--theme-bg)] p-6 text-ink">
        <p className="text-sm text-muted">Execution Layer wird geladen...</p>
      </main>
    )
  }

  if (query.isError) {
    return (
      <main className="h-full overflow-auto bg-[var(--theme-bg)] p-6 text-ink">
        <Section title="Fehler">
          <p className="text-sm text-muted">
            {query.error instanceof Error ? query.error.message : 'Unbekannter Fehler'}
          </p>
        </Section>
      </main>
    )
  }

  const snapshot = query.data

  return (
    <main className="h-full overflow-auto bg-[var(--theme-bg)] p-4 text-ink md:p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-4">
        <header className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Hermes Execution Layer
          </p>
          <h1 className="text-2xl font-semibold">Heute steuerbar machen</h1>
          <p className="text-sm text-muted">
            Signal: {snapshot.signal}. {snapshot.focus}
          </p>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Section title="Heute wirklich tun">
            <div className="flex flex-col gap-3">
              {snapshot.today.map((action) => (
                <article key={`${action.source}:${action.title}`} className="rounded-md bg-[var(--theme-card2)] p-3">
                  <h3 className="text-sm font-semibold">{action.title}</h3>
                  <p className="mt-1 text-xs text-muted">
                    {action.owner} · {action.timebox}
                  </p>
                  <p className="mt-2 text-xs text-muted">{action.doneWhen}</p>
                </article>
              ))}
              {snapshot.today.length === 0 && (
                <p className="text-sm text-muted">Keine sichere Tagesaktion gefunden.</p>
              )}
            </div>
          </Section>

          <Section title="Naechster kleinster Slice">
            <h3 className="text-sm font-semibold">{snapshot.nextSmallestSlice.action}</h3>
            <p className="mt-2 text-sm text-muted">{snapshot.nextSmallestSlice.whyThis}</p>
            <p className="mt-3 text-xs text-muted">{snapshot.nextSmallestSlice.acceptance}</p>
          </Section>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Section title="Wartet auf Chris">
            <ul className="space-y-3">
              {snapshot.waitingForChris.map((decision) => (
                <li key={`${decision.source}:${decision.title}`} className="text-sm">
                  <span className="font-medium">{decision.title}</span>
                  <p className="text-xs text-muted">{decision.whyChris}</p>
                </li>
              ))}
              {snapshot.waitingForChris.length === 0 && (
                <li className="text-sm text-muted">Nichts erkannt.</li>
              )}
            </ul>
          </Section>

          <Section title="Codex offen">
            <ul className="space-y-3">
              {snapshot.codexOpen.map((handoff) => (
                <li key={handoff.source} className="text-sm">
                  <span className="font-medium">{handoff.filename}</span>
                  <p className="text-xs text-muted">{handoff.next}</p>
                </li>
              ))}
              {snapshot.codexOpen.length === 0 && (
                <li className="text-sm text-muted">Keine offenen Handoffs.</li>
              )}
            </ul>
          </Section>

          <Section title="Nicht anfassen">
            <ul className="space-y-3">
              {snapshot.dontTouch.map((item) => (
                <li key={`${item.source}:${item.item}`} className="text-sm">
                  <span className="font-medium">{item.item}</span>
                  <p className="text-xs text-muted">{item.reason}</p>
                </li>
              ))}
              {snapshot.dontTouch.length === 0 && (
                <li className="text-sm text-muted">Keine Nicht-Tun-Regel erkannt.</li>
              )}
            </ul>
          </Section>
        </div>

        <Section title="Belege">
          <ul className="space-y-1 text-xs text-muted">
            {snapshot.proofLog.map((entry) => (
              <li key={`${entry.kind}:${entry.path}`}>
                {entry.kind}: {entry.path}
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Add component smoke test**

Create `/Users/zondrius/hermes-workspace/src/screens/execution/execution-screen.test.tsx`.

```tsx
// @vitest-environment jsdom
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ExecutionScreen } from './execution-screen'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ExecutionScreen', () => {
  it('renders the loading state', () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise(() => undefined)),
    )

    render(
      <QueryClientProvider client={new QueryClient()}>
        <ExecutionScreen />
      </QueryClientProvider>,
    )

    expect(screen.getByText('Execution Layer wird geladen...')).toBeTruthy()
  })
})
```

- [ ] **Step 4: Run UI test**

Run:

```bash
cd /Users/zondrius/hermes-workspace && pnpm vitest run src/screens/execution/execution-screen.test.tsx
```

Expected result:

```text
PASS src/screens/execution/execution-screen.test.tsx
```

- [ ] **Step 5: Run build**

Run:

```bash
cd /Users/zondrius/hermes-workspace && pnpm build
```

Expected result:

```text
vite build completed
```

- [ ] **Step 6: Commit slice 4**

Run:

```bash
cd /Users/zondrius/hermes-workspace
git add src/routes/execution.tsx src/screens/execution/execution-screen.tsx src/screens/execution/execution-screen.test.tsx
git commit -m "feat: add hermes execution layer screen"
```

## Task 6: Manual Report Generation

**Files:**

- Create: `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-execution-layer-2026-06-01.md`

- [ ] **Step 1: Generate from the API or server helper**

After Task 4 exists, generate the first report by calling `writeExecutionLayerReport` from a one-off local TypeScript command.

Run:

```bash
cd /Users/zondrius/hermes-workspace
pnpm exec tsx -e "import { buildExecutionLayerSnapshot, writeExecutionLayerReport } from './src/server/execution-layer.ts'; const workspaceRoot = process.cwd(); const snapshot = buildExecutionLayerSnapshot({ workspaceRoot, now: new Date('2026-06-01T10:00:00.000Z') }); console.log(writeExecutionLayerReport(snapshot, { workspaceRoot }));"
```

Expected result:

```text
reports/hermes-control/hermes-execution-layer-2026-06-01.md exists
```

- [ ] **Step 2: Verify report contract manually**

Check the report has:

- `Heute wirklich tun`
- `Wartet auf Chris`
- `Codex offen`
- `Nicht anfassen`
- `Memory Kandidaten`
- `Naechster kleinster Slice`
- exact source paths under `Belege`

- [ ] **Step 3: Commit report**

Run:

```bash
cd /Users/zondrius/hermes-workspace
git add reports/hermes-control/hermes-execution-layer-2026-06-01.md
git commit -m "docs: add first hermes execution layer report"
```

## Task 7: Validation Gate

**Files:**

- Modify: `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-execution-layer-v1/VALIDATION.md`

- [ ] **Step 1: Fill validation with real results**

Update `VALIDATION.md` so every check has `yes`, `no`, or `blocked` with a reason.

Required checks:

```markdown
## Implementation Validation
- Snapshot builder tests pass:
- API route builds:
- UI route builds:
- First report exists:
- At most 3 today actions:
- Exactly 1 next smallest slice:
- Open handoffs visible:
- Chris decisions separate:
- No cron changed:
- No archive moved/deleted:
- No automatic memory write:
- No external service:
```

- [ ] **Step 2: Run full verification**

Run:

```bash
cd /Users/zondrius/hermes-workspace
pnpm vitest run src/server/execution-layer.test.ts src/screens/execution/execution-screen.test.tsx
pnpm build
```

Expected result:

```text
Tests pass and build completes.
```

- [ ] **Step 3: Commit validation**

Run:

```bash
cd /Users/zondrius/hermes-workspace
git add memory/goals/2026-06-01-hermes-execution-layer-v1/VALIDATION.md
git commit -m "docs: validate hermes execution layer v1"
```

## Acceptance Gate

The goal is complete only when all are true:

- [ ] `GOAL.md` exists.
- [ ] `EXECUTE_PLAN.md` exists.
- [ ] `VALIDATION.md` exists.
- [ ] Snapshot builder reads only local files.
- [ ] Snapshot builder has tests.
- [ ] Markdown renderer has tests.
- [ ] API endpoint is authenticated.
- [ ] UI shows the five core buckets.
- [ ] First report exists.
- [ ] No cronjob was added.
- [ ] No handoff was moved, deleted or archived.
- [ ] No memory was automatically written.
- [ ] No external service was called.
- [ ] `pnpm build` passes.

## Rollback

If the implementation causes trouble:

1. Remove the route file:
   `/Users/zondrius/hermes-workspace/src/routes/execution.tsx`
2. Remove the screen folder:
   `/Users/zondrius/hermes-workspace/src/screens/execution/`
3. Remove the API route:
   `/Users/zondrius/hermes-workspace/src/routes/api/execution-layer.ts`
4. Remove the server module:
   `/Users/zondrius/hermes-workspace/src/server/execution-layer.ts`
5. Keep the goal files as design record unless Chris asks to remove them.

No cron rollback is needed because v1 does not edit cron.

## Recommendation

Execute Task 1 and Task 2 first. Stop after the snapshot builder and Markdown renderer pass tests. Then review the first generated report before building the UI.
