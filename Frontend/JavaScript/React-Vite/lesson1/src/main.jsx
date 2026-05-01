import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

// document.addEventListener('DOMContentLoaded', () => {
//   createRoot(document.getElementById('root')).render(
//     <StrictMode>
//       <App />
//     </StrictMode>,
//   );
// })

let productCost = 26
let shippingCost = 10

const date = dayjs().format('MMMM D')

const div = (<>
  <div>
    <p>Cotton socks</p>
    <p>Price: $10</p>
    <button>Add to Cart</button>
  </div>

  <div>
    <p>Product Cost: ${productCost}</p>
  </div>

  <div>
    <p>Product cost: ${productCost}</p>
    <p>Shiping cost: ${shippingCost}</p>
    <p>Total cost: ${productCost + shippingCost}</p>
    <button>Place your order</button>
  </div>

  <p>Today is {date}</p>

  <p>Curent time: {dayjs().format('hh:mm:ss')}</p>
</>);

setInterval(() => {
  root.render(
   <>
      <div>
        <p>Cotton socks</p>
        <p>Price: $10</p>
        <button>Add to Cart</button>
      </div>

      <div>
        <p>Product Cost: ${productCost}</p>
      </div>

      <div>
        <p>Product cost: ${productCost}</p>
        <p>Shiping cost: ${shippingCost}</p>
        <p>Total cost: ${productCost + shippingCost}</p>
        <button>Place your order</button>
      </div>

      <p>Today is {date}</p>

      <p>Curent time: {dayjs().format("HH:mm:ss")}</p>
    </> 
  )
}, 1000)

const root = createRoot(document.getElementById('root'))
root.render(div);
