import { Routes, Route } from 'react-router'
import './styles/App.css'

import HomePage from './pages/Home'
import CheckoutPage from './pages/Checkout'
import OrdersPage from './pages/Orders'
import TrackingPage from './pages/Tracking'

function App() {
    return (
        <Routes>
            <Route path='/'         element={<HomePage     />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/orders'   element={<OrdersPage   />} />
            <Route path='/tracking' element={<TrackingPage />} />
        </Routes>
    )
}

export default App