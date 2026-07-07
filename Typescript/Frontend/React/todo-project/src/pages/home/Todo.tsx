import type { MouseEvent } from "react"
import "./Todo.css"

import type { TodoType } from "../../utils/types"
import { CompletedIcon, TrashIcon } from "../../assets/SvgComponents"

type Props = {
    todo: TodoType
    deleteTodo: (todoId: number) => Promise<void>
    completeTodo: (todoId: number) => Promise<void>
}

export default function Todo({ todo, deleteTodo, completeTodo }: Props) {
    function handleDelete(e: MouseEvent<HTMLButtonElement>, todoId: number) {
        const button = e.currentTarget
        button.disabled = true

        deleteTodo(todoId)
            .finally(() => button.disabled = false)
    }

    function handleComplete(e: MouseEvent<HTMLButtonElement>, todoId: number) {
        const button = e.currentTarget
        button.disabled = true

        completeTodo(todoId)
            .finally(() => button.disabled = false)
    }

    return (
        <div className="todo-container">
            <div className="todo-content-container">
                <span className="task-text">
                    {todo.task}
                </span>

                <span className="date-text">Todo date</span>

                <button className="done-button" onClick={e => handleComplete(e, todo.id)}>
                    Done
                </button>

                <button className="delete-button regular-button" onClick={e => handleDelete(e, todo.id)}>
                    <TrashIcon />
                </button>

                {todo.completed && (
                    <div className="completed-container">
                        <CompletedIcon />
                    </div>
                )}
            </div>
        </div>
    )
}