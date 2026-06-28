import { Link } from "react-router"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import "./Authentication.css"

type AuthFormProps = {
    isLogin: boolean
    setIsLogin: Dispatch<SetStateAction<boolean>>
    loginUser: (email:string, password:string) => void
    setErrorMessage: Dispatch<SetStateAction<string>>
}

type AuthenticationProps = {
    loginUser: (email:string, password:string) => void
}

function AuthForm({ isLogin, setIsLogin, loginUser, setErrorMessage }: AuthFormProps) {
    const [ email, setEmail ]       = useState<string>('')
    const [ password, setPassword ] = useState<string>('')

    function handleLogin() {
        try {
            loginUser(email, password)
        } catch (error) {
            const errorStatus = (error as AxiosError).status
            setErrorMessage(`These credentials don't match any user, Error: ${errorStatus}`)
        }
    }

    async function registerUser() {
        try {
            await axios.post('/auth/register', {
                email,
                password
            })
            setIsLogin(true)
        } catch (error) {
            const errorStatus = (error as AxiosError).status
            setErrorMessage(`Couldn't create user, Error: ${errorStatus}`)
        }
    }

    function handleSubmit() {
        if (isLogin) {
            handleLogin()
        } else {
            registerUser()
        }
    }

    return (
        <div id="auth-form">
            <input id="auth-input" placeholder="Enter your email" type="text" 
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input id="auth-input" placeholder="Enter your password" type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button id="submit-button" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    )
}

export default function Authentication({ loginUser }: AuthenticationProps) {
    const [ isLogin, setIsLogin ]           = useState<boolean>(false)
    const [ errorMessage, setErrorMessage ] = useState<string>('')

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
                    loginUser={loginUser}
                    setErrorMessage={setErrorMessage}
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