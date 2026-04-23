import { toSupportedHotboardSource } from './ai-hotboard-feed-adapter'

export type SourcePageKey =
  | 'source-x-bookmarks'
  | 'source-x-likes'
  | 'source-x-following'
  | 'source-x-for_you'
  | 'source-wechat'
  | 'source-jc-human-talks'
  | 'source-xiaohongshu'

export type AiHotboardPage =
  | 'featured'
  | 'view-all'
  | 'view-low-follower'
  | 'view-bookmarks'
  | SourcePageKey
  | 'intake-hermes'
  | 'intake-xiaoj'
  | 'strategy-line'
  | 'iteration'
  | 'system'
  | 'user'
  | 'logout'

export function normalizeHotboardPage(page?: AiHotboardPage): AiHotboardPage {
  return page ?? 'featured'
}

export function resolveHotboardPageFromSource(source: string): AiHotboardPage {
  if (source === 'x-bookmarks') return 'source-x-bookmarks'
  if (source === 'x-likes') return 'source-x-likes'
  if (source === 'x-following') return 'source-x-following'
  if (source === 'x-for_you') return 'source-x-for_you'
  if (source === 'wechat') return 'source-wechat'
  if (source === 'jc-human-talks') return 'source-jc-human-talks'
  if (source === 'xiaohongshu') return 'source-xiaohongshu'
  return 'featured'
}

export function resolveSourceByHotboardPage(page: AiHotboardPage, fallbackSource: string) {
  if (page === 'source-x-bookmarks') return 'x-bookmarks'
  if (page === 'source-x-likes') return 'x-likes'
  if (page === 'source-x-following') return 'x-following'
  if (page === 'source-x-for_you') return 'x-for_you'
  if (page === 'source-wechat') return 'wechat'

  if (
    page === 'source-jc-human-talks' ||
    page === 'source-xiaohongshu' ||
    page === 'featured' ||
    page === 'view-all' ||
    page === 'view-low-follower' ||
    page === 'view-bookmarks' ||
    page === 'iteration' ||
    page === 'system' ||
    page === 'user' ||
    page === 'logout' ||
    page === 'intake-hermes' ||
    page === 'intake-xiaoj' ||
    page === 'strategy-line'
  ) {
    return 'all'
  }

  return toSupportedHotboardSource(fallbackSource)
}
