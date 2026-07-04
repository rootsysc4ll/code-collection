import { useState } from "react"
import type { MouseEvent } from "react"

type Props = {
    addTodo: (task: string) => void
}

export default function AddTodo({ addTodo }: Props) {
    const [ task, setTask ]       = useState<string>('')
    // const [ details, setDetails ] = useState<string>('')
    // const [ date, setDate ]       = useState<string>('')

    function handleAddTodo(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        addTodo(task)
    }

    return (<div style={{position: 'relative'}}>
        <div className="todo-container special-todo">
            <div className="todo-content-container">
                <button className={`details-button regular-button rotate`}>
                    &gt;
                </button>

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

            <div className="details-container">
                <span className="details-content indicator-text">
                    <input className="todo-input" type="text" />
                    --- details
                </span>
            </div>
        </div>

        <button id="finish-button" onClick={handleAddTodo}>
            Finish
        </button>
    </div>)
}