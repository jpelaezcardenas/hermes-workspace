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

function source(
  pathValue: string,
  kind: ExecutionSource['kind'],
): ExecutionSource {
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
    const immediate = firstMatchingLine(
      latestDecisionInbox.content,
      'SOFORT_MACHEN:',
    )
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

function buildChrisDecisions(
  latestDecisionInbox: ReadFile | null,
): Array<ExecutionDecision> {
  if (!latestDecisionInbox) return []
  const decision = firstMatchingLine(
    latestDecisionInbox.content,
    'CHRIS_ENTSCHEIDET:',
  )
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
  const productReport = latestMarkdownFile(
    reportsDir,
    'productklarheit-v1-ceo-synthesis-',
  )
  if (!productReport) return []

  return [
    {
      title: 'Productklarheit v1 ist belegt.',
      whyItMatters:
        'Schulwerkstatt und LeseWerk haben eine klarere Verbindung und weniger Startreibung.',
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
  const handoffOverview = readTextFile(
    path.join(workspaceRoot, 'handoff/HANDOFF_OVERVIEW.md'),
  )

  const codexOpen = listOpenHandoffs(workspaceRoot)
  const waitingForChris = buildChrisDecisions(latestDecisionInbox)
  const today = buildTodayActions(codexOpen, latestDecisionInbox)
  const dontTouch = buildDontTouch(latestDecisionInbox, latestMomentum)
  const wins = buildWins(workspaceRoot)
  const memoryCandidates = buildMemoryCandidates(
    latestDecisionInbox,
    latestMomentum,
  )
  const warnings: Array<string> = []

  const proofLog = uniqueSources(
    [
      latestDecisionInbox ? source(latestDecisionInbox.path, 'decision-inbox') : null,
      latestMomentum ? source(latestMomentum.path, 'momentum-cockpit') : null,
      latestHandoffScout
        ? source(latestHandoffScout.path, 'codex-handoff-scout')
        : null,
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
          acceptance:
            'Outbox-Ergebnis existiert oder ein Blocker ist dokumentiert.',
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

export function renderExecutionLayerMarkdown(
  snapshot: ExecutionLayerSnapshot,
): string {
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
          .map((decision) =>
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
          .map((handoff) =>
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
          .map((win) =>
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
          .map((item) =>
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
          .map((candidate) =>
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
    `Should become Codex handoff: ${
      snapshot.nextSmallestSlice.shouldBecomeCodexHandoff ? 'yes' : 'no'
    }`,
    '',
    '## Belege',
    ...snapshot.proofLog.map((entry) => `- \`${entry.path}\` (${entry.kind})`),
    '',
  ].join('\n')
}

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
