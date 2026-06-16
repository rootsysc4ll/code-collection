import axios from "axios"

import CartItemDetails from "./CartItemDetails"
import type { CartItemType, DeliveryOptionType } from "../../utils/types"
import { formatDate } from "../../utils/functions"

type Props = {
    cart: CartItemType[]
    deliveryOptions: DeliveryOptionType[]
    loadCart: () => void
}

export default function OrderSummary( { cart, deliveryOptions, loadCart }: Props ) {
    async function handleDeleteCartItem(cartItem: CartItemType) {
        await axios.delete(`/api/cart-items/${cartItem.productId}`)
        loadCart()
    }

    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map(cartItem => {
                const selectedDeliveryOption = deliveryOptions.find(
                    deliveryOption => deliveryOption.id === cartItem.deliveryOptionId
                )

                return (
                    <div key={cartItem.id} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {formatDate(selectedDeliveryOption!.estimatedDeliveryTimeMs as number)}
                        </div>

                        <CartItemDetails 
                            cartItem={cartItem}
                            loadCart={loadCart}
                            handleDeleteCartItem={handleDeleteCartItem}
                            deliveryOptions={deliveryOptions}
                        />    
                    </div>
                )
            })}
        </div>
    )
}