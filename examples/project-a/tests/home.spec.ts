import { expect, test } from "@tyson1403/playwright-automation-platform";

test("home page loads via the platform config", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("documentation examples").first()).toBeVisible();
});

test("API: base URL responds with HTML", async ({ request }) => {
  const response = await request.get("/");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("text/html");
});

test("platform defaults apply: trace config survives a project's own use block", async ({
  page,
}, testInfo) => {
  // project-a sets only baseURL in `use`; the platform's trace default must remain.
  expect(testInfo.project.use.trace).toBe("on-first-retry");
  await page.setContent("<h1>offline page</h1>");
  await expect(
    page.getByRole("heading", { name: "offline page" }),
  ).toBeVisible();
});

test("mocked network response is rendered (no external dependency)", async ({
  page,
}) => {
  await page.route("**/api/greeting", (route) =>
    route.fulfill({ json: { message: "hello platform" } }),
  );
  await page.goto("/");
  const message = await page.evaluate(async () =>
    (await fetch("/api/greeting")).json(),
  );
  expect(message).toEqual({ message: "hello platform" });
});

test("guardrail: an uncaught page error fails the test", async ({ page }) => {
  test.fail(); // passes only if the platform's pageErrors fixture catches the error
  await page.setContent(
    "<script>setTimeout(() => { throw new Error('boom'); }, 0);</script>",
  );
  await page.waitForTimeout(100);
});
