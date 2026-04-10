---
description: "Browser UI test automation with Playwright"
---

Playwright test automation skill. Parse `$ARGUMENTS` to determine the operation.

## Command Routing

| Input | Operation | Section |
|-------|-----------|---------|
| `init` | Initialize Playwright in project | [Init](#init) |
| `run [spec] [flags]` | Run tests | [Run](#run) |
| `record [url]` | Record a new test via codegen | [Record](#record) |
| `debug [spec]` | Run in headed/debug mode | [Debug](#debug) |
| `report` | Open last test report | [Report](#report) |
| `fix <spec>` | Diagnose and fix a failing test | [Fix](#fix) |
| `trace <zip>` | Open trace viewer for a trace file | [Trace](#trace) |
| `update` | Update Playwright and browsers | [Update](#update) |
| (no args) | Run all tests | [Run](#run) |

---

## Init

Install Playwright and scaffold configuration.

```bash
# Install Playwright and browsers
npm init playwright@latest

# Or add to existing project
npm install -D @playwright/test
npx playwright install --with-deps
```

After install, verify the config file exists: `playwright.config.ts` (or `.js`).

**Recommended config scaffold:**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallelTests: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

**Key decisions during init:**

| Question | Recommendation |
|----------|---------------|
| Test directory | `tests/` or `e2e/` — be consistent with project conventions |
| TypeScript or JS | Match the project's language |
| GitHub Actions | Yes if CI exists — generates `.github/workflows/playwright.yml` |
| Base URL | Set to local dev server URL |

---

## Run

Run tests. Parse flags from arguments.

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/login.spec.ts

# Run tests matching a title pattern
npx playwright test -g "should login"

# Run in a specific project/browser
npx playwright test --project=chromium

# Run with specific number of workers
npx playwright test --workers=4

# Run a specific test directory
npx playwright test tests/auth/
```

**Useful flags:**

| Flag | Purpose |
|------|---------|
| `--project=<name>` | Run in specific browser project |
| `--workers=<n>` | Parallel worker count |
| `--retries=<n>` | Retry failed tests N times |
| `--grep "pattern"` / `-g` | Filter by test title |
| `--grep-invert "pattern"` | Exclude tests by title |
| `--reporter=list` | Use list reporter (better for CI logs) |
| `--update-snapshots` | Update visual comparison baselines |
| `--last-failed` | Re-run only previously failed tests |
| `--repeat-each=<n>` | Run each test N times (flaky detection) |
| `--shard=<i>/<total>` | Shard tests for parallel CI |

---

## Record

Launch Playwright codegen to record user interactions as test code.

```bash
# Record from a URL
npx playwright codegen http://localhost:3000

# Record with specific viewport
npx playwright codegen --viewport-size=1280,720 http://localhost:3000

# Record with device emulation
npx playwright codegen --device="iPhone 13" http://localhost:3000

# Save output to a file
npx playwright codegen --output tests/recorded.spec.ts http://localhost:3000

# Record with saved auth state
npx playwright codegen --load-storage=auth.json http://localhost:3000
```

**After recording:** Always clean up generated code:
1. Replace fragile CSS selectors with `getByRole`, `getByText`, `getByTestId`
2. Add meaningful test names and `test.describe` grouping
3. Add assertions — codegen records actions but not verification
4. Extract repeated sequences into helper functions or POM classes

---

## Debug

Run tests in headed mode with Playwright Inspector.

```bash
# Debug all tests
npx playwright test --debug

# Debug a specific test file
npx playwright test tests/login.spec.ts --debug

# Run headed without inspector (watch it run)
npx playwright test --headed

# Debug with UI mode (interactive test runner)
npx playwright test --ui

# Debug with trace viewer on
npx playwright test --trace on
```

**UI Mode** (`--ui`) is the most powerful debugging tool. It provides:
- Step-by-step execution with time-travel
- DOM snapshot at each action
- Network log, console log
- Pick locator tool

---

## Report

Open the HTML test report from the last run.

```bash
npx playwright show-report
```

The report is generated at `playwright-report/` by default. It contains:
- Test results grouped by file and describe block
- Screenshots on failure (if configured)
- Trace files (if configured)
- Execution time per test

---

## Trace

Open the trace viewer to inspect a test run step-by-step.

```bash
# Open a trace file
npx playwright show-trace trace.zip

# Traces are typically at:
# test-results/<test-name>/trace.zip
```

The trace viewer shows:
- Action log with screenshots at each step
- DOM snapshots (inspectable)
- Network requests
- Console messages
- Source code location for each action

---

## Fix

Diagnose and auto-fix a failing test. Follow this procedure:

### Step 1: Run the failing test and capture output

```bash
npx playwright test <spec> --reporter=list 2>&1
```

### Step 2: Identify the error type

Read the error output and classify it using the [Error Diagnosis Reference](#error-diagnosis-reference) below.

### Step 3: If a trace exists, inspect it

```bash
# Check for trace files
ls test-results/*/trace.zip 2>/dev/null
```

### Step 4: Read the test file and the relevant source code

Understand what the test expects vs what the application does.

### Step 5: Apply the fix

Based on the error type, apply the appropriate fix from the error reference. Common fixes:
- Selector not finding element: Update to use recommended locator strategy
- Timing issue: Replace `waitForTimeout` with proper waits
- Strict mode violation: Make selector more specific
- Stale element: Re-query after navigation

### Step 6: Re-run and verify

```bash
npx playwright test <spec> --reporter=list
```

If the test still fails, repeat from Step 2 with the new error.

---

## Update

Update Playwright to latest version and refresh browsers.

```bash
npm install -D @playwright/test@latest
npx playwright install --with-deps
```

---

## Selector Strategy

**Priority order — always prefer higher-priority selectors:**

| Priority | Method | Example | When to use |
|----------|--------|---------|-------------|
| 1 | `getByRole` | `page.getByRole('button', { name: 'Submit' })` | Interactive elements with accessible names |
| 2 | `getByText` | `page.getByText('Welcome back')` | Visible text content |
| 3 | `getByLabel` | `page.getByLabel('Email address')` | Form fields with labels |
| 4 | `getByPlaceholder` | `page.getByPlaceholder('Enter email')` | Inputs with placeholder text |
| 5 | `getByAltText` | `page.getByAltText('Company logo')` | Images with alt text |
| 6 | `getByTitle` | `page.getByTitle('Close dialog')` | Elements with title attribute |
| 7 | `getByTestId` | `page.getByTestId('submit-btn')` | When no semantic selector works — requires `data-testid` in source |
| 8 | `locator('css')` | `page.locator('.btn-primary')` | Last resort — fragile, breaks on redesign |

**Why this order matters:** Role-based selectors mirror how users and assistive technology interact with the page. They survive CSS refactors, class renames, and structural changes. CSS selectors break when the UI is restyled.

### Locator Chaining

```typescript
// Filter by child content
page.getByRole('listitem').filter({ hasText: 'Product A' })

// Filter by nested locator
page.getByRole('listitem').filter({ has: page.getByRole('button', { name: 'Buy' }) })

// Positional selection
page.getByRole('listitem').first()
page.getByRole('listitem').last()
page.getByRole('listitem').nth(2)

// Chain locators (scoped queries)
page.getByRole('dialog').getByRole('button', { name: 'Confirm' })
```

### Text Matching

```typescript
// Exact match
page.getByText('Submit', { exact: true })

// Regex match
page.getByText(/submit/i)

// Substring match (default behavior — avoid for common words)
page.getByText('Submit')
```

---

## Waiting and Timing

**Rule: NEVER use `page.waitForTimeout()`.** It is always wrong. It either waits too long (slow tests) or not long enough (flaky tests).

### What to use instead

| Scenario | Correct approach |
|----------|-----------------|
| Wait for element to appear | `await expect(locator).toBeVisible()` — auto-retries |
| Wait for text to appear | `await expect(locator).toHaveText('...')` — auto-retries |
| Wait for page navigation | `await page.waitForURL('**/dashboard')` |
| Wait for page load | `await page.waitForLoadState('networkidle')` |
| Wait for API response | `await page.waitForResponse('**/api/data')` |
| Wait for element to disappear | `await expect(locator).toBeHidden()` — auto-retries |
| Wait for download | `const download = await page.waitForEvent('download')` |
| Wait for file chooser | `const fc = await page.waitForEvent('filechooser')` |

### Auto-Wait Behavior

Playwright auto-waits before actions (`click`, `fill`, `type`, etc.):
1. Element is attached to DOM
2. Element is visible
3. Element is stable (not animating)
4. Element receives events (not obscured)
5. Element is enabled

You do NOT need to add waits before actions. If an action times out, the issue is usually a wrong selector, not a missing wait.

### Increasing Timeout for Slow Operations

```typescript
// Per-assertion timeout
await expect(locator).toBeVisible({ timeout: 10_000 })

// Per-action timeout
await locator.click({ timeout: 10_000 })

// Per-test timeout
test('slow test', async ({ page }) => {
  test.setTimeout(60_000)
  // ...
})

// Global in config
export default defineConfig({
  timeout: 30_000,          // per-test timeout
  expect: { timeout: 5_000 }, // per-assertion timeout
})
```

---

## Assertions

Playwright has two assertion types. Understanding the difference prevents flaky tests.

### Auto-Retrying Assertions (use for DOM state)

These re-check until the condition is met or timeout. **Always prefer these.**

```typescript
await expect(locator).toBeVisible()
await expect(locator).toBeHidden()
await expect(locator).toBeEnabled()
await expect(locator).toBeDisabled()
await expect(locator).toBeChecked()
await expect(locator).toHaveText('expected')
await expect(locator).toContainText('partial')
await expect(locator).toHaveValue('input value')
await expect(locator).toHaveAttribute('href', '/path')
await expect(locator).toHaveClass(/active/)
await expect(locator).toHaveCount(5)
await expect(locator).toHaveCSS('color', 'rgb(0, 0, 0)')
await expect(page).toHaveURL('**/dashboard')
await expect(page).toHaveTitle(/Dashboard/)
```

### Non-Retrying Assertions (use for static values)

These execute once. Use only for values that do not change.

```typescript
expect(value).toBe(5)
expect(array).toContain('item')
expect(object).toEqual({ key: 'value' })
expect(string).toMatch(/pattern/)
```

**Common mistake:** Using `expect(await locator.textContent()).toBe('text')` instead of `await expect(locator).toHaveText('text')`. The first fetches text once and may miss async updates. The second retries automatically.

---

## Test Isolation and Structure

### Each Test Gets Fresh State

Every `test()` function gets a fresh browser context. No cookies, localStorage, or session state leaks between tests.

```typescript
import { test, expect } from '@playwright/test';

test.describe('Login page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('shows error on invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('bad@example.com');
    await page.getByLabel('Password').fill('wrong');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });

  test('redirects to dashboard on success', async ({ page }) => {
    await page.getByLabel('Email').fill('user@example.com');
    await page.getByLabel('Password').fill('correct');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL('**/dashboard');
  });
});
```

### Serial Tests (when order matters)

```typescript
test.describe.serial('checkout flow', () => {
  test('add item to cart', async ({ page }) => { /* ... */ });
  test('enter shipping info', async ({ page }) => { /* ... */ });
  test('complete payment', async ({ page }) => { /* ... */ });
});
```

**Avoid serial tests unless absolutely necessary.** They cannot run in parallel and one failure skips the rest.

---

## Page Object Model (POM)

For large test suites, encapsulate page interactions in classes.

```typescript
// pages/login-page.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
}
```

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test('shows error on invalid login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('bad@test.com', 'wrong');
  await loginPage.expectError('Invalid credentials');
});
```

**POM rules:**
- One class per page or significant component
- Locators as readonly properties, set in constructor
- Methods for user-visible actions (login, addToCart), not low-level steps
- Assertions can live in POM if they represent domain concepts

---

## Custom Fixtures

Extend Playwright's base test with reusable setup.

```typescript
// fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from './pages/login-page';

type MyFixtures = {
  loginPage: LoginPage;
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'auth.json',
    });
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});

export { expect } from '@playwright/test';
```

---

## Authentication

### Save and Reuse Auth State

```typescript
// global-setup.ts — runs once before all tests
import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/login');
  await page.getByLabel('Email').fill('admin@test.com');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('**/dashboard');
  await page.context().storageState({ path: 'auth.json' });
  await browser.close();
}

export default globalSetup;
```

```typescript
// playwright.config.ts
export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  projects: [
    { name: 'setup', testMatch: /global-setup\.ts/ },
    {
      name: 'chromium',
      use: {
        storageState: 'auth.json',
      },
      dependencies: ['setup'],
    },
  ],
});
```

---

## API Mocking

Intercept and mock network requests to isolate UI tests from backends.

```typescript
// Mock a GET request
await page.route('**/api/users', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{ id: 1, name: 'Alice' }]),
  });
});

// Mock with conditional logic
await page.route('**/api/search*', async (route) => {
  const url = new URL(route.request().url());
  const query = url.searchParams.get('q');
  if (query === 'error') {
    await route.fulfill({ status: 500, body: 'Server error' });
  } else {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ results: [] }),
    });
  }
});

// Intercept and modify response
await page.route('**/api/config', async (route) => {
  const response = await route.fetch();
  const json = await response.json();
  json.featureFlags.newUI = true;
  await route.fulfill({ response, body: JSON.stringify(json) });
});

// Abort requests (e.g., block analytics)
await page.route('**/analytics/**', (route) => route.abort());

// Wait for a specific API call
const responsePromise = page.waitForResponse('**/api/save');
await page.getByRole('button', { name: 'Save' }).click();
const response = await responsePromise;
expect(response.status()).toBe(200);
```

---

## Screenshots, Videos, and Traces

### Config-level (recommended)

```typescript
export default defineConfig({
  use: {
    screenshot: 'only-on-failure',  // 'on', 'off', 'only-on-failure'
    video: 'retain-on-failure',     // 'on', 'off', 'retain-on-failure', 'on-first-retry'
    trace: 'on-first-retry',        // 'on', 'off', 'on-first-retry', 'retain-on-failure'
  },
});
```

### Programmatic

```typescript
// Take a screenshot
await page.screenshot({ path: 'screenshots/home.png', fullPage: true });

// Screenshot a specific element
await page.getByTestId('chart').screenshot({ path: 'screenshots/chart.png' });

// Visual comparison (snapshot testing)
await expect(page).toHaveScreenshot('homepage.png', {
  maxDiffPixelRatio: 0.01,
});
```

---

## Parallel Execution and Sharding

```typescript
// playwright.config.ts
export default defineConfig({
  fullyParallel: true,   // run tests in each file in parallel
  workers: 4,            // number of parallel workers (or '50%' of CPUs)
});
```

```bash
# Shard across CI machines
# Machine 1:
npx playwright test --shard=1/4
# Machine 2:
npx playwright test --shard=2/4
# etc.
```

**Rules for parallel tests:**
- Tests must be independent — no shared mutable state
- Use unique test data per test (unique usernames, emails)
- Database: use transactions or per-test seeding
- Files: use unique temp directories per worker

---

## CI/CD

### GitHub Actions

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Docker

```bash
# Use official Playwright Docker image
docker run --rm -v $(pwd):/app -w /app mcr.microsoft.com/playwright:v1.52.0-noble \
  npx playwright test
```

### CI Best Practices

| Setting | CI Value | Why |
|---------|----------|-----|
| `workers` | 1 | Predictable resource usage |
| `retries` | 2 | Absorb infra flakiness |
| `reporter` | `[['html'], ['github']]` | HTML for artifacts, github for PR annotations |
| `forbidOnly` | `true` | Prevent `test.only` from reaching CI |
| `video` | `retain-on-failure` | Debug failures without bloating storage |
| `trace` | `on-first-retry` | Detailed debug on flaky tests |

---

## Error Diagnosis Reference

When a test fails, identify the error type and apply the fix.

### TimeoutError: Element Not Found

**Error:** `TimeoutError: locator.click: Timeout 30000ms exceeded. Waiting for locator('...')`

**Causes and fixes:**

| Cause | Diagnosis | Fix |
|-------|-----------|-----|
| Wrong selector | Element exists but selector doesn't match | Use `page.pause()` or UI mode to inspect, update selector |
| Element not rendered yet | Page load incomplete, SPA routing pending | Add `await page.waitForLoadState('networkidle')` before assertion |
| Element inside iframe | Selector searches main frame only | Use `page.frameLocator('#iframe-id').getByRole(...)` |
| Element inside shadow DOM | Standard selectors don't pierce shadow roots | Use `locator('css-selector >> shadow=inner-selector')` |
| Conditional rendering | Element only appears under certain state | Ensure test setup triggers the condition |
| Different page/URL | Navigation happened, element is on another page | Check `page.url()`, add `waitForURL` |

**Debug steps:**
```typescript
// 1. Check what's on the page
console.log(await page.content());

// 2. Check if element exists at all (non-waiting)
const count = await page.locator('your-selector').count();
console.log('Found:', count);

// 3. Use pause to inspect interactively
await page.pause();
```

---

### Strict Mode Violation

**Error:** `Error: strict mode violation: locator('button') resolved to 3 elements`

**Cause:** The locator matches multiple elements, but Playwright expects exactly one.

**Fixes:**

```typescript
// BAD — matches all buttons
page.locator('button')

// GOOD — narrow by accessible name
page.getByRole('button', { name: 'Submit' })

// GOOD — scope to a container
page.getByRole('dialog').getByRole('button', { name: 'Confirm' })

// GOOD — use filter
page.getByRole('listitem').filter({ hasText: 'Product A' })

// GOOD — positional (use as last resort)
page.locator('.btn').first()
page.locator('.btn').nth(2)
```

---

### Element Not Visible

**Error:** `locator.click: Error: element is not visible`

**Causes and fixes:**

| Cause | Fix |
|-------|-----|
| CSS `display: none` or `visibility: hidden` | Wait for condition that makes it visible, or check test logic |
| Element is off-screen | `await locator.scrollIntoViewIfNeeded()` before action |
| Covered by overlay/modal | Close the overlay first, or click the overlay's button |
| CSS animation in progress | `await expect(locator).toBeVisible()` before clicking (auto-waits for stability) |
| Zero dimensions | Element exists but has 0 width/height — check CSS |

---

### Navigation Timeout

**Error:** `page.goto: Timeout 30000ms exceeded. Navigation to "..." failed`

**Causes and fixes:**

| Cause | Fix |
|-------|-----|
| Server not running | Start dev server before tests — use `webServer` in config |
| Slow server startup | Increase navigation timeout: `page.goto(url, { timeout: 60000 })` |
| Redirect loop | Check server-side redirect logic |
| Network issue in CI | Use `waitUntil: 'domcontentloaded'` instead of default `load` |
| HTTPS cert error | Set `ignoreHTTPSErrors: true` in context/config |

**Config for auto-starting dev server:**

```typescript
export default defineConfig({
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

---

### Target Closed

**Error:** `page.click: Target closed` or `browser.newContext: Target closed`

**Causes and fixes:**

| Cause | Fix |
|-------|-----|
| Browser crashed | Check memory usage, reduce parallel workers |
| Page navigated during action | Use `Promise.all` for click + navigation: `await Promise.all([page.waitForNavigation(), link.click()])` |
| `beforeunload` dialog | Handle with `page.on('dialog', d => d.accept())` |
| Context closed prematurely | Ensure `await context.close()` is in cleanup, not mid-test |
| `window.close()` called | Capture new page: `const [popup] = await Promise.all([page.waitForEvent('popup'), trigger.click()])` |

---

### Frame Detached

**Error:** `frame.click: Frame was detached`

**Cause:** The iframe navigated or was removed from DOM while you were interacting with it.

**Fix:**
```typescript
// BAD — stale frame reference
const frame = page.frameLocator('#my-iframe');
await someActionThatReloadsIframe();
await frame.getByRole('button').click(); // Frame detached!

// GOOD — re-query frame after navigation
await someActionThatReloadsIframe();
const frame = page.frameLocator('#my-iframe');
await frame.getByRole('button').click();
```

---

### Execution Context Destroyed

**Error:** `page.evaluate: Execution context was destroyed, most likely because of a navigation`

**Cause:** The page navigated while `evaluate()` or a locator action was running.

**Fix:**
```typescript
// BAD — page may navigate between evaluate and next action
await page.evaluate(() => document.title);

// GOOD — wait for navigation to settle first
await page.waitForLoadState('domcontentloaded');
await page.evaluate(() => document.title);

// GOOD — for click-then-navigate patterns
await Promise.all([
  page.waitForURL('**/next-page'),
  page.getByRole('link', { name: 'Next' }).click(),
]);
```

---

### Flaky Tests

Tests that pass sometimes and fail sometimes. The hardest category.

**Diagnosis checklist:**

| Check | How |
|-------|-----|
| Animation/transition timing | Add `await expect(locator).toBeVisible()` before interaction |
| Race condition with API | Mock the API or use `waitForResponse` before assertion |
| Shared test state | Ensure each test creates its own data |
| Date/time dependency | Mock `Date.now()` with `page.addInitScript` |
| Random data in UI | Assert on stable attributes, not random values |
| Network flakiness | Mock all external APIs |
| Viewport-dependent layout | Set explicit viewport in test or config |
| Third-party scripts | Block with `page.route('**/analytics/**', r => r.abort())` |

**Flaky test detection:**

```bash
# Run the test 10 times to surface flakiness
npx playwright test tests/suspect.spec.ts --repeat-each=10

# Run with tracing on every run
npx playwright test tests/suspect.spec.ts --trace on --repeat-each=10
```

**Fix patterns:**

```typescript
// BAD — race condition
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByText('Saved')).toBeVisible(); // may miss fast toast

// GOOD — wait for network response, then assert
const saveResponse = page.waitForResponse('**/api/save');
await page.getByRole('button', { name: 'Save' }).click();
await saveResponse;
await expect(page.getByText('Saved')).toBeVisible();
```

```typescript
// BAD — time-dependent
const now = new Date();
await expect(page.getByText(now.toLocaleDateString())).toBeVisible();

// GOOD — mock time
await page.addInitScript(() => {
  const fixedDate = new Date('2025-01-15T12:00:00Z');
  // @ts-ignore
  Date.now = () => fixedDate.getTime();
});
```

---

### Common Assertion Failures

| Error | Likely cause | Fix |
|-------|-------------|-----|
| `Expected "Submit" but received "Loading..."` | Asserted before async update finished | Use `toHaveText` (auto-retrying) not `.textContent()` comparison |
| `Expected 5 items but received 0` | List not populated yet | Use `await expect(locator).toHaveCount(5)` |
| `Expected URL to match but received "about:blank"` | Navigation hasn't completed | Add `await page.waitForURL(pattern)` |
| `Screenshot mismatch` | Legitimate UI change or animation frame | Update baseline: `--update-snapshots`, or add `animations: 'disabled'` |

---

## Quick Reference: Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/feature');
  });

  test('should display the main heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Feature' })).toBeVisible();
  });

  test('should handle user interaction', async ({ page }) => {
    await page.getByRole('button', { name: 'Action' }).click();
    await expect(page.getByText('Result')).toBeVisible();
  });

  test('should handle error state', async ({ page }) => {
    // Mock API failure
    await page.route('**/api/data', (route) =>
      route.fulfill({ status: 500, body: 'Error' })
    );
    await page.getByRole('button', { name: 'Load' }).click();
    await expect(page.getByRole('alert')).toContainText('Something went wrong');
  });
});
```
