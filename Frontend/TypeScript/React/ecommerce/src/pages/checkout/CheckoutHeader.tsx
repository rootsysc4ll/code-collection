import "./../../styles/checkout/CheckoutHeader.css"

import { Link } from "react-router"
import logo from "./../../assets/images/logo.png"
import mobileLogo from "./../../assets/images/mobile-logo.png"
import checkout from "./../../assets/images/icons/checkout-lock-icon.png"
import { type CartItemType } from "../../utils/types"

type Props = {
    cart: CartItemType[]
}

export default function CheckoutHeader( { cart }: Props ) {
    let cartQuantity = 0

    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity
    })
    
    return(
        <div className="checkout-header">
            <div className="header-content">
                <div className="checkout-header-left-section">
                    <Link to="/">
                        <img className="logo" src={logo} />
                        <img className="mobile-logo" src={mobileLogo} />
                    </Link>
                </div>

                <div className="checkout-header-middle-section">
                    Checkout (<Link className="return-to-home-link"
                        to="/">{cartQuantity} items</Link>)
                </div>

                <div className="checkout-header-right-section">
                    <img src={checkout} />
                </div>
            </div>
        </div>
    )
}