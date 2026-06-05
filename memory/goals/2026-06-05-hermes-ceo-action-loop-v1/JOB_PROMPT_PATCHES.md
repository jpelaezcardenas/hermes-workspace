# Job Prompt Patches: Hermes CEO Action Loop v1

Status: ready for approved execution
Date: 2026-06-05

These patches are intended to be appended to existing live prompts. They do not replace the base job logic.

## Patch 1: BUSINESS_IDEA_FIREWORK_DAILY

```text

Update 2026-06-05 - CEO Action Loop v1:
After selecting the Winner of the Day, add this required section:

## Follow-Up Classification
- Type: CODEX_HANDOFF_READY / HUMAN_TEST_ONLY / REVIEW_ONLY / IDEA_ONLY
- Why:
- Safe for Codex: yes/no
- Mini execute prompt:
- Handoff risk:

Classification rules:
- Use CODEX_HANDOFF_READY only if the winner's next action is one small local artifact, one markdown/report/doc slice, or one prompt/validation slice that can be done without Chris approval.
- Use HUMAN_TEST_ONLY when the next step must happen in a classroom, with a real adult, with a real user, or outside the workspace.
- Use REVIEW_ONLY when Chris must decide scope, money, publication, external account use, provider setup, legal/financial meaning, or product positioning first.
- Use IDEA_ONLY when the idea is interesting but not actionable today.

Safe for Codex requires all of these:
- no real student, parent, diagnosis, health, photo or private school data;
- no external sends, publishing, purchases, accounts, provider setup or scraping;
- no paid data provider;
- no trades, investment advice, buy/sell/hold language, broker workflow or real-money action;
- no installs;
- no commit, push or deploy as part of the handoff;
- no broad app/platform/shop/company build;
- no edits to active app code unless the report explicitly narrows the task to a safe one-file/report artifact.

Mini execute prompt:
- If Type is CODEX_HANDOFF_READY, write one copyable prompt that starts with:
  `/goal`
- Keep it narrow enough for Codex to complete locally.
- Include target files, acceptance criteria and Nicht tun.
- If Type is not CODEX_HANDOFF_READY, write `keiner`.

Decision Inbox:
- If Type is CODEX_HANDOFF_READY, `SOFORT_MACHEN` may name the small local artifact.
- If Type is HUMAN_TEST_ONLY, `SOFORT_MACHEN` may be a real-world test, but Handoff Scout must not turn it into code.
- If Type is REVIEW_ONLY or IDEA_ONLY, `SOFORT_MACHEN` should usually be `nichts`.
```

## Patch 2: CODEX_HANDOFF_SCOUT_DAILY

```text

Update 2026-06-05 - Business Idea winner routing:
Also read the latest report in:
- /Users/zondrius/hermes-workspace/reports/business-ideas/

Business Idea winners may become Codex handoffs only if all are true:
1. The latest Business Ideas report contains `Type: CODEX_HANDOFF_READY`.
2. It contains `Safe for Codex: yes`.
3. The Mini execute prompt is concrete and starts with `/goal`.
4. The action is one small local artifact or one report/doc/prompt/validation slice.
5. There are fewer than 3 open inbox handoffs.
6. There is no similar open handoff in /Users/zondrius/hermes-workspace/handoff/codex-inbox/.
7. It does not require Chris approval first.
8. It does not involve external sends, publishing, purchases, installs, commits, pushes, deploys, secrets, real student data, diagnosis data, trades, broker actions, paid providers or broad platform/app builds.

If a Business Idea winner is CODEX_HANDOFF_READY and passes all gates:
- It may compete with other Decision Inbox candidates.
- Create at most one handoff total for the run.
- Prefer it when it is the clearest Green, local, high-value next action.

If the latest winner is HUMAN_TEST_ONLY, REVIEW_ONLY or IDEA_ONLY:
- Do not create a handoff from it.
- Say why in the scout report.
```

## Patch 3: AI_STOCK_RADAR_DAILY

```text

Update 2026-06-05 - CEO Delta Discipline:
Add this required section to the report:

## Neu Gegenueber Gestern
- New candidate:
- Upgraded:
- Downgraded:
- Same blocker:
- Removed / archived:
- CEO interpretation:

Rules:
- Compare against the previous available AI Stock Radar report.
- If GMEX, NBIS, DUKR or other repeated candidates are unchanged, say `unchanged`.
- If `free_price_data_unavailable` is still the main blocker, say it once as `Same blocker: free_price_data_unavailable`.
- Do not repeat the same blocker as if it is a new finding.
- No candidate may move to Deep Dive without new source evidence and stronger confirmation.
- Price/volume gaps must cap confidence.
- No trading action is ever SOFORT_MACHEN.
- No buy/sell/hold language.
- No paid data provider, broker, options, leverage, margin or real-money workflow without explicit Chris approval.

Decision Inbox:
- `SOFORT_MACHEN` must be `nichts` unless the action is a safe research-only local review.
- Price-provider decisions belong in `CHRIS_ENTSCHEIDET`.
- Repeated unchanged candidates belong in `BEOBACHTEN`, not `SOFORT_MACHEN`.
```

## Patch 4: HERMES_CONTROL_DAILY

```text

Update 2026-06-05 - CEO One Move:
Add this required section near the top of the main report:

## CEO One Move
If Chris has only 20 minutes today:
- Do:
- Why:
- Source:
- Do not:

Rules:
- Choose exactly one action.
- prefer concrete Green education/product/material action over Yellow research repetition.
- Prefer a small local artifact, classroom/material simplification, review, or handoff-ready slice.
- never choose trades, buy/sell/hold action, broker workflow, paid provider setup, external publishing, account action, broad app build, installs, commits, pushes, deletes or sensitive-data work.
- If the best action is a Business Idea winner with Type CODEX_HANDOFF_READY, say whether Handoff Scout should route it.
- If there is no genuinely useful action, write `Do: nichts`.

Decision Inbox:
- `SOFORT_MACHEN` must match or be narrower than CEO One Move.
- Keep `SOFORT_MACHEN` to at most one action.
- Put all money/provider/publishing/external decisions in `CHRIS_ENTSCHEIDET`.
```
