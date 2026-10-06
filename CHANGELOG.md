# Changelog

Format follows [Keep a Changelog](https://keepachangelog.com/); versions follow [SemVer](https://semver.org/).

## [Unreleased]
### Removed
- Hard-coded `platformVersion` export, which duplicated `package.json`.
### Added
- Lint step (Biome) in CI, a changelog, and more example tests.

## [0.1.0] - 2026-10-06
### Added
- `createConfig(overrides)`: shared defaults for retries, reporters and trace; merges `use`.
- Re-exported `test` and `expect`.
- Example consumer project and GitHub Actions CI.
