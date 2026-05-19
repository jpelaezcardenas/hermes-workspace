#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MANIFEST_PATH="$REPO_ROOT/prototypes/hermes-cockpit/Cargo.toml"
SOURCE_CATALOG="$REPO_ROOT/docs/hermes-cockpit/projection-sources.json"

SOURCE="control"
SMOKE=0
LIST_SOURCES=0

usage() {
  cat <<'USAGE'
Usage: scripts/start-hermes-cockpit.sh [--source cards|events|control|watchers|approval-queue|claude-sessions|claude-lifecycle] [--smoke] [--list-sources]

Starts the read-only Hermes Cockpit TUI without requiring a cargo manifest path.
Use --smoke to print a deterministic render for CI or quick checks.
USAGE
}

source_path() {
  case "$1" in
    cards) printf '%s\n' "docs/hermes-cockpit/live-kanban-projection.json" ;;
    events) printf '%s\n' "target/hermes-cockpit-m010/hermes-projection.json" ;;
    control) printf '%s\n' "target/hermes-cockpit-m012/control-plane-projection.json" ;;
    watchers) printf '%s\n' "target/hermes-cockpit-m013/watcher-projection.json" ;;
    approval-queue) printf '%s\n' "target/hermes-cockpit-m015/approval-queue-surface-projection.json" ;;
    claude-sessions) printf '%s\n' "target/hermes-cockpit-m018/claude-sessions-projection.json" ;;
    claude-lifecycle) printf '%s\n' "target/hermes-cockpit-m021/claude-lifecycle-projection.json" ;;
    *)
      printf 'Unknown source: %s\n' "$1" >&2
      printf 'Valid sources: cards events control watchers approval-queue claude-sessions claude-lifecycle\n' >&2
      return 2
      ;;
  esac
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --source)
      if [[ $# -lt 2 ]]; then
        printf -- '--source requires one of: cards events control watchers approval-queue claude-sessions claude-lifecycle\n' >&2
        exit 2
      fi
      SOURCE="$2"
      shift 2
      ;;
    --smoke)
      SMOKE=1
      shift
      ;;
    --list-sources)
      LIST_SOURCES=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      printf 'Unknown argument: %s\n' "$1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if [[ $LIST_SOURCES -eq 1 ]]; then
  printf 'Source catalog: %s\n' "$SOURCE_CATALOG"
  printf 'cards    docs/hermes-cockpit/live-kanban-projection.json\n'
  printf 'events   target/hermes-cockpit-m010/hermes-projection.json\n'
  printf 'control  target/hermes-cockpit-m012/control-plane-projection.json\n'
  printf 'watchers target/hermes-cockpit-m013/watcher-projection.json\n'
  printf 'approval-queue target/hermes-cockpit-m015/approval-queue-surface-projection.json\n'
  printf 'claude-sessions target/hermes-cockpit-m018/claude-sessions-projection.json\n'
  printf 'claude-lifecycle target/hermes-cockpit-m021/claude-lifecycle-projection.json\n'
  exit 0
fi

PROJECTION_PATH="$(source_path "$SOURCE")"
if [[ ! -f "$REPO_ROOT/$PROJECTION_PATH" ]]; then
  printf 'Projection source is missing: %s\n' "$REPO_ROOT/$PROJECTION_PATH" >&2
  exit 1
fi

printf 'Starting Hermes Cockpit source=%s path=%s\n' "$SOURCE" "$PROJECTION_PATH" >&2
printf 'Read-only: this launcher only starts or smokes the TUI.\n' >&2

cd "$REPO_ROOT"
if [[ $SMOKE -eq 1 ]]; then
  exec cargo run --manifest-path "$MANIFEST_PATH" -- --smoke "$PROJECTION_PATH"
fi

exec cargo run --manifest-path "$MANIFEST_PATH" -- "$PROJECTION_PATH"
