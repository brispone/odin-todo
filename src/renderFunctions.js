import expandIcon from './assets/expand.svg';
import shrinkIcon from './assets/shrink.svg';
import trashIcon from './assets/trash.svg';
import calendarIcon from './assets/calendar.svg';
import editIcon from './assets/edit.svg';
import newIcon from './assets/plus-circle.svg';

function renderProjects (projectList) {

    const projectsContainer = document.getElementById("projects");

    projectsContainer.innerHTML = '';

    projectList.forEach((project, projectIndex) => {
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

        newTaskButton.addEventListener('click', () => {
            //Unhide the form
            const newTaskForm = document.getElementById('new-task-form-container');
            newTaskForm.style.display = 'block';

            // Pass the index of the current project to the hidden form input so that the task will be added to the correct project
            const form = document.getElementById('new-task-form');
            form.elements['projectId'].value = projectIndex;
        });
    
        projectsContainer.append(projectDiv);
    });

}

export { renderProjects };