import { describe, expect, it } from 'vitest'
import { MCP_PRESETS } from './presets'

function filterPresets(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return MCP_PRESETS
  return MCP_PRESETS.filter(
    (preset) =>
      preset.name.toLowerCase().includes(q) ||
      preset.description.toLowerCase().includes(q),
  )
}

describe('MCP_PRESETS catalog', () => {
  it('exposes at least one preset for each transport type', () => {
    const transports = new Set(MCP_PRESETS.map((p) => p.template.transportType))
    expect(transports.has('stdio')).toBe(true)
    expect(transports.has('http')).toBe(true)
  })

  it('tags every preset with the Official Presets category', () => {
    for (const preset of MCP_PRESETS) {
      expect(preset.category).toBe('Official Presets')
    }
  })

  it('returns the full catalog for an empty query', () => {
    expect(filterPresets('').length).toBe(MCP_PRESETS.length)
    expect(filterPresets('   ').length).toBe(MCP_PRESETS.length)
  })

  it('narrows the catalog to matches by name', () => {
    const matches = filterPresets('github')
    expect(matches.length).toBeGreaterThan(0)
    expect(matches.length).toBeLessThan(MCP_PRESETS.length)
    expect(matches.every((p) => p.name.toLowerCase().includes('github'))).toBe(
      true,
    )
  })

  it('narrows the catalog to matches by description', () => {
    const matches = filterPresets('postgres')
    expect(matches.length).toBeGreaterThan(0)
    expect(matches.some((p) => p.id === 'postgres')).toBe(true)
  })

  it('returns no matches for an unknown query', () => {
    expect(filterPresets('zzznopreset').length).toBe(0)
  })
})
