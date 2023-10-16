import expandIcon from './assets/expand.svg';
import shrinkIcon from './assets/shrink.svg';
import trashIcon from './assets/trash.svg';
import calendarIcon from './assets/calendar.svg';
import editIcon from './assets/edit.svg';
import newIcon from './assets/plus-circle.svg';
import xIcon from './assets/x.svg';

function renderProjects (projectList) {

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
        const projectDeleteButton = document.createElement('img');
        projectDeleteButton.src = trashIcon;
        projectDeleteButton.classList.add('task-button');
    
        projectTitle.innerText = project.title;
        projectDesc.innerText = project.desc;
        projectDiv.classList.add("project");
    
        projectTitleContainer.append(projectTitle);
        projectTitleContainer.append(projectDesc);
        projectHeader.append(projectTitleContainer, projectDeleteButton)
        projectDiv.append(projectHeader);

        // Event listener for the delete project button
        projectDeleteButton.addEventListener('click', () => {
            // confimration of intent to delete
            const confirmed = window.confirm('Are you sure you want to delete this project?');

            if(confirmed) {
                projectList.splice(projectIndex, 1);
                renderProjects(projectList);
            }
        });
        
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
                renderProjects(projectList);
            });

            detailsButton.addEventListener('click', () => {
                if(task.detailsHidden) {
                    task.detailsHidden = false;
                } else task.detailsHidden = true;
                
                renderProjects(projectList);
            });

            editButton.addEventListener('click', () => {
                //Unhide the form
                const newTaskForm = document.getElementById('new-task-form-container');
                newTaskForm.style.display = 'block';

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
                    renderProjects(projectList);
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

            // Pass the index of the current project to the hidden form input so that the task will be added to the correct project
            const form = document.getElementById('new-task-form');
            form.elements['projectId'].value = projectIndex;
        });

        const newProjectButton = document.createElement('button');
        newProjectButton.innerText = 'New Project';
        newProjectButton.classList.add('new-project-button')

        newProjectButton.addEventListener('click', ()=> {
            const newProjectDialog = document.getElementById('custom-dialog');
            newProjectDialog.style.display = 'block';
            document.getElementById('modal-background').style.display = 'block';
        });

        projectsContainer.append(projectDiv, newProjectButton);
    });

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
customDialog.classList.add('dialog');

// Create the image element
const closeModalButton = document.createElement('img');
closeModalButton.src = xIcon;
closeModalButton.classList.add('close-modal-button');

// Create the heading element
const heading = document.createElement('h3');
heading.textContent = 'Add New Project';

// Create the input element for Item 1
const input1 = document.createElement('input');
input1.type = 'text';
input1.id = 'input1';
input1.placeholder = 'Item 1';

// Create the textarea element for Item 2
const input2 = document.createElement('textarea');
input2.id = 'input2';
input2.placeholder = 'Item 2';

// Create the button element
const submitButton = document.createElement('button');
submitButton.id = 'submitButton';
submitButton.textContent = 'Submit';

// Append the elements to the dialog
customDialog.appendChild(closeModalButton);
customDialog.appendChild(heading);
customDialog.appendChild(input1);
customDialog.appendChild(input2);
customDialog.appendChild(submitButton);

// Append the dialog to the modal background
modalBackground.appendChild(customDialog);

// Append the modal background to the document body
document.body.appendChild(modalBackground);

// Event listener for closing the modal by clicking outside of the modal
modalBackground.addEventListener('click', (event)=> {
    if (event.target == modalBackground) {
        modalBackground.style.display = 'none';
    }
});

// Event listener for the X / Close button
closeModalButton.addEventListener('click', ()=> {
    modalBackground.style.display = 'none';
});

// Event listener for escape key to close the modal
document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape') {
        modalBackground.style.display = 'none';
    }
});

}

export { renderProjects, renderModals };