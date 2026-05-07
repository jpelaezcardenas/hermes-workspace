import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

export type ProjectSection = 'active' | 'test' | 'other'

export type ProjectEntry = {
  slug: string
  folder: string
  name: string
  description: string
  language: string | null
  github: string | null
  path: string
  exists: boolean
  section: ProjectSection
}

function projectsRoot(): string {
  return path.resolve(
    expandHome(process.env.HERMES_PROJECTS_ROOT?.trim() || path.join(os.homedir(), 'dev', 'projects')),
  )
}

function projectsMdPath(): string {
  return path.resolve(
    expandHome(process.env.HERMES_PROJECTS_MD?.trim() || path.join(os.homedir(), 'dev', 'PROJECTS.md')),
  )
}

function expandHome(input: string): string {
  if (input === '~') return os.homedir()
  if (input.startsWith('~/')) return path.join(os.homedir(), input.slice(2))
  return input
}

function stripMarkdown(value: string): string {
  return value
    .trim()
    .replace(/^`+|`+$/g, '')
    .replace(/^\[(.*)\]\((.*)\)$/u, '$1')
    .trim()
}

export function sanitizeProjectSlug(value: string | null | undefined): string | null {
  const raw = stripMarkdown(String(value ?? '')).toLowerCase()
  if (!raw || raw.includes('/') || raw.includes('\\') || raw.includes('..')) return null
  const slug = raw.replace(/[^a-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '')
  if (!slug || slug === '.' || slug === '..') return null
  return slug
}

function cells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => stripMarkdown(cell))
}

function isSeparatorRow(parts: string[]): boolean {
  return parts.length > 0 && parts.every((part) => /^:?-{3,}:?$/u.test(part.trim()))
}

function normalizeHeader(value: string): string {
  const v = value.toLowerCase()
  if (v.includes('klasör') || v.includes('folder')) return 'folder'
  if (v.includes('açıklama') || v.includes('description')) return 'description'
  if (v.includes('dil') || v.includes('platform') || v.includes('language')) return 'language'
  if (v.includes('github') || v.includes('repo')) return 'github'
  return v.replace(/\s+/g, '_')
}

function sectionForHeading(line: string): ProjectSection {
  const lower = line.toLowerCase()
  if (lower.includes('aktif')) return 'active'
  if (lower.includes('test') || lower.includes('deneme')) return 'test'
  return 'other'
}

async function existsDirectory(dirPath: string): Promise<boolean> {
  try {
    return (await fs.stat(dirPath)).isDirectory()
  } catch {
    return false
  }
}

export async function loadProjectCatalog(): Promise<ProjectEntry[]> {
  let raw = ''
  try {
    raw = await fs.readFile(projectsMdPath(), 'utf-8')
  } catch {
    return []
  }

  const root = projectsRoot()
  const entries: ProjectEntry[] = []
  let section: ProjectSection = 'other'
  let header: string[] | null = null

  for (const line of raw.split(/\r?\n/u)) {
    const trimmed = line.trim()
    if (!trimmed) continue
    if (trimmed.startsWith('##')) {
      section = sectionForHeading(trimmed)
      header = null
      continue
    }
    if (!trimmed.startsWith('|')) continue
    const parts = cells(trimmed)
    if (isSeparatorRow(parts)) continue
    if (!header) {
      header = parts.map(normalizeHeader)
      continue
    }

    const row: Record<string, string> = {}
    header.forEach((name, index) => {
      row[name] = parts[index] ?? ''
    })
    const folder = stripMarkdown(row.folder ?? '')
    const slug = sanitizeProjectSlug(folder)
    if (!slug) continue

    const projectPath = path.resolve(root, slug)
    if (projectPath !== path.join(root, slug)) continue

    entries.push({
      slug,
      folder,
      name: folder || slug,
      description: row.description?.trim() || '',
      language: row.language?.trim() || null,
      github: row.github?.trim() || null,
      path: projectPath,
      exists: await existsDirectory(projectPath),
      section,
    })
  }

  const seen = new Set<string>()
  return entries.filter((entry) => {
    if (seen.has(entry.slug)) return false
    seen.add(entry.slug)
    return true
  })
}

export function projectSlugForPath(candidatePath: string, projects: ProjectEntry[]): string | null {
  const resolved = path.resolve(expandHome(candidatePath))
  for (const project of projects) {
    const root = path.resolve(project.path)
    const rel = path.relative(root, resolved)
    if (resolved === root || (rel && !rel.startsWith('..') && !path.isAbsolute(rel))) {
      return project.slug
    }
  }
  return null
}
