import { NavLink, useNavigate, useSearchParams } from "react-router"
import type { MouseEvent, KeyboardEvent } from "react"
import "./Header.css"

import logoWhite from "./../assets/images/logo-white.png"
import mobileLogoWhite from "./../assets/images/mobile-logo-white.png"
import cartIcon from "./../assets/images/icons/cart-icon.png"
import searchIcon from "./../assets/images/icons/search-icon.png"

import { type CartItemType } from "../utils/types"
import { calculateCartQuantity } from "../utils/functions"
import { useState } from "react"

type Props = {
    cart: CartItemType[]
}

export default function Header( { cart }: Props ) {
    const cartQuantity = calculateCartQuantity(cart)
    const navigate = useNavigate()

    const [ searchParams ] = useSearchParams()
    const searchParam = searchParams.get('search')
    const [ search, setSearch ] = useState<string>(searchParam || '')
    
    function chooseNavigateUrl(searchName: string) {
        console.log(searchName)
        if (searchName === '') {
            navigate(`/`)
        } else {
            navigate(`/?search=${searchName}`)
        }
    }

    function handleSearchOnClick(e: MouseEvent<HTMLButtonElement>) {
        e.stopPropagation()
        chooseNavigateUrl(search)
    }
    function handleSearchOnKey(e: KeyboardEvent<HTMLInputElement>) {
        e.stopPropagation()
        if (e.key === 'Enter') chooseNavigateUrl(search)
    }

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={logoWhite} />
                    <img className="mobile-logo"
                        src={mobileLogoWhite} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="search" placeholder="Search" value={search}
                    onChange={e => {
                        const nextSearch = e.target.value 
                        setSearch(nextSearch)
                        chooseNavigateUrl(nextSearch)
                    }}
                    onKeyDown={handleSearchOnKey}
                />

                <button className="search-button" onClick={handleSearchOnClick}>
                    <img className="search-icon" src={searchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">

                    <span className="orders-search">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={cartIcon} />
                    <div className="cart-quantity">{cartQuantity}</div>
                    <div className="cart-search">Cart</div>
                </NavLink>
            </div>
        </div>
    )
}