# Upgrading Playwright

Playwright is pinned to an **exact** version in the platform's `package.json`
(`"@playwright/test": "1.63.0"`, no caret). The platform is the only place that decides the version,
so every project that installs the same platform tag runs the same Playwright.

## Bump Playwright for all projects

1. In the platform: `npm i @playwright/test@<new version> --save-exact`.
2. Run `npm run lint && npm test`, then run the tests in `examples/project-a` and `examples/project-b`
   (install the platform first with `npm install --no-save ../..`, and the browsers with `npx playwright install`).
3. Update `CHANGELOG.md`, bump the platform version (`npm version minor --no-git-tag-version`; use a major bump
   if the Playwright upgrade has breaking changes), commit, tag `vX.Y.Z` and push the tag.
4. In each consuming project, change the one line `...platform#vX.Y.Z` and run `npm install` and
   `npx playwright install`.

Dependabot opens a pull request when a new Playwright version is available, so a bump can start from there.
CI fails if an example project resolves a Playwright version other than the one pinned here.
