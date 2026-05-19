import { describe, expect, it } from 'vitest'
import { DEFAULT_SWARM_AGENT_TEAM, fallbackRoster } from './swarm-roster'

describe('default Swarm agent team', () => {
  it('defines the final 15 specialized Hermes roles in order', () => {
    expect(DEFAULT_SWARM_AGENT_TEAM.map((agent) => agent.role)).toEqual([
      'CTO / Conductor',
      'Product Manager',
      'Architect',
      'Backend Coder',
      'ML Coder',
      'Frontend Coder',
      'Integration Agent',
      'QA Tester',
      'DevOps',
      'Reviewer',
      'Memory / Knowledge',
      'Research',
      'Designer / OpenDesign',
      'CyberSecurity',
      'Data Analyst',
    ])
  })

  it('uses practical specialist names instead of legacy abstract names', () => {
    const names = DEFAULT_SWARM_AGENT_TEAM.map((agent) => agent.name)
    expect(names).toContain('Conductor')
    expect(names).toContain('Backend')
    expect(names).toContain('Security')
    expect(names).not.toContain('Overflow')
    expect(names).not.toContain('Mirror')
  })

  it('uses the specialist team for missing swarm worker fallback metadata', () => {
    const roster = fallbackRoster(['swarm1', 'swarm3', 'swarm15'])

    expect(roster.workers).toMatchObject([
      {
        id: 'swarm1',
        name: 'Conductor',
        role: 'CTO / Conductor',
      },
      {
        id: 'swarm3',
        name: 'Architect',
        role: 'Architect',
      },
      {
        id: 'swarm15',
        name: 'Data Analyst',
        role: 'Data Analyst',
      },
    ])
  })
})
