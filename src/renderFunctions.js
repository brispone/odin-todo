import expandIcon from './assets/expand.svg';
import trashIcon from './assets/trash.svg';

function renderProjects (projectList) {

    const projectsContainer = document.getElementById("projects");

    projectsContainer.innerHTML = '';

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
                taskDiv.classList.add('high-priority');
            }
    
            if (task.completed) {
                taskName.classList.add('completed');
            }

            const taskButtons = document.createElement('div');
            taskButtons.classList.add('task-buttons');

            const expandButton = document.createElement('img');
            expandButton.src = expandIcon;

            const deleteButton = document.createElement('img');
            deleteButton.src = trashIcon;

            taskButtons.append(expandButton);
            taskButtons.append(deleteButton);
    
            leftsideContainer.append(checkbox);
            leftsideContainer.append(taskName);
            taskDiv.append(leftsideContainer);
            taskDiv.append(taskButtons);
            projectDiv.append(taskDiv);
    
            // Add event listener for when the checkbox is checked or unchecked
            checkbox.addEventListener('change', (event) => {

                if(event.target.checked) {
                    task.completed = true;
                } else task.completed = false;
                console.log(task);
                renderProjects(projectList);
            });
        });
    
        projectsContainer.append(projectDiv);
    });

}

export { renderProjects };