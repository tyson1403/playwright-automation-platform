import {
  test as base,
  expect,
  uniqueId,
} from "@tyson1403/playwright-automation-platform";
import { TodoPage } from "../pages/TodoPage";

// Projects extend the platform's `test` with their own page objects.
const test = base.extend<{ todoPage: TodoPage }>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.open();
    await use(todoPage);
  },
});

test("adds a todo", async ({ todoPage }) => {
  const name = uniqueId("buy-milk");
  await todoPage.add(name);
  await expect(todoPage.items()).toHaveText([name]);
});

test("completes a todo", async ({ todoPage }) => {
  const name = uniqueId("write-tests");
  await todoPage.add(name);
  await todoPage.complete(name);
  await expect(todoPage.completedItems()).toHaveCount(1);
});

test("page object inherits BasePage behaviour", async ({ todoPage }) => {
  expect(await todoPage.title()).toContain("TodoMVC");
});
