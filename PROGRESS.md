# Playwright Platform - Learning Tracker

Goal: one shared package that owns Playwright versions, dependencies, config and
reusable helpers, consumed by many test projects.

Environment (verified 2026-09-30): Node v24.14.0, npm 11.9.0, git 2.52, Windows 11.

## Plan
- [x] Step 1  - Concepts + repo layout
- [x] Step 2  - Create the platform package (package.json, TypeScript, exports)
- [x] Step 3  - Install Playwright once, in the platform; build a shared config factory
- [ ] Step 4  - Reusable fixtures and helper methods (custom `test`, page objects, utils) - test/expect re-exported so far
- [x] Step 5  - Consumer project A uses the platform (linked via file:../..)
- [ ] Step 6  - Consumer project B; prove one version bump reaches both
- [ ] Step 7  - Versioning + distribution (semver, git tags, GitHub releases)
- [ ] Step 8  - Guardrails: lint, CI, upgrade process, docs

## Current step
Step 4 - Reusable fixtures and helpers; then Step 6 (consumer project B).

## Decisions log
- Language: TypeScript (TypeScript 7.0.2 installed, build verified).
- Distribution: GitHub repo + release tags; projects install via git tag (github:tyson1403/playwright-automation-platform#vX.Y.Z).
- Layout: repo root IS the package (npm cannot install a subfolder from a git URL). examples/ hold consumer projects.
- Package name: @tyson1403/playwright-automation-platform (repo: github.com/tyson1403/playwright-automation-platform).
- Package builds on install via the "prepare" script; dist/ is gitignored.
- Module system: ESM ("type": "module", NodeNext).
- baseURL is NOT a platform default; each project sets its own. createConfig merges `use` so project values win but defaults (trace) survive.
- Platform re-exports test and expect, so projects import everything from the platform (not from @playwright/test directly).
- TS 7 needs "types": ["node"] in tsconfig.

## Open questions
- (resolved) Repo name chosen.
- Peer dependency vs normal dependency for @playwright/test (decide by experiment in Steps 3 and 5).
