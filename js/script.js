// Initializing variables
let addTaskBtn = document.getElementById('btn');
let checkTask = document.getElementById('checkTask');
let deteleTask = document.getElementById('deleteTask');


// Add task function
const createTask = (event) => {
  event.preventDefault();
  const userInput = document.getElementById('data-input');
  const inputValue = userInput.value;

}
addTaskBtn.addEventListener('click', createTask);
