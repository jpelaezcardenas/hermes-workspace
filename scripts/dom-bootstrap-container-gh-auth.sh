#!/usr/bin/env bash
set -euo pipefail

# Bootstrap GitHub CLI auth inside the Docker Hermes runtime from the host gh
# keyring. This writes a token into the Docker runtime only; it does not commit
# anything and it does not print the token.

MACHINE_HOME=${MACHINE_HOME:-$HOME}
WORKSPACE_DIR=${WORKSPACE_DIR:-$MACHINE_HOME/Documents/projects/agent-workspace}
COMPOSE=${COMPOSE:-/usr/local/bin/docker-compose}
GH_CONFIG_DIR_HOST=${GH_CONFIG_DIR_HOST:-$MACHINE_HOME/.config/gh}
CONTAINER_MACHINE_HOME=${CONTAINER_MACHINE_HOME:-$MACHINE_HOME}
RUNTIME_GH_DIR="$WORKSPACE_DIR/.runtime/hermes-data/container-gh-config"

mkdir -p "$RUNTIME_GH_DIR"
chmod 700 "$RUNTIME_GH_DIR"

TOKEN=$(HOME="$MACHINE_HOME" GH_CONFIG_DIR="$GH_CONFIG_DIR_HOST" gh auth token)
if [ -z "$TOKEN" ]; then
  echo "Host gh auth token is empty; run gh auth login on the host first." >&2
  exit 2
fi

cd "$WORKSPACE_DIR"
printf '%s' "$TOKEN" | "$COMPOSE" exec -T hermes-agent env CONTAINER_MACHINE_HOME="$CONTAINER_MACHINE_HOME" sh -lc '
  set -e
  mkdir -p "$CONTAINER_MACHINE_HOME/.config/gh"
  chmod 700 "$CONTAINER_MACHINE_HOME/.config/gh"
  HOME="$CONTAINER_MACHINE_HOME" GH_CONFIG_DIR="$CONTAINER_MACHINE_HOME/.config/gh" gh auth login --hostname github.com --with-token >/dev/null
  HOME="$CONTAINER_MACHINE_HOME" GH_CONFIG_DIR="$CONTAINER_MACHINE_HOME/.config/gh" gh auth status >/dev/null
'

echo "Docker Hermes GitHub CLI auth is configured in $RUNTIME_GH_DIR"
