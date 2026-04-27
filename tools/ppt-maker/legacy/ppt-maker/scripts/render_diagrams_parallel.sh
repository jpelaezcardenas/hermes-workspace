#!/usr/bin/env bash
# render_diagrams_parallel.sh
# Renders a directory of .mmd files to PNG in parallel.
# Goes directly .mmd → PNG (skips the SVG intermediate for speed).
# Optionally also produces SVG as a source artifact.
#
# Usage:
#   ./scripts/render_diagrams_parallel.sh <mmd-dir> [output-dir] [options]
#
# Arguments:
#   mmd-dir     Directory containing .mmd source files (required)
#   output-dir  Output directory for PNG (and optionally SVG) files
#               Defaults to: output/diagrams/
#
# Options:
#   --svg       Also produce SVG alongside PNG (source artifact)
#   --scale N   mmdc -s scale factor (default: 3, ~216 DPI effective)
#   --bg COLOR  Background colour (default: transparent)
#   --jobs N    Max concurrent renders (default: 4)
#   --pattern P Glob pattern to filter .mmd files (default: *.mmd)
#   --help      Show this help
#
# Examples:
#   # Render all NBE diagrams to output/diagrams/ (PNG only, 4-parallel):
#   ./scripts/render_diagrams_parallel.sh workflow/appendix-diagrams/ --pattern "nbe-*.mmd"
#
#   # Render all diagrams, also produce SVG source artifacts:
#   ./scripts/render_diagrams_parallel.sh workflow/appendix-diagrams/ output/diagrams/ --svg
#
#   # Render with 2-parallel (lower memory, safer on low-RAM machines):
#   ./scripts/render_diagrams_parallel.sh workflow/appendix-diagrams/ --jobs 2

set -euo pipefail

# ── defaults ─────────────────────────────────────────────────────────────────
SCALE=3
BG="transparent"
MAX_JOBS=4
PRODUCE_SVG=false
PATTERN="*.mmd"
MMD_DIR=""
OUTPUT_DIR=""

# ── parse args ────────────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --svg)      PRODUCE_SVG=true; shift ;;
    --scale)    SCALE="$2"; shift 2 ;;
    --bg)       BG="$2"; shift 2 ;;
    --jobs)     MAX_JOBS="$2"; shift 2 ;;
    --pattern)  PATTERN="$2"; shift 2 ;;
    --help|-h)
      sed -n '2,30p' "$0"
      exit 0
      ;;
    -*)
      echo "Unknown option: $1" >&2; exit 1 ;;
    *)
      if [[ -z "$MMD_DIR" ]]; then
        MMD_DIR="$1"
      elif [[ -z "$OUTPUT_DIR" ]]; then
        OUTPUT_DIR="$1"
      else
        echo "Unexpected argument: $1" >&2; exit 1
      fi
      shift ;;
  esac
done

# ── resolve paths ─────────────────────────────────────────────────────────────
if [[ -z "$MMD_DIR" ]]; then
  echo "Error: mmd-dir is required." >&2
  echo "Usage: $0 <mmd-dir> [output-dir] [--svg] [--scale N] [--bg COLOR] [--jobs N]" >&2
  exit 1
fi

# Resolve relative to CWD; allow script to be called from any directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Normalise MMD_DIR relative to repo root if not absolute
if [[ "$MMD_DIR" != /* ]]; then
  MMD_DIR="$REPO_ROOT/$MMD_DIR"
fi

if [[ -z "$OUTPUT_DIR" ]]; then
  OUTPUT_DIR="$REPO_ROOT/output/diagrams"
fi

if [[ "$OUTPUT_DIR" != /* ]]; then
  OUTPUT_DIR="$REPO_ROOT/$OUTPUT_DIR"
fi

# ── locate mmdc ───────────────────────────────────────────────────────────────
# Try these locations in order
MMDC_CANDIDATES=(
  "$(which mmdc 2>/dev/null || true)"
  "$HOME/.npm-global/bin/mmdc"
  "/usr/local/bin/mmdc"
  "/opt/homebrew/bin/mmdc"
  "$(npm root -g 2>/dev/null)/.bin/mmdc"
)

MMDC=""
for candidate in "${MMDC_CANDIDATES[@]}"; do
  if [[ -n "$candidate" && -x "$candidate" ]]; then
    MMDC="$candidate"
    break
  fi
done

if [[ -z "$MMDC" ]]; then
  echo "Error: mmdc not found. Install with: npm install -g @mermaid-js/mermaid-cli" >&2
  exit 1
fi

echo "mmdc: $MMDC ($(${MMDC} --version 2>/dev/null | head -1 || echo 'unknown version'))"

# ── locate config files ───────────────────────────────────────────────────────
MERMAID_CONFIG="$REPO_ROOT/scripts/diagrams/mermaid-config.json"
PUPPETEER_CONFIG="$REPO_ROOT/scripts/diagrams/puppeteer-config.json"

CONFIG_ARGS=()
if [[ -f "$MERMAID_CONFIG" ]]; then
  CONFIG_ARGS+=(--configFile "$MERMAID_CONFIG")
fi
if [[ -f "$PUPPETEER_CONFIG" ]]; then
  CONFIG_ARGS+=(--puppeteerConfigFile "$PUPPETEER_CONFIG")
fi

# ── validate inputs ───────────────────────────────────────────────────────────
if [[ ! -d "$MMD_DIR" ]]; then
  echo "Error: mmd-dir does not exist: $MMD_DIR" >&2
  exit 1
fi

IFS=$'\n' read -r -d '' -a MMD_FILES < <(find "$MMD_DIR" -maxdepth 1 -name "$PATTERN" | sort && printf '\0') || true

if [[ ${#MMD_FILES[@]} -eq 0 ]]; then
  echo "No .mmd files found matching '$PATTERN' in $MMD_DIR" >&2
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

echo "=================================================="
echo "  Parallel Mermaid Renderer"
echo "=================================================="
echo "  Source dir : $MMD_DIR"
echo "  Output dir : $OUTPUT_DIR"
echo "  Pattern    : $PATTERN"
echo "  Files      : ${#MMD_FILES[@]}"
echo "  Scale      : $SCALE  (~$((SCALE * 72)) DPI effective)"
echo "  Background : $BG"
echo "  Produce SVG: $PRODUCE_SVG"
echo "  Max jobs   : $MAX_JOBS"
echo "--------------------------------------------------"

# ── worker function ───────────────────────────────────────────────────────────
# Returns 0 on success, 1 on failure; writes result to a temp status file.
render_one() {
  local mmd_file="$1"
  local out_dir="$2"
  local scale="$3"
  local bg="$4"
  local produce_svg="$5"
  local status_file="$6"

  local base
  base="$(basename "$mmd_file" .mmd)"
  local png_out="$out_dir/${base}.png"
  local svg_out="$out_dir/${base}.svg"

  # Build mmdc args
  local mmdc_png_args=(
    -i "$mmd_file"
    -o "$png_out"
    -s "$scale"
    -b "$bg"
    "${CONFIG_ARGS[@]}"
  )

  local mmdc_svg_args=(
    -i "$mmd_file"
    -o "$svg_out"
    --outputFormat svg
    "${CONFIG_ARGS[@]}"
    -w 2400
  )

  local log_file
  log_file="$(mktemp /tmp/mmdc-render-XXXXXXXX)"

  local ok=true

  # Render PNG (primary output)
  if ! "$MMDC" "${mmdc_png_args[@]}" >> "$log_file" 2>&1; then
    ok=false
  fi

  # Optionally render SVG source artifact
  if $ok && $produce_svg; then
    if ! "$MMDC" "${mmdc_svg_args[@]}" >> "$log_file" 2>&1; then
      # SVG failure is non-fatal; warn but don't fail the overall job
      echo "WARN:${base}: SVG render failed (PNG succeeded)" >> "$status_file"
    fi
  fi

  if $ok; then
    local size
    size=$(wc -c < "$png_out" 2>/dev/null | tr -d ' ' || echo "?")
    echo "OK:${base}: ${png_out} (${size} bytes)" >> "$status_file"
  else
    echo "FAIL:${base}: $(tail -5 "$log_file" | tr '\n' '|')" >> "$status_file"
  fi

  rm -f "$log_file"
}

export -f render_one
export MMDC
export CONFIG_ARGS

# ── parallel execution with semaphore ─────────────────────────────────────────
STATUS_FILE="$(mktemp /tmp/mmdc-status-XXXXXXXX)"
PIDS=()
JOB_NAMES=()
ACTIVE=0

for mmd_file in "${MMD_FILES[@]}"; do
  base="$(basename "$mmd_file" .mmd)"

  # Throttle to MAX_JOBS
  while [[ $ACTIVE -ge $MAX_JOBS ]]; do
    wait "${PIDS[0]}"
    PIDS=("${PIDS[@]:1}")
    JOB_NAMES=("${JOB_NAMES[@]:1}")
    ACTIVE=$((ACTIVE - 1))
  done

  echo "  → Rendering: $base"
  render_one "$mmd_file" "$OUTPUT_DIR" "$SCALE" "$BG" "$PRODUCE_SVG" "$STATUS_FILE" &
  PIDS+=($!)
  JOB_NAMES+=("$base")
  ACTIVE=$((ACTIVE + 1))
done

# Wait for remaining jobs
for pid in "${PIDS[@]}"; do
  wait "$pid" || true
done

# ── report results ────────────────────────────────────────────────────────────
echo ""
echo "=================================================="
echo "  Results"
echo "=================================================="

PASS=0
FAIL=0
WARN=0

while IFS= read -r line; do
  status="${line%%:*}"
  rest="${line#*:}"
  case "$status" in
    OK)
      echo "  ✓ $rest"
      PASS=$((PASS + 1))
      ;;
    FAIL)
      echo "  ✗ $rest"
      FAIL=$((FAIL + 1))
      ;;
    WARN)
      echo "  ⚠ $rest"
      WARN=$((WARN + 1))
      ;;
  esac
done < "$STATUS_FILE"

rm -f "$STATUS_FILE"

echo "--------------------------------------------------"
echo "  Passed: $PASS / $((PASS + FAIL))"
if [[ $WARN -gt 0 ]]; then
  echo "  Warnings (SVG): $WARN"
fi
if [[ $FAIL -gt 0 ]]; then
  echo "  FAILED: $FAIL diagram(s) did not render."
  exit 1
fi
echo "  Done."
