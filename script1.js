const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const taskListContainer = document.getElementById('taskList');
const userSelect = document.getElementById('userSelect');

const tasks = {
    user1: [],
    user2: [],
    user3: [],
    user4: [],
    user5: []
};

let editingTask = null; 

function renderTasks(user) {
    taskListContainer.innerHTML = '';
    const sortedTasks = [...tasks[user]].sort((a, b) => {
        const priorityOrder = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
        return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    });

    sortedTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <span class="priority ${task.priority.toLowerCase().replace(' ', '-')}">${task.priority}</span>
            <button onclick="deleteTask('${user}', '${task.text}')">Delete</button>
            <button class="edit-btn" onclick="editTask('${user}', '${task.text}')">Edit</button>
        `;
        
        taskListContainer.appendChild(taskItem);
    });
}

function addTask() {
    const user = userSelect.value;
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText !== '') {
        if (editingTask) {
            
            const taskIndex = tasks[user].findIndex(task => task.text === editingTask);
            tasks[user][taskIndex] = { text: taskText, priority };
            editingTask = null; 
        } else {
            
            tasks[user].push({ text: taskText, priority });
        }

        taskInput.value = '';
        renderTasks(user);
    }
}

function deleteTask(user, taskText) {
    tasks[user] = tasks[user].filter(task => task.text !== taskText);
    renderTasks(user);
}

function editTask(user, taskText) {
    editingTask = taskText; 
    const task = tasks[user].find(t => t.text === taskText);
    
    taskInput.value = task.text;
    prioritySelect.value = task.priority;
}

addTaskBtn.addEventListener('click', addTask);
userSelect.addEventListener('change', () => renderTasks(userSelect.value));


renderTasks(userSelect.value);
