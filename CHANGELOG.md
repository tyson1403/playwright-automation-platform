# Changelog

Format follows [Keep a Changelog](https://keepachangelog.com/); versions follow [SemVer](https://semver.org/).

## [Unreleased]

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
