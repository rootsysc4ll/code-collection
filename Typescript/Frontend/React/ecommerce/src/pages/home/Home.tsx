import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router"
import "./Home.css"

import Product from "./Product"
import Header from "../../components/Header"
import { type ProductType, type CartItemType } from "../../utils/types"

type HomeProps = {
    cart: CartItemType[]
    loadCart: () => void
}

export default function Home({ cart, loadCart }: HomeProps) {
    const [products, setProducts] = useState<ProductType[]>([])

    const [ searchParams ] = useSearchParams()
    const search = searchParams.get('search')

    async function requestProducts(url: string) {
        const response = await axio\s.get(url)
        setProducts(response.data)
    }
    
    useEffect(() => {
        if (search) {
            requestProducts(`/api/products?search=${search}`)
        } else {
            requestProducts('/api/products')
        }
    }, [search])

    return (<>
        <link rel="icon" href="home-favicon.png" />

        <Header cart={cart} />

        <div className="home-page">
            <div className="products-grid">
                {products.map(product => {
                    return (
                        <Product key={product.id} product={product} loadCart={loadCart}/>
                    )
                })}
            </div>
        </div>
    </>)
}