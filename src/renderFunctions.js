import expandIcon from './assets/expand.svg';
import shrinkIcon from './assets/shrink.svg';
import trashIcon from './assets/trash.svg';
import calendarIcon from './assets/calendar.svg';
import editIcon from './assets/edit.svg';
import newIcon from './assets/plus-circle.svg';
import xIcon from './assets/x.svg';
import { createProject } from './projectFactory';
import { createTask } from './taskFactory';

function renderProjects () {

    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];

    const projectsContainer = document.getElementById("projects");

    projectsContainer.innerHTML = '';

    projectList.forEach((project, projectIndex) => {
        const projectDiv = document.createElement('div');
        const projectHeader = document.createElement('div');
        projectHeader.classList.add('project-header');
        const projectTitleContainer = document.createElement('div');
        projectTitleContainer.classList.add('project-title-container');
        const projectTitle = document.createElement('h3');
        const projectDesc = document.createElement('p');
        
        const projectButtonsContainer = document.createElement('div');
        const projectShrinkButton = document.createElement('img');

        if(project.detailsHidden) {
            projectShrinkButton.src = expandIcon;
        } else projectShrinkButton.src = shrinkIcon;
        projectShrinkButton.classList.add('task-button');
        const projectDeleteButton = document.createElement('img');
        projectDeleteButton.src = trashIcon;
        projectDeleteButton.classList.add('task-button');
        projectButtonsContainer.append(projectShrinkButton, projectDeleteButton);
    
        projectTitle.innerText = project.title;
        projectDesc.innerText = project.desc;
        projectDiv.classList.add("project");
    
        projectTitleContainer.append(projectTitle);
        projectTitleContainer.append(projectDesc);
        projectHeader.append(projectTitleContainer, projectButtonsContainer)
        projectDiv.append(projectHeader);

        // Event listener for expand / shrink project button

        projectShrinkButton.addEventListener('click', () => {
            if(project.detailsHidden) {
                project.detailsHidden = false;
            } else project.detailsHidden = true;

            localStorage.setItem('projectList', JSON.stringify(projectList));
            renderProjects();

        });

        // Event listener for the delete project button
        projectDeleteButton.addEventListener('click', () => {
            // confimration of intent to delete
            const confirmed = window.confirm('Are you sure you want to delete this project?');

            if(confirmed) {
                projectList.splice(projectIndex, 1);
                localStorage.setItem('projectList', JSON.stringify(projectList));
                renderProjects();
            }
        });
        
        if(!project.detailsHidden) {
            // Loop through the project's tasks array and render all of the tasks
            project.taskList.forEach((task, taskIndex) => {

                const taskOuter = document.createElement('div');
                taskOuter.classList.add('task-outer');

                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');

                const leftsideContainer = document.createElement('div');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';

                if (task.completed) {
                    checkbox.checked = true;
                }

                const taskName = document.createElement('span');
                taskName.innerText = task.title;
                
                if (task.highPriority) {
                    taskOuter.classList.add('high-priority');
                }
        
                if (task.completed) {
                    taskName.classList.add('completed');
                }

                const dueDateContainer = document.createElement('div');
                dueDateContainer.classList.add('due-date-container');

                const dueDateIcon = document.createElement('img');
                dueDateIcon.src = calendarIcon;

                const dueDateText = document.createElement('span');
                dueDateText.innerText = task.dueDate;

                dueDateContainer.append(dueDateIcon, dueDateText);

                const taskButtons = document.createElement('div');
                taskButtons.classList.add('task-buttons');

                const detailsButton = document.createElement('img');
                detailsButton.classList.add('task-button');
                if(task.detailsHidden) {
                    detailsButton.src = expandIcon;
                } else detailsButton.src = shrinkIcon;

                const editButton = document.createElement('img');
                editButton.classList.add('task-button');
                editButton.src = editIcon;
                
                const deleteButton = document.createElement('img');
                deleteButton.classList.add('task-button');
                deleteButton.src = trashIcon;

                taskButtons.append(detailsButton, editButton, deleteButton);

                const descriptionText = document.createElement('p');
                const taskDetails = document.createElement('div');
                
                descriptionText.innerText = task.desc;
                taskDetails.append(descriptionText);
                taskDetails.classList.add('task-details');
                if(task.detailsHidden) {
                    taskDetails.style.display = 'none';
                }
        
                leftsideContainer.append(checkbox, taskName, dueDateContainer);
                taskDiv.append(leftsideContainer, taskButtons);
                taskOuter.append(taskDiv, taskDetails);
                projectDiv.append(taskOuter);
        
                // EVENT LISTENERS
                // Add event listener for when the checkbox is checked or unchecked
                checkbox.addEventListener('change', (event) => {

                    if(event.target.checked) {
                        task.completed = true;
                    } else task.completed = false;
                    console.log(task);
                    localStorage.setItem('projectList', JSON.stringify(projectList));
                    renderProjects();
                });

                detailsButton.addEventListener('click', () => {
                    if(task.detailsHidden) {
                        task.detailsHidden = false;
                    } else task.detailsHidden = true;
                    
                    localStorage.setItem('projectList', JSON.stringify(projectList));
                    renderProjects();
                });

                editButton.addEventListener('click', () => {
                    //Unhide the form
                    const newTaskForm = document.getElementById('new-task-form-container');
                    newTaskForm.style.display = 'block';
                    document.getElementById('modal-background').style.display = 'block';

                    //Pass index of current project, index of current task, and existing task data to be pre-filled
                    const form = document.getElementById('new-task-form');
                    form.elements['projectId'].value = projectIndex;
                    form.elements['taskId'].value = taskIndex;
                    form.elements['title'].value = task.title;
                    form.elements['description'].value = task.desc;
                    form.elements['due-date'].value = task.dueDate;
                    if (task.highPriority) {
                        form.elements['priority'].checked = true;
                    } else form.elements['priority'].checked = false;
                });

                deleteButton.addEventListener('click', () => {
                    // confimration of intent to delete
                    const confirmed = window.confirm('Are you sure you want to delete this task?');

                    if(confirmed) {
                        project.taskList.splice(taskIndex, 1);
                        localStorage.setItem('projectList', JSON.stringify(projectList));
                        renderProjects();
                    }
                });

            });
           

            // Render New Task button and apply it below the tasks, make sure it points to this specific project for adding tasks
            const newTaskButton = document.createElement('img');
            newTaskButton.src = newIcon;
            newTaskButton.classList.add('task-button');
            projectDiv.append(newTaskButton);


            // Project level event listeners
            newTaskButton.addEventListener('click', () => {
                //Unhide the form
                const newTaskForm = document.getElementById('new-task-form-container');
                newTaskForm.style.display = 'block';
                document.getElementById('modal-background').style.display = 'block';

                // Pass the index of the current project to the hidden form input so that the task will be added to the correct project
                const form = document.getElementById('new-task-form');
                form.elements['projectId'].value = projectIndex;
            });
        }
         
        projectsContainer.append(projectDiv);
        });
        
        const newProjectButton = document.createElement('button');
        newProjectButton.innerText = 'New Project';
        newProjectButton.classList.add('new-project-button')

        newProjectButton.addEventListener('click', ()=> {
            const newProjectDialog = document.getElementById('custom-dialog');
            newProjectDialog.style.display = 'block';
            document.getElementById('modal-background').style.display = 'block';
        });

        projectsContainer.append(newProjectButton);


}

function renderModals() {

// Render the new project addition modal

// Create the modal background div
const modalBackground = document.createElement('div');
modalBackground.id = 'modal-background';
modalBackground.classList.add('modal');

// Create the custom dialog div
const customDialog = document.createElement('div');
customDialog.id = 'custom-dialog';
customDialog.classList.add('task-form-container');

// Create the image element
const closeModalButton = document.createElement('img');
closeModalButton.src = xIcon;
closeModalButton.classList.add('close-modal-button');

// Create the heading element
const heading = document.createElement('h3');
heading.textContent = 'Add New Project';

const form = document.createElement('form');
form.id = 'new-project-form';

// Create the label and input for the title
const titleLabel = document.createElement('label');
titleLabel.for = 'title';
titleLabel.textContent = 'Title:';
const titleInput = document.createElement('input');
titleInput.type = 'text';
titleInput.id = 'title';
titleInput.name = 'title';
titleInput.required = true;

// Create the label and textarea for the description
const descriptionLabel = document.createElement('label');
descriptionLabel.for = 'description';
descriptionLabel.textContent = 'Description:';
const descriptionTextarea = document.createElement('textarea');
descriptionTextarea.id = 'description';
descriptionTextarea.name = 'description';

// Create the button element
const submitButton = document.createElement('button');
submitButton.id = 'submitButton';
submitButton.type = 'submit';
submitButton.textContent = 'Add Project';

// Append the elements to the form
form.appendChild(titleLabel);
form.appendChild(titleInput);
form.appendChild(descriptionLabel);
form.appendChild(descriptionTextarea);
form.appendChild(submitButton);

// Append the form to the dialog
customDialog.appendChild(closeModalButton);
customDialog.appendChild(heading);
customDialog.appendChild(form);

// Append the dialog to the modal background
modalBackground.appendChild(customDialog);

// Append the modal background to the document body
document.body.appendChild(modalBackground);

// Event listener for the X / Close button for New Projects
closeModalButton.addEventListener('click', ()=> {
    modalBackground.style.display = 'none';
    customDialog.style.display = 'none';
});

submitButton.addEventListener('click', (event)=> {
    event.preventDefault();
    const newProjectTitle = titleInput.value;
    const newProjectDesc = descriptionTextarea.value;
    form.reset();
    modalBackground.style.display = 'none';

    const newProject = createProject(newProjectTitle, newProjectDesc);
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    projectList.push(newProject);
    localStorage.setItem('projectList', JSON.stringify(projectList));
    renderProjects();

});

// RENDER NEW TASK FORM

// Create the new task form container
const newTaskFormContainer = document.createElement('div');
newTaskFormContainer.id = 'new-task-form-container';
newTaskFormContainer.classList.add('task-form-container');
newTaskFormContainer.style.display = 'none';

// Create the task form header
const taskFormHeader = document.createElement('div');
taskFormHeader.classList.add('task-form-header');

// Create the newTaskHeader
const newTaskHeader = document.createElement('h3');
newTaskHeader.textContent = 'Add/Edit Task';

// Create the close button
const closeTaskModalButton = document.createElement('img');
closeTaskModalButton.src = xIcon;
closeTaskModalButton.classList.add('close-modal-button');

// Append the newTaskHeader and close button to the task form header
taskFormHeader.appendChild(newTaskHeader);
taskFormHeader.appendChild(closeTaskModalButton);

// Create the form
const newTaskForm = document.createElement('form');
newTaskForm.id = 'new-task-form';

// Create the label and input for Title
const taskTitleLabel = document.createElement('label');
taskTitleLabel.setAttribute('for', 'title');
taskTitleLabel.textContent = 'Title:';
const taskTitleInput = document.createElement('input');
taskTitleInput.type = 'text';
taskTitleInput.id = 'title';
taskTitleInput.name = 'title';
taskTitleInput.required = true;

// Create the label and textarea for Description
const taskDescLabel = document.createElement('label');
taskDescLabel.setAttribute('for', 'description');
taskDescLabel.textContent = 'Description:';
const taskDescTextArea = document.createElement('textarea');
taskDescTextArea.id = 'description';
taskDescTextArea.name = 'description';

// Create the label and input for Due Date
const dueDateLabel = document.createElement('label');
dueDateLabel.setAttribute('for', 'due-date');
dueDateLabel.textContent = 'Due Date:';
const dueDateInput = document.createElement('input');
dueDateInput.type = 'date';
dueDateInput.id = 'due-date';
dueDateInput.name = 'due-date';
dueDateInput.required = true;

// Create the label and checkbox for High Priority
const priorityLabel = document.createElement('label');
const priorityCheckbox = document.createElement('input');
priorityCheckbox.type = 'checkbox';
priorityCheckbox.id = 'high-priority';
priorityCheckbox.name = 'priority';
priorityCheckbox.value = 'high';
const priorityText = document.createTextNode('High Priority?');
const projectIdInput = document.createElement('input');
projectIdInput.type = 'hidden';
projectIdInput.name = 'projectId';
projectIdInput.value = '123';
const taskIdInput = document.createElement('input');
taskIdInput.type = 'hidden';
taskIdInput.name = 'taskId';
taskIdInput.value = '-1';

// Create the button
const taskSubmitButton = document.createElement('button');
taskSubmitButton.type = 'submit';
taskSubmitButton.textContent = 'Add Task';

// Append the elements to the form
newTaskForm.appendChild(taskTitleLabel);
newTaskForm.appendChild(taskTitleInput);
newTaskForm.appendChild(taskDescLabel);
newTaskForm.appendChild(taskDescTextArea);
newTaskForm.appendChild(dueDateLabel);
newTaskForm.appendChild(dueDateInput);
priorityLabel.appendChild(priorityCheckbox);
priorityLabel.appendChild(priorityText);
newTaskForm.appendChild(priorityLabel);
newTaskForm.appendChild(projectIdInput);
newTaskForm.appendChild(taskIdInput);
newTaskForm.appendChild(taskSubmitButton);

// Append the header and form to the container
newTaskFormContainer.appendChild(taskFormHeader);
newTaskFormContainer.appendChild(newTaskForm);

// Append the new task form container to the document body
//document.body.appendChild(newTaskFormContainer);
modalBackground.appendChild(newTaskFormContainer);

// Event listener for the X / Close button for New Projects
closeTaskModalButton.addEventListener('click', ()=> {
    modalBackground.style.display = 'none';
    newTaskFormContainer.style.display = 'none';
    newTaskForm.reset();
});

// Event listener for submitting new task or edit task

newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const projectIndex = newTaskForm.elements['projectId'].value;
    const taskIndex = newTaskForm.elements['taskId'].value;
    const taskTitle = newTaskForm.elements['title'].value;
    const taskDesc = newTaskForm.elements['description'].value;
    const taskDueDate = new Date(newTaskForm.elements['due-date'].value);
    const taskHighPriority = newTaskForm.elements['priority'].checked;
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];

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
    newTaskFormContainer.style.display = 'none';
    modalBackground.style.display ='none';

    localStorage.setItem('projectList', JSON.stringify(projectList));
    renderProjects();
});

// Event listener for closing the modal by clicking outside of the modal
modalBackground.addEventListener('click', (event)=> {
    if (event.target == modalBackground) {
        modalBackground.style.display = 'none';
        customDialog.style.display = 'none';
        newTaskFormContainer.style.display = 'none';
        newTaskForm.reset();
    }
});

// Event listener for escape key to close the modal
document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape') {
        modalBackground.style.display = 'none';
        customDialog.style.display = 'none';
        newTaskFormContainer.style.display = 'none';
        newTaskForm.reset();
    }
});

}

export { renderProjects, renderModals };