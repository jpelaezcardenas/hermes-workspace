# Agent / Skill / Tool / Plugin Alignment Health

Use this SOP when changing semantic agents, `swarm.yaml`, profile wrappers, toolsets, plugin toolsets, or Workspace Swarm health surfaces.

## Invariants

- `swarm.yaml` is the Workspace roster source for semantic workers.
- Each worker should have a matching Hermes profile under `~/.hermes/profiles/<profile>`.
- Each worker should have a profile-local `<agent>-core` skill.
- `tools` in `swarm.yaml` should match profile `toolsets` and `platform_toolsets.cli`.
- `pluginToolsets` in `swarm.yaml` should match profile `known_plugin_toolsets.cli`.
- `plugins: []` and `pluginToolsets: []` means no accidental plugin enablement.
- `wrapper` is authoritative for executable health. Do not assume wrapper executable names equal worker ids.

Examples where `worker.id` and `worker.wrapper` intentionally differ:

- `builder` -> `builder:task`
- `reviewer` -> `reviewer:gate`
- `qa` -> `qa:verify`
- `ops-watch` -> `ops:health`
- `inbox-triage` -> `inbox:triage`

Health code should derive:

- `profilePath` from `worker.profile || worker.id`
- `wrapperPath` from `worker.wrapper || worker.id`

## Quick local metadata check

```bash
cd /home/aleks/src/hermes-workspace
python3 - <<'PY'
from pathlib import Path
import yaml, subprocess
root = Path('.').resolve()
roster = yaml.safe_load((root / 'swarm.yaml').read_text())
workers = roster.get('workers', [])
print('workers', len(workers))
for w in workers:
    wid = w['id']
    profile = w.get('profile') or wid
    wrapper = w.get('wrapper') or wid
    pdir = Path.home() / '.hermes' / 'profiles' / profile
    wpath = Path.home() / '.local' / 'bin' / wrapper
    cfg = yaml.safe_load((pdir / 'config.yaml').read_text()) if (pdir / 'config.yaml').exists() else {}
    print(wid, {
        'profile': pdir.exists(),
        'soul': (pdir / 'SOUL.md').exists(),
        'core_skill': (pdir / 'skills' / f'{wid}-core' / 'SKILL.md').exists(),
        'wrapper': wpath.exists(),
        'tools_match': sorted(w.get('tools', [])) == sorted(cfg.get('toolsets', [])) == sorted(cfg.get('platform_toolsets', {}).get('cli', [])),
        'plugin_toolsets_match': sorted(w.get('pluginToolsets', [])) == sorted(cfg.get('known_plugin_toolsets', {}).get('cli', [])),
    })
PY
```

## API health smoke

Start Workspace, then verify:

```bash
cd /home/aleks/src/hermes-workspace
pnpm dev
```

In another shell:

```bash
python3 - <<'PY'
import json, urllib.request
base = 'http://127.0.0.1:3000'
with urllib.request.urlopen(base + '/api/swarm-roster', timeout=20) as r:
    roster = json.load(r)
workers = roster['roster']['workers']
assert len(workers) >= 10, len(workers)
with urllib.request.urlopen(base + '/api/swarm-health', timeout=20) as r:
    health = json.load(r)
summary = health['summary']
assert summary['totalWorkers'] == len(workers), summary
assert summary['wrappersConfigured'] == summary['totalWorkers'], summary
assert all(w['wrapperFound'] for w in health['workers']), health['workers']
print('SWARM_ALIGNMENT_HEALTH_OK', summary)
PY
```

## Browser smoke

- Open `/swarm`.
- Confirm all semantic workers render.
- Confirm no browser console errors.
- Confirm the health API reports all wrappers configured.

## Durable dispatch discipline

Use Swarm/Kanban/Profile dispatch for durable named-role work: profile state, dependencies, retries, logs, audit trail, or cross-turn execution. Use short synchronous subagents for generic bounded subtasks. Let root/default Hermes execute small, obvious, low-risk work directly when it can verify quickly.

Before dispatch, split only genuinely independent lanes and link real dependencies. During execution, checkpoint after meaningful batches or blockers, avoid silent polling, and use one deliberate expensive review gate by default unless deeper review is explicitly approved. If a worker stalls, inspect logs/status, reclaim or retry, reassign, narrow scope, or block with the exact decision needed; do not silently absorb another worker's role into root context.

## Regression test expectation

The route-level health behavior should be protected by a focused test proving that semantic wrapper names are respected. A worker with `id: builder` and `wrapper: builder:task` must report `wrapperFound: true` when `/bin/builder:task` exists, even though `/bin/builder` does not.
