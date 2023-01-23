import React from 'react'
import { useStateValue } from '../StateProvider';
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'

function Checkout() {
  const [ { basket, user }, dispatch] = useStateValue();
  console.log(basket)
  return (
    <div className="checkout">
        <div className="checkout_left">
            <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" className='checkout_ad' alt="" />

            <div>
              <h3>Hello, {user?.email}</h3>
                <h2 className="checkout_title">Your shopping basket</h2>

                {basket.map(item => (
                  <CheckoutProduct
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                  image={item.image}
                  />
                ))}
            </div>
        </div>

        <div className="checkout_right">
            <Subtotal/>
        </div>
    </div>
  )
}

export default Checkout