import { defineConfig, type PlaywrightTestConfig } from "@playwright/test";

const isCI = !!process.env.CI;

export function createConfig(overrides: PlaywrightTestConfig = {}) {
  return defineConfig({
    retries: isCI ? 2 : 0,
    reporter: [["list"], ["html", { open: "never" }]],
    ...overrides,
    use: {
      trace: "on-first-retry",
      ...overrides.use,
    },
  });
}
