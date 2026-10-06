import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";

const chromium = { name: "chromium", use: { ...devices["Desktop Chrome"] } };
const firefox = { name: "firefox", use: { ...devices["Desktop Firefox"] } };
const webkit = { name: "webkit", use: { ...devices["Desktop Safari"] } };

export function createConfig(overrides: PlaywrightTestConfig = {}) {
  const isCI = !!process.env.CI;
  // Fast by default locally (Chromium only); CI, or ALL_BROWSERS=1, runs every browser.
  const allBrowsers = isCI || process.env.ALL_BROWSERS === "1";

  return defineConfig({
    forbidOnly: isCI,
    retries: isCI ? 2 : 0,
    reporter: [["list"], ["html", { open: "never" }]],
    projects: allBrowsers ? [chromium, firefox, webkit] : [chromium],
    ...overrides,
    use: {
      trace: "on-first-retry",
      ...overrides.use,
    },
  });
}
