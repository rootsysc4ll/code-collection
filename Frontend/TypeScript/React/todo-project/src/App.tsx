import { Routes, Route } from 'react-router'
import AuthenticationPage from './pages/Authentication'
import HomePage from './pages/Home'
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={ <AuthenticationPage /> } />
      <Route path='/home' element={ <HomePage /> } />

      <Route path='*' element={ (<div>Not Found 404</div>) } />
    </Routes>
  )
}

export default App
