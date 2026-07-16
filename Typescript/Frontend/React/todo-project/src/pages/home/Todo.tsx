import type { MouseEvent } from "react"
import "./Todo.css"

import type { TodoType } from "../../utils/types"
import { CompletedIcon, TrashIcon } from "../../assets/SvgComponents"

type Props = {
    todo: TodoType
    deleteTodo: (todoId: number) => Promise<void>
    updateTodo: (todoId: number) => Promise<void>
}

export default function Todo({ todo, deleteTodo, updateTodo }: Props) {
    function handleDelete(e: MouseEvent<HTMLButtonElement>, todoId: number) {
        const button = e.currentTarget
        button.disabled = true

        deleteTodo(todoId)
            .finally(() => button.disabled = false)
    }

    function handleUpdate(e: MouseEvent<HTMLButtonElement>, todoId: number) {
        const button = e.currentTarget
        button.disabled = true
        
        updateTodo(todoId)
            .finally(() => {button.disabled = false
                console.log("dsgsaggga")
            })
        
    }

    return (
        <div className="todo-container">
            <div className="todo-content-container">
                <span className="task-text">
                    {todo.task}
                </span>

                <span className="date-text">Todo date</span>

                <button className="done-button regular-button" onClick={e => handleUpdate(e, todo.id)}>
                    Done
                </button>

                <button className="delete-button regular-button" onClick={e => handleDelete(e, todo.id)}>
                    <TrashIcon />
                </button>

                {todo.completed === 1 && (
                    <div className="completed-container">
                        <CompletedIcon />
                    </div>
                )}
            </div>
        </div>
    )
}