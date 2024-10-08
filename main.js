// Variables
let tasksList = [];
let tasksListElement = document.getElementById('tasks_area');
let addTaskButton = document.getElementById('add_btn');

getFromLocalStorage();
renderTasks();
// Functions
function renderTasks() {
  tasksListElement.innerHTML = '';
  let index = 0;

  for (task of tasksList) {
    let content = `
  <div class="tasks ${task.isDone ? 'done' : ''}">
    <div class="task__details">
      <h1 class="task__title">${task.title}</h1>
      <span style="display: block">
        <span class="material-symbols-outlined"> calendar_month </span>
        ${task.date}
      </span>
    </div>
    <div class="task__actions">
      <button onclick="deleteTask(${index})" class="circular_button delete_btn">
        <span class="material-symbols-outlined"> delete </span>
      </button>
  
      ${task.isDone
        ? `      <button onclick="toggleTaskCompleation(${index})" class="circular_button create_btn cancel">
            <span class="material-symbols-outlined"> cancel </span>
          </button>`
        : `      <button onclick="toggleTaskCompleation(${index})" class="circular_button create_btn check">
            <span class="material-symbols-outlined"> check </span>
          </button>`
      }
  
      <button onclick="(updateTask(${index}))" class="circular_button update_btn">
        <span class="material-symbols-outlined"> edit </span>
      </button>
    </div>
  </div>

`;

    tasksListElement.innerHTML += content;
    index++;
  }
}

function addTask() {
  let taskTitle = prompt('أدخل عنوان المهمة');
  if (taskTitle) {
    let now = new Date();
    let taskDate =
      now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();

    let taskObject = {
      title: taskTitle,
      date: taskDate,
      isDone: false,
    };
    tasksList.push(taskObject);
    storeToLocalStorage();
    renderTasks();
  }
}

function deleteTask(index) {
  let isConfirmed = confirm('هل تريد حذف المهمة؟');
  if (isConfirmed) {
    tasksList.splice(index, 1);
    storeToLocalStorage();
    renderTasks();
  }
}

function updateTask(index) {
  let newTitle = prompt('أدخل عنوان المهمة الجديد', tasksList[index].title);
  let now = new Date();
  let newDate =
    now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
  tasksList[index].title = newTitle;
  tasksList[index].date = newDate;
  storeToLocalStorage();

  renderTasks();
}

function toggleTaskCompleation(index) {
  if (tasksList[index].isDone) {
    tasksList[index].isDone = false;
    let taskJson = JSON.stringify(tasksList);
    localStorage.setItem('tasks', taskJson);
    renderTasks();
  } else {
    tasksList[index].isDone = true;
    storeToLocalStorage();
    renderTasks();
  }
}

function storeToLocalStorage() {
  let taskJson = JSON.stringify(tasksList);
  localStorage.setItem('tasks', taskJson);
}

function getFromLocalStorage() {
let tasksFromJson = JSON.parse(localStorage.getItem("tasks"))
tasksList = tasksFromJson ?? []

}

// Events
addTaskButton.addEventListener('click', addTask);
