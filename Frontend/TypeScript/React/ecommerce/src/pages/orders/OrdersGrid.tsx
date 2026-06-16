import { type OrderType } from "../../utils/types"
import { formatDate, formatMoney } from "../../utils/functions"
import OrderDetails from "./OrderDetails"

type OrdersGridProps = {
    orders: OrderType[]
    loadCart: () => void
}

type OrderHeaderProps = {
    order: OrderType
}

function OrderHeader( { order }: OrderHeaderProps ) {
    return (
        <div className="order-header">
            <div className="order-header-left-section">
                <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{formatDate(order.orderTimeMs)}</div>
                </div>
                <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{formatMoney(order.totalCostCents)}</div>
                </div>
            </div>

            <div className="order-header-right-section">
                <div className="order-header-label">Order ID:</div>
                <div>{order.id}</div>
            </div>
        </div>
    )
}

export default function OrdersGrid({ orders, loadCart }: OrdersGridProps) {
    return (
        <div className="orders-grid">
            {orders.map(order => {
                return (
                    <div key={order.id} className="order-container">
                        <OrderHeader order={order}/>
                        <OrderDetails order={order} loadCart={loadCart}/>
                    </div>
                )
            })}
        </div>
    )
}