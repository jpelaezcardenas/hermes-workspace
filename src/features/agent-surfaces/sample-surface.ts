import type { AgentSurface } from './types'

export function createSampleAgentSurface(now = new Date()): AgentSurface {
  return {
    schema: 'hermes.agent_surface.v1',
    id: 'ai-learning-review-pilot',
    title: 'AI Learning Review Surface',
    description:
      'A first reusable surface contract for turning dense agent output into decision cards, approval actions, evidence, checklists, and status items.',
    generatedAt: now.toISOString(),
    source: {
      agent: 'AI Dev Guru',
      workflow: 'AI Learning Review',
      profile: 'ai-dev',
    },
    blocks: [
      {
        type: 'status_item',
        id: 'surface-contract',
        label: 'Surface contract',
        value: 'v1 ready',
        tone: 'success',
        detail:
          'Agents can emit the same JSON shape and Workspace can render it without bespoke UI for every workflow.',
      },
      {
        type: 'decision_card',
        id: 'pilot-ai-learning',
        title: 'Use AI Learning as the first generative UI pilot',
        recommendation:
          'Render weekly AI Learning as an interactive review board before wiring higher-risk workflows.',
        why: 'It is dense, recurring, low-risk, teachable, and already fits Tim’s HTML artifact pattern.',
        owner: 'AI Dev Guru',
        priority: 'P1',
        risk: 'Low',
        status: 'Proposed',
        actions: [
          {
            id: 'approve-pilot',
            label: 'Approve pilot',
            kind: 'approve',
            description:
              'Authorize wiring a real AI Learning run into this surface contract.',
            requiresApproval: true,
          },
          {
            id: 'hold-pilot',
            label: 'Hold',
            kind: 'hold',
            description:
              'Keep the renderer available but do not connect live workflows yet.',
          },
        ],
      },
      {
        type: 'approval_action',
        id: 'next-wire-ai-learning',
        title: 'Next implementation gate',
        prompt:
          'Wire the next AI Learning output to emit hermes.agent_surface.v1 JSON alongside the Telegram summary.',
        approvalNote:
          'This is intentionally approval-gated because it changes workflow output shape, not because it sends public content.',
        actions: [
          {
            id: 'draft-integration-plan',
            label: 'Draft integration plan',
            kind: 'draft',
            description:
              'Prepare the exact files and cron prompt changes for review.',
          },
          {
            id: 'run-sample-only',
            label: 'Run sample only',
            kind: 'run',
            description:
              'Keep using mock/sample data until the contract is reviewed.',
          },
        ],
      },
      {
        type: 'checklist',
        id: 'surface-rules',
        title: 'Renderer rules',
        items: [
          {
            id: 'fixed-contract',
            label: 'Use one stable JSON contract for the long tail',
            done: true,
            detail: 'This is the declarative pattern from the article.',
          },
          {
            id: 'controlled-top-flows',
            label: 'Upgrade top workflows to controlled components later',
            done: false,
            detail:
              'Executive approvals and finance exceptions deserve exact components.',
          },
          {
            id: 'no-open-default',
            label: 'Do not use raw model-generated HTML as the default',
            done: true,
            detail:
              'Open-ended HTML is useful only for disposable visualizations.',
          },
        ],
      },
      {
        type: 'evidence_link',
        id: 'source-x-article',
        title: 'Source idea: Generative UI Is the New Frontend',
        url: 'https://x.com/Saboo_Shubham_/status/2062220865643982875',
        source: 'X Article by Shubham Saboo',
        excerpt:
          'Controlled for exact flows. Declarative for the long tail. Open-ended for disposable visualizations.',
        confidence: 'verified',
      },
    ],
  }
}
