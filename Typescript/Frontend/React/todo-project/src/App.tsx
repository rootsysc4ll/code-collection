import { Routes, Route, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

import themeProvider from './utils/themeProvider'
import type { TodoType } from './utils/types'
import AuthenticationPage from './pages/Authentication'
import HomePage from './pages/home/Home'

let isLoadingTodos = false

function App() {
  const [ todos, setTodos ] = useState<TodoType[]>([
    {
      id: 1,
      userId: 1,
      task: 'you need to make an error popup',
      completed: false
    },
    {
      id: 2,
      userId: 1,
      task: 'you need to implement update modal',
      completed: true
    }
  ])

  const navigate = useNavigate()
  
  useEffect(() => {
    themeProvider.defaultTheme()
  }, [])

  async function loadTodos() {
    if (!isLoadingTodos) {
      const response = await axios.get('/todos')
      setTodos(response.data)
    } else {
      console.log('Todos are on loading proccess')
    }
    isLoadingTodos = false
  }

  async function loginUser(email: string, password: string) {
    const response = await axios.post(`/auth/login`, {
      email,
      password
    })

    setTodos(response.data)
    navigate(`/home`)
  }

  return (
    <Routes>
      <Route index element={ 
        <AuthenticationPage loginUser={loginUser} />
       } />
      <Route path='/home' element={ 
        <HomePage 
          todos={todos}
          loadTodos={loadTodos}
        />
      } />

      <Route path='*' element={ (<div>Not Found 404</div>) } />
    </Routes>
  )
}

export default App
