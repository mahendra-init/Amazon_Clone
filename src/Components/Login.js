import React, { useState } from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const signIn = e => {
    e.preventDefault();
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigate('/');
    })
    .catch(error => {
      alert(error.message)
    })
  }
  
  const register = e=> {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigate('/');
    })
    .catch(error => {
      alert(error.message)
    })
  }

  return (
    <div className="login">
      <Link to='/'>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" className='login_logo' alt="" />
      </Link>

      <div className="login_container">
        <h1>Sign-in</h1>

        <form action="">
          <h5>E-mail</h5>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

          <button type='submit' onClick={signIn}
          className='login_signInButton'>Sign In</button>
        </form>

        <p>
        By continuing, you agree to Amazon's Fake Clone Conditions of Use and Privacy Notice. Please see your Privacy Notice, our Cookies Notice and our Interest Based Ads Notice.
        </p>


        <button onClick={register} 
        className='login_registerButton'>Create your Amazon Account</button>
      </div>
    </div>
  )
}

export default Login