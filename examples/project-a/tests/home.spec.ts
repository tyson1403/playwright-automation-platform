import { test, expect } from "@tyson1403/playwright-automation-platform";

test("home page loads via the platform config", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("documentation examples").first()).toBeVisible();
});
