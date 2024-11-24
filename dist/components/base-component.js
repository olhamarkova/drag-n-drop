export class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedHtmlContent = document.importNode(this.templateElement.content, true);
        this.element = importedHtmlContent.firstElementChild;
        if (newElementId)
            this.element.id = newElementId;
        this.attach(insertAtStart);
    }
    attach(insertInBeginning) {
        this.hostElement.insertAdjacentElement(insertInBeginning ? "afterbegin" : "beforeend", this.element);
    }
}
//# sourceMappingURL=base-component.js.map