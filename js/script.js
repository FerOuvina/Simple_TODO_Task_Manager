// Initializing variables
const addTaskBtn = document.querySelector('[data-form-btn]');
const deleteIcon = document.querySelector('.main__task--trashIcon');
const checkIcon = document.querySelector('.main__task--checkIcon');

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

// Function for verifying duplicated dates
const verifyDate = (date) => {
  const dateElement = document.createElement('p');
  dateElement.classList.add('main__task--dupDate');
  dateElement.innerHTML = date;
  return dateElement;
};

const dupDates = (tasks) => {
  const datesArray = [];
  tasks.forEach((task) =>{
    if(!datesArray.includes(task.dateFormat)) datesArray.push(task.dateFormat);});
  return datesArray;
};

const dateOrder = (dupDate) => {
  return dupDate.sort ((a, b) => {
    const first = moment(a, 'DD/MM/YY');
    const second = moment(b, 'DD/MM/YY');
    return first - second;
  });
};

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
const addTask = (event) => {
  event.preventDefault();

  const mainTask = document.querySelector('[data-main-task]');

  const userInput = document.querySelector('[data-form-input]');
  const inputValue = userInput.value;
  userInput.value = '';

  const dateTime = document.querySelector('[data-form-date]');
  const dateTimeValue = dateTime.value;
  const dateFormat = moment(dateTimeValue).format('DD/MM/YY');
  
  if (!inputValue || !dateTimeValue) {
    return;
  };

  const taskObject = {inputValue, dateFormat,};
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.push(taskObject);
  localStorage.setItem('tasks', JSON.stringify(taskList));

  mainTask.innerHTML = '';
  readTask();
};

// Create task function
const createTask = ({inputValue, dateFormat,}) => {
  const createTaskContainer = document.createElement('div');
  createTaskContainer.classList.add('main__task--container');

  const createTaskContent = document.createElement('p');
  createTaskContent.classList.add('main__task--p');
  createTaskContent.innerText = inputValue;

  const date = document.createElement('span');
  date.classList.add('main__task--date');
  date.innerHTML = dateFormat;

  createTaskContainer.appendChild(createCheckIcon());
  createTaskContainer.appendChild(createTaskContent);
  createTaskContainer.appendChild(date);
  createTaskContainer.appendChild(createDeleteIcon());
  return createTaskContainer;
};
addTaskBtn.addEventListener('click', addTask);

// Reading tasks
const readTask = () => {
  const taskContainer = document.querySelector('[data-main-task]');
  const readTask = JSON.parse(localStorage.getItem('tasks')) || [];
  const dupDate = dupDates(readTask);
  dateOrder(dupDate);
  dupDate.forEach(date => {
    const dateMoment = moment(date, 'DD/MM/YY');
    taskContainer.appendChild(verifyDate(date));
    readTask.forEach((task) => {
      const taskDate = moment(task.dateFormat, 'DD/MM/YY');
      const dateDiff = dateMoment.diff(taskDate);
      if (!dateDiff) {
        taskContainer.appendChild(createTask(task));
      };
    });
  });
};

readTask()
