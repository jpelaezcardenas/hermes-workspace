/** @vitest-environment jsdom */
import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useModes } from './use-modes'
import type { Mode } from './use-modes'
import type { StudioSettings } from './use-settings'

// ---------------------------------------------------------------------------
// Module mocks
//
// useModes is wired to a single side-effecting collaborator:
//   - `./use-settings` (current StudioSettings + updateSettings writer)
//
// We replace it with a typed fake whose `settings` object can be reconfigured
// per test (so we can drive drift detection + mode capture against known
// values) and whose `updateSettings` we observe to prove applyMode pushes the
// right partial. The rest of the hook's behavior (mode CRUD, dedupe,
// localStorage sync, applied-mode tracking) is pure and asserted via the
// returned values + the `claude-modes` storage key.
// ---------------------------------------------------------------------------

const updateSettingsMock = vi.fn<(updates: Partial<StudioSettings>) => void>()

// A mutable settings object the mocked useSettings returns. Tests reassign its
// fields in beforeEach / individual cases to exercise the drift branches.
const settingsState: Pick<
  StudioSettings,
  | 'smartSuggestionsEnabled'
  | 'onlySuggestCheaper'
  | 'preferredBudgetModel'
  | 'preferredPremiumModel'
> = {
  smartSuggestionsEnabled: false,
  onlySuggestCheaper: false,
  preferredBudgetModel: '',
  preferredPremiumModel: '',
}

vi.mock('./use-settings', () => ({
  // Return a fresh `settings` object each call so that mutating settingsState
  // between renders changes the reference the hook's `useCallback([settings])`
  // depends on (mirrors how the real zustand store yields a new object when
  // updateSettings runs). Without this the drift-watch effect would never see
  // the change.
  useSettings: () => ({
    settings: { ...settingsState },
    updateSettings: (updates: Partial<StudioSettings>) =>
      updateSettingsMock(updates),
  }),
}))

const STORAGE_KEY = 'claude-modes'

function readStoredModes(): Array<Mode> {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  const parsed: unknown = JSON.parse(raw)
  return Array.isArray(parsed) ? (parsed as Array<Mode>) : []
}

/**
 * Narrow a saveMode result to a Mode (throwing on the error branch). Returning
 * the narrowed value keeps the static type as `Mode` across later closures,
 * which a `let`-scoped `if (!x || 'error' in x)` guard does not preserve.
 */
function expectMode(value: Mode | { error: string } | undefined): Mode {
  if (!value || 'error' in value) {
    throw new Error('expected a saved Mode, got an error result')
  }
  return value
}

let uuidCounter = 0

beforeEach(() => {
  vi.clearAllMocks()
  window.localStorage.clear()
  uuidCounter = 0
  // Deterministic ids so saved modes are addressable in assertions.
  vi.spyOn(crypto, 'randomUUID').mockImplementation(() => {
    uuidCounter += 1
    return `00000000-0000-0000-0000-00000000000${uuidCounter}` as ReturnType<
      typeof crypto.randomUUID
    >
  })
  settingsState.smartSuggestionsEnabled = false
  settingsState.onlySuggestCheaper = false
  settingsState.preferredBudgetModel = ''
  settingsState.preferredPremiumModel = ''
})

afterEach(() => {
  vi.restoreAllMocks()
})

// ---------------------------------------------------------------------------
// Initial state + hydration
// ---------------------------------------------------------------------------

describe('useModes — initial state', () => {
  it('starts empty with no applied mode and exposes the action surface', () => {
    const { result } = renderHook(() => useModes())

    expect(result.current.modes).toEqual([])
    expect(result.current.appliedModeId).toBeNull()
    expect(typeof result.current.saveMode).toBe('function')
    expect(typeof result.current.renameMode).toBe('function')
    expect(typeof result.current.deleteMode).toBe('function')
    expect(typeof result.current.applyMode).toBe('function')
    expect(typeof result.current.getAppliedMode).toBe('function')
    expect(typeof result.current.hasDrift).toBe('function')
  })

  it('hydrates existing modes from localStorage', () => {
    const seeded: Array<Mode> = [
      {
        id: 'seed-1',
        name: 'Focus',
        smartSuggestionsEnabled: true,
        onlySuggestCheaper: false,
      },
    ]
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))

    const { result } = renderHook(() => useModes())

    expect(result.current.modes).toEqual(seeded)
  })

  it('falls back to an empty list when stored JSON is corrupt', () => {
    window.localStorage.setItem(STORAGE_KEY, '{not valid json')

    const { result } = renderHook(() => useModes())

    expect(result.current.modes).toEqual([])
  })
})

// ---------------------------------------------------------------------------
// saveMode
// ---------------------------------------------------------------------------

describe('useModes — saveMode', () => {
  it('captures current settings, includes the model, marks it applied, and persists', () => {
    settingsState.smartSuggestionsEnabled = true
    settingsState.onlySuggestCheaper = true
    settingsState.preferredBudgetModel = 'budget-x'
    settingsState.preferredPremiumModel = 'premium-y'

    const { result } = renderHook(() => useModes())

    let saved: Mode | { error: string } | undefined
    act(() => {
      saved = result.current.saveMode('Deep Work', true, 'model-z')
    })

    expect(saved).toMatchObject({
      name: 'Deep Work',
      preferredModel: 'model-z',
      smartSuggestionsEnabled: true,
      onlySuggestCheaper: true,
      preferredBudgetModel: 'budget-x',
      preferredPremiumModel: 'premium-y',
    })
    expect(result.current.modes).toHaveLength(1)
    if (!saved || 'error' in saved) throw new Error('expected a mode')
    expect(result.current.appliedModeId).toBe(saved.id)
    expect(readStoredModes()).toHaveLength(1)
  })

  it('omits preferredModel when the current model is not included', () => {
    const { result } = renderHook(() => useModes())

    let saved: Mode | { error: string } | undefined
    act(() => {
      saved = result.current.saveMode('No Model', false, 'model-z')
    })

    if (!saved || 'error' in saved) throw new Error('expected a mode')
    expect(saved.preferredModel).toBeUndefined()
  })

  it('rejects a duplicate name case-insensitively without mutating state', () => {
    const { result } = renderHook(() => useModes())

    act(() => {
      result.current.saveMode('Focus', false)
    })

    let second: Mode | { error: string } | undefined
    act(() => {
      second = result.current.saveMode('focus', false)
    })

    expect(second).toEqual({ error: 'A mode with this name already exists' })
    expect(result.current.modes).toHaveLength(1)
  })
})

// ---------------------------------------------------------------------------
// renameMode
// ---------------------------------------------------------------------------

describe('useModes — renameMode', () => {
  it('renames an existing mode', () => {
    const { result } = renderHook(() => useModes())

    let created: Mode | { error: string } | undefined
    act(() => {
      created = result.current.saveMode('Old', false)
    })
    if (!created || 'error' in created) throw new Error('expected a mode')
    const id = created.id

    let outcome: { error?: string } | undefined
    act(() => {
      outcome = result.current.renameMode(id, 'New')
    })

    expect(outcome).toEqual({})
    expect(result.current.modes.at(0)?.name).toBe('New')
  })

  it('rejects renaming to a name owned by another mode', () => {
    const { result } = renderHook(() => useModes())

    act(() => {
      result.current.saveMode('Alpha', false)
    })
    let betaRaw: Mode | { error: string } | undefined
    act(() => {
      betaRaw = result.current.saveMode('Beta', false)
    })
    const beta = expectMode(betaRaw)

    let outcome: { error?: string } | undefined
    act(() => {
      outcome = result.current.renameMode(beta.id, 'alpha')
    })

    expect(outcome).toEqual({ error: 'A mode with this name already exists' })
    expect(result.current.modes.find((m) => m.id === beta.id)?.name).toBe(
      'Beta',
    )
  })

  it('allows renaming a mode to its own current name (excludes self)', () => {
    const { result } = renderHook(() => useModes())

    let createdRaw: Mode | { error: string } | undefined
    act(() => {
      createdRaw = result.current.saveMode('Same', false)
    })
    const created = expectMode(createdRaw)

    let outcome: { error?: string } | undefined
    act(() => {
      outcome = result.current.renameMode(created.id, 'Same')
    })

    expect(outcome).toEqual({})
    expect(result.current.modes.at(0)?.name).toBe('Same')
  })
})

// ---------------------------------------------------------------------------
// deleteMode
// ---------------------------------------------------------------------------

describe('useModes — deleteMode', () => {
  it('removes the mode and clears appliedModeId when it was applied', () => {
    const { result } = renderHook(() => useModes())

    let createdRaw: Mode | { error: string } | undefined
    act(() => {
      createdRaw = result.current.saveMode('Temp', false)
    })
    const created = expectMode(createdRaw)
    expect(result.current.appliedModeId).toBe(created.id)

    act(() => {
      result.current.deleteMode(created.id)
    })

    expect(result.current.modes).toEqual([])
    expect(result.current.appliedModeId).toBeNull()
    expect(readStoredModes()).toEqual([])
  })

  it('keeps appliedModeId when a different mode is deleted', () => {
    const { result } = renderHook(() => useModes())

    let keepRaw: Mode | { error: string } | undefined
    act(() => {
      keepRaw = result.current.saveMode('Keep', false)
    })
    let dropRaw: Mode | { error: string } | undefined
    act(() => {
      dropRaw = result.current.saveMode('Drop', false)
    })
    const keep = expectMode(keepRaw)
    const drop = expectMode(dropRaw)
    // saveMode marks the most recently saved mode (Drop) as applied; re-apply
    // Keep so we can prove deleting Drop leaves Keep's applied id intact.
    act(() => {
      result.current.applyMode(keep)
    })
    expect(result.current.appliedModeId).toBe(keep.id)

    act(() => {
      result.current.deleteMode(drop.id)
    })

    expect(result.current.appliedModeId).toBe(keep.id)
    expect(result.current.modes.map((m) => m.id)).toEqual([keep.id])
  })
})

// ---------------------------------------------------------------------------
// applyMode + updateSettings push
// ---------------------------------------------------------------------------

describe('useModes — applyMode', () => {
  it('pushes the captured settings and records the applied mode', () => {
    const { result } = renderHook(() => useModes())

    const mode: Mode = {
      id: 'm-apply',
      name: 'Apply Me',
      smartSuggestionsEnabled: true,
      onlySuggestCheaper: true,
      preferredBudgetModel: 'b-model',
      preferredPremiumModel: 'p-model',
    }

    act(() => {
      result.current.applyMode(mode)
    })

    expect(updateSettingsMock).toHaveBeenCalledWith({
      smartSuggestionsEnabled: true,
      onlySuggestCheaper: true,
      preferredBudgetModel: 'b-model',
      preferredPremiumModel: 'p-model',
    })
    expect(result.current.appliedModeId).toBe('m-apply')
  })

  it('omits budget/premium models from the update when the mode has none', () => {
    const { result } = renderHook(() => useModes())

    const mode: Mode = {
      id: 'm-bare',
      name: 'Bare',
      smartSuggestionsEnabled: false,
      onlySuggestCheaper: false,
    }

    act(() => {
      result.current.applyMode(mode)
    })

    expect(updateSettingsMock).toHaveBeenCalledWith({
      smartSuggestionsEnabled: false,
      onlySuggestCheaper: false,
    })
  })
})

// ---------------------------------------------------------------------------
// getAppliedMode
// ---------------------------------------------------------------------------

describe('useModes — getAppliedMode', () => {
  it('returns null when nothing is applied', () => {
    const { result } = renderHook(() => useModes())
    expect(result.current.getAppliedMode()).toBeNull()
  })

  it('returns the applied mode object once one is applied', () => {
    const { result } = renderHook(() => useModes())

    let created: Mode | { error: string } | undefined
    act(() => {
      created = result.current.saveMode('Applied', false)
    })
    if (!created || 'error' in created) throw new Error('expected a mode')

    expect(result.current.getAppliedMode()?.id).toBe(created.id)
  })
})

// ---------------------------------------------------------------------------
// Drift detection (checkDrift via hasDrift + applied-mode auto-clear effect)
// ---------------------------------------------------------------------------

describe('useModes — drift detection', () => {
  it('reports no drift when a mode matches current settings', () => {
    settingsState.smartSuggestionsEnabled = true
    settingsState.onlySuggestCheaper = true
    settingsState.preferredBudgetModel = 'b'
    settingsState.preferredPremiumModel = 'p'

    const { result } = renderHook(() => useModes())

    let created: Mode | { error: string } | undefined
    act(() => {
      created = result.current.saveMode('Match', false)
    })
    if (!created || 'error' in created) throw new Error('expected a mode')

    expect(result.current.hasDrift(created.id)).toBe(false)
  })

  it('detects drift on a toggle mismatch', () => {
    // Save a mode while settings are false/false (no drift captured), then flip
    // a live setting so the saved mode now mismatches.
    const { result, rerender } = renderHook(() => useModes())

    let created: Mode | { error: string } | undefined
    act(() => {
      created = result.current.saveMode('Drift', false)
    })
    if (!created || 'error' in created) throw new Error('expected a mode')
    expect(result.current.hasDrift(created.id)).toBe(false)

    act(() => {
      settingsState.smartSuggestionsEnabled = true
      rerender()
    })

    expect(result.current.hasDrift(created.id)).toBe(true)
  })

  it('ignores an undefined preferred model when checking drift', () => {
    settingsState.preferredBudgetModel = 'something'

    const { result } = renderHook(() => useModes())

    // A mode with smartSuggestionsEnabled/onlySuggestCheaper matching settings
    // but no preferredBudgetModel must not drift purely because settings carry
    // a budget model — the undefined branch short-circuits that comparison.
    const bare: Mode = {
      id: 'bare-budget',
      name: 'BareBudget',
      smartSuggestionsEnabled: false,
      onlySuggestCheaper: false,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([bare]))
    const { result: hydrated } = renderHook(() => useModes())

    expect(hydrated.current.hasDrift('bare-budget')).toBe(false)
    // hasDrift on an unknown id returns false too.
    expect(result.current.hasDrift('not-a-real-id')).toBe(false)
  })

  it('detects drift when a defined preferred model diverges from settings', () => {
    const driftMode: Mode = {
      id: 'drift-budget',
      name: 'BudgetDrift',
      smartSuggestionsEnabled: false,
      onlySuggestCheaper: false,
      preferredBudgetModel: 'mode-budget', // settings has '' → drift
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([driftMode]))

    const { result } = renderHook(() => useModes())

    expect(result.current.hasDrift('drift-budget')).toBe(true)
  })

  it('auto-clears the applied mode when settings drift away from it', () => {
    // Save a mode that matches the current (false/false/empty) settings; it
    // becomes the applied mode with no drift.
    const { result, rerender } = renderHook(() => useModes())

    let created: Mode | { error: string } | undefined
    act(() => {
      created = result.current.saveMode('Tracked', false)
    })
    if (!created || 'error' in created) throw new Error('expected a mode')
    expect(result.current.appliedModeId).toBe(created.id)

    // Now drift the live settings; the drift-watch effect should null the
    // applied mode on the next render pass.
    act(() => {
      settingsState.smartSuggestionsEnabled = true
      rerender()
    })

    expect(result.current.appliedModeId).toBeNull()
  })
})
