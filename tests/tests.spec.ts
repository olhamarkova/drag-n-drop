import { expect, test } from "@playwright/test";

test.describe("Test", async () => {
  test("test", async ({ page }) => {
    await page.goto("/");
    await page.locator("#title").fill("Test project");
    await page.locator("#description").fill("Test description");
    await page.locator("#people").fill("4");
    await page.getByRole("button", { name: "ADD PROJECT" }).click();
    const projectItem = await page.locator("#active-projects-list li");
    await expect(projectItem).toBeVisible();
  });
});
