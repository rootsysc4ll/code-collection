let savedTodos;
if (localStorage.getItem('todos')) {
    savedTodos = JSON.parse(localStorage.getItem('todos'));
}
else {
    savedTodos = [];
}
let todos = savedTodos;
let todoGridElement = document.querySelector('.ts-todo-grid');
if (!todoGridElement) {
    logError('todo grid is null');
}
let dateInputElement = document.querySelector('.ts-todo-date-input');
let addButtonElement = document.querySelector('.ts-add-button');
let todoInputElement = document.querySelector('.ts-todo-name-input');
if (todoInputElement && addButtonElement) {
    addButtonElement.addEventListener('click', () => {
        addTodo(todoInputElement.value, dateInputElement?.value);
    });
    todoInputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTodo(todoInputElement.value, dateInputElement?.value);
        }
    });
}
else {
    logError('todoInputElement or addButtonElement is null');
}
function addTodo(todoName, todoDate = '') {
    if (todoName !== '') {
        let newTodo = {
            name: todoName,
            date: todoDate
        };
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodo();
    }
    else {
        logError("blank todo name isn't allowed");
    }
    console.log(localStorage.getItem('todoGridHTML'));
}
function renderTodo() {
    todoGridElement.innerHTML = '';
    todos.forEach((todo) => {
        todoGridElement.innerHTML += `
            <div class="todo-name">${todo.name}</div>
            <div class="todo-date">${todo.date}</div>
            <button class="delete-button ts-delete-button">Delete</button>
        `;
    });
    document.querySelectorAll('.ts-delete-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodo();
        });
    });
}
let errorDisplayElement = document.querySelector('.ts-error-message-display');
if (!errorDisplayElement) {
    console.log('could not get error display');
}
function logError(errorMsg) {
    console.log(errorMsg);
    alert(errorMsg);
}
renderTodo();
export {};
//# sourceMappingURL=main.js.map