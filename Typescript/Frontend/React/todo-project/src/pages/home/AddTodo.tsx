import { useState } from "react"
import type { MouseEvent } from "react"
import "./AddTodo.css"

type Props = {
    addTodo: (task: string) => Promise<void>
}

export default function AddTodo({ addTodo }: Props) {
    const [ task, setTask ]       = useState<string>('')
    // const [ date, setDate ]       = useState<string>('')

    function handleAddTodo(e: MouseEvent<HTMLButtonElement>, task: string) {
        e.stopPropagation()
        e.currentTarget.disabled = true

        addTodo(task).finally(() => e.currentTarget.disabled = false)
    }

    return (<div style={{position: 'relative'}}>
        <div className="todo-container add-todo">
            <div className="todo-content-container">
                <span className="task-text  indicator-text">
                    <input className="todo-input" type="text" name="" id="" 
                        value={task} 
                        onChange={e => setTask(e.target.value)}
                    />
                    --- task name
                </span>

                <span className="date-text">
                    todo date ---
                    <input className="todo-input" type="text" name="" id="" />
                </span>
            </div>
        </div>

        <button id="finish-button" onClick={e => handleAddTodo(e, task)}>
            Finish
        </button>
    </div>)
}