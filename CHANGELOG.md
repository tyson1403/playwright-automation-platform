# Changelog

Format follows [Keep a Changelog](https://keepachangelog.com/); versions follow [SemVer](https://semver.org/).

## [Unreleased]

## [0.5.0] - 2026-10-06
### Added
- Unit tests for `createConfig` and `uniqueId` (`npm test`).
- `forbidOnly` in CI, so a stray `test.only` fails the build.
- Dependabot for npm and GitHub Actions; `.gitattributes` for consistent line endings.
### Changed
- `createConfig` reads the environment when called, not at import time.
- `uniqueId` uses `crypto.randomUUID`.
- Minimum Node version is 22.
- CI: lint and unit tests run once (Node 22 and 24) before the example matrix; least-privilege permissions, concurrency control and timeouts.
- README rewritten with architecture diagram, defaults table and quality gates.
### Fixed
- The Biome linter had no rules enabled, so CI "lint" only checked formatting. Recommended rules are on.
- The "mocked network" example test still hit the external site; the guardrail test no longer uses a fixed sleep.
- A corrupted `.gitignore` line.

## [0.4.0] - 2026-10-06
### Added
- `createConfig` defines Chromium, Firefox and WebKit projects. Locally only Chromium runs (fast); CI, or `ALL_BROWSERS=1`, runs all three.
- CI matrix: each example project runs once per browser.

## [0.3.0] - 2026-10-06
### Changed
- Playwright is pinned to an exact version (`1.63.0`) instead of `^1.63.0`, so all projects get the same version.
### Added
- CI check that each example runs the platform's pinned Playwright version.
- `docs/UPGRADING.md`: how to bump Playwright once for all projects.

## [0.2.0] - 2026-10-06
### Added
- `test` now includes an auto `pageErrors` fixture that fails any test with an uncaught page error.
- `BasePage`: base class for page objects.
- `uniqueId(prefix)` test-data helper.
- Second example consumer (`examples/project-b`, page-object tests) and a CI matrix over both examples.
- Lint step (Biome) in CI, a changelog, and more example tests.
### Removed
- Hard-coded `platformVersion` export, which duplicated `package.json`.

## [0.1.0] - 2026-10-06
### Added
- `createConfig(overrides)`: shared defaults for retries, reporters and trace; merges `use`.
- Re-exported `test` and `expect`.
- Example consumer project and GitHub Actions CI.

[Unreleased]: https://github.com/tyson1403/playwright-automation-platform/compare/v0.5.0...HEAD
[0.5.0]: https://github.com/tyson1403/playwright-automation-platform/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/tyson1403/playwright-automation-platform/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/tyson1403/playwright-automation-platform/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/tyson1403/playwright-automation-platform/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/tyson1403/playwright-automation-platform/releases/tag/v0.1.0
