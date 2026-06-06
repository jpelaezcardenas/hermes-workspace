import { describe, expect, it } from 'vitest'

import {
  X_BOOKMARK_SCOPES,
  buildXArticleCaptureBookmarklet,
  buildXBookmarkAuthorizeUrl,
  createBrowserXArticleExtraction,
  createManualXArticleExtraction,
  createXBookmarkReviewDigest,
  createXBookmarkStatus,
  draftContentStateToPlainText,
  fetchXArticleExtraction,
  isBrowserXLoginWallText,
  mergeBookmarkCache,
  normalizeBrowserExtractedArticleText,
  normalizeXBookmarkTweets,
  redactXBookmarkTokenState,
  xArticleBrowserProfilePath,
} from './-x-bookmarks-utils'

describe('X Bookmark Intake utilities', () => {
  it('builds a safe X Article capture bookmarklet for logged-in browser extraction', () => {
    const bookmarklet = buildXArticleCaptureBookmarklet()

    expect(bookmarklet.startsWith('javascript:')).toBe(true)
    expect(decodeURIComponent(bookmarklet)).toContain(
      'navigator.clipboard.writeText',
    )
    expect(decodeURIComponent(bookmarklet)).toContain('x-article-clipboard-v1')
    expect(decodeURIComponent(bookmarklet)).toContain('document.body.innerText')
    expect(bookmarklet).not.toContain('cookie')
    expect(bookmarklet).not.toContain('localStorage')
    expect(bookmarklet).not.toContain('token')
  })

  it('reports read-only setup state without exposing secrets', () => {
    const status = createXBookmarkStatus({
      clientId: 'client-123',
      redirectUri: 'http://127.0.0.1:3002/api/x-bookmarks/callback',
      tokenState: {
        accessToken: 'secret-access-token',
        refreshToken: 'secret-refresh-token',
        expiresAt: '2026-06-05T00:00:00.000Z',
        scope: 'bookmark.read tweet.read users.read',
        userId: '12345',
        username: 'tim',
        updatedAt: '2026-06-04T20:00:00.000Z',
      },
    })

    expect(status.configured).toBe(true)
    expect(status.authenticated).toBe(true)
    expect(status.mode).toBe('read-only')
    expect(status.scopes).toEqual(X_BOOKMARK_SCOPES)
    expect(JSON.stringify(status)).not.toContain('secret-access-token')
    expect(JSON.stringify(status)).not.toContain('secret-refresh-token')
    expect(status.token).toEqual({
      hasAccessToken: true,
      hasRefreshToken: true,
      expiresAt: '2026-06-05T00:00:00.000Z',
      scope: 'bookmark.read tweet.read users.read',
      userId: '12345',
      username: 'tim',
      updatedAt: '2026-06-04T20:00:00.000Z',
    })
  })

  it('builds the X OAuth authorize URL with PKCE and read-only bookmark scopes', () => {
    const url = buildXBookmarkAuthorizeUrl({
      clientId: 'client-123',
      redirectUri: 'http://127.0.0.1:3002/api/x-bookmarks/callback',
      state: 'state-abc',
      codeChallenge: 'challenge-xyz',
    })

    expect(url.origin).toBe('https://x.com')
    expect(url.pathname).toBe('/i/oauth2/authorize')
    expect(url.searchParams.get('response_type')).toBe('code')
    expect(url.searchParams.get('client_id')).toBe('client-123')
    expect(url.searchParams.get('redirect_uri')).toBe(
      'http://127.0.0.1:3002/api/x-bookmarks/callback',
    )
    expect(url.searchParams.get('state')).toBe('state-abc')
    expect(url.searchParams.get('code_challenge')).toBe('challenge-xyz')
    expect(url.searchParams.get('code_challenge_method')).toBe('S256')
    expect(url.searchParams.get('scope')).toBe(
      'bookmark.read tweet.read users.read offline.access',
    )
  })

  it('normalizes bookmark tweets into safe local cache records', () => {
    const records = normalizeXBookmarkTweets(
      {
        data: [
          {
            id: '111',
            text: 'AI agents are becoming product surfaces',
            created_at: '2026-06-04T19:00:00.000Z',
            author_id: '42',
            public_metrics: { like_count: 10, retweet_count: 2 },
            attachments: { media_keys: ['media-1'] },
            entities: { urls: [{ expanded_url: 'https://example.com/post' }] },
          },
        ],
        includes: {
          users: [{ id: '42', username: 'builder', name: 'Builder' }],
          media: [
            {
              media_key: 'media-1',
              type: 'video',
              url: 'https://video.example/file.mp4',
            },
          ],
        },
        meta: { result_count: 1, next_token: 'next-page' },
      },
      '2026-06-04T20:00:00.000Z',
    )

    expect(records.nextToken).toBe('next-page')
    expect(records.items).toEqual([
      {
        id: '111',
        url: 'https://x.com/builder/status/111',
        text: 'AI agents are becoming product surfaces',
        createdAt: '2026-06-04T19:00:00.000Z',
        capturedAt: '2026-06-04T20:00:00.000Z',
        author: { id: '42', username: 'builder', name: 'Builder' },
        metrics: { like_count: 10, retweet_count: 2 },
        externalUrls: ['https://example.com/post'],
        media: [
          {
            mediaKey: 'media-1',
            type: 'video',
            url: 'https://video.example/file.mp4',
          },
        ],
      },
    ])
  })

  it('merges fetched bookmark pages with existing cache, dedupes, and identifies likely-new bookmarks', () => {
    const existing = {
      fetchedAt: '2026-06-04T13:00:00.000Z',
      nextToken: 'old-next',
      items: [
        {
          id: 'old-1',
          url: 'https://x.com/builder/status/old-1',
          text: 'Already cached',
          createdAt: '2026-06-04T12:00:00.000Z',
          capturedAt: '2026-06-04T13:00:00.000Z',
          author: { id: '42', username: 'builder', name: 'Builder' },
          metrics: {},
          externalUrls: [],
          media: [],
        },
      ],
    }
    const fetched = [
      {
        id: 'new-1',
        url: 'https://x.com/builder/status/new-1',
        text: 'New cached bookmark',
        createdAt: '2026-06-04T14:00:00.000Z',
        capturedAt: '2026-06-04T15:00:00.000Z',
        author: { id: '42', username: 'builder', name: 'Builder' },
        metrics: {},
        externalUrls: [],
        media: [],
      },
      {
        id: 'old-1',
        url: 'https://x.com/builder/status/old-1',
        text: 'Already cached with fresher capture',
        createdAt: '2026-06-04T12:00:00.000Z',
        capturedAt: '2026-06-04T15:00:00.000Z',
        author: { id: '42', username: 'builder', name: 'Builder' },
        metrics: { like_count: 1 },
        externalUrls: [],
        media: [],
      },
    ]

    const merged = mergeBookmarkCache({
      existing,
      fetchedAt: '2026-06-04T15:00:00.000Z',
      nextToken: 'new-next',
      fetched,
    })

    expect(merged.nextToken).toBe('new-next')
    expect(merged.items.map((item) => item.id)).toEqual(['new-1', 'old-1'])
    expect(merged.likelyNewItems.map((item) => item.id)).toEqual(['new-1'])
    expect(merged.items.find((item) => item.id === 'old-1')?.text).toBe(
      'Already cached with fresher capture',
    )
  })

  it('builds an actionable AI review digest from cached bookmarks', () => {
    const digest = createXBookmarkReviewDigest([
      {
        id: 'memory-1',
        url: 'https://x.com/OpenAI/status/memory-1',
        text: 'ChatGPT memory now lets you review and steer what it remembers across conversations.',
        createdAt: '2026-06-04T16:00:00.000Z',
        capturedAt: '2026-06-04T21:00:00.000Z',
        author: { id: '1', username: 'OpenAI', name: 'OpenAI' },
        metrics: { bookmark_count: 1000 },
        externalUrls: ['https://openai.com/index/chatgpt-memory-dreaming/'],
        media: [],
      },
      {
        id: 'seo-1',
        url: 'https://x.com/timsoulo/status/seo-1',
        text: 'AI search optimization studies show best X listicles are cited by AI chatbots.',
        createdAt: '2026-06-04T16:00:00.000Z',
        capturedAt: '2026-06-04T21:00:00.000Z',
        author: { id: '2', username: 'timsoulo', name: 'Tim Soulo' },
        metrics: { bookmark_count: 6000 },
        externalUrls: [],
        media: [],
      },
      {
        id: 'article-1',
        url: 'https://x.com/dickiebush/status/article-1',
        text: 'https://t.co/example',
        createdAt: '2026-06-04T16:00:00.000Z',
        capturedAt: '2026-06-04T21:00:00.000Z',
        author: { id: '3', username: 'dickiebush', name: 'Dickie Bush' },
        metrics: { bookmark_count: 371 },
        externalUrls: ['http://x.com/i/article/2062493314012889088'],
        media: [],
      },
    ])

    expect(digest.total).toBe(3)
    expect(digest.articleWrapperCount).toBe(1)
    expect(digest.groups.useNow.some((item) => item.id === 'memory-1')).toBe(
      true,
    )
    expect(digest.groups.packageSell.some((item) => item.id === 'seo-1')).toBe(
      true,
    )
    expect(digest.articleCandidates[0]).toMatchObject({
      id: 'article-1',
      articleStatus: 'pending',
    })
    expect(
      digest.radar.some((item) => item.title === 'Memory and context quality'),
    ).toBe(true)
  })

  it('uses extracted X Article text in the review digest when available', () => {
    const digest = createXBookmarkReviewDigest(
      [
        {
          id: 'article-1',
          url: 'https://x.com/dickiebush/status/article-1',
          text: 'https://t.co/example',
          createdAt: '2026-06-04T16:00:00.000Z',
          capturedAt: '2026-06-04T21:00:00.000Z',
          author: { id: '3', username: 'dickiebush', name: 'Dickie Bush' },
          metrics: { bookmark_count: 371 },
          externalUrls: ['http://x.com/i/article/2062493314012889088'],
          media: [],
        },
      ],
      '2026-06-04T22:00:00.000Z',
      [
        {
          articleId: '2062493314012889088',
          articleUrl: 'http://x.com/i/article/2062493314012889088',
          sourceTweetId: 'article-1',
          status: 'extracted',
          title: 'How to build better AI workflows',
          text: 'Long article body about agents and systems.',
          excerpt: 'Long article body about agents and systems.',
          extractedAt: '2026-06-04T22:00:00.000Z',
          method: 'x-web-graphql',
        },
      ],
    )

    expect(digest.articleCandidates[0]).toMatchObject({
      id: 'article-1',
      articleStatus: 'extracted',
      articleTitle: 'How to build better AI workflows',
      articleExcerpt: 'Long article body about agents and systems.',
      claim: 'How to build better AI workflows',
    })
  })

  it('creates manual X Article imports without storing browser cookies or tokens', () => {
    const extraction = createManualXArticleExtraction({
      articleUrl: 'https://x.com/i/article/2062493314012889088',
      sourceTweetId: 'article-1',
      title: ' Manual fallback title ',
      text: ' First paragraph from a logged-in browser copy.\r\n\r\nSecond paragraph with enough context to classify. ',
      importedAt: '2026-06-04T23:00:00.000Z',
    })

    expect(extraction).toMatchObject({
      articleId: '2062493314012889088',
      sourceTweetId: 'article-1',
      status: 'extracted',
      title: 'Manual fallback title',
      text: 'First paragraph from a logged-in browser copy.\n\nSecond paragraph with enough context to classify.',
      excerpt:
        'First paragraph from a logged-in browser copy. Second paragraph with enough context to classify.',
      method: 'manual-import',
    })
    expect(JSON.stringify(extraction)).not.toContain('cookie')
    expect(JSON.stringify(extraction)).not.toContain('token')
  })

  it('normalizes logged-in browser article text without X navigation chrome', () => {
    const text = normalizeBrowserExtractedArticleText(`
Home
Explore
Notifications
Useful AI Article
By Builder
First paragraph about agent workflows.
Like
Share
First paragraph about agent workflows.
Second paragraph with implementation details.
Privacy Policy
`)

    expect(text).toBe(
      'Useful AI Article\nBy Builder\nFirst paragraph about agent workflows.\nSecond paragraph with implementation details.',
    )
  })

  it('detects X login walls so autonomous runs do not save sign-in pages as articles', () => {
    expect(
      isBrowserXLoginWallText(
        "See what's happening\nSelect an option below:\nContinue with phone\nContinue with Apple\nor\nEmail or username\nBy continuing, you agree to our Terms of Service",
      ),
    ).toBe(true)
    expect(
      isBrowserXLoginWallText(
        'Useful Article Title\nFirst paragraph with real body text.\nSecond paragraph.',
      ),
    ).toBe(false)
  })

  it('creates autonomous browser X Article extractions as local text-only records', () => {
    const extraction = createBrowserXArticleExtraction({
      articleUrl: 'https://x.com/i/article/2062493314012889088',
      sourceTweetId: 'article-1',
      title: ' Browser extracted title ',
      text: ' First paragraph from the logged-in browser.\nSecond paragraph from the DOM. ',
      extractedAt: '2026-06-05T00:00:00.000Z',
    })

    expect(extraction).toMatchObject({
      articleId: '2062493314012889088',
      sourceTweetId: 'article-1',
      status: 'extracted',
      title: 'Browser extracted title',
      text: 'First paragraph from the logged-in browser.\nSecond paragraph from the DOM.',
      method: 'logged-in-browser',
    })
    expect(JSON.stringify(extraction)).not.toContain('cookie')
    expect(JSON.stringify(extraction)).not.toContain('token')
  })

  it('keeps the autonomous browser profile inside the local X bookmark store', () => {
    expect(xArticleBrowserProfilePath('/profile-root')).toBe(
      '/profile-root/workspace/x-bookmark-intake/browser-profile',
    )
  })

  it('converts X Article Draft.js content blocks to readable text', () => {
    expect(
      draftContentStateToPlainText({
        blocks: [
          { text: 'First paragraph.' },
          { text: '' },
          { text: 'Second paragraph.' },
        ],
      }),
    ).toBe('First paragraph.\n\nSecond paragraph.')
  })

  it('extracts an X Article body through the web GraphQL flow without exposing tokens', async () => {
    const calls: Array<string> = []
    const fetcher = async (input: RequestInfo | URL) => {
      await Promise.resolve()
      const url = String(input)
      calls.push(url)
      if (url === 'https://x.com/i/article/1') {
        return new Response(
          '<script src="https://abs.twimg.com/responsive-web/client-web/main.abc123.js"></script>',
        )
      }
      if (
        url === 'https://abs.twimg.com/responsive-web/client-web/main.abc123.js'
      ) {
        return new Response('const token = "Bearer PUBLIC_TOKEN"')
      }
      if (url === 'https://api.twitter.com/1.1/guest/activate.json') {
        return new Response(JSON.stringify({ guest_token: 'guest-token' }), {
          headers: { 'content-type': 'application/json' },
        })
      }
      if (
        url.startsWith(
          'https://twitter.com/i/api/graphql/8-OHhj8-KCAHUP8XjPaAYQ/ArticleEntityResultByRestId',
        )
      ) {
        return new Response(
          JSON.stringify({
            data: {
              article_result_by_rest_id: {
                result: {
                  title: 'Useful X Article',
                  content_state: {
                    blocks: [
                      { text: 'Paragraph one.' },
                      { text: 'Paragraph two.' },
                    ],
                  },
                },
              },
            },
          }),
          { headers: { 'content-type': 'application/json' } },
        )
      }
      return new Response('not found', { status: 404 })
    }

    const extraction = await fetchXArticleExtraction({
      articleUrl: 'https://x.com/i/article/2062493314012889088',
      sourceTweetId: 'tweet-1',
      fetchedAt: '2026-06-04T22:00:00.000Z',
      fetcher: fetcher as typeof fetch,
    })

    expect(extraction).toMatchObject({
      articleId: '2062493314012889088',
      status: 'extracted',
      title: 'Useful X Article',
      text: 'Paragraph one.\n\nParagraph two.',
      excerpt: 'Paragraph one. Paragraph two.',
    })
    expect(
      calls.some((url) => url.includes('ArticleEntityResultByRestId')),
    ).toBe(true)
    expect(JSON.stringify(extraction)).not.toContain('PUBLIC_TOKEN')
    expect(JSON.stringify(extraction)).not.toContain('guest-token')
  })

  it('redacts persisted OAuth token state for API responses', () => {
    expect(
      redactXBookmarkTokenState({
        accessToken: 'access',
        refreshToken: 'refresh',
        expiresAt: '2026-06-05T00:00:00.000Z',
        updatedAt: '2026-06-04T20:00:00.000Z',
      }),
    ).toEqual({
      hasAccessToken: true,
      hasRefreshToken: true,
      expiresAt: '2026-06-05T00:00:00.000Z',
      scope: '',
      userId: '',
      username: '',
      updatedAt: '2026-06-04T20:00:00.000Z',
    })
  })
})
