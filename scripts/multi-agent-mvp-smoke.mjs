#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync, existsSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const root = process.cwd()
const tempRoot = mkdtempSync(join(tmpdir(), 'hermes-ma-mvp-smoke-'))
const repoPath = join(tempRoot, 'repo')
const stateRoot = join(tempRoot, 'state')
const obsidianRoot = join(tempRoot, 'obsidian')
const port = Number(process.env.HERMES_MA_SMOKE_PORT || 3187)
const baseUrl = `http://127.0.0.1:${port}`
const serverReadyPattern = /Local:\s+http:\/\/localhost:|Network:/
let server
let serverPid
let taskId
let worktreePath

function log(message) {
  process.stdout.write(`${message}\n`)
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd ?? root,
      env: options.env ?? process.env,
      stdio: options.stdio ?? ['ignore', 'pipe', 'pipe'],
    })
    let stdout = ''
    let stderr = ''
    child.stdout?.on('data', (chunk) => { stdout += chunk.toString() })
    child.stderr?.on('data', (chunk) => { stderr += chunk.toString() })
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve({ stdout, stderr })
      else reject(new Error(`${command} ${args.join(' ')} failed with ${code}\n${stdout}\n${stderr}`))
    })
  })
}

async function waitForServer(timeoutMs = 60_000) {
  const start = Date.now()
  let lastError = ''
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(`${baseUrl}/api/ma/projects`, { cache: 'no-store' })
      if (response.ok) return
      lastError = `${response.status} ${await response.text()}`
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error)
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error(`Workspace server did not become ready at ${baseUrl}: ${lastError}`)
}

async function api(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'content-type': 'application/json' } : {}),
      ...(options.headers ?? {}),
    },
  })
  const text = await response.text()
  let body = {}
  try { body = text ? JSON.parse(text) : {} } catch { body = { raw: text } }
  if (!response.ok) {
    const error = new Error(`${options.method ?? 'GET'} ${path} failed: ${response.status} ${text}`)
    error.response = response
    error.body = body
    throw error
  }
  return body
}

async function waitForTask(predicate, label, timeoutMs = 15_000) {
  const start = Date.now()
  let lastTask = null
  while (Date.now() - start < timeoutMs) {
    const tasks = await api('/api/ma/tasks')
    lastTask = tasks.tasks?.find((task) => task.id === taskId) ?? null
    if (lastTask && predicate(lastTask)) return lastTask
    await new Promise((resolve) => setTimeout(resolve, 400))
  }
  throw new Error(`Timed out waiting for task ${label}. Last task: ${JSON.stringify(lastTask, null, 2)}`)
}

async function stopServer() {
  if (!serverPid) return
  try {
    await run('bash', ['-lc', `pkill -TERM -P ${serverPid} 2>/dev/null || true; kill -TERM ${serverPid} 2>/dev/null || true; sleep 0.3; pkill -KILL -P ${serverPid} 2>/dev/null || true; kill -KILL ${serverPid} 2>/dev/null || true`])
  } catch {
    // Best-effort cleanup only.
  }
}

async function main() {
  log(`Using temp root: ${tempRoot}`)
  await run('git', ['init', '-b', 'main', repoPath])
  await run('git', ['config', 'user.email', 'smoke@example.test'], { cwd: repoPath })
  await run('git', ['config', 'user.name', 'Hermes Smoke'], { cwd: repoPath })
  await run('bash', ['-lc', 'printf "# Hermes MA smoke\\n" > README.md && git add README.md && git commit -m init'], { cwd: repoPath })
  await run('git', ['remote', 'add', 'origin', 'https://github.com/example/hermes-ma-smoke.git'], { cwd: repoPath })

  const workerScript = 'const fs=require("fs"); fs.writeFileSync("worker-output.txt", "hello from smoke\\n"); console.log("worker done")'
  const env = {
    ...process.env,
    PORT: String(port),
    CLAUDE_PASSWORD: '',
    HERMES_MA_STATE_FILE: join(stateRoot, 'state.json'),
    HERMES_MA_EVENTS_DIR: join(stateRoot, 'events'),
    HERMES_MA_PROJECTS_JSON: JSON.stringify([
      {
        id: 'smoke',
        name: 'Smoke Temp Repo',
        repoPath,
        defaultBranch: 'main',
        validation: {
          test: 'git status --short',
          build: 'git status --short',
        },
      },
    ]),
    HERMES_MA_WORKER_COMMAND: process.execPath,
    HERMES_MA_WORKER_ARGS_JSON: JSON.stringify(['-e', workerScript]),
    HERMES_MA_GH_MOCK: '1',
    HERMES_MA_OBSIDIAN_RUNS_DIR: obsidianRoot,
    HERMES_API_URL: 'http://127.0.0.1:8642',
  }

  log(`Starting Workspace dev server on ${baseUrl}`)
  server = spawn('pnpm', ['dev', '--host', '127.0.0.1', '--port', String(port)], {
    cwd: root,
    env,
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
  serverPid = server.pid
  server.unref()
  server.stdout?.unref()
  server.stderr?.unref()
  server.stdout.on('data', (chunk) => {
    const text = chunk.toString()
    if (process.env.HERMES_MA_SMOKE_VERBOSE === '1' || serverReadyPattern.test(text)) process.stdout.write(text)
  })
  server.stderr.on('data', (chunk) => {
    const text = chunk.toString()
    if (process.env.HERMES_MA_SMOKE_VERBOSE === '1') process.stderr.write(text)
  })

  await waitForServer()

  const projects = await api('/api/ma/projects')
  if (!projects.projects?.some((project) => project.id === 'smoke')) throw new Error('Smoke project did not load')
  log('✓ project config loaded')

  const profiles = await api('/api/ma/profiles')
  const profileId = profiles.profiles?.[0]?.id ?? 'backend-engineer'

  const created = await api('/api/ma/tasks', {
    method: 'POST',
    body: JSON.stringify({
      projectId: 'smoke',
      title: 'MVP smoke task',
      description: 'Exercise multi-agent MVP API flow',
      assigneeProfileId: profileId,
      priority: 'medium',
      workPacket: 'Create worker-output.txt and finish successfully.',
      acceptanceCriteria: ['worker-output.txt exists', 'validation passes', 'PR artifact is created'],
    }),
  })
  taskId = created.task.id
  log(`✓ task created: ${taskId}`)

  const started = await api(`/api/ma/tasks/${encodeURIComponent(taskId)}/start`, { method: 'POST' })
  worktreePath = started.task.worktreePath
  if (!worktreePath) throw new Error('Start did not return worktreePath')
  log(`✓ task started with worktree: ${worktreePath}`)

  const completedTask = await waitForTask((task) => task.status === 'done', 'worker completion', 20_000)
  if (!existsSync(join(completedTask.worktreePath, 'worker-output.txt'))) throw new Error('worker-output.txt was not created')
  log('✓ worker completed and wrote output')

  const events = await api(`/api/ma/tasks/${encodeURIComponent(taskId)}/events`)
  if (!events.events?.some((event) => event.type === 'task.completed')) throw new Error('task.completed event missing')
  log(`✓ events captured: ${events.events.length}`)

  const diff = await api(`/api/ma/tasks/${encodeURIComponent(taskId)}/diff`)
  if (!diff.diff?.changedFiles?.includes('worker-output.txt')) throw new Error(`Diff missing worker-output.txt: ${JSON.stringify(diff.diff)}`)
  log('✓ diff includes worker-output.txt')

  const validation = await api(`/api/ma/tasks/${encodeURIComponent(taskId)}/validate`, {
    method: 'POST',
    body: JSON.stringify({ type: 'test' }),
  })
  if (validation.validation?.status !== 'passed') throw new Error(`Validation did not pass: ${JSON.stringify(validation)}`)
  log('✓ validation passed')

  const firstPr = await api(`/api/ma/tasks/${encodeURIComponent(taskId)}/pr`, {
    method: 'POST',
    body: JSON.stringify({ title: 'MVP smoke PR', body: 'Smoke PR body' }),
  })
  if (!firstPr.approval?.id) throw new Error(`Expected approval required response: ${JSON.stringify(firstPr)}`)
  log(`✓ PR approval requested: ${firstPr.approval.id}`)

  const resolved = await api(`/api/ma/approvals/${encodeURIComponent(firstPr.approval.id)}/resolve`, {
    method: 'POST',
    body: JSON.stringify({ decision: 'approved' }),
  })
  if (resolved.approval?.status !== 'approved') throw new Error(`Approval did not resolve: ${JSON.stringify(resolved)}`)
  log('✓ PR approval approved')

  const secondPr = await api(`/api/ma/tasks/${encodeURIComponent(taskId)}/pr`, {
    method: 'POST',
    body: JSON.stringify({ title: 'MVP smoke PR', body: 'Smoke PR body' }),
  })
  if (secondPr.pr?.url !== 'https://github.com/example/repo/pull/1') throw new Error(`Mock PR URL missing: ${JSON.stringify(secondPr)}`)
  log(`✓ mock PR artifact created: ${secondPr.pr.url}`)

  const summary = await api(`/api/ma/tasks/${encodeURIComponent(taskId)}/save-summary`, {
    method: 'POST',
    body: JSON.stringify({ summary: 'Smoke summary for Hermes multi-agent MVP.', saveToObsidian: true }),
  })
  if (!summary.task?.finalSummary || !summary.run?.summary || !summary.obsidian?.path) throw new Error(`Summary save incomplete: ${JSON.stringify(summary)}`)
  if (!existsSync(summary.obsidian.path)) throw new Error(`Obsidian note missing: ${summary.obsidian.path}`)
  if (!readFileSync(summary.obsidian.path, 'utf-8').includes('Smoke summary')) throw new Error('Obsidian note content missing summary')
  log(`✓ summary saved to ${summary.obsidian.path}`)

  log('\nPASS: Hermes Multi-Agent MVP API smoke completed successfully')
  await stopServer()
}

try {
  await main()
} catch (error) {
  process.exitCode = 1
  console.error('\nFAIL: Hermes Multi-Agent MVP smoke failed')
  console.error(error instanceof Error ? error.stack || error.message : String(error))
} finally {
  await stopServer()
  if (process.env.HERMES_MA_SMOKE_KEEP_TEMP === '1') {
    log(`Keeping temp root: ${tempRoot}`)
  } else {
    try { rmSync(tempRoot, { recursive: true, force: true }) } catch {}
  }
}
