# Roadmap and decision log

**Goal:** one shared package that owns Playwright versions, dependencies, config and
reusable helpers, consumed by many test projects.

## Status

Done:
- [x] Package scaffold: TypeScript, ESM, typed exports (v0.1.0)
- [x] `createConfig(overrides)` shared config factory with merged `use` (v0.1.0)
- [x] CI, and an example consumer pinned to a release tag (v0.1.0)
- [x] Reusable `pageErrors` fixture, `BasePage`, `uniqueId`; second consumer `project-b` (v0.2.0)
- [x] Exact Playwright pin, CI version-consistency check, upgrade guide (v0.3.0)
- [x] Multi-browser config: Chromium locally, all three browsers in CI (v0.4.0)
- [x] Unit tests for the platform, working lint rules, `forbidOnly` in CI, Dependabot (v0.5.0)

Next:
- [ ] Demonstrate a real Playwright bump reaching both projects once 1.64 is released
- [ ] Automated release notes and GitHub releases from tags
- [ ] Optional: authentication fixture and API-client fixture

## Decisions

- **TypeScript + ESM** (`NodeNext`). TypeScript 7 needs `"types": ["node"]` in tsconfig.
- **Distribution:** GitHub repo plus release tags; projects install with
  `github:tyson1403/playwright-automation-platform#vX.Y.Z`. The package builds on install via `prepare`.
- **Layout:** repo root is the package, because npm cannot install a subfolder from a git URL.
  `examples/` holds consumer projects.
- **`baseURL` is not a platform default.** Each project owns its URL.
- **`createConfig` merges `use`**, so project values win while unspecified defaults (such as trace) survive.
  Other nested options are replaced whole.
- **Projects import `test` and `expect` from the platform**, not from `@playwright/test`, so they never
  need their own Playwright dependency.
- **Exact Playwright pin**: a caret range lets projects installed on different days resolve different versions.
- **Chromium locally, every browser in CI**: fast feedback for the tester, full coverage from the pipeline.
- **Environment is read inside `createConfig`**, not at import time, so it can be unit tested.
- **Linting with Biome**, because `typescript-eslint` does not support TypeScript 7 yet.
- **CI tests the branch, not the tag:** the examples are pinned to releases, so the workflow installs them
  against the checkout (`npm install --no-save ../..`).

## Open questions

- Peer dependency vs normal dependency for `@playwright/test`. A normal dependency works today; revisit
  if a consumer needs its own copy.
- Whether to ship a changelog automatically (for example with release tooling) or by hand.
