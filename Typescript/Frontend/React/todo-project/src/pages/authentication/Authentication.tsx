import { Link } from "react-router"
import type { AxiosError} from "axios"
import {  useState } from "react"
import "./Authentication.css"

import AuthForm from "./AuthForm"

type Props = {
    loginUser: (email:string, password:string) => Promise<void>
    registerUser: (email:string, password:string) => Promise<void>
}

export default function Authentication({ loginUser, registerUser }: Props) {
    const [ isLogin, setIsLogin ]           = useState<boolean>(false)
    const [ errorMessage, setErrorMessage ] = useState<string>('')

    async function handleLogin(email:string, password:string) {
        try {
            await loginUser(email, password)
        } catch (error) {
            const axiosError = error as AxiosError
            setErrorMessage(`Couldn't login user, error code ${axiosError.code} '${axiosError.message}'`)
        }
    }

    async function handleRegister(email:string, password:string) {
        try {
            await registerUser(email, password)
        } catch (error) {
            const axiosError = error as AxiosError
            setErrorMessage(`Couldn't register user, error code ${axiosError.code} '${axiosError.message}'`)
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

                    {errorMessage && (
                        <span className="auth-text error-message">{errorMessage}</span>
                    )}
                </div>

                <AuthForm 
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    handleLogin={handleLogin}
                    handleRegister={handleRegister}
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