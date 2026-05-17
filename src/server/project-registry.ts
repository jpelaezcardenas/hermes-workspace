import { execFileSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { loadWorkspaceCatalog } from '../routes/api/workspace'

export type ProjectRegistryInstructionFile = {
  name: string
  path: string
  excerpt: string
}

export type ProjectRegistryStatus = {
  gitDirty: boolean | null
  changedFiles: number | null
  lastCommit: string | null
  lastCommitAt: string | null
  detectedStack: Array<string>
  packageManager: string | null
}

export type ProjectRegistryContextPreview = {
  summary: string
  files: Array<{ name: string; path: string; chars: number }>
}

export type ProjectRegistryEntry = {
  id: string
  name: string
  path: string
  source: 'shared' | 'discovered'
  active: boolean
  gitRemote: string | null
  gitBranch: string | null
  status: ProjectRegistryStatus
  contextPreview: ProjectRegistryContextPreview
  instructionFiles: Array<ProjectRegistryInstructionFile>
  readme: ProjectRegistryInstructionFile | null
}

export type ProjectRegistryResponse = {
  activeProjectId: string | null
  projects: Array<ProjectRegistryEntry>
  fetchedAt: number
}

export type ActiveProjectContext = {
  project: ProjectRegistryEntry | null
  promptBlock: string
}

const MAX_PROJECTS = 60
const MAX_EXCERPT_CHARS = 1200
const MAX_PROMPT_FILE_CHARS = 1800
const PROJECT_MARKERS = [
  'AGENTS.md',
  'CLAUDE.md',
  '.cursorrules',
  'README.md',
  'package.json',
  'pyproject.toml',
  'Cargo.toml',
  'go.mod',
  '.git',
]
const INSTRUCTION_FILES = ['AGENTS.md', 'CLAUDE.md', '.cursorrules']
const README_FILES = ['README.md', 'readme.md']
const IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  '.next',
  '.turbo',
  '.cache',
  '__pycache__',
  '.venv',
])

const SHARED_PROJECTS: Array<{ name: string; path: string }> = [
  { name: 'pilulus', path: '~/pilulus' },
  { name: 'eycharochka', path: '~/eycharochka' },
  {
    name: 'hermes-workspace',
    path: '~/ai-workspace/apps/hermes-workspace',
  },
]

const ACTIVE_PROJECT_STATE_FILE = 'active-project.json'

function expandHome(input: string): string {
  if (input === '~') return os.homedir()
  if (input.startsWith('~/')) return path.join(os.homedir(), input.slice(2))
  return input
}

function normalizePath(input: string): string {
  return path.resolve(expandHome(input.trim()))
}

function stableProjectId(projectPath: string): string {
  return Buffer.from(projectPath).toString('base64url')
}

function hermesStateDir(): string {
  const configured =
    process.env.HERMES_HOME ||
    process.env.CLAUDE_HOME ||
    path.join(os.homedir(), '.hermes')
  return normalizePath(configured)
}

function activeProjectStatePath(): string {
  return path.join(hermesStateDir(), 'workspace', ACTIVE_PROJECT_STATE_FILE)
}

function readPersistedActiveProjectId(): string | null {
  try {
    const raw = readFileSync(activeProjectStatePath(), 'utf-8')
    const parsed = JSON.parse(raw) as { activeProjectId?: unknown }
    return typeof parsed.activeProjectId === 'string' && parsed.activeProjectId
      ? parsed.activeProjectId
      : null
  } catch {
    return null
  }
}

function writePersistedActiveProjectId(activeProjectId: string): void {
  const statePath = activeProjectStatePath()
  mkdirSync(path.dirname(statePath), { recursive: true })
  const tmpPath = `${statePath}.${process.pid}.${Date.now()}.tmp`
  writeFileSync(
    tmpPath,
    `${JSON.stringify(
      { activeProjectId, updatedAt: new Date().toISOString() },
      null,
      2,
    )}\n`,
    { encoding: 'utf-8', mode: 0o600 },
  )
  renameSync(tmpPath, statePath)
}

function isDirectory(candidate: string): boolean {
  try {
    return statSync(candidate).isDirectory()
  } catch {
    return false
  }
}

function hasProjectMarker(dirPath: string): boolean {
  return PROJECT_MARKERS.some((marker) =>
    existsSync(path.join(dirPath, marker)),
  )
}

function listDirectChildProjects(rootPath: string): Array<string> {
  try {
    return readdirSync(rootPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !IGNORED_DIRS.has(entry.name))
      .map((entry) => path.join(rootPath, entry.name))
      .filter(hasProjectMarker)
      .slice(0, MAX_PROJECTS)
  } catch {
    return []
  }
}

function readExcerpt(filePath: string): string {
  try {
    const raw = readFileSync(filePath, 'utf-8')
    return raw.trim().slice(0, MAX_EXCERPT_CHARS)
  } catch {
    return ''
  }
}

function readProjectFile(
  projectPath: string,
  name: string,
): ProjectRegistryInstructionFile | null {
  const filePath = path.join(projectPath, name)
  if (!existsSync(filePath)) return null
  const excerpt = readExcerpt(filePath)
  if (!excerpt) return null
  return {
    name,
    path: filePath,
    excerpt,
  }
}

function readInstructionFiles(
  projectPath: string,
): Array<ProjectRegistryInstructionFile> {
  return INSTRUCTION_FILES.map((name) =>
    readProjectFile(projectPath, name),
  ).filter((file): file is ProjectRegistryInstructionFile => Boolean(file))
}

function readReadme(
  projectPath: string,
): ProjectRegistryInstructionFile | null {
  for (const name of README_FILES) {
    const file = readProjectFile(projectPath, name)
    if (file) return file
  }
  return null
}

function gitOutput(cwd: string, args: Array<string>): string | null {
  try {
    const out = execFileSync('git', ['-C', cwd, ...args], {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 1500,
    })
    const trimmed = out.trim()
    return trimmed || null
  } catch {
    return null
  }
}

function gitBranch(projectPath: string): string | null {
  const branch = gitOutput(projectPath, ['rev-parse', '--abbrev-ref', 'HEAD'])
  return branch && branch !== 'HEAD' ? branch : null
}

function gitRemote(projectPath: string): string | null {
  return gitOutput(projectPath, ['remote', 'get-url', 'origin'])
}

function gitChangedFiles(projectPath: string): number | null {
  const status = gitOutput(projectPath, ['status', '--short'])
  if (status === null) return null
  if (!status) return 0
  return status.split('\n').filter(Boolean).length
}

function gitLastCommit(
  projectPath: string,
): { hash: string; at: string | null } | null {
  const output = gitOutput(projectPath, ['log', '-1', '--format=%h%x09%cI'])
  if (!output) return null
  const [hash, at] = output.split('\t')
  return hash ? { hash, at: at || null } : null
}

function detectPackageManager(projectPath: string): string | null {
  const candidates: Array<[string, string]> = [
    ['pnpm-lock.yaml', 'pnpm'],
    ['yarn.lock', 'yarn'],
    ['package-lock.json', 'npm'],
    ['bun.lockb', 'bun'],
    ['uv.lock', 'uv'],
    ['poetry.lock', 'poetry'],
  ]
  return (
    candidates.find(([file]) =>
      existsSync(path.join(projectPath, file)),
    )?.[1] ?? null
  )
}

function detectStack(projectPath: string): Array<string> {
  const markers: Array<[string, string]> = [
    ['package.json', 'Node/TypeScript'],
    ['vite.config.ts', 'Vite'],
    ['vite.config.js', 'Vite'],
    ['next.config.js', 'Next.js'],
    ['next.config.mjs', 'Next.js'],
    ['pyproject.toml', 'Python'],
    ['requirements.txt', 'Python'],
    ['Cargo.toml', 'Rust'],
    ['go.mod', 'Go'],
    ['Dockerfile', 'Docker'],
  ]
  return [
    ...new Set(
      markers
        .filter(([file]) => existsSync(path.join(projectPath, file)))
        .map(([, label]) => label),
    ),
  ]
}

function buildProjectStatus(projectPath: string): ProjectRegistryStatus {
  const changedFiles = gitChangedFiles(projectPath)
  const lastCommit = gitLastCommit(projectPath)
  return {
    gitDirty: changedFiles === null ? null : changedFiles > 0,
    changedFiles,
    lastCommit: lastCommit?.hash ?? null,
    lastCommitAt: lastCommit?.at ?? null,
    detectedStack: detectStack(projectPath),
    packageManager: detectPackageManager(projectPath),
  }
}

function buildContextPreview(project: {
  path: string
  gitRemote: string | null
  gitBranch: string | null
  instructionFiles: Array<ProjectRegistryInstructionFile>
  readme: ProjectRegistryInstructionFile | null
  status: ProjectRegistryStatus
}): ProjectRegistryContextPreview {
  const files =
    project.instructionFiles.length > 0
      ? project.instructionFiles
      : project.readme
        ? [project.readme]
        : []
  const summaryParts = [
    `Path: ${project.path}`,
    `Git: ${project.gitBranch ?? 'unknown branch'} · ${project.gitRemote ?? 'no remote'}`,
    project.status.detectedStack.length
      ? `Stack: ${project.status.detectedStack.join(', ')}`
      : 'Stack: not detected',
    `Context files: ${files.length}`,
  ]
  return {
    summary: summaryParts.join('\n'),
    files: files.map((file) => ({
      name: file.name,
      path: file.path,
      chars: file.excerpt.length,
    })),
  }
}

function toProjectEntry(
  projectPath: string,
  activePath: string,
  activeProjectId: string | null,
  source: ProjectRegistryEntry['source'],
  displayName?: string,
): ProjectRegistryEntry {
  const normalizedPath = normalizePath(projectPath)
  const id = stableProjectId(normalizedPath)
  const gitRemoteValue = gitRemote(normalizedPath)
  const gitBranchValue = gitBranch(normalizedPath)
  const instructionFiles = readInstructionFiles(normalizedPath)
  const readme = readReadme(normalizedPath)
  const status = buildProjectStatus(normalizedPath)
  const baseProject = {
    path: normalizedPath,
    gitRemote: gitRemoteValue,
    gitBranch: gitBranchValue,
    instructionFiles,
    readme,
    status,
  }
  return {
    id,
    name: displayName || path.basename(normalizedPath),
    path: normalizedPath,
    source,
    active: activeProjectId
      ? id === activeProjectId
      : normalizedPath === activePath,
    gitRemote: gitRemoteValue,
    gitBranch: gitBranchValue,
    status,
    contextPreview: buildContextPreview(baseProject),
    instructionFiles,
    readme,
  }
}

export async function buildProjectRegistry(): Promise<ProjectRegistryResponse> {
  const catalog = await loadWorkspaceCatalog()
  const activePath =
    catalog.isValid && catalog.path ? normalizePath(catalog.path) : ''
  const persistedActiveProjectId = readPersistedActiveProjectId()
  const roots =
    catalog.workspaces.length > 0
      ? catalog.workspaces.map((workspace) => workspace.path)
      : activePath
        ? [activePath]
        : []
  const candidates = new Map<
    string,
    { source: ProjectRegistryEntry['source']; name?: string }
  >()

  for (const shared of SHARED_PROJECTS) {
    const normalizedSharedPath = normalizePath(shared.path)
    if (!isDirectory(normalizedSharedPath)) continue
    candidates.set(normalizedSharedPath, {
      source: 'shared',
      name: shared.name,
    })
  }

  for (const root of roots) {
    const normalizedRoot = normalizePath(root)
    if (!isDirectory(normalizedRoot)) continue
    if (hasProjectMarker(normalizedRoot)) {
      const existing = candidates.get(normalizedRoot)
      candidates.set(normalizedRoot, {
        source: existing?.source ?? 'discovered',
        name: existing?.name,
      })
    }
    for (const child of listDirectChildProjects(normalizedRoot)) {
      const normalizedChild = normalizePath(child)
      const existing = candidates.get(normalizedChild)
      candidates.set(normalizedChild, {
        source: existing?.source ?? 'discovered',
        name: existing?.name,
      })
    }
  }

  if (activePath && isDirectory(activePath)) {
    const existing = candidates.get(activePath)
    candidates.set(activePath, {
      source: existing?.source ?? 'discovered',
      name: existing?.name,
    })
  }

  const projects = [...candidates.entries()]
    .sort(([aPath, aMeta], [bPath, bMeta]) => {
      const sourceOrder = aMeta.source.localeCompare(bMeta.source)
      if (sourceOrder !== 0) return sourceOrder
      return (aMeta.name || path.basename(aPath)).localeCompare(
        bMeta.name || path.basename(bPath),
      )
    })
    .slice(0, MAX_PROJECTS)
    .map(([projectPath, meta]) =>
      toProjectEntry(
        projectPath,
        activePath,
        persistedActiveProjectId,
        meta.source,
        meta.name,
      ),
    )

  return {
    activeProjectId: projects.find((project) => project.active)?.id ?? null,
    projects,
    fetchedAt: Date.now(),
  }
}

export async function setActiveProjectById(
  projectId: string,
): Promise<ProjectRegistryResponse> {
  const registry = await buildProjectRegistry()
  const selected = registry.projects.find((project) => project.id === projectId)
  if (!selected) {
    throw new Error('Project not found')
  }
  writePersistedActiveProjectId(selected.id)
  return buildProjectRegistry()
}

function formatProjectFileForPrompt(
  file: ProjectRegistryInstructionFile,
): string {
  const excerpt = file.excerpt.slice(0, MAX_PROMPT_FILE_CHARS)
  return [`### ${file.name}`, `Path: ${file.path}`, '', excerpt].join('\n')
}

export function buildProjectContextPromptBlock(
  project: ProjectRegistryEntry | null,
): string {
  if (!project) return ''
  const files =
    project.instructionFiles.length > 0
      ? project.instructionFiles
      : project.readme
        ? [project.readme]
        : []
  return [
    '## Active Project Context',
    '',
    `Project: ${project.name}`,
    `Path: ${project.path}`,
    `Git remote: ${project.gitRemote ?? 'none'}`,
    `Git branch: ${project.gitBranch ?? 'unknown'}`,
    '',
    'Use this project path as the primary working directory for spawned workers unless the user explicitly asks otherwise.',
    'Pass the relevant instruction snippets below into worker prompts. Treat AGENTS.md/CLAUDE.md/.cursorrules as project instructions.',
    ...(files.length > 0
      ? ['', ...files.map(formatProjectFileForPrompt)]
      : ['', 'No project instruction/readme files found at project root.']),
  ].join('\n')
}

export async function getActiveProjectContext(): Promise<ActiveProjectContext> {
  const registry = await buildProjectRegistry()
  const project =
    registry.projects.find((entry) => entry.id === registry.activeProjectId) ??
    registry.projects.find((entry) => entry.active) ??
    null
  return {
    project,
    promptBlock: buildProjectContextPromptBlock(project),
  }
}
