import { describe, expect, it } from 'vitest'
import { AUXILIARY_SURFACE_DESCRIPTIONS } from './gateway-config-screen'

describe('AUXILIARY_SURFACE_DESCRIPTIONS', () => {
  it('documents the curator surface so the Routing table makes sense without leaving the page', () => {
    const description = AUXILIARY_SURFACE_DESCRIPTIONS.curator
    expect(description).toBeDefined()
    expect(description!.toLowerCase()).toContain('curator')
    // Mention the mechanism so the user knows it's a CLI background task,
    // not a runtime agent surfaced under Missions.
    expect(description!.toLowerCase()).toMatch(/skills|memory/)
    expect(description).toContain('hermes curator')
  })
})
