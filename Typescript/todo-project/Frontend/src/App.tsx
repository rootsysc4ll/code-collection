import { Routes, Route } from 'react-router'
import { useEffect } from 'react'
import './App.css'

import AuthenticationPage from './pages/authentication/Authentication'
import HomePage from './pages/home/Home'

import themeProvider from './utils/themeProvider'

function App() {
  let token = localStorage.getItem('token') || ''


  useEffect(() => {
    themeProvider.defaultTheme()
  }, [])

  return (
    <Routes>
      <Route index element={
        <AuthenticationPage token={token} />
      } />
      <Route path='/home/:userId' element={
        <HomePage token={token} />
      } />
      <Route path='/home/' element={
        <HomePage token={token} />
      } />

      <Route path='*' element={(<div>Not Found 404</div>)} />
    </Routes>
  )
}

export default App
