document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const deleteButton = document.getElementById('deleteButton');
    const taskList = document.getElementById('taskList');
    const taskTotal = document.getElementById('taskTotal');

    taskInput.focus();

    function updateTaskTotal() {
        const totalTasks = taskList.getElementsByTagName('li').length;
        taskTotal.textContent = `(${totalTasks})`;
    }

    taskInput.addEventListener('input', function() {
        addButton.disabled = taskInput.value.trim() === '';
    });

    function addTask() {
        if (taskInput.value.trim() !== '') {
            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            li.appendChild(checkbox);

            const span = document.createElement('span');
            span.textContent = taskInput.value;
            li.appendChild(span);

            taskList.appendChild(li);
            taskInput.value = '';
            addButton.disabled = true;
            updateTaskTotal();
        }
    }

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    addButton.addEventListener('click', addTask);

    taskList.addEventListener('change', function() {
        const anyChecked = Array.from(taskList.getElementsByTagName('input')).some(input => input.checked);
        deleteButton.disabled = !anyChecked;
    });

    deleteButton.addEventListener('click', function() {
        const checkedItems = Array.from(taskList.getElementsByTagName('input')).filter(input => input.checked);
        checkedItems.forEach(item => taskList.removeChild(item.parentElement));
        deleteButton.disabled = true;
        updateTaskTotal();
    });

    taskList.addEventListener('click', function(event) {
        if (event.target.tagName === 'SPAN') {
            event.target.classList.toggle('strike-task');
        }
    });
});
