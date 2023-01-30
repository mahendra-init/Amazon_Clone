import {React, useEffect } from 'react'
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Checkout from './Components/Checkout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useStateValue } from './StateProvider';
import Payment from './Components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Components/Orders';

const promise = loadStripe(
  `${process.env.REACT_APP_PUBLIC_KEY}`
);

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads..

    onAuthStateChanged(auth, (authUser) => {
  
      if (authUser) {
        // the user just logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })

  }, [])


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/' element={<><Header/><Home/></>}/>
          <Route path='/checkout' element={<><Header/><Checkout/></>}/>
          <Route path='/payment' element={<><Header/><Elements stripe={promise}><Payment/></Elements></>}/>
          <Route path='/orders' element={<><Header/><Orders/></>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
