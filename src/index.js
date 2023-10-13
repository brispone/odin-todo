import './style.css';
import { createProject } from './projectFactory';
import { createTask } from './taskFactory';
import { renderProjects } from './renderFunctions';

const projectList = [];

const testProject = createProject("Test Project", "This is a simple test to see if the project constructor works.");
projectList.push(testProject);

const testTask = createTask("Task 2", "test task yo", new Date(), true);
testProject.addTask(testTask);

console.log(testProject);

renderProjects(projectList);