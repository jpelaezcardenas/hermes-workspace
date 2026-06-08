import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = () =>
  readFileSync(
    resolve(process.cwd(), 'src/screens/chat/components/chat-composer.tsx'),
    'utf8',
  )

describe('ChatComposer context controls', () => {
  it('wires profile selection through the existing profile APIs', () => {
    const src = source()

    expect(src).toContain("fetch('/api/profiles/list')")
    expect(src).toContain("fetch('/api/profiles/activate'")
    expect(src).toContain('Activated profile')
  })

  it('surfaces the reasoning-effort control next to the model picker', () => {
    const src = source()

    // The inline workspace *picker menu* and its orphaned scaffolding
    // (workspaceSelectMutation / workspaceContextQuery / workspaceEntries /
    // SEARCH_MODAL_EVENTS) were removed as dead code once noUnusedLocals was
    // enabled. The live composer control asserted here is reasoning effort.
    expect(src).toContain('Reasoning effort')
    expect(src).toContain("['medium', 'Medium']")
    expect(src).toContain("['high', 'High']")
  })
})
