import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const originalEnv = { ...process.env }
let tempRoot = ''

beforeEach(async () => {
  vi.resetModules()
  tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hermes-project-catalog-'))
  process.env = { ...originalEnv }
  process.env.HERMES_PROJECTS_ROOT = path.join(tempRoot, 'projects')
  process.env.HERMES_PROJECTS_MD = path.join(tempRoot, 'PROJECTS.md')
  await fs.mkdir(process.env.HERMES_PROJECTS_ROOT, { recursive: true })
})

afterEach(async () => {
  process.env = { ...originalEnv }
  await fs.rm(tempRoot, { recursive: true, force: true })
})

describe('project catalog', () => {
  it('parses Kaan PROJECTS.md tables into safe project entries', async () => {
    await fs.mkdir(path.join(process.env.HERMES_PROJECTS_ROOT!, 'solarbot'), { recursive: true })
    await fs.writeFile(
      process.env.HERMES_PROJECTS_MD!,
      `# Proje İndeksi

## Aktif Projeler

| Klasör | Açıklama | Dil/Platform | GitHub |
|--------|----------|-------------|--------|
| \`solarbot\` | Solar bot projesi | Python | kaankirsan/solarbot |
| \`dokamuh\` | WordPress sitesi | WordPress | kaankirsan/dokamuh |

## Test / Deneme

| Klasör | Açıklama | GitHub |
|--------|----------|--------|
| \`starter-workspace\` | İlk deneme alanı | kaankirsan/starter-workspace |
`,
      'utf-8',
    )

    const { loadProjectCatalog, projectSlugForPath } = await import('./project-catalog')
    const projects = await loadProjectCatalog()

    expect(projects.map((project) => project.slug)).toEqual([
      'solarbot',
      'dokamuh',
      'starter-workspace',
    ])
    expect(projects[0]).toMatchObject({
      folder: 'solarbot',
      description: 'Solar bot projesi',
      language: 'Python',
      github: 'kaankirsan/solarbot',
      exists: true,
      section: 'active',
    })
    expect(projects[1]).toMatchObject({ exists: false, section: 'active' })
    expect(projects[2]).toMatchObject({ section: 'test' })
    expect(projectSlugForPath(path.join(process.env.HERMES_PROJECTS_ROOT!, 'solarbot'), projects)).toBe('solarbot')
  })

  it('ignores unsafe folder cells instead of resolving outside project root', async () => {
    await fs.writeFile(
      process.env.HERMES_PROJECTS_MD!,
      `# Projeler

| Klasör | Açıklama | Dil/Platform | GitHub |
|--------|----------|-------------|--------|
| \`../secret\` | bad | n/a | bad/repo |
| \`safe-project\` | ok | TypeScript | kaankirsan/safe-project |
`,
      'utf-8',
    )

    const { loadProjectCatalog } = await import('./project-catalog')
    const projects = await loadProjectCatalog()

    expect(projects).toHaveLength(1)
    expect(projects[0]).toMatchObject({ slug: 'safe-project', folder: 'safe-project' })
    expect(projects[0].path).toBe(path.join(process.env.HERMES_PROJECTS_ROOT!, 'safe-project'))
  })
})
