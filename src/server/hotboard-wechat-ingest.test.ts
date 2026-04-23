import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { EventEmitter } from 'node:events'
import { PassThrough } from 'node:stream'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createWechatStore } from './hotboard-wechat-store'
import {
  WechatFetchError,
  WechatFetchTimeoutError,
  fetchWechatArticle,
  ingestWechatUrl,
} from './hotboard-wechat-ingest'

type MockChildProcess = EventEmitter & {
  stdout: PassThrough
  stderr: PassThrough
  kill: ReturnType<typeof vi.fn>
}

const tempDirs: string[] = []

afterEach(() => {
  vi.useRealTimers()

  while (tempDirs.length > 0) {
    const dir = tempDirs.pop()
    if (dir) {
      fs.rmSync(dir, { recursive: true, force: true })
    }
  }
})

function createTempDir(prefix: string) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), prefix))
  tempDirs.push(tempDir)
  return tempDir
}

function createMockChildProcess(): MockChildProcess {
  const child = new EventEmitter() as MockChildProcess
  child.stdout = new PassThrough()
  child.stderr = new PassThrough()
  child.kill = vi.fn(() => true)
  return child
}

describe('hotboard wechat ingest', () => {
  it('fetchWechatArticle shells out to opencli, parses json output, and resolves markdown path', async () => {
    const outputDir = createTempDir('hotboard-wechat-fetch-')
    const markdownPath = path.join(outputDir, 'article.md')
    fs.writeFileSync(markdownPath, '# Title', 'utf-8')

    const child = createMockChildProcess()
    const spawnMock = vi.fn(() => child as never)

    const promise = fetchWechatArticle('https://mp.weixin.qq.com/s/article-a', outputDir, {
      spawnImpl: spawnMock,
      timeoutMs: 1_000,
    })

    child.stdout.write(
      JSON.stringify([
        {
          title: '测试文章',
          author: '机器之心',
          publish_time: '2026年4月23日 23:56',
          status: 'success',
          size: 2048,
        },
      ]),
    )
    child.emit('close', 0)

    const result = await promise

    expect(spawnMock).toHaveBeenCalledTimes(1)
    expect(spawnMock.mock.calls[0]?.[1]).toEqual([
      'weixin',
      'download',
      '--url',
      'https://mp.weixin.qq.com/s/article-a',
      '--output',
      outputDir,
      '--download-images',
      'false',
      '--format',
      'json',
    ])
    expect(result).toEqual({
      title: '测试文章',
      author: '机器之心',
      publish_time: '2026年4月23日 23:56',
      status: 'success',
      size: 2048,
      markdownPath,
    })
  })

  it('fetchWechatArticle rejects with timeout and terminates the child process', async () => {
    vi.useFakeTimers()

    const outputDir = createTempDir('hotboard-wechat-timeout-')
    const child = createMockChildProcess()

    const promise = fetchWechatArticle('https://mp.weixin.qq.com/s/article-timeout', outputDir, {
      spawnImpl: vi.fn(() => child as never),
      timeoutMs: 25,
    }).catch((error) => error)

    await vi.advanceTimersByTimeAsync(25)

    const error = await promise
    expect(error).toBeInstanceOf(WechatFetchTimeoutError)
    expect(child.kill).toHaveBeenCalledWith('SIGTERM')
  })

  it('fetchWechatArticle surfaces non-zero exit code and stderr', async () => {
    const outputDir = createTempDir('hotboard-wechat-error-')
    const child = createMockChildProcess()

    const promise = fetchWechatArticle('https://mp.weixin.qq.com/s/article-error', outputDir, {
      spawnImpl: vi.fn(() => child as never),
      timeoutMs: 1_000,
    })

    child.stderr.write('cookie expired')
    child.emit('close', 1)

    await expect(promise).rejects.toMatchObject({
      name: 'WechatFetchError',
      message: expect.stringContaining('cookie expired'),
    })
  })

  it('ingestWechatUrl converts publish_time, strips frontmatter, and upserts the article record', async () => {
    const tempDir = createTempDir('hotboard-wechat-ingest-')
    const markdownPath = path.join(tempDir, 'fetched.md')
    fs.writeFileSync(
      markdownPath,
      [
        '---',
        'title: 测试文章',
        'source: opencli',
        '---',
        '',
        '这是正文第一段。',
        '',
        '这是正文第二段，用来验证 excerpt 会去掉 frontmatter 后再截取。',
      ].join('\n'),
      'utf-8',
    )

    const store = createWechatStore({ dbPath: path.join(tempDir, 'wechat.sqlite') })
    const fetchArticleImpl = vi.fn(async (_url: string, outputDir: string) => {
      expect(outputDir).toMatch(/hotboard-wechat\/[0-9a-f]{16}$/)
      return {
        title: '测试文章',
        author: '机器之心',
        publish_time: '2026年4月23日 23:56',
        status: 'success',
        size: 4096,
        markdownPath,
      }
    })

    const record = await ingestWechatUrl(
      'https://mp.weixin.qq.com/s/example-article?foo=1',
      'owner-jc',
      {
        fetchArticleImpl,
        outputRoot: path.join(tempDir, 'hotboard-wechat'),
        store,
        fetchedAt: '2026-04-24T02:30:00.000Z',
      },
    )

    expect(fetchArticleImpl).toHaveBeenCalledWith(
      'https://mp.weixin.qq.com/s/example-article',
      expect.stringMatching(/hotboard-wechat\/[0-9a-f]{16}$/),
    )
    expect(record.publish_time).toBe('2026-04-23T15:56:00.000Z')
    expect(record.excerpt).toBe(
      '这是正文第一段。 这是正文第二段，用来验证 excerpt 会去掉 frontmatter 后再截取。',
    )
    expect(record.fetched_by_user_id).toBe('owner-jc')
    expect(store.getArticleByUrl('https://mp.weixin.qq.com/s/example-article?bar=2')?.id).toBe(
      record.id,
    )
  })
})
