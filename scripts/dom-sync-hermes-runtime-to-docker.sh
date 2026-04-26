#!/usr/bin/env bash
set -euo pipefail

MACHINE_HOME="${MACHINE_HOME:-$HOME}"
SOURCE_HOME="${SOURCE_HOME:-$MACHINE_HOME/.hermes}"
WORKSPACE_DIR="${WORKSPACE_DIR:-$MACHINE_HOME/Documents/projects/agent-workspace}"
TARGET_HOME="$WORKSPACE_DIR/.runtime/hermes-data"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
MANIFEST_DIR="$WORKSPACE_DIR/.runtime/manifests"
MANIFEST="$MANIFEST_DIR/seed-$STAMP.txt"

if [[ ! -d "$SOURCE_HOME" ]]; then
  echo "Source Hermes home not found: $SOURCE_HOME" >&2
  exit 1
fi

mkdir -p "$TARGET_HOME" "$MANIFEST_DIR"
chmod 700 "$WORKSPACE_DIR/.runtime" "$TARGET_HOME" "$MANIFEST_DIR"

# Copy runtime state needed for Docker Hermes/Workspace without copying heavy source/service trees.
# Secrets stay under .runtime/, which is gitignored.
rsync -a --delete \
  --exclude 'hermes-agent/' \
  --exclude 'services/' \
  --exclude 'logs/' \
  --exclude 'tmp/' \
  --exclude '.cache/' \
  --exclude 'backups/' \
  --exclude 'archives/' \
  "$SOURCE_HOME"/ "$TARGET_HOME"/

# Container-local Honcho routing: inside Docker, localhost is the Hermes container,
# not the Honcho API container. Rewrite every copied honcho.json, including
# profile-local overrides such as profiles/orcha/honcho.json.
python3 - "$WORKSPACE_DIR" <<'PY'
import json
import sys
from pathlib import Path
workspace = Path(sys.argv[1])
target = workspace / '.runtime' / 'hermes-data'
root_honcho = target / 'honcho.json'
if root_honcho.exists():
    default_data = json.loads(root_honcho.read_text())
else:
    default_data = {
        'enabled': True,
        'workspace': 'hermes',
        'aiPeer': 'hermes',
        'memoryMode': 'hybrid',
        'writeFrequency': 'async',
        'recallMode': 'hybrid',
    }
paths = {root_honcho, *target.glob('profiles/*/honcho.json')}
for honcho_path in sorted(paths):
    if honcho_path.exists():
        data = json.loads(honcho_path.read_text())
    else:
        data = dict(default_data)
    data['baseUrl'] = 'http://honcho-api-1:8000'
    honcho_path.write_text(json.dumps(data, indent=2) + '\n')
PY

# Rewrite migrated machine-home references inside copied runtime state. This includes
# cron context scripts, which often carry absolute state/wiki/project paths.
python3 - "$TARGET_HOME" "$MACHINE_HOME" <<'PY'
import re
import sys
from pathlib import Path
root = Path(sys.argv[1])
machine_home = sys.argv[2].rstrip('/')
projects_root = f'{machine_home}/Documents/projects'
replacements = [
    (re.compile(r'/Users/[^/\s\'"]+/\.hermes'), '/opt/data'),
    (re.compile(r'/Users/[^/\s\'"]+/Documents/(?:projects|GitHub)'), projects_root),
    (re.compile(r'/Users/[^/\s\'"]+/wiki'), f'{machine_home}/wiki'),
    (re.compile(r'/Users/[^/\s\'"]+/\.agents/context'), f'{machine_home}/.agents/context'),
    (re.compile(r'HOME=/Users/[^/\s\'"]+'), f'HOME={machine_home}'),
    (re.compile(r'GH_CONFIG_DIR=/Users/[^/\s\'"]+/\.config/gh'), f'GH_CONFIG_DIR={machine_home}/.config/gh'),
]
for path in root.rglob('*'):
    if not path.is_file():
        continue
    if path.suffix.lower() not in {'.yaml', '.yml', '.json', '.md', '.txt', '.toml', '.env', '.py'} and path.name not in {'config'}:
        continue
    try:
        text = path.read_text()
    except UnicodeDecodeError:
        continue
    new = text
    for pattern, replacement in replacements:
        new = pattern.sub(replacement, new)
    if new != text:
        path.write_text(new)
PY

{
  echo "seeded_at_utc=$STAMP"
  echo "source=$SOURCE_HOME"
  echo "target=$TARGET_HOME"
  echo "excluded=hermes-agent services logs tmp .cache backups archives"
  echo "honcho_base_url=http://honcho-api-1:8000"
  echo "profiles=$(find "$TARGET_HOME/profiles" -mindepth 1 -maxdepth 1 -type d -exec basename {} \; 2>/dev/null | sort | paste -sd, -)"
  echo "files=$(find "$TARGET_HOME" -type f | wc -l | tr -d ' ')"
  echo "bytes=$(du -sk "$TARGET_HOME" | awk '{print $1 * 1024}')"
} > "$MANIFEST"

ln -sf "$(basename "$MANIFEST")" "$MANIFEST_DIR/latest-seed.txt"
echo "Seed complete: $MANIFEST"
