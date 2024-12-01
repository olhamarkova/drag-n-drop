import { expect, test, Locator, Page } from "@playwright/test";

export let page: Page;
export let titleInput: Locator;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  titleInput = page.getByTestId("project-title");
});
