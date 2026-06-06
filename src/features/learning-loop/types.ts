export type LearningLoopItemKind = 'memory' | 'skill'

export type LearningLoopReviewStatus = 'new' | 'recent' | 'stable'

export type LearningLoopRiskLevel = 'low' | 'medium' | 'high'

export type LearningLoopReviewItem = {
  id: string
  kind: LearningLoopItemKind
  profile: string
  name: string
  relativePath: string
  updatedAt: string
  ageHours: number
  status: LearningLoopReviewStatus
  risk: LearningLoopRiskLevel
  reviewFlags: Array<string>
  summary: string
  details?: string
}

export type LearningLoopReview = {
  ok: boolean
  generatedAt: string
  windowHours: number
  profiles: Array<string>
  items: Array<LearningLoopReviewItem>
  counts: {
    total: number
    memory: number
    skill: number
    highRisk: number
    mediumRisk: number
    reviewNeeded: number
  }
  error?: string
}
