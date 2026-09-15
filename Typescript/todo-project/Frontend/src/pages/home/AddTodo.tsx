import { useState } from "react"
import type { MouseEvent, KeyboardEvent } from "react"
import "./AddTodo.css"

type Props = {
    addTodo: (task: string) => Promise<void>
}

export default function AddTodo({ addTodo }: Props) {
    const [ task, setTask ]       = useState<string>('')

    function startToAddTodo(e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) {
        const button = e.currentTarget
        button.disabled = true
        addTodo(task)
            .finally(() => button.disabled = false)
    }
    
    function handleAddTodo(e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>, task: string) {
        e.stopPropagation()

        const keydownCond = e.type === 'keydown'
        const clickCond   = e.type === 'click'
        if (keydownCond) {
            const keypress = e as KeyboardEvent<HTMLInputElement>

            if (keypress.key === 'Enter') { startToAddTodo(e) }
        } else if (clickCond) {
            startToAddTodo(e)
        }
    }

    return (<div style={{position: 'relative'}}>
        <div className="todo-container add-todo">
            <div className="todo-content-container">
                <span className="task-text indicator-text">
                    <input className="todo-input" type="text" name="" id="" 
                        value={task} 
                        onChange={e => setTask(e.target.value)}
                        onKeyDown={e => handleAddTodo(e, task)}
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