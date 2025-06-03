const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-btn');

const updateSection = document.getElementById('updateSection');
const updateInput = document.getElementById('updateInput');
const updateBtn = document.getElementById('updateBtn');
const cancelUpdateBtn = document.getElementById('cancelUpdateBtn');

let tasks = [];
let currentFilter = 'all';
let taskToUpdateId = null;

// Carregar tasques de localStorage
function loadTasks() {
  const saved = localStorage.getItem('tasks');
  tasks = saved ? JSON.parse(saved) : [];
}

// Guardar tasques a localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Mostrar tasques segons el filtre
function renderTasks() {
  taskList.innerHTML = '';
  let filtered = tasks;
  if (currentFilter !== 'all') {
    filtered = tasks.filter(t => t.status === currentFilter);
  }
  if (filtered.length === 0) {
    taskList.innerHTML = `<li>No tasks found.</li>`;
    return;
  }

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = task.status;

    // Crear contingut amb totes les propietats ben formatades
    li.innerHTML = `
      <div>
        <strong>ID:</strong> ${task.id}<br/>
        <strong>Name:</strong> ${task.description}<br/>
        <strong>Status:</strong> ${task.status}<br/>
        <strong> Created: </strong> ${new Date(task.createdAt).toLocaleString()}<br/>
        <strong>Updated:</strong> ${new Date(task.updatedAt).toLocaleString()}
      </div>
    `;

    const actions = document.createElement('div');
    actions.className = 'actions';

    // Botons segons estat
    if (task.status !== 'in-progress') {
      const btnInProgress = document.createElement('button');
      btnInProgress.textContent = 'Mark In Progress';
      btnInProgress.onclick = () => markInProgress(task.id);
      actions.appendChild(btnInProgress);
    }

    if (task.status !== 'done') {
      const btnDone = document.createElement('button');
      btnDone.textContent = 'Mark Done';
      btnDone.onclick = () => markDone(task.id);
      actions.appendChild(btnDone);
    }

    // Botó d'actualitzar
    const btnUpdate = document.createElement('button');
    btnUpdate.textContent = 'Update';
    btnUpdate.onclick = () => showUpdate(task.id);
    actions.appendChild(btnUpdate);

    // Botó d'esborrar
    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete';
    btnDelete.onclick = () => deleteTask(task.id);
    actions.appendChild(btnDelete);

    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

// Afegir una tasca nova
function addTask(description) {
  const now = new Date().toISOString();
  const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const newTask = {
    id: newId,
    description,
    status: 'todo',
    createdAt: now,
    updatedAt: now
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

// Mostrar formulari per actualitzar
function showUpdate(id) {
  taskToUpdateId = id;
  const task = tasks.find(t => t.id === id);
  if (!task) return alert('Task not found');
  updateInput.value = task.description;
  updateSection.style.display = 'block';
  updateInput.focus();
}

// Actualitzar tasca
function updateTask() {
  if (taskToUpdateId === null) return;
  const task = tasks.find(t => t.id === taskToUpdateId);
  if (!task) return alert('Task not found');
  const newDesc = updateInput.value.trim();
  if (!newDesc) return alert('Name cannot be empty');
  task.description = newDesc;
  task.updatedAt = new Date().toISOString();
  saveTasks();
  renderTasks();
  cancelUpdate();
}

// Cancel·lar actualització
function cancelUpdate() {
  taskToUpdateId = null;
  updateSection.style.display = 'none';
  updateInput.value = '';
}

// Esborrar tasca
function deleteTask(id) {
  const beforeLen = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length === beforeLen) {
    alert('Task not found');
    return;
  }
  saveTasks();
  renderTasks();
}

// Marcar com a "done"
function markDone(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return alert('Task not found');
  task.status = 'done';
  task.updatedAt = new Date().toISOString();
  saveTasks();
  renderTasks();
}

// Marcar com a "in-progress"
function markInProgress(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return alert('Task not found');
  task.status = 'in-progress';
  task.updatedAt = new Date().toISOString();
  saveTasks();
  renderTasks();
}

// Filtrar tasques
function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderTasks();
}

// Event listeners

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const desc = taskInput.value.trim();
  if (!desc) return alert('Name');
  addTask(desc);
  taskInput.value = '';
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    setFilter(btn.dataset.filter);
  });
});

updateBtn.addEventListener('click', updateTask);
cancelUpdateBtn.addEventListener('click', cancelUpdate);

// Inicialitzar
loadTasks();
renderTasks();
