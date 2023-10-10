import { createTask } from './taskFactory';

function createProject (title, desc) {
    const defaultTask = createTask("Task 1", "Default task", new Date(), false);
    const taskList = [ defaultTask ];
    return {
        title,
        desc,
        taskList,
        addTask(task) {
            this.taskList.push(task);
        }
    };
}

export { createProject };