import axios from "axios"
import { useEffect, useState } from "react"
import { Routes, Route } from 'react-router'
import './styles/App.css'

import HomePage from './pages/Home'
import CheckoutPage from './pages/checkout/Checkout'
import OrdersPage from './pages/orders/Orders'
import TrackingPage from './pages/Tracking'
import NotFoundPage from './pages/NotFound'

import { type CartItemType } from "./utils/types"

function App() {
    const [ cart, setCart ] = useState<CartItemType[]>([])

    useEffect(() => {
        axios.get('/api/cart-items?expand=product').then(response => setCart(response.data))
    }, [])
    
    return (
        <Routes>
            <Route index            element={<HomePage     cart={cart}/>} />
            <Route path='/checkout' element={<CheckoutPage cart={cart}/>} />
            <Route path='/orders'   element={<OrdersPage   cart={cart}/>} />
            <Route path='/tracking' element={<TrackingPage cart={cart}/>} />

            <Route path='*'         element={<NotFoundPage cart={cart}/>} />
        </Routes>
    )
}

export default App