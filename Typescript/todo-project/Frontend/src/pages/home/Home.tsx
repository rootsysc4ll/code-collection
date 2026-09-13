import { useState, useEffect } from "react"
import axios, { AxiosError } from "axios"
import { useParams } from "react-router"
import "./Home.css"

import { PlusIcon, ResetIcon } from "../../assets/SvgComponents"
import type { TodoType, MessageType } from "../../utils/types"
import Todo from "./Todo"
import AddTodo from "./AddTodo"
import ErrorMessage from "../../components/Message"

type Props = {
    todos: TodoType[]
    token: string
    loadTodos: () => Promise<void>
}

export default function Home({ todos, token, loadTodos }: Props) {
    const [errorMessage, setErrorMessage] = useState<MessageType>({ message: '', id: '' })
    const [isAdding, setIsAdding] = useState<boolean>(false)

    const { userId } = useParams()

    function displayErrorMessage(message: string) {
        console.log(message)
        setErrorMessage({message, id: "error-message"})
    }

    async function handleLoadTodos() {
        try {
            await loadTodos()
        } catch (error) {
            const axiosError = error as AxiosError
            displayErrorMessage(`Error occured with code ${axiosError.code}, ${axiosError.response}`)
        } 
    }

    async function updateTodo(todoId: number): Promise<void> {
        try {
            // the only way you can update the todos is to
            // completing them, so no need to send body info
            await axios.put(`/todos/${todoId}`, {}, { headers: { 'Authorization': token } })

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
            setIsAdding(false)
        } catch (error) {
            const axiosError = error as AxiosError
            displayErrorMessage(`Error occured with code ${axiosError.code}, ${axiosError.message}`)
            setIsAdding(false)
        }
    }

    async function resetTodos() {
        try {
            await axios.delete(`/todos`,
                { headers: { 'Authorization': token } }
            )
            await handleLoadTodos()
        } catch (error) {
            const axiosError = error as AxiosError
            displayErrorMessage(`Error occured with code ${axiosError.code}, ${axiosError.message}`)
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
                <button className="regular-button reset-button" onClick={() => resetTodos()}>
                    <ResetIcon />
                </button>
            </nav>

            <header>
                <span id="header-text">
                    UserId={userId} # numberOfTodos={todos.length}
                </span>
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
                            updateTodo={updateTodo}
                            deleteTodo={deleteTodo}
                        />
                    )
                })}

                {isAdding === true && (
                    <AddTodo addTodo={addTodo} />
                )}
            </div>

            {errorMessage.message !== '' && (
                <ErrorMessage
                    message={errorMessage}
                    setMessage={setErrorMessage}
                />
            )}
        </div>
    )
}