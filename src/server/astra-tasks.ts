import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { listTasks, updateTask, createTask } from './tasks-store'

// ---------------------------------------------------------------------------
// markTasksAsReviewing
// ---------------------------------------------------------------------------

export function markTasksAsReviewing(taskIds: string[]): void {
  const now = new Date().toISOString()
  for (const id of taskIds) {
    updateTask(id, {
      agent_state: 'reviewing',
      agent_name: 'astra',
      agent_action_at: now,
    })
  }
}

// ---------------------------------------------------------------------------
// runAstraReviewBackground
// ---------------------------------------------------------------------------

export function runAstraReviewBackground(): { taskCount: number } {
  const candidates = listTasks({ column: 'backlog' }).concat(listTasks({ column: 'todo' }))

  if (candidates.length === 0) {
    return { taskCount: 0 }
  }

  // Mark all as reviewing immediately (synchronous, before we fork)
  markTasksAsReviewing(candidates.map((t) => t.id))

  // Build the summary payload for the hermes prompt
  const taskSummary = candidates.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    priority: t.priority,
  }))

  const prompt = `You are Astra, reviewing the task board backlog for the Hermes workspace.
For each task below, decide:
1. Is it feasible? (yes/no)
2. Priority: high/medium/low
3. Best assignee from: orchestrator, builder, reviewer, researcher, qa, ops-watch, maintainer, strategist, inbox-triage, km-agent (or null)
4. Should it move from backlog to: "todo" (ready to work), "blocked" (needs more info), or stay "backlog"

Return a JSON array: [{"id": "...", "feasible": true, "priority": "high", "assignee": "builder", "column": "todo", "reason": "..."}]

Tasks:
${JSON.stringify(taskSummary, null, 2)}`

  const tasksFilePath = path.join(
    process.env.HERMES_HOME ?? process.env.CLAUDE_HOME ?? path.join(os.homedir(), '.hermes'),
    'tasks.json',
  )

  // Escape the prompt and task data for embedding in the script string
  const promptEscaped = JSON.stringify(prompt)
  const tasksFilePathEscaped = JSON.stringify(tasksFilePath)

  const scriptContent = `
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';

const TASKS_FILE = ${tasksFilePathEscaped};
const prompt = ${promptEscaped};

// Helper: read tasks.json
function readTasks() {
  try {
    const raw = fs.readFileSync(TASKS_FILE, 'utf-8').trim();
    if (!raw) return { tasks: [] };
    const parsed = JSON.parse(raw);
    return { tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [] };
  } catch {
    return { tasks: [] };
  }
}

// Helper: write tasks.json
function writeTasks(data) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(data, null, 2) + '\\n', 'utf-8');
}

// Helper: clear agent state on a set of task ids
function clearAgentState(taskIds) {
  const file = readTasks();
  const now = new Date().toISOString();
  file.tasks = file.tasks.map((t) => {
    if (taskIds.includes(t.id)) {
      return { ...t, agent_state: null, agent_name: null, agent_action_at: null, updated_at: now };
    }
    return t;
  });
  writeTasks(file);
}

// Call hermes CLI
const result = spawnSync(
  'hermes',
  ['-p', prompt, '-z'],
  { encoding: 'utf-8', timeout: 90000, maxBuffer: 4 * 1024 * 1024 }
);

const taskIds = ${JSON.stringify(candidates.map((t) => t.id))};

if (result.status !== 0 || !result.stdout) {
  // hermes failed — just clear agent state
  clearAgentState(taskIds);
  process.exit(0);
}

// Try to extract a JSON array from the response
let updates = null;
try {
  const text = result.stdout.trim();
  // Try direct parse first
  try {
    updates = JSON.parse(text);
  } catch {
    // Find first [ ... ] block in the response
    const match = text.match(/\\[\\s*\\{[\\s\\S]*?\\}\\s*\\]/);
    if (match) {
      updates = JSON.parse(match[0]);
    }
  }
} catch {
  updates = null;
}

if (!Array.isArray(updates)) {
  // Could not parse — clear agent state without making priority changes
  clearAgentState(taskIds);
  process.exit(0);
}

// Apply updates directly to tasks.json
const file = readTasks();
const now = new Date().toISOString();
file.tasks = file.tasks.map((t) => {
  const upd = updates.find((u) => u.id === t.id);
  if (!upd) return t;
  return {
    ...t,
    priority: upd.priority ?? t.priority,
    assignee: upd.assignee !== undefined ? upd.assignee : t.assignee,
    column: upd.column ?? t.column,
    agent_state: null,
    agent_name: null,
    agent_action_at: null,
    updated_at: now,
  };
});
writeTasks(file);
process.exit(0);
`

  // Write the script to a temp file
  const timestamp = Date.now()
  const scriptPath = `/tmp/astra-review-${timestamp}.mjs`
  fs.writeFileSync(scriptPath, scriptContent, 'utf-8')

  // Spawn the script detached so the server process doesn't wait for it
  const child = spawn(process.execPath, [scriptPath], {
    detached: true,
    stdio: 'ignore',
  })
  child.unref()

  return { taskCount: candidates.length }
}

// ---------------------------------------------------------------------------
// injectIdeasAsBacklog
// ---------------------------------------------------------------------------

type IdeaEntry = {
  title: string
  description?: string
  category?: string
  estimated_effort?: string
}

// Resolve IDEAS.json relative to this file's location (src/server/ → repo root)
const IDEAS_FILE =
  process.env.HERMES_WORKSPACE_IDEAS_FILE ??
  path.join(path.dirname(path.dirname(path.dirname(new URL(import.meta.url).pathname))), 'IDEAS.json')

export function injectIdeasAsBacklog(): { injected: number; ideas: string[] } {
  let ideas: IdeaEntry[] = []
  try {
    const raw = fs.readFileSync(IDEAS_FILE, 'utf-8').trim()
    const parsed = JSON.parse(raw) as unknown
    ideas = Array.isArray(parsed) ? (parsed as IdeaEntry[]) : []
  } catch {
    return { injected: 0, ideas: [] }
  }

  if (ideas.length === 0) return { injected: 0, ideas: [] }

  // Get existing task titles (case-insensitive) to avoid duplicates
  const allTasks = listTasks({ includeDone: true })
  const existingTitles = new Set(allTasks.map((t) => t.title.toLowerCase()))

  const injectedTitles: string[] = []

  for (const idea of ideas) {
    if (!idea.title) continue
    if (existingTitles.has(idea.title.toLowerCase())) continue

    const effortToPriority = (effort: string | undefined) => {
      if (effort === 'high') return 'high' as const
      if (effort === 'low') return 'low' as const
      return 'medium' as const
    }

    createTask({
      title: idea.title,
      description: idea.description ?? '',
      column: 'backlog',
      priority: effortToPriority(idea.estimated_effort),
      tags: [idea.category ?? 'idea'],
      created_by: 'idea_job',
      source: 'idea_job',
    })

    injectedTitles.push(idea.title)
    existingTitles.add(idea.title.toLowerCase())
  }

  return { injected: injectedTitles.length, ideas: injectedTitles }
}
