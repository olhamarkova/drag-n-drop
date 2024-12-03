import { expect, test } from "@playwright/test";
import { ProjectManagerPage } from "./support/page";

let app: ProjectManagerPage;

test.beforeEach(async ({ page }) => {
  app = new ProjectManagerPage(page);
  await page.goto("/");
});

test.describe("Drag&Drop Project Tests", async () => {
  test("User shall be able to add a new project", async () => {
    await app.addProject("Test project", "My first project", 5);

    await expect(app.projectItem("active")).toBeVisible();
    await expect(app.projectItem("active")).toHaveCount(1);
  });

  test("User shall be able to drag and drop a project", async () => {
    await app.addProject("Test project", "My second project", 6);
    await app.dragAndDrop("active", "finished");

    await expect(app.projectItem("finished")).toBeVisible();
    await expect(app.projectItem("finished")).toHaveCount(1);
    await expect(app.projectItem("active")).not.toBeVisible();
  });

  test("User shall be able to delete a project", async () => {
    await app.addProject("Test project 3", "My simple project", 7);
    await app.deleteProject();

    await expect(app.projectItem("active")).not.toBeVisible();
  });

  test("User shall see an error when provides too short description", async () => {
    await app.page.on("dialog", async (dialog) => {
      expect(dialog.message()).toBe("Invalid input value. Please try again");
      await dialog.accept();
    });
    await app.addProject("Test project 3", "re", 6);
  });
});
