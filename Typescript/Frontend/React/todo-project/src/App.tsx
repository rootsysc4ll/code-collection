import { Routes, Route, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

import themeProvider from './utils/themeProvider'
import type { TodoType } from './utils/types'
import AuthenticationPage from './pages/Authentication'
import HomePage from './pages/home/Home'

function App() {
  const [ todos, setTodos ] = useState<TodoType[]>([
    {
      id: 1,
      userId: 1,
      task: 'you need to make the colors be generated via ts',
      completed: false
    },
    {
      id: 2,
      userId: 1,
      task: 'aaaaaaaaaaaaaaaaaaa',
      completed: false
    }
  ])

  const navigate = useNavigate()
  
  useEffect(() => {
    themeProvider.defaultTheme()
  }, [])

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
          setTodos={setTodos}
        />
      } />

      <Route path='*' element={ (<div>Not Found 404</div>) } />
    </Routes>
  )
}

export default App
