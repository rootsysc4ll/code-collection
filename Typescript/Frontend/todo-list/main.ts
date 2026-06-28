interface todo {
    name: string,
    date: (string | undefined) // not obrigatory
}

let savedTodos: todo[];
if (localStorage.getItem('todos')) {
    savedTodos = JSON.parse(localStorage.getItem('todos') as string);
} else {
    savedTodos = [];
}

let todos: todo[] = savedTodos;

let todoGridElement: (Element | null) = document.querySelector('.ts-todo-grid');
if (!todoGridElement) {
    logError('todo grid is null');
}

let dateInputElement: (HTMLInputElement | null) = document.querySelector('.ts-todo-date-input'); 
let addButtonElement: (HTMLInputElement | null) = document.querySelector('.ts-add-button');
let todoInputElement: (HTMLInputElement | null) = document.querySelector('.ts-todo-name-input');
if (todoInputElement && addButtonElement) {
    addButtonElement.addEventListener('click', () => {
        addTodo(todoInputElement!.value, dateInputElement?.value);
    });

    todoInputElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTodo(todoInputElement!.value, dateInputElement?.value);
        }
    });
} else { 
    logError('todoInputElement or addButtonElement is null') 
}

function addTodo(todoName: string, todoDate: string = '') {
    if (todoName !== '') {
        let newTodo: todo = {
            name: todoName,
            date: todoDate
        };

        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodo();
    } else {
        logError("blank todo name isn't allowed");
    }

    console.log(localStorage.getItem('todoGridHTML'));
}

function renderTodo() {
    todoGridElement!.innerHTML = '';

    todos.forEach((todo: todo) => {
        todoGridElement!.innerHTML += `
            <div class="todo-name">${todo.name}</div>
            <div class="todo-date">${todo.date}</div>
            <button class="delete-button ts-delete-button">Delete</button>
        `;
    })

    document.querySelectorAll('.ts-delete-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            renderTodo();
        });
    });
}

let errorDisplayElement: (Element | null) = document.querySelector('.ts-error-message-display');
if (!errorDisplayElement) {
    console.log('could not get error display');
}
function logError(errorMsg: string): void {
    console.log(errorMsg);
    
    alert(errorMsg);
}

renderTodo();

console.log('dddd')
console.log('dddd')
console.log('aaaaaaaaaa')