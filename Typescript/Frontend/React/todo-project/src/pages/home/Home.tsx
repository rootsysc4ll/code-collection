import { useState, useEffect } from "react"
import axios, { AxiosError } from "axios"
import "./Home.css"

import { PlusIcon, ResetIcon } from "../../assets/SvgComponents"
import type { TodoType } from "../../utils/types"
import Todo from "./Todo"
import AddTodo from "./AddTodo"
import ErrorMessage from "../../components/ErrorMessage"

type Props = {
    todos: TodoType[]
    token: string
    loadTodos: () => Promise<void>
}

export default function Home({ todos, token, loadTodos }: Props) {
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [isAdding, setIsAdding] = useState<boolean>(false)

    function displayErrorMessage(message: string) {
        console.log(message)
        setErrorMessage(message)
    }

    async function handleLoadTodos() {
        try {
            await loadTodos()
        } catch (error) {
            const axiosError = error as AxiosError
            displayErrorMessage(`Error occured with code ${axiosError.code}, ${axiosError.message}`)
        } 
    }

    async function completeTodo(todoId: number): Promise<void> {
        try {
            await axios.put('/todos', {
                todoId,
                completed: true,
            }, { headers: { 'Authorization': token } })

            await handleLoadTodos()
        } catch (error) {
            const axiosError = error as AxiosError
            displayErrorMessage(`Error occured with code ${axiosError.code}, ${axiosError.message}`)
        }
    }
    
    async function deleteTodo(todoId: number): Promise<void> {
        try {
            await axios.delete(`/todos/${todoId}`,
                { headers: { 'Authorization': token } }
            )

            await handleLoadTodos()
        } catch (error) {
            const axiosError = error as AxiosError
            displayErrorMessage(`Error occured with code ${axiosError.code}, ${axiosError.message}`)
        }
    }
    
    async function addTodo(task: string): Promise<void> {
        try {
            await axios.post('/todos', { task }, { headers: { 'Authorization': token } })

            await handleLoadTodos()
        } catch (error) {
            const axiosError = error as AxiosError
            displayErrorMessage(`Error occured with code ${axiosError.code}, ${axiosError.message}`)
            setIsAdding(false)
        }
    }

    useEffect(() => {
        loadTodos().catch(error => {
            const axiosError = error as AxiosError
            displayErrorMessage(`Error occured with code ${axiosError.code}, ${axiosError.message}`)
        })
    }, [])

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

                {isAdding === true && (
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