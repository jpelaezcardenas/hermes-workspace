import { describe, expect, it } from 'vitest'
import {
  parseGitAheadBehind,
  parseGitPorcelainPath,
  remoteUrlMatches,
} from './update-system'

describe('update-system helpers', () => {
  it('matches GitHub URL forms against expected repo aliases', () => {
    expect(
      remoteUrlMatches('https://github.com/outsourc-e/hermes-workspace.git', [
        'outsourc-e/hermes-workspace',
      ]),
    ).toBe(true)
    expect(
      remoteUrlMatches('git@github.com:NousResearch/hermes-agent.git', [
        'hermes-agent',
      ]),
    ).toBe(true)
    expect(
      remoteUrlMatches('https://github.com/example/other.git', [
        'hermes-workspace',
      ]),
    ).toBe(false)
  })

  it('parses porcelain paths without dropping the first character', () => {
    expect(parseGitPorcelainPath(' M src/routes/__root.tsx')).toBe(
      'src/routes/__root.tsx',
    )
    expect(parseGitPorcelainPath('M src/routes/__root.tsx')).toBe(
      'src/routes/__root.tsx',
    )
    expect(parseGitPorcelainPath('?? src/server/session-utils.test.ts')).toBe(
      'src/server/session-utils.test.ts',
    )
  })

  it('parses git ahead/behind counts', () => {
    expect(parseGitAheadBehind('2\t0')).toEqual({ ahead: 2, behind: 0 })
    expect(parseGitAheadBehind('0 27')).toEqual({ ahead: 0, behind: 27 })
    expect(parseGitAheadBehind('nope')).toBeNull()
  })
})
