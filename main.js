// Variables
let tasksList = [];
let tasksListElement = document.getElementById('tasks_area');
let addTaskButton = document.getElementById('add_btn');

// Functions
function renderTasks() {
  tasksListElement.innerHTML = '';
  let index = 0;

  for (task of tasksList) {
    let content = `
  <div id="tasks">
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
      <button class="circular_button create_btn">
        <span class="material-symbols-outlined"> check </span>
      </button>
      <button onclick = "(updateTask(${index}))" class="circular_button update_btn">
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
  let now = new Date();
  let taskDate =
    now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();

  let taskObject = {
    title: taskTitle,
    date: taskDate,
    isDone: false,
  };

  tasksList.push(taskObject);
  renderTasks();
}

function deleteTask(index) {
  let isConfirmed = confirm('هل تريد حذف المهمة؟');
  if (isConfirmed) {
    tasksList.splice(index, 1);
    renderTasks();
  }
}

function updateTask(index) {
  let newTitle = prompt('أدخل عنوان المهمة الجديد');
  let now = new Date();
  let newDate =
    now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear();
  tasksList[index].title = newTitle;
  tasksList[index].date = newDate;

  renderTasks();
}

// Events
addTaskButton.addEventListener('click', addTask);
