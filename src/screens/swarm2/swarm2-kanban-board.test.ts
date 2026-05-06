import { describe, expect, it } from 'vitest'
import {
  buildSwarm2KanbanCardsUrl,
  buildSwarm2KanbanQueryKey,
  getKanbanBackendPresentation,
  withSwarm2KanbanProjectId,
} from './swarm2-kanban-board'

describe('Swarm2 Kanban backend presentation', () => {
  it('keeps the initial backend state quiet and non-committal while auto-detecting', () => {
    expect(getKanbanBackendPresentation(null)).toMatchObject({
      badgeLabel: 'Detecting board',
      badgeTone: 'unknown',
      toastTitle: 'Detecting Swarm Board backend',
    })
  })

  it('presents detected Kanban as the default shared board, not a backend demo', () => {
    expect(getKanbanBackendPresentation({
      id: 'claude',
      label: 'Hermes Kanban',
      detected: true,
      writable: true,
      details: 'Canonical storage detected',
      path: '/tmp/kanban.db',
    })).toMatchObject({
      badgeLabel: 'Shared board',
      badgeTone: 'claude',
      toastTitle: 'Board connected',
      toastBody: 'Cards and status changes are using the canonical Kanban store.',
      title: 'Canonical storage detected',
    })
  })

  it('presents local storage as an automatic fallback, not a manual control', () => {
    expect(getKanbanBackendPresentation({
      id: 'local',
      label: 'Local board',
      detected: true,
      writable: true,
      details: 'Using local Swarm board JSON store.',
      path: '/tmp/swarm2-kanban.json',
    })).toMatchObject({
      badgeLabel: 'Local fallback',
      badgeTone: 'local',
      toastTitle: 'Using local Swarm Board',
      toastBody: 'Using local Swarm board JSON store.',
    })
  })
})

describe('Swarm2 Kanban project scoping', () => {
  it('scopes board query keys by active project with a default fallback', () => {
    expect(buildSwarm2KanbanQueryKey(' solarbot ')).toEqual([
      'swarm2',
      'kanban',
      'solarbot',
    ])
    expect(buildSwarm2KanbanQueryKey(null)).toEqual([
      'swarm2',
      'kanban',
      'default',
    ])
  })

  it('adds projectId to Kanban API URLs only when explicitly present', () => {
    expect(buildSwarm2KanbanCardsUrl('solarbot')).toBe(
      '/api/swarm-kanban?projectId=solarbot',
    )
    expect(buildSwarm2KanbanCardsUrl(null)).toBe('/api/swarm-kanban')
  })

  it('injects projectId into Kanban mutation bodies without mutating the caller input', () => {
    const input = { title: 'Fix cache bleed' }

    expect(withSwarm2KanbanProjectId(input, 'solarbot')).toEqual({
      title: 'Fix cache bleed',
      projectId: 'solarbot',
    })
    expect(input).toEqual({ title: 'Fix cache bleed' })
    expect(withSwarm2KanbanProjectId(input, '   ')).toEqual(input)
  })
})
