import { describe, expect, it } from 'vitest'
import { createSampleAgentSurface } from './sample-surface'

describe('createSampleAgentSurface', () => {
  it('creates a stable v1 surface with the five starter block types', () => {
    const surface = createSampleAgentSurface(
      new Date('2026-06-03T17:12:23.000Z'),
    )

    expect(surface.schema).toBe('hermes.agent_surface.v1')
    expect(surface.generatedAt).toBe('2026-06-03T17:12:23.000Z')
    expect(surface.source.workflow).toBe('AI Learning Review')
    expect(surface.blocks.map((block) => block.type)).toEqual([
      'status_item',
      'decision_card',
      'approval_action',
      'checklist',
      'evidence_link',
    ])
  })
})
