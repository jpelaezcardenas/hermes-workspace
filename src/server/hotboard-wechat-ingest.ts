import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn, type ChildProcess } from 'node:child_process'
import {
  buildWechatArticleId,
  createWechatStore,
  normalizeWechatUrl,
  type WechatArticleRecord,
} from './hotboard-wechat-store'

type SpawnImpl = typeof spawn

export type WechatFetchResult = {
  title: string
  author: string | null
  publish_time: string | null
  status: string | null
  size: number | null
  markdownPath: string
}

export class WechatFetchError extends Error {
  readonly stdout: string
  readonly stderr: string
  readonly exitCode: number | null

  constructor(
    message: string,
    options: {
      stdout?: string
      stderr?: string
      exitCode?: number | null
    } = {},
  ) {
    super(message)
    this.name = 'WechatFetchError'
    this.stdout = options.stdout ?? ''
    this.stderr = options.stderr ?? ''
    this.exitCode = options.exitCode ?? null
  }
}

export class WechatFetchTimeoutError extends WechatFetchError {
  constructor(
    message: string,
    options: {
      stdout?: string
      stderr?: string
    } = {},
  ) {
    super(message, options)
    this.name = 'WechatFetchTimeoutError'
  }
}

function resolveOpencliBin() {
  return process.env.HERMES_HOTBOARD_WECHAT_OPENCLI_BIN?.trim() || path.join(os.homedir(), '.npm-global', 'bin', 'opencli')
}

function resolveWechatOutputRoot() {
  return path.join(os.homedir(), '.hermes', 'data', 'hotboard-wechat')
}

function coerceString(value: unknown) {
  const normalized = String(value ?? '').trim()
  return normalized.length > 0 ? normalized : null
}

function parseJsonPayload(stdout: string) {
  const trimmed = stdout.trim()
  if (!trimmed) {
    throw new Error('opencli returned empty stdout')
  }

  try {
    return JSON.parse(trimmed) as unknown
  } catch {
    const lines = trimmed
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)

    for (let index = lines.length - 1; index >= 0; index -= 1) {
      try {
        return JSON.parse(lines[index] as string) as unknown
      } catch {
        continue
      }
    }
  }

  const objectStart = Math.min(
    ...[trimmed.indexOf('{'), trimmed.indexOf('[')].filter((value) => value >= 0),
  )
  const objectEnd = Math.max(trimmed.lastIndexOf('}'), trimmed.lastIndexOf(']'))
  if (Number.isFinite(objectStart) && objectStart >= 0 && objectEnd > objectStart) {
    return JSON.parse(trimmed.slice(objectStart, objectEnd + 1)) as unknown
  }

  throw new Error('opencli returned non-json output')
}

function normalizeCliRow(payload: unknown) {
  if (Array.isArray(payload)) {
    const first = payload[0]
    if (first && typeof first === 'object') return first as Record<string, unknown>
  }

  if (payload && typeof payload === 'object') {
    const objectPayload = payload as Record<string, unknown>
    if (Array.isArray(objectPayload.items)) {
      const first = objectPayload.items[0]
      if (first && typeof first === 'object') return first as Record<string, unknown>
    }
    if (Array.isArray(objectPayload.data)) {
      const first = objectPayload.data[0]
      if (first && typeof first === 'object') return first as Record<string, unknown>
    }
    return objectPayload
  }

  throw new Error('opencli payload shape is unsupported')
}

function parseSizeBytes(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.max(0, Math.round(value))
  }

  const text = String(value ?? '').trim()
  if (!text) return null

  const plain = Number(text)
  if (Number.isFinite(plain)) {
    return Math.max(0, Math.round(plain))
  }

  const match = text.match(/^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB|TB)$/i)
  if (!match) return null

  const amount = Number(match[1])
  const unit = match[2].toUpperCase()
  const multipliers: Record<string, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 ** 2,
    GB: 1024 ** 3,
    TB: 1024 ** 4,
  }

  return Math.max(0, Math.round(amount * multipliers[unit]))
}

function walkForMarkdownFiles(rootDir: string): string[] {
  if (!fs.existsSync(rootDir)) return []

  const entries = fs.readdirSync(rootDir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const nextPath = path.join(rootDir, entry.name)
    if (entry.isDirectory()) {
      files.push(...walkForMarkdownFiles(nextPath))
      continue
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(path.resolve(nextPath))
    }
  }

  return files
}

function stripFrontmatter(markdown: string) {
  const trimmed = markdown.trimStart()
  if (!trimmed.startsWith('---')) return markdown

  const lines = trimmed.split(/\r?\n/)
  let closingIndex = -1

  for (let index = 1; index < lines.length; index += 1) {
    if (lines[index]?.trim() === '---') {
      closingIndex = index
      break
    }
  }

  if (closingIndex < 0) return markdown
  return lines.slice(closingIndex + 1).join('\n')
}

function buildExcerpt(markdown: string) {
  const content = stripFrontmatter(markdown).replace(/\s+/g, ' ').trim()
  if (content.length <= 280) return content
  return content.slice(0, 280)
}

export function parseWechatPublishTimeToIsoUtc(value: string | null | undefined) {
  const trimmed = String(value ?? '').trim()
  if (!trimmed) return null

  const zhMatch = trimmed.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日(?:\s+(\d{1,2}):(\d{2}))?$/)
  if (zhMatch) {
    const year = Number(zhMatch[1])
    const month = Number(zhMatch[2])
    const day = Number(zhMatch[3])
    const hour = Number(zhMatch[4] ?? '0')
    const minute = Number(zhMatch[5] ?? '0')
    return new Date(Date.UTC(year, month - 1, day, hour - 8, minute)).toISOString()
  }

  const numericMatch = trimmed.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:\s+(\d{1,2}):(\d{2}))?$/)
  if (numericMatch) {
    const year = Number(numericMatch[1])
    const month = Number(numericMatch[2])
    const day = Number(numericMatch[3])
    const hour = Number(numericMatch[4] ?? '0')
    const minute = Number(numericMatch[5] ?? '0')
    return new Date(Date.UTC(year, month - 1, day, hour - 8, minute)).toISOString()
  }

  const parsed = new Date(trimmed)
  if (Number.isNaN(parsed.getTime())) return null
  return parsed.toISOString()
}

export async function fetchWechatArticle(
  url: string,
  outputDir: string,
  options: {
    timeoutMs?: number
    spawnImpl?: SpawnImpl
  } = {},
): Promise<WechatFetchResult> {
  fs.mkdirSync(outputDir, { recursive: true })

  const spawnImpl = options.spawnImpl ?? spawn
  const timeoutMs = options.timeoutMs ?? 60_000
  const command = resolveOpencliBin()

  return await new Promise((resolve, reject) => {
    const child = spawnImpl(
      command,
      [
        'weixin',
        'download',
        '--url',
        url,
        '--output',
        outputDir,
        '--download-images',
        'false',
        '--format',
        'json',
      ],
      {
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    )

    let stdout = ''
    let stderr = ''
    let settled = false

    const finish = (error?: Error, result?: WechatFetchResult) => {
      if (settled) return
      settled = true
      clearTimeout(timeoutId)
      if (error) {
        reject(error)
        return
      }
      resolve(result as WechatFetchResult)
    }

    child.stdout?.on('data', (chunk) => {
      stdout += Buffer.isBuffer(chunk) ? chunk.toString('utf-8') : String(chunk)
    })

    child.stderr?.on('data', (chunk) => {
      stderr += Buffer.isBuffer(chunk) ? chunk.toString('utf-8') : String(chunk)
    })

    child.once('error', (error) => {
      finish(
        new WechatFetchError(`opencli weixin download failed: ${error.message}`, {
          stdout,
          stderr,
        }),
      )
    })

    child.once('close', (exitCode) => {
      if (exitCode !== 0) {
        finish(
          new WechatFetchError(
            `opencli weixin download exited with code ${exitCode}: ${stderr.trim() || stdout.trim() || 'unknown error'}`,
            {
              stdout,
              stderr,
              exitCode,
            },
          ),
        )
        return
      }

      try {
        const payload = parseJsonPayload(stdout)
        const row = normalizeCliRow(payload)
        const markdownFiles = walkForMarkdownFiles(outputDir).sort()
        const markdownPath = markdownFiles[0]

        if (!markdownPath) {
          throw new Error('download finished but no markdown file was produced')
        }

        finish(undefined, {
          title: coerceString(row.title) ?? path.basename(markdownPath, '.md'),
          author: coerceString(row.author),
          publish_time: coerceString(row.publish_time),
          status: coerceString(row.status),
          size: parseSizeBytes(row.size),
          markdownPath,
        })
      } catch (error) {
        finish(
          new WechatFetchError(
            error instanceof Error ? error.message : 'failed to parse opencli output',
            {
              stdout,
              stderr,
              exitCode,
            },
          ),
        )
      }
    })

    const timeoutId = setTimeout(() => {
      ;(child as ChildProcess).kill('SIGTERM')
      finish(
        new WechatFetchTimeoutError(
          `opencli weixin download timed out after ${timeoutMs}ms`,
          {
            stdout,
            stderr,
          },
        ),
      )
    }, timeoutMs)
  })
}

export async function ingestWechatUrl(
  url: string,
  userId: string,
  options: {
    fetchArticleImpl?: typeof fetchWechatArticle
    outputRoot?: string
    store?: ReturnType<typeof createWechatStore>
    fetchedAt?: string
  } = {},
): Promise<WechatArticleRecord> {
  const normalizedUrl = normalizeWechatUrl(url)
  const articleId = buildWechatArticleId(normalizedUrl)
  const outputRoot = options.outputRoot ?? resolveWechatOutputRoot()
  const outputDir = path.join(outputRoot, articleId)

  fs.rmSync(outputDir, { recursive: true, force: true })
  fs.mkdirSync(outputDir, { recursive: true })

  const fetchArticleImpl = options.fetchArticleImpl ?? fetchWechatArticle
  const fetched = await fetchArticleImpl(normalizedUrl, outputDir)
  const markdownPath = path.resolve(fetched.markdownPath)
  const markdown = fs.readFileSync(markdownPath, 'utf-8')

  return (options.store ?? createWechatStore()).upsertArticle({
    id: articleId,
    url: normalizedUrl,
    title: fetched.title.trim() || '未命名公众号文章',
    author: fetched.author?.trim() || null,
    publish_time: parseWechatPublishTimeToIsoUtc(fetched.publish_time),
    size_bytes: fetched.size ?? null,
    markdown_path: markdownPath,
    excerpt: buildExcerpt(markdown),
    fetched_at: options.fetchedAt ?? new Date().toISOString(),
    fetched_by_user_id: userId.trim(),
  })
}
