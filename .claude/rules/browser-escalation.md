# Browser Escalation — Cost-Tiered Tool Selection

Always use the lowest-cost tier that can complete the task. Escalate only when a tier fails or the task requires exclusive capabilities.

## Tier Table

| Tier | Tool | Cost | Use When |
|------|------|------|----------|
| 1 | WebSearch | ~50 tokens | Need factual info, URLs, general knowledge, current events |
| 2 | WebFetch/curl | ~200 tokens | Need HTML content, API responses, no JS required |
| 3 | PinchTab | ~800 tokens/page | Need JS-rendered content, user interactions, form filling |
| 4 | Chrome DevTools | ~5000+ tokens | Need perf tracing, Lighthouse, memory snapshots, network inspection |
| 5 | Playwright | Variable | Need E2E scripts, complex multi-step automation, test recording |

## Tier Selection

**Start at Tier 1 unless the task clearly requires a higher tier.**

| Task Type | Start Tier |
|-----------|-----------|
| Find info, look up facts, search for URLs | 1 |
| Fetch known URL, read static HTML, API call | 2 |
| Interact with page, fill forms, screenshot | 3 |
| Performance profiling, Lighthouse, memory | 4 |
| Write replayable test scripts, record flows | 5 |

## Escalation Triggers

| From → To | Trigger |
|-----------|---------|
| Tier 1 → 2 | Need full page content, not just search snippets |
| Tier 2 → 3 | Empty body / JS required, need interaction, need screenshot |
| Tier 3 → 4 | Need performance metrics, Lighthouse, memory snapshot, network waterfall |
| Tier 4 → 5 | Need replayable script, CI integration, saved user flow recording |

## Key Rules

- **WebSearch first** when looking for information — it's 4x cheaper than WebFetch and 60x cheaper than PinchTab
- **PinchTab over Chrome DevTools** for all basic browsing — PinchTab uses accessibility tree (~800 tokens) vs screenshots (~5000+ tokens), making it 5-13x more efficient
- **Playwright only for scripts** — use PinchTab for one-off interactions; use Playwright when the task needs a persistent, replayable `.spec.ts` file
- **Chrome DevTools only for exclusive features** — performance tracing, Lighthouse, memory snapshots, device emulation

## Reporting Format

Always report the tier used at the start of the response:

```
[Browser: Tier {N} — {tool name}] {brief reason}
```
