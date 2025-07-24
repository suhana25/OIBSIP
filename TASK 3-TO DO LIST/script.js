let taskId = 0;
const pendingTasks = document.getElementById('pendingTasksList');
const completedTasks = document.getElementById('completedTasksList');

function formatDateTime(date) {
  return date.toLocaleString();
}

function createTaskElement(taskText, completed = false, addedAt = new Date(), completedAt = null) {
  const li = document.createElement('li');
  li.className = completed ? 'completed' : '';
  li.dataset.id = ++taskId;

  const taskInfo = document.createElement('div');
  taskInfo.className = 'task-info';

  const taskContent = document.createElement('div');
  taskContent.textContent = taskText;

  const timeStamp = document.createElement('div');
  timeStamp.style.fontSize = '0.8em';
  timeStamp.style.color = '#777';
  timeStamp.textContent = completed
    ? `Completed at: ${formatDateTime(completedAt)}`
    : `Added at: ${formatDateTime(addedAt)}`;

  taskInfo.appendChild(taskContent);
  taskInfo.appendChild(timeStamp);

  const buttons = document.createElement('div');
  buttons.className = 'task-buttons';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.onclick = () => editTask(li, taskText);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => li.remove();

  if (!completed) {
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.onclick = () => completeTask(li, taskText, addedAt);
    buttons.appendChild(completeBtn);
  }

  buttons.appendChild(editBtn);
  buttons.appendChild(deleteBtn);

  li.appendChild(taskInfo);
  li.appendChild(buttons);
  return li;
}

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (taskText === '') alert("Add the task");
  else{
  const taskItem = createTaskElement(taskText);
  pendingTasks.appendChild(taskItem);
  input.value = ''};
}

function completeTask(taskElement, taskText, addedAt) {
  taskElement.remove();
  const completedItem = createTaskElement(taskText, true, addedAt, new Date());
  completedTasks.appendChild(completedItem);
}

function editTask(taskElement, oldText) {
  const newText = prompt('Edit task:', oldText);
  if (newText === null || newText.trim() === '') return;

  const isCompleted = taskElement.classList.contains('completed');
  const timeLabel = taskElement.querySelector('.task-info div:last-child').textContent;
  const addedAt = new Date();
  const completedAt = isCompleted ? new Date() : null;

  taskElement.remove();
  const updatedTask = createTaskElement(newText.trim(), isCompleted, addedAt, completedAt);
  (isCompleted ? completedTasks : pendingTasks).appendChild(updatedTask);
}
