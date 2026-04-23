export type ZaraYoutubeItem = {
  videoId: string
  url: string
  title: string
  channel?: string
  tags: string[]
  description?: string
  thumbnailUrl?: string
  firstSeenAt?: string
  lastRefreshedAt?: string
}
