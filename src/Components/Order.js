import React from 'react'
import './Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}</p>
      <p className="order_id"><small>{order.id}</small></p>

      {order.data.basket?.map(item => (
        <CheckoutProduct
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          rating={item.rating}
          image={item.image}
          hideButton
        />
      ))}

      <div className='order_total'>
        <p><strong>Order Total: ${order.data.amount}</strong></p>
      </div>
    </div>
  )
}

export default Order