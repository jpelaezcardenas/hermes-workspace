import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import {
  buildExecutionLayerSnapshot,
  renderExecutionLayerMarkdown,
  writeExecutionLayerReport,
} from './execution-layer'

const tempRoots: Array<string> = []

function makeWorkspaceFixture(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hermes-execution-layer-'))
  tempRoots.push(root)

  const dirs = [
    'reports/decision-inbox',
    'reports/hermes-control',
    'reports/codex-handoff-scout',
    'reports',
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
    ['# Codex Handoff Scout 2026-06-01', 'Created handoff: codex-handoff-2026-06-01-demo.md', ''].join('\n'),
  )

  fs.writeFileSync(
    path.join(root, 'reports/productklarheit-v1-ceo-synthesis-2026-06-01.md'),
    ['# Productklarheit v1 - CEO QA Synthese 2026-06-01', 'Tests gruen und Produktklarheit belegt.', ''].join('\n'),
  )

  fs.writeFileSync(
    path.join(root, 'handoff/HANDOFF_OVERVIEW.md'),
    ['# Handoff Overview', '- Open: codex-handoff-2026-06-01-demo.md', ''].join('\n'),
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
    ['# Goal: Demo', 'Status: active', 'No new cronjobs.', ''].join('\n'),
  )

  return root
}

afterEach(() => {
  for (const root of tempRoots.splice(0)) {
    fs.rmSync(root, { recursive: true, force: true })
  }
})

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
    expect(snapshot.dontTouch).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          item: expect.stringContaining('Cronjobs'),
        }),
      ]),
    )
    expect(snapshot.nextSmallestSlice.action).toContain(
      'codex-handoff-2026-06-01-demo.md',
    )
    expect(snapshot.proofLog.map((entry) => entry.path)).toContain(
      path.join(rootPath(workspaceRoot), 'reports/decision-inbox/decision-inbox-2026-06-01.md'),
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

  it('treats a handoff as no longer open when its outbox result exists', () => {
    const workspaceRoot = makeWorkspaceFixture()
    fs.writeFileSync(
      path.join(rootPath(workspaceRoot), 'handoff/codex-outbox/codex-result-2026-06-01-demo.md'),
      [
        '# Codex Result',
        '## Auftrag',
        'Demo handoff abgeschlossen.',
        '## Checks',
        '- Result exists.',
        '',
      ].join('\n'),
    )
    fs.writeFileSync(
      path.join(rootPath(workspaceRoot), 'handoff/codex-outbox/codex-result-2026-06-01-unrelated.md'),
      ['# Codex Result', 'Unrelated old result.', ''].join('\n'),
    )

    const snapshot = buildExecutionLayerSnapshot({
      workspaceRoot,
      now: new Date('2026-06-01T10:00:00.000Z'),
    })

    expect(snapshot.codexOpen).toEqual([])
    expect(snapshot.signal).toBe('Green')
    expect(snapshot.proofLog).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          kind: 'codex-outbox',
          path: path.join(
            rootPath(workspaceRoot),
            'handoff/codex-outbox/codex-result-2026-06-01-demo.md',
          ),
        }),
      ]),
    )
    expect(snapshot.proofLog.map((entry) => entry.path)).not.toContain(
      path.join(
        rootPath(workspaceRoot),
        'handoff/codex-outbox/codex-result-2026-06-01-unrelated.md',
      ),
    )
    expect(snapshot.nextSmallestSlice.action).not.toContain(
      'codex-handoff-2026-06-01-demo.md',
    )
  })

  it('writes a dated markdown report into reports/hermes-control', () => {
    const workspaceRoot = makeWorkspaceFixture()
    const snapshot = buildExecutionLayerSnapshot({
      workspaceRoot,
      now: new Date('2026-06-01T10:00:00.000Z'),
    })

    const reportPath = writeExecutionLayerReport(snapshot, { workspaceRoot })

    expect(reportPath).toBe(
      path.join(
        workspaceRoot,
        'reports/hermes-control/hermes-execution-layer-2026-06-01.md',
      ),
    )
    expect(fs.readFileSync(reportPath, 'utf-8')).toContain(
      '# Hermes Execution Layer - 2026-06-01',
    )
  })
})

function rootPath(workspaceRoot: string): string {
  return path.resolve(workspaceRoot)
}
