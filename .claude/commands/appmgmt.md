---
description: "App management — unified release/deploy/backup/recover/verify for ScienceTrax apps"
---

# /appmgmt — App Management

Unified lifecycle operations for ScienceTrax apps. All operations run bash scripts — zero AI token burn at runtime.

**Registry:** `~/.claude/appmgmt-registry.json`
**Scripts:** `available-plugins/appmgmt/scripts/`
**Config:** `.claude/appmgmt.json` (per-project) or registry entry (cross-project)

## Safety Rules

<!--
SAFETY RULES — enforce these unconditionally:
1. NEVER set LESLIE_APPROVED_PROD_DEPLOY=1 without explicit user confirmation at each gate
2. NEVER skip the activate confirmation for production deploys
3. NEVER proceed with recovery without confirming the destructive database restore
4. NEVER skip the pre-deploy backup. Stop services FIRST, then backup. No exceptions. Never reuse an old backup.
5. NEVER hotfix files directly on servers. Always go through the full release pipeline (commit → release → deploy).
6. NEVER run local code against a remote server. Only code from the GitHub-released tarball runs on servers.
7. If SSH connection fails, stop immediately and report the error
8. Always show the rollback command after any deploy failure
-->

These rules apply to ALL app management operations. They are non-negotiable:
1. NEVER bypass production confirmation gates
2. NEVER skip pre-deploy backup (stop services FIRST, then backup)
3. NEVER proceed with recovery without explicit user confirmation
4. NEVER hotfix servers directly — always use the release pipeline
5. NEVER run local code on remote servers — only tarball contents
6. NEVER set LESLIE_APPROVED_PROD_DEPLOY=1 without user approval at each step
7. Stop immediately and report on SSH failure
8. Always show rollback command after any deploy failure

## Command Routing

Parse `$ARGUMENTS` to determine the app and subcommand, then call the appropriate script.

### Resolution Order

1. If the first argument is a known subcommand (`init`, `create`, `deploy`, `backup`, `recover`, `report`, `verify`, `rollback`, `help`) → auto-detect app from cwd
2. If the first argument is a known app name (check `~/.claude/appmgmt-registry.json`) → use that app, second arg is the subcommand
3. If neither → run `appmgmt-help.sh` and show error

### Routing Table

| Arguments | Script | Notes |
|-----------|--------|-------|
| (none) or `help` | `appmgmt-help.sh` | Show help + registered apps |
| `init` | `appmgmt-init.sh` | Interactive config wizard |
| `create [patch\|minor\|major\|X.Y.Z]` | `appmgmt-create.sh [bump]` | Create GitHub release |
| `deploy <alias> [--tag vX.Y.Z] [--create-release [bump]]` | `appmgmt-deploy.sh <alias> [flags]` | Full deploy workflow |
| `backup <alias>` | `appmgmt-backup.sh <alias>` | Backup app + DB |
| `recover <alias> [--backup <name>]` | `appmgmt-recover.sh <alias> [--backup <name>]` | Recover from backup |
| `report <alias>` | `appmgmt-report.sh <alias>` | Status report |
| `verify <alias>` | `appmgmt-verify.sh <alias>` | Health check |
| `rollback <alias> --tag vX.Y.Z` | `appmgmt-rollback.sh <alias> --tag <tag>` | Rollback to tag |

**With explicit app name prefix:** `/appmgmt etx deploy stx-prod` → detect `etx` as app name, `deploy stx-prod` as subcommand

### Execution Pattern

Parse `$ARGUMENTS` and run via Bash tool. The SCRIPTS_DIR is `available-plugins/appmgmt/scripts`.

**Example routing logic (implement this when executing):**

```
args = $ARGUMENTS
first_arg = first word of args
remaining = rest of args

known_subcommands = [init, create, deploy, backup, recover, report, verify, rollback, help]

if first_arg in known_subcommands:
    subcommand = first_arg
    sub_args = remaining
    # auto-detect app from cwd via appmgmt-common.sh
else:
    # Check if first_arg is a registered app name
    app_name = first_arg
    subcommand = first word of remaining
    sub_args = rest of remaining
```

Run scripts:

```bash
# Help
bash available-plugins/appmgmt/scripts/appmgmt-help.sh

# Init (interactive — run without extra args)
bash available-plugins/appmgmt/scripts/appmgmt-init.sh

# Create release
bash available-plugins/appmgmt/scripts/appmgmt-create.sh [app_name] [bump]

# Deploy
bash available-plugins/appmgmt/scripts/appmgmt-deploy.sh [app_name] <alias> [--tag vX.Y.Z] [--create-release [bump]]

# Backup
bash available-plugins/appmgmt/scripts/appmgmt-backup.sh [app_name] <alias>

# Recover
bash available-plugins/appmgmt/scripts/appmgmt-recover.sh [app_name] <alias> [--backup <name>]

# Report
bash available-plugins/appmgmt/scripts/appmgmt-report.sh [app_name] <alias>

# Verify
bash available-plugins/appmgmt/scripts/appmgmt-verify.sh [app_name] <alias>

# Rollback
bash available-plugins/appmgmt/scripts/appmgmt-rollback.sh [app_name] <alias> --tag <tag>
```

## Confirmation Gates

When a script outputs a line starting with `CONFIRMATION_REQUIRED:`, STOP and show the message to the user. Wait for explicit approval before continuing. NEVER auto-approve.

When a script outputs `ROLLBACK_CMD:`, show that command to the user as the recovery option.

## Unknown Commands

If arguments don't match any routing pattern:

```
/appmgmt [app] <subcommand> [args]

Subcommands:
  init                                       — Interactive config wizard
  create [patch|minor|major|X.Y.Z]           — Create a GitHub release
  deploy <alias> [--tag vX.Y.Z]              — Deploy release to server
  deploy <alias> --create-release [bump]     — Create release + deploy
  backup <alias>                             — Backup installation + DB
  recover <alias> [--backup <name>]          — Recover from backup
  report <alias>                             — Server status report
  verify <alias>                             — Health check
  rollback <alias> --tag vX.Y.Z             — Rollback to version

Auto-detects app from cwd or specify app name as first argument.
Run with no args to see registered apps and current project status.
```
