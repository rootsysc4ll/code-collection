import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import axios from "axios"
import dayjs from "dayjs"
import "./Tracking.css"

import Header from "../../components/Header"
import type { CartItemType, OrderType } from "../../utils/types"
import { formatDate } from "../../utils/functions"

type TrackingProps = {
    cart: CartItemType[]
}

type ShippingProgressProps = {
    deliveryProgressPercent: number
}

function ShippingProgress({ deliveryProgressPercent }: ShippingProgressProps) {
    const isPreparing = deliveryProgressPercent < 33
    const isShipping  = deliveryProgressPercent > 33 && deliveryProgressPercent < 100
    const isDelivered = deliveryProgressPercent === 100
    
    return (<>
        <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
                Preparing
            </div>
            <div className={`progress-label ${isShipping && 'current-status'}`}>
                Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
                Delivered
            </div>
        </div>

        <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${deliveryProgressPercent}%` }}></div>
        </div>
    </>)
}

export default function Tracking({ cart }: TrackingProps) {
    const { orderId, productId } = useParams()
    const [order, setOrder] = useState<OrderType | null>(null)

    useEffect(() => {
        async function requestOrderData() {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`)
            setOrder(response.data)
        }
        requestOrderData()
    }, [orderId])
    if (!order) return null;

    const orderProduct = order.products.find(orderProduct => orderProduct.productId === productId)

    const totalDeliveryTimeMS = orderProduct!.estimatedDeliveryTimeMs - order.orderTimeMs
    const timePassedMS = dayjs().valueOf() - order.orderTimeMs

    let deliveryProgressPercent = ((timePassedMS) / totalDeliveryTimeMS) * 100
    if (deliveryProgressPercent > 100) deliveryProgressPercent = 100

    return (<>
        <title>Tracking</title>
        <link rel="icon" href="tracking-favicon.png" />

        <Header cart={cart} />

        <div className="tracking-page">
            <div className="order-tracking">
                <Link className="back-to-orders-link link-primary" to="/orders">
                    View all orders
                </Link>

                <div className="delivery-date">
                    {deliveryProgressPercent >= 100 ? ('Delivered On') : (<>
                        Arriving on
                        {formatDate(orderProduct!.estimatedDeliveryTimeMs)}
                    </>)}
                </div>

                <div className="product-info">
                    {orderProduct!.product.name}
                </div>

                <div className="product-info">
                    Quantity: {orderProduct!.quantity}
                </div>

                <img className="product-image" src={orderProduct!.product.image} />

                <ShippingProgress deliveryProgressPercent={deliveryProgressPercent}/>
            </div>
        </div>
    </>)
}