import { createProject } from './projectFactory';
import { createTask } from './taskFactory';

const testProject = createProject("Test Project", "This is a simple test to see if the project constructor works.");
const testTask = createTask("Task 2", "test task yo", new Date(), true);
testProject.addTask(testTask);
console.log(testProject);
