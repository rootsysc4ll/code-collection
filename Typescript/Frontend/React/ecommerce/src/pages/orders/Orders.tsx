import axios from "axios"
import { useEffect, useState } from "react"
import "./Orders.css"

import Header from "../../components/Header"

import OrdersGrid from "./OrdersGrid"
import { type CartItemType, type OrderType } from "../../utils/types"

type OrdersProps = {
    cart: CartItemType[]
    loadCart: () => void
}

export default function Orders({ cart, loadCart }: OrdersProps) {
    const [orders, setOrders] = useState<OrderType[]>([])

    useEffect(() => {
        async function requestOrders() {
            const response = await axios.get('/api/orders?expand=products')
            setOrders(response.data)
        }
        requestOrders()
    }, [])

    return (<>
        <title>Orders</title>
        <link rel="icon" href="orders-favicon.png" />

        <Header cart={cart} />

        <div className="orders-page">
            <div className="page-title">Your Orders</div>

            <OrdersGrid orders={orders} loadCart={loadCart}/>
        </div>
    </>)
}