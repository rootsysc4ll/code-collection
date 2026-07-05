import { useState } from "react"
import axios, { AxiosError } from "axios"
import "./Home.css"

import { PlusIcon, ResetIcon } from "../../assets/SvgComponents"
import type { TodoType } from "../../utils/types"
import Todo from "./Todo"
import AddTodo from "./AddTodo"
import ErrorMessage from "./ErrorMessage"

type Props = {
    todos: TodoType[]
    loadTodos: () => void
}

export default function Home({ todos, loadTodos }: Props) {
    const [isDeleting, setIsDeleting]     = useState<boolean>(false)
    const [isUpdating, setIsUpdating]     = useState<boolean>(false)
    const [isAdding, setIsAdding]         = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    function displayErrorMessage(message: string) {
        console.log(message)
        setErrorMessage(message)
    }

    async function handleTodoUpdate(newTodo: TodoType) {
        if (!isUpdating) {
            setIsUpdating(true)

            try {
                await axios.put(`/todos/${newTodo.id}`, {
                    id: newTodo.id,
                    userId: newTodo.userId,
                    task: newTodo.completed,
                    completed: newTodo.completed
                })
                loadTodos()
            } catch (error) {
                const errorCode = (error as AxiosError).code
                displayErrorMessage(`Error code ${errorCode} trying to update todo`)
            } finally {
                setIsUpdating(false)
            }
        } else {
            displayErrorMessage('wait! update process is running')
        }
    }

    // userId
    async function handleTodoDelete(todoId: number) {
        if (!isDeleting) {
            setIsDeleting(true)
            
            try {
                await axios.delete(`/todos/${todoId}`)
                loadTodos()
            } catch (error) {
                const errorCode = (error as AxiosError).code
                displayErrorMessage(`Error code ${errorCode} trying to delete todo`)
            } finally {
                setIsDeleting(false)
            }
        } else {
            displayErrorMessage('wait! delete process is running')
        }
    }

    // details, date
    async function addTodo(task: string) {
        try {
            await axios.post('/todos', {
                userId: todos[0].userId,
                task
            })
        } catch (error) {
            const errorCode = (error as AxiosError).code
            displayErrorMessage(`Error code ${errorCode} trying to add todo`)
        }
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
                    <AddTodo addTodo={addTodo} />
                )}

                {errorMessage !== '' && (
                    <ErrorMessage 
                        errorMessage={errorMessage} 
                        setErrorMessage={setErrorMessage}
                    />
                )}
            </div>
        </div>
    )
}