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
            {discountPrice ? (<>
                <del><p>Price: ${price}</p></del>
                <p>Discount price: ${discountPrice}</p>
                </>) : 
                (<p>Price: ${price}</p>)}
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

function CountButton() {
    let [ count, setCount ] = useState(0);

    function updateCount() {
        setCount(++count);
    }

    return (<>
        <button onClick={updateCount}>Clicked {count} {count == 1 ? 'time' : 'times'}</button>
    </>);
}

function ShareCountButton({ count, setCount }) {
    function updateCount() {
        setCount(++count);
    }

    return (<>
        <button onClick={updateCount}>Clicked {count} {count == 1 ? 'time' : 'times'}</button>
    </>);
}

function DisplayAsYouType() {
    const state = useState('');
    let inputText = state[0];
    const setInputText = state[1];

    const examples = ['Alice', 'John', 'Linus', 'King Von'];

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function resetInputTextText() {
        setInputText('')
    }

    function inputExample() {
        const example = examples[Math.floor(Math.random() * examples.length)];
        setInputText(example);
    }

    return (<>
        <div>
            <input type="text" onChange={saveInputText} value={inputText}/>
            <button onClick={resetInputTextText}>Reset</button>
            <button onClick={inputExample}>Example</button>
        </div>
        <p>Hello {inputText}</p>
    </>);
}

function App() {
    let [ count, setCount ] = useState(0);

    return (<>
        <LoginForm/>
        <br></br>
        <ProductDetails name="Cotton socks" price="10.90" discountPrice="5.45" imageSrc="https://supersimple.dev/images/cotton-socks.png"/>
        <ProductDetails name="Tennis balls" price="6.00" imageSrc="https://supersimple.dev/images/tennis-balls.png"/>
        <ProductDetails name="Plain T-Shirt" price="7.99" imageSrc="https://supersimple.dev/images/plain-t-shirt.png"/>
        <CountButton/>
        <CountButton/><br/>
        <ShareCountButton count={count} setCount={setCount}/>
        <ShareCountButton count={count} setCount={setCount}/>
        <button onClick={() => setCount(0)}>Reset</button><br /><br />
        <DisplayAsYouType/>
    </>);
}

export default App
