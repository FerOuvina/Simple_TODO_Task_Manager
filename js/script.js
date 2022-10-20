// Initializing variables
const addTaskBtn = document.getElementById('btn');
const deleteIcon = document.querySelector('.main__task--trashIcon');
const checkIcon = document.querySelector('.main__task--checkIcon');

// Functions for creating dom elements
const createCheckIcon = () => {
  let createCheckIcon = document.createElement('i');
  createCheckIcon.classList.add('fa-regular', 'fa-square', 'main__task--checkIcon');
  createCheckIcon.addEventListener('click', completedTask);
  return createCheckIcon;
};

const createDeleteIcon = () => {
  let createDeleteIcon = document.createElement('i')
  createDeleteIcon.classList.add('fa-solid', 'fa-trash-can', 'main__task--trashIcon');
  createDeleteIcon.addEventListener('click', deleteTask);
  return createDeleteIcon;
};

// Add task function
const createTask = (event) => {
  event.preventDefault();
  const userInput = document.getElementById('input');
  const inputValue = userInput.value;
  userInput.value = '';
  
  const createTaskContainer = document.createElement('div');
  createTaskContainer.classList.add('main__task--container');
  
  const createTaskContent = document.createElement('p');
  createTaskContent.classList.add('main__task--p');
  createTaskContent.innerText = inputValue;

  const mainTask = document.getElementById('mainTask');
  mainTask.appendChild(createTaskContainer);
  createTaskContainer.appendChild(createCheckIcon());
  createTaskContainer.appendChild(createTaskContent);
  createTaskContainer.appendChild(createDeleteIcon());  
};
addTaskBtn.addEventListener('click', createTask);

// Check/uncheck task function
const completedTask = (event) => {
  const element = event.target;
  element.classList.toggle('fa-regular');
  element.classList.toggle('fa-square-check');
  element.classList.toggle('fa-regular');
  element.classList.toggle('fa-square');
};

// Delete task function 
const deleteTask = (event) => {
  const parent = event.target.parentElement;
  parent.remove();
};