import "./Home.css"

import { PlusIcon, ResetIcon } from "../../assets/SvgComponents"
import type { TodoType } from "../../utils/types"
import Todo from "./Todo"

type Props = {
    todos: TodoType[]
    setTodos:  React.Dispatch<React.SetStateAction<TodoType[]>>
}

export default function Home({ todos, setTodos }: Props) {
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
                <button className="regular-button add-button">
                    <PlusIcon />
                </button>
                <button className="regular-button reset-button">
                    <ResetIcon />
                </button>
            </nav>
                
            <header>
                <span id="header-text">UserId={todos[0].userId}# numberOfTodos={todos.length}</span>
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