const MAX_TURNS = 400
const MAX_TEXT_LENGTH = 20_000
const MAX_LOG_LINES = 80

export type VoiceTurn = {
  id: string
  role: 'tim' | 'executive' | 'system'
  text: string
  timestamp?: string
}

export type DelegationHandoff = {
  outcome: string
  owner: string
  context: string
  constraints: Array<string>
  nextAction: string
  approvalRequired: boolean
}

export type VoiceReview = {
  summary: string
  decisions: Array<string>
  followUpActions: Array<string>
  openQuestions: Array<string>
  needsApproval: Array<string>
}

type BuildVoiceLedgerRecordInput = {
  conversationId: string
  sessionKey: string
  status: string
  updatedAt: string
  turns: unknown
  elevenLabsLog: unknown
}

export function readString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim() : fallback
}

export function normalizeTurns(value: unknown): Array<VoiceTurn> {
  if (!Array.isArray(value)) return []

  const turns: Array<VoiceTurn> = []
  for (const entry of value.slice(-MAX_TURNS)) {
    if (!entry || typeof entry !== 'object') continue
    const record = entry as Record<string, unknown>
    const role = record.role
    if (role !== 'tim' && role !== 'executive' && role !== 'system') continue
    const text = readString(record.text).slice(0, MAX_TEXT_LENGTH)
    if (!text) continue
    turns.push({
      id: readString(record.id, `${Date.now()}-${turns.length}`),
      role,
      text,
      timestamp: readString(record.timestamp) || undefined,
    })
  }
  return turns
}

export function normalizeLog(value: unknown): Array<string> {
  if (!Array.isArray(value)) return []
  return value
    .map((line) => readString(line).slice(0, 1_000))
    .filter(Boolean)
    .slice(-MAX_LOG_LINES)
}

export function buildSummary(turns: Array<VoiceTurn>): string {
  const meaningful = turns.filter((turn) => turn.role !== 'system')
  if (meaningful.length === 0) return 'No user conversation captured yet.'
  const executiveDecision = [...meaningful]
    .reverse()
    .find((turn) => turn.role === 'executive' && /\b(decision|delegate|next action|workflow|agent)\b/i.test(turn.text))
  const last = executiveDecision ?? meaningful[meaningful.length - 1]
  return `Latest ${last.role === 'tim' ? 'Tim' : 'Executive'} turn: ${last.text.slice(0, 240)}`
}

export function extractLines(turns: Array<VoiceTurn>, patterns: Array<RegExp>): Array<string> {
  const lines: Array<string> = []
  for (const turn of turns) {
    if (turn.role === 'system') continue
    const sentences = turn.text.split(/(?<=[.!?])\s+/)
    for (const sentence of sentences) {
      const clean = sentence.trim()
      if (!clean) continue
      if (patterns.some((pattern) => pattern.test(clean))) lines.push(clean.slice(0, 500))
    }
  }
  return Array.from(new Set(lines)).slice(-8)
}

function stripTrailingPunctuation(value: string): string {
  return value.trim().replace(/[.!?]+$/, '')
}

function extractOutcome(turns: Array<VoiceTurn>): string {
  const timTurn = turns.find((turn) => turn.role === 'tim' && /\b(i need|prepare|build|create|draft)\b/i.test(turn.text))
  if (!timTurn) return 'No delegation outcome detected yet.'
  const match = timTurn.text.match(/I need(?: someone)? to (.+?)(?:\.|$)/i)
  return stripTrailingPunctuation(match?.[1] ?? timTurn.text.slice(0, 180))
}

function extractOwner(decisions: Array<string>): string {
  const decision = decisions.find((line) => /delegate/i.test(line))
  const match = decision?.match(/delegate (?:this|it)?\s*to (.+?)(?:\.|$)/i)
  return stripTrailingPunctuation(match?.[1] ?? 'Executive').replace(/^the\s+/i, '')
}

function extractNextAction(followUpActions: Array<string>): string {
  const action = followUpActions.find((line) => /next action/i.test(line)) ?? followUpActions.at(-1)
  const match = action?.match(/next action:\s*(.+?)(?:\.|$)/i)
  return stripTrailingPunctuation(match?.[1] ?? action ?? 'Review the transcript and choose the next action')
}

function extractOpenQuestions(turns: Array<VoiceTurn>): Array<string> {
  const questions = extractLines(turns, [/\?$/, /\b(open question|need to know|clarify)\b/i])
  return questions.length ? questions : ['No open questions detected.']
}

function extractNeedsApproval(turns: Array<VoiceTurn>): Array<string> {
  const approvals = extractLines(turns, [/\b(needs approval|approval required|confirm before|before publishing|before sending)\b/i])
  return approvals.length ? approvals : ['No approval blockers detected.']
}

function buildDelegation(input: {
  turns: Array<VoiceTurn>
  decisions: Array<string>
  followUpActions: Array<string>
  needsApproval: Array<string>
}): DelegationHandoff {
  const context = input.turns
    .filter((turn) => turn.role !== 'system')
    .map((turn) => `${turn.role === 'tim' ? 'Tim' : 'Executive'}: ${turn.text}`)
    .join('\n')
    .slice(0, 2_000)

  return {
    outcome: extractOutcome(input.turns),
    owner: extractOwner(input.decisions),
    context,
    constraints: ['No side effects without explicit confirmation.'],
    nextAction: extractNextAction(input.followUpActions),
    approvalRequired: input.needsApproval.some((line) => !/No approval blockers/i.test(line)),
  }
}

export function buildVoiceLedgerRecord(input: BuildVoiceLedgerRecordInput) {
  const turns = normalizeTurns(input.turns)
  const elevenLabsLog = normalizeLog(input.elevenLabsLog)
  const decisions = extractLines(turns, [/\b(decision|decide|decided|we should|the right move)\b/i])
  const followUpActions = extractLines(turns, [/\b(next step|next action|follow up|delegate|task|action|confirm|approval)\b/i])
  const openQuestions = extractOpenQuestions(turns)
  const needsApproval = extractNeedsApproval(turns)
  const review: VoiceReview = {
    summary: buildSummary(turns),
    decisions,
    followUpActions,
    openQuestions,
    needsApproval,
  }

  return {
    schemaVersion: 2,
    source: 'workspace-voice-lab',
    conversationId: input.conversationId,
    sessionKey: input.sessionKey,
    status: input.status,
    updatedAt: input.updatedAt,
    summary: review.summary,
    decisions,
    followUpActions,
    review,
    delegation: buildDelegation({ turns, decisions, followUpActions, needsApproval }),
    turns,
    diagnostics: {
      elevenLabsLog,
    },
  }
}
