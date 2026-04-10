---
description: Ticket-based task management — create, track, and process tickets with Obsidian-linked artifacts
---

Ticket management system. Parse `$ARGUMENTS` to determine subcommand and options.

## CRITICAL: All Responses Go In tickets.md

**ANY question, comment, or request written in tickets.md MUST be answered by writing the response back INTO tickets.md.** This includes:
- `Q:` questions — write `A:` answer directly below in tickets.md
- `LES:` or other named comments — write response in tickets.md
- Freeform questions in `# Prompt` — answer in tickets.md
- Error reports, investigation requests — write findings in tickets.md

**NEVER answer only in the conversation/terminal output.** The user reads tickets.md for ALL responses. The terminal output is secondary — the user may not see it. The ONLY exception is screenshots, which the user will paste into the chat.

## Plugin Installation

To add the ticket system to any Claude Code project:

```
1. Copy these files into your project:
   .claude/commands/ticket.md    (this file — required)
   .claude/commands/nt.md        (optional — /nt alias for /ticket process)

2. Run: /ticket init [PROJECT_KEY] [--rootFolder <path>]
   - PROJECT_KEY: 3-letter project identifier (e.g., STX, DOT)
   - --rootFolder: where to store tickets (default: .ai)

3. That's it. Use /ticket new, /ticket process, /nt, etc.
```

**Minimum install:** Just `ticket.md` → run `/ticket init`.
**Full install:** All 3 files for aliases and auto-loaded workflow rules.

---

## Command Routing

Parse the first argument to determine the subcommand:

| Input | Subcommand | Section |
|-------|-----------|---------|
| `init` | Initialize ticket system | [Init](#init) |
| `new "description"` | Create new ticket | [New](#new) |
| `list [filter]` | List tickets | [List](#list) |
| `view <ID>` | View ticket details | [View](#view) |
| `edit <ID>` | Edit ticket | [Edit](#edit) |
| `start <ID>` | Start work on ticket | [Start](#start) |
| `complete <ID>` | Complete ticket (QA gate) | [Complete](#complete) |
| `delete <ID>` | Cancel ticket | [Delete](#delete) |
| `process [ID] [-c]` | Process prompt + tickets | [Process](#process) |
| `worklog <ID>` | View/edit worklog | [Worklog](#worklog) |
| `spec <ID>` | View/edit spec | [Spec](#spec-cmd) |
| `planning <ID>` | View/edit planning | [Planning](#planning-cmd) |
| `changelog [--days N]` | Show changelog | [Changelog](#changelog) |
| `burndown [--days N]` | Show burndown | [Burndown](#burndown) |
| `migrate --type <type>` | Migrate datasource | [Migrate](#migrate) |
| `tui` | Launch interactive TUI | [TUI](#tui) |
| (no args) | Same as `process` | [Process](#process) |

**ID Resolution:** When a ticket ID is provided, accept both full (`DTX-0003`) and short (`0003` or `3`) forms. For short forms, read `tickets.json` → `project` to construct the full ID. Zero-pad to 4 digits.

---

## Shared: tickets.json

### Discovery

All subcommands locate `tickets.json` using this search order:

1. `.ai/tickets/tickets.json` (default location)
2. Glob `*/tickets/tickets.json` from project root (custom rootFolder)

The first match wins. If no `tickets.json` is found and the subcommand is not `init`, prompt the user:

```
No ticket system found. Run /ticket init to set up.
```

Once found, derive all paths from the `rootFolder` field in tickets.json. Store it in a local variable for the remainder of the command:

```
ROOT = tickets.json → rootFolder   (e.g., ".ai")
TICKETS_DIR = {ROOT}/tickets/      (e.g., "{ROOT}/tickets/")
```

### Schema

```json
{
  "project": "DTX",
  "counter": 1,
  "rootFolder": ".ai",
  "datasource": {
    "type": "local",
    "path": "tickets.md"
  },
  "vault": {
    "path": "C:/dev/vaults/ai",
    "enabled": true
  },
  "roles": {
    "pm": "user",
    "woz": "developer",
    "turing": "tester"
  },
  "defaults": {
    "commit": "N",
    "archive": "N",
    "autoCreate": null
  }
}
```

**`autoCreate` behavior:**

| datasource.type | autoCreate value | Behavior |
|-----------------|-----------------|----------|
| local | `null` (default) | Create immediately, no confirmation |
| local | `false` | Show preview, ask confirmation |
| local | `true` | Create immediately (explicit) |
| jira | `null` (default) | Show preview, ask confirmation |
| jira | `true` | Create immediately, no confirmation |
| jira | `false` | Show preview, ask confirmation (explicit) |

**Rule:** JIRA defaults to confirmation (external side effect), local defaults to no confirmation. `autoCreate` overrides the default for either datasource type.

**Note:** All path references below use `{ROOT}` to mean the `rootFolder` value from tickets.json (default `.ai`). For example, `{ROOT}/tickets/` resolves to `{ROOT}/tickets/` unless overridden.

---

## Shared: Vault Sync

Call this after every write to a ticket directory:

```
1. Read tickets.json → vault.enabled and vault.path
2. If vault.enabled == false → return (skip sync)
3. If vault.path directory does not exist → return silently (no error)
4. sourcePath = {ROOT}/tickets/{NNNN}/
5. targetPath = {vault.path}/tickets/{project}/{NNNN}/
6. mkdir -p targetPath
7. Copy all files from sourcePath to targetPath (overwrite existing)
8. Rebuild project index at {vault.path}/tickets/{project}/index.md:
   a. Read all {NNNN}/{FULL_ID}.details.md files in the vault project dir
   b. Extract: id, type, status, created date, title (from # heading)
   c. Group tickets by created date (descending — newest first)
   d. Write index.md with frontmatter and a table per day:
      - Columns: ID (wikilink to details), Type, Status, Summary
      - Wikilink format: [[{FULL_ID}.details|{FULL_ID}]]
```

**CRITICAL:** Never error or warn if vault path doesn't exist. Just skip silently.

---

## Shared: Agent Spawning Rules

When ticket work requires delegating to agents (Woz/developer, Turing/tester, etc.), follow the agent context management rules:

**Implementation agents (Woz work: developer, refactorer, code-reviewer, tester, database, api-designer):**
- **MUST spawn a fresh Agent() for every ticket.** Never reuse via SendMessage.
- Each ticket gets a clean agent context with zero prior task leakage.
- Pass the ticket's spec, planning, and relevant context as part of the Agent prompt.

**Knowledge agents (researcher, spec-designer, project-assistant):**
- Spawn once per conversation with a `name` parameter.
- Reuse via `SendMessage(to="agent-name")` for follow-up questions within the same conversation.
- Example: `Agent(prompt="...", name="dot-researcher")` → later `SendMessage(to="dot-researcher", "...")`

**Per-ticket agent spawning pattern:**

```
FOR EACH ticket being worked:
  1. Gather context: read spec.md, planning.md, relevant source files
  2. Spawn FRESH developer agent:
     Agent(
       prompt="Implement {FULL_ID}. Spec: {spec contents}. Plan: {planning contents}.",
       subagent_type="developer"
     )
  3. When implementation returns, spawn FRESH tester agent for QA:
     Agent(
       prompt="QA gate for {FULL_ID}. Verify: {acceptance criteria}. Files changed: {list}.",
       subagent_type="code-reviewer"
     )
  4. NEVER pass one ticket's agent to the next ticket's work.
```

---

## Shared: Obsidian Templates

### details.md (Hub File)

```markdown
---
id: {FULL_ID}
type: {bug|feature|chore|spike}
status: backlog
created: {YYYY-MM-DD}
started:
completed:
assignee:
jiraKey:
tags: []
priority: normal
---

# {FULL_ID}: {TITLE}

## Description

{DESCRIPTION}

## Steps to Reproduce (bugs only — omit for other types)

1. {Step 1}
2. {Step 2}
3. {Step 3}

**Expected:** {What should happen}
**Actual:** {What happens instead}
**Environment:** {OS, browser, version — if relevant}

## Acceptance Criteria

- [ ] {criteria from spec or interview}

## Artifacts

| Artifact | Link |
|----------|------|
| Spec | [[{FULL_ID}.spec]] |
| Planning | [[{FULL_ID}.planning]] |
| Tasks | [[{FULL_ID}.tasks]] |
| Work Log | [[{FULL_ID}.worklog]] |
| Issues | [[{FULL_ID}.issues]] |

## Related Tickets

(none yet)

## Notes

(none yet)
```

### spec.md

```markdown
---
parent: "[[{FULL_ID}.details]]"
type: spec
---

# Spec: {FULL_ID} — {TITLE}

## Problem Statement

{DESCRIPTION}

## Steps to Reproduce (bugs only — omit for other types)

1. {Step 1}
2. {Step 2}
3. {Step 3}

**Expected:** {What should happen}
**Actual:** {What happens instead}

## Proposed Solution

{To be filled during planning}

## Acceptance Criteria

- [ ] {criteria}
- [ ] {For bugs: "Bug no longer reproducible via STR"}

## Out of Scope

(none defined)
```

### planning.md (created at start, not new)

```markdown
---
parent: "[[{FULL_ID}.details]]"
type: planning
---

# Planning: {FULL_ID} — {TITLE}

## Approach

{Analysis of what needs to be done}

## Implementation Steps

- [ ] Step 1
- [ ] Step 2

## Files to Modify

- `path/to/file` — Description

## Risks

(none identified)
```

### tasks.md (created at start, not new)

```markdown
---
parent: "[[{FULL_ID}.details]]"
type: tasks
---

# Tasks: {FULL_ID} — {TITLE}

- [ ] {Subtask derived from planning}
```

### worklog.md (created at start, not new)

```markdown
---
parent: "[[{FULL_ID}.details]]"
type: worklog
---

# Work Log: {FULL_ID} — {TITLE}

## {YYYY-MM-DD}

- {HH:MM}: Started work, created artifacts
```

### issues.md (created on demand, not at start)

```markdown
---
parent: "[[{FULL_ID}.details]]"
type: issues
---

# Issues: {FULL_ID} — {TITLE}

## Issue 1: {ISSUE_TITLE}

**Status:** Open | Resolved
**Impact:** {description}
**Resolution:** {how it was fixed}
```

---

<a name="init"></a>
## Subcommand: init

Initialize the ticket system for the current project.

```
/ticket init
/ticket init STX                       # Specify project key explicitly
/ticket init --rootFolder .tasks       # Custom root folder (default: .ai)
/ticket init STX --rootFolder .tasks   # Both
```

### Workflow

Run the init script via the Bash tool:

```bash
bash available-plugins/ticket/scripts/ticket-init.sh [PROJECT_KEY] [--rootFolder PATH]
```

If the script is not found at that path, check for it relative to the plugin install location (e.g., `.claude/plugins/ticket/scripts/ticket-init.sh`).

The script handles all deterministic work: checking for existing config, deriving the project key, creating directories, writing `tickets.json` and `tickets.md`, checking the vault, and scanning for old structures to migrate. It prints a summary on completion.

After the script completes:

1. If the project key was derived automatically (not provided as an argument), confirm with the user: "Use project key '{KEY}'? (yes/no)"
   - If no → ask for the correct key, then re-run the script with the explicit key after removing the files just created.
2. Report the script output to the user.

### Migration from Old /nt Structures

The init script scans for old structures and reports what it finds but does NOT migrate them. To perform a full migration, run:

```
/ticket migrate --type nt
```

---

<a name="new"></a>
## Subcommand: new

Create a new ticket.

```
/ticket new "Fix login timeout"
/ticket new                        # Interactive — AI will ask for description
```

### Workflow

```
1. Read {ROOT}/tickets/tickets.json → project key and counter

2. Get description:
   a. If provided as argument → use it
   b. If not → ask user: "Describe the ticket:"

3. Determine ticket type:
   - Analyze description for keywords/intent:
     • "bug", "broken", "error", "crash", "fix", "not working", "regression" → bug
     • "add", "create", "build", "implement", "new feature" → feature
     • "refactor", "cleanup", "update deps", "rename" → chore
     • "research", "investigate", "explore", "prototype" → spike
   - If ambiguous → ask user: "Is this a bug, feature, chore, or spike?"

4. Analyze description:
   - If too vague → interview user for details
   - **If type == bug → REQUIRE Steps to Reproduce:**
     "This looks like a bug. I need:
      - Steps to reproduce (numbered)
      - Expected behavior
      - Actual behavior
      - Environment (if relevant: OS, browser, version)"
   - Extract: title (short), description (full), STR (if bug), suggested tags, priority

5. Confirmation gate (autoCreate check):
   - Read defaults.autoCreate from tickets.json
   - Determine if confirmation needed (see autoCreate behavior table above)
   - If confirmation required → show preview:
     ```
     Create ticket?
     ─────────────────
     Title:       {TITLE}
     Type:        {type}
     Priority:    {priority}
     Tags:        {tags}
     Description: {description (first 100 chars)}
     Datasource:  {datasource.type}
     ```
   - Ask: "Create this ticket? (y/n)"
   - If "n" → abort, report "Ticket creation cancelled."
   - If confirmation NOT required → proceed silently

6. Assign ticket ID:
   - counter value from tickets.json, zero-padded to 4 digits
   - Full ID: {PROJECT}-{NNNN} (e.g., DOT-0005)

7. Create directory: {ROOT}/tickets/{NNNN}/

8. Create {FULL_ID}.details.md:
   - Fill frontmatter: id, type, status=backlog, created=today, priority, tags
   - Fill description and acceptance criteria
   - **If type == bug:** Include ## Steps to Reproduce section with STR, expected/actual/environment
   - **If type != bug:** Omit the STR section entirely
   - Wikilinks to spec (other artifacts created later at /ticket start)

9. Create {FULL_ID}.spec.md:
   - Fill problem statement from description
   - **If type == bug:** Include STR in spec, add "Bug no longer reproducible via STR" to acceptance criteria
   - Fill acceptance criteria

10. Add to {ROOT}/tickets/tickets.md → # Tasks section:
    - [ ] {FULL_ID}: {TITLE}

11. Update tickets.json:
    - Increment counter

12. Sync to vault

13. JIRA Issue Creation (only when datasource.type == "jira"):
    a. Read tickets.json → datasource.type
    b. If datasource.type != "jira" → skip this step entirely
    c. Map local fields to JIRA fields:
       - title → summary
       - description → description
       - type: bug → issuetype: Bug
       - type: feature → issuetype: Story
       - type: chore → issuetype: Task
       - type: spike → issuetype: Task (or Spike if available)
       - priority: low → priority: Low
       - priority: normal → priority: Medium
       - priority: high → priority: High
       - tags → labels
    d. Create JIRA issue using /jira skill or mcp__jira__create_issue:
       - Project: tickets.json → project key (mapped to JIRA project)
       - Fields: mapped from step (c)
    e. If JIRA creation succeeds:
       - Store JIRA key in details.md frontmatter: jiraKey: {JIRA-KEY}
       - Report: "JIRA issue created: {JIRA-KEY}"
    f. If JIRA creation fails:
       - Warn: "JIRA issue creation failed: {error}. Local ticket created successfully."
       - Do NOT block local ticket creation — the ticket is already saved locally
       - The next /ticket process sync will retry pushing to JIRA

14. Update memory task registry:
    - Add row: ID, date, status=backlog, description, artifacts path

15. Report:
    "Created {FULL_ID}: {TITLE}
     Type: {type}
     Artifacts: {ROOT}/tickets/{NNNN}/
     JIRA: {JIRA-KEY | 'local only' | 'creation failed — will sync later'}
     Next: /ticket start {FULL_ID} to begin work"
```

---

<a name="list"></a>
## Subcommand: list

List tickets with optional AI-powered filtering.

```
/ticket list                                    # All tickets
/ticket list "open"                             # Filter by status
/ticket list "high priority bugs"               # AI interprets filter
/ticket list --status backlog                   # Explicit filter
```

### Workflow

```
1. Read {ROOT}/tickets/tickets.md
2. Parse all tickets from # Tasks, # Deferred, and # Done sections
3. If filter provided:
   a. If structured (--status, --tag, --priority) → apply directly
   b. If natural language → AI interprets and filters
4. Display formatted table:

   {PROJECT} Tickets
   ┌────────────┬─────────────┬──────────────────────────────────────┬──────────┐
   │ ID         │ Status      │ Title                                │ Priority │
   ├────────────┼─────────────┼──────────────────────────────────────┼──────────┤
   │ DTX-0001   │ ✓ completed │ Design ticket system spec            │ normal   │
   │ DTX-0002   │ ◉ progress  │ Build /ticket command                │ high     │
   │ DTX-0003   │ ○ backlog   │ Add burndown chart support           │ low      │
   └────────────┴─────────────┴──────────────────────────────────────┴──────────┘
   3 tickets (1 completed, 1 in progress, 1 backlog)
```

**Status icons:** `○` backlog, `◉` in_progress, `◎` in_review, `✓` completed, `✗` cancelled

---

<a name="view"></a>
## Subcommand: view

Display ticket details and artifact links.

```
/ticket view DTX-0001
/ticket view 1               # Short form
```

### Workflow

```
1. Resolve ticket ID (short → full)
2. Read {ROOT}/tickets/{NNNN}/{FULL_ID}.details.md
3. Display:

   DTX-0001: Design ticket system spec
   ─────────────────────────────────────
   Status:    ✓ completed
   Priority:  normal
   Created:   2026-03-20
   Started:   2026-03-20
   Completed: 2026-03-20
   Tags:      feature, spec

   Description:
     Restructure the existing /nt task list workflow into a formal
     /ticket system with roles, local/JIRA datasources, and per-ticket artifacts.

   Artifacts:
     ✓ Spec      {ROOT}/tickets/0001/DTX-0001.spec.md
     ✓ Planning  {ROOT}/tickets/0001/DTX-0001.planning.md
     ✓ Tasks     {ROOT}/tickets/0001/DTX-0001.tasks.md
     ✓ Worklog   {ROOT}/tickets/0001/DTX-0001.worklog.md
     ✗ Issues    (not created)

4. Show ✓ for artifacts that exist, ✗ for those that don't
```

---

<a name="edit"></a>
## Subcommand: edit

Edit ticket metadata or description.

```
/ticket edit DTX-0001
/ticket edit 1 --priority high
/ticket edit 1 --tags "bug, auth"
/ticket edit 1 --title "New title"
```

### Workflow

```
1. Resolve ticket ID
2. Read details.md
3. If specific flags provided → apply changes directly
4. If no flags → show current values and ask what to change
5. Update details.md frontmatter and content
6. Sync to vault
```

---

<a name="start"></a>
## Subcommand: start

Begin work on a ticket. Creates remaining artifact files.

```
/ticket start DTX-0003
/ticket start 3
```

### Workflow

```
1. Resolve ticket ID
2. Read details.md — verify status is backlog
   - If in_progress → report "Already in progress"
   - If completed → report "Already completed"
   - If cancelled → ask "Ticket was cancelled. Reopen?"

3. Update tickets.md: - [ ] {ID} → - [*] {ID}

4. Update details.md frontmatter:
   - status: in_progress
   - started: {YYYY-MM-DD}

5. Read spec.md to understand the ticket

6. Create {FULL_ID}.planning.md:
   - Analyze the spec
   - Write implementation approach
   - List implementation steps with checkboxes
   - Identify files to modify
   - Note risks

7. Create {FULL_ID}.tasks.md:
   - Derive subtasks from planning steps
   - Each subtask is a checkbox item

8. Create {FULL_ID}.worklog.md:
   - First entry: "Started work, created artifacts"

9. Sync all new files to vault

10. Report:
    "Started {FULL_ID}: {TITLE}
     Planning: {ROOT}/tickets/{NNNN}/{FULL_ID}.planning.md
     Tasks: {N} subtasks created
     Ready to implement."
```

---

<a name="complete"></a>
## Subcommand: complete

Complete a ticket with QA gate.

```
/ticket complete DTX-0003
/ticket complete 3
/ticket complete 3 --skip-qa       # Pre-flag to skip QA (still asks PM)
```

### Workflow

```
1. Resolve ticket ID
2. Read details.md — verify status is in_progress
   - If backlog → report "Not started yet. Run /ticket start {ID} first."
   - If completed → report "Already completed."

3. Check {FULL_ID}.tasks.md:
   - Count [ ] vs [x] subtasks
   - If any [ ] remain → report "N subtasks still pending" and list them
   - Ask PM: "Complete anyway, or finish subtasks first?"

4. QA Gate (Turing):
   a. Identify changed files (from planning.md or git diff)
   b. Check for test files related to changed code
   c. If tests exist → run them
   d. Evaluate results:
      - All pass → QA passed
      - Tests missing → QA failed: "No tests found for {files}"
      - Tests fail → QA failed: "{N} tests failing"

5. If QA failed:
   a. Report failures to PM with details
   b. Ask: "QA gate failed. Options:
      1. Fix issues and re-run /ticket complete
      2. Skip QA (not recommended) — will be logged
      3. Cancel completion"
   c. If skip approved → log in worklog: "QA skipped by PM: {reason}"
   d. If fix → exit, let PM fix and re-run
   e. Agent CANNOT self-override — must always ask PM

6. Update details.md frontmatter:
   - status: completed
   - completed: {YYYY-MM-DD}

7. Update tickets.md: - [*] {ID} → - [x] {ID} ({YYYY-MM-DD})

8. Append to worklog:
   - "Ticket complete. QA: {passed | skipped by PM}"

9. Sync to vault

10. JIRA Sync: **SKIP unless** datasource.type == "jira". See [JIRA Sync Protocol](#jira-sync) (completion variant).

11. Update memory task registry: status → completed

12. **Git commit and push** (based on tickets.json config):
    - Read `defaults.autoCommit` and `defaults.autoPush` from tickets.json

    **Commit logic:**
    - If `autoCommit: true` → stage all ticket-related files and commit automatically
    - If `autoCommit: false` → ask user:
      "Commit changes? (y/n)
       Enable auto-commit for this project? (y/n) [reset in tickets.json]"
      - If user says yes to commit → commit
      - If user says yes to auto-commit → update tickets.json `defaults.autoCommit: true`
      - If user says no to commit → report "Changes left uncommitted."

    **Push logic** (only runs if commit was made):
    - If `autoPush: true` → push automatically
    - If `autoPush: false` → ask user:
      "Push changes? (y/n)
       Enable auto-push for this project? (y/n) [reset in tickets.json]"
      - If user says yes to push → push
      - If user says yes to auto-push → update tickets.json `defaults.autoPush: true`
      - If user says no to push → report "Changes committed but not pushed."

    **Resetting:** Edit tickets.json → `"autoCommit": false` / `"autoPush": false`

    - If committing: this must be the last mutation step so all ticket file
      updates (details.md, tickets.md, worklog) are included in the commit
    - **Commit message format:** `{FULL_ID}: {type}: {description}`
      Examples:
      - `STX-0042: feat: add login timeout handling`
      - `CCG-0001: fix: correct JIRA sync on ticket creation`
      - `ETX-0436: chore: update dev script dependencies`

13. Apply config:
    - Check tickets.md config line for archive settings
    - If archive: Auto/Y → move to # Done + move ticket dir to {ROOT}/tickets/archive/

14. Report:
    "Completed {FULL_ID}: {TITLE}
     QA: {passed | skipped}
     Duration: {started → completed}"
```

---

<a name="delete"></a>
## Subcommand: delete

Soft-delete (cancel) a ticket.

```
/ticket delete DTX-0003
/ticket delete 3
```

### Workflow

```
1. Resolve ticket ID
2. Confirm: "Cancel ticket {FULL_ID}: {TITLE}? Artifacts will be preserved."
3. Update details.md: status: cancelled
4. Update tickets.md: mark with cancelled indicator or move to # Done
5. Sync to vault
6. Update memory task registry
```

---

<a name="process"></a>
## Subcommand: process

**The primary workflow command.** Processes the `# Prompt` section and works pending tickets. This is what `/nt` delegates to.

```
/ticket process                    # Process prompt + all pending tickets, exit
/ticket process DTX-0003           # Process only this ticket
/ticket process 3                  # Short form
```

### Without Ticket ID (default = all)

```
1. Read {ROOT}/tickets/tickets.json for project config
2. Read {ROOT}/tickets/tickets.md
2b. Write heartbeat: Run `date +"%Y-%m-%d %H:%M:%S" > {ROOT}/tickets/.ntc-heartbeat`
    This lets external tools verify polling is alive. The file is overwritten each cycle.

3. JIRA Sync: **SKIP unless** datasource.type == "jira". See [JIRA Sync Protocol](#jira-sync).

4. Parse config line (commit, archive settings)

5. Execute immediate config actions:
   - archive: Full/F → perform full archive, reset to N
   - archive: Y → move completed to # Done, reset to N
   - archive: Auto → same as Y but stay Auto
   - archive: FullAuto → same as Full but stay FullAuto
   - commit: Y → create commit if uncommitted changes, reset to N
   - commit: Auto → same as Y but stay Auto

   **Archive cleanup:** All archive actions (Y, Full, Auto, FullAuto, `A:`, `- archive`)
   must clean up tickets.md, move ticket directories, and log to archive.log:
   ```
   1. Move completed ticket directories:
      For each completed ticket ([x]) being archived:
        a. mkdir -p {ROOT}/tickets/archive/
        b. Move {ROOT}/tickets/{NNNN}/ → {ROOT}/tickets/archive/{NNNN}/

   2. Append to archive.log:
      For each item being removed from # Done:
        a. Append to {ROOT}/tickets/archive.log (create if missing)
        b. Format: [YYYY-MM-DD] TICKET-ID: description
        c. Date comes from the (YYYY-MM-DD) suffix on the task line,
           or from the ### date header if grouped
        d. archive.log is append-only — never overwrite

   3. Clean up tickets.md sections:
      a. # Prompt — remove all Q&A pairs (Q: ... A: ... blocks)
      b. # Tasks — move [x] entries to # Done under today's date header
      c. # Done — remove all entries (they are now in archive.log)

   Standard archive (Y, Auto):
     - Moves [x] from # Tasks to # Done under today's date header
     - Appends all # Done items to archive.log
     - Clears # Done entirely
     - Clears Q&A from # Prompt

   Full archive (Full, FullAuto):
     - Same as standard (items always go to archive.log then get cleared)
     - Clean slate — only active tickets remain
   ```

   **# Done date headers:** When moving [x] items to # Done, group under
   date headers. Format:
   ```
   # Done

   ### 2026-03-27
   - [x] CCG-0010: Create openclaw plugin (2026-03-27)
   - [x] CCG-0009: Create CHANGELOG.md (2026-03-27)

   ### 2026-03-26
   - [x] CCG-0007: Rewrite /ntc (2026-03-26)
   ```
   If a date header already exists, add under it. Otherwise create a new one.
   Most recent dates first.

   **archive.log format:**
   ```
   [2026-03-27] CCG-0010: Create openclaw plugin for CC↔OC agent communication
   [2026-03-27] CCG-0009: Create CHANGELOG.md to track plugin changes
   [2026-03-26] CCG-0007: Rewrite /ntc to use /loop command
   ```

6. Process # Prompt section (BEFORE working tickets):

   **CRITICAL RULE:** All answers to questions in tickets.md MUST be written
   back into tickets.md. NEVER answer only in conversation output — the user
   reads tickets.md for responses, not the Claude conversation. The one
   exception is screenshots, which the user will paste into the chat.

   a. Handle commands (case insensitive). Match these as standalone bullet items
      (`- archive`), prefixed commands (`A: Y`), or bare words (`archive`):
      - Q: → Answer question in place IN tickets.md, keep Q&A visible
      - E: → Investigate error, fix if possible
      - I: → Investigate issue, generate report
      - A: Full / a:f / `- full archive` → Full archive
      - A: Y / a:y / `- archive` / `archive` → Standard archive
      - C: / `- commit` / `commit` → Create commit
      - `- commit and push` / `commit and push` → Create commit then push
      - P: → Add as deferred ticket (* [ ])
      - H: / ?: → Show help, toggle # Help section
      - CTX: → Update # Context section

   b. Convert ALL remaining items to tickets BEFORE starting any work:
      - IMPORTANT: Complete this entire sub-step for EVERY prompt item first.
        Do NOT interleave ticket creation with execution.
      - For each non-command item in # Prompt:
        i.  Analyze: is it clear enough to be actionable?
        ii. If unclear → create with TAQ: prefix (needs clarification)
        iii. Assign next ID from tickets.json counter
        iv. Create {ROOT}/tickets/{NNNN}/ directory
        v.  Create {ID}.details.md (hub) + {ID}.spec.md
        vi. Add to # Tasks: - [ ] {ID}: description
        vii. Update tickets.json counter
        viii. Sync to vault
      - After ALL items are converted: write tickets.md to disk so the
        user can review the full list and reprioritize before work begins.

   c. Clear processed items from # Prompt (keep Q&A pairs until archive)

7. Check `# Questions` section for answered questions:
   - For each `Q ({ID}):` that has a corresponding `A:` reply below it:
     a. Pass the answer to the ticket's context
     b. Change ticket from `[?]` back to `[*]` in # Tasks
     c. Clear the answered Q/A pair from # Questions

8. Work pending tickets (only after steps 6-7 are complete):
   - Priority order: [*] first (resume in-progress), then ![ ], then [ ]
   - Skip: * [ ] (deferred), [?] (waiting for answer), and TAQ:

   FOR EACH pending ticket:
   a. If [*] (in progress) → resume:
      - Read existing artifacts (spec.md, planning.md, worklog.md)
      - Pick up where the previous session left off
      - Skip /ticket start (already started)
   b. If [ ] or ![ ] → run /ticket start {ID}:
      - Mark [*] in tickets.md
      - Update details.md frontmatter
      - Create planning.md, tasks.md, worklog.md
      - Sync to vault

   b. Implement the work (Woz — see "Shared: Agent Spawning Rules"):
      - **Spawn a FRESH developer agent for this ticket** — never reuse
        an agent from a previous ticket. Zero prior task leakage.
      - Pass spec.md, planning.md, and relevant source files as context.
      - Follow the planning.md steps
      - Update worklog.md as you progress
      - Check off tasks.md subtasks
      - **If blocked / needs clarification:** Do NOT prompt interactively.
        Instead, add question to `# Questions` in tickets.md:
        ```
        Q ({TICKET-ID}): What database should this connect to?
        ```
        Then mark the ticket `[?]` in # Tasks and move to next ticket.
        When `/nt` runs again and finds an `A:` reply under the question,
        resume the ticket.

   c. Run /ticket complete {ID}:
      - **Spawn a FRESH tester/reviewer agent for QA** (Turing) — never
        reuse the implementation agent for QA.
      - QA gate (Turing)
      - Mark [x] in tickets.md
      - Update details.md, worklog.md
      - Sync to vault
      - Apply per-ticket commit/archive config

   d. Re-check # Prompt (new items take priority over remaining tickets)

9. When all done:
   - If datasource.type == "jira" → final JIRA sync (see [JIRA Sync Protocol](#jira-sync))
   - Report summary and exit
```

### With Ticket ID (single ticket)

```
1. Read tickets.json and tickets.md
2. Find the specified ticket
   - Not found → error: "Ticket {ID} not found"
   - Already [x] → report: "{ID} is already completed"

3. If [ ] (backlog) → run /ticket start {ID}
4. If [*] (in progress) → resume (read existing artifacts)

5. Implement the work (spawn FRESH developer agent — see "Shared: Agent Spawning Rules")

6. Run /ticket complete {ID} (spawn FRESH tester agent for QA gate)

7. Apply config (commit, archive)

8. Exit
```

**Continuous mode:** Use `/ntc` which invokes `/loop 10s /nt` for continuous polling.

---

<a name="worklog"></a>
## Subcommand: worklog

View or append to a ticket's worklog.

```
/ticket worklog DTX-0001            # View worklog
/ticket worklog 1 "Fixed the thing" # Append entry
```

### Workflow

```
1. Resolve ticket ID
2. If no message → read and display {ROOT}/tickets/{NNNN}/{FULL_ID}.worklog.md
3. If message provided → append timestamped entry to worklog
4. Sync to vault
```

---

<a name="spec-cmd"></a>
## Subcommand: spec

View or edit a ticket's spec.

```
/ticket spec DTX-0001               # View spec
/ticket spec 1                      # Short form
```

### Workflow

```
1. Resolve ticket ID
2. Read and display {ROOT}/tickets/{NNNN}/{FULL_ID}.spec.md
3. If user wants edits → modify in place
4. Sync to vault
```

---

<a name="planning-cmd"></a>
## Subcommand: planning

View or edit a ticket's planning doc.

```
/ticket planning DTX-0001
/ticket planning 1
```

### Workflow

```
1. Resolve ticket ID
2. Read and display {ROOT}/tickets/{NNNN}/{FULL_ID}.planning.md
3. If user wants edits → modify in place
4. Sync to vault
```

---

<a name="changelog"></a>
## Subcommand: changelog

Display changelog from ticket worklogs and git history.

```
/ticket changelog                   # Last 7 days (default)
/ticket changelog --days 14
/ticket changelog --grouped-by hour
```

### Workflow

```
1. Read tickets.json → project key
2. Determine date range (default: 7 days)
3. Scan {ROOT}/tickets/*/worklog.md for entries in range
4. Also scan git log for commits in range
5. Group by date (or hour if --grouped-by hour)
6. Display:

   Changelog: {PROJECT} (last {N} days)
   ════════════════════════════════════

   ## {YYYY-MM-DD}

   ### {ID}: {TITLE}
   - [{ROLE}] {worklog entry}
   - [{ROLE}] {worklog entry}

   ### {ID}: {TITLE}
   - [{ROLE}] {worklog entry}
```

---

<a name="burndown"></a>
## Subcommand: burndown

Display text-based burndown chart.

```
/ticket burndown                    # Last 7 days (default)
/ticket burndown --days 14
```

### Workflow

```
1. Read tickets.json → project key
2. Determine date range
3. For each day in range:
   - Count total tickets that existed
   - Count completed tickets
   - Remaining = total - completed
4. Display text chart:

   Burndown: {PROJECT} (last {N} days)
   ════════════════════════════════════
   Remaining │ ████████████████████████
             │ ██████████████████████
             │ ████████████████████
             │ ██████████████████
             │ ████████████████
             │ ██████████████
             │ ████████████
             ├──────────────────────────
               Mon  Tue  Wed  Thu  Fri
```

---

<a name="migrate"></a>
## Subcommand: migrate

Migrate between datasources.

```
/ticket migrate --type jira         # Local → JIRA
/ticket migrate --type local        # JIRA → Local
```

### Workflow (Phase 5 — stub for now)

```
1. Read tickets.json → current datasource
2. If --type jira:
   - Verify JIRA credentials available (check /jira skill config)
   - For each local ticket → create JIRA issue
   - Map local ID → JIRA key
   - Upload attachments
   - Update tickets.json datasource to jira
3. If --type local:
   - For each JIRA issue → download to local format
   - Create ticket directories and artifacts
   - Update tickets.json datasource to local

NOTE: Full implementation in Phase 5. For now, report:
"Migration is planned for Phase 5. Current datasource: {type}"
```

---

## Config Line Support

The tickets.md config line contains project name and archive settings:

```
name: my-project, archive: N
```

| Option | Values | Description |
|--------|--------|-------------|
| `archive` | `N`, `Y`, `Full`, `Auto`, `FullAuto` | When to archive completed tickets |

**Commit and push settings** are in `tickets.json` under `defaults`:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `autoCommit` | boolean | `false` | Auto-commit on ticket completion |
| `autoPush` | boolean | `false` | Auto-push after commit |

When `autoCommit`/`autoPush` are false, the user is asked on each ticket completion and offered the option to enable auto mode. To reset: edit tickets.json or run `/ticket config autoCommit false`.

---

## Prompt Section Commands

All prompt commands from /nt are supported in tickets.md:

| Command | Action |
|---------|--------|
| `Q:` | Answer question in place |
| `E:` | Investigate error |
| `I:` | Investigate issue, report |
| `A: Full` / `a:f` / `- full archive` | Full archive |
| `A: Y` / `a:y` / `- archive` / `archive` | Standard archive |
| `C:` / `- commit` / `commit` | Create commit |
| `- commit and push` | Create commit then push |
| `P:` | Defer ticket (add without executing) |
| `H:` / `?:` | Toggle help |
| `CTX:` | Update context section |

**Key difference from /nt:** New items in `# Prompt` become **tickets** (with IDs, directories, and artifacts) instead of simple numbered tasks.

---

<a name="jira-sync"></a>
## JIRA Sync Protocol

**Only applies when `datasource.type == "jira"` in tickets.json. Skip entirely for local datasources.**

### Process Sync (called from `/ticket process` step 3)

```
a. Pull latest from JIRA:
   - Use /jira skill or mcp__jira__jql_search to fetch issues for project
   - Query: project = {tickets.json → project key mapped to JIRA project}
   - For each JIRA issue returned:
     i.   If issue exists locally → update status, assignee, priority from JIRA
     ii.  If issue is NEW (not in tickets.md) → create local ticket:
          - Create {ROOT}/tickets/{NNNN}/ directory
          - Create details.md using the standard template (see details.md Hub File above)
            populated from JIRA fields:
            • summary → title
            • description → Description section
            • type (bug/story/task) → type field
            • priority → priority field
            • assignee → assignee field
          - Create spec.md using the standard template (see spec.md above)
          - **Completeness gate** — before adding to tickets.md, verify:
            • Description is non-empty (not just the JIRA summary repeated)
            • For bugs: STR section has real steps (not placeholders)
            • For bugs: Expected/Actual behavior is filled in
            • Acceptance criteria has at least one concrete item
            If any are missing, populate from JIRA fields where possible.
            If JIRA lacks the info, add `TAQ:` prefix to the ticket title
            in tickets.md so it gets flagged for clarification before work begins.
          - Add to # Tasks in tickets.md
          - Increment counter in tickets.json
     iii. If local ticket was completed but JIRA still open → flag for review
b. Push local changes to JIRA:
   - For tickets completed locally but not in JIRA → transition JIRA issue
   - For new local tickets not in JIRA → create JIRA issue (respects autoCreate gate)
   - For status changes → update JIRA issue status
c. Report sync summary:
   "JIRA Sync: {N} pulled, {M} pushed, {K} conflicts"
d. If sync fails → warn but continue (don't block local processing)
```

### Completion Sync (called from `/ticket complete` step 10)

```
- Transition JIRA issue to "Done" / completed status
- Add completion comment with QA result and worklog summary
- If JIRA transition fails → warn but don't block local completion
```

### Final Sync (called from `/ticket process` step 8)

```
- Push any remaining local changes to JIRA
- Same as Process Sync step (b) above
```

---

## TUI

Launch the interactive terminal UI for ticket management.

```
/ticket tui
```

### Steps

1. Locate `tickets.json` using the standard discovery order
2. Determine the project root and scripts directory from the plugin location
3. Run the TUI script:

```bash
node {PLUGIN_DIR}/scripts/ticket-tui.js {PROJECT_ROOT}
```

Where:
- `{PLUGIN_DIR}` is the directory containing this command file's plugin (found via `~/.claude/commands/ticket.md` → resolve to plugin scripts path)
- `{PROJECT_ROOT}` is the current working directory

### Fallback Discovery

If the plugin scripts path cannot be determined, look for the script at:
1. `{ROOT}/../../available-plugins/ticket/scripts/ticket-tui.js` (monorepo/config repo)
2. `~/.claude/plugins/ticket/scripts/ticket-tui.js` (user-level install)

### Prerequisites

The script requires Node.js and its dependencies to be installed:

```bash
cd {PLUGIN_DIR}/scripts && npm install
```

If `node_modules` is missing, prompt the user:

```
TUI dependencies not installed. Run:
  cd available-plugins/ticket/scripts && npm install
Then retry /ticket tui.
```

### Keyboard Reference

| Key | Action |
|-----|--------|
| `j` / `↓` | Move down |
| `k` / `↑` | Move up |
| `Enter` | View ticket details |
| `a` | Open action menu |
| `n` | Create new ticket |
| `/` | Search/filter |
| `Esc` | Back / cancel |
| `q` | Quit |
