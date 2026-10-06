import { BasePage } from "@tyson1403/playwright-automation-platform";

export class TodoPage extends BasePage {
  readonly path = "/todomvc";

  async add(text: string) {
    const input = this.page.getByPlaceholder("What needs to be done?");
    await input.fill(text);
    await input.press("Enter");
  }

  items() {
    return this.page.getByTestId("todo-title");
  }

  async complete(text: string) {
    await this.page
      .getByTestId("todo-item")
      .filter({ hasText: text })
      .getByRole("checkbox")
      .check();
  }

  completedItems() {
    return this.page.locator(".todo-list li.completed");
  }
}
