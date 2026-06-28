import { Routes, Route, useNavigate } from 'react-router'
import { useState } from 'react'
import axios from 'axios'
import './App.css'

import type { TodoType } from './utils/types'
import AuthenticationPage from './pages/Authentication'
import HomePage from './pages/Home'

function App() {
  const [ todos, setTodos ] = useState<TodoType[]>([])

  const navigate = useNavigate()
  
  async function loginUser(email: string, password: string) {
    const response = await axios.post(`/auth/login`, {
      email,
      password
    })

    setTodos(response.data)
    navigate(`/home`)
    console.log(todos)
  }

  return (
    <Routes>
      <Route index element={ 
        <AuthenticationPage loginUser={loginUser} />
       } />
      <Route path='/home' element={ <HomePage /> } />

      <Route path='*' element={ (<div>Not Found 404</div>) } />
    </Routes>
  )
}

export default App
