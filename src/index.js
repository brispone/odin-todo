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

const newTaskForm = document.getElementById('new-task-form');
newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const projectIndex = newTaskForm.elements['projectId'].value;
    const taskTitle = newTaskForm.elements['title'].value;
    const taskDesc = newTaskForm.elements['description'].value;
    const taskDueDate = new Date(newTaskForm.elements['due-date'].value);
    const taskHighPriority = newTaskForm.elements['priority'].checked;

    const newTask = createTask(taskTitle, taskDesc, taskDueDate, taskHighPriority);
    projectList[projectIndex].taskList.push(newTask);
    
    // Reset the form inputs and hide the new task form after submission
    newTaskForm.reset();
    const newTaskDiv = document.getElementById('new-task-form-container');
    newTaskDiv.style.display = 'none';
    
    renderProjects(projectList);
});