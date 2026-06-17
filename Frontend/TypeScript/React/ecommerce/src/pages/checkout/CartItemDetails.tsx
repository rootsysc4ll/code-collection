import axios from "axios"
import { useState } from "react"
import type { MouseEvent, KeyboardEvent } from "react"

import DeliveryOptions from "./DeliveryOptions"
import type { CartItemType, DeliveryOptionType } from "../../utils/types"
import { formatMoney } from "../../utils/functions"

type Props = {
    cartItem: CartItemType
    deliveryOptions: DeliveryOptionType[]
    loadCart: () => void
    handleDeleteCartItem: (cartItem: CartItemType) => void
}

export default function CartItemDetails({ cartItem, loadCart, handleDeleteCartItem, deliveryOptions }: Props) {
    const [ isUpdating, setIsUpdating ] = useState<boolean>(false)
    const [ quantity, setQuantity ]     = useState<string>((cartItem.quantity).toString())

    async function updateCart() {
        const quantityNumber = Number(quantity)

        if (quantityNumber && quantityNumber > 0) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: quantityNumber 
            })
            loadCart()
        } else {
            console.log('enter a valid quantity!')
        }
        setIsUpdating(false)
    }

    function handleUpdateOnClick(e: MouseEvent<HTMLSpanElement>) {
        e.stopPropagation()
        if (!isUpdating) {
            setIsUpdating(true)
        } else {
            updateCart()
        }
    }
    function handleUpdateOnKey(e: KeyboardEvent<HTMLSpanElement>) {
        e.stopPropagation()
        if (e.key === 'Enter') {
            updateCart()
        } else if (e.key === 'Escape') {
            setIsUpdating(false)
        }
    }

    return (
        <div className="cart-item-details-grid">
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">{cartItem.product.name}</div>
                <div className="product-price">{formatMoney(cartItem.product.priceCents)}</div>
                <div className="product-quantity">
                    <span>
                        Quantity:  
                        {isUpdating ? (
                            <input tabIndex={0} className="quantity-input" type="text" value={quantity} 
                                onChange={e => setQuantity(e.target.value)}
                                onKeyDown={handleUpdateOnKey} />
                        ): (
                            <span className="quantity-label">{cartItem.quantity}</span>
                        )}
                    </span>
                    <span className="update-quantity-link link-primary" 
                        onClick={handleUpdateOnClick}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={() => handleDeleteCartItem(cartItem)}>
                        Delete
                    </span>
                </div>
            </div>

            <DeliveryOptions
                deliveryOptions={deliveryOptions}
                cartItem={cartItem}
                loadCart={loadCart}
            />
        </div>
    )
}