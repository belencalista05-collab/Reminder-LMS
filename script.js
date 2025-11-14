async function loadTasks() {
  const res = await fetch('tasks.json');
  const tasks = await res.json();
  const list = document.getElementById('task-list');

  tasks.forEach(t => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${t.title}</h3><p>Due: ${t.due}</p>`;
    list.appendChild(card);
  });
}

loadTasks();
