import axios from "axios"
import { useState, useEffect } from "react"
import "./Checkout.css"

import CheckoutHeader from "./CheckoutHeader"
import OrderSummary from "./OrderSummary"
import PaymentSummary from "./PaymentSummary"
import { type CartItemType, type DeliveryOptionType, type PaymentSummaryType } from "../../utils/types"

type Props = {
    cart: CartItemType[]
    loadCart: () => void
}

export default function Checkout({ cart, loadCart }: Props) {
    const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOptionType[]>([])
    const [paymentSummary, setPaymentSummary] = useState<(PaymentSummaryType | null)>(null)

    async function loadDeliveryOptions() {
        const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
        setDeliveryOptions(response.data)
    }
    async function loadPaymentSummary() {
        const response = await axios.get('/api/payment-summary')
        setPaymentSummary(response.data)
    }
    useEffect(() => {
        loadDeliveryOptions()
    }, [])
    useEffect(() => {
        loadPaymentSummary()
    }, [cart])

    return (<>
        <title>Checkout</title>
        <link rel="icon" href="cart-favicon.png" />

        <CheckoutHeader cart={cart} />

        <div className="checkout-page">
            <div className="page-title">Review your order</div>

            <div className="checkout-grid">
                <OrderSummary
                    cart={cart}
                    deliveryOptions={deliveryOptions}
                    loadCart={loadCart}
                />

                <div className="payment-summary">
                    <div className="payment-summary-title">
                        Payment Summary
                    </div>
                    {paymentSummary && (
                        <PaymentSummary 
                            paymentSummary={paymentSummary}
                            loadCart={loadCart}
                        />
                    )}
                </div>
            </div>
        </div>
    </>)
}