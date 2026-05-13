import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { loadWorkspaceCatalog } from '../routes/api/workspace'

export type ProjectRegistryInstructionFile = {
  name: string
  path: string
  excerpt: string
}

export type ProjectRegistryEntry = {
  id: string
  name: string
  path: string
  active: boolean
  gitRemote: string | null
  gitBranch: string | null
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

function toProjectEntry(
  projectPath: string,
  activePath: string,
): ProjectRegistryEntry {
  const normalizedPath = normalizePath(projectPath)
  return {
    id: stableProjectId(normalizedPath),
    name: path.basename(normalizedPath),
    path: normalizedPath,
    active: normalizedPath === activePath,
    gitRemote: gitRemote(normalizedPath),
    gitBranch: gitBranch(normalizedPath),
    instructionFiles: readInstructionFiles(normalizedPath),
    readme: readReadme(normalizedPath),
  }
}

export async function buildProjectRegistry(): Promise<ProjectRegistryResponse> {
  const catalog = await loadWorkspaceCatalog()
  const activePath =
    catalog.isValid && catalog.path ? normalizePath(catalog.path) : ''
  const roots =
    catalog.workspaces.length > 0
      ? catalog.workspaces.map((workspace) => workspace.path)
      : activePath
        ? [activePath]
        : []
  const candidates = new Set<string>()

  for (const root of roots) {
    const normalizedRoot = normalizePath(root)
    if (!isDirectory(normalizedRoot)) continue
    if (hasProjectMarker(normalizedRoot)) candidates.add(normalizedRoot)
    for (const child of listDirectChildProjects(normalizedRoot)) {
      candidates.add(normalizePath(child))
    }
  }

  if (activePath && isDirectory(activePath)) candidates.add(activePath)

  const projects = [...candidates]
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b)))
    .slice(0, MAX_PROJECTS)
    .map((projectPath) => toProjectEntry(projectPath, activePath))

  return {
    activeProjectId: projects.find((project) => project.active)?.id ?? null,
    projects,
    fetchedAt: Date.now(),
  }
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
