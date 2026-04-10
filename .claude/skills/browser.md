---
name: browser
description: Browser automation with 5-tier cost escalation — WebSearch → WebFetch → PinchTab → Chrome DevTools → Playwright
user-invocable: true
---

# Browser Skill

Unified browser automation that picks the cheapest effective tool. Parse `$ARGUMENTS` to determine the task.

## Tier Hierarchy

| Tier | Tool | Cost | Use When |
|------|------|------|----------|
| 1 | **WebSearch** | ~50 tokens | Need factual info, URLs, general knowledge, current events |
| 2 | **WebFetch/curl** | ~200 tokens | Need HTML content, API responses, no JS required |
| 3 | **PinchTab** | ~800 tokens/page | Need JS-rendered content, user interactions, form filling |
| 4 | **Chrome DevTools** | ~5000+ tokens | Need perf tracing, Lighthouse, memory snapshots, network inspection |
| 5 | **Playwright** | Variable | Need E2E scripts, complex multi-step automation, test recording |

**Rule: Always start at the lowest tier that can handle the task. Escalate only when a tier fails or the task requires capabilities exclusive to a higher tier.**

## Prerequisites

Before using any tier, verify its tool is available. Check only the tier you're about to use — don't check all tiers upfront.

| Tier | Check | How |
|------|-------|-----|
| 1 — WebSearch | Built-in CC tool | Always available, no check needed |
| 2 — WebFetch | Built-in CC tool | Always available, no check needed |
| 3 — PinchTab | Server running | Run `pinchtab health` via Bash |
| 4 — Chrome DevTools | MCP server connected | Check if `mcp__chrome-devtools__*` tools are available |
| 5 — Playwright | CLI installed | Run `npx playwright --version` via Bash |

**If a prerequisite is not met:**

```
[Browser: Tier {N} — {tool}] Not available.

To use {tool}, you need to:
- {installation/setup instruction}

Shall I try the next tier instead, or would you like to set up {tool} first?
```

**Specific setup instructions:**

| Tool | Setup |
|------|-------|
| PinchTab | Install: `npm install -g pinchtab`, then start: `pinchtab server` |
| Chrome DevTools | Add the chrome-devtools MCP server to `settings.json`. See: https://github.com/anthropics/claude-code/tree/main/mcp-servers/chrome-devtools |
| Playwright | Install: `npm install -D @playwright/test && npx playwright install --with-deps` |

If the required tier is unavailable and there's no higher tier that can do the task, report the prerequisite failure and stop. Don't silently skip — always inform the user.

## Tier Selection Logic

Analyze the request and select the initial tier:

### Tier 1: WebSearch (try first for these)

- Finding a URL or website
- Looking up facts, documentation, or current information
- Checking if something exists online
- Getting a list of results for a query
- Any question answerable from search results without visiting a specific page

**Use the WebSearch tool directly.** If you need the actual page content (not just search result snippets), escalate to Tier 2.

### Tier 2: WebFetch (try first for these)

- Fetching page content / HTML from a known URL
- API calls (GET, POST JSON)
- Downloading files
- Reading static pages
- Checking if a URL is reachable
- Getting response headers

**Use WebFetch tool directly.** If the response indicates the content requires JS rendering (empty body, "please enable JavaScript", SPA shell only), report and escalate to Tier 3.

### Tier 3: PinchTab (try first for these)

- Any request involving interaction (click, fill, type, select)
- Screenshots of rendered pages
- Pages known to require JavaScript
- Form submission
- Multi-step navigation
- Finding elements by description
- Content extraction from JS-rendered pages

**Execute via Bash:**
```bash
pinchtab <command> [args]
```

Before first PinchTab use, check server health:
```bash
pinchtab health
```
If not running, start it: `pinchtab server` (background), wait 2s, retry health.

If PinchTab fails or the task requires DevTools-exclusive features, escalate to Tier 4.

### Tier 4: Chrome DevTools (only for these)

These capabilities are **exclusive to Chrome DevTools** — no other tier can do them:

- `performance_start_trace` / `performance_stop_trace` — performance profiling
- `performance_analyze_insight` — performance analysis
- `lighthouse_audit` — Lighthouse audits
- `take_memory_snapshot` — memory leak detection
- `list_network_requests` / `get_network_request` — network inspection
- `list_console_messages` / `get_console_message` — console monitoring
- `emulate` — device emulation
- `evaluate_script` — arbitrary JS execution in page context
- `handle_dialog` — alert/confirm/prompt handling
- `upload_file` — file uploads to inputs
- `drag` — drag and drop

**Use `mcp__chrome-devtools__*` tools directly.**

### Tier 5: Playwright (only for these)

- Writing persistent, replayable E2E test scripts (`.spec.ts` files)
- Recording user flows via `npx playwright codegen`
- Running automated test suites
- Complex multi-step automation that needs to be version-controlled and rerun
- CI/CD test integration
- Tasks that require a script artifact, not just a one-off interaction

**Execute via Bash:**
```bash
npx playwright <command> [args]
```

For script generation, write `.spec.ts` files to the project's test directory.

Use Playwright when the task requires a persistent, replayable automation script — not just a one-off interaction (use PinchTab for that).

## Command Routing

| Input | Tier | Action |
|-------|------|--------|
| `search <query>` | 1 | WebSearch the query, return results |
| `fetch <url>` | 2 | WebFetch the URL, return content |
| `screenshot <url>` | 3 | Navigate + screenshot via PinchTab |
| `click <url> <target>` | 3 | Navigate + find + click via PinchTab |
| `fill <url> <fields...>` | 3 | Navigate + fill form via PinchTab |
| `scrape <url> [selector]` | 2→3 | Try WebFetch first, escalate if JS needed |
| `interact <url> <instructions>` | 3 | Multi-step PinchTab interaction |
| `perf <url>` | 4 | Performance trace via DevTools |
| `audit <url>` | 4 | Lighthouse audit via DevTools |
| `network <url>` | 4 | Network request capture via DevTools |
| `console <url>` | 4 | Console message capture via DevTools |
| `emulate <device> <url>` | 4 | Device emulation via DevTools |
| `test <url>` | 5 | Generate Playwright test script for URL |
| `record <url>` | 5 | Record user flow via Playwright codegen |
| `script <task>` | 5 | Write Playwright automation script for task |
| `<natural language request>` | auto | Analyze and pick tier |

## Escalation Protocol

When a tier fails or returns insufficient results:

```
1. Report: "Tier {N} ({tool}): {reason for failure/insufficiency}"
2. Escalate: "Escalating to Tier {N+1} ({next tool})..."
3. Attempt next tier
4. If all tiers exhausted: report failure with details from each attempt
```

**Examples of escalation triggers:**

**When to start at Tier 1 (WebSearch):**
- Need current/live information (knowledge cutoff may be stale)
- Need to find a URL (search is more efficient than guessing)

| Tier 1 → Tier 2 | Reason |
|------------------|--------|
| Need actual page content | Search results have snippets only |
| Need full HTML / API response | WebSearch doesn't fetch page bodies |

| Tier 2 → Tier 3 | Reason |
|------------------|--------|
| Empty/minimal HTML body | Page requires JS rendering |
| "Please enable JavaScript" in response | SPA, needs browser |
| Need to interact with page | WebFetch can't click/fill |
| Need screenshot | WebFetch returns text only |

| Tier 3 → Tier 4 | Reason |
|------------------|--------|
| Need performance metrics | PinchTab can't trace |
| Need Lighthouse score | Exclusive to DevTools |
| Need memory snapshot | Exclusive to DevTools |
| Need network waterfall | PinchTab has basic network only |
| PinchTab server won't start | Fall back to DevTools for basic browsing |

| Tier 4 → Tier 5 | Reason |
|------------------|--------|
| Need replayable test script | DevTools is one-off, not scriptable |
| Task requires CI/CD integration | Playwright has test runner |
| Need to record and save a user flow | Playwright codegen produces `.spec.ts` |

## Reporting

**Always report the tier used**, in this format at the start of your response:

```
[Browser: Tier {N} — {tool name}] {brief reason}
```

Examples:
- `[Browser: Tier 1 — WebSearch] Finding documentation URL`
- `[Browser: Tier 2 — WebFetch] Static HTML page, no JS needed`
- `[Browser: Tier 3 — PinchTab] Page requires JavaScript rendering`
- `[Browser: Tier 3 — PinchTab] Interactive task (form fill)`
- `[Browser: Tier 3 — PinchTab] Escalated from WebFetch (empty body, JS required)`
- `[Browser: Tier 4 — Chrome DevTools] Lighthouse audit (exclusive capability)`
- `[Browser: Tier 5 — Playwright] Generating replayable E2E test script`

## Natural Language Handling

When the user provides a natural language request instead of a specific command:

1. Analyze the request for tier-determining keywords:
   - "search", "find", "look up", "what is", "who is", "where is" → start at Tier 1
   - "fetch", "get", "download", "check if", "read", "what does this page say" → start at Tier 2
   - "click", "fill", "submit", "sign up", "log in", "screenshot", "navigate" → start at Tier 3
   - "performance", "lighthouse", "audit", "memory", "network trace", "emulate" → start at Tier 4
   - "write a test", "record a flow", "create a spec", "automate and save", "e2e test" → start at Tier 5

2. If ambiguous, start at Tier 1 and escalate as needed.

## Examples

### Search for information (Tier 1)
```
/browser search Playwright vs Cypress comparison 2025
→ [Browser: Tier 1 — WebSearch] Finding comparison information
```

### Fetch a page (Tier 2)
```
/browser fetch https://api.example.com/data
→ [Browser: Tier 2 — WebFetch] API endpoint, returning JSON
```

### Screenshot (Tier 3)
```
/browser screenshot https://example.com
→ [Browser: Tier 3 — PinchTab] Screenshot requires rendered page
→ pinchtab nav https://example.com
→ pinchtab screenshot
```

### Scrape with escalation (Tier 2 → 3)
```
/browser scrape https://spa-app.com
→ [Browser: Tier 2 — WebFetch] Attempting fetch...
→ [Browser: Tier 2 — WebFetch] Empty body detected, JS required
→ [Browser: Tier 3 — PinchTab] Escalated — fetching rendered content
→ pinchtab nav https://spa-app.com
→ pinchtab text
```

### Lighthouse audit (Tier 4)
```
/browser audit https://example.com
→ [Browser: Tier 4 — Chrome DevTools] Lighthouse audit (exclusive capability)
→ mcp__chrome-devtools__lighthouse_audit(...)
```

### Generate E2E test (Tier 5)
```
/browser test https://example.com/login
→ [Browser: Tier 5 — Playwright] Generating replayable test script
→ npx playwright codegen --output tests/login.spec.ts https://example.com/login
```
