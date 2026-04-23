import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { createSessionStore, storeSessionToken } from './auth-middleware'
import { createWechatStore } from './hotboard-wechat-store'
import { handleHotboardWechatFeedGet } from '../routes/api/hotboard/wechat/feed'

const tempDirs: string[] = []
const originalAuthDbPath = process.env.HERMES_AUTH_DB_PATH
const originalWechatDbPath = process.env.HERMES_HOTBOARD_WECHAT_DB_PATH

afterEach(() => {
  if (originalAuthDbPath === undefined) {
    delete process.env.HERMES_AUTH_DB_PATH
  } else {
    process.env.HERMES_AUTH_DB_PATH = originalAuthDbPath
  }

  if (originalWechatDbPath === undefined) {
    delete process.env.HERMES_HOTBOARD_WECHAT_DB_PATH
  } else {
    process.env.HERMES_HOTBOARD_WECHAT_DB_PATH = originalWechatDbPath
  }

  while (tempDirs.length > 0) {
    const dir = tempDirs.pop()
    if (dir) {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  }
})

function setupTempStores() {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hotboard-wechat-feed-'))
  tempDirs.push(tempDir)
  process.env.HERMES_AUTH_DB_PATH = path.join(tempDir, 'auth.sqlite')
  process.env.HERMES_HOTBOARD_WECHAT_DB_PATH = path.join(tempDir, 'wechat.sqlite')

  const authStore = createSessionStore()
  authStore.upsertUser({
    feishuOpenId: 'ou_feed_owner',
    feishuUnionId: 'union-feed-owner',
    displayName: 'JC',
    role: 'owner',
  })
  storeSessionToken('session-feed-owner', {
    userId: 'ou_feed_owner',
    ttlSeconds: 7 * 24 * 60 * 60,
  })

  const wechatStore = createWechatStore()
  wechatStore.upsertArticle({
    id: 'wechat-2',
    url: 'https://mp.weixin.qq.com/s/article-2',
    title: '第二篇',
    author: 'Author 2',
    publish_time: '2026-04-24T10:00:00.000Z',
    size_bytes: 200,
    markdown_path: '/tmp/article-2.md',
    excerpt: '第二篇摘要',
    fetched_at: '2026-04-24T10:30:00.000Z',
    fetched_by_user_id: 'ou_feed_owner',
  })
  wechatStore.upsertArticle({
    id: 'wechat-1',
    url: 'https://mp.weixin.qq.com/s/article-1',
    title: '第一篇',
    author: 'Author 1',
    publish_time: '2026-04-23T10:00:00.000Z',
    size_bytes: 100,
    markdown_path: '/tmp/article-1.md',
    excerpt: '第一篇摘要',
    fetched_at: '2026-04-23T10:30:00.000Z',
    fetched_by_user_id: 'ou_feed_owner',
  })
}

function makeRequest(limit = '50', withAuth = true) {
  const headers = new Headers({
    'x-forwarded-for': '127.0.0.1',
  })

  if (withAuth) {
    headers.set('cookie', 'hermes-auth=session-feed-owner')
  }

  return new Request(`http://localhost/api/hotboard/wechat/feed?limit=${limit}`, {
    headers,
  })
}

describe('hotboard wechat feed api handler', () => {
  it('returns recent wechat articles for authenticated users', async () => {
    setupTempStores()

    const response = await handleHotboardWechatFeedGet(makeRequest('1'))
    expect(response.status).toBe(200)

    const payload = (await response.json()) as {
      items: Array<{ id: string; title: string }>
    }

    expect(payload.items).toHaveLength(1)
    expect(payload.items[0]).toMatchObject({
      id: 'wechat-2',
      title: '第二篇',
    })
  })

  it('rejects unauthenticated requests', async () => {
    setupTempStores()

    const response = await handleHotboardWechatFeedGet(makeRequest('50', false))
    expect(response.status).toBe(401)
  })

  it('rejects invalid limit query', async () => {
    setupTempStores()

    const response = await handleHotboardWechatFeedGet(makeRequest('0'))
    expect(response.status).toBe(400)
  })
})
