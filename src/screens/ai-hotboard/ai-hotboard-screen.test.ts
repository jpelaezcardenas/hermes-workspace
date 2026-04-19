import { describe, expect, it } from 'vitest'
import {
  RECOMMEND_BANNER_CLASS,
  SIDEBAR_NAV_SEQUENCE,
  SIGNAL_BADGE_CLASS,
  SOURCE_ITEMS,
  SOURCE_SUBMISSION_ITEMS,
  STRATEGY_ITERATION_ITEMS,
  STRATEGY_LINES,
} from './ai-hotboard-screen'

describe('ai-hotboard screen handoff constraints', () => {
  it('keeps source and report subitems fully expanded by default', () => {
    expect(SOURCE_ITEMS).toEqual([
      'X bookmarks',
      'X likes',
      'X following',
      'X for_you',
      '公众号',
      '肖恩对谈',
      '小红书',
    ])

    expect(SOURCE_SUBMISSION_ITEMS).toEqual(['JC 苹果备忘录日记', '爱马仕战略发现', '小J 执行发现'])
  })

  it('keeps left navigation sequence fixed and renders M2 lines only once', () => {
    expect(SIDEBAR_NAV_SEQUENCE).toEqual([
      '精选',
      '全部 AI 动态',
      '低粉爆文',
      '收藏',
      '信源',
      '信源提报',
      '精选策略',
      '策略迭代',
      '系统',
      '用户',
      '退出',
    ])

    expect(STRATEGY_LINES).toEqual([
      'M2 A线 | 抓数稳定化',
      'M2 B线 | 财务报表自动化',
      'M2 C线 | AI短视频→投流ROI',
      'M2 D线 | 自动化有效率',
      'M2 E线 | 全员Agent协作',
    ])

    STRATEGY_LINES.forEach((line) => {
      expect(STRATEGY_ITERATION_ITEMS).not.toContain(line)
    })
  })

  it('uses fixed signal badge and recommendation banner styles', () => {
    expect(SIGNAL_BADGE_CLASS).toContain('h-8')
    expect(SIGNAL_BADGE_CLASS).toContain('w-8')
    expect(SIGNAL_BADGE_CLASS).toContain('bg-[#2a2f3e]')
    expect(SIGNAL_BADGE_CLASS).toContain('text-white')

    expect(RECOMMEND_BANNER_CLASS).toContain('bg-emerald-950/70')
    expect(RECOMMEND_BANNER_CLASS).not.toContain('border-l')
  })
})
