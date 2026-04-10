#!/usr/bin/env bash
# ntc-poll.sh — Fast-path heartbeat writer and idle detector for /ntc poll cycles
# Usage: ntc-poll.sh [tickets.json path]
# Output: structured STATUS block (always exits 0)

set -euo pipefail

# ── 1. Discover tickets.json ───────────────────────────────────────────────────
if [[ -n "${1:-}" ]]; then
  TICKETS_JSON="$1"
elif [[ -f ".ai/tickets/tickets.json" ]]; then
  TICKETS_JSON=".ai/tickets/tickets.json"
else
  # Glob fallback: find first match under any subdirectory
  TICKETS_JSON=$(find . -maxdepth 4 -name "tickets.json" -path "*/tickets/tickets.json" 2>/dev/null | head -1 || true)
fi

if [[ -z "$TICKETS_JSON" || ! -f "$TICKETS_JSON" ]]; then
  echo "STATUS:NO_TICKETS_JSON"
  echo "HEARTBEAT:$(date +"%Y-%m-%d %H:%M:%S")"
  exit 0
fi

# ── 2. Read rootFolder from tickets.json ──────────────────────────────────────
# Portable JSON extraction without jq dependency
ROOT_FOLDER=$(grep -o '"rootFolder"[[:space:]]*:[[:space:]]*"[^"]*"' "$TICKETS_JSON" \
  | sed 's/.*"rootFolder"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/' \
  | head -1 || true)

if [[ -z "$ROOT_FOLDER" ]]; then
  # Fall back to the directory containing tickets.json
  ROOT_FOLDER=$(dirname "$TICKETS_JSON")
fi

# ── 3. Write heartbeat ─────────────────────────────────────────────────────────
HEARTBEAT_TS=$(date +"%Y-%m-%d %H:%M:%S")
HEARTBEAT_FILE="${ROOT_FOLDER}/tickets/.ntc-heartbeat"

# Ensure directory exists
mkdir -p "$(dirname "$HEARTBEAT_FILE")" 2>/dev/null || true
printf "%s\n" "$HEARTBEAT_TS" > "$HEARTBEAT_FILE" 2>/dev/null || true

# ── 4. Read tickets.md ─────────────────────────────────────────────────────────
TICKETS_MD="${ROOT_FOLDER}/tickets/tickets.md"

if [[ ! -f "$TICKETS_MD" ]]; then
  echo "STATUS:NO_TICKETS_MD"
  echo "HEARTBEAT:${HEARTBEAT_TS}"
  exit 0
fi

TICKETS_CONTENT=$(cat "$TICKETS_MD")

# ── 5. Parse actionable state ──────────────────────────────────────────────────

# Is # Prompt section non-empty?
# Extract content between "# Prompt" and the next "# " heading
PROMPT_CONTENT=$(printf "%s\n" "$TICKETS_CONTENT" \
  | awk '/^# Prompt/{found=1; next} found && /^# /{exit} found{print}' \
  | sed '/^[[:space:]]*$/d')

HAS_PROMPT=0
[[ -n "$PROMPT_CONTENT" ]] && HAS_PROMPT=1

# Count pending tasks (- [ ] or - [*] lines under # Tasks)
PENDING_TASKS=$(printf "%s\n" "$TICKETS_CONTENT" \
  | awk '/^# Tasks/{found=1; next} found && /^# /{exit} found && /^- \[[ *]\]/{c++} END{print c+0}')

# Count deferred tasks [?] under # Deferred
DEFERRED_TASKS=$(printf "%s\n" "$TICKETS_CONTENT" \
  | awk '/^# Deferred/{found=1; next} found && /^# /{exit} found && /^- \[\?\]/{c++} END{print c+0}')

# Count answered questions (lines matching ^A: under # Questions)
ANSWERED_QS=$(printf "%s\n" "$TICKETS_CONTENT" \
  | awk '/^# Questions/{found=1; next} found && /^# /{exit} found && /^A:/{c++} END{print c+0}')

# ── 6. Output structured status ───────────────────────────────────────────────
if [[ "$HAS_PROMPT" -eq 0 && "$PENDING_TASKS" -eq 0 && "$ANSWERED_QS" -eq 0 ]]; then
  echo "STATUS:IDLE"
  echo "HEARTBEAT:${HEARTBEAT_TS}"
  echo "DEFERRED:${DEFERRED_TASKS}"
else
  echo "STATUS:WORK"
  echo "HEARTBEAT:${HEARTBEAT_TS}"
  echo "PROMPT:$([ "$HAS_PROMPT" -eq 1 ] && echo yes || echo no)"
  echo "TASKS:${PENDING_TASKS}"
  echo "ANSWERED_QS:${ANSWERED_QS}"
  echo "---"
  printf "%s\n" "$TICKETS_CONTENT"
fi

exit 0
