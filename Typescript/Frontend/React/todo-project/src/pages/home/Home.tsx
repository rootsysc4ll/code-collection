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
    loadTodos: () => Promise<void>
}
// loadTodos
export default function Home({ todos }: Props) {
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isAdding, setIsAdding] = useState<boolean>(false)

    function displayErrorMessage(message: string) {
        console.log(message)
        setErrorMessage(message)
    }

    async function completeTodo(todoId: number): Promise<void> {
        try {
            await axios.put('/todo', {
                todoId,
                completed: 1 
            })
        } catch (error) {
            const axiosError = error as AxiosError
            displayErrorMessage(`Error occured with code ${axiosError.code}, ${axiosError.message}`)
        }
    }
    
    async function deleteTodo(todoId: number): Promise<void> {
        try {
            await axios.delete(`/todo/${todoId}`)
        } catch (error) {
            const axiosError = error as AxiosError
            displayErrorMessage(`Error occured with code ${axiosError.code}, ${axiosError.message}`)
        }
    }
    
    async function addTodo(task: string): Promise<void> {
        try {
            await axios.post('/todo', { task })
        } catch (error) {
            const axiosError = error as AxiosError
            displayErrorMessage(`Error occured with code ${axiosError.code}, ${axiosError.message}`)
        }
    }

    return (
        <div id="home-page">
            <nav>
                <button className="regular-button add-button" onClick={() => setIsAdding(!isAdding)} disabled={isAdding}>
                    <PlusIcon />
                </button>
                <button className="regular-button reset-button">
                    <ResetIcon />
                </button>
            </nav>

            <header>
                <span id="header-text">UserId={'there should be the userId'}# numberOfTodos={todos.length}</span>
            </header>

            <span id="todos-title">
                Hello! Here's yours todos:
            </span>

            <div id="todos-container">
                {todos.map(todo => {
                    return (
                        <Todo
                            key={todo.id}
                            todo={todo}
                            completeTodo={completeTodo}
                            deleteTodo={deleteTodo}
                        />
                    )
                })}

                {isAdding && (
                    <AddTodo addTodo={addTodo} />
                )}
            </div>

            {errorMessage !== '' && (
                <ErrorMessage
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                />
            )}
        </div>
    )
}