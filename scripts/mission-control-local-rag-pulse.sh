#!/usr/bin/env bash
set -euo pipefail

QUERY="${1:-Hermes homelab current services workspace gateway dashboard}"
LOCAL_RAG_BIN="${LOCAL_RAG_BIN:-local-rag}"

run_capture() {
  local label="$1"
  shift
  local output=""
  local status=0

  if ! output="$("$@" 2>&1)"; then
    status=$?
  fi

  printf '## %s\n' "$label"
  printf 'Command: '
  printf '%q ' "$@"
  printf '\n'

  if [[ $status -ne 0 ]]; then
    printf 'Status: failed (%s)\n' "$status"
    printf '%s\n\n' "$output"
    return 0
  fi

  if [[ -z "${output//[[:space:]]/}" ]]; then
    printf 'Status: no matches / no output\n\n'
    return 1
  fi

  printf '%s\n\n' "$output"
  return 0
}

printf '# Mission Control local-rag pulse\n'
printf 'Query: %s\n\n' "$QUERY"

had_output=0

if run_capture "llmwiki collection" "$LOCAL_RAG_BIN" query "$QUERY" --collection llmwiki -k 5; then
  had_output=1
fi

# If llmwiki has no answer, broaden automatically so the dashboard never shows
# the unhelpful "command completed with no output" for valid local-rag queries.
if [[ $had_output -eq 0 ]]; then
  if run_capture "all document collections fallback" "$LOCAL_RAG_BIN" query "$QUERY" -k 5; then
    had_output=1
  fi
  if run_capture "memory recall fallback" "$LOCAL_RAG_BIN" recall "$QUERY" -k 3; then
    had_output=1
  fi
  if run_capture "session-history fallback" "$LOCAL_RAG_BIN" sessions "$QUERY" -k 3; then
    had_output=1
  fi
fi

if [[ $had_output -eq 0 ]]; then
  printf 'No local-rag matches were found for this query in llmwiki, all document collections, memories, or session history.\n'
  printf 'Try a broader query, e.g. "Hermes Workspace Mission Control", "Hermes gateway", or "homelab current state".\n'
fi
