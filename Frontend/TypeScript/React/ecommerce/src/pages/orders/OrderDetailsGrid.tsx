import { Fragment } from "react/jsx-runtime"
import { Link } from "react-router"

import buyAgainIcon from "../../assets/images/icons/buy-again.png"

import { formatDate } from "../../utils/functions"
import { type OrderType } from "../../utils/types"

type Props = {
  order: OrderType
}

export default function OrderDetailsGrid( { order }: Props ) {
  return (
    <div className="order-details-grid">
      {order.products.map(orderProduct => {
        return (
          <Fragment key={orderProduct.productId}>
            <div className="product-image-container">
              <img src={orderProduct.product.image} />
            </div>

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
              <button className="buy-again-button button-primary">
                <img className="buy-again-icon" src={buyAgainIcon} />
                <span className="buy-again-message">Add to Cart</span>
              </button>
            </div>

            <div className="product-actions">
              <Link to="/tracking">
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