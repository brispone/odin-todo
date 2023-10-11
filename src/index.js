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
    
    // Loop through the project's tasks array and render all of the tasks
    project.taskList.forEach((task) => {
        const taskDiv = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const taskName = document.createElement('span');
        taskName.innerText = task.title;
        
        if (task.highPriority) {
            taskName.innerText = task.title + " 🚩";
        } else taskName.innerText = task.title;

        taskDiv.append(checkbox);
        taskDiv.append(taskName);
        projectDiv.append(taskDiv);
    });

    projectsContainer.append(projectDiv);
});