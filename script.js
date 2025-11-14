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

