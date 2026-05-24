import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { getStateDir } from './workspace-state-dir'

export type SecondBrainSourceId =
  | 'personal-kv'
  | 'business-kv'
  | 'receipts'
  | 'docs'

export type SecondBrainSource = {
  id: SecondBrainSourceId
  label: string
  category: 'personal' | 'business' | 'receipts' | 'docs'
  description: string
  refPrefix: string
  writable: boolean
  exists: boolean
  status: 'available' | 'missing' | 'disabled'
  policy: {
    allowedExtensions: Array<string>
    maxFileBytes: number
    maxDepth: number
    writeRequiresExpectedHash: boolean
  }
}

export type SecondBrainEntry = {
  name: string
  path: string
  ref: string
  type: 'file' | 'folder'
  size?: number
  modifiedAt?: string
}

export type SecondBrainReadResult = {
  source: SecondBrainSource
  path: string
  ref: string
  content: string
  hash: string
  size: number
  modifiedAt: string
}

export type SecondBrainWorkflowOperation =
  | 'ingest'
  | 'update'
  | 'reclass'
  | 'reingest'
  | 'rank'

const EDITABLE_EXTENSIONS = new Set(['.md', '.mdx', '.txt'])
const DENIED_EXTENSIONS = new Set([
  '.env',
  '.db',
  '.sqlite',
  '.sqlite3',
  '.wal',
  '.shm',
  '.pem',
  '.key',
  '.p12',
  '.pfx',
])
const DENIED_DIRS = new Set([
  '.git',
  '.hg',
  '.svn',
  '.env',
  '.cache',
  '.turbo',
  '.next',
  'node_modules',
  'venv',
  '.venv',
  '__pycache__',
  'dist',
  'build',
  'storage',
  'vector_store',
  'vectors',
  'lightrag',
  'models',
])

const DEFAULT_MAX_FILE_BYTES = 1_000_000
const DEFAULT_MAX_DEPTH = 4
const MAX_LIST_ENTRIES = 500

function expandHome(input: string): string {
  return input.replace(/^~(?=$|\/)/, os.homedir())
}

function configuredPath(envName: string, fallback?: string): string | null {
  const value = process.env[envName]?.trim()
  if (value) return path.resolve(expandHome(value))
  return fallback ? path.resolve(expandHome(fallback)) : null
}

function sourceDefinitions(): Array<{
  id: SecondBrainSourceId
  label: string
  category: SecondBrainSource['category']
  description: string
  root: string | null
  writable: boolean
}> {
  return [
    {
      id: 'personal-kv',
      label: 'Personal Knowledge Vault',
      category: 'personal',
      description: 'Curated Personal Brain markdown/text only; no raw runtime stores.',
      root: configuredPath(
        'SECOND_BRAIN_PERSONAL_KV_DIR',
        '~/StorageRuntime/KnowledgeVault/personal',
      ),
      writable: process.env.SECOND_BRAIN_PERSONAL_KV_READONLY !== '1',
    },
    {
      id: 'business-kv',
      label: 'Business Knowledge Vault',
      category: 'business',
      description: 'Business Brain files only when an explicit local mirror path is configured.',
      root: configuredPath('SECOND_BRAIN_BUSINESS_KV_DIR'),
      writable: process.env.SECOND_BRAIN_BUSINESS_KV_WRITABLE === '1',
    },
    {
      id: 'receipts',
      label: 'Receipts',
      category: 'receipts',
      description: 'Reviewable Cael/Hermes receipts and handoff notes.',
      root: configuredPath('SECOND_BRAIN_RECEIPTS_DIR', '~/.hermes/receipts'),
      writable: process.env.SECOND_BRAIN_RECEIPTS_WRITABLE === '1',
    },
    {
      id: 'docs',
      label: 'Docs',
      category: 'docs',
      description: 'Selected local docs for the brain dashboard / workspace, markdown/text only.',
      root: configuredPath(
        'SECOND_BRAIN_DOCS_DIR',
        '~/projects/KB_Brain_Dashboard/docs',
      ),
      writable: process.env.SECOND_BRAIN_DOCS_WRITABLE === '1',
    },
  ]
}

async function rootStatus(root: string | null): Promise<{
  exists: boolean
  status: SecondBrainSource['status']
}> {
  if (!root) return { exists: false, status: 'disabled' }
  try {
    const stats = await fs.stat(root)
    return stats.isDirectory()
      ? { exists: true, status: 'available' }
      : { exists: false, status: 'missing' }
  } catch {
    return { exists: false, status: 'missing' }
  }
}

export async function listSecondBrainSources(): Promise<Array<SecondBrainSource>> {
  const sources = await Promise.all(
    sourceDefinitions().map(async (definition) => {
      const status = await rootStatus(definition.root)
      return {
        id: definition.id,
        label: definition.label,
        category: definition.category,
        description: definition.description,
        refPrefix: `second-brain://${definition.id}/`,
        writable: definition.writable && status.status === 'available',
        exists: status.exists,
        status: status.status,
        policy: {
          allowedExtensions: Array.from(EDITABLE_EXTENSIONS).sort(),
          maxFileBytes: DEFAULT_MAX_FILE_BYTES,
          maxDepth: DEFAULT_MAX_DEPTH,
          writeRequiresExpectedHash: true,
        },
      } satisfies SecondBrainSource
    }),
  )
  return sources
}

async function getSourceDefinition(sourceId: string) {
  const definition = sourceDefinitions().find((source) => source.id === sourceId)
  if (!definition) throw new Error('Unknown second-brain source')
  if (!definition.root) throw new Error('Second-brain source is disabled')
  const root = path.resolve(definition.root)
  const stats = await fs.stat(root).catch(() => null)
  if (!stats?.isDirectory()) throw new Error('Second-brain source root is unavailable')
  const realRoot = await fs.realpath(root)
  const publicSource = (await listSecondBrainSources()).find(
    (source) => source.id === definition.id,
  )
  if (!publicSource) throw new Error('Unknown second-brain source')
  return { ...definition, root, realRoot, publicSource }
}

function normalizeRelativePath(input: string): string {
  const normalized = input.replace(/\\/g, '/').trim()
  if (!normalized || normalized === '.') return ''
  if (normalized.includes('\0')) throw new Error('Invalid path')
  if (path.posix.isAbsolute(normalized) || path.isAbsolute(normalized)) {
    throw new Error('Absolute paths are not allowed')
  }
  const parts = normalized.split('/').filter((part) => part && part !== '.')
  if (parts.some((part) => part === '..')) {
    throw new Error('Path traversal is not allowed')
  }
  if (parts.length > DEFAULT_MAX_DEPTH) {
    throw new Error('Path depth limit exceeded')
  }
  if (parts.some((part) => DENIED_DIRS.has(part.toLowerCase()))) {
    throw new Error('Denied directory segment')
  }
  return parts.join('/')
}

function assertAllowedFilePath(relativePath: string): void {
  const base = path.basename(relativePath).toLowerCase()
  if (!base || base === '.') throw new Error('File path is required')
  if (base.startsWith('.env')) throw new Error('Denied file name')
  const ext = path.extname(base)
  if (DENIED_EXTENSIONS.has(ext)) throw new Error('Denied file extension')
  if (!EDITABLE_EXTENSIONS.has(ext)) throw new Error('Only markdown/text files are allowed')
}

function assertContained(realRoot: string, candidate: string): void {
  const relative = path.relative(realRoot, candidate)
  if (candidate !== realRoot && (relative.startsWith('..') || path.isAbsolute(relative))) {
    throw new Error('Resolved path escapes source root')
  }
}

async function resolveForExistingPath(sourceId: string, inputPath: string) {
  const source = await getSourceDefinition(sourceId)
  const relativePath = normalizeRelativePath(inputPath)
  const candidate = path.resolve(source.realRoot, relativePath)
  let realCandidate: string
  try {
    realCandidate = await fs.realpath(candidate)
  } catch {
    throw new Error('Path not found')
  }
  assertContained(source.realRoot, realCandidate)
  return { ...source, relativePath, fullPath: realCandidate }
}

async function resolveForWritePath(sourceId: string, inputPath: string) {
  const source = await getSourceDefinition(sourceId)
  const relativePath = normalizeRelativePath(inputPath)
  assertAllowedFilePath(relativePath)
  const candidate = path.resolve(source.realRoot, relativePath)
  const parent = path.dirname(candidate)
  const realParent = await fs.realpath(parent).catch(() => null)
  if (!realParent) throw new Error('Parent directory does not exist')
  assertContained(source.realRoot, realParent)
  const relativeFromRoot = path.relative(source.realRoot, candidate)
  if (relativeFromRoot.startsWith('..') || path.isAbsolute(relativeFromRoot)) {
    throw new Error('Resolved path escapes source root')
  }
  const existingReal = await fs.realpath(candidate).catch(() => null)
  if (existingReal) assertContained(source.realRoot, existingReal)
  return { ...source, relativePath, fullPath: existingReal ?? candidate }
}

function toSecondBrainRef(sourceId: string, relativePath: string): string {
  return `second-brain://${sourceId}/${relativePath}`
}

function hashContent(content: Buffer | string): string {
  return crypto.createHash('sha256').update(content).digest('hex')
}

async function audit(event: Record<string, unknown>): Promise<void> {
  const auditPath = path.join(getStateDir(), 'second-brain-files-audit.jsonl')
  await fs.mkdir(path.dirname(auditPath), { recursive: true })
  await fs.appendFile(
    auditPath,
    `${JSON.stringify({ ts: new Date().toISOString(), ...event })}\n`,
    'utf8',
  )
}

function entryAllowed(name: string): boolean {
  const lower = name.toLowerCase()
  if (DENIED_DIRS.has(lower)) return false
  if (lower.startsWith('.env')) return false
  if (DENIED_EXTENSIONS.has(path.extname(lower))) return false
  return true
}

export async function listSecondBrainEntries(
  sourceId: string,
  inputPath = '',
): Promise<{ source: SecondBrainSource; root: string; entries: Array<SecondBrainEntry> }> {
  const resolved = await resolveForExistingPath(sourceId, inputPath)
  const stats = await fs.stat(resolved.fullPath)
  if (!stats.isDirectory()) throw new Error('List path must be a directory')
  const depth = resolved.relativePath ? resolved.relativePath.split('/').length : 0
  if (depth > DEFAULT_MAX_DEPTH) throw new Error('Directory depth limit exceeded')

  const dirents = await fs.readdir(resolved.fullPath, { withFileTypes: true })
  const entries: Array<SecondBrainEntry> = []
  for (const dirent of dirents) {
    if (entries.length >= MAX_LIST_ENTRIES) break
    if (!entryAllowed(dirent.name)) continue
    const relativePath = [resolved.relativePath, dirent.name].filter(Boolean).join('/')
    const fullPath = path.join(resolved.fullPath, dirent.name)
    const realPath = await fs.realpath(fullPath).catch(() => null)
    if (!realPath) continue
    try {
      assertContained(resolved.realRoot, realPath)
      const childStats = await fs.stat(realPath)
      if (childStats.isDirectory()) {
        entries.push({
          name: dirent.name,
          path: relativePath,
          ref: toSecondBrainRef(sourceId, relativePath),
          type: 'folder',
          modifiedAt: childStats.mtime.toISOString(),
        })
      } else if (childStats.isFile()) {
        const ext = path.extname(dirent.name.toLowerCase())
        if (!EDITABLE_EXTENSIONS.has(ext)) continue
        entries.push({
          name: dirent.name,
          path: relativePath,
          ref: toSecondBrainRef(sourceId, relativePath),
          type: 'file',
          size: childStats.size,
          modifiedAt: childStats.mtime.toISOString(),
        })
      }
    } catch {
      continue
    }
  }
  entries.sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type === 'folder' ? -1 : 1))
  return { source: resolved.publicSource, root: resolved.relativePath, entries }
}

export async function readSecondBrainFile(
  sourceId: string,
  inputPath: string,
): Promise<SecondBrainReadResult> {
  const resolved = await resolveForExistingPath(sourceId, inputPath)
  assertAllowedFilePath(resolved.relativePath)
  const stats = await fs.stat(resolved.fullPath)
  if (!stats.isFile()) throw new Error('Read path must be a file')
  if (stats.size > DEFAULT_MAX_FILE_BYTES) throw new Error('File is too large')
  const buffer = await fs.readFile(resolved.fullPath)
  const hash = hashContent(buffer)
  await audit({ op: 'read', source: sourceId, path: resolved.relativePath, hash, size: stats.size })
  return {
    source: resolved.publicSource,
    path: resolved.relativePath,
    ref: toSecondBrainRef(sourceId, resolved.relativePath),
    content: buffer.toString('utf8'),
    hash,
    size: stats.size,
    modifiedAt: stats.mtime.toISOString(),
  }
}

export async function writeSecondBrainFile(input: {
  sourceId: string
  path: string
  content: string
  expectedHash: string
}): Promise<{ ok: true; path: string; ref: string; previousHash: string | null; hash: string }> {
  const resolved = await resolveForWritePath(input.sourceId, input.path)
  if (!resolved.publicSource.writable) throw new Error('Second-brain source is read-only')
  const contentBuffer = Buffer.from(input.content, 'utf8')
  if (contentBuffer.byteLength > DEFAULT_MAX_FILE_BYTES) throw new Error('File is too large')
  if (!input.expectedHash) throw new Error('expectedHash is required')
  const previousBuffer = await fs.readFile(resolved.fullPath).catch((err: NodeJS.ErrnoException) => {
    if (err.code === 'ENOENT') return null
    throw err
  })
  const previousHash = previousBuffer ? hashContent(previousBuffer) : null
  if (previousHash !== input.expectedHash) {
    throw new Error('Hash conflict: reload before saving')
  }
  const nextHash = hashContent(contentBuffer)
  const tmpPath = path.join(
    path.dirname(resolved.fullPath),
    `.${path.basename(resolved.fullPath)}.${process.pid}.${Date.now()}.tmp`,
  )
  await fs.writeFile(tmpPath, contentBuffer, { mode: 0o600 })
  await fs.rename(tmpPath, resolved.fullPath)
  await audit({
    op: 'write',
    source: input.sourceId,
    path: resolved.relativePath,
    previousHash,
    hash: nextHash,
    size: contentBuffer.byteLength,
  })
  return {
    ok: true,
    path: resolved.relativePath,
    ref: toSecondBrainRef(input.sourceId, resolved.relativePath),
    previousHash,
    hash: nextHash,
  }
}

export async function dispatchSecondBrainWorkflow(input: {
  operation: SecondBrainWorkflowOperation
  sourceId: string
  path?: string
  hash?: string
  metadata?: Record<string, unknown>
}): Promise<{
  ok: boolean
  status: 'dry_run' | 'dispatched'
  operation: SecondBrainWorkflowOperation
  idempotencyKey: string
  n8n: { configured: boolean; endpointLabel: string }
}> {
  const allowed: Array<SecondBrainWorkflowOperation> = [
    'ingest',
    'update',
    'reclass',
    'reingest',
    'rank',
  ]
  if (!allowed.includes(input.operation)) throw new Error('Unsupported workflow operation')
  await getSourceDefinition(input.sourceId)
  const safePath = input.path
    ? (await resolveForExistingPath(input.sourceId, input.path)).relativePath
    : ''
  if (safePath) assertAllowedFilePath(safePath)
  const idempotencyKey = hashContent(
    JSON.stringify({
      operation: input.operation,
      sourceId: input.sourceId,
      path: safePath,
      hash: input.hash ?? '',
    }),
  )
  const endpoint = process.env.N8N_SECOND_BRAIN_WEBHOOK_URL?.trim()
  const endpointLabel = endpoint ? new URL(endpoint).origin : 'not configured'
  const payload = {
    operation: input.operation,
    sourceId: input.sourceId,
    path: safePath || null,
    hash: input.hash ?? null,
    idempotencyKey,
    metadata: input.metadata ?? {},
  }
  await audit({ op: 'dispatch', source: input.sourceId, path: safePath || null, operation: input.operation, idempotencyKey })
  if (!endpoint) {
    return {
      ok: true,
      status: 'dry_run',
      operation: input.operation,
      idempotencyKey,
      n8n: { configured: false, endpointLabel },
    }
  }

  const headers: Record<string, string> = { 'content-type': 'application/json' }
  const secret = process.env.N8N_SECOND_BRAIN_WEBHOOK_SECRET
  if (secret) headers['x-cael-workflow-secret'] = secret
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`n8n dispatch failed (${response.status})`)
  return {
    ok: true,
    status: 'dispatched',
    operation: input.operation,
    idempotencyKey,
    n8n: { configured: true, endpointLabel },
  }
}

export function getSecondBrainAuditLogPath(): string {
  return path.join(getStateDir(), 'second-brain-files-audit.jsonl')
}

export function resetSecondBrainTestEnvironment(): void {
  for (const key of [
    'SECOND_BRAIN_PERSONAL_KV_DIR',
    'SECOND_BRAIN_PERSONAL_KV_READONLY',
    'SECOND_BRAIN_BUSINESS_KV_DIR',
    'SECOND_BRAIN_BUSINESS_KV_WRITABLE',
    'SECOND_BRAIN_RECEIPTS_DIR',
    'SECOND_BRAIN_RECEIPTS_WRITABLE',
    'SECOND_BRAIN_DOCS_DIR',
    'SECOND_BRAIN_DOCS_WRITABLE',
    'N8N_SECOND_BRAIN_WEBHOOK_URL',
    'N8N_SECOND_BRAIN_WEBHOOK_SECRET',
  ]) {
    delete process.env[key]
  }
}

export function ensureSecondBrainAuditDirForTests(): void {
  fsSync.mkdirSync(getStateDir(), { recursive: true })
}
