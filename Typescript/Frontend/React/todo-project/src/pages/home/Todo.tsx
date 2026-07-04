import { useState } from "react"
import "./Todo.css"

import type { TodoType } from "../../utils/types"
import { CompletedIcon, TrashIcon, EditIcon } from "../../assets/SvgComponents"

type Props = {
    todo: TodoType
    handleTodoUpdate: (newTodo: TodoType) => void
}

// handleTodoUpdate
export default function Todo({ todo }: Props) {
    const [ detailsIsVisible, setDetailsIsVisible ] = useState<boolean>(false)

    return (
        <div className="todo-container">
            <div className="todo-content-container">
                <button className={`details-button regular-button ${detailsIsVisible ? 'rotate' : ''}`} onClick={() => setDetailsIsVisible(!detailsIsVisible)}>
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
                        Edit
                        <EditIcon />
                    </button>
                </div>
            </>)}
        </div>
    )
}