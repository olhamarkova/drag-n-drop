"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    class Component {
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
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
    function Autobind(_, _2, descriptor) {
        const originalMethod = descriptor.value;
        const adjDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            },
        };
        return adjDescriptor;
    }
    App.Autobind = Autobind;
})(App || (App = {}));
var App;
(function (App) {
    function validate(validatebleInput) {
        let isValid = true;
        if (validatebleInput.required) {
            isValid =
                isValid && validatebleInput.value.toString().trim().length !== 0;
        }
        if (validatebleInput.minLength != null &&
            typeof validatebleInput.value === "string") {
            isValid =
                isValid && validatebleInput.value.length >= validatebleInput.minLength;
        }
        if (validatebleInput.maxLength != null &&
            typeof validatebleInput.value === "string") {
            isValid =
                isValid && validatebleInput.value.length <= validatebleInput.maxLength;
        }
        if (validatebleInput.min != null &&
            typeof validatebleInput.value === "number") {
            isValid = isValid && validatebleInput.value >= validatebleInput.min;
        }
        if (validatebleInput.max != null &&
            typeof validatebleInput.value === "number") {
            isValid = isValid && validatebleInput.value <= validatebleInput.max;
        }
        return isValid;
    }
    App.validate = validate;
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title, description, numberOfPeople) {
            const newProject = new App.Project(Math.random().toString(), title, description, numberOfPeople, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((project) => project.id === projectId);
            if (project && project.status !== newStatus)
                project.status = newStatus;
            this.updateListeners();
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
var App;
(function (App) {
    class ProjectInput extends App.Component {
        constructor() {
            super("project-input", "app", true, "user-input");
            this.descriptionInput = this.element.querySelector("#description");
            this.peopleInput = this.element.querySelector("#people");
            this.titleInput = this.element.querySelector("#title");
            this.configure();
        }
        configure() {
            this.element.addEventListener("submit", this.submitHandler);
        }
        renderContent() { }
        getUserInput() {
            const titleValue = this.titleInput.value;
            const descriptionValue = this.descriptionInput.value;
            const peopleValue = this.peopleInput.value;
            const titleValidatable = {
                value: titleValue,
                required: true,
            };
            const descriptionValidatable = {
                value: descriptionValue,
                required: true,
                minLength: 5,
            };
            const peopleValidatable = {
                value: +peopleValue,
                required: true,
                min: 1,
                max: 10,
            };
            if (!App.validate(titleValidatable) ||
                !App.validate(descriptionValidatable) ||
                !App.validate(peopleValidatable)) {
                alert("Invalid input value. Please try again");
                return;
            }
            else {
                return [titleValue, descriptionValue, Number(peopleValue)];
            }
        }
        clearInputs() {
            this.titleInput.value = "";
            this.descriptionInput.value = "";
            this.peopleInput.value = "";
        }
        submitHandler(event) {
            event.preventDefault();
            const userInput = this.getUserInput();
            if (Array.isArray(userInput)) {
                const [title, description, people] = userInput;
                console.log(title, description, people);
                App.projectState.addProject(title, description, people);
                this.clearInputs();
            }
        }
    }
    __decorate([
        App.Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
var App;
(function (App) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
var App;
(function (App) {
    class ProjectItem extends App.Component {
        get persons() {
            if (this.project.people === 1) {
                return "1 person";
            }
            else {
                return `${this.project.people} persons`;
            }
        }
        constructor(hostId, project) {
            super("single-project", hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(_) {
            console.log("Drag ended");
        }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent =
                this.persons + " assigned.";
            this.element.querySelector("p").textContent = this.project.description;
        }
    }
    __decorate([
        App.Autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
var App;
(function (App) {
    class ProjectList extends App.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const projectId = event.dataTransfer.getData("text/plain");
            App.projectState.moveProject(projectId, this.type === "active" ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent =
                this.type.toUpperCase() + " PROJECTS";
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            App.projectState.addListener((projects) => {
                const relevantProjects = projects.filter((prj) => {
                    if (this.type === "active") {
                        return prj.status === App.ProjectStatus.Active;
                    }
                    return prj.status === App.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = "";
            for (const projectItem of this.assignedProjects) {
                new App.ProjectItem(this.element.querySelector("ul").id, projectItem);
            }
        }
    }
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.Autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
var App;
(function (App) {
    new App.ProjectInput();
    new App.ProjectList("active");
    new App.ProjectList("finished");
})(App || (App = {}));
//# sourceMappingURL=bundle.js.map