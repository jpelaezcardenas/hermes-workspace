import { describe, expect, it } from 'vitest'

import { rewriteLocalMediaSources } from './markdown'

describe('rewriteLocalMediaSources', () => {
  it('rewrites markdown image MEDIA tokens that point to local files', () => {
    expect(
      rewriteLocalMediaSources('![cat](MEDIA:/root/.hermes/tmp/cat.png)'),
    ).toBe('![cat](/api/media?path=%2Froot%2F.hermes%2Ftmp%2Fcat.png)')
  })

  it('rewrites html image MEDIA tokens that point to local files', () => {
    expect(
      rewriteLocalMediaSources(
        '<img src="MEDIA:/root/.hermes/tmp/cat.png" alt="cat" />',
      ),
    ).toBe(
      '<img src="/api/media?path=%2Froot%2F.hermes%2Ftmp%2Fcat.png" alt="cat" />',
    )
  })

  it('leaves remote MEDIA URLs untouched', () => {
    expect(
      rewriteLocalMediaSources('![cat](MEDIA:https://example.com/cat.png)'),
    ).toBe('![cat](MEDIA:https://example.com/cat.png)')
  })

  it('handles multiple MEDIA tokens in one message', () => {
    const input =
      'Here is one: ![a](MEDIA:/tmp/a.png) and two: ![b](MEDIA:/tmp/b.png)'
    const result = rewriteLocalMediaSources(input)
    expect(result).toContain('/api/media?path=%2Ftmp%2Fa.png')
    expect(result).toContain('/api/media?path=%2Ftmp%2Fb.png')
  })

  it('handles MEDIA tokens with home directory paths', () => {
    expect(
      rewriteLocalMediaSources(
        '![img](MEDIA:/Users/test/.hermes/audio_cache/voice-memo-123.mp3)',
      ),
    ).toBe(
      '![img](/api/media?path=%2FUsers%2Ftest%2F.hermes%2Faudio_cache%2Fvoice-memo-123.mp3)',
    )
  })

  it('passes through content without MEDIA tokens unchanged', () => {
    const plain = 'Hello world, no images here.'
    expect(rewriteLocalMediaSources(plain)).toBe(plain)
  })
})
