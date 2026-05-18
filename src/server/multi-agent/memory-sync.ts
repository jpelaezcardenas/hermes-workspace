import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { MultiAgentRun, MultiAgentTask } from './types'

export const DEFAULT_MULTI_AGENT_OBSIDIAN_RUNS_DIR = join(
  process.env.HOME ?? process.cwd(),
  'ai-workspace',
  'knowledge',
  'obsidian-vault',
  'Hermes',
  'Multi-Agent Runs',
)

type SaveTaskSummaryToObsidianInput = {
  obsidianRoot?: string
  task: MultiAgentTask
  run: MultiAgentRun
  summary: string
  savedAt?: string
}

export type SaveTaskSummaryToObsidianResult = {
  path: string
}

function safeSlug(value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^0-9a-z]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return slug || 'summary'
}

function optionalLine(label: string, value: string | null | undefined): string | null {
  const trimmed = typeof value === 'string' ? value.trim() : ''
  return trimmed ? `${label}: \`${trimmed}\`` : null
}

function buildSummaryNote(input: Required<Pick<SaveTaskSummaryToObsidianInput, 'task' | 'run' | 'summary' | 'savedAt'>>): string {
  const { task, run, summary, savedAt } = input
  const metadata = [
    `Task: \`${task.id}\``,
    `Run: \`${run.id}\``,
    `Status: \`${task.status}\``,
    optionalLine('Branch', task.branchName),
    optionalLine('Worktree', task.worktreePath),
    `Saved: \`${savedAt}\``,
  ].filter((line): line is string => Boolean(line))

  const acceptance = task.acceptanceCriteria.length
    ? task.acceptanceCriteria.map((criterion) => `- ${criterion}`).join('\n')
    : '- No acceptance criteria captured.'

  return [
    `# ${task.title}`,
    '',
    metadata.join('\n'),
    '',
    '## Summary',
    '',
    summary,
    '',
    '## Work Packet',
    '',
    task.workPacket || task.description || 'No work packet provided.',
    '',
    '## Acceptance Criteria',
    '',
    acceptance,
    '',
  ].join('\n')
}

export function saveTaskSummaryToObsidian(input: SaveTaskSummaryToObsidianInput): SaveTaskSummaryToObsidianResult {
  const summary = input.summary.trim()
  if (!summary) throw new Error('Task final summary is required before saving an Obsidian note')

  const savedAt = input.savedAt ?? new Date().toISOString()
  const obsidianRoot = input.obsidianRoot ?? DEFAULT_MULTI_AGENT_OBSIDIAN_RUNS_DIR
  const date = savedAt.slice(0, 10) || new Date().toISOString().slice(0, 10)
  const fileName = `${date}-${safeSlug(input.task.id)}-${safeSlug(input.task.title)}.md`
  const path = join(obsidianRoot, fileName)

  mkdirSync(obsidianRoot, { recursive: true })
  writeFileSync(
    path,
    buildSummaryNote({ task: input.task, run: input.run, summary, savedAt }),
    'utf-8',
  )

  return { path }
}
