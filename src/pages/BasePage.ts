import type { Page } from "@playwright/test";

/** Base class for page objects. Projects extend it and declare their own `path`. */
export abstract class BasePage {
  abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(this.path);
  }

  async title(): Promise<string> {
    return this.page.title();
  }
}
