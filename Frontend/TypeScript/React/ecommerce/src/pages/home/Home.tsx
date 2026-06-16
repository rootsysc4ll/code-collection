import axios from "axios"
import { useEffect, useState } from "react"
import "./Home.css"

import Header from "../../components/Header"
import checkmark from "../../assets/images/icons/checkmark.png"
import { type ProductType, type CartItemType } from "../../utils/types"
import { formatMoney } from "../../utils/functions"

type HomeProps = {
    cart: CartItemType[]
    loadCart: () => void
}

type ProductContainerProps = {
    product: ProductType
    loadCart: () => void
}

function ProductContainer({ product, loadCart }: ProductContainerProps) {
    const [ quantity, setQuantity ] = useState<number>(1)
    const [ addded, setAddded ]     = useState<boolean>(false)

    async function handleAddToCart(){
        await axios.post('/api/cart-items', {
            productId: product.id,
            quantity
        })
        loadCart()
        
        setAddded(true)
        setTimeout(() => {
            setAddded(false)
        }, 1500);
    }

    return (
        <div className="product-container">
            <div className="product-image-container">
                <img className="product-image"
                    src={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">{product.name}</div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary">{product.rating.count}</div>
            </div>

            <div className="product-price">{formatMoney(product.priceCents)}</div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={e => setQuantity(Number(e.target.value))} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart" style={{ opacity: addded ? '1' : '0' }}>
                <img src={checkmark} />
                Added
            </div>

            <button className="add-to-cart-button button-primary" onClick={handleAddToCart}>Add to Cart</button>
        </div>
    )
}

export default function Home({ cart, loadCart }: HomeProps) {
    const [products, setProducts] = useState<ProductType[]>([])

    useEffect(() => {
        async function requestProducts() {
            const response = await axios.get('/api/products')
            setProducts(response.data)
        }
        requestProducts()
    }, [])

    return (<>
        <link rel="icon" href="home-favicon.png" />

        <Header cart={cart} />

        <div className="home-page">
            <div className="products-grid">
                {products.map(product => {
                    return (
                        <ProductContainer key={product.id} product={product} loadCart={loadCart}/>
                    )
                })}
            </div>
        </div>
    </>)
}