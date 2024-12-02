import { Locator, Page } from "@playwright/test";

type ProjectStatus = "active" | "finished";

export class ProjectManagerPage {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly descriptionTextarea: Locator;
  readonly peopleInput: Locator;
  readonly addProjectBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput = this.page.getByTestId("project-title");
    this.descriptionTextarea = this.page.getByTestId("project-description");
    this.peopleInput = this.page.getByTestId("number-of-people");
    this.addProjectBtn = this.page.getByTestId("add-project-btn");
  }

  projectItem(type: ProjectStatus) {
    return this.page.locator(`#${type}-projects-list li`);
  }

  async dragAndDrop(project: ProjectStatus, target: ProjectStatus) {
    await this.page.dragAndDrop(
      `#${project}-projects-list li`,
      `#${target}-projects-list`
    );
  }

  async addProject(title: string, description: string, people: number) {
    await this.titleInput.fill(title);
    await this.descriptionTextarea.fill(description);
    await this.peopleInput.fill(`${people}`);

    await this.addProjectBtn.click();
  }
}
