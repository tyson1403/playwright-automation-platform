import { createConfig } from "@tyson1403/playwright-automation-platform";

export default createConfig({
  testDir: "./tests",
  use: { baseURL: "https://example.com" },
});
