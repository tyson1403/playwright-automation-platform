# Playwright Automation Platform
[![CI](https://github.com/tyson1403/playwright-automation-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/tyson1403/playwright-automation-platform/actions/workflows/ci.yml)

A reusable **Playwright test platform in TypeScript**. Playwright and its related
dependencies are versioned in **one place**; test projects consume this package and
share a config factory and reusable helpers instead of copy-pasting setup.

## Why

| Without a platform | With this platform |
|---|---|
| Every project pins its own Playwright version | One version, upgraded once |
| `playwright.config.ts` copied and drifting | One `createConfig()` with shared defaults |
| Helpers duplicated across repos | Reusable fixtures and utilities, imported |

## Usage in a project

```ts
// playwright.config.ts
import { createConfig } from "@tyson1403/playwright-automation-platform";

export default createConfig({
  testDir: "./tests",
  use: { baseURL: "https://your-app.example" },
});
```

```ts
// tests/home.spec.ts
import { test, expect } from "@tyson1403/playwright-automation-platform";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Welcome")).toBeVisible();
});
```

The project does **not** depend on `@playwright/test` itself; the platform provides it.

## Install

```bash
npm i github:tyson1403/playwright-automation-platform#v0.3.0
npx playwright install
```

## What it provides

- `createConfig(overrides)`: shared defaults (retries on CI, reporters, trace on first retry). Project values win; unspecified defaults are kept (`use` is merged, not replaced).
- `test` / `expect`: Playwright's, extended with an auto `pageErrors` fixture that fails tests on uncaught page errors. Projects import everything from one place and extend `test` with their own fixtures.
- `BasePage`: base class for page objects (`path`, `open()`, `title()`).
- `uniqueId(prefix)`: unique test data.
- CI on every push and pull request (see badge above). Reusable fixtures and page objects are on the [roadmap](ROADMAP.md).

## Design decisions

- **TypeScript + ESM** (`NodeNext`), built to `dist/` with type declarations.
- **Repo root is the package**: npm cannot install a subfolder from a git URL.
- **`baseURL` is not a platform default**: each project owns its URL.
- **Versioning via git tags** (semver); projects pin a tag.
- Upgrading Playwright: [docs/UPGRADING.md](docs/UPGRADING.md). Decision log and roadmap: [ROADMAP.md](ROADMAP.md).

## Repository layout

```
src/                 platform source (config factory, exports)
examples/project-a/  consumer: config, API and fixture tests
examples/project-b/  consumer: page-object tests against a public TodoMVC demo
```

## Develop

```bash
npm install
npm run build
cd examples/project-a && npm install --no-save ../.. && npx playwright test
```

## License

MIT
