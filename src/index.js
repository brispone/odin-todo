import './style.css';
import { createProject } from './projectFactory';
import { createTask } from './taskFactory';
import { renderProjects } from './renderFunctions';

const projectList = [];

const testProject = createProject("Test Project", "This is a simple test to see if the project constructor works.");
projectList.push(testProject);

const testTask = createTask("Take out the trash", "The trash is piling up too high. It needs to be taken out very soon!", new Date(), true);
testProject.addTask(testTask);

console.log(testProject);

renderProjects(projectList);