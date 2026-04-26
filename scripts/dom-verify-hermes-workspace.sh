#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

MACHINE_HOME=${MACHINE_HOME:-$HOME}
WORKSPACE_DIR=${WORKSPACE_DIR:-$MACHINE_HOME/Documents/projects/agent-workspace}
MACHINE_PROJECTS_DIR=${MACHINE_PROJECTS_DIR:-$MACHINE_HOME/Documents/projects}
MACHINE_WIKI_DIR=${MACHINE_WIKI_DIR:-$MACHINE_HOME/wiki}
MACHINE_CONTEXT_DIR=${MACHINE_CONTEXT_DIR:-$MACHINE_HOME/.agents/context}
CONTAINER_MACHINE_HOME=${CONTAINER_MACHINE_HOME:-$MACHINE_HOME}
CONTAINER_PROJECTS_DIR=${CONTAINER_PROJECTS_DIR:-$MACHINE_PROJECTS_DIR}
CONTAINER_WIKI_DIR=${CONTAINER_WIKI_DIR:-$MACHINE_WIKI_DIR}
CONTAINER_CONTEXT_DIR=${CONTAINER_CONTEXT_DIR:-$MACHINE_CONTEXT_DIR}
export WORKSPACE_DIR CONTAINER_MACHINE_HOME CONTAINER_PROJECTS_DIR CONTAINER_WIKI_DIR CONTAINER_CONTEXT_DIR

COMPOSE=/usr/local/bin/docker-compose
if [[ ! -x "$COMPOSE" ]]; then
  COMPOSE="$(command -v docker-compose || true)"
fi

fail=0
check() {
  local name="$1"; shift
  if "$@" >/tmp/hermes-workspace-check.$$ 2>&1; then
    printf 'OK   %s\n' "$name"
  else
    printf 'FAIL %s\n' "$name"
    sed 's/^/     /' /tmp/hermes-workspace-check.$$ || true
    fail=1
  fi
  rm -f /tmp/hermes-workspace-check.$$
}

check "workspace container list" "$COMPOSE" ps
check "host workspace UI" python3 - <<'PY'
import time, urllib.request
last = None
for _ in range(12):
    try:
        urllib.request.urlopen('http://127.0.0.1:3000', timeout=5).read(100)
        break
    except Exception as exc:
        last = exc
        time.sleep(2)
else:
    raise last
PY
check "host Hermes gateway health" python3 - <<'PY'
import urllib.request
urllib.request.urlopen('http://127.0.0.1:8642/health', timeout=10).read()
PY
check "host Hermes dashboard status" python3 - <<'PY'
import urllib.request
urllib.request.urlopen('http://127.0.0.1:9119/api/status', timeout=10).read()
PY
check "workspace profiles API sees copied runtime" python3 - <<'PY'
import os
import http.cookiejar, json, urllib.request
from pathlib import Path
root = Path(os.environ['WORKSPACE_DIR'])
password = None
for line in (root / '.env').read_text().splitlines():
    if line.startswith('HERMES_PASSWORD='):
        password = line.split('=', 1)[1]
        break
assert password, 'missing HERMES_PASSWORD'
jar = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
req = urllib.request.Request(
    'http://127.0.0.1:3000/api/auth',
    data=json.dumps({'password': password}).encode(),
    headers={'Content-Type': 'application/json'},
    method='POST',
)
opener.open(req, timeout=10).read()
profiles = json.loads(opener.open('http://127.0.0.1:3000/api/profiles/list', timeout=10).read())
names = {p.get('name') for p in profiles.get('profiles', [])}
assert {'orcha', 'pbmono', 'pr-shepherd'} <= names, names
assert profiles.get('activeProfile') == 'orcha', profiles.get('activeProfile')
orcha = next(p for p in profiles['profiles'] if p.get('name') == 'orcha')
assert orcha.get('provider'), orcha
assert orcha.get('skillCount', 0) > 0, orcha
skills = json.loads(opener.open('http://127.0.0.1:3000/api/skills?limit=1', timeout=20).read())
assert skills.get('total', 0) > 0, skills
sessions = json.loads(opener.open('http://127.0.0.1:3000/api/sessions', timeout=20).read())
assert isinstance(sessions.get('sessions'), list), sessions
print('profiles:', ', '.join(sorted(names)))
PY
check "container can reach Honcho" "$COMPOSE" exec -T hermes-agent python3 -c "import urllib.request; urllib.request.urlopen('http://honcho-api-1:8000/health', timeout=10).read()"
check "container sees profiles" "$COMPOSE" exec -T hermes-agent sh -lc 'test -d /opt/data/profiles/orcha && test -d /opt/data/profiles/pr-shepherd && test -d /opt/data/profiles/pbmono'
check "container Honcho config points to Docker Honcho" "$COMPOSE" exec -T hermes-agent python3 - <<'PY'
import json
from pathlib import Path
p = Path('/opt/data/honcho.json')
data = json.loads(p.read_text())
assert data.get('baseUrl') == 'http://honcho-api-1:8000', data.get('baseUrl')
print(data.get('baseUrl'))
PY
check "container Hermes version" "$COMPOSE" exec -T hermes-agent /opt/hermes/.venv/bin/hermes --version
check "container orcha config path" "$COMPOSE" exec -T hermes-agent /opt/hermes/.venv/bin/hermes -p orcha config path
check "container migrated host path mounts" "$COMPOSE" exec -T hermes-agent env CONTAINER_MACHINE_HOME="$CONTAINER_MACHINE_HOME" CONTAINER_PROJECTS_DIR="$CONTAINER_PROJECTS_DIR" CONTAINER_WIKI_DIR="$CONTAINER_WIKI_DIR" CONTAINER_CONTEXT_DIR="$CONTAINER_CONTEXT_DIR" sh -lc 'test -e "$CONTAINER_MACHINE_HOME/.hermes/scripts/github_star_lists_context.py" && test -e "$CONTAINER_MACHINE_HOME/.hermes/scripts/research_grounding_context.py" && test -d "$CONTAINER_PROJECTS_DIR/agentic-orchestration" && test -d "$CONTAINER_WIKI_DIR" && test -d "$CONTAINER_CONTEXT_DIR"'
check "container workflow CLIs as hermes profile user" "$COMPOSE" exec -T --user hermes hermes-agent sh -lc 'HOME=/opt/data/profiles/orcha/home PATH=/opt/data/profiles/orcha/home/.local/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games; export HOME PATH; for c in git gh python3 node npm npx uvx curl jq rg agent cursor-agent; do command -v "$c" >/dev/null || exit 1; done'
check "container Cursor Agent CLI version as hermes profile user" "$COMPOSE" exec -T --user hermes hermes-agent sh -lc 'HOME=/opt/data/profiles/orcha/home PATH=/opt/data/profiles/orcha/home/.local/bin:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games; export HOME PATH; agent --version && cursor-agent --version'
check "container GitHub CLI auth" "$COMPOSE" exec -T hermes-agent env CONTAINER_MACHINE_HOME="$CONTAINER_MACHINE_HOME" sh -lc 'HOME="$CONTAINER_MACHINE_HOME" GH_CONFIG_DIR="$CONTAINER_MACHINE_HOME/.config/gh" gh auth status >/dev/null'

exit "$fail"
