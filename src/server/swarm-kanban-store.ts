import * as fs from 'node:fs'
import * as os from 'node:os'
import * as path from 'node:path'
import { randomUUID } from 'node:crypto'
import { sanitizeProjectSlug } from './project-catalog'

export const SWARM_KANBAN_LANES = ['backlog', 'ready', 'running', 'review', 'blocked', 'done'] as const
export type SwarmKanbanLane = (typeof SWARM_KANBAN_LANES)[number]

export const DEFAULT_PROJECT_ID = 'default'

export type SwarmKanbanCard = {
  id: string
  title: string
  spec: string
  acceptanceCriteria: string[]
  assignedWorker: string | null
  reviewer: string | null
  status: SwarmKanbanLane
  projectId: string
  missionId: string | null
  reportPath: string | null
  createdBy: string
  createdAt: number
  updatedAt: number
}

type SwarmKanbanFile = { cards: SwarmKanbanCard[] }

type ListFilters = {
  status?: string | null
  assignedWorker?: string | null
  reviewer?: string | null
  missionId?: string | null
  projectId?: string | null
}

export type CreateSwarmKanbanCardInput = {
  title: string
  spec?: string
  acceptanceCriteria?: string[]
  assignedWorker?: string | null
  reviewer?: string | null
  status?: SwarmKanbanLane | null
  projectId?: string | null
  missionId?: string | null
  reportPath?: string | null
  createdBy?: string | null
}

export type UpdateSwarmKanbanCardInput = Partial<Omit<CreateSwarmKanbanCardInput, 'createdBy'>>

const HERMES_HOME = process.env.HERMES_HOME ?? process.env.CLAUDE_HOME ?? path.join(os.homedir(), '.hermes')
export const SWARM_KANBAN_FILE = path.join(HERMES_HOME, 'swarm2-kanban.json')

export function normalizeProjectId(value?: string | null): string {
  return sanitizeProjectSlug(value || DEFAULT_PROJECT_ID) ?? DEFAULT_PROJECT_ID
}

export function swarmKanbanFileForProject(projectId?: string | null): string {
  const normalized = normalizeProjectId(projectId)
  if (normalized === DEFAULT_PROJECT_ID) return SWARM_KANBAN_FILE
  return path.join(HERMES_HOME, 'swarm2-kanban', `${normalized}.json`)
}

function ensureKanbanFile(projectId?: string | null): void {
  fs.mkdirSync(HERMES_HOME, { recursive: true })
  const filePath = swarmKanbanFileForProject(projectId)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ cards: [] }, null, 2) + '\n', 'utf-8')
  }
}

function readKanbanFile(projectId?: string | null): SwarmKanbanFile {
  const normalizedProjectId = normalizeProjectId(projectId)
  ensureKanbanFile(normalizedProjectId)
  try {
    const raw = fs.readFileSync(swarmKanbanFileForProject(normalizedProjectId), 'utf-8').trim()
    if (!raw) return { cards: [] }
    const parsed = JSON.parse(raw) as Partial<SwarmKanbanFile>
    return { cards: Array.isArray(parsed.cards) ? parsed.cards.map((card) => normalizeCard(card, normalizedProjectId)) : [] }
  } catch {
    return { cards: [] }
  }
}

function writeKanbanFile(data: SwarmKanbanFile, projectId?: string | null): void {
  const normalizedProjectId = normalizeProjectId(projectId)
  ensureKanbanFile(normalizedProjectId)
  fs.writeFileSync(
    swarmKanbanFileForProject(normalizedProjectId),
    JSON.stringify({ cards: data.cards.map((card) => normalizeCard(card, normalizedProjectId)) }, null, 2) + '\n',
    'utf-8',
  )
}

function normalizeStatus(value: unknown): SwarmKanbanLane {
  if (value === 'todo') return 'ready'
  if (value === 'in_progress' || value === 'doing') return 'running'
  return SWARM_KANBAN_LANES.includes(value as SwarmKanbanLane) ? (value as SwarmKanbanLane) : 'backlog'
}

function normalizeCriteria(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean)
  if (typeof value === 'string') return value.split('\n').map((item) => item.trim()).filter(Boolean)
  return []
}

function optionalString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function normalizeCard(card: (Partial<Omit<SwarmKanbanCard, 'status' | 'projectId'>> & { id?: string; title?: string; status?: SwarmKanbanLane | string | null; projectId?: string | null }), fallbackProjectId = DEFAULT_PROJECT_ID): SwarmKanbanCard {
  const now = Date.now()
  const projectId = normalizeProjectId(card.projectId ?? fallbackProjectId)
  return {
    id: typeof card.id === 'string' && card.id ? card.id : randomUUID(),
    title: typeof card.title === 'string' && card.title.trim() ? card.title.trim() : 'Untitled task',
    spec: typeof card.spec === 'string' ? card.spec : '',
    acceptanceCriteria: normalizeCriteria(card.acceptanceCriteria),
    assignedWorker: optionalString(card.assignedWorker),
    reviewer: optionalString(card.reviewer),
    status: normalizeStatus(card.status),
    projectId,
    missionId: optionalString(card.missionId),
    reportPath: optionalString(card.reportPath),
    createdBy: typeof card.createdBy === 'string' && card.createdBy ? card.createdBy : 'swarm2-kanban',
    createdAt: typeof card.createdAt === 'number' ? card.createdAt : now,
    updatedAt: typeof card.updatedAt === 'number' ? card.updatedAt : now,
  }
}

export function listSwarmKanbanCards(filters: ListFilters = {}): SwarmKanbanCard[] {
  const projectId = normalizeProjectId(filters.projectId)
  let cards = readKanbanFile(projectId).cards
  if (filters.status) cards = cards.filter((card) => card.status === normalizeStatus(filters.status))
  if (filters.assignedWorker) cards = cards.filter((card) => card.assignedWorker === filters.assignedWorker)
  if (filters.reviewer) cards = cards.filter((card) => card.reviewer === filters.reviewer)
  if (filters.missionId) cards = cards.filter((card) => card.missionId === filters.missionId)
  return [...cards].sort((a, b) => b.updatedAt - a.updatedAt || a.title.localeCompare(b.title))
}

export function createSwarmKanbanCard(input: CreateSwarmKanbanCardInput): SwarmKanbanCard {
  const projectId = normalizeProjectId(input.projectId)
  const file = readKanbanFile(projectId)
  const now = Date.now()
  const card = normalizeCard({
    id: randomUUID(),
    title: input.title,
    spec: input.spec,
    acceptanceCriteria: input.acceptanceCriteria,
    assignedWorker: input.assignedWorker,
    reviewer: input.reviewer,
    status: input.status ?? 'backlog',
    projectId,
    missionId: input.missionId,
    reportPath: input.reportPath,
    createdBy: input.createdBy ?? 'swarm2-kanban',
    createdAt: now,
    updatedAt: now,
  }, projectId)
  file.cards.push(card)
  writeKanbanFile(file, projectId)
  return card
}

export function updateSwarmKanbanCard(cardId: string, updates: UpdateSwarmKanbanCardInput): SwarmKanbanCard | null {
  const projectId = normalizeProjectId(updates.projectId)
  const file = readKanbanFile(projectId)
  const index = file.cards.findIndex((card) => card.id === cardId)
  if (index === -1) return null
  const current = normalizeCard(file.cards[index], projectId)
  const next = normalizeCard({
    ...current,
    ...updates,
    id: current.id,
    projectId: current.projectId,
    createdAt: current.createdAt,
    createdBy: current.createdBy,
    title: typeof updates.title === 'string' ? updates.title : current.title,
    updatedAt: Date.now(),
  }, projectId)
  file.cards[index] = next
  writeKanbanFile(file, projectId)
  return next
}
