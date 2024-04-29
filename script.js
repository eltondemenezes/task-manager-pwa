if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage on page load
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [{
        title: 'Grocery Shopping',
        description: 'Purchase ingredients for the week, including vegetables, fruits, protein sources, and pantry staples.',
        completed: false
      },
      {
        title: 'Exercise Routine',
        description: 'Plan out a weekly exercise routine including cardio, strength training, and flexibility exercises.',
        completed: false
      }];

    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskElement.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <div class="d-flex justify-content-end btn-wrap">
                <button class="complete-btn" data-index="${index}">Complete</button>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(taskElement);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add task
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-description').value;
        tasks.unshift({ title, description, completed: false });
        renderTasks();
        taskForm.reset();
    });

    // Toggle task completion
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('complete-btn')) {
            const index = e.target.dataset.index;
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        }
    });

    // Edit task
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('edit-btn')) {
            const index = e.target.dataset.index;
            const updatedTitle = prompt('Enter new title:', tasks[index].title);
            const updatedDescription = prompt('Enter new description:', tasks[index].description);
            if (updatedTitle !== null && updatedDescription !== null) {
                tasks[index].title = updatedTitle;
                tasks[index].description = updatedDescription;
                renderTasks();
            }
        }
    });

    // Delete task
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            renderTasks();
        }
    });

    // Initial render
    renderTasks();
});
