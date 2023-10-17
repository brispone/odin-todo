import './style.css';
import { createProject } from './projectFactory';
import { createTask } from './taskFactory';
import { renderProjects, renderModals } from './renderFunctions';

/*
const projectList = [];

const testProject = createProject("Test Project", "This is a simple test to see if the project constructor works. I am adding a lot more text and repeating it and stuff because I want to see what happens with the text has to wrap.");
projectList.push(testProject);

const testTask = createTask("Take out the trash", "The trash is piling up too high. It needs to be taken out very soon!", new Date(), true);
testProject.addTask(testTask);

localStorage.setItem('projectList', JSON.stringify(projectList));
*/

let projectList = JSON.parse(localStorage.getItem('projectList')) || [];

renderModals();
renderProjects();