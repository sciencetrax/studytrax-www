---
description: Process new tasks in the task list (alias for /ticket process)
---

**This command uses a fast-path script to detect board state before invoking `/ticket process`.**

## Step 1: Run the poll script

Run via Bash tool:

```bash
bash .claude/scripts/ntc-poll.sh
```

If `.claude/scripts/ntc-poll.sh` does not exist (plugin not installed to project), fall back to:

```bash
bash available-plugins/ticket/scripts/ntc-poll.sh
```

## Step 2: Interpret the output

**If output starts with `STATUS:IDLE`** → Report "Board is idle." and stop. Do NOT invoke `/ticket process`.

**If output starts with `STATUS:NO_TICKETS_JSON`** → No ticket system found. Use Fallback section below.

**If output starts with `STATUS:NO_TICKETS_MD`** → Ticket system exists but tickets.md is missing. Inform the user.

**If output starts with `STATUS:WORK`** → Board has actionable items. Invoke `/ticket process` using the Skill tool:

```
Skill(skill="ticket", args="process $ARGUMENTS")
```

The tickets.md content is already in the script output after the `---` separator — `/ticket process` will re-read it as needed.

## Argument Mapping

| /nt invocation | Delegates to |
|----------------|-------------|
| `/nt` | `/ticket process` |
| `/nt DTX-0003` | `/ticket process DTX-0003` |
| `/nt 3` | `/ticket process 3` |
| `/nt --ce` | `/ticket process --ce` |
| `/nt agents` | `/ticket process` (resolve "agents" as a list name — see below) |

## Legacy List Name Resolution

If the argument is not a ticket ID and not a flag, it may be a legacy task list name (e.g., `agents`, `issues`). In this case:

1. Check if `.ai/tickets/tickets.json` exists → use `/ticket process`
2. If no ticket system → fall back to the legacy `/nt` behavior by reading `.claude/commands/nt.md.bak` for the original processing instructions

## Fallback

If no `.ai/tickets/tickets.json` exists (ticket system not initialized), inform the user:

```
No ticket system found. Options:
1. Run /ticket init to set up the ticket system
2. Continue with legacy task list processing

Which would you like?
```

If user chooses legacy processing, follow the original /nt behavior documented in `.claude/commands/nt.md.bak`.
