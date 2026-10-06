# Roadmap and decision log

**Goal:** one shared package that owns Playwright versions, dependencies, config and
reusable helpers, consumed by many test projects.

## Status

- [x] Package scaffold: TypeScript, ESM, typed exports
- [x] Playwright installed once, in the platform
- [x] `createConfig(overrides)` shared config factory
- [x] Example consumer project (`examples/project-a`) pinned to a release tag
- [x] CI: build and example tests on every push and pull request
- [x] Release `v0.1.0` (git tag, installable via `github:`)
- [x] Lint step (Biome) in CI
- [x] Reusable fixture (`pageErrors`), `BasePage` page-object base, `uniqueId` helper
- [x] Second consumer project (`project-b`); CI runs both against the same platform build
- [x] Exact Playwright pin plus CI version-consistency check; upgrade guide ([docs/UPGRADING.md](docs/UPGRADING.md))
- [ ] Demonstrate a real Playwright bump reaching both projects when 1.64 is released
- [ ] Multi-browser CI matrix
- [ ] Automated release notes and upgrade guide

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
- **Linting with Biome**, because `typescript-eslint` does not support TypeScript 7 yet.
- **CI tests the branch, not the tag:** the example is pinned to a release, so the workflow installs it
  against the checkout (`npm install --no-save ../..`).

## Open questions

- Peer dependency vs normal dependency for `@playwright/test`. A normal dependency works today; revisit
  if a consumer needs its own copy.
- Whether to ship a changelog automatically (for example with release tooling) or by hand.
