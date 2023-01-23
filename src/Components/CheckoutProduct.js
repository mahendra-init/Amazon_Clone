import React from 'react'
import './CheckoutProduct.css';
import { useStateValue } from '../StateProvider';


const CheckoutProduct = ({ id, image, title, price, rating, hideButton }) => {

    const [ { basket }, dispatch] = useStateValue();
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

  return (
    <div className="checkoutProduct">
        <div className="checkoutProduct_image_div">
        <img src={image} alt="" className='checkoutProduct_image'/>
        </div>
        <div className="checkoutProduct_info">
            <p className="checkoutProduct_title">{title}</p>
            <p className="checkoutProduct_price">
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className="checkoutProduct_rating">
                {Array(rating).fill().map((_, i) => (
                        <p>⭐</p>
                    ))}
            </div>
            {!hideButton && (
                <button onClick={removeFromBasket}>Remove from Basket</button>
            )}
        </div>
    </div>
  )
}

export default CheckoutProduct