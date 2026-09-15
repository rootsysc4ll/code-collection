import type { AxiosError } from "axios"
import {  useState } from "react"
import "./Authentication.css"

import AuthForm from "./AuthForm"
import Message from "../../components/Message"
import type { MessageType } from "../../utils/types"

import { loginUser, registerUser } from "../../utils/authFunctions"
import { useNavigate } from "react-router"
type Props = {
    token: string
}

export default function Authentication({ token }: Props) {
    const [ isLogin, setIsLogin ] = useState<boolean>(false)
    const [ message, setMessage ] = useState<MessageType>({ message: '', id: '' })

    const navigate = useNavigate()
    
    async function handleLogin(email:string, password:string) {
        try {
            const { userId, authToken } =  await loginUser(email, password)

            setMessage({ message: "Successfully logged", id: "positive-message" })
            token = authToken
            navigate(`/home/${userId}`)
        } catch (error) {
            const axiosError = error as AxiosError
            setMessage({
                message: `Couldn't login user, "${axiosError.response?.data}"`,
                id: "error-message"
            })
        }
    }

    async function handleRegister(email:string, password:string) {
        try {
            await registerUser(email, password)
            setMessage({ message: "Successfully registered", id: "positive-message" })
        } catch (err) {
            const axiosError = err as AxiosError
            setMessage({
                message: `Couldn't register user, "${axiosError.response?.data}"`,
                id: "error-message"
            })
        }
    }
    
    return (
        <div id="auth-page">
            <div id="auth-container">
                <div id="auth-top-container">
                    {isLogin ? (<>
                        <span id="auth-header">Login</span>
                        <span className="auth-text">Enter your user</span>
                    </>) : (<>
                        <span id="auth-header">Sign up</span>
                        <span className="auth-text">Create an account!</span>
                    </>)}

                    {message.message && (
                        <Message message={message} setMessage={setMessage} />
                    )}
                </div>

                <AuthForm 
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    handleLogin={handleLogin}
                    handleRegister={handleRegister}
                    setMessage={setMessage}
                />

                <div id="dividing-line" />

                <div id="auth-bottom-container">
                    {isLogin ? (<>
                        <span className="auth-text">Doesn't have an account?</span>
                        <button id="auth-method-button" onClick={() => setIsLogin(false)}>Sign up</button>
                    </>) : (<>
                        <span className="auth-text">Already have an account?</span>
                        <button id="auth-method-button" onClick={() => setIsLogin(true)}>Login</button>
                    </>)}
                </div>
            </div>
        </div>
    )
}