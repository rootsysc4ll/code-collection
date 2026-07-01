import { useState } from "react"
import "./Home.css"

import type { TodoType } from "../utils/types"
import { CompletedIcon, TrashIcon, TodosIcon, EditIcon } from "../assets/componentIcons"

type HomeProps = {
    todos: TodoType[]
    setTodos:  React.Dispatch<React.SetStateAction<TodoType[]>>
}

type TodoProps = {
    todo: TodoType
    handleTodoUpdate: (newTodo: TodoType) => void
}

// handleTodoUpdate
function Todo({ todo }: TodoProps) {
    const [ detailsIsVisible, setDetailsIsVisible ] = useState<boolean>(false)

    return (
        <div className="todo-container">
            <div className="todo-content-container">
                <button className="details-button regular-button" onClick={() => setDetailsIsVisible(!detailsIsVisible)}>
                    &gt;
                </button>

                <span className="task-text">
                    {todo.task}
                </span>

                <span className="date-text">Todo date</span>

                <button className="delete-button regular-button">
                    <TrashIcon />
                </button>

                {todo.completed && (
                    <CompletedIcon />
                )}
            </div>

            {detailsIsVisible && (<>
                <div className="details-container">
                    <span className="details-content">details</span>

                    <button className="edit-button">
                        <EditIcon />
                    </button>
                </div>
            </>)}
        </div>
    )
}

export default function Home({ todos, setTodos }: HomeProps) {
    function handleTodoUpdate(newTodo: TodoType) {
        const newTodos = todos.map(todo => {
            if (todo.id === newTodo.id) {
                return {
                    id: todo.id,
                    userId: todo.userId,
                    task: newTodo.task,
                    completed: newTodo.completed
                }
            } else return todo
        })

        setTodos(newTodos)
    }

    return (
        <div id="home-page">
            <nav>
                <button className="regular-button">
                    <TodosIcon />
                </button>
            </nav>
                
            <header>
                this is the header
            </header>

            <span id="todos-title">
                Hello! Here's yours todos:
            </span>

            <div id="todos-container">
                {todos.map(todo => {
                    return (
                        <Todo
                            key={crypto.randomUUID()} 
                            todo={todo}
                            handleTodoUpdate={handleTodoUpdate}
                        />
                    )
                })}
            </div>
                
        </div>
    )
}