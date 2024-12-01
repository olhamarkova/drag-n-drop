import { expect, test } from "@playwright/test";
import * as app from "./support/beforeAll";

// let page: Page;
// let titleInput: Locator;

// test.beforeAll(async ({ browser }) => {
//   page = await browser.newPage();
//   titleInput = page.getByTestId("project-title");
// });

test.afterAll(async () => {
  await app.page.close();
});

test.describe("Test", async () => {
  test("test", async () => {
    await app.page.goto("/");

    await app.titleInput.fill("Test Project");
    await app.page.getByTestId("project-description").fill("Test Project");
    await app.page.getByTestId("number-of-people").fill("5");

    await app.page.getByTestId("add-project-btn").click();

    const projectItem = await app.page.locator("#active-projects-list li");
    await expect(projectItem).toBeVisible();
  });
});
