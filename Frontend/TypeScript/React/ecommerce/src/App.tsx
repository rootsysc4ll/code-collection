import axios from "axios"
import { useEffect, useState } from "react"
import { Routes, Route } from 'react-router'
import './App.css'

import HomePage from './pages/home/Home'
import CheckoutPage from './pages/checkout/Checkout'
import OrdersPage from './pages/orders/Orders'
import TrackingPage from './pages/tracking/Tracking'
import NotFoundPage from './pages/NotFound'

import { type CartItemType } from "./utils/types"

function App() {
    const [cart, setCart] = useState<CartItemType[]>([])

    async function loadCart() {
        const response = await axios.get('/api/cart-items?expand=product')
        setCart(response.data)
    }

    useEffect(() => {
        loadCart()
    }, [])

    return (
        <Routes>
            <Route index element={ <HomePage cart={cart} loadCart={loadCart}  /> } />
            <Route path='/checkout' element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
            <Route path='/orders' element={<OrdersPage cart={cart} loadCart={loadCart} />} />
            <Route path='/tracking/:orderId/:productId' element={<TrackingPage cart={cart} />} />

            <Route path='*' element={<NotFoundPage cart={cart} />} />
        </Routes>
    )
}

export default App