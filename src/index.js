import './style.css';
import { createProject } from './projectFactory';
import { createTask } from './taskFactory';

const projectList = [];

const testProject = createProject("Test Project", "This is a simple test to see if the project constructor works.");
projectList.push(testProject);

const testTask = createTask("Task 2", "test task yo", new Date(), true);
testProject.addTask(testTask);

console.log(testProject);

const projectsContainer = document.getElementById("projects");


// render all projects - needs to be moved to its own module eventually
projectList.forEach((project) => {
    const projectDiv = document.createElement('div');
    const projectTitleContainer = document.createElement('div');
    const projectTitle = document.createElement('h3');
    const projectDesc = document.createElement('p');

    projectTitle.innerText = project.title;
    projectDesc.innerText = project.desc;
    projectDiv.classList.add("project");

    projectTitleContainer.append(projectTitle);
    projectTitleContainer.append(projectDesc);
    projectDiv.append(projectTitleContainer);
    projectsContainer.append(projectDiv);
});