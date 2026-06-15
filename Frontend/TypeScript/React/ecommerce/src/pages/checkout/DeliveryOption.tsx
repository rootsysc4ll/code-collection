import { type DeliveryOptionsType, type CartItemType } from "../../utils/types"
import { formatDate } from "../../utils/functions"

type Props = {
    deliveryOption: DeliveryOptionsType
    cartItem: CartItemType
    priceString: string
}

export default function DeliveryOption( { deliveryOption, cartItem, priceString }: Props ) {
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
                    {priceString} - Shipping
                </div>
            </div>
        </div>
    )
}