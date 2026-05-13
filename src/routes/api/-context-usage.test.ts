import { describe, expect, it } from 'vitest'

import { Route } from './context-usage'

describe('context-usage API route', () => {
  it('exports the route definition', () => {
    expect(Route).toBeDefined()
  })
})
