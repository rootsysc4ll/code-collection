import { useState } from "react"
import axios, { AxiosError } from "axios"
import "./Home.css"

import { PlusIcon, ResetIcon } from "../../assets/SvgComponents"
import type { TodoType } from "../../utils/types"
import Todo from "./Todo"
import AddTodo from "./AddTodo"

let isOnDeleteProccess = false
let isOnUpdateProccess = false

type Props = {
    todos: TodoType[]
    loadTodos: () => void
}

export default function Home({ todos, loadTodos }: Props) {
    const [isAdding, setIsAdding] = useState<boolean>(false)

    async function updateTodo(newTodo: TodoType) {
        try {
            await axios.put(`/todos/${newTodo.id}`, {
                id: newTodo.id,
                userId: newTodo.userId,
                task: newTodo.completed,
                completed: newTodo.completed
            })
            await loadTodos()
        } catch (error) {
            const errorCode = (error as AxiosError).code
            console.log(`Error code ${errorCode} trying to update todo`)
            /////////////   
        } finally {
            isOnUpdateProccess = false
        }
    }

    function handleTodoUpdate(newTodo: TodoType) {
        if (!isOnUpdateProccess) {
            isOnUpdateProccess = true
            updateTodo(newTodo)
        } else {
            console.log('wait! update process is running')
            ///////////
        }
    }

    async function deleteTodo(id: number) {
        try {
            await axios.delete(`/todos/${id}`)
            await loadTodos()
        } catch (error) {
            const errorCode = (error as AxiosError).code
            console.log(`Error code ${errorCode} trying to delete todo`)
            /////////////   
        } finally {
            isOnDeleteProccess = false
        }
    }

    // userId
    function handleTodoDelete(todoId: number) {
        if (!isOnDeleteProccess) {
            isOnDeleteProccess = true
            deleteTodo(todoId)
        } else {
            console.log('wait! update process is running')
            ///////////
        }
    }

    // details, date
    async function addTodo(task: string) {
        try {
            await axios.post('/todos', {
                userId: todos[0].userId,
                task,
            })
        } catch (error) {
            const errorCode = (error as AxiosError).code
            console.log(`Error code ${errorCode} trying to delete todo`)
            /////////////   
        }
        setIsAdding(false)
    }

    return (
        <div id="home-page">
            <nav>
                <button className="regular-button add-button" onClick={() => setIsAdding(!isAdding)}>
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
                            handleTodoDelete={handleTodoDelete}
                        />
                    )
                })}

                {isAdding && (
                    <AddTodo
                        addTodo={addTodo}
                    />
                )}
            </div>
        </div>
    )
}