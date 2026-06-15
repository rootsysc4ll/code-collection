import dayjs from "dayjs"
import { type CartItemType } from "./types"

export function formatMoney(amountCents: number) {
    return `$${(amountCents / 100).toFixed(2)}`
}

export function formatDate(timeMS: number | undefined) {
    return dayjs(timeMS).format('dddd, MMMM D')
}

export function calculateCartQuantity(cart: CartItemType[]) {
    let cartQuantity = 0
    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity
    })

    return cartQuantity
}