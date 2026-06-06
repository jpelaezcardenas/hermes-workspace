import { createHash, randomBytes } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

export const X_BOOKMARK_SCOPES = [
  'bookmark.read',
  'tweet.read',
  'users.read',
] as const
export const X_BOOKMARK_OAUTH_SCOPES = [
  ...X_BOOKMARK_SCOPES,
  'offline.access',
] as const

export function buildXArticleCaptureBookmarklet(): string {
  const script = `(() => {
  const clean = (value) => String(value || '').replace(/\\s+$/g, '').trim();
  const lines = clean(document.body.innerText).split('\\n').map((line) => line.trim()).filter(Boolean);
  const skip = new Set(['Home', 'Explore', 'Notifications', 'Messages', 'Grok', 'Bookmarks', 'Jobs', 'Communities', 'Premium', 'Verified Orgs', 'Profile', 'More', 'Post', 'Reply', 'Repost', 'Like', 'Share', 'Terms of Service', 'Privacy Policy']);
  const text = lines.filter((line, index, list) => !skip.has(line) && list.indexOf(line) === index).join('\\n');
  const title = clean(document.querySelector('h1')?.innerText || document.title.replace(/\\s*\\/ X$/, ''));
  const payload = { source: 'x-article-clipboard-v1', capturedAt: new Date().toISOString(), articleUrl: location.href, title, text };
  navigator.clipboard.writeText(JSON.stringify(payload, null, 2)).then(() => alert('X Article text copied. Paste it into Hermes Workspace.'), () => prompt('Copy this X Article payload', JSON.stringify(payload, null, 2)));
})()`
  return `javascript:${encodeURIComponent(script)}`
}

export type XBookmarkTokenState = {
  accessToken?: string
  refreshToken?: string
  expiresAt?: string
  scope?: string
  userId?: string
  username?: string
  updatedAt?: string
}

export type XBookmarkRedactedTokenState = {
  hasAccessToken: boolean
  hasRefreshToken: boolean
  expiresAt: string
  scope: string
  userId: string
  username: string
  updatedAt: string
}

export type XBookmarkStatus = {
  configured: boolean
  authenticated: boolean
  mode: 'read-only'
  clientIdConfigured: boolean
  redirectUri: string
  scopes: ReadonlyArray<string>
  token: XBookmarkRedactedTokenState | null
  missing: Array<string>
  nextStep: string
}

export type XBookmarkOAuthState = {
  state: string
  codeVerifier: string
  redirectUri: string
  createdAt: string
}

export type XBookmarkRecord = {
  id: string
  url: string
  text: string
  createdAt: string
  capturedAt: string
  author: {
    id: string
    username: string
    name: string
  }
  metrics: Record<string, number>
  externalUrls: Array<string>
  media: Array<{
    mediaKey: string
    type: string
    url: string
  }>
}

type XTweet = {
  id?: string
  text?: string
  created_at?: string
  author_id?: string
  public_metrics?: Record<string, number>
  attachments?: { media_keys?: Array<string> }
  entities?: { urls?: Array<{ expanded_url?: string; url?: string }> }
}

type XUser = {
  id?: string
  username?: string
  name?: string
}

type XMedia = {
  media_key?: string
  type?: string
  url?: string
  preview_image_url?: string
}

type XBookmarksApiResponse = {
  data?: Array<XTweet>
  includes?: {
    users?: Array<XUser>
    media?: Array<XMedia>
  }
  meta?: {
    result_count?: number
    next_token?: string
  }
}

export function profileHome(): string {
  return (
    process.env.HERMES_HOME ||
    join(process.env.HOME || '/Users/hermes', '.hermes', 'profiles', 'ai-dev')
  )
}

export function xBookmarkStoreRoot(root = profileHome()): string {
  return join(root, 'workspace', 'x-bookmark-intake')
}

export function xBookmarkTokenPath(root = profileHome()): string {
  return join(xBookmarkStoreRoot(root), 'token-state.json')
}

export function xBookmarkOAuthStatePath(root = profileHome()): string {
  return join(xBookmarkStoreRoot(root), 'oauth-state.json')
}

export function xBookmarkCachePath(root = profileHome()): string {
  return join(xBookmarkStoreRoot(root), 'bookmarks-cache.json')
}

export function xArticleExtractionCachePath(root = profileHome()): string {
  return join(xBookmarkStoreRoot(root), 'x-article-extractions.json')
}

export function xArticleBrowserProfilePath(root = profileHome()): string {
  return join(xBookmarkStoreRoot(root), 'browser-profile')
}

export function xArticleBrowserRunPath(root = profileHome()): string {
  return join(xBookmarkStoreRoot(root), 'browser-extraction-run.json')
}

export function configuredClientId(): string {
  return (
    process.env.X_BOOKMARKS_CLIENT_ID ||
    process.env.X_OAUTH_CLIENT_ID ||
    ''
  ).trim()
}

export function configuredClientSecret(): string {
  return (
    process.env.X_BOOKMARKS_CLIENT_SECRET ||
    process.env.X_OAUTH_CLIENT_SECRET ||
    ''
  ).trim()
}

export function defaultRedirectUri(requestUrl?: string): string {
  if (process.env.X_BOOKMARKS_REDIRECT_URI?.trim())
    return process.env.X_BOOKMARKS_REDIRECT_URI.trim()
  if (requestUrl) {
    const url = new URL(requestUrl)
    url.pathname = '/api/x-bookmarks/callback'
    url.search = ''
    url.hash = ''
    return url.toString()
  }
  return 'http://127.0.0.1:3002/api/x-bookmarks/callback'
}

export function redactXBookmarkTokenState(
  tokenState: XBookmarkTokenState | null | undefined,
): XBookmarkRedactedTokenState | null {
  if (!tokenState) return null
  return {
    hasAccessToken: Boolean(tokenState.accessToken),
    hasRefreshToken: Boolean(tokenState.refreshToken),
    expiresAt: tokenState.expiresAt || '',
    scope: tokenState.scope || '',
    userId: tokenState.userId || '',
    username: tokenState.username || '',
    updatedAt: tokenState.updatedAt || '',
  }
}

export function createXBookmarkStatus(input: {
  clientId?: string
  redirectUri: string
  tokenState?: XBookmarkTokenState | null
}): XBookmarkStatus {
  const clientIdConfigured = Boolean(input.clientId?.trim())
  const token = redactXBookmarkTokenState(input.tokenState)
  const authenticated = Boolean(token?.hasAccessToken)
  const missing: Array<string> = []
  if (!clientIdConfigured) missing.push('X_BOOKMARKS_CLIENT_ID')
  if (!authenticated) missing.push('X OAuth authorization')

  return {
    configured: clientIdConfigured && authenticated,
    authenticated,
    mode: 'read-only',
    clientIdConfigured,
    redirectUri: input.redirectUri,
    scopes: X_BOOKMARK_SCOPES,
    token,
    missing,
    nextStep: !clientIdConfigured
      ? 'Create an X Developer app with this callback URL, then set X_BOOKMARKS_CLIENT_ID locally.'
      : authenticated
        ? 'Ready to fetch bookmarked posts read-only.'
        : 'Start OAuth authorization from Workspace and approve the read-only bookmark scopes.',
  }
}

export function buildXBookmarkAuthorizeUrl(input: {
  clientId: string
  redirectUri: string
  state: string
  codeChallenge: string
}): URL {
  const url = new URL('https://x.com/i/oauth2/authorize')
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', input.clientId)
  url.searchParams.set('redirect_uri', input.redirectUri)
  url.searchParams.set('scope', X_BOOKMARK_OAUTH_SCOPES.join(' '))
  url.searchParams.set('state', input.state)
  url.searchParams.set('code_challenge', input.codeChallenge)
  url.searchParams.set('code_challenge_method', 'S256')
  return url
}

export function createPkcePair(): { verifier: string; challenge: string } {
  const verifier = randomBytes(48).toString('base64url')
  const challenge = createHash('sha256').update(verifier).digest('base64url')
  return { verifier, challenge }
}

export function createOAuthStateValue(): string {
  return randomBytes(24).toString('base64url')
}

export async function readTokenState(
  root = profileHome(),
): Promise<XBookmarkTokenState | null> {
  try {
    const raw = await readFile(xBookmarkTokenPath(root), 'utf-8')
    return JSON.parse(raw) as XBookmarkTokenState
  } catch {
    return null
  }
}

export async function writeTokenState(
  tokenState: XBookmarkTokenState,
  root = profileHome(),
): Promise<void> {
  const path = xBookmarkTokenPath(root)
  await mkdir(dirname(path), { recursive: true, mode: 0o700 })
  await writeFile(path, `${JSON.stringify(tokenState, null, 2)}\n`, {
    mode: 0o600,
  })
}

export async function readOAuthState(
  root = profileHome(),
): Promise<XBookmarkOAuthState | null> {
  try {
    const raw = await readFile(xBookmarkOAuthStatePath(root), 'utf-8')
    return JSON.parse(raw) as XBookmarkOAuthState
  } catch {
    return null
  }
}

export async function writeOAuthState(
  oauthState: XBookmarkOAuthState,
  root = profileHome(),
): Promise<void> {
  const path = xBookmarkOAuthStatePath(root)
  await mkdir(dirname(path), { recursive: true, mode: 0o700 })
  await writeFile(path, `${JSON.stringify(oauthState, null, 2)}\n`, {
    mode: 0o600,
  })
}

export type XBookmarkCache = {
  fetchedAt: string
  nextToken: string
  items: Array<XBookmarkRecord>
}

export type XBookmarkCacheMerge = XBookmarkCache & {
  likelyNewItems: Array<XBookmarkRecord>
}

export async function writeBookmarkCache(
  input: XBookmarkCache & { root?: string },
): Promise<string> {
  const path = xBookmarkCachePath(input.root)
  await mkdir(dirname(path), { recursive: true, mode: 0o700 })
  await writeFile(
    path,
    `${JSON.stringify({ fetchedAt: input.fetchedAt, nextToken: input.nextToken, items: input.items }, null, 2)}\n`,
    { mode: 0o600 },
  )
  return path
}

export async function readBookmarkCache(
  root = profileHome(),
): Promise<XBookmarkCache | null> {
  try {
    const raw = await readFile(xBookmarkCachePath(root), 'utf-8')
    return JSON.parse(raw) as XBookmarkCache
  } catch {
    return null
  }
}

export function mergeBookmarkCache(input: {
  existing?: XBookmarkCache | null
  fetchedAt: string
  nextToken: string
  fetched: Array<XBookmarkRecord>
}): XBookmarkCacheMerge {
  const existingIds = new Set(
    (input.existing?.items || []).map((item) => item.id),
  )
  const likelyNewItems = input.fetched.filter(
    (item) => item.id && !existingIds.has(item.id),
  )
  const byId = new Map<string, XBookmarkRecord>()

  for (const item of [...input.fetched, ...(input.existing?.items || [])]) {
    if (!item.id || byId.has(item.id)) continue
    byId.set(item.id, item)
  }

  return {
    fetchedAt: input.fetchedAt,
    nextToken: input.nextToken,
    items: Array.from(byId.values()),
    likelyNewItems,
  }
}

export type XBookmarkReviewBucket =
  | 'useNow'
  | 'teach'
  | 'packageSell'
  | 'watch'
  | 'reject'

export type XArticleExtractionStatus =
  | 'pending'
  | 'extracted'
  | 'unavailable'
  | 'error'
  | 'none'

export type XArticleExtraction = {
  articleId: string
  articleUrl: string
  sourceTweetId: string
  status: Exclude<XArticleExtractionStatus, 'pending' | 'none'>
  title: string
  text: string
  excerpt: string
  extractedAt: string
  method: 'x-web-graphql' | 'manual-import' | 'logged-in-browser'
  error?: string
}

export type XArticleExtractionCache = {
  updatedAt: string
  items: Array<XArticleExtraction>
}

export type XBookmarkReviewItem = XBookmarkRecord & {
  bucket: XBookmarkReviewBucket
  claim: string
  whyItMatters: string
  recommendedAction: string
  approvalNeeded: boolean
  articleUrl: string
  articleStatus: XArticleExtractionStatus
  articleTitle: string
  articleExcerpt: string
  articleExtractedAt: string
  matchedSignals: Array<string>
}

export type XBookmarkRadarItem = {
  title: string
  why: string
  nextAction: string
  count: number
  approvalNeeded: boolean
  sourceIds: Array<string>
}

export type XBookmarkReviewDigest = {
  generatedAt: string
  total: number
  articleWrapperCount: number
  topAuthors: Array<{ username: string; count: number }>
  groups: Record<XBookmarkReviewBucket, Array<XBookmarkReviewItem>>
  radar: Array<XBookmarkRadarItem>
  articleCandidates: Array<XBookmarkReviewItem>
}

function includesAny(text: string, terms: Array<string>): boolean {
  return terms.some((term) => text.includes(term))
}

export function xArticleUrl(item: XBookmarkRecord): string {
  return item.externalUrls.find((url) => /x\.com\/i\/article\//.test(url)) || ''
}

export function xArticleIdFromUrl(articleUrl: string): string {
  return articleUrl.match(/x\.com\/i\/article\/(\d+)/)?.[1] || ''
}

function conciseClaim(
  item: XBookmarkRecord,
  extraction?: XArticleExtraction,
): string {
  if (extraction?.status === 'extracted' && extraction.title)
    return extraction.title.slice(0, 220)
  const text = item.text.replace(/\s+/g, ' ').trim()
  if (text && !/^https:\/\/t\.co\//.test(text)) return text.slice(0, 220)
  const article = xArticleUrl(item)
  return article
    ? `X Article from @${item.author.username}`
    : `Saved post from @${item.author.username}`
}

function classifyBookmark(
  item: XBookmarkRecord,
): Pick<
  XBookmarkReviewItem,
  | 'bucket'
  | 'whyItMatters'
  | 'recommendedAction'
  | 'approvalNeeded'
  | 'matchedSignals'
> {
  const text =
    `${item.text} ${item.externalUrls.join(' ')} ${item.author.username}`.toLowerCase()
  const matchedSignals: Array<string> = []

  if (
    includesAny(text, [
      'hermes',
      'dashboard',
      'workspace',
      'memory',
      'skill',
      'agent',
      'obsidian',
      'second brain',
      'capture',
    ])
  ) {
    matchedSignals.push('ai-ops')
  }
  if (
    includesAny(text, [
      'seo',
      'search',
      'ai overview',
      'google',
      'rank',
      'content gap',
      'reviews',
    ])
  ) {
    matchedSignals.push('ai-search')
  }
  if (
    includesAny(text, [
      'sell',
      'service',
      'revenue',
      'startup',
      'client',
      'agency',
      'product',
      'codex sites',
      'sites',
    ])
  ) {
    matchedSignals.push('packaging')
  }
  if (
    includesAny(text, [
      'prompt',
      'carousel',
      'podcast',
      'teach',
      'training',
      'workflow',
    ])
  ) {
    matchedSignals.push('teachable')
  }

  if (
    matchedSignals.includes('ai-search') ||
    matchedSignals.includes('packaging')
  ) {
    return {
      bucket: 'packageSell',
      whyItMatters:
        'This points toward a monetizable workflow or Travel Multiplier/consulting asset.',
      recommendedAction:
        'Convert into a one-page pilot, offer, SOP, or audit before saving more examples.',
      approvalNeeded: false,
      matchedSignals,
    }
  }

  if (matchedSignals.includes('ai-ops')) {
    return {
      bucket: 'useNow',
      whyItMatters:
        'This can improve Tim’s Hermes setup, memory quality, source capture, or agent operating system.',
      recommendedAction:
        'Turn into a local Workspace/system upgrade proposal with source link and approval gate.',
      approvalNeeded: false,
      matchedSignals,
    }
  }

  if (matchedSignals.includes('teachable')) {
    return {
      bucket: 'teach',
      whyItMatters:
        'This can become staff training, a repeatable prompt, or a reusable playbook.',
      recommendedAction:
        'Package the underlying workflow into a teachable template.',
      approvalNeeded: false,
      matchedSignals,
    }
  }

  if (/^https:\/\/t\.co\//.test(item.text.trim()) && !xArticleUrl(item)) {
    return {
      bucket: 'watch',
      whyItMatters:
        'The bookmark has too little visible text to safely act on without opening the source.',
      recommendedAction:
        'Extract the linked source before using it for decisions.',
      approvalNeeded: false,
      matchedSignals,
    }
  }

  return {
    bucket: 'watch',
    whyItMatters:
      'Potentially useful, but not enough signal for immediate action.',
    recommendedAction:
      'Keep as watch material unless it recurs in other sources.',
    approvalNeeded: false,
    matchedSignals,
  }
}

function buildRadar(
  items: Array<XBookmarkReviewItem>,
): Array<XBookmarkRadarItem> {
  const specs: Array<{
    signal: string
    title: string
    why: string
    nextAction: string
  }> = [
    {
      signal: 'ai-ops',
      title: 'Memory and context quality',
      why: 'Bookmarks repeatedly point to Hermes, memory, skills, second brain, and agent operating-system improvements.',
      nextAction:
        'Build source-backed review surfaces before adding more autonomous behavior.',
    },
    {
      signal: 'ai-search',
      title: 'AI Search and agent-facing content',
      why: 'Multiple saves point to AI search, AI Overview visibility, SEO context, and agent recommendation surfaces.',
      nextAction:
        'Pilot a one-page Travel Multiplier AI Search Readiness Audit.',
    },
    {
      signal: 'packaging',
      title: 'Packageable AI workflows',
      why: 'Saved items include services, productized workflows, Codex Sites, and client-facing systems.',
      nextAction:
        'Extract repeatable workflows into offers, SOPs, and training assets.',
    },
    {
      signal: 'teachable',
      title: 'Teach/reproduce queue',
      why: 'Several saves are prompts, carousels, podcast synthesis, and workflow templates.',
      nextAction:
        'Turn the best examples into short playbooks for Tim, staff, or future training.',
    },
  ]

  return specs
    .map((spec) => {
      const matches = items.filter((item) =>
        item.matchedSignals.includes(spec.signal),
      )
      return {
        title: spec.title,
        why: spec.why,
        nextAction: spec.nextAction,
        count: matches.length,
        approvalNeeded: false,
        sourceIds: matches.slice(0, 8).map((item) => item.id),
      }
    })
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)
}

export function createXBookmarkReviewDigest(
  records: Array<XBookmarkRecord>,
  generatedAt = new Date().toISOString(),
  articleExtractions: Array<XArticleExtraction> = [],
): XBookmarkReviewDigest {
  const groups: Record<XBookmarkReviewBucket, Array<XBookmarkReviewItem>> = {
    useNow: [],
    teach: [],
    packageSell: [],
    watch: [],
    reject: [],
  }
  const extractionByArticleId = new Map(
    articleExtractions.map((item) => [item.articleId, item]),
  )

  const reviewItems = records.map((item) => {
    const classification = classifyBookmark(item)
    const articleUrl = xArticleUrl(item)
    const articleId = xArticleIdFromUrl(articleUrl)
    const extraction = articleId
      ? extractionByArticleId.get(articleId)
      : undefined
    return {
      ...item,
      ...classification,
      claim: conciseClaim(item, extraction),
      articleUrl,
      articleStatus: articleUrl ? extraction?.status || 'pending' : 'none',
      articleTitle: extraction?.title || '',
      articleExcerpt: extraction?.excerpt || '',
      articleExtractedAt: extraction?.extractedAt || '',
    } satisfies XBookmarkReviewItem
  })

  for (const item of reviewItems) groups[item.bucket].push(item)

  const authorCounts = new Map<string, number>()
  for (const item of records)
    authorCounts.set(
      item.author.username,
      (authorCounts.get(item.author.username) || 0) + 1,
    )

  return {
    generatedAt,
    total: records.length,
    articleWrapperCount: reviewItems.filter((item) => item.articleUrl).length,
    topAuthors: Array.from(authorCounts.entries())
      .map(([username, count]) => ({ username, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12),
    groups,
    radar: buildRadar(reviewItems),
    articleCandidates: reviewItems.filter((item) => item.articleUrl),
  }
}

export async function readXArticleExtractionCache(
  root = profileHome(),
): Promise<XArticleExtractionCache | null> {
  try {
    const raw = await readFile(xArticleExtractionCachePath(root), 'utf-8')
    return JSON.parse(raw) as XArticleExtractionCache
  } catch {
    return null
  }
}

export async function writeXArticleExtractionCache(
  input: XArticleExtractionCache & { root?: string },
): Promise<string> {
  const path = xArticleExtractionCachePath(input.root)
  await mkdir(dirname(path), { recursive: true, mode: 0o700 })
  await writeFile(
    path,
    `${JSON.stringify({ updatedAt: input.updatedAt, items: input.items }, null, 2)}\n`,
    { mode: 0o600 },
  )
  return path
}

export function mergeXArticleExtractions(input: {
  existing?: XArticleExtractionCache | null
  extractedAt: string
  items: Array<XArticleExtraction>
}): XArticleExtractionCache {
  const byArticleId = new Map<string, XArticleExtraction>()
  for (const item of [...(input.existing?.items || []), ...input.items]) {
    if (!item.articleId) continue
    byArticleId.set(item.articleId, item)
  }
  return {
    updatedAt: input.extractedAt,
    items: Array.from(byArticleId.values()),
  }
}

export function draftContentStateToPlainText(contentState: unknown): string {
  if (!contentState || typeof contentState !== 'object') return ''
  const blocks = (contentState as { blocks?: Array<{ text?: unknown }> }).blocks
  if (!Array.isArray(blocks)) return ''
  return blocks
    .map((block) => (typeof block.text === 'string' ? block.text.trim() : ''))
    .filter(Boolean)
    .join('\n\n')
}

function extractionExcerpt(text: string): string {
  return text.replace(/\s+/g, ' ').trim().slice(0, 500)
}

export function isBrowserXLoginWallText(rawText: string): boolean {
  const text = rawText.replace(/\s+/g, ' ').toLowerCase()
  const loginSignals = [
    "see what's happening",
    'select an option below',
    'continue with phone',
    'continue with apple',
    'email or username',
    'by continuing, you agree to our terms of service',
  ]
  return loginSignals.filter((signal) => text.includes(signal)).length >= 2
}

export function normalizeBrowserExtractedArticleText(rawText: string): string {
  const skip = new Set([
    'Home',
    'Explore',
    'Notifications',
    'Messages',
    'Grok',
    'Bookmarks',
    'Jobs',
    'Communities',
    'Premium',
    'Verified Orgs',
    'Profile',
    'More',
    'Post',
    'Reply',
    'Repost',
    'Like',
    'Share',
    'Terms of Service',
    'Privacy Policy',
  ])
  const seen = new Set<string>()
  return rawText
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter((line) => {
      if (!line || skip.has(line) || seen.has(line)) return false
      seen.add(line)
      return true
    })
    .join('\n')
    .trim()
}

export function createBrowserXArticleExtraction(input: {
  articleUrl: string
  sourceTweetId: string
  title?: string
  text: string
  extractedAt?: string
  error?: string
}): XArticleExtraction {
  const articleId = xArticleIdFromUrl(input.articleUrl)
  const text = normalizeBrowserExtractedArticleText(input.text)
  return {
    articleId,
    articleUrl: input.articleUrl,
    sourceTweetId: input.sourceTweetId,
    status: text ? 'extracted' : 'unavailable',
    title: (input.title || '').replace(/\s+/g, ' ').trim(),
    text,
    excerpt: extractionExcerpt(text),
    extractedAt: input.extractedAt || new Date().toISOString(),
    method: 'logged-in-browser',
    error: text
      ? undefined
      : input.error ||
        'Logged-in browser extraction did not find article body text.',
  }
}

export function createManualXArticleExtraction(input: {
  articleUrl: string
  sourceTweetId: string
  title?: string
  text: string
  importedAt?: string
}): XArticleExtraction {
  const articleId = xArticleIdFromUrl(input.articleUrl)
  const text = input.text.replace(/\r\n/g, '\n').trim()
  return {
    articleId,
    articleUrl: input.articleUrl,
    sourceTweetId: input.sourceTweetId,
    status: text ? 'extracted' : 'unavailable',
    title: (input.title || '').replace(/\s+/g, ' ').trim(),
    text,
    excerpt: extractionExcerpt(text),
    extractedAt: input.importedAt || new Date().toISOString(),
    method: 'manual-import',
    error: text
      ? undefined
      : 'Manual import did not include article body text.',
  }
}

function fallbackXArticleExtraction(input: {
  articleId: string
  articleUrl: string
  sourceTweetId: string
  extractedAt: string
  status: 'unavailable' | 'error'
  error?: string
}): XArticleExtraction {
  return {
    articleId: input.articleId,
    articleUrl: input.articleUrl,
    sourceTweetId: input.sourceTweetId,
    status: input.status,
    title: '',
    text: '',
    excerpt: '',
    extractedAt: input.extractedAt,
    method: 'x-web-graphql',
    error: input.error,
  }
}

function findPublicBearerToken(scriptText: string): string {
  return scriptText.match(/Bearer ([A-Za-z0-9%._-]+)/)?.[1] || ''
}

async function fetchText(
  fetcher: typeof fetch,
  url: string,
  init?: RequestInit,
): Promise<string> {
  const response = await fetcher(url, init)
  if (!response.ok)
    throw new Error(`HTTP ${response.status} from ${new URL(url).host}`)
  return response.text()
}

async function fetchPublicBearer(fetcher: typeof fetch): Promise<string> {
  const html = await fetchText(fetcher, 'https://x.com/i/article/1', {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  const mainScript = html.match(
    /https:\/\/abs\.twimg\.com\/responsive-web\/client-web\/main\.[^"']+\.js/,
  )?.[0]
  if (!mainScript)
    throw new Error(
      'Could not locate X main script for public bearer token discovery.',
    )
  const scriptText = await fetchText(fetcher, mainScript, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  const bearer = findPublicBearerToken(scriptText)
  if (!bearer)
    throw new Error('Could not locate X public bearer token in main script.')
  return bearer
}

async function fetchGuestToken(
  fetcher: typeof fetch,
  bearer: string,
): Promise<string> {
  const endpoints = [
    'https://api.twitter.com/1.1/guest/activate.json',
    'https://api.x.com/1.1/guest/activate.json',
  ]
  let lastError = ''
  for (const endpoint of endpoints) {
    const response = await fetcher(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${bearer}`,
        'User-Agent': 'Mozilla/5.0',
      },
    })
    if (!response.ok) {
      lastError = `HTTP ${response.status} from ${new URL(endpoint).host}`
      continue
    }
    const data = (await response.json()) as { guest_token?: string }
    if (data.guest_token) return data.guest_token
    lastError = `No guest token from ${new URL(endpoint).host}`
  }
  throw new Error(`X guest token activation failed: ${lastError}`)
}

function articleFromGraphqlResult(input: {
  articleId: string
  articleUrl: string
  sourceTweetId: string
  extractedAt: string
  payload: unknown
}): XArticleExtraction | null {
  const result = (
    input.payload as {
      data?: { article_result_by_rest_id?: { result?: unknown } }
    }
  ).data?.article_result_by_rest_id?.result as
    | { title?: string; content_state?: unknown }
    | undefined
  const title = typeof result?.title === 'string' ? result.title.trim() : ''
  const text = draftContentStateToPlainText(result?.content_state)
  if (!title && !text) return null
  return {
    articleId: input.articleId,
    articleUrl: input.articleUrl,
    sourceTweetId: input.sourceTweetId,
    status: 'extracted',
    title,
    text,
    excerpt: extractionExcerpt(text),
    extractedAt: input.extractedAt,
    method: 'x-web-graphql',
  }
}

export async function fetchXArticleExtraction(input: {
  articleUrl: string
  sourceTweetId: string
  fetchedAt?: string
  fetcher?: typeof fetch
}): Promise<XArticleExtraction> {
  const articleId = xArticleIdFromUrl(input.articleUrl)
  const extractedAt = input.fetchedAt || new Date().toISOString()
  if (!articleId) {
    return fallbackXArticleExtraction({
      articleId: '',
      articleUrl: input.articleUrl,
      sourceTweetId: input.sourceTweetId,
      extractedAt,
      status: 'unavailable',
      error: 'No X Article ID found in URL.',
    })
  }

  const fetcher = input.fetcher || fetch
  try {
    const bearer = await fetchPublicBearer(fetcher)
    const guestToken = await fetchGuestToken(fetcher, bearer)
    const variables = JSON.stringify({ articleEntityId: articleId })
    const features = JSON.stringify({
      profile_label_improvements_pcf_label_in_post_enabled: true,
      responsive_web_profile_redirect_enabled: true,
      rweb_tipjar_consumption_enabled: true,
      verified_phone_label_enabled: false,
      responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
      responsive_web_graphql_timeline_navigation_enabled: true,
    })
    const url = new URL(
      'https://twitter.com/i/api/graphql/8-OHhj8-KCAHUP8XjPaAYQ/ArticleEntityResultByRestId',
    )
    url.searchParams.set('variables', variables)
    url.searchParams.set('features', features)

    const response = await fetcher(url, {
      headers: {
        Authorization: `Bearer ${bearer}`,
        'User-Agent': 'Mozilla/5.0',
        'x-guest-token': guestToken,
        'x-twitter-active': 'yes',
        'x-twitter-client-language': 'en',
      },
    })
    if (!response.ok) {
      return fallbackXArticleExtraction({
        articleId,
        articleUrl: input.articleUrl,
        sourceTweetId: input.sourceTweetId,
        extractedAt,
        status: response.status === 404 ? 'unavailable' : 'error',
        error:
          response.status === 404
            ? 'X web GraphQL did not expose this article to guest extraction. Logged-in web cookies may be required.'
            : `X Article GraphQL failed with HTTP ${response.status}`,
      })
    }
    const payload = await response.json()
    return (
      articleFromGraphqlResult({
        articleId,
        articleUrl: input.articleUrl,
        sourceTweetId: input.sourceTweetId,
        extractedAt,
        payload,
      }) ||
      fallbackXArticleExtraction({
        articleId,
        articleUrl: input.articleUrl,
        sourceTweetId: input.sourceTweetId,
        extractedAt,
        status: 'unavailable',
        error:
          'X returned no article body. The article may require logged-in web cookies or may be unavailable.',
      })
    )
  } catch (err) {
    return fallbackXArticleExtraction({
      articleId,
      articleUrl: input.articleUrl,
      sourceTweetId: input.sourceTweetId,
      extractedAt,
      status: 'error',
      error:
        err instanceof Error
          ? err.message
          : 'Unknown X Article extraction error.',
    })
  }
}

export function normalizeXBookmarkTweets(
  response: XBookmarksApiResponse,
  capturedAt: string,
): {
  items: Array<XBookmarkRecord>
  nextToken: string
} {
  const usersById = new Map(
    (response.includes?.users || []).map((user) => [user.id || '', user]),
  )
  const mediaByKey = new Map(
    (response.includes?.media || []).map((media) => [
      media.media_key || '',
      media,
    ]),
  )

  const items = (response.data || [])
    .filter((tweet) => Boolean(tweet.id))
    .map((tweet) => {
      const author = usersById.get(tweet.author_id || '')
      const username = author?.username || 'unknown'
      const media = (tweet.attachments?.media_keys || [])
        .map((key) => mediaByKey.get(key))
        .filter((item): item is XMedia => Boolean(item))
        .map((item) => ({
          mediaKey: item.media_key || '',
          type: item.type || '',
          url: item.url || item.preview_image_url || '',
        }))

      return {
        id: tweet.id || '',
        url: `https://x.com/${username}/status/${tweet.id}`,
        text: tweet.text || '',
        createdAt: tweet.created_at || '',
        capturedAt,
        author: {
          id: author?.id || tweet.author_id || '',
          username,
          name: author?.name || '',
        },
        metrics: tweet.public_metrics || {},
        externalUrls: (tweet.entities?.urls || [])
          .map((item) => item.expanded_url || item.url || '')
          .filter(Boolean),
        media,
      }
    })

  return { items, nextToken: response.meta?.next_token || '' }
}

export async function exchangeCodeForToken(input: {
  clientId: string
  clientSecret?: string
  code: string
  codeVerifier: string
  redirectUri: string
  now?: string
}): Promise<XBookmarkTokenState> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  if (input.clientSecret) {
    headers.Authorization = `Basic ${Buffer.from(`${input.clientId}:${input.clientSecret}`).toString('base64')}`
  }

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: input.code,
    redirect_uri: input.redirectUri,
    code_verifier: input.codeVerifier,
    client_id: input.clientId,
  })

  const response = await fetch('https://api.twitter.com/2/oauth2/token', {
    method: 'POST',
    headers,
    body,
  })
  const data = (await response.json()) as {
    access_token?: string
    refresh_token?: string
    expires_in?: number
    scope?: string
    error?: string
    error_description?: string
  }

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.error_description ||
        data.error ||
        `X token exchange failed with HTTP ${response.status}`,
    )
  }

  const nowMs = input.now ? Date.parse(input.now) : Date.now()
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || '',
    expiresAt: data.expires_in
      ? new Date(nowMs + data.expires_in * 1000).toISOString()
      : '',
    scope: data.scope || '',
    updatedAt: new Date(nowMs).toISOString(),
  }
}

export async function fetchAuthenticatedUser(
  accessToken: string,
): Promise<{ userId: string; username: string }> {
  const response = await fetch(
    'https://api.twitter.com/2/users/me?user.fields=username',
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  )
  const data = (await response.json()) as {
    data?: { id?: string; username?: string }
    error?: string
  }
  if (!response.ok)
    throw new Error(
      data.error || `X user lookup failed with HTTP ${response.status}`,
    )
  return { userId: data.data?.id || '', username: data.data?.username || '' }
}

export async function fetchXBookmarks(input: {
  userId: string
  accessToken: string
  maxResults?: number
  paginationToken?: string
}): Promise<XBookmarksApiResponse> {
  const url = new URL(
    `https://api.twitter.com/2/users/${input.userId}/bookmarks`,
  )
  url.searchParams.set('max_results', String(input.maxResults || 10))
  url.searchParams.set(
    'tweet.fields',
    'attachments,author_id,created_at,entities,public_metrics',
  )
  url.searchParams.set('expansions', 'author_id,attachments.media_keys')
  url.searchParams.set('user.fields', 'name,username')
  url.searchParams.set('media.fields', 'type,url,preview_image_url')
  if (input.paginationToken)
    url.searchParams.set('pagination_token', input.paginationToken)

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${input.accessToken}` },
  })
  const data = (await response.json()) as XBookmarksApiResponse & {
    error?: string
    detail?: string
    title?: string
  }
  if (!response.ok)
    throw new Error(
      data.detail ||
        data.title ||
        data.error ||
        `X bookmarks fetch failed with HTTP ${response.status}`,
    )
  return data
}
