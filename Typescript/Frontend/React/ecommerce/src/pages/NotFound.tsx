import Header from "../components/Header"
import { type CartItemType } from "../utils/types"

type Props = {
    cart: CartItemType[]
}

export default function NotFound( { cart }: Props ) {
    return (<>
        <Header cart={cart} />

        <span style={{
            display: 'flex',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold'
        }}>
            Error 404(Not Found)
        </span>
    </>)
}