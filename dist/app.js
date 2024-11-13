"use strict";
class Input {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        const importedHtmlContent = document.importNode(this.templateElement.content, true);
        this.element = importedHtmlContent.firstElementChild;
        this.element.id = "user-input";
        this.titleInput = this.element.querySelector("#title");
        this.descriptionInput = this.element.querySelector("#description");
        this.peopleInput = this.element.querySelector("#people");
        this.configure();
        this.attach();
    }
    submitHandler(event) {
        event.preventDefault();
        console.log(this.titleInput.value);
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
const input = new Input();
//# sourceMappingURL=app.js.map