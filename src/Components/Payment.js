import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from '../StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getBasketTotal } from '../reducer';
import axios from '../axios';
import { db } from '../firebase';
import { collection, setDoc, doc } from '@firebase/firestore';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generates the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'POST',
                // stripe expects the total in a currencies subunits
                url: `/payments/create?total=${Number(getBasketTotal(basket).toFixed(2)) * 100}`,
            });
            console.log(response.data.clientSecret)
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket]);

    const handleSubmit = async (e) => {
        //do all the fancy stripe stuff ..
        e.preventDefault();
        setProcessing(true);

        await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            
            const userCollectionRef = collection(db, `users`);
            const userDocRef = doc(userCollectionRef, user?.uid)
            const orderCollectionRef = collection(userDocRef, `orders`);
            const orderDocRef = doc(orderCollectionRef, paymentIntent.id)

            setDoc(orderDocRef, {
                basket: basket,
                amount: Number(getBasketTotal(basket).toFixed(2)),
                created: paymentIntent.created
            });
            
            console.log('Data successfully added to Firestore');

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            });

            navigate('/orders', {replace: true})
        })
        .catch((error) => {
            console.log("Error >> ", error.message)
        });
    }

    const handleChange = (e) => {
        //display errors as the customer types their card details
        setDisabled(e.empty);
        setError(e.error ? e.error.message : '');
    }

  return (
    <div className="payment">
        <div className="payment_container">
            <h1>
                Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
            </h1>

            <div className="payment_section">
                <div className="payment_title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment_address">
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angles, CA</p>
                </div>
            </div>

            <div className="payment_section">
                <div className="payment_title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment_items">
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

            <div className="payment_section">
                <div className="payment_title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment_details">
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>

                        <div className="payment_container">
                            <h3>Order Total: ${getBasketTotal(basket).toFixed(2)}</h3>

                        <button disabled={processing || disabled || succeeded }>
                            <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                        </button>
                        </div>
                    </form>
                </div>

                {error && <div>{error}</div>}
            </div>
        </div>
    </div>
  )
}

export default Payment