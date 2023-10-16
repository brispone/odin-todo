import './style.css';
import { createProject } from './projectFactory';
import { createTask } from './taskFactory';
import { renderProjects, renderModals } from './renderFunctions';

const projectList = [];

const testProject = createProject("Test Project", "This is a simple test to see if the project constructor works. I am adding a lot more text and repeating it and stuff because I want to see what happens with the text has to wrap.");
projectList.push(testProject);

const testTask = createTask("Take out the trash", "The trash is piling up too high. It needs to be taken out very soon!", new Date(), true);
testProject.addTask(testTask);

console.log(testProject);

renderModals();
renderProjects(projectList);

const newTaskForm = document.getElementById('new-task-form');
newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const projectIndex = newTaskForm.elements['projectId'].value;
    const taskIndex = newTaskForm.elements['taskId'].value;
    const taskTitle = newTaskForm.elements['title'].value;
    const taskDesc = newTaskForm.elements['description'].value;
    const taskDueDate = new Date(newTaskForm.elements['due-date'].value);
    const taskHighPriority = newTaskForm.elements['priority'].checked;

    const newTask = createTask(taskTitle, taskDesc, taskDueDate, taskHighPriority);

// If this is a task edit (the taskId will be higher than -1) replace old task with new task from form
    if(taskIndex > -1) {
        projectList[projectIndex].taskList[taskIndex] = newTask;
// Otherwise, push it to the end of the project as a new task
    } else projectList[projectIndex].taskList.push(newTask);
    
    // Reset the form inputs and hide the new task form after submission
    newTaskForm.reset();
    newTaskForm.elements['projectId'].value = '123';
    newTaskForm.elements['taskId'].value = '-1';
    const newTaskDiv = document.getElementById('new-task-form-container');
    newTaskDiv.style.display = 'none';
    
    renderProjects(projectList);
});