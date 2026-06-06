import { execFile } from 'node:child_process'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { promisify } from 'node:util'
import { chromium } from 'playwright'

import {
  createBrowserXArticleExtraction,
  isBrowserXLoginWallText,
  mergeXArticleExtractions,
  profileHome,
  readBookmarkCache,
  readXArticleExtractionCache,
  writeXArticleExtractionCache,
  xArticleBrowserProfilePath,
  xArticleBrowserRunPath,
  xArticleIdFromUrl,
  xArticleUrl,
} from '../src/routes/api/x-bookmarks/-x-bookmarks-utils'
import {
  brokerFieldCommandArgs,
  isXLoginTemporarilyLimited,
  shouldAttemptBrokerLogin,
} from './-x-article-browser-login-utils'

import type { XArticleExtraction } from '../src/routes/api/x-bookmarks/-x-bookmarks-utils'
import type { Page } from 'playwright'

const execFileAsync = promisify(execFile)

type RunSummary = {
  ok: boolean
  mode: 'setup-login' | 'extract'
  startedAt: string
  finishedAt: string
  profilePath: string
  totalArticleCandidates: number
  attempted: number
  extracted: number
  unavailable: number
  error: number
  remaining: number
  items: Array<
    Pick<
      XArticleExtraction,
      | 'articleId'
      | 'articleUrl'
      | 'sourceTweetId'
      | 'status'
      | 'title'
      | 'excerpt'
      | 'extractedAt'
      | 'method'
      | 'error'
    >
  >
  errorMessage?: string
}

function argValue(name: string, fallback = ''): string {
  const index = process.argv.indexOf(name)
  if (index === -1) return fallback
  return process.argv[index + 1] || fallback
}

function hasArg(name: string): boolean {
  return process.argv.includes(name)
}

function limitFromArgs(): number {
  const raw = Number(argValue('--limit', '10'))
  if (!Number.isFinite(raw)) return 10
  return Math.min(Math.max(Math.floor(raw), 1), 50)
}

async function readJsonFile<T>(path: string): Promise<T | null> {
  try {
    return JSON.parse(await readFile(path, 'utf-8')) as T
  } catch {
    return null
  }
}

async function writeRunSummary(summary: RunSummary): Promise<void> {
  const path = xArticleBrowserRunPath(profileHome())
  await mkdir(dirname(path), { recursive: true, mode: 0o700 })
  await writeFile(path, `${JSON.stringify(summary, null, 2)}\n`, {
    mode: 0o600,
  })
}

async function readBrokerField(
  field: 'username' | 'password',
): Promise<string> {
  const [command, ...args] = brokerFieldCommandArgs(field)
  const result = await execFileAsync(command, args, {
    timeout: 45_000,
    maxBuffer: 1024 * 128,
  })
  const value = result.stdout.trim()
  if (!value) throw new Error(`1Password broker returned empty ${field}.`)
  return value
}

async function clickFirstVisible(
  page: Page,
  selectors: Array<string>,
): Promise<boolean> {
  for (const selector of selectors) {
    const locator = page.locator(selector).first()
    if (await locator.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await locator.click()
      return true
    }
  }
  return false
}

async function fillFirstVisible(
  page: Page,
  selectors: Array<string>,
  value: string,
): Promise<boolean> {
  let filled = false
  for (const selector of selectors) {
    const locator = page.locator(selector)
    const count = await locator.count().catch(() => 0)
    for (let index = 0; index < count; index += 1) {
      const candidate = locator.nth(index)
      if (await candidate.isVisible({ timeout: 1_000 }).catch(() => false)) {
        await candidate.fill(value)
        filled = true
      }
    }
  }
  return filled
}

async function completeXLoginWithBroker(page: Page): Promise<void> {
  const username = await readBrokerField('username')
  const password = await readBrokerField('password')

  await page.goto('https://x.com/i/flow/login', {
    waitUntil: 'domcontentloaded',
    timeout: 60_000,
  })
  await page
    .waitForLoadState('networkidle', { timeout: 20_000 })
    .catch(() => undefined)

  const filledUsername = await fillFirstVisible(
    page,
    [
      'input[name="username_or_email"]',
      'input[autocomplete="username"]',
      'input[autocomplete="username webauthn"]',
      'input[name="text"]',
      'input[type="text"]',
    ],
    username,
  )
  if (!filledUsername)
    throw new Error('Could not find X username field for broker login.')

  await clickFirstVisible(page, [
    'div[role="button"]:has-text("Next")',
    'button:has-text("Next")',
  ])
  await page.waitForTimeout(1_500)

  const challengeVisible = await page
    .locator(
      'text=/Enter your phone number or username|Enter your email|Enter your username/i',
    )
    .first()
    .isVisible({ timeout: 2_000 })
    .catch(() => false)
  if (challengeVisible) {
    await fillFirstVisible(
      page,
      [
        'input[data-testid="ocfEnterTextTextInput"]',
        'input[name="text"]',
        'input[type="text"]',
      ],
      username,
    )
    await clickFirstVisible(page, [
      'div[role="button"]:has-text("Next")',
      'button:has-text("Next")',
    ])
    await page.waitForTimeout(1_500)
  }

  const filledPassword = await fillFirstVisible(
    page,
    [
      'input[name="password"]',
      'input[autocomplete="current-password"]',
      'input[type="password"]',
    ],
    password,
  )
  if (!filledPassword)
    throw new Error('Could not find X password field for broker login.')

  await clickFirstVisible(page, [
    'div[data-testid="LoginForm_Login_Button"]',
    'button:text-is("Log in")',
    'div[role="button"]:has-text("Log in")',
    'button:text-is("Continue")',
  ])
  await page
    .getByRole('button', { name: /^Continue$/ })
    .first()
    .click({ timeout: 2_000 })
    .catch(() => undefined)
  await page.keyboard.press('Enter').catch(() => undefined)
  await page
    .waitForLoadState('networkidle', { timeout: 30_000 })
    .catch(() => undefined)
  await page.waitForTimeout(3_000)

  const bodyText = await page
    .locator('body')
    .innerText({ timeout: 10_000 })
    .catch(() => '')
  if (isXLoginTemporarilyLimited(bodyText)) {
    throw new Error(
      'X temporarily limited broker login attempts. Wait before retrying browser login automation.',
    )
  }
  if (isBrowserXLoginWallText(bodyText)) {
    throw new Error(
      'Broker login submitted, but X still shows a login wall or challenge.',
    )
  }
}

async function setupLogin(): Promise<void> {
  const startedAt = new Date().toISOString()
  const profilePath = xArticleBrowserProfilePath(profileHome())
  await mkdir(profilePath, { recursive: true, mode: 0o700 })
  const context = await chromium.launchPersistentContext(profilePath, {
    headless: false,
    viewport: { width: 1280, height: 900 },
  })
  const page = context.pages()[0] || (await context.newPage())
  await page.goto('https://x.com/home', {
    waitUntil: 'domcontentloaded',
    timeout: 60_000,
  })
  console.log(
    'Opened dedicated X Article browser profile. Log into X in that browser window, then return here.',
  )
  console.log(
    'Waiting up to 10 minutes. The session will be reused by autonomous extraction.',
  )
  await page.waitForTimeout(10 * 60 * 1000)
  await context.close()
  await writeRunSummary({
    ok: true,
    mode: 'setup-login',
    startedAt,
    finishedAt: new Date().toISOString(),
    profilePath,
    totalArticleCandidates: 0,
    attempted: 0,
    extracted: 0,
    unavailable: 0,
    error: 0,
    remaining: 0,
    items: [],
  })
}

async function extractVisibleArticleText(
  pageUrl: string,
  sourceTweetId: string,
  extractedAt: string,
): Promise<XArticleExtraction> {
  const profilePath = xArticleBrowserProfilePath(profileHome())
  const context = await chromium.launchPersistentContext(profilePath, {
    headless: true,
    viewport: { width: 1280, height: 900 },
  })
  try {
    const page = context.pages()[0] || (await context.newPage())
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 60_000 })
    await page
      .waitForLoadState('networkidle', { timeout: 20_000 })
      .catch(() => undefined)
    await page.waitForTimeout(2_000)
    let currentUrl = page.url()
    let title = await page.title().catch(() => '')
    let bodyText = await page
      .locator('body')
      .innerText({ timeout: 10_000 })
      .catch(() => '')
    let needsLogin = isBrowserXLoginWallText(bodyText)
    if (
      needsLogin &&
      shouldAttemptBrokerLogin(
        'Dedicated browser profile is not logged into X.',
      )
    ) {
      await completeXLoginWithBroker(page)
      await page.goto(pageUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
      })
      await page
        .waitForLoadState('networkidle', { timeout: 20_000 })
        .catch(() => undefined)
      await page.waitForTimeout(2_000)
      currentUrl = page.url()
      title = await page.title().catch(() => '')
      bodyText = await page
        .locator('body')
        .innerText({ timeout: 10_000 })
        .catch(() => '')
      needsLogin = isBrowserXLoginWallText(bodyText)
    }
    return createBrowserXArticleExtraction({
      articleUrl: currentUrl.includes('/i/article/') ? currentUrl : pageUrl,
      sourceTweetId,
      title: title.replace(/\s*\/ X$/, ''),
      text: needsLogin ? '' : bodyText,
      extractedAt,
      error: needsLogin
        ? 'Dedicated browser profile is not logged into X.'
        : undefined,
    })
  } catch (err) {
    return createBrowserXArticleExtraction({
      articleUrl: pageUrl,
      sourceTweetId,
      text: '',
      extractedAt,
      error:
        err instanceof Error
          ? err.message
          : 'Unknown logged-in browser extraction error.',
    })
  } finally {
    await context.close()
  }
}

async function runExtraction(): Promise<void> {
  const startedAt = new Date().toISOString()
  const profilePath = xArticleBrowserProfilePath(profileHome())
  await mkdir(profilePath, { recursive: true, mode: 0o700 })
  const limit = limitFromArgs()
  const force = hasArg('--force')
  const cache = await readBookmarkCache()
  if (!cache) throw new Error('No X bookmark cache exists yet.')
  const existing = await readXArticleExtractionCache()
  const existingIds = new Set(
    (existing?.items || [])
      .filter((item) => item.status === 'extracted')
      .map((item) => item.articleId),
  )
  const articleCandidates = cache.items
    .map((item) => ({ item, articleUrl: xArticleUrl(item) }))
    .filter(({ articleUrl }) => Boolean(articleUrl))
  const targets = articleCandidates
    .filter(
      ({ articleUrl }) =>
        force || !existingIds.has(xArticleIdFromUrl(articleUrl)),
    )
    .slice(0, limit)

  const extractedAt = new Date().toISOString()
  const items: Array<XArticleExtraction> = []
  for (const target of targets) {
    items.push(
      await extractVisibleArticleText(
        target.articleUrl,
        target.item.id,
        extractedAt,
      ),
    )
  }
  const merged = mergeXArticleExtractions({ existing, extractedAt, items })
  await writeXArticleExtractionCache(merged)
  const counts = {
    extracted: items.filter((item) => item.status === 'extracted').length,
    unavailable: items.filter((item) => item.status === 'unavailable').length,
    error: items.filter((item) => item.status === 'error').length,
  }
  const remaining = Math.max(
    articleCandidates.filter(
      ({ articleUrl }) =>
        !new Set(
          merged.items
            .filter((item) => item.status === 'extracted')
            .map((item) => item.articleId),
        ).has(xArticleIdFromUrl(articleUrl)),
    ).length,
    0,
  )
  const summary: RunSummary = {
    ok: true,
    mode: 'extract',
    startedAt,
    finishedAt: new Date().toISOString(),
    profilePath,
    totalArticleCandidates: articleCandidates.length,
    attempted: items.length,
    extracted: counts.extracted,
    unavailable: counts.unavailable,
    error: counts.error,
    remaining,
    items: items.map((item) => ({
      articleId: item.articleId,
      articleUrl: item.articleUrl,
      sourceTweetId: item.sourceTweetId,
      status: item.status,
      title: item.title,
      excerpt: item.excerpt,
      extractedAt: item.extractedAt,
      method: item.method,
      error: item.error,
    })),
  }
  await writeRunSummary(summary)
  console.log(JSON.stringify(summary, null, 2))
}

async function main() {
  try {
    if (hasArg('--setup-login')) {
      await setupLogin()
    } else {
      await runExtraction()
    }
  } catch (err) {
    const summary: RunSummary = {
      ok: false,
      mode: hasArg('--setup-login') ? 'setup-login' : 'extract',
      startedAt: new Date().toISOString(),
      finishedAt: new Date().toISOString(),
      profilePath: xArticleBrowserProfilePath(profileHome()),
      totalArticleCandidates: 0,
      attempted: 0,
      extracted: 0,
      unavailable: 0,
      error: 1,
      remaining: 0,
      items: [],
      errorMessage:
        err instanceof Error
          ? err.message
          : 'Unknown X Article browser extractor failure.',
    }
    await writeRunSummary(summary)
    console.error(JSON.stringify(summary, null, 2))
    process.exitCode = 1
  }
}

await main()
