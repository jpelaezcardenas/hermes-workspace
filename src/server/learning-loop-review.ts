import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, relative } from 'node:path'
import type { Dirent } from 'node:fs'
import type {
  LearningLoopReview,
  LearningLoopReviewItem,
  LearningLoopReviewStatus,
  LearningLoopRiskLevel,
} from '@/features/learning-loop/types'

const DEFAULT_WINDOW_HOURS = 168
const MAX_ITEMS = 80
const MAX_EXCERPT_CHARS = 220
const SECRET_PATTERN =
  /(api[_-]?key|token|secret|password|credential|bearer|private[_-]?key)/i
const HIGH_RISK_PROFILE_PATTERN = /^(executive|restored|tm-cos|personal)$/

function getHermesRoot() {
  const configuredHome = process.env.HERMES_HOME || join(homedir(), '.hermes')
  const parent = dirname(configuredHome)
  if (parent.endsWith('/profiles')) return dirname(parent)
  return configuredHome
}

function safeStat(path: string) {
  try {
    return statSync(path)
  } catch {
    return null
  }
}

function safeRead(path: string) {
  try {
    return readFileSync(path, 'utf8')
  } catch {
    return ''
  }
}

function listDirectories(path: string) {
  try {
    return readdirSync(path, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right))
  } catch {
    return []
  }
}

function walkFiles(root: string, predicate: (path: string) => boolean) {
  const files: Array<string> = []
  const stack = [root]

  while (stack.length) {
    const current = stack.pop()
    if (!current) continue
    let entries: Array<Dirent>
    try {
      entries = readdirSync(current, { withFileTypes: true })
    } catch {
      continue
    }

    for (const entry of entries) {
      const path = join(current, entry.name)
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.git') continue
        stack.push(path)
      } else if (entry.isFile() && predicate(path)) {
        files.push(path)
      }
    }
  }

  return files
}

function hoursSince(dateMs: number, nowMs: number) {
  return Math.max(0, Math.round((nowMs - dateMs) / 36_000 / 10))
}

function classifyStatus(ageHours: number): LearningLoopReviewStatus {
  if (ageHours <= 24) return 'new'
  if (ageHours <= DEFAULT_WINDOW_HOURS) return 'recent'
  return 'stable'
}

function firstMeaningfulLine(content: string) {
  const line = content
    .split('\n')
    .map((entry) => entry.trim())
    .find(
      (entry) => entry && !entry.startsWith('---') && !entry.startsWith('#'),
    )
  if (!line) return 'No readable summary found.'
  if (SECRET_PATTERN.test(line))
    return 'Content hidden because it may contain credential-like text.'
  return line.length > MAX_EXCERPT_CHARS
    ? `${line.slice(0, MAX_EXCERPT_CHARS - 1)}…`
    : line
}

function skillTitle(content: string, fallback: string) {
  const frontmatterName = content.match(/^name:\s*(.+)$/m)?.[1]?.trim()
  if (frontmatterName) return frontmatterName
  const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim()
  return heading || fallback
}

function skillDescription(content: string) {
  const frontmatterDescription = content
    .match(/^description:\s*(.+)$/m)?.[1]
    ?.trim()
  if (frontmatterDescription) return frontmatterDescription
  return firstMeaningfulLine(content)
}

function riskForItem(args: {
  kind: 'memory' | 'skill'
  profile: string
  path: string
  content: string
  ageHours: number
}): { risk: LearningLoopRiskLevel; flags: Array<string> } {
  const flags: Array<string> = []
  let score = 0

  if (args.ageHours <= 24) {
    flags.push('Changed in the last 24 hours')
    score += 1
  }
  if (HIGH_RISK_PROFILE_PATTERN.test(args.profile)) {
    flags.push('Affects a domain/profile with approval boundaries')
    score += 1
  }
  if (args.kind === 'memory') {
    flags.push('Persistent memory changes influence future agent behavior')
    score += 1
  }
  if (args.kind === 'skill') {
    flags.push('Skill changes can alter repeatable workflows')
    score += 1
  }
  if (SECRET_PATTERN.test(args.content) || SECRET_PATTERN.test(args.path)) {
    flags.push('Credential-like wording detected, content preview suppressed')
    score += 2
  }

  return {
    risk: score >= 4 ? 'high' : score >= 2 ? 'medium' : 'low',
    flags,
  }
}

function profileRoots() {
  const hermesRoot = getHermesRoot()
  const profilesRoot = join(hermesRoot, 'profiles')
  const profileNames = listDirectories(profilesRoot)

  if (profileNames.length === 0) {
    return [{ profile: 'default', root: hermesRoot }]
  }

  return profileNames.map((profile) => ({
    profile,
    root: join(profilesRoot, profile),
  }))
}

function collectMemoryItems(profile: string, root: string, nowMs: number) {
  const memoryRoots = ['memories', 'memory']
    .map((name) => join(root, name))
    .filter((path) => existsSync(path))
  const directMemoryFiles = ['MEMORY.md', 'USER.md']
    .map((name) => join(root, name))
    .filter((path) => existsSync(path))
  const files = [
    ...directMemoryFiles,
    ...memoryRoots.flatMap((path) =>
      walkFiles(path, (file) => /\.(md|txt|json)$/i.test(file)),
    ),
  ]

  return files
    .map((path): LearningLoopReviewItem | null => {
      const stats = safeStat(path)
      if (!stats) return null
      const content = safeRead(path)
      const ageHours = hoursSince(stats.mtimeMs, nowMs)
      const risk = riskForItem({
        kind: 'memory',
        profile,
        path,
        content,
        ageHours,
      })
      const suppressPreview =
        SECRET_PATTERN.test(content) || SECRET_PATTERN.test(path)

      return {
        id: `memory:${profile}:${relative(root, path)}`,
        kind: 'memory',
        profile,
        name: path.endsWith('USER.md')
          ? 'User profile memory'
          : path.endsWith('MEMORY.md')
            ? 'Agent memory'
            : relative(root, path),
        relativePath: relative(root, path),
        updatedAt: new Date(stats.mtimeMs).toISOString(),
        ageHours,
        status: classifyStatus(ageHours),
        risk: risk.risk,
        reviewFlags: risk.flags,
        summary: suppressPreview
          ? 'Preview hidden because this file may contain credential-like text.'
          : firstMeaningfulLine(content),
      }
    })
    .filter((item): item is LearningLoopReviewItem => item !== null)
}

function collectSkillItems(profile: string, root: string, nowMs: number) {
  const skillsRoot = join(root, 'skills')
  if (!existsSync(skillsRoot)) return []

  return walkFiles(skillsRoot, (file) => file.endsWith('/SKILL.md'))
    .map((path): LearningLoopReviewItem | null => {
      const stats = safeStat(path)
      if (!stats) return null
      const content = safeRead(path)
      const relativePath = relative(root, path)
      const fallbackName = relative(skillsRoot, path).replace(
        /\/SKILL\.md$/,
        '',
      )
      const ageHours = hoursSince(stats.mtimeMs, nowMs)
      const risk = riskForItem({
        kind: 'skill',
        profile,
        path,
        content,
        ageHours,
      })
      const suppressPreview =
        SECRET_PATTERN.test(content) || SECRET_PATTERN.test(path)

      return {
        id: `skill:${profile}:${relativePath}`,
        kind: 'skill',
        profile,
        name: skillTitle(content, fallbackName),
        relativePath,
        updatedAt: new Date(stats.mtimeMs).toISOString(),
        ageHours,
        status: classifyStatus(ageHours),
        risk: risk.risk,
        reviewFlags: risk.flags,
        summary: suppressPreview
          ? 'Preview hidden because this skill may contain credential-like text.'
          : skillDescription(content),
      }
    })
    .filter((item): item is LearningLoopReviewItem => item !== null)
}

export function buildLearningLoopReview(
  windowHours = DEFAULT_WINDOW_HOURS,
): LearningLoopReview {
  const now = new Date()
  const nowMs = now.getTime()
  const roots = profileRoots()
  const items = roots
    .flatMap(({ profile, root }) => [
      ...collectMemoryItems(profile, root, nowMs),
      ...collectSkillItems(profile, root, nowMs),
    ])
    .filter((item) => item.ageHours <= windowHours)
    .sort(
      (left, right) =>
        new Date(right.updatedAt).getTime() -
        new Date(left.updatedAt).getTime(),
    )
    .slice(0, MAX_ITEMS)

  return {
    ok: true,
    generatedAt: now.toISOString(),
    windowHours,
    profiles: roots.map((entry) => entry.profile),
    items,
    counts: {
      total: items.length,
      memory: items.filter((item) => item.kind === 'memory').length,
      skill: items.filter((item) => item.kind === 'skill').length,
      highRisk: items.filter((item) => item.risk === 'high').length,
      mediumRisk: items.filter((item) => item.risk === 'medium').length,
      reviewNeeded: items.filter(
        (item) => item.risk !== 'low' || item.status === 'new',
      ).length,
    },
  }
}
