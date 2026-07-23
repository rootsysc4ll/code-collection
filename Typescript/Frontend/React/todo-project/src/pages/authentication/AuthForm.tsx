import { useState } from "react"
import type { Dispatch, SetStateAction, MouseEvent } from "react"
import type { AxiosResponse } from "axios"
import "./AuthForm.css"

import type { MessageType } from "../../utils/types"

type Props = {
    isLogin: boolean
    setIsLogin: Dispatch<SetStateAction<boolean>>
    handleLogin: (email:string, password:string) => Promise<void>
    handleRegister: (email:string, password:string) => Promise<AxiosResponse>
    setMessage: Dispatch<SetStateAction<MessageType>>
}

//setMessage
export default function AuthForm({ isLogin, handleLogin, handleRegister }: Props) {
    const [ email, setEmail ]       = useState<string>('')
    const [ password, setPassword ] = useState<string>('')

    function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
        const button = e.currentTarget
        button.disabled = true
        
        const result = isLogin ? handleLogin(email, password) : handleRegister(email, password)

        result.finally(() => button.disabled = false)
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