import { Link } from "react-router"
import type { AxiosError} from "axios"
import {  useState } from "react"
import "./Authentication.css"

import AuthForm from "./AuthForm"
import Message from "../../components/Message"
import type { MessageType } from "../../utils/types"

type Props = {
    loginUser: (email:string, password:string) => Promise<void>
    registerUser: (email:string, password:string) => Promise<void>
}

export default function Authentication({ loginUser, registerUser }: Props) {
    const [ isLogin, setIsLogin ] = useState<boolean>(false)
    const [ message, setMessage ] = useState<MessageType>({ message: '', id: '' })

    async function handleLogin(email:string, password:string) {
        try {
            await loginUser(email, password)
        } catch (error) {
            const axiosError = error as AxiosError
            setMessage({
                message: `Couldn't login user, error code ${axiosError.code} '${axiosError.message}'`,
                id: "error-message"
            })
        }
    }

    async function handleRegister(email:string, password:string) {
        try {
            await registerUser(email, password)
        } catch (error) {
            const axiosError = error as AxiosError
            setMessage({
                message: `Couldn't register user, error code ${axiosError.code} '${axiosError.message}'`,
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
                    <button>
                        <Link to={'/home'}>Skip</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}