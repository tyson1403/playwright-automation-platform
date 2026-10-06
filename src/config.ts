import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";

const isCI = !!process.env.CI;
// Fast by default locally (Chromium only); CI, or ALL_BROWSERS=1, runs every browser.
const allBrowsers = isCI || process.env.ALL_BROWSERS === "1";

const chromium = { name: "chromium", use: { ...devices["Desktop Chrome"] } };
const firefox = { name: "firefox", use: { ...devices["Desktop Firefox"] } };
const webkit = { name: "webkit", use: { ...devices["Desktop Safari"] } };

export function createConfig(overrides: PlaywrightTestConfig = {}) {
  return defineConfig({
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
