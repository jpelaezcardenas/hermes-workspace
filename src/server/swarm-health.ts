import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { SwarmRosterWorker } from './swarm-roster'

export type WorkerHealth = {
  workerId: string
  profileFound: boolean
  wrapperFound: boolean
  model: string
  provider: string
  recentAuthErrors: number
  lastErrorAt: string | null
  lastErrorMessage: string | null
}

type WorkerHealthDeps = {
  profilesBase: string
  wrapperBase: string
  exists?: (path: string) => boolean
  readWorkerConfig: (profilePath: string) => { model: string; provider: string }
  scanRecentAuthErrors: (profilePath: string) => {
    count: number
    lastAt: string | null
    lastMessage: string | null
  }
}

export function buildWorkerHealth(worker: Pick<SwarmRosterWorker, 'id' | 'profile' | 'wrapper'>, deps: WorkerHealthDeps): WorkerHealth {
  const exists = deps.exists ?? existsSync
  const id = worker.id
  const profileId = worker.profile || id
  const wrapperId = worker.wrapper || id
  const profilePath = join(deps.profilesBase, profileId)
  const wrapperPath = join(deps.wrapperBase, wrapperId)
  const config = deps.readWorkerConfig(profilePath)
  const errs = deps.scanRecentAuthErrors(profilePath)

  return {
    workerId: id,
    profileFound: exists(profilePath),
    wrapperFound: exists(wrapperPath),
    model: config.model,
    provider: config.provider,
    recentAuthErrors: errs.count,
    lastErrorAt: errs.lastAt,
    lastErrorMessage: errs.lastMessage,
  }
}
