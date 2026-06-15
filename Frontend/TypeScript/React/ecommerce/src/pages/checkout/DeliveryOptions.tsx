import { type DeliveryOptionsType, type CartItemType } from "../../utils/types"
import { formatDate, formatMoney } from "../../utils/functions"

type Props = {
    deliveryOptions: DeliveryOptionsType[]
    cartItem: CartItemType
}

export default function DeliveryOptions({ deliveryOptions, cartItem }: Props) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>

            {deliveryOptions.map(deliveryOption => {
                function deliveryOptionPrice() {
                    return deliveryOption.priceCents === 0 ? 'FREE' : formatMoney(deliveryOption.priceCents)
                }

                return (
                    <div key={deliveryOption.id} className="delivery-option">
                        <input type="radio"
                            defaultChecked={deliveryOption.id === cartItem.deliveryOptionId}
                            className="delivery-option-input"
                            name={`delivery-option-${cartItem.productId}`} />
                        <div>
                            <div className="delivery-option-date">
                                {formatDate(deliveryOption.estimatedDeliveryTimeMs)}
                            </div>
                            <div className="delivery-option-price">
                                {deliveryOptionPrice()} - Shipping
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}