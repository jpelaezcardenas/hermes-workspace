import { describe, expect, it } from 'vitest'
import {
  buildAssignedTasksUrl,
  buildSwarm2TaskQueueQueryKey,
  withWorkerTaskProjectId,
} from './swarm2-task-queue'

describe('Swarm2 task queue project scoping', () => {
  it('scopes assigned-task query keys by worker and active project', () => {
    expect(buildSwarm2TaskQueueQueryKey('swarm4', ' solarbot ')).toEqual([
      'swarm2',
      'tasks',
      'swarm4',
      'solarbot',
    ])
    expect(buildSwarm2TaskQueueQueryKey('swarm4', null)).toEqual([
      'swarm2',
      'tasks',
      'swarm4',
      'default',
    ])
  })

  it('adds projectId to assigned task URLs only when explicitly present', () => {
    expect(buildAssignedTasksUrl('swarm4', 'solarbot')).toBe(
      '/api/claude-tasks?assignee=swarm4&include_done=true&projectId=solarbot',
    )
    expect(buildAssignedTasksUrl('swarm4', null)).toBe(
      '/api/claude-tasks?assignee=swarm4&include_done=true',
    )
  })

  it('injects projectId into worker task create bodies without mutating input', () => {
    const input = { title: 'Route scoped cards', description: 'keep boards isolated' }

    expect(withWorkerTaskProjectId(input, 'solarbot')).toEqual({
      title: 'Route scoped cards',
      description: 'keep boards isolated',
      projectId: 'solarbot',
    })
    expect(input).toEqual({
      title: 'Route scoped cards',
      description: 'keep boards isolated',
    })
    expect(withWorkerTaskProjectId(input, '')).toEqual(input)
  })
})
