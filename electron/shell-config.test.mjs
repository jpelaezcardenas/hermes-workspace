import { createRequire } from 'node:module'
import { describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const { getAppUrl, getDevServerPort, getSmokeMode } = require('./shell-config.cjs')

describe('Electron shell config', () => {
  it('points development shell at the Vite dev server default port', () => {
    expect(getDevServerPort({})).toBe(3000)
    expect(getAppUrl({ NODE_ENV: 'development' }, 3847)).toBe('http://127.0.0.1:3000/?desktop=1')
  })

  it('allows development shell port override for local smoke sessions', () => {
    expect(getDevServerPort({ HERMES_ELECTRON_DEV_SERVER_PORT: '3015' })).toBe(3015)
    expect(getAppUrl({ NODE_ENV: 'development', HERMES_ELECTRON_DEV_SERVER_PORT: '3015' }, 3847)).toBe('http://127.0.0.1:3015/?desktop=1')
  })

  it('loads the bundled local server in production mode', () => {
    expect(getAppUrl({ NODE_ENV: 'production' }, 3847)).toBe('http://127.0.0.1:3847/?desktop=1')
  })

  it('detects opt-in smoke mode only from explicit env flag', () => {
    expect(getSmokeMode({})).toBe(false)
    expect(getSmokeMode({ HERMES_ELECTRON_SMOKE: '1' })).toBe(true)
  })
})
