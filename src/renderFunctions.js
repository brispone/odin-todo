function renderProjects (projectList) {

    const projectsCopy = [...projectList];

    const projectsContainer = document.getElementById("projects");

    projectsContainer.innerHTML = '';

    projectsCopy.forEach((project) => {
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
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            const taskName = document.createElement('span');
            taskName.innerText = task.title;
            
            if (task.highPriority) {
                taskName.innerText = task.title + " 🚩";
            } else taskName.innerText = task.title;
    
            if (task.completed) {
                taskName.classList.add('completed');
            }
    
            taskDiv.append(checkbox);
            taskDiv.append(taskName);
            projectDiv.append(taskDiv);
    
            // Add event listener for when the checkbox is checked or unchecked
            checkbox.addEventListener('change', (event) => {

                if(event.target.checked) {
                    task.completed = true;
                } else task.completed = false;
                console.log(task);
                renderProjects(projectsCopy);
            });
        });
    
        projectsContainer.append(projectDiv);
    });

}

export { renderProjects };