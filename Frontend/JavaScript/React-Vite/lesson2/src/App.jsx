import { useState } from 'react'
import './styles/App.css'

function ProductDetails(props) {
    const { name, price, discountPrice, imageSrc } = props

    return (<>
        <div>
            <img width="100" src={imageSrc} alt="err" />
            <p>{name}</p>
            {/* {
                (discountPrice && (<del><p>Price: ${price}</p></del>)) ||
                (!discountPrice && (<p>Price: ${price}</p>))    
            } */}
            {discountPrice ? (<del><p>Price: ${price}</p></del>) : (<p>Price: ${price}</p>)}
            {discountPrice && (<p>Discount price: ${discountPrice}</p>)}
            <button>Add to Cart</button>
        </div>
        <br></br>
    </>);
}

function LoginForm() {
    return (<>
        <p>Hello, welcome to my website</p>
        <div>
            <input type="text" placeholder="Email" /><br></br>
            <input type="password" placeholder="Password" />
        </div>
        <div>
            <button>Login</button>
            <button>Sign up</button>
        </div>
    </>);
}

function App() {
    
    return (<>
        <LoginForm/>
        <br></br>
        <ProductDetails name="Cotton socks" price="10.90" discountPrice="5.45" imageSrc="https://supersimple.dev/images/cotton-socks.png"/>
        <ProductDetails name="Tennis balls" price="6.00" imageSrc="https://supersimple.dev/images/tennis-balls.png"/>
        <ProductDetails name="Plain T-Shirt" price="7.99" imageSrc="https://supersimple.dev/images/plain-t-shirt.png"/>
    </>);
}

export default App
