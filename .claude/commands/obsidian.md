---
description: Obsidian vault operations via official Obsidian CLI — search, links, backlinks, notes, tags, and more
---

Obsidian vault management via the official CLI (v1.12+). Parse `$ARGUMENTS` to determine the operation.

**Requires:** Obsidian Desktop v1.12+ running with CLI enabled (Settings → General → Command line interface).

## Prerequisites

```
1. Check if `obsidian` CLI is available: obsidian version
2. If not found → error:
   "Obsidian CLI not found. To enable:
    1. Open Obsidian Desktop (v1.12+)
    2. Settings → General → Command line interface → Enable
    3. Follow on-screen instructions to register CLI in PATH
    4. Restart your terminal"
3. If found but Obsidian not running → error:
   "Obsidian app must be running for CLI commands. Please start Obsidian."
```

## Vault Selection

For multi-vault setups, prefix commands with vault name:

```
obsidian "VaultName" <command>     # Specific vault
obsidian <command>                  # Default vault
```

Default vault: `C:/dev/vaults` (configurable via tickets.json → vault.path)

## Command Routing

| Input | Obsidian CLI Command | Description |
|-------|---------------------|-------------|
| `search <query>` | `obsidian search query="..."` | Full-text search across vault |
| `read <note>` | `obsidian read file="..."` | Read note contents |
| `create <path> [content]` | `obsidian create name="..."` | Create new note |
| `append <note> <text>` | `obsidian append file="..." content="..."` | Append to note |
| `prepend <note> <text>` | `obsidian prepend file="..." content="..."` | Prepend to note |
| `move <from> <to>` | `obsidian move from="..." to="..."` | Move/rename (auto-updates links) |
| `delete <note>` | `obsidian delete file="..."` | Delete note |
| `links <note>` | `obsidian links file="..."` | Outgoing wikilinks from note |
| `backlinks <note>` | `obsidian backlinks file="..."` | Notes linking TO this note |
| `orphans` | `obsidian orphans` | Notes with zero links |
| `unresolved` | `obsidian unresolved` | Broken/unresolved wikilinks |
| `deadends` | `obsidian deadends` | Notes linked to but don't exist |
| `tags [tag]` | `obsidian tags` / `obsidian tag tag="..."` | List all tags or find by tag |
| `tasks [note]` | `obsidian tasks` / `obsidian tasks file="..."` | List tasks |
| `props <note>` | `obsidian properties file="..."` | Read frontmatter properties |
| `prop:set <note> <k> <v>` | `obsidian property:set file="..." key="..." value="..."` | Set property |
| `daily` | `obsidian daily` | Open/read today's daily note |
| `daily:append <text>` | `obsidian daily:append content="..."` | Append to daily note |
| `outline <note>` | `obsidian outline file="..."` | Show heading outline |
| `recent` | `obsidian recents` | Recently opened notes |
| `eval <js>` | `obsidian eval code="..."` | Run JS against Obsidian API |
| `vaults` | `obsidian vaults` | List all known vaults |
| `info` | `obsidian vault` | Show current vault info |
| `plugins` | `obsidian plugins` | List installed plugins |
| `reload` | `obsidian reload` | Reload vault |
| (no args) | `obsidian vault` | Same as `info` |

## Execution

All commands run via Bash using the `obsidian` CLI binary:

```bash
obsidian <command> [key=value ...] [flags]
```

**Common flags:**
- `--format=json` — Machine-readable JSON output (use for parsing)
- `--format=plain` — Human-readable plain text (default)
- `--silent` — Suppress non-essential output

## Key Workflows

### Search and explore

```
obsidian search query="meeting notes"           # Full-text search
obsidian search query="tag:#project" --format=json  # Search with tag filter
obsidian links file="my-note"                   # What does this note link to?
obsidian backlinks file="my-note"               # What links TO this note?
obsidian orphans                                 # Find disconnected notes
obsidian unresolved                              # Find broken links
```

### Knowledge management

```
obsidian create name="New Concept" content="# New Concept\n\nDefinition here..."
obsidian append file="daily" content="- 14:30: Discovered X relates to [[Y]]"
obsidian property:set file="note" key="status" value="reviewed"
obsidian tags                                    # See all tags and counts
obsidian tag tag="project"                       # Find all notes with #project
```

### Daily notes / journaling

```
obsidian daily                                   # Read today's daily note
obsidian daily:append content="## Meeting Notes\n- Discussed X"
obsidian daily:prepend content="**Focus:** Ship feature Y"
obsidian daily:path                              # Get path to today's note
```

### Vault health / audit

```
obsidian orphans                                 # Notes nobody links to
obsidian unresolved                              # Links pointing to nothing
obsidian deadends                                # Notes that are linked but don't exist
obsidian vault                                   # Vault stats
```

### Move / rename (auto-updates all backlinks)

```
obsidian move from="old-name" to="folder/new-name"
```

This is the killer feature — moving a note via CLI automatically updates every wikilink pointing to it across the entire vault. Never use `mv` or `git mv` for Obsidian notes.

### Advanced: JS evaluation

```
obsidian eval code="app.vault.getFiles().length"
obsidian eval code="app.metadataCache.getBacklinksForFile(app.vault.getAbstractFileByPath('note.md'))"
```

## Integration with Ticket System

When vault sync is enabled, ticket artifacts live in the vault. Use the CLI to query them:

```
/obsidian search "DOT-0005"                      # Find all mentions
/obsidian backlinks "tickets/DOT/0005/DOT-0005.details"  # What links to this ticket?
/obsidian links "tickets/DOT/0005/DOT-0005.details"      # What does this ticket link to?
/obsidian tags                                    # See ticket tags across vault
```

## Fallback

If the Obsidian CLI is unavailable (app not running, CLI not enabled), fall back to file-based operations using Grep/Glob/Read tools directly on the vault directory. This provides search and read capabilities but NOT:
- Auto-updating links on move/rename
- Obsidian metadata cache access
- Plugin integration
- Template expansion
