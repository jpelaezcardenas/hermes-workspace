import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { runTaskValidation } from './validation-runner'

describe('multi-agent validation runner', () => {
  it('runs a passing command in the task worktree and captures output', () => {
    const worktreePath = mkdtempSync(join(tmpdir(), 'hermes-ma-validation-pass-'))
    try {
      writeFileSync(join(worktreePath, 'marker.txt'), 'ok\n', 'utf-8')

      const result = runTaskValidation({
        taskId: 'task-1',
        type: 'test',
        command: `${process.execPath} -e "const fs=require('fs'); console.log(fs.readFileSync('marker.txt','utf8').trim())"`,
        worktreePath,
        now: () => '2026-05-18T12:00:00.000Z',
        id: () => '123',
      })

      expect(result.validation).toMatchObject({
        id: 'validation-123',
        taskId: 'task-1',
        type: 'test',
        command: result.validation.command,
        status: 'passed',
        exitCode: 0,
        startedAt: '2026-05-18T12:00:00.000Z',
        finishedAt: '2026-05-18T12:00:00.000Z',
      })
      expect(result.output).toContain('ok')
      expect(result.validation.outputSummary).toContain('ok')
    } finally {
      rmSync(worktreePath, { recursive: true, force: true })
    }
  })

  it('marks non-zero commands as failed and preserves stderr', () => {
    const worktreePath = mkdtempSync(join(tmpdir(), 'hermes-ma-validation-fail-'))
    try {
      const result = runTaskValidation({
        taskId: 'task-1',
        type: 'custom',
        command: `${process.execPath} -e "console.error('bad validation'); process.exit(7)"`,
        worktreePath,
        allowCustomCommand: true,
        now: () => '2026-05-18T12:00:00.000Z',
        id: () => 'fail',
      })

      expect(result.validation).toMatchObject({
        id: 'validation-fail',
        status: 'failed',
        exitCode: 7,
      })
      expect(result.output).toContain('bad validation')
      expect(result.validation.outputSummary).toContain('bad validation')
    } finally {
      rmSync(worktreePath, { recursive: true, force: true })
    }
  })

  it('rejects custom commands when custom validation is not explicitly allowed', () => {
    const worktreePath = mkdtempSync(join(tmpdir(), 'hermes-ma-validation-custom-'))
    try {
      expect(() => runTaskValidation({
        taskId: 'task-1',
        type: 'custom',
        command: 'echo unsafe',
        worktreePath,
      })).toThrow(/Custom validation commands require approval/)
    } finally {
      rmSync(worktreePath, { recursive: true, force: true })
    }
  })

  it('resolves configured validation commands by type', () => {
    const worktreePath = mkdtempSync(join(tmpdir(), 'hermes-ma-validation-config-'))
    try {
      const result = runTaskValidation({
        taskId: 'task-1',
        type: 'build',
        validationConfig: { build: `${process.execPath} -e "console.log('build ok')"` },
        worktreePath,
        now: () => '2026-05-18T12:00:00.000Z',
        id: () => 'build',
      })

      expect(result.validation.command).toContain('build ok')
      expect(result.validation.status).toBe('passed')
      expect(result.output).toContain('build ok')
    } finally {
      rmSync(worktreePath, { recursive: true, force: true })
    }
  })
})
