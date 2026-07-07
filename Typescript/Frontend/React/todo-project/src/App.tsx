import { Routes, Route, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

import themeProvider from './utils/themeProvider'
import type { TodoType } from './utils/types'
import AuthenticationPage from './pages/authentication/Authentication'
import HomePage from './pages/home/Home'

function App() {
  const [ todos, setTodos ] = useState<TodoType[]>([])
  const [ token, setToken ] = useState<string>('')

  async function loginUser(email:string, password:string) {
    const response = await axios.post('/login', {
      email,
      password
    })
  }
  
  async function registerUser(email:string, password:string) {
    const response = await axios.post('/login', {
      email,
      password
    })

    const data = await response.data
    if (data.token) {
      setToken(data.token)
      localStorage.setItem('token', token)
    }
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
          todos={todos}
          loadTodos={loadTodos}
        />
      } />

      <Route path='*' element={(<div>Not Found 404</div>)} />
    </Routes>
  )
}

export default App
