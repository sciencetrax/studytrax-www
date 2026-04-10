---
description: Process tasks continuously — polls for new prompts and tickets
---

**This command uses `/loop` to repeatedly invoke `/nt`.**

When invoked, execute:

```
/loop 10s /nt
```

This polls tickets.md every 10 seconds, processing any new prompts or pending tickets. The tickets.md file serves as shared state between cycles — no in-memory context needed.

**After each `/nt` poll completes**, output: `Processing again in 10 seconds...`

**To stop:** Ctrl+C or type "stop".

## Observability

Each `/nt` poll writes a heartbeat timestamp to `.ai/tickets/.ntc-heartbeat`.

**Check if polling is alive:**
```bash
cat .ai/tickets/.ntc-heartbeat
# Shows: 2026-04-01 14:30:05
# If timestamp is older than 2x poll interval → polling has stopped
```

**The heartbeat file is:**
- Overwritten each cycle (not appended)
- Located in the tickets directory (not tracked by git)
- Written by the `ntc-poll.sh` fast-path script at the start of each cycle

## Fast-Path Idle Detection

Each poll cycle runs `ntc-poll.sh` first (via Bash tool). This script:
1. Writes the heartbeat file
2. Reads tickets.md and detects actionable state
3. If **idle** (no prompt, no pending tasks, no answered questions) → outputs `STATUS:IDLE` and stops

When idle, Claude receives a single short result instead of multiple tool calls, reducing token usage significantly.
