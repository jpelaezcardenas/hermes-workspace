import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import YAML from 'yaml'
import {
  HERMES_SLASH_COMMANDS,
  formatSlashCommand,
  resolveHermesSlashCommand,
  resolveHermesSlashCommandExact,
} from '../lib/hermes-slash-commands'

type SkillCommand = {
  command: string
  name: string
  description: string
  skillDir: string
  skillMdPath: string
}

export type SkillCommandSummary = Pick<
  SkillCommand,
  'command' | 'name' | 'description'
>

type LoadedSkill = {
  command: SkillCommand
  content: string
  rawContent: string
}

type ParsedFrontmatter = {
  frontmatter: Record<string, unknown>
  body: string
}

export type SlashCommandPreprocessResult =
  | {
      handled: true
      kind: 'skill'
      message: string
      skillName: string
      command: string
    }
  | {
      handled: true
      kind: 'response'
      message: string
      command: string
    }
  | { handled: false }

const SKILL_INVALID_CHARS = /[^a-z0-9-]/g
const SKILL_MULTI_HYPHEN = /-{2,}/g
const MAX_SUPPORTING_FILES = 50

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function getHermesHome(): string {
  const configured = process.env.HERMES_HOME?.trim()
  return configured ? path.resolve(configured) : path.join(os.homedir(), '.hermes')
}

function getSkillRoots(): Array<string> {
  const roots = [
    path.join(getHermesHome(), 'skills'),
    path.resolve(process.cwd(), 'skills'),
  ]
  return Array.from(new Set(roots)).filter((root) => {
    try {
      return fs.statSync(root).isDirectory()
    } catch {
      return false
    }
  })
}

export function slugifySkillCommandName(input: string): string {
  return input
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(SKILL_INVALID_CHARS, '')
    .replace(SKILL_MULTI_HYPHEN, '-')
    .replace(/(^-|-$)+/g, '')
}

function parseFrontmatter(raw: string): ParsedFrontmatter {
  if (!raw.startsWith('---')) return { frontmatter: {}, body: raw }

  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { frontmatter: {}, body: raw }

  try {
    const parsed = YAML.parse(match[1])
    return {
      frontmatter:
        parsed && typeof parsed === 'object' && !Array.isArray(parsed)
          ? (parsed as Record<string, unknown>)
          : {},
      body: match[2] ?? '',
    }
  } catch {
    return { frontmatter: {}, body: match[2] ?? raw }
  }
}

function findSkillMarkdownFiles(root: string): Array<string> {
  const results: Array<string> = []

  function walk(dir: string) {
    let entries: Array<fs.Dirent>
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }

    for (const entry of entries) {
      if (entry.name === '.git' || entry.name === '.github' || entry.name === '.hub') {
        continue
      }
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }
      if (entry.isFile() && entry.name === 'SKILL.md') {
        results.push(fullPath)
      }
    }
  }

  walk(root)
  return results
}

export function scanSkillCommands(): Array<SkillCommand> {
  const commands: Array<SkillCommand> = []
  const seen = new Set<string>()

  for (const root of getSkillRoots()) {
    for (const skillMdPath of findSkillMarkdownFiles(root)) {
      let raw = ''
      try {
        raw = fs.readFileSync(skillMdPath, 'utf8')
      } catch {
        continue
      }

      const { frontmatter, body } = parseFrontmatter(raw)
      const name = readString(frontmatter.name) || path.basename(path.dirname(skillMdPath))
      const slug = slugifySkillCommandName(name)
      if (!slug || seen.has(slug)) continue

      let description = readString(frontmatter.description)
      if (!description) {
        description =
          body
            .split(/\r?\n/)
            .map((line) => line.trim())
            .find((line) => line && !line.startsWith('#'))
            ?.slice(0, 120) ?? ''
      }

      seen.add(slug)
      commands.push({
        command: `/${slug}`,
        name,
        description: description || `Invoke the ${name} skill`,
        skillDir: path.dirname(skillMdPath),
        skillMdPath,
      })
    }
  }

  return commands.sort((left, right) => left.command.localeCompare(right.command))
}

export function getSkillSlashCommandDefinitions(): Array<SkillCommandSummary> {
  return scanSkillCommands().map(
    ({ command, name, description }) => ({
      command,
      name,
      description,
    }),
  )
}

function resolveSkillCommand(commandName: string): SkillCommand | null {
  const normalized = slugifySkillCommandName(commandName.replace(/^\/+/, ''))
  if (!normalized) return null

  return (
    scanSkillCommands().find((command) => {
      const commandSlug = command.command.slice(1)
      return (
        commandSlug === normalized ||
        commandSlug.replace(/-/g, '_') === normalized.replace(/-/g, '_')
      )
    }) ?? null
  )
}

function loadSkill(command: SkillCommand): LoadedSkill | null {
  try {
    const rawContent = fs.readFileSync(command.skillMdPath, 'utf8')
    return {
      command,
      rawContent,
      content: parseFrontmatter(rawContent).body.trim(),
    }
  } catch {
    return null
  }
}

function listSupportingFiles(skillDir: string): Array<string> {
  const supporting: Array<string> = []
  for (const dirname of ['references', 'templates', 'scripts', 'assets']) {
    const dir = path.join(skillDir, dirname)
    try {
      if (!fs.statSync(dir).isDirectory()) continue
    } catch {
      continue
    }

    function walk(currentDir: string) {
      if (supporting.length >= MAX_SUPPORTING_FILES) return
      let entries: Array<fs.Dirent>
      try {
        entries = fs.readdirSync(currentDir, { withFileTypes: true })
      } catch {
        return
      }
      for (const entry of entries) {
        if (supporting.length >= MAX_SUPPORTING_FILES) return
        const fullPath = path.join(currentDir, entry.name)
        if (entry.isDirectory()) {
          walk(fullPath)
          continue
        }
        if (entry.isFile() && !entry.isSymbolicLink()) {
          supporting.push(path.relative(skillDir, fullPath).replace(/\\/g, '/'))
        }
      }
    }

    walk(dir)
  }
  return supporting
}

function buildSkillInvocationMessage(
  loadedSkill: LoadedSkill,
  userInstruction: string,
): string {
  const { command } = loadedSkill
  const parts = [
    `[SYSTEM: The user has invoked the "${command.name}" skill, indicating they want you to follow its instructions. The full skill content is loaded below.]`,
    '',
    loadedSkill.content,
    '',
    `[Skill directory: ${command.skillDir}]`,
    'Resolve any relative paths in this skill (for example scripts, templates, references, or assets) against that directory.',
  ]

  const supportingFiles = listSupportingFiles(command.skillDir)
  if (supportingFiles.length > 0) {
    parts.push('', '[This skill has supporting files:]')
    for (const file of supportingFiles) {
      parts.push(`- ${file} -> ${path.join(command.skillDir, file)}`)
    }
  }

  if (userInstruction.trim()) {
    parts.push(
      '',
      `The user has provided the following instruction alongside the skill invocation: ${userInstruction.trim()}`,
    )
  }

  return parts.join('\n')
}

function parseSlashInvocation(message: string): {
  commandName: string
  args: string
} | null {
  const trimmed = message.trim()
  if (!trimmed.startsWith('/')) return null
  const match = trimmed.match(/^\/([^\s/]+)(?:\s+([\s\S]*))?$/)
  if (!match) return null
  return {
    commandName: match[1] ?? '',
    args: match[2] ?? '',
  }
}

function buildHelpMessage(): string {
  const lines = [
    'Hermes slash commands available in Workspace:',
    '',
    ...HERMES_SLASH_COMMANDS.map((command) => {
      const aliases = command.aliases?.length
        ? ` (aliases: ${command.aliases.map((alias) => `/${alias}`).join(', ')})`
        : ''
      return `- \`${formatSlashCommand(command)}\` - ${command.description}${aliases}`
    }),
  ]
  const skillCommands = scanSkillCommands()
  if (skillCommands.length > 0) {
    lines.push('', 'Installed skill commands:')
    for (const skill of skillCommands) {
      lines.push(`- \`${skill.command}\` - ${skill.description}`)
    }
  }
  return lines.join('\n')
}

export function preprocessHermesSlashCommand(
  message: string,
): SlashCommandPreprocessResult {
  const invocation = parseSlashInvocation(message)
  if (!invocation) return { handled: false }

  const commandName = invocation.commandName.toLowerCase()
  const resolvedBuiltin = resolveHermesSlashCommand(commandName)
  if (
    resolvedBuiltin &&
    (resolvedBuiltin.name === 'help' || resolvedBuiltin.name === 'commands')
  ) {
    return {
      handled: true,
      kind: 'response',
      command: `/${resolvedBuiltin.name}`,
      message: buildHelpMessage(),
    }
  }

  let skillCommand: SkillCommand | null = null
  let instruction = invocation.args

  if (commandName === 'skill') {
    const nested = parseSlashInvocation(`/${invocation.args}`)
    if (!nested) return { handled: false }
    skillCommand = resolveSkillCommand(nested.commandName)
    instruction = nested.args
  } else {
    if (resolveHermesSlashCommandExact(commandName)) return { handled: false }
    skillCommand = resolveSkillCommand(commandName)
  }

  if (!skillCommand) return { handled: false }

  const loaded = loadSkill(skillCommand)
  if (!loaded) {
    return {
      handled: true,
      kind: 'skill',
      message: `[Failed to load skill: ${skillCommand.name}]`,
      skillName: skillCommand.name,
      command: skillCommand.command,
    }
  }

  return {
    handled: true,
    kind: 'skill',
    message: buildSkillInvocationMessage(loaded, instruction),
    skillName: skillCommand.name,
    command: skillCommand.command,
  }
}

export const preprocessSkillSlashCommand = preprocessHermesSlashCommand
