/** @vitest-environment jsdom */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type * as SoundsModule from './sounds'

const STORAGE_KEY = 'claude-sound-prefs'

// --- Minimal typed fakes for the Web Audio API surface the module touches ---

type AudioParamCall =
  | { kind: 'setValueAtTime'; value: number; time: number }
  | { kind: 'linearRamp'; value: number; time: number }
  | { kind: 'exponentialRamp'; value: number; time: number }

class FakeAudioParam {
  value = 0
  readonly calls: Array<AudioParamCall> = []
  setValueAtTime(value: number, time: number): this {
    this.value = value
    this.calls.push({ kind: 'setValueAtTime', value, time })
    return this
  }
  linearRampToValueAtTime(value: number, time: number): this {
    this.calls.push({ kind: 'linearRamp', value, time })
    return this
  }
  exponentialRampToValueAtTime(value: number, time: number): this {
    this.calls.push({ kind: 'exponentialRamp', value, time })
    return this
  }
}

class FakeOscillator {
  type = 'sine'
  readonly frequency = new FakeAudioParam()
  connectedTo: FakeGain | null = null
  startTime: number | null = null
  stopTime: number | null = null
  connect(target: FakeGain): void {
    this.connectedTo = target
  }
  start(time: number): void {
    this.startTime = time
  }
  stop(time: number): void {
    this.stopTime = time
  }
}

class FakeGain {
  readonly gain = new FakeAudioParam()
  connectedToDestination = false
  connect(target: unknown): void {
    this.connectedToDestination = target === fakeContextRegistry.destination
  }
}

class FakeAudioContext {
  static instances: Array<FakeAudioContext> = []
  state: 'running' | 'suspended' | 'closed' = 'running'
  currentTime = 100
  readonly destination = {}
  readonly oscillators: Array<FakeOscillator> = []
  readonly gains: Array<FakeGain> = []
  resumeCallCount = 0
  resumeImpl: () => Promise<void> = () => Promise.resolve()

  constructor() {
    FakeAudioContext.instances.push(this)
    fakeContextRegistry.destination = this.destination
  }

  resume(): Promise<void> {
    this.resumeCallCount += 1
    return this.resumeImpl()
  }
  createOscillator(): FakeOscillator {
    const osc = new FakeOscillator()
    this.oscillators.push(osc)
    return osc
  }
  createGain(): FakeGain {
    const gain = new FakeGain()
    fakeContextRegistry.destination = this.destination
    this.gains.push(gain)
    return gain
  }
}

// Track the "current" destination so FakeGain.connect can verify wiring.
const fakeContextRegistry: { destination: unknown } = { destination: {} }

function lastContext(): FakeAudioContext {
  const ctx = FakeAudioContext.instances.at(-1)
  if (ctx === undefined) throw new Error('no AudioContext created')
  return ctx
}

/**
 * Import a fresh copy of the module so its load-time `loadPrefs()` runs against
 * whatever localStorage / window we have configured for the test.
 */
async function importSounds(): Promise<typeof SoundsModule> {
  return import('./sounds')
}

beforeEach(() => {
  FakeAudioContext.instances = []
  fakeContextRegistry.destination = {}
  localStorage.clear()
  vi.resetModules()
  vi.stubGlobal('AudioContext', FakeAudioContext)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('preference loading at import time', () => {
  it('uses defaults when no stored prefs exist', async () => {
    const sounds = await importSounds()
    expect(sounds.getSoundVolume()).toBeCloseTo(0.3)
    expect(sounds.isSoundEnabled()).toBe(true)
  })

  it('loads and clamps stored volume and enabled flag', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ volume: 5, enabled: false }),
    )
    const sounds = await importSounds()
    expect(sounds.getSoundVolume()).toBe(1)
    expect(sounds.isSoundEnabled()).toBe(false)
  })

  it('clamps negative stored volume to 0', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ volume: -2 }))
    const sounds = await importSounds()
    expect(sounds.getSoundVolume()).toBe(0)
    expect(sounds.isSoundEnabled()).toBe(true)
  })

  it('falls back to defaults for non-number volume / non-boolean enabled', async () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ volume: 'loud', enabled: 'yes' }),
    )
    const sounds = await importSounds()
    expect(sounds.getSoundVolume()).toBeCloseTo(0.3)
    expect(sounds.isSoundEnabled()).toBe(true)
  })

  it('ignores malformed JSON in storage', async () => {
    localStorage.setItem(STORAGE_KEY, '{not json')
    const sounds = await importSounds()
    expect(sounds.getSoundVolume()).toBeCloseTo(0.3)
    expect(sounds.isSoundEnabled()).toBe(true)
  })
})

describe('volume controls', () => {
  it('clamps and persists volume on set', async () => {
    const sounds = await importSounds()
    sounds.setSoundVolume(0.5)
    expect(sounds.getSoundVolume()).toBe(0.5)
    sounds.setSoundVolume(9)
    expect(sounds.getSoundVolume()).toBe(1)
    sounds.setSoundVolume(-3)
    expect(sounds.getSoundVolume()).toBe(0)

    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === null) throw new Error('expected persisted prefs')
    const parsed: unknown = JSON.parse(stored)
    if (parsed === null || typeof parsed !== 'object') {
      throw new Error('expected object prefs')
    }
    expect(parsed).toMatchObject({ volume: 0 })
  })
})

describe('enabled controls', () => {
  it('persists the enabled flag on toggle', async () => {
    const sounds = await importSounds()
    sounds.setSoundEnabled(false)
    expect(sounds.isSoundEnabled()).toBe(false)
    sounds.setSoundEnabled(true)
    expect(sounds.isSoundEnabled()).toBe(true)

    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === null) throw new Error('expected persisted prefs')
    expect(stored).toContain('"enabled":true')
  })
})

describe('AudioContext lifecycle', () => {
  it('creates a single shared context reused across plays', async () => {
    const sounds = await importSounds()
    sounds.playThinking()
    sounds.playThinking()
    expect(FakeAudioContext.instances).toHaveLength(1)
  })

  it('recreates the context after it is closed', async () => {
    const sounds = await importSounds()
    sounds.playThinking()
    lastContext().state = 'closed'
    sounds.playThinking()
    expect(FakeAudioContext.instances).toHaveLength(2)
  })

  it('resumes a suspended context (autoplay policy)', async () => {
    const sounds = await importSounds()
    // First play creates a running context.
    sounds.playThinking()
    const ctx = lastContext()
    ctx.state = 'suspended'
    sounds.playThinking()
    expect(ctx.resumeCallCount).toBeGreaterThanOrEqual(1)
  })

  it('swallows rejected resume() without throwing', async () => {
    const sounds = await importSounds()
    sounds.playThinking()
    const ctx = lastContext()
    ctx.state = 'suspended'
    ctx.resumeImpl = () => Promise.reject(new Error('blocked'))
    expect(() => sounds.playThinking()).not.toThrow()
  })
})

describe('playback gating', () => {
  it('does not synthesize audio when sounds are disabled', async () => {
    const sounds = await importSounds()
    sounds.setSoundEnabled(false)
    sounds.playAgentSpawned()
    sounds.playAgentComplete()
    sounds.playAlert()
    // A context may be created by getAudioContext, but no oscillators run.
    for (const ctx of FakeAudioContext.instances) {
      expect(ctx.oscillators).toHaveLength(0)
    }
  })
})

describe('single-tone synthesis (playThinking)', () => {
  it('wires an oscillator through a gain to the destination', async () => {
    const sounds = await importSounds()
    sounds.playThinking()
    const ctx = lastContext()
    expect(ctx.oscillators).toHaveLength(1)
    expect(ctx.gains).toHaveLength(1)
    const osc = ctx.oscillators[0]
    const gain = ctx.gains[0]
    if (osc === undefined || gain === undefined) {
      throw new Error('expected oscillator + gain')
    }
    expect(osc.type).toBe('sine')
    expect(osc.connectedTo).toBe(gain)
    expect(gain.connectedToDestination).toBe(true)
    // C6 frequency set at start.
    expect(osc.frequency.value).toBeCloseTo(1046.5)
    // Started at currentTime and stopped after the duration.
    expect(osc.startTime).toBe(100)
    if (osc.stopTime === null) throw new Error('expected stop time')
    expect(osc.stopTime).toBeGreaterThan(100)
  })

  it('scales gain by master volume and the per-tone multiplier', async () => {
    const sounds = await importSounds()
    sounds.setSoundVolume(0.5)
    sounds.playThinking()
    const gain = lastContext().gains[0]
    if (gain === undefined) throw new Error('expected gain')
    // volume 0.5 * multiplier 0.33 = 0.165 used as the attack peak.
    const attack = gain.gain.calls.find((c) => c.kind === 'linearRamp')
    if (attack === undefined) throw new Error('expected attack ramp')
    expect(attack.value).toBeCloseTo(0.165)
  })
})

describe('agent-complete bespoke synthesis', () => {
  it('produces one triangle oscillator at G5', async () => {
    const sounds = await importSounds()
    sounds.playAgentComplete()
    const ctx = lastContext()
    expect(ctx.oscillators).toHaveLength(1)
    const osc = ctx.oscillators[0]
    if (osc === undefined) throw new Error('expected oscillator')
    expect(osc.type).toBe('triangle')
    expect(osc.frequency.value).toBeCloseTo(783.99)
  })

  it('is silent when disabled', async () => {
    const sounds = await importSounds()
    sounds.setSoundEnabled(false)
    sounds.playAgentComplete()
    for (const ctx of FakeAudioContext.instances) {
      expect(ctx.oscillators).toHaveLength(0)
    }
  })
})

describe('sequence synthesis', () => {
  it('playAgentSpawned schedules two tones with increasing offsets', async () => {
    const sounds = await importSounds()
    sounds.playAgentSpawned()
    const ctx = lastContext()
    expect(ctx.oscillators).toHaveLength(2)
    const [first, second] = ctx.oscillators
    if (first === undefined || second === undefined) {
      throw new Error('expected two oscillators')
    }
    expect(first.frequency.value).toBeCloseTo(523.25) // C5
    expect(second.frequency.value).toBeCloseTo(659.25) // E5
    // Second tone starts after the first (offset by 100ms = 0.1s).
    if (first.startTime === null || second.startTime === null) {
      throw new Error('expected start times')
    }
    expect(second.startTime).toBeGreaterThan(first.startTime)
    expect(second.startTime - first.startTime).toBeCloseTo(0.1)
  })

  it('playAgentFailed uses sawtooth tones', async () => {
    const sounds = await importSounds()
    sounds.playAgentFailed()
    const ctx = lastContext()
    expect(ctx.oscillators).toHaveLength(2)
    for (const osc of ctx.oscillators) {
      expect(osc.type).toBe('sawtooth')
    }
  })

  it('playChatComplete produces a descending sine pair', async () => {
    const sounds = await importSounds()
    sounds.playChatComplete()
    const ctx = lastContext()
    const [first, second] = ctx.oscillators
    if (first === undefined || second === undefined) {
      throw new Error('expected two oscillators')
    }
    expect(first.frequency.value).toBeCloseTo(659.25) // E5
    expect(second.frequency.value).toBeCloseTo(523.25) // C5
    expect(first.type).toBe('sine')
  })

  it('playAlert produces three square-wave tones', async () => {
    const sounds = await importSounds()
    sounds.playAlert()
    const ctx = lastContext()
    expect(ctx.oscillators).toHaveLength(3)
    for (const osc of ctx.oscillators) {
      expect(osc.type).toBe('square')
    }
  })

  it('playChatNotification produces a single sine tone', async () => {
    const sounds = await importSounds()
    sounds.playChatNotification()
    const ctx = lastContext()
    expect(ctx.oscillators).toHaveLength(1)
    expect(ctx.oscillators[0]?.type).toBe('sine')
  })
})

describe('playSound dispatch', () => {
  it('routes each event name to its handler', async () => {
    const play = await importSounds()
    const cases: Array<[Parameters<typeof play.playSound>[0], number]> = [
      ['agentSpawned', 2],
      ['agentComplete', 1],
      ['agentFailed', 2],
      ['chatNotification', 1],
      ['chatComplete', 2],
      ['alert', 3],
      ['thinking', 1],
    ]
    // The module keeps a single shared AudioContext, so count the oscillators
    // each dispatch appends rather than expecting a brand-new context.
    const countOscillators = (): number =>
      FakeAudioContext.instances.reduce(
        (sum, ctx) => sum + ctx.oscillators.length,
        0,
      )
    for (const [event, expectedOscillators] of cases) {
      const before = countOscillators()
      play.playSound(event)
      expect(countOscillators() - before).toBe(expectedOscillators)
    }
  })
})

describe('SSR / no-window guards', () => {
  it('returns no context and never throws when window is undefined', async () => {
    vi.stubGlobal('window', undefined)
    const sounds = await importSounds()
    // No AudioContext should be constructed without a window.
    expect(() => sounds.playThinking()).not.toThrow()
    expect(FakeAudioContext.instances).toHaveLength(0)
  })
})
