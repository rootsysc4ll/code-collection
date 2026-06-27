import { Link, useNavigate } from "react-router"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import type { Dispatch, SetStateAction } from "react"
import "./Authentication.css"

type AuthFormProps = {
    isLogin: boolean
    setErrorMessage: Dispatch<SetStateAction<string>>
}

function AuthForm({ isLogin, setErrorMessage }: AuthFormProps) {
    const [ email, setEmail ]       = useState<string>('')
    const [ password, setPassword ] = useState<string>('')

    const navigate = useNavigate()

    async function loginUser() {
        try {
            const response = await axios.post(`/auth/login`, {
                email,
                password
            })
            navigate(`/home/${response.data}`) // this will go to '/home/username'
        } catch (error) {
            const errorStatus = (error as AxiosError).status
            setErrorMessage(`These credentials don't match any user, Error: ${errorStatus}`)
        }
    }

    async function registerUser() {
        await axios.post('/auth/register', {
            email,
            password
        }).catch(error => {
            setErrorMessage(`Couldn't create user, Error: ${error.status}`)
        })
    }

    function handleSubmit() {
        if (isLogin) {
            loginUser()
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

export default function Authentication() {
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