#!/usr/bin/env node
// postbuild.js — run after `vite build` (via "build" script in package.json)
//
// Asserts three critical invariants that upstream syncs tend to break.
// All checks print warnings on failure but NEVER fail the build (always exits 0).
//
// Invariants checked:
//  1. server-entry.js contains 'hermes-onboarding-complete' (onboarding bypass)
//  2. src/lib/tasks-api.ts contains 'hermes-tasks' (not reverted to 'claude-tasks' only)
//  3. server-entry.js does NOT have triplication of cookieSecureOverride declarations
//
// Additionally: if server-entry.js has exactly 2 cookieSecureOverride declarations,
// the script will attempt to deduplicate them automatically.

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ENTRY = join(__dirname, 'server-entry.js')
const TASKS_API = join(__dirname, 'src/lib/tasks-api.ts')

let warnings = 0

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
function warn(msg) {
  console.warn(`[postbuild] WARNING: ${msg}`)
  warnings++
}

function ok(msg) {
  console.log(`[postbuild] OK: ${msg}`)
}

// ---------------------------------------------------------------------------
// CHECK 1: server-entry.js contains 'hermes-onboarding-complete'
// ---------------------------------------------------------------------------
if (!existsSync(ENTRY)) {
  warn('server-entry.js not found — skipping server-entry checks (build output missing?)')
} else {
  let entrySrc = readFileSync(ENTRY, 'utf8')

  // --- 1a: onboarding bypass present ---
  if (entrySrc.includes('hermes-onboarding-complete')) {
    ok("server-entry.js contains 'hermes-onboarding-complete' (onboarding bypass intact)")
  } else {
    warn(
      "server-entry.js is MISSING 'hermes-onboarding-complete'.\n" +
      "  The onboarding bypass has likely been stripped by an upstream sync.\n" +
      "  Fix: restore the hermes-onboarding-complete cookie/session logic in server-entry.js."
    )
  }

  // --- 1b: cookieSecureOverride triplication check + auto-dedup ---
  const countDeclarations = (s) => (s.match(/const cookieSecureOverride\s*=/g) || []).length
  const before = countDeclarations(entrySrc)

  if (before >= 3) {
    warn(
      `server-entry.js has TRIPLICATION (or worse) of cookieSecureOverride — ${before} declarations found.\n` +
      "  This causes the first declaration to be shadowed and may cause runtime errors.\n" +
      "  Attempting automatic deduplication..."
    )
    // Attempt dedup
    const paragraphs = entrySrc.split(/\n\n/)
    const deduped = []
    for (let i = 0; i < paragraphs.length; i++) {
      if (i > 0 && paragraphs[i].trim() === paragraphs[i - 1].trim() && paragraphs[i].trim() !== '') {
        continue
      }
      deduped.push(paragraphs[i])
    }
    const fixed = deduped.join('\n\n')
    const after = countDeclarations(fixed)
    if (after < before) {
      writeFileSync(ENTRY, fixed, 'utf8')
      try {
        execSync(`node --check "${ENTRY}"`, { stdio: 'pipe' })
        console.log(`[postbuild] Auto-fixed cookieSecureOverride duplicates: ${before} → ${after} declarations.`)
        if (after > 1) {
          warn(`Still ${after} cookieSecureOverride declarations after dedup — manual fix needed.`)
        } else {
          ok('cookieSecureOverride deduplicated successfully.')
        }
      } catch (e) {
        warn('Dedup introduced a syntax error — restoring original server-entry.js.')
        writeFileSync(ENTRY, entrySrc, 'utf8')
      }
    } else {
      warn(`Could not auto-deduplicate cookieSecureOverride — still ${after} declarations. Manual fix needed.`)
    }
  } else if (before === 2) {
    // Duplicate (not triplication) — auto-dedup silently
    const paragraphs = entrySrc.split(/\n\n/)
    const deduped = []
    for (let i = 0; i < paragraphs.length; i++) {
      if (i > 0 && paragraphs[i].trim() === paragraphs[i - 1].trim() && paragraphs[i].trim() !== '') {
        continue
      }
      deduped.push(paragraphs[i])
    }
    const fixed = deduped.join('\n\n')
    const after = countDeclarations(fixed)
    if (after < before) {
      writeFileSync(ENTRY, fixed, 'utf8')
      try {
        execSync(`node --check "${ENTRY}"`, { stdio: 'pipe' })
        console.log(`[postbuild] Fixed duplicate cookieSecureOverride in server-entry.js (${before} → ${after})`)
      } catch (e) {
        warn('Dedup introduced a syntax error — restoring original server-entry.js.')
        writeFileSync(ENTRY, entrySrc, 'utf8')
      }
    } else {
      ok(`server-entry.js has ${before} cookieSecureOverride declaration(s) — looks clean.`)
    }
  } else if (before === 1) {
    ok('server-entry.js has exactly 1 cookieSecureOverride declaration — no duplicates.')
  } else {
    // 0 — might be fine if the feature doesn't apply
    ok('server-entry.js has no cookieSecureOverride declarations.')
  }
}

// ---------------------------------------------------------------------------
// CHECK 2: src/lib/tasks-api.ts contains 'hermes-tasks' (not reverted)
// ---------------------------------------------------------------------------
if (!existsSync(TASKS_API)) {
  warn('src/lib/tasks-api.ts not found — cannot verify backend constants.')
} else {
  const tasksApiSrc = readFileSync(TASKS_API, 'utf8')

  const hasHermesTasks = tasksApiSrc.includes('hermes-tasks')
  const hasOnlyClaudeTasks = /^\s*const BASE\s*=\s*['""]\/api\/claude-tasks['"]/m.test(tasksApiSrc)

  if (hasOnlyClaudeTasks) {
    warn(
      "src/lib/tasks-api.ts has been REVERTED by upstream — found single hardcoded BASE = '/api/claude-tasks'.\n" +
      "  The Hermes auto-detection logic has been lost. Task board will be broken.\n" +
      "  Fix: git checkout fork/main -- src/lib/tasks-api.ts"
    )
  } else if (!hasHermesTasks) {
    warn(
      "src/lib/tasks-api.ts does NOT contain 'hermes-tasks' — the Hermes backend constant is missing.\n" +
      "  Fix: restore HERMES_BASE = '/api/hermes-tasks' in src/lib/tasks-api.ts"
    )
  } else {
    ok("src/lib/tasks-api.ts contains 'hermes-tasks' — backend constant intact.")
  }
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
if (warnings === 0) {
  console.log('[postbuild] All invariants passed. Build is clean.')
} else {
  console.warn(`[postbuild] ${warnings} warning(s) issued above. Build succeeded but manual fixes may be needed.`)
}

// Always exit 0 — warnings must not break CI or the dev build.
process.exit(0)
