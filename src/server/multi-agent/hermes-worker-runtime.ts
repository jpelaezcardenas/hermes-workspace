import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { appendTaskEvent, type MultiAgentEventLog } from './events'
import { selectSkillsForTask } from './skill-autoload'
import {
  updateRun,
  updateTask,
  type MultiAgentStore,
} from './store'
import type {
  MultiAgentEvent,
  MultiAgentProfile,
  MultiAgentProject,
  MultiAgentRun,
  MultiAgentTask,
} from './types'

export type HermesWorkerPromptInput = {
  task: MultiAgentTask
  project: MultiAgentProject
  profile: MultiAgentProfile
  loadedSkills?: string[]
}

export type LaunchHermesWorkerInput = HermesWorkerPromptInput & {
  store: MultiAgentStore
  eventLog: MultiAgentEventLog
  run: MultiAgentRun
  command?: string
  args?: string[]
}

export type HermesWorkerRunHandle = {
  child: ChildProcessWithoutNullStreams
  done: Promise<void>
}

function shellQuote(value: string): string {
  return `'${value.replace(/'/g, `'"'"'`)}'`
}

function eventId(store: MultiAgentStore): string {
  return `event-${store.id()}`
}

function listBlock(values: string[], fallback: string): string {
  return values.length ? values.map((value) => `- ${value}`).join('\n') : `- ${fallback}`
}

function productBriefBlock(task: MultiAgentTask): string {
  const brief = task.productBrief
  if (!brief) return 'Product brief:\n- No product brief captured.'
  return [
    'Product brief:',
    `Goal: ${brief.goal || 'Not captured.'}`,
    `User story: ${brief.userStory || 'Not captured.'}`,
    'Success metrics:',
    listBlock(brief.successMetrics, 'No success metrics captured.'),
    'Non-goals:',
    listBlock(brief.nonGoals, 'No non-goals captured.'),
  ].join('\n')
}

function appendEvent(
  store: MultiAgentStore,
  eventLog: MultiAgentEventLog,
  event: Omit<MultiAgentEvent, 'id' | 'createdAt'>,
): MultiAgentEvent {
  const fullEvent: MultiAgentEvent = {
    id: eventId(store),
    createdAt: store.now(),
    ...event,
  }
  appendTaskEvent(eventLog, fullEvent)
  return fullEvent
}

export function buildHermesWorkerPrompt({
  task,
  project,
  profile,
  loadedSkills,
}: HermesWorkerPromptInput): string {
  const criteria = task.acceptanceCriteria.length
    ? task.acceptanceCriteria.map((criterion) => `- ${criterion}`).join('\n')
    : '- No explicit acceptance criteria were provided.'
  const skills = loadedSkills ?? selectSkillsForTask({ profile, task })
  const skillsBlock = skills.length
    ? skills.map((skill) => `- ${skill}`).join('\n')
    : '- No skills selected.'

  return `You are a Hermes Agent worker running under Hermes Workspace Multi-Agent Control Plane.

Role: ${profile.role}
Task: ${task.title}
Project: ${project.name}
Repo: ${project.repoPath}
Worktree: ${task.worktreePath ?? '(not assigned)'}
Branch: ${task.branchName ?? '(not assigned)'}

Skills loaded for this run:
${skillsBlock}

Context:
${task.description || '(no description)'}

${productBriefBlock(task)}

Work packet:
${task.workPacket || task.description || task.title}

Acceptance criteria:
${criteria}

Rules:
- Work only inside the worktree unless explicitly approved.
- Do not push, deploy, send external messages, or edit secrets without approval.
- Keep changes scoped to the task.
- Run relevant validation if practical.
- End with structured result: summary, files changed, validation, risks, blockers.
`
}

export function buildHermesWorkerArgs(prompt: string, profile: MultiAgentProfile, task?: MultiAgentTask): string[] {
  const loadedSkills = task ? selectSkillsForTask({ profile, task }) : profile.skills
  const args = ['--oneshot', prompt, '--accept-hooks']
  if (loadedSkills.length) {
    args.push('--skills', loadedSkills.join(','))
  }
  if (profile.enabledToolsets?.length) {
    args.push('--toolsets', profile.enabledToolsets.join(','))
  }
  if (profile.model) {
    args.push('--model', profile.model)
  }
  return args
}

export function launchHermesWorker(input: LaunchHermesWorkerInput): HermesWorkerRunHandle {
  const loadedSkills = input.loadedSkills ?? selectSkillsForTask({ profile: input.profile, task: input.task })
  const prompt = buildHermesWorkerPrompt({ ...input, loadedSkills })
  const command = input.command ?? 'hermes'
  const args = input.args ?? buildHermesWorkerArgs(prompt, input.profile, input.task)
  const worktreePath = input.task.worktreePath ?? input.project.repoPath

  updateRun(input.store, input.run.id, {
    status: 'running',
    startedAt: input.store.now(),
  })
  updateTask(input.store, input.task.id, {
    status: 'running',
    latestRunId: input.run.id,
  })

  const child = spawn(command, args, {
    cwd: worktreePath,
    env: {
      ...process.env,
      HERMES_TASK_ID: input.task.id,
      HERMES_RUN_ID: input.run.id,
      HERMES_PROJECT_PATH: input.project.repoPath,
      HERMES_WORKTREE_PATH: worktreePath,
      HERMES_WORKER_PROFILE: input.profile.id,
      HERMES_WORKER_PROMPT: prompt,
    },
  })

  appendEvent(input.store, input.eventLog, {
    taskId: input.task.id,
    runId: input.run.id,
    type: 'run.started',
    message: `Started Hermes worker with ${command} ${args.map(shellQuote).join(' ')}`,
    payload: {
      pid: child.pid ?? null,
      command,
      worktreePath,
      profileId: input.profile.id,
      loadedSkills,
    },
  })

  const logChunk = (stream: 'stdout' | 'stderr', chunk: Buffer) => {
    const text = chunk.toString('utf-8').trim()
    if (!text) return
    appendEvent(input.store, input.eventLog, {
      taskId: input.task.id,
      runId: input.run.id,
      type: 'run.log',
      message: text,
      payload: { stream },
    })
  }

  child.stdout.on('data', (chunk: Buffer) => logChunk('stdout', chunk))
  child.stderr.on('data', (chunk: Buffer) => logChunk('stderr', chunk))

  const finalizeFailure = (message: string, payload: Record<string, unknown>) => {
    try {
      updateRun(input.store, input.run.id, {
        status: 'failed',
        finishedAt: input.store.now(),
        error: message,
      })
      updateTask(input.store, input.task.id, { status: 'failed' })
      appendEvent(input.store, input.eventLog, {
        taskId: input.task.id,
        runId: input.run.id,
        type: 'task.failed',
        message,
        payload,
      })
    } catch {
      // The backing store can disappear during tests or workspace shutdown. The child
      // process already exited; avoid surfacing late unhandled exceptions.
    }
  }

  const done = new Promise<void>((resolve) => {
    child.on('error', (error) => {
      finalizeFailure(error.message, { error: error.message })
      resolve()
    })

    child.on('close', (code, signal) => {
      const success = code === 0
      try {
        updateRun(input.store, input.run.id, {
          status: success ? 'completed' : 'failed',
          finishedAt: input.store.now(),
          error: success ? null : `Worker exited with code ${code ?? 'null'} signal ${signal ?? 'null'}`,
        })
        updateTask(input.store, input.task.id, { status: success ? 'done' : 'failed' })
        appendEvent(input.store, input.eventLog, {
          taskId: input.task.id,
          runId: input.run.id,
          type: success ? 'task.completed' : 'task.failed',
          message: success
            ? `Hermes worker completed ${input.task.title}`
            : `Hermes worker failed with code ${code ?? 'null'}`,
          payload: { code, signal },
        })
      } catch {
        // See finalizeFailure note: do not turn late child exit into an unhandled error.
      }
      resolve()
    })
  })

  return { child, done }
}

export async function waitForHermesWorkerRun(handle: HermesWorkerRunHandle): Promise<void> {
  await handle.done
}
