import './style.css';
import { createProject } from './projectFactory';
import { createTask } from './taskFactory';
import { renderProjects, renderModals } from './renderFunctions';

let projectList = JSON.parse(localStorage.getItem('projectList')) || [];

renderModals();
renderProjects();