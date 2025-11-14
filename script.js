async function loadTasks() {
  const res = await fetch('tasks.json');
  const tasks = await res.json();
  const list = document.getElementById('task-list');

t.tasks.forEach(t => {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h3>${t.title}</h3>
    <p>Due: ${t.due}</p>
    <button class="btn-detail">Lihat Detail</button>
  `;
  card.querySelector('.btn-detail').addEventListener('click', () => {
    alert(`Tugas: ${t.title}\\nDeadline: ${t.due}`);
  });
  list.appendChild(card);
});

  function sendReminder(t) {
  if (Notification.permission === 'granted') {
    new Notification('Reminder: '+ t.title, {
      body: 'Deadline: '+ t.due
    });
  }
}

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('dblclick', () => {
    const title = card.querySelector('h3').innerText;
    const due = card.querySelector('p').innerText;
    sendReminder({ title, due });
  });
});

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

function loadTasks() {
  let t = localStorage.getItem('tasks');
  if (!t) return [];
  return JSON.parse(t);
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

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
