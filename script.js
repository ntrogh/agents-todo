// Get elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

// Animation constants
const DELETE_ANIMATION_DURATION = 300; // matches CSS animation (0.3s)

// Add todo function
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create list item
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.onchange = function() {
        li.classList.toggle('completed');
    };
    
    // Create text span
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todoText;
    
    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        li.style.animation = 'todoSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            li.remove();
            checkEmpty();
        }, DELETE_ANIMATION_DURATION);
    };
    
    // Append elements
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
    
    // Clear input
    todoInput.value = '';
    todoInput.focus();
    
    checkEmpty();
}

// Check if list is empty
function checkEmpty() {
    const existingMessage = document.querySelector('.empty-message');
    
    if (todoList.children.length === 0) {
        if (!existingMessage) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = 'No tasks yet. Add one above!';
            todoList.appendChild(emptyMessage);
        }
    } else {
        if (existingMessage) {
            existingMessage.remove();
        }
    }
}

// Event listeners
addBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Initialize empty message
checkEmpty();

// Theme toggle functionality
function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.textContent = '☀️';
    }
}

// Event listener for theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Load theme on page load
loadTheme();
