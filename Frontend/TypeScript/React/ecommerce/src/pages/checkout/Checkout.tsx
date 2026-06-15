import axios from "axios"
import { useState, useEffect } from "react"
import "./Checkout.css"

import CheckoutHeader from "./CheckoutHeader"
import OrderSummary from "./OrderSummary"
import PaymentSummary from "./PaymentSummary"
import { type CartItemType, type DeliveryOptionsType, type PaymentSummaryType } from "../../utils/types"

type Props = {
    cart: CartItemType[]
}

export default function Checkout({ cart }: Props) {
    const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOptionsType[]>([])
    const [paymentSummary, setPaymentSummary] = useState<(PaymentSummaryType | null)>(null)

    useEffect(() => {
        async function requestChedkoutData() {
            const deliveryOptionsResponse = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(deliveryOptionsResponse.data)

            const paymentSummaryReponse = await axios.get('/api/payment-summary')
            setPaymentSummary(paymentSummaryReponse.data)
        }
        requestChedkoutData()
    }, [])

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
                />

                <div className="payment-summary">
                    <div className="payment-summary-title">
                        Payment Summary
                    </div>


                    {paymentSummary && (
                        <PaymentSummary paymentSummary={paymentSummary} />
                    )}
                </div>
            </div>
        </div>
    </>)
}