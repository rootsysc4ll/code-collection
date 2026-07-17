import { Routes, Route, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios, { type AxiosResponse } from 'axios'
import './App.css'

import themeProvider from './utils/themeProvider'
import type { TodoType } from './utils/types'
import AuthenticationPage from './pages/authentication/Authentication'
import HomePage from './pages/home/Home'

function App() {
  const [ todos, setTodos ] = useState<TodoType[]>([])
  const [ token, setToken ] = useState<string>(() => localStorage.getItem('token') || '')
  const navigate = useNavigate()

  function handleTokenStorage(response: AxiosResponse) {
    const responseToken = response.data.token
    if (responseToken) {
      setToken(responseToken)
      localStorage.setItem('token', responseToken)
    }
  }

  async function loadTodos() {
    const response = await axios.get('/todos', {
      headers: { 'Authorization': token }
    })

    setTodos(response.data)
  }

  async function loginUser(email:string, password:string) {
    const response = await axios.post('/auth/login', {
      username:email,
      password
    })

    handleTokenStorage(response)
    navigate('/home')
  }
  
  async function registerUser(email:string, password:string) {
    const response = await axios.post('/auth/register', {
      username: email,
      password
    })

    handleTokenStorage(response)
  }

  useEffect(() => {
    themeProvider.defaultTheme()
  }, [])

  return (
    <Routes>
      <Route index element={
        <AuthenticationPage loginUser={loginUser} registerUser={registerUser} />
      } />
      <Route path='/home' element={
        <HomePage
          token={token}
          todos={todos}
          loadTodos={loadTodos}
        />
      } />

      <Route path='*' element={(<div>Not Found 404</div>)} />
    </Routes>
  )
}

export default App
