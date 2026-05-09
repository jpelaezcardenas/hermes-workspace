import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Hermes status panel wiring', () => {
  it('renders the Hermes status panel from Operations and fetches the status API', () => {
    const operationsSource = readFileSync(
      resolve(process.cwd(), 'src/screens/agents/operations-screen.tsx'),
      'utf8',
    )
    const panelSource = readFileSync(
      resolve(process.cwd(), 'src/components/hermes-status-panel.tsx'),
      'utf8',
    )

    expect(operationsSource).toContain('HermesStatusPanel')
    expect(panelSource).toContain("fetch('/api/hermes-status'")
    expect(panelSource).toContain('data-testid="hermes-status-panel"')
    expect(panelSource).toContain('Workspace status')
  })
})
