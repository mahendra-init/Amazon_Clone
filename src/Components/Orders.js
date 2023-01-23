import React, { useState } from 'react'
import { useEffect } from 'react';
import { useStateValue } from '../StateProvider';
import './Orders.css';
import { db } from '../firebase';
import { collection, doc, orderBy, onSnapshot } from '@firebase/firestore';
import Order from './Order';

function Orders() {
    const [ orders, setOrders ] = useState();
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if(user){
            const userCollectionRef = collection(db, `users`);
            const userDocRef = doc(userCollectionRef, user?.uid)
            const orderCollectionRef = collection(userDocRef, `orders`);

            onSnapshot(orderCollectionRef, orderBy('created', 'desc'), (snapshot) => {

                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id, 
                    data: doc.data()
                })));
              });
        } else {
            setOrders([])
        }

    }, [user])
        
        console.log(orders);
  return (
    <div className='orders'>
        <h1>Your Orders</h1>

        <div className="orders_order">
            {orders?.map(order => (
                <Order order={order} />
            ))}
        </div>
    </div>
  )
}

export default Orders