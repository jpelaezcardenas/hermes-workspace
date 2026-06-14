# Code Context Tool Comparison Rubric — 2026-05-25

STATE: READY_FOR_FUTURE_SANDBOX
SCOPE: Public-sandbox evaluation rubric only; no installs, no private repos, no production integration.
CANDIDATES: `Lum1104/Understand-Anything` versus existing `codegraph` / Hermes `codegraph-codebase-map` practice.

## 1. Purpose

This rubric defines how to compare a future `Understand-Anything` public sandbox against the current Hermes/codegraph codebase-map workflow.

The comparison is not about which tool has the better visual graph. It is about whether a tool measurably improves Codex/Hermes handoffs: smaller context, fewer wrong assumptions, faster entry-point discovery, safer execution boundaries, and clearer next actions.

Grounding sources used for this rubric:
- `/Users/zondrius/hermes-workspace/reports/hermes-future-capability-radar-2026-05-25.md`
- `/Users/zondrius/hermes-workspace/reports/github-rising-2026-05-25.md`
- Hermes skill: `codegraph-codebase-map`

## 2. Hard safety boundary

Allowed in a future sandbox only after separate approval:
- public toy repository or freshly generated synthetic repo;
- local, disposable sandbox folder;
- no credentials, no `.env`, no browser cookies, no accounts;
- no private Hermes, Lernwerkstatt, LeseWerk, school, VdS, or personal repos;
- no global install, no shell profile edits, no writes outside the sandbox;
- network behavior documented if execution is approved later.

This task did not install or execute either candidate tool.

## 3. Measurable criteria

Score each criterion from 0 to 3 for each approach.

0 = fails or unusable
1 = partially useful but incomplete or risky
2 = usable and comparable to current practice
3 = clearly better than current practice with evidence

| # | Criterion | Measurement method | Pass threshold |
|---|---|---|---|
| 1 | Entry-point discovery | Given 3 task prompts, identify the likely start files/functions. Compare against a manually prepared answer key. | At least 2/3 prompts identify the correct primary entry point without extra misleading files. |
| 2 | Dependency/path explanation | For one feature path, list upstream inputs, core functions/components, and downstream outputs. | Covers the main path with no critical invented dependency. |
| 3 | Handoff compactness | Count words and file references in the generated context/handoff for the same task. | Same or fewer irrelevant files than baseline, while preserving required files. |
| 4 | Actionability for Codex/Hermes | A receiving agent must answer: “What file should I open first, what change is likely minimal, what should I test?” | All three answers are explicit and defensible from the context. |
| 5 | Error/assumption rate | Compare tool output to the answer key and count false claims: nonexistent files, wrong call paths, invented APIs. | Zero critical false claims; at most one minor ambiguity. |
| 6 | Reproducibility and auditability | Commands, inputs, outputs, versions, and generated artifacts can be recorded in a short report. | Another worker can repeat the same toy test from the report without guessing. |
| 7 | Safety and containment | Review whether the workflow needs global install, credentials, private paths, external upload, or persistent daemons. | No credentials/private paths; no uncontrolled writes; no unapproved external code upload. |
| 8 | Net workflow cost | Measure setup time, commands/tool calls, and cleanup burden. | Adds less than 10 minutes over baseline, or saves enough search/debug time to justify the added step. |

Recommended weighting:
- Safety and containment is a gate, not just a score. If criterion 7 fails, the tool fails the sandbox regardless of other scores.
- For a tool to beat current practice, it should score at least 2 on every non-gate criterion and score 3 on at least two handoff-quality criteria among #1, #2, #4, and #5.

## 4. Toy-repo test design

Use a tiny synthetic repository created specifically for this evaluation. Do not use a private existing project.

Suggested repo shape:

```text
sandbox-toy-codebase/
  package.json
  README.md
  src/
    app.ts
    routes/
      tasks.ts
    services/
      taskService.ts
      scoringService.ts
    storage/
      memoryStore.ts
    ui/
      TaskList.tsx
      TaskEditor.tsx
  tests/
    taskService.test.ts
    scoringService.test.ts
```

The toy repo should contain three intentionally traceable flows:

1. Create-task flow
- `src/routes/tasks.ts` receives a request.
- `src/services/taskService.ts` validates and stores it.
- `src/storage/memoryStore.ts` persists it in memory.
- `src/ui/TaskList.tsx` renders the result.

2. Scoring flow
- `src/services/scoringService.ts` computes a simple score from task completion state.
- `tests/scoringService.test.ts` verifies edge cases.

3. UI edit flow
- `src/ui/TaskEditor.tsx` changes a title.
- `taskService.ts` applies a validation rule.
- `TaskList.tsx` shows the changed title.

Prepare a small answer key before running any tool:

```text
Prompt A: Where does create-task start, and what files matter?
Expected: routes/tasks.ts -> services/taskService.ts -> storage/memoryStore.ts -> ui/TaskList.tsx.

Prompt B: If scoring is wrong for completed tasks, where should an agent inspect first?
Expected: services/scoringService.ts and tests/scoringService.test.ts first; taskService.ts only if completion state is malformed.

Prompt C: What is the minimal change path for editing a task title in the UI?
Expected: ui/TaskEditor.tsx for input event, services/taskService.ts for validation, ui/TaskList.tsx for display verification.
```

Run order for a future approved sandbox:

1. Baseline manual/Hermes run
- Use normal `search_files`, `read_file`, and hand-written codebase-map practice.
- Produce a short handoff for prompts A-C.
- Record commands/tool calls, elapsed time, files inspected, and false assumptions.

2. Existing codegraph/Hermes practice
- Use the guarded `codegraph-codebase-map` skill only if approved for the public toy repo.
- Produce the same handoff shape for prompts A-C.
- Record version, commands, output artifact paths, elapsed time, and risks.

3. Understand-Anything sandbox
- Only after its separate RiskGate/source review passes.
- Use the same toy repo and prompts.
- Record install/execution boundary, output artifact paths, elapsed time, network observations, and risks.

4. Blind receiving-agent check
- Give each generated handoff to a fresh Codex/Hermes worker or a separate session.
- Ask it to answer, without additional exploration: first file to open, likely minimal change, tests/checks to run, and known risks.
- Compare answers to the answer key.

## 5. Stop criteria

Stop the evaluation immediately if any candidate:

- requires tokens, OAuth, browser cookies, account login, or private GitHub access;
- tries to read home directories, IDE state, `~/.claude*`, Hermes memory, `.env`, SSH keys, browser profiles, or private repos;
- writes globally, edits shell startup files, installs daemons, or changes Hermes configuration;
- uploads source code or generated context externally without explicit approval;
- cannot run on the synthetic public toy repo;
- produces output that cannot be audited or reproduced;
- invents critical code paths, files, APIs, or dependencies;
- adds complexity without improving at least one handoff-quality metric.

If a stop criterion triggers, classify the candidate as `block` or `watch`, document the reason, and do not retry with broader permissions in the same run.

## 6. How to judge whether Codex/Hermes handoffs improve

A handoff improves only if it changes downstream work in a measurable way.

Use this receiving-agent checklist for each prompt:

```text
HANDOFF_ID:
TOOL_USED:
PROMPT:
FIRST_FILE_TO_OPEN:
MINIMAL_CHANGE_PATH:
FILES_TO_IGNORE_FOR_NOW:
TESTS_OR_CHECKS:
ASSUMPTIONS/RISKS:
CONFIDENCE_0_TO_3:
```

Compare baseline versus candidate on these outcomes:

1. Search reduction
- Did the receiving agent need fewer follow-up file reads or searches before identifying the right files?

2. Better first action
- Did it open the right first file more often?

3. Fewer hallucinations
- Did it avoid nonexistent files, wrong imports, and invented APIs?

4. Smaller but sufficient context
- Was the context shorter without dropping required files or edge cases?

5. Clearer test plan
- Did it name concrete tests/checks tied to the changed path?

6. Safer boundaries
- Did it preserve the no-private-data/no-global-install/no-token boundary?

Decision rule:

```text
ADOPT_AS_SKILL_CANDIDATE:
  Safety gate passed.
  AND total score improves by >= 20% over manual baseline.
  AND at least two handoff-quality criteria improve.
  AND no critical hallucinations.
  AND setup/cleanup overhead is acceptable for repeated use.

KEEP_AS_WATCH:
  Safety gate passed, but improvement is marginal or only visual.

BLOCK_OR_QUARANTINE:
  Safety gate fails, critical hallucinations occur, or private/global access is required.
```

## 7. Minimal report template for the future sandbox

```text
STATE:
DATE:
SANDBOX_PATH:
TOY_REPO_COMMIT_OR_ARCHIVE:
TOOLS_COMPARED:
VERSIONS:
COMMANDS_RUN:
NETWORK_OBSERVATIONS:
ARTIFACTS:
SCORES:
  manual_baseline:
  codegraph_practice:
  understand_anything:
HANDOFF_CHECK_RESULTS:
STOP_CRITERIA_TRIGGERED:
DECISION:
NEXT_ACTION:
```

## 8. Recommended next action

Do not run a tool comparison yet. First finish the separate Understand-Anything RiskGate/source review. If it passes, create or reuse the synthetic toy repo above and run this rubric in a disposable public-sandbox folder.
