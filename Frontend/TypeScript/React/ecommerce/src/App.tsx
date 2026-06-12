import { Routes, Route } from 'react-router'
import './styles/App.css'

import HomePage from './pages/Home'
import CheckoutPage from './pages/checkout/Checkout'
import OrdersPage from './pages/Orders'
import TrackingPage from './pages/Tracking'
import NotFoundPage from './pages/NotFound'

function App() {
    

    return (
        <Routes>
            <Route index            element={<HomePage     />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path='/orders'   element={<OrdersPage   />} />
            <Route path='/tracking' element={<TrackingPage />} />

            <Route path='*'         element={<NotFoundPage />} />
        </Routes>
    )
}

export default App