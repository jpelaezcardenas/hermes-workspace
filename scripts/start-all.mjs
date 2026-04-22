#!/usr/bin/env node
/**
 * start-all.mjs
 *
 * Launches both the Hermes gateway and the workspace dev server.
 * Usage:  node scripts/start-all.mjs   (or pnpm start:all)
 *
 * - Runs `hermes gateway run` in a child process.
 * - Runs `pnpm dev` (Vite dev server on :3000) in the foreground.
 * - Tears down the gateway when the dev server exits or Ctrl-C is pressed.
 */
import { spawn } from 'node:child_process'
import process from 'node:process'

let gatewayPid = null

function startGateway() {
  const child = spawn('hermes', ['gateway', 'run'], {
    stdio: 'inherit',
    shell: true,
    detached: false,
  })
  gatewayPid = child.pid
  child.on('exit', (code) => {
    console.log(`[start:all] Gateway exited with code ${code ?? 'unknown'}`)
    gatewayPid = null
  })
  return child
}

function startDev() {
  const child = spawn('pnpm', ['dev'], {
    stdio: 'inherit',
    shell: true,
    detached: false,
  })
  child.on('exit', (code) => {
    console.log(`[start:all] Dev server exited with code ${code ?? 'unknown'}`)
    if (gatewayPid) {
      try { process.kill(-gatewayPid, 'SIGTERM') } catch {}
    }
    process.exit(code ?? 0)
  })
  return child
}

const gateway = startGateway()
const dev = startDev()

function teardown() {
  gateway.kill('SIGTERM')
  dev.kill('SIGTERM')
  process.exit(0)
}

process.on('SIGINT', teardown)
process.on('SIGTERM', teardown)
