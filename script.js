// =======================
// LOAD & SAVE TASKS
// =======================
function loadTasks() {
  let t = localStorage.getItem('tasks');
  if (!t) return [];
  return JSON.parse(t);
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// =======================
// RENDER TASK LIST
// =======================
function displayTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = "";

  const tasks = loadTasks();

  tasks.forEach(t => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${t.title}</h3>
      <p>Due: ${t.due.replace("T"," ")}</p>
      <button class="btn-detail">Lihat Detail</button>
    `;

    // Detail button
    card.querySelector('.btn-detail').addEventListener('click', () => {
      alert(`Tugas: ${t.title}\nDeadline: ${t.due}`);
    });

    // Double-click reminder
    card.addEventListener('dblclick', () => {
      sendReminder(t);
    });

    list.appendChild(card);
  });
}

// =======================
// NOTIFICATION REMINDER
// =======================
function sendReminder(t) {
  if (Notification.permission === 'granted') {
    new Notification('Reminder: ' + t.title, {
      body: 'Deadline: ' + t.due
    });
  }
}

// Request permission
if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}

// =======================
// MODAL CONTROL
// =======================
const addBtn = document.getElementById('addTaskBtn');
const modal = document.getElementById('taskModal');
const closeModal = document.getElementById('closeModal');
const saveTaskBtn = document.getElementById('saveTaskBtn');

addBtn.addEventListener('click', () => {
  modal.style.display = "flex";
});

closeModal.addEventListener('click', () => {
  modal.style.display = "none";
});

// =======================
// ADD NEW TASK
// =======================
saveTaskBtn.addEventListener('click', () => {
  const title = document.getElementById('taskTitle').value;
  const due = document.getElementById('taskDue').value;

  if (title === "" || due === "") {
    alert("Semua field harus diisi");
    return;
  }

  const newTask = { title, due };

  const current = loadTasks();
  current.push(newTask);
  saveTasks(current);

  modal.style.display = "none";
  displayTasks();
});

// =======================
// INITIAL LOAD
// =======================
displayTasks();
