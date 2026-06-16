import axios from "axios"

import { Fragment } from "react/jsx-runtime"
import { Link } from "react-router"

import buyAgainIcon from "../../assets/images/icons/buy-again.png"

import { formatDate } from "../../utils/functions"
import { type OrderProductType, type OrderType } from "../../utils/types"

type OrderDetailsGridProps = {
    order: OrderType
    loadCart: () => void
}

type ProductsDetailsProps = {
    orderProduct: OrderProductType
    loadCart: () => void
}

function ProductsDetails({ orderProduct, loadCart }: ProductsDetailsProps) {
    async function handleAddToCart(){
        await axios.post('/api/cart-items', {
            productId: orderProduct.productId,
            quantity:  1
        })
        loadCart()
    }

    return (
        <div className="product-details">
            <div className="product-name">
                {orderProduct.product.name}
            </div>
            <div className="product-delivery-date">
                Arriving on: {formatDate(orderProduct.estimatedDeliveryTimeMs)}
            </div>
            <div className="product-quantity">
                Quantity: {orderProduct.quantity}
            </div>
            <button className="buy-again-button button-primary" onClick={handleAddToCart}>
                <img className="buy-again-icon" src={buyAgainIcon} />
                <span className="buy-again-message">Add to Cart</span>
            </button>
        </div>
    )
}

export default function OrderDetailsGrid({ order, loadCart }: OrderDetailsGridProps) {
    return (
        <div className="order-details-grid">
            {order.products.map(orderProduct => {
                return (
                    <Fragment key={orderProduct.productId}>
                        <div className="product-image-container">
                            <img src={orderProduct.product.image} />
                        </div>

                        <ProductsDetails orderProduct={orderProduct} loadCart={loadCart}/>

                        <div className="product-actions">
                            <Link to={`/tracking/${order.id}/${orderProduct.productId}`}>
                                <button className="track-package-button button-secondary">
                                    Track package
                                </button>
                            </Link>
                        </div>
                    </Fragment>
                )
            })}
        </div>
    )
}