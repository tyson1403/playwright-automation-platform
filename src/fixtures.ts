import { test as base, expect } from "@playwright/test";

export type PlatformFixtures = {
  /** Uncaught page errors collected during the test. The test fails if any occur. */
  pageErrors: string[];
};

export const test = base.extend<PlatformFixtures>({
  pageErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await use(errors);
      expect(errors, "uncaught page errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
