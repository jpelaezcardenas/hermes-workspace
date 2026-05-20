import { describe, expect, it } from 'vitest'
import {
  getDefaultMemoryFileContent,
  getTodayMemoryPath,
  getLiveMemoryTargetPreview,
  normalizeLiveMemoryTargets,
} from './memory-live-data'

describe('memory live data helpers', () => {
  it('normalizes gateway memory targets with stable counts and labels', () => {
    expect(
      normalizeLiveMemoryTargets({
        targets: [
          {
            target: 'memory',
            entries: ['Keep replies short', { text: 'Use local models first' }],
            usage: '12% — 264/2,200 chars',
          },
          {
            target: 'user',
            entries: [],
            entry_count: 3,
            usage: '4% — 55/1,375 chars',
          },
        ],
      }),
    ).toEqual([
      {
        key: 'memory',
        label: 'memory',
        entryCount: 2,
        usage: '12% — 264/2,200 chars',
        entries: ['Keep replies short', { text: 'Use local models first' }],
      },
      {
        key: 'user',
        label: 'user',
        entryCount: 3,
        usage: '4% — 55/1,375 chars',
        entries: [],
      },
    ])
  })

  it('renders readable previews for string and object entries', () => {
    expect(getLiveMemoryTargetPreview('Keep replies short')).toBe(
      'Keep replies short',
    )
    expect(getLiveMemoryTargetPreview({ text: 'Use local models first' })).toBe(
      'Use local models first',
    )
    expect(getLiveMemoryTargetPreview({ value: 'Fallback entry' })).toBe(
      'Fallback entry',
    )
  })

  it('builds stable memory file paths and starter content', () => {
    expect(getTodayMemoryPath(new Date('2026-05-20T11:00:00.000Z'))).toBe(
      'memories/2026-05-20.md',
    )
    expect(getDefaultMemoryFileContent('MEMORY.md')).toBe('# Memory\n\n')
    expect(getDefaultMemoryFileContent('memories/2026-05-20.md')).toBe(
      '# 2026-05-20\n\n',
    )
  })
})
