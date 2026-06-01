# Execute Plan: Hermes Rollenmatrix v2

> Purpose: Install a safe role and model-routing policy for Hermes without touching active configs or current Execution Layer work.

## File Map

Create:

- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/GOAL.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/EXECUTE_PLAN.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/ROLE_MATRIX_V2.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/MODEL_ROUTING_POLICY.md`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-rollenmatrix-v2/VALIDATION.md`
- `/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-rollenmatrix-v2-2026-06-01.md`

Do not modify in v1:

- `/Users/zondrius/.hermes/profiles/*/config.yaml`
- `/Users/zondrius/.hermes/profiles/*/SOUL.md`
- `/Users/zondrius/hermes-workspace/src/**`
- `/Users/zondrius/hermes-workspace/handoff/**`
- `/Users/zondrius/.hermes/profiles/neva/cron/jobs.json`

## Task 0: Conflict Guard

- [ ] Confirm current Hermes workspace has active dirty code from Execution Layer work.
- [ ] Confirm `handoff/codex-inbox` is currently empty before prioritising new Handoffs.
- [ ] Confirm no direct profile model config should change in this v1.
- [ ] Confirm this goal writes only new role-policy artifacts and one control report.

Expected result:

```text
Proceed with role-policy-only update. Do not touch active code, profile configs, cronjobs or handoff folders.
```

## Task 1: Source Audit

Read:

- `/Users/zondrius/Documents/New project 6/hermes-agent-bestandsaudit.md`
- `/Users/zondrius/Documents/New project 6/hermes-agent-operating-system.md`
- `/Users/zondrius/hermes-workspace/docs/swarm/ROLES.md`
- `/Users/zondrius/hermes-workspace/docs/swarm/SKILLS.md`
- `/Users/zondrius/hermes-workspace/src/screens/swarm2/swarm2-screen.tsx`
- first six lines of each `/Users/zondrius/.hermes/profiles/*/config.yaml`
- `/Users/zondrius/hermes-workspace/memory/goals/2026-06-01-hermes-execution-layer-v1/VALIDATION.md`

Extract:

- current profiles;
- current Swarm role presets;
- current role preset models;
- current profile default models;
- active conflict risks;
- model mismatches.

## Task 2: Write `ROLE_MATRIX_V2.md`

Create a role matrix with:

- CEO layer;
- Neva Chief-of-Staff layer;
- role modes;
- owning existing profile;
- matching Swarm role preset;
- when to use;
- when not to use;
- output contract;
- review gate;
- model tier.

The matrix must explicitly avoid creating new profiles in v1.

## Task 3: Write `MODEL_ROUTING_POLICY.md`

Create a model policy with:

- current actual defaults;
- target model tiers;
- GPT-5.5 allowed uses;
- GPT-5.5 not allowed uses;
- role-by-role model recommendation;
- exact future config-change gate.

Cost rule:

```text
Use GPT-5.5 only when quality, code correctness, or strategic synthesis meaningfully outweighs cost. Otherwise use GPT-5.4, GPT-5.4-mini, Gemini Flash, Kimi or local models according to task risk.
```

## Task 4: Write Control Report

Create:

`/Users/zondrius/hermes-workspace/reports/hermes-control/hermes-rollenmatrix-v2-2026-06-01.md`

The report must say:

- what was created;
- what was not changed;
- recommended next safe slice;
- which config changes remain gated.

## Task 5: Validation

Create `VALIDATION.md`.

It must include:

- source files read;
- current dirty-work conflict notes;
- current model defaults;
- no-config-change confirmation;
- no-handoff-change confirmation;
- no-cron-change confirmation;
- placeholder scan target;
- recommended next step.

## Future P2: Optional Config Application

Only after Chris explicitly approves:

1. Back up every touched config:

```bash
cp /Users/zondrius/.hermes/profiles/<profile>/config.yaml /Users/zondrius/.hermes/profiles/<profile>/config.yaml.backup-roles-v2-YYYYMMDD-HHMMSS
```

2. Apply only the approved subset:
   - update Swarm role preset defaults if needed;
   - update profile SOUL routing language if needed;
   - update profile config defaults only if a profile is truly a standing worker for that role.

3. Verify with:

```bash
hermes --profile neva mcp list
hermes --profile neva mcp test agentmemory
```

4. Write a report before any further change.

No future P2 step should be performed in this v1.

## Acceptance Gate

- [ ] `GOAL.md` exists.
- [ ] `EXECUTE_PLAN.md` exists.
- [ ] `ROLE_MATRIX_V2.md` exists.
- [ ] `MODEL_ROUTING_POLICY.md` exists.
- [ ] `VALIDATION.md` exists.
- [ ] Hermes control report exists.
- [ ] No existing profile config changed.
- [ ] No existing SOUL changed.
- [ ] No existing Swarm source changed.
- [ ] No handoff changed.
- [ ] No cron changed.
- [ ] GPT-5.5 is restricted to premium/high-value cases.
- [ ] The recommended next slice is review/approval, not automatic mutation.
