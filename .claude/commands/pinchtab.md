---
description: Browser automation via PinchTab — preferred over Chrome DevTools (5-13x more token-efficient)
---

PinchTab browser control skill. Parse `$ARGUMENTS` to determine the operation.

**PinchTab uses the accessibility tree (~800 tokens/page) instead of screenshots (~5000+ tokens). Always prefer PinchTab over Chrome DevTools MCP for browser automation.**

## Prerequisites

Before any operation, ensure PinchTab server is running:

```
1. Run: pinchtab health
2. If server not running → start it: pinchtab server (run in background)
3. Wait 2 seconds for startup, then retry health check
```

## Command Routing

| Input | Operation | Description |
|-------|-----------|-------------|
| `nav <url>` | Navigate | Open URL in browser |
| `snap` | Snapshot | Get accessibility tree of current page |
| `quick <url>` | Quick | Navigate + analyze page in one step |
| `click <ref>` | Click | Click element by ref (e0, e1, etc.) |
| `find <query>` | Find | Find elements by natural language |
| `type <ref> <text>` | Type | Type into element (simulates keystrokes) |
| `fill <ref> <text>` | Fill | Fill input directly (instant, no keystrokes) |
| `press <key>` | Press | Press key (Enter, Tab, Escape, etc.) |
| `screenshot [--output path]` | Screenshot | Take page screenshot |
| `pdf [--output path]` | PDF | Export page as PDF |
| `eval <js>` | Evaluate | Run JavaScript on page |
| `wait <selector\|ms>` | Wait | Wait for element, text, URL, or duration |
| `scroll <ref\|pixels>` | Scroll | Scroll to element or by pixels |
| `tab [id]` | Tabs | List tabs or focus a specific tab |
| `text` | Text | Extract all page text |
| `select <ref> <option>` | Select | Select dropdown option |
| `back` / `forward` | History | Browser history navigation |
| `reload` | Reload | Reload current page |
| `upload <ref> <file>` | Upload | Upload file to file input |
| `network` | Network | List network requests |
| (no args) | Status | Show server health + active tabs |

## Execution

Run the PinchTab CLI command directly via Bash:

```bash
pinchtab <command> [args] [flags]
```

## Common Workflows

### Browse and interact with a page

```
1. pinchtab nav https://example.com
2. pinchtab snap --interactive        # See interactive elements only
3. pinchtab click e3                  # Click element ref e3
4. pinchtab wait --load networkidle   # Wait for page to settle
5. pinchtab snap                      # See updated page
```

### Fill out a form

```
1. pinchtab nav https://example.com/form
2. pinchtab snap --interactive
3. pinchtab fill e1 "John Doe"       # Fill name field
4. pinchtab fill e2 "john@test.com"  # Fill email field
5. pinchtab select e3 "Option A"     # Select dropdown
6. pinchtab click e4                  # Submit button
```

### Find element by description

```
1. pinchtab find "login button"       # Natural language element search
2. pinchtab click <returned-ref>
```

### Multi-tab workflow

```
1. pinchtab nav https://site-a.com
2. pinchtab nav https://site-b.com --new-tab
3. pinchtab tab                       # List all tabs
4. pinchtab tab <id>                  # Switch to specific tab
5. pinchtab snap --tab <id>           # Snap specific tab
```

## Useful Flags

| Flag | Command | Purpose |
|------|---------|---------|
| `--interactive` / `-i` | snap | Show only interactive elements |
| `--compact` / `-c` | snap | Compact output (fewer tokens) |
| `--diff` / `-d` | snap | Show diff from previous snapshot |
| `--selector` / `-s` | snap | Scope to CSS selector |
| `--new-tab` | nav | Open in new tab |
| `--block-ads` | nav | Block ads |
| `--wait-nav` | click | Wait for navigation after click |
| `--css` | click | Use CSS selector instead of ref |
| `--ref-only` | find | Output just the element ref |
| `--output` / `-o` | screenshot | Save to file path |

## When to Use PinchTab vs Chrome DevTools

| Use PinchTab for | Use Chrome DevTools for |
|------------------|------------------------|
| Page interaction (click, fill, navigate) | Performance tracing |
| Form filling | Memory snapshots |
| Content extraction | Lighthouse audits |
| Multi-tab workflows | Console message monitoring |
| Element finding | Detailed network inspection |
| General browsing | Device emulation |

**Default: PinchTab.** Only fall back to Chrome DevTools for Chrome-specific dev tools features listed above.
